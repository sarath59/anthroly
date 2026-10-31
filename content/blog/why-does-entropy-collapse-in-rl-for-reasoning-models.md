---
title: "Why Does Entropy Collapse in RL for Reasoning Models, and What Actually Fixes It?"
description: "Policy entropy falls sharply early in RLVR runs and performance saturates with it. Here is the mechanism (a covariance between log-probability and advantage), why a global entropy bonus is the wrong fix, what the token-level methods (clip-higher, Clip-Cov, KL-Cov, forking-token updates, asymmetric advantages) change, and why the prompt set and verifier decide most of the outcome."
tags:
  - rlvr
  - entropy-collapse
  - exploration
  - grpo
  - reasoning-models
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-25T12:50:00.000Z'
updatedAt: '2026-10-25T12:50:00.000Z'
faq:
  - question: "What is entropy collapse in reinforcement learning for LLMs?"
    answer: "Entropy collapse is the rapid drop in the policy's token-level entropy during RL training, so the model becomes very confident and samples nearly the same reasoning path every time. Cui et al. (2025) report that without an entropy intervention, entropy drops sharply early in training and policy performance saturates at the same time, which caps how much further RL compute can help."
  - question: "Why does policy entropy decrease during GRPO or PPO training?"
    answer: "Cui et al. (2025) show that the per-step change in entropy is driven by the covariance between a token's log-probability and the change in its logit, which under policy-gradient methods is proportional to the advantage. When high-probability tokens also get positive advantage, which is the common case, the covariance is positive and entropy falls. They measured the covariance as mostly positive throughout training, which explains the near-monotonic decline."
  - question: "Does adding an entropy bonus fix entropy collapse?"
    answer: "Usually not reliably. Several 2025-2026 papers report that global entropy regularization for LLM RL is highly sensitive to its coefficient and gives limited accuracy gains, because it raises uncertainty everywhere, including on tokens where uncertainty is just noise. Methods that act on a small set of high-entropy or high-covariance tokens, or that treat correct and incorrect rollouts differently, have stronger evidence."
  - question: "What are forking tokens in RLVR?"
    answer: "Forking tokens are the small minority of tokens in a chain of thought with high entropy, where the model chooses between reasoning directions. Wang et al. (2025) found RLVR mostly adjusts the entropy of these tokens, and that restricting policy-gradient updates to the top 20% highest-entropy tokens matched full updates on Qwen3-8B and beat them on Qwen3-32B by 11.04 points on AIME 2025."
  - question: "Is entropy collapse why RL models lose at pass@k with large k?"
    answer: "It is a large part of the story. Yue et al. (2025) found RLVR-trained models beat their base models at pass@1 but the base models scored higher at large k, consistent with RL narrowing the set of paths the model samples. ProRL (Liu et al., 2025) showed that with KL control, reference-policy resets and diverse tasks, prolonged RL can outperform the base model across pass@k, so the narrowing is a property of common training setups rather than an inevitability."
  - question: "How does Anthroly help teams avoid entropy collapse?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, builds the inputs that decide exploration: prompt sets calibrated to the model's pass-rate band, problems with multiple genuinely different valid solution paths, and verifiers that accept every correct form instead of one canonical answer string."
draft: false
---

**Run RLVR on a reasoning model without any entropy intervention and you will see the same curve almost every time: policy entropy falls off a cliff in the first few hundred steps, training reward climbs fast, and then everything flattens. The model has stopped exploring. This post explains the mechanism behind that curve, why the obvious fix (an entropy bonus) mostly disappoints, what the newer token-level fixes actually change, and the less fashionable point that the prompt set and the verifier decide most of whether exploration survives.**

## What exactly is collapsing?

For a policy $\pi_\theta$ generating response $y$ to prompt $x$, the token-level entropy at position $t$ is

$$
H_t = -\sum_{v \in \mathcal{V}} \pi_\theta(v \mid x, y_{<t}) \log \pi_\theta(v \mid x, y_{<t})
$$

and "policy entropy" in RL papers is usually this quantity averaged over generated tokens in a batch. Low entropy means the model puts almost all its probability on one next token at almost every step, so repeated samples for the same prompt look nearly identical.

