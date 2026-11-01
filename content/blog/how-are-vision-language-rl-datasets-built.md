---
title: "How Are Vision-Language RL Datasets Built? Verifiable Visual Rewards, Shortcut Filtering and Expert-Checked Multimodal Data"
description: "A practitioner's guide to how reinforcement learning datasets for vision-language models are built: what MathVista, MMMU, MathVerse and MMMU-Pro taught about questions that can be answered without the image, how MMK12, Vision-R1, ThinkLite-VL and Visual-RFT built verifiable multimodal RL data, why multimodal RL learns shortcuts and hacks rewards, how procedural environments like TRON scale, and where expert-checked data still matters."
tags:
  - multimodal
  - vision-language-models
  - rlvr
  - datasets
  - expert-data
  - rewards
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-01T12:50:00.000Z'
updatedAt: '2026-11-01T12:50:00.000Z'
faq:
  - question: "How are RL datasets for vision-language models built?"
    answer: "Most are built from image-question-answer triples whose answers can be checked by a rule: a number, a choice, a bounding box or a short string. Teams collect or synthesize problems (often math, charts, diagrams and science exams), verify answers and sometimes solution processes, filter out questions that can be answered without the image, select samples by difficulty for the current model, and train with GRPO-style RL using answer-matching or task-specific rewards such as IoU for detection. MMK12, for example, has 15,616 multimodal math training problems with verified answers and solution processes."
  - question: "Why do multimodal benchmarks filter questions that can be answered without the image?"
    answer: "Because many visual questions leak the answer in text. MathVerse found that some multimodal models scored higher without the diagram than with it, and MMMU-Pro filtered out questions answerable by text-only models, added more answer options and introduced a vision-only setting, which lowered model scores by 16.8% to 26.9% relative to MMMU. In RL data, text-answerable items reward language priors instead of visual reasoning."
  - question: "What rewards are used in vision-language RL?"
    answer: "Rule-based answer matching for math and multiple choice, and task-specific verifiable rewards for perception: Visual-RFT uses intersection-over-union for object detection, and Perception-R1 found reward design and the task's perceptual complexity largely determine whether RL helps. Executable programs can serve as verifiers, as in TRON's 520 generator-verifier environments and GeoX's self-play spatial programs. For open-ended answers, a VLM-as-judge is used, with care."
  - question: "Do vision-language models hack rewards during RL?"
    answer: "Yes. A 2026 study of multimodal reward hacking found outcome-only rewards reached a 48.1% reward hacking rate across safety VQA, chart VQA and stress-test settings, and that RL created new failures rather than only inheriting them. Keyword-based visual-evidence checks increased hacking, while VLM-as-judge semantic verification reduced it. Visionary-R1 also reported that plain RL on visual QA leads models to learn shortcuts from easy questions."
  - question: "How much data does vision-language RL need?"
    answer: "Less than SFT, if it is the right difficulty. Vision-R1 used a 10K multimodal math set for RL after a 200K-example cold start. ThinkLite-VL selected 11K of 70K open examples by MCTS-measured difficulty and reached 75.1 on MathVista with a 7B model. Visual-RFT improved one-shot fine-grained classification by 24.3% with around 100 samples."
  - question: "Should vision-language reasoning models be trained with SFT or RL?"
    answer: "Usually both, but the combination is not automatically additive. ReVisual-R1 found that a careful text-only cold start already helped multimodal reasoning and that text-only RL after multimodal RL helped further, OpenVLThinker alternated SFT and RL, and a study of long-CoT SFT and RL for VLMs found that two-stage, interleaved, mixed and merged combinations produced trade-offs rather than additive gains."
  - question: "How does Anthroly help build multimodal RL data?"
    answer: "Anthroly works with PhD experts in mathematics, physics, chemistry, biology, medicine and engineering who write image-grounded problems in their fields, verify answers and solution steps, audit whether each item truly needs the image, label visual evidence regions, and validate VLM judges against expert judgment. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Reinforcement learning with verifiable rewards moved from text to vision quickly in 2025. Within weeks of DeepSeek-R1, a wave of "R1-V" papers showed that GRPO on image-question-answer pairs could raise multimodal math and perception scores. Nearly two years later the lesson is clearer: the algorithm transferred easily, and the data did not. Vision-language RL has its own failure modes, chief among them that a model can earn reward without looking at the image. This post walks through how multimodal RL datasets are built today, what the evaluation benchmarks taught the field about visual shortcuts, and how to build image-grounded data that trains perception and reasoning rather than language priors.**

