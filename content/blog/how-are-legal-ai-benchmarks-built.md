---
title: "How Are Legal AI Benchmarks Built? From LegalBench and Law Exams to Attorney Rubrics and Legal Agent Environments"
description: "A practitioner's guide to how legal LLM benchmarks are built: how LegalBench, CUAD and CaseHOLD were constructed, why hallucination studies changed legal evaluation, how LEXam grades long-form legal reasoning, how PLawBench, Legal Research Bench and Harvey's Legal Agent Benchmark use attorney-written rubrics and all-pass grading, and how to build a legal evaluation set that holds up."
tags:
  - evals
  - benchmarks
  - legal-ai
  - expert-data
  - rubrics
  - llm-evaluation
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-31T12:50:00.000Z'
updatedAt: '2026-10-31T12:50:00.000Z'
faq:
  - question: "How are legal AI benchmarks built?"
    answer: "Modern legal benchmarks are built by lawyers in four layers: realistic tasks (client matters, research questions on novel fact patterns, real exam questions or contracts), expert grading criteria (task-specific rubrics, gold answers and supporting authorities), a grader validated against attorney judgment, and a scoring rule that matches legal practice, often all-pass grading with citation verification. Legal Research Bench, for example, has 413 attorney-written U.S. research questions graded all-pass with source verification."
  - question: "What is LegalBench?"
    answer: "LegalBench (Guha et al., 2023) is a collaboratively built benchmark of 162 tasks covering six types of legal reasoning: issue-spotting, rule-recall, rule-application, rule-conclusion, interpretation and rhetorical-understanding. Tasks were designed and hand-crafted by legal professionals, who are included as authors, or restructured from existing legal datasets for few-shot LLM evaluation."
  - question: "How often do legal AI tools hallucinate?"
    answer: "In the first preregistered evaluation of commercial legal research tools, Magesh et al. found that Lexis+ AI, Westlaw AI-Assisted Research and Ask Practical Law AI each hallucinated between 17% and 33% of the time on a set of 202 queries, fewer than general-purpose GPT-4 but far from hallucination-free. Earlier, Dahl et al. found general LLMs hallucinated between 58% (ChatGPT 4) and 88% (Llama 2) of the time on specific, verifiable questions about random federal court cases."
  - question: "What is all-pass grading in legal benchmarks?"
    answer: "All-pass grading counts a response as correct only if it satisfies every required rubric criterion and its cited authorities verify. Legal Research Bench uses it because a single missing authority, stale citation or wrong conclusion can make a legal answer unusable. Under all-pass grading the best of thirteen frontier models was fully correct on 42.9% of questions, even though models earned high partial credit."
  - question: "Can an LLM judge grade legal answers reliably?"
    answer: "Only after validation against lawyers. Legal Research Bench compared candidate judges with a majority of attorneys on 341 rubric items: attorneys agreed with the majority on 83.4% of items (Cohen's kappa 0.644), and all three candidate judges met or exceeded that baseline. At the task level, GPT-5.4's all-pass verdicts agreed with the expert majority on 86.7% of responses, close to the 87.9% human baseline. LEXam similarly validated an ensemble LLM judge against legal experts before using it."
  - question: "What is Harvey's Legal Agent Benchmark?"
    answer: "Harvey's Legal Agent Benchmark (LAB), open-sourced in May 2026, has more than 1,200 agent tasks across 24 legal practice areas, graded by over 75,000 expert-written rubric criteria. Each task gives the agent a partner-style instruction and a closed client matter of documents, and the agent must produce reviewable work product, graded by atomic pass/fail criteria tied to specific deliverable files."
  - question: "How does Anthroly help build legal AI evaluations?"
    answer: "Anthroly works with JD-trained and PhD experts to write research questions on novel fact patterns, build closed client-matter environments, write gold answers with supporting authorities, author and adjudicate atomic rubrics, and label meta-evaluation sets to validate LLM judges against attorney judgment. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Legal work is close to an ideal test of language models: it is written, rule-governed and high-stakes. It is also unusually unforgiving. A brief that cites one case that does not exist is not 95% correct; it is a sanctions risk. Over the last five years legal evaluation moved from classification datasets and exam questions to attorney-written rubrics, closed client-matter environments and all-pass grading with citation checks. This post walks through how the main legal benchmarks were built, what each design choice changed, and how to build a legal evaluation set that measures what a law firm or legal AI team actually needs.**

