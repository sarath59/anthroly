---
title: "Where Should Step-Level Rewards for AI Agents Come From? Human Labels, Forked Rollouts, and Learned Verifiers"
description: "Outcome-only RL tells an agent whether it finished, not which step went wrong. Five 2026 papers show five different sources of step-level signal, from 8,509 human step labels to forkable environments and trained GUI verifiers. Here is when each one is worth its cost."
tags:
  - agent-training
  - process-rewards
  - rl-environments
  - verifiers
  - data-labeling
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-20T12:30:00.000Z'
updatedAt: '2026-10-20T12:30:00.000Z'
faq:
  - question: "What is a step-level (process) reward for an AI agent?"
    answer: "A reward or label attached to an individual action in a multi-step trajectory, such as a tool call or a GUI click, rather than only to the final outcome. It tells training which steps helped, which were neutral exploration, and which caused the failure."
  - question: "Do you need human step labels to train a process reward model?"
    answer: "Not always. TIPS (arXiv 2609.36641) trains a generative process reward model using only outcome labels, reaching 85.2 F1 on ProcessBench from 3.2K outcome-labeled trajectories. Human step labels remain the reference for measuring whether such models are right, as in AgentProcessBench's 8,509 human-labeled steps."
  - question: "What is Counterfactual Rollout Replay?"
    answer: "A training method for software engineering agents (arXiv 2609.33875) that restores the environment at selected decision points, samples an alternative action, rolls it forward, and uses the difference in terminal returns as the step advantage. It needs no human process labels, but it requires environments whose state can be restored cheaply and reliably."
  - question: "Why are LLM judges unreliable as rewards for computer-use agents?"
    answer: "Screenshots often cannot show whether a task really succeeded, so the verifier has to inspect the live environment. VeriCUA (arXiv 2610.26469) reports that prompted judges from 4B parameters up to GPT-5.4 all plateau at 68 to 70% macro-average agreement, and that learning what to check and when to stop matters more than verifier scale."
  - question: "How reliable are human step-level annotations for agents?"
    answer: "With a clear scheme, quite reliable. AgentProcessBench reports 89.1% inter-annotator agreement over 8,509 step labels, using a ternary scheme that separates correct, neutral exploratory, and erroneous steps, plus an error-propagation rule to reduce ambiguity."
  - question: "Which source of step-level reward should an agent team use?"
    answer: "Use forked rollouts where environment state is cheap to snapshot and restore, outcome-trained PRMs where outcome labels are plentiful, synthesized contrastive pairs for web agents, and expert step labels to build the benchmark that validates all of them. Most teams need at least two."
draft: false
---

**Outcome rewards tell an agent whether it finished. They do not say which of forty tool calls deleted the wrong file, which three were harmless exploration, and which one was the real mistake. In math reasoning you can often backtrack. In tool use, as the AgentProcessBench authors put it, failures "frequently induce irreversible side effects." That is why step-level signal for agents has become one of the busiest corners of post-training research, and why the field has split into very different ways of producing it.**

Five recent papers each represent one source of step-level reward. They are not competitors so much as tools with different cost structures, and the interesting question for an agent team is which one fits which environment.

## Source 1: Expert step labels, as ground truth

