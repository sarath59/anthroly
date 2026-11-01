---
title: "How Are Financial AI Benchmarks Built? From FinQA and FinanceBench to Analyst-Written Rubrics and Finance Agent Environments"
description: "A practitioner's guide to how financial LLM benchmarks are built: how FinQA, TAT-QA and DocFinQA annotated numerical reasoning over real reports, what FinanceBench showed about open-book QA over SEC filings, how the Finance Agent Benchmark, FinSearchComp, BigFinanceBench, FrontierFinance and FinFIRST use analyst-written rubrics, how Hedge-Bench turns analyst traces into RL environments, and how to build a finance evaluation set that holds up."
tags:
  - evals
  - benchmarks
  - finance-ai
  - expert-data
  - rubrics
  - rl-environments
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-01T04:45:00.000Z'
updatedAt: '2026-11-01T04:45:00.000Z'
faq:
  - question: "How are financial AI benchmarks built?"
    answer: "Credible financial benchmarks are built by finance professionals in four layers: realistic tasks grounded in real filings and data sources, expert-written reference answers with the derivation an analyst would show, atomic or point-weighted rubrics that check sources, periods, accounting adjustments and calculations, and a grader whose verdicts are checked for agreement. FinQA had financial experts write 8,281 QA pairs with gold reasoning programs; BigFinanceBench had 52 finance subject-matter experts write 928 open-ended research tasks graded by 36,241 rubric points."
  - question: "What is FinanceBench?"
    answer: "FinanceBench (Islam et al., 2023) is an open-book financial QA benchmark of 10,231 questions about 40 U.S. public companies, with answers and evidence strings drawn from 361 public filings released between 2015 and 2023. The authors manually reviewed 2,400 answers from 16 model configurations on a 150-case sample and found GPT-4-Turbo with a shared vector store incorrectly answered or refused 81% of questions."
  - question: "How well do AI agents do on finance research tasks?"
    answer: "Still far from expert level on open-ended work. On the Finance Agent Benchmark's 537 expert-authored questions the best model, OpenAI o3, reached 46.8% accuracy. On BigFinanceBench the best agents reached a 58.8% point-weighted rubric score, and on FrontierFinance the best system scored 56.0%, with Screening & Discovery and Sector, Industry & Macro tasks topping out at 33% and 39%."
  - question: "Why do finance benchmarks grade the derivation and not only the final number?"
    answer: "Because a financial answer is decision-relevant only if another analyst can audit how it was produced: which source, period and accounting definition were used, and how the calculation was done. BigFinanceBench found final-answer accuracy is a useful but lossy proxy for derivation quality; its best models scored about 59% on the rubric but only 41-44% on final-answer accuracy."
  - question: "Can financial benchmarks be used as RL environments?"
    answer: "Yes, if tasks come with checkable rewards and point-in-time data. Hedge-Bench builds 92 environments from hedge fund analysts' reasoning traces with frozen information snapshots and resolved prediction questions, and its authors used GRPO with turn-level credit assignment on 165 training environments to raise research coverage on held-out environments from 17.17% to 33.36% at low reasoning effort. Fin-R1 combined 60,091 distilled chain-of-thought samples with SFT followed by RL."
  - question: "What makes a good financial reasoning dataset?"
    answer: "Real source documents with page-level evidence, questions written by people who do the work, gold derivations or reasoning programs rather than bare numbers, explicit units, periods and accounting definitions, numeric tolerances agreed in advance, and independent expert review. FinQA showed the gap this exposes: financial experts reached 91.16% execution accuracy while non-expert crowd workers reached 50.68%."
  - question: "How does Anthroly help build financial AI evaluations?"
    answer: "Anthroly works with PhD experts in finance, economics and quantitative fields to write analyst-style research tasks over real filings, produce reference derivations, author and audit weighted or atomic rubrics, build point-in-time environments for RL, and label meta-evaluation sets to validate LLM judges. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Finance looks like an easy domain to benchmark: the documents are public, the numbers are exact and the answers seem checkable. In practice it is one of the hardest. A correct-looking revenue figure can come from the wrong fiscal period, an unadjusted line item or a stale filing, and an analyst would reject it. Over five years financial evaluation moved from numerical QA over report excerpts to open-book QA over full SEC filings, and then to agent benchmarks graded by analyst-written rubrics and point-in-time environments that can train models with reinforcement learning. This post walks through how the main benchmarks were built, what each design choice changed, and how to build a finance evaluation set that measures what an investment or finance AI team actually needs.**

## The short answer