## The short answer

A credible legal benchmark today has five parts. **Realistic tasks**: research questions on novel fact patterns, client matters with real-looking documents, contracts, or real exam questions, not trivia about famous cases. **Expert-written ground truth**: gold answers with the supporting authorities a lawyer would cite. **Atomic rubrics**: binary criteria for facts, conclusions, citations and format, written by attorneys for each task. **A validated grader**: an LLM judge whose agreement with attorneys has been measured and matches inter-attorney agreement. And **a scoring rule that matches practice**: partial credit tells you how close a model got, but all-pass grading with source verification tells you whether the work product is usable. LegalBench, LEXam, PLawBench, Legal Research Bench and Harvey's Legal Agent Benchmark each implement a different subset of these.

## How were the first legal benchmarks built?

The first generation reused or annotated legal text at scale for classification and extraction:

| Benchmark | How it was built | What it measures |
|---|---|---|
| LexGLUE (Chalkidis et al., 2021) | Standardized collection of existing English legal NLU datasets | Classification and multiple-choice legal understanding |
| CaseHOLD (Zheng et al., 2021) | 53,000+ multiple-choice questions on U.S. case law | Identifying the holding of a cited case |
| CUAD (Hendrycks et al., 2021) | Dozens of legal experts from The Atticus Project, over 13,000 annotations | Highlighting contract clauses a lawyer must review |
| LegalBench (Guha et al., 2023) | 162 tasks designed and hand-crafted by legal professionals or restructured from existing datasets | Six types of legal reasoning |
| LegalBench-RAG (Pipitone and Alami, 2024) | Retrieval benchmark over legal documents | Precise retrieval of minimal relevant snippets |

LegalBench is the most important of these for method. Its authors organized tasks by the vocabulary lawyers already use: issue-spotting, rule-recall, rule-application, rule-conclusion, interpretation and rhetorical-understanding. Contributing legal professionals, credited as authors, designed tasks they considered either practically useful or interesting measures of reasoning. That made results legible to lawyers, which earlier benchmarks were not. CUAD makes the cost argument explicit: specialized domains "remain untouched by deep learning, as large labeled datasets require expensive expert annotators."

The limitation of this generation is format. Most tasks have short, closed answers, which are easy to score and easy to saturate, and none checks whether a model fabricates authority while answering.

## Why did hallucination studies change legal evaluation?

Two Stanford studies reframed what a legal benchmark must catch.

**Large Legal Fictions** (Dahl, Magesh, Suzgun and Ho, 2024) asked general LLMs specific, verifiable questions about random federal court cases and found hallucination rates between 58% for ChatGPT 4 and 88% for Llama 2. Models also often failed to correct a user's incorrect legal assumptions, and could not reliably predict when they were hallucinating.

**Hallucination-Free?** (Magesh et al.) ran the first preregistered evaluation of commercial legal research tools on a dataset of 202 queries. Vendors had described retrieval-augmented generation as eliminating or avoiding hallucinations. The study found Lexis+ AI, Westlaw AI-Assisted Research and Ask Practical Law AI each hallucinated between 17% and 33% of the time: better than general-purpose GPT-4, far from hallucination-free.

The design lesson carried forward into every later benchmark: **citations must be verified against real authority, and a confident wrong citation must fail the response**, not cost it a fraction of a point.

## How does LEXam grade long-form legal reasoning?

Exams are a natural source of expert-written legal questions with expert reference answers. LEXam (Fan et al., 2025) is built from 340 law exams spanning 116 courses at the University of Zurich, 7,537 questions in English and German, including 2,841 long-form open questions and 4,696 multiple-choice questions. Two design choices make it more than an exam dump:

