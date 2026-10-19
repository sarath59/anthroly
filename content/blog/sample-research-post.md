---
title: 'Sample Research Post: Reward Shaping for Tool-Using Agents'
description: 'A demonstration post showing the blog template features: math rendering, code blocks, tables, footnotes, and citations. Delete this once real posts exist.'
tags:
  - reward-design
  - rl-environments
  - sample
author:
  name: Anthroly Research
  credentials: 'Internal research team'
publishedAt: '2026-10-19T00:00:00.000Z'
updatedAt: '2026-10-19T00:00:00.000Z'
faq:
  - question: How are posts published?
    answer: Through an authenticated /api/content endpoint (when configured) or by committing Markdown files to content/blog/ and redeploying.
  - question: What markup features are supported?
    answer: GFM tables, fenced code blocks, KaTeX math, and standard Markdown. Footnotes are written as inline references.
draft: true
---

## Introduction

This sample post demonstrates the research blog template. It supports the features researchers need: equations, code, tables, and structured references.

When designing reward functions for tool-using agents, we face a fundamental trade-off between **sparse** and **dense** reward signals. Sparse rewards (e.g., task completion) are easy to specify but hard to learn from; dense rewards (e.g., per-step shaping) accelerate learning but risk reward hacking.

## Mathematical Foundations

Consider an MDP $(S, A, P, R, \gamma)$ where the agent must invoke external tools. The shaped reward $\tilde{R}$ is:

$$
\tilde{R}(s, a, s') = R(s, a, s') + \gamma \Phi(s') - \Phi(s)
$$

where $\Phi: S \to \mathbb{R}$ is a potential function. This preserves optimal policies under certain conditions (Ng et al., 1999).

Inline math also works: the discount factor $\gamma \in [0, 1)$ controls the horizon.

## Code Example

A minimal reward shaping implementation:

```python
import numpy as np

def shaped_reward(
    base_reward: float,
    potential_fn,
    state: np.ndarray,
    next_state: np.ndarray,
    gamma: float = 0.99
) -> float:
    """Potential-based reward shaping (PBRS)."""
    shaping = gamma * potential_fn(next_state) - potential_fn(state)
    return base_reward + shaping
```

## Empirical Results

We evaluated three reward designs on a synthetic tool-calling benchmark:

| Method | Success Rate | Steps to Solve | Reward Hacking |
| --- | --- | --- | --- |
| Sparse only | 42% | 847 ± 312 | None |
| Dense (naive) | 78% | 234 ± 89 | Frequent |
| PBRS | 81% | 251 ± 94 | Rare |

The potential-based approach matches dense reward efficiency while avoiding most reward-hacking behaviors.

## Discussion

Three observations emerge:

1. **Sparse rewards alone are insufficient** for complex tool sequences—agents struggle to discover the first successful trajectory.
2. **Naive dense rewards invite exploitation**—agents learn to maximize intermediate signals without completing the task.
3. **Potential-based shaping offers a middle path**—it provides learning signal without changing the optimal policy.

> "The right reward function is the one that produces the behavior you want, not the one that sounds most correct." — Informal observation from the Anthroly data team.

## Conclusion

Reward shaping remains critical for training tool-using agents. We recommend starting with sparse task rewards, then adding potential-based shaping only where needed.

Future work: applying these principles to multi-turn API-calling agents in production settings.
