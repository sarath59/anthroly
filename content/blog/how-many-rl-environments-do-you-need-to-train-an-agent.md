---
title: "How Many RL Environments Do You Need to Train a General Agent?"
description: "Environment count, not data volume, is the axis that moves out-of-distribution agent performance, but the curve is noisy, saturates, and is easy to fake with environments that overlap your evals. Here is what AWM, RLVE, ReSyn, EnvScaler, EnvFactory, SWE-smith, R2E-Gym, Kimi K2 and Procgen actually show, how synthetic and hand-built environments trade off, and a practical framework for sizing an environment portfolio."
tags:
  - rl-environments
  - agents
  - agentic-rl
  - tool-use
  - contamination
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-27T04:30:00.000Z'
updatedAt: '2026-10-27T04:30:00.000Z'
faq:
  - question: "How many RL environments do you need to train a general agent?"
    answer: "There is no single number, but the published curves agree on the shape. Agent World Model (Wang et al., 2026) found that training on 10 synthetic tool-use environments caused severe degradation, 100 gave substantial gains, and 526 kept improving. EnvScaler (Song et al., 2026) saw the steepest gain from 0 to 20 environments, and EnvFactory (Xu et al., 2026) saw diminishing returns between 75 and 85. For tool-use agents, tens of environments is the floor where generalization starts, low hundreds is where most open results sit, and beyond that gains depend on whether new environments add genuinely new task structure."
  - question: "Is environment diversity more important than more tasks per environment?"
    answer: "Usually yes, once each environment has enough tasks to be learnable. RLVE (Zeng et al., 2025) showed held-out-environment performance improved as training collections grew from 1 to 4 to 16 to 256 environments, and noted that a single procedural environment can already generate unbounded data, so volume alone is not the bottleneck. ReSyn (He et al., 2026) held total data fixed at about 16K instances and found 400 environments with 40 instances each beat both 100 x 160 and 25 x 640 on BBH. Classical RL showed the same thing: CoinRun agents overfit with fewer than 4,000 training levels."
  - question: "Are LLM-generated synthetic environments as good as hand-built ones?"
    answer: "They are good enough to provide breadth, and in specific cases match real data. R2E-Gym (Jain et al., 2025) found models trained on 400 trajectories from synthetic problem statements scored 27.8% pass@1 versus 28.0% for real GitHub issues. But code-backed, database-backed synthetic environments outperformed LLM-simulated ones in Agent World Model, and Kimi K2 complemented its simulated tool environments with real execution sandboxes where authenticity mattered. Hand-built expert environments remain the better source for hard, domain-specific tasks, verifiers, and held-out evaluation."
  - question: "How do environment overlap and contamination distort environment scaling results?"
    answer: "If training environments are generated from, or resemble, the benchmark you report on, gains can reflect overlap rather than generalization. Agent World Model suggested EnvScaler's tau2-bench results may benefit from synthesis based on existing tasks that overlap that benchmark, and AgentScaler reported its generated tau-bench-domain code was highly consistent with the official implementation. SWE-rebench found some models' SWE-bench Verified scores may be inflated by contamination. Hold out whole environment families, not just tasks, and measure similarity between training and evaluation environments."
  - question: "What does it cost to build RL environments at scale?"
    answer: "Automated pipelines have brought the marginal cost down sharply for some domains. SWE-smith reported building 50k software tasks across 128 repositories for about $1,360 and roughly 20 hours of one author's labor, with 295 GB of environments versus an estimated 50 to 150 TB for an equivalent SWE-bench-style build. The expensive parts that remain are verifiers you can trust, environments for domains without existing code or tests, and held-out evaluation environments that no generator has seen."
  - question: "How does Anthroly help teams build RL environment portfolios?"
    answer: "Anthroly builds expert-designed RL environments, task families, verifiers and held-out evaluation environments for frontier AI labs. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit, which lets a team add genuinely new task structure in specialist domains rather than more near-duplicates of what a generator already produces."
draft: false
---

**Every agent team eventually asks the same budgeting question: should the next quarter go into more environments, more tasks per environment, or more RL compute on what we already have? Through 2025 and 2026 a set of papers finally measured it directly, across tool-use, software engineering and procedurally generated reasoning environments. The answer is consistent enough to plan around, and the caveats are consistent enough to plan around too. This post goes through the evidence, separates breadth from depth, compares synthetic and hand-built environments, shows how overlap with evals inflates the curves, and ends with a practical sizing framework.**

