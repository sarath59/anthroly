---
title: "How Are Data Analysis Agent Benchmarks Built? From DABench and DSBench to DABstep, KramaBench and Ground Truth for Questions With Many Right Answers"
description: "A practitioner's guide to how benchmarks and RL environments for data analysis and data science agents are built: how InfiAgent-DABench, DSBench, DA-Code, DABstep, KramaBench, DataSpace and Argo-Bench get checkable answers out of messy data, why many-analyst variation makes single gold answers fragile, how injected-signal and synthetic-causal benchmarks manufacture ground truth, and how DataMind, DeepAnalyze and SciDisco turn the same tasks into training data."
tags:
  - data-analysis-agents
  - evals
  - rl-environments
  - verifiers
  - expert-data
  - agent-rl
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-02T04:50:00.000Z'
updatedAt: '2026-11-02T04:50:00.000Z'
faq:
  - question: "How are data analysis agent benchmarks built?"
    answer: "Most pair real data files with a question and a checkable answer. InfiAgent-DABench has 257 questions over 52 CSV files and converts open-ended questions into closed-form answers with format prompting; DSBench draws 466 analysis and 74 modeling tasks from Eloquence and Kaggle competitions; DABstep has over 450 tasks from a financial analytics platform with factoid answers and automatic checks; KramaBench has 104 manually curated pipelines over 1,700 files from 24 data sources. The agent runs code in a sandbox and its final answer is compared to the reference."
  - question: "Why is evaluating data analysis agents hard?"
    answer: "Because many analysis questions have several defensible answers. In the Many Analysts, One Data Set study, 29 teams with 61 analysts analyzed the same data on the same question and reported odds ratios from 0.89 to 2.93; 20 teams found a significant positive effect and 9 did not. A benchmark with a single gold number either has to constrain the question until only one answer is right, or grade the analysis decisions themselves, as BLADE does with ground truth from independent expert analyses."
  - question: "How much does the answer format affect data agent scores?"
    answer: "A lot. In a 2026 Eurostat reproduction benchmark of 30 tasks, an under-specified output contract, in which the required ranking key and unit representation were never stated, understated one condition's accuracy by 23.4 points. The authors conclude that evaluator and contract design can dominate measured agent error, and DataSpace uses a deterministic evaluator with header-invariant column alignment and type- and precision-aware normalization for the same reason."
  - question: "How do benchmarks create ground truth for open-ended data analysis?"
    answer: "Three approaches. Expert multi-analysis: BLADE collects ground truth from independent analyses by expert data scientists. Injected signals: SleuthBench injects controlled data-quality problems and feature effects into public tables, so the injected pattern determines the answer. Fully synthetic causal worlds: CausalDS samples a structural causal model, generates data and a story, and tests abstention when the target is not identifiable. Argo-Bench simulates a whole business and grades agent actions by their consequences in the simulator."
  - question: "How are data analysis agents trained with RL?"
    answer: "Recent recipes synthesize tasks and trajectories, then combine SFT and RL. DataMind uses a task taxonomy with easy-to-hard composition, knowledge-augmented trajectory sampling with model- and rule-based filtering, and a training objective that mixes SFT and RL losses; DataMind-14B reported a 71.16% average across data analysis benchmarks. DeepAnalyze-8B uses curriculum-based agentic training, and SciDisco compiles hypotheses, datasets, hidden evidence graphs and verifiers into environments that give turn-level credit."
  - question: "What do data analysis agents most often get wrong?"
    answer: "Benchmarks point to the same failures: weak data exploration before analysis, failure to build working end-to-end pipelines (KramaBench's best system reached 55% end-to-end accuracy), joins and multimodal evidence (which reduced accuracy across all six backbones in DataSpace), not refusing when no valid evidence path exists (TrustDABench's best reliability score was 24.21%), and recovering how features affect a target (41.9% in SleuthBench)."
  - question: "How does Anthroly help build data analysis evaluations?"
    answer: "Anthroly provides PhD statisticians, economists, epidemiologists and domain scientists who write well-specified analysis tasks, run independent reference analyses, define output contracts and tolerances, label which analytic decisions are defensible, and audit agent notebooks. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Data analysis looks like a verifiable domain. You run code on a table, you get a number, you compare it with the right number. Every data analysis benchmark is built on that premise, and every serious one has had to fight it, because the "right number" depends on choices the question did not specify: which rows count, which unit to report, which covariates to adjust for, what to do with the missing values. Get the specification wrong and you are grading the agent on mind-reading. This post walks through how the main data analysis agent benchmarks were built, where their ground truth comes from, and what it takes to turn them into RL environments that reward good analysis instead of lucky formatting.**

