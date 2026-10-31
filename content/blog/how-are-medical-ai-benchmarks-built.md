---
title: "How Are Medical AI Benchmarks Built? From Licensing Exams to Physician Rubrics, EHR Agents and Sequential Diagnosis"
description: "A practitioner's guide to how medical and clinical LLM benchmarks are built: why MedQA-style exams saturated, how HealthBench and HealthBench Professional use physician-written rubrics, how MedHELM covers real clinical tasks, how MedAgentBench and PhysicianBench test EHR agents, how SDBench and KlinikeBench test interactive diagnosis, and how to build a clinical evaluation set that holds up."
tags:
  - evals
  - benchmarks
  - healthcare-ai
  - expert-data
  - rubrics
  - llm-evaluation
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-31T04:50:00.000Z'
updatedAt: '2026-10-31T04:50:00.000Z'
faq:
  - question: "How are medical AI benchmarks built?"
    answer: "Modern ones are built by physicians in four layers: realistic tasks (real or physician-authored conversations, clinician requests, EHR records or published cases), expert-written grading criteria (conversation-specific rubrics or task checkpoints), a grader validated against physician judgment, and physician baselines. HealthBench, for example, has 5,000 conversations scored against 48,562 rubric criteria written by 262 physicians across 26 specialties and 60 countries, graded by a model whose agreement with physicians was measured per theme."
  - question: "Why are medical licensing exam benchmarks no longer enough?"
    answer: "Because frontier models have saturated them and they do not resemble clinical work. MedHELM (Bedi et al.) notes that LLMs reach about 99% on MedQA-style exams, while only 5% of LLM evaluations use real EHR data and 64% focus on licensing exams and diagnosis, leaving out documentation, patient communication and administrative work. KlinikeBench found models with 90.7% diagnostic accuracy from complete information succeeded on under 30% of full interactive clinical encounters."
  - question: "What is HealthBench?"
    answer: "HealthBench (Arora et al., OpenAI, 2025) is an open benchmark of 5,000 realistic, mostly multi-turn health conversations with users and clinicians. Each response is scored against conversation-specific rubric criteria with point values from -10 to +10, written by physicians. It has seven themes (such as emergency referrals and context seeking) and five axes (such as accuracy and communication), plus HealthBench Hard, where the top score at release was 32%, and HealthBench Consensus, with 34 physician-validated criteria."
  - question: "What is HealthBench Professional?"
    answer: "HealthBench Professional (Hicks et al., OpenAI, 2026) evaluates models on 525 real tasks clinicians bring to ChatGPT for Clinicians, across care consult, writing and documentation, and medical research. Rubrics were written and iteratively adjudicated by three or more physicians across three phases, about one-third of examples are deliberate adversarial testing, difficult examples were enriched roughly 3.5 times from a pool of 15,079 candidates, and the primary score is adjusted for response length."
  - question: "How are clinical AI agents evaluated?"
    answer: "In simulated or real EHR environments with execution-checked tasks. MedAgentBench has 300 physician-written tasks across 10 categories over 100 patient profiles with more than 700,000 data elements in a FHIR-compliant environment; the best model at publication reached 69.67%. PhysicianBench has 100 long-horizon tasks adapted from real primary-care-to-specialist consultations across 21 specialties, averaging 27 tool calls and graded at 670 checkpoints; the best agent reached 46% pass@1."
  - question: "Can an LLM grader replace physicians for scoring medical answers?"
    answer: "Partly, if you measure it. HealthBench found its GPT-4.1 grader exceeded the average physician's agreement in five of seven themes on consensus criteria, and MedHELM's LLM jury reached an ICC of 0.47 with clinician ratings, slightly above clinician-clinician agreement of 0.43. Both results come from explicit meta-evaluation against physician labels; a grader that has not been validated that way should not be trusted on clinical content."
  - question: "How does Anthroly help build medical AI evaluations?"
    answer: "Anthroly works with PhD and clinically trained experts to author realistic clinical tasks, write and adjudicate conversation-specific rubrics, label meta-evaluation sets to validate model graders, and write expert baseline responses. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Medical AI has the oddest benchmark history in machine learning. Models passed the US medical licensing exam years ago, near-perfect exam scores are now routine, and yet nobody believes those numbers say whether a model is safe to help a clinician on a Tuesday afternoon. Over 2025 and 2026 the field rebuilt its evaluations around physician-written rubrics, real clinician requests, simulated health records and interactive diagnosis. This post walks through how the main medical benchmarks are built, what each design choice changed, and how to build a clinical evaluation set that measures what you actually need.**