## The short answer

For multi-turn tool-use agents, the published scaling curves say that **around 10 environments is not enough to generalize, tens of environments is where gains start, and low hundreds is where most open results sit, with continued but diminishing gains beyond that.** More tasks inside a fixed set of environments is a weaker lever than more distinct environments, once each environment has enough tasks to be learnable. The number that matters is not the raw count but the count of environments that add *new task structure* relative to what you already have and relative to what you evaluate on. Synthetic generators are the cheapest way to get breadth; expert-built environments are the cheapest way to get the hard, verifiable, uncontaminated tail.

## What do we mean by an "environment"?

Papers use the word at different granularities, and mixing them up is how teams end up comparing 85 against 50,000.

| Unit | Example | What varies between units |
|---|---|---|
| Environment family or domain | "airline customer service", "a Python repository", "a CRM backend" | Tools, state schema, rules, verifier |
| Environment instance | One synthesized MCP server with its database | Tool set and data, within a family |
| Task | One user goal with a success check | Initial state, goal, constraints |
| Level or seed | One procedurally generated configuration | Random parameters of a generator |

In this post "environment" means the second row: a distinct executable world with its own tools, state and rules. Agent World Model counts 1,000 of these with 35,062 tools and 10,000 tasks ([Wang et al., 2026](https://arxiv.org/abs/2602.10090)). SWE-smith's natural unit is the repository: 50k task instances from 128 repositories ([Yang et al., 2025](https://arxiv.org/abs/2504.21798)). Procgen and CoinRun count levels of a single game ([Cobbe et al., 2019](https://arxiv.org/abs/1912.01588); [Cobbe et al., 2018](https://arxiv.org/abs/1812.02341)). When you read a scaling claim, first find out which unit is on the x-axis.

## What does the evidence say about environment count?

The clearest results come from papers that held the training recipe fixed and varied only how many environments the agent saw.

| Study | Setting | Environments compared | Reported effect |
|---|---|---|---|
| [Agent World Model (Wang et al., 2026)](https://arxiv.org/abs/2602.10090) | Synthetic, code- and database-backed tool-use environments, RL | 10, 100, 526 | 10 caused severe degradation, likely overfitting; 100 gave substantial gains; 526 continued to improve |
| [RLVE (Zeng et al., 2025)](https://arxiv.org/abs/2511.07317) | Procedural verifiable reasoning environments, RL | 1, 4, 16, 256 (nested) | More training environments consistently improved accuracy on 50 held-out environments, across all four models |
| [EnvScaler (Song et al., 2026)](https://arxiv.org/abs/2601.05808) | Programmatically synthesized tool environments, SFT ablation | 0 up to 141 | Steady upward trend; most pronounced gain from 0 to 20 environments |
| [EnvFactory (Xu et al., 2026)](https://arxiv.org/abs/2605.18703) | Verified executable tool environments, SFT plus RL | 50, 75, 85 | Consistent BFCL-v3 gains; 50 to 75 gained more than 75 to 85 |
| [SWE-smith (Yang et al., 2025)](https://arxiv.org/abs/2504.21798) | Software repositories, SFT on 700 trajectories | 4 to 100 repositories | Performance rose roughly logarithmically with the number of repositories |
| [CoinRun (Cobbe et al., 2018)](https://arxiv.org/abs/1812.02341) | Procedurally generated game levels, PPO | 100 to 16,000 levels, and unbounded | Substantial overfitting below 4,000 levels; still noticeable at 16,000 |
| [Procgen (Cobbe et al., 2019)](https://arxiv.org/abs/1912.01588) | 16 procedural games, PPO | 100 to 100,000 levels | Agents strongly overfit small training sets; closing the gap needed as many as 10,000 levels |

Three things stand out.

**The curves are monotone but concave.** Every study that varied the count found more was better on held-out evaluation, and the two that report fine enough steps (EnvScaler, EnvFactory) found the marginal gain shrinking. EnvFactory attributes its diminishing returns to later environments containing "more overlapping tool logic or task structures," which is the key to the whole question: returns diminish because *redundancy* grows, not because of some intrinsic ceiling on environment count.

**Too few environments can be worse than none.** Agent World Model's 10-environment run did not just underperform; it degraded. That is the same failure CoinRun documented in 2018: a policy with a small, fixed set of worlds memorizes them.

**Data volume is not a substitute.** RLVE makes the point explicitly: a single procedural environment can already generate an unbounded amount of data, so if volume were the bottleneck, one environment would suffice. It does not. RLVE's joint training across all 400 of its environments gave a 3.37% absolute average improvement across six reasoning benchmarks from a strong 1.5B reasoning model, while continuing that model's original RL training gave 0.49% with more than three times the compute ([Zeng et al., 2025](https://arxiv.org/abs/2511.07317)).

## Is breadth always better than depth?

Not unconditionally. The cleanest controlled experiment is ReSyn's, which held total training data fixed at about 16K instances and traded environments against instances per environment ([He et al., 2026](https://arxiv.org/abs/2602.20117)):

| Environments $N$ | Instances per environment $M$ | BBH mean@4 |
|---|---|---|
| 400 | 40 | 75.19 |
| 100 | 160 | 69.85 |
| 25 | 640 | 71.20 |

The widest configuration won clearly, which supports breadth. But note that 25 environments beat 100. With only three points and one benchmark, this is a reminder that the curve is noisy at the scale most teams operate at, and that *which* environments you have matters as much as how many. A small set that happens to cover the skills your evaluation stresses can beat a larger set that does not.

Depth also matters inside each environment for a mechanical reason: RL needs tasks at the edge of the policy's ability. RLVE's central contribution is that each environment adapts its difficulty distribution to the policy, because static distributions produce vanishing learning signal when problems are too easy or too hard ([Zeng et al., 2025](https://arxiv.org/abs/2511.07317)). An environment with only a handful of tasks at one difficulty is spent after a few epochs. So the practical rule is: enough depth per environment to keep a live difficulty band through training, then spend the remaining budget on breadth.

A simple way to see why breadth dominates once depth is sufficient: suppose deployment draws tasks from skill families $s$ with frequencies $p_s$, and your training set covers a set $S$ of families. A crude upper bound on how much of the deployment distribution has seen *any* training signal is the covered mass

$$
C(S) = \sum_{s \in S} p_s .
$$

Adding tasks to an environment whose families are already in $S$ does not change $C(S)$ at all; it only sharpens skills you already train. Adding an environment that introduces a new family $s'$ raises it by $p_{s'}$. Coverage is not competence, but competence on a family you never trained is the thing environment scaling papers are measuring when they report held-out gains.

## Do environment counts matter for software-engineering agents too?

The software-engineering line of work grew along the same axis, and it shows the shift from hand-curated to generated environments clearly.

- [SWE-Gym (Pan et al., 2024)](https://arxiv.org/abs/2412.21139) offered 2,438 real Python task instances with executable runtimes and unit tests, and found training performance still scaling at its limit of 491 sampled trajectories, which the authors read as being limited by sampling compute rather than the number of tasks.
- [R2E-Gym (Jain et al., 2025)](https://arxiv.org/abs/2504.07164) built more than 8,000 executable problems procedurally from commits, using test generation and back-translation instead of human-written issues, and decontaminated it by removing repositories that overlap the SWE-Bench test set.
- [SWE-smith (Yang et al., 2025)](https://arxiv.org/abs/2504.21798) generated 50k instances from 128 repositories and found the roughly logarithmic gain with repository count shown above.
- [Skywork-SWE (Zeng et al., 2025)](https://arxiv.org/abs/2506.19290) curated 10,169 task instances from 2,531 repositories and reported performance continuing to improve with data size without signs of saturation.
- [SWE-rebench (Badertdinov et al., 2025)](https://arxiv.org/abs/2505.20411) built an automated pipeline producing over 21,000 interactive tasks and a continuously refreshed benchmark.

The specialization result in SWE-smith is worth keeping in mind for portfolio design: models trained to specialize on one repository (SymPy) did better on that repository with only minor generalization loss. Depth on a target domain and breadth for generality are not exclusive, but they come from different parts of the budget. We cover how these SWE environments are actually constructed in [how software-engineering RL environments are built](/blog/how-software-engineering-rl-environments-are-built).

## Synthetic, LLM-generated or hand-built: which environments should you scale?

There are three broad ways to get more environments, and the evidence separates them.

| Source | Examples | Strength | Main risk |
|---|---|---|---|
| LLM-simulated (the model plays the environment) | The "Simulator" baseline in AWM; Kimi K2's tool simulator | Cheapest breadth; any domain | State inconsistency and hallucinated observations |
| Code-backed synthetic (generated programs and databases) | AWM, EnvScaler, AgentScaler, EnvFactory, CodeGym, SWE-smith, R2E-Gym | Executable, resettable, verifiable state | Generator priors limit novelty; overlap with benchmarks |
| Hand-built or expert-built | tau-bench domains, RLVE-Gym, curated SWE tasks | Rules, edge cases and verifiers you can trust; domain depth | Cost per environment; slower to scale |

**Code beats simulation for state.** Agent World Model compared its database-backed environments against an LLM-simulated variant and found the programmatic version ahead, consistently so on tau2-bench, which the authors read as programming-based state consistency giving a more stable learning signal ([Wang et al., 2026](https://arxiv.org/abs/2602.10090)). This matches the [Sim2Real gap for LLM user simulators](/blog/are-llm-user-simulators-reliable-for-agent-rl): anything the model hallucinates becomes part of what the policy learns to exploit.

**Frontier labs mix both.** Kimi K2's post-training pipeline fetched 3,000+ real MCP tools from GitHub, evolved over 20,000 synthetic tools through hierarchical domain generation, generated thousands of distinct agents, and paired each task with an explicit rubric. Its tool executor is a simulator that maintains state, but the report states that simulation fidelity has inherent limits and complements it with real execution sandboxes "where authenticity is crucial, particularly in coding and software engineering tasks" ([Kimi Team, 2025](https://arxiv.org/abs/2507.20534)).

**Synthetic can match real on specific axes.** R2E-Gym trained on 400 trajectories from synthetic problem statements and from real GitHub issues and got 27.8% versus 28.0% pass@1, nearly identical ([Jain et al., 2025](https://arxiv.org/abs/2504.07164)). CodeGym turned coding problems into multi-turn tool-use environments and reported an 8.7-point out-of-distribution gain on tau-bench for Qwen2.5-32B-Instruct ([Du et al., 2025](https://arxiv.org/abs/2509.17325)). AgentScaler collected more than 30,000 APIs, clustered them into more than 1,000 domains with a database schema each, and reported strong function-calling results on tau-bench, tau2-Bench and ACEBench ([Fang et al., 2025](https://arxiv.org/abs/2509.13311)).

**Hand-built is still the reference.** RLVE-Gym's 400 environments were "carefully developed through manual environment engineering," and that is the suite whose scaling curve is cleanest. tau-bench, which most tool-use results report against, is hand-designed: its retail and airline domains pair API tools with policy documents, and success is judged by comparing the final database state to an annotated goal state ([Yao et al., 2024](https://arxiv.org/abs/2406.12045)). When generated environments are good, it is usually because a person designed the generator, the verifier, or the reference they are checked against.

Open frameworks make the breadth side easier to assemble: AgentGym bundles 14 environment types and 89 task types behind one interface ([Xi et al., 2024](https://arxiv.org/abs/2406.04151)), GEM provides baselines across 24 environments ([Liu et al., 2025](https://arxiv.org/abs/2510.01051)), and Reasoning Gym offers over 100 procedural data generators and verifiers ([Stojanovski et al., 2025](https://arxiv.org/abs/2505.24760)).

The honest summary is that generators are good at *breadth of surface* (more tool schemas, more domains, more phrasing) and weaker at *breadth of structure* (new kinds of rules, new failure modes, new verification problems), which is exactly where diminishing returns come from. That is where expert-built environments earn their cost.

## How does overlap with evals inflate environment scaling?

Environment scaling makes contamination easier, not harder, because generators are seeded from the same public material benchmarks are built from. Three examples from the papers above:

- Agent World Model noted that EnvScaler regressed on BFCLv3 and MCP-Universe on average, and suggested its tau2-bench results were plausible "because EnvScaler relies on existing tasks for synthesis that may overlap with" that benchmark ([Wang et al., 2026](https://arxiv.org/abs/2602.10090)).
- AgentScaler reported that when generating database structures and code for tau-bench domains, its outputs showed "a high degree of consistency with the official implementations provided by" tau-bench ([Fang et al., 2025](https://arxiv.org/abs/2509.13311)). That is a strength for realism and a hazard for evaluation.
- SWE-rebench compared models on fresh tasks against SWE-bench Verified and concluded that performance of some models "might be inflated due to contamination issues" ([Badertdinov et al., 2025](https://arxiv.org/abs/2505.20411)).

EnvScaler itself ran a useful check: it split synthetic environments into the 50% most similar and 50% least similar to the BFCL multi-turn test environments by embedding similarity, and found only minor differences between them, suggesting its gains came from transferable skills rather than direct similarity ([Song et al., 2026](https://arxiv.org/abs/2601.05808)). Every environment-scaling claim should come with that analysis. Environment Tuning, for example, trains on 400 problem instances from BFCL and reports both in-distribution and out-of-distribution results ([Lu et al., 2025](https://arxiv.org/abs/2510.10197)); the out-of-distribution number is the one that tells you about generality.

Practical rules:

1. **Hold out whole families.** RLVE's 50 held-out environments are the right design. Held-out tasks inside training environments measure memorization of an environment, not generalization across environments.
2. **Measure train-eval similarity** on tool schemas, state schemas and task text, and report results stratified by similarity, as EnvScaler did.
3. **Keep at least one evaluation suite no generator has seen.** If your generator was prompted with benchmark domains, that benchmark is no longer held out. Our guide to [contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks) covers how to build one.
4. **Report reliability, not just success.** tau-bench's pass^k, the probability that all $k$ i.i.d. trials succeed, exposed that strong function-calling agents were inconsistent (pass^8 below 25% in retail) even when single-trial success looked reasonable ([Yao et al., 2024](https://arxiv.org/abs/2406.12045)). With $n$ trials per task and $c$ successes, the unbiased estimate is

$$
\text{pass}^k = \mathbb{E}_{\text{task}}\left[ \frac{\binom{c}{k}}{\binom{n}{k}} \right].
$$

More environments that teach broad but shallow competence can raise pass@1 while leaving pass^k flat.

## What does an environment actually cost?

Costs fell sharply where code and tests already exist.

- **SWE-smith** reported a total of $1,360 to create 50k instances ($1,000 to generate bugs, $160 for automatic installation, $200 to write issues for 10K bugs), about 20 hours of one author's labor, and 295 GB of environments because tasks from one repository share an image. The authors estimate an equivalent SWE-bench-style build would need 50 to 150 TB ([Yang et al., 2025](https://arxiv.org/abs/2504.21798)).
- **Agent World Model** environments average about 2,000 lines of code each. Using GPT-5 as an RL judge added about $1.80 per training step of at most 1,024 samples ([Wang et al., 2026](https://arxiv.org/abs/2602.10090)).
- **Compute versus parameters.** AgentGym-RL's 7B agent reached roughly 58.6% average success across its environments, above Llama3.1-70B (about 47%) and Qwen2.5-72B (about 43%), which the authors read as post-training and test-time compute having higher scaling potential than model size ([Xi et al., 2025](https://arxiv.org/abs/2509.08755)).

What these numbers leave out is the cost that dominates in practice: environments for domains where no codebase, test suite or public API exists, verifiers that do not have [false negatives or master keys](/blog/how-reliable-are-rlvr-verifiers), and evaluation environments that are guaranteed unseen. A generator can produce a thousand CRM backends in an afternoon. It cannot produce a correct pharmacokinetics simulator, a tax-law rule engine with the right edge cases, or a lab-protocol environment whose success check a chemist would sign off on.

## A practical framework for sizing your environment portfolio

This is our practitioner framework, built on the evidence above rather than measured as a whole. Treat the numbers as starting points to be replaced by your own ablations.

**Step 1: Define the target as task families, not benchmarks.** List the families your agent must handle in deployment (for example: stateful CRUD over business data, policy-constrained customer service, repository-level code edits, multi-hop research, spreadsheet and document manipulation) and estimate rough frequencies $p_s$. This is the denominator for coverage.

**Step 2: Get every family above the "memorization floor."** The evidence says roughly 10 environments in a family is too few to generalize from (AWM, EnvScaler's steepest region from 0 to 20). Aim for tens of distinct environments per important family, each with enough tasks across difficulty levels to keep the pass rate in a learnable band for the whole run (see [how to choose prompts for RLVR training](/blog/how-to-choose-prompts-for-rlvr-training)).

**Step 3: Fill breadth cheaply, then audit for redundancy.** Use code-backed generators for surface breadth. Then cluster environments by tool schema, state schema and verifier type. If new environments land in existing clusters, you are on the flat part of EnvFactory's curve.

**Step 4: Spend expert effort on structure, not surface.** Commission hand-built environments for families where generators produce near-duplicates, where verifiers are hard, or where domain rules matter (regulated, scientific, financial, clinical). These are the environments that add new $p_{s'}$ mass.

**Step 5: Hold out families and measure the curve yourself.** Run the nested-subset ablation the papers ran: train on $\frac{1}{8}$, $\frac{1}{4}$, $\frac{1}{2}$ and all of your environments, evaluate on held-out families, and fit the slope. If the last doubling still pays, keep buying environments; if not, buy depth or compute.

| Stage | Environments per key family | Rough total distinct environments (our heuristic) | What to buy next |
|---|---|---|---|
| Below floor | under ~10 | tens | More distinct environments; expect overfitting otherwise |
| Generalization starting | tens | ~50 to ~200 | Breadth across families; first held-out family evals |
| Diminishing returns | many, with clustering showing overlap | hundreds | Expert-built environments for missing structure; harder verifiers |
| Saturated on breadth | redundancy high | hundreds to 1,000+ | Depth (difficulty curricula), RL compute, reliability (pass^k) |

The ablation in step 5 is cheap to script. A minimal version:

```python
import random, math

def nested_subsets(envs, fracs=(0.125, 0.25, 0.5, 1.0), seed=0):
    rng = random.Random(seed)
    order = envs[:]
    rng.shuffle(order)
    return {f: order[: max(1, int(f * len(order)))] for f in fracs}

def log_slope(points):
    # points: list of (n_envs, heldout_score); least-squares slope of score vs log2(n)
    xs = [math.log2(n) for n, _ in points]
    ys = [s for _, s in points]
    mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
    num = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    den = sum((x - mx) ** 2 for x in xs)
    return num / den  # score gained per doubling of environment count

# Train one run per subset with an identical recipe, evaluate on HELD-OUT families,
# then compare log_slope() to the cost of doubling your environment portfolio.
```

The output, score gained per doubling, converts directly into a budget decision: compare it to what the next doubling costs in generator compute, engineering, and expert time, and to what the same money buys in RL compute.

## What teams get wrong

- **Counting tasks and calling them environments.** Ten thousand tasks in twenty environments is a twenty-environment portfolio.
- **Evaluating on families the generator was seeded with.** If your synthetic environments were prompted from tau-bench domains, tau-bench is now partly a training-distribution metric.
- **Assuming the curve keeps going.** Every fine-grained curve above flattens. The flattening is a redundancy signal, not a reason to stop measuring.
- **Scaling simulated environments for stateful tasks.** Where state consistency matters, LLM-simulated environments teach the policy to exploit hallucinations. Code-backed or real environments are worth the extra cost.
- **Ignoring the verifier.** More environments with weak verifiers is more surface for [reward hacking](/blog/reward-hacking-rubric-based-rl). A training-grade environment is a verifier first; see [what makes an RL environment training-grade](/blog/what-makes-a-training-grade-rl-environment).
- **Measuring only pass@1.** Breadth can raise average success without making the agent reliable. Track pass^k on held-out families.

## How Anthroly can help

The evidence points to the same bottleneck again and again: generators supply breadth of surface, and the next gains come from environments that add new structure, carry verifiers you can trust, and stay out of your training distribution. That is expert work. Anthroly designs and builds RL environments, task families with calibrated difficulty, verifiers and held-out evaluation environments for frontier AI labs, using a bench of roughly 100-150 contracted PhDs with about 400 more PhDs and graduates across domains ready to commit.

If you are deciding whether your next quarter should buy more environments, more depth or more compute, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can help you size the portfolio and the held-out set.

## Related reading

- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [How are tool-use RL environments built? Simulated APIs, real MCP servers, and state-based verifiers](/blog/how-tool-use-rl-environments-are-built)
- [How are software-engineering RL environments built?](/blog/how-software-engineering-rl-environments-are-built)
- [Are LLM user simulators good enough to train and evaluate tool-use agents?](/blog/are-llm-user-simulators-reliable-for-agent-rl)
- [How do you build an agent benchmark that won't be contaminated or saturated?](/blog/building-contamination-resistant-agent-benchmarks)
- [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training)
- [Glossary: RL environment](/research/glossary#reinforcement-learning-environment)

---

## References

1. Wang, Z., Xu, C., Liu, B., et al. (2026). [Agent World Model: Infinity Synthetic Environments for Agentic Reinforcement Learning](https://arxiv.org/abs/2602.10090). arXiv:2602.10090.

2. Zeng, Z., Ivison, H., Wang, Y., et al. (2025). [RLVE: Scaling Up Reinforcement Learning for Language Models with Adaptive Verifiable Environments](https://arxiv.org/abs/2511.07317). arXiv:2511.07317.

3. He, A., Weir, N., Bostrom, K., et al. (2026). [ReSyn: Autonomously Scaling Synthetic Environments for Reasoning Models](https://arxiv.org/abs/2602.20117). arXiv:2602.20117.

4. Song, X., Chang, H., Dong, G., et al. (2026). [EnvScaler: Scaling Tool-Interactive Environments for LLM Agent via Programmatic Synthesis](https://arxiv.org/abs/2601.05808). arXiv:2601.05808.

5. Xu, M., Wang, Z., Deng, M., et al. (2026). [EnvFactory: Scaling Tool-Use Agents via Executable Environments Synthesis and Robust RL](https://arxiv.org/abs/2605.18703). arXiv:2605.18703.

6. Yang, J., Lieret, K., Jimenez, C. E., et al. (2025). [SWE-smith: Scaling Data for Software Engineering Agents](https://arxiv.org/abs/2504.21798). arXiv:2504.21798.

7. Jain, N., Singh, J., Shetty, M., et al. (2025). [R2E-Gym: Procedural Environments and Hybrid Verifiers for Scaling Open-Weights SWE Agents](https://arxiv.org/abs/2504.07164). arXiv:2504.07164.

8. Pan, J., Wang, X., Neubig, G., et al. (2024). [Training Software Engineering Agents and Verifiers with SWE-Gym](https://arxiv.org/abs/2412.21139). arXiv:2412.21139.

9. Zeng, L., Li, Y., Xiao, Y., et al. (2025). [Skywork-SWE: Unveiling Data Scaling Laws for Software Engineering in LLMs](https://arxiv.org/abs/2506.19290). arXiv:2506.19290.

10. Badertdinov, I., Golubev, A., Nekrashevich, M., et al. (2025). [SWE-rebench: An Automated Pipeline for Task Collection and Decontaminated Evaluation of Software Engineering Agents](https://arxiv.org/abs/2505.20411). arXiv:2505.20411.

11. Kimi Team. (2025). [Kimi K2: Open Agentic Intelligence](https://arxiv.org/abs/2507.20534). arXiv:2507.20534.

12. Fang, R., Cai, S., Li, B., et al. (2025). [Towards General Agentic Intelligence via Environment Scaling](https://arxiv.org/abs/2509.13311). arXiv:2509.13311.

13. Du, W., Gong, H., Ling, Z., et al. (2025). [Generalizable End-to-End Tool-Use RL with Synthetic CodeGym](https://arxiv.org/abs/2509.17325). arXiv:2509.17325.

14. Lu, S., Wang, Z., Zhang, H., et al. (2025). [Don't Just Fine-tune the Agent, Tune the Environment](https://arxiv.org/abs/2510.10197). arXiv:2510.10197.

15. Xi, Z., Huang, J., Liao, C., et al. (2025). [AgentGym-RL: Training LLM Agents for Long-Horizon Decision Making through Multi-Turn Reinforcement Learning](https://arxiv.org/abs/2509.08755). arXiv:2509.08755.

16. Xi, Z., Ding, Y., Chen, W., et al. (2024). [AgentGym: Evolving Large Language Model-based Agents across Diverse Environments](https://arxiv.org/abs/2406.04151). arXiv:2406.04151.

17. Yao, S., Shinn, N., Razavi, P., & Narasimhan, K. (2024). [tau-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045). arXiv:2406.12045.

18. Cobbe, K., Klimov, O., Hesse, C., Kim, T., & Schulman, J. (2018). [Quantifying Generalization in Reinforcement Learning](https://arxiv.org/abs/1812.02341). arXiv:1812.02341.

19. Cobbe, K., Hesse, C., Hilton, J., & Schulman, J. (2019). [Leveraging Procedural Generation to Benchmark Reinforcement Learning](https://arxiv.org/abs/1912.01588). arXiv:1912.01588.

20. Liu, Z., Sims, A., Duan, K., et al. (2025). [GEM: A Gym for Agentic LLMs](https://arxiv.org/abs/2510.01051). arXiv:2510.01051.

21. Stojanovski, Z., Stanley, O., Sharratt, J., et al. (2025). [Reasoning Gym: Reasoning Environments for Reinforcement Learning with Verifiable Rewards](https://arxiv.org/abs/2505.24760). arXiv:2505.24760.
