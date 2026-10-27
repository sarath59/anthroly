---
title: "Why Is Multi-Turn RL for LLM Agents Unstable, and How Do You Assign Credit Across Turns?"
description: "Multi-turn agent RL collapses for specific, diagnosable reasons: reward-variance cliffs, off-distribution tool tokens, importance-sampling granularity mismatch, rollout-training context mismatch and over-tolerant clipping. Here is what RAGEN, SimpleTIR, SORL, RTPO, ARLArena and LOOP show about why training breaks, how GiGPO, turn-level rewards, turn-level critics and tree rollouts assign credit across turns, and a practical stability checklist."
tags:
  - agentic-rl
  - agents
  - credit-assignment
  - grpo
  - ppo
  - rl-environments
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-27T12:30:00.000Z'
updatedAt: '2026-10-27T12:30:00.000Z'
faq:
  - question: "Why is multi-turn RL for LLM agents less stable than single-turn RL?"
    answer: "Because several things that are benign in single-turn RLVR become harmful over many turns. Tool and environment outputs push the model off its own distribution, so it emits low-probability tokens that compound across turns and cause gradient-norm explosions (SimpleTIR, Xue et al., 2025). Token-level importance ratios do not match the turn structure of the interaction (SORL, Li et al., 2025). Contexts that are truncated or summarized at rollout time differ from what the trainer recomputes (RTPO, Li et al., 2026). And sparse terminal rewards give every turn the same credit, so reward variance within groups can collapse (RAGEN, Wang et al., 2025)."
  - question: "What is the Echo Trap in agent RL?"
    answer: "RAGEN (Wang et al., 2025) used Echo Trap to describe a recurring collapse in which agents trained with multi-turn RL converge on repetitive reasoning templates. Reward variance across rollouts drops sharply and gradient spikes follow. In their FrozenLake PPO run, reward standard deviation fell around step 40, well before mean reward collapsed around step 90, so within-group reward variance is a useful early warning. Their StarPO-S fix keeps only the highest-variance prompts, by default the top 25%, along with other stabilizers."
  - question: "How do you assign credit to individual turns with only a final reward?"
    answer: "There are four main options. Group states rather than whole trajectories, as GiGPO (Feng et al., 2025) does by grouping actions taken from identical environment states across rollouts. Add turn-level rewards from checkable intermediate signals, such as whether a retrieval returned the answer (Wei et al., 2025). Learn a turn-level critic, as in ArCHer, Turn-PPO and SWEET-RL. Or branch rollouts into trees so turns share prefixes and can be compared directly, as in Tree-GRPO and RTPO."
  - question: "Is PPO or GRPO better for multi-turn agents?"
    answer: "The evidence is mixed and depends on the setup. Search-R1 (Jin et al., 2025) found GRPO converged faster but showed reward collapse after many steps while PPO stayed stable, and Turn-PPO (Li et al., 2025) found PPO more robust than GRPO for multi-turn tasks. But LOOP (Chen et al., 2025) found PPO with a learned critic underperformed every Monte Carlo baseline on AppWorld, while its critic-free leave-one-out PPO scored 71.3 task goal completion versus 58.0 for GRPO. Choosing the right granularity for advantages, importance ratios and clipping matters more than choosing the algorithm family."
  - question: "Should you mask tool outputs from the RL loss?"
    answer: "Yes. Tokens produced by the environment are not actions the policy took, so optimizing them adds noise. Search-R1 found that masking retrieved tokens from the loss improved average exact match across seven QA benchmarks from 0.343 to 0.431 with Qwen2.5-7B and PPO."
  - question: "How does Anthroly help teams training multi-turn agents?"
    answer: "Anthroly builds the environments, tasks and verifiers that multi-turn RL depends on: deterministic, resettable environments whose states can be compared across rollouts, checkable intermediate signals, privileged reference information for critics, and expert demonstrations for behavior-cloning warm-up. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Single-turn RL with verifiable rewards became routine in 2025: sample a group of answers, score them, normalize, update. Then teams moved the same recipe to agents that search, run code, browse and call APIs over ten, thirty or a hundred turns, and training started collapsing in ways the single-turn playbook did not predict: reward curves that rise and then fall off a cliff, gradient norms that explode overnight, agents that settle into one repetitive template. A wave of 2025-2026 papers diagnosed why. The causes are specific and measurable, and most of them come down to one structural issue: multi-turn interactions have turns, but most training pipelines still treat a trajectory as one flat sequence of tokens with one reward. This post explains the instability mechanisms, the main ways to assign credit across turns, and what that implies for both your trainer and your environments.**

