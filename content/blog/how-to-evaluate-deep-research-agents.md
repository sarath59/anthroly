---
title: "How Do You Evaluate Deep Research and Browsing Agents? BrowseComp, Rubric Trees, and Citation Checks"
description: "Deep research agents are graded three ways: short verifiable answers (BrowseComp, GAIA), fixed-corpus retrieval (BrowseComp-Plus), and long-form reports judged by rubrics and citation checks (DeepResearch Bench, Mind2Web 2). Here is what each method measures, where it breaks, what the human-labeling costs look like, and a practical evaluation stack for teams building research agents."
tags:
  - agent-evaluation
  - deep-research
  - benchmarks
  - llm-as-a-judge
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-24T05:00:00.000Z'
updatedAt: '2026-10-24T05:00:00.000Z'
faq:
  - question: "What is BrowseComp and how is it graded?"
    answer: "BrowseComp (Wei et al., 2025, OpenAI) is 1,266 hard-to-find but easy-to-verify questions with short reference answers. Trainers checked that GPT-4o, o1, and an early Deep Research model could not solve each question, that the answer was not on the first page of five Google searches, and that another person would likely not solve it in ten minutes. Grading uses an LLM to check semantic equivalence with the reference answer, with the same grading prompt as Humanity's Last Exam."
  - question: "How do you evaluate long-form deep research reports?"
    answer: "With an LLM judge guided by task-specific criteria, ideally anchored to a reference report or a rubric written by experts, plus a separate check that each cited source supports the claim it is attached to. DeepResearch Bench scores reports relative to a reference report (RACE) and checks statement-URL support (FACT). Mind2Web 2 builds a task-specific judge agent around a tree-structured rubric with critical and non-critical nodes."
  - question: "Can an LLM judge grade research reports as well as humans?"
    answer: "On agreement with expert preferences, sometimes. DeepResearch Bench reports a pairwise agreement rate of 71.33% for its full RACE method against 68.44% agreement between human experts, and Mind2Web 2 reports a 99% correctness rate for its judge agents in human evaluation. That shows the judge matches humans about as well as humans match each other, not that the rubric captures everything that matters."
  - question: "Why use a fixed corpus instead of the live web?"
    answer: "Reproducibility and diagnosis. Live search results change and are opaque, so scores drift and you cannot tell whether the retriever or the model failed. BrowseComp-Plus fixes a human-verified corpus of 100,195 documents for 830 queries; with it, GPT-5 scored 55.9% with BM25 and 70.1% with a Qwen3-Embedding-8B retriever. The tradeoff is realism, so most teams should run both."
  - question: "What are the most common failure modes of deep research agents?"
    answer: "Mind2Web 2's error analysis found incomplete answers (information not found, or fewer items than asked), criteria violations, invalid attribution such as expired or fabricated URLs, missing attribution, and unsupported answers where the cited page says something different. BrowseComp also found that browsing models were poorly calibrated, with Deep Research showing a 91% calibration error."
  - question: "How does Anthroly help evaluate research agents?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, writes inverted browsing questions with verified unique answers, expert reference reports, and rubric trees for domain research tasks, and labels agent outputs and citations so teams can calibrate LLM judges before trusting them."
draft: false
---

**"Deep research" agents search the web for minutes or hours, read dozens of sources, and return either a short answer or a long, cited report. Evaluating them is harder than evaluating a chatbot, because the thing being measured (did the agent find the right information, synthesize it correctly, and cite it honestly?) is spread across a long trajectory and a long output. The field has converged on three approaches: short verifiable answers, fixed-corpus retrieval benchmarks, and rubric-graded long-form reports. Each measures something real and each has blind spots. This post goes through BrowseComp, GAIA, BrowseComp-Plus, DeepResearch Bench, and Mind2Web 2, shows what they cost to build, and ends with an evaluation stack we would recommend to a team shipping a research agent.**

## What are the three ways to evaluate a research agent?