A credible financial benchmark today has five parts. **Realistic tasks** written by people who do the work: analysts, bankers, investors, accountants. **Real sources** with evidence: filings, transcripts and market data, pinned to a date so the answer cannot change under you. **Reference derivations**, not bare numbers: which source, which period, which accounting definition, which formula. **Rubrics that grade the workflow**: atomic or point-weighted criteria for entity identification, source selection, retrieval, adjustment, calculation and synthesis. And **a grader whose reliability is measured**: deterministic checks where possible, LLM judges with reported agreement where not. FinQA, FinanceBench, the Finance Agent Benchmark, BigFinanceBench, FrontierFinance, FinFIRST and Hedge-Bench each implement a different subset of these.

## How were the first financial reasoning datasets built?

The first generation focused on numerical reasoning over excerpts of real financial reports:

| Dataset | How it was built | What it measures |
|---|---|---|
| TAT-QA (Zhu et al., 2021) | Samples extracted from real financial reports combining tables and text | Hybrid table-text QA requiring arithmetic, counting and comparison |
| FinQA (Chen et al., 2021) | 8,281 QA pairs written by financial experts, with gold reasoning programs | Multi-step numerical reasoning over report pages |
| ConvFinQA (Chen et al., 2022) | Conversational extension built on financial report QA | Chains of numerical reasoning across dialogue turns |
| DocFinQA (Reddy et al., 2024) | 7,437 FinQA questions re-paired with the full source document | Long-document financial QA (average context about 123k words) |
| FinBen (Xie et al., 2024) | 36 datasets spanning 24 financial tasks in seven aspects | Holistic coverage, from extraction to forecasting and trading |

**FinQA** is the most important of these for method. Instead of annotating only the answer, its expert annotators wrote the **reasoning program** that produces it, a short sequence of operations such as subtract and divide over numbers taken from the table and text. That made every answer explainable and made two kinds of scoring possible: execution accuracy (does the program produce the right number?) and program accuracy (is the derivation itself right?). FinQA also measured the human gap honestly. Two additional financial professionals hired to answer the questions reached a mean of 91.16% execution accuracy, while non-expert crowd workers reached 50.68% and the best model in the paper reached 61.24%. TAT-QA reported a similar gap: its TAGOP model reached 58.0% F1 against 90.8% F1 for expert humans.

