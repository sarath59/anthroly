---
title: "Why Does RLHF Make Models Verbose? Length Bias in Reward Models, DPO, and GRPO"
description: "Preference-tuned models get longer because length is the cheapest feature to exploit: preference data leans slightly toward longer answers, reward models amplify that lean, and DPO and GRPO add length biases of their own. Here is the evidence, the math of where each bias enters, how reasoning-model length differs, which fixes work, and how to audit length bias before it reaches production."
tags:
  - rlhf
  - reward-models
  - length-bias
  - dpo
  - grpo
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-26T12:35:00.000Z'
updatedAt: '2026-10-26T12:35:00.000Z'
faq:
  - question: "Why does RLHF make language models more verbose?"
    answer: "Because response length is an easy feature for the optimizer to increase and the reward signal rewards it. Singhal et al. (2023) found that reward improvements during PPO were largely driven by longer responses, and that a reward based purely on length reproduced most of the downstream gains of RLHF over the SFT model (for example a 56% win rate versus 58% for standard PPO on WebGPT). They traced the dominant source to reward models that are easily influenced by length biases in preference data."
  - question: "Do humans actually prefer longer answers?"
    answer: "Slightly, and that is enough. In the preference datasets Singhal et al. (2023) studied, always picking the longer response agreed with the human label 55.7% (WebGPT), 59.6% (Stack) and 63.1% (RLCD) of the time, above the 50% expected without bias. Reward models trained on that data showed much stronger length correlation than the data itself, and RL then optimised against the amplified signal."
  - question: "Does DPO avoid length bias because it has no reward model?"
    answer: "No. Park et al. (2024) showed significant length exploitation in DPO: on Anthropic HH and Reddit TL;DR, where the preference data has only a small bias toward longer responses, un-regularized DPO produced answers about twice as long on average. Their length-regularized DPO stays closer to the SFT model's lengths and gave up to 20% higher win rates when controlling for length."
  - question: "Why do GRPO-trained reasoning models produce such long chains of thought?"
    answer: "Partly because longer reasoning helps on hard problems, and partly because of an optimisation bias. Liu et al. (2025) showed that GRPO's per-response length normalisation weights tokens in long incorrect responses less heavily, which encourages progressively longer incorrect responses; their Dr. GRPO removes the length and standard-deviation normalisation and keeps length growth in check. Accuracy also follows an inverted U with chain-of-thought length (Wu et al., 2025), so longer is not always better."
  - question: "How do you fix length bias in a reward model?"
    answer: "Options at the reward-model level include ODIN (Chen et al., 2024), which trains a length head and a content head and discards the length head in RL; a product-of-experts reward that isolates length in a separate biased expert (Shen et al., 2023); and post-hoc reward calibration that estimates and removes the length component without retraining, which improved 33 reward models on RewardBench by 3.11 points on average (Huang et al., 2024). These work best combined with length-matched evaluation and preference pairs in which length and quality are deliberately decorrelated."
  - question: "How do you measure whether a model's gains are just length?"
    answer: "Report length-controlled win rates alongside raw ones. Length-controlled AlpacaEval regresses the judge's preference on the length difference and predicts the preference at zero length difference, which raised its Spearman correlation with Chatbot Arena from 0.94 to 0.98 (Dubois et al., 2024). Chatbot Arena's style control adds answer length and markdown counts as covariates in its Bradley-Terry model. Internally, track the within-prompt correlation between reward and length during training."
draft: false
---

**Ask anyone who has run RLHF what happens to response length and they will tell you it goes up. That is not a quirk of one dataset or one algorithm. Length is the cheapest feature for a policy to change, the preference data leans slightly toward it, reward models amplify the lean, and both DPO and GRPO contain biases of their own that push in the same direction. This post traces where each piece of the bias enters, why reasoning-model length is a different problem, which fixes have evidence behind them, and how to audit a pipeline for it.**

## The short answer

RLHF makes models verbose because the reward signal pays for length more reliably than it pays for quality. The problem is layered:

1. **Preference data** has a mild length lean.
2. **Reward models** learn length as a shortcut and end up far more length-correlated than the data.
3. **The optimiser** (PPO, DPO, GRPO) finds length the easiest direction in which to increase reward, and some objectives add their own length bias.
4. **Evaluation** with LLM judges, which also prefer longer answers, reports the result as progress.

