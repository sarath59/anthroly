---
title: "How Many Expert Labels Does It Take to Fix Noisy Preference Data?"
description: "New 2026 work (CleanRM, ABC-Align, and a revised reward-optimization scaling law) shows that a small, trusted expert set can correct large noisy or AI-labeled preference pools. Here is the math, the sizing rule, and what teams get wrong when they build the clean set."
tags:
  - rlhf
  - preference-data
  - reward-modeling
  - data-labeling
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-20T12:00:00.000Z'
updatedAt: '2026-10-20T12:00:00.000Z'
faq:
  - question: "Can a small set of expert labels fix a large noisy preference dataset?"
    answer: "Often, yes, if the expert set is drawn from the same distribution as the noisy pool. Methods such as CleanRM (arXiv 2610.21138) use a few clean labels to estimate sample-wise noise rates, and prediction-powered methods such as ABC-Align (arXiv 2609.34374) use them to correct the bias of AI-generated labels. The trusted set does not replace the large pool; it calibrates it."
  - question: "How many clean labels did CleanRM need?"
    answer: "In the paper's setup, 5% of each dataset's clean training data was reserved as clean feedback. On UltraFeedback, gains in noise-ratio estimation plateaued once about 60% of that reserve was used, and clean labels mattered much more at a simulated noise rate of 0.15 than at 0.05. The noise was simulated, so treat these as directional, not as a budget for your own data."
  - question: "What is prediction-powered inference and why does it matter for RLAIF?"
    answer: "Prediction-powered inference (Angelopoulos et al., 2023) combines many cheap model predictions with a small set of trusted labels. The trusted labels estimate the predictor's bias, which is then subtracted. Applied to RLAIF, an LLM judge labels everything and experts label a random subset, giving an estimate that stays unbiased even when the judge is systematically wrong."
  - question: "How do I size an expert gold set for correcting an LLM judge?"
    answer: "For a binary preference metric, the number of expert labels needed for a confidence-interval half-width h is roughly n ≈ z²·d / h², where d is the rate at which the judge disagrees with experts. At d = 0.2 and h = 0.03 that is about 854 expert labels at 95% confidence; at d = 0.1 it is about 427. Labeling everything by experts alone would need about 1,068 for the worst case."
  - question: "Does collecting more preference comparisons keep improving the reward model?"
    answer: "With diminishing returns. A 2026 scaling-law paper (arXiv 2609.38526) finds performance scales roughly as the square root of the minimum of log(M) and the KL budget K, where M is the number of comparisons. Volume helps only logarithmically, which makes label quality and the right clean subset relatively more valuable."
  - question: "What is the most common mistake when building a clean preference set?"
    answer: "Drawing it from easy, high-agreement items. Correction methods need trusted labels where the noise actually is: ambiguous, long-tail, and on-policy samples. A clean set that only covers easy cases certifies the judge on items where it was already right."
draft: false
---

**Most post-training teams now live with two kinds of preference data: a huge pool labeled by LLM judges or high-throughput vendors, and a small set someone actually trusts. Three papers from the last month make the same argument from different directions: the small trusted set is not a nice-to-have audit sample. It is the instrument that corrects the large one, and how you build it decides whether the correction works.**

## Why is noisy preference data such a problem for reward models?

