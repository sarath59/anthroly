---
title: "How Are Creative Writing Benchmarks and Reward Models Built? From TTCW and LitBench to Writing-Zero, Mixed Rewards and Diversity-Aware RL"
description: "A practitioner's guide to how creative writing benchmarks and writing reward models are built for LLM post-training: what TTCW, LAMP, the Writing Quality Benchmark, WritingBench, LitBench and WritingPreferenceBench measure, why scalar reward models and LLM judges fail on subjective quality, how Writing-Zero, RLMR, POLARIS and DARLING build RL rewards for writing, and why expert writers remain the ground truth."
tags:
  - reward-models
  - creative-writing
  - rlhf
  - preference-data
  - evals
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-03T12:50:00.000Z'
updatedAt: '2026-11-03T12:50:00.000Z'
faq:
  - question: "Why is creative writing hard to reward in RL?"
    answer: "There is no ground truth to check, quality is subjective and multi-dimensional, and the cheap signals are misleading. On WritingPreferenceBench (Ying et al., 2025), where paired responses are matched for correctness, factual accuracy and length, sequence-based reward models averaged 52.7% accuracy and zero-shot LLM judges 53.9%, close to chance. Generative reward models that reason before judging reached 81.8%. Scalar rewards also invite reward hacking through length and over-explanation."
  - question: "What are the main creative writing benchmarks?"
    answer: "TTCW (14 binary Torrance-inspired tests applied by creative writers), LAMP (1,057 LLM paragraphs edited by professional writers), the Writing Quality Benchmark (4,729 consolidated writing-quality judgments), WritingBench (6 domains and 100 subdomains with query-specific criteria), LitBench (2,480 debiased human-labeled story comparisons plus 43,827 training pairs), WritingPreferenceBench (1,800 human-annotated pairs in English and Chinese), EQ-Bench's creative writing leaderboard, and diversity benchmarks such as NoveltyBench and Infinity-Chat."
  - question: "Can LLM judges evaluate creative writing?"
    answer: "Only partly. In TTCW, none of the LLMs tested correlated positively with expert assessments. On the Writing Quality Benchmark most strong LLMs barely beat random. On LitBench the best off-the-shelf judge, Claude-3.7-Sonnet, reached 73% agreement with human preferences, while trained Bradley-Terry and generative reward models reached 78%. Spoiler Alert (Sui et al., 2026) reports that LLM judges on EQ-Bench rank zero-shot AI stories above New Yorker short stories."
  - question: "How do labs build reward models for writing?"
    answer: "Common routes are Bradley-Terry models trained on human story preferences (LitBench), edit-based writing quality reward models trained on expert edits (WQRM), pairwise generative reward models guided by writing principles (Writing-Zero), query-specific criteria with a critic model (WritingBench, UniCreative's AC-GenRM), and mixed rewards that combine a writing quality model with hard constraint verification (RLMR). Strong recipes add human-written reference stories as anchors (POLARIS) and diversity rewards (DARLING)."
  - question: "Why does RL make creative writing less diverse?"
    answer: "Policy optimization sharpens the output distribution toward what the reward scores highest, so stories converge. NoveltyBench found current models produce much less diversity than human writers and that larger models in a family are often less diverse. Infinity-Chat documented an Artificial Hivemind effect in which different models produce strikingly similar open-ended outputs. DARLING, DPWriter, MoDA and DivLM add explicit diversity rewards, usually gated by a quality threshold so diversity cannot be bought with bad writing."
  - question: "Do expert writers judge differently from general readers?"
    answer: "Yes. In a preregistered study (Chakrabarty, Ginsburg and Dhillon, 2025), MFA-trained readers strongly disfavored in-context-prompted AI excerpts for quality (odds ratio 0.13), while general readers favored the same AI text for quality (odds ratio 1.82). Who labels the preference data therefore changes what the reward model learns. TTCW, LAMP and WQRM's validation all relied on professional or experienced writers."
  - question: "How does Anthroly help with creative writing evals and reward data?"
    answer: "Anthroly's PhD experts and professional-level writers produce genre-specific rubrics, pairwise preferences with written rationales, expert edits of model drafts, human reference pieces for anchoring, and audits of reward hacking such as length inflation, cliché density and homogenized style. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Creative writing is the hardest common case for reward modeling. There is no answer key, the people who judge quality best disagree with the people who judge it fastest, and the cheapest automatic signals reward exactly the habits that make AI prose recognizable: length, clichés, tidy endings and safe sameness. Yet labs keep investing in it, because writing quality shows up in every chat product and long-form generation is a capability users notice. This post explains how creative writing benchmarks and writing reward models are built, what the 2023-2026 research says about where they fail, and how RL recipes for writing combine subjective rewards, hard constraints and diversity.**

