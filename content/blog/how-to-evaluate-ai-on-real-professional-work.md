---
title: "How Do You Evaluate AI on Real Professional Work? What GDPval, HealthBench, APEX, FinanceBench and LegalBench Teach About Expert Evals"
description: "Professional-work evals now drive frontier lab roadmaps. Here is how GDPval, HealthBench, APEX, FinanceBench and LegalBench are built: who writes the tasks, how rubrics and pairwise expert grading work, how far automated graders get (66% vs. 71% agreement on GDPval), what each design misses, and a protocol for building a domain eval that holds up."
tags:
  - agent-evals
  - expert-data
  - rubrics
  - llm-as-a-judge
  - benchmarks
  - data-labeling
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-29T04:50:00.000Z'
updatedAt: '2026-10-29T04:50:00.000Z'
faq:
  - question: "How do you evaluate AI on real professional work?"
    answer: "The current best practice has three parts: tasks written by working professionals from their own day-to-day work, often with real reference files; a grading scheme that experts in the same occupation trust, either blinded pairwise comparison against a human deliverable (GDPval) or task-specific rubrics with many pass/fail criteria (HealthBench, APEX); and a calibrated automated grader for scale, validated against expert agreement before anyone relies on it."
  - question: "What is GDPval?"
    answer: "GDPval is an OpenAI benchmark of 1,320 tasks across 44 occupations in the top nine sectors of U.S. GDP, with a 220-task open gold subset. Tasks are based on real work products from professionals averaging 14 years of experience, each reviewed an average of five times. Experts in the same occupation blindly compare model and human deliverables; on the gold subset, 47.6% of Claude Opus 4.1's deliverables were rated as good as or better than the expert's."
  - question: "How does HealthBench grade model responses?"
    answer: "HealthBench contains 5,000 multi-turn health conversations, each with a conversation-specific rubric written by physicians; 262 physicians who practiced in 60 countries wrote 48,562 unique criteria. Each criterion carries a point value between -10 and 10. A model grader (GPT-4.1) checks each criterion independently, and the score is the points earned divided by the maximum possible. On physician-consensus criteria, the grader's agreement with physicians was comparable to physician-physician agreement, ranging from the 37.5th to the 88.2nd percentile of physicians by theme."
  - question: "Can an LLM replace expert graders on professional tasks?"
    answer: "Not yet as a standalone. GDPval's experimental automated grader agreed with human experts 66% of the time, against 71% agreement between experts. HealthBench's grader matched typical physicians on most themes but fell to the 37.5th percentile on health data tasks. Automated graders are useful for fast iteration, but they need expert-labeled calibration sets per domain and periodic re-checks."
  - question: "Why do rubric-based professional evals use so many criteria?"
    answer: "Rubrics decompose quality into discrete, checkable statements, like unit tests for prose. APEX-v1-extended averages 14.81 criteria per case and HealthBench about 11.5 per conversation. More criteria make grading more objective, but APEX cut its average from 29.09 criteria in v1.0, removing excess criteria, which suggests that redundant or overlapping criteria add noise and grading cost without adding signal."
  - question: "What do professional-work evals still miss?"
    answer: "Mostly the parts of work that happen before the deliverable. GDPval's authors note that its tasks are precisely specified and one-shot; when prompts were cut to about 42% of their length, GPT-5 performed worse because it struggled to find the needed context. Tacit knowledge, proprietary tools, multi-person communication and long-running iteration are largely out of scope for current benchmarks."
  - question: "How does Anthroly help build professional-domain evals?"
    answer: "Anthroly sources practitioners and PhDs to write realistic tasks with reference files, design and audit rubrics, run blinded pairwise expert grading, and build calibration sets for automated graders in medicine, law, finance, science and engineering. Its bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**For most of the last decade, "expert-level" evaluation meant multiple-choice exams: bar questions, medical licensing items, graduate science problems. Those are now largely saturated or contaminated, and they never measured the thing buyers care about, which is whether a model can do the work: draft the brief, build the model in the spreadsheet, write the care plan. The response has been a new class of benchmark built from real professional work and graded by working professionals. GDPval, HealthBench, Mercor's APEX, FinanceBench and LegalBench each make different choices about who writes tasks, what counts as correct and who grades. Those choices decide what the number means. This post compares them and distils a protocol for building a domain eval that holds up.**