| Approach | Examples | What it measures | Main blind spot |
|---|---|---|---|
| Short verifiable answers on the live web | [BrowseComp](https://arxiv.org/abs/2504.12516), [BrowseComp-ZH](https://arxiv.org/abs/2504.19314), [GAIA](https://arxiv.org/abs/2311.12983) | Persistence and creativity in finding a fact | Nothing about synthesis, writing, or ambiguity; live web drifts |
| Fixed corpus | [BrowseComp-Plus](https://arxiv.org/abs/2508.06600), [Deep Research Bench (FutureSearch)](https://arxiv.org/abs/2506.06287) | Retrieval and reasoning, separately and reproducibly | Less realistic; corpus coverage limits what can be asked |
| Long-form, rubric- and citation-graded | [DeepResearch Bench](https://arxiv.org/abs/2506.11763), [Mind2Web 2](https://arxiv.org/abs/2506.21506) | Report quality, completeness, and attribution | Judge reliability, rubric coverage, cost |

## How does BrowseComp work?

[BrowseComp (Wei et al., 2025)](https://arxiv.org/abs/2504.12516) is 1,266 questions written by human trainers to be **hard to find but easy to verify**. Trainers start from a fact (a "seed" such as a person, event, or paper) and write an *inverted* question that piles up constraints, for example a paper at a given conference whose first and fourth authors went to particular undergraduate schools. Checking a candidate answer takes a few searches; finding it by brute force could take thousands.

Three checks enforced difficulty:

1. GPT-4o (with and without browsing), o1, and an early Deep Research model could not solve it.
2. The answer did not appear on the first page of results for five simple Google searches.
3. Another person should not be able to solve it within ten minutes. This was spot-checked on a portion of questions, and trainers whose tasks were solved more than 40% of the time were asked to revise.

Grading is simple by design: an LLM checks whether the predicted short answer is semantically equivalent to the reference, using the same grading prompt as Humanity's Last Exam.

The results show why the benchmark took off. GPT-4o scored 0.6%, GPT-4o with browsing 1.9%, o1 (no browsing) 9.9%, and Deep Research 51.5%. Human trainers, given up to two hours per question and no AI assistants, gave up on 70.8% of the 1,255 questions they attempted and solved 29.2%.

Four details from the paper matter for anyone using it:

- **Uniqueness is likely, not guaranteed.** The inverted construction makes the reference answer correct but cannot rule out other valid answers. Of the questions human trainers solved, their answer matched the reference 86.4% of the time.
- **The hardest tail hides bad items.** BrowseComp originally had 1,287 tasks. Reviewing the 118 that Deep Research never solved found 21 with mismatched, ambiguous, or wrong reference answers, which were removed. (We discuss why adversarially filtered items collect label errors in [how expert-written benchmarks are built](/blog/how-expert-written-benchmarks-are-built).)
- **Train-test overlap is acknowledged.** A footnote notes that Deep Research was trained on data that specifically teaches BrowseComp-style tasks.
- **Calibration is poor.** Asked for a confidence with each answer, Deep Research had a 91% calibration error, and GPT-4o with browsing 82%, against 69% for GPT-4o without browsing. Browsing seems to make models *more* confident in wrong answers.

Test-time compute helps a lot. Sampling 64 attempts per question and picking by majority vote, confidence-weighted vote, or best-of-N improved Deep Research by 15% to 25% over a single attempt, with best-of-N best. That is the "easy to verify" property showing up inside the model: it can often tell which of its answers is right.

[BrowseComp-ZH](https://arxiv.org/abs/2504.19314) rebuilt the method natively in Chinese with 10 annotators holding master's or PhD degrees. Of 480 preliminary questions, a cross-check in which other annotators searched for 10 minutes without LLMs flagged 76 as too easy, leaving 404. An answer-uniqueness stage (several strong agents answer, then humans check whether any alternative answer satisfies all constraints) then removed 115 ambiguous items, leaving 289. That ratio is a useful planning number: **expect to lose more than a quarter of inverted questions to ambiguity when you check them properly** (115 of 404 here).

## What does GAIA add?

[GAIA (Mialon et al., 2023)](https://arxiv.org/abs/2311.12983) predates the deep-research wave but set the template: 466 questions that are conceptually simple for humans (92% success) but required tools and multi-step browsing for models (15% for GPT-4 with plugins at the time). Answers are a short string, number, or list, graded by quasi-exact match after type-specific normalization.

Its construction notes are the most candid on cost. Two new annotators answered each question independently. Of 623 newly written questions in that validation phase, 68% were judged valid (both annotators matched the designer's answer, or one did and the other made a mistake); questions with disagreements usually needed a simple fix and were otherwise removed. The authors estimate about **two hours of annotator time per question** including validation and repair. They also warn that a live-web benchmark decays: information needed to answer a question can disappear from the web, and tools and plugins change, so an evaluation run at one point in time may not be reproducible later.

## Why evaluate on a fixed corpus?

Live-web benchmarks compare entire systems at a moment in time. They cannot tell you whether a failure came from the search engine, the retriever, or the model's reasoning, and the score drifts as the web changes.

[BrowseComp-Plus (Chen et al., 2025)](https://arxiv.org/abs/2508.06600) fixes this by freezing a corpus. For each BrowseComp question, o3 with web search proposed supporting pages; human annotators then had to mark the exact text spans justifying each clue and confirm that the evidence was sufficient to answer the whole question, searching for at least 20 minutes for missing evidence before giving up. They also labeled "gold" documents that contain the answer, including implicitly. Of 1,005 candidate questions at that stage, 830 passed. The final corpus has **100,195 documents**, averaging 6.1 evidence documents, 2.9 gold documents, and 76.28 hard negatives per query. The labeling took 14 university-student annotators more than 400 hours.

The payoff is diagnosis. With the same corpus, swapping the retriever under GPT-5 moved accuracy from **55.9% with BM25 to 70.1% with Qwen3-Embedding-8B**, with fewer search calls. On the live web, that difference would be invisible or attributed to the model.

[FutureSearch's Deep Research Bench](https://arxiv.org/abs/2506.06287) takes a similar route with "RetroSearch", a large frozen set of scraped pages for 89 task instances across 8 categories, and reports that offline agents perform comparably to live-web agents. Our take: **use a frozen corpus to make decisions and a live-web run to check you are not overfitting to the snapshot.**

## How do you grade a long research report?

Short answers make grading easy but ignore what users actually want from deep research: a well-organized, correct, cited report. Two benchmarks show the main design options.

### Reference-relative rubric scoring (DeepResearch Bench)

[DeepResearch Bench (Du et al., 2025)](https://arxiv.org/abs/2506.11763) has 100 PhD-level tasks across 22 domains, each developed by a verified PhD-level expert. The domain mix follows the distribution of 44,019 deep-research-style queries filtered from 96,147 real chatbot queries.

Its RACE method has a judge LLM generate task-specific weights over four dimensions (comprehensiveness, insight/depth, instruction-following, readability) and task-specific criteria within each. The key design decision is to score each report **relative to a reference report**, because scoring in isolation gave uniformly high, undiscriminating scores:

$$
S_{\text{final}}(R_{\text{tgt}}) = \frac{S_{\text{int}}(R_{\text{tgt}})}{S_{\text{int}}(R_{\text{tgt}}) + S_{\text{int}}(R_{\text{ref}})}
$$

A score of 0.5 means parity with the reference. That makes the reference report a load-bearing part of the benchmark: a weak reference compresses every strong agent toward the top, and a reference with a factual error teaches the judge to reward that error. **If you adopt this design, the reference report is where expert time should go.**

Human validation is the most quoted number. On 50 tasks, with three domain-expert annotators per task scoring reports from four agents, RACE agreed with expert pairwise preferences 71.33% of the time, slightly above the **68.44% agreement between the human experts themselves**. Removing the reference report dropped agreement to 66.56%; a vanilla judge prompt got 58.89%. The paper also notes that a careful human review of one report takes a PhD-level evaluator 30-60 minutes.

Read that comparison correctly. When a judge agrees with experts about as often as experts agree with each other, the bottleneck is no longer the judge; it is how underspecified the task and quality criteria are. Pushing the judge further mostly fits one annotator's taste. The better investment is sharper task specs and rubrics (see [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)).

### Citation checking (FACT)

DeepResearch Bench's FACT step extracts statement-URL pairs from a report, deduplicates them, fetches each page, and asks a judge whether the page supports the statement. It reports **citation accuracy** (share of supported pairs) and **effective citations per task** (how much supported information the agent delivered).

Report both. Citation accuracy alone is easy to game: an agent that cites less, and only cites the safest claims, scores higher. Effective citations alone rewards padding. The pair approximates precision and recall of grounded content. What neither measures is *coverage of what matters*. For that you need an expert-written list of key findings for each task and a recall check against it.

### Rubric trees with judge agents (Mind2Web 2)

[Mind2Web 2 (Gou et al., 2025)](https://arxiv.org/abs/2506.21506) has 130 long-horizon, often time-varying tasks built with over 1,000 hours of human labor. Each task gets its own judge agent, a Python workflow that checks a tree-structured rubric (on average 50 nodes, up to 603). Leaves are binary checks, such as "is this statement backed by the cited page?". Nodes are either **critical** (failure zeroes the parent) or **non-critical** (averaged for partial credit):

$$
s(v)=\begin{cases}
0, & \exists\, u \in K(v):\ s(u) < 1\\
\dfrac{1}{|N(v)|}\displaystyle\sum_{u\in N(v)} s(u), & \text{all critical children pass and } |N(v)| > 0\\
1, & \text{otherwise}
\end{cases}
$$

where $K(v)$ and $N(v)$ are the critical and non-critical children of node $v$. Here is a minimal version of the gate-then-average scorer:

```python
from dataclasses import dataclass, field

@dataclass
class Node:
    name: str
    critical: bool = False
    score: float | None = None          # set on leaves by a check (0 or 1)
    children: list["Node"] = field(default_factory=list)

def evaluate(v: Node) -> float:
    if not v.children:
        return float(v.score or 0.0)
    crit = [c for c in v.children if c.critical]
    noncrit = [c for c in v.children if not c.critical]
    if any(evaluate(c) < 1.0 for c in crit):
        return 0.0                       # a failed critical requirement gates the parent
    if noncrit:
        return sum(evaluate(c) for c in noncrit) / len(noncrit)
    return 1.0

# Example: budget is a hard constraint; each of three requested items earns partial credit.
task = Node("root", children=[
    Node("within budget", critical=True, score=1),
    Node("item A found and cited", score=1),
    Node("item B found and cited", score=0),
    Node("item C found and cited", score=1),
])
print(evaluate(task))  # 0.667: partial completion; success rate counts only a perfect 1.0
```

Mind2Web 2 reports both **partial completion** (average root score) and **success rate** (share of tasks with a perfect score). Its judge agents had a 99% correctness rate in a human evaluation, and the best system, OpenAI Deep Research, reached 50-70% of human performance in about half the time. To keep the judges from being used as RL reward models, the benchmark splits into a 10-task public development set and a 120-task private test set.

The gating rule is the right default for research tasks. A report that recommends a product over the user's budget is not 80% correct because its other sections are good; it fails. Deciding which requirements are critical is a domain judgment, which is why rubric authoring is expert work.

## What goes wrong in deep research agents?

Mind2Web 2's error analysis is the best public taxonomy so far:

- **Incompleteness.** The agent says it could not find the information, or returns fewer items or steps than asked. Systems not built for deep research often stop early.
- **Criteria violations.** Explicitly violating a task constraint or stating something factually wrong. This was the most common human error too, from fatigue, and Deep Research systems already beat humans here.
- **Invalid attribution.** Expired or fabricated URLs, including from an agent that visited the right page and then reported a link differing by a few words.
- **Missing attribution.** Claims with no source, often from models answering out of parametric memory without searching.
- **Unsupported answers.** The cited page is real but says something different (a synthesis error) or is irrelevant (a retrieval error).

Add two from BrowseComp: **overconfidence** (high confidence on wrong answers) and **answer non-uniqueness** (the agent finds a valid answer the reference does not list, and is marked wrong).

## How many tasks do you need?

These benchmarks are small, and agent runs are expensive, so error bars matter. For a binary metric near 50%, a 95% interval is about $\pm 1.96\sqrt{0.25/n}$:

| Benchmark (size) | Approximate 95% half-width at 50% accuracy |
|---|---|
| BrowseComp (1,266) | ±2.8 points |
| BrowseComp-Plus (830) | ±3.4 points |
| Mind2Web 2 private test (120) | ±8.9 points |
| A 100-task internal set | ±9.8 points |

Agent runs are also stochastic, so a single run per task understates variance. Run several seeds, compare systems on the same tasks with paired tests, and report the interval (the details are in [how many eval items you need](/blog/how-many-eval-items-do-you-need)). A 3-point gain on a 120-task rubric benchmark from one run is not evidence of anything.

## A practical evaluation stack for research agents

1. **A short-answer set for finding.** Inverted questions with verified unique answers in your users' domains, graded by an equivalence judge. Check uniqueness by having a second person and several agents search for alternative answers.
2. **A frozen corpus for diagnosis.** Snapshot the evidence and hard negatives for that set so you can swap retrievers, tools, and models and attribute changes.
3. **A rubric set for reports.** Expert-written tasks, each with a reference report or key-findings list and a rubric tree that separates critical from partial-credit requirements.
4. **Citation checks with precision and recall.** Statement-level support checks, plus recall against expert key findings so citing less is not rewarded.
5. **Calibration and abstention.** Ask for confidence and score it; reward "I could not verify this" over a confident wrong answer.
6. **Judge calibration against experts.** Before trusting any judge, have experts label a sample of outputs and citations and measure agreement, ideally against expert-expert agreement on the same items.
7. **Hygiene.** Canary strings, a private test split, refresh cycles for time-varying tasks, and a fixed date for "as of" questions.

If you plan to train on these tasks with RL, the short-answer set and the citation checks become reward functions, and everything said about [verifier reliability](/blog/how-reliable-are-rlvr-verifiers) and [reward hacking in rubric-based RL](/blog/reward-hacking-rubric-based-rl) applies with interest: an agent will find out quickly that fabricated URLs which happen to resolve, or answers phrased to please the equivalence judge, earn reward.

## How Anthroly can help

The expensive parts of a research-agent eval are human: writing inverted questions and proving their answers are unique, writing reference reports and rubric trees that an expert would sign off on, and labeling outputs and citations to calibrate the judge. GAIA needed about two hours of annotator time per question; Mind2Web 2 needed over 1,000 hours for 130 tasks; DeepResearch Bench's reviewers needed 30-60 minutes per report.

Anthroly builds expert data and RL environments for AI labs. We have about 100–150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains, from biomedicine and chemistry to law, finance, and engineering. We write domain research tasks with verified answers, reference reports, and rubric trees, label agent outputs and citations, and measure judge agreement against expert agreement so you know what your scores mean.

If you are building or training a research agent and want an evaluation you can trust, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [How are expert-written benchmarks like GPQA and Humanity's Last Exam built?](/blog/how-expert-written-benchmarks-are-built)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How do you build an agent benchmark that won't be contaminated or saturated?](/blog/building-contamination-resistant-agent-benchmarks)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [How do you collect training data for computer-use agents?](/blog/how-to-collect-computer-use-agent-trajectory-data)
- [Rubric rewards vs. reward models](/research/compare/rubric-rewards-vs-reward-models)
- [How do you benchmark AI agents on ML research? MLE-bench, PaperBench, RE-Bench](/blog/how-to-benchmark-ai-agents-on-ml-research)

---

## References

1. Wei, J., Sun, Z., Papay, S., McKinney, S., Han, J., Fulford, I., Chung, H. W., Passos, A. T., Fedus, W., & Glaese, A. (2025). [BrowseComp: A Simple Yet Challenging Benchmark for Browsing Agents](https://arxiv.org/abs/2504.12516). arXiv:2504.12516.

2. Zhou, P., Leon, B., Ying, X., et al. (2025). [BrowseComp-ZH: Benchmarking Web Browsing Ability of Large Language Models in Chinese](https://arxiv.org/abs/2504.19314). arXiv:2504.19314.

3. Mialon, G., Fourrier, C., Swift, C., Wolf, T., LeCun, Y., & Scialom, T. (2023). [GAIA: a benchmark for General AI Assistants](https://arxiv.org/abs/2311.12983). arXiv:2311.12983.

4. Chen, Z., Ma, X., Zhuang, S., et al. (2025). [BrowseComp-Plus: A More Fair and Transparent Evaluation Benchmark of Deep-Research Agent](https://arxiv.org/abs/2508.06600). arXiv:2508.06600.

5. FutureSearch: Bosse, N. I., Evans, J., Gambee, R. G., et al. (2025). [Deep Research Bench: Evaluating AI Web Research Agents](https://arxiv.org/abs/2506.06287). arXiv:2506.06287.

6. Du, M., Xu, B., Zhu, C., Wang, X., & Mao, Z. (2025). [DeepResearch Bench: A Comprehensive Benchmark for Deep Research Agents](https://arxiv.org/abs/2506.11763). arXiv:2506.11763.

7. Gou, B., Huang, Z., Ning, Y., et al. (2025). [Mind2Web 2: Evaluating Agentic Search with Agent-as-a-Judge](https://arxiv.org/abs/2506.21506). arXiv:2506.21506.