## The short answer

A credible medical benchmark today has five parts. **Realistic tasks**: real or physician-authored conversations, clinician requests, EHR records or published cases, not exam vignettes. **Expert grading criteria**: conversation-specific rubrics or execution-checked task checkpoints written by physicians, with relative weights and penalties for harmful content. **A validated grader**: a model grader whose agreement with physicians has been measured, not assumed. **Physician baselines**: what a qualified human does on the same task under stated conditions. And **interaction**: for anything agentic or diagnostic, the model must gather information and act, not receive a complete case. HealthBench, HealthBench Professional, MedHELM, MedAgentBench, PhysicianBench, SDBench and KlinikeBench each implement some of these, and comparing them is the fastest way to see which choices matter.

## Why did licensing-exam benchmarks stop being useful?

MedQA-style multiple-choice exams measure recall and textbook reasoning on clean vignettes. MedHELM (Bedi et al., 2025) summarizes the problem: LLMs reach about 99% accuracy on standardized exams like MedQA, yet only 5% of LLM evaluations use real EHR data, and 64% of LLM healthcare evaluations prioritize licensing exams and diagnostic tasks. That leaves out most of clinical work: documentation, patient communication, prior authorization letters, billing codes and workflow.

Three gaps show up again and again:

1. **Information is handed over.** Exams give a complete case. Real patients and records require the clinician to ask, look up and order.
2. **Answers are closed-form.** One correct letter hides whether the explanation would mislead a patient or omit a red flag.
3. **No cost of action.** Exams do not charge for unnecessary tests or penalize unsafe orders.

KlinikeBench (Fang et al., 2026) quantifies the first gap directly: across 31 models from seven families, the best models reached 90.7% diagnostic accuracy, but succeeded on fewer than 30% of the full interactive tasks that also required taking a history, requesting the right examinations and following action constraints.

## How does HealthBench use physician rubrics?

HealthBench (Arora et al., 2025) is the reference design for open-ended medical evaluation. It contains 5,000 realistic health conversations between a model and either a layperson or a healthcare professional. Conversations average 2.6 turns and range from one to nineteen turns. The model writes the next response, and that response is scored against **rubric criteria written by physicians specifically for that conversation**.

| Property | HealthBench |
|---|---|
| Examples | 5,000 conversations, single- and multi-turn |
| Rubric criteria | 48,562 unique, median 11 per example (range 2 to 48) |
| Experts | 262 physicians, 26 specialties, practice experience in 60 countries |
| Point values | -10 to +10 per criterion |
| Organization | 7 themes (e.g. emergency referrals, context seeking, global health) and 5 axes (e.g. accuracy, communication) |
| Grader | GPT-4.1, meta-evaluated against physician grades |
| Variants | HealthBench Hard (1,000 examples), HealthBench Consensus (34 physician-validated criteria) |

Each criterion is a self-contained, objective statement: a fact that should be included, a misconception to correct, jargon to avoid, a referral that must be made. Negative points penalize harmful or wrong content. The example score is the points earned over the maximum positive points available:

$$
s(x) = \frac{\sum_{c \in C_x} \mathbb{1}[c \text{ met}] \cdot p_c}{\sum_{c \in C_x : p_c > 0} p_c}
$$

where $C_x$ is the rubric for example $x$ and $p_c$ the points for criterion $c$. The overall score averages $s(x)$ over examples and clips to $[0, 1]$.

Three design choices are worth copying:

- **Reliability as a metric.** HealthBench reports worst-at-$k$: for each example, the expected minimum score over $k$ sampled responses. A model that is excellent on average but occasionally dangerous shows up here, not in the mean.
- **Grader meta-evaluation.** The authors compared GPT-4.1's per-criterion judgments with physicians' on the consensus criteria using macro F1. The grader exceeded the average physician in five of seven themes, ranging from the 37.5th percentile of physicians on health data tasks to the 88.2nd on context seeking. That is a measured claim with a known weak spot.
- **Physician baselines.** Physicians wrote responses with and without model assistance; recent models outperformed unassisted physicians, and physicians could improve responses from September 2024 models but not from April 2025 models.

At release, o3 scored 0.60 overall and 0.32 on HealthBench Hard, so the benchmark had real headroom. The dataset ships with a canary string and a request not to post examples publicly, a simple contamination defense every benchmark should copy (see [building contamination-resistant benchmarks](/blog/building-contamination-resistant-agent-benchmarks)).

## What did HealthBench Professional change?

HealthBench Professional (Hicks et al., 2026) narrows the scope to clinicians and tightens the process. It has 525 tasks drawn from physician conversations with ChatGPT for Clinicians, across three use cases: **care consult** (differentials, management, treatment), **writing and documentation** (notes, summaries, coding, patient messages) and **medical research** (finding and synthesizing evidence). The construction choices are the interesting part:

- **Three-stage expert process.** Each example's rubric was written and iteratively adjudicated by three or more physicians across physician authorship, physician review and final adjudication.
- **Adversarial share.** About one-third of examples are physicians deliberately red-teaming the model, the rest are good-faith use.
- **Difficulty enrichment.** From 15,079 candidate examples, difficult ones for recent frontier models were enriched by roughly 3.5 times through stratified sampling, so the benchmark is not saturated on day one.
- **Strong human baseline.** Specialty-matched physicians wrote responses with unbounded time and web access.
- **Length adjustment.** Because longer answers have more chances to satisfy positive criteria, the primary score is adjusted for response length, a correction we argued for in [why RLHF makes models verbose](/blog/why-does-rlhf-make-models-verbose-length-bias).

The authors report that the best system, GPT-5.4 in ChatGPT for Clinicians, outperformed base GPT-5.4, all other models and the physician baseline. Note the caveat that comes with any lab-built benchmark: difficulty was enriched against the lab's own models, which makes the set hard for those models specifically. Independent replication on other model families is how you find out whether that matters.

## How does MedHELM cover the rest of clinical work?

MedHELM (Bedi et al., 2025; Nature Medicine, 2026) starts from a taxonomy instead of a dataset. Working with 29 clinicians, the authors organized medical AI work into 5 categories, 22 subcategories and 121 tasks: clinical decision support, clinical note generation, patient communication and education, medical research assistance, and administration and workflow. They then assembled a suite (35 benchmarks in the arXiv version, 37 in the journal version) so that every subcategory is covered, mixing existing datasets with newly formulated ones, including some built on real EHR data.

Two results stand out. First, model performance varies sharply by category: on a normalized scale, models scored 0.73 to 0.85 on clinical note generation but 0.56 to 0.72 on clinical decision support and 0.53 to 0.63 on administration and workflow. A single headline number would hide that. Second, their LLM jury for open-ended tasks reached an intraclass correlation of 0.47 with clinician ratings, above average clinician-clinician agreement (0.43) and above ROUGE-L (0.36) and BERTScore-F1 (0.44). Clinical judgments disagree among experts too; the right comparison for a grader is expert-expert agreement, not perfection (see [LLM-as-a-judge vs expert graders](/blog/llm-as-a-judge-vs-expert-graders)).

## How are clinical agents evaluated in EHR environments?

Chat benchmarks score a reply. Agent benchmarks score what the model does to a record system. Two designs show the progression:

| | MedAgentBench (Jiang et al.) | PhysicianBench (Liu et al., 2026) |
|---|---|---|
| Tasks | 300, written by physicians, 10 categories | 100 long-horizon, adapted from real primary-care-to-specialist consultations |
| Environment | FHIR-compliant virtual EHR, 100 patient profiles, 700,000+ data elements | EHR environment with real patient records via standard vendor APIs |
| Scope | Patient-specific retrieval and actions | 21 specialties; diagnosis interpretation, prescribing, treatment planning, documentation |
| Grading | Task success | 670 checkpoints, task-specific scripts with execution-grounded verification |
| Best reported | 69.67% (Claude 3.5 Sonnet v2) | 46% pass@1; open-source models at most 19% |