## The short answer

Multi-turn agent RL is unstable for five recurring reasons: **(1)** sparse terminal rewards give every turn identical credit, so groups lose reward variance and the policy collapses into templates; **(2)** environment outputs push the policy off-distribution, producing low-probability tokens whose gradients compound across turns; **(3)** token-level importance sampling and clipping do not match the turn structure, so a few tokens dominate updates; **(4)** the context the model saw at rollout time (truncated or summarized) differs from the context the trainer recomputes; and **(5)** clipping that is too tolerant lets off-policy tokens through. Credit assignment across turns is the fix for the first and helps the others. The practical options are state-grouped advantages (GiGPO), checkable turn-level rewards, turn-level critics (ArCHer, Turn-PPO, SWEET-RL) and tree-structured rollouts (Tree-GRPO, RTPO). The cheapest wins are unglamorous: mask environment tokens, filter void turns and zero-variance groups, use sequence- or turn-level ratios, match rollout and training contexts, and warm-start with behavior cloning.

This post is about the optimization side. For where step-level labels themselves come from, human annotation, forked rollouts or learned verifiers, see [Where should step-level rewards for AI agents come from?](/blog/step-level-rewards-for-ai-agents).

## What changes when RL goes from one turn to many?

| Property | Single-turn RLVR | Multi-turn agent RL |
|---|---|---|
| Unit of action | One response | A sequence of turns, each a response followed by an environment observation |
| Tokens in the sequence | All generated by the policy | Interleaved policy tokens and environment tokens |
| Reward | Usually one verifiable outcome | Usually one sparse outcome after many turns, sometimes plus intermediate signals |
| Credit assignment | Per response | Per turn, per tool call, or per token across a long horizon |
| Rollout cost | One generation | Many generations plus environment latency |
| Off-policyness | Mild | Larger, because long rollouts are often generated asynchronously |
| Context | Fits in the window | Often truncated or summarized as the interaction grows |

Write a trajectory as $\tau = (s_1, a_1, o_1, s_2, a_2, o_2, \dots, s_H, a_H)$, where $a_h$ is the model's response at turn $h$ and $o_h$ is the environment's observation. The default trajectory-level group-relative advantage, used by GRPO-style trainers, is

$$
\hat{A}_i = \frac{R(\tau_i) - \operatorname{mean}\left(\{R(\tau_j)\}_{j=1}^{G}\right)}{\operatorname{std}\left(\{R(\tau_j)\}_{j=1}^{G}\right)}
$$

and that single number is applied to every generated token of every turn in $\tau_i$. A brilliant first search and a useless fifth one get the same credit if the episode succeeded, and the same blame if it failed. Over a few turns that is tolerable. Over dozens it is most of the noise in the gradient.

## Why does multi-turn training collapse?

### 1. Reward variance collapses before reward does

RAGEN (Wang et al., 2025) trained agents with trajectory-level multi-turn RL across stylized environments and found a recurring failure it calls the **Echo Trap**: reasoning that starts diverse converges onto repetitive templates, reward variance across rollouts falls off a cliff, and gradient spikes follow. Both PPO and GRPO showed early gains and then collapse; a critic delayed the collapse but did not prevent it. The useful part for practitioners is the ordering. In their FrozenLake PPO run, reward standard deviation dropped around step 40, while mean reward did not collapse until around step 90. **Within-group reward variance is an early warning signal**, and it is cheap to log.

