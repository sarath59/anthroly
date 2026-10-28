---
title: "How Do You Quality-Control Expert Data Labeling? Gold Items, Audit Sampling, and Label-Error Detection"
description: "Published benchmarks built by careful teams still ship with label error rates of several percent. Here is a practitioner's QA stack for expert-labeled training and eval data: calibration, gold items, overlap with Dawid-Skene aggregation, audit sampling with the math for sample sizes, model-assisted error detection, and the failure modes that let bad labels through."
tags:
  - data-labeling
  - quality-control
  - expert-annotation
  - evals
  - label-errors
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-26T05:00:00.000Z'
updatedAt: '2026-10-26T05:00:00.000Z'
faq:
  - question: "How common are label errors in AI datasets and benchmarks?"
    answer: "More common than most teams assume. Northcutt et al. (2021) estimated an average of at least 3.3% label errors across the test sets of 10 widely used datasets, including at least 6% of the ImageNet validation set. Gema et al. (2024) re-annotated 5,700 MMLU questions and estimated that 6.49% of MMLU questions contain errors, with 57% of the analysed Virology questions containing errors."
  - question: "What is a gold item in data labeling?"
    answer: "A gold item (also called a honeypot or gold-standard question) is a task with a known, expert-verified answer that is mixed into an annotator's queue without being marked. Agreement with gold items gives a per-annotator accuracy estimate. Gold items work best for onboarding and drift detection, and worst when experienced annotators can recognise them or when they are easier than the real work."
  - question: "How many labeled items should you audit to verify quality?"
    answer: "If you want 95% confidence that the true error rate is below a threshold p, and you will accept the batch only if the audit finds zero errors, you need n of at least ln(0.05) / ln(1 - p) items: about 59 items for a 5% threshold, 149 for 2%, and 299 for 1%. If you expect to find some errors, report a Wilson confidence interval on the observed error rate instead of a point estimate."
  - question: "Does high inter-annotator agreement mean the labels are correct?"
    answer: "No. Agreement measures consistency, not correctness. Two experts trained on the same flawed guideline, or sharing the same misconception, will agree on the wrong answer. Agreement should be paired with adjudication by a senior expert on a sample and with audits against independently derived answers."
  - question: "Can LLMs be used to find label errors?"
    answer: "Yes, as a flagging step rather than a final judge. Nahum et al. (2024) used an ensemble of LLMs to flag potentially mislabeled examples in factual-consistency datasets and found a substantial number of label errors whose correction raised reported model performance. Flags still need human adjudication: in Northcutt et al. (2021), only 51% of algorithmically flagged candidates were confirmed as errors on average."
  - question: "How does Anthroly quality-control expert data?"
    answer: "Anthroly uses a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready to commit, and layers calibration, hidden gold items, targeted overlap, senior-expert adjudication and statistically sized audits, with the audit results delivered alongside the data."
draft: false
---

**Every frontier lab has a story about a dataset that looked clean until someone audited it. Published benchmarks built by careful academic teams routinely ship with several percent of their labels wrong, and expert-written training data has the same problem with a higher price tag. This post lays out a quality-control stack for expert-labeled data, with the math for sizing audits and the specific ways each layer fails.**

## How bad is the problem, really?

The best evidence comes from people who went back and checked.

