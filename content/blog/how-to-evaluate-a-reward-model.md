---
title: "Does Reward Model Accuracy Predict RLHF Results? How to Evaluate a Reward Model Before You Train"
description: "Pairwise accuracy on a preference benchmark is a weak predictor of what a reward model does inside RLHF. Evidence from RewardBench 2, PPE, and recent theory shows why: off-policy test data, low reward variance, and overoptimization. Here is a practical pre-RL evaluation protocol."
tags:
  - reward-modeling
  - rlhf
  - evaluation
  - benchmarks
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-22T12:30:00.000Z'
updatedAt: '2026-10-22T12:30:00.000Z'
faq:
  - question: "Does a higher reward model benchmark score mean better RLHF results?"
    answer: "Only partly. Wen et al. (2024) found a weak positive correlation between reward model accuracy and downstream policy quality, with policies trained on reward models of similar accuracy ending up quite different. RewardBench 2 (Malik et al., 2025) found its scores correlate strongly with best-of-N results (Pearson 0.87 across 113 reward models), but PPO results saturated once reward models were decent, and top-scoring reward models built on a different base model than the policy often failed to improve it."
  - question: "Why can a more accurate reward model be a worse teacher for RLHF?"
    answer: "Razin et al. (2025) prove that if a reward model induces low reward variance over the outputs the current policy actually produces, the RLHF objective is nearly flat and policy gradient makes slow progress, regardless of accuracy. In their experiments a perfectly accurate but low-variance reward was outperformed by less accurate reward models that separated on-policy outputs more strongly."
  - question: "What is the best way to evaluate a reward model before running RLHF?"
    answer: "Score on-policy samples from the policy you will actually train, not only a fixed off-policy benchmark. Measure pairwise accuracy against expert or verifier labels on those samples, the reward variance the model induces per prompt, worst-domain accuracy rather than only the average, robustness to style changes, and a small best-of-N check against gold labels. PPE (Frick et al., 2024) found that lower-bound (worst-category) performance correlated better with post-RLHF outcomes than the average."
  - question: "Is best-of-N a good proxy for how a reward model will do in PPO or GRPO?"
    answer: "It is a useful cheap check but not a substitute. RewardBench 2 reports that benchmark scores track best-of-N closely across all reward models, while PPO outcomes depended on whether the reward model shared the policy's lineage and prompt distribution. Gao et al. (2022) also show best-of-N and RL consume KL budget differently, so the two methods overoptimize at different points."
  - question: "How many responses per prompt should a reward model test set have?"
    answer: "More than two when you can afford it. Wen et al. (2024) found that, under a fixed annotation budget, test sets with more responses per prompt produced error measurements that correlated better with downstream policy regret than many prompts with a single pair each. RewardBench 2 similarly scores one chosen response against three rejected ones."
  - question: "How does Anthroly help with reward model evaluation?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, labels on-policy samples in specialized domains so teams can measure reward model accuracy, variance, and failure modes on the distribution they will actually train on, and builds expert gold sets for domains where no verifier exists."
draft: false
---

**Most teams pick a reward model by its score on a preference benchmark: the share of chosen/rejected pairs it orders correctly. That number is cheap and easy to compare. It is also a weak predictor of what the reward model will do once a policy starts optimizing against it. Over the past two years, controlled experiments from AI2, LMArena, Princeton and others have pinned down why: benchmark pairs are usually off-policy, accuracy ignores how strongly a reward model separates the outputs your policy actually produces, and every proxy reward breaks down once the policy drifts far enough. This post walks through that evidence and ends with a pre-RL evaluation protocol you can run in a day.**

## Why isn't pairwise accuracy enough?