1. **Reasoning guidance.** Open questions come with reference answers and explicit guidance on the expected legal reasoning approach, such as issue spotting, rule recall or rule application, so graders can assess the reasoning chain, not just the conclusion.
2. **A validated judge.** The authors validated an ensemble LLM-as-a-judge against legal experts, using the Alternative Annotator Test to decide which models could stand in for experts. Only strong proprietary or very large reasoning models qualified. Among the three human legal experts, average Pearson correlation was 0.70 with a mean quadratic weighted kappa of 0.49, a reminder that expert agreement on long-form legal grading is itself imperfect and must be measured.

LEXam's results show the gap the field cares about: models notably struggle with open questions that require structured, multi-step legal reasoning, even when they do well on multiple choice.

## How do rubric-based legal practice benchmarks work?

Exams still differ from practice. **PLawBench** (Shi et al., 2026) models three real workflows in Chinese legal practice: public legal consultation, practical case analysis and legal document generation. It has 850 questions across 13 practical scenarios with roughly 12,500 expert-designed rubric items. Experts annotate in two stages: first a reasoning framework for each task type, then criteria tailored to the specific case. Rubric items map to six evaluation dimensions, starting with issue and fact identification, legal reasoning and legal knowledge application, and the rubric design takes a risk-tiered view informed by the EU AI Act's risk classification. None of ten frontier models achieved strong performance, and the authors observe performance drops on sequential tasks where ordered, multi-step logic is required.

This is the same pattern seen in medicine with HealthBench: once tasks are open-ended, the grading criteria have to be written per task by domain experts, because a generic "is this answer good" judge cannot know which facts or authorities matter for this matter.

## How are legal research agents evaluated?

**Legal Research Bench** (Drozdov, Chen, Nashold and Krishnan, 2026) targets the workflow where hallucination hurts most. It has 413 open-ended U.S. legal research questions spanning eight areas of law and ten question types, each with a gold answer, a curated list of supporting authorities and a binary grading rubric. Items are written around novel fact patterns to reduce memorization and included only when the correct answer is objective enough for attorneys to agree. Criteria are weighted +1, +2 or +3, with at least one +3 item capturing the central legal conclusion.

Agents get a harness with web search, case-law search, page parsing and retrieval tools. Scoring is **all-pass with source verification**: a response is correct only if every required criterion is satisfied and its cited authorities verify. Results across thirteen frontier models:

- The best model, Claude Opus 4.8, was fully correct on 42.9% of questions, while models earned high partial credit.
- All-pass rates varied by area of law and were lower on questions requiring reconciliation of conflicting authorities.
- More turns, tool calls and inference cost did not predict higher accuracy.

Why does all-pass grading separate models so sharply from partial credit? Suppose a response must satisfy $k$ criteria and a model satisfies each independently with probability $c$. Its expected partial-credit score is $c$, but its all-pass rate is

$$
P(\text{all pass}) = c^{k}.
$$

With $c = 0.9$ and $k = 8$, partial credit reads 90% while only about 43% of responses would be fully correct. Real criteria are correlated, so this is an illustration rather than a model of any benchmark, but it shows why a legal team that needs usable work product should look at the all-pass number.

**Judge validation.** LRB treats its LLM judge as a measurement instrument to be validated before scoring. Three candidate judges scored 341 rubric items from 45 model responses to 15 questions, with the attorney majority as reference. Agreement is reported with Cohen's kappa, which corrects observed agreement $p_o$ for chance agreement $p_e$:

$$
\kappa = \frac{p_o - p_e}{1 - p_e}.
$$

Attorneys agreed with the majority on 83.4% of items (kappa 0.644), and all three candidate judges met or exceeded that baseline. At the task level, GPT-5.4's per-item verdicts translated into all-pass scores agreed with the expert majority on 86.7% of responses (kappa 0.710), close to the human inter-rater baseline of 87.9%. The authors also checked that judge errors were balanced between false passes and false fails, which matters under all-pass grading because one-sided item errors compound across long rubrics.

