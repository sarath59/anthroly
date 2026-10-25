---
title: "How Are Tool-Use RL Environments Built? Simulated APIs, Real MCP Servers, and State-Based Verifiers"
description: "Tool-use agents are trained in environments made of a state, a set of tools, a task and a verifier. Here is how recent systems (Kimi K2, DeepSeek-V3.2, AgentScaler, Toucan, EnvFactory, AgentMercury, MCPMark) build each part, the tradeoffs between real MCP servers, LLM-simulated tools and executable synthetic worlds, how to write the reward, and the failure modes that waste RL compute."
tags:
  - rl-environments
  - tool-use-agents
  - mcp
  - agentic-rl
  - verifiers
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-25T04:40:00.000Z'
updatedAt: '2026-10-25T04:40:00.000Z'
faq:
  - question: "What is a tool-use RL environment?"
    answer: "It is an executable setting in which a language-model agent calls tools (functions, APIs or MCP servers) over several turns and receives a reward at the end. In practice it is a tuple of a state (usually a database), a set of tools that read or write that state, a task instruction, and a verifier that checks the outcome. DeepSeek-V3.2 describes its synthetic agent data as exactly this: environment, tools, task, verifier tuples."
  - question: "Should I train agents on real MCP servers or simulated tools?"
    answer: "Each has a cost. Real servers give authentic behavior but are slow, rate-limited, sometimes need credentials, and return changing data; Toucan kept only 871 of about 2,800 crawled MCP servers after requiring remote access and no third-party credentials. LLM-simulated tools scale cheaply but can hallucinate. Executable synthetic environments (code plus a database) are deterministic and checkable, which is why most recent RL pipelines use them, often with real sandboxes kept for coding and search."
  - question: "How do you compute the reward in a tool-use environment?"
    answer: "The most reliable signal is to compare the final environment state with an expected goal state, as tau-bench does with its database. Because several tool sequences can be equally valid, EnvFactory combines a state-equivalence reward with a trajectory-matching reward and a length penalty; in its ablation, either component alone performed worse than a balanced mix. Rubric-based LLM judges are used where outcomes cannot be checked programmatically."
  - question: "How many environments do you need to train a tool-use agent?"
    answer: "Fewer than many people assume, if they are well built. EnvFactory reports gains of up to 15% on BFCLv3 using 85 verified environments, against prior work that used about five times more, and Environment Tuning trained on 400 BFCL problem instances. At the other end, DeepSeek-V3.2 used 1,827 synthesized environments and AgentMercury 4,783. Verification quality and difficulty matter more than raw count."
  - question: "Do agents trained on synthetic tool environments generalize to real benchmarks?"
    answer: "The evidence so far is positive. DeepSeek-V3.2 reports that RL only on synthetic general-agent tasks improved Tau2-Bench, MCP-Mark and MCP-Universe, while RL only on code and search did not. CodeGym raised Qwen2.5-32B-Instruct by 8.7 points on tau-bench, and AgentMercury-trained policies improved on benchmarks that were not used to build the environments."
  - question: "How does Anthroly help build tool-use RL environments?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, designs realistic initial states, writes tasks with unambiguous goal states, writes and audits verification scripts, and red-teams environments for shortcuts before they are used for RL or evaluation."
draft: false
---

**Every frontier lab now trains agents that call tools: search, code execution, calendars, databases, ticketing systems, and anything else exposed through an API or a Model Context Protocol (MCP) server. The training happens inside RL environments, and the environment, more than the algorithm, sets what the agent can learn. Over the past year a wave of technical reports (Kimi K2, DeepSeek-V3.2) and papers (AgentScaler, Toucan, EnvFactory, AgentMercury, COVERT, MCPMark) described how these environments are actually built. This post pulls that evidence together: what a tool-use environment consists of, the three ways to back the tools, how tasks are made verifiable, how to write the reward, the failure modes that waste compute, and what hand-built environments cost compared with synthetic ones.**

## What is a tool-use RL environment, concretely?

Strip away the framework names and nearly every system in this post builds the same four things:

1. **A state.** Usually a database (users, orders, files, tickets) plus anything else the tools can observe or change.
2. **Tools.** Functions with schemas. AgentScaler ([Fang et al., 2025](https://arxiv.org/abs/2509.13311)) makes the useful observation that any function call can be treated as a read or a write over an underlying database $\mathcal{D}$: read tools query it, write tools cause state transitions.
3. **A task.** A user instruction, sometimes delivered by a simulated user over several turns.
4. **A verifier.** Code that decides whether the episode succeeded.

DeepSeek-V3.2 ([DeepSeek-AI, 2025](https://arxiv.org/abs/2512.02556)) names the training unit explicitly as an $\langle \text{environment}, \text{tools}, \text{task}, \text{verifier} \rangle$ tuple. Formally, an episode is a sequence of tool calls $a_1, \dots, a_T$ that moves the state from $s_0$ to $s_T$, and the reward is a function of the final state and, optionally, the trajectory:

$$
s_{t+1} = f(s_t, a_t), \qquad R = V\big(s_T, \tau\big), \quad \tau = (a_1, o_1, \dots, a_T, o_T)
$$

The benchmark that set the pattern, tau-bench ([Yao et al., 2024](https://arxiv.org/abs/2406.12045)), grades by comparing "the database state at the end of a conversation with the annotated goal state." It deliberately writes user instructions so that "only one possible outcome" is allowed under the domain policy. That design choice, trading slow careful task annotation for fast faithful grading, is the core idea most training environments inherit.

## Real servers, simulated tools, or executable synthetic worlds?

The biggest architectural decision is what actually answers a tool call. There are three options, and recent systems mix them.

| Backing | How it works | Strengths | Weaknesses | Examples |
|---|---|---|---|---|
| Real APIs / MCP servers | Tool calls hit live services | Authentic schemas, errors and data | Latency, rate limits, credentials, data that changes over time, hard to reset state | Toucan, MCP-Universe, MCPMark; search and code in DeepSeek-V3.2 |
| LLM-simulated tools | A model plays the tool and returns plausible outputs | Unlimited breadth, cheap to add tools | Hallucinated or inconsistent outputs, hard to verify | Kimi K2 tool simulator, SynthAgent mock tools |
| Executable synthetic environments | Generated code implements tools over a generated database | Deterministic, resettable, verifiable by state checks | Generation bugs, narrower realism, cost of validating each environment | DeepSeek-V3.2 general agent, AgentScaler, EnvFactory, AgentMercury, CodeGym |

**Real servers are scarcer than they look.** Toucan ([Xu et al., 2025](https://arxiv.org/abs/2510.01179)), the largest open tool-agentic dataset at 1.5 million trajectories, started from a crawl of about 2,800 MCP servers on GitHub and Smithery. Keeping only remote servers reachable over streamable HTTP and dropping those that need third-party credentials left 871 servers (30.6%), and the final dataset draws on 495 servers with more than 2,000 tools. That is an SFT dataset; for RL you also need repeatable state, which live services rarely give you. MCP-Universe ([Luo et al., 2025](https://arxiv.org/abs/2508.14704)) had to add "dynamic evaluators that automatically retrieve real-time ground truth" because answers about live data change.

**Simulation buys breadth.** Kimi K2 ([Kimi Team, 2025](https://arxiv.org/abs/2507.20534)) fetched more than 3,000 real MCP tools and evolved over 20,000 synthetic tools, then used a tool simulator that "maintains and updates state after each tool execution" and "introduces controlled stochasticity" to produce partial failures and edge cases. The report is candid about the limit: "we acknowledge the inherent limitation of simulation fidelity," and it complements simulation with real execution sandboxes (Kubernetes, over 10,000 concurrent instances) for coding and software engineering.

**Executable synthesis is where RL has moved.** EnvFactory ([Xu et al., 2026](https://arxiv.org/abs/2605.18703)) summarizes the tension: production environments are "costly to scale" and network latency destabilizes RL, while simulated environments are prone to hallucination. Its answer, like DeepSeek-V3.2's and AgentScaler's, is to generate the database and the tool code, then test them before any agent sees them.

## How do you synthesize tasks that are hard but verifiable?

The recipes differ in detail but share a principle stated plainly in the DeepSeek-V3.2 report: tasks should be "hard to solve but easy to verify."

**DeepSeek-V3.2: grow the task until it is hard, keep the verifier in lockstep.** Given a task category and a sandbox with bash and search, an environment-synthesis agent populates a database, writes task-specific tools as functions, then proposes a simple task with a solution function and a verification function in Python. Two details are worth copying:

- The solution function may only call tool functions or do logic; it "cannot call other functions or directly access the database," so the task is solvable only through the tool interface.
- The agent iteratively raises difficulty, updating the solution and verifier (and adding tools if needed) at each step.

They then ran RL and kept only instances with non-zero pass@100, ending with 1,827 environments and 4,417 tasks. On 50 sampled tasks, pass@1 was 12% for DeepSeek-V3.2-Exp, 34% for Sonnet-4.5, 51% for Gemini-3.0 Pro and 62% for GPT-5-Thinking. That is a well-placed difficulty band: hard enough to produce signal, not so hard that every group is all-zero (the arithmetic of zero-signal groups is in our post on [choosing RLVR prompts](/blog/how-to-choose-prompts-for-rlvr-training)).

**AgentScaler: cluster real APIs into domains, then build a database per domain.** It collected more than 30,000 APIs (ToolBench, APIGen and an internal repository), built a tool dependency graph, and used Louvain community detection to get over 1,000 domains. Each domain gets a generated database schema and Python implementations of its tools. Tasks come from sampling valid tool sequences on the dependency graph and executing them against the database, which yields two checks: final database state and exact tool-sequence match. The authors note that for tau-bench domains their generated schemas were highly consistent with the official implementations on manual inspection.

**EnvFactory: test the environment before you trust it.** A search agent proposes scenarios grounded in real online resources, a code agent implements the database and tools, and a test agent validates four things: interfaces match metadata, tools import and execute, results match expected behavior, and "database states transition correctly after tool invocation." Failures produce an error report and a rebuild. The output is small: 85 verified environments with 842 tools across seven domains, and 2,575 trajectories (1,622 SFT, 953 RL).

**AgentMercury: build the world first, let tasks emerge.** Instead of one environment per task, AgentMercury ([Jeong and Yoon, 2026](https://arxiv.org/abs/2608.20634)) instantiates a persistent business world (entities, services, tools, state) with "executable cross-service invariants," then derives tasks and grading specifications from it. It built 4,783 environments across 14 industries and 50 countries. Its failure analysis is the most useful part for anyone generating environments with a frontier model: the dominant authoring error was placing both sides of a cross-service constraint inside one service. GPT-5.4 made this mistake on 10 of 30 held-out briefs. Such errors are "syntactically complete and superficially plausible" and only show up under executable validation.

## How should the reward be written?

Three families of reward exist, and the strongest systems combine them.

**State-based.** Compare $s_T$ against the goal state. This is robust to paraphrase and ordering, and it is what tau-bench and MCPMark use. MCPMark ([Wu et al., 2025](https://arxiv.org/abs/2509.24002)) pairs each of its 127 tasks with a curated initial state and a programmatic verification script.

**Trajectory-based.** Compare the agent's tool calls to a reference sequence. Useful for read-only tasks where the state does not change, but brittle when several sequences are valid.

**Rubric or judge-based.** An LLM judge scores the trajectory against criteria. Kimi K2 pairs each synthetic task with a rubric of "success criteria, expected tool-use patterns, and evaluation checkpoints," and SynthAgent ([Lyu et al., 2026](https://arxiv.org/abs/2601.22511)) builds task-level rubrics from required subgoals, user-agent interactions and forbidden behaviors, extracted from real execution traces rather than written freehand.

EnvFactory gives a clean formulation of the combination. Because "independent read-only tool calls may be invoked in different orders, and parameters such as limit may vary across equally valid executions," it uses:

$$
R = \alpha \, R_{\text{traj}} + (1 - \alpha) \, R_{\text{state}} - \gamma \, P_{\text{length}}
$$

In its BFCL ablation over $\alpha \in \{0, 0.3, 0.5, 0.7, 1.0\}$, pure state reward ($\alpha = 0$) and pure trajectory matching ($\alpha = 1$) both did worse than a balanced mix, with $\alpha = 0.5$ giving the best peak accuracy (41.38%). EnvFactory also masks arguments whose values do not affect correctness, so the trajectory term does not punish harmless variation.

Here is a minimal state-diff verifier in the same spirit. It ignores fields that legitimately vary (timestamps, generated IDs) and treats tables as unordered sets of rows:

```python
from typing import Any

VOLATILE = {"updated_at", "created_at", "request_id"}

def normalize(rows: list[dict[str, Any]]) -> set[tuple]:
    """Order-insensitive view of a table, dropping volatile fields."""
    return {
        tuple(sorted((k, v) for k, v in r.items() if k not in VOLATILE))
        for r in rows
    }

def state_reward(final: dict, goal: dict, touched: set[str]) -> float:
    """1.0 if every table matches the goal state, else 0.0.
    `touched` lists tables the task may change; all others must be unchanged too."""
    for table in goal:
        if normalize(final.get(table, [])) != normalize(goal[table]):
            return 0.0
    extra = set(final) - set(goal)
    return 0.0 if extra & touched else 1.0
```

The important line is the last one: a verifier that only checks the target rows will reward an agent that also deletes or edits unrelated records. Checking that untouched tables are unchanged is cheap insurance against collateral damage being rewarded.

## Which failure modes waste the most RL compute?

**Over-specified instructions.** Synthetic tasks are often written as step lists so that generators can solve them. EnvFactory calls these "rigid instruction lists" and adds a refinement stage that injects implicit references and ambiguity; in a 250-trajectory comparison, refined data beat unrefined data, most clearly on the Miss-Func and Miss-Param settings where the agent must notice that something is missing. SynthAgent goes further and deliberately rewrites tasks to be underspecified so the agent has to ask the user.

**Shortcuts around the tool interface.** If the reference solution can read the database directly, the task may be solvable without the tools you meant to train. DeepSeek-V3.2's rule that the solution function can only call tools is a direct guard against this. For a broader catalogue of verifier loopholes, see [how reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)

**Simulator drift and noise.** LLM-simulated tools can return outputs that contradict earlier state. Simulated users are a second noise source: the AReaL-SEA work ([Gao et al., 2026](https://arxiv.org/abs/2601.22607)) found off-the-shelf open models "struggle to simulate reliable user behavior in tool-using settings" and fine-tuned the user model before RL, reaching 73.0% pass^1 on tau2-bench Airline. We covered user simulators in depth in [are LLM user simulators good enough to train and evaluate tool-use agents?](/blog/are-llm-user-simulators-reliable-for-agent-rl)

**Clean tool outputs only.** Real tools time out, return errors, or return the wrong format. COVERT ([Xu et al., 2026](https://arxiv.org/abs/2604.09813)) adds distractor tools, indirect queries and noisy or erroneous outputs while preserving the oracle tool calls and answers, so rewards stay checkable. On Qwen2.5-Instruct-14B, RL on these environments moved BFCL v3 from 56.5 to 59.9 and ACEBench from 53.0 to 59.3.

**Benchmark-shaped training worlds.** Environments built around a target benchmark teach that benchmark. AgentMercury generated its worlds from business scenarios independently of evaluation tasks and still reports gains on held-out suites, which is the stronger evidence of transfer.

## How hard are realistic tool-use tasks today?

Hand-built MCP benchmarks show how far agents still are from reliable. On MCP-Universe (231 tasks over 11 real MCP servers), the authors report GPT-5 at 43.72% success, Grok-4 at 33.33% and Claude-4.0-Sonnet at 29.44%. On MCPMark, the best model (gpt-5-medium) reached 52.56% pass@1 but only 33.86% pass^4, and tasks averaged 16.2 turns and 17.4 tool calls. The pass^4 gap is the number to watch for training: an agent that succeeds once in four tries is not one you can deploy.

## What does a hand-built environment cost compared with a synthetic one?

MCPMark is unusually transparent. Ten experts (computer science PhD students, front-end designers, full-stack and AI infrastructure engineers, and AI investors) built the tasks with agent assistance, and "each task takes 3 to 5 hours of focused expert effort." Instructions average 288.6 words and verification scripts average 209.8 lines of code. By simple arithmetic, 127 tasks at 3 to 5 hours each is roughly 380 to 640 expert hours for the benchmark.

Synthetic pipelines produce thousands of environments for the cost of compute, so why pay for hand-built ones? Three reasons from the evidence above:

- **Quality beats count.** EnvFactory's 85 verified environments outperformed concurrent work using about five times more, and its own scaling curve (50, 75, 85 environments) still rose with each addition, so verified breadth helps. Environment Tuning ([Lu et al., 2025](https://arxiv.org/abs/2510.10197)) learned from just 400 BFCL problem instances, and notes that the BFCL V3 multi-turn set has only 800 samples in total.
- **Generators make structural errors that look plausible.** AgentMercury's cross-service invariant failures are exactly the kind of bug an experienced engineer catches in review and an LLM authoring loop does not.
- **Evaluation needs independence.** Synthetic environments are excellent for training, but the held-out tasks you use to decide whether training worked should come from a different process, ideally humans with domain knowledge, so that generator blind spots do not show up in both train and test.

## Does training on synthetic tool environments transfer?

So far, yes. DeepSeek-V3.2 ran RL on only its synthetic general-agent tasks and saw large gains over the SFT checkpoint on Tau2Bench, MCP-Mark and MCP-Universe, while RL restricted to code and search did not improve those benchmarks. CodeGym ([Du et al., 2025](https://arxiv.org/abs/2509.17325)) turned coding problems into multi-turn tool environments and raised Qwen2.5-32B-Instruct by 8.7 points on out-of-distribution tau-bench. AgentMercury moved Qwen3.5-4B from 12.3 to 15.7 on EnterpriseOps-GYM. A contrarian alternative also deserves mention: EnvACE ([Xu et al., 2026](https://arxiv.org/abs/2608.06197)) has the policy itself predict tool responses ("world rehearsal") instead of calling external environments during training, and reports that it outperforms environment-scaling baselines overall across BFCL-v4, tau2-Bench, VitaBench and FinMCP-Bench. If that line holds up, the scarce resource shifts even further from environment count to the quality of the tasks and rewards.

## A build checklist

| Stage | What to do | Evidence |
|---|---|---|
| State | Seed realistic, varied initial states, not empty databases | MCPMark curated 38 initial states from real templates and repositories |
| Tools | Generate code over the state; test interfaces, execution and state transitions | EnvFactory test agent |
| Tasks | Restrict reference solutions to the tool interface; raise difficulty iteratively | DeepSeek-V3.2 |
| Instructions | Remove step lists; add implicit references and missing information | EnvFactory refinement, SynthAgent |
| Reward | State equivalence plus tolerant trajectory matching; check untouched state | tau-bench, EnvFactory |
| Robustness | Add distractor tools, errors and noisy outputs with oracle preserved | COVERT |
| Filtering | Drop tasks with zero pass rate across many samples | DeepSeek-V3.2 non-zero pass@100 |
| Evaluation | Hold out human-built tasks from a separate process; report pass^k | MCPMark, tau-bench |

## How Anthroly can help

Synthetic pipelines have made environment count cheap. What stays expensive is the part every paper above spends its effort on: realistic initial states, tasks with one defensible goal state, verification scripts that catch collateral damage, and an independent check that the environment cannot be gamed.

Anthroly builds RL environments and expert data for AI labs. We have about 100-150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains, including engineers who build and review tool-use and MCP environments. We design domain-faithful states, write and audit verifiers, red-team tasks for shortcuts, and produce held-out evaluation sets with pass^k reporting. The standards are the ones we describe in [what makes an RL environment training-grade](/blog/what-makes-a-training-grade-rl-environment).

If you are scaling tool-use RL and want environments you can trust, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How are software-engineering RL environments built?](/blog/how-software-engineering-rl-environments-are-built)
- [Are LLM user simulators good enough to train and evaluate tool-use agents?](/blog/are-llm-user-simulators-reliable-for-agent-rl)
- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [How do you collect training data for computer-use agents?](/blog/how-to-collect-computer-use-agent-trajectory-data)
- [Generative vs scalar reward models](/blog/generative-reward-models-vs-scalar-reward-models)

---

## References

1. Yao, S., Shinn, N., Razavi, P., & Narasimhan, K. (2024). [tau-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045). arXiv:2406.12045.

2. Kimi Team (2025). [Kimi K2: Open Agentic Intelligence](https://arxiv.org/abs/2507.20534). arXiv:2507.20534.

3. DeepSeek-AI (2025). [DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models](https://arxiv.org/abs/2512.02556). arXiv:2512.02556.

4. Fang, R., et al. (2025). [Towards General Agentic Intelligence via Environment Scaling](https://arxiv.org/abs/2509.13311). arXiv:2509.13311.

5. Xu, Z., et al. (2025). [TOUCAN: Synthesizing 1.5M Tool-Agentic Data from Real-World MCP Environments](https://arxiv.org/abs/2510.01179). arXiv:2510.01179.

6. Luo, Z., et al. (2025). [MCP-Universe: Benchmarking Large Language Models with Real-World Model Context Protocol Servers](https://arxiv.org/abs/2508.14704). arXiv:2508.14704.

7. Wu, Z., et al. (2025). [MCPMark: A Benchmark for Stress-Testing Realistic and Comprehensive MCP Use](https://arxiv.org/abs/2509.24002). arXiv:2509.24002.

8. Xu, M., Wang, Z., Deng, M., Li, Z., Yang, Z., et al. (2026). [EnvFactory: Scaling Tool-Use Agents via Executable Environments Synthesis and Robust RL](https://arxiv.org/abs/2605.18703). arXiv:2605.18703.

9. Jeong, M., & Yoon, C. (2026). [AgentMercury: Your Agent Can Synthesize Verifiable Environments for Business Scenarios at scale](https://arxiv.org/abs/2608.20634). arXiv:2608.20634.

10. Xu, S., Li, S., Liu, X., Liu, T., Li, Y., et al. (2026). [Controllable and Verifiable Tool-Use Data Synthesis for Agentic Reinforcement Learning](https://arxiv.org/abs/2604.09813). arXiv:2604.09813.

11. Lyu, Y., Wang, C., Shen, L., Huang, J., & Xu, T. (2026). [Mock Worlds, Real Skills: Building Small Agentic Language Models with Synthetic Tasks, Simulated Environments, and Rubric-Based Rewards](https://arxiv.org/abs/2601.22511). arXiv:2601.22511.

12. Gao, J., Chen, J., He, C., Xu, S., Jin, D., & Wu, Y. (2026). [From Self-Evolving Synthetic Data to Verifiable-Reward RL: Post-Training Multi-turn Interactive Tool-Using Agents](https://arxiv.org/abs/2601.22607). arXiv:2601.22607.

13. Lu, S., et al. (2025). [Don't Just Fine-tune the Agent, Tune the Environment](https://arxiv.org/abs/2510.10197). arXiv:2510.10197.

14. Du, W., Gong, H., Ling, Z., Liu, K., Shen, L., et al. (2025). [Generalizable End-to-End Tool-Use RL with Synthetic CodeGym](https://arxiv.org/abs/2509.17325). arXiv:2509.17325.

15. Xu, Z., Yao, Z., Chen, Y., Guo, Y., Lu, Z., et al. (2026). [EnvACE: Internalizing Environment Dynamics via World Rehearsal for Agentic Reinforcement Learning](https://arxiv.org/abs/2608.06197). arXiv:2608.06197.
