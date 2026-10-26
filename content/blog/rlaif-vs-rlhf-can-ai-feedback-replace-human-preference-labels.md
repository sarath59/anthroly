---
title: "RLAIF vs RLHF: Can AI Feedback Replace Human Preference Labels?"
description: "RLAIF often matches RLHF on the metrics papers report, but much of that evidence is measured by AI judges, depends on a teacher-critic capability gap, and inherits systematic judge biases that more data cannot average away. Here is what the evidence actually shows, the math of why correlated judge errors are worse than noisy human labels, and a hybrid pipeline for deciding where human and expert labels still pay for themselves."
tags:
  - rlaif
  - rlhf
  - preference-data
  - reward-models
  - llm-as-a-judge
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-26T12:30:00.000Z'
updatedAt: '2026-10-26T12:30:00.000Z'
faq:
  - question: "What is the difference between RLAIF and RLHF?"
    answer: "Both train a policy with reinforcement learning against a reward signal learned from preferences. In RLHF the preference labels come from people; in RLAIF (reinforcement learning from AI feedback) they come from a language model, usually prompted with a set of principles or a rubric. Bai et al. (2022) introduced the term with Constitutional AI, where the only human oversight for harmlessness was a written list of principles. Variants such as direct-RLAIF skip the reward model and score samples with an off-the-shelf LLM during RL."
  - question: "Is RLAIF as good as RLHF?"
    answer: "On the tasks it has been tested on, often yes. Lee et al. (2023) found RLAIF achieved comparable performance to RLHF on summarization, helpful dialogue and harmless dialogue. But Sharma et al. (2024) showed that much of the reported gain from the RL step in popular RLAIF pipelines comes from using a weaker teacher for SFT than the critic used for feedback, and that simple SFT on GPT-4 outputs outperformed those pipelines. Many self-improvement results are also measured on benchmarks that are themselves judged by LLMs."
  - question: "Why can't you just use more AI-labeled preference data to fix label quality?"
    answer: "Because AI judge errors are mostly systematic rather than random. Random, independent label flips shrink the preference signal but leave its ranking intact, so more data recovers the true ordering. A judge that consistently prefers longer, more confident, or self-similar answers adds a biased feature to the learned reward, and more data only makes the reward model learn that bias more precisely. Zheng et al. (2023), Wang et al. (2023) and Panickssery et al. (2024) document position, verbosity and self-preference biases of this kind."
  - question: "How much human preference data do you still need with RLAIF?"
    answer: "Less than full annotation, but not zero, and the human labels should be targeted. RLTHF (Xu et al., 2025) reported reaching full-human-annotation-level alignment on HH-RLHF and TL;DR with 6-7% of the human annotation effort, by sending only the samples an AI labeler likely got wrong to humans. HelpSteer2 (Wang et al., 2024) trained a reward model that scored 92.0% on RewardBench's primary dataset from about ten thousand human-labeled response pairs."
  - question: "When should you use expert labels instead of an LLM judge?"
    answer: "When the judge is not clearly stronger than the policy in the domain being trained, when correctness requires specialist knowledge, when you are building the held-out set used to evaluate the trained policy, and when you are writing the constitution, rubric or rules the AI labeler applies. In each case an AI judge would be grading at or below its own capability frontier, which is where its errors are hardest to detect."
  - question: "How does Anthroly help with RLAIF pipelines?"
    answer: "Anthroly supplies the human layer an RLAIF pipeline still needs: expert-written principles and rubrics, calibration sets that measure an AI judge's biases, adjudication of the pairs the judge is most likely to get wrong, and held-out expert-rated evaluation sets. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready to commit."
draft: false
---

**RLAIF is no longer an experiment. Constitutional AI, UltraFeedback, Tulu 3's preference data and OpenAI's rule-based rewards all put an AI labeler where a human rater used to sit, and the headline results say the swap costs little. The careful reading is more interesting: AI feedback is very good at producing volume, measurably worse at being independent of the thing it is grading, and the places where it fails are exactly the places a frontier lab cares about most. This post goes through the evidence, the math of why judge bias does not wash out, and a concrete hybrid pipeline.**

