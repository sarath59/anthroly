---
title: "How Do You Prevent Reward Model Overoptimization in RLHF?"
description: "Overoptimization is predictable: gold reward rises, peaks and falls as a function of KL distance, with coefficients that scale with reward model size and data. A KL penalty alone mostly acts like early stopping. Here is what the evidence shows for reward model ensembles, WARM, constrained RLHF, reward shaping and DPO, how to detect overoptimization during a run, and where fresh expert-labeled gold preferences fit."
tags:
  - reward-models
  - rlhf
  - reward-hacking
  - dpo
  - preference-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-27T04:30:00.000Z'
updatedAt: '2026-10-27T04:30:00.000Z'
faq:
  - question: "What is reward model overoptimization?"
    answer: "It is the pattern where optimizing a policy against a learned reward model first improves true quality and then degrades it, while the reward model's own score keeps rising. Gao, Schulman and Hilton (2022) measured it with a synthetic gold reward model and found the gold score follows d(alpha - beta d) for best-of-n and d(alpha - beta log d) for RL, where d is the square root of the KL divergence from the initial policy, with coefficients that scale smoothly with reward model size."
  - question: "Does a KL penalty prevent reward overoptimization?"
    answer: "Not by itself. In Gao et al. (2022), varying the KL penalty did not improve the frontier of gold reward versus KL; its effect was akin to early stopping. Coste et al. (2023) needed a KL penalty 20 times larger than the one that sufficed with ensembles to eliminate overoptimization, at a significant performance cost. Kwa et al. (2024) showed theoretically that when reward error is heavy-tailed, KL regularization can allow arbitrarily high proxy reward with no more utility than the base model."
  - question: "Do reward model ensembles fix overoptimization?"
    answer: "They mitigate it but do not eliminate it. Coste et al. (2023) found conservative ensemble objectives (worst-case and uncertainty-weighted) practically eliminated overoptimization for best-of-n and, combined with a small KL penalty, prevented it for PPO. Eisenstein et al. (2023) found ensembles whose members differ in pretraining seed generalize better than ones differing only in fine-tuning seed, but that hacks such as list formatting, longer outputs and copying persisted because all ensemble members shared the same errors."
  - question: "Does DPO avoid reward overoptimization because it has no reward model?"
    answer: "No. Rafailov et al. (2024) found DPO, IPO and SLiC show the same hump-shaped degradation as KL budgets grow, often before a single epoch completes; with wider KL budgets the best checkpoint came after about 25% of the data. The Gao et al. RL functional form fit DAA win rates against KL, and implicit reward accuracy showed little correlation with downstream performance."
  - question: "How do you detect overoptimization during training?"
    answer: "Track signals that the optimizer cannot directly push: win rate against a fixed reference judged by a held-out gold source, disagreement between reward model ensemble members, KL from the initial policy, and behavioural statistics such as length, list formatting and copying. Coste et al. (2023) found intra-ensemble variance grew about 2.5 times under mean optimization with 25% label noise. Keep checkpoints frequently and select by the gold signal, not by proxy reward."
  - question: "How does Anthroly help prevent reward overoptimization?"
    answer: "Anthroly provides the gold signal that overoptimization has to be measured against: fresh expert-labeled preference sets on on-policy samples, held-out evaluation sets independent of the reward model, and adjudication of the response pairs where reward models disagree. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Every RLHF team has watched the curve: reward model score climbing smoothly while samples get longer, more formulaic and, eventually, worse. That is reward model overoptimization, and the useful thing about it is that it is not random. It follows functional forms that were measured in 2022, it responds predictably to reward model size and data, and the most common defence, the KL penalty, turns out to do much less than people assume. This post goes through the scaling laws, why KL alone is not enough, what ensembles, weight averaging, constraints and reward shaping actually buy, why DPO is not immune, how to detect overoptimization in a live run, and where fresh expert-labeled gold preference data fits.**

## The short answer

