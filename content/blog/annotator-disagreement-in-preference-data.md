---
title: "When Annotators Disagree: Is Preference Disagreement Noise or Signal for Reward Models?"
description: "Preference annotators disagree on a quarter to two-fifths of pairs in major RLHF datasets, and most of it is not random error. This post covers agreement metrics, why Bradley-Terry reward models erase disagreement, expert vs. crowd label flips, and a practical protocol for handling split votes."
tags:
  - rlhf
  - preference-data
  - reward-modeling
  - data-labeling
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-22T12:30:00.000Z'
updatedAt: '2026-10-22T12:30:00.000Z'
faq:
  - question: "How often do human annotators disagree on RLHF preference data?"
    answer: "Often. In InstructGPT, training labelers agreed with each other 72.6% plus or minus 1.5% of the time. Zhang et al. (2024) found diverging preferences in about 39% of MultiPref pairs and 24% of HelpSteer2 pairs, with quadratic weighted Cohen's kappa of 0.268 and 0.389 respectively."
  - question: "Is annotator disagreement just noise?"
    answer: "Mostly not. Zhang et al. (2024) built a taxonomy of disagreement causes and found that most disagreements come from task underspecification or response style (verbosity, format, complexity, aesthetic taste), plus refusals and genuinely hard-to-spot errors. Only the last category behaves like classic label noise that adjudication can fix."
  - question: "What happens when you train a Bradley-Terry reward model on split votes?"
    answer: "It learns to be decisive anyway. Zhang et al. (2024) showed that Bradley-Terry and regression reward models assign reward gaps to diverging-preference pairs similar to those for high-agreement pairs, even when trained on every individual annotation, and were slightly worse than random at identifying which pairs were contested. Distributional reward models improved that detection AUROC by about 0.16."
  - question: "Do expert annotators and crowd annotators label preferences differently?"
    answer: "Yes, at the item level. On 2,885 MultiPref items where each pool was internally unanimous, Jha (2026) found expert and crowd majorities differed on 23.6% of items and named opposite winners on 9.2%, even though a six-model leaderboard built from either pool was identical. Anything that consumes per-item labels, such as reward model training or judge validation, inherits that difference."
  - question: "Should I drop low-agreement pairs from my preference dataset?"
    answer: "Not wholesale. Gooding and Mansoor (2023) found that training a summarization reward model on a range of agreement levels beat training only on high-agreement pairs, while the lowest-agreement pairs alone gave the worst results. Separate errors, which should be adjudicated, from genuine divergence, which is better kept as a soft label or tie."
  - question: "How does Anthroly handle annotator disagreement in expert data?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, labels with multiple independent experts per item where it matters, records the reason for each preference, adjudicates factual errors with a senior domain expert, and delivers vote distributions and disagreement categories rather than only a majority label."
draft: false
---

**Every preference dataset is built on a quiet assumption: that there is one right answer to "which response is better?", and that annotators who disagree with it are making mistakes. The data says otherwise. Annotators in major RLHF datasets disagree on a quarter to two-fifths of pairs, most of that disagreement has sensible causes, and expert and crowd pools disagree with each other at the item level even when their leaderboards look identical. Meanwhile, the standard Bradley-Terry recipe turns every split vote into a confident preference. This post covers how to measure disagreement properly, what reward models do with it, and a protocol for handling it that keeps the signal and removes the noise.**

## How much do preference annotators actually disagree?

The numbers have been in the papers all along:

| Dataset / study | Disagreement measure | Value |
|---|---|---|
| InstructGPT training labelers ([Ouyang et al., 2022](https://arxiv.org/abs/2203.02155)) | Pairwise agreement | 72.6% ± 1.5% |
| InstructGPT held-out labelers | Pairwise agreement | 77.3% ± 1.3% |
| Summarization researchers (Stiennon et al., 2020, as reported by Ouyang et al.) | Pairwise agreement | 73% ± 4% |
| MultiPref ([Zhang et al., 2024](https://arxiv.org/abs/2410.14632)) | Pairs with diverging preferences | ~39% |
| HelpSteer2 (Zhang et al., 2024) | Pairs with diverging preferences | 24% |
| MultiPref / HelpSteer2 | Quadratic weighted Cohen's $\kappa$ | 0.268 / 0.389 |

Agreement can be improved by process. In [HelpSteer2 (Wang et al., 2024)](https://arxiv.org/abs/2406.08673), quadratic weighted $\kappa$ for helpfulness rose from 0.465 in the initial collection to 0.706 after the team clarified guidelines with their vendor, and 0.791 after post-processing. Coherence, by contrast, went only from 0.169 to 0.428. Some attributes are simply harder to agree on, and no amount of guideline editing makes them objective.

## Is raw percent agreement a good quality metric?

No. Percent agreement mixes real agreement with agreement you'd get by chance. Cohen's $\kappa$ corrects for it:

$$
\kappa = \frac{p_o - p_e}{1 - p_e}
$$

where $p_o$ is observed agreement and $p_e$ is the agreement expected if the two annotators labeled independently with their own base rates. For a binary "A or B" preference where each annotator picks each side half the time, $p_e = 0.5$, so InstructGPT's 72.6% agreement corresponds to $\kappa = (0.726 - 0.5)/0.5 \approx 0.45$. That sounds a lot less reassuring than "73%".

Two refinements matter in practice:

- **Use weighted $\kappa$ for graded scales.** HelpSteer2 used quadratic weights because its scores are ordinal: a 0-versus-4 disagreement should cost much more than 0-versus-1.
- **Use Krippendorff's $\alpha$ when coverage is uneven**, for example when different subsets of annotators label different items, or when labels can be sets (multiple reasons for a preference). Zhang et al. used Krippendorff's $\alpha$ with MASI distance for exactly that case.

Also report agreement **per category** (domain, task type, attribute), not as one global number. A dataset with high agreement on math and near-chance agreement on creative writing will produce a reward model with the same split personality.

## Why is disagreement not just noise?

[Zhang et al. (2024), "Diverging Preferences"](https://arxiv.org/abs/2410.14632) (ICML 2025) manually analyzed disagreements in MultiPref and HelpSteer2 and built a taxonomy of causes, with reasonable inter-rater reliability on the taxonomy itself ($\kappa = 0.59$, $\alpha = 0.68$ on MultiPref). The categories:

1. **Task underspecification.** The prompt allows several valid interpretations and the two responses address different ones.
2. **Response style:** verbosity, format (lists, headings, paragraphs), complexity (how much expertise the response assumes), and aesthetic taste.
3. **Refusals**, including disagreements between two different kinds of refusal.
4. **Errors**, where a mistake is hard to spot or its severity is judged differently.

They found the majority of disagreements come from underspecification and style. Only the error category behaves like the "noisy label" assumption baked into most reward modeling. The others reflect real differences between users. A model trained to always pick one side of them is not learning quality; it is learning one annotator population's taste.

## What does a Bradley-Terry reward model do with a split vote?

Bradley-Terry models the probability that response $A$ is preferred to $B$ as a logistic function of the reward gap:

$$
P(A \succ B) = \sigma(r_A - r_B) = \frac{1}{1 + e^{-(r_A - r_B)}}
$$

Now suppose a fraction $q$ of annotators prefer $A$. If you train on the **soft** target $q$, the per-pair loss and its optimum are:

$$
\mathcal{L}(\Delta) = -q \log \sigma(\Delta) - (1-q)\log \sigma(-\Delta), \qquad \frac{\partial \mathcal{L}}{\partial \Delta} = \sigma(\Delta) - q = 0 \;\Rightarrow\; \Delta^{*} = \log\frac{q}{1-q}
$$

where $\Delta = r_A - r_B$. A 3-to-1 split ($q = 0.75$) should give a gap of $\log 3 \approx 1.10$, and a 2-to-2 split should give zero. But the standard pipeline first collapses votes to a **majority label**, which sets $q = 1$, and the loss then keeps pushing $\Delta$ upward with no finite optimum. Every contested pair is trained as if it were unanimous.

Zhang et al. measured exactly this. Reward models trained on MultiPref and HelpSteer2 (Llama-3-8B-Instruct base) predicted reward gaps on diverging-preference pairs that were about as large as on high-agreement pairs, even when trained on all individual annotations rather than majority labels. On the task of flagging which pairs annotators disagreed on (AUROC), standard single-value reward models scored slightly **below random**:

| Reward model (MultiPref) | Preference accuracy | Diverging-pair AUROC |
|---|---|---|
| Skywork-Reward-Gemma-2-27B | 0.651 | 0.494 |
| Llama-3.1-Nemotron-70B-Reward | 0.638 | 0.400 |
| Bradley-Terry, majority labels | 0.663 | 0.458 |
| Bradley-Terry, all labels | 0.648 | 0.438 |
| Mean-Var distributional RM (KL) | 0.664 | 0.615 |

Their distributional reward model predicts a mean and a variance per response, keeps preference accuracy unchanged, and identifies contested pairs far better. The authors summarize this as an AUROC improvement of about 0.16 over standard reward models. That variance estimate is directly useful during RL: down-weight or skip prompts where the reward model knows humans split.

They also show that LLM-as-judge benchmarks punish models for behaviors that are reasonable under disagreement, such as asking a clarifying question on an underspecified prompt or refusing on a borderline one, because the judge always picks a winner.

## Do expert and crowd annotators disagree?

Yes, and the size of the gap is easy to miss. MultiPref ([Miranda et al., 2024](https://arxiv.org/abs/2410.19133)) collected two crowdworker and two screened-expert labels per pair. A recent independent analysis, [Jha (2026), "Whose Gold?"](https://arxiv.org/abs/2608.15980), restricted attention to the 2,885 MultiPref items where both pools were internally unanimous, so no tie-breaking rule was involved, and found:

- expert and crowd majorities **differed on 23.6%** of items and **named opposite winners on 9.2%**;
- on MT-Bench human judgments, benchmark authors and recruited experts differed on 30.5% and reversed on 8.5% of comparable cells;
- the two experts on a single MultiPref item disagreed with each other 50.1% of the time;
- yet the six-model leaderboards built from expert labels and from crowd labels were **identical** (Kendall $\tau = 1.00$).

The author's point is that the identical leaderboard is a property of having only six well-separated models, not evidence that the pools agree. By their estimate, the same per-item perturbation would displace at least one model in a ten-model leaderboard with probability 0.86. And anything that consumes per-item labels, such as reward model training, active-learning routing, or validating an LLM judge, inherits the full item-level gap. In their tests, three LLM judges agreed measurably more with the crowd majority than with the expert majority. "Our judge agrees with humans X% of the time" depends on which humans you hired.

This is a single-author preprint and its numbers are a floor (it conditions on the easier, unanimous items), but its message lines up with Diverging Preferences: the label is a property of the item *and* the annotator pool.

## Should you filter out low-agreement pairs?

There is a tempting shortcut: keep only pairs where everyone agrees. The evidence is mixed in an instructive way.

- [Gooding and Mansoor (2023)](https://arxiv.org/abs/2311.04919) trained summarization reward models on subsets of the Stiennon et al. data sampled by agreement level. Training on a **range** of agreement levels produced better reward models and better downstream RLHF summaries than maximizing agreement. Training on only the lowest-agreement comparisons was consistently the worst. Their reading: unanimous pairs are often easy (one summary is plainly broken) and teach superficial features, while moderately contested pairs carry the subtle quality distinctions.
- [Yao et al. (2026), DMAPO](https://arxiv.org/abs/2607.25136) goes the other way for on-policy data: generate responses from the target policy, score them with several rubric-specialized LLM evaluators, and keep only high-consensus examples. It kept 1,871 of 54,236 candidates (3.45%) and reports strong results with KTO, at the cost of extra curation compute and dependence on evaluator judgments.

These are compatible once you separate the two kinds of disagreement. Consensus filtering removes ambiguous **errors** and borderline cases cheaply. Throwing away every contested pair also throws away underspecified prompts and style-sensitive comparisons, which is where a reward model needs to learn *uncertainty* rather than a confident preference.

## When does adding more annotators help?

The usual answer to disagreement is "add annotators and take the majority." That works for errors and fails for divergence, and the difference is easy to show.

**If disagreement is independent error**, each annotator agrees with a true label with probability $a$, and the majority of three is correct with probability:

$$
P_{\text{maj},3} = a^3 + 3a^2(1-a)
$$

At $a = 0.75$ that is about 0.84; with five annotators it rises to about 0.90. More annotators converge on the truth.

**If disagreement is genuine divergence**, there is no hidden true label, only a population preference rate $q$. With $k$ annotators, the estimate $\hat{q}$ has standard error:

$$
\mathrm{SE}(\hat{q}) = \sqrt{\frac{q(1-q)}{k}}
$$

At $q = 0.5$ and $k = 4$, as in MultiPref, that is 0.25. Four votes cannot tell a 50/50 pair from a 75/25 one, and a majority vote turns either into a hard label. Adding annotators here sharpens your estimate of the split; it does not reveal a winner because none exists.

The operational consequence is to **triage before you scale**. Spend extra annotations on pairs where a reason code says "error" or "factual", and record contested-style pairs as distributions or ties.

## A practical protocol for preference data with disagreement

1. **Write the prompt to remove avoidable underspecification.** Many diverging pairs come from ambiguous instructions; fixing the prompt set is cheaper than relabeling.
2. **Collect at least two independent labels per pair on a stratified sample**, and three or more on high-stakes domains. Keep per-annotator labels and annotator IDs; don't ship only the majority.
3. **Require a reason code with every preference** (correctness, completeness, safety, verbosity, format, tone, interpretation). The taxonomy above is a good starting set.
4. **Measure agreement per category** with weighted $\kappa$ or Krippendorff's $\alpha$, and track it over time, as HelpSteer2 did when tightening guidelines.
5. **Adjudicate errors, preserve divergence.** Send disagreements coded as correctness or safety to a senior domain expert for a binding decision. Keep style and interpretation disagreements as soft labels or ties.
6. **Train with soft targets or a distributional reward model** so contested pairs produce small reward gaps and a usable uncertainty estimate.
7. **Decide whose preferences you are modeling.** If the product serves experts, label with experts, and validate any LLM judge against the expert pool specifically.

## What teams get wrong

- **Reporting one global agreement number.** It hides the domains where the reward model will be weakest.
- **Treating majority vote as ground truth.** A 3–2 vote and a 5–0 vote become the same training example.
- **Paying for more annotators instead of better prompts.** If the disagreement is underspecification, the fix is upstream.
- **Validating a judge against the wrong pool.** A judge that matches crowd taste can still disagree with experts on the items that matter.
- **Evaluating reward models on contested pairs as if they were unanimous.** That penalizes well-calibrated reward models (see [how to evaluate a reward model](/blog/how-to-evaluate-a-reward-model)).

## How Anthroly can help

Disagreement is cheapest to handle at collection time: the right annotators, multiple independent labels where they matter, reason codes, and an adjudication path for real errors. It is expensive to reconstruct afterward from a majority-vote export.

Anthroly builds expert preference data, evals and RL environments for AI labs. We have about 100–150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains. We collect independent expert labels with reason codes, measure agreement per domain, adjudicate correctness disputes with senior experts, and deliver vote distributions and disagreement categories alongside the labels, so your reward model can learn both what experts prefer and where they legitimately split.

If your preference data has more disagreement than you can explain, or you need expert labels to sit alongside a crowd or AI-labeled pool, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [Does reward model accuracy predict RLHF results? How to evaluate a reward model](/blog/how-to-evaluate-a-reward-model)
- [How many expert labels does it take to fix noisy preference data?](/blog/how-many-expert-labels-fix-noisy-preference-data)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [Synthetic data vs expert human data: when does AI-generated data work?](/blog/synthetic-data-vs-expert-human-data)
- [Expert vs. crowd annotation](/research/compare/expert-vs-crowd-annotation)
- [RLHF preference data, explained](/learn/rlhf-preference-data)
- [Post-training glossary](/research/glossary)
- [How are expert-written benchmarks like GPQA and Humanity's Last Exam built?](/blog/how-expert-written-benchmarks-are-built)
- [DPO vs PPO and GRPO: when is offline preference optimization enough?](/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough)

---

## References

1. Ouyang, L., Wu, J., Jiang, X., Almeida, D., Wainwright, C. L., Mishkin, P., et al. (2022). [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155). arXiv:2203.02155.

2. Zhang, M. J. Q., Wang, Z., Hwang, J. D., Dong, Y., Delalleau, O., Choi, Y., Choi, E., Ren, X., & Pyatkin, V. (2024). [Diverging Preferences: When do Annotators Disagree and do Models Know?](https://arxiv.org/abs/2410.14632). arXiv:2410.14632. ICML 2025.

3. Wang, Z., Dong, Y., Delalleau, O., Zeng, J., Shen, G., Egert, D., Zhang, J. J., Sreedhar, M. N., & Kuchaiev, O. (2024). [HelpSteer2: Open-source dataset for training top-performing reward models](https://arxiv.org/abs/2406.08673). arXiv:2406.08673.

4. Miranda, L. J. V., Wang, Y., Elazar, Y., Kumar, S., Pyatkin, V., et al. (2024). [Hybrid Preferences: Learning to Route Instances for Human vs. AI Feedback](https://arxiv.org/abs/2410.19133). arXiv:2410.19133.

5. Jha, A. (2026). [Whose Gold? Annotator-Pool Disagreement Is Large at the Item Level, and Hidden by Small Leaderboards](https://arxiv.org/abs/2608.15980). arXiv:2608.15980.

6. Gooding, S., & Mansoor, H. (2023). [The Impact of Preference Agreement in Reinforcement Learning from Human Feedback: A Case Study in Summarization](https://arxiv.org/abs/2311.04919). arXiv:2311.04919.

7. Yao, Z., Li, R., Chen, X., Cheng, J., Le, C., et al. (2026). [Less Data, Better Alignment: Data-Centric Multi-Evaluator Agreement for Preference Optimization](https://arxiv.org/abs/2607.25136). arXiv:2607.25136.