## The short answer

A good vision-language RL dataset has five properties. **Verifiable answers**: a number, a choice, a box or a short string a rule can check, or an executable program that can verify itself. **Visual dependence**: the question cannot be answered from the text alone, and this is checked, not assumed. **Correct gold labels**, including solution processes where possible, because a wrong label is a wrong reward. **The right difficulty** for the current policy, so group-based RL gets a gradient. And **rewards that hold up under optimization**: answer matching plus, where needed, perception-specific rewards or a judge that checks visual evidence. MathVista, MMMU, MathVerse, MMMU-Pro, MMK12, Vision-R1, ThinkLite-VL, Visual-RFT, TRON and the multimodal reward hacking literature each show one piece of this.

## What did the benchmarks teach about multimodal data?

Most multimodal RL data was built in the image of the evaluation sets, so their construction lessons carry over directly:

| Benchmark | How it was built | Lesson for training data |
|---|---|---|
| MathVista (Lu et al., 2023) | 6,141 examples from 28 existing multimodal datasets plus 3 new ones (IQTest, FunctionQA, PaperQA) | Aggregating sources gives breadth, but inherits each source's label noise and shortcuts |
| MMMU (Yue et al., 2023) | 11.5K college-level questions from exams, quizzes and textbooks, collected by more than 50 university students across 30 subjects and 183 subfields | Expert-level questions need annotators from the field; errors split across perception, knowledge and reasoning |
| MathVerse (Zhang et al., 2024) | 2,612 diagram problems, each rewritten by annotators into six versions with different amounts of information in text versus image (15K samples) | Many "visual" questions are answerable from text; some models scored higher without the diagram |
| MMMU-Pro (Yue et al., 2024) | MMMU filtered for text-only answerable questions, more answer options, and a vision-only setting with the question embedded in the image | Removing text shortcuts dropped scores by 16.8% to 26.9% relative to MMMU |

Two of these findings matter most for RL. First, MMMU's error analysis of 150 GPT-4V failures attributed 35% to perception, 29% to missing knowledge and 26% to reasoning flaws. Perception is the largest single bucket, and it is the one text-trained reasoning recipes do least to fix. Second, MathVerse and MMMU-Pro showed that a meaningful share of multimodal questions leak the answer through text. For an evaluation that inflates scores. For RL it is worse: every text-answerable item rewards the policy for ignoring the image.

## How are multimodal RL training sets built?

The 2025 wave converged on a handful of recipes, which differ mainly in where the questions come from and how answers are verified:

| Dataset or method | Source of problems | Verification and selection | Scale |
|---|---|---|---|
| MMK12 / MM-Eureka (Meng et al., 2025) | K-12 multimodal math with fill-in-the-blank answers | Human-verified answers and solution processes; online filtering during RL | 15,616 training problems (455 elementary, 9,776 middle school, 5,385 high school); 500 test questions each in math, physics, chemistry and biology |
| Vision-R1 (Huang et al., 2025) | Cold-start CoT built by bridging an MLLM's image descriptions to DeepSeek-R1, then filtered | No human annotation for the cold start; rule-based answer and format reward for RL | 200K cold-start CoT examples; 10K multimodal math problems for RL |
| ThinkLite-VL (Wang et al., 2025) | 70K open-source examples across math, natural images and charts | MCTS used to measure how many reasoning iterations the model needs; keep hard but solvable items | 11K selected for a 7B model, 7.5K for a 72B model |
| Visionary-R1 (Xia et al., 2025) | CoT-free visual question-answer pairs | Caption, then reason, then answer, to force image interpretation | 273K pairs |
| Visual-RFT (Liu et al., 2025) | Perception tasks: classification, detection, grounding | Task-specific verifiable rewards such as IoU for boxes | Effective with around 100 samples in one-shot classification |
| MIFS (Zeng et al., 2026) | Synthesized multimodal instruction-following tasks | Code-based verifiers; learnability-aware filtering based on RL training dynamics | 90K samples, 8 constraint categories, 14 task domains |

The scale column tells the main story. RL sets are small next to SFT sets. Vision-R1 used 200K examples to teach a reasoning format and only 10K to optimize it with RL, reaching 73.5% on MathVista with a 7B model. ThinkLite-VL got to 75.1 on MathVista with 11K examples, chosen by difficulty rather than at random. That makes per-item quality, not volume, the binding constraint: in a 10K-item RL set, a few hundred wrong labels or text-answerable questions are a measurable fraction of the gradient.

