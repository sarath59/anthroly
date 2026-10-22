---
title: "LLM-as-a-Judge vs. Expert Graders: When Can You Trust an Automated Grader?"
description: "LLM judges agree with crowds on easy chat, but fail on hard tasks where correctness has a ground truth. This post covers judge biases, calibration with expert-labeled gold sets, agreement metrics, and when you still need PhDs to grade model outputs."
tags:
  - llm-as-a-judge
  - reward-modeling
  - evaluation
  - expert-data
  - verifiers
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-21T12:00:00.000Z'
updatedAt: '2026-10-21T12:00:00.000Z'
faq:
  - question: "When can I trust an LLM judge instead of human graders?"
    answer: "LLM judges work well when the evaluation criteria are subjective (helpfulness, style) and there is no objectively correct answer. MT-Bench showed GPT-4 achieves over 80% agreement with human preferences on chat tasks, matching human-human agreement. But on tasks with verifiable correctness—math, code, factual reasoning—LLM judges struggle, and agreement drops significantly."
  - question: "What biases do LLM judges have?"
    answer: "The main documented biases are position bias (preferring the first or second response depending on the model), verbosity bias (favoring longer responses), and self-enhancement bias (rating their own outputs higher). Wang et al. showed that simply swapping response order can flip GPT-4's verdict 46% of the time on certain comparisons."
  - question: "How do I measure agreement between an LLM judge and expert graders?"
    answer: "Use Cohen's kappa or Scott's pi rather than raw percent agreement. Percent agreement can be misleadingly high when both raters agree on easy cases. Kappa adjusts for chance agreement. Thakur et al. found that even judges with high percent agreement can assign scores that differ by 5-10 points from human scores."
  - question: "What is a gold set and how many expert labels do I need?"
    answer: "A gold set is a trusted, expert-labeled sample used to calibrate or validate an automated judge. For estimating judge bias with reasonable confidence, a few hundred expert labels often suffice. The exact number depends on the judge-expert disagreement rate and your desired precision."
  - question: "Should I use swap-order evaluation to mitigate position bias?"
    answer: "Yes. Balanced Position Calibration runs the judge twice with swapped response order and averages the scores. Wang et al. showed this simple technique reduces positional bias substantially. It doubles inference cost but improves reliability."
  - question: "When should I use expert graders instead of LLM judges?"
    answer: "Use expert graders when: (1) correctness has a ground truth that requires domain knowledge to verify, (2) you're building reward signals for RL where systematic judge errors get amplified, (3) you need to catch subtle factual or logical errors that LLM judges miss, or (4) you're validating a new LLM judge before trusting it at scale."
draft: false
---

**LLM-as-a-judge has become the default way to evaluate model outputs at scale. It is fast, cheap, and correlates well with human preferences on conversational benchmarks. But the 2023–2024 literature that established this paradigm tested mostly on chat and helpfulness. The 2024–2026 follow-up work tells a harder story: judges have systematic biases, they fail on tasks with objectively correct answers, and they plateau at 68–70% agreement on hard domains regardless of scale. This post covers what breaks, how to calibrate a judge against an expert-labeled gold set, and when you still need domain experts.**

## Where does LLM-as-a-judge work?

