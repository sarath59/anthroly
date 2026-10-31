---
title: "How Are Expert-Written Benchmarks Like GPQA and Humanity's Last Exam Built, and What Goes Wrong?"
description: "GPQA, Humanity's Last Exam, and FrontierMath are written by PhDs and filtered against frontier models. Post-hoc audits find expert disagreement of 15-18% on HLE, about 29% of its text-only chemistry and biology answers contradicted by literature, and an estimated 10% critical error rate on FrontierMath. Here is how these benchmarks are built, why adversarial filtering concentrates label errors, and a protocol for building one that holds up."
tags:
  - benchmarks
  - expert-data
  - evaluation
  - label-errors
  - gpqa
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-24T05:00:00.000Z'
updatedAt: '2026-10-24T05:00:00.000Z'
faq:
  - question: "How was GPQA built?"
    answer: "Rein et al. (2023) hired 61 Upwork contractors who had completed or were pursuing PhDs. Each question was written by one expert, answered and critiqued by a first expert validator, revised, answered by a second expert validator, and then attempted by three skilled non-experts with unrestricted web access. Pay was mostly bonuses tied to experts answering correctly and non-experts failing, at an estimated average of about $95 per hour. Of 546 questions, 448 form the main set and 198 the Diamond subset."
  - question: "How was Humanity's Last Exam built?"
    answer: "Nearly 1,000 subject experts from over 500 institutions submitted questions that first had to stump frontier LLMs. Over 70,000 attempts produced about 13,000 questions that went to graduate-degree reviewers in two rounds, followed by organizer approval, a public bug bounty, and audits. The final benchmark has 2,500 questions, 24% multiple-choice and the rest exact-match, backed by a $500,000 prize pool."
  - question: "How many errors do expert-written benchmarks contain?"
    answer: "More than most leaderboards assume. HLE's own audits estimate a 15.4% expert disagreement rate on the public set and about 18% on a biology, chemistry, and health subset. FutureHouse estimated that 29.3% (plus or minus 3.7%) of HLE's text-only chemistry and biology answers are directly contradicted by peer-reviewed literature. FrontierMath's authors estimate a critical error rate of about 10%, and MMLU-Redux estimates 6.49% of MMLU questions contain errors."
  - question: "Why does filtering questions against frontier models increase label errors?"
    answer: "A question with a wrong answer key is one that a strong model will usually 'fail', because the model gives the true answer and the key disagrees. So keeping only the questions models get wrong selects for hard questions and for mislabeled ones at the same time. The stronger the filter models, the higher the share of surviving items that are mislabeled. BrowseComp saw this directly: of 118 tasks its best agent never solved, 21 had bad reference answers."
  - question: "How should you build an expert benchmark that holds up?"
    answer: "Have a second expert solve each question blind rather than read the author's solution, pay for objectivity as well as difficulty, give reviewers enough time to verify the answer, re-audit adversarially filtered items with extra scrutiny, estimate the error rate from a random second-expert sample with a confidence interval, keep a private held-out split, and run a rolling correction process after release."
  - question: "How does Anthroly help with expert-written benchmarks?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, writes questions in specialized domains, solves other experts' questions blind, audits existing benchmarks for wrong keys and ambiguity, and estimates error rates with confidence intervals so AI teams know how much of a score is signal."
draft: false
---

**When a lab announces a new score on GPQA Diamond or Humanity's Last Exam, the number reads as a measurement of the model. It is also a measurement of the benchmark: of how its questions were written, filtered, reviewed, and paid for. Expert-written benchmarks are the best tool the field has for measuring frontier capability, and they are also expensive, small, and noisier than their headline numbers suggest. Post-hoc audits of HLE found expert disagreement on 15-18% of items, and an independent audit put the share of contradicted chemistry and biology answers near 29%. This post walks through how GPQA, HLE, and FrontierMath were actually built, shows why filtering questions against frontier models concentrates label errors, and ends with a construction protocol that holds up better.**