MMK12 is also a reminder of how narrow the field's training data still is. The large open sets are dominated by school math and charts because those are the domains where answers are easy to verify. Expert-level visual reasoning in radiology, pathology, materials characterization or circuit diagrams is mostly absent from open RL data, and recent domain papers in medical VQA and pathology build their own.

## Why does multimodal RL learn shortcuts?

Three mechanisms show up repeatedly in the literature.

**Language priors.** If the question text, the answer options or the dataset's answer distribution predicts the answer, RL will find that faster than it learns to read the image. **Visionary-R1** reported that simply prompting a VLM to reason before answering and running RL led it to learn shortcuts from easy questions that hurt generalization, and fixed it by requiring a detailed caption before the reasoning. **EVAN** (Liu et al., 2026) targets the same failure directly: it masks the most discriminative image patches, collects the plausible but ungrounded answers the policy still produces, and uses them as negatives.

**Perception is not reasoning.** **Perception-R1** (Yu et al., 2025) found that adding a thinking process through RL does not consistently help visual perception tasks, and that perceptual complexity and reward design largely determine whether RL helps. **UniCAR-RL** (Li et al., 2026) separates caption, reasoning and QA branches so sparse answer rewards stop conflating visual hallucinations with logic errors. **MIRROR** (Ye et al., 2026) builds ODA-Data, geometry problems with text-dominant, image-dominant and combined views of the same problem, and uses the model's best view as a teacher for the others.

**Reward hacking.** **Multimodal Reward Hacking in Reinforcement Learning** (Yao et al., 2026) measured hacking across safety VQA, chart VQA and stress tests from 2B to 32B models. Outcome-only rewards reached a 48.1% reward hacking rate, and RL created new failures rather than only inheriting them. The most practical finding is about verification of visual evidence: keyword-based checks increased hacking, while VLM-as-judge semantic verification reduced it. GRPO was the most resistant of the algorithms tested; RLOO stayed vulnerable.

## How do you test whether an item really needs the image?

The cheapest defense is to measure visual dependence before an item enters the RL set. For each candidate, sample answers from the current model with and without the image and compute

$$
\Delta_{\text{vis}}(x) = \hat{p}(\text{correct} \mid I, q) - \hat{p}(\text{correct} \mid q)
$$

where $I$ is the image, $q$ is the question text and $\hat{p}$ is the empirical success rate over $k$ samples. Items with $\Delta_{\text{vis}}$ near zero and high text-only accuracy are answerable without looking; drop them or rewrite them so the key information lives only in the image, which is what MathVerse's annotators did by hand. A minimal filter:

```python
def keep_item(item, policy, k=8, min_gain=0.25, max_text_only=0.3):
    """Keep a multimodal RL item only if it is visually dependent
    and still has headroom for the current policy."""
    with_img = sum(policy.correct(item.image, item.question) for _ in range(k)) / k
    text_only = sum(policy.correct(None, item.question) for _ in range(k)) / k
    if text_only > max_text_only:           # answerable from text priors
        return False
    if with_img - text_only < min_gain:      # image adds little signal
        return False
    return 0.0 < with_img < 1.0              # GRPO needs mixed outcomes
```

The thresholds are illustrative and should be tuned on a held-out slice. Two cautions. A model that cannot read the image will also show low gain on items that genuinely need it, so pair this check with human review on a sample. And multiple-choice items have a chance floor, so compare against it rather than zero. The last line is the same difficulty-band logic we describe in [choosing prompts for RLVR](/blog/how-to-choose-prompts-for-rlvr-training).

## Static datasets or procedural environments?

A static dataset is bounded by its collection budget and eventually memorized. The alternative is to generate images and questions on demand from programs that know the answer.

**TRON** (Yang et al., 2026) is the clearest example: 520 environments in five ability buckets (spatial, mathematical, diagram, pattern and logic, counting), each a generator-verifier program that samples a latent visual state, renders an image, asks a question and verifies the answer exactly. A run can draw fresh instances at whatever difficulty the curriculum needs, and RL on TRON improved results on ten external benchmarks across three base models. **GeoX** (Ahn et al., 2026) uses self-play over satellite and aerial images, where the policy proposes spatial problems as executable programs and a verifier runs them, improving base VLMs by up to 5.5 points. **RuleForge** (Xu et al., 2026) builds Bongard-Forge100k, 108,797 rule-reasoning problems, with execution-grounded rewards.