You cannot remove overoptimization, because every learned reward is a proxy, and theory gives little hope of a proxy that is safe to optimize arbitrarily: [Skalse et al. (2022)](https://arxiv.org/abs/2209.13085) show that over the set of all stochastic policies, two reward functions can only be unhackable if one of them is constant. You can push the peak further out and stop near it. In practice that means: (1) make the reward model harder to exploit, with more and cleaner data, pretrain-diverse ensembles or weight averaging, and a conservative aggregate; (2) bound how far the policy travels, with constraints or bounded rewards, not just a KL coefficient; (3) measure true quality during the run with a signal the optimizer never sees, and select checkpoints on it; and (4) refresh the reward model with new preference labels on the policy's current outputs. The fourth is where most teams under-invest, and it is the only one that moves the proxy closer to what you actually want.

## What does reward overoptimization look like, quantitatively?

[Gao, Schulman and Hilton (2022)](https://arxiv.org/abs/2210.10760) made the phenomenon measurable by replacing humans with a fixed 6B "gold" reward model, using it to label 100,000 synthetic comparisons, and training proxy reward models from 3M to 3B parameters on those labels. They then optimized policies against each proxy and tracked the gold score. Writing

$$
d := \sqrt{D_{\mathrm{KL}}(\pi \,\|\, \pi_{\text{init}})},
$$

they found the gold reward follows different forms for best-of-$n$ and for RL:

$$
R_{\text{BoN}}(d) = d\,(\alpha_{\text{BoN}} - \beta_{\text{BoN}}\, d), \qquad R_{\text{RL}}(d) = d\,(\alpha_{\text{RL}} - \beta_{\text{RL}} \log d).
$$

Both rise, peak and fall. For best-of-$n$ the KL is analytic, $\mathrm{KL}_{\text{BoN}} = \log n - \frac{n-1}{n}$, and the functional form was validated by a true advance prediction: hypothesized from data up to $n = 1{,}000$ (about 6 nats) and then confirmed out to $n = 60{,}000$ (about 10 nats).

The findings that matter for practice:

| Finding (Gao et al., 2022) | Practical implication |
|---|---|
| $\alpha$ and $\beta$ scale smoothly with proxy RM parameter count; for RL, $\alpha_{\text{RL}}$ could be held constant and $\beta_{\text{RL}}$ shrank with size | Bigger reward models push the peak out; you can predict roughly where it moves |
| Below about 2,000 comparisons, RMs barely improved over near-chance loss; more data gave better gold scores and less Goodharting | Small preference sets are not just noisy, they are exploitable |
| Larger policies gained less from optimization but overoptimized at almost the same KL | A bigger policy does not buy you a bigger safe KL budget |
| RL consumed far more KL than best-of-$n$ for the same optimization | KL is not comparable across optimization methods |
| Varying the KL penalty did not improve the gold-reward-versus-KL frontier; its effect was akin to early stopping | A KL coefficient is a stopping rule, not a robustness method |

Gao et al. also gave the two coefficients a Goodhart interpretation. The $\alpha$ term reflects *regressional* Goodhart: if the proxy is gold plus independent noise $Z$, part of every unit of optimization selects on noise, and

$$
\mathbb{E}[X \mid \hat{X} = \hat{x}] = \mathbb{E}[X] + (\hat{x} - \mathbb{E}[X] - \mathbb{E}[Z]) \frac{\mathrm{Var}(X)}{\mathrm{Var}(X) + \mathrm{Var}(Z)} .
$$

This holds up to a small error term when $X$ is normally distributed. That kind of Goodhart alone would make gold reward rise monotonically with proxy reward, only more slowly. The *decline* comes from the $\beta$ term, which they attribute mainly to *extremal* Goodhart: optimization moves samples out of the reward model's training distribution, where features like length stop tracking quality. That distinction tells you which mitigations target which part of the curve: cleaner and more data shrinks the noise share; robustness to distribution shift shrinks $\beta$.

Two caveats from the paper itself are worth keeping. The synthetic setup captures the gap between the reward model and the gold labels, not the gap between labels and actual human intent. And the authors did not expect adversarial Goodhart to appear at their model scale, warning the laws may break down when it does. The original observation came from humans, not a synthetic gold model: [Stiennon et al. (2020)](https://arxiv.org/abs/2009.01325) found that under heavy optimization, true preferences fell off relative to the prediction until the reward model became anti-correlated with human preferences, and their over-optimized samples were "clearly long, low quality, and full of idiosyncrasies."

## Why isn't a KL penalty enough?

The standard RLHF objective is

$$
\max_{\pi}\; \mathbb{E}_{x, y \sim \pi}\big[ r_\phi(x, y) \big] - \beta_{\mathrm{KL}}\, D_{\mathrm{KL}}\big(\pi \,\|\, \pi_{\text{ref}}\big),
$$

and it is often described as the fix for overoptimization. Four lines of evidence say it is not, at least not alone.

1. **It does not move the frontier.** In Gao et al., gold scores depended only on how far the policy travelled in KL, whatever penalty produced that distance. The penalty made the gold score converge earlier, which is early stopping by another name.
2. **It is expensive when used alone.** [Coste et al. (2023)](https://arxiv.org/abs/2310.02743) found that with a KL penalty of 0.01, ensemble-based objectives prevented overoptimization without notable loss in performance, whereas KL alone needed a 20x larger coefficient of 0.2 to eliminate overoptimization, with a significant performance penalty.
3. **It can fail in principle.** [Kwa, Thomas and Garriga-Alonso (2024)](https://arxiv.org/abs/2407.14503) showed that with light-tailed reward error, less restrictive KL penalties can still achieve arbitrarily high utility, but with heavy-tailed error some policies obtain arbitrarily high reward with no more utility than the base model, which they call catastrophic Goodhart. Their measurements of current reward models were consistent with light tails, but they warn future reward sources could be heavy-tailed.
4. **It regularizes the wrong object.** [Laidlaw, Singhal and Dragan (2024)](https://arxiv.org/abs/2403.03185) define reward hacking through the correlation between proxy and true reward on states seen by a reference policy, and argue that regularizing the $\chi^2$ divergence between the policies' *occupancy measures* can be more effective than the per-action KL used in RLHF, showing better mitigation across four settings including RLHF. [Zhai et al. (2023)](https://arxiv.org/abs/2401.00243) likewise start from the observed weakness of KL regularization and add an uncertainty penalty from a diverse LoRA reward ensemble.

Keep the KL term; it is a cheap and necessary brake. Just do not treat its coefficient as your overoptimization defence.

## Do reward model ensembles help?

Yes, with an important limit.

[Coste et al. (2023)](https://arxiv.org/abs/2310.02743) trained ensembles of five reward models in a Gao-style synthetic setup, added a 25% label-noise variant to mimic real data, and compared three aggregates of member rewards $R_1, \dots, R_k$:

$$
R_{\mu} = \frac{1}{k}\sum_{i} R_i, \qquad R_{\text{WCO}} = \min_i R_i, \qquad R_{\text{UWO}} = \frac{1}{k}\sum_i R_i \;-\; \lambda\, \frac{1}{k}\sum_i \Big(R_i - \frac{1}{k}\sum_j R_j\Big)^2 .
$$

Mean optimization is not conservative: if one member overestimates, the policy can still exploit it. Worst-case optimization (WCO) is conservative and hyperparameter-free; uncertainty-weighted optimization (UWO) penalizes disagreement. Their results: conservative optimization practically eliminated overoptimization for best-of-$n$ and improved performance by up to 70%; for PPO it always reduced overoptimization and outperformed a single reward model, and combined with a small KL penalty it prevented overoptimization at no performance cost.

[Eisenstein et al. (2023)](https://arxiv.org/abs/2312.09244), working with human preference data rather than a synthetic gold model, sharpened the picture:

- **Reward models are underspecified.** Models with similar in-distribution accuracy gave very different rewards under the distribution shift that alignment causes, and aligning to one did not improve reward as measured by another trained on the same data.
- **Diversity has to come from pretraining.** Ensembles whose members differ in pretraining seed generalized better than ones differing only in fine-tuning seed. Reward models that shared a pretraining seed with a reranker overestimated the true reward of its top output.
- **Shared errors survive ensembling.** Several hacks persisted because every member agreed they were improvements. On a helpfulness task, the fraction of outputs in list format rose to roughly 50% for the ensemble and three of its members, against roughly 8% in the preference data. On TL;DR, summary length roughly doubled for the ensemble, and the longest common subsequence with the source document roughly doubled too, an amplified preference for copying.

The lesson for practitioners: ensembles fix *idiosyncratic* errors and do nothing for *correlated* ones. If every member learned from the same preference data, every member learned that data's biases. Length is the standard example, which we cover in depth in [why RLHF makes models verbose](/blog/why-does-rlhf-make-models-verbose-length-bias).

## What does WARM add over ensembling?

[WARM (Ramé et al., 2024)](https://arxiv.org/abs/2401.12187) fine-tunes $M$ reward models from a shared pretrained initialization with diverse hyperparameters, then averages their *weights*:

$$
\phi_{\text{WARM}} = \frac{1}{M}\sum_{i=1}^{M} \phi_i .
$$

This works because fine-tuned weights from a shared pretraining stay linearly mode connected, so the average is itself a good model. The benefits are efficiency (one model at inference rather than $M$) and robustness: the authors argue weight averaging selects invariant predictive mechanisms across runs and so memorizes corrupted labels less, while prediction ensembling simply memorizes them. On summarization, a policy RL fine-tuned with WARM had a 79.4% win rate against a policy fine-tuned with a single reward model.

The limits are stated by the authors. Prediction ensembles can combine different architectures and pretrainings and can use disagreement as an uncertainty signal; WARM cannot. And WARM does not remove biases shared by all runs: "if each individual RM predominantly relies on summary length as a criterion, WARM is likely to replicate this tendency." That is Eisenstein et al.'s point from the other direction.

## Can you constrain the policy instead of penalizing it?

[Moskovitz et al. (2023)](https://arxiv.org/abs/2310.04373) studied composite rewards built from several component reward models and found that each component has a "proxy point" beyond which further increasing it lowers ground-truth evaluation, and that correlation between components shifts those points. Instead of a fixed weighted sum, they cast RLHF as a constrained MDP:

$$
\max_{\pi}\; v_0^{\pi} \quad \text{s.t.} \quad v_i^{\pi} \ge \theta_i,\; i = 1, \dots, N,
$$

solved with Lagrangian relaxation so the component weights become learned Lagrange multipliers. Each component is pushed up to its threshold of usefulness but not past it. They also proposed a gradient-free method to find the proxy points during a single run. The experiments are small (GPT-2 on DailyDialog with METEOR and an intent classifier as components), but the design principle generalizes: if you know roughly where each reward stops being a good proxy, encode that as a constraint rather than hoping a KL coefficient lands in the right place. Finding those thresholds requires an evaluation signal independent of the components, which is a recurring theme below.

## Does reward shaping help?

[Fu et al. (2025)](https://arxiv.org/abs/2502.18770) surveyed reward-shaping techniques and distilled two design principles: the RL reward should be bounded, and it should grow rapidly at first and then saturate. Their method, Preference as Reward (PAR), applies a sigmoid to the reward centered on a reference response:

$$
r_{\text{RL}} = \sigma\big(r(x, y) - r(x, y_{\text{ref}})\big),
$$

which under a Bradley-Terry reward model is exactly the model's predicted probability that the policy response beats the reference. Because the policy starts near the reference, the centered reward starts near zero where the sigmoid is steepest, then saturates. The authors report PAR delays the onset of reward hacking and widens the practical window for early stopping. Bounded rewards cap how much a single exploitable feature can pay, which addresses the symptom directly even if it does not fix the reward model.

Reward-model-side regularizers attack $\beta$ more directly. InfoRM adds a variational information bottleneck to filter out preference-irrelevant features and reports that overoptimization correlates with outliers in its latent space, which it turns into a detection index ([Miao et al., 2024](https://arxiv.org/abs/2402.09345)). [Yang et al. (2024)](https://arxiv.org/abs/2406.10216) keep the language-model head and text-generation losses while training the reward head, and report better out-of-distribution reward accuracy and less over-optimization.

## Is DPO immune because it has no reward model?

No. [Rafailov et al. (2024)](https://arxiv.org/abs/2406.02900) trained DPO, IPO and SLiC on TL;DR with Pythia 1B, 2.8B and 6.9B across seven $\beta$ values and found:

- **The same hump.** Performance, measured as GPT-4 win rate against dataset summaries, rose and then fell as the KL budget grew, for all three objectives.
- **It happens fast.** With wider KL budgets, models reached their best performance after about 25% of an epoch and degraded afterwards.
- **The same functional form.** Treating GPT-4 win rate as the gold score, $R(d) = d(\alpha - \beta \log d)$ fit DAA results, halving RMSE relative to a quadratic fit in KL (though a quadratic in $d$ fit about as well).
- **Scale and objective matter.** The 1B model over-optimized almost immediately; the 6.9B model was less prone. IPO was less prone than DPO and SLiC.
- **Training metrics do not warn you.** Implicit reward accuracy and DAA loss showed little relationship to downstream win rate within a model size.

The implication is uncomfortable for teams that moved to DPO partly to escape reward hacking: offline methods overoptimize too, and their own loss curves will not tell you when. Early stopping on an independent evaluation is as necessary for DPO as for PPO. See [DPO vs PPO and GRPO](/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough) for when the offline route is worth it anyway.

## How do the mitigations compare?

| Mitigation | What it targets | Evidence | Main limitation |
|---|---|---|---|
| More, cleaner RM data; larger RM | Noise share and $\beta$ | Gao et al. scaling with RM size and data | Cost; does not fix label-intent gap |
| KL penalty | Distance travelled | Gao et al.: akin to early stopping; Coste et al.: 20x coefficient needed alone | Does not move the frontier; can fail with heavy tails |
| Conservative ensembles (WCO, UWO) | Idiosyncratic RM errors | Coste et al.; Zhai et al. | Inference cost; shared errors persist (Eisenstein et al.) |
| Pretrain-diverse ensembles | Underspecification | Eisenstein et al. | Expensive to pretrain; shared data biases remain |
| WARM | Distribution shift, label noise | Ramé et al.: 79.4% win rate vs single RM | Shared biases replicated |
| Constrained RLHF | Per-component proxy points | Moskovitz et al. | Needs proxy points from an independent signal |
| Bounded, centered reward (PAR) | Extreme rewards | Fu et al. | Shaping, not a better reward model |
| Occupancy-measure $\chi^2$ regularization | What KL regularizes | Laidlaw et al. | Less standard tooling |
| Iterated RLHF with fresh labels | The proxy itself | Bai et al.; Gao et al. analysis; Wolf et al. | Human labeling cost; diminishing returns |

## How do you detect overoptimization during a run?

The principle is simple: monitor signals the optimizer is not directly maximizing, and select checkpoints by them.

1. **Gold-referenced win rate.** Keep a fixed prompt set and a reference policy. Every $N$ steps, compare current samples to the reference using a signal the policy never trained on: a held-out reward model trained on different data, a different-family judge, and periodically human or expert raters. The checkpoint to ship is the one at the peak of this curve, not the end of the run.
2. **Proxy-gold gap.** Gao et al. treat the gap between proxy and gold scores as a measure of how much the proxy is being exploited. A widening gap with flat or falling gold reward is the signature.
3. **Ensemble disagreement.** Coste et al. found intra-ensemble variance rose about 2.5 times during training under mean optimization with 25% label noise, versus about 20% under UWO. Rising disagreement means the policy is moving into regions the reward models do not agree on.
4. **KL and its rate.** Gao et al. found that in RL without a penalty, KL grew roughly quadratically with training steps. Plot gold reward against $\sqrt{\mathrm{KL}}$, not against steps, and fit the $d(\alpha - \beta \log d)$ form to early points to forecast the peak.
5. **Behavioural statistics.** Length, list fraction, copying from context, refusal rate, hedging phrases. Eisenstein et al.'s hacks were all visible as simple statistics diverging from the preference data's distribution.

A minimal monitor:

```python
import numpy as np

def fit_gao_rl(d, gold):
    # Fit gold = d * (alpha - beta * log d) by least squares; d = sqrt(KL), d > 0
    d, gold = np.asarray(d, float), np.asarray(gold, float)
    A = np.stack([d, -d * np.log(d)], axis=1)
    (alpha, beta), *_ = np.linalg.lstsq(A, gold, rcond=None)
    d_peak = np.exp(alpha / beta - 1.0) if beta > 0 else np.inf  # argmax of d*(alpha - beta*log d)
    return alpha, beta, d_peak

def overopt_alerts(step_log):
    # step_log: list of dicts with keys kl, proxy, gold, ens_var, mean_len
    last, base = step_log[-1], step_log[0]
    alerts = []
    if len(step_log) >= 3 and step_log[-1]["gold"] < max(s["gold"] for s in step_log[:-1]):
        alerts.append("gold below running peak: keep best checkpoint, consider stopping")
    if last["ens_var"] > 2.0 * base["ens_var"]:
        alerts.append("ensemble disagreement doubled")
    if last["mean_len"] > 1.5 * base["mean_len"]:
        alerts.append("length drift > 50%")
    return alerts
```

Setting the derivative of $d(\alpha - \beta \log d)$ to zero gives the peak at $d^{*} = \exp(\alpha/\beta - 1)$, which is what `fit_gao_rl` returns. The thresholds in `overopt_alerts` are placeholders; calibrate them on your own runs. Forecasts from early points are a planning tool, not a guarantee: Gao et al. note the form likely does not hold near the origin, where it has infinite slope, so fit on points away from $d = 0$.

## Where does fresh expert-labeled gold preference data fit?

Every mitigation above either needs an independent signal or is limited by the proxy's training data. That is where new human labels earn their cost, in four places.

**Refreshing the proxy on-policy.** Gao et al. analysed iterated RLHF under simplifying assumptions: splitting a total distance $d$ into $k$ rounds, each with a freshly trained reward model, gives

$$
R_{\text{RL}}(d) = d\,\big(\alpha_{\text{RL}} - \beta_{\text{RL}} \log d + \beta_{\text{RL}} \log k\big),
$$

a gain of $\beta_{\text{RL}}\, d \log k$ that leaves the $\alpha$ (regressional) term untouched. Anthropic's HH work ran exactly this kind of iterated online training, updating preference models and policies on a weekly cadence with fresh human feedback ([Bai et al., 2022](https://arxiv.org/abs/2204.05862)). [Wolf, Kirk and Musolesi (2025)](https://arxiv.org/abs/2505.18126) measured it in AlpacaFarm: overoptimization tends to decrease across iterations, gains diminish after three iterations for most methods, concatenating preference data across iterations dramatically outperforms other approaches, and small but persistent overoptimization remains after four iterations whatever the design.

**Measuring the peak.** A gold-referenced win-rate curve is only as good as its gold. For general chat, a strong judge can serve between human checks. For specialist domains, where the judge is not clearly better than the policy, expert raters are the gold, and the checkpoint you ship should be chosen on their ratings.

**Labeling where reward models disagree.** Ensemble disagreement and proxy-gold gaps identify exactly the samples whose labels would most change the reward model. Sending those, rather than random pairs, to expert raters concentrates the labeling budget on the region the policy is exploiting. The [expert-label budget math](/blog/how-many-expert-labels-fix-noisy-preference-data) is favourable here.

**Breaking shared biases.** Ensembles and WARM cannot fix a bias every member learned from the data. Only labels that disagree with the bias can: pairs where the shorter, plainer, non-list answer is better, labeled by someone who can tell. Gao et al.'s own limitation applies too: a synthetic gold model measures the gap to labels, not to intent, and closing the second gap requires people who understand the intent.

## What do labs get wrong?

- **Treating the KL coefficient as the defence.** It is a brake. The frontier moves only when the reward model gets better or the optimization becomes conservative.
- **Ensembling copies of the same thing.** Five fine-tuning seeds from one pretrained model share most of their errors. Diversity has to come from pretraining, architecture or data.
- **Selecting checkpoints on proxy reward.** The proxy always says the last checkpoint is best. Select on a held-out gold signal.
- **Assuming DPO is safe.** DAAs overoptimize, often within a single epoch, and their loss and implicit accuracy do not warn you.
- **Using the training judge as the evaluation judge.** If the same model or family both shapes the reward and grades the outcome, you are measuring agreement with yourself. We discuss this circularity in [RLAIF vs RLHF](/blog/rlaif-vs-rlhf-can-ai-feedback-replace-human-preference-labels).
- **Freezing the preference data.** Iterated RLHF with fresh, on-policy labels is the one mitigation that moves the proxy toward intent. Running many RL epochs against a reward model trained on last quarter's SFT samples is how the curve bends down.
- **Not pre-registering the gold eval.** Decide the prompts, the reference and the raters before the run, so the peak is not chosen after seeing which checkpoint looks best.

## How Anthroly can help

Overoptimization is a measurement problem as much as an optimization one: you need a gold signal the policy never trained against, and fresh labels where the reward model is being exploited. Anthroly supplies both. Our bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit, builds held-out expert-rated evaluation sets, labels on-policy preference pairs for reward model refreshes, and adjudicates the pairs where reward model ensembles disagree, including the specialist domains where an LLM judge is not a reliable gold.

If you are planning an RLHF run and want a gold signal you can stop on, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can help you design it.

## Related reading

- [Does reward model accuracy predict RLHF results? How to evaluate a reward model](/blog/how-to-evaluate-a-reward-model)
- [Why does RLHF make models verbose? Length bias in reward models, DPO and GRPO](/blog/why-does-rlhf-make-models-verbose-length-bias)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [DPO vs PPO and GRPO: when is offline preference optimization enough?](/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough)
- [How many expert labels fix noisy preference data?](/blog/how-many-expert-labels-fix-noisy-preference-data)
- [Generative vs scalar reward models](/blog/generative-reward-models-vs-scalar-reward-models)
- [Glossary: reward overoptimization](/research/glossary#reward-overoptimization)

---

## References

1. Gao, L., Schulman, J., & Hilton, J. (2022). [Scaling Laws for Reward Model Overoptimization](https://arxiv.org/abs/2210.10760). arXiv:2210.10760.

2. Stiennon, N., Ouyang, L., Wu, J., et al. (2020). [Learning to summarize from human feedback](https://arxiv.org/abs/2009.01325). arXiv:2009.01325.

3. Coste, T., Anwar, U., Kirk, R., & Krueger, D. (2023). [Reward Model Ensembles Help Mitigate Overoptimization](https://arxiv.org/abs/2310.02743). arXiv:2310.02743.

4. Eisenstein, J., Nagpal, C., Agarwal, A., et al. (2023). [Helping or Herding? Reward Model Ensembles Mitigate but do not Eliminate Reward Hacking](https://arxiv.org/abs/2312.09244). arXiv:2312.09244.

5. Ramé, A., Vieillard, N., Hussenot, L., et al. (2024). [WARM: On the Benefits of Weight Averaged Reward Models](https://arxiv.org/abs/2401.12187). arXiv:2401.12187.

6. Moskovitz, T., Singh, A. K., Strouse, D. J., et al. (2023). [Confronting Reward Model Overoptimization with Constrained RLHF](https://arxiv.org/abs/2310.04373). arXiv:2310.04373.

7. Rafailov, R., Chittepu, Y., Park, R., et al. (2024). [Scaling Laws for Reward Model Overoptimization in Direct Alignment Algorithms](https://arxiv.org/abs/2406.02900). arXiv:2406.02900.

8. Kwa, T., Thomas, D., & Garriga-Alonso, A. (2024). [Catastrophic Goodhart: regularizing RLHF with KL divergence does not mitigate heavy-tailed reward misspecification](https://arxiv.org/abs/2407.14503). arXiv:2407.14503.

9. Laidlaw, C., Singhal, S., & Dragan, A. (2024). [Correlated Proxies: A New Definition and Improved Mitigation for Reward Hacking](https://arxiv.org/abs/2403.03185). arXiv:2403.03185.

10. Zhai, Y., Zhang, H., Lei, Y., et al. (2023). [Uncertainty-Penalized Reinforcement Learning from Human Feedback with Diverse Reward LoRA Ensembles](https://arxiv.org/abs/2401.00243). arXiv:2401.00243.

11. Fu, J., Zhao, X., Yao, C., et al. (2025). [Reward Shaping to Mitigate Reward Hacking in RLHF](https://arxiv.org/abs/2502.18770). arXiv:2502.18770.

12. Miao, Y., Zhang, S., Ding, L., et al. (2024). [InfoRM: Mitigating Reward Hacking in RLHF via Information-Theoretic Reward Modeling](https://arxiv.org/abs/2402.09345). arXiv:2402.09345.

13. Yang, R., Ding, R., Lin, Y., Zhang, H., & Zhang, T. (2024). [Regularizing Hidden States Enables Learning Generalizable Reward Model for LLMs](https://arxiv.org/abs/2406.10216). arXiv:2406.10216.

14. Bai, Y., Jones, A., Ndousse, K., et al. (2022). [Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback](https://arxiv.org/abs/2204.05862). arXiv:2204.05862.

15. Wolf, L., Kirk, R., & Musolesi, M. (2025). [Reward Model Overoptimisation in Iterated RLHF](https://arxiv.org/abs/2505.18126). arXiv:2505.18126.

16. Skalse, J., Howe, N. H. R., Krasheninnikov, D., & Krueger, D. (2022). [Defining and Characterizing Reward Hacking](https://arxiv.org/abs/2209.13085). arXiv:2209.13085.
