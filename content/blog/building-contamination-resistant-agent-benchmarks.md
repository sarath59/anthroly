---
title: "How Do You Build an Agent Benchmark That Won't Be Contaminated or Saturated?"
description: "Agent benchmarks face contamination, solution leakage, weak verifiers, and rapid saturation. This post covers held-out splits, time-based refresh, task and outcome validity, expert-authored tasks, and a practical checklist from the 2024–2026 literature."
tags:
  - agent-benchmarks
  - evaluation
  - contamination
  - swe-bench
  - verifiers
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-21T14:30:00.000Z'
updatedAt: '2026-10-21T14:30:00.000Z'
faq:
  - question: "What is benchmark contamination and why does it matter for agents?"
    answer: "Contamination occurs when benchmark tasks or solutions appear in model training data. For agent benchmarks, this is especially problematic because models may have seen the exact GitHub issues, pull requests, or code solutions during pretraining. High scores may reflect memorization rather than genuine problem-solving capability."
  - question: "What is the difference between task validity and outcome validity?"
    answer: "Task validity means a task is solvable if and only if the agent has the target capability—not due to shortcuts, leaked solutions, or trivial workarounds. Outcome validity means the evaluation method (tests, checks) accurately indicates success. SWE-bench struggles with outcome validity (weak tests); τ-bench has task validity issues (empty responses succeed on impossible tasks)."
  - question: "What is solution leakage in agent benchmarks?"
    answer: "Solution leakage occurs when the task description (issue report, comments) contains hints or direct answers. SWE-bench+ found that 32.67% of SWE-Agent+GPT-4 successes involved solutions directly provided in issue reports. This means the agent is copying, not reasoning."
  - question: "How do time-based refresh strategies help prevent contamination?"
    answer: "By collecting benchmark tasks from after model training cutoffs, time-based refresh ensures models cannot have seen the problems during pretraining. LiveCodeBench collects weekly contest problems; SWE-rebench continuously mines new GitHub issues. Performance often drops sharply on post-cutoff problems, revealing contamination in older data."
  - question: "What makes a verifier robust for agent evaluation?"
    answer: "Robust verifiers check behavior, not just outcomes; have comprehensive test coverage; don't accept shortcuts or partial solutions; and distinguish correct reasoning from lucky guesses. SWE-bench Verified added human validation to filter tasks with overly specific or unreliable tests."
  - question: "How much does fixing benchmark issues change agent performance estimates?"
    answer: "Significantly. SWE-bench+ found that after removing solution leakage and weak-test issues, SWE-Agent+GPT-4's resolution rate dropped from 12.47% to 3.97%—and to 0.55% on fully decontaminated post-cutoff tasks. The ABC checklist reduced CVE-Bench performance overestimation by 33% in absolute terms."
draft: false
---

**Agent benchmarks promised to measure real-world capabilities: can this model fix bugs, navigate APIs, complete complex tasks? But the 2024–2026 literature reveals systematic problems. SWE-bench tasks leak solutions in issue descriptions. τ-bench counts empty responses as successful. LiveCodeBench shows performance drops on post-cutoff problems, revealing contamination. The meta-benchmark paper (Zhu et al., 2025) found issues in seven of ten evaluated benchmarks. Building a benchmark that actually measures agent capability—rather than memorization, shortcuts, or verifier weaknesses—requires deliberate design at every layer.**

This post covers what goes wrong, how leading benchmarks address it, and a practical checklist for teams building or using agent evaluations.

## Why are agent benchmarks harder than static benchmarks?

Traditional benchmarks like MMLU or HumanEval have a simple evaluation model: compare model output to ground truth, report accuracy. The ground truth is fixed, evaluation is deterministic, and contamination (while still a problem) is at least conceptually simple—did the model see this exact question?

Agent benchmarks introduce new complexity:

**Multi-step interaction.** Agents execute commands, call APIs, navigate directories, make decisions based on intermediate feedback. The path to a solution matters, not just the final output. A correct final state could come from correct reasoning or from lucky exploration.

