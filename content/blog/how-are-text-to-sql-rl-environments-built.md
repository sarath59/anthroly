---
title: "How Are Text-to-SQL RL Environments Built? Execution Rewards, Gold-Query Errors, and Interactive Databases"
description: "Text-to-SQL is one of the cleanest RL settings for LLMs because a query can be executed and checked. Here is how Spider, BIRD, Spider 2.0 and BIRD-Interact are built, how SQL-R1, Reasoning-SQL and Arctic-Text2SQL-R1 design their rewards, why execution accuracy has false positives, what the 52.8% annotation-error finding on BIRD Mini-Dev means for RL, and a checklist for a training-grade SQL environment."
tags:
  - rl-environments
  - text-to-sql
  - verifiers
  - reward-design
  - data-quality
  - agent-evals
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-29T04:45:00.000Z'
updatedAt: '2026-10-29T04:45:00.000Z'
faq:
  - question: "What is a text-to-SQL RL environment?"
    answer: "It is a set of databases, natural-language questions and reference answers, plus an executor that runs the model's SQL and a reward function that compares the result with the reference. Single-turn environments such as those built on Spider and BIRD score one query per question. Agentic environments such as Spider 2.0 and BIRD-Interact let the model explore schemas, read documentation, run intermediate queries and, in BIRD-Interact, ask a simulated user for clarification before its work is checked by executable test cases."
  - question: "What reward do text-to-SQL RL methods use?"
    answer: "Almost all use execution: run the predicted query and the gold query and compare results. They differ in what they add. SQL-R1 (Ma et al., 2025) layers format, executability, result and length rewards. Reasoning-SQL (Pourreza et al., 2025) adds partial rewards for schema linking, AI feedback, n-gram similarity and syntax to reduce sparsity. Arctic-Text2SQL-R1 (Yao et al., 2025) uses only 1 for a matching result, 0.1 for executable SQL and 0 otherwise, arguing that richer shaping invites reward hacking."
  - question: "Is execution accuracy a reliable reward for SQL?"
    answer: "It is precise about what it measures but has two blind spots. A semantically wrong query can return the same result as the gold query on one database, a false positive that Zhong, Yu and Klein (2020) addressed by comparing results across a distilled suite of databases. And if the gold query itself is wrong, the reward punishes correct answers. Arctic-Text2SQL-R1 removed about 1,400 BIRD and 1,700 Spider training samples whose gold SQL returned empty results or ran longer than five seconds."
  - question: "How many errors are in text-to-SQL benchmarks?"
    answer: "More than most teams assume. Jin et al. (2026) found annotation errors in 263 of 498 BIRD Mini-Dev examples (52.8%) and 76 of 121 Spider 2.0-Snow examples with public gold SQL (62.8%). Re-evaluating 16 open-source agents on a corrected BIRD Dev subset changed their scores by -7% to +31% in relative terms and moved rankings by up to nine places. The most common error type was a misunderstanding of the data or schema."
  - question: "How hard are enterprise text-to-SQL tasks for current models?"
    answer: "Much harder than classic benchmarks suggest. On Spider 2.0's 632 enterprise workflow tasks, with databases averaging 812 columns, an o1-preview-based code agent solved 21.3%, compared with 91.2% on Spider 1.0 and 73.0% on BIRD. On BIRD-Interact, where tasks are ambiguous, multi-turn and cover the full create-read-update-delete range, GPT-5 completed 8.67% of tasks in the conversational setting and 17.00% in the agentic setting."
  - question: "Do simple or shaped rewards work better for SQL RL?"
    answer: "The evidence leans toward simple rewards plus clean data. In Arctic-Text2SQL-R1's comparison on the same 14B base model, its execution-only reward with gold-query filtering scored 66.49 on BIRD-dev, 87.20 on Spider-test and 75.10 on Spider-DK, against 64.21, 81.43 and 73.03 for Reasoning-SQL's shaped rewards. The comparison also differs in data filtering, so it shows that a simple reward is sufficient, not that shaping always hurts."
  - question: "How does Anthroly help build text-to-SQL environments?"
    answer: "Anthroly audits and repairs gold SQL, writes domain-grounded questions over realistic enterprise schemas, builds test-suite databases and executable checks for write operations, and labels ambiguity so environments can reward clarification. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Text-to-SQL looks like the easiest possible RL environment. The answer is a program, the program runs against a database, and the result either matches or it does not. That is why SQL was one of the first domains after math and code where teams applied R1-style reinforcement learning, and why a 7B model trained this way can now beat 70B-class systems on the BIRD leaderboard. But the clean picture hides two problems that decide whether an RL run improves the model or teaches it the benchmark's mistakes: execution matching accepts some wrong queries, and a large share of the reference queries are themselves wrong. This post walks through how the main environments are built, how the leading RL methods design rewards, what the annotation-error studies found, and what a training-grade SQL environment needs.**