The standard metric is simple. For a prompt $x$ and a pair of responses, a reward model $r_{\mathrm{RM}}$ is "correct" if it orders them the same way as the reference reward $r_{\mathrm{G}}$ (human, expert, or verifier). [Razin et al. (2025)](https://arxiv.org/abs/2503.15477) write it as:

$$
\mathrm{acc}_{x,\mathcal{D}}(r_{\mathrm{RM}}) = \mathbb{E}_{\{y,y'\} \sim \mathcal{D}}\Big[\mathbb{1}\big[\mathrm{sign}(r_{\mathrm{RM}}(x,y) - r_{\mathrm{RM}}(x,y')) = \mathrm{sign}(r_{\mathrm{G}}(x,y) - r_{\mathrm{G}}(x,y'))\big]\Big]
$$

Two things are hidden in that formula. First, the pair distribution $\mathcal{D}$: on a public benchmark, the pairs come from whatever models the benchmark authors sampled, not from your policy. Second, the metric only looks at the *sign* of the reward difference, never its size.

[Wen et al. (2024)](https://arxiv.org/abs/2410.05584) tested how well accuracy predicts *policy regret*, the gap between a policy optimized on the proxy reward and one optimized on the true reward. In a synthetic setup where one reward model plays "gold" and others play "proxy", they found:

- a **weak positive** correlation between accuracy and regret, with policies trained on reward models of similar accuracy showing quite different regret;
- the **prompt mismatch** between the reward model test set and the downstream task weakens the correlation;
- the **rank** of the responses being compared matters more than which model generated them;
- with the annotation budget held fixed, **more responses per prompt** produce an error measure that tracks regret better;
- accuracy alone can miss overoptimization, which they analyze through the lens of Regressional Goodhart.

That is the theory-light version of the problem. The next two sections are the empirical and theoretical versions.

## What does RewardBench 2 show about benchmark scores and downstream results?

[RewardBench 2 (Malik et al., 2025)](https://arxiv.org/abs/2506.01937) is the most direct test of whether a reward model benchmark predicts downstream use. It has 1,865 prompts, mostly unreleased human-written WildChat queries, across six domains (Factuality, Precise Instruction Following, Math, Safety, Focus, Ties), and scores each prompt as one chosen versus three rejected responses, which pushes the random baseline down to 25%. Leading models from the original [RewardBench](https://arxiv.org/abs/2403.13787) score 20 or more points lower on it.

The authors then ran two downstream experiments:

- **Best-of-N.** 113 reward models each picked the best of 16 Tulu 3 8B SFT completions on seven evaluations (GSM8K, MATH, IFEval, AlpacaEval 2, BBH, PopQA, HumanEval+). RewardBench 2 score and average best-of-N score had a **Pearson correlation of 0.87**.
- **PPO.** 17 reward models were each used to train Tulu 3 8B SFT with PPO. Here the picture changed.

Selected rows from their Figure 4 (scores averaged over Tulu 3 eval tasks; the SFT starting point averages 54.1 and the comparable DPO model 60.3):

| Reward model group | RewardBench 2 | Post-PPO score | Best-of-N score |
|---|---|---|---|
| On-policy, strong (model 1) | 68.7 | 59.8 | 52.4 |
| On-policy, strong (model 8) | 55.6 | 60.7 | 51.5 |
| On-policy, strong (model 9) | 49.8 | 60.2 | 48.0 |
| On-policy, weak (model 11) | 21.9 | 54.2 | 39.7 |
| Off-policy (model 13) | 72.9 | 54.5 | 56.4 |
| Off-policy (model 17) | 65.6 | 58.5 | 49.2 |

Read that table carefully. All nine strong on-policy reward models (RewardBench 2 scores from roughly 50 to 69) landed between 59.5 and 60.7 after PPO, so within that group benchmark score said little beyond "decent". The highest-scoring reward model in the PPO study (72.9) produced one of the *weakest* PPO policies because it was off-policy. The authors identify two kinds of mismatch as the cause: a reward model initialized from a different base model than the policy (the strongest effect), and a reward model trained on a different prompt distribution than the PPO prompts. They also report that other reward model benchmarks show the same pattern: good correlation with best-of-N, low correlation with RLHF outcomes.

The practitioner reading: **benchmark score is a reasonable filter for discarding bad reward models and a poor tool for choosing among good ones.** The decision between two good reward models depends on your policy, not on the leaderboard.

## Why can a more accurate reward model be a worse teacher?

[Razin et al. (2025)](https://arxiv.org/abs/2503.15477) give the cleanest explanation for why accuracy and RLHF performance come apart. They define the **reward variance** a reward model induces for a policy $\pi_\theta$ on prompt $x$:

$$
\mathrm{Var}_{y \sim \pi_\theta(\cdot\mid x)}\big[r_{\mathrm{RM}}(x,y)\big] = \tfrac{1}{2}\,\mathbb{E}_{y,y' \overset{\text{i.i.d.}}{\sim} \pi_\theta(\cdot\mid x)}\Big[\big(r_{\mathrm{RM}}(x,y) - r_{\mathrm{RM}}(x,y')\big)^2\Big]
$$

This measures how far apart the reward model places outputs that the policy is actually likely to produce. They prove that if this variance is low, the RLHF objective is flat around the current policy and policy gradient makes slow progress, on both the proxy reward and the true reward, *however accurate the reward model is*. And because variance depends on the policy, the same reward model can be a good teacher for one language model and a poor one for another.

Their experiments make it concrete. With ArmoRM as the ground-truth reward, a Pythia-2.8B policy, and reward models trained on different mixes of on-policy and off-policy pairs (Table 1 in the paper):

| Reward model | Reward variance | On-policy accuracy | Off-policy accuracy |
|---|---|---|---|
| 100% on-policy training pairs | 0.630 | 0.660 | 0.630 |
| 50% on-policy | 0.555 | 0.640 | 0.758 |
| 0% on-policy | 0.314 | 0.587 | 0.762 |
| Perfectly accurate, low variance | 0.111 | 1.000 | 1.000 |
| Ground-truth reward itself | 0.256 | 1.000 | 1.000 |

Two results stand out. The reward model that looks *worst* on an off-policy benchmark (0.630) has the highest variance and the best on-policy accuracy. And in some regimes a proxy reward model improved the ground-truth reward faster than training on the ground-truth reward directly, because it induced more variance. The authors also report that reward models with high off-policy but low on-policy accuracy tended to cause reward hacking.

This is the theoretical counterpart to the RewardBench 2 lineage finding. A reward model built on a different base model, or trained on a different prompt distribution, can rank benchmark pairs well while barely separating your policy's samples.

## How does overoptimization fit in?

Every learned reward is a proxy, and the gap between proxy and true reward grows as the policy moves away from where the reward model was trained. [Gao, Schulman and Hilton (2022)](https://arxiv.org/abs/2210.10760) measured this with a synthetic "gold" reward model. Writing $d = \sqrt{D_{\mathrm{KL}}(\pi \,\|\, \pi_{\text{init}})}$, the gold reward follows:

$$
R_{\text{BoN}}(d) = d\,(\alpha_{\text{BoN}} - \beta_{\text{BoN}}\, d), \qquad R_{\text{RL}}(d) = d\,(\alpha_{\text{RL}} - \beta_{\text{RL}} \log d)
$$

where the coefficients depend on the proxy reward model (they vary smoothly with its parameter count). For best-of-$n$ the KL is analytic, $\mathrm{KL}_{\text{BoN}} = \log n - \frac{n-1}{n}$, so it grows only logarithmically with $n$, whereas RL tends to consume far more KL.

Two consequences for evaluation:

1. **A static accuracy number has no notion of KL.** It tells you about the reward model near the data it was tested on, not about how quickly it will be exploited at the KL your training run will reach.
2. **Best-of-N is a near-policy test.** Because best-of-$n$ stays close to the initial policy, it is a natural cheap check, and it is exactly where RewardBench 2 found benchmark scores most predictive. It says less about what happens deep into an RL run.

## Which reward model metrics actually predict post-RLHF quality?

[PPE (Frick et al., 2024)](https://arxiv.org/abs/2410.14872), from the LMArena/Chatbot Arena team, went furthest toward ground truth. They trained Llama-3.1-8B with DPO against preference labels from nine different reward models, deployed the nine resulting policies anonymously on Chatbot Arena, and collected 12,190 human votes to rank them. Then they asked which of 12 reward model metrics across 12 domains best predicted that ranking. Their findings:

- **Granular measurements such as pairwise accuracy were the best predictors** across the board.
- **Lower-bound performance predicted better than average performance.** Re-scaling per-category scores and aggregating with a lower quantile (down to the minimum) increased correlation for nearly every metric. In other words, the reward model's worst category matters more than its mean.
- Their combined evaluation reached a **77% Pearson correlation** with downstream human preference.

The caveats are honest and important: nine reward models, one base model, and DPO rather than online RL. But "judge a reward model by its weakest domain" is consistent with everything else here, because RL finds and exploits the weakest part of a reward.

Two other benchmarks target specific blind spots:

- [RM-Bench (Liu et al., 2024)](https://arxiv.org/abs/2410.16184) builds pairs that differ by subtle content changes and controls for style. On roughly 40 reward models, even state-of-the-art ones averaged only **46.6%**, below random (50%), when faced with style-bias interference. A reward model that prefers well-formatted wrong answers will teach your policy formatting.
- [Personalized RewardBench (Ma et al., 2026)](https://arxiv.org/abs/2604.07343) tests whether reward models follow user-specific rubrics when both responses are otherwise high quality. The best model reached 75.94%, and the benchmark's rank correlation with PPO outcomes (Spearman 0.3714) beat the baselines it compared against, which is better but still modest.

## A practical pre-RL reward model evaluation protocol

The evidence points to a protocol that is cheap compared with a full RL run and much more informative than a leaderboard score. Run it on each candidate reward model, for the specific policy checkpoint you plan to train:

1. **Sample on-policy.** Draw $K \geq 4$ responses per prompt from the policy you will train, on prompts drawn from your RL prompt distribution. Wen et al. suggest more responses per prompt beats more prompts at a fixed budget.
2. **Get reference labels on those samples.** Use verifiers where they exist (math, code, precise instruction following). Elsewhere, use expert graders on a few hundred prompts. This is the expensive step and the one that makes the rest meaningful.
3. **Measure on-policy accuracy** on all pairs with a strict reference preference.
4. **Measure reward variance per prompt** after putting all candidate reward models on a common scale, and flag the share of prompts where variance is near zero. Those are prompts where the reward model will give the policy nothing to climb.
5. **Report the worst domain, not just the mean.** Slice accuracy by domain or task family, as PPE suggests.
6. **Run a style-perturbation check.** Reformat or lengthen wrong answers and see whether the reward model flips to prefer them.
7. **Run a small best-of-N against reference labels**, at a few values of $n$, as a near-policy sanity check.
8. **Re-run on a later checkpoint.** Reward variance and accuracy shift as the policy moves, so repeat steps 1–4 on an intermediate RL checkpoint before committing to a long run.

A minimal implementation of steps 3–5:

```python
import itertools
import numpy as np

def pairwise_acc(r, g):
    """Share of pairs with a strict reference preference that the RM orders the same way."""
    hits = total = 0
    for i, j in itertools.combinations(range(len(r)), 2):
        if g[i] == g[j]:
            continue
        total += 1
        hits += int(np.sign(r[i] - r[j]) == np.sign(g[i] - g[j]))
    return hits / total if total else np.nan

def rm_report(rewards, gold, domains, low_var=0.05):
    """rewards, gold: dict prompt_id -> array of K scores for K on-policy samples.
    domains: dict prompt_id -> domain label. low_var is a threshold you tune for your setup."""
    pool = np.concatenate([np.asarray(v, dtype=float) for v in rewards.values()])
    mu, sd = pool.mean(), pool.std() + 1e-8  # common scale so variances are comparable across RMs
    acc, var, by_domain = {}, {}, {}
    for pid, r in rewards.items():
        z = (np.asarray(r, dtype=float) - mu) / sd
        acc[pid] = pairwise_acc(z, np.asarray(gold[pid], dtype=float))
        var[pid] = z.var()
        by_domain.setdefault(domains[pid], []).append(acc[pid])
    domain_acc = {d: np.nanmean(v) for d, v in by_domain.items()}
    worst = min(domain_acc, key=domain_acc.get)
    return {
        "on_policy_acc": float(np.nanmean(list(acc.values()))),
        "mean_reward_var": float(np.mean(list(var.values()))),
        "low_var_prompt_share": float(np.mean([v < low_var for v in var.values()])),
        "worst_domain": worst,
        "worst_domain_acc": float(domain_acc[worst]),
    }
```

When two candidates look similar, prefer the one with higher on-policy accuracy *and* higher reward variance on your policy. Razin et al. found that averaging accuracy with reward variance predicted ground-truth reward increase better than either measure alone.

## What teams get wrong

- **Picking the leaderboard leader.** The top-scoring RewardBench 2 model in the PPO study was off-policy and produced one of the weakest policies. Lineage and prompt distribution beat leaderboard rank.
- **Evaluating once, on the SFT model.** Reward variance is a property of the reward model *and* the policy. A reward model that separates SFT samples well can go flat later in training.
- **Trusting a judge-labeled test set.** If your reference labels come from an LLM judge, you are measuring agreement between two models. The judge shares many of the reward model's blind spots (see [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)).
- **Averaging away the failure.** A reward model that is excellent on chat and near random on chemistry will be exploited on chemistry. Report the minimum.
- **Ignoring disagreement in the reference labels.** If annotators genuinely split on a pair, scoring the reward model as "wrong" for preferring the minority answer adds noise to your evaluation. See [when annotators disagree](/blog/annotator-disagreement-in-preference-data).
- **Treating best-of-N success as RL readiness.** Best-of-N stays near the initial policy; RL moves far from it. Watch for overoptimization during training too (see [how to stop reward hacking in rubric-based RL](/blog/reward-hacking-rubric-based-rl)).

## How Anthroly can help

The expensive, decisive part of this protocol is step 2: reliable reference labels on *your* policy's samples, in the domains you care about. Public benchmarks cannot provide that, and an LLM judge cannot provide it where the judge itself is unreliable.

Anthroly builds expert data and RL environments for AI labs. We have about 100–150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains. We label on-policy samples against domain-specific rubrics, build expert gold sets for reward model evaluation, write style-perturbation and subtle-error probes, and slice the results by domain so you can see where a reward model will break before you spend compute on an RL run.

If you're choosing between reward models, or trying to understand why a high-scoring one isn't moving your policy, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [When annotators disagree: is preference disagreement noise or signal?](/blog/annotator-disagreement-in-preference-data)
- [How many expert labels does it take to fix noisy preference data?](/blog/how-many-expert-labels-fix-noisy-preference-data)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [Rubric rewards vs. reward models](/research/compare/rubric-rewards-vs-reward-models)
- [RLHF preference data, explained](/learn/rlhf-preference-data)
- [Generative vs scalar reward models: should your reward model think before it scores?](/blog/generative-reward-models-vs-scalar-reward-models)
- [Why does RLHF make models verbose? Length bias in reward models, DPO and GRPO](/blog/why-does-rlhf-make-models-verbose-length-bias)
- [How do you prevent reward model overoptimization in RLHF?](/blog/how-to-prevent-reward-model-overoptimization)
- [How do you build multilingual preference data for RLHF?](/blog/how-to-build-multilingual-preference-data-for-rlhf)

---

## References

1. Wen, X., Lou, J., Lu, Y., Lin, H., Yu, X., Lu, X., He, B., Han, X., Zhang, D., & Sun, L. (2024). [Rethinking Reward Model Evaluation: Are We Barking up the Wrong Tree?](https://arxiv.org/abs/2410.05584). arXiv:2410.05584.

2. Malik, S., Pyatkin, V., Land, S., Morrison, J., Smith, N. A., Hajishirzi, H., & Lambert, N. (2025). [RewardBench 2: Advancing Reward Model Evaluation](https://arxiv.org/abs/2506.01937). arXiv:2506.01937. ICLR 2026.

3. Lambert, N., Pyatkin, V., Morrison, J., Miranda, L. J., Lin, B. Y., et al. (2024). [RewardBench: Evaluating Reward Models for Language Modeling](https://arxiv.org/abs/2403.13787). arXiv:2403.13787.

4. Razin, N., Wang, Z., Strauss, H., Wei, S., Lee, J. D., & Arora, S. (2025). [What Makes a Reward Model a Good Teacher? An Optimization Perspective](https://arxiv.org/abs/2503.15477). arXiv:2503.15477.

5. Gao, L., Schulman, J., & Hilton, J. (2022). [Scaling Laws for Reward Model Overoptimization](https://arxiv.org/abs/2210.10760). arXiv:2210.10760.

6. Frick, E., Li, T., Chen, C., Chiang, W.-L., Angelopoulos, A. N., Jiao, J., Zhu, B., Gonzalez, J. E., & Stoica, I. (2024). [How to Evaluate Reward Models for RLHF](https://arxiv.org/abs/2410.14872). arXiv:2410.14872.

7. Liu, Y., Yao, Z., Min, R., Cao, Y., Hou, L., & Li, J. (2024). [RM-Bench: Benchmarking Reward Models of Language Models with Subtlety and Style](https://arxiv.org/abs/2410.16184). arXiv:2410.16184.

8. Ma, Q., Gao, D., Cai, R., Zhao, B., Zhou, H., Zhang, J., & Zhao, Z. (2026). [Personalized RewardBench: Evaluating Reward Models with Human Aligned Personalization](https://arxiv.org/abs/2604.07343). arXiv:2604.07343.