## The short answer

A good data analysis environment has five parts. **Real, messy data**: multiple files, multiple tables, documentation the agent has to read. **A question with a fully specified output contract**: which entity, which unit, which precision, which ordering. **Ground truth produced independently of the agent**, either by expert reference analyses, by injecting a known signal, or by generating the data from a known model. **A tolerant, deterministic evaluator** that normalizes types, units, column order and floating-point noise without forgiving real errors. And, for questions with more than one defensible answer, **grading of the analysis decisions**, not just the final number. InfiAgent-DABench, DSBench, DA-Code, DABstep and KramaBench established the first four; BLADE, SleuthBench, CausalDS and Argo-Bench push on the fifth.

## How did the first data analysis benchmarks get checkable answers?

The early benchmarks solved the grading problem by narrowing the question.

**InfiAgent-DABench** (Hu et al., 2024) was the first benchmark designed for LLM agents doing data analysis end to end in an execution environment. Its DAEval set has 257 questions over 52 CSV files. Because analysis questions are often open-ended, the authors used **format prompting** to convert each question into a closed form that can be checked automatically. That trick, constrain the answer format until grading is mechanical, runs through almost everything that followed.

**DSBench** (Jing et al., 2024) moved toward realism: 466 data analysis tasks and 74 data modeling tasks from Eloquence and Kaggle competitions, with long contexts, multimodal task backgrounds, large files and multi-table structures. Modeling tasks are scored with a **Relative Performance Gap** against competition results rather than exact match, which is a neat way to borrow human-calibrated difficulty from a leaderboard. The best agent solved 34.12% of analysis tasks.

**DA-Code** (Huang et al., 2024) put agents in a controllable executable environment with real data and complex wrangling, and had annotators carefully design the evaluation suite for each task. The best LLM reached 30.5% accuracy.

**DABstep** (Egg et al., 2025) drew over 450 tasks from a financial analytics platform. Tasks require combining code over data with reasoning over heterogeneous documentation, and answers are factoids with automatic correctness checks. The best agent reached only 14.55% on the hardest tasks, a sign that the hard part is often reading the documentation correctly rather than writing the pandas.

## What do the newer benchmarks add?

| Benchmark | Data | Size | How answers are checked |
|---|---|---|---|
| KramaBench (Lai et al., 2025) | Data lakes from 24 sources in 6 domains | 104 manually curated and solved pipelines over 1,700 files | End-to-end answer plus evaluation of pipeline design and individual data tasks |
| DataSpace (Li et al., 2026) | Heterogeneous workspaces: CSV, JSON, SQLite, Markdown, PDF, video | 410 tasks, 7,439 artifacts, 15.01 GB | Complete tabular result vs. reference, deterministic normalization |
| DSAgentBench (Rahman et al., 2026) | Real computer environments: notebooks, IDEs, terminals, browsers, databases | 275 tasks | Deterministic evaluators for analytical correctness, visual outputs and model performance |
| Argo-Bench (Tomitsuka et al., 2026) | Simulated food-delivery platform exported to a 235-table ERP warehouse with 7.5 billion rows | 210 tasks | Agent actions scored by their consequences in the simulator |

**KramaBench** tests whether an agent can design and run a pipeline from a raw data lake to an insight. Its finding is the honest summary of the field: agents can produce plausible draft pipelines but struggle to produce working end-to-end ones. The best system reached 55% end-to-end accuracy in the full data-lake setting and 62% even with perfect retrieval, and leading LLMs could fully implement only 20% of individual data tasks.

**DataSpace** asks the agent for a complete table, not a single number, and grades it with a deterministic evaluator that does header-invariant column alignment, type- and precision-aware normalization and order-aware row comparison. It was built with an execution-grounded pipeline plus human review and task repair by 11 domain experts, and served as the evaluation benchmark for the KDD Cup 2026 data agent competition. The best accuracy was 66.34%, and with the backbone model fixed, **harness choice alone moved scores by 15.36 points**. Joins and multimodal evidence reduced accuracy for every backbone.

**Argo-Bench** is the most interesting design. Instead of releasing a sensitive enterprise warehouse, the authors simulated a New York City food delivery platform at scale, 81 million orders in 2024 with fraud patterns and marketplace incentives, and exported it to an ERP-style warehouse. The simulator's ground-truth state is hidden from the agent, which has to reconstruct facts by navigating the warehouse and then **act**: ban fraudulent accounts, allocate courier incentive budgets, issue back pay. Each action is scored by its consequences in the simulator, and every task has an executable reference solution. The strongest of 14 models scored 95 or higher on only 34.8% of tasks.

