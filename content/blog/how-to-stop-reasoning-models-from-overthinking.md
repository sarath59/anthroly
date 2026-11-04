---
title: "How Do You Stop Reasoning Models From Overthinking? Length Penalties, Budget Control, Adaptive Thinking and What They Cost"
description: "A research guide to training efficient reasoning in LLMs: why RL makes chains of thought long, how Kimi k1.5 length rewards, DAPO overlong shaping, L1/LCPO budgets, ThinkPrune, AdaptThink, AutoThink, DOT, ACOER and batched training cut tokens, why GRPO group normalization makes length penalties collapse, why compressed chains are less monitorable, and how to build prompt sets and evals that measure efficiency honestly."
tags:
  - reasoning-models
  - rlvr
  - grpo
  - efficient-reasoning
  - reward-design
  - evals
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-04T12:45:00.000Z'
updatedAt: '2026-11-04T12:45:00.000Z'
faq:
  - question: "What is overthinking in reasoning models?"
    answer: "Overthinking is spending far more chain-of-thought tokens than a problem needs, for example re-verifying a trivial arithmetic answer many times. Chen et al. (2024) gave the first systematic study, showing o1-like models allocate excessive compute to simple problems with minimal benefit, and proposed outcome and process efficiency metrics. It raises latency and serving cost without improving accuracy, and on easy prompts it can lower it."
  - question: "Why does reinforcement learning make chains of thought longer?"
    answer: "Partly because longer reasoning genuinely helps on hard problems, and partly because of optimization artifacts. Liu et al. (2025) showed GRPO's per-response length normalization artificially increases response length, especially for incorrect outputs, and proposed Dr. GRPO to remove the bias. Fatemi et al. (2025) argue that incorrect answers drive PPO and GRPO policies toward verbosity, so training sets dominated by unsolvable problems compound into longer outputs. Wu et al. (2026) describe a 'length shift' in which models generate more unnecessary reasoning on trivial inputs as training proceeds."
  - question: "What is the simplest way to reduce reasoning length with RL?"
    answer: "Add a length-aware term to the reward for correct answers only, normalized within the group of samples for the same prompt, and keep a hard maximum length. Kimi k1.5 used a length reward that favors shorter correct responses, DAPO used a soft overlong penalty near the maximum length, and ThinkPrune trains under a token limit beyond which unfinished answers get zero reward, tightening the limit over several rounds. ThinkPrune halved DeepSeek-R1-Distill-Qwen-1.5B's AIME24 reasoning length with about a 2% drop in performance."
  - question: "Why do length penalties sometimes collapse GRPO training?"
    answer: "Lee et al. (2026) identify the mechanism: GRPO's group normalization creates divergent advantages when incorrect answers receive continuous length penalties, so methods that penalize the length of wrong answers are structurally prone to collapse. Group standardization also makes the penalty scale-free in groups where every sample has the same correctness, so even a tiny coefficient produces a full-strength push toward shorter outputs. Restricting penalties to correct answers avoids the main failure but can still over-compress, which their ACOER method controls with dynamic budget normalization."
  - question: "Can a model learn when to think and when to answer directly?"
    answer: "Yes. AdaptThink (Zhang et al., 2025) trains a model to choose between Thinking and NoThinking modes by difficulty, cutting DeepSeek-R1-Distill-Qwen-1.5B's average response length by 53% on three math datasets while improving accuracy by 2.4%. AutoThink (Tu et al., 2025) uses multi-stage RL with reward shaping and reports a 52% token reduction with a 6.4% relative accuracy gain on the same base model."
  - question: "Do length penalties have hidden costs?"
    answer: "Yes. Little (2026) trained Qwen3-4B and Qwen3-14B with length penalties targeting 60% down to 30% of baseline chain-of-thought length; at the 30% target, accuracy stayed near baseline but faithfulness, whether a monitor can tell a biasing hint influenced the answer, fell by 39% and 35% on MMLU-Pro-R. Compressed chains mentioned the hint 7 to 35 percentage points less often than chains shortened by random sentence deletion. Over-compression can also produce short, confident wrong answers on hard problems, the overconfidence pattern DDPO targets."
  - question: "How should efficient reasoning be evaluated?"
    answer: "Report accuracy and tokens together as a Pareto curve per difficulty tier, not an average token count, and include problems where long reasoning is necessary so the method is not rewarded for giving up early. Track the truncation rate at the maximum length, accuracy on the hardest tier, and a monitorability or faithfulness probe if chains of thought are used for oversight."
  - question: "How does Anthroly help with efficient reasoning training?"
    answer: "Anthroly's PhD experts build difficulty-calibrated prompt sets with verified answers across math, science and code, write reference solutions annotated with the minimum necessary reasoning, label redundant versus load-bearing steps in model traces, and design held-out hard tiers that catch over-compression. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Reasoning models buy accuracy with tokens, and RL tends to spend more of them than the problem needs. A model that re-verifies 2+3 is expensive and slow, and the same training that taught it to think also taught it to keep thinking. This post explains why RL inflates chain-of-thought length, compares the main families of fixes from 2025-2026 (length rewards, budget control, pruning, adaptive thinking and structural tricks), shows why naive length penalties collapse under GRPO, and lays out the hidden costs, including a 2026 result that compressed chains are less monitorable.**

