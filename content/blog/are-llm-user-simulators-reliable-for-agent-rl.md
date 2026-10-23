---
title: "Are LLM User Simulators Good Enough to Train and Evaluate Tool-Use Agents?"
description: "Interactive agent benchmarks and RL environments rely on simulated users to drive multi-turn conversations. But simulators can be over-cooperative, leak information early, and shift reward in ways that diverge from real users. This post covers τ-bench, pass^k, the Sim2Real gap, and a practitioner checklist for building reliable user simulators."
tags:
  - user-simulation
  - agent-benchmarks
  - rl-environments
  - tau-bench
  - verifiers
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-23T05:30:00.000Z'
updatedAt: '2026-10-23T05:30:00.000Z'
faq:
  - question: "What is a user simulator in agent benchmarks?"
    answer: "A user simulator is an LLM prompted to play the role of a human user in multi-turn interactions with an AI agent. In benchmarks like τ-bench and τ²-bench, the simulator receives private instructions about the user's goals and constraints, then generates natural language responses to drive the conversation while the agent uses tools to complete tasks."
  - question: "What is pass^k in agent evaluation?"
    answer: "Pass^k (pass-hat-k) measures the probability that all k independent runs of a task succeed. Unlike pass@k, which measures the chance of at least one success, pass^k captures agent reliability and consistency. If pass^1 is 60% but pass^8 is 25%, the agent is inconsistent—it can sometimes solve tasks but not reliably."
  - question: "Why do agents score higher with simulated users than real users?"
    answer: "Zhou et al. (2026) found that LLM simulators are 'excessively cooperative': they volunteer information before the agent asks, pivot quietly rather than pushing back on errors, and rarely express realistic frustration. This creates an 'easy mode' where agents don't have to handle the ambiguity, impatience, and incomplete information of real conversations."
  - question: "What is the Sim2Real gap in user simulation?"
    answer: "The Sim2Real gap refers to behavioral and evaluative differences between LLM-simulated users and real humans. Zhou et al. (2026) measured it across four behavioral dimensions (communication style, information patterns, clarification behavior, error reaction) and found that even the best simulators only achieve 76.0 on their User-Sim Index, compared to 92.7 for human-human agreement."
  - question: "What is premature disclosure in user simulation?"
    answer: "Premature disclosure occurs when a simulated user provides information before the agent requests it—for example, opening with 'I'm John Smith, order #12345, and I want to return item ABC' when the agent hasn't asked for any of these details. UserProxyBench found this is the dominant failure mode across simulators, occurring in 480 of 2,618 scored trajectories."
  - question: "How does Anthroly help with user simulator validation?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, runs real human interactions on benchmark slices to calibrate simulator fidelity, writes and validates persona libraries with realistic behavior variation, builds user-tool environments for dual-control settings, and creates gold-standard trajectories for fine-tuning reliable user models."
draft: false
---

**Interactive agent evaluation has shifted from static benchmarks to live conversations. The agent calls tools, the user responds, the agent decides what to do next. But the "user" in most benchmarks isn't a human—it's another LLM prompted to play the role. This creates a dependency that's easy to overlook: the simulator controls what information the agent receives and when. If the simulator is too cooperative, leaks answers early, or doesn't react like a real user, you're measuring something other than what you think. This post covers what the 2024–2026 literature shows about user simulator reliability and how to build better ones for RL training and evaluation.**

## The τ-bench paradigm