## The short answer

A text-to-SQL RL environment has five parts: **(1)** databases with realistic schemas and values, ideally with several instances per schema so results can be compared across data; **(2)** questions, often with evidence or documentation, written against those databases; **(3)** a reference answer, usually a gold SQL query whose result defines success; **(4)** an executor with timeouts and a comparison rule; and **(5)** for agentic settings, tools for schema exploration and, increasingly, a simulated user. The reward is almost always execution-based. The leading recipe, Arctic-Text2SQL-R1, uses nothing more than "result matches, executable, or neither" and still reached 71.8% on the BIRD test set. The hard part is the reference. Expert review found annotation errors in 52.8% of BIRD Mini-Dev examples and 62.8% of the Spider 2.0-Snow examples with public gold SQL. In RL, every wrong gold query is a reward that punishes the correct answer, so auditing gold SQL is the highest-leverage work in the whole pipeline.

## What do the main environments look like?

| Environment | What it contains | How success is checked | Reported difficulty |
|---|---|---|---|
| Spider 1.0 (Yu et al., 2018) | 10,181 questions paired with 5,693 unique SQL queries over cross-domain databases | Exact match and execution accuracy | o1-preview agent 91.2% (as reported in Spider 2.0) |
| BIRD (Li et al., 2023) | 12,751 question-SQL pairs, 95 databases totalling 33.4 GB across 37 professional domains, with external-knowledge evidence | Execution accuracy, plus a valid efficiency score | o1-preview agent 73.0% (as reported in Spider 2.0) |
| Spider 2.0 (Lei et al., 2024) | 632 enterprise workflow tasks on BigQuery, Snowflake, SQLite and DuckDB, average 812 columns per database, with codebases and dialect docs | Execution-based checks on final outputs; Lite and Snow variants restrict output to SQL | o1-preview code agent 21.3% |
| BIRD-Interact (Huo et al., 2025) | 600 full tasks (up to 11,796 interactions) and 300 Lite tasks covering create, read, update and delete, each with ambiguous and follow-up sub-tasks | Executable test cases; a function-driven user simulator answers clarifications | GPT-5: 8.67% conversational, 17.00% agentic |

Two shifts are visible in that table. The first is scale and realism of schemas: Spider's databases are small and clean, BIRD added dirty values and the need for external knowledge, and Spider 2.0 moved to warehouse-scale schemas where finding the right table is half the task. The second is the move from a single query to a workflow. Spider 2.0 tasks frequently require reading metadata, dialect documentation and project code, and gold queries average 144 tokens, often exceeding 100 lines in the hardest cases. BIRD-Interact goes further and makes the question deliberately underspecified, so the model must decide when to ask, when to explore and when to act, including on write operations that a read-only checker cannot grade.

## How do RL methods turn SQL into a reward?

| Method | Base models | Reward | Reported result |
|---|---|---|---|
| SQL-R1 (Ma et al., 2025) | Qwen2.5-Coder 3B, 7B, 14B | Format (+1/-1), executability (+2/-2), result match (+3/-3), length bonus; execution time capped | 7B: 87.6 Spider-dev, 88.7 Spider-test, 66.6 BIRD-dev (Table 1) |
| Reasoning-SQL (Pourreza et al., 2025) | Qwen2.5-Coder 7B and 14B | Execution plus partial rewards for schema linking, AI feedback, n-gram similarity and syntax | 14B beats o3-mini by 4% and Gemini-1.5-Pro-002 by 3% on BIRD; 72.78% inside the CHASE-SQL pipeline |
| Arctic-Text2SQL-R1 (Yao et al., 2025) | Qwen2.5-Coder and OmniSQL, 7B to 32B | 1 if results match, 0.1 if executable, 0 otherwise | 32B: 70.5 BIRD-dev, 71.8 BIRD-test, first on the leaderboard at publication |

