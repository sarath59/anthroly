---
title: "Why Does Training-Inference Mismatch Destabilize LLM RL? vLLM vs FSDP Numerics, MoE Routing, Stale Rollouts and the Fixes That Work"
description: "A practitioner's guide to the training-inference mismatch in LLM reinforcement learning: why rollout engines and trainers assign different probabilities to the same tokens, how BF16 rounding, non-batch-invariant kernels, MoE routing and asynchronous staleness turn on-policy RL into off-policy RL, and what truncated importance sampling, sequence masking, FP16, routing replay, score centering and resynchronization each fix."
tags:
  - reinforcement-learning
  - rlvr
  - rl-infrastructure
  - training-stability
  - grpo
  - reasoning
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-04T05:00:00.000Z'
updatedAt: '2026-11-04T05:00:00.000Z'
faq:
  - question: "What is the training-inference mismatch in LLM RL?"
    answer: "Modern RL stacks sample rollouts with a fast inference engine such as vLLM or SGLang and compute gradients with a training backend such as FSDP or Megatron. Even with identical weights, the two engines assign different probabilities to the same tokens because of floating-point precision, different kernels and, for mixture-of-experts models, different expert routing. Yao et al. (2025) showed some tokens get probability near 1 in vLLM and near 0 in FSDP. The data is therefore off-policy even when the algorithm assumes it is on-policy."
  - question: "Why does the mismatch cause sudden RL collapse?"
    answer: "The policy gradient is computed with the trainer's log-probabilities on samples drawn from a different distribution, so updates are biased. The error concentrates on low-probability tokens, which agentic and long reasoning rollouts produce more often, and its effect grows with sequence length. Liu, Li et al. (2025) traced gradient-norm explosions in multi-turn tool-use RL on Qwen3-14B-Base to this mismatch rather than to hyperparameters, and Thinking Machines reported a reward collapse with a matching spike in sampler-trainer KL when no correction was used."
  - question: "What is truncated importance sampling (TIS)?"
    answer: "TIS multiplies each token's policy-gradient term by the ratio of the trainer's probability to the sampler's probability, capped at a constant C, so the update corrects for the sampler being a different distribution without letting a few extreme ratios dominate. It was proposed by Yao et al. (2025) and integrated into OAT, SkyRL and OpenRLHF. Later work showed token-level truncation is biased and proposed sequence-level ratios, sequence masking and confidence-aware caps."
  - question: "Does switching to FP16 fix the mismatch?"
    answer: "Qi et al. (2025) argue the root cause is BF16's low mantissa precision and show that running RL fine-tuning uniformly in FP16 virtually eliminates the mismatch, with more stable optimization and faster convergence across algorithms, model families, LoRA, a 14B dense model and an MoE model, validated in VeRL and Oat. FP16 needs loss scaling and does not address MoE routing differences or staleness from asynchronous rollouts, so it is one fix among several."
  - question: "Why are mixture-of-experts models especially unstable in RL?"
    answer: "Small numerical differences can flip which experts a token is routed to, which changes the computation discontinuously. Ma et al. (2025) found routing discrepancies between training and inference, and even between repeated forward passes in the same framework. Their Rollout Routing Replay (R3) records the inference engine's routing and replays it in training; it reduced sampler-trainer KL and outperformed GSPO and TIS. The Qwen team found routing replay plus clipping essential once off-policy updates are used."
  - question: "How do you monitor training-inference mismatch?"
    answer: "Log the per-token log-ratio between trainer and sampler probabilities on every batch: its mean, high quantiles and maximum, a KL estimate, the share of tokens whose ratio is clipped or masked, and the normalized effective sample size of the importance weights. Break the statistics out by sampler token probability and by sequence length. A rising maximum or falling effective sample size often precedes collapse while the mean KL still looks small."
  - question: "How does Anthroly help with RL training stability?"
    answer: "Anthroly supplies the data side of stable RL: expert-written and expert-checked prompts and environments, audits of whether reward gains reflect real capability, review of rollouts from collapsed or suspicious runs, and held-out expert evaluation sets that are scored on the deployment engine. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Most reinforcement learning runs on language models are not as on-policy as their loss function assumes. The rollouts come from a fast inference engine, the gradients come from a training framework, and the two quietly disagree about the probability of the tokens being trained on. For a year that disagreement was treated as noise. A cluster of 2025-2026 results shows it is a leading cause of sudden RL collapse, that it gets worse exactly where frontier labs are pushing (long reasoning, agents, mixture-of-experts, low-precision and asynchronous rollouts), and that the fixes trade off bias, variance, cost and deployment fidelity in ways worth understanding before you pick one.**