The foundational paper is [Zheng et al. (2023)](https://arxiv.org/abs/2306.05685), which introduced MT-Bench and Chatbot Arena. The key claim: GPT-4 as a judge "can match both controlled and crowdsourced human preferences well, achieving over 80% agreement, the same level of agreement between humans."

That 80% number has been widely cited, but the fine print matters. MT-Bench evaluates multi-turn conversation and instruction-following across writing, roleplay, reasoning, math, coding, and knowledge categories. The evaluation is pairwise: which of two responses is better? On this task—open-ended, subjective, no single correct answer—strong LLM judges perform about as well as humans agree with each other.

This result extended to Chatbot Arena, a crowdsourced platform where users vote on anonymous model responses. The setting is naturalistic: real users, real questions, real preferences. Here too, LLM judges approximate crowd preferences.

The practical implication: for evaluating chat models on helpfulness, style, and instruction-following, LLM-as-a-judge is a reasonable proxy for human evaluation. It is not perfect, but neither are human annotators.

## What biases do LLM judges have?

### Position bias

[Wang et al. (2023)](https://arxiv.org/abs/2305.17926) showed that LLM judges are "not fair evaluators." Simply swapping the order of two candidate responses can flip the verdict. In their experiments, GPT-4 showed a conflict rate of 46.3% when comparing Vicuna-13B against ChatGPT—meaning nearly half the time, changing which response appeared first changed the winner. ChatGPT as a judge was worse, with conflict rates up to 82.5%.

The direction of bias varies: GPT-4 tends to prefer the first response, while ChatGPT tends to prefer the second. The bias is strongest when the two responses are close in quality—exactly the cases where you most need a reliable judge.

**Mitigation: Balanced Position Calibration.** Run the judge twice with swapped order and aggregate the results. This doubles inference cost but substantially reduces positional bias.

### Verbosity bias

Longer responses tend to receive higher scores, even when the additional length adds no information. This is documented across multiple studies and is especially problematic when comparing a concise correct answer against a verbose partially-correct one.

### Self-enhancement bias

Models rate their own outputs higher than outputs from other models. This matters when using a model both as generator and judge, or when the judge shares architecture with one of the candidates.

## Where do LLM judges fail?

### Hard tasks with objectively correct answers

[Tan et al. (2024)](https://arxiv.org/abs/2410.12784) introduced JudgeBench, a benchmark designed to test LLM judges on "challenging response pairs spanning knowledge, reasoning, math, and coding." The key insight: crowdsourced human preference is a poor indicator of correctness on hard tasks. A response can sound plausible and be wrong; a response can be terse and be right.

JudgeBench constructs pairs where one response is objectively correct and one is objectively incorrect (verified by ground truth or execution), but the incorrect response contains subtle errors that are hard to spot. The results are sobering: "many strong models (e.g., GPT-4o) performing just slightly better than random guessing."

The authors propose a hierarchy for what judges should prioritize: (1) instruction following, (2) factual and logical correctness, (3) stylistic alignment. Current LLM judges often invert this hierarchy, rewarding style over correctness.

### Agreement plateaus regardless of scale

[Thakur et al. (2024)](https://arxiv.org/abs/2406.12624) evaluated thirteen judge models on TriviaQA, a knowledge benchmark with high human agreement. Even in this clean setup—questions with clear correct answers—only the largest models (GPT-4 Turbo, Llama-3 70B, Llama-3.1 70B) achieved strong alignment with humans. And even these fell short of human-human agreement.

A critical finding: "Percent agreement (blue line) shows a very skewed distribution, making it difficult to distinguish models." Judges with similar percent agreement can assign scores that differ by 5–10 points. Use Scott's pi or Cohen's kappa, not raw agreement.

### The survey view

[Gu et al. (2024)](https://arxiv.org/abs/2411.15594) provide a comprehensive survey of LLM-as-a-judge, organizing the field around a central question: "How to build reliable LLM-as-a-Judge systems?" Their answer involves strategies for consistency, bias mitigation, and domain adaptation—but the survey also documents the gaps: reliability remains a significant challenge, and simply scaling the judge model does not solve it.

## How do you calibrate a judge against expert labels?

The prediction-powered inference framework from [Angelopoulos et al. (2023)](https://arxiv.org/abs/2301.09633) provides a principled approach. The idea: use a large pool of judge-labeled data plus a small set of expert-labeled data. The expert labels estimate the judge's bias, which is then subtracted.

For a binary evaluation (win/lose), the calibrated estimate is:

$$
\hat{\theta}_{\text{PP}} = \frac{1}{N}\sum_{i=1}^{N} f(\tilde{x}_i) - \frac{1}{n}\sum_{j=1}^{n}\big(f(x_j) - y_j\big)
$$

where $f$ is the LLM judge, $\tilde{x}_i$ are the $N$ judge-only items, and $(x_j, y_j)$ are the $n$ expert-labeled items. The estimate stays unbiased however wrong the judge is.

### How many expert labels do you need?

The variance of the calibrated estimate is approximately:

$$
\operatorname{Var}(\hat{\theta}_{\text{PP}}) \approx \frac{\sigma^2_{f}}{N} + \frac{\sigma^2_{f-y}}{n}
$$

With a large judge-labeled pool ($N \gg n$), the number of expert labels needed for a confidence-interval half-width $h$ is roughly:

$$
n \approx \frac{z^2 \cdot d}{h^2}
$$

where $d$ is the judge–expert disagreement rate. At 95% confidence, $z = 1.96$.

| Judge–expert disagreement $d$ | Expert labels needed (illustrative) |
|---|---|
| 0.30 | ~1,281 |
| 0.20 | ~854 |
| 0.10 | ~427 |
| 0.05 | ~214 |

The savings come entirely from judge quality. A bad judge that disagrees with experts 30% of the time may require more labels than just labeling everything with experts.

### Agreement metrics beyond percent agreement

**Cohen's kappa** adjusts for chance agreement:

$$
\kappa = \frac{p_o - p_e}{1 - p_e}
$$

where $p_o$ is observed agreement and $p_e$ is expected agreement by chance. Values above 0.8 indicate excellent agreement; 0.6–0.8 is substantial; below 0.4 is poor.

**Scott's pi** is similar but assumes raters have the same distribution of ratings, making it appropriate when comparing a single judge to a reference standard.

The Thakur et al. finding bears repeating: judges with high percent agreement can still differ substantially in assigned scores. Always report kappa or pi alongside raw agreement.

## When do you still need expert graders?

### Reward signals for RL

When an LLM judge provides the reward signal for reinforcement learning, systematic biases get amplified. The policy learns to satisfy the judge, not to be correct. This is the reward hacking problem applied to evaluation.

Our [post on reward hacking in rubric-based RL](/blog/reward-hacking-rubric-based-rl) documents how policies learn to exploit judge weaknesses: satisfying completeness criteria while degrading factual correctness, conciseness, and relevance. The same dynamics apply when using an LLM judge as a reward model.

If you're training with RL, the judge needs to be validated against expert labels in the regime where training happens—on-policy, at the difficulty level where the policy is learning.

### Domains where correctness requires expertise

Medical advice, legal analysis, scientific reasoning, financial modeling—these domains have objectively correct answers that require domain knowledge to verify. An LLM judge can detect fluency and coherence; it cannot reliably detect that a drug interaction is missed or a legal precedent is misapplied.

[Kim et al. (2024)](https://arxiv.org/abs/2405.01535) introduced Prometheus 2, an open evaluator LM trained to evaluate based on custom criteria. It achieves high correlation with GPT-4 on subjective dimensions but does not claim to replace domain expertise for correctness verification.

### Validating new judges

Before trusting an LLM judge at scale, you need to know its failure modes. That requires expert labels—not as ongoing supervision, but as a validation set.

RewardBench ([Lambert et al., 2024](https://arxiv.org/abs/2403.13787)) and RewardBench 2 ([Malik et al., 2025](https://arxiv.org/abs/2506.01937)) provide benchmarks for evaluating reward models. RewardBench 2 is notably harder: "models score about 20 points on average lower on RewardBench 2 compared to RewardBench." It includes domains like factuality, precise instruction following, and ties (questions with multiple correct answers), where current models struggle.

## A practical hybrid pipeline

Based on the literature, here is a workflow that balances cost and reliability:

**1. Start with an LLM judge for high-volume filtering.** Use GPT-4 or a fine-tuned open evaluator with balanced position calibration. This gives you a first pass at scale.

**2. Build an expert gold set for calibration.** Sample from the distribution you care about—especially the hard cases, the on-policy outputs, the ambiguous items. Label with domain experts using a clear rubric. Track inter-annotator agreement.

**3. Measure judge–expert disagreement.** Compute kappa, not just percent agreement. Identify systematic failure modes: does the judge favor verbosity? Does it miss factual errors? Does it have position bias even after calibration?

**4. Use the gold set to estimate bias and confidence intervals.** Apply prediction-powered inference to correct aggregate metrics. Report uncertainty.

**5. Reserve a held-out expert set for evaluation.** Once you've used a gold set for calibration, it's no longer a clean test set. Keep a separate slice frozen.

**6. Refresh on-policy.** When the policy changes, the judge's bias may change. Resample expert labels periodically.

## What practitioners get wrong

These are observations from building evaluation pipelines, not findings from the papers.

1. **Assuming high agreement means low bias.** A judge can agree with experts 85% of the time and still have a systematic 5-point bias on a 100-point scale.

2. **Calibrating on easy cases.** If the expert gold set only covers high-agreement items, you've validated the judge where it was already right.

3. **Using the same model family for generation and judgment.** Self-enhancement bias is real. Cross-family judges reduce shared failure modes.

4. **Ignoring position bias because "it averages out."** It doesn't average out if your evaluation pipeline always puts one model first.

5. **Treating judge outputs as ground truth for training.** An LLM judge is a proxy. Training on proxy labels inherits proxy errors.

## How Anthroly can help

Anthroly provides the expert layer that makes LLM judges reliable. We have about 100–150 PhDs on contract and approximately 400 more PhDs and graduates ready to commit, spanning medicine, science, law, engineering, and finance.

Our experts build expert gold sets for judge calibration, label the hard cases where LLM judges fail, and write the adjudication standards that make expert agreement measurable. We measure judge–expert disagreement so you know how many labels you need, and we provide the independent verification that separates proxy metrics from ground truth.

If your team is scaling evaluation with LLM judges and needs to know where they break, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [How many expert labels does it take to fix noisy preference data?](/blog/how-many-expert-labels-fix-noisy-preference-data)
- [Expert vs. crowd annotation](/research/compare/expert-vs-crowd-annotation)
- [RLHF preference data, explained](/learn/rlhf-preference-data)
- [How many eval items do you need? Error bars and power for LLM evals](/blog/how-many-eval-items-do-you-need)
- [How do you collect training data for computer-use agents?](/blog/how-to-collect-computer-use-agent-trajectory-data)

---

## References

1. Zheng, L., Chiang, W.-L., Sheng, Y., Zhuang, S., Wu, Z., Zhuang, Y., Lin, Z., Li, Z., Li, D., Xing, E. P., Zhang, H., Gonzalez, J. E., & Stoica, I. (2023). [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685). arXiv:2306.05685.

2. Wang, P., Li, L., Chen, L., Cai, Z., Zhu, D., Lin, B., Cao, Y., Liu, Q., Liu, T., & Sui, Z. (2023). [Large Language Models are not Fair Evaluators](https://arxiv.org/abs/2305.17926). arXiv:2305.17926.

3. Tan, S., Zhuang, S., Montgomery, K., Tang, W. Y., Cuadron, A., Wang, C., Popa, R. A., & Stoica, I. (2024). [JudgeBench: A Benchmark for Evaluating LLM-based Judges](https://arxiv.org/abs/2410.12784). arXiv:2410.12784.

4. Thakur, A. S., Choudhary, K., Ramayapally, V. S., Vaidyanathan, S., & Hupkes, D. (2024). [Judging the Judges: Evaluating Alignment and Vulnerabilities in LLMs-as-Judges](https://arxiv.org/abs/2406.12624). arXiv:2406.12624.

5. Kim, S., Suk, J., Longpre, S., Lin, B. Y., Shin, J., Welleck, S., Neubig, G., Lee, M., Lee, K., & Seo, M. (2024). [Prometheus 2: An Open Source Language Model Specialized in Evaluating Other Language Models](https://arxiv.org/abs/2405.01535). arXiv:2405.01535.

6. Lambert, N., Pyatkin, V., Morrison, J., Miranda, L. J., Lin, B. Y., Chandu, K., Dziri, N., Kumar, S., Zick, T., Choi, Y., Smith, N. A., & Hajishirzi, H. (2024). [RewardBench: Evaluating Reward Models for Language Modeling](https://arxiv.org/abs/2403.13787). arXiv:2403.13787.

7. Malik, S., Pyatkin, V., Land, S., Morrison, J., Smith, N. A., Hajishirzi, H., & Lambert, N. (2025). [RewardBench 2: Advancing Reward Model Evaluation](https://arxiv.org/abs/2506.01937). arXiv:2506.01937.

8. Gu, J., Jiang, X., Shi, Z., Tan, H., Zhai, X., Xu, C., Li, W., Shen, Y., Ma, S., Liu, H., Wang, S., Zhang, K., Lin, Z., Zhang, B., Ni, L., Gao, W., Wang, Y., & Guo, J. (2024). [A Survey on LLM-as-a-Judge](https://arxiv.org/abs/2411.15594). arXiv:2411.15594.

9. Angelopoulos, A. N., Bates, S., Fannjiang, C., Jordan, M. I., & Zrnic, T. (2023). [Prediction-Powered Inference](https://arxiv.org/abs/2301.09633). arXiv:2301.09633.