**Environment state.** The "answer" is often a database state, file diff, or system configuration—not a string. Verifying correctness requires execution, and execution can fail for reasons unrelated to the agent's solution quality.

**Partial observability.** Real tasks have ambiguous specifications. A GitHub issue might describe a bug without specifying exactly what fix is wanted. Multiple valid solutions exist. This is realistic but makes evaluation harder.

**Source from public data.** Unlike synthetic benchmarks, agent tasks typically come from real repositories, real issues, real code—all of which may be in pretraining corpora. The entire GitHub history is fair game for foundation model training.

## What are the main failure modes?

[Zhu et al. (2025)](https://arxiv.org/abs/2507.02825) synthesized issues from the literature and their own analysis into two categories:

### Outcome validity failures

Outcome validity means the evaluation result (test pass, check success) actually indicates the task was solved correctly. Failures include:

**Weak tests.** The test suite doesn't cover edge cases, so incorrect solutions pass. [SWE-bench+ (Aleithan et al., 2024)](https://arxiv.org/abs/2410.06992) found 31.08% of SWE-Agent+GPT-4 "successes" involved patches that differed substantially from the gold patch but passed weak tests anyway.

**Overly specific tests.** The test suite enforces implementation details rather than behavior. A valid alternative solution fails because it doesn't match the original PR's approach. This was a key motivation for [OpenAI's SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/).

**Flaky execution.** Tests pass or fail nondeterministically due to timing, network dependencies, or environment setup issues. The benchmark reports capability variance that's actually infrastructure variance.

### Task validity failures

Task validity means a task is solvable if and only if the agent has the target capability. Failures include:

**Solution leakage.** The problem statement contains the answer. SWE-bench+ found 32.67% of resolved instances had solutions "directly provided in the issue report or the comments." The agent copies rather than reasons.

**Impossible tasks scored as failures.** Some tasks can't be solved given the available information, but the benchmark counts them as failures. This artificially lowers scores and makes comparisons noisy.

**Trivial success paths.** Some tasks can be "solved" without the target capability. Zhu et al. found that in τ-bench, "a trivial agent that returns empty responses is considered successful on intentionally impossible tasks" and achieves 38% success rate.

**Data contamination.** The task appears in training data. This isn't a design flaw per se, but it means the benchmark measures memorization rather than capability for affected models.

## How does contamination manifest in practice?

[LiveCodeBench (Jain et al., 2024)](https://arxiv.org/abs/2403.07974) provides the clearest evidence because it tags problems by release date. The benchmark collects weekly contest problems from LeetCode, AtCoder, and CodeForces, allowing evaluation on problems released after any given model's training cutoff.

The pattern is consistent: **models perform significantly worse on post-cutoff problems**. DeepSeek-Instruct shows a sharp drop on problems released after September 2023. GPT-4-O shows a drop on problems released after November 2023 (its specified cutoff date).

This isn't proof of exact-match contamination—models might have seen similar problems or the underlying concepts. But the performance discontinuity at cutoff dates strongly suggests that older benchmark scores reflect training exposure, not generalizable coding capability.

SWE-bench faces the same issue in more severe form. The benchmark draws from popular open-source Python repositories (Django, Flask, scikit-learn). These repositories—including their issues and pull requests—are extensively represented in code pretraining corpora. [SWE-rebench (Badertdinov et al., 2025)](https://arxiv.org/abs/2505.20411) notes that "performance of some language models might be inflated due to contamination issues" in static benchmarks.

## What is SWE-bench Verified, and why did OpenAI create it?

[SWE-bench (Jimenez et al., 2023)](https://arxiv.org/abs/2310.06770) was the first major benchmark for real-world software engineering tasks. It collected 2,294 task instances from GitHub issues with associated pull requests that include tests. Given a codebase and issue description, agents generate patches evaluated against fail-to-pass and pass-to-pass tests.

OpenAI identified three problems that cause SWE-bench to **underestimate** model capabilities:

1. **Overly specific tests.** Some fail-to-pass tests check implementation details rather than behavior, rejecting valid alternative solutions.

2. **Underspecified issues.** Some issue descriptions are ambiguous about what problem needs solving or how it should be solved.

3. **Unreliable environments.** Some task environments have flaky setup, causing test failures regardless of solution quality.

SWE-bench Verified is a human-validated subset of 500 tasks where annotators confirmed the tests are appropriate, the issues are well-specified, and environments set up reliably. This addresses outcome validity—but not contamination, since the tasks still come from pre-cutoff data.

## What did SWE-bench+ find about solution leakage?

[SWE-bench+ (Aleithan et al., 2024)](https://arxiv.org/abs/2410.06992) performed systematic analysis of SWE-Agent+GPT-4 patches, comparing model-generated patches to gold patches. They identified six patterns in generated fixes, categorized as suspicious or correct.

The suspicious fix rate was **63.75%**:

| Pattern | Prevalence | Implication |
|---------|------------|-------------|
| Solution in issue/comments | 32.67% | Agent copies, doesn't reason |
| Weak tests (incorrect patch passes) | 31.08% | Verifier fails to catch errors |

The authors created SWE-bench+ with stricter criteria:
- Tasks created after model training cutoffs (post November 2023)
- Issues filtered to remove solution leakage
- Focus on verifiable correctness

On SWE-bench+, SWE-Agent+GPT-4's resolution rate dropped from 12.47% (original benchmark) to **0.55%**. Other models showed similar drops: AutoCodeRover+GPT-4o fell from 18.83% to 3.83%.

This is a sobering recalibration. The original benchmark suggested agents could resolve ~10-20% of real software issues. The cleaned benchmark suggests the true rate is closer to 1-4%.

## How does τ-bench test multi-turn interaction?

[τ-bench (Yao et al., 2024)](https://arxiv.org/abs/2406.12045) addresses a gap in agent benchmarks: realistic human interaction. Most benchmarks provide all information upfront; τ-bench requires agents to gather information through conversation with a simulated user, consult domain policies, and use APIs to modify database state.

Key design choices:

**Simulated users.** A language model (GPT-4) plays the user role based on scenario descriptions. This allows stochastic variation in conversations while maintaining consistent task intent.

**State-based evaluation.** Success is measured by comparing database state at episode end to annotated goal state. This allows diverse conversational paths to reach the same outcome.

**Domain policies.** Agents must follow complex rules (airline baggage policies, retail return policies) that aren't hard-coded in APIs. The agent must reason about when rules apply.

**Consistency metric (pass^k).** Beyond single-trial success, τ-bench measures reliability across multiple trials. A model might succeed once but fail inconsistently, revealing fragility.

Results reveal current agents' limitations: GPT-4o achieves ~61% on τ-retail and ~35% on τ-airline for pass^1. But pass^8 (consistent success across 8 trials) drops to ~25% on τ-retail. Agents are unreliable even on tasks they can sometimes solve.

However, τ-bench has its own task validity issues. Zhu et al. found that returning empty responses counts as success on certain impossible tasks, inflating scores for trivial agents.

## What best practices does the ABC checklist recommend?

[Zhu et al. (2025)](https://arxiv.org/abs/2507.02825) synthesized their analysis into the **Agentic Benchmark Checklist (ABC)**, covering outcome validity, task validity, and result reporting.

### Outcome validity checklist

- [ ] Verifier checks behavior, not just presence of expected elements
- [ ] Test coverage is comprehensive (not just happy path)
- [ ] Edge cases and error conditions are tested
- [ ] Alternative valid solutions are accepted
- [ ] Execution environment is deterministic and reliable
- [ ] Flaky tests are identified and addressed
- [ ] Human validation confirms verifier catches actual failures

### Task validity checklist

- [ ] Tasks are solvable with the claimed capability (not shortcuts)
- [ ] Impossible tasks are labeled and excluded from scores
- [ ] Problem statements don't leak solutions
- [ ] Tasks are novel relative to training data (or contamination is measured)
- [ ] Difficulty distribution is documented and balanced
- [ ] Tasks require target capability, not general language understanding

### Result reporting checklist

- [ ] Confidence intervals or error bars are provided
- [ ] Multiple trials measure consistency (not just single best-of)
- [ ] Contamination controls are reported
- [ ] Ablations identify what drives performance
- [ ] Failure cases are analyzed qualitatively
- [ ] Comparison to trivial baselines confirms non-trivial capability

When applied to CVE-Bench (a cybersecurity benchmark), ABC identified issues that caused **33% overestimation** of agent performance. Fixing these issues brought evaluation in line with expert assessment.

## How do continuously refreshed benchmarks work?

Static benchmarks inevitably contaminate as their content enters training corpora. Two approaches address this:

### Time-windowed evaluation (LiveCodeBench)

LiveCodeBench collects problems from weekly programming contests with precise release dates. Evaluation windows are set based on model cutoffs:

- For a model with September 2023 cutoff, evaluate only on problems released October 2023 onward
- Performance is reported per time window, revealing contamination effects
- The benchmark continuously grows as new contests occur

### Automated collection pipelines (SWE-rebench)

SWE-rebench provides fully automated task mining from GitHub, covering environment configuration, build setup, and test validation. No manual intervention required for task creation.

- Collection runs continuously, adding tasks from after model training cutoffs
- Current dataset includes 21,000+ training tasks
- Decontaminated evaluation splits use only post-cutoff problems

The cost is infrastructure complexity. Maintaining live collection pipelines, building execution environments for diverse repositories, and validating task quality at scale requires ongoing engineering effort.

## What makes expert-authored tasks valuable?

Automatically collected tasks (from GitHub, contests, etc.) have advantages in scale and realism. But they share a limitation: they sample from the same distribution as training data. A model might solve contest problems by pattern-matching to similar contests it saw during training.

Expert-authored tasks can probe capabilities that don't appear in public data:

**Novel formulations.** Domain experts can create problems that require genuine reasoning because no similar examples exist to memorize.

**Controlled difficulty.** Rather than sampling natural difficulty distributions (which skew toward common cases), experts can target specific capability thresholds.

**Verifier quality.** Experts can write comprehensive test suites that check behavioral correctness, not just superficial output matching.

**Domain knowledge encoding.** For specialized domains (medical reasoning, scientific computing, financial modeling), experts can create tasks that require understanding that won't appear in generic pretraining data.

The tradeoff is cost and scale. Expert authorship is expensive; automated collection is cheap. The optimal strategy likely combines both: automated collection for training and baseline evaluation, expert-authored tasks for capability frontiers and contamination-resistant benchmarking.

## A practical checklist for benchmark users

When evaluating an agent on an existing benchmark, verify:

### Before running evaluation

- [ ] What is the model's training cutoff? Are benchmark tasks post-cutoff?
- [ ] Does the benchmark have known contamination issues?
- [ ] Are there solution leakage concerns (solutions in problem statements)?
- [ ] How comprehensive are the verifiers/test suites?
- [ ] Is there a human-validated subset (like SWE-bench Verified)?

### When interpreting results

- [ ] How does performance compare to trivial baselines (random, empty, copy-paste)?
- [ ] What's the consistency across multiple trials (pass^k)?
- [ ] Are there breakdowns by task difficulty, domain, or time window?
- [ ] Do qualitative failure analyses exist?
- [ ] How do results compare to decontaminated variants (like SWE-bench+)?

### When comparing models

- [ ] Are models evaluated on the same benchmark version?
- [ ] Do models have different training cutoffs (affects contamination)?
- [ ] Are evaluation protocols identical (temperature, sampling, environment)?
- [ ] Are confidence intervals sufficient to distinguish performance?

## What does this mean for building new benchmarks?

If you're constructing an agent benchmark, the literature suggests:

**1. Build in time-based refresh from the start.** Design collection pipelines that can continuously add post-cutoff tasks. Static benchmarks have a shelf life.

**2. Separate training and evaluation distributions.** If you release training data, ensure evaluation tasks are from different sources or time periods.

**3. Invest in verifier quality.** Weak tests are the silent killer of benchmark validity. Human validation of a subset, comprehensive test coverage, and behavioral (not just output) checking are worth the cost.

**4. Include impossible tasks explicitly.** Some real-world problems can't be solved with available information. Rather than pretending all tasks are solvable, label impossible tasks and report how agents handle them.

**5. Measure consistency, not just peak performance.** Single-trial success doesn't indicate reliable deployment capability. Pass^k metrics reveal fragility.

**6. Report contamination transparently.** Document which models may have seen benchmark content. Provide decontaminated splits or time-windowed results.

**7. Use trivial baselines.** Before claiming agents have capability X, verify that trivial strategies (random, empty, copying from context) can't achieve similar scores.

## How Anthroly can help

Robust agent evaluation requires tasks that can't be gamed, verifiers that can't be fooled, and problems that don't appear in training data. This is where expert authorship matters.

Anthroly builds expert-authored evaluation sets for agent benchmarks. We have about 100–150 PhDs on contract and approximately 400 more PhDs and graduates ready across domains including software engineering, scientific computing, and specialized technical fields.

Our experts write novel task formulations that probe capabilities beyond pattern matching. We build comprehensive test suites that check behavioral correctness, not just output format. We design held-out evaluation sets with no contamination risk. And we validate task quality—ensuring tasks are solvable with the target capability and not through shortcuts.

If your team is building or using agent benchmarks and needs evaluation rigor that stands up to scrutiny, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [How are software-engineering RL environments built?](/blog/how-software-engineering-rl-environments-are-built)
- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [Why private evaluation data is worth more than training data](/learn/evaluation-datasets-contamination)
- [RL environments, explained](/learn/rl-environments-explained)

---

## References

1. Jimenez, C. E., Yang, J., Wettig, A., Yao, S., Pei, K., Press, O., & Narasimhan, K. (2023). [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](https://arxiv.org/abs/2310.06770). arXiv:2310.06770.

2. OpenAI. (2024). [Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/). OpenAI Blog.

3. Aleithan, R., Xue, H., Mohajer, M. M., Nnorom, E., Uddin, G., & Wang, S. (2024). [SWE-Bench+: Enhanced Coding Benchmark for LLMs](https://arxiv.org/abs/2410.06992). arXiv:2410.06992.

4. Jain, N., Han, K., Gu, A., Li, W.-D., Yan, F., Zhang, T., Wang, S. I., Solar-Lezama, A., Sen, K., & Stoica, I. (2024). [LiveCodeBench: Holistic and Contamination Free Evaluation of Large Language Models for Code](https://arxiv.org/abs/2403.07974). arXiv:2403.07974.

5. Yao, S., Shinn, N., Razavi, P., & Narasimhan, K. (2024). [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045). arXiv:2406.12045.

6. Zhu, Y., Jin, T., Pruksachatkun, Y., Zhang, A., Liu, S., Cui, S., Kapoor, S., Longpre, S., Meng, K., Weiss, R., Barez, F., Gupta, R., Dhamala, J., Merizian, J., Giulianelli, M., Coppock, H., Ududec, C., Sekhon, J., Steinhardt, J., Kellermann, A., Schwettmann, S., Zaharia, M., Stoica, I., Liang, P., & Kang, D. (2025). [Establishing Best Practices for Building Rigorous Agentic Benchmarks](https://arxiv.org/abs/2507.02825). arXiv:2507.02825.

7. Badertdinov, I., Golubev, A., Nekrashevich, M., Shevtsov, A., Karasik, S., Andriushchenko, A., Trofimova, M., Litvintseva, D., & Yangel, B. (2025). [SWE-rebench: An Automated Pipeline for Task Collection and Decontaminated Evaluation](https://arxiv.org/abs/2505.20411). arXiv:2505.20411.
