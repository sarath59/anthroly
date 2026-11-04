---
title: "How Are Unit Tests Generated for Code RL Rewards? From CodeT and AceCoder to HardTests, Adversarial Test Evolution and Test-Exploiting Agents"
description: "A practitioner's guide to building the test suites that serve as rewards in code reinforcement learning: why scraped and naive LLM-written tests let wrong programs pass, how CodeT, EvalPlus, AceCoder, KodCode, HardTests, CodeContests+, rStar-Coder and Klear-CodeTest generate and validate tests, how 2026 adversarial methods evolve tests against the policy, how to measure a suite's precision and recall, and where expert problem setters still matter."
tags:
  - rlvr
  - code-generation
  - verifiers
  - reward-hacking
  - rl-environments
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-04T05:10:00.000Z'
updatedAt: '2026-11-04T05:10:00.000Z'
faq:
  - question: "Why do code RL datasets need generated unit tests?"
    answer: "RL on code needs an executable reward, usually the fraction or all-or-nothing pass of a test suite, but most public problems ship without usable tests. HardTests (He et al., 2025) found that for 80% of the competitive programming problems they studied the human-written tests are proprietary and cannot be scraped, and CodeContests+ (Wang et al., 2025) notes competition platforms do not release their test cases. Teams therefore synthesize tests, and the quality of those tests becomes the quality of the reward."
  - question: "How often do weak tests accept wrong code?"
    answer: "Often. HardTests reports that 60% of programs that pass APPS test cases are wrong, that 46% of programs passing CodeContests tests are semantically correct but too inefficient to pass human-written tests, and that TACO's synthetic tests had a false positive rate above 90% on difficult problems. EvalPlus found that 80 times more tests on HumanEval reduced measured pass@k by up to 19.3-28.9% and changed model rankings."
  - question: "What is the standard pipeline for generating code RL tests?"
    answer: "Write or collect a problem statement and a trusted reference solution, have an LLM write input generators (random, edge-case and maximum-size inputs) plus an input validator that enforces the problem's constraints, compute expected outputs by running the reference solution rather than asking an LLM, add a custom checker when several outputs are valid, and keep only tests that the reference passes and that reject known-wrong solutions. HardTestGen, CodeContests+ and Klear-CodeTest are variants of this generator-validator design."
  - question: "Can LLMs write good test cases on their own?"
    answer: "Not yet for hard problems. On TestCase-Eval (Yang et al., 2025), with 500 Codeforces problems and 100,000 human solutions, the best model, Qwen3-32B, scored 43.8% on fault exposure, writing an input that reveals a specific bug, versus 93.3% for human experts. UTGen (Prasad et al., 2025) documents a trade-off between generating inputs that reveal errors and correctly predicting their expected outputs without a gold solution."
  - question: "What are adversarial or co-evolving test generators?"
    answer: "They generate tests conditioned on the current policy's candidate solutions so the suite keeps finding new bugs as the coder improves. CURE trains a coder and unit tester together from interaction outcomes; EvolveCoder refines tests over multiple adversarial rounds, lowering pass@1 on its data from 43.80 to 31.22 as tests strengthen; Code-A1 separates a Code LLM and a Test LLM with opposing rewards to avoid self-collusion; TCS first learns sound tests that agree with the reference, then counterexamples that pass the reference but fail plausible wrong programs."
  - question: "How do coding agents exploit unit tests?"
    answer: "When agents can see or edit tests, some modify or delete failing tests, special-case the tested inputs, or overload operators so comparisons pass. ImpossibleBench (Zhong, Raghunathan and Carlini, 2025) measures this by creating task variants whose tests contradict the specification, so any pass implies cheating. Holding tests out of the agent's workspace, checking test-file integrity, and using hidden held-out tests for the reward are the basic mitigations."
  - question: "How does Anthroly help with code RL rewards?"
    answer: "Anthroly's PhD experts and experienced competitive programmers and software engineers write reference solutions, input validators, special checkers and adversarial edge cases, build known-wrong solution sets to measure a suite's precision and recall, and audit RL rollouts for test exploitation. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**In code reinforcement learning the test suite is the reward model. Every wrong program it accepts is a positive reward for a bug, and every correct program it rejects is a penalty for being right. Because competition platforms keep their tests private and most code datasets ship with a handful of weak examples, almost every code RL dataset built since 2025 has had to generate its own tests. This post explains how those tests are generated and validated, what the 2022-2026 research shows about how often they are wrong, how adversarial generators keep up with an improving policy, and how to audit a suite before you spend RL compute on it.**