All three use GRPO. The disagreement is about shaping. Reasoning-SQL's argument is that execution reward is sparse. In GRPO, a group in which every sample fails has zero reward variance and contributes no gradient, and hard questions produce many such groups. Partial credit for linking the right tables and columns gives those groups a gradient. Arctic's argument is the opposite: every partial reward is a second objective the policy can satisfy without being right, and n-gram similarity to a gold query in particular rewards copying the gold query's surface form, which is not what you want when many correct queries look different. Arctic's reward is:

$$
R = \begin{cases} 1 & \text{if the execution results exactly match the reference} \\ 0.1 & \text{if the SQL is syntactically valid and executes} \\ 0 & \text{otherwise} \end{cases}
$$

The small executability term keeps early training from collapsing into syntax errors without competing with correctness. In Arctic's same-base comparison (Qwen2.5-Coder-14B-Instruct), its setup scored 66.49 on BIRD-dev, 87.20 on Spider-test and 75.10 on Spider-DK, against 64.21, 81.43 and 73.03 for Reasoning-SQL. That comparison also differs in data filtering, so the fair reading is that a simple reward is sufficient when the data is clean, not that shaping always hurts.

A sketch of what the executor side of such a reward looks like in practice:

```python
import sqlite3
import time
from collections import Counter

def run(db_path, sql, timeout_s=5.0):
    conn = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
    deadline = time.monotonic() + timeout_s
    conn.set_progress_handler(lambda: time.monotonic() > deadline, 10_000)
    try:
        return conn.execute(sql).fetchall()
    finally:
        conn.close()

def same_result(a, b, ordered=False):
    # Compare as multisets unless the question asks for an order.
    return a == b if ordered else Counter(a) == Counter(b)

def reward(pred_sql, gold_sql, db_paths, ordered=False):
    # db_paths: several databases with the same schema (a test suite).
    try:
        preds = [run(p, pred_sql) for p in db_paths]
    except Exception:
        return 0.0
    golds = [run(p, gold_sql) for p in db_paths]
    if all(same_result(x, y, ordered) for x, y in zip(preds, golds)):
        return 1.0
    return 0.1
```

The important details are not the arithmetic. They are the read-only connection, the timeout (SQL-R1 caps execution time explicitly so the policy cannot win by writing ever more expensive queries), the decision about whether row order matters, and the loop over several databases rather than one.

## Why does execution accuracy have false positives?

Comparing results on one database answers the question "did these two queries return the same rows here?", not "are these two queries equivalent?". Zhong, Yu and Klein (2020) showed the gap concretely: a semantically different prediction can happen to return the gold query's result on a particular database, which is a false positive, while exact string match produces false negatives for equivalent queries written differently. Their fix, test-suite accuracy, distills a small set of databases with the same schema but different contents, chosen so that near-miss queries produce different results, and requires a match on all of them.

For evaluation, false positives inflate a score. For RL, they are worse, because the policy is optimized against them. A model that learns that `LIMIT 1` without a tie-breaking `ORDER BY` usually returns the right row, or that a filter on a column that happens to have one value in the dev database is harmless, will be rewarded every time the database is too small to expose the difference. The defence is the same as for any verifier: more varied data under each schema, adversarial near-miss queries in the test suite, and periodic expert review of what the high-reward samples actually look like.

## What happens when the gold query is wrong?

This is the larger problem, and it has now been measured carefully. Jin et al. (2026) ran an error-detection agent over two benchmarks and then had experts verify each flagged example. They found annotation errors in **263 of 498 BIRD Mini-Dev examples (52.8%)**, up from the 32.3% reported earlier by Arcwise, and in **76 of 121 Spider 2.0-Snow examples (62.8%)** for which gold SQL is public, even though the Spider 2.0 team had already corrected 45% of examples in a first validation round and 5% in a second. Earlier work by Wretblad et al. (2024) had found errors in 49% of BIRD's financial-domain examples.

