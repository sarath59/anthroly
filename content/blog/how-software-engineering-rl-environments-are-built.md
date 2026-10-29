---
title: "How Are Software-Engineering RL Environments Built? Lessons from SWE-bench, SWE-Gym, SWE-smith, and R2E-Gym"
description: "Building training environments for SWE agents requires solving three problems: sourcing tasks, building executable environments, and designing verifiers. This post covers anatomy, task-sourcing approaches, verifier quality, contamination, and where expert engineers add the most value."
tags:
  - rl-environments
  - swe-bench
  - agent-training
  - verifiers
  - software-engineering
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-21T12:30:00.000Z'
updatedAt: '2026-10-21T12:30:00.000Z'
faq:
  - question: "What is the anatomy of a software-engineering RL environment?"
    answer: "A SWE RL environment consists of four components: (1) a repository snapshot at a specific commit, (2) a containerized execution environment with all dependencies installed, (3) a task description (typically from a GitHub issue), and (4) a verifier—usually fail-to-pass and pass-to-pass unit tests that check whether the agent's patch resolves the issue without breaking existing functionality."
  - question: "What is the difference between SWE-bench, SWE-Gym, SWE-smith, and R2E-Gym?"
    answer: "SWE-bench is the original evaluation benchmark with 2,294 test instances but no executable training environments. SWE-Gym provides 2,438 executable training tasks from real GitHub issues. SWE-smith generates 50k+ synthetic tasks by injecting bugs into codebases. R2E-Gym uses backtranslation from commits to create 8k+ tasks without relying on human-written issues or tests."
  - question: "What is the fail-to-pass / pass-to-pass test paradigm?"
    answer: "Fail-to-pass (F2P) tests are tests that fail before the fix and pass after—they verify the issue is resolved. Pass-to-pass (P2P) tests are existing tests that should pass both before and after—they verify the fix doesn't break unrelated functionality. Both must pass for a task to be considered resolved."
  - question: "Why did OpenAI create SWE-bench Verified?"
    answer: "OpenAI found that some SWE-bench tasks have overly specific tests, underspecified issue descriptions, or unreliable environments that cause correct solutions to be rejected. SWE-bench Verified is a human-validated subset of 500 tasks where annotators confirmed the tests are appropriate and the issues are well-specified."
  - question: "What is data contamination in SWE benchmarks and why does it matter?"
    answer: "Contamination occurs when test tasks appear in model training data. SWE-rebench showed that some models' performance may be inflated due to contamination—they've memorized solutions rather than learned to solve problems. Continuously refreshed benchmarks with tasks from after model training cutoffs are needed to detect this."
  - question: "What are the main approaches to sourcing tasks for SWE training environments?"
    answer: "Three main approaches: (1) Real GitHub issues with associated PRs (SWE-bench, SWE-Gym)—high quality but limited scale. (2) Synthetic bug injection via LLM rewrites or AST modifications (SWE-smith)—scalable but may not reflect real bugs. (3) Backtranslation from commits with test generation (R2E-Gym)—removes reliance on human-written issues."
draft: false
---

**Software-engineering RL environments are the infrastructure that lets you train agents to fix real bugs and add real features. Building one requires solving three interlocking problems: where do tasks come from, how do you make them executable, and how do you verify that a solution is correct? The 2024–2025 wave of papers—SWE-Gym, SWE-smith, R2E-Gym, SWE-rebench, Multi-SWE-bench, and SWE-bench Multimodal—each solves these problems differently, with different tradeoffs in scale, realism, and reliability.**

This post covers the anatomy of a SWE environment, the main task-sourcing approaches, verifier failure modes (and why OpenAI created SWE-bench Verified), contamination, and where expert software engineers add the most value.

## The anatomy of a SWE RL environment

A software-engineering task instance has four components:

**1. Repository snapshot.** A codebase at a specific commit—typically the state just before a bug-fixing PR was merged. This is the starting point the agent sees.

**2. Containerized execution environment.** A Docker image with all dependencies installed, configured to run the repository's test suite. Building these reliably at scale is one of the hardest parts of environment construction.