**AgentProcessBench** ([Fan et al., 2026](https://arxiv.org/abs/2603.14465)) is a benchmark of 1,000 tool-using trajectories with **8,509 human-labeled steps** and **89.1% inter-annotator agreement**. Two design decisions make that agreement possible:

- A **ternary label scheme** that lets annotators mark a step as exploration rather than forcing it into right or wrong.
- An **error-propagation rule**, which fixes how steps after a mistake are labeled so annotators don't each invent their own convention.

The findings are a useful warning for anyone reading agent metrics. Weaker policies show *inflated* ratios of correct steps because they terminate early, current models struggle to tell neutral actions from erroneous ones, and process-derived signals add value beyond outcome supervision for test-time scaling.

**When it's worth it:** as the measurement layer. Expert step labels are too slow to supply rewards for every rollout, but every automated source below needs something like this to show it is right.

## Source 2: Forked rollouts from restorable environments

**Counterfactual Rollout Replay (CRR)** ([Li et al., 2026](https://arxiv.org/abs/2609.33875)) gets step-level signal straight from the environment. At a small set of decision points in a training trajectory, it restores the state, samples an alternative action, rolls the branch forward under the policy, and replaces the step's advantage with the return difference:

$$
\hat{A}_t \;=\; R(\tau) \;-\; R\big(\tau'_t\big), \qquad \tau'_t \sim \pi\big(\cdot \mid s_t,\; a'_t \neq a_t\big)
$$

where $R(\tau)$ is the realized trajectory's terminal return and $\tau'_t$ is the counterfactual branch from state $s_t$. No human process labels and no learned PRM are needed; the authors are careful to say "free" refers to supervision cost, not replay compute.

With a 14B policy, CRR improves pass@1 on SWE-bench Verified, SWE-bench Live, and SWE-rebench. In an equal-wall-clock comparison on the same hardware, it reaches **41.7% on SWE-bench Verified versus 36.7%** for extended outcome-only GRPO, with fork overhead included.

**When it's worth it:** when the environment can be snapshotted and restored cheaply and deterministically. The paper itself flags stochastic continuations and expensive or imperfect replay as limits. That makes environment engineering, not labeling, the bottleneck: containers that fork cleanly, seeded dependencies, and no hidden external state.

## Source 3: Process reward models trained from outcome labels only

**TIPS (Thinking-Induced Process Supervision)** ([Fan et al., 2026](https://arxiv.org/abs/2609.36641)) trains a generative PRM that writes a chain of thought, then step labels, then an outcome label. The reward checks only the outcome label, and a group-relative advantage (shown here in the standard GRPO form) is computed across sampled responses:

$$
r_i \;=\; \mathbb{1}\big[\hat{o}_i = o^{*}\big], \qquad A_i \;=\; \frac{r_i - \operatorname{mean}(r_{1:G})}{\operatorname{std}(r_{1:G})}
$$

That advantage is applied to the whole generated response, including the step labels. The bet is that checking intermediate steps accurately helps the model predict the outcome, so outcome-only RL reinforces step verification indirectly. The result is strong for its cost: **TIPS-Qwen3-4B-Thinking-2507 reaches 85.2 F1 on ProcessBench** ([Zheng et al., 2024](https://arxiv.org/abs/2412.06559)) from only 3.2K outcome-labeled trajectories, beating the trained PRMs and prompt-only judges the authors evaluated, though it still trails o1-mini.

**When it's worth it:** when outcome labels are plentiful and trustworthy. The quality of the induced step labels is capped by the quality of the outcome labels, so a weak outcome verifier quietly becomes a weak PRM.

## Source 4: Synthesized contrastive preferences for web agents

**SURFPRM** ([Peng et al., 2026](https://arxiv.org/abs/2609.32351)) targets comparative PRMs for web agents, which judge which of two candidate actions is better in a given state. The authors find that in a representative baseline dataset (WebArbiter), only **24.19%** of training pairs are "Grounded Minimal Contrastive Pairs": two candidates that target real on-page elements with the same action type. The rest can be told apart by shortcuts such as a hallucinated element or a mismatched action type, so a PRM learns the shortcut.

SURFPRM builds an Interaction Element Graph from demonstrations and uses it to propose hard negatives along spatial, temporal, and spatiotemporal confusion axes, raising that share to **74.60%**. Used for reward-guided search on WebArena-Lite, it improves task success for GPT-4o (+14.21%) and GPT-4o-mini (+12.83%) policies.

**When it's worth it:** when you have good demonstrations and a structured view of the environment. The lesson generalizes beyond the web: a preference dataset is only as good as its hardest negatives.

## Source 5: Verifiers that act in the environment

For computer-use agents, the reward often can't be read off screenshots. Did the file actually save? Did the setting persist? **VeriCUA** ([Wang et al., 2026](https://arxiv.org/abs/2610.26469)) studies proactive reward agents that go into the post-execution environment and check. Its headline negative result: prompted judges ranging from 4B parameters to GPT-5.4 **all plateau at 68 to 70% macro-average agreement**, and neither scale nor few-shot examples fix it.

VeriCUA splits the verifier into a trainable Judge that decides what to check and when to stop, and a frozen Probe that executes checks. Trained only on OSWorld and evaluated on MobileWorld and WebArena-Verified, it beats few-shot GPT-5.4 by 5.36 points with 47.6 to 59.8% fewer Probe tokens. A 1B VeriCUA exceeds every prompted judge, and using it as the reward for actor RL raises task success by 3.21 points overall. The authors' conclusion: verification strategy, not verifier scale, is the key to reliable GUI rewards.

**When it's worth it:** whenever success depends on hidden state. It is also a reminder that "LLM-as-a-judge" for agents is an environment-design problem as much as a model problem.

## Comparing the five sources

| Source | Example | Needs | Main cost | Main failure mode |
|---|---|---|---|---|
| Expert step labels | AgentProcessBench | A labeling scheme with explicit rules for exploration and error propagation | Expert time | Doesn't scale to every rollout |
| Forked rollouts | CRR | Cheap, deterministic state restore | Replay compute | Stochastic or leaky environments |
| Outcome-trained PRM | TIPS | Many reliable outcome labels | RL training of the PRM | Inherits outcome-label errors |
| Synthesized contrastive pairs | SURFPRM | Demonstrations plus structured environment state | Data engineering | Shortcut-learnable negatives |
| Proactive verifiers | VeriCUA | Live post-execution environment access | Verifier training and probe calls | Prompted judges plateau |

## What agent teams get wrong

These are practitioner observations, not findings from the papers.

1. **Treating step-correct ratios as progress.** AgentProcessBench shows weak policies look better on this metric because they stop early. Report it alongside completion and trajectory length.
2. **Collapsing exploration into "wrong."** A binary step label punishes the reading, listing, and checking that good agents do. The ternary scheme exists for a reason.
3. **Building environments that can't fork.** Teams invest in reward models when the cheaper signal (CRR-style counterfactuals) is blocked only by environments with hidden external state. Restorability is a design requirement worth writing into the environment spec from day one.
4. **Validating automated rewards against themselves.** An outcome-trained PRM, a synthesized-pair PRM, and a prompted judge can all agree and still be wrong in the same way. Somewhere in the stack there has to be an independent, expert-labeled set of steps.
5. **Ignoring policy shift.** A new paper on Bayesian PRMs ([Qiao et al., 2026](https://arxiv.org/abs/2610.23223)) attributes systematic reward overestimation partly to the mismatch between the policy that generated the PRM's training data and the policy being scored. Step-level labels go stale as the policy improves.

## How Anthroly can help

Anthroly builds both halves of this stack: environments and the expert labels that check them. With 100 to 150 PhDs on contract and about 400 more PhDs and graduates ready to commit, we write step-level labeling schemes with explicit exploration and error-propagation rules, label held-out agent trajectories in domains where correctness needs expertise, and design task environments with deterministic, restorable state so counterfactual rollouts are possible.

If your team is choosing between process reward approaches for an agent and needs ground truth to decide, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [Process vs. outcome rewards](/research/compare/process-vs-outcome-rewards)
- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [Agent trajectory data, explained](/learn/agent-trajectory-data)
- [How many expert labels does it take to fix noisy preference data?](/blog/how-many-expert-labels-fix-noisy-preference-data)
- [How do you collect training data for computer-use agents?](/blog/how-to-collect-computer-use-agent-trajectory-data)
- [GRPO vs PPO vs DAPO: which RL algorithm should you use to train a reasoning model?](/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl)

---

## References

1. Fan, S., Ye, X., Huo, Y., Chen, Z.-Y., Guo, Y., Yang, S., Yang, W., Ye, S., Chen, J., Chen, H., Cong, X., & Lin, Y. (2026). [AgentProcessBench: Diagnosing Step-Level Process Quality in Tool-Using Agents](https://arxiv.org/abs/2603.14465). arXiv:2603.14465. Code and data: [github.com/RUCBM/AgentProcessBench](https://github.com/RUCBM/AgentProcessBench).
2. Li, Y., Wang, H., Chen, X., Cao, Y., & Tang, X. (2026). [Counterfactual Rollout Replay: Forkable Environments as Free Process Rewards for Software Engineering Agents](https://arxiv.org/abs/2609.33875). arXiv:2609.33875.
3. Fan, S., Cong, X., Zhang, Z., Chen, H., & Lin, Y. (2026). [Inducing Process Supervision from Outcome-Only Reinforcement Learning](https://arxiv.org/abs/2609.36641). arXiv:2609.36641. Code: [github.com/RUCBM/TIPS](https://github.com/RUCBM/TIPS).
4. Zheng, C., Zhang, Z., Zhang, B., Lin, R., Lu, K., Yu, B., Liu, D., Zhou, J., & Lin, J. (2024). [ProcessBench: Identifying Process Errors in Mathematical Reasoning](https://arxiv.org/abs/2412.06559). arXiv:2412.06559.
5. Peng, Y., Wang, X., Zhao, Y., Wu, L., & He, K. (2026). [From Trajectories to Grounded Preferences: Process Preference Synthesis via Interaction Element Graphs for Web PRMs](https://arxiv.org/abs/2609.32351). arXiv:2609.32351.
6. Wang, Z., Lu, Y., Zhang, Z., Hu, Z., Cong, X., Lin, Y., & Liu, F. (2026). [VeriCUA: Learning Proactive Verification for Reliable GUI Agent Rewards](https://arxiv.org/abs/2610.26469). arXiv:2610.26469.
7. Qiao, Z., Zhou, Z., Lyu, J., Wang, P., Zhang, Q., Gao, S., & Qiu, S. (2026). [Process Reward Modeling with Reliability- and Conservatism-Aware Bayesian Belief](https://arxiv.org/abs/2610.23223). arXiv:2610.23223.