Their stabilized variant, StarPO-S, filters to the prompts with the highest reward variance (keeping the top 25% by default), adds a critic and uses gradient stabilization such as a higher upper clipping bound. RAGEN also found that without reasoning-aware rewards, agents' reasoning traces shrank and could become hallucinated while still earning reward, a reminder that outcome reward alone does not supervise what happens inside the turns.

### 2. Environment tokens pull the policy off-distribution

In single-turn RL, every token in the context came from the prompt or from the policy itself. In agent RL, tool outputs, search results and error messages are inserted between turns, and the model then generates conditioned on text it would never have produced. SimpleTIR (Xue et al., 2025) identified this as the primary cause of collapse in multi-turn tool-integrated reasoning: distribution drift from tool feedback leads to low-probability tokens, which "compounds over successive turns, causing catastrophic gradient norm explosions." Their fix is strikingly simple. They drop trajectories containing **void turns**, turns that yield neither a code block nor a final answer, from the update. With that filter, multi-turn RL from the Qwen2.5-7B base model raised AIME24 from a text-only baseline of 22.1 to 50.5.

A related, older fix is to keep environment tokens out of the loss entirely. Search-R1 (Jin et al., 2025) masked retrieved tokens and found it improved average exact match across seven QA benchmarks from 0.343 to 0.431 (Qwen2.5-7B, PPO). If your trainer computes log-probabilities and losses over tool outputs, fix that before anything else.

### 3. Importance ratios at the wrong granularity

PPO-style objectives weight each token's update by an importance ratio $w_t = \pi_\theta(y_t \mid \cdot) / \pi_{\theta_{\text{old}}}(y_t \mid \cdot)$ and clip it. In a long multi-turn trajectory, a handful of tokens with extreme ratios can dominate. SORL (Li et al., 2025) identified two sources of instability in off-policy multi-turn training: a **granularity mismatch** between token-level optimization and turn-structured interactions, and high-variance updates from off-policy importance sampling and inaccurate advantages. Its turn-level PPO shares one geometric-mean importance ratio across all tokens in a turn,

$$
w_k^{\text{turn}}(\theta) = \left( \prod_{t \in \text{turn } k} \frac{\pi_\theta(y_t \mid \cdot)}{\pi_{\theta_{\text{old}}}(y_t \mid \cdot)} \right)^{1/|k|}
$$

which on their search task reduced the policy-gradient norm "by several orders of magnitude" relative to token-level PPO. That was not sufficient on its own: turn-level PPO still showed occasional sharp drops coinciding with gradient-norm spikes of roughly 1,000 to 2,000, which is why SORL adds clipping-triggered normalization to suppress unreliable updates.

ARLArena (Wang et al., 2026) ran a controlled comparison of importance-sampling and clipping designs on agent tasks and reached a compatible conclusion: methods with **tolerant clipping**, CISPO and SAPO, gave fast early gains and then collapsed around step 130, with exploding gradient norms and KL and a sharp drop in valid-format actions, while GSPO-style **sequence-level clipping** improved steadily. Their summary finding: "ARL is highly sensitive to IS design."

### 4. The model saw a different context than the trainer recomputes

Long agent runs rarely keep the full history in context; they truncate or summarize. RTPO (Li et al., 2026) points out that rollouts are then generated under a compressed context $\phi(\bar{x}_k)$ while training recomputes probabilities under the full flattened history $\bar{x}_k$, so the importance ratio the trainer uses is not the true one:

$$
\rho^{\text{flat}}_{k,t} = \frac{\pi_\theta(a_{k,t} \mid \bar{x}_k)}{\pi_{\theta_{\text{old}}}(a_{k,t} \mid \phi(\bar{x}_k))} \neq \frac{\pi_\theta(a_{k,t} \mid \phi(\bar{x}_k))}{\pi_{\theta_{\text{old}}}(a_{k,t} \mid \phi(\bar{x}_k))} = \rho^{\text{true}}_{k,t}
$$

The bias grows in later turns as more history is omitted. RTPO also names asynchronous policy drift, short and long trajectories optimized under different policy versions, as a third coupled source. Their reverse-turn method, which trains turns in temporal reverse order over sparse rollout trees, reported improvements of 21.50% and 10.76% over trajectory-level and turn-level baselines. Whether or not you adopt it, the diagnostic is worth stealing: **if your agent harness edits context at rollout time, your trainer must condition on the same edited context.**