Fixing only one layer usually moves the problem to another.

## How much of RLHF's gain is just length?

More than most people assumed. [Singhal et al. (2023)](https://arxiv.org/abs/2310.03716) studied three settings (WebGPT, Stack Exchange and RLCD) and found that reward improvements during PPO were largely driven by longer responses. In two settings, PPO's improvement over SFT disappeared when comparisons were restricted to outputs of similar length. Most strikingly, they replaced the learned reward model with a purely length-based heuristic and PPO still did about as well: a 56% win rate versus 58% for standard PPO on WebGPT, and 64% versus 63% on RLCD.

The leaderboards tell the same story from the evaluation side:

- [Zheng et al. (2023)](https://arxiv.org/abs/2306.05685) listed verbosity bias among the main failure modes of LLM-as-a-judge.
- [Chen et al. (2024)](https://arxiv.org/abs/2402.07319) note that a well-formatted, verbose but less helpful response can deceive LLM evaluators and even human evaluators.
- [Dubois et al. (2024)](https://arxiv.org/abs/2404.04475) built length-controlled AlpacaEval because AlpacaEval favoured longer outputs; controlling for length raised its Spearman correlation with Chatbot Arena from 0.94 to 0.98.
- [LMSYS (Li, Angelopoulos and Chiang, 2024)](https://lmsys.org/blog/2024-08-28-style-control/) added answer length and markdown header, bold and list counts to the Chatbot Arena Bradley-Terry regression, and the ranking changed noticeably when style was controlled.

## Where does the bias come from?

### Layer 1: the preference data leans long

Singhal et al. measured how often "always pick the longer response" agrees with the human label. Anything above 50% indicates a length lean.

| Dataset | Longer response preferred |
|---|---|
| WebGPT | 55.7% |
| Stack | 59.6% |
| RLCD | 63.1% |

These are modest. A 55.7% lean is not what makes a model write three times as much. The amplification happens next.

### Layer 2: reward models amplify the lean

The same paper reports the within-batch correlation between reward-model score and length: 0.72 on WebGPT, 0.55 on Stack and 0.67 on RLCD for the standard reward models. Balancing the preference data by length cut the correlation sharply on WebGPT (to -0.13) and Stack (to -0.09), but reward-model accuracy fell to 52.6% and 61.9% from 61.5% and 70%. On RLCD the correlation barely moved (0.62) despite balancing. Their conclusion: length is tied to reward-model success, and reward models are non-robust and easily influenced by length biases in the data.

This is the important practitioner point. When the content signal in your preference data is weak or noisy, length is the most learnable feature that correlates with the label, so the reward model leans on it. The less discriminative your pairs are on substance, the more your reward model is a length detector.

Sycophancy is a close cousin: [Sharma et al. (2023)](https://arxiv.org/abs/2310.13548) found humans and preference models both sometimes prefer convincingly written sycophantic answers over correct ones. Length, confidence and agreement with the user are all surface features that stand in for quality when raters cannot or do not verify.

### Layer 3: the optimiser adds its own bias

**PPO with a learned RM** simply climbs whatever the RM rewards. Gao et al.'s overoptimization curves ([Gao et al., 2022](https://arxiv.org/abs/2210.10760)) describe the general shape; length is the most common concrete feature being overoptimised.

**DPO** has no explicit reward model, but its implicit reward is a sum over tokens:

$$
\hat r_\theta(x, y) = \beta \sum_{t=1}^{|y|} \log \frac{\pi_\theta(y_t \mid x, y_{<t})}{\pi_{\text{ref}}(y_t \mid x, y_{<t})} .
$$

Because the sum grows with $|y|$, longer responses can carry larger implicit-reward margins. [Park et al. (2024)](https://arxiv.org/abs/2403.19159) showed significant length exploitation in DPO and linked it to out-of-distribution bootstrapping: on Anthropic HH and TL;DR, where the data has only a small bias toward longer responses, un-regularized DPO produced answers about twice as long on average. [Liu et al. (2024)](https://arxiv.org/abs/2409.06411) give a theoretical analysis showing a strong correlation between DPO's implicit reward and data length.

**GRPO** normalises each response's loss by its own length. [Liu et al. (2025)](https://arxiv.org/abs/2503.20783) show that this creates an optimisation bias that artificially increases response length, especially for incorrect outputs. Roughly, when the advantage is negative, dividing by $|o_i|$ means each token in a long wrong answer is penalised less than each token in a short wrong answer, so long wrong answers are the cheaper failure. Dr. GRPO removes the per-response length normalisation and the standard-deviation normalisation of advantages, and stops length from growing wildly while maintaining reasoning performance.

**Truncation** adds noise. [DAPO](https://arxiv.org/abs/2503.14476) found that assigning a punitive reward to truncated samples can penalise sound reasoning solely for its length and destabilise training. In their ablation on AIME 2024 with Qwen2.5-32B, naive GRPO scored 30, overlong filtering raised it to 36, and adding clip-higher and then soft overlong punishment brought it to 38 and 41, before token-level loss and dynamic sampling reached 42 and 50.

## Is long chain-of-thought the same problem?

Not quite, and conflating the two leads to bad fixes.

For chat RLHF, length is mostly a *reward* artefact: the reward model or judge pays for it. For RL with verifiable rewards on reasoning tasks, the reward is a correctness check that does not see length directly, and longer reasoning often genuinely helps on hard problems. The issues there are different:

- **Overthinking.** [Chen et al. (2024)](https://arxiv.org/abs/2412.21187) document o1-like models spending excessive compute on simple problems with little benefit, and propose efficiency metrics and self-training to cut it without losing accuracy.
- **An optimal length exists.** [Wu et al. (2025)](https://arxiv.org/abs/2502.07266) find accuracy typically follows an inverted U with chain-of-thought length; the optimal length rises with task difficulty and falls with model capability.
- **Optimiser bias** (the GRPO normalisation above) can make length grow for reasons unrelated to reasoning quality.

The fixes are correspondingly about *budget*, not about removing a bias. Kimi k1.5 ([Kimi Team, 2025](https://arxiv.org/abs/2501.12599)) observed response length growing significantly during RL and added a group-relative length reward. For $k$ samples with lengths $\text{len}(i)$:

$$
\lambda_i = 0.5 - \frac{\text{len}(i) - \text{min\_len}}{\text{max\_len} - \text{min\_len}},
\qquad
\text{len\_reward}(i) =
\begin{cases}
\lambda_i & \text{if correct} \\
\min(0, \lambda_i) & \text{if incorrect}
\end{cases}
$$

Shorter correct answers are rewarded, long correct answers are mildly penalised, and long incorrect answers are penalised explicitly. They warm the penalty up after an initial phase, because it slowed early training. [L1 (Aggarwal and Welleck, 2025)](https://arxiv.org/abs/2503.04697) goes further and trains the model to meet a length budget given in the prompt, trading compute for accuracy on demand.

## Which fixes actually work?

| Layer | Method | What it does | Evidence |
|---|---|---|---|
| Data | Length balancing | Equalise length in chosen vs rejected | Cut RM length correlation on two of three datasets, at a cost in RM accuracy (Singhal et al., 2023) |
| Reward model | ODIN | Two heads on shared features, one correlated with length, one decorrelated; drop the length head in RL | Almost eliminates reward-length correlation and improves the policy (Chen et al., 2024) |
| Reward model | Product of experts | A separate, perturbed "biased expert" absorbs length | Improved performance irrespective of length (Shen et al., 2023) |
| Reward model | Post-hoc calibration | Estimate and subtract the length component, no retraining | +3.11 average across 33 RMs on RewardBench (Huang et al., 2024) |
| Objective | R-DPO | Add an $\alpha\lvert y\rvert$ penalty to the RL objective DPO is derived from | Up to 20% higher length-controlled win rates (Park et al., 2024) |
| Objective | SimPO | Average log-probability as implicit reward, plus a target margin | Outperforms DPO without substantially increasing length (Meng et al., 2024) |
| Objective | LD-DPO | Decouple explicit length preference from other preferences | 10-40% shorter than DPO with better benchmark results (Liu et al., 2024) |
| Objective | Dr. GRPO | Remove per-response length and std normalisation | Keeps length growth in check, better token efficiency (Liu et al., 2025) |
| Objective | Length reward, soft overlong punishment | Penalise excess length relative to group or budget | Kimi k1.5; DAPO ablation above |
| Instruction | Length-instructed training | Teach the model to follow explicit length limits | Beats GPT-4, Llama 3 and Mixtral on length-instructed evals (Yuan et al., 2024) |
| Evaluation | Length-controlled win rate, style control | Regress out length and style before ranking | Spearman with Arena 0.94 to 0.98 (Dubois et al., 2024); Arena ranking shifts (LMSYS, 2024) |

## The contrarian part: you do not want zero length correlation

Every fix above risks overcorrecting. Some longer answers are better: a complete proof, a migration guide that covers the edge cases, a clinical answer that lists contraindications. A reward model with exactly zero length correlation on a dataset where thoroughness matters is not unbiased; it is biased toward terseness.

The target is not "reward independent of length" but "reward independent of length *given* information content". That target cannot be estimated from the existing preference data, because in that data length and content are confounded. You need pairs where they are pulled apart:

- **Length-matched pairs**, where two answers are similar in length and differ in correctness or completeness.
- **Short-correct versus long-wrong pairs**, where the shorter answer is right.
- **Padded pairs**, where one answer is the other plus fluent but uninformative text.
- **Long-correct versus short-incomplete pairs**, so the reward model does not learn that short is always good.

Writing these well requires someone who can tell, quickly and reliably, whether the extra paragraph carries information. In specialist domains that is an expert. This is the cheapest high-leverage use of expert labeling in a preference pipeline: a few hundred to a few thousand decorrelated pairs, used both to train against the shortcut and to measure it.

## How to audit a pipeline for length bias

Run these before and during training:

1. **Data lean.** Accuracy of "always prefer the longer response" on your preference data.
2. **RM length correlation.** Within-prompt Spearman correlation between reward and length on fresh policy samples.
3. **Decorrelated accuracy.** RM accuracy on the length-matched, short-correct, padded and long-correct slices above. A length-hacking RM fails the padded and short-correct slices.
4. **Training trace.** Plot mean response length against reward and against a held-out quality metric. Length rising while held-out quality is flat is the signature.
5. **Length-controlled evaluation.** Report raw and length-controlled win rates, and a blind expert evaluation on a length-matched subset.

A minimal version of step 2:

```python
import numpy as np
from scipy.stats import spearmanr

def within_prompt_length_corr(samples):
    """samples: dict prompt_id -> list of (reward, n_tokens) for k policy samples."""
    rhos = []
    for prompt_id, rows in samples.items():
        rewards, lengths = zip(*rows)
        if len(set(lengths)) > 1 and len(set(rewards)) > 1:
            rho, _ = spearmanr(rewards, lengths)
            rhos.append(rho)
    rhos = np.array(rhos)
    return rhos.mean(), np.percentile(rhos, [10, 50, 90])

mean_rho, (p10, p50, p90) = within_prompt_length_corr(samples)
print(f"mean within-prompt rho(reward, length) = {mean_rho:+.2f}  p10/p50/p90 = {p10:+.2f}/{p50:+.2f}/{p90:+.2f}")
```

Within-prompt correlation matters more than global correlation, because harder prompts legitimately need longer answers and would inflate a global number. If the mean within-prompt correlation is high and rising across checkpoints, the policy is learning that length pays.

## How Anthroly can help

Length bias is a data problem before it is an algorithm problem: the reward model leans on length because the preference pairs do not give it a better signal. Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready to commit, writes the pairs that break the shortcut (length-matched, short-correct, padded and long-correct comparisons in domains such as math, science, code, law and medicine) and runs blind, length-matched expert evaluations so you can see whether a gain is substance or style.

If verbosity is creeping into your post-training runs, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can help you design a length-bias audit set.

## Related reading

- [Does reward model accuracy predict RLHF results?](/blog/how-to-evaluate-a-reward-model)
- [DPO vs PPO and GRPO: when is offline preference optimization enough?](/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough)
- [GRPO vs PPO vs DAPO for reasoning RL](/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [RLAIF vs RLHF: can AI feedback replace human preference labels?](/blog/rlaif-vs-rlhf-can-ai-feedback-replace-human-preference-labels)
- [Glossary: reward hacking](/research/glossary#reward-hacking)
- [Rubric rewards vs reward models](/research/compare/rubric-rewards-vs-reward-models)
- [How do you prevent reward model overoptimization in RLHF?](/blog/how-to-prevent-reward-model-overoptimization)

---

## References

1. Singhal, P., Goyal, T., Xu, J., & Durrett, G. (2023). [A Long Way to Go: Investigating Length Correlations in RLHF](https://arxiv.org/abs/2310.03716). arXiv:2310.03716.

2. Zheng, L., Chiang, W.-L., Sheng, Y., et al. (2023). [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685). arXiv:2306.05685.

3. Chen, L., Zhu, C., Soselia, D., et al. (2024). [ODIN: Disentangled Reward Mitigates Hacking in RLHF](https://arxiv.org/abs/2402.07319). arXiv:2402.07319.

4. Dubois, Y., Galambosi, B., Liang, P., & Hashimoto, T. B. (2024). [Length-Controlled AlpacaEval: A Simple Way to Debias Automatic Evaluators](https://arxiv.org/abs/2404.04475). arXiv:2404.04475.

5. Li, T., Angelopoulos, A., & Chiang, W.-L. (2024). [Does Style Matter? Disentangling Style and Substance in Chatbot Arena](https://lmsys.org/blog/2024-08-28-style-control/). LMSYS Org blog.

6. Sharma, M., Tong, M., Korbak, T., et al. (2023). [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548). arXiv:2310.13548.

7. Gao, L., Schulman, J., & Hilton, J. (2022). [Scaling Laws for Reward Model Overoptimization](https://arxiv.org/abs/2210.10760). arXiv:2210.10760.

8. Park, R., Rafailov, R., Ermon, S., & Finn, C. (2024). [Disentangling Length from Quality in Direct Preference Optimization](https://arxiv.org/abs/2403.19159). arXiv:2403.19159.

9. Liu, W., Bai, Y., Han, C., et al. (2024). [Length Desensitization in Direct Preference Optimization](https://arxiv.org/abs/2409.06411). arXiv:2409.06411.

10. Liu, Z., Chen, C., Li, W., et al. (2025). [Understanding R1-Zero-Like Training: A Critical Perspective](https://arxiv.org/abs/2503.20783). arXiv:2503.20783.

11. Yu, Q., Zhang, Z., Zhu, R., et al. (2025). [DAPO: An Open-Source LLM Reinforcement Learning System at Scale](https://arxiv.org/abs/2503.14476). arXiv:2503.14476.

12. Chen, X., Xu, J., Liang, T., et al. (2024). [Do NOT Think That Much for 2+3=? On the Overthinking of o1-Like LLMs](https://arxiv.org/abs/2412.21187). arXiv:2412.21187.

13. Wu, Y., Wang, Y., Ye, Z., et al. (2025). [When More is Less: Understanding Chain-of-Thought Length in LLMs](https://arxiv.org/abs/2502.07266). arXiv:2502.07266.

14. Kimi Team (2025). [Kimi k1.5: Scaling Reinforcement Learning with LLMs](https://arxiv.org/abs/2501.12599). arXiv:2501.12599.

15. Aggarwal, P., & Welleck, S. (2025). [L1: Controlling How Long A Reasoning Model Thinks With Reinforcement Learning](https://arxiv.org/abs/2503.04697). arXiv:2503.04697.

16. Shen, W., Zheng, R., Zhan, W., et al. (2023). [Loose lips sink ships: Mitigating Length Bias in Reinforcement Learning from Human Feedback](https://arxiv.org/abs/2310.05199). arXiv:2310.05199.

17. Huang, Z., Qiu, Z., Wang, Z., et al. (2024). [Post-hoc Reward Calibration: A Case Study on Length Bias](https://arxiv.org/abs/2409.17407). arXiv:2409.17407.

18. Meng, Y., Xia, M., & Chen, D. (2024). [SimPO: Simple Preference Optimization with a Reference-Free Reward](https://arxiv.org/abs/2405.14734). arXiv:2405.14734.

19. Yuan, W., Kulikov, I., Yu, P., et al. (2024). [Following Length Constraints in Instructions](https://arxiv.org/abs/2406.17744). arXiv:2406.17744.
