---
title: "What Makes an RL Environment Training-Grade? Lessons from HF's RL Hub and TermGrade"
description: "Not every task collection is fit for training. HF's September 2026 RL Environments filter and TermGrade show what separates an eval set from a training-grade environment: pass-rate calibration, verifier coverage, contamination, and reproducibility."
tags:
  - rl-environments
  - verifiers
  - training-data
  - post-training
  - agent-training
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-20T00:00:00.000Z'
updatedAt: '2026-10-20T00:00:00.000Z'
faq:
  - question: "What is the difference between an eval set and a training-grade RL environment?"
    answer: "An eval set measures performance on held-out tasks. A training-grade environment provides learnable signal—tasks in the right difficulty band for your model, verifiers with low false-positive/negative rates, reproducible execution, and no contamination with test data."
  - question: "What is pass-rate calibration?"
    answer: "Filtering tasks to keep those where your model neither always succeeds nor always fails. Tasks with 0% or 100% pass rate across rollouts provide no gradient signal. The useful band is typically 5-95% pass rate."
  - question: "What is verifier coverage?"
    answer: "The fraction of success/failure modes that your verifier correctly identifies. A verifier that only checks final output may miss partial credit or false positives from lucky guesses."
  - question: "What framework tags does Hugging Face support for RL environments?"
    answer: "Harbor, Verifiers, OpenEnv, and NeMo Gym. Each tag puts the framework's icon on the dataset page and generates a loading snippet. A dataset can carry multiple framework tags."
  - question: "What is TermGrade?"
    answer: "A collection of 1,004 executable Linux terminal tasks with pytest verifiers, per-model pass rates, and released trajectories. It demonstrates training-grade environment principles, including measured difficulty, verifier coverage, and released attempts for inspection."
  - question: "How do you audit a verifier for false positives and negatives?"
    answer: "Sample rollouts that the verifier marks as pass/fail, then have domain experts manually grade them. Track disagreement rate. For pytest-style verifiers, also check test coverage—can a wrong solution pass by satisfying only some tests?"
draft: false
---

**An RL environment is a taskset, a runtime, and a reward rule. But not every collection of tasks is fit for training. The distinction matters: train on poorly calibrated environments and your model learns nothing; train on contaminated environments and your benchmarks become meaningless. Hugging Face's September 2026 RL Environments release and TermGrade offer a framework for thinking about what makes an environment training-grade.**

## What shipped on September 28, 2026?