**LegalAgentBench** (Li et al., 2024) takes a complementary, Chinese-law approach: 17 corpora from real legal scenarios, 37 tools and 300 annotated tasks, with keyword checks on intermediate steps to compute a progress rate in addition to final success.

## How do legal agent environments grade work product?

**Harvey's Legal Agent Benchmark** (LAB), open-sourced on May 6, 2026, is built to mirror how work moves through a law firm. Each task has three parts:

- **Instruction**: a request written as a partner would assign work to an associate, stating what is required rather than explaining the expected output.
- **Environment**: a closed-universe client matter of documents, firm templates, emails and other materials the agent must discover and sort through.
- **Output and verification**: reviewable work product, graded by expert rubrics that break down what a partner or client would scrutinize into atomic, binary pass/fail criteria (facts, conclusions, citations, severity ratings, recommendations, deadlines, dollar amounts, formatting), each tied to a specific deliverable file.

The first version has more than 1,200 tasks across 24 practice areas and over 75,000 expert-written rubric criteria, and was launched without a leaderboard. Harvey notes that the same criteria can be applied by an LLM judge and fed back into agent training loops as per-criterion reward signals. That is the point where a legal benchmark becomes an RL environment, and where rubric quality starts to determine what the model learns, including any loopholes a policy can exploit.

## How do you build a legal evaluation set that holds up?

1. **Start from real work, not trivia.** Write tasks as assignments: research questions, memo requests, contract reviews or diligence over a closed client matter.
2. **Use novel fact patterns.** Famous cases and published exam answers are in pretraining data. Legal Research Bench writes around new facts for this reason.
3. **Pin the jurisdiction and date.** Law changes. Record the governing jurisdiction and the as-of date, and re-verify authorities when you refresh the set.
4. **Write a gold answer with authorities.** The citations a competent lawyer would rely on are part of the ground truth, and they enable automated source verification.
5. **Make rubric criteria atomic and weighted.** One fact, conclusion or citation per criterion, binary, with the central conclusion weighted highest.
6. **Report all-pass and partial credit.** Partial credit for progress, all-pass for usability.
7. **Validate the judge against attorneys.** Measure attorney-attorney agreement first, then require the judge to meet it, and check that judge errors are balanced.
8. **Keep only items lawyers agree on.** If attorneys cannot agree on the answer, the item measures disagreement, not model quality.

A rubric item for a research question might look like this:

```json
{
  "task_id": "lrb-style-0042",
  "jurisdiction": "US-CA",
  "as_of": "2026-09-30",
  "criteria": [
    {"id": "c1", "weight": 3, "text": "Concludes the non-compete is unenforceable against the employee under California law"},
    {"id": "c2", "weight": 2, "text": "Cites Cal. Bus. & Prof. Code section 16600 as the governing statute"},
    {"id": "c3", "weight": 1, "text": "Notes the choice-of-law clause does not change the outcome for a California-based employee"}
  ],
  "required_authorities": ["Cal. Bus. & Prof. Code 16600"]
}
```

And the scoring logic that separates partial credit from all-pass:

```python
def score(verdicts: dict[str, bool], criteria: list[dict], citations_verified: bool) -> dict:
    total = sum(c["weight"] for c in criteria)
    earned = sum(c["weight"] for c in criteria if verdicts[c["id"]])
    return {
        "partial_credit": earned / total,
        "all_pass": citations_verified and all(verdicts[c["id"]] for c in criteria),
    }
```

## What do teams get wrong?

- **Trusting exam-style accuracy.** High multiple-choice scores did not predict long-form reasoning in LEXam or research reliability in LRB.
- **Skipping citation verification.** The hallucination studies show that plausible, wrong authority is the dominant failure, and only verification catches it.
- **Using an unvalidated judge.** Expert agreement on legal grading is far from perfect; a judge that has never been compared with attorneys is an unknown instrument.
- **Mixing jurisdictions silently.** A correct answer in one state can be wrong in another.
- **Letting the rubric drift into the reward.** Once rubrics feed RL, every vague criterion becomes a target for reward hacking. Audit rubrics with adversarial responses before training on them.