## The short answer

A usable writing reward stack has five layers. **Expert-defined quality criteria**: tests like TTCW or genre rubrics written by working writers, not generic "helpful and engaging" scales. **Human preference or edit data from the right raters**: professional writers for literary quality, matched pairs that control for length and correctness so the model cannot win on surface features (WritingPreferenceBench, LitBench's debiasing). **A reward model that reasons**: generative or pairwise reward models outperform scalar classifiers on subjective quality. **Verifiable constraints alongside the subjective score**: word limits, format, point of view and required elements checked by code, as in RLMR. And **a diversity term with a quality gate**, because optimizing a single reward collapses style. Each layer exists because a previous approach failed without it.

## Why is writing quality so hard to measure?

Three results set the problem.

**Experts and models disagree on what is creative.** [Art or Artifice?](https://arxiv.org/abs/2309.14556) (Chakrabarty et al., 2023) adapted the Torrance Test of Creative Thinking into the **Torrance Test of Creative Writing (TTCW)**: 14 binary tests across Fluency, Flexibility, Originality and Elaboration. Ten creative writers applied it to 48 stories by professionals or LLMs. LLM stories passed 3-10x fewer tests, and none of the LLMs used as assessors correlated positively with the experts.

**Strong reasoning models are weak writing judges.** The **Writing Quality Benchmark** in [AI-Slop to AI-Polish?](https://arxiv.org/abs/2504.07532) (Chakrabarty, Laban and Wu, 2025) consolidates five writing-preference datasets into 4,729 judgments. Most competitive baselines, including state-of-the-art LLMs that excel at reasoning, barely beat random.

**Remove the objective cues and reward models collapse to chance.** [WritingPreferenceBench](https://arxiv.org/abs/2510.14616) (Ying et al., 2025) has 1,800 human-annotated preference pairs (1,200 English, 600 Chinese) across 8 genres, matched for objective correctness, factual accuracy and length. Sequence-based reward models, the standard RLHF architecture, averaged 52.7% accuracy, zero-shot LLM judges 53.9%, and generative reward models that produce explicit reasoning chains 81.8%. Accuracy varied from 18.2% to 81.8% across genres within a single model, and 27B models showed no consistent gain over 8B. The authors' reading: current RLHF reward models mostly learn to detect objective errors, not creativity, style or emotional resonance.

A fourth result explains why this matters for data collection. In a preregistered study, [Chakrabarty, Ginsburg and Dhillon (2025)](https://arxiv.org/abs/2510.13939) compared MFA-trained writers with three frontier models writing up to 450-word excerpts in the styles of 50 award-winning authors. With in-context prompting, 28 MFA-trained readers strongly disfavored the AI text for quality (odds ratio 0.13), while 516 college-educated general readers favored it (odds ratio 1.82). After fine-tuning on each author's complete works, both groups preferred the AI text, with general readers by a wider margin. **The rater pool is part of the reward definition.**

## What do the main benchmarks and datasets contain?

| Resource | Size and source | Ground truth | What it measures |
|---|---|---|---|
| [TTCW](https://arxiv.org/abs/2309.14556) (2023) | 48 stories, professional and LLM | 10 creative writers, 14 binary tests | Creativity as a product |
| [LAMP](https://arxiv.org/abs/2409.14509) (2024) | 1,057 LLM paragraphs | Edits by professional writers under a 7-category idiosyncrasy taxonomy | What experts change in AI prose |
| [Writing Quality Benchmark](https://arxiv.org/abs/2504.07532) (2025) | 4,729 judgments from 5 datasets | Consolidated human preferences | Writing quality assessment |
| [WritingBench](https://arxiv.org/abs/2503.05244) (2025) | 6 domains, 100 subdomains | Query-dependent criteria plus a fine-tuned critic | Broad generative writing |
| [LitBench](https://arxiv.org/abs/2507.00769) (2025) | 2,480 test and 43,827 training story pairs from Reddit | Debiased human preference labels | Creative writing verification |
| [WritingPreferenceBench](https://arxiv.org/abs/2510.14616) (2025) | 1,800 pairs, 8 genres, English and Chinese | Human annotation with objective cues matched | Subjective preference without shortcuts |
| [NoveltyBench](https://arxiv.org/abs/2504.05228) (2025) | Diversity-eliciting prompts and real queries | Distinctness and quality of multiple outputs | Mode collapse |
| [Infinity-Chat](https://arxiv.org/abs/2510.22954) (2025) | 26K open-ended queries | 31,250 human annotations, 25 per example | Homogeneity across models, pluralistic preferences |
| [DramaBench](https://arxiv.org/abs/2512.19012) (2025) | 1,103 scripts | Rule-based analysis plus LLM labels, human validation on 188 | Six dimensions of script continuation |

Three construction lessons stand out.

**Use writers, and give them a taxonomy.** LAMP's professional writers agreed on recurring problems in LLM text and formalized them into seven categories, such as clichés and unnecessary exposition. That turns "this feels like AI" into labels you can train on.

**Debias pairs before you trust them.** LitBench calls its test set debiased and WritingPreferenceBench matches pairs on length and correctness. Without this, a reward model can score well by preferring the longer or cleaner response.

**Generate criteria per prompt.** WritingBench's query-dependent framework has an LLM generate instance-specific assessment criteria, then scores with a fine-tuned critic. A sonnet and a product description should not share a rubric.

## How are writing reward models trained?

The base case is a **Bradley-Terry** model on preference pairs. With chosen story $y_w$ and rejected story $y_l$ for prompt $x$, a scalar reward $r_\theta$ is trained to minimize

$$
\mathcal{L}_{\text{BT}} = - \log \sigma\big(r_\theta(x, y_w) - r_\theta(x, y_l)\big)
$$

LitBench trained both Bradley-Terry and generative reward models on its 43,827 pairs. Both reached 78% accuracy, beating the best off-the-shelf judge (Claude-3.7-Sonnet at 73%), and an online human study confirmed their rankings on new LLM-generated stories. On data with objective cues removed, though, WritingPreferenceBench shows scalar models falling toward chance while generative reward models hold up.

The 2025-2026 alternatives:

| Approach | Reward signal | Key idea |
|---|---|---|
| [WQRM](https://arxiv.org/abs/2504.07532) (2025) | Writing Quality Reward Model trained on edit-based data | Expert edits define better versus worse; 74% on WQ; selection preferred by 9 experienced writers 66% overall, 72.2% when the reward gap exceeds 1 point |
| [Writing-Zero](https://arxiv.org/abs/2506.00103) (2025) | Pairwise generative reward model with writing principles | Self-principled critique turns subjective judgment into a verifiable-style reward; BRPO uses a bootstrapped in-group response as the reference |
| [RLMR](https://arxiv.org/abs/2508.18642) (2025) | Writing reward model plus constraint verification model | Constraint weight adapts within each group so constraint violations get negative advantage |
| [UniCreative](https://arxiv.org/abs/2604.05517) (2026) | AC-GenRM, adaptive constraint-aware generative reward model | Query-specific criteria, reference-free, no SFT |
| [POLARIS](https://arxiv.org/abs/2606.04095) (2026) | Frontier LLM judge with a structured Story Quality rubric | A human-written story is injected into each GRPO group as a high-reward anchor |
| [VMR-RLVR](https://arxiv.org/abs/2511.02463) (2025) | Verifiable multiple-choice reformulation of open-ended data | Turns open-ended training into checkable choices |

**Pairwise beats pointwise for subjective quality.** Writing-Zero reports that scalar baselines suffer from reward hacking such as over-explanation and length bias, and that its pairwise generative reward model shows strong resistance to it. A pairwise judge only has to answer "which is better", which is easier and more stable than assigning an absolute score to a story.

**Anchor the reward to human writing.** POLARIS trained Qwen3.5-9B on about 1.4K prompt-story pairs from 100 short-story anthologies using 4 A100 GPUs. Each GRPO group includes a teacher-forced human-written story as a high-reward anchor. The resulting model is competitive with much larger open models, follows length instructions more closely, and in blinded human evaluation was preferred to its base model and on par with Qwen3.5-27B.

**Learn from edits, not just choices.** WQRM's edit-based data captures what an expert would change, which carries more information than which of two drafts they prefer.

## How do you combine subjective quality with hard constraints?

Users ask for "a 300-word story in second person, no dialogue, ending on a question". Those constraints are verifiable, the quality is not. [RLMR](https://arxiv.org/abs/2508.18642) (Liao et al., 2025) found that single rewards do not improve both, and fixed-weight mixtures do not adapt to different writing scenarios. Its fix adjusts the constraint weight dynamically within each GRPO group so constraint-violating samples always receive negative advantage. It improved IFEval from 83.36% to 86.65% and reached a 72.75% win rate in expert pairwise evaluation on its WriteEval benchmark.

A simple way to express the same principle is a gated reward, where $q(x,y) \in [0,1]$ is a writing quality score and $c_k(x,y) \in \{0,1\}$ are constraint checks:

$$
r(x, y) = \begin{cases} q(x, y) & \text{if } \prod_{k} c_k(x, y) = 1 \\ q(x, y) - \lambda & \text{otherwise} \end{cases}
$$

with $\lambda$ large enough that a beautiful story which ignores the word limit still loses to an adequate one that respects it. This is a simplification of the idea, not RLMR's exact formula.

## Why does RL make writing more uniform, and what fixes it?

Policy optimization sharpens the output distribution toward the highest-scoring style. In creative work this shows up as mode collapse.

- [NoveltyBench](https://arxiv.org/abs/2504.05228) (Zhang et al., 2025) evaluated 20 leading models and found they generate significantly less diversity than human writers, with larger models in a family often less diverse than smaller ones.
- [Infinity-Chat](https://arxiv.org/abs/2510.22954) (Jiang et al., 2025) documented an **Artificial Hivemind**: a single model repeats itself, and different models produce strikingly similar outputs. Reward models and LLM judges were less calibrated to human ratings on generations where annotators had idiosyncratic preferences.
- [Antislop](https://arxiv.org/abs/2510.15061) (Paech et al., 2025) found some slop patterns appear over 1,000x more often in LLM output than in human text. Its token-level FTPO method cut slop by 90% while maintaining or improving cross-domain evals, whereas DPO degraded writing quality and lexical diversity.

The fixes add an explicit diversity term, usually only for responses that clear a quality bar.

| Method | Diversity signal | Reported effect |
|---|---|---|
| [DARLING](https://arxiv.org/abs/2509.02534) (2025) | Learned partition function for semantic diversity, combined with quality reward in online RL | Outperforms quality-only RL on five non-verifiable benchmarks; higher pass@1 and pass@k on competition math |
| [DPWriter](https://arxiv.org/abs/2601.09609) (2026) | Diverse Planning Branching plus a group-aware diversity reward | More diverse outputs without quality loss |
| [MoDA](https://arxiv.org/abs/2609.14896) (2026) | Role-conditioned agents rewarded for distinct outputs, with prompt-adaptive quality gating | SBERT diversity up 265% on Infinity-Chat held-out prompts while general pass@1 rose 10.3% over Qwen3-8B |
| [DivLM](https://arxiv.org/abs/2610.06729) (2026) | Composite reward over genre, tone, style and named entities | Diversity metrics up more than 9% on average |
| [CrPO](https://arxiv.org/abs/2505.14442) (2025) | Multiple creativity dimensions in preference optimization, MuCE dataset of 200,000+ human responses | More novel, diverse and surprising outputs at maintained quality |

MoDA's quality gating names the reason the gate exists: without it, diversity rewards invite reward hacking that compromises quality.

## What does a writing reward function look like?

A sketch of a group-level reward that combines the three signals. It is illustrative, not a specific paper's implementation.

```python
import re
import numpy as np

def constraints_ok(prompt_spec: dict, story: str) -> bool:
    words = len(story.split())
    if "max_words" in prompt_spec and words > prompt_spec["max_words"]:
        return False
    if prompt_spec.get("no_dialogue") and re.search(r'["\u201c\u201d]', story):
        return False
    for phrase in prompt_spec.get("must_include", []):
        if phrase.lower() not in story.lower():
            return False
    return True

def group_rewards(prompt_spec, stories, pairwise_judge, embed,
                  penalty=1.0, q_gate=0.5, div_weight=0.2):
    n = len(stories)
    # 1) Pairwise quality: win rate of each story against the rest of the group.
    wins = np.zeros(n)
    for i in range(n):
        for j in range(n):
            if i != j and pairwise_judge(prompt_spec["prompt"], stories[i], stories[j]) == "A":
                wins[i] += 1
    quality = wins / max(n - 1, 1)
    # 2) Diversity: mean cosine distance to the other stories in the group.
    E = np.stack([embed(s) for s in stories])
    E = E / np.linalg.norm(E, axis=1, keepdims=True)
    sim = E @ E.T
    diversity = 1 - (sim.sum(axis=1) - 1) / max(n - 1, 1)
    # 3) Gate diversity on quality; hard-penalize constraint violations.
    rewards = []
    for i, s in enumerate(stories):
        r = quality[i] + (div_weight * diversity[i] if quality[i] >= q_gate else 0.0)
        if not constraints_ok(prompt_spec, s):
            r -= penalty
        rewards.append(float(r))
    return rewards
```

In production the judge should see stories in both orders to cancel position bias, and the embedding should capture plot and style rather than surface wording.

## How should you validate a writing benchmark or reward model?

1. **Hold out human-labeled pairs from the target genre and rater pool.** WritingPreferenceBench's genre spread of 18.2% to 81.8% shows that a single average hides failures.
2. **Control for length and correctness** in the validation pairs, or you are measuring shortcuts.
3. **Include strong human writing.** [Spoiler Alert](https://arxiv.org/abs/2604.09854) (Sui et al., 2026) reports that on EQ-Bench, the leading creative-writing benchmark, LLM judges rank zero-shot AI stories above New Yorker short stories. Its 100-Endings metric, which measures narrative tension as how often a model fails to predict the ending sentence by sentence, ranks the New Yorker stories far above LLM outputs. A judge that cannot rank a canonical human story above an average AI one is not ready to be a reward.
4. **Run a human study on the policy's outputs**, as LitBench and WQRM did, since reward models are tested on new distributions once RL starts.
5. **Track diversity and slop metrics** across checkpoints, not only quality.
6. **Test length generalization.** POLARIS argues that stories longer than training length are a useful stress test; its model held quality on prompts up to 3 times its 4k-word training length.

## Where does expert human data matter?

More than in almost any other post-training domain. The defining datasets here were built by writers: TTCW's 10 creative writers, LAMP's professional editors, WQRM's 9 experienced writers in validation, the MFA readers whose preferences diverged sharply from general readers. Expert judgment supplies four things automated pipelines lack: criteria that separate craft from polish, edits that show the better version rather than just pick one, reference pieces strong enough to anchor a reward (POLARIS's anthology stories), and adversarial review that spots the reward model's blind spots, such as long-but-empty prose, cliché clusters or the same story told with different names.

Synthetic reasoning traces can help too. [REER](https://arxiv.org/abs/2509.06160) (Wang et al., 2025) works backwards from known-good writing to recover plausible reasoning, producing DeepWriting-20K, and [R2-Write](https://arxiv.org/abs/2604.03004) (Liu et al., 2026) synthesizes reflection-and-revision trajectories with a process reward on reflection quality. Both start from good writing someone had to produce or select.

## How Anthroly can help

Anthroly works with PhD experts and professional-level writers across genres who write genre-specific rubrics, produce pairwise preferences with written rationales, edit model drafts to show the better version, supply human reference pieces for reward anchoring, and audit RL runs for length inflation, slop patterns and homogenized style. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are training a writing reward model or building a creative writing eval and want expert judgment you can trust, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [Generative reward models vs. scalar reward models](/blog/generative-reward-models-vs-scalar-reward-models)
- [Why does RLHF make models verbose? Length bias in reward models](/blog/why-does-rlhf-make-models-verbose-length-bias)
- [Annotator disagreement in preference data](/blog/annotator-disagreement-in-preference-data)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [Why does entropy collapse in RL for reasoning models?](/blog/why-does-entropy-collapse-in-rl-for-reasoning-models)
- [How are instruction-following benchmarks and rewards built?](/blog/how-are-instruction-following-benchmarks-and-rewards-built)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)

---

## References

1. Chakrabarty, T., Laban, P., Agarwal, D., Muresan, S., & Wu, C.-S. (2023). [Art or Artifice? Large Language Models and the False Promise of Creativity](https://arxiv.org/abs/2309.14556). arXiv:2309.14556.
2. Chakrabarty, T., Laban, P., & Wu, C.-S. (2024). [Can AI writing be salvaged? Mitigating Idiosyncrasies and Improving Human-AI Alignment in the Writing Process through Edits](https://arxiv.org/abs/2409.14509). arXiv:2409.14509.
3. Wu, Y., Mei, J., Yan, M., et al. (2025). [WritingBench: A Comprehensive Benchmark for Generative Writing](https://arxiv.org/abs/2503.05244). arXiv:2503.05244.
4. Zhang, Y., Diddee, H., Holm, S., et al. (2025). [NoveltyBench: Evaluating Language Models for Humanlike Diversity](https://arxiv.org/abs/2504.05228). arXiv:2504.05228.
5. Chakrabarty, T., Laban, P., & Wu, C.-S. (2025). [AI-Slop to AI-Polish? Aligning Language Models through Edit-Based Writing Rewards and Test-time Computation](https://arxiv.org/abs/2504.07532). arXiv:2504.07532.
6. Ismayilzada, M., Laverghetta, A., Luchini, S. A., et al. (2025). [Creative Preference Optimization](https://arxiv.org/abs/2505.14442). arXiv:2505.14442.
7. Jia, R., Yang, Y., Gai, Y., et al. (2025). [Writing-Zero: Bridge the Gap Between Non-verifiable Tasks and Verifiable Rewards](https://arxiv.org/abs/2506.00103). arXiv:2506.00103.
8. Fein, D., Russo, S., Xiang, V., Jolly, K., Rafailov, R., & Haber, N. (2025). [LitBench: A Benchmark and Dataset for Reliable Evaluation of Creative Writing](https://arxiv.org/abs/2507.00769). arXiv:2507.00769.
9. Liao, J., Zhang, T., Feng, X., et al. (2025). [RLMR: Reinforcement Learning with Mixed Rewards for Creative Writing](https://arxiv.org/abs/2508.18642). arXiv:2508.18642.
10. Li, T., Zhang, Y., Yu, P., et al. (2025). [Jointly Reinforcing Diversity and Quality in Language Model Generations](https://arxiv.org/abs/2509.02534). arXiv:2509.02534.
11. Wang, H., Que, H., Xu, Q., et al. (2025). [Reverse-Engineered Reasoning for Open-Ended Generation](https://arxiv.org/abs/2509.06160). arXiv:2509.06160.
12. Chakrabarty, T., Ginsburg, J. C., & Dhillon, P. (2025). [Readers Prefer Outputs of AI Trained on Copyrighted Books over Expert Human Writers](https://arxiv.org/abs/2510.13939). arXiv:2510.13939.
13. Ying, S., Li, Y., Qu, X., et al. (2025). [Beyond Correctness: Evaluating Subjective Writing Preferences Across Cultures](https://arxiv.org/abs/2510.14616). arXiv:2510.14616.
14. Paech, S., Roush, A., Goldfeder, J., & Shwartz-Ziv, R. (2025). [Antislop: A Comprehensive Framework for Identifying and Eliminating Repetitive Patterns in Language Models](https://arxiv.org/abs/2510.15061). arXiv:2510.15061.
15. Jiang, L., Chai, Y., Li, M., et al. (2025). [Artificial Hivemind: The Open-Ended Homogeneity of Language Models (and Beyond)](https://arxiv.org/abs/2510.22954). arXiv:2510.22954.
16. Zhang, M., Ding, S., Yin, W., Sun, Y., & Wu, H. (2025). [Extending RLVR to Open-Ended Tasks via Verifiable Multiple-Choice Reformulation](https://arxiv.org/abs/2511.02463). arXiv:2511.02463.
17. Ma, S., Huang, Y., & Lin, Y. (2025). [DramaBench: A Six-Dimensional Evaluation Framework for Drama Script Continuation](https://arxiv.org/abs/2512.19012). arXiv:2512.19012.
18. Cao, Q., Liu, Y., Bi, W., et al. (2026). [DPWriter: Reinforcement Learning with Diverse Planning Branching for Creative Writing](https://arxiv.org/abs/2601.09609). arXiv:2601.09609.
19. Liu, W., Zhang, B., Li, C., et al. (2026). [R2-Write: Reflection and Revision for Open-Ended Writing with Deep Reasoning](https://arxiv.org/abs/2604.03004). arXiv:2604.03004.
20. Wei, X., Zhu, Z., Niu, S., et al. (2026). [UniCreative: Unifying Long-form Logic and Short-form Sparkle via Reference-Free Reinforcement Learning](https://arxiv.org/abs/2604.05517). arXiv:2604.05517.
21. Sui, P., Zhu, Y., Cheng, T., et al. (2026). [Spoiler Alert: Narrative Forecasting as a Metric for Tension in LLM Storytelling](https://arxiv.org/abs/2604.09854). arXiv:2604.09854.
22. Rajendhran, R., Russell, J., Iyyer, M., & Wieting, J. F. (2026). [POLARIS: Guiding Small Models to Write Long Stories](https://arxiv.org/abs/2606.04095). arXiv:2606.04095.
23. Yuan, J., Kang, H., Liu, J. J., et al. (2026). [Forty Shades of Blue: Quality-Diversity Alignment via Mode-Conditioned Reinforcement Learning](https://arxiv.org/abs/2609.14896). arXiv:2609.14896.
24. Solati Dehkordi, Z., & Lampos, V. (2026). [Improving Diversity in LLM Short Story Generation](https://arxiv.org/abs/2610.06729). arXiv:2610.06729.