[τ-bench (Yao et al., 2024)](https://arxiv.org/abs/2406.12045) introduced the standard framework for tool-agent-user interaction benchmarks. The setup:

1. **Agent** receives a domain policy (airline rules, retail guidelines) and access to database API tools.
2. **User simulator** receives private instructions describing the user's goal, constraints, and persona.
3. They converse: user requests something, agent uses tools and responds, user reacts, repeat until the task completes or fails.
4. **Evaluation** compares the final database state to the expected outcome.

This design tests what static benchmarks cannot: can the agent gather information incrementally, handle ambiguity, follow ad-hoc policies, and resolve multi-step requests through conversation?

The benchmark ships with two domains—τ-retail (order management, returns) and τ-airline (flight booking, cancellation)—and uses GPT-4 as the default user simulator.

## pass^k: measuring reliability, not just capability

τ-bench introduced a metric that captures something most benchmarks miss: **consistency across trials**.

**pass@k** (pass at k) is familiar from code generation: the probability that at least one of k independent attempts succeeds. It measures whether a solution is discoverable.

**pass^k** (pass hat k) measures whether all k attempts succeed. It measures reliability.

The unbiased estimators from the paper:

$$
\text{pass}^k = \mathbb{E}_{\text{task}}\left[\binom{c}{k} \middle/ \binom{n}{k}\right], \quad \text{pass@k} = 1 - \mathbb{E}_{\text{task}}\left[\binom{n-c}{k} \middle/ \binom{n}{k}\right]
$$

where $n$ is the number of trials and $c$ is the number of successes.

In Python:

```python
from math import comb
from typing import List

def pass_at_k(n: int, c: int, k: int) -> float:
    """Probability of at least one success in k attempts."""
    if n - c < k:
        return 1.0
    return 1.0 - comb(n - c, k) / comb(n, k)

def pass_hat_k(n: int, c: int, k: int) -> float:
    """Probability of all k attempts succeeding."""
    if c < k:
        return 0.0
    return comb(c, k) / comb(n, k)

def aggregate_pass_hat_k(results: List[tuple], k: int) -> float:
    """Aggregate pass^k across tasks. results = [(n_trials, n_successes), ...]"""
    return sum(pass_hat_k(n, c, k) for n, c in results) / len(results)
```

The τ-bench results are striking: gpt-4o achieves ~61% pass^1 on τ-retail but only ~25% pass^8. The agent can often solve tasks but not reliably.

## τ²-bench: when users also use tools

[τ²-bench (Barres et al., 2025)](https://arxiv.org/abs/2506.07982) extends the paradigm to **dual-control environments**: both the agent and the user can call tools. This models real-world scenarios like technical support, where the user must perform actions (restart the phone, toggle airplane mode) guided by the agent.

The framework uses a Dec-POMDP (Decentralized Partially Observable MDP) formulation:

- **State**: $\mathcal{S} = \mathcal{S}_{db,agent} \otimes \mathcal{S}_{db,user} \otimes \mathcal{S}_{history}$
- **Actions**: Agent and user each have tool actions plus messages
- **Observations**: Tool results and messages from the other party
- **Reward**: Task success based on final state assertions

The new Telecom domain tests this: agents diagnose connectivity issues while users check their device status and toggle settings. Results show a **~20% drop in pass^1** when moving from no-user mode (agent controls everything) to dual-control mode—even for capable models like gpt-4.1 and o4-mini.

Crucially, τ²-bench demonstrates that **constraining user behavior through tools improves simulation reliability**. The Telecom user simulator has only 16% error rate with 6% critical errors, compared to 40%/12% for the less-constrained retail domain.

## The Sim2Real gap: how simulators diverge from humans

[Zhou et al. (2026)](https://arxiv.org/abs/2603.11245) ran the definitive study: 451 real human participants completed 165 τ-bench tasks, enabling direct comparison with 31 LLM simulators.

They introduce the **User-Sim Index (USI)**, measuring simulator–human alignment across six dimensions:

| Dimension | What it measures |
|-----------|------------------|
| D1: Communication style | Politeness, verbosity, stylistic variation |
| D2: Information pattern | When and how much information is shared |
| D3: Clarification | Information-seeking behavior, uncertainty expression |
| D4: Error reaction | Response to agent failures (frustration, pivoting, pushback) |
| ECE: Outcome calibration | Whether task success rates match humans |
| Eval: Evaluative alignment | Whether feedback ratings match humans |

The findings are sobering:

**Best simulator USI: 76.0** (DeepSeek-V3.1). Human inter-annotator agreement: **92.7**. The gap is large and consistent.

### Behavioral divergence patterns

**D1: Too polite and uniform.** GPT-4o uses polite language in 49% of turns vs. 15% for humans. Only 1% of GPT-4o turns are short; 29% of human turns are.

**D2: Information front-loading.** UserLM-8b includes 4.8 identifier-like tokens per turn vs. 2.6 for humans. Simulators dump "My name is Sarah Johnson, email sarah@example.com, order #ORD-58211" upfront; real users say "Hi, I need help with a return."

**D3: Miscalibrated uncertainty.** GPT-4o over-hedges (14.6% uncertainty markers vs. 7.3% for humans). UserLM-8b underhedges (3.0% uncertainty, 10.6% certainty markers).

**D4: Missing pushback.** Humans say "This is ridiculous...why can't you just waive the fees?" Simulators quietly pivot: "On second thought, let me try giving you my email instead."

The aggregate effect: simulators create an **"easy mode"** where agents don't have to handle realistic conversational challenges. Agent success rates with most simulators exceed the human baseline (63.6%), reaching 77.8% with some models.

## UserProxyBench: the dominant failure is invisible to reward

[Jain & Sandhu (2026)](https://arxiv.org/abs/2609.38043) introduce **User Fidelity Score (UFS)** and show that task reward doesn't capture simulator quality:

- **24.4% of successful episodes contain a user-specification violation.** The agent completes the task, but the simulator didn't play its role correctly.
- **Premature disclosure is the dominant failure.** In 480 of 2,618 trajectories, users volunteered information before being asked.
- **Premature disclosure has minimal effect on task reward** (only -0.043 change in pass rate), but changes what the agent actually does: 1.06 fewer tool calls, 0.26 fewer questions asked in successful episodes.

This is the key insight for RL: **you can get the same task reward while learning a different policy**. An agent trained with over-disclosing users learns to expect information upfront; deploy it with real users who provide information incrementally, and it fails.

The paper provides a cost-fidelity frontier showing which simulators are dominated:

| Simulator | UFS | Cost/sim | Status |
|-----------|-----|----------|--------|
| Gemini-3.5-Flash | .864 | $0.056 | Efficient frontier |
| Gemma-31B | .845 | $0.018 | Efficient frontier |
| GPT-4.1-mini | .752 | $0.006 | Efficient frontier |
| Sonnet-4-6 | .778 | $0.184 | Dominated (Gemma is cheaper and higher-fidelity) |
| Qwen3.6-35B | .612 | $0.025 | Dominated |

## Non-collaborative users: the missing mode

Most simulators are trained or prompted to be helpful—they want the task to succeed. Real users aren't always cooperative.

[Xu et al. (2025)](https://arxiv.org/abs/2509.23124) study **non-collaborative user behavior**: users who provide incomplete information, change their minds, express frustration, or actively test the agent. They find that:

1. Standard simulators almost never exhibit non-collaborative behavior even when instructed.
2. Agent performance drops substantially when facing non-collaborative users.
3. The gap reveals brittleness that cooperative evaluation misses.

This has direct implications for RL. Training on cooperative simulators may produce agents that can't handle:
- Users who don't answer questions directly
- Users who provide conflicting information
- Users who express frustration and expect acknowledgment
- Users who test agent boundaries

## How noisy simulators corrupt RL rewards

When user simulation noise is random, its effect on RL is straightforward: variance increases, more rollouts are needed for the same gradient quality.

But simulator noise isn't random—it's systematically biased toward cooperation. This means:

1. **Reward overestimation.** Agents receive credit for outcomes that required the simulator's cooperation, not just their own skill.
2. **Policy distortion.** The agent learns behaviors that work with cooperative simulators but fail with real users.
3. **Capability masking.** Agents never learn to handle challenging user behaviors because they never encounter them in training.

AReaL-SEA (Gao et al., 2026) addresses this for tool-use agents by **fine-tuning the user model before RL**:

> "We find that off-the-shelf open-weight models struggle to simulate reliable user behavior in tool-using settings... We therefore first fine-tune the user model on synthetic dialogues generated by AReaL-SEA."

Their fine-tuned user model correctly follows instructions and communicates appropriately, leading to successful task completion where the base model failed due to erroneous tool calls and ignored instructions.

## A practitioner checklist for user simulators in RL

Based on the literature, here's what to audit before using a user simulator for training or high-stakes evaluation:

### Fidelity scoring

| Check | Method | Red flag |
|-------|--------|----------|
| Information timing | Compare when identifiers appear vs. when agent requests them | >30% of turns have premature disclosure |
| Behavioral diversity | Measure politeness/verbosity distributions vs. human baseline | Kolmogorov-Smirnov p < 0.05 vs. humans |
| Error reaction | Sample agent failure cases; check for pushback, frustration | <10% of error cases show realistic reaction |
| Tool use fidelity | For dual-control: compare user tool calls vs. gold actions | >10% missing or extra tool calls |

### Human validation slices

Even with high-fidelity simulators, validate on a human slice:

```python
def validation_slice_protocol(benchmark_tasks, human_budget=50):
    """Select tasks for human validation."""
    # Stratify by: domain, difficulty, expected turns
    strata = stratify(benchmark_tasks, by=["domain", "difficulty_bin", "turns_bin"])
    
    # Oversample disagreement: tasks where simulator pass rate is near 50%
    uncertain_tasks = [t for t in benchmark_tasks if 0.3 < t.simulator_pass_rate < 0.7]
    
    slice = []
    for stratum in strata:
        slice.extend(sample(stratum, n=human_budget // len(strata)))
    
    # Add uncertain tasks
    slice.extend(sample(uncertain_tasks, n=human_budget // 5))
    
    return deduplicate(slice)
```

### Persona and behavior coverage

Test that your simulator can produce:

- **Impatient users** who want quick resolution
- **Verbose users** who provide excess context
- **Uncertain users** who need clarification of their own goals
- **Non-collaborative users** who don't answer directly
- **Technical vs. non-technical users** with different communication styles

### Constraining simulators with tools and state

Following τ²-bench's insight, consider:

1. **User tools** that force structured responses instead of free-form text.
2. **Observable state** that constrains what the user can plausibly know.
3. **Action validation** that rejects impossible or inconsistent user actions.

Telecom's 16% error rate vs. retail's 40% shows this works.

## A table of failure modes and mitigations

| Failure mode | Detection | Mitigation |
|-------------|-----------|------------|
| **Premature disclosure** | Track when identifiers appear vs. when requested | Prompt engineering to wait; fine-tune on human turn timing |
| **Missing pushback** | Sample error cases, check for frustration markers | Add non-collaborative personas; include explicit pushback examples in fine-tuning |
| **Over-cooperation** | Compare agent tool call counts with cooperative vs. human users | Train with mixed cooperative/non-cooperative users |
| **Uniform style** | Measure distribution of politeness/verbosity | Add diverse personas; sample temperature for variation |
| **Tool misuse** (dual-control) | Compare user tool calls to gold | Constrain user tools; validate with state assertions |
| **Spec violation** | Check adherence to private instructions | Add instruction-following reward; use rubric-based judging |

## Expert-written scenarios and human validation

The literature consistently shows that **human validation changes conclusions**. Zhou et al.'s finding that simulators create "easy mode" would be invisible without the 451-participant human study.

For high-stakes RL training:

1. **Collect a human trajectory corpus** for your task domain—even a few hundred trajectories provides calibration.
2. **Fine-tune or select your simulator** based on measured fidelity to that corpus, not based on general model capability.
3. **Run periodic human validation** during training, not just at evaluation time.
4. **Report simulator fidelity** alongside task performance, so readers can assess what the results mean for real users.

## How Anthroly can help

Building reliable user simulation for agent RL requires the same expertise as building [training-grade RL environments](/blog/what-makes-a-training-grade-rl-environment): careful task design, verifier validation, and human calibration.

Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, provides:

- **Human interaction corpora** for benchmark slices, enabling simulator fidelity measurement and calibration
- **Persona libraries** with realistic behavior variation across technical skill, patience, communication style
- **User-tool environments** for dual-control settings where user actions must be structured and validated
- **Gold-standard trajectories** for fine-tuning reliable user models (following the AReaL-SEA approach)
- **Non-collaborative user scenarios** to stress-test agent robustness

This is the same work behind [building contamination-resistant benchmarks](/blog/building-contamination-resistant-agent-benchmarks) and [collecting computer-use agent trajectories](/blog/how-to-collect-computer-use-agent-trajectory-data).

If your agent benchmarks or RL environments depend on user simulators you haven't validated against humans, [book 15 minutes to discuss fidelity measurement and human calibration](https://cal.com/sarath-kavuru-0uizws/15min).

---

## References

1. Yao, S., Shinn, N., Razavi, P., & Narasimhan, K. (2024). [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045). ICLR 2025. arXiv:2406.12045.

2. Barres, V., Dong, H., Ray, S., Si, X., & Narasimhan, K. (2025). [τ²-Bench: Evaluating Conversational Agents in a Dual-Control Environment](https://arxiv.org/abs/2506.07982). ICML 2026. arXiv:2506.07982.

3. Zhou, X., Sun, W., Ma, Q., et al. (2026). [Mind the Sim2Real Gap in User Simulation for Agentic Tasks](https://arxiv.org/abs/2603.11245). COLM 2026. arXiv:2603.11245.

4. Jain, A., & Sandhu, A. (2026). [UserProxyBench: Evaluating LLM User Simulators for Agent Benchmarks and Training](https://arxiv.org/abs/2609.38043). arXiv:2609.38043.

5. Xu, S., et al. (2025). [Non-Collaborative User Simulators for Conversational Agents](https://arxiv.org/abs/2509.23124). arXiv:2509.23124.

6. Gao, J., Chen, J., He, C., Xu, S., Jin, D., & Wu, Y. (2026). [From Self-Evolving Synthetic Data to Verifiable-Reward RL: Post-Training Multi-turn Interactive Tool-Using Agents](https://arxiv.org/abs/2601.22607). arXiv:2601.22607.

7. Li, Z., et al. (2026). [Proxy State-Based Evaluation for Conversational Agents](https://arxiv.org/abs/2602.16246). arXiv:2602.16246.