## The short answer

AI feedback can replace most *routine* human preference labeling. It cannot yet replace the human or expert labels that (1) write the principles the AI labeler applies, (2) measure that labeler's biases, (3) resolve the hard cases where it is wrong, and (4) evaluate the final policy independently of any AI judge. Teams that get value from RLAIF shrink human labeling to those four jobs. Teams that get burned drop all four.

## What counts as RLAIF?

The term covers several different pipelines, and they fail differently.

| Approach | Where AI feedback enters | Human input that remains |
|---|---|---|
| Constitutional AI ([Bai et al., 2022](https://arxiv.org/abs/2212.08073)) | Self-critique and revision for SFT; AI preference labels train the preference model for RL | A written list of principles |
| RLAIF and direct-RLAIF ([Lee et al., 2023](https://arxiv.org/abs/2309.00267)) | Off-the-shelf LLM labels pairs for an RM, or scores samples directly during RL | Task prompts, evaluation |
| UltraFeedback-style data ([Cui et al., 2023](https://arxiv.org/abs/2310.01377); [Lambert et al., 2024](https://arxiv.org/abs/2411.15124)) | A strong judge rates several responses per prompt on multiple aspects | Prompt selection, rating templates |
| Self-rewarding and meta-rewarding ([Yuan et al., 2024](https://arxiv.org/abs/2401.10020); [Wu et al., 2024](https://arxiv.org/abs/2407.19594)) | The policy judges its own samples, and in meta-rewarding also judges its own judgments | Seed data, evaluation |
| Rule-based rewards ([Mu et al., 2024](https://arxiv.org/abs/2411.01111)) | An LLM grader scores fine-grained, composable rules used directly as reward | The rules and a small amount of human data |
| Deliberative alignment ([Guan et al., 2024](https://arxiv.org/abs/2412.16339)) | The model is trained to recall and reason over a written specification | The specification |

Two things stand out. First, every row still has a human artifact at its root: a constitution, rules, a specification, a rating template, or a prompt set. Second, the AI labeler gets more and more entangled with the policy as you move down the table, which matters for the bias argument below.

## What does the evidence in favour of RLAIF actually show?

The positive results are real.

- **Parity on classic tasks.** [Lee et al. (2023)](https://arxiv.org/abs/2309.00267) report that RLAIF achieves comparable performance to RLHF on summarization, helpful dialogue and harmless dialogue, that RLAIF beats an SFT baseline even when the AI labeler is the same size as the policy or the same checkpoint, and that direct-RLAIF, which skips reward-model training, did better than canonical RLAIF.
- **Harmlessness with almost no harm labels.** Constitutional AI trained a harmless but non-evasive assistant without any human labels identifying harmful outputs; the only human oversight for that part was the list of principles ([Bai et al., 2022](https://arxiv.org/abs/2212.08073)).
- **Precise behavioural control.** OpenAI's rule-based rewards reached an F1 of 97.1 on safety behaviour versus 91.7 for a human-feedback baseline, using composable LLM-graded rules and only a small amount of human data ([Mu et al., 2024](https://arxiv.org/abs/2411.01111)).
- **Scale.** UltraFeedback contains over 1 million GPT-4 feedback annotations for 250k conversations ([Cui et al., 2023](https://arxiv.org/abs/2310.01377)). Tulu 3 built its preference data by sampling four responses per prompt, including on-policy completions, and having GPT-4o rate each from 1 to 5 on helpfulness, instruction-following, honesty and truthfulness ([Lambert et al., 2024](https://arxiv.org/abs/2411.15124)).
- **Synthetic pairs can stand in for human pairs.** West-of-N, which builds pairs by taking the best and worst of a pool of on-policy samples, improved reward models by an amount comparable to adding a similar quantity of human preference data ([Pace et al., 2024](https://arxiv.org/abs/2401.12086)).

If your question is "can I get a working preference pipeline without paying for a million human comparisons?", the answer is clearly yes.

## Why the evidence is weaker than it looks

Three problems show up when you read the papers closely.

### 1. Gains often come from a teacher-critic gap, not from the feedback

[Sharma et al. (2024)](https://arxiv.org/abs/2402.12366) asked whether the RL step in popular RLAIF pipelines is earning its keep. Their finding: the improvement from RL with AI feedback was almost entirely explained by the common practice of using a weaker model (for example GPT-3.5) to write SFT demonstrations and a stronger one (for example GPT-4) as the critic. Simple SFT on GPT-4 demonstrations outperformed the existing RLAIF pipelines. They identify two conditions needed for RLAIF to clearly beat SFT: a sufficiently strong base model, and a capability mismatch between the SFT teacher and the critic. Gains also varied substantially across base model families, evaluation protocols and critics.

The practical reading: before crediting AI feedback for an improvement, check what SFT on the critic's own outputs would have done.

### 2. Circular evaluation

Self-rewarding training of Llama 2 70B produced a model that outperformed Claude 2, Gemini Pro and GPT-4 0613 on AlpacaEval 2.0 ([Yuan et al., 2024](https://arxiv.org/abs/2401.10020)). Meta-rewarding moved Llama-3-8B-Instruct from 22.9% to 39.4% on AlpacaEval 2 and from 20.6% to 29.1% on Arena-Hard ([Wu et al., 2024](https://arxiv.org/abs/2407.19594)). These are genuine improvements on those benchmarks, but both benchmarks are scored by an LLM judge. When the training signal and the evaluation signal are both LLM preferences, shared biases can register as progress. AlpacaEval itself added a length-controlled variant because its judge favoured longer outputs ([Dubois et al., 2024](https://arxiv.org/abs/2404.04475)).

### 3. Judges have systematic biases

The documented ones are not subtle:

- **Position.** With ChatGPT as the evaluator, simply reordering responses let Vicuna-13B beat ChatGPT on 66 of 80 queries ([Wang et al., 2023](https://arxiv.org/abs/2305.17926)).
- **Verbosity and self-enhancement.** [Zheng et al. (2023)](https://arxiv.org/abs/2306.05685) document both, while also finding GPT-4 judges agreed with human preferences over 80% of the time, about the level of human-human agreement.
- **Self-preference.** LLMs can recognise their own outputs at non-trivial rates, and in fine-tuning experiments self-recognition ability correlated linearly with the strength of self-preference bias ([Panickssery et al., 2024](https://arxiv.org/abs/2404.13076)). This is the bias most relevant to self-rewarding loops.

Humans are not bias-free either. [Sharma et al. (2023)](https://arxiv.org/abs/2310.13548) found that both humans and preference models prefer convincingly written sycophantic responses over correct ones a non-negligible fraction of the time. The difference is structural, and it is the core of the argument for keeping humans in the loop.

## Why correlated judge errors are worse than noisy human labels

Model a preference label with a Bradley-Terry reward model. For a pair $(y_1, y_2)$ with true rewards $r_1, r_2$, write $\Delta = r_1 - r_2$ and let $\sigma$ be the logistic function.

**Case A: random noise.** Each label is flipped independently with probability $\epsilon < 0.5$, as with a careless but unbiased rater pool. The probability of observing $y_1 \succ y_2$ is

$$
P(y_1 \succ y_2) = (1 - 2\epsilon)\,\sigma(\Delta) + \epsilon .
$$

This is still strictly increasing in $\Delta$. The signal is attenuated, so you need more data, but the ordering is preserved. More labels, or a few overlapping labels per pair, recover the true ranking.

**Case B: systematic bias.** The judge's preference depends on a feature $f$ that is not quality, such as length, confidence, formatting, or similarity to its own style:

$$
P(y_1 \succ y_2) = \sigma\big(\Delta + \beta\,(f_1 - f_2)\big).
$$

A reward model fit to these labels converges toward $r + \beta f$, not $r$. Adding data makes it learn $\beta f$ *more* accurately. Then RL optimises the policy against that reward, and the policy finds it cheaper to increase $f$ than to increase $r$. This is the mechanism behind length exploitation, and a concrete instance of the proxy-versus-gold divergence that [Gao et al. (2022)](https://arxiv.org/abs/2210.10760) measured as reward overoptimization: the danger is greatest when the proxy's error is correlated with something the policy can cheaply change.

Two consequences matter in practice:

1. **Volume is not a substitute for independence.** A million labels from one judge are, for the purpose of bias, closer to one opinion repeated a million times than to a million opinions.
2. **You can only estimate $\beta$ with labels that do not share the bias.** That is the irreducible job of a human or expert calibration set.

## Where human and expert labels still pay for themselves

Recent hybrid work points to the same four roles.

**Writing the specification.** Constitutional AI, Collective Constitutional AI ([Huang et al., 2024](https://arxiv.org/abs/2406.07814)), rule-based rewards and deliberative alignment all move human effort from labeling pairs to writing principles, rules and specs. Constitutional Classifiers likewise train safeguards on synthetic data generated from a natural-language constitution ([Sharma et al., 2025](https://arxiv.org/abs/2501.18837)). The quality ceiling of the AI labels is set by the quality of that document, and writing a good one for chemistry, law or clinical medicine is expert work.

**Finding and fixing the hard tail.** RLTHF uses a reward model's score distribution to identify the samples an LLM labeler most likely got wrong, sends those to humans, and reports full-human-annotation-level alignment on HH-RLHF and TL;DR with only 6-7% of the human annotation effort ([Xu et al., 2025](https://arxiv.org/abs/2502.13417)). Skywork-Reward-V2 curated a 40-million-pair preference dataset with a two-stage human-AI pipeline in which humans provide verified annotations and LLMs curate at scale under human guidance; its ablations attribute the gains to curation quality as well as scale ([Liu et al., 2025](https://arxiv.org/abs/2507.01352)).

**Small, high-quality human sets.** HelpSteer2 has only about ten thousand human-labeled response pairs, an order of magnitude fewer than HH-RLHF, and a reward model trained on it reached 92.0% on RewardBench's primary dataset at release ([Wang et al., 2024](https://arxiv.org/abs/2406.08673)).

**Independent evaluation.** Whatever trains the policy should not be the only thing that evaluates it. A held-out, human- or expert-rated set breaks the circularity described above.

A useful rule of thumb follows from Sharma et al.'s conditions: AI feedback adds value when the judge is clearly stronger than the policy *in the domain at hand*. At the frontier, in PhD-level domains, that is often not true, because no available judge is much stronger than the model you are training. Expert labels are then the only signal above the policy's own ceiling.

## How should you split the labeling budget?

| Situation | Suggested split | Why |
|---|---|---|
| General chat helpfulness, judge much stronger than policy | Mostly AI labels; human calibration set and spot audits | The judge is a reasonable proxy; you mainly need to measure its biases |
| Safety behaviour with clear written policies | Rule-based or constitution-driven AI grading; humans write and revise rules | Rules are easier to audit and update than thousands of pair labels |
| Specialist domains (medicine, law, advanced science) | Expert-written rubrics; expert labels on disagreements and a gold set; AI labels only where validated | The judge is near or below the policy's level, so its errors are hard to see |
| Verifiable tasks (math with answers, code with tests) | Programmatic verifiers; experts audit the verifier | Preference labels are the wrong tool when correctness can be checked |
| Final evaluation of any of the above | Human or expert raters, blind to which model produced what | Prevents the training judge from grading its own influence |

## A practical hybrid pipeline

1. **Write the principles or rubric with domain experts**, version it, and keep a log of the ambiguous cases it fails to settle.
2. **Build a calibration set** of a few hundred pairs labeled by experts, deliberately including pairs where length, confidence or style point the opposite way from quality.
3. **Measure the judge on that set**: agreement, position consistency (score both orders), and the bias coefficient on suspect features.
4. **Label at scale with the judge**, scoring both orders and discarding or routing order-inconsistent pairs.
5. **Route the hard tail to experts**: pairs where the judge is order-inconsistent, where an ensemble of judges disagrees, or where a reward model trained on the AI labels is least confident, in the spirit of RLTHF.
6. **Train, then evaluate on a held-out expert-rated set** the judge never saw, alongside any LLM-judged benchmarks.

Step 3 takes a few lines. Fit a logistic regression of the judge's choice on the expert's choice plus the features you suspect:

```python
import numpy as np
from sklearn.linear_model import LogisticRegression

# One row per calibration pair, with features oriented as (response A minus response B).
# expert_pref: 1 if experts preferred A, else 0
# judge_pref:  1 if the judge preferred A, else 0
X = np.column_stack([
    2 * expert_pref - 1,                 # quality signal from experts (+1 / -1)
    np.log(len_a) - np.log(len_b),       # length difference
    shown_first_is_a.astype(float),      # position
    judge_family_overlap_a - judge_family_overlap_b,  # e.g. same model family as judge
])
model = LogisticRegression().fit(X, judge_pref)
for name, coef in zip(["quality", "log_len", "position", "self_family"], model.coef_[0]):
    print(f"{name:12s} {coef:+.2f}")
```

If the length, position or self-family coefficients are large relative to the quality coefficient, the judge is injecting the $\beta f$ term from the model above. You then have three options: fix the judge prompt, debias with order-swapping and length-matched comparisons, or send that slice to experts.

## What teams get wrong

- **Counting labels instead of independent opinions.** Two judges from the same model family share biases; they are not an ensemble in the statistical sense.
- **Evaluating with the training judge.** If the same judge family produced the preference data and grades the benchmark, improvements are partly the judge agreeing with itself.
- **Skipping the SFT baseline.** Without "SFT on the critic's outputs" as a control, you cannot tell whether AI feedback did anything.
- **Treating the constitution as boilerplate.** It is the actual label specification. Vague principles produce labels that track the judge's defaults.
- **Assuming the judge is stronger than the policy.** This should be measured on expert-labeled pairs in the target domain, not assumed from general benchmarks.

## How Anthroly can help

RLAIF does not remove the need for human data; it concentrates it into fewer, harder, higher-leverage labels. Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready to commit, does exactly that work: writing domain principles and rubrics, building bias-probing calibration sets, adjudicating the pairs an AI judge is most likely to get wrong, and producing held-out expert-rated evaluation sets that are independent of your training judge.

If you are deciding how much of your preference pipeline to hand to an AI labeler, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can help you size the human layer.

## Related reading

- [Synthetic data vs expert human data for post-training](/blog/synthetic-data-vs-expert-human-data)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How many expert labels fix noisy preference data?](/blog/how-many-expert-labels-fix-noisy-preference-data)
- [Generative vs scalar reward models](/blog/generative-reward-models-vs-scalar-reward-models)
- [Why does RLHF make models verbose?](/blog/why-does-rlhf-make-models-verbose-length-bias)
- [Glossary: RLAIF](/research/glossary#rlaif)
- [Synthetic vs human preference data](/research/compare/synthetic-vs-human-preference-data)

---

## References

1. Bai, Y., Kadavath, S., Kundu, S., et al. (2022). [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073). arXiv:2212.08073.

2. Lee, H., Phatale, S., Mansoor, H., et al. (2023). [RLAIF vs. RLHF: Scaling Reinforcement Learning from Human Feedback with AI Feedback](https://arxiv.org/abs/2309.00267). arXiv:2309.00267.

3. Sharma, A., Keh, S., Mitchell, E., et al. (2024). [A Critical Evaluation of AI Feedback for Aligning Large Language Models](https://arxiv.org/abs/2402.12366). arXiv:2402.12366.

4. Cui, G., Yuan, L., Ding, N., et al. (2023). [UltraFeedback: Boosting Language Models with Scaled AI Feedback](https://arxiv.org/abs/2310.01377). arXiv:2310.01377.

5. Lambert, N., Morrison, J., Pyatkin, V., et al. (2024). [Tulu 3: Pushing Frontiers in Open Language Model Post-Training](https://arxiv.org/abs/2411.15124). arXiv:2411.15124.

6. Yuan, W., Pang, R. Y., Cho, K., et al. (2024). [Self-Rewarding Language Models](https://arxiv.org/abs/2401.10020). arXiv:2401.10020.

7. Wu, T., Yuan, W., Golovneva, O., et al. (2024). [Meta-Rewarding Language Models: Self-Improving Alignment with LLM-as-a-Meta-Judge](https://arxiv.org/abs/2407.19594). arXiv:2407.19594.

8. Mu, T., Helyar, A., Heidecke, J., et al. (2024). [Rule Based Rewards for Language Model Safety](https://arxiv.org/abs/2411.01111). arXiv:2411.01111.

9. Guan, M. Y., Joglekar, M., Wallace, E., et al. (2024). [Deliberative Alignment: Reasoning Enables Safer Language Models](https://arxiv.org/abs/2412.16339). arXiv:2412.16339.

10. Pace, A., Mallinson, J., Malmi, E., et al. (2024). [West-of-N: Synthetic Preferences for Self-Improving Reward Models](https://arxiv.org/abs/2401.12086). arXiv:2401.12086.

11. Dubois, Y., Galambosi, B., Liang, P., & Hashimoto, T. B. (2024). [Length-Controlled AlpacaEval: A Simple Way to Debias Automatic Evaluators](https://arxiv.org/abs/2404.04475). arXiv:2404.04475.

12. Wang, P., Li, L., Chen, L., et al. (2023). [Large Language Models are not Fair Evaluators](https://arxiv.org/abs/2305.17926). arXiv:2305.17926.

13. Zheng, L., Chiang, W.-L., Sheng, Y., et al. (2023). [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685). arXiv:2306.05685.

14. Panickssery, A., Bowman, S. R., & Feng, S. (2024). [LLM Evaluators Recognize and Favor Their Own Generations](https://arxiv.org/abs/2404.13076). arXiv:2404.13076.

15. Sharma, M., Tong, M., Korbak, T., et al. (2023). [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548). arXiv:2310.13548.

16. Gao, L., Schulman, J., & Hilton, J. (2022). [Scaling Laws for Reward Model Overoptimization](https://arxiv.org/abs/2210.10760). arXiv:2210.10760.

17. Huang, S., Siddarth, D., Lovitt, L., et al. (2024). [Collective Constitutional AI: Aligning a Language Model with Public Input](https://arxiv.org/abs/2406.07814). arXiv:2406.07814.

18. Sharma, M., Tong, M., Mu, J., et al. (2025). [Constitutional Classifiers: Defending against Universal Jailbreaks across Thousands of Hours of Red Teaming](https://arxiv.org/abs/2501.18837). arXiv:2501.18837.

19. Xu, Y., Chakraborty, T., Kıcıman, E., et al. (2025). [RLTHF: Targeted Human Feedback for LLM Alignment](https://arxiv.org/abs/2502.13417). arXiv:2502.13417.

20. Liu, C. Y., Zeng, L., Xiao, Y., et al. (2025). [Skywork-Reward-V2: Scaling Preference Data Curation via Human-AI Synergy](https://arxiv.org/abs/2507.01352). arXiv:2507.01352.

21. Wang, Z., Dong, Y., Delalleau, O., et al. (2024). [HelpSteer2: Open-source dataset for training top-performing reward models](https://arxiv.org/abs/2406.08673). arXiv:2406.08673.