### 5. Critic or no critic is not a settled question

| Study | Setting | Finding |
|---|---|---|
| Search-R1 (Jin et al., 2025) | Multi-turn search QA | GRPO converged faster but showed reward collapse after many steps; PPO stayed stable |
| Turn-PPO (Li et al., 2025) | WebShop, Sokoban | PPO more robust than GRPO; a turn-level MDP for the critic improved further |
| Wei et al. (2025) | Multi-turn search | PPO with dense per-turn rewards gave the most stable training and best answer correctness |
| LOOP (Chen et al., 2025) | AppWorld | PPO with a learned critic underperformed all Monte Carlo baselines; critic-free leave-one-out PPO was best |

The apparent contradiction mostly dissolves once you separate **how the advantage is estimated** from **how the update is weighted and clipped**. LOOP is a useful case. On AppWorld Test-Normal, task goal completion varied enormously with the granularity at which PPO's importance weighting and clipping were applied, holding the leave-one-out advantage fixed:

| Method (AppWorld Test-N) | PPO action granularity | Task goal completion |
|---|---|---|
| LOOP (token) | token | 71.3 |
| LOOP (turn) | turn | 64.1 |
| LOOP (bandit) | trajectory | 53.3 |
| LOOP RwNorm (token), GRPO-style std normalization | token | 61.9 |
| GRPO | token | 58.0 |
| PPO with learned critic | token | 50.8 |
| OpenAI o1 (no fine-tuning) | n/a | 61.9 |

Two things stand out. Reward standard-deviation normalization cost LOOP 9 points; the authors suggest it over-weights tasks the model always solves or always fails, while AppWorld rewards learning on tasks that can sometimes be solved. And token-level weighting beat turn-level here, while SORL found turn-level ratios essential for stability on search. These are different settings and different pipelines, and SORL explicitly targets off-policy training, so the lesson is not "token good" or "turn good" but that **the right granularity depends on how off-policy your data is, and you should test it rather than inherit it.**

## How do you assign credit across turns?

| Approach | Credit unit | Extra cost | What it needs from the environment | Representative evidence |
|---|---|---|---|---|
| Trajectory-level group baseline | Whole episode | None | Only a final reward | GRPO, RLOO, LOOP |
| State-grouped advantages | Action at a repeated state | Hashing states, negligible | Deterministic resets, comparable states | GiGPO: >12% ALFWorld, >9% WebShop over GRPO |
| Turn-level rewards | Each turn | Designing checkable signals | Intermediate signals you can verify | Wei et al. (2025), MT-GRPO and MT-PPO |
| Learned turn-level critic | Each turn | A value model | Enough data to fit a critic; optionally privileged info | ArCHer, Turn-PPO, SWEET-RL |
| Tree-structured rollouts | Branch points | Branching logic, shared prefixes | Ability to fork from a mid-episode state | Tree-GRPO, ARPO, RTPO |
| Progress estimators | Each step | Training an estimator | Outcome labels to fit progress | SPA-RL |

### State-grouped advantages: GiGPO

GiGPO (Feng et al., 2025) keeps GRPO's critic-free structure and adds a second level of grouping. Because a group of rollouts starts from the same initial state, they often pass through the **same environment states** later, for example the same web page or the same room. GiGPO retroactively groups the actions taken from each identical "anchor state" and computes a step-level relative advantage within that group, then combines it with the usual episode-level advantage:

$$
A(a_t^{(i)}) = A^{E}(\tau_i) + \omega \, A^{S}(a_t^{(i)}), \qquad R_t^{(i)} = \sum_{k=t}^{T} \gamma^{k-t} r_k^{(i)}
$$

where $A^{S}$ normalizes the discounted return $R_t$ against other actions from the same anchor state. The paper used $\gamma = 0.95$ and $\omega = 1$, found more than 65% of states recur across a group (size-1 groups were under 35%), and measured the grouping overhead at about 0.01 seconds per iteration. It reported gains of more than 12% on ALFWorld and more than 9% on WebShop over GRPO, with no extra rollouts and the same GPU memory.