Hugging Face [announced](https://huggingface.co/blog/rl-environments) a new home for RL environments on the Hub. The key pieces:

**The RL Environments filter**: Any dataset with the `rl-environment` tag appears at [huggingface.co/datasets?other=rl-environment](https://huggingface.co/datasets?other=rl-environment).

**Framework tags**: Four environment frameworks are registered as dataset libraries:

| Tag | Framework |
|-----|-----------|
| `harbor` | [Harbor](https://github.com/harbor-framework/harbor) |
| `verifiers` | [Verifiers](https://github.com/PrimeIntellect-ai/verifiers) |
| `openenv` | [OpenEnv](https://github.com/huggingface/OpenEnv) |
| `nemo-gym` | [NeMo Gym](https://github.com/NVIDIA-NeMo/Gym) |

Each tag adds a generated snippet to "Use this dataset" with the right loading command. A dataset can carry multiple tags—they describe compatibility, not exclusivity.

**The architecture**: Task data lives on the Hub. Runtime configuration and verifier code live in the repo or the framework. The Hub does discovery and versioning; frameworks handle execution. No central registry, no sign-up.

This is a pragmatic shift. Previously, every RL paper or framework used its own way to find environments—custom hubs, runtime registries, GitHub lists with custom loaders. If you published an environment for one framework, users of other frameworks had to port it by hand.

Now there's one repo and one discussion tab where people report broken tasks from all major frameworks. When an author fixes a bad test, every framework gets the fix on the next pull.

## What separates an eval set from a training-grade environment?

An eval set measures performance on held-out tasks. You run your model, count successes, report a number.

A training-grade environment provides *learnable signal*. The difference is subtle but critical:

### Pass-rate calibration

Tasks where your model always succeeds (100% pass rate) provide no gradient—there's nothing to learn. Tasks where your model always fails (0% pass rate) also provide no gradient—the model can't find the reward.

Training-grade environments contain tasks in the *learnable band*: hard enough to fail sometimes, easy enough to succeed sometimes. The exact band depends on your model and your RL algorithm, but a reasonable heuristic is 5-95% pass rate across sampled rollouts.

This means difficulty calibration is model-specific. A task that's training-grade for Qwen-7B might be trivially easy for GPT-5 or impossibly hard for a 1B model.

### Verifier coverage and false-positive/negative auditing

Your reward signal is only as good as your verifier. A verifier with high false-positive rate (marks failures as successes) teaches your model to produce garbage that looks right. A verifier with high false-negative rate (marks successes as failures) throws away signal from valid solutions.

Verifier coverage matters especially for open-ended tasks. A pytest suite that checks final output might miss:
- Partial credit for mostly-correct solutions
- False positives from lucky guesses that happen to produce the right output
- Valid alternative approaches that produce correct results via different paths

Auditing means sampling rollouts the verifier marked as pass/fail and having domain experts manually grade them. Track the disagreement rate. If it's above a few percent, your reward signal is noisy.

### Contamination

If tasks have appeared in training data, your model may have memorized them. This corrupts both evaluation (scores become meaningless) and training (the model isn't learning to solve the task, it's learning to recall the answer).

Training-grade environments need provenance tracking. Where did each task come from? Has the instruction text or solution appeared on the open web? Have similar tasks appeared in popular training corpora?

For high-stakes training, the safest approach is private material that has never been published—operational records, internal tooling, domain expert-authored challenges.

### Reproducible containers

RL training involves running tasks thousands of times. If the environment is flaky—network calls that timeout, non-deterministic setup, missing dependencies—you'll spend more time debugging infrastructure than training models.

Training-grade environments need:
- Offline execution (no network dependencies during task runs)
- Deterministic setup (same container build every time)
- Clean state reset between attempts

## TermGrade as a case study

[TermGrade](https://huggingface.co/datasets/ai-and/termgrade-environments) demonstrates what training-grade environment design looks like in practice. Released by ai&, it contains 1,004 executable Linux terminal tasks with:

**Pytest verifiers**: Each task has a `test_outputs.py` that grades the solution. The verifier runs offline (`--network none`) in a freshly built container. Tests are not in the container during the attempt—they're copied in at scoring time so the agent can't read what it's graded on.

**Per-model pass rates**: The dataset ships with measured difficulty across six models:

| Model | k | Pass@1 |
|-------|---|--------|
| google/gemma-4-31B-it | 8 | 0.4986 |
| google/gemma-4-31B-it (thinking) | 8 | 0.5774 |
| Qwen/Qwen3.6-27B | 8 | 0.6320 |
| moonshotai/Kimi-K3 | 8 | 0.6770 |
| deepseek-ai/DeepSeek-V4-Pro | 2 | 0.6853 |
| zai-org/GLM-5.2 | 2 | 0.6858 |

This is pass-rate calibration made explicit. You can filter tasks by difficulty band for your target model before you start training.

**Released trajectories**: The companion dataset `ai-and/termgrade-trajectories` carries 36,144 trials (21,910 passing, 14,234 failing) with per-assertion verdicts. You can inspect what models actually tried, not just whether they succeeded.

**Split labels**: 802 tasks are `split == "unseen"`, meaning they were never used for ai&'s own model training. The other 202 tasks (113 `train151`, 89 `heldout120`) were used to train or validate their model. This transparency lets you choose a clean subset for your own eval.

**Reference solutions**: Each task ships with `solution/solve.sh` that's verified to pass its own tests. Tasks where the oracle couldn't be confirmed are flagged with `oracle_verified: false`.

## A practical formula for filtering training tasks

Given a taskset with measured pass rates, here's a simple filter for selecting training-grade tasks:

```python
def filter_training_tasks(
    tasks: list[dict],
    model_pass_rates: dict[str, float],
    min_pass: float = 0.05,
    max_pass: float = 0.95,
    min_attempts: int = 4
) -> list[dict]:
    """Filter tasks to the learnable band for a given model.
    
    Args:
        tasks: List of task metadata dicts
        model_pass_rates: Dict mapping task_id -> pass_rate for target model
        min_pass: Minimum pass rate (too hard below this)
        max_pass: Maximum pass rate (too easy above this)  
        min_attempts: Minimum attempts to trust pass rate estimate
    
    Returns:
        Tasks in the learnable band
    """
    training_grade = []
    
    for task in tasks:
        task_id = task["id"]
        
        # Skip tasks without measured difficulty
        if task_id not in model_pass_rates:
            continue
            
        rate = model_pass_rates[task_id]
        n_attempts = task.get("n_counted", 0)
        
        # Skip tasks with insufficient data
        if n_attempts < min_attempts:
            continue
            
        # Keep tasks in the learnable band
        if min_pass < rate < max_pass:
            training_grade.append(task)
    
    return training_grade


def pass_rate_from_rollouts(
    task_id: str,
    rollouts: list[dict],
    verifier_fn: callable
) -> tuple[float, int]:
    """Estimate pass rate from sampled rollouts.
    
    Args:
        task_id: Task identifier
        rollouts: List of rollout dicts with 'output' key
        verifier_fn: Function that returns True if rollout passes
        
    Returns:
        (pass_rate, n_attempts)
    """
    attempts = [r for r in rollouts if r.get("task_id") == task_id]
    if not attempts:
        return 0.0, 0
        
    passes = sum(1 for r in attempts if verifier_fn(r))
    return passes / len(attempts), len(attempts)
```

The key insight: difficulty depends on the model. If you're grading a new taskset, you need to measure pass rates against your target model before you can filter effectively.

## A quality checklist for RL environments

Before training on an environment, audit:

**Task quality**
- [ ] Instructions are unambiguous and self-contained
- [ ] Tasks have a clear success criterion
- [ ] No tasks depend on external services or network calls
- [ ] Reference solutions exist and pass verification

**Verifier quality**
- [ ] Verifier false-positive rate < 5% (manually audited sample)
- [ ] Verifier false-negative rate < 5% (manually audited sample)
- [ ] Tests cover edge cases, not just happy path
- [ ] Tests run deterministically (no timing dependencies)

**Difficulty calibration**
- [ ] Pass rates measured for your target model
- [ ] Sufficient tasks in the 5-95% band
- [ ] Difficulty distribution documented

**Contamination**
- [ ] Task provenance documented
- [ ] Overlap with major training corpora checked
- [ ] Split labels for train/eval separation

**Reproducibility**
- [ ] Container builds deterministically
- [ ] Offline execution supported
- [ ] Setup scripts idempotent

## What existing environments are available?

The Hub already has environments tagged for major frameworks:

**Harbor**
- [BeyondSWE](https://huggingface.co/datasets/AweAI-Team/BeyondSWE-harbor): BeyondSWE benchmark as Harbor task directories
- [Terminal-Lego](https://huggingface.co/datasets/Lego-X/Terminal-Lego-15k): Tasks built from real StackOverflow issues, kept only after Docker round-trip verification
- [Terminal-Bench 2.1](https://huggingface.co/datasets/harborframework/terminal-bench-2.1): 89 terminal tasks

**Verifiers**
- [Reverse-Text-RL](https://huggingface.co/datasets/PrimeIntellect/Reverse-Text-RL): Small reversal task for debugging RL training
- [Multi-SWE-RL-Verified](https://huggingface.co/datasets/PrimeIntellect/Multi-SWE-RL-Verified): 2,232 validated tasks across C, Go, Java, JavaScript, Rust, TypeScript
- [Scale-SWE-Verified](https://huggingface.co/datasets/PrimeIntellect/Scale-SWE-Verified): 17,202 Python issue-resolving tasks with clean reward signal

**NeMo Gym**
- [Workplace Assistant](https://huggingface.co/datasets/nvidia/Nemotron-RL-agent-workplace_assistant): Multi-step tool-use sandbox with 690 business tasks
- [Structured Outputs](https://huggingface.co/datasets/nvidia/Nemotron-RL-instruction_following-structured_outputs): Instruction following with structured outputs
- [CFBench](https://huggingface.co/datasets/nvidia/Nemotron-RL-CFBench-v1): Multilingual constraint following

## The harder problem: domain-specific environments

Terminal tasks, coding benchmarks, and structured outputs are relatively well-served. The harder problem is building training-grade environments for domains where:

- Success criteria require domain expertise to define
- Verifiers require domain expertise to implement
- Tasks require domain expertise to write

Medical diagnosis environments need physicians who can specify what constitutes a safe and accurate recommendation. Legal research environments need lawyers who can evaluate whether a case analysis is sound. Scientific reasoning environments need researchers who can judge whether an explanation is correct.

This is where scale becomes difficult. You can't automate domain expertise. You need people who actually know the field—not just to write tasks, but to audit verifiers and validate that your reward signal matches actual quality.

## How this connects to reward hacking

Training-grade environments and [reward hacking in rubric-based RL](/blog/reward-hacking-rubric-based-rl) are two sides of the same problem.

A rubric is a structured reward rule. A verifier is a reward rule implemented in code. Both can be exploited when they don't fully capture what "correct" means.

The mitigations are similar:
- Measure against held-out ground truth (cross-family judges for rubrics, human audits for verifiers)
- Design for adversarial conditions (negative criteria in rubrics, edge-case tests in verifiers)
- Track what your model actually learns to do, not just whether it passes

The RL environments ecosystem is maturing. Hub-based discovery, framework interoperability, and measured difficulty are real improvements over the fragmented landscape of 2024-2025. But the hard work—building verifiers that actually capture success, calibrating difficulty for your model, ensuring no contamination—still requires domain expertise and careful engineering.

## How Anthroly can help

Building training-grade RL environments for specialized domains is what we do. Anthroly has 100+ PhDs on contract and 400+ more ready to commit, covering medicine, science, law, engineering, and operations.

Our domain experts:
- Write executable tasks grounded in real professional work
- Implement verifiers that catch actual failure modes
- Audit your existing environments for false positives/negatives
- Build held-out evaluation sets with no contamination risk

If your post-training team needs training-grade environments for a domain that requires expertise, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) to discuss what expert-built environments could look like.

---

## Related reading

- [RL environments, explained](/learn/rl-environments-explained) — Plain-English introduction to what RL environments are and why they matter
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl) — The verification side of the same problem
- [Are LLM user simulators reliable for agent RL? The Sim2Real gap](/blog/are-llm-user-simulators-reliable-for-agent-rl)
- [Why private evaluation data is worth more than training data](/learn/evaluation-datasets-contamination) — The contamination problem in detail
- [Where should step-level rewards for AI agents come from?](/blog/step-level-rewards-for-ai-agents)
- [How Are Software-Engineering RL Environments Built?](/blog/how-software-engineering-rl-environments-are-built) — Lessons from SWE-bench, SWE-Gym, SWE-smith, and R2E-Gym
- [How Do You Build an Agent Benchmark That Won't Be Contaminated or Saturated?](/blog/building-contamination-resistant-agent-benchmarks)
- [How reliable are verifiers in RLVR? False negatives and master keys](/blog/how-reliable-are-rlvr-verifiers)
- [How do you choose training prompts for RLVR? Pass-rate filtering and difficulty curricula](/blog/how-to-choose-prompts-for-rlvr-training)
- [How are tool-use RL environments built? Simulated APIs, real MCP servers, and state-based verifiers](/blog/how-tool-use-rl-environments-are-built)
- [How many RL environments do you need to train a general agent?](/blog/how-many-rl-environments-do-you-need-to-train-an-agent)
- [How are web and computer-use RL environments built? VM snapshots, state checkers, and VLM judges](/blog/how-are-web-and-computer-use-rl-environments-built)
- [How are text-to-SQL RL environments built?](/blog/how-are-text-to-sql-rl-environments-built)
- [How are chemistry and biology RL environments built?](/blog/how-are-chemistry-and-biology-rl-environments-built)

---

## References

1. Burtenshaw, B., Adithya S K, & Chaumond, J. (2026, September 28). [Welcome RL Environments to the Hub](https://huggingface.co/blog/rl-environments). Hugging Face Blog.

2. Calik, Y., Wu, J., & Hara, S. (2026, October). [TermGrade: 1k Graded Terminal Environments, 36k Trajectories, and the RL Run They Trained](https://www.aiand.com/newsroom/termgrade). ai& Research.

3. [TermGrade Environments Dataset](https://huggingface.co/datasets/ai-and/termgrade-environments). Hugging Face Datasets.

4. [Terminal-Bench 2.1](https://huggingface.co/datasets/harborframework/terminal-bench-2.1). Harbor Framework, Hugging Face Datasets.