The program idea is worth copying even for modern agent benchmarks. Here is a minimal executor in the spirit of FinQA-style programs (an illustration, not the dataset's own code):

```python
# Execute a FinQA-style reasoning program: each step may reference
# earlier results as "#0", "#1", ... and the last step is the answer.
OPS = {
    "add": lambda a, b: a + b,
    "subtract": lambda a, b: a - b,
    "multiply": lambda a, b: a * b,
    "divide": lambda a, b: a / b,
}

def execute(program: list[tuple[str, str, str]]) -> float:
    results: list[float] = []
    def val(x: str) -> float:
        return results[int(x[1:])] if x.startswith("#") else float(x)
    for op, a, b in program:
        results.append(OPS[op](val(a), val(b)))
    return results[-1]

# Revenue growth from 1,200 to 1,380 (illustrative numbers)
growth = execute([("subtract", "1380", "1200"), ("divide", "#0", "1200")])
assert abs(growth - 0.15) < 1e-9
```

**DocFinQA** then removed the shortcut that most of these datasets shared. FinQA gives the model the relevant page; analysts are not that lucky. Re-pairing 7,437 FinQA questions with the full filing extended the average context from under 700 words to 123k words, and models struggled most on the longest documents. That anticipated the central lesson of the next generation: retrieval over real documents is part of the task.

## What did FinanceBench change?

**FinanceBench** (Islam et al., 2023) made financial QA open-book and ecologically valid. It has 10,231 questions about 40 publicly traded U.S. companies, each with an answer and an evidence string, drawn from 361 public filings (10-Ks, 10-Qs, 8-Ks and earnings reports) released between 2015 and 2023. The questions came from three construction methods, which are a useful template for anyone building a finance set:

| Question type | How it was written | Count |
|---|---|---|
| Domain-relevant | 25 generic questions an analyst would ask of any company, posed for 37 companies | 925 |
| Novel generated | Annotators wrote company-, report- and industry-specific questions | 1,323 |
| Metrics-generated | 18 base metrics extracted from the three financial statements over 2015-2022, turned into templated questions with phrasing variations | 7,983 |

The evaluation was as careful as the construction. The authors sampled 150 cases and had experts manually check every answer from 16 model configurations, 2,400 answers in total. Results depended heavily on how documents reached the model:

- GPT-4-Turbo with a shared vector store over all filings, the most realistic retrieval setting, incorrectly answered or refused 81% of questions.
- With long-context prompts containing the relevant filing, GPT-4-Turbo was correct 79% of the time and Claude 2 76%.
- An "Oracle" setting that handed GPT-4-Turbo the evidence pages reached 85%.

The questions were designed to be "clear-cut and straightforward", a minimum performance standard rather than a test of analyst judgment. That is what the next generation set out to measure.

## How are finance agent benchmarks built?

From 2025 onward, financial benchmarks give the model tools and ask for research, not lookup.

**The Finance Agent Benchmark** (Bigeard et al., 2025) started from a taxonomy of nine task categories developed with experts from banks, hedge funds and private equity firms, ranging from simple retrieval to financial modeling and market analysis. Experts wrote 537 questions designed to require multiple financial documents, with answers and reasoning steps, and each question was peer reviewed by a different expert. Agents get a harness with web search and EDGAR access. Grading is rubric-based: GPT-4o extracted initial rubrics from the experts' answers, the authors manually reviewed every rubric, an LLM judge applies conjunction rules across criteria, and a dedicated contradiction rubric checks whether any part of the answer conflicts with the expert's, on the observation that detecting contradiction is more reliable than confirming full agreement. The best model, OpenAI o3, reached 46.8% accuracy at an average of USD 3.79 per query. The paper also reports efficiency: o3 averaged 3.1 minutes per task, against 16.8 minutes and USD 25.66 for human experts, counting only time spent answering.

**FinSearchComp** (Hu et al., 2025) targets search specifically. Seventy professional financial experts annotated 635 questions across three tasks that mirror analyst workflows: time-sensitive data fetching, simple historical lookup and complex historical investigation, across global and Greater China markets, with a multi-stage quality-assurance pipeline. **BizFinBench** (Lu et al., 2025) covers business-driven Chinese financial applications with 6,781 annotated queries across five dimensions and nine categories, and introduced IteraJudge to reduce bias when LLMs act as evaluators.

The 2026 generation goes further and grades the derivation:

| Benchmark | Built by | Size | Grading |
|---|---|---|---|
| BigFinanceBench (Wang et al., 2026) | 52 finance SMEs, mostly current and former investment bankers and PE investors; 12 separate reviewers | 928 tasks, 36,241 rubric points | Point-weighted rubric over the visible agent trajectory |
| FrontierFinance (Zhang et al., 2026) | Former buy-side analysts, sell-side research associates and investment bankers; four-stage pipeline | 220 queries, 11,543 rubrics | Binary, source-attributed rubrics; majority of three LLM judges |
| FinFIRST (Wang et al., 2026) | More than 50 finance experts; 18-field taxonomy, registry of 138 sources, six-stage QC | 123 tasks | Atomic criteria for acquisition, source verification, and computation and answer |

**BigFinanceBench** decomposes each derivation into independently checkable steps: entity identification, source selection, line-item retrieval, accounting adjustment, formula construction and final synthesis. Judges apply these criteria to the agent's full trajectory, including tool calls, tool outputs and calculations, so the benchmark grades auditable workflow evidence rather than only the final response. Two LLM judges agreed closely on final-answer correctness (Cohen's kappa between 0.952 and 0.973 across the ten models). The headline result is the gap between rubric score and answer accuracy:

| Model (BigFinanceBench) | Rubric score | Final-answer accuracy |
|---|---|---|
| Claude Opus 4.7 | 58.8% | 41.5% |
| GPT-5.5 | 58.8% | 44.3% |
| Claude Sonnet 4.6 | 58.5% | 38.4% |
| GLM 5.1 | 54.9% | 35.7% |
| Qwen 3.6 27B | 47.3% | 30.0% |

The two scoring rules answer different questions. If task $i$ has rubric criteria $j$ with weights $w_{ij}$ and binary verdicts $c_{ij} \in \{0, 1\}$, the point-weighted score and the strict pass rate over $N$ tasks are

$$
S = \frac{1}{N} \sum_{i=1}^{N} \frac{\sum_j w_{ij} \, c_{ij}}{\sum_j w_{ij}}, \qquad P_{\text{strict}} = \frac{1}{N} \sum_{i=1}^{N} \prod_j c_{ij}.
$$

$S$ tells you how much of an analyst's derivation the model reproduced and where it broke; $P_{\text{strict}}$ tells you how often the work product is usable without correction. FinFIRST reports both, and they rank systems differently: Claude-Opus-5 had the highest atomic score (87.59%), while GPT-5.6-Sol had the highest strict pass rate (71.54%). Across systems, computation and answer formation lagged behind raw-information acquisition.