**3. Task description.** Natural language specifying what needs to be done—typically derived from a GitHub issue. The description may include error messages, stack traces, or screenshots.

**4. Verifier.** A mechanism to check whether the agent's patch solves the problem. The standard approach uses two test sets:
- **Fail-to-pass (F2P) tests**: Tests that fail on the original codebase but pass after the fix. These verify the issue is resolved.
- **Pass-to-pass (P2P) tests**: Existing tests that should pass both before and after. These verify the fix doesn't break unrelated functionality.

A task is resolved only if all F2P and P2P tests pass.

## SWE-bench: the original benchmark

[Jimenez et al. (2023)](https://arxiv.org/abs/2310.06770) introduced SWE-bench, sourcing 2,294 task instances from 12 popular Python repositories. The collection pipeline:

1. Find merged PRs that resolve GitHub issues
2. Filter for PRs that contribute tests (so there's something to verify against)
3. Build execution environments for each
4. Validate that tests fail before the PR and pass after

This yields high-quality task instances: real bugs reported by real developers, with human-written tests that capture the intended behavior. But the approach has scaling limits. Not every PR has an associated issue. Not every issue has tests. Building execution environments for diverse repositories requires substantial manual work.

SWE-bench also released a training split of 19,008 instances—but these lack executable environments. They include the patch (solution) but no way to run tests. This limits their use for RL, where agents need to interact with the environment and receive feedback.

## Why OpenAI created SWE-bench Verified

[OpenAI (2024)](https://openai.com/index/introducing-swe-bench-verified/) identified three problems with SWE-bench that cause it to underestimate model capabilities:

**1. Overly specific tests.** Some F2P tests check implementation details rather than behavior, rejecting valid alternative solutions. A correct fix that uses a different approach than the original PR would fail.

**2. Underspecified issues.** Some issue descriptions are ambiguous about what problem needs to be solved or how it should be solved. Models can't succeed if the spec is unclear.

**3. Unreliable environments.** Some execution environments have flaky setup, causing tests to fail regardless of the solution.

SWE-bench Verified is a human-validated subset of 500 tasks where annotators confirmed:
- The tests appropriately verify the fix
- The issue description is sufficiently specified
- The environment sets up reliably

This is the evaluation standard most papers now target. The lesson for environment builders: verifier quality matters as much as task quantity.

## SWE-Gym: executable training environments from real issues

[Pan et al. (2024)](https://arxiv.org/abs/2412.21139) introduced SWE-Gym, the first large-scale environment combining real-world tasks with executable environments for training. Key stats:

| Property | SWE-Gym | SWE-bench (test) |
|---|---|---|
| Instances | 2,438 | 2,294 |
| Repositories | 11 | 12 |
| Executable environments | Yes | Yes |
| Designed for training | Yes | No |

SWE-Gym sources from repositories disjoint from SWE-bench to avoid contamination. Each instance has pre-installed dependencies and test verification. The authors used SWE-Gym to:

1. **Fine-tune SWE agents.** Training on 491 agent trajectories improved resolve rate by 12–19 percentage points on SWE-bench Verified and Lite.

2. **Train verifiers for inference-time scaling.** Sampling multiple trajectories and selecting the best using a trained verifier reached 32% on SWE-bench Verified—state-of-the-art for open-weight models at the time.

The scaling curves are informative: performance improved continuously with more training trajectories, with no saturation at 491 samples. Data, not architecture, was the bottleneck.

## SWE-smith: synthetic tasks at scale

[Yang et al. (2025)](https://arxiv.org/abs/2504.21798) took a different approach: instead of finding real bugs, synthesize them. SWE-smith's insight is that execution-based validation can identify bug candidates, not just verify fixes.

The pipeline:

1. **Set up execution environments.** For each repository, use SWE-agent to install dependencies and run tests. Manually verify and create a Docker image.

2. **Synthesize bugs.** Four strategies:
   - **LM Modify**: Prompt an LLM to introduce errant modifications to functions
   - **LM Rewrite**: Given only function header and docstring, ask an LLM to reimplement (often incorrectly)
   - **Procedural modification**: AST transformations (remove conditionals, change operators, etc.)
   - **Combine bugs**: Aggregate multiple single-function bugs for multi-file tasks

3. **Validate candidates.** Run tests. Keep bugs that cause substantial test failures.

4. **Generate issue descriptions.** Use LLMs to write realistic issue text from the bug.

Result: 50k+ task instances across 128 repositories—an order of magnitude larger than prior work. Training on SWE-smith trajectories, the authors achieved 40.2% on SWE-bench Verified with a 32B model.

The tradeoff: synthetic bugs may not reflect real bug distributions. LM-generated bugs might cluster around the kinds of errors LLMs make, creating distribution shift from real issues.

## R2E-Gym: backtranslation without human issues

[Jain et al. (2025)](https://arxiv.org/abs/2504.07164) introduced R2E-Gym with 8,135 tasks—over 3x more than SWE-Gym. The key innovation is avoiding reliance on human-written issues entirely.

**SweGen: synthetic data from commits.** Instead of finding issues that link to PRs, R2E-Gym works directly from commits:

1. **Curate commits.** Filter GitHub history for commits with meaningful code changes.
2. **Collect or generate tests.** Use existing F2P tests when available; generate tests otherwise.
3. **Backtranslate issues.** Given the code diff and test failure information, generate a realistic issue description with an LLM.

The insight: human issues often include failing tests and stack traces. Including test execution information in the backtranslation prompt produces more precise, directed problem statements than naive code-diff-to-issue generation.

**Hybrid inference-time scaling.** R2E-Gym's other contribution is analyzing how execution-based and execution-free verifiers complement each other:

- **Execution-based verifiers** (test results) provide direct correctness signal but struggle with distinguishability—many patches pass the same tests.
- **Execution-free verifiers** (learned models scoring trajectories) provide better ranking but can be biased by stylistic features.

Combining both achieved 51% on SWE-bench Verified—a new state-of-the-art for open-weight models, competitive with proprietary systems.

## SWE-rebench: continuous collection and decontamination

[Badertdinov et al. (2025)](https://arxiv.org/abs/2505.20411) focused on a different problem: as models improve and benchmarks age, contamination becomes a concern. If test instances appeared in training data, high scores may reflect memorization rather than capability.

SWE-rebench provides:

1. **Automated collection pipeline.** Fully automated task mining from GitHub, covering environment configuration, build setup, and test validation. No manual intervention required.

2. **Continuously refreshed benchmark.** New tasks collected after model training cutoffs provide decontaminated evaluation.

3. **21,000+ training tasks.** Suitable for RL at scale.

The contamination finding is concerning: "performance of some language models might be inflated due to contamination issues." Static benchmarks that don't refresh become unreliable as models train on more of the web.

## Multi-SWE-bench and SWE-bench Multimodal: expanding coverage

**Multi-SWE-bench** ([Zan et al., 2025](https://arxiv.org/abs/2504.02605)) extends to seven languages: Java, TypeScript, JavaScript, Go, Rust, C, and C++. The 1,632 human-validated instances reveal that Python performance doesn't transfer—models that excel on Python SWE-bench struggle with other languages.

**SWE-bench Multimodal** ([Yang et al., 2024](https://arxiv.org/abs/2410.03859)) targets visual JavaScript software: UI design, data visualization, interactive mapping. Each of the 617 tasks contains at least one image in the problem statement or tests. Top SWE-bench systems performed significantly worse, revealing "limitations in visual problem-solving and cross-language generalization."

These extensions matter because real software engineering is multilingual and multimodal. Python-only, text-only benchmarks capture a fraction of the problem space.

## Comparing task-sourcing approaches

| Approach | Example | Pros | Cons |
|---|---|---|---|
| Real issues → PRs | SWE-bench, SWE-Gym | High realism, human-validated | Limited scale, manual filtering |
| Synthetic bug injection | SWE-smith | Scalable, diverse | May not reflect real bug distribution |
| Backtranslation from commits | R2E-Gym | Scalable, no issue dependency | Generated issues may lack nuance |
| Continuous automated collection | SWE-rebench | Fresh, decontaminated | Quality variance across repos |

No single approach dominates. Real issues provide ground truth but don't scale. Synthetic approaches scale but may create distribution shift. The field is converging on hybrid strategies: use real issues for evaluation, synthetic tasks for training volume.

## Verifier failure modes

Verifiers are only as good as the tests they run. Common failure modes:

**1. Underspecified tests.** Tests that check superficial properties rather than the actual behavior. A patch can pass without fixing the underlying issue.

**2. Overspecified tests.** Tests that enforce implementation details. Valid alternative solutions fail because they don't match the original PR's approach.

**3. Flaky tests.** Tests that pass or fail nondeterministically due to timing, network calls, or environment state. These corrupt reward signals.

**4. Missing coverage.** Tests that don't cover the failure mode described in the issue. The patch can pass all tests while leaving the reported bug unfixed.

**5. Weak distinguishability.** Many patches pass the same tests. Execution-based verifiers provide binary signal (pass/fail) but struggle to rank among passing solutions.

SWE-bench Verified addressed some of these with human screening. But for training environments at scale, human review of every task is infeasible. Automated detection of verifier quality—test coverage metrics, flakiness detection, specificity analysis—remains an open problem.

## The contamination problem

Contamination occurs when benchmark tasks appear in model training data. This is especially concerning for SWE benchmarks because:

1. **GitHub is in pretraining corpora.** If a model trained on code from these repositories saw the issues and solutions, it may have memorized them.

2. **Popular repositories are heavily represented.** SWE-bench uses well-known libraries like Django, Flask, and scikit-learn—exactly the repositories most likely to appear in training data.

3. **Solutions are public.** Unlike held-out test sets, the PRs that resolve SWE-bench issues are public on GitHub.

SWE-rebench's continuously refreshed approach helps: tasks collected after training cutoffs can't be contaminated. But this requires infrastructure for ongoing collection, not a one-time benchmark release.

## Where expert engineers add value

Building training-grade SWE environments requires engineering expertise at several points:

**1. Repository selection.** Not all repositories are suitable. Good candidates have comprehensive test suites, stable build processes, and diverse issue types. Identifying these requires understanding software engineering practices across domains.

**2. Environment configuration.** Dockerizing arbitrary repositories with all dependencies is hard. Version conflicts, missing system libraries, and undocumented setup steps require debugging by engineers who understand the ecosystem.

**3. Test quality assessment.** Distinguishing good tests from bad tests—appropriate coverage, no flakiness, right level of specificity—requires judgment about what makes software correct.

**4. Task filtering.** Not every issue makes a good training task. Issues that are too easy (trivial typo fixes) or too hard (deep architectural refactors) don't provide useful learning signal. Engineers can identify the sweet spot.

**5. Issue rewriting.** Real GitHub issues are often poorly specified. Improving issue descriptions to provide clear success criteria requires understanding both the technical problem and how to communicate it.

**6. Verifier augmentation.** When existing tests are insufficient, writing additional tests that capture the intended behavior requires understanding the codebase and the issue.

## What teams building SWE environments get wrong

These are practitioner observations from building environments for agent training.

1. **Underinvesting in test quality.** Teams focus on task quantity and discover too late that their verifiers are noisy. Reward signal quality matters more than task count.

2. **Ignoring environment flakiness.** A 5% flakiness rate means 5% of your training signal is random noise. This compounds over RL training.

3. **Not decontaminating.** Using popular repositories without checking overlap with evaluation sets creates false confidence in generalization.

4. **Single-language focus.** Training only on Python creates agents that fail on the JavaScript, TypeScript, and Go codebases that dominate production.

5. **Ignoring visual context.** Many real issues include screenshots showing the bug. Text-only training misses this signal.

## The cost picture

Environment construction has both fixed and marginal costs:

**Fixed costs per repository:**
- Initial environment setup: hours to days of engineering time
- Docker image storage: hundreds of MB to several GB per repo
- Test suite validation: varies by repository complexity

**Marginal costs per task:**
- Container instantiation: seconds to minutes
- Test execution: seconds to minutes
- Storage for checkpoints and trajectories: MB to GB per trajectory

SWE-smith reduced fixed costs by automating environment setup with SWE-agent. R2E-Gym reduced marginal costs by generating issues from commits rather than requiring human-written PRs. But the fundamental tradeoff remains: higher-quality tasks require more engineering effort.

## How Anthroly can help

Anthroly builds the expert layer for SWE environments. We have about 100–150 PhDs on contract and approximately 400 more PhDs and graduates ready to commit, including software engineers, infrastructure specialists, and domain experts.

Our engineers select and configure repositories for environment construction, write additional tests when existing coverage is insufficient, filter and improve issue descriptions to create clear task specifications, and audit verifier quality to ensure reward signals are reliable. We build held-out evaluation sets with no contamination risk and environments for domains that require specialized expertise—scientific computing, financial systems, medical software.

If your team is building SWE training environments and needs expert support for repository configuration, test writing, or task curation, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [Where should step-level rewards for AI agents come from?](/blog/step-level-rewards-for-ai-agents)
- [RL environments, explained](/learn/rl-environments-explained)
- [Why private evaluation data is worth more than training data](/learn/evaluation-datasets-contamination)
- [How Do You Build an Agent Benchmark That Won't Be Contaminated or Saturated?](/blog/building-contamination-resistant-agent-benchmarks)
- [How are tool-use RL environments built? Simulated APIs, real MCP servers, and state-based verifiers](/blog/how-tool-use-rl-environments-are-built)
- [How many RL environments do you need to train a general agent?](/blog/how-many-rl-environments-do-you-need-to-train-an-agent)
- [Which agent trajectories should you fine-tune on? Outcome filtering, step masking, and failed runs](/blog/which-agent-trajectories-should-you-fine-tune-on)
- [How are text-to-SQL RL environments built?](/blog/how-are-text-to-sql-rl-environments-built)

---

## References

1. Jimenez, C. E., Yang, J., Wettig, A., Yao, S., Pei, K., Press, O., & Narasimhan, K. (2023). [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](https://arxiv.org/abs/2310.06770). arXiv:2310.06770.

2. OpenAI. (2024). [Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/). OpenAI Blog.

3. Pan, J., Wang, X., Neubig, G., Jaitly, N., Ji, H., Suhr, A., & Zhang, Y. (2024). [Training Software Engineering Agents and Verifiers with SWE-Gym](https://arxiv.org/abs/2412.21139). arXiv:2412.21139.

4. Yang, J., Lieret, K., Jimenez, C. E., Wettig, A., Khandpur, K., Zhang, Y., Hui, B., Press, O., Schmidt, L., & Yang, D. (2025). [SWE-smith: Scaling Data for Software Engineering Agents](https://arxiv.org/abs/2504.21798). arXiv:2504.21798.

5. Jain, N., Singh, J., Shetty, M., Zheng, L., Sen, K., & Stoica, I. (2025). [R2E-Gym: Procedural Environments and Hybrid Verifiers for Scaling Open-Weights SWE Agents](https://arxiv.org/abs/2504.07164). arXiv:2504.07164.

6. Badertdinov, I., Golubev, A., Nekrashevich, M., Shevtsov, A., Karasik, S., Andriushchenko, A., Trofimova, M., Litvintseva, D., & Yangel, B. (2025). [SWE-rebench: An Automated Pipeline for Task Collection and Decontaminated Evaluation](https://arxiv.org/abs/2505.20411). arXiv:2505.20411.

7. Zan, D., et al. (2025). [Multi-SWE-bench: A Multilingual Benchmark for Issue Resolving](https://arxiv.org/abs/2504.02605). arXiv:2504.02605.

8. Yang, J., Jimenez, C. E., Zhang, A. L., Lieret, K., Yang, J., Wu, X., Press, O., Muennighoff, N., Synnaeve, G., Narasimhan, K. R., Yang, D., Wang, S. I., & Press, O. (2024). [SWE-bench Multimodal: Do AI Systems Generalize to Visual Software Domains?](https://arxiv.org/abs/2410.03859). arXiv:2410.03859.