## Why is a single gold answer fragile?

The uncomfortable fact behind every data analysis benchmark comes from outside machine learning. In **Many Analysts, One Data Set** (Silberzahn et al., 2018), 29 teams involving 61 analysts answered the same question on the same data: are soccer referees more likely to give red cards to dark-skin-toned players? Their estimates ranged from 0.89 to 2.93 in odds-ratio units. Twenty teams found a significant positive effect, nine did not, and the 29 analyses used 21 unique combinations of covariates. Neither analysts' expertise nor peer ratings of analysis quality explained the variation.

If expert humans diverge that much on an open question, a benchmark that grades an agent against one team's number is measuring agreement with that team. There are three honest responses.

**1. Specify the question until one answer is right.** This is the format-prompting route. It works, but it moves difficulty from analysis to reading the specification. A 2026 study on reproducing Eurostat statistics (Necula, 2026) made the cost visible: 30 tasks across seven Eurostat datasets, exact correctness requiring the right dataset, filters, output shape, values and unit, and a companion run with an under-specified output contract that **understated the accuracy of the metadata-plus-repair condition by 23.4 points**. The author's conclusion: evaluator and contract design can dominate measured agent error.

**2. Grade the decisions, not the number.** BLADE (Gu et al., 2024) uses 12 datasets and research questions from the scientific literature with ground truth collected from independent analyses by expert data scientists and researchers, then matches the agent's choices of variables, transformations and models against that set of defensible decisions. DiscoveryBench (Majumder et al., 2024) similarly derived 264 discovery workflows from published papers across 6 domains, plus 903 synthetic tasks, and uses facet-based evaluation; the best system scored 25%.

**3. Manufacture ground truth you control.** SleuthBench (Jia et al., 2026) injects controlled data-quality problems and feature effects into public tables, so the injected pattern determines the answer and memorizing the original table does not help. Models detected data-quality problems well (83.8%) but recovered feature contributions poorly (41.9%), rising to 68.0% when given precomputed statistical summaries. CausalDS (Leban et al., 2026) samples a structural causal model, generates observational data and a grounded story, derives tasks on all three of Pearl's rungs, and grades **abstention** as the correct answer when the target is not identifiable. Because the generator is synthetic, fresh exams can be drawn at will.

## How should the grader compare answers?

Most measured error in data agent benchmarks is not analysis error, it is mismatch between what the agent printed and what the checker expected. A tolerant grader normalizes the representation and nothing else:

```python
import math, re

def norm_num(x, unit=None):
    s = str(x).strip().replace(",", "")
    pct = s.endswith("%")
    v = float(re.sub(r"[^0-9eE+\-.]", "", s))
    if unit == "fraction" and pct:   # contract says 0-1, agent wrote 12.5%
        v /= 100
    return v

def match_scalar(pred, gold, rel_tol=1e-3, abs_tol=1e-6, unit=None):
    try:
        return math.isclose(norm_num(pred, unit), float(gold), rel_tol=rel_tol, abs_tol=abs_tol)
    except ValueError:
        return str(pred).strip().lower() == str(gold).strip().lower()

def match_table(pred_rows, gold_rows, key_cols, ordered=False, **kw):
    """Header-invariant, order-aware comparison in the spirit of DataSpace's evaluator."""
    if len(pred_rows) != len(gold_rows):
        return False
    if not ordered:
        sort = lambda rows: sorted(rows, key=lambda r: tuple(str(r[c]) for c in key_cols))
        pred_rows, gold_rows = sort(pred_rows), sort(gold_rows)
    cols = gold_rows[0].keys()
    return all(match_scalar(p.get(c), g[c], **kw) for p, g in zip(pred_rows, gold_rows) for c in cols)
```

The tolerances and unit rules belong in the task's output contract, written once by someone who knows the domain, not guessed by the grader at scoring time.

For questions with a defensible range rather than a point, you can turn a many-analyst reference into a reward. If expert analyses give estimates $\hat\theta_1, \dots, \hat\theta_K$, score an agent's estimate $\theta$ by whether it falls inside the expert range and whether its analytic decisions $D$ match a defensible set $\mathcal{D}^\ast$:

$$
r(\theta, D) = \alpha\,\mathbf{1}\!\left[\min_k \hat\theta_k \le \theta \le \max_k \hat\theta_k\right] + (1 - \alpha)\,\frac{|D \cap \mathcal{D}^\ast|}{|D \cup \mathcal{D}^\ast|}.
$$

The first term stops the agent from being punished for a defensible specification; the second rewards it for choices experts would recognize, which is the part a single gold number cannot see.

## How are data analysis agents trained?

The training recipes look like the deep research and SWE recipes: synthesize tasks, sample trajectories, filter hard, then mix SFT and RL.

- **DataMind** (Qiao et al., 2025) uses a fine-grained task taxonomy with recursive easy-to-hard task composition, knowledge-augmented trajectory sampling with model-based and rule-based filtering, a training objective that dynamically combines SFT and RL losses, and a memory-frugal code-based multi-turn rollout framework. Trained on the resulting DataMind-12K trajectories, DataMind-14B reported a 71.16% average across data analysis benchmarks.
- **DeepAnalyze** (Zhang et al., 2025) trains an 8B agentic model with a curriculum that emulates how human data scientists learn, plus data-grounded trajectory synthesis, aiming at the full path from data sources to analyst-grade reports.
- **SciDisco** (Xu et al., 2026) compiles hypotheses, datasets, hidden evidence graphs and verifiers into environments where analytical progress can be checked during interaction, then assigns **turn-level credit** to actions that produce verifiable evidence. It is the clearest example of process supervision for analysis, and it depends on someone having built the hidden evidence graph.

All three rely on synthetic tasks at scale. That makes the benchmark lessons above training lessons too: an under-specified contract in an RL environment does not just mis-measure the agent, it trains it to guess formats.

## What do teams get wrong?

- **Skipping data exploration.** Yuan et al. (2026) argue that understanding what a workbook contains, its logical tables, column semantics, keys and quality issues, should be a first-class evaluation target. Strong agents still missed logical structure even when they read the spreadsheet, and explicit exploration support often improved downstream correctness.
- **Rewarding an answer when the right answer is "I can't".** TrustDABench (Shi et al., 2026) built 2,340 human-verified perturbed instances from 19 operators and found that models rarely detect conflicting evidence and keep following executable but unsupported analysis paths; the best reliability score was 24.21%. If your environment never rewards abstention or clarification, your agent will never learn it.
- **Comparing agents across harnesses.** DataSpace's 15.36-point spread from harness alone means a leaderboard that mixes harnesses is mostly measuring scaffolds.
- **Testing statistics only in multiple choice.** StatABench (Zhu et al., 2026) pairs 404 closed questions with 30 open-ended modeling tasks; closed-form accuracy and open-ended modeling quality are different skills and need different graders.
- **Believing execution feedback fixes everything.** In the Eurostat study, what helped was semantic validation against frozen specifications, a fully specified output contract and a retry budget, not execution diagnostics.

## Where does expert data still matter?

Every reliable piece of the pipeline above is expert work: writing output contracts that leave exactly one correct answer, running independent reference analyses, deciding which analytic choices are defensible, designing injected signals that look like real phenomena, building the hidden evidence graph for process rewards, and reading agent notebooks to tell a wrong analysis from a wrong format. Synthetic generators scale tasks; they do not decide what a good analysis is.

## How Anthroly can help

Anthroly works with PhD statisticians, economists, epidemiologists, biostatisticians and domain scientists who write well-specified analysis tasks with output contracts, run independent reference analyses for many-analyst ground truth, label defensible analytic decisions, design injected-signal and abstention items, and audit agent notebooks. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building a data agent eval or RL environment and want experts to stress-test your contracts and gold answers on a sample, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How are text-to-SQL RL environments built?](/blog/how-are-text-to-sql-rl-environments-built)
- [How are financial AI benchmarks built?](/blog/how-are-financial-ai-benchmarks-built)
- [How to benchmark AI agents on ML research](/blog/how-to-benchmark-ai-agents-on-ml-research)
- [How to evaluate AI on real professional work](/blog/how-to-evaluate-ai-on-real-professional-work)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How is training data for deep research agents built?](/blog/how-is-training-data-for-deep-research-agents-built)

---

## References