Preference noise comes from subjective human judgments, annotation mistakes, and imperfect LLM judges. The CleanRM authors put the key point plainly: training a reward model on such feedback "yields a biased estimate of the clean risk," and the noise is *sample-wise*. Easy pairs are almost never flipped. Ambiguous, long, or domain-heavy pairs are flipped much more often ([Pan et al., 2026](https://arxiv.org/abs/2610.21138)).

That last property breaks the classic denoising toolkit, which mostly assumes one uniform flip rate. It also explains a failure many teams see in practice: a reward model that scores well on a random held-out split but is unreliable exactly where the policy needs guidance, on the hard and ambiguous prompts.

There is also a ceiling on what volume alone can buy. A new scaling-law paper finds that, when optimizing against a proxy reward model, performance scales roughly as

$$
\text{Performance} \;=\; \Theta\!\left(\sqrt{\min\{\log M,\; K\}}\right),
$$

where $M$ is the number of pairwise comparisons used to train the proxy and $K$ is the policy's KL divergence budget ([Aouad, El Gadarri & Farias, 2026](https://arxiv.org/abs/2609.38526)). The fit is strong (R² of 97% to 99% in their experiments), though note the "annotator" there is a 70B gold reward model, not people. Our reading: if data volume only enters through $\log M$, doubling the noisy pool is a weak lever, and spending on the *right* trusted labels is a stronger one. This builds on the original over-optimization scaling laws of [Gao, Schulman & Hilton (2022)](https://arxiv.org/abs/2210.10760).

## What do CleanRM and ABC-Align actually do with the clean set?

Both methods take a small trusted set plus a large noisy or AI-labeled set, but they use the trusted set differently.

| | **CleanRM** (arXiv 2610.21138) | **ABC-Align** (arXiv 2609.34374) |
|---|---|---|
| Noisy source | Human or judge preferences with sample-wise flips | Pseudo labels from an AI teacher (RLAIF-style) |
| Role of clean labels | Calibrate per-sample noise ratios via optimal transport | Estimate and correct the teacher's bias in the gradient |
| Training objective | Noise-corrected surrogate loss, proved unbiased for the clean risk | Adaptive mix of labeled, teacher-on-labeled, and teacher-on-unlabeled gradients |
| Where it was tested | Reward models on HelpSteer, UltraFeedback, PKU-SafeRLHF, then RLHF | Reward models, DPO, and GRPO with scarce human labels |
| Key design choice | Stay unbiased | Accept a little bias for much lower variance |

### CleanRM: use clean labels to learn where the noise is

CleanRM aligns the joint distribution of preferences recovered from the noisy feedback with that of the clean feedback using optimal transport, which yields sample-wise noise ratios. It then trains the reward model with a noise-corrected surrogate loss that the authors prove is unbiased with respect to the clean risk.

The experimental details are worth reading closely, because they tell you how small "a few" is. For each dataset, the authors reserve **5% of the clean training data** as clean feedback and corrupt the rest. In the sensitivity study on UltraFeedback, gains "plateau around" 60% of that reserve. The benefit of more clean labels was "negligible" at a noise rate of 0.05 but "pronounced" at 0.15, and even at the hardest setting tested (noise 0.2, only 20% of the reserve) R² stayed above 0.47.

Two caveats a lab researcher should hold onto. The noise is *simulated*: labels are flipped with probabilities derived from a naive reward model's confidence. And the "clean" labels are the datasets' original labels, not independently re-verified expert judgments. The method is sound; the transfer to your noise profile is something you measure, not assume.

### ABC-Align: prediction-powered training with a bias dial

ABC-Align comes out of the prediction-powered inference (PPI) line of work ([Angelopoulos et al., 2023](https://arxiv.org/abs/2301.09633)). The core PPI idea, for estimating a mean such as a win rate, is a control variate:

$$
\hat{\theta}_{\text{PP}} \;=\; \underbrace{\frac{1}{N}\sum_{i=1}^{N} f(\tilde{x}_i)}_{\text{judge on the big pool}} \;-\; \underbrace{\frac{1}{n}\sum_{j=1}^{n}\big(f(x_j) - y_j\big)}_{\text{judge bias, measured on expert labels}}
$$

Here $f$ is the LLM judge, $\tilde{x}_i$ are the $N$ judge-only items and $(x_j, y_j)$ are the $n$ expert-labeled items. The estimate stays unbiased however wrong the judge is, and its variance is approximately

$$
\operatorname{Var}\big(\hat{\theta}_{\text{PP}}\big) \;\approx\; \frac{\sigma^2_{f}}{N} \;+\; \frac{\sigma^2_{f-y}}{n}.
$$

ABC-Align ([Frankel, Zhu, Oh & Ratliff, 2026](https://arxiv.org/abs/2609.34374)) moves this from estimation to training. Its gradient estimator is

$$
\hat g_t \;=\; (1 - a_t - b_t)\, g^{n,f}_t \;+\; a_t\, g^{n}_t \;+\; b_t\, g^{N,f}_t ,
$$

mixing the gradient on human labels ($g^{n}$), the teacher's labels on the same items ($g^{n,f}$), and the teacher's labels on the big pool ($g^{N,f}$). The earlier prediction-powered method it compares against (PP-SSL) fixes $a_t = 1$ and tunes only $b_t$. ABC-Align tunes both coefficients online to minimize gradient mean-squared error, deliberately trading a small bias for a large variance reduction when human labels are scarce. In the reward-model experiments the labeled fraction was swept over 1%, 5%, and 10% of Skywork Reward Preference 80K, with teacher labels synthesized by flipping ground-truth preferences.

## How many expert labels do you need? A sizing rule you can use

The PPI variance formula gives a practical back-of-the-envelope for one common job: correcting an LLM judge's win-rate estimate with expert labels. For binary preferences, $y - f \in \{-1, 0, 1\}$, so $\sigma^2_{f-y} \le d$, where $d$ is the judge–expert disagreement rate. With a big judge-labeled pool ($N \gg n$), the expert labels needed for a confidence-interval half-width $h$ are roughly

$$
n \;\approx\; \frac{z^2\, d}{h^2}.
$$

A worked example (illustrative arithmetic, not measured data), at 95% confidence ($z = 1.96$) and $h = 0.03$:

| Judge–expert disagreement $d$ | Expert labels needed (PPI) | Expert-only labels, worst case $p = 0.5$ |
|---|---|---|
| 0.30 | about 1,281 | about 1,068 |
| 0.20 | about 854 | about 1,068 |
| 0.10 | about 427 | about 1,068 |
| 0.05 | about 214 | about 1,068 |

Two things fall out. First, the savings come entirely from judge quality: a judge that disagrees with experts 30% of the time can be worse than no judge for this purpose, which is why PPI++ ([Angelopoulos, Duchi & Zrnic, 2023](https://arxiv.org/abs/2311.01453)) and related methods tune a power parameter so the estimator never underperforms the labeled-only baseline. Second, you cannot know $d$ without experts, so the first few hundred expert labels are doing double duty: they measure the judge and correct it. Our [eval sample-size calculator](/research/eval-sample-size-calculator) covers the expert-only side of this table.

```python
import numpy as np

def ppi_win_rate(judge_big, judge_small, expert_small, z=1.96):
    """Prediction-powered estimate of a win rate.
    judge_big:    judge labels (0/1) on N items with no expert label
    judge_small:  judge labels (0/1) on the n expert-labeled items
    expert_small: expert labels (0/1) on those same n items
    """
    judge_big = np.asarray(judge_big, float)
    judge_small = np.asarray(judge_small, float)
    expert_small = np.asarray(expert_small, float)
    rectifier = judge_small - expert_small          # judge bias per item
    est = judge_big.mean() - rectifier.mean()
    se = np.sqrt(judge_big.var(ddof=1) / len(judge_big)
                 + rectifier.var(ddof=1) / len(rectifier))
    return est, (est - z * se, est + z * se)
```

## What do teams get wrong when building the clean set?

These are practitioner observations from building expert gold sets, not results from the papers above.

1. **The clean set is drawn from easy items.** Teams pick high-agreement pairs because they are fast to adjudicate. But CleanRM's whole premise is that noise is concentrated in specific samples. A trusted set that never touches the ambiguous region certifies the judge exactly where it was already right.
2. **The clean set is off-policy.** If the trusted labels come from last quarter's model outputs, the judge-bias estimate describes last quarter's model. The PPI guarantee assumes the labeled and unlabeled items come from the same distribution, so resample on-policy whenever the policy shifts.
3. **Gold labels are produced by the same process as the noise.** A second pass by the same vendor pool, or a stronger model from the same family as the judge, shares failure modes. The clean set has to be independent: different people, different incentives, and a written adjudication standard.
4. **The clean set is also the eval set.** Once a gold set is used to tune the correction, it is no longer a clean held-out measurement. Keep a separate frozen slice for evaluation.
5. **Nobody records why.** A preference without a rationale cannot be audited later. Expert labels with short written reasons let you find systematic judge errors, which is where the next rubric or verifier improvement comes from.

Cheaper ways to produce on-policy trusted data also matter here. onPanda, an annotation tool built around token-level correction, reported a 52% reduction in median annotation time over manual post-editing in a small controlled study, while keeping most tokens model-generated so the result stays close to the policy's own distribution ([Yang et al., 2026](https://arxiv.org/abs/2609.24983)).

## The takeaway for post-training teams

The economics are shifting from "how many labels can we afford" to "which few hundred labels must be right." Abundant judge or vendor labels give you variance reduction. A small, independent, on-policy, well-documented expert set gives you correctness. Every method above needs both, and none of them works if the trusted set is quietly as noisy as the pool it is meant to fix.

## How Anthroly can help

Anthroly builds exactly this kind of trusted layer. We have 100 to 150 PhDs on contract and about 400 more PhDs and graduates ready to commit, across medicine, science, law, engineering, and finance. Our experts build stratified, on-policy gold sets for preference data, adjudicate the ambiguous tail with written rationales, and measure judge–expert disagreement so you know how many labels you actually need.

If your team is correcting an LLM judge or a vendor pool and wants a clean set you can defend, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [Synthetic vs. human preference data](/research/compare/synthetic-vs-human-preference-data)
- [Expert vs. crowd annotation](/research/compare/expert-vs-crowd-annotation)
- [RLHF preference data, explained](/learn/rlhf-preference-data)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [Does reward model accuracy predict RLHF results? How to evaluate a reward model](/blog/how-to-evaluate-a-reward-model)
- [When annotators disagree: is preference disagreement noise or signal?](/blog/annotator-disagreement-in-preference-data)
- [DPO vs PPO and GRPO: when is offline preference optimization enough?](/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough)
- [How do you quality-control expert data labeling? Gold items, audits and label-error detection](/blog/how-to-quality-control-expert-data-labeling)

---

## References

1. Pan, L., Yang, H., Chen, Y., Sun, Y., Lu, Y., Teng, Y., Fan, J., Liu, G., Chu, Z., & Wang, H. (2026). [CleanRM: Reward Modeling from Noisy Feedback with a Few Clean Feedback for RLHF](https://arxiv.org/abs/2610.21138). arXiv:2610.21138.
2. Frankel, E., Zhu, B., Oh, S., & Ratliff, L. J. (2026). [ABC-Align: Prediction-Powered Alignment with Adaptive Bias Control](https://arxiv.org/abs/2609.34374). arXiv:2609.34374.
3. Aouad, A., El Gadarri, A., & Farias, V. F. (2026). [Revisiting scaling laws for reward optimization](https://arxiv.org/abs/2609.38526). arXiv:2609.38526.
4. Gao, L., Schulman, J., & Hilton, J. (2022). [Scaling Laws for Reward Model Overoptimization](https://arxiv.org/abs/2210.10760). arXiv:2210.10760.
5. Angelopoulos, A. N., Bates, S., Fannjiang, C., Jordan, M. I., & Zrnic, T. (2023). [Prediction-Powered Inference](https://arxiv.org/abs/2301.09633). arXiv:2301.09633.
6. Yang, L., Liu, M., Wang, J., Guo, H., Zhao, L., Ge, Z., An, K., Jiao, B., Han, Q., Jiang, D., Shen, S., & Zhang, X. (2026). [onPanda: Efficient Annotation of On-Policy Alignment Data for LLMs and Agents via Token-Level Correction](https://arxiv.org/abs/2609.24983). arXiv:2609.24983.
7. Angelopoulos, A. N., Duchi, J. C., & Zrnic, T. (2023). [PPI++: Efficient Prediction-Powered Inference](https://arxiv.org/abs/2311.01453). arXiv:2311.01453.