## The short answer

A trustworthy professional-work eval needs four things. **Tasks** written by practitioners from their own work, with the reference files a real task would include. **A grading standard** that the occupation would recognize: either blinded pairwise comparison against an expert's deliverable, or a task-specific rubric of many objective pass/fail criteria. **Measured grader reliability**, meaning inter-expert agreement reported alongside any automated grader's agreement with experts. And **honest scope**: what the tasks leave out. The headline lesson from the current generation is that automated graders get close to, but not to, expert agreement. GDPval's grader agreed with experts 66% of the time against 71% expert-expert agreement, and HealthBench's grader ranged from the 37.5th to the 88.2nd percentile of physicians depending on theme. The expert layer has moved, not disappeared: from answering questions to writing tasks, writing rubrics and calibrating graders.

## How do the major professional evals compare?

| Benchmark | Scope | Who wrote tasks | How it is graded | Headline result |
|---|---|---|---|---|
| GDPval (Patwardhan et al., 2025) | 1,320 tasks, 44 occupations, 9 GDP sectors; 220-task open gold subset | Professionals averaging 14 years' experience, from real work products; average 5 human reviews per task | Blinded pairwise expert comparison vs. a human deliverable; experimental automated grader | Claude Opus 4.1: 47.6% of deliverables rated as good as or better than the expert's |
| HealthBench (Arora et al., 2025) | 5,000 multi-turn health conversations | 262 physicians who practiced in 60 countries; 48,562 unique rubric criteria | Per-conversation rubric, criteria weighted -10 to 10, graded by GPT-4.1 | o3: 60%; no model above 32% on HealthBench Hard |
| APEX-v1-extended (Vidgen et al., 2025) | 400 held-out cases: investment banking, management consulting, big law, primary care medicine | 137 vetted experts, mean 7+ years' experience | Prompt-specific rubrics (mean 14.81 criteria) scored by an LM judge | GPT-5 (Thinking = High): 67.0% |
| FinanceBench (Islam et al., 2023) | 10,231 questions on public company filings, with answers and evidence strings | Built by the authors' team with quality control; 150-case human-eval sample | Manual review of 2,400 model answers | GPT-4-Turbo with retrieval answered incorrectly or refused on 81% |
| LegalBench (Guha et al., 2023) | 162 tasks across six types of legal reasoning, from 36 data sources | Legal professionals hand-crafted many tasks and are co-authors | Mostly classification and extraction tasks with automatic scoring | Designed as a capability map rather than a single score |

These span a design arc. LegalBench and FinanceBench, from 2023, mostly have short, checkable answers: classification, extraction, numerical lookups. They are cheap to grade and good at localizing failures, but they test pieces of work. HealthBench and APEX move to open-ended responses graded by rubrics. GDPval goes furthest, asking for full deliverables (documents, spreadsheets, slides) that take an expert an average of seven hours and grading them holistically against a human's version.

## How are the tasks written?

The common thread is that tasks come from practitioners' real work, not from exam banks. GDPval's tasks are constructed from actual work products, a legal brief, an engineering blueprint, a nursing care plan, and every task in the full set went through automated model-based screening and multiple rounds of human expert review, an average of five reviews and at least three. Each task's economic value was estimated from its completion time and the occupation's median wage.

APEX is the most explicit about vetting the writers. Experts sourced from Mercor's platform completed a 30 to 45 minute interview, then a paid one to two hour assessment of their ability to write prompts and rubrics, and underperformers were offboarded during the project. Prompts and rubrics were reviewed separately, with reviewers able to reject or request changes. Experts found or created source documents for each case (PDF, XLSX, DOCX, CSV and text, up to 100,000 tokens combined), and paywalled or restrictively licensed sources were prohibited. Mean expert-estimated completion time for a task was 2.7 hours, ranging from half an hour to 20.