The catch is in the environment, not the algorithm: **anchor states only exist if the environment resets deterministically and its states can be compared.** For search, where exact repeats are rarer, the paper uses a similarity-based variant.

```python
from collections import defaultdict
import numpy as np

def gigpo_advantages(group, gamma=0.95, omega=1.0, eps=1e-6):
    """group: list of trajectories; each traj is a list of (state_key, reward) per step.
    Returns per-step advantages combining episode-level and anchor-state-level terms."""
    # Episode-level advantage (GRPO-style)
    R = np.array([sum(r for _, r in traj) for traj in group], dtype=float)
    A_ep = (R - R.mean()) / (R.std() + eps)

    # Discounted return from each step
    returns = []
    for traj in group:
        g, out = 0.0, []
        for _, r in reversed(traj):
            g = r + gamma * g
            out.append(g)
        returns.append(out[::-1])

    # Group actions by identical environment state across the whole group
    buckets = defaultdict(list)
    for i, traj in enumerate(group):
        for t, (key, _) in enumerate(traj):
            buckets[key].append((i, t))

    adv = [[0.0] * len(traj) for traj in group]
    for members in buckets.values():
        vals = np.array([returns[i][t] for i, t in members])
        mu, sd = vals.mean(), vals.std()
        for (i, t), v in zip(members, vals):
            a_step = 0.0 if len(members) == 1 else (v - mu) / (sd + eps)
            adv[i][t] = A_ep[i] + omega * a_step
    return adv
```

The `state_key` is the part your environment has to provide: a canonical, hashable representation of what the agent observes, stable across rollouts. Getting that right is environment engineering, and it is the difference between GiGPO working and silently degenerating to GRPO.

### Turn-level rewards

Wei et al. (2025) categorized reward structures as terminal, delayed or per-turn and derived GRPO and PPO variants for each. Using intermediate rewards from tool-execution feedback on multi-turn search, for example whether the retrieved results contained the answer, dense per-turn structures beat sparse ones for both GRPO and PPO, and PPO with per-turn rewards trained most stably. They also flag two costs. Their turn-level GRPO needs $G^{K-1}$ rollouts over a $K$-turn horizon and a fixed number of turns per rollout, which is impractical for long, variable-length tasks. And naively decomposing trajectories into independent turns for PPO underperformed trajectory-based PPO: the model "over-optimizes local turn-level signals without sufficiently aligning them with final task success." Turn rewards are only as good as their alignment with the outcome.

### Learned turn-level critics

Value-based methods assign credit through a critic, and the multi-turn question is what the critic's time step should be. ArCHer (Zhou et al., 2024) runs a high-level off-policy critic over utterances and a low-level token policy within each turn, reporting about 100x sample efficiency over prior methods. Turn-PPO (Li et al., 2025) treats each full turn as one state-action pair, so the critic and generalized advantage estimation operate at the turn level:

$$
\delta_h = r_h + \gamma V(s_{h+1}) - V(s_h), \qquad \hat{A}_h = \sum_{l \ge 0} (\gamma \lambda)^l \, \delta_{h+l}
$$

SWEET-RL (Zhou et al., 2025) adds an idea that matters for environment design: give the critic **training-time information the policy never sees**, such as the reference solution, so it can judge each turn more accurately. On their ColBench collaboration benchmark this gave a 6% absolute improvement in success and win rates over other multi-turn RL methods and let Llama-3.1-8B match or exceed GPT-4o.

### Trees and branching

If you can fork an episode from a mid-trajectory state, sibling branches share a prefix and differ only after the branch point, which is exactly the comparison credit assignment needs. Tree-GRPO (Ji et al., 2025) makes each tree node a full agent step, shares prefixes to fit more rollouts into a fixed token or tool-call budget, and shows its intra-tree objective is equivalent to step-level direct preference learning. ARPO (Dong et al., 2025) observed that token entropy rises right after tool calls and branches adaptively at those high-uncertainty points, reporting better results with half the tool-call budget. EMPG (Wang et al., 2025) takes a complementary angle on the same uncertainty signal, amplifying updates for confident correct steps and attenuating uncertain ones. Forking requires snapshot and restore from the environment, another environment-side requirement.