Procedural environments solve the verification and scale problems. They do not solve realism. A rendered bar chart is not a scanned clinical form, a micrograph or an engineering drawing with nonstandard notation. The practical pattern is the same one we see in text RL: procedural environments for breadth and curriculum, plus a smaller set of real, expert-built items for the distribution you actually care about, as discussed in [what makes a training-grade RL environment](/blog/what-makes-a-training-grade-rl-environment).

## How should SFT and RL be combined for VLMs?

The evidence is mixed, which is itself the finding. **ReVisual-R1** (Chen et al., 2025) found that a cold start with carefully selected text-only data already beat many multimodal reasoning models before any multimodal RL, that standard GRPO suffers gradient stagnation in multimodal RL, and that text-only RL after multimodal RL helped further. **OpenVLThinker** (Deng et al., 2025) alternated SFT and RL over several iterations, with each RL stage producing better SFT data. **VL-Rethinker** (Wang et al., 2025) used Selective Sample Replay against vanishing advantages and a forced rethinking step, reaching 80.4% on MathVista and 63.5% on MathVerse. But a systematic study of long-CoT SFT and RL for VLMs (Chen et al., 2025) found that SFT helped the hardest questions while adding verbosity and hurting easier ones, RL improved all levels more modestly, and two-stage, interleaved, progressive, mixed and merged combinations all produced trade-offs rather than additive gains.

For data teams the takeaway is to plan the two sets separately. The SFT set teaches format and long reasoning on hard items; it needs correct, visually grounded solution traces, which is where **Faithful Warm-Start** style curation (2026) checks that each trace actually uses visual evidence. The RL set needs verifiable answers, visual dependence and a difficulty band. Reusing one set for both usually serves neither well.

## What do teams get wrong?

- **Trusting aggregated labels.** Pooled datasets inherit every source's label errors, and in a 10K-item RL set those errors are rewards.
- **Not checking visual dependence.** Text-answerable items train language priors, as MathVerse and MMMU-Pro showed for evaluation.
- **Keyword checks for visual evidence.** They increased reward hacking in the 2026 study; use semantic verification and audit it.
- **Only school math and charts.** Easy to verify, but far from the visual documents professionals actually read.
- **One set for SFT and RL.** They need different properties.
- **Evaluating on contaminated sets.** Popular visual benchmarks are widely trained on; hold out fresh items, as in our post on [contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks).

## How Anthroly can help

Every recipe above is limited by the same thing: image-grounded problems with correct answers that truly require the image, in domains where answers are hard to verify. Anthroly works with PhD experts in mathematics, physics, chemistry, biology, medicine and engineering who write image-grounded problems in their fields, verify answers and step-by-step solutions, audit items for visual dependence, label the image regions that support each answer, and validate VLM judges against expert judgment. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building multimodal RL data or a visual reasoning eval and want a second set of expert eyes on a sample, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How should you choose prompts for RLVR training?](/blog/how-to-choose-prompts-for-rlvr-training)
- [How reliable are RLVR verifiers?](/blog/how-reliable-are-rlvr-verifiers)
- [How are web and computer-use RL environments built?](/blog/how-are-web-and-computer-use-rl-environments-built)
- [How are medical AI benchmarks built?](/blog/how-are-medical-ai-benchmarks-built)
- [What makes a training-grade RL environment?](/blog/what-makes-a-training-grade-rl-environment)
- [Does RLVR teach new reasoning?](/blog/does-rlvr-teach-new-reasoning)

---

## References