LegalBench took a different route: legal professionals contributed datasets that they believed measured an interesting legal reasoning skill or a practically useful task, and joined as co-authors. That incentive structure, credit rather than per-item pay, produced breadth (162 tasks) and expert ownership of each task's validity.

The practitioner lesson is that task quality is set at intake. Interviewing and test-tasking writers, reviewing tasks and rubrics as separate artifacts, and requiring realistic source files do more for validity than any amount of post-hoc filtering.

## Pairwise comparison or rubric?

The two grading paradigms make different bets.

**Pairwise comparison against an expert deliverable** (GDPval) asks a grader from the same occupation which of two unlabeled deliverables is better. It captures holistic quality, including formatting, judgement and what was left out, and its output, a win rate against humans, is easy to interpret. It is expensive: grading each gold-subset comparison took experts more than an hour on average, and GDPval collected three samples per model per task, each graded by three experts. Blinding is imperfect. The authors note that style can leak identity: OpenAI outputs often used em dashes, Claude outputs often used first-person phrasing, and Grok occasionally referred to itself by name.

**Rubrics** (HealthBench, APEX) decompose quality into self-contained criteria that a human or model can mark pass or fail, described by APEX as analogous to unit tests for code. HealthBench weights each criterion and allows negative criteria for harmful behavior. Its per-example score is:

$$
s = \frac{\sum_{i} p_i \, \mathbb{1}[\text{criterion } i \text{ met}]}{\sum_{i:\, p_i > 0} p_i}, \qquad p_i \in [-10, 10] \setminus \{0\}
$$

so a response can score below zero if it meets more harmful criteria than helpful ones; HealthBench clips the aggregate to the 0 to 1 range when reporting. Rubrics are cheaper to grade at scale and diagnostic, since you can see which criteria fail. Their risk is that they reward checking boxes: a response can satisfy every listed criterion and still be worse overall than one that misses a criterion but gets the core judgement right.

APEX's own history shows the tuning problem. Its v1.0 cases averaged 29.09 criteria; the extended version averages 14.81, partly because new cases have fewer criteria and partly because excess criteria were removed from the originals. More criteria is not monotonically better: overlapping criteria double-count the same behavior and add grading noise.

A reasonable rule: use rubrics when correctness can be stated as discrete, verifiable claims (a diagnosis was considered, a covenant was flagged, a number is right) and pairwise comparison when quality is genuinely holistic. Many teams will want both, with rubrics for fast iteration and periodic pairwise grading as the ground truth.

## How far do automated graders get?

Every one of these benchmarks wants an automated grader, because expert grading at this depth costs hours per item. The reported numbers are encouraging but not sufficient:

- **GDPval:** the experimental automated grader agreed with human experts 66% of the time, against 71% inter-expert agreement on the same pairwise comparisons. The authors describe it as faster and cheaper but not yet as reliable as expert graders.
- **HealthBench:** on its physician-consensus criteria, GPT-4.1's agreement with physicians, measured as macro F1, was compared against each individual physician's. By theme, the grader ranked between the 37.5th percentile (health data tasks) and the 88.2nd percentile (context seeking) of physicians, and above the median on six of seven themes. The authors also tuned the grading prompt and rephrased individual criteria "so that their intent was unmistakable to the grader".

Two patterns stand out. First, grader quality varies by sub-domain more than by benchmark: the same grader is above most physicians on one theme and below most on another. A single overall agreement number hides where the grader is unsafe to use. Second, part of grader performance is achieved by editing the rubric for the grader. That is legitimate, but it means rubric criteria are written for two audiences, and the version that a model grades well is not necessarily the version an expert would write.

## What do these evals still miss?

The most important limitation is stated plainly by GDPval's authors: tasks are precisely specified and one-shot, whereas in real work it takes effort to figure out the full context and what to work on. In an experiment with prompts cut to about 42% of their original length, removing pointers to where data lived and what format was expected, GPT-5's performance dropped because it struggled to find the context. Tasks requiring tacit knowledge, proprietary tools, personally identifiable information or communication between people were out of scope.