- [Northcutt, Athalye and Mueller (2021)](https://arxiv.org/abs/2103.14749) audited the test sets of 10 commonly used vision, language and audio datasets. They estimate an average of at least 3.3% label errors, including at least 6% of the ImageNet validation set, and show that corrected labels can change which model looks best.
- [Gema et al. (2024)](https://arxiv.org/abs/2406.04127) manually re-annotated 5,700 MMLU questions across all 57 subjects and estimate that 6.49% of MMLU questions contain errors. In the Virology subset, 57% of the analysed questions had errors.
- [Nahum et al. (2024)](https://arxiv.org/abs/2410.18889) found a substantial number of label errors in factual-consistency datasets, and that correcting them shifted reported model performance upward: many of the "model mistakes" were label mistakes.

Expert data is not immune. In [GPQA](https://arxiv.org/abs/2311.12022), validators with or pursuing PhDs in the relevant field reached 65% accuracy against the question writers' answers (74% after discounting mistakes the experts themselves identified in retrospect). On genuinely hard material, a single expert's answer is a hypothesis, not ground truth.

Why this matters more for post-training than it used to: an eval with a 5% label error rate puts a ceiling on measured accuracy and adds noise exactly where frontier models are being compared, and a reward signal trained or verified against wrong labels teaches the policy the wrong thing at scale. The cost of a bad label is no longer one wrong data point. It is a gradient pointed the wrong way, repeated every time the item is sampled.

## The QA stack, layer by layer

No single check catches everything. What works is a set of layers with different blind spots.

| Layer | What it catches | Relative cost | Blind spot |
|---|---|---|---|
| Guideline calibration | Ambiguous instructions, misread task | Low, one-time per project | Errors nobody anticipated |
| Hidden gold items | Inattentive or drifting annotators | Low per item | Items that are easier than or recognisable from the real work |
| Overlap plus aggregation | Individual random errors | Linear in overlap factor | Correlated errors shared by annotators |
| Senior adjudication | Disagreements and hard cases | High per item | Only sees what gets routed to it |
| Statistical audit | Batch-level error rate | Medium, sized by math | Systematic errors the auditor shares |
| Model-assisted flagging | Outliers across the whole set | Low compute, human review needed | Errors the model also makes |

### 1. Calibrate before you label

Most systematic errors are written into the guideline. Before production, have three to five experts label the same 30-50 items independently, then review every disagreement together. Each disagreement is either an annotator error, a genuine ambiguity in the item, or a gap in the guideline. Only the third kind should change the guideline, and every change should be versioned so you can tell which labels were made under which rules.

### 2. Gold items: useful, but easy to fool yourself with

Gold items are tasks with expert-verified answers mixed silently into the queue. They give a running accuracy estimate per annotator. Three things go wrong:

- **Distribution mismatch.** Gold items are usually chosen because the answer is unambiguous, which makes them easier than the median real item. Annotators can score 98% on gold and much lower on the hard tail.
- **Recognition.** Experienced annotators learn to spot gold (reused items, suspiciously clean prompts). Rotate the pool and draw gold from the same generator as real items.
- **Stale answers.** Gold answers carry their own error rate. Re-adjudicate any gold item that many strong annotators "fail".

### 3. Overlap and aggregation

Assigning each item to several annotators and aggregating is the classic fix. [Snow et al. (2008)](https://aclanthology.org/D08-1027/) showed for several NLP annotation tasks that aggregating a small number of non-expert labels per item could approach expert-level quality. Majority vote is the simplest aggregator; the [Dawid and Skene (1979)](https://doi.org/10.2307/2346806) model does better when annotators differ in skill. Each annotator $a$ gets a confusion matrix

$$
\pi^{(a)}_{kj} = P(\text{annotator } a \text{ says } j \mid \text{true label } k)
$$

and EM alternates between estimating each item's posterior over true labels,

$$
P(z_i = k \mid \text{labels}) \propto \rho_k \prod_{a} \prod_{j} \left(\pi^{(a)}_{kj}\right)^{n^{(a)}_{ij}}
$$

and re-estimating class priors $\rho_k$ and confusion matrices from those posteriors. The output is not just a label but a per-item confidence, which tells you exactly which items to send to adjudication.

The catch is the model's core assumption: annotators err independently given the true label. Experts trained in the same school, reading the same guideline, err together. Aggregation reduces random noise and does nothing for shared misconceptions, which is why high agreement is not proof of correctness.

### 4. Senior adjudication

Route low-confidence items, disagreements and a random slice of agreed items to a senior expert who did not label them. The random slice matters: if you only adjudicate disagreements, you never learn how often annotators agree on the wrong answer. Record the adjudicator's reasoning, because those notes become the next guideline revision.

### 5. Audit sampling: how many items to check

Audits answer one question: is this batch's error rate below the contract threshold $p$? The cleanest version is a zero-failure acceptance test. If the true error rate were $p$, the chance of drawing $n$ items with no errors is $(1-p)^n$. To reject that scenario at confidence $1-\alpha$, require

$$
(1-p)^n \le \alpha \quad\Longrightarrow\quad n \ge \frac{\ln \alpha}{\ln(1-p)}
$$

At 95% confidence this gives about 59 items for $p = 5\%$, 149 for $p = 2\%$, and 299 for $p = 1\%$ (the "rule of three" approximation $n \approx 3/p$ is close). The sample size depends on the threshold, not on the batch size, so auditing 1% of a large batch is often far more than you need and auditing 1% of a small batch is far too little.

When an audit finds some errors, report an interval rather than a point estimate. The Wilson score interval behaves well at small error counts:

```python
import math

def zero_failure_n(p, alpha=0.05):
    """Items to audit so that zero errors implies error rate < p at 1 - alpha confidence."""
    return math.ceil(math.log(alpha) / math.log(1 - p))

def wilson(errors, n, z=1.96):
    """95% Wilson interval for the true error rate."""
    phat = errors / n
    denom = 1 + z**2 / n
    center = (phat + z**2 / (2 * n)) / denom
    half = z * math.sqrt(phat * (1 - phat) / n + z**2 / (4 * n**2)) / denom
    return center - half, center + half

print([zero_failure_n(p) for p in (0.05, 0.02, 0.01)])  # [59, 149, 299]
print(wilson(3, 200))  # roughly (0.005, 0.043)
```

Three found errors in 200 audited items is a point estimate of 1.5% but an upper bound above 4%. A team that reports "1.5% error" from that audit is overstating what it knows.

Two practical rules: stratify the audit sample by annotator, domain and difficulty so a bad annotator cannot hide in a good average, and make sure the auditor is independent of the original labeler.

### 6. Model-assisted error detection

Models are good at pointing at suspicious items across a whole dataset. [Confident learning (Northcutt et al., 2021)](https://arxiv.org/abs/1911.00068) uses a trained model's out-of-sample predicted probabilities to estimate the joint distribution of given and true labels and rank likely errors. LLM ensembles can do something similar for text tasks, as [Nahum et al. (2024)](https://arxiv.org/abs/2410.18889) show. [Klie et al. (2022)](https://arxiv.org/abs/2206.02280) reimplemented 18 annotation-error-detection methods and found prior work rarely compared methods on shared datasets, so treat any single method's headline precision with caution.

The non-negotiable part is human adjudication of flags. In Northcutt et al. (2021), crowd reviewers confirmed only 51% of algorithmically flagged candidates as real errors on average. Auto-relabeling to match the model would have corrupted roughly half of what it touched, and in a way biased toward the model's own beliefs. That bias is the worst possible property for an eval set meant to measure the model.

## What teams most often get wrong

- **Measuring agreement and calling it accuracy.** Kappa and alpha measure consistency. Pair them with audits against independently derived answers.
- **Using the model under evaluation to QA its own eval.** LLM-judge QA shares the blind spots of the models being compared. Use it to flag, never to decide.
- **Auditing only at the end.** A 2% error rate found after delivery means relabeling everything; found in week one, it means fixing one guideline.
- **Unversioned guidelines.** If labels from before and after a rule change are mixed without a version field, nobody can fix them later.
- **Treating "PhD" as a QA layer.** Credentials raise the ceiling, but the GPQA numbers show that even experts disagree with each other on hard items. Expertise needs process around it.
- **Forgetting the grader.** For RL environments, the verifier is a label too. Test it against a held set of known-correct and known-incorrect solutions with the same rigour as the data.

## A minimal QA spec you can put in a contract

1. Guideline version, calibration round results and the disagreement log.
2. Gold item rate (for example 5% of the queue), rotation policy and per-annotator gold accuracy.
3. Overlap factor and aggregation method, with per-item confidence delivered.
4. Adjudication rule: all disagreements plus a random share of agreed items.
5. Audit threshold $p$, confidence level, sample size from the formula above, stratification, and the Wilson interval reported per batch.
6. Error-detection pass with the confirmed-error rate of flags reported.

## How Anthroly can help

Quality control is where expert data earns its price. Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready to commit, works inside exactly this kind of stack: calibrated guidelines, hidden gold, targeted overlap, adjudication by senior domain experts who did not do the original labeling, and audits sized to your threshold, with the audit report shipped alongside the data. We also audit existing datasets and verifiers, which is often the fastest way to find out how much of a plateau is really label noise.

If you want a second set of expert eyes on a dataset or an eval before it shapes a training run, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How many expert labels fix noisy preference data?](/blog/how-many-expert-labels-fix-noisy-preference-data)
- [Annotator disagreement in preference data](/blog/annotator-disagreement-in-preference-data)
- [How are expert-written benchmarks built?](/blog/how-expert-written-benchmarks-are-built)
- [How many eval items do you need?](/blog/how-many-eval-items-do-you-need)
- [How do you benchmark AI agents on ML research?](/blog/how-to-benchmark-ai-agents-on-ml-research)
- [Glossary: gold set](/research/glossary#gold-set)
- [Expert vs crowd annotation](/research/compare/expert-vs-crowd-annotation)
- [Which agent trajectories should you fine-tune on? Outcome filtering, step masking, and failed runs](/blog/which-agent-trajectories-should-you-fine-tune-on)
- [How do AI labs audit training data licensing and provenance?](/blog/how-do-ai-labs-audit-training-data-licensing-and-provenance)

---

## References

1. Northcutt, C. G., Athalye, A., & Mueller, J. (2021). [Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks](https://arxiv.org/abs/2103.14749). arXiv:2103.14749.

2. Gema, A. P., Leang, J. O. J., Hong, G., Devoto, A., Mancino, A. C. M., Saxena, R., et al. (2024). [Are We Done with MMLU?](https://arxiv.org/abs/2406.04127). arXiv:2406.04127.

3. Nahum, O., Calderon, N., Keller, O., Szpektor, I., & Reichart, R. (2024). [Are LLMs Better than Reported? Detecting Label Errors and Mitigating Their Effect on Model Performance](https://arxiv.org/abs/2410.18889). arXiv:2410.18889.

4. Rein, D., Hou, B. L., Stickland, A. C., Petty, J., Pang, R. Y., Dirani, J., et al. (2023). [GPQA: A Graduate-Level Google-Proof Q&A Benchmark](https://arxiv.org/abs/2311.12022). arXiv:2311.12022.

5. Snow, R., O'Connor, B., Jurafsky, D., & Ng, A. (2008). [Cheap and Fast - But is it Good? Evaluating Non-Expert Annotations for Natural Language Tasks](https://aclanthology.org/D08-1027/). EMNLP 2008.

6. Dawid, A. P., & Skene, A. M. (1979). [Maximum Likelihood Estimation of Observer Error-Rates Using the EM Algorithm](https://doi.org/10.2307/2346806). Applied Statistics, 28(1), 20-28.

7. Northcutt, C. G., Jiang, L., & Chuang, I. L. (2021). [Confident Learning: Estimating Uncertainty in Dataset Labels](https://arxiv.org/abs/1911.00068). arXiv:1911.00068.

8. Klie, J.-C., Webber, B., & Gurevych, I. (2022). [Annotation Error Detection: Analyzing the Past and Present for a More Coherent Future](https://arxiv.org/abs/2206.02280). arXiv:2206.02280.