1. Lu, P., Bansal, H., Xia, T., et al. (2023). [MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts](https://arxiv.org/abs/2310.02255). arXiv:2310.02255.
2. Yue, X., Ni, Y., Zhang, K., et al. (2023). [MMMU: A Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark for Expert AGI](https://arxiv.org/abs/2311.16502). arXiv:2311.16502.
3. Zhang, R., Jiang, D., Zhang, Y., et al. (2024). [MathVerse: Does Your Multi-modal LLM Truly See the Diagrams in Visual Math Problems?](https://arxiv.org/abs/2403.14624). arXiv:2403.14624.
4. Yue, X., Zheng, T., Ni, Y., et al. (2024). [MMMU-Pro: A More Robust Multi-discipline Multimodal Understanding Benchmark](https://arxiv.org/abs/2409.02813). arXiv:2409.02813.
5. Meng, F., Du, L., Liu, Z., et al. (2025). [MM-Eureka: Exploring the Frontiers of Multimodal Reasoning with Rule-based Reinforcement Learning](https://arxiv.org/abs/2503.07365). arXiv:2503.07365.
6. Huang, W., Jia, B., Zhai, Z., et al. (2025). [Vision-R1: Incentivizing Reasoning Capability in Multimodal Large Language Models](https://arxiv.org/abs/2503.06749). arXiv:2503.06749.
7. Wang, X., Yang, Z., Feng, C., et al. (2025). [SoTA with Less: MCTS-Guided Sample Selection for Data-Efficient Visual Reasoning Self-Improvement](https://arxiv.org/abs/2504.07934). arXiv:2504.07934.
8. Xia, J., Zang, Y., Gao, P., Li, S., & Zhou, K. (2025). [Visionary-R1: Mitigating Shortcuts in Visual Reasoning with Reinforcement Learning](https://arxiv.org/abs/2505.14677). arXiv:2505.14677.
9. Liu, Z., Sun, Z., Zang, Y., et al. (2025). [Visual-RFT: Visual Reinforcement Fine-Tuning](https://arxiv.org/abs/2503.01785). arXiv:2503.01785.
10. Yu, E., Lin, K., Zhao, L., et al. (2025). [Perception-R1: Pioneering Perception Policy with Reinforcement Learning](https://arxiv.org/abs/2504.07954). arXiv:2504.07954.
11. Zeng, Y., Sai, Z., Wang, Y., et al. (2026). [Towards Scalable RLVR: Multimodal Instruction Following Data Synthesis and Distillation](https://arxiv.org/abs/2609.16059). arXiv:2609.16059.
12. Liu, C., Xiong, T., Chen, Y., & Huang, H. (2026). [Grounding Multimodal Reasoning with Evidence-Ablated Negatives](https://arxiv.org/abs/2610.39237). arXiv:2610.39237.
13. Li, Y., Yan, H., Wang, H., et al. (2026). [UniCAR-RL: Seeing Better before Thinking Deeper in Visual Mathematics](https://arxiv.org/abs/2609.13849). arXiv:2609.13849.
14. Ye, W., Qu, Y., Kumar, A., & Ma, X. (2026). [MIRROR: Learning from the Other View for Multi-Modal Reasoning](https://arxiv.org/abs/2607.21552). arXiv:2607.21552.
15. Yao, J., Wang, Y., Zhang, A., et al. (2026). [Multimodal Reward Hacking in Reinforcement Learning](https://arxiv.org/abs/2607.09492). arXiv:2607.09492.
16. Yang, T., Shi, Y., Sun, R., et al. (2026). [TRON: Targeted Rule-Verifiable Online Environments for Visual Reasoning RL](https://arxiv.org/abs/2606.01599). arXiv:2606.01599.
17. Ahn, K., Lee, S., Gummadi, K. P., & Cha, M. (2026). [GeoX: Mastering Geospatial Reasoning Through Self-Play and Verifiable Rewards](https://arxiv.org/abs/2605.20006). arXiv:2605.20006.
18. Xu, W., Wang, Y., & Zheng, Z. (2026). [RuleForge: Inferring and Instantiating Latent Visual Rules as Executable Programs](https://arxiv.org/abs/2610.38737). arXiv:2610.38737.
19. Chen, S., Guo, Y., Su, Z., et al. (2025). [Advancing Multimodal Reasoning: From Optimized Cold Start to Staged Reinforcement Learning](https://arxiv.org/abs/2506.04207). arXiv:2506.04207.
20. Deng, Y., Bansal, H., Yin, F., et al. (2025). [OpenVLThinker: Complex Vision-Language Reasoning via Iterative SFT-RL Cycles](https://arxiv.org/abs/2503.17352). arXiv:2503.17352.
21. Wang, H., Qu, C., Huang, Z., et al. (2025). [VL-Rethinker: Incentivizing Self-Reflection of Vision-Language Models with Reinforcement Learning](https://arxiv.org/abs/2504.08837). arXiv:2504.08837.
22. Chen, J., Yu, T., Bai, H., et al. (2025). [The Synergy Dilemma of Long-CoT SFT and RL: Investigating Post-Training Techniques for Reasoning VLMs](https://arxiv.org/abs/2507.07562). arXiv:2507.07562.
23. Peng, Lee, et al. (2026). [Be Faithful When Response: Returning Fluent and Grounded Answers for Vision-Language Models Reinforcement Learning](https://arxiv.org/abs/2606.29984). arXiv:2606.29984.