The errors fall into four patterns: the gold query does not implement the question's logic; it misunderstands the data or schema; it conflicts with domain knowledge (or the provided evidence is itself wrong); or the question is ambiguous. The second pattern, misunderstanding the data or schema, was the most common in both benchmarks, present in about 58% of erroneous examples. That is exactly the kind of mistake a crowd annotator makes and a domain specialist who knows the data does not.

The consequences for evaluation are already stark. Re-scoring all 16 open-source agents from the BIRD leaderboard on a corrected Dev subset changed their scores by **-7% to +31%** in relative terms and moved rankings by **up to nine places**. Rankings on the uncorrected subset correlated strongly with the full Dev set (Spearman 0.85), but only weakly with the corrected subset (Spearman 0.32). In other words, the leaderboard order mostly reflects agreement with the annotations, errors included.

For RL the consequence compounds. Let $q$ be the fraction of training examples whose gold result is wrong. A policy that always returns the true answer earns expected reward of at most $1 - q$, while a policy that learns to reproduce the annotators' systematic mistakes can earn more. With $q$ anywhere near 0.3 to 0.5, the gradient toward annotator mimicry is not a rounding error. Arctic's filtering step is a partial remedy: dropping training examples whose gold SQL returns an empty result or runs longer than five seconds removed about 1,400 BIRD and 1,700 Spider samples and, in the authors' account, gave a more reliable reward and faster convergence. But empty results are only the errors a script can catch. A gold query that joins on the wrong key returns plenty of rows.

## What did the data experiments show?

Arctic-Text2SQL-R1's ablations are unusually candid and worth reading for anyone building SQL data:

- **Filtering beat volume.** Adding synthetic data naively hurt. Its Gretel-Synth augmentation, where GPT-4o generated INSERT statements to populate synthetic schemas, reduced performance when added unfiltered and only helped after model-based filtering kept queries that a strong trained model could solve at least sometimes. A separate attempt at LLM-based question augmentation also failed to help, which the authors attribute to limited linguistic and structural diversity and over-sampled schema patterns.
- **Large synthetic corpora were inconclusive.** Initial attempts with model-filtered SynSQL-2.5M did not produce clear gains.
- **The starting checkpoint and prompt mattered a lot.** Moving from Qwen2.5-Coder-32B-Instruct to OmniSQL-32B, which is already trained for SQL, and then adapting the prompt template took BIRD-dev from 64.9 to 70.5 within the same RL recipe.
- **Online RL helped.** Online GRPO improved on batch RL (66.6 versus 64.9 on BIRD-dev for the same base model).

The pattern is the same one seen across RLVR: the reward function gets the attention, but the data under it decides the ceiling.

## Why interactive SQL environments change the job

Single-turn benchmarks assume the question fully specifies the query. Real analysts' questions do not. "What were our top customers last quarter?" leaves open the fiscal calendar, the revenue definition and whether refunds count. BIRD-Interact builds this in: each task carries ambiguous sub-tasks and follow-ups, the database comes with a hierarchical knowledge base and metadata, and a function-driven user simulator answers clarifying questions. Tasks include writes, guarded by executable test cases rather than result comparison. The authors also built UserSim-Guard, a test of whether the simulator itself leaks answers or misbehaves under adversarial questioning, which is the right instinct: in an interactive environment the simulator is part of the reward.

The low scores, 8.67% and 17.00% for GPT-5, are less interesting than what they imply for training. Rewarding clarification requires labels for which ambiguities are real, what the intended interpretation is, and what a good clarifying question looks like. That is expert annotation, not something a gold query can supply.

## A checklist for a training-grade SQL environment

1. **Audit gold SQL before training.** Run automated checks (empty results, timeouts, non-determinism, dependence on row order), then have domain specialists review a stratified sample and every example the policy consistently "fails" late in training.
2. **Use several databases per schema.** Build a distilled test suite so a query must match on varied contents, not one instance.
3. **Decide comparison semantics explicitly.** Ordered versus unordered results, duplicate handling, float tolerance, NULL handling and column-order rules should be written down per question type.
4. **Cap execution cost.** Timeouts and resource limits remove a reward-hacking route and keep rollouts fast.
5. **Keep the reward simple, and the data clean.** Start with execution plus a small executability term; add shaping only after showing the sparse reward fails on clean data.
6. **Model ambiguity.** Label which questions are underspecified and what the intended interpretation is, so the environment can reward asking rather than guessing.
7. **Test writes with executable checks.** For INSERT, UPDATE and DELETE, check resulting database state with test cases, not result sets.
8. **Hold out schemas, not just questions.** Generalization to unseen databases is what matters in deployment; Spider-DK-style and enterprise-schema splits catch overfitting to familiar tables.
9. **Inspect the top-reward samples.** Regularly read the highest-reward rollouts for false positives the test suite missed.