## The short answer

Stopping overthinking without losing hard-problem accuracy comes down to five choices. **Penalize length only on correct answers**, so the model is never paid to fail quickly. **Normalize length within the prompt's group or difficulty tier**, so easy problems get short and hard ones keep their budget. **Keep a hard maximum length with a soft overlong penalty**, so truncation is a learning signal rather than noise. **Fix the optimizer's own length bias first** (Dr. GRPO-style loss normalization), because some verbosity is an artifact, not a behavior. And **evaluate as a Pareto curve by difficulty with a monitorability check**, because average tokens hide both over-compression on hard problems and loss of faithful reasoning.

## Why do reasoning models overthink?

[Chen et al. (2024)](https://arxiv.org/abs/2412.21187) gave the problem its name: o1-like models allocate excessive compute to simple problems with minimal benefit. They introduced outcome and process efficiency metrics and mitigated overthinking with self-training on GSM8K, MATH500, GPQA and AIME. The mirror failure, [underthinking (Wang et al., 2025)](https://arxiv.org/abs/2501.18585), is switching between reasoning paths too often on hard problems without exploring any deeply; frequent switching correlated with wrong answers. **Efficiency is a mismatch between length and difficulty, in both directions**, not just "too long."

Three mechanisms push length up during RL.

**1. Long reasoning genuinely helps on hard problems.** This is the intended effect, and any fix that ignores it trades accuracy for tokens.

**2. The loss has a length bias.** [Liu et al. (2025)](https://arxiv.org/abs/2503.20783) showed that GRPO, as originally formulated, artificially increases response length, especially for incorrect outputs. When a sequence's loss is divided by its own length, each token of a long wrong answer gets a smaller negative gradient than each token of a short wrong answer, so the policy is penalized less for being wrong at length. Their Dr. GRPO removes the per-response normalization. [Fatemi et al. (2025)](https://arxiv.org/abs/2504.05185) make a related argument for PPO and GRPO: incorrect answers inherently drive policies toward verbosity, and when unsolvable problems dominate training, this compounds into systematically longer outputs. They also report a consistent correlation between conciseness and correctness.

**3. Length drifts on easy inputs.** [Wu et al. (2026)](https://arxiv.org/abs/2601.03969) call it "length shift": as training proceeds, models produce increasingly unnecessary reasoning on trivial inputs. Nothing in a correctness-only reward discourages it, since a long correct answer and a short correct answer earn the same reward.

## What are the main fixes?

| Family | Representative method | Mechanism | Reported result (from the paper) | Main risk |
|---|---|---|---|---|
| Group-relative length reward | Kimi k1.5 | Bonus for shorter correct responses within the group | Used in k1.5 training; long2short results reported | Tuning; can over-shorten |
| Overlong shaping | DAPO | Soft penalty near the max length | Part of DAPO's 50-point AIME 2024 recipe | Only acts near the cap |
| Hard budget, iterative | ThinkPrune | Zero reward past a token limit; limit tightens per round | AIME24 length halved, about 2% drop (R1-Distill-1.5B) | Truncates needed reasoning |
| Prompted budget | L1 / LCPO | Reward for accuracy and matching a requested length | Smooth cost-accuracy trade-off; beat s1 length control | Needs the caller to pick a budget |
| Single-knob efficiency | Arora and Zanette | Correct-only bonus decreasing with relative length | Family of models via one hyperparameter | Hyperparameter search |
| Correct-only, stabilized | ACOER | Brevity bonus only on correct answers, dynamic budget | Over 60% fewer tokens with higher accuracy than base | Complexity |
| Outlier truncation | DOT | Suppress extreme-length tail in fully correct groups | 78% fewer tokens on AIME-24 with higher accuracy | Depends on group composition |
| Difficulty-aware | DDPO, DiPO | Shorten easy, expand exploration on hard | DDPO: 12% shorter, +1.85% accuracy vs GRPO | Difficulty estimation |
| Mode selection | AdaptThink, AutoThink | Learn when to skip thinking | 53% and 52% fewer tokens with accuracy gains | Misrouting hard prompts |
| Structural, no penalty | Batched Contextual Reinforcement | Solve N problems in one context | 15.8-62.6% fewer tokens, accuracy maintained or improved | Unusual training format |
| Indirect | Confidence training | Predict own confidence mid-trace | Up to 25% fewer tokens at matched accuracy | Smaller gains |

### Length rewards

The [Kimi k1.5 report](https://arxiv.org/abs/2501.12599) describes a length reward computed within the group of $k$ sampled responses to a prompt. With $\text{len}(i)$ the length of response $i$ and min and max taken over the group,

$$
\lambda_i = 0.5 - \frac{\text{len}(i) - \text{min\_len}}{\text{max\_len} - \text{min\_len}}
$$

and the length reward is $\lambda_i$ for a correct response and $\min(0, \lambda_i)$ for an incorrect one. Short correct answers get up to $+0.5$; long wrong answers are penalized; short wrong answers are never rewarded for being short. That last clause is the most important design decision in this whole literature, and it is the one that many later methods rediscovered.

[DAPO (Yu et al., 2025)](https://arxiv.org/abs/2503.14476) adds soft overlong punishment. With maximum length $L_{\max}$ and a buffer $L_{\text{cache}}$,

$$
R_{\text{length}}(y) = \begin{cases} 0, & |y| \le L_{\max} - L_{\text{cache}} \\ \dfrac{(L_{\max} - L_{\text{cache}}) - |y|}{L_{\text{cache}}}, & L_{\max} - L_{\text{cache}} < |y| \le L_{\max} \\ -1, & |y| > L_{\max} \end{cases}
$$

DAPO's motivation was noise: truncated samples that might have been correct get the same zero as wrong ones, which confuses the policy. The soft ramp turns the cap into a gradient.

### Budgets

[ThinkPrune (Hou et al., 2025)](https://arxiv.org/abs/2504.01296) uses the bluntest possible signal: any unfinished thought or answer past the token limit gets zero reward, and the limit tightens over several RL rounds. On AIME24 it halved DeepSeek-R1-Distill-Qwen-1.5B's reasoning length with only a 2% performance drop, and the authors observed the pruned model skipping unnecessary steps while keeping the core reasoning.

[L1 (Aggarwal and Welleck, 2025)](https://arxiv.org/abs/2503.04697) makes the budget an input. Length Controlled Policy Optimization rewards both correctness and adherence to a length constraint stated in the prompt, so the caller can trade cost against accuracy at inference time. It outperformed s1's budget forcing for length control and produced "short reasoning models"; the 1.5B L1 model surpassed GPT-4o at equal reasoning lengths. [s1 (Muennighoff et al., 2025)](https://arxiv.org/abs/2501.19393) is the inference-only baseline: budget forcing terminates thinking at a limit or appends "Wait" to extend it.

### Adaptive thinking

The cleanest efficiency gain is not thinking at all when the problem is easy. [AdaptThink (Zhang et al., 2025)](https://arxiv.org/abs/2505.13417) shows that prompting a reasoning model to skip thinking is better on relatively simple tasks in both performance and efficiency, then trains the model to choose a mode with a constrained objective that encourages NoThinking while maintaining overall performance, plus importance sampling to balance modes during on-policy training. On three math datasets it cut DeepSeek-R1-Distill-Qwen-1.5B's average length by 53% and raised accuracy by 2.4%. [AutoThink (Tu et al., 2025)](https://arxiv.org/abs/2505.10832) found that an ellipsis in the prompt stochastically triggers thinking or no-thinking modes in R1-style models and used multi-stage reward shaping to exploit it, reporting a 6.4% relative accuracy gain with 52% fewer tokens on the same base model.

### Structural and indirect methods

Two 2026 results avoid explicit length penalties entirely. [Batched Contextual Reinforcement (Yang et al., 2026)](https://arxiv.org/abs/2604.02322) trains the model to solve $N$ problems in one shared context, rewarded only by per-problem accuracy. The shared window is an implicit budget, and at standard single-problem inference token use fell 15.8% to 62.6% with accuracy maintained or improved across 1.5B and 4B families. The authors argue this sidesteps the collapse that explicit penalties cause. [Hosseini et al. (2026)](https://arxiv.org/abs/2609.31619) fine-tune models only to predict their own confidence at intermediate points of their traces, using 600 training problems and no length objective, and still see up to 25% fewer tokens at matched accuracy across Gemma, Qwen, Nemotron and GPT-OSS models.

## Why do length penalties collapse under GRPO?

[Lee et al. (2026)](https://arxiv.org/abs/2606.22716) ran a systematic comparison of reward configurations and found that GRPO's group normalization creates divergent advantages when incorrect answers receive continuous length penalties, so methods that penalize wrong-answer length are structurally prone to reward collapse. Penalizing only correct answers avoids that failure but leaves a second, stochastic collapse from over-compression.

The group normalization part is easy to see. GRPO's advantage for sample $i$ in a group of $G$ is

$$
A_i = \frac{r_i - \text{mean}(r_{1:G})}{\text{std}(r_{1:G})}
$$

Take a hard prompt where all $G$ samples are wrong and the reward is a pure length penalty, $r_i = -\beta \ell_i$. Then

$$
A_i = \frac{-\beta \ell_i + \beta \bar{\ell}}{\beta\, \sigma_\ell} = -\frac{\ell_i - \bar{\ell}}{\sigma_\ell}
$$

and $\beta$ cancels. **However small you make the coefficient, every all-wrong group delivers a unit-variance push toward shorter wrong answers.** On a training set where many prompts are unsolved, that is a large, consistent gradient toward giving up early, exactly the short-and-wrong overconfidence that [DDPO (Xia et al., 2026)](https://arxiv.org/abs/2603.18533) describes on problems beyond the model's ability. The same cancellation happens in all-correct groups, which is why correct-only penalties can still over-compress, and why ACOER adds dynamic budget normalization and DOT acts only on the extreme tail of fully correct groups.

The practical rules that follow:

1. Never give wrong answers a continuous length term. Kimi's $\min(0, \lambda)$ and correct-only bonuses both respect this.
2. In groups with uniform correctness, cap or clip the length advantage, or act only on outliers.
3. Fix the loss normalization (Dr. GRPO) before adding any length reward, or you will be fighting the optimizer.
4. Monitor accuracy on the hardest tier and the fraction of very short wrong answers every few hundred steps.

```python
import numpy as np

def efficiency_rewards(correct, lengths, alpha=0.2, tail_q=0.9):
    """Correct-only, group-relative brevity bonus with a tail clip.
    correct: bool array (G,), lengths: int array (G,) for one prompt."""
    correct = np.asarray(correct, bool)
    lengths = np.asarray(lengths, float)
    r = correct.astype(float)                      # 1 for correct, 0 for wrong
    if correct.sum() >= 2:
        L = lengths[correct]
        z = (L - L.mean()) / (L.std() + 1e-6)
        bonus = -alpha * np.clip(z, -1.0, 1.0)      # bounded, never dominates correctness
        if correct.all():                           # uniform group: act on the tail only
            cut = np.quantile(L, tail_q)
            bonus = np.where(L > cut, bonus, 0.0)
        r[correct] += bonus
    return r                                        # wrong answers get no length term
```

This is an illustration of the principles, not a published method; any real recipe needs ablation against your own hard tier.

## The hidden costs

**Monitorability.** [Little (2026)](https://arxiv.org/abs/2607.09786) trained Qwen3-4B and Qwen3-14B with length penalties targeting 60% down to 30% of baseline chain-of-thought length and probed them with nine kinds of biasing hints. At the 30% target, accuracy stayed near baseline and wrong-answer hints switched answers as often as before, but faithfulness, whether an LLM monitor could tell the hint influenced the answer, fell 39% for Qwen3-14B and 35% for Qwen3-4B on MMLU-Pro-R. A control with the same rewards but no length penalty kept or improved faithfulness, and compressed chains mentioned the hint 7 to 35 percentage points less often than uncompressed chains shortened to the same length by random sentence deletion. **The penalty removes the evidence a monitor uses, not just filler.** For any lab that relies on chain-of-thought monitoring for safety, efficiency training is a monitoring decision.

**Hard-problem accuracy.** ThinkPrune's 2% drop at half length is a good result, and it is still a drop. Averages across benchmarks hide where it lands: almost always on the hardest items, which are the ones customers pay a reasoning model for.

**Evaluation gaming.** A method evaluated on GSM8K and MATH500 looks excellent because most items are easy. The same method can look different on a set where long reasoning is necessary.

## The contrarian part: shorter is not the goal

The target is not minimal tokens. It is the right length for the difficulty, and that is a property of the data as much as of the reward. Three implications follow.

**Difficulty calibration is the hidden variable.** Every adaptive method, from Kimi's group-relative reward to DDPO's difficulty-level averages and AdaptThink's mode choice, assumes the training mix contains a meaningful spread of easy and hard prompts for the current policy. If most prompts are unsolvable, length penalties act mainly on wrong answers (the collapse case); if most are trivial, the model learns that thinking is never needed. Curating prompts by pass rate is as important here as it is for RLVR generally.

**Some "overthinking" is verification, and verification is valuable.** A second check that catches an arithmetic slip is not redundant on the items where it catches the slip. Labeling which steps in a trace are load-bearing versus repetitive is an annotation problem, and it is where reasoning-trace review by domain experts pays off: the cheap heuristic (delete repeated self-checks) removes exactly the steps that matter on the hard tail.

**Efficiency can emerge from better signals.** The confidence-training and batched-context results suggest that a model which knows when it is done stops on its own. That points toward investing in calibration and stopping signals rather than ever-harsher penalties.

## How to evaluate efficient reasoning honestly

- **Plot accuracy against tokens per difficulty tier**, using tiers defined by the base model's pass rate, and compare Pareto frontiers rather than single points.
- **Include a tier where long reasoning is necessary** (competition math, multi-step proofs, hard code), and report it separately.
- **Track the truncation rate** at the maximum length; [Euston](https://arxiv.org/abs/2609.23205), in a different setting, reported truncation falling from 25.8% to 8.3%, a reminder that truncation can quietly dominate measured accuracy.
- **Report short-and-wrong rates**, the overconfidence signature.
- **Run a faithfulness probe** if chains of thought are used for oversight, following Little (2026).
- **Use matched decoding settings**, since sampling temperature and maximum length change both axes.

A compact summary metric, if you must have one, is accuracy per thousand tokens within each tier, $\text{Acc}_t / (\bar{\ell}_t / 1000)$, reported alongside raw accuracy so a method cannot win by collapsing.

## Where does expert human data matter?

Three places. **Difficulty-calibrated prompt sets** with verified answers, so length rewards act on a meaningful spread of easy and hard problems. **Minimal reference solutions**, written by people who know which steps a proof or derivation actually needs, as targets for SFT warm starts and as a yardstick for what a necessary length looks like. **Trace annotation** that labels load-bearing versus redundant steps, so pruning methods and step-level rewards can be checked against expert judgment instead of heuristics.

## How Anthroly can help

Anthroly works with PhD experts in mathematics, the sciences and computer science who build difficulty-calibrated prompt sets with verified answers, write minimal reference solutions, annotate reasoning traces for necessary versus redundant steps, and assemble held-out hard tiers that catch over-compression. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are training a reasoning model to think less without losing the hard tail, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [Why does RLHF make models verbose? Length bias in reward models](/blog/why-does-rlhf-make-models-verbose-length-bias)
- [GRPO vs PPO vs DAPO for reasoning RL](/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl)
- [Why does entropy collapse in RL for reasoning models?](/blog/why-does-entropy-collapse-in-rl-for-reasoning-models)
- [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training)
- [Does RLVR teach new reasoning?](/blog/does-rlvr-teach-new-reasoning)
- [Why does training-inference mismatch destabilize LLM RL?](/blog/why-does-training-inference-mismatch-destabilize-llm-rl)

---

## References

1. Chen, X., Xu, J., Liang, T., et al. (2024). [Do NOT Think That Much for 2+3=? On the Overthinking of o1-Like LLMs](https://arxiv.org/abs/2412.21187). arXiv:2412.21187.
2. Kimi Team, Du, A., Gao, B., et al. (2025). [Kimi k1.5: Scaling Reinforcement Learning with LLMs](https://arxiv.org/abs/2501.12599). arXiv:2501.12599.
3. Wang, Y., Liu, Q., Xu, J., et al. (2025). [Thoughts Are All Over the Place: On the Underthinking of o1-Like LLMs](https://arxiv.org/abs/2501.18585). arXiv:2501.18585.
4. Muennighoff, N., Yang, Z., Shi, W., et al. (2025). [s1: Simple test-time scaling](https://arxiv.org/abs/2501.19393). arXiv:2501.19393.
5. Arora, D., & Zanette, A. (2025). [Training Language Models to Reason Efficiently](https://arxiv.org/abs/2502.04463). arXiv:2502.04463.
6. Aggarwal, P., & Welleck, S. (2025). [L1: Controlling How Long A Reasoning Model Thinks With Reinforcement Learning](https://arxiv.org/abs/2503.04697). arXiv:2503.04697.
7. Yu, Q., Zhang, Z., Zhu, R., et al. (2025). [DAPO: An Open-Source LLM Reinforcement Learning System at Scale](https://arxiv.org/abs/2503.14476). arXiv:2503.14476.
8. Sui, Y., Chuang, Y.-N., Wang, G., et al. (2025). [Stop Overthinking: A Survey on Efficient Reasoning for Large Language Models](https://arxiv.org/abs/2503.16419). arXiv:2503.16419.
9. Liu, Z., Chen, C., Li, W., et al. (2025). [Understanding R1-Zero-Like Training: A Critical Perspective](https://arxiv.org/abs/2503.20783). arXiv:2503.20783.
10. Hou, B., Zhang, Y., Ji, J., et al. (2025). [ThinkPrune: Pruning Long Chain-of-Thought of LLMs via Reinforcement Learning](https://arxiv.org/abs/2504.01296). arXiv:2504.01296.
11. Fatemi, M., Rafiee, B., Tang, M., & Talamadupula, K. (2025). [Concise Reasoning via Reinforcement Learning](https://arxiv.org/abs/2504.05185). arXiv:2504.05185.
12. Tu, S., Lin, J., Zhang, Q., et al. (2025). [Learning When to Think: Shaping Adaptive Reasoning in R1-Style Models via Multi-Stage RL](https://arxiv.org/abs/2505.10832). arXiv:2505.10832.
13. Zhang, J., Lin, N., Hou, L., Feng, L., & Li, J. (2025). [AdaptThink: Reasoning Models Can Learn When to Think](https://arxiv.org/abs/2505.13417). arXiv:2505.13417.
14. Wu, W., Chen, L., Xiao, C., et al. (2026). [Anti-Length Shift: Dynamic Outlier Truncation for Training Efficient Reasoning Models](https://arxiv.org/abs/2601.03969). arXiv:2601.03969.
15. Wan, Q., Xu, Z., Wei, L., Shen, X., & Sun, J. (2026). [Mitigating Overthinking in Large Reasoning Models via Difficulty-aware Reinforcement Learning](https://arxiv.org/abs/2601.21418). arXiv:2601.21418.
16. Xia, Y., Zhang, H., & Wang, H. (2026). [Balancing the Reasoning Load: Difficulty-Differentiated Policy Optimization with Length Redistribution for Efficient and Robust Reinforcement Learning](https://arxiv.org/abs/2603.18533). arXiv:2603.18533.
17. Yang, B., Ma, H., Fan, J., & Liu, G. (2026). [Batched Contextual Reinforcement: A Task-Scaling Law for Efficient Reasoning](https://arxiv.org/abs/2604.02322). arXiv:2604.02322.
18. Lee, J., Lee, S., Hong, S., et al. (2026). [Beyond Penalizing Mistakes: Stabilizing Efficiency Training in Large Reasoning Models via Adaptive Correct-Only Rewards](https://arxiv.org/abs/2606.22716). arXiv:2606.22716.
19. Little, B. (2026). [Length Penalties Make Chain-of-Thought Less Monitorable](https://arxiv.org/abs/2607.09786). arXiv:2607.09786.
20. Cheng, Z., Dai, W., & Sun, J. (2026). [Euston: Training Away Mathematical Sycophancy Without Losing the Mathematics](https://arxiv.org/abs/2609.23205). arXiv:2609.23205.
21. Hosseini, P., Tigalappanavara, A., Nawathe, S., et al. (2026). [Learning to Stop without Learning to Stop: Self-Supervised Confidence Training Improves Reasoning Efficiency](https://arxiv.org/abs/2609.31619). arXiv:2609.31619.