**FrontierFinance** makes every rubric a binary criterion attributed to a publicly available source, which keeps grading reproducible, and organizes tasks into six use cases across the investor workflow. Its findings are a reminder that the harness is part of what you measure: Samaya's in-house system led at 56.0%, ahead of the strongest frontier model in the common harness (Claude Fable 5, 49.2%), and the best open-weight model (Kimi K3, 46.4%) came close at much lower cost. The two open-ended use cases, Screening & Discovery and Sector, Industry & Macro, were hardest, with the best systems at 33% and 39%.

## How do finance benchmarks become RL environments?

A benchmark becomes a training environment when every task has a reward that can be computed without a human in the loop and the data cannot leak the answer.

**Hedge-Bench** (Ramesh et al., 2026) is the clearest example. It has 92 environments derived from hedge fund analysts' reasoning traces, each paired with a prediction question that later resolved. Agents reason from **frozen information snapshots**, so they cannot read the outcome, and are scored on both the forecast and research coverage of the steps analysts took. Joint success rates, requiring a correct forecast and over 60% research coverage, ranged from 2.54% to 31.52% across 11 frontier models. The authors then trained with GRPO and turn-level credit assignment on 165 environments, raising coverage on 22 held-out environments from 17.17% to 33.36% at low reasoning effort and from 30.19% to 47.02% at extra-high effort, and reported out-of-distribution gains on GDPval, Harvey LAB and FrontierFinance.

**Fin-R1** (Liu et al., 2025) shows the more common recipe: 60,091 chain-of-thought samples distilled and filtered from existing financial benchmarks, then SFT followed by RL on a 7B model. It works because numeric finance answers are verifiable, which is the same property that makes FinQA-style programs valuable.

Three design rules carry over from both:

1. **Pin time.** A snapshot date for every task, with sources filtered to what was public at that date. Our [forecasting RL post](/blog/how-to-train-llms-to-forecast-with-reinforcement-learning) covers why look-ahead leakage silently inflates rewards.
2. **Normalize before you compare.** Units (thousands vs. millions), sign conventions, fiscal vs. calendar periods and GAAP vs. adjusted definitions must be fixed in the task or parsed by the verifier. A relative tolerance, accepting a model answer $a$ when $|a - y| \leq \epsilon \cdot |y|$ for reference value $y$, is agreed in advance, not tuned after seeing model outputs.
3. **Reward the derivation where you can.** A pure final-answer reward invites lucky guesses and memorized figures; rubric points for source and period selection give denser, harder-to-hack signal. Our guide to [reward hacking in rubric-based RL](/blog/reward-hacking-rubric-based-rl) covers how those criteria get gamed.

## How do you build a financial evaluation set that holds up?

| Decision | What to do | Why |
|---|---|---|
| Who writes tasks | Practitioners in the target role: analysts, bankers, investors, accountants | FinQA's expert-crowd gap (91.16% vs. 50.68%) is the gap your labels inherit |
| Task source | Real filings, transcripts and data, with evidence pages recorded | FinanceBench and DocFinQA showed retrieval is part of the task |
| Ground truth | A reference derivation, not just a number | Lets you grade source, period and adjustment errors separately |
| Rubrics | Atomic, source-attributed criteria, weighted by importance | BigFinanceBench and FrontierFinance show partial credit localizes failures |
| Review | A second expert audits every task and rubric before inclusion | Every benchmark above used independent review |
| Grader | Deterministic numeric checks plus validated LLM judges for text | Report judge agreement, as BigFinanceBench does |
| Scoring | Report rubric score and strict pass rate | They rank systems differently (FinFIRST) |
| Time | Snapshot date per task; refresh the set | Prevents leakage and contamination |

## What do teams get wrong?

- **Grading only the final number.** It rewards the right figure from the wrong period and hides where agents fail. BigFinanceBench's rubric and answer scores differ by 14 to 20 points for top models.
- **Excerpts instead of documents.** A model that gets the right page for free has skipped most of the analyst's job.
- **Unpinned time.** Questions like "latest quarterly revenue" change answers, and live web access can leak outcomes into forecasting tasks.
- **Templated questions only.** FinanceBench's metrics-generated questions scale well, but novel analyst-written questions are where judgment shows up.
- **Ignoring the harness.** FrontierFinance found the tool harness strongly shapes quality and cost, so report it with the score.
- **No contamination plan.** Public filings and popular benchmarks are in pretraining data; hold out freshly written tasks, as our post on [contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks) explains.

## How Anthroly can help