## The short answer

There are two sources of mismatch and they need different treatment. **Numerical discrepancy**: same weights, different numbers, caused by BF16 rounding, kernels that are not batch-invariant, a lower-precision LM head, quantized rollouts and, in MoE models, different expert routing. **Policy lag**: asynchronous or pipelined systems sample with weights that are already a few updates old. Both make the training data off-policy. Remove what you can at the source (consistent precision, FP32 logits or FP16, routing replay, batch-invariant kernels when you can afford them), correct the rest with importance weights that are truncated or masked at the sequence level, and monitor the tails of the sampler-trainer log-ratio, not its mean. If correction cannot keep the effective sample size up, resynchronize instead of correcting harder.

## Where does the mismatch come from?

The standard REINFORCE-style update assumes samples come from the policy being differentiated:

$$
\mathbb{E}_{y \sim \pi_\theta}\big[ R(y) \cdot \nabla \log \pi_\theta(y) \big]
$$

In a hybrid stack the expectation is actually taken under the sampler $\mu_\theta$ while the log-probability belongs to the learner $\pi_\theta$. [Yao, Liu et al. (2025)](https://fengyao.notion.site/off-policy-rl) made this concrete for vLLM as sampler and FSDP as learner: despite sharing parameters, the two produced significantly different token probabilities, and for some tokens vLLM gave probability 1 where FSDP gave 0. Their first patches targeted two suspects, vLLM not returning the probabilities it actually sampled from and an LM head that ran in lower precision than the Hugging Face implementation (an issue also noted in the [MiniMax-M1 report](https://arxiv.org/abs/2506.13585)), before turning to an algorithmic correction.

The sources stack:

| Source | Mechanism | Typical symptom |
|---|---|---|
| Floating-point precision | BF16's short mantissa amplifies rounding differences between kernels ([Qi et al., 2025](https://arxiv.org/abs/2510.26788)) | Small, persistent log-prob gaps on every token |
| Kernel and batch dependence | Reductions in matmul, attention and RMSNorm change order with batch size, chunked prefill or split-KV ([He and Thinking Machines, 2025](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)) | Same prompt gives different numerics under different load |
| LM head precision | Logits computed in BF16 in one engine and FP32 in the other | Gaps concentrated in the softmax tail |
| MoE routing | Tiny differences flip top-k expert selection ([Ma et al., 2025](https://arxiv.org/abs/2510.11370)) | Large, discontinuous per-token disagreements |
| Quantized rollouts | FP8 weights or KV cache in the sampler only ([Qiu et al., 2026](https://arxiv.org/abs/2601.18150)) | Mismatch grows with quantization aggressiveness |
| Asynchrony | Sampler holds stale weights while the trainer moves ([AReaL](https://arxiv.org/abs/2505.24298), [PipelineRL](https://arxiv.org/abs/2509.19128), [Asynchronous RLHF](https://arxiv.org/abs/2410.18252)) | Mismatch that grows with lag and feeds back into updates |

The kernel row deserves emphasis because it is widely misunderstood. Thinking Machines showed that LLM forward passes are run-to-run deterministic; the nondeterminism users see comes from kernels that are not **batch-invariant**, so a request's numerics depend on what else is in the batch. Sampling 1,000 completions at temperature 0 from Qwen3-235B-A22B-Instruct-2507 produced 80 unique outputs, identical for the first 102 tokens. With batch-invariant kernels all 1,000 were identical. An RL trainer is never in the same batch configuration as a serving engine, so even perfectly matched precision would not make the numbers agree without this work.

## Why does a small mismatch cause a big collapse?

Three properties turn a numerically small gap into a training failure.

**The error is concentrated on low-probability tokens.** [Liu, Li et al. (2025)](https://yingru.notion.site/When-Speed-Kills-Stability-Demystifying-RL-Collapse-from-the-Training-Inference-Mismatch-271211a558b7808d8b12d403fd15edda) traced repeated gradient-norm explosions in multi-turn tool-integrated RL on Qwen3-14B-Base to the mismatch after ruling out the usual suspects (token-in-token-out agent loop, Adam betas, advantage normalization). The disagreement was most severe on low-probability tokens, which produce large gradients, and out-of-distribution tool responses pushed the model into exactly those regions. They also report that the same setup could succeed on one GPU type and fail on another.

**The bias compounds with length.** Policy-gradient surrogates are first-order approximations. [Li, Liu et al. (2025)](https://arxiv.org/abs/2512.23075) show the classical trust-region bound on the approximation error scales as $O(T^2)$ in sequence length $T$, which is vacuous for long reasoning traces. Their tighter bounds still depend on the maximum token-level divergence in a sequence, a quantity PPO-style token clipping cannot control. One bad token in a 30,000-token rollout is a sequence-level problem.

**The surrogate is only valid when both mismatch and staleness are small.** The Qwen team's formulation paper ([Zheng et al., 2025](https://arxiv.org/abs/2512.01374)) derives that optimizing the token-level surrogate approximates the true sequence-level objective only when the training-inference discrepancy and policy staleness are both minimized. In experiments on a 30B MoE model over hundreds of thousands of GPU hours, plain policy gradient with importance-sampling correction was the most stable on-policy recipe, while off-policy updates required clipping plus routing replay.

The clearest single picture comes from Thinking Machines' RLVR run on BigMath with a Qwen2.5-VL 8B policy and 4,096-token rollouts. Without off-policy correction, reward collapsed partway through training, with a loss spike around step 318 and a matching spike in sampler-trainer KL. With importance weighting, KL hovered around 0.001 with occasional spikes and training proceeded. With bitwise-identical sampler and trainer ("true on-policy"), KL was exactly zero and training was also smooth.

## What do the main fixes do?

Write the per-token ratio between learner and sampler as

$$
\rho_t = \frac{\pi_\theta(y_t \mid y_{<t})}{\mu_\theta(y_t \mid y_{<t})}
$$

and the sequence ratio as $\rho(y) = \prod_t \rho_t$. Most algorithmic fixes are different ways of using, capping or discarding these numbers.

**Truncated importance sampling (TIS).** Weight each token's gradient by $\min(\rho_t, C)$. Yao et al. proposed it as a drop-in patch, and it was integrated into OAT, SkyRL and OpenRLHF. It is cheap and usually prolongs training, but token-level truncation is biased.

**Sequence-level correction and masking.** Liu, Li et al. argue the bias is a sequence-level problem and propose sequence-level truncated IS, rejecting (masking) sequences whose ratio leaves a trust region, and a geometric, length-normalized mask so that long sequences are not rejected just because a product of many ratios drifts. Trust Region Masking (Li, Liu et al., 2025) formalizes masking entire sequences that violate the trust region and gives the first non-vacuous monotonic-improvement guarantees for long-horizon LLM RL. The cost is variance and discarded data.

**Sequence-level ratios in the objective.** [GSPO](https://arxiv.org/abs/2507.18071) defines the importance ratio on sequence likelihood and clips at the sequence level, which its authors report notably stabilizes MoE RL. [IcePop](https://arxiv.org/abs/2510.18855), used to train the trillion-parameter Ring-1T, masks and clips tokens by their training-inference discrepancy.

**Fix the numbers instead of the estimator.** [Qi et al. (2025)](https://arxiv.org/abs/2510.26788) argue BF16 itself is the root cause: its wide range suits pre-training, but its few mantissa bits produce rounding errors that break training-inference consistency. Running RL fine-tuning uniformly in FP16 virtually eliminated the mismatch and improved stability, convergence speed and final performance across GRPO, GSPO, TIS, MIS and plain policy gradient, several model families, LoRA, a 14B dense model and an MoE model, in both VeRL and Oat. They also point out two costs of algorithmic patches: an extra forward pass to compute the ratio (roughly 25% more training compute under their accounting), and a **deployment gap**, since the final weights are optimized for the trainer's distribution, not the inference engine users will hit. [ScaleRL](https://arxiv.org/abs/2510.13786), a 400,000-GPU-hour study, independently found that FP32 precision at the LM head gave a considerable boost in asymptotic reward and kept it in its final recipe.

**Align MoE routing.** Rollout Routing Replay (R3) records the routing chosen by the inference engine and replays it during training. Ma et al. report it significantly reduced sampler-trainer KL and extreme discrepancies without slowing training, and outperformed GSPO and TIS at preventing collapse.

**Make the sampler deterministic.** Batch-invariant kernels make sampler and trainer bitwise identical. In Thinking Machines' unoptimized demonstration, a 1,000-request benchmark on Qwen3-8B took 55 seconds versus 26 for default vLLM, and 42 seconds with an improved attention kernel. That throughput cost is the reason most teams correct rather than eliminate.

## What changed in 2026: drift, lag and calibrated caps

The newest work splits the problem more carefully and finds that corrections designed for one source can fail on the other.

- **Score centering.** [Marek and Ryabinin (2026)](https://arxiv.org/abs/2609.20807) argue instability under mismatch is driven mainly by **drift**, a persistent bias between engines that accumulates every step. An additive score-centering correction alone matched or beat importance-sampling methods under quantization on models from 0.6B to 30B, with the gap growing as mismatch got worse, and composed with importance sampling in staleness experiments.
- **Discrepancy versus lag.** [Li, Zhou and Lan (2026)](https://arxiv.org/abs/2610.40945) evaluate the trainer at the sampler's weights to split each token's error into a numerical discrepancy, which stays roughly constant through training, and a policy lag, which feeds back on itself because each biased update enlarges the next lag. On Qwen3-1.7B, importance weighting held only until the normalized effective sample size of the lag ratio fell below one half. Their discrepancy-lag correction centers the discrepancy, clips the lag ratio and **resynchronizes the sampler** when effective sample size drops below 0.5, keeping KL from on-policy training within twice the KL between two independent on-policy runs.
- **Confidence-aware truncation.** [Yu et al. (2026)](https://arxiv.org/abs/2609.32444) model the mismatch as an additive displacement in log-odds whose distribution is roughly independent of token confidence, which implies the right ratio cap should tighten as confidence rises. Their calibrated importance sampling (CIS) bounds the second moment that makes exact IS high-variance, put less truncation bias on low-confidence tokens than TIS, and gave the best five-benchmark math average on all three MoE models tested. They also found that clipping small importance weights upward hurt held-out accuracy.
- **Low precision is now a mismatch budget.** FP8-RL (Qiu et al., 2026) reports up to 44% rollout throughput gains from FP8 linear layers and KV cache in veRL, with learning comparable to BF16 only after adding token-level TIS or MIS rollout correction.

## A decision guide

| Situation | First move | Add if still unstable | Cost |
|---|---|---|---|
| Dense model, synchronous, BF16 | FP32 LM head; return true sampling log-probs | TIS, or switch RL fine-tuning to FP16 | Small; FP16 needs loss scaling |
| Long reasoning or agent rollouts | Sequence-level masking or geometric mask | Trust-region masking of whole sequences | Discarded samples, higher variance |
| MoE policy | Routing replay | Sequence-level ratios (GSPO-style), clipping | Router logging and replay plumbing |
| FP8 or other quantized rollouts | Rollout correction (TIS/MIS) from day one | Score centering for drift | Ratio computation per step |
| Asynchronous or pipelined RL | Bound the lag in steps | Lag-ratio clipping plus ESS-triggered resync | Some lost throughput at resync |
| Reproducibility-critical research | Batch-invariant kernels, true on-policy | None needed | Large rollout slowdown today |

## How should you monitor it?

Treat the sampler-trainer log-ratio as a first-class training metric, logged every step and sliced, because aggregate KL hides the tokens that cause collapse.

```python
import torch

def mismatch_stats(logp_train, logp_sample, mask, seq_ids, clip_c=2.0):
    """Per-batch training-inference mismatch diagnostics.
    logp_train, logp_sample: [N] log-probs of sampled tokens under trainer and sampler.
    mask: [N] bool, response tokens only. seq_ids: [N] sequence index per token."""
    lr = (logp_train - logp_sample)[mask]            # log rho_t
    rho = lr.exp()
    k3 = (rho - 1 - lr).mean()                        # low-variance KL(sampler||trainer) estimate
    p_s = logp_sample[mask].exp()
    low = p_s < 0.1                                   # where the bias concentrates
    w = rho.clamp(max=clip_c)
    ess = (w.sum() ** 2) / (w.numel() * (w ** 2).sum())   # normalized effective sample size
    seq_lr = torch.zeros(int(seq_ids.max()) + 1).index_add_(0, seq_ids[mask], lr)
    return {
        "kl_k3": k3.item(),
        "abs_logratio_p99": lr.abs().quantile(0.99).item(),
        "abs_logratio_max": lr.abs().max().item(),
        "abs_logratio_low_prob_mean": lr[low].abs().mean().item() if low.any() else 0.0,
        "frac_clipped": (rho > clip_c).float().mean().item(),
        "ess_norm": ess.item(),
        "seq_logratio_max": seq_lr.abs().max().item(),
    }
```

Three habits matter more than the exact statistics:

1. **Alert on tails and trends, not means.** The maximum token log-ratio, the low-probability bucket and the sequence-level maximum move first. In Thinking Machines' run the KL spike coincided with the reward crash; a dashboard that averages over thousands of tokens can smooth that into nothing.
2. **Slice by length, turn and tool response.** Agent rollouts that ingest unusual tool outputs and very long traces are where the bias compounds. If one environment or one tool dominates the tail, fix that environment before tuning the estimator.
3. **Record the hardware and engine version with every run.** Liu, Li et al. saw identical setups behave differently across GPU types. A mismatch regression after an inference-engine upgrade is a real bug, not bad luck.

## What teams get wrong

- **Debugging the optimizer when the bug is in the numerics.** Sudden gradient-norm spikes after a stable stretch look like a learning-rate problem. Check sampler-trainer disagreement before sweeping hyperparameters.
- **Using the probabilities the engine reports instead of the ones it sampled from.** Yao et al. had to patch vLLM to return the actual sampling probabilities. Temperature, top-p and logit processors make the reported and sampled distributions differ.
- **Token-level fixes for a sequence-level problem.** PPO clipping and per-token truncation cannot bound a long sequence's error that is driven by its worst token.
- **Turning on FP8 or asynchrony without a correction and a monitor.** Both are worthwhile throughput levers, and both enlarge the mismatch by design.
- **Correcting harder when you should resynchronize.** Once the importance weights collapse onto a few samples, no truncation scheme recovers a good gradient. Bound staleness and resync.
- **Evaluating on the trainer engine.** Corrections optimize the trainer's distribution. Score checkpoints with the engine and precision you deploy, or the deployment gap stays invisible.
- **Comparing algorithms across stacks with different mismatch.** A recipe that wins in one framework can lose in another for numerical reasons; Qi et al. reported framework-specific differences between VeRL and Oat. Report precision, engine and correction alongside any algorithm comparison.

## Where does data quality fit in?

Mismatch is an infrastructure problem, but data determines where it bites. The tokens with the worst disagreement are low-probability tokens, and the rollouts that generate them are the ones that hit unusual prompts, long derivations, rare tool outputs and environments with odd observations. Two practical consequences. First, when a run collapses, the rollouts from the steps just before the spike are diagnostic data: reviewing them tells you whether the trigger was a broken environment, a malformed tool response or a genuinely hard problem. Second, a stable reward curve is not proof of learning. Reward that rises because the policy found a numerically favored region of the trainer's distribution will not transfer to the deployment engine, so the decisive check is a held-out, expert-validated evaluation scored on the inference stack you actually ship.

## How Anthroly can help

Anthroly provides the data side of stable RL: expert-written and expert-checked prompts and environments, review of rollouts from collapsed or suspicious runs, audits of whether reward gains correspond to real capability, and held-out evaluation sets written and graded by PhD experts in the target domain. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If your RL runs collapse after a stable stretch and you want an expert look at what the rollouts and evals are actually telling you, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [GRPO vs PPO vs DAPO: which RL algorithm should you use?](/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl)
- [Why does entropy collapse in RL for reasoning models?](/blog/why-does-entropy-collapse-in-rl-for-reasoning-models)
- [Why is multi-turn RL for LLM agents unstable?](/blog/why-is-multi-turn-rl-for-llm-agents-unstable)
- [Does RLVR teach new reasoning or just sharpen it?](/blog/does-rlvr-teach-new-reasoning)
- [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training)
- [How are unit tests generated for code RL rewards?](/blog/how-are-unit-tests-generated-for-code-rl-rewards)

---

## References

1. Noukhovitch, M., Huang, S., Xhonneux, S., Hosseini, A., Agarwal, R., & Courville, A. (2024). [Asynchronous RLHF: Faster and More Efficient Off-Policy RL for Language Models](https://arxiv.org/abs/2410.18252). arXiv:2410.18252.
2. Fu, W., Gao, J., Shen, X., et al. (2025). [AReaL: A Large-Scale Asynchronous Reinforcement Learning System for Language Reasoning](https://arxiv.org/abs/2505.24298). arXiv:2505.24298.
3. MiniMax et al. (2025). [MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention](https://arxiv.org/abs/2506.13585). arXiv:2506.13585.
4. Zheng, C., Liu, S., Li, M., et al. (2025). [Group Sequence Policy Optimization](https://arxiv.org/abs/2507.18071). arXiv:2507.18071.
5. Yao, F., Liu, L., Zhang, D., Dong, C., Shang, J., & Gao, J. (2025). [Your Efficient RL Framework Secretly Brings You Off-Policy RL Training](https://fengyao.notion.site/off-policy-rl). Blog post.
6. He, H., & Thinking Machines Lab (2025). [Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/). Thinking Machines Lab: Connectionism.
7. Liu, J., Li, Y., Fu, Y., Wang, J., Liu, Q., & Shen, Y. (2025). [When Speed Kills Stability: Demystifying RL Collapse from the Training-Inference Mismatch](https://yingru.notion.site/When-Speed-Kills-Stability-Demystifying-RL-Collapse-from-the-Training-Inference-Mismatch-271211a558b7808d8b12d403fd15edda). Blog post.
8. Piché, A., Kamalloo, E., Pardinas, R., Chen, X., & Bahdanau, D. (2025). [PipelineRL: Faster On-policy Reinforcement Learning for Long Sequence Generation](https://arxiv.org/abs/2509.19128). arXiv:2509.19128.
9. Ma, W., Zhang, H., Zhao, L., et al. (2025). [Stabilizing MoE Reinforcement Learning by Aligning Training and Inference Routers](https://arxiv.org/abs/2510.11370). arXiv:2510.11370.
10. Khatri, D., Madaan, L., Tiwari, R., et al. (2025). [The Art of Scaling Reinforcement Learning Compute for LLMs](https://arxiv.org/abs/2510.13786). arXiv:2510.13786.
11. Ling Team et al. (2025). [Every Step Evolves: Scaling Reinforcement Learning for Trillion-Scale Thinking Model](https://arxiv.org/abs/2510.18855). arXiv:2510.18855.
12. Qi, P., Liu, Z., Zhou, X., Pang, T., Du, C., Lee, W. S., & Lin, M. (2025). [Defeating the Training-Inference Mismatch via FP16](https://arxiv.org/abs/2510.26788). arXiv:2510.26788.
13. Zheng, C., Dang, K., Yu, B., et al. (2025). [Stabilizing Reinforcement Learning with LLMs: Formulation and Practices](https://arxiv.org/abs/2512.01374). arXiv:2512.01374.
14. Li, Y., Liu, J., Xu, J., et al. (2025). [Trust Region Masking for Long-Horizon LLM Reinforcement Learning](https://arxiv.org/abs/2512.23075). arXiv:2512.23075.
15. Qiu, Z., Yu, S., Zhang, J., et al. (2026). [FP8-RL: A Practical and Stable Low-Precision Stack for LLM Reinforcement Learning](https://arxiv.org/abs/2601.18150). arXiv:2601.18150.
16. Marek, M., & Ryabinin, M. (2026). [Score Centering Stabilizes Off-policy Reinforcement Learning](https://arxiv.org/abs/2609.20807). arXiv:2609.20807.
17. Yu, T., Zhao, K., Li, S., et al. (2026). [Rethinking Training-Inference Mismatch in LLM Reinforcement Learning: Where It Arises and How to Correct It](https://arxiv.org/abs/2609.32444). arXiv:2609.32444.
18. Li, Y., Zhou, Y., & Lan, T. (2026). [On the Origin and Evolution of Training-Inference Mismatch in LLM Reinforcement Learning](https://arxiv.org/abs/2610.40945). arXiv:2610.40945.