1. Hu, X., Zhao, Z., Wei, S., et al. (2024). [InfiAgent-DABench: Evaluating Agents on Data Analysis Tasks](https://arxiv.org/abs/2401.05507). arXiv:2401.05507.
2. Jing, L., Huang, Z., Wang, X., et al. (2024). [DSBench: How Far Are Data Science Agents from Becoming Data Science Experts?](https://arxiv.org/abs/2409.07703). arXiv:2409.07703.
3. Huang, Y., Luo, J., Yu, Y., et al. (2024). [DA-Code: Agent Data Science Code Generation Benchmark for Large Language Models](https://arxiv.org/abs/2410.07331). arXiv:2410.07331.
4. Egg, A., Goyanes, M. I., Kingma, F., et al. (2025). [DABstep: Data Agent Benchmark for Multi-step Reasoning](https://arxiv.org/abs/2506.23719). arXiv:2506.23719.
5. Lai, E., Vitagliano, G., Zhang, Z., et al. (2025). [KramaBench: A Benchmark for AI Systems on Data-to-Insight Pipelines over Data Lakes](https://arxiv.org/abs/2506.06541). arXiv:2506.06541.
6. Li, B., Liang, Z., Xie, Y., et al. (2026). [DataSpace: Benchmarking Data Agents for Verifiable Analytics over Heterogeneous Workspaces](https://arxiv.org/abs/2608.03451). arXiv:2608.03451.
7. Rahman, M., Islam, M. S., Mahbub, R., et al. (2026). [DSAgentBench: Can Agents Automate End-to-End Data-Science Workflows in Real Computer Environments?](https://arxiv.org/abs/2608.10366). arXiv:2608.10366.
8. Tomitsuka, G., Raayatsanati, A., Xing, E., et al. (2026). [Argo-Bench: Evaluating Data Agents on Enterprise-Scale Workflows](https://arxiv.org/abs/2610.02122). arXiv:2610.02122.
9. Silberzahn, R., Uhlmann, E. L., Martin, D. P., et al. (2018). [Many Analysts, One Data Set: Making Transparent How Variations in Analytic Choices Affect Results](https://doi.org/10.1177/2515245917747646). Advances in Methods and Practices in Psychological Science, 1(3).
10. Necula, S.-C. (2026). [Can Coding Agents Reproduce Official Statistics? Metadata, Retry Budget and the Limits of Execution Feedback in a Controlled Eurostat Benchmark](https://arxiv.org/abs/2609.22222). arXiv:2609.22222.
11. Gu, K., Shang, R., Jiang, R., et al. (2024). [BLADE: Benchmarking Language Model Agents for Data-Driven Science](https://arxiv.org/abs/2408.09667). arXiv:2408.09667.
12. Majumder, B. P., Surana, H., Agarwal, D., et al. (2024). [DiscoveryBench: Towards Data-Driven Discovery with Large Language Models](https://arxiv.org/abs/2407.01725). arXiv:2407.01725.
13. Jia, J., Remond-Tiedrez, A., Alvarez, A., et al. (2026). [SleuthBench: Benchmarking Statistical LLM Evaluation Using Tabular Hidden Signals](https://arxiv.org/abs/2609.34228). arXiv:2609.34228.
14. Leban, A., Saarinen, T., & Sun, Y. (2026). [CausalDS: Benchmarking Causal Reasoning in Data-Science Agents](https://arxiv.org/abs/2607.08093). arXiv:2607.08093.
15. Qiao, S., Zhao, Y., Qiu, Z., et al. (2025). [Scaling Generalist Data-Analytic Agents](https://arxiv.org/abs/2509.25084). arXiv:2509.25084.
16. Zhang, S., Fan, J., Fan, M., et al. (2025). [DeepAnalyze: Agentic Large Language Models for Autonomous Data Science](https://arxiv.org/abs/2510.16872). arXiv:2510.16872.
17. Xu, Y., Zhang, K., Yu, Y., et al. (2026). [Scaling Scientific Discovery Environments for Turn-Level Agentic RL](https://arxiv.org/abs/2607.28990). arXiv:2607.28990.
18. Yuan, Y., Ranka, V., Lasisi, T., et al. (2026). [Walk Before You Run: The Importance of Data Exploration for Data Analysis Agents](https://arxiv.org/abs/2608.16045). arXiv:2608.16045.
19. Shi, B., Liu, Y., Zhao, C., et al. (2026). [TrustDABench: Benchmarking Reliability and Robustness of LLMs for Structured Data Analysis](https://arxiv.org/abs/2608.24145). arXiv:2608.24145.
20. Zhu, Y., Ding, Y., Lai, P., et al. (2026). [StatABench: Dataset and Framework for Evaluating Statistical Analysis Capabilities of LLMs](https://arxiv.org/abs/2606.22977). arXiv:2606.22977.