The other gaps follow the same pattern. FinanceBench's questions were intentionally clear-cut as a minimum standard, and its authors noted that the long-context configurations that improved accuracy are unrealistic for enterprise use. APEX evaluates single-turn responses, appending an instruction to each prompt so models give a complete answer in one go. None of these benchmarks yet measure iteration with a client, recovering from a wrong assumption or knowing when to escalate. That is where the next generation of professional evals, and the RL environments built from them, will have to go.

## A protocol for building a professional-domain eval

1. **Recruit writers like you would hire.** Interview for domain depth, then pay for a test task that includes writing a prompt and rubric. Track per-writer quality and offboard early.
2. **Start from real work products.** Have each task mirror something the writer actually produced, and include realistic source files rather than a self-contained prompt.
3. **Review prompts and rubrics separately.** A good task with a bad rubric is a bad eval item. Require at least three independent reviews, as GDPval did.
4. **Choose the grading paradigm per task type.** Rubrics for discrete, verifiable claims; blinded pairwise comparison against an expert deliverable for holistic quality.
5. **Write rubrics as objective, self-contained claims,** include negative criteria for harmful behavior, and prune overlapping criteria.
6. **Measure inter-expert agreement first.** It is the ceiling for any automated grader and tells you which tasks are too subjective to score.
7. **Calibrate automated graders per sub-domain** against expert labels, and report agreement by theme rather than one average.
8. **Strip identity signals before pairwise grading,** including stylistic tells, and randomize order.
9. **Include under-specified variants** so the eval measures whether the model can find context and ask, not just execute a perfect brief.
10. **Keep a held-out set private and refresh it.** APEX keeps its 400 evaluation cases closed and open-sources 100 separate examples; that split protects the score from contamination.

## Where do experts fit?

Notice what all five benchmarks paid experts to do. Not to answer questions: to write realistic tasks from their own work, to define what good looks like in rubrics, to grade holistically when rubrics fall short, and to produce the agreement data that tells you whether an automated grader can be trusted. As automated graders improve, the expert hours shift further upstream, toward task design, rubric design and calibration, but they do not go away, because every automated grader in these papers was validated against expert labels. The same assets, realistic tasks, rubrics and calibrated graders, are what turn an eval into a reward signal for RL on professional work.

## How Anthroly can help

Anthroly builds professional-domain evals and the expert layer behind them: practitioner- and PhD-written tasks with realistic reference files in medicine, law, finance, science and engineering; rubric design and audits; blinded pairwise expert grading; inter-rater agreement studies; and calibration sets for automated graders, broken down by sub-domain. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building an eval or reward signal for real professional work and want to pressure-test your rubrics or grader, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How are expert-written benchmarks like GPQA and Humanity's Last Exam built?](/blog/how-expert-written-benchmarks-are-built)
- [LLM-as-a-judge vs. expert graders: when can you trust an automated grader?](/blog/llm-as-a-judge-vs-expert-graders)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [How many eval items do you need?](/blog/how-many-eval-items-do-you-need)
- [How do you quality-control expert data labeling?](/blog/how-to-quality-control-expert-data-labeling)
- [How do you evaluate deep research and browsing agents?](/blog/how-to-evaluate-deep-research-agents)

---

## References

1. Patwardhan, T., et al. (2025). [GDPval: Evaluating AI Model Performance on Real-World Economically Valuable Tasks](https://arxiv.org/abs/2510.04374). arXiv:2510.04374.
2. OpenAI (2025). [Measuring the performance of our models on real-world tasks](https://openai.com/index/gdpval/). Blog post.
3. Arora, R. K., et al. (2025). [HealthBench: Evaluating Large Language Models Towards Improved Human Health](https://arxiv.org/abs/2505.08775). arXiv:2505.08775.
4. Vidgen, B., et al. (2025). [The AI Productivity Index: APEX-v1-extended](https://arxiv.org/abs/2509.25721). arXiv:2509.25721.
5. Islam, P., et al. (2023). [FinanceBench: A New Benchmark for Financial Question Answering](https://arxiv.org/abs/2311.11944). arXiv:2311.11944.
6. Guha, N., et al. (2023). [LegalBench: A Collaboratively Built Benchmark for Measuring Legal Reasoning in Large Language Models](https://arxiv.org/abs/2308.11462). arXiv:2308.11462.