Every benchmark in this post was bottlenecked on the same resource: finance experts writing realistic tasks, reference derivations and rubrics, then reviewing each other's work. Anthroly works with PhD experts in finance, economics and quantitative fields who write analyst-style research tasks over real filings, produce step-by-step reference derivations, author and audit weighted or atomic rubrics, build point-in-time environments with verifiable rewards for RL, and label meta-evaluation sets so you can validate an LLM judge against expert judgment. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building or auditing a finance evaluation or a finance agent RL environment, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can review a sample of your tasks and rubrics together.

## Related reading

- [How are legal AI benchmarks built?](/blog/how-are-legal-ai-benchmarks-built)
- [How are medical AI benchmarks built?](/blog/how-are-medical-ai-benchmarks-built)
- [How do you evaluate AI on real professional work?](/blog/how-to-evaluate-ai-on-real-professional-work)
- [How do you train LLMs to forecast with reinforcement learning?](/blog/how-to-train-llms-to-forecast-with-reinforcement-learning)
- [How do you evaluate deep research agents?](/blog/how-to-evaluate-deep-research-agents)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)

---

## References

1. Zhu, F., Lei, W., Huang, Y., et al. (2021). [TAT-QA: A Question Answering Benchmark on a Hybrid of Tabular and Textual Content in Finance](https://arxiv.org/abs/2105.07624). arXiv:2105.07624.
2. Chen, Z., Chen, W., Smiley, C., et al. (2021). [FinQA: A Dataset of Numerical Reasoning over Financial Data](https://arxiv.org/abs/2109.00122). arXiv:2109.00122.
3. Chen, Z., Li, S., Smiley, C., Ma, Z., Shah, S., & Wang, W. Y. (2022). [ConvFinQA: Exploring the Chain of Numerical Reasoning in Conversational Finance Question Answering](https://arxiv.org/abs/2210.03849). arXiv:2210.03849.
4. Reddy, V., Koncel-Kedziorski, R., Lai, V. D., et al. (2024). [DocFinQA: A Long-Context Financial Reasoning Dataset](https://arxiv.org/abs/2401.06915). arXiv:2401.06915.
5. Xie, Q., Han, W., Chen, Z., et al. (2024). [FinBen: A Holistic Financial Benchmark for Large Language Models](https://arxiv.org/abs/2402.12659). arXiv:2402.12659.
6. Islam, P., Kannappan, A., Kiela, D., Qian, R., Scherrer, N., & Vidgen, B. (2023). [FinanceBench: A New Benchmark for Financial Question Answering](https://arxiv.org/abs/2311.11944). arXiv:2311.11944.
7. Bigeard, A., Nashold, L., Krishnan, R., & Wu, S. (2025). [Finance Agent Benchmark: Benchmarking LLMs on Real-world Financial Research Tasks](https://arxiv.org/abs/2508.00828). arXiv:2508.00828.
8. Hu, L., Jiao, J., Liu, J., et al. (2025). [FinSearchComp: Towards a Realistic, Expert-Level Evaluation of Financial Search and Reasoning](https://arxiv.org/abs/2509.13160). arXiv:2509.13160.
9. Lu, G., Guo, X., Zhang, R., Zhu, W., & Liu, J. (2025). [BizFinBench: A Business-Driven Real-World Financial Benchmark for Evaluating LLMs](https://arxiv.org/abs/2505.19457). arXiv:2505.19457.
10. Wang, A., Meinhardt, G., Katz, J., et al. (2026). [BigFinanceBench: A Workflow-Grounded Benchmark for Financial-Research Agents](https://arxiv.org/abs/2606.03829). arXiv:2606.03829.
11. Zhang, Y., Koyluoglu, O. O., Venkatesh, T., et al. (2026). [FrontierFinance: A Challenging Benchmark for Measuring Frontier Intelligence of Finance Agents](https://arxiv.org/abs/2608.11683). arXiv:2608.11683.
12. Wang, W., Xiang, H., Zhao, X., et al. (2026). [FinFIRST: Benchmarking Search Agents for Financial Information Retrieval, Sourcing and Traceability](https://arxiv.org/abs/2609.25192). arXiv:2609.25192.
13. Ramesh, M., Cho, E., Lu, A., Huang, S., & Lyu, B. (2026). [Hedge-Bench: Can Agents Reason Their Way to Better Predictions?](https://arxiv.org/abs/2606.03918). arXiv:2606.03918.
14. Liu, Z., Guo, X., Yang, Z., et al. (2025). [Fin-R1: A Large Language Model for Financial Reasoning through Reinforcement Learning](https://arxiv.org/abs/2503.16252). arXiv:2503.16252.
