---
title: "How Many Eval Items Do You Need? Error Bars, Paired Tests, and Power Analysis for LLM Evals"
description: "A practitioner's guide to statistical rigor in LLM evaluation: when CLT error bars fail on small expert benchmarks, why paired comparisons and resampling buy statistical power, how clustered questions inflate uncertainty, and how many items you actually need to detect a 2-, 3-, or 5-point difference."
tags:
  - evaluation
  - statistics
  - benchmarks
  - confidence-intervals
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-22T04:30:00.000Z'
updatedAt: '2026-10-22T04:30:00.000Z'
faq:
  - question: "How many questions does an LLM eval need?"
    answer: "It depends on the smallest difference you need to detect. Using a paired comparison and the rule of thumb from Wang (2025) that the paired variance is roughly p(1-p), detecting a 5-point difference at 95% confidence and 80% power near 50% accuracy needs about 785 independent items, a 3-point difference about 2,200, and a 2-point difference about 4,900. Miller (2024) similarly concludes that new evals should contain at least about 1,000 questions to have good signaling ability."
  - question: "Are CLT-based error bars valid for small benchmarks?"
    answer: "Often not. Bowyer, Aitchison and Ivanova (2025) show that CLT-based intervals systematically under-cover on benchmarks with fewer than a few hundred items, especially when accuracy is near 0 or 1. For binary scores they recommend Wilson score intervals or Beta-Bernoulli Bayesian credible intervals, both available in SciPy."
  - question: "What is a paired comparison in LLM evaluation?"
    answer: "A paired comparison evaluates two models on the same questions and computes the standard error of the per-question score differences rather than combining two independent standard errors. Because models tend to agree on which questions are easy and hard, the paired standard error is usually much smaller. Miller (2024) recommends it wherever practicable."
  - question: "Should I lower the sampling temperature to reduce eval variance?"
    answer: "No. Miller (2024) advises against changing temperature to reduce variance, because it can shift variance from the reducible per-question component into the irreducible between-question component, or bias the estimate. Instead, resample each question several times and average, or use next-token probabilities when the task allows it."
  - question: "What are clustered standard errors and when do I need them?"
    answer: "Clustered standard errors account for questions that are drawn in groups, such as several questions about one passage or one problem translated into many languages. Miller (2024) reports clustered standard errors up to about 3x larger than naive ones on DROP using real Anthropic model outputs. If your eval has shared passages, shared environments, or templated variants, cluster at that level."
  - question: "How does Anthroly help with statistically rigorous evals?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, writes and verifies expert eval items in specialized domains. We help teams size an eval for the effect they need to detect, design item clusters deliberately, and produce independent, high-difficulty items so the benchmark has real statistical power."
draft: false
---

**Most LLM eval results are reported as a single bold number. But an eval is an experiment: its questions are a sample, the model's answers are stochastic, and the difference between two models is an estimate with a standard error. Recent work from Anthropic, FAIR, AI2, and academic statisticians converges on a few practical rules: use paired comparisons, resample instead of turning the temperature down, cluster your standard errors, stop trusting CLT error bars on 30-item benchmarks, and plan your sample size before you commission expensive expert items. This post works through each rule, with the math, code, and a sample-size table you can use directly.**

## Why should an eval score come with an error bar?