[Cui et al. (2025)](https://arxiv.org/abs/2505.22617) studied this across many RL runs and report that, without an entropy intervention, entropy drops sharply at the start of training and that the drop is always accompanied by saturation of policy performance. They fit an empirical relation between entropy $H$ and downstream performance $R$:

$$
R = -a\,e^{H} + b
$$

The uncomfortable implication is in the boundary case. When entropy is exhausted ($H = 0$), predicted performance is $-a + b$, a ceiling you can read off the curve early in the run. In their framing, performance is being bought with entropy, and once the entropy budget is spent there is nothing left to trade.

This is not a quirk of one lab's setup. The [DAPO](https://arxiv.org/abs/2503.14476) authors list entropy collapse among the key issues of their naive GRPO baseline on Qwen2.5-32B, which reached only 30 points on AIME 2024, and the [Skywork-OR1 report](https://arxiv.org/abs/2505.22312) studies entropy dynamics in depth and concludes that mitigating premature entropy collapse is critical for test performance.

That links collapse to a result many teams have already seen in their own evals. [Yue et al. (2025)](https://arxiv.org/abs/2504.13837) found that RLVR-trained models beat their base models at small $k$ (pass@1) but the base models achieve a higher pass@k when $k$ is large. A policy that samples the same few paths gets more reliable on problems it already solves and stops finding solutions to the ones it does not.

## Why does entropy fall? The covariance mechanism

The useful contribution of Cui et al. is a mechanism, not only a curve. For a softmax policy, the first-order change in entropy at a state after one update is

$$
\Delta H \approx -\operatorname{Cov}_{a \sim \pi(\cdot \mid s)}\Big(\log \pi(a \mid s),\; z^{k+1}_{s,a} - z^{k}_{s,a}\Big)
$$

where $z$ are the logits. Under policy-gradient-style updates the logit change of a sampled token is proportional to its advantage, so entropy falls whenever tokens the model already likes also tend to receive positive advantage. In reasoning RL that is the default situation: the most probable continuation is usually the one the model was trained to produce, and it is usually the one that leads to the correct answer on problems the model can already solve. Cui et al. report that the measured covariance term matched the observed entropy differences and stayed mostly positive throughout training, which is why entropy declines nearly monotonically rather than oscillating.

Two practical consequences follow directly from that equation.

1. **Entropy loss is concentrated in a few tokens.** The covariance is dominated by tokens that are both high-probability and high-advantage. You do not need to fight entropy everywhere; you need to restrain the update on that small set.
2. **The data decides the sign.** If most of your prompts are ones the model already solves with its favorite path, the batch is full of "high probability, positive advantage" tokens and entropy drains quickly. The prompt mix is an entropy control knob whether you treat it as one or not.

## Why a global entropy bonus disappoints

The classic RL answer to premature convergence is a maximum-entropy bonus: add $\beta \cdot \bar{H}$ to the objective. For LLMs this has a poor track record. [Gu et al. (2026)](https://arxiv.org/abs/2604.04894) summarize the problem directly: entropy regularization in LLM RL is highly sensitive to its coefficient, can introduce semantically weak uncertainty, and often yields limited accuracy gains.

The reason is visible in the vocabulary size. A bonus that raises entropy uniformly pushes probability onto tens of thousands of tokens that are not plausible reasoning moves: misspellings, off-topic words, broken formatting. Too small a $\beta$ does nothing; slightly larger and the model starts emitting noise, entropy explodes, and the run is wasted. The lesson of the last year of work is that the goal is not more entropy, it is the right entropy in the right places.

## Which tokens actually matter?

Two 2025 analyses converge on the same picture.

[Wang et al. (2025)](https://arxiv.org/abs/2506.01939) examined token entropy in chains of thought and found that only a small fraction of tokens have high entropy, and that these act as forks that steer the model toward different reasoning paths. RLVR largely preserves the base model's entropy pattern and mostly adjusts the entropy of these high-entropy tokens. Restricting policy-gradient updates to the top 20% highest-entropy tokens matched full-gradient updates on Qwen3-8B and beat them on Qwen3-32B (+11.04 on AIME 2025, +7.71 on AIME 2024) and Qwen3-14B (+4.79 and +5.21). Training only on the 80% lowest-entropy tokens degraded performance.

[Cheng et al. (2025)](https://arxiv.org/abs/2506.14758) found high-entropy regions correlate with three kinds of exploratory behavior: pivotal tokens that connect logical steps, reflective actions such as self-verification and correction, and rare behaviors the base model under-explores. Their fix is a one-line change: add an entropy-based term to the advantage, which rewards longer and deeper reasoning rather than generic uncertainty, and it improved pass@k even at very large $k$.

A 2026 paper sharpens the point. [Jang et al. (2026, SCOPE)](https://doi.org/10.18653/v1/2026.findings-acl.641) argue that collapse is driven not by uniform entropy decay but by premature overconfidence at a small number of structurally critical decision points, and apply selective KL regularization to only the top ~5% of tokens by their score. [Xie et al. (2026, UCAS)](https://aclanthology.org/2026.findings-acl.951/) take a related route through the advantage: they modulate the response-level advantage by the model's overall self-confidence and add a token-level penalty based on raw logit certainty, encouraging uncertain paths that end correct and penalizing confident ones that end wrong.

## What do the main fixes change?

| Method | Where it intervenes | What it does | Source |
|---|---|---|---|
| Clip-higher | Importance-ratio clip | Raises the upper clip bound (0.28 vs 0.2) so low-probability tokens can gain mass faster | [DAPO](https://arxiv.org/abs/2503.14476) |
| Clip-Cov / KL-Cov | High-covariance tokens | Clips the gradient of, or applies KL to, the tokens driving entropy down | [Cui et al., 2025](https://arxiv.org/abs/2505.22617) |
| Forking-token updates | Top-20% entropy tokens | Restricts the policy gradient to high-entropy tokens | [Wang et al., 2025](https://arxiv.org/abs/2506.01939) |
| Entropy-shaped advantage | Advantage | Adds an entropy-based term to the advantage | [Cheng et al., 2025](https://arxiv.org/abs/2506.14758) |
| Selective KL (SCOPE) | Top ~5% scored tokens | KL regularization only at critical decision points | [Jang et al., 2026](https://doi.org/10.18653/v1/2026.findings-acl.641) |
| AsymGRPO | Positive vs negative advantages | Separate modulation strength for successful and failed rollouts | [Gu et al., 2026](https://arxiv.org/abs/2604.04894) |
| Advantage re-weighting (ARM) | Correct responses | Damps updates on over-confident correct paths | [Li et al., 2026](https://arxiv.org/abs/2602.05281) |
| KL + reference resets | Whole policy | KL control and periodic reset of the reference policy over long runs | [ProRL](https://arxiv.org/abs/2505.24864) |

The 2026 results are mostly about asymmetry. Gu et al. split GRPO's advantage into positive and negative outcome channels and find that positive-channel modulation raises "productive" entropy associated with successful trajectories, while negative-channel modulation removes "noisy" entropy associated with failed rollouts. Li et al. observe that the standard objective disproportionately reinforces the highest-likelihood correct path and suppresses alternative correct chains; damping updates on over-confident correct responses beat GRPO on Qwen2.5-7B by 5.7 points at pass@1 and 13.9 points at pass@32. The common thread: do not punish the model for confidence in general, punish it for collapsing onto one correct path when several exist.

There is also evidence that the damage is visible after training. [Tan et al. (2026)](https://arxiv.org/abs/2602.01698) report that in post-trained reasoning models, temperature sampling no longer increases pass@n, the final-layer posterior has sharply reduced entropy, and intermediate layers still have high entropy. Their decoding-time workaround gives small gains (0.61 points at pass@1, 1.03 at pass@16), which is a reminder that it is far cheaper to keep exploration alive during training than to recover it afterwards.

## How should you monitor it?

Track three numbers per step, not one. Mean token entropy alone hides the distribution; the forking-token results say the tail is what matters.

```python
import torch

def entropy_stats(logits, mask, top_frac=0.2):
    # logits: [B, T, V] for generated tokens; mask: [B, T] (1 = real token)
    logp = torch.log_softmax(logits.float(), dim=-1)
    H = -(logp.exp() * logp).sum(-1)              # [B, T]
    h = H[mask.bool()]
    k = max(1, int(top_frac * h.numel()))
    return {
        "entropy_mean": h.mean().item(),
        "entropy_top20_mean": h.topk(k).values.mean().item(),
        "frac_tokens_H_gt_0.5": (h > 0.5).float().mean().item(),
    }

def pass_at_k(n, c, k):
    # unbiased estimator (Chen et al., 2021): n samples, c correct
    if n - c < k:
        return 1.0
    prod = 1.0
    for i in range(n - c + 1, n + 1):
        prod *= 1.0 - k / i
    return 1.0 - prod
```

The alert condition worth acting on is the top-20% entropy falling while held-out pass@k at large $k$ (say $k = 32$ or $64$) stops improving or declines relative to pass@1. If pass@1 rises and pass@64 falls, you are trading coverage for reliability, which is exactly the trade Yue et al. measured. The 0.5-nat threshold above is an arbitrary example; calibrate it on your own base model's entropy distribution.

## What the papers underweight: entropy is set by your data

Most entropy work changes the loss. In practice the prompt set and the verifier move entropy at least as much, and they are cheaper to fix.

**All-correct and all-wrong groups.** Under group-relative advantages, a prompt where every sampled response is correct, or every one is wrong, gives zero advantage to every token. It contributes nothing to learning, but a prompt the model solves 15 times out of 16 contributes mostly "high probability, positive advantage" tokens, the exact pattern that drives the covariance term positive. A prompt mix skewed toward easy problems is an entropy drain. DAPO's dynamic sampling, which drops all-correct and all-wrong groups, and the difficulty-band selection we discuss in [how to choose prompts for RLVR](/blog/how-to-choose-prompts-for-rlvr-training) are entropy interventions as much as efficiency ones.

**Overconfident data is less informative data.** [Verma and Ravindran (2026)](https://arxiv.org/abs/2605.21266) found that a moderate GRPO warm-up produces rollouts with calibrated uncertainty and strong contrastive signal for later DPO, while excessive warm-up produces overconfident policies and less informative data. That is entropy collapse measured from the data side.

**Single-form verifiers punish alternative paths.** A verifier that accepts only one canonical answer string, one proof style, or one output format turns valid alternative solutions into negative advantage. The policy then learns that the only safe path is the most common one. This is our practitioner reading rather than a measured result, but it follows from the same mechanism: the verifier decides which paths get positive advantage, and a narrow verifier concentrates it. Auditing what your verifier rejects, as we describe in [how reliable are RLVR verifiers](/blog/how-reliable-are-rlvr-verifiers), is part of exploration control.

**Problems with one solution path cannot teach diversity.** If every problem in the set has essentially one route to the answer, there are no alternative correct chains for methods like ARM or AsymGRPO to protect. Problems written so that several genuinely different methods work (algebraic and geometric, constructive and by contradiction, brute force and closed form) give exploration something to find.

## A short decision guide

- **Entropy dropping fast in the first few hundred steps, reward rising, held-out pass@1 flat:** check the prompt mix first. Remove or down-weight prompts above roughly 90% pass rate and turn on dynamic sampling before touching the loss.
- **Prompt mix is healthy but entropy still collapses:** add clip-higher if you have not, then a token-targeted method (Clip-Cov or KL-Cov, or forking-token updates). Avoid a global entropy bonus unless you are prepared to sweep its coefficient carefully.
- **pass@1 improving, pass@k at large k declining:** you are narrowing. Consider asymmetric advantage treatment or re-weighting over-confident correct responses, and check whether your verifier rejects valid alternative forms.
- **Long runs that plateau:** the ProRL recipe of KL control plus periodic reference resets over a diverse task suite is the best-documented route to sustained gains.

## How Anthroly can help

Most of the levers above live in the data, not the optimizer. Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready to commit, builds exactly those inputs: prompt sets calibrated against your model's pass-rate band, problems authored to admit several genuinely different valid solution paths, and verifiers that accept every correct form rather than one canonical string, audited by domain experts. We also build held-out evaluation sets sized to measure pass@k at large $k$ reliably, so you can see narrowing before it costs you a training run.

If your RL runs are flattening early and you want to know whether the problem is the loss or the data, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [GRPO vs PPO vs DAPO: which RL algorithm for reasoning?](/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl)
- [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training)
- [Does RLVR teach new reasoning?](/blog/does-rlvr-teach-new-reasoning)
- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [DPO vs PPO and GRPO: when is offline preference optimization enough?](/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough)
- [Glossary: pass@k](/research/glossary#pass-at-k)
- [Why is multi-turn RL for LLM agents unstable, and how do you assign credit across turns?](/blog/why-is-multi-turn-rl-for-llm-agents-unstable)
- [Can LLMs improve without human data? What self-play and label-free RL actually show](/blog/can-llms-improve-without-human-data-self-play-rl)

---

## References

1. Cui, G., Zhang, Y., Chen, J., Yuan, L., Wang, Z., Zuo, Y., et al. (2025). [The Entropy Mechanism of Reinforcement Learning for Reasoning Language Models](https://arxiv.org/abs/2505.22617). arXiv:2505.22617.

2. Yue, Y., Chen, Z., Lu, R., Zhao, A., Wang, Z., Yue, Y., et al. (2025). [Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?](https://arxiv.org/abs/2504.13837). arXiv:2504.13837.

3. Wang, S., Yu, L., Gao, C., Zheng, C., Liu, S., Lu, R., et al. (2025). [Beyond the 80/20 Rule: High-Entropy Minority Tokens Drive Effective Reinforcement Learning for LLM Reasoning](https://arxiv.org/abs/2506.01939). arXiv:2506.01939.

4. Cheng, D., Huang, S., Zhu, X., Dai, B., Zhao, W. X., Zhang, Z., & Wei, F. (2025). [Reasoning with Exploration: An Entropy Perspective](https://arxiv.org/abs/2506.14758). arXiv:2506.14758.

5. Yu, Q., Zhang, Z., Zhu, R., Yuan, Y., Zuo, X., Yue, Y., et al. (2025). [DAPO: An Open-Source LLM Reinforcement Learning System at Scale](https://arxiv.org/abs/2503.14476). arXiv:2503.14476.

6. Liu, M., Diao, S., Lu, X., Hu, J., Dong, X., Choi, Y., et al. (2025). [ProRL: Prolonged Reinforcement Learning Expands Reasoning Boundaries in Large Language Models](https://arxiv.org/abs/2505.24864). arXiv:2505.24864.

7. He, J., Liu, J., Liu, C. Y., Yan, R., Wang, C., Cheng, P., et al. (2025). [Skywork Open Reasoner 1 Technical Report](https://arxiv.org/abs/2505.22312). arXiv:2505.22312.

8. Jang, J., Lee, H., & Kim, S. (2026). [A Few Bad Apples Spoil the Bunch: Preventing Global Entropy Collapse Driven by a Small Set of Tokens in LLM Reasoning](https://doi.org/10.18653/v1/2026.findings-acl.641). Findings of ACL 2026.

9. Xie, C., Pan, R., Wu, X., Zhang, Y., Fu, J., Gao, T., & Zhou, G. (2026). [Unlocking Exploration in RLVR: Uncertainty-aware Advantage Shaping for Deeper Reasoning](https://aclanthology.org/2026.findings-acl.951/). Findings of ACL 2026.

10. Gu, H., Han, X., Bian, Y., Wang, F., & Zhou, K. (2026). [Asymmetric Advantage Modulation Calibrates Entropy Dynamics in RLVR](https://arxiv.org/abs/2604.04894). arXiv:2604.04894.

11. Li, P., Goncharova, E., Kuznetsov, A., & Oseledets, I. (2026). [Back to Basics: Revisiting Exploration in Reinforcement Learning for LLM Reasoning via Generative Probabilities](https://arxiv.org/abs/2602.05281). arXiv:2602.05281.

12. Tan, W., Parascandolo, F., Sangineto, E., Ju, J., Luo, Z., Cao, Q., et al. (2026). [Restoring Exploration after Post-Training: Latent Exploration Decoding for Large Reasoning Models](https://arxiv.org/abs/2602.01698). arXiv:2602.01698.

13. Verma, R., & Ravindran, B. (2026). [How Much Online RL is Enough? Informative Rollouts for Offline Preference Optimization in RLVR](https://arxiv.org/abs/2605.21266). arXiv:2605.21266.

14. Chen, M., Tworek, J., Jun, H., Yuan, Q., et al. (2021). [Evaluating Large Language Models Trained on Code](https://arxiv.org/abs/2107.03374). arXiv:2107.03374.
