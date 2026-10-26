---
title: "How Do You Benchmark AI Agents on ML Research? MLE-bench, PaperBench, RE-Bench, and What They Miss"
description: "Automated AI R&D is now a headline capability for frontier labs, and a small set of benchmarks carries most of the evidence. Here is how MLE-bench, PaperBench, RE-Bench, METR's time horizons, MLRC-Bench, EXP-Bench and CORE-Bench source tasks, grade them and set human baselines, where their numbers mislead, and how to design a research-agent eval that holds up."
tags:
  - agent-evals
  - ai-research-agents
  - benchmarks
  - mle-bench
  - paperbench
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-26T05:05:00.000Z'
updatedAt: '2026-10-26T05:05:00.000Z'
faq:
  - question: "What benchmarks measure whether AI agents can do machine learning research?"
    answer: "The most cited are MLE-bench (75 Kaggle ML engineering competitions graded against human leaderboards), PaperBench (replicating 20 ICML 2024 Spotlight and Oral papers, graded with author co-developed rubrics), RE-Bench (7 open-ended ML research engineering environments with 71 eight-hour attempts by 61 human experts), and METR's 50% task-completion time horizon. MLRC-Bench, EXP-Bench, CORE-Bench, MLAgentBench and ScienceAgentBench cover research competitions, full experiments, computational reproducibility and data-driven science."
  - question: "How is PaperBench graded?"
    answer: "Each paper's replication task is decomposed into a hierarchical rubric of smaller gradable sub-tasks, co-developed with the paper's authors, for a total of 8,316 individually gradable tasks. An LLM-based judge grades attempts against the rubrics, and the authors built a separate benchmark to measure the judge's own accuracy."
  - question: "Are AI agents better than human experts at ML research engineering?"
    answer: "It depends on the time budget. In RE-Bench, the best agents scored 4x higher than human experts when both had 2 hours per environment, but humans narrowly exceeded the top agent at 8 hours and scored 2x the top agent with 32 total hours. In PaperBench, the best tested agent reached an average replication score of 21.0% and did not outperform a human baseline of top ML PhDs on a subset."
  - question: "What is METR's time horizon metric?"
    answer: "The 50% task-completion time horizon is the length of task, measured by how long skilled humans take, that a model completes with 50% success. Kwa et al. (2025) measured around 50 minutes for Claude 3.7 Sonnet and found the horizon of frontier models doubling roughly every seven months since 2019, while discussing limits on how well the result generalises to real-world work."
  - question: "Why can research-agent benchmark scores be misleading?"
    answer: "Common causes are contamination of public tasks, LLM judges that reward plausible-looking work, partial-credit scores that hide near-zero end-to-end success (EXP-Bench reports 20-35% on individual aspects but 0.5% complete executable experiments), and comparisons that ignore time and compute budgets. MLRC-Bench also found that LLM-judged innovation was misaligned with actual performance."
  - question: "How can Anthroly help build research-agent evaluations?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, plus about 400 more PhDs and graduates ready to commit, can write fresh research tasks, author and validate grading rubrics, produce timed human baselines, and audit LLM judges against expert grades."
draft: false
---

**"Can the model do AI research?" has moved from a speculative question to a line item in frontier safety policies and a capability labs actively train for. The evidence base is a handful of benchmarks built in 2024 and 2025, and each one makes design choices about where tasks come from, how they are graded and what humans are compared against. Those choices decide what a score means. This post walks through the main benchmarks, where their numbers mislead, and what a research-agent eval needs if you want to trust it.**

A note on numbers: the scores below are the ones reported in each original paper, for the models tested at the time. Leaderboards have moved since. The point here is the design of the measurement, which changes far more slowly than the scores.

## The landscape at a glance