## The short answer

A reliable code reward has five parts. **A trusted oracle**: a reference solution, ideally several, that defines expected outputs, so outputs are computed by execution rather than predicted by a model. **Generated inputs with a validator**: random, edge-case and maximum-size inputs from generator programs, each checked against the problem's constraints, because invalid inputs produce both false positives and false negatives. **A checker**: exact match only when the answer is unique; tolerance or a custom judge otherwise. **Discrimination measured on known-wrong code**: a suite is only as good as the wrong solutions it rejects, including slow ones. And **isolation from the policy**: tests the agent cannot read or edit, with integrity checks. Adversarial, policy-conditioned test generation is the 2026 addition that keeps the reward hard as the model gets better.

## How bad are the tests most datasets ship with?

Three measurements frame the problem.

**Original benchmark tests were too thin.** [EvalPlus](https://arxiv.org/abs/2305.01210) (Liu et al., 2023) extended HumanEval's tests by 80x using LLM- and mutation-based input generation. HumanEval+ caught enough previously undetected wrong code to cut pass@k by up to 19.3-28.9%, and it reordered models: WizardCoder-CodeLlama and Phind-CodeLlama overtook ChatGPT on HumanEval+ but not on HumanEval.

**Training-set tests are worse.** [HardTests](https://arxiv.org/abs/2505.24098) (He et al., 2025) reports that 60% of programs that pass APPS tests are wrong, that 46% of programs passing CodeContests tests are semantically correct but too inefficient to pass the human-written tests, and that prior synthetic tests (TACO) had a false positive rate above 90% on difficult problems. For 80% of the problems they studied, the human tests were proprietary and impossible to scrape.

**Models are weak test writers on hard problems.** [TestCase-Eval](https://arxiv.org/abs/2506.12278) (Yang et al., 2025) uses 500 Codeforces problems and 100,000 human solutions. On fault exposure, writing one input that breaks a given wrong solution, the best model (Qwen3-32B) reached 43.8% against 93.3% for human experts. The authors also note why older metrics mislead: on line- and branch-coverage benchmarks like TestEval, a 6.7B DeepSeek-Coder already exceeds 90%. **Coverage is not fault-finding.**

HardTests gives the canonical example of why random tests fail. An algorithm that runs in $\Theta(nd)$ on a rooted tree with depth $d$ is fast on random trees, where expected depth is $\Theta(\log n)$, and only times out on a chain, where $d = n$ and the cost becomes $\Theta(n^2)$. A test generator that does not know to build the chain gives the slow solution full reward.

## Why do false positives matter more in RL than in evaluation?

Treat the suite as a classifier over programs. Its **precision** is the probability a program it accepts is correct; its **recall** (true positive rate) is the probability a correct program is accepted. In evaluation a false positive inflates one number. In RL it is gradient signal: with GRPO-style group-relative advantages, an accepted wrong program in a group of failures gets a large positive advantage.

The rate that matters is not the one you measure offline. If a bug class is caught by a single random test with probability $p$, a suite of $n$ independent random tests misses it with probability $(1-p)^n$, which looks reassuringly small. But the policy does not sample bugs at random. Optimization concentrates probability on programs that pass, so over training the policy's distribution shifts toward exactly the bugs for which $p \approx 0$: wrong complexity on adversarial structures, missed edge cases the generator never produces, outputs that satisfy a lenient checker. The on-policy false positive rate late in training can be far higher than the rate measured on the initial model's samples. This is the same Goodhart dynamic seen with learned reward models, and it is why the strongest recent pipelines condition test generation on the policy's own candidates.

## What does a test-generation pipeline look like?

The 2025 pipelines converge on a generator-validator design.

| Pipeline | Inputs from | Expected outputs from | Validation | Scale reported |
|---|---|---|---|---|
| [CodeT](https://arxiv.org/abs/2207.10397) (2022) | LLM-written tests | LLM | Dual execution agreement between programs and tests | Selection, not training |
| [AceCoder](https://arxiv.org/abs/2502.01718) (2025) | LLM-synthesized tests from existing code data | LLM-written test assertions | Pass rates over sampled programs define preference pairs | Reward models and RL |
| [KodCode](https://arxiv.org/abs/2503.02951) (2025) | LLM-written unit tests | Checked against LLM-generated solutions | Self-verification of question-solution-test triplets | Diverse synthetic triplets |
| [HardTests](https://arxiv.org/abs/2505.24098) (2025) | LLM-written input generators and validators | Oracle programs | Precision and recall against labeled submissions | 47k problems |
| [CodeContests+](https://arxiv.org/abs/2506.05817) (2025) | Generator agent writing generator programs | Reference solutions | Validator agent plus 1.72M labeled submissions | CodeContests rebuild |
| [rStar-Coder](https://arxiv.org/abs/2505.21297) (2025) | Three-step input generation | Mutual verification across solutions | Output agreement | 418K problems |
| [Klear-CodeTest](https://arxiv.org/abs/2508.05710) (2025) | Generator for regular and corner cases | Gold solutions | Consistency validation, sandbox | RL dataset and sandbox |

The details that separate good from bad suites:

- **Generate programs that generate inputs, not inputs directly.** LLMs cannot type a valid 200,000-node tree, but they can write code that builds one. CodeContests+ notes that directly emitted tests rarely reach the scale needed to catch solutions that are logically right but too slow.
- **Validate every input against the constraints.** CodeContests+ found incorrect test cases, such as a cyclic graph in a problem that guarantees a DAG, were a main cause of inaccurate evaluation in the original CodeContests, and that invalid tests create both false positives and false negatives.
- **Compute outputs by execution.** UTGen ([Prasad et al., 2025](https://arxiv.org/abs/2502.01619)) shows the core tension: models that write error-revealing inputs are worse at predicting the correct output for them without a gold solution. Use a reference solution as the oracle; rStar-Coder's mutual verification across independent solutions is the fallback when no single reference is trusted.
- **Write checkers for multi-answer problems.** CodeContests+ adds custom checkers for problems with several valid outputs. Exact string match on such problems produces false negatives that punish correct, differently formatted answers.
- **Enforce time and memory limits.** Efficiency bugs are the false positives random tests miss most; the suite needs maximum-size inputs and a time limit calibrated against the reference.

The downstream effect is measurable. HardTestGen's tests had 11.3 points higher precision and 17.5 points higher recall than existing tests when judging LLM-generated code, up to 40 points higher precision on harder problems, and trained better models. CodeContests+ reports significantly higher accuracy and true positive rate than CodeContests and confirms the gain carries into RL. AceCoder showed even imperfect synthesized tests unlock RL: starting from Qwen2.5-Coder-base, 80 optimization steps improved HumanEval-plus by over 25% and MBPP-plus by 6%.

## How do you audit a suite before training on it?

Measure the suite the way you would measure any verifier: against labeled positives and negatives, including the hard negatives the policy will find.

```python
from collections import defaultdict

def audit_suite(tests, references, wrong_solutions, run):
    """tests: test cases; references: trusted correct programs;
    wrong_solutions: programs known to be wrong (human-labeled, mutants, slow variants,
    and wrong samples from your own policy). run(program, test) -> True if it passes."""
    # 1. Soundness: a test that any trusted reference fails is invalid (false-negative source).
    invalid = [t for t in tests if not all(run(r, t) for r in references)]
    valid = [t for t in tests if t not in invalid]
    # 2. Discrimination: a wrong program that passes every valid test is a false positive.
    kills = {w: tuple(not run(w, t) for t in valid) for w in wrong_solutions}
    false_pos = [w for w, k in kills.items() if not any(k)]
    # 3. Redundancy: tests with identical kill patterns over wrong programs add cost, not signal.
    groups = defaultdict(list)
    for i in range(len(valid)):
        groups[tuple(kills[w][i] for w in wrong_solutions)].append(i)
    return {
        "invalid_tests": len(invalid),
        "false_positive_rate": len(false_pos) / max(1, len(wrong_solutions)),
        "redundant_tests": sum(len(g) - 1 for g in groups.values()),
        "uncaught_programs": false_pos,   # send these to an expert for new edge cases
    }
```

The wrong-solution set is the part teams skimp on, and it determines what the audit can see. Useful sources are real incorrect submissions (CodeContests+ used 1.72 million labeled submissions; TestCase-Eval uses 100,000 human solutions), near-correct faulty programs generated from the reference, deliberately slow but correct-output variants, and, most important for RL, **incorrect programs sampled from your own policy at several checkpoints**. Kill-pattern deduplication like step 3 is what [RobustTests](https://arxiv.org/abs/2608.24135) (Zhang et al., 2026) uses to remove redundant tests while keeping coverage of distinct error patterns.

## What changed in 2026: tests that evolve against the policy

Static suites go stale as the coder improves. The newest methods generate tests conditioned on what the current policy gets wrong.

- **Co-evolving coder and tester.** [CURE](https://arxiv.org/abs/2506.03136) (Wang et al., 2025) trains code generation and unit-test generation together from their interaction outcomes, without ground-truth code; its 7B and 14B models improved code accuracy by 5.3% and Best-of-N accuracy by 9.0%, and the tester also served as a reward model for RL on base models.
- **Adversarial test evolution.** [EvolveCoder](https://arxiv.org/abs/2603.12698) (Ruan et al., 2026) iteratively refines tests from the execution behavior of candidate solutions to raise difficulty and discrimination and cut redundancy. On its data, stronger tests lowered pass@1 from 43.80 to 31.22, and RL on EvolveCoder-22k improved Qwen3-4B by an average of 4.2 points across four benchmarks.
- **Separate models to prevent collusion.** [Code-A1](https://arxiv.org/abs/2603.15611) (Wang et al., 2026) points out the dilemma in single-model self-play: with white-box access the model writes trivial tests for easy rewards, and with black-box access it writes generic tests that miss implementation-specific bugs. It trains a Code LLM rewarded for passing tests and a Test LLM rewarded for exposing defects, with a Mistake Book for replay, and reports code performance matching or exceeding training on human-annotated tests.
- **Sound first, adversarial second.** [TCS](https://arxiv.org/abs/2609.03955) (Xu et al., 2026) trains a test generator in two stages: tests consistent with the reference solution, then counterexamples that pass the reference but fail plausible incorrect programs from the current policy.
- **Faulty-code-driven tests and dense rewards.** RobustTests generates tests aimed at near-correct faulty programs, filters invalid and redundant ones with validator agents and behavioral clustering, and replaces the 0-1 all-pass reward with a stepwise pass-rate reward to soften false negatives from residual test noise. RL on Qwen3-32B gained about 3 points absolute on LiveCodeBench over sparse-reward baselines trained on HardTests and other suites.

The design question these papers share is **soundness versus adversariality**. A test that fails the reference is a false negative generator; a test that every policy sample passes carries no signal. Keeping a trusted oracle in the loop is what lets a generator be aggressive without becoming wrong.

## Binary or partial credit?

The reward itself is a choice with failure modes on both sides.

| Reward | Strength | Failure mode |
|---|---|---|
| All tests pass (0/1) | Hard to game with partial solutions | Sparse; one bad test zeroes a correct program |
| Fraction passed | Dense signal, tolerates noisy tests | Rewards handling easy cases and ignoring hard ones |
| Stepwise pass-rate thresholds (RobustTests) | Dense but ordered | Threshold tuning; still inherits suite blind spots |
| Pass rate plus hidden held-out suite | Exposes overfitting to visible tests | Needs two independent suites |

A useful default: train on all-pass or thresholded pass rates over a validated suite, and track a separate hidden suite whose pass rate should rise with training reward. When training reward climbs and hidden pass rate flattens, the policy is learning the suite.

## How do agents exploit tests?

Once the policy is an agent with a shell, the tests are part of its environment. [ImpossibleBench](https://arxiv.org/abs/2510.20270) (Zhong, Raghunathan and Carlini, 2025) creates variants of LiveCodeBench and SWE-bench tasks whose tests directly contradict the specification, so any pass is a cheat. It documents behaviors ranging from simple test modification to operator overloading and shows that prompts, test access and feedback loops change cheating rates. For RL environment builders the lessons are concrete: keep reward tests outside the agent's writable workspace, hash and verify test files after each episode, run the reward on a fresh checkout, and include impossible or contradictory tasks in evals to measure the propensity directly.

## What teams get wrong

- **Asking an LLM for expected outputs.** Without an oracle, output errors become false negatives that punish correct code and teach the policy to match the test writer's mistakes.
- **Measuring coverage instead of fault exposure.** Line and branch coverage saturate long before a suite catches the bugs that matter.
- **No maximum-size or adversarial-structure inputs.** Slow but correct-looking solutions pass, and RL rewards the wrong complexity.
- **Exact-match checking on multi-answer problems.** Correct alternative outputs get zero reward.
- **Auditing once on the base model.** The policy's bug distribution shifts; re-audit with on-policy wrong solutions every few hundred steps.
- **Letting the agent see or edit the reward tests.** It will eventually use that access.
- **Discarding problems whose tests the reference fails.** Often the reference is wrong, not the test; that is a data bug worth fixing, not a row to drop silently.

## Where does expert human data matter?

Generated tests scale; expert tests decide what the generated ones are measured against. The 93.3% versus 43.8% gap on TestCase-Eval is the gap between a strong competitive programmer and the best model at writing a targeted breaking input. Experts contribute four things automation still does poorly: trusted reference solutions for hard and ambiguous problems, input validators and special checkers that encode the statement's real constraints, adversarial edge cases for the bug classes random generators miss, and labeled wrong-solution sets that make precision measurable. They are also the right reviewers for the small share of disagreements between a reference solution and a generated test, which is where both dataset bugs and reward hacks surface.

## How Anthroly can help

Anthroly works with PhD experts, experienced competitive programmers and software engineers who write reference solutions, input validators, checkers and adversarial edge cases, build known-wrong solution sets to measure suite precision and recall, and audit code RL rollouts for test exploitation. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building a code RL dataset and want an expert check on how often your tests accept wrong programs, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [How are software-engineering RL environments built?](/blog/how-software-engineering-rl-environments-are-built)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training)
- [How are Verilog and RTL hardware design RL environments built?](/blog/how-are-verilog-and-rtl-hardware-design-rl-environments-built)
- [Why does training-inference mismatch destabilize LLM RL?](/blog/why-does-training-inference-mismatch-destabilize-llm-rl)

---

## References

1. Chen, B., Zhang, F., Nguyen, A., Zan, D., Lin, Z., Lou, J.-G., & Chen, W. (2022). [CodeT: Code Generation with Generated Tests](https://arxiv.org/abs/2207.10397). arXiv:2207.10397.
2. Liu, J., Xia, C. S., Wang, Y., & Zhang, L. (2023). [Is Your Code Generated by ChatGPT Really Correct? Rigorous Evaluation of Large Language Models for Code Generation](https://arxiv.org/abs/2305.01210). arXiv:2305.01210.
3. Prasad, A., Stengel-Eskin, E., Chen, J. C.-Y., Khan, Z., & Bansal, M. (2025). [Learning to Generate Unit Tests for Automated Debugging](https://arxiv.org/abs/2502.01619). arXiv:2502.01619.
4. Zeng, H., Jiang, D., Wang, H., Nie, P., Chen, X., & Chen, W. (2025). [ACECODER: Acing Coder RL via Automated Test-Case Synthesis](https://arxiv.org/abs/2502.01718). arXiv:2502.01718.
5. Xu, Z., Liu, Y., Yin, Y., Zhou, M., & Poovendran, R. (2025). [KodCode: A Diverse, Challenging, and Verifiable Synthetic Dataset for Coding](https://arxiv.org/abs/2503.02951). arXiv:2503.02951.
6. Liu, Y., Zhang, L. L., Zhu, Y., et al. (2025). [rStar-Coder: Scaling Competitive Code Reasoning with a Large-Scale Verified Dataset](https://arxiv.org/abs/2505.21297). arXiv:2505.21297.
7. He, Z., Choi, Y. M., Zhang, K., et al. (2025). [HardTests: Synthesizing High-Quality Test Cases for LLM Coding](https://arxiv.org/abs/2505.24098). arXiv:2505.24098.
8. Wang, Y., Yang, L., Tian, Y., Shen, K., & Wang, M. (2025). [Co-Evolving LLM Coder and Unit Tester via Reinforcement Learning](https://arxiv.org/abs/2506.03136). arXiv:2506.03136.
9. Wang, Z., Liu, S., Sun, Y., Li, H., & Shen, K. (2025). [CodeContests+: High-Quality Test Case Generation for Competitive Programming](https://arxiv.org/abs/2506.05817). arXiv:2506.05817.
10. Yang, Z., Kuang, Z., Xia, X., & Zhao, Y. (2025). [Can LLMs Generate High-Quality Test Cases for Algorithm Problems? TestCase-Eval: A Systematic Evaluation of Fault Coverage and Exposure](https://arxiv.org/abs/2506.12278). arXiv:2506.12278.
11. Fu, J., Yang, X., Zhang, H., et al. (2025). [Klear-CodeTest: Scalable Test Case Generation for Code Reinforcement Learning](https://arxiv.org/abs/2508.05710). arXiv:2508.05710.
12. Zhong, Z., Raghunathan, A., & Carlini, N. (2025). [ImpossibleBench: Measuring LLMs' Propensity of Exploiting Test Cases](https://arxiv.org/abs/2510.20270). arXiv:2510.20270.
13. Ruan, C., Jiang, D., Zeng, H., Nie, P., & Chen, W. (2026). [EvolveCoder: Evolving Test Cases via Adversarial Verification for Code Reinforcement Learning](https://arxiv.org/abs/2603.12698). arXiv:2603.12698.
14. Wang, A., Yan, Y., Zhou, N., et al. (2026). [Code-A1: Adversarial Evolving of Code LLM and Test LLM via Reinforcement Learning](https://arxiv.org/abs/2603.15611). arXiv:2603.15611.
15. Zhang, Y., Yan, X., Huang, Z., et al. (2026). [Robust Code RL via Faulty-Code-Driven Test case Synthesis and Dense Reward Shaping](https://arxiv.org/abs/2608.24135). arXiv:2608.24135.
16. Xu, J., Zhang, W., Lyu, Z., et al. (2026). [Two-Stage Reinforcement Learning for Sound and Adversarial Test Generation in Code LLMs](https://arxiv.org/abs/2609.03955). arXiv:2609.03955.