## A stability checklist for multi-turn agent RL

**Log these from day one**

- Within-group reward standard deviation and the fraction of zero-variance groups (RAGEN's early warning).
- Gradient norm, clip fraction and importance-ratio extremes, per turn index, not only per batch.
- Void-turn rate, format-valid rate and turns per episode.
- Entropy before and after tool calls.

**Fix these before tuning hyperparameters**

1. Mask environment tokens from the loss and the KL term (Search-R1).
2. Drop or repair trajectories with void turns (SimpleTIR).
3. Filter prompts with zero or low reward variance, and keep rollouts fresh (RAGEN).
4. Make the trainer condition on exactly the context the policy saw at rollout, including truncation and summaries (RTPO).
5. Prefer sequence- or turn-level ratios and clipping over tolerant token-level schemes when data is off-policy (SORL; ARLArena).
6. Check your loss aggregation. ARLArena notes that sequence-mean-token-mean weights each token by the inverse of its trajectory length, biasing optimization toward shorter trajectories.
7. Warm-start with behavior cloning. In ARLArena's ALFWorld testbed with GRPO, adding behavior cloning raised success rate by 20.71 points, a format penalty by a further 7.34 and a KL term by 18.10. WebAgent-R1 (Wei et al., 2025) likewise found the warm-up stage important, and its multi-turn RL raised WebArena-Lite success for Qwen2.5-3B from 6.1% to 33.9% and Llama-3.1-8B from 8.5% to 44.8%.

**Then choose a credit-assignment method that your environment can support.** If states repeat, GiGPO is nearly free. If you can fork, trees give the cleanest comparisons. If you have checkable intermediate signals, use them as turn rewards but keep the outcome reward dominant. If you have privileged reference information, give it to the critic.

## What teams get wrong

- **Debugging the algorithm when the bug is in the harness.** Unmasked tool tokens and mismatched contexts produce symptoms that look like algorithmic instability.
- **Watching mean reward only.** By the time mean reward collapses, reward variance collapsed long ago.
- **Copying single-turn defaults.** Standard-deviation normalization, token-level clipping and per-token loss aggregation were tuned for one response, not fifty turns.
- **Shaping turn rewards without checking alignment.** Dense rewards that are not tied to the outcome get optimized locally, as Wei et al. observed.
- **Building environments that cannot be compared or forked.** Non-deterministic resets, unhashable states and no snapshotting rule out the cheapest credit-assignment methods.

## How Anthroly can help

Most of the fixes above are trainer changes, but the credit-assignment methods that work best ask something of the environment: deterministic resets, canonical state representations that can be compared across rollouts, snapshot-and-fork, intermediate signals you can actually verify, privileged reference solutions for critics, and expert demonstrations for the behavior-cloning warm-up. That is expert environment and data work. Anthroly builds those environments, task families, verifiers and demonstration sets for frontier AI labs, using a bench of roughly 100-150 contracted PhDs with about 400 more PhDs and graduates across domains ready to commit.

If your agent RL runs keep collapsing or you are designing environments for long-horizon training, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can help you work out what your environments need to support.

## Related reading

- [Where should step-level rewards for AI agents come from?](/blog/step-level-rewards-for-ai-agents)
- [GRPO vs PPO vs DAPO: which RL algorithm should you use to train a reasoning model?](/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl)
- [Why does entropy collapse in RL for reasoning models, and what actually fixes it?](/blog/why-does-entropy-collapse-in-rl-for-reasoning-models)
- [How are tool-use RL environments built?](/blog/how-tool-use-rl-environments-are-built)
- [Are LLM user simulators good enough to train and evaluate tool-use agents?](/blog/are-llm-user-simulators-reliable-for-agent-rl)
- [How many RL environments do you need to train a general agent?](/blog/how-many-rl-environments-do-you-need-to-train-an-agent)
- [Process vs. outcome rewards](/research/compare/process-vs-outcome-rewards)
- [Glossary: Agent trajectory](/research/glossary#agent-trajectory)

---

## References

1. Wang, Z., et al. (2025). [RAGEN: Understanding Self-Evolution in LLM Agents via Multi-Turn Reinforcement Learning](https://arxiv.org/abs/2504.20073). arXiv:2504.20073.
2. Xue, Z., et al. (2025). [SimpleTIR: End-to-End Reinforcement Learning for Multi-Turn Tool-Integrated Reasoning](https://arxiv.org/abs/2509.02479). arXiv:2509.02479.
3. Jin, B., et al. (2025). [Search-R1: Training LLMs to Reason and Leverage Search Engines with Reinforcement Learning](https://arxiv.org/abs/2503.09516). arXiv:2503.09516.
4. Li, C., et al. (2025). [Stabilizing Off-Policy Training for Long-Horizon LLM Agent via Turn-Level Importance Sampling and Clipping-Triggered Normalization](https://arxiv.org/abs/2511.20718). arXiv:2511.20718.
5. Wang, X., et al. (2026). [ARLArena: A Unified Framework for Stable Agentic Reinforcement Learning](https://arxiv.org/abs/2602.21534). arXiv:2602.21534.
6. Li, Y., Cao, Z., Qiao, J., Hu, S. (2026). [RTPO: Reverse-Turn Policy Optimization for Stabilizing Agentic RL Training](https://arxiv.org/abs/2608.18682). arXiv:2608.18682.
7. Chen, K., et al. (2025). [Reinforcement Learning for Long-Horizon Interactive LLM Agents](https://arxiv.org/abs/2502.01600). arXiv:2502.01600.
8. Li, J., et al. (2025). [Turn-PPO: Turn-Level Advantage Estimation with PPO for Improved Multi-Turn RL in Agentic LLMs](https://arxiv.org/abs/2512.17008). arXiv:2512.17008.
9. Wei, Q., et al. (2025). [Reinforcing Multi-Turn Reasoning in LLM Agents via Fine-Grained Reward Structure and Credit Assignment](https://arxiv.org/abs/2505.11821). arXiv:2505.11821.
10. Feng, L., Xue, Z., Liu, T., An, B. (2025). [Group-in-Group Policy Optimization for LLM Agent Training](https://arxiv.org/abs/2505.10978). arXiv:2505.10978.
11. Zhou, Y., Zanette, A., Pan, J., Levine, S., Kumar, A. (2024). [ArCHer: Training Language Model Agents via Hierarchical Multi-Turn RL](https://arxiv.org/abs/2402.19446). arXiv:2402.19446.
12. Zhou, Y., et al. (2025). [SWEET-RL: Training Multi-Turn LLM Agents on Collaborative Reasoning Tasks](https://arxiv.org/abs/2503.15478). arXiv:2503.15478.
13. Ji, Y., et al. (2025). [Tree Search for LLM Agent Reinforcement Learning](https://arxiv.org/abs/2509.21240). arXiv:2509.21240.
14. Dong, G., et al. (2025). [Agentic Reinforced Policy Optimization](https://arxiv.org/abs/2507.19849). arXiv:2507.19849.
15. Wang, J., et al. (2025). [Harnessing Uncertainty: Entropy-Modulated Policy Gradients for Long-Horizon LLM Agents](https://arxiv.org/abs/2509.09265). arXiv:2509.09265.
16. Wang, H., et al. (2025). [SPA-RL: Reinforcing LLM Agents via Stepwise Progress Attribution](https://arxiv.org/abs/2505.20732). arXiv:2505.20732.
17. Wei, Z., et al. (2025). [WebAgent-R1: Training Web Agents via End-to-End Multi-Turn Reinforcement Learning](https://arxiv.org/abs/2505.16421). arXiv:2505.16421.
18. Schulman, J., Moritz, P., Levine, S., Jordan, M., Abbeel, P. (2015). [High-Dimensional Continuous Control Using Generalized Advantage Estimation](https://arxiv.org/abs/1506.02438). arXiv:1506.02438.