| Benchmark | Task source | Grading | Human comparison | Headline result in the paper |
|---|---|---|---|---|
| [MLE-bench](https://arxiv.org/abs/2410.07095) | 75 Kaggle competitions | Competition metric vs Kaggle leaderboard (medals) | Public leaderboards | Best setup reached at least bronze in 16.9% of competitions |
| [PaperBench](https://arxiv.org/abs/2504.01848) | 20 ICML 2024 Spotlight and Oral papers | Author co-developed rubrics (8,316 leaf tasks), LLM judge | Top ML PhDs on a subset | Best agent averaged 21.0% replication score |
| [RE-Bench](https://arxiv.org/abs/2411.15114) | 7 open-ended research engineering environments | Objective score normalised to reference solutions | 71 eight-hour attempts by 61 experts | Agents 4x humans at 2h, humans 2x agents at 32h |
| [METR time horizon](https://arxiv.org/abs/2503.14499) | RE-Bench, HCAST and 66 shorter tasks | Success vs human completion time | Timed domain experts | About 50 minutes for Claude 3.7 Sonnet |
| [MLRC-Bench](https://arxiv.org/abs/2504.09702) | 7 ML research competition tasks | Objective metrics | Top human participant | Best agent closed 9.3% of the baseline-to-top-human gap |
| [EXP-Bench](https://arxiv.org/abs/2505.24785) | 461 tasks from 51 AI papers | Design, implementation, execution checks | None reported in abstract | 0.5% complete executable experiments |
| [CORE-Bench](https://arxiv.org/abs/2409.11363) | 270 tasks from 90 papers in CS, social science, medicine | Match reproduced results | None | 21% on the hardest level |

Older precursors include [MLAgentBench](https://arxiv.org/abs/2310.03302) (13 ML experimentation tasks) and [ScienceAgentBench](https://arxiv.org/abs/2410.05080) (102 tasks from 44 peer-reviewed publications, validated by nine subject matter experts).

## Three ways to source a research task

**From competitions.** MLE-bench and MLRC-Bench take tasks that already have a dataset, a metric and a field of human competitors. That buys an objective score and a free human distribution. The cost is contamination: Kaggle solutions, notebooks and discussion threads are in pretraining data. MLE-bench studied contamination directly, and MLAgentBench reported success rates ranging from 100% on well-established older datasets to 0% on recent Kaggle challenges created after the underlying models were trained. A gap that large should make anyone cautious about averaging old and new tasks into one number.

**From papers.** PaperBench, EXP-Bench and CORE-Bench start from published work. Replication is a good proxy for research engineering because the target is known and checkable. PaperBench works from scratch (no author code), which tests understanding; CORE-Bench provides code and data, which tests computational reproducibility, a narrower and more mechanical skill. The paper route inherits the paper's ambiguity: when a result depends on an unreported hyperparameter, failing to reproduce it says as much about the paper as the agent.

**From expert-built environments.** RE-Bench commissions open-ended environments with a scoring function and strong reference solutions, then times real experts on them. This is the most expensive route and the one that produces the most interpretable comparison, because the human baseline was measured under the same conditions as the agent.

## How grading changes the answer

### Leaderboard percentiles

MLE-bench maps an agent's competition score onto the historical Kaggle leaderboard and reports medal rates. This is objective, but medal thresholds vary by competition size and era, and a bronze in a crowded competition is not the same achievement as a bronze in a small one.

### Rubrics plus an LLM judge

PaperBench's rubric hierarchy is the most careful example of rubric grading in the agent-eval literature: each replication is decomposed into sub-tasks with clear criteria, the rubrics were co-developed with the original authors, and the judge's own performance was measured on a separate judge benchmark. A replication score is a weighted aggregate over the rubric tree. For a node $v$ with children $c$ and weights $w_c$,

$$
s(v) = \frac{\sum_{c} w_c\, s(c)}{\sum_{c} w_c}
$$

with leaf scores supplied by the judge. The design question is what the leaves reward. If many leaves check that code exists or that a step was attempted, partial credit accumulates without the experiment working. [EXP-Bench](https://arxiv.org/abs/2505.24785) makes the gap explicit: scores on individual aspects such as design or implementation correctness reached 20-35%, while complete, executable experiments succeeded 0.5% of the time.

The second risk is the judge. [MLRC-Bench](https://arxiv.org/abs/2504.09702) reports a misalignment between LLM-judged innovation and actual performance on research problems. A judge that rewards plausible-sounding methods is grading the writeup, not the research.

### Objective scores normalised to references

RE-Bench scores each environment with an objective function and normalises against a starting solution and a strong reference, so that 0 means no improvement and 1 means matching the reference. That makes scores comparable across environments and against humans, at the price of needing a reference solution that someone had to build and validate.

### Time horizons

METR's metric changes the question from "what fraction of tasks" to "how long a task". Fit a logistic curve of agent success against the log of human completion time $t$,

$$
P(\text{success} \mid t) = \sigma\big(\beta_0 + \beta_1 \log_2 t\big)
$$

and the 50% horizon is the $t$ where the curve crosses one half, $t_{50} = 2^{-\beta_0/\beta_1}$. [Kwa et al. (2025)](https://arxiv.org/abs/2503.14499) measured about 50 minutes for Claude 3.7 Sonnet and a doubling roughly every seven months since 2019. The authors are explicit about limits on external validity. The metric is only as good as the human timing data, which is why it was built on timed domain experts rather than estimates.

## Budgets: the comparison most leaderboards leave out

RE-Bench is the clearest demonstration that a single score can flip depending on the budget. With 2 hours per environment, the best agents scored 4x higher than human experts. At 8 hours humans narrowly exceeded the top agent, and with 32 total hours humans achieved 2x the top agent's score. Agents generate and test ideas faster and more cheaply; humans currently get more out of additional time. Any claim of "superhuman" or "below human" research ability without a stated time budget, attempt count (best-of-$k$) and compute cost is incomplete.

```python
# What a research-agent eval report should pin down for every number
report = {
    "task_set": "version + creation dates (pre/post model cutoff)",
    "grader": "objective metric | rubric + judge (judge accuracy vs experts)",
    "budget": {"wall_clock_hours": 8, "attempts_best_of_k": 1, "gpu_hours": None},
    "human_baseline": "same budget, same tooling, timed",
    "scores": "mean and 95% CI over tasks, plus full end-to-end success rate",
}
```

## What these benchmarks miss

- **Choosing the question.** Almost every task hands the agent a goal. Research taste, deciding which experiment is worth running, is mostly unmeasured.
- **Negative results.** Agents are rewarded for improving a metric. Correctly concluding that an idea does not work, with a clean ablation, rarely earns credit.
- **Fresh, private tasks.** Public tasks drift into training data. A benchmark that cannot be refreshed loses meaning on a schedule.
- **Judge validation at the leaves.** PaperBench measured its judge; many follow-on evals reuse LLM judges without measuring agreement with expert graders on their own rubrics.
- **Domain breadth.** ML engineering dominates. Research agents for chemistry, biology or economics need tasks and graders written by people who do that work.

## Designing a research-agent eval you can trust

1. Write fresh tasks after the model's training cutoff, and keep a private split.
2. Prefer objective end-states (a metric, a reproduced number, a passing test) and use rubrics only where they are unavoidable.
3. When you use rubrics, have domain experts author them and grade a calibration set by hand, then report judge-expert agreement.
4. Report the full end-to-end success rate next to any partial-credit score.
5. Time human experts under the same budget and tooling as the agent, and report results across several budgets.
6. Put confidence intervals on everything. With 7 to 20 tasks, a few points of difference is usually noise.

## How Anthroly can help

Every hard part of this list is expert labor: writing research tasks that did not exist before your model's cutoff, building reference solutions, authoring rubrics that reward working science rather than plausible code, grading calibration sets, and sitting as timed human baselines. Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready to commit, does this work across ML, the physical and life sciences, and quantitative fields, and we build the environments as training-grade RL environments when you want to train on them rather than only measure.

If you are building or auditing a research-agent eval, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How to evaluate deep research agents](/blog/how-to-evaluate-deep-research-agents)
- [How are expert-written benchmarks built?](/blog/how-expert-written-benchmarks-are-built)
- [Building contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks)
- [How software engineering RL environments are built](/blog/how-software-engineering-rl-environments-are-built)
- [LLM-as-a-judge vs expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How do you quality-control expert data labeling?](/blog/how-to-quality-control-expert-data-labeling)
- [Glossary: contamination](/research/glossary#contamination)

---

## References

1. Chan, J. S., Chowdhury, N., Jaffe, O., Aung, J., Sherburn, D., Mays, E., et al. (2024). [MLE-bench: Evaluating Machine Learning Agents on Machine Learning Engineering](https://arxiv.org/abs/2410.07095). arXiv:2410.07095.

2. Starace, G., Jaffe, O., Sherburn, D., Aung, J., Chan, J. S., Maksin, L., et al. (2025). [PaperBench: Evaluating AI's Ability to Replicate AI Research](https://arxiv.org/abs/2504.01848). arXiv:2504.01848.

3. Wijk, H., Lin, T., Becker, J., Jawhar, S., Parikh, N., Broadley, T., et al. (2024). [RE-Bench: Evaluating frontier AI R&D capabilities of language model agents against human experts](https://arxiv.org/abs/2411.15114). arXiv:2411.15114.

4. Kwa, T., West, B., Becker, J., Deng, A., Garcia, K., Hasin, M., et al. (2025). [Measuring AI Ability to Complete Long Software Tasks](https://arxiv.org/abs/2503.14499). arXiv:2503.14499.

5. Zhang, Y., Khalifa, M., Bhushan, S., Murphy, G. D., Logeswaran, L., Kim, J., et al. (2025). [MLRC-Bench: Can Language Agents Solve Machine Learning Research Challenges?](https://arxiv.org/abs/2504.09702). arXiv:2504.09702.

6. Kon, P. T. J., Liu, J., Zhu, X., Ding, Q., Peng, J., Xing, J., et al. (2025). [EXP-Bench: Can AI Conduct AI Research Experiments?](https://arxiv.org/abs/2505.24785). arXiv:2505.24785.

7. Siegel, Z. S., Kapoor, S., Nadgir, N., Stroebl, B., & Narayanan, A. (2024). [CORE-Bench: Fostering the Credibility of Published Research Through a Computational Reproducibility Agent Benchmark](https://arxiv.org/abs/2409.11363). arXiv:2409.11363.

8. Huang, Q., Vora, J., Liang, P., & Leskovec, J. (2023). [MLAgentBench: Evaluating Language Agents on Machine Learning Experimentation](https://arxiv.org/abs/2310.03302). arXiv:2310.03302.

9. Chen, Z., Chen, S., Ning, Y., Zhang, Q., Wang, B., Yu, B., et al. (2024). [ScienceAgentBench: Toward Rigorous Assessment of Language Agents for Data-Driven Scientific Discovery](https://arxiv.org/abs/2410.05080). arXiv:2410.05080.