PhysicianBench's design is closer to a training-grade RL environment: tasks average 27 tool calls, every task was independently reviewed by a separate physician panel, and grading checks the state of the record rather than the text of the answer. Checkpoint grading also gives partial credit, which helps diagnose where agents fail. If you are building agent environments in other domains, the pattern is the same one we describe in [how tool-use RL environments are built](/blog/how-tool-use-rl-environments-are-built).

## How is interactive diagnosis evaluated?

**SDBench** (Nori et al., 2025) turns 304 diagnostically challenging New England Journal of Medicine clinicopathological conference cases into stepwise encounters. The model starts with a short abstract and must ask a gatekeeper model for history, examination findings and tests, which are revealed only when explicitly requested. Scoring combines diagnostic accuracy with the cumulative cost of visits and tests. Microsoft's orchestrator, MAI-DxO, paired with o3, reached 80% accuracy versus a 20% average for the generalist physicians in their study, at 20% lower cost than the physicians; a maximum-accuracy configuration reached 85.5%. The physician comparison deserves care: the 21 physicians were US and UK generalists (17 in primary care), asked not to use search engines, on deliberately hard cases that would normally go to specialists. The authors state these limits themselves; it is a controlled condition, not a typical clinic.

**KlinikeBench** (Fang et al., 2026) takes interaction further with 333 clinician-authored tasks, each a sandbox with a virtual patient, clinical tools and task-specific success criteria, authored and evaluated by more than 35 clinicians. The model has a fixed turn budget to take a history, request examinations, respect action constraints and record a diagnosis, and each step is scored separately. Its headline result is the gap described above: 90.7% diagnosis accuracy from complete information, under 30% task success in the full encounter. Some models diagnose well from a complete chart and do much worse in conversation.

Both designs depend on a simulator (a gatekeeper or virtual patient) whose fidelity is itself an expert judgment. KlinikeBench reports that clinicians rated its simulated dialogues higher in quality than the reference conversations adapted from real ones. That kind of check belongs in any benchmark with a simulated party; see [are LLM user simulators reliable for agent RL?](/blog/are-llm-user-simulators-reliable-for-agent-rl).

## How do you build a clinical evaluation set that holds up?

A practical recipe that combines the best of the designs above:

1. **Start from a task taxonomy**, as MedHELM does, and decide which categories matter for your product: consult, documentation, patient messaging, coding, agentic EHR actions, triage.
2. **Source realistic inputs.** Real (de-identified) clinician requests, physician-authored conversations, or record-grounded simulated patients. Tag each with specialty, user type and risk level.
3. **Have physicians write conversation-specific rubrics** with positive and negative point values, then have a second physician review and a third adjudicate, as HealthBench Professional does.
4. **Include adversarial and look-alike examples**: about a third adversarial in HealthBench Professional, plus benign prompts that should not trigger refusal or escalation.
5. **Enrich for difficulty** against several model families, not only your own, so the set is unsaturated without being tuned against one model.
6. **Validate the grader** on a physician-labeled meta-evaluation set, per theme, and report agreement relative to physician-physician agreement.
7. **Report reliability and cost**: worst-at-$k$ for safety-critical themes, test cost for diagnostic agents, and length-adjusted scores for open-ended answers.
8. **Collect physician baselines** with stated conditions (time, references, specialty match).
9. **Protect the set**: a canary string, a private held-out split, and a refresh cadence (see [how many eval items you need](/blog/how-many-eval-items-do-you-need) to size each split).

A minimal rubric item, in the format most of these benchmarks use, looks like this:

```json
{
  "criterion": "Advises the user to seek emergency care immediately because chest pain radiating to the left arm with sweating may indicate acute coronary syndrome.",
  "points": 10,
  "axis": "completeness",
  "theme": "emergency_referrals",
  "author_specialty": "emergency_medicine",
  "reviewed_by": ["internal_medicine", "cardiology"]
}
```