## What makes a benchmark "expert-written"?

Three design choices separate expert benchmarks from scraped exam questions like MMLU:

1. **Authorship.** Questions are written fresh by people with graduate training in the field, not copied from textbooks or quizzes, which reduces contamination and raises the ceiling.
2. **Validation by other experts.** Someone other than the author checks that the question has one defensible answer.
3. **A difficulty filter.** Questions must defeat someone: skilled non-experts with Google (GPQA), frontier LLMs (HLE), or both (BrowseComp, for browsing).

Each choice costs money and each introduces its own failure modes. The table summarizes how the best-known benchmarks made them.

| Benchmark | Writers | Validation | Difficulty filter | Size |
|---|---|---|---|---|
| [GPQA](https://arxiv.org/abs/2311.12022) (2023) | 61 PhD-level Upwork contractors | Two expert validators answer, with a revision in between | Three non-experts with web access must mostly fail | 546 extended, 448 main, 198 Diamond |
| [Humanity's Last Exam](https://arxiv.org/abs/2501.14249) (2025) | Nearly 1,000 experts, 500+ institutions, 50 countries | Two rounds of graduate-degree reviewers, organizer approval, bug bounty, audits | Must stump frontier LLMs before submission | 2,500 public questions plus a private held-out set |
| [FrontierMath](https://arxiv.org/abs/2411.04872) (2024) | 60+ mathematicians | At least one blind peer review per problem | Guessproofness rule: under 1% chance of guessing | Hundreds of problems |
| [SuperGPQA](https://arxiv.org/abs/2502.14739) (2025) | 80+ expert annotators | Human-LLM collaborative filtering | Remove trivial or ambiguous items using model responses | 285 disciplines |

## How was GPQA built?

GPQA is the clearest documented example of paying for the right thing. [Rein et al. (2023)](https://arxiv.org/abs/2311.12022) ran a four-stage pipeline in biology, physics, and chemistry:

1. An expert writes a question, four answer choices, and an explanation of why the right answer is right and the distractors are plausible but wrong. Writers were asked to make questions answerable even without the choices.
2. A first expert validator in the same domain answers it and gives feedback.
3. The writer revises, and a second expert validator answers the revised question.
4. Three non-experts (PhDs in *other* domains) attempt it with unrestricted web access but no LLM assistants. They spent 37 minutes per question on average.

The incentive design is the interesting part. Writers earned a $10 base payment, plus $20 for each of two expert validators who answered correctly, $15 for each of three non-experts who answered *incorrectly*, and a $30 bonus if both experts were right and at least two of three non-experts were wrong. By that schedule, a question that is both objective and hard can earn its writer up to $125. The authors estimate an average of about $95 per hour across the work, with a maximum of $150.

That structure pays for *objectivity* (experts agree) and *difficulty* (non-experts fail) at the same time, and it shows in the results. Experts reached 65% accuracy and non-experts 34%, against 25% for random guessing. GPT-4 with few-shot chain of thought got 39%.

Two details from the paper are worth knowing before citing a GPQA number:

- **Expert accuracy is a lower bound on objectivity, not a measure of it.** When the authors went through the second expert validator's 191 mistakes on the extended set, 46% of the time the validator, after reading the writer's explanation, clearly said the question was correct. Their conservative estimate is that 74% of extended-set questions have uncontroversially correct answers (73.6% by one counting, 76.4% by another).
- **The subsets are defined by expert agreement.** GPQA (448) drops questions where both experts were wrong and all three non-experts were right. Diamond (198) keeps only questions where both experts answered correctly (or the second made a clearly acknowledged mistake) and most non-experts failed. Diamond is cleaner because it was filtered on expert agreement, which is also why it is small.

Domains mattered too. Engineering, accounting, and corporate law were piloted and dropped because the questions were not good enough. Within chemistry, expert accuracy was 81% in organic chemistry against 55% for the rest of chemistry.

## How was Humanity's Last Exam built?

[HLE (Phan et al., 2025)](https://arxiv.org/abs/2501.14249) scaled the idea up and swapped the difficulty filter. Instead of non-expert humans, the adversary was frontier LLMs:

- **Pre-submission model filter.** Each question was tested against GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet, and o1 (plus o1-mini and o1-preview for text-only questions). Exact-match questions had to stump all of them; multiple-choice questions had to stump all but one.
- **Volume.** The organizers logged over 70,000 attempts, which yielded about 13,000 model-stumping questions for human review.
- **Two review rounds.** Reviewers with graduate degrees gave each question 1-3 reviews in round one and helped authors refine it; round two selected and approved the best ones.
- **Incentives.** A $500,000 prize pool paid $5,000 for each of the top 50 questions and $500 for each of the next 500, plus co-authorship for anyone with an accepted question.
- **Post-release fixes.** A community bug bounty for label and statement errors, audits by students who fully solved sampled questions, and a private held-out set to detect overfitting.

At release, every frontier model scored low and was badly calibrated: RMS calibration errors were above 70% for all models. The best score in the paper's main table was 13.4%, from o3-mini (high) on the text-only subset.

One sentence in the paper's appendix explains much of what came next: because questions were so specialized, **reviewers were not expected to verify a solution's full rationale if doing so would take more than five minutes**, and focused instead on whether the question fit the guidelines.

## What did the audits find?

Three independent lines of evidence put real numbers on expert-benchmark noise.

**HLE's own audits.** Before release, the organizers audited two samples of 200 questions, revised or removed similar items after the first round, and report a final estimated expert disagreement rate of **15.4%** for the public set. A targeted peer review of a biology, chemistry, and health subset found about **18%** disagreement; if a single dissenting reviewer were enough to flag a question, that would rise to **25%**.

**FutureHouse's literature audit.** [FutureHouse (Skarlinski, Laurent, Bou, and White, 2025)](https://www.futurehouse.org/research/hle-exam) ran their PaperQA2-based agent over HLE's 321 text-only biology/health and chemistry questions, asking it to find supporting or contradicting evidence for each rationale. It flagged 53.3% as conflicting with published evidence. Independent experts reviewed 150 of these outputs, and the extrapolated estimate was **29.3% ± 3.7%** directly contradicted by research, 51.3% supported, and 19.3% "nuanced". They released the supported subset as [HLE Bio/Chem Gold](https://huggingface.co/datasets/futurehouse/hle-gold-bio-chem). Their diagnosis was the incentive: writers had to beat models, while reviewers did not have to verify correctness.

**FrontierMath's second reviews.** [Glazer et al. (2024)](https://arxiv.org/abs/2411.04872) had second reviewers blind-review 30 random problems and 5 public samples. **2 of 35** had an incorrect answer that the first review missed. With a Jeffreys prior that gives a posterior error rate of about 6.9%, and the authors judge a critical error rate of **about 10%** reasonable once errors missed by second reviewers are allowed for. Second reviewers also found 6 of 35 problems missing hypotheses and 2 of 35 guessable with far less work than intended.

Older benchmarks are worse, which is the point of building expert ones. [MMLU-Redux (Gema et al., 2024)](https://arxiv.org/abs/2406.04127) had 14 experts re-annotate 5,700 MMLU questions and estimated that **6.49%** of MMLU contains errors, with 57% of analyzed Virology questions erroneous. Fixing the labels moved rankings: on Virology, Llama 3.1 405B went from 16th to first. [Vendrow et al. (2025)](https://arxiv.org/abs/2502.03461) found errors in about 5% of GSM8K and report that, on most of the 15 benchmarks they cleaned, more than half of model failures traced back to label noise.

| Audit | Benchmark | Estimated error or disagreement |
|---|---|---|
| HLE organizers, public set | HLE | 15.4% expert disagreement |
| HLE organizers, bio/chem/health subset | HLE | ~18% (25% with single-reviewer flagging) |
| FutureHouse | HLE text-only chem/bio | 29.3% ± 3.7% contradicted by literature |
| FrontierMath authors | FrontierMath | ~10% critical errors (2 of 35 caught) |
| MMLU-Redux | MMLU | 6.49% of questions |
| Platinum benchmarks | GSM8K | ~5% |

## Why does adversarial filtering concentrate label errors?

Here is the mechanism that, in our view, explains why HLE's error rates are higher than FrontierMath's despite heavy review. It is a selection effect, and a short calculation shows its size.

Suppose a fraction $e$ of submitted questions have a wrong answer key. On a correctly keyed question, a filter model answers correctly with probability $a$, so the question survives the "must stump the model" filter with probability $1-a$. On a wrongly keyed question, a strong model usually gives the *true* answer, which disagrees with the key, so the question survives unless the model happens to match the wrong key (probability $m$). By Bayes' rule, the share of mislabeled items among survivors is:

$$
P(\text{wrong key} \mid \text{survived}) = \frac{e\,(1-m)}{e\,(1-m) + (1-e)\,(1-a)}
$$

With illustrative values $e = 5\%$ and $m = 10\%$:

| Filter model accuracy on correctly keyed items ($a$) | Mislabeled share after filtering |
|---|---|
| 0.5 | 8.7% |
| 0.7 | 13.6% |
| 0.9 | 32.1% |

A 5% error rate in submissions becomes a 14-32% error rate in the benchmark, and the effect *grows as filter models get stronger*. Requiring several models to fail compounds it. These are assumptions, not measurements, but the observed numbers have the same shape. BrowseComp is the cleanest real example: when OpenAI reviewed the 118 tasks its Deep Research agent never solved, [21 had reference answers that were mismatched, ambiguous, or wrong](https://arxiv.org/abs/2504.12516), and were removed. The hardest-looking tail is where bad keys collect.

The practical consequence: **adversarial filtering is fine, but every item that survives it deserves more verification, not less.** HLE did the opposite at the margin: the filter was strict and the review had a five-minute budget for checking rationales.

## What does label noise do to a score?

If a fraction $e$ of keys are wrong and a model answers correctly-keyed items with accuracy $s$, its measured accuracy is roughly

$$
\widehat{\text{acc}} = s\,(1-e) + q\,e
$$

where $q$ is how often the model matches a *wrong* key (by guessing, or by sharing the author's mistake). Two consequences:

- **There is a ceiling.** A model that is right about everything scores about $1 - e + qe$. If 15% of HLE's public set really is wrong, a perfect model tops out near 85%, and the last stretch of "progress" is either noise or agreement with mistakes.
- **Differences shrink and can flip.** Two models' measured gap is their true gap scaled by $(1-e)$, plus a term from $q$. A model that learned the same misconceptions as question writers gains points; one that is more correct loses them. That is how MMLU-Redux moved a model from 16th to 1st on one subject.

Combine this with sampling error and small benchmarks get fragile quickly. GPQA Diamond has 198 questions; at 50% accuracy, a 95% confidence interval is about ±7 points from sampling alone (see [how many eval items you need](/blog/how-many-eval-items-do-you-need)). Add a few points of label noise and many reported gaps on Diamond are not distinguishable.

## How do you estimate a benchmark's error rate?

FrontierMath's approach is the right one: draw a random sample, have a second expert solve each item blind, count the errors, and report an interval rather than a point. A Jeffreys interval behaves well with small counts:

```python
from scipy.stats import beta

def error_rate_interval(errors: int, audited: int, level: float = 0.95):
    """Jeffreys interval for a benchmark's label-error rate from a blind audit."""
    a, b = errors + 0.5, audited - errors + 0.5
    lo, hi = beta.ppf([(1 - level) / 2, (1 + level) / 2], a, b)
    return a / (a + b), (0.0 if errors == 0 else lo), (1.0 if errors == audited else hi)

print(error_rate_interval(2, 35))    # FrontierMath-style audit: mean ~6.9%, 95% CI ~1.2%-17.1%
print(error_rate_interval(10, 200))  # a larger audit: mean ~5.2%, 95% CI ~2.6%-8.7%
```

The lesson from the first line is that a 35-item audit cannot tell you whether a benchmark's error rate is 2% or 15%. If you will make decisions on gaps of a few points, audit a few hundred items, stratified by domain, because error rates differ sharply by field (HLE's biology and chemistry slices are worse than its overall rate).

## Where do expert-written items go wrong?

Across these papers the same failure patterns recur:

- **Passive review.** A reviewer who reads the author's full solution tends to approve it. FrontierMath's authors say this explicitly and switched to "active review", requiring concrete confirmation, which for abstract problems means solving from key steps only.
- **Time-capped verification.** HLE's five-minute rationale budget let convoluted "gotcha" questions through. FutureHouse's example asks for the rarest noble gas on Earth in 2002 with the answer oganesson.
- **Questions from unpublished research.** HLE intentionally includes knowledge from contributors' own experiments. That resists retrieval, but it also means no external reviewer can check it against literature.
- **Uniqueness failures.** Inverted questions ("find the X that satisfies these constraints") have a correct key but may have other valid answers. BrowseComp's human solvers agreed with the reference on 86.4% of the questions they solved.
- **Hidden assumptions.** Missing hypotheses (6 of 35 in FrontierMath's sample) and unstated context like US jurisdiction in MMLU's law and accounting questions.
- **Single-reviewer calls.** HLE's health subset shows how much a second reviewer matters: 25% flagged by any one reviewer versus 18% after multi-reviewer discussion and author rebuttal.

## What does PhD authorship actually buy?

It is fair to ask whether all this cost is worth it compared with crowdsourcing. The evidence says yes, for specific reasons:

- **A real expertise gap.** GPQA's 65% expert vs. 34% non-expert result, with non-experts spending over half an hour on the web, is exactly the gap you need for scalable-oversight research and for measuring models that know more than a generalist.
- **Fresh items resist contamination.** FrontierMath's problems are new and unpublished, and HLE keeps a private set.
- **Better distractors and explanations.** GPQA's writers explain why each wrong option is tempting, which is also what makes the items useful for training data, not just evaluation.

But a PhD is not a correctness guarantee. GPQA's own experts made enough mistakes that only 74% objectivity could be confirmed, and HLE had nearly 1,000 expert authors. **Expertise buys the ability to write hard questions; verification is what makes them right.** Budgets should reflect that. Our recommendation is to plan for verification taking as much expert time as authoring on the hardest items, since those are the ones the audits above show are most often wrong.

## A protocol for building an expert benchmark that holds up

1. **Pay for objectivity and difficulty together.** Copy GPQA: bonuses when independent experts get the answer right, and when strong non-experts or models get it wrong. Paying only for "stumps the model" pays for errors too.
2. **Blind second solve.** A second domain expert answers each item *without* the solution, then reads it and records agreement, disagreement, or "my mistake".
3. **Filter adversarially, then audit the survivors harder.** Items that frontier models all miss get a third expert, a literature check, or both.
4. **Give verification a real time budget.** If the rationale cannot be checked in the budget, the item is not ready.
5. **Check uniqueness for inverted questions.** Have a solver search for alternative answers for a fixed time, and add constraints when they find one.
6. **Measure the error rate on a random sample** of at least a few hundred items, stratified by domain, and publish the interval.
7. **Keep a private split and a correction process.** HLE's bug bounty and its planned rolling revisions are the right idea; version the benchmark so scores stay comparable.
8. **Report scores with both intervals:** sampling error and the estimated label-error ceiling.

## How Anthroly can help

Building a benchmark like GPQA or HLE comes down to expert hours: writing items that are hard and checkable, and solving other people's items blind until you trust the key. Most AI teams do not have a bench of PhDs across chemistry, biology, physics, law, and finance on call.

Anthroly builds expert data, benchmarks, and RL environments for AI labs. We have about 100–150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains. We write evaluation items with explanations and distractor rationales, run blind second-expert validation, audit existing benchmarks for wrong keys, ambiguity, and non-unique answers, and report error rates with confidence intervals. The same experts can turn validated items into [training-grade RL environments](/blog/what-makes-a-training-grade-rl-environment) with checkable rewards.

If you are building an internal eval or want to know how much of your benchmark score is label noise, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [How do you build an agent benchmark that won't be contaminated or saturated?](/blog/building-contamination-resistant-agent-benchmarks)
- [How many eval items do you need? Error bars, paired tests, and power analysis](/blog/how-many-eval-items-do-you-need)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [When annotators disagree: noise or signal?](/blog/annotator-disagreement-in-preference-data)
- [How do you evaluate deep research and browsing agents?](/blog/how-to-evaluate-deep-research-agents)
- [Expert vs. crowd annotation](/research/compare/expert-vs-crowd-annotation)
- [How do you quality-control expert data labeling? Gold items, audits and label-error detection](/blog/how-to-quality-control-expert-data-labeling)
- [How do you benchmark AI agents on ML research? MLE-bench, PaperBench, RE-Bench](/blog/how-to-benchmark-ai-agents-on-ml-research)
- [How are theorem-proving RL environments built? Lean verifiers, autoformalization, and misformalized statements](/blog/how-are-theorem-proving-rl-environments-built)
- [How do AI labs audit training data licensing and provenance?](/blog/how-do-ai-labs-audit-training-data-licensing-and-provenance)
- [How do you evaluate AI on real professional work?](/blog/how-to-evaluate-ai-on-real-professional-work)
- [How are chemistry and biology RL environments built?](/blog/how-are-chemistry-and-biology-rl-environments-built)
- [How do you evaluate long-context LLMs beyond needle-in-a-haystack?](/blog/how-to-evaluate-long-context-llms-beyond-needle-in-a-haystack)
- [How are medical AI benchmarks built? Physician rubrics, EHR agents and sequential diagnosis](/blog/how-are-medical-ai-benchmarks-built)

---

## References

1. Rein, D., Hou, B. L., Stickland, A. C., Petty, J., Pang, R. Y., Dirani, J., Michael, J., & Bowman, S. R. (2023). [GPQA: A Graduate-Level Google-Proof Q&A Benchmark](https://arxiv.org/abs/2311.12022). arXiv:2311.12022.

2. Phan, L., Gatti, A., Han, Z., Li, N., et al., Wang, A., & Hendrycks, D. (2025). [Humanity's Last Exam](https://arxiv.org/abs/2501.14249). arXiv:2501.14249.

3. Skarlinski, M., Laurent, J., Bou, A., & White, A. (2025). [About 30% of Humanity's Last Exam Chemistry/Biology Answers are Likely Wrong](https://www.futurehouse.org/research/hle-exam). FutureHouse.

4. Glazer, E., Erdil, E., Besiroglu, T., et al. (2024). [FrontierMath: A Benchmark for Evaluating Advanced Mathematical Reasoning in AI](https://arxiv.org/abs/2411.04872). arXiv:2411.04872.

5. Gema, A. P., Leang, J. O. J., Hong, G., et al. (2024). [Are We Done with MMLU?](https://arxiv.org/abs/2406.04127) arXiv:2406.04127.

6. Vendrow, J., Vendrow, E., Beery, S., & Madry, A. (2025). [Do Large Language Model Benchmarks Test Reliability?](https://arxiv.org/abs/2502.03461) arXiv:2502.03461.

7. Du, X., Yao, Y., Ma, K., et al. (2025). [SuperGPQA: Scaling LLM Evaluation across 285 Graduate Disciplines](https://arxiv.org/abs/2502.14739). arXiv:2502.14739.

8. Wei, J., Sun, Z., Papay, S., et al. (2025). [BrowseComp: A Simple Yet Challenging Benchmark for Browsing Agents](https://arxiv.org/abs/2504.12516). arXiv:2504.12516.