[Miller (2024)](https://arxiv.org/abs/2411.00640), from Anthropic, frames the problem cleanly: treat the questions in an eval as a random draw from an unseen super-population of questions that measure some skill. The number you actually care about is the model's mean score on that super-population, not on the particular 500 questions that happened to be written.

Under that framing, the observed eval score $\bar{s}$ over $n$ independent questions has a standard error given by the Central Limit Theorem:

$$
\mathrm{SE}_{\text{CLT}} = \sqrt{\frac{\mathrm{Var}(s)}{n}}, \qquad \text{and for binary scores} \qquad \mathrm{SE}_{\text{CLT}} = \sqrt{\frac{\bar{s}(1-\bar{s})}{n}}
$$

That one line already reshapes how you read leaderboards. A model scoring 80% on a 164-item coding benchmark has a standard error of about 3.1 points; the 95% interval spans roughly 74% to 86%. Two models one or two points apart on that benchmark are, on the face of it, indistinguishable.

Miller's recommendations are now the baseline for anyone who takes evals seriously:

1. Report the standard error next to the mean, and report the number of questions.
2. Use clustered standard errors when questions are drawn in groups.
3. Reduce variance by resampling answers (or by using next-token probabilities when there's no chain of thought).
4. Compare models with **paired** differences on the same questions, not by subtracting two headline numbers.
5. Use power analysis to decide whether an eval can answer your question at all.

The rest of this post is about where each rule matters in practice, and where the simple version breaks.

## Where does the noise in an eval actually come from?

There are two sources of variance in an eval score, and they behave very differently. Using the law of total variance, for a model $A$ answering question $x$ with sampling randomness $\epsilon$:

$$
\underbrace{\mathrm{Var}_{x,\epsilon}[A(x,\epsilon)]}_{\text{total}} = \underbrace{\mathrm{Var}_{x}\big[\mathbb{E}_{\epsilon}[A]\big]}_{\text{data noise}} + \underbrace{\mathbb{E}_{x}\big[\mathrm{Var}_{\epsilon}[A]\big]}_{\text{prediction noise}}
$$

This is the decomposition used by [Wang (2025), "Measuring all the noises of LLM Evals"](https://arxiv.org/abs/2512.21326) from FAIR at Meta, following the same structure as Miller's Section 3.

- **Data noise** comes from which questions you sampled. Questions vary in difficulty; a different draw of 500 questions would give a different score. It shrinks only by adding more independent questions.
- **Prediction noise** comes from the model giving different answers to the same question across samples. It shrinks by resampling each question $K$ times and averaging.

Wang measured both components across millions of question-level predictions and over a hundred thousand model pairs. Two findings are directly actionable:

1. **Each eval has a characteristic, predictable total noise level.** For many correctness evals, the paired variance between two models is close to the simple binomial variance of one model: $\mathrm{Var}[A-B] \approx p_A(1-p_A)$. That gives you a usable rule of thumb without custom analysis.
2. **Paired prediction noise typically exceeds paired data noise.** That means averaging several samples per question can buy substantial statistical power—often cheaper than writing more questions.

The second finding is the important one for anyone paying for expert-written items. If prediction noise dominates, the cheapest way to tighten your comparison is more samples per item, not more items.

## Why are paired comparisons almost free power?

The naive way to compare models $A$ and $B$ is to subtract their scores and combine their standard errors as if independent:

$$
\mathrm{SE}_{\text{unpaired}} = \sqrt{\mathrm{SE}_A^2 + \mathrm{SE}_B^2}
$$

But if both models answered the same questions, you can analyze the per-question differences $d_i = s_{A,i} - s_{B,i}$ directly:

$$
\mathrm{SE}_{\text{paired}} = \sqrt{\frac{\mathrm{Var}(d)}{n}} = \sqrt{\mathrm{SE}_A^2 + \mathrm{SE}_B^2 - 2\,\mathrm{Cov}(\bar{s}_A, \bar{s}_B)}
$$

Models agree a lot on which questions are hard. That positive correlation is subtracted out. Miller's worked example with a correlation of 0.5 reduces estimator variance by a third, and he describes paired differences as a "free" reduction in variance. Wang's rule of thumb says the same thing from the other direction: if the unpaired variance of a difference is about $2p(1-p)$ and the paired variance is about $p(1-p)$, pairing roughly halves the variance.

In code, this is a few lines:

```python
import numpy as np

def paired_diff(scores_a: np.ndarray, scores_b: np.ndarray, z: float = 1.96):
    """scores_*: per-question mean scores on the SAME questions, same order.
    If you sampled K answers per question, pass the per-question means."""
    d = scores_a - scores_b
    n = len(d)
    mean = d.mean()
    se = d.std(ddof=1) / np.sqrt(n)
    corr = np.corrcoef(scores_a, scores_b)[0, 1]
    return {"diff": mean, "se": se, "ci95": (mean - z * se, mean + z * se), "corr": corr}
```

Two practical notes that teams get wrong:

- **Don't pool resamples as if they were independent questions.** If you sample each question 5 times, the unit of analysis is still the question. Average within question first, then compute the standard error across questions. Miller states explicitly that a pooled standard error across all answers is inconsistent.
- **Report the correlation.** Miller suggests including pairwise differences, pairwise standard errors, and score correlations in technical reports. The correlation tells readers how much the paired test helped and lets them sanity-check your claim.

## Should you lower the temperature to reduce variance?

No—and this is one of the more counterintuitive results in Miller's paper. Setting temperature to zero removes prediction noise for a given question, which looks like a win. But it doesn't remove uncertainty; it moves it.

Miller's example: a single-token true/false eval where per-question correct-answer probabilities are uniformly distributed on $[0,1]$. At the original temperature, the variance of the conditional means is $1/12$. At temperature zero, each question's score rounds to 0 or 1, and the variance of the conditional means becomes $1/4$—tripling the irreducible variance. In a skewed variant, the expected score itself shifts.

The recommendation is a two-pronged strategy:

- If the eval can be scored from next-token probabilities (no chain of thought), compute expected scores directly—this eliminates prediction noise entirely.
- Otherwise, resample each question $K$ times at the temperature you actually deploy at, and average.

How large should $K$ be? With $\sigma_x^2$ the between-question variance and $\sigma_\epsilon^2$ the mean within-question variance, the variance of the mean score with $K$ samples per question is:

$$
\mathrm{Var}(\bar{s}) = \frac{1}{n}\left(\sigma_x^2 + \frac{\sigma_\epsilon^2}{K}\right)
$$

Once $\sigma_\epsilon^2 / K$ is small relative to $\sigma_x^2$, more samples stop helping. In Miller's uniform-difficulty example, going from $K=1$ to $K=2$ cuts variance by a third and $K=4$ cuts it by half, with a ceiling of two-thirds. For agentic evals—where a single rollout can cost dollars of compute and where tiny environment perturbations change outcomes—this matters a lot. The [OpenCUA](https://arxiv.org/abs/2508.09123) authors report that their 7B model at temperature 0 on OSWorld showed a gap of more than 18 points between Pass@1 (20.1%) and Pass@16 (38.6%) from near-identical initial states. "Deterministic" decoding did not make the eval deterministic.

## What happens when questions aren't independent?

The CLT formula assumes independent questions. Many evals violate this by construction:

- Reading-comprehension evals with several questions per passage (DROP, RACE, SQuAD, QuAC).
- Multilingual evals where the same item is translated into many languages (MGSM).
- Agent benchmarks where many tasks share one environment, website, or repository.
- Templated or procedurally generated variants of a seed problem.

Miller adapts **clustered standard errors** from econometrics. With clusters $c$, question scores $s_{i,c}$, and overall mean $\bar{s}$:

$$
\mathrm{SE}_{\text{clustered}} = \sqrt{\mathrm{SE}_{\text{CLT}}^2 + \frac{1}{n^2}\sum_{c}\sum_{i}\sum_{j \neq i} (s_{i,c}-\bar{s})(s_{j,c}-\bar{s})}
$$

The extra term captures within-cluster correlation. If questions within a cluster are perfectly correlated, the cluster behaves like a single observation; if uncorrelated, you recover the naive formula.

This is not a rounding error. On real Anthropic model outputs, Miller reports clustered standard errors **3.05x** the naive ones on DROP and **1.88x** on MGSM. An unclustered 95% interval on DROP would be roughly a third as wide as it should be.

The practitioner's takeaway: **the effective sample size of your eval is closer to the number of clusters than the number of questions** when intra-cluster correlation is high. A benchmark of 2,500 items built from 250 seed problems is not a 2,500-item benchmark. When you commission new items, it is usually better to pay for more independent seeds than for more variants per seed.

## When do CLT error bars fail on small benchmarks?

Frontier evaluation increasingly runs on small, expensive benchmarks: a 15-problem competition set, a few hundred expert-written questions, a 75-task agentic suite. [Bowyer, Aitchison and Ivanova (2025)](https://arxiv.org/abs/2503.01747) argue in a 2025 position paper that CLT-based intervals "fail to provide adequate uncertainty estimates" in this regime, usually by producing error bars that are too small. They note examples like CUAD (510 documents, annotated by law students and reviewed by attorneys at an estimated cost of around $2 million) and FrontierMath (around 300 problems written with over 60 mathematicians)—exactly the kind of high-value, small-$n$ benchmarks where getting uncertainty right matters most.

We reproduced the core point with an exact binomial coverage calculation (no simulation noise): for each $n$ and true accuracy $p$, we summed the probability of every outcome whose 95% interval contains $p$.

| Items ($n$) | True accuracy | Wald (CLT) coverage | Wilson coverage | Beta(1,1) Bayesian coverage |
|---|---|---|---|---|
| 15 | 0.80 | 81.5% | 98.2% | 98.2% |
| 15 | 0.95 | 53.6% | 96.4% | 96.4% |
| 30 | 0.95 | 78.2% | 93.9% | 93.9% |
| 100 | 0.95 | 87.7% | 96.6% | 96.6% |
| 500 | 0.95 | 93.2% | 95.0% | 95.0% |
| 500 | 0.50 | 94.6% | 94.6% | 94.6% |

*Exact coverage of nominal 95% intervals for a binomial proportion; our calculation using SciPy.*

A "95%" CLT interval on a 15-item benchmark where the model is strong covers the truth barely half the time. It also produces impossible intervals: 14/15 correct gives a CLT interval of roughly (0.81, 1.06). The Wilson interval for the same data is about (0.70, 0.99)—honest about how little 15 items tell you.

Bowyer et al. recommend Wilson score intervals or Beta-Bernoulli Bayesian credible intervals for single-model binary evals, and Bayesian methods for clustered, paired, and non-average metrics like F1. Both simple options are one-liners:

```python
from scipy.stats import binomtest, beta

def binary_eval_intervals(successes: int, n: int, level: float = 0.95):
    r = binomtest(k=successes, n=n)
    wilson = r.proportion_ci(confidence_level=level, method="wilson")
    posterior = beta(1 + successes, 1 + (n - successes))  # uniform prior
    return {
        "wilson": (wilson.low, wilson.high),
        "bayes": posterior.interval(level),
    }

print(binary_eval_intervals(14, 15))
```

Their library [bayes_evals](https://github.com/sambowyer/bayes_evals) covers the clustered and paired cases. Note that Bowyer et al. also find the bootstrap performs poorly in small-data settings—so "we bootstrapped it" is not a fix.

## How many items do you need to detect a real difference?

This is the question to answer **before** you pay anyone to write items. Miller gives a full sample-size formula for paired comparisons with resampling; the simplest useful version, combining it with Wang's rule of thumb that the paired variance is about $p(1-p)$, is:

$$
n \approx \frac{(z_{1-\alpha/2} + z_{1-\beta})^2 \; p(1-p)}{\delta^2}
$$

where $\delta$ is the minimum detectable effect (MDE), $\alpha$ is the false-positive rate, and $1-\beta$ is power. With $\alpha = 0.05$ and 80% power, $(z_{0.975} + z_{0.8})^2 \approx 7.85$. Inverting gives the MDE for an eval you already have:

$$
\delta_{\min} \approx 2.80 \sqrt{\frac{p(1-p)}{n}}
$$

Here's what that implies (our calculation, paired comparison, one sample per item, independent items):

| Independent items ($n$) | MDE at $p=0.5$ | MDE at $p=0.7$ | MDE at $p=0.9$ |
|---|---|---|---|
| 100 | 14.0 pts | 12.8 pts | 8.4 pts |
| 300 | 8.1 pts | 7.4 pts | 4.9 pts |
| 500 | 6.3 pts | 5.7 pts | 3.8 pts |
| 1,000 | 4.4 pts | 4.1 pts | 2.7 pts |
| 2,000 | 3.1 pts | 2.9 pts | 1.9 pts |
| 5,000 | 2.0 pts | 1.8 pts | 1.2 pts |

And in the other direction, at $p = 0.5$ (the worst case):

| Difference you need to detect | Independent items needed |
|---|---|
| 10 pts | ~197 |
| 5 pts | ~785 |
| 3 pts | ~2,181 |
| 2 pts | ~4,906 |
| 1 pt | ~19,623 |

These are in the same range as Miller's own worked example: with continuous next-token-probability scores and a paired variance of $1/9$ (lower than the binary worst case of $1/4$), detecting a 3-point difference at 80% power needs about 969 independent questions, which leads him to suggest that new evals "should contain at least 1,000 questions in order to have good signaling ability." Binary pass/fail scoring near 50% accuracy roughly doubles that requirement. Three caveats:

1. **The rule of thumb is a rule of thumb.** Wang finds it holds for many correctness evals, with exceptions documented in the paper. If you have question-level data from prior runs, estimate the paired variance directly.
2. **Clustering inflates $n$.** Divide by a design effect. If your clustered standard error is 1.9x the naive one, you need roughly $1.9^2 \approx 3.6$ times as many items for the same MDE.
3. **Resampling deflates $n$ when prediction noise dominates.** Miller's formula includes $K$; Wang's measurements suggest prediction noise is usually the larger paired component, so $K > 1$ is often the cheapest lever.

You can run these numbers interactively with our [eval sample-size calculator](/research/eval-sample-size-calculator).

## Is a 100-item "tiny" benchmark enough?

It depends on the question you're asking. [tinyBenchmarks (Polo et al., 2024)](https://arxiv.org/abs/2402.14992) shows that 100 curated MMLU examples are sufficient to accurately estimate a model's MMLU score, using item response theory to choose and weight items. That's a real result and a useful one for cheap tracking.

But estimating one model's score to within a few points is a different task from detecting a 2-point difference between two close checkpoints. The table above says 100 independent binary items can't reliably detect differences smaller than ~8–14 points in a paired test. Curated subsets borrow strength from a model population used to fit the IRT model; that works when the new model resembles that population and can break when it doesn't—exactly the situation with a new frontier checkpoint.

The broader lesson, echoed by [Madaan et al. (2024)](https://arxiv.org/abs/2406.10229) from Meta: variance is a property of the benchmark you should measure, not assume. They quantify seed variance across training runs and find that simple changes (like framing multiple-choice tasks as completion tasks for ~7B models) can reduce variance, while more involved methods from human testing, such as item analysis and IRT, "struggle to meaningfully reduce variance."

## What makes a benchmark useful for decisions, not just leaderboards?

[Heineman et al. (2025), "Signal and Noise"](https://arxiv.org/abs/2508.13144) from AI2 shifts the question from "how big is the error bar?" to "can this benchmark separate better models from worse ones?" They define:

- **Signal:** a benchmark's ability to separate better models from worse ones.
- **Noise:** a benchmark's sensitivity to random variability between training steps.

Across 30 benchmarks and 375 open-weight models (60M to 32B parameters), benchmarks with a higher signal-to-noise ratio were more reliable for small-scale decisions, and lower-noise benchmarks gave lower scaling-law prediction error. Their interventions are practical: switch to metrics with better signal and noise (e.g., perplexity rather than accuracy where appropriate), filter noisy subtasks from multi-task aggregates, and average intermediate checkpoints.

For expert-authored benchmarks this reframes what "quality" means. A benchmark item is valuable if it **discriminates**—some models get it, some don't, and the pattern is stable across seeds. Items that every model fails, or that flip randomly between checkpoints, add cost without adding signal.

## What do teams get wrong most often?

From the papers above and from building expert evals ourselves, the recurring mistakes:

- **Bolding a 1-point win on a 200-item benchmark.** The MDE at $n=200$ is roughly 10 points.
- **Comparing models with unpaired error bars.** You throw away about half your power when both models ran on the same items.
- **Pooling resamples as independent observations.** This makes error bars look tighter than they are.
- **Ignoring clusters.** Shared passages, shared environments, translated variants, and templated items all reduce your effective $n$.
- **Using CLT intervals on 15–50 item suites.** Use Wilson or Bayesian intervals.
- **Turning the temperature to zero "for reproducibility."** You may have increased the irreducible variance and changed what you're measuring.
- **Commissioning items before computing the MDE.** If your product decision hinges on a 3-point difference, a 300-item benchmark can't tell you the answer no matter how good the items are.
- **Forgetting contamination.** None of this statistics helps if the items leaked into pretraining. See our notes on [evaluation datasets and contamination](/learn/evaluation-datasets-contamination) and [building contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks).

There is a deeper tension here. The trend toward small, expensive, expert-written benchmarks is right on validity: those items measure what frontier models actually struggle with. But small $n$ is in direct tension with statistical power. The way out isn't to go back to 14,000 easy multiple-choice questions. It's to (a) plan sample sizes against the decisions you need to make, (b) spend on independent seeds rather than variants, (c) resample to kill prediction noise, (d) compare paired, and (e) report honest intervals.

## A reporting checklist

For every eval result you publish internally or externally:

- [ ] Number of items **and** number of independent clusters
- [ ] Mean score with standard error (clustered if applicable) or a Wilson/Bayesian interval for small $n$
- [ ] Samples per item ($K$) and the decoding temperature actually used
- [ ] For model comparisons: paired difference, paired SE or 95% CI, and the score correlation
- [ ] The MDE the eval could detect, given $n$, $K$, and observed variance
- [ ] Contamination controls (release dates, canaries, held-out splits)

If you grade with an LLM judge rather than exact match, add the judge's measured agreement with experts and propagate that uncertainty too—see [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders).

## How Anthroly can help

Statistical power for frontier evals is, in the end, a data problem: you need enough *independent*, *discriminating*, *uncontaminated* items in domains where only experts can write and verify them.

Anthroly builds expert evals and RL environments for AI labs. We have about 100–150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains. We help teams work backward from the decision—"we need to detect a 3-point difference on graduate-level chemistry reasoning"—to an item budget, a cluster design, and a verification protocol, then write and verify the items with domain experts.

If you're sizing a new benchmark or wondering whether your current one can actually answer the questions you're asking of it, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [Eval sample-size calculator](/research/eval-sample-size-calculator)
- [Evaluation datasets and contamination](/learn/evaluation-datasets-contamination)
- [How do you build an agent benchmark that won't be contaminated or saturated?](/blog/building-contamination-resistant-agent-benchmarks)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How do you collect training data for computer-use agents?](/blog/how-to-collect-computer-use-agent-trajectory-data)

---

## References

1. Miller, E. (2024). [Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations](https://arxiv.org/abs/2411.00640). arXiv:2411.00640.

2. Wang, S. I. (2025). [Measuring all the noises of LLM Evals](https://arxiv.org/abs/2512.21326). arXiv:2512.21326.

3. Bowyer, S., Aitchison, L., & Ivanova, D. R. (2025). [Position: Don't Use the CLT in LLM Evals With Fewer Than a Few Hundred Datapoints](https://arxiv.org/abs/2503.01747). arXiv:2503.01747.

4. Madaan, L., Singh, A. K., Schaeffer, R., Poulton, A., Koyejo, S., Stenetorp, P., Narang, S., & Hupkes, D. (2024). [Quantifying Variance in Evaluation Benchmarks](https://arxiv.org/abs/2406.10229). arXiv:2406.10229.

5. Polo, F. M., Weber, L., Choshen, L., Sun, Y., Xu, G., & Yurochkin, M. (2024). [tinyBenchmarks: evaluating LLMs with fewer examples](https://arxiv.org/abs/2402.14992). arXiv:2402.14992.

6. Heineman, D., Hofmann, V., Magnusson, I., Gu, Y., Smith, N. A., Hajishirzi, H., Lo, K., & Dodge, J. (2025). [Signal and Noise: A Framework for Reducing Uncertainty in Language Model Evaluation](https://arxiv.org/abs/2508.13144). arXiv:2508.13144.

7. Wang, X., Wang, B., Lu, D., Yang, J., Xie, T., et al. (2025). [OpenCUA: Open Foundations for Computer-Use Agents](https://arxiv.org/abs/2508.09123). arXiv:2508.09123.