The text is the easy part. The hard part is knowing which five to fifteen criteria, out of hundreds of true statements, actually separate a safe answer from a dangerous one for that specific conversation. That is clinical judgment, and it is why every benchmark above was built by physicians.

## What do teams get wrong?

1. **Reporting exam accuracy as clinical readiness.** It is saturated and measures the wrong thing.
2. **Grading with an unvalidated model judge.** Measure agreement against physicians per theme first.
3. **Generic rubrics.** "Is the answer accurate?" is not a rubric; conversation-specific criteria are.
4. **Ignoring length.** Longer answers satisfy more criteria; adjust or control for length.
5. **Giving agents the full chart.** Interactive information gathering is where models fail most.
6. **Reporting only the mean.** Worst-case behavior matters more in medicine than average quality.
7. **Using one specialty's reviewers for everything.** Match reviewer specialty to the task.

## How Anthroly can help

Every benchmark in this post was bottlenecked on the same resource: qualified experts writing realistic tasks, conversation-specific rubrics, and adjudicated labels. Anthroly works with PhD and clinically trained experts in medicine, biology, pharmacology and related fields who author clinical tasks and patient scenarios, write and adjudicate weighted rubrics, label meta-evaluation sets so you can validate a model grader against expert judgment, and write expert baseline responses under stated conditions. We follow controlled protocols for sensitive content and work only with de-identified or synthetic inputs. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building or auditing a medical evaluation or a clinical RL environment, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can review a sample of your tasks and rubrics together.

## Related reading

- [How expert-written benchmarks are built](/blog/how-expert-written-benchmarks-are-built)
- [How to evaluate AI on real professional work](/blog/how-to-evaluate-ai-on-real-professional-work)
- [LLM-as-a-judge vs expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [Reward hacking in rubric-based RL](/blog/reward-hacking-rubric-based-rl)
- [How are chemistry and biology RL environments built?](/blog/how-are-chemistry-and-biology-rl-environments-built)
- [How to quality-control expert data labeling](/blog/how-to-quality-control-expert-data-labeling)
- [How are legal AI benchmarks built? LegalBench, attorney rubrics and legal agent environments](/blog/how-are-legal-ai-benchmarks-built)

---

## References

1. Arora, R. K., Wei, J., Hicks, R. S., et al. (2025). [HealthBench: Evaluating Large Language Models Towards Improved Human Health](https://arxiv.org/abs/2505.08775). arXiv:2505.08775.
2. Hicks, R. S., Trofimov, M., Lim, D., et al. (2026). [HealthBench Professional: Evaluating Large Language Models on Real Clinician Chats](https://arxiv.org/abs/2604.27470). arXiv:2604.27470.
3. Bedi, S., Cui, H., Fuentes, M., et al. (2025). [MedHELM: Holistic Evaluation of Large Language Models for Medical Tasks](https://arxiv.org/abs/2505.23802). arXiv:2505.23802. Published in [Nature Medicine](https://www.nature.com/articles/s41591-025-04151-2) (2026).
4. Jiang, Y., Black, K. C., Geng, G., et al. [MedAgentBench: A Realistic Virtual EHR Environment to Benchmark Medical LLM Agents](https://arxiv.org/abs/2501.14654). arXiv:2501.14654. Published in [NEJM AI](https://ai.nejm.org/doi/full/10.1056/AIdbp2500144).
5. Liu, R., Mohiuddin, I. Q., Schoeffler, A. J., et al. (2026). [PhysicianBench: Evaluating LLM Agents in Real-World EHR Environments](https://arxiv.org/abs/2605.02240). arXiv:2605.02240.
6. Nori, H., Daswani, M., Kelly, C., et al. (2025). [Sequential Diagnosis with Language Models](https://arxiv.org/abs/2506.22405). arXiv:2506.22405.
7. Fang, X., Li, Z., Yang, Y., et al. (2026). [KlinikeBench: Evaluating Language Models Beyond Diagnostic Accuracy](https://arxiv.org/abs/2609.38480). arXiv:2609.38480.