## Where do experts fit?

The annotation-error results point to the place where human work pays off most. The dominant failure was misunderstanding the data or schema, which is a domain problem: knowing that a hospital's encounter table has one row per visit, not per patient, or that a finance schema stores amounts in cents. Specialists who understand the domain catch those errors, write questions with defensible single answers or explicit ambiguity labels, and design near-miss queries that make test suites bite. That is far cheaper than discovering, after an RL run, that the policy learned to reproduce a benchmark's systematic join mistake.

## How Anthroly can help

Anthroly builds and repairs SQL environments for training and evaluation: auditing and correcting gold queries, writing domain-grounded questions over realistic enterprise schemas in finance, healthcare, logistics and science, building test-suite databases and executable checks for write operations, and labeling ambiguity and clarification targets for interactive settings. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are training a data or analytics agent and want to know how much of your SQL reward you can trust, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can look at a sample of your gold queries together.

## Related reading

- [How reliable are RLVR verifiers?](/blog/how-reliable-are-rlvr-verifiers)
- [How are tool-use RL environments built?](/blog/how-tool-use-rl-environments-are-built)
- [How are software engineering RL environments built?](/blog/how-software-engineering-rl-environments-are-built)
- [How do you choose prompts for RLVR training?](/blog/how-to-choose-prompts-for-rlvr-training)
- [How do you quality-control expert data labeling?](/blog/how-to-quality-control-expert-data-labeling)
- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)

---

## References

1. Yu, T., et al. (2018). [Spider: A Large-Scale Human-Labeled Dataset for Complex and Cross-Domain Semantic Parsing and Text-to-SQL Task](https://arxiv.org/abs/1809.08887). arXiv:1809.08887.
2. Li, J., et al. (2023). [Can LLM Already Serve as A Database Interface? A BIg Bench for Large-Scale Database Grounded Text-to-SQLs](https://arxiv.org/abs/2305.03111). arXiv:2305.03111.
3. Lei, F., et al. (2024). [Spider 2.0: Evaluating Language Models on Real-World Enterprise Text-to-SQL Workflows](https://arxiv.org/abs/2411.07763). arXiv:2411.07763.
4. Huo, N., et al. (2025). [BIRD-INTERACT: Re-imagining Text-to-SQL Evaluation for Large Language Models via Lens of Dynamic Interactions](https://arxiv.org/abs/2510.05318). arXiv:2510.05318.
5. Ma, P., et al. (2025). [SQL-R1: Training Natural Language to SQL Reasoning Model By Reinforcement Learning](https://arxiv.org/abs/2504.08600). arXiv:2504.08600.
6. Pourreza, M., et al. (2025). [Reasoning-SQL: Reinforcement Learning with SQL Tailored Partial Rewards for Reasoning-Enhanced Text-to-SQL](https://arxiv.org/abs/2503.23157). arXiv:2503.23157.
7. Yao, Z., et al. (2025). [Arctic-Text2SQL-R1: Simple Rewards, Strong Reasoning in Text-to-SQL](https://arxiv.org/abs/2505.20315). arXiv:2505.20315.
8. Zhong, R., Yu, T., and Klein, D. (2020). [Semantic Evaluation for Text-to-SQL with Distilled Test Suites](https://arxiv.org/abs/2010.02840). arXiv:2010.02840.
9. Jin, T., et al. (2026). [Pervasive Annotation Errors Break Text-to-SQL Benchmarks and Leaderboards](https://arxiv.org/abs/2601.08778). arXiv:2601.08778.
10. Wretblad, N., et al. (2024). [Understanding the Effects of Noise in Text-to-SQL: An Examination of the BIRD-Bench Benchmark](https://arxiv.org/abs/2402.12243). arXiv:2402.12243.