## How Anthroly can help

Every benchmark in this post was bottlenecked on the same resource: qualified legal experts writing realistic tasks, gold answers with authorities, and atomic rubrics, then adjudicating disagreements. Anthroly works with JD-trained and PhD experts in law, economics, public policy and regulated industries who write research questions on novel fact patterns, build closed client-matter environments, write gold answers with supporting authorities, author and adjudicate weighted rubrics, and label meta-evaluation sets so you can validate an LLM judge against attorney judgment. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building or auditing a legal evaluation or a legal agent RL environment, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can review a sample of your tasks and rubrics together.

## Related reading

- [How are expert-written benchmarks like GPQA and Humanity's Last Exam built?](/blog/how-expert-written-benchmarks-are-built)
- [How do you evaluate AI on real professional work?](/blog/how-to-evaluate-ai-on-real-professional-work)
- [How are medical AI benchmarks built?](/blog/how-are-medical-ai-benchmarks-built)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [Can reinforcement learning reduce LLM hallucinations?](/blog/can-reinforcement-learning-reduce-llm-hallucinations)

---

## References

1. Guha, N., Nyarko, J., Ho, D. E., et al. (2023). [LegalBench: A Collaboratively Built Benchmark for Measuring Legal Reasoning in Large Language Models](https://arxiv.org/abs/2308.11462). arXiv:2308.11462.
2. Chalkidis, I., Jana, A., Hartung, D., et al. (2021). [LexGLUE: A Benchmark Dataset for Legal Language Understanding in English](https://arxiv.org/abs/2110.00976). arXiv:2110.00976.
3. Zheng, L., Guha, N., Anderson, B. R., Henderson, P., & Ho, D. E. (2021). [When Does Pretraining Help? Assessing Self-Supervised Learning for Law and the CaseHOLD Dataset](https://arxiv.org/abs/2104.08671). arXiv:2104.08671.
4. Hendrycks, D., Burns, C., Chen, A., & Ball, S. (2021). [CUAD: An Expert-Annotated NLP Dataset for Legal Contract Review](https://arxiv.org/abs/2103.06268). arXiv:2103.06268.
5. Pipitone, N., & Alami, G. H. (2024). [LegalBench-RAG: A Benchmark for Retrieval-Augmented Generation in the Legal Domain](https://arxiv.org/abs/2408.10343). arXiv:2408.10343.
6. Dahl, M., Magesh, V., Suzgun, M., & Ho, D. E. (2024). [Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models](https://arxiv.org/abs/2401.01301). arXiv:2401.01301.
7. Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D., & Ho, D. E. (2024). [Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools](https://arxiv.org/abs/2405.20362). arXiv:2405.20362.
8. Fan, Y., Ni, J., Merane, J., et al. (2025). [LEXam: Benchmarking Legal Reasoning on 340 Law Exams](https://arxiv.org/abs/2505.12864). arXiv:2505.12864.
9. Shi, Y., Liu, H., Hu, Y., et al. (2026). [PLawBench: A Rubric-Based Benchmark for Evaluating LLMs in Real-World Legal Practice](https://arxiv.org/abs/2601.16669). arXiv:2601.16669. [ACL 2026](https://aclanthology.org/2026.acl-long.458/).
10. Drozdov, K., Chen, O., Nashold, L., & Krishnan, R. (2026). [Legal Research Bench: Measuring End-to-End Reliability in Long-Horizon Legal Research Agents](https://arxiv.org/abs/2610.00609). arXiv:2610.00609.
11. Li, H., Chen, J., Yang, J., et al. (2024). [LegalAgentBench: Evaluating LLM Agents in Legal Domain](https://arxiv.org/abs/2412.17259). arXiv:2412.17259.
12. Grupen, N., Pereyra, G., & Pereyra, J. (2026). [Introducing Harvey's Legal Agent Benchmark](https://www.harvey.ai/blog/introducing-harveys-legal-agent-benchmark). Harvey.
