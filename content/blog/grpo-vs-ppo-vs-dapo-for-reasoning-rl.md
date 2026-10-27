---
title: "GRPO vs PPO vs DAPO: Which RL Algorithm Should You Use to Train a Reasoning Model?"
description: "PPO, GRPO, Dr. GRPO, DAPO, VAPO, GSPO and CISPO differ in a handful of choices: whether there is a critic, how advantages are normalized, how losses are averaged over tokens, and where the importance ratio is clipped. Here is what each change does, what large controlled studies (ScaleRL, OXRL) say about whether the algorithm moves the ceiling or only the speed, and a decision guide for reasoning RL."
tags:
  - rlvr
  - grpo
  - ppo
  - rl-algorithms
  - reasoning-models
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-24T12:35:00.000Z'
updatedAt: '2026-10-24T12:35:00.000Z'
faq:
  - question: "What is the difference between GRPO and PPO?"
    answer: "PPO estimates advantages with a learned value model (critic), while GRPO drops the critic and uses each response's reward relative to the other responses sampled for the same prompt, normalized by the group's standard deviation. DeepSeekMath introduced GRPO to cut PPO's memory cost, and DeepSeek-R1 used it for reasoning RL. Both use the same clipped importance-ratio objective."
  - question: "Is DAPO better than GRPO?"
    answer: "In DAPO's own ablation on Qwen2.5-32B, naive GRPO reached 30 points on AIME 2024 and the full DAPO recipe reached 50. DAPO adds four changes: decoupled clipping (clip-higher, with an upper bound of 0.28 instead of 0.2), dynamic sampling that drops all-correct or all-wrong groups, a token-level loss, and overlong reward shaping. Later large-scale work (ScaleRL) found GSPO and CISPO losses reached a higher asymptotic pass rate than DAPO."
  - question: "Is GRPO biased?"
    answer: "Liu et al. (2025, Dr. GRPO) argue that GRPO's per-response length normalization and per-prompt standard-deviation normalization bias optimization: the first lets wrong answers grow longer with less penalty, the second upweights prompts that are nearly always right or wrong. Removing both recovers an unbiased policy gradient with a group-mean baseline and reduced the growth of incorrect-response length."
  - question: "Which RL algorithm is best for Mixture-of-Experts models?"
    answer: "Sequence-level or IS-weight-clipped objectives have the strongest evidence. The Qwen team reports GRPO needed a Routing Replay workaround for MoE RL to converge, while GSPO, which uses a length-normalized sequence-level importance ratio, did not. MiniMax's CISPO, which clips the importance weight instead of dropping token gradients, was used to train the 456B-parameter MiniMax-M1."
  - question: "Does the choice of RL algorithm matter more than data?"
    answer: "Usually less. ScaleRL (over 400,000 GPU-hours) found loss aggregation, normalization, curriculum and off-policy algorithm mostly change compute efficiency rather than the final asymptote, while a numerical fix (FP32 logits at the LM head) raised the asymptote from 0.52 to 0.61. A 2026 controlled study (OXRL) ranked leverage as model scale far above training paradigm, with loss-function changes worth about 1 point."
  - question: "How does Anthroly help with reasoning RL?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, builds the parts of reasoning RL that algorithms cannot fix: correct, verifiable, hard problems in the right difficulty band, audited answer checkers, and expert-labeled evaluation sets to compare algorithm variants fairly."
draft: false
---

**Every few weeks a new policy-optimization variant claims to beat GRPO on AIME. Underneath the acronyms, PPO, GRPO, Dr. GRPO, DAPO, VAPO, GSPO and CISPO differ in a small number of design choices: whether a critic estimates advantages, how advantages are normalized, how the loss is averaged over tokens, and where the importance ratio gets clipped. This post lays those choices side by side with the math, then looks at what the largest controlled studies say about the question practitioners actually care about: does the algorithm change how good the model ends up, or only how fast you get there?**

## What problem are all these algorithms solving?

All of them are descendants of PPO ([Schulman et al., 2017](https://arxiv.org/abs/1707.06347)). Rollouts are sampled from an older policy $\pi_{\text{old}}$, and the current policy $\pi_\theta$ is updated for several minibatch steps using a clipped surrogate. Per token $t$ of response $y_i$:

$$
\rho_{i,t}(\theta) = \frac{\pi_\theta(y_{i,t} \mid x, y_{i,<t})}{\pi_{\text{old}}(y_{i,t} \mid x, y_{i,<t})}, \qquad
\mathcal{L}_{i,t} = \min\Big(\rho_{i,t} \hat{A}_{i,t},\; \operatorname{clip}(\rho_{i,t}, 1-\varepsilon, 1+\varepsilon)\, \hat{A}_{i,t}\Big)
$$

The variants differ in three places:

1. **Where $\hat{A}$ comes from.** PPO learns a value model (critic) and uses generalized advantage estimation. GRPO ([Shao et al., 2024](https://arxiv.org/abs/2402.03300)) samples $G$ responses per prompt and uses the group as the baseline:

$$
\hat{A}_{i,t} = \frac{r_i - \operatorname{mean}(\{r_j\}_{j=1}^{G})}{\operatorname{std}(\{r_j\}_{j=1}^{G})}
$$

2. **How token losses are averaged.** Per response then per group (GRPO's original $\frac{1}{G}\sum_i \frac{1}{|y_i|}\sum_t$), over all tokens in the batch, or by a constant.

3. **What the ratio is and how it is clipped.** Per token or per sequence; clipping the update (PPO-style) or clipping the weight (CISPO).

DeepSeekMath introduced GRPO specifically to reduce PPO's memory and compute by removing the critic, and [DeepSeek-R1](https://arxiv.org/abs/2501.12948) used it to train reasoning with rule-based rewards. That is why GRPO became the default. Most of what followed is a list of fixes to it.

## What does each variant change?

| Method | Advantage | Loss averaging | Ratio and clipping | Main claim |
|---|---|---|---|---|
| PPO (2017) | Learned critic + GAE | Implementation-dependent | Token ratio, symmetric clip | General-purpose baseline |
| RLOO / REINFORCE-style ([Ahmadian et al., 2024](https://arxiv.org/abs/2402.14740)) | Leave-one-out group mean | Per sequence | Often no clipping | Simpler, beat PPO in RLHF |
| GRPO (2024) | Group mean / group std | Per response, then group | Token ratio, symmetric clip, KL to reference | Drops the critic |
| REINFORCE++ ([Hu et al., 2025](https://arxiv.org/abs/2501.03262)) | Normalized over the global batch | Batch | Token ratio, clip | Prompt-level normalization is biased |
| Dr. GRPO ([Liu et al., 2025](https://arxiv.org/abs/2503.20783)) | Group mean only (no std) | Constant (no length division) | As GRPO | Removes length and difficulty bias |
| DAPO ([Yu et al., 2025](https://arxiv.org/abs/2503.14476)) | Group-normalized | Token-level over the group | Decoupled clip: 0.2 low, 0.28 high; no KL | Clip-higher, dynamic sampling, overlong shaping |
| VAPO ([Yue et al., 2025](https://arxiv.org/abs/2504.05118)) | Learned critic, fixes for long CoT | Token-level | PPO-style | Value-based methods can win |
| GSPO ([Zheng et al., 2025](https://arxiv.org/abs/2507.18071)) | Group-normalized | Per sequence | Sequence-level, length-normalized ratio | Stable for MoE, no Routing Replay |
| CISPO ([MiniMax, 2025](https://arxiv.org/abs/2506.13585)) | Group-relative | Token-level | Clip the IS weight, keep every token's gradient | Keeps rare "fork" tokens learning |

### DAPO: four fixes and an honest ablation

DAPO is worth reading mainly for its ablation table. On Qwen2.5-32B, the authors' naive GRPO baseline reached **30** points on AIME 2024, well below the 47 that DeepSeek reported for its own RL on the same base. Adding components one at a time: overlong filtering (36), clip-higher (38), soft overlong punishment (41), token-level loss (42), dynamic sampling (**50**). Each piece targets a specific failure:

- **Clip-higher.** With symmetric clipping at 0.2, a low-probability token can only rise a little per update, which DAPO links to entropy collapse. Raising only the upper bound to 0.28 keeps exploration alive.
- **Dynamic sampling.** Drop groups whose responses are all right or all wrong, since they carry zero advantage, and keep sampling until the batch is full. (We cover the data side of this in [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training))
- **Token-level loss.** Average over all tokens in the group instead of per response first, so long responses are not underweighted per token.
- **Overlong shaping.** Truncated responses get a soft length penalty instead of a noisy zero.

DAPO also removes the KL penalty, arguing the long-CoT policy is supposed to move far from its initialization.

### Dr. GRPO: two normalizations that bias the gradient

[Liu et al. (2025)](https://arxiv.org/abs/2503.20783) identify two biases in GRPO as usually implemented:

- **Response-length bias.** Dividing each response's loss by $|y_i|$ means a correct short answer gets a larger per-token push than a correct long one, while an incorrect long answer is penalized less per token than an incorrect short one. The policy learns that being wrong at length is cheap, so incorrect responses grow.
- **Question-difficulty bias.** Dividing by the group's standard deviation upweights prompts whose rewards are nearly all 1 or all 0, which are exactly the prompts with the least information.

Dr. GRPO removes both and divides by a constant (for example the generation budget) instead. The resulting advantage is the group-centered reward $r_i - \bar{r}$, equivalent to RLOO up to a scale factor, and the objective becomes an unbiased PPO-style policy gradient. Their minimal recipe (Qwen2.5-Math-7B, MATH levels 3-5) reached 43.3% on AIME 2024 with 27 hours on 8 A100s, and the length of incorrect responses stopped growing. They also point out that popular PPO codebases introduce the same length bias through their loss averaging, so this is not only a GRPO issue.

### GSPO and CISPO: what to do about the importance ratio

The token-level ratio $\rho_{i,t}$ is an importance weight computed from a single sample per position. For long responses, many off-policy minibatch steps, and especially Mixture-of-Experts models whose routed experts can change between updates, it gets noisy.

**GSPO** ([Zheng et al., 2025](https://arxiv.org/abs/2507.18071)) replaces it with a length-normalized sequence ratio and clips whole responses:

$$
s_i(\theta) = \left(\frac{\pi_\theta(y_i \mid x)}{\pi_{\text{old}}(y_i \mid x)}\right)^{1/|y_i|} = \exp\!\Big(\frac{1}{|y_i|}\sum_{t=1}^{|y_i|} \log \rho_{i,t}(\theta)\Big)
$$

The Qwen team reports that GRPO on their MoE models needed **Routing Replay** (caching which experts were activated during rollout) to converge, and that GSPO removed the need for it. They also observed GSPO clips about two orders of magnitude more tokens than GRPO yet trains more efficiently, which they read as evidence that GRPO's token-level gradient estimates are noisy. GSPO was used in training the Qwen3 models.

**CISPO** ([MiniMax, 2025](https://arxiv.org/abs/2506.13585)) attacks a different symptom. MiniMax found that reflective tokens such as "However", "Recheck" and "Wait", which act as forks in reasoning, had low probability under their base model and large ratios after the first update, so PPO/GRPO clipping dropped their gradients for the remaining off-policy steps (they used 16 per generation batch). CISPO clips the importance weight and treats it as a constant, so every token still contributes a gradient:

$$
\mathcal{J}_{\text{CISPO}} = \mathbb{E}\Big[\tfrac{1}{\sum_i |y_i|}\sum_{i}\sum_{t} \operatorname{sg}\big(\hat{\rho}_{i,t}\big)\, \hat{A}_{i,t} \log \pi_\theta(y_{i,t} \mid x, y_{i,<t})\Big], \qquad \hat{\rho}_{i,t} = \operatorname{clip}(\rho_{i,t}, 1-\varepsilon_{\text{low}}, 1+\varepsilon_{\text{high}})
$$

where $\operatorname{sg}$ is stop-gradient. In MiniMax's controlled zero-RL comparison on Qwen2.5-32B with DAPO's math data, CISPO matched DAPO's AIME 2024 performance in half the training steps. MiniMax-M1's full RL run took three weeks on 512 H800 GPUs, at a reported rental cost of about USD 534,700.

The off-policy problem is still open. A January 2026 paper, [MinPRO (Lei et al., 2026)](https://arxiv.org/abs/2601.22718), argues the theoretically correct correction is the cumulative prefix ratio, that token-level approximations become unstable under large off-policy drift (as in asynchronous RL), and proposes a non-cumulative surrogate that improved stability over GRPO, GSPO and CISPO in its experiments.

## Does the algorithm change the ceiling or just the speed?

This is the most useful question, and [ScaleRL (Khatri et al., 2025)](https://arxiv.org/abs/2510.13786) is the most serious attempt to answer it: over 400,000 GPU-hours, fitting sigmoidal compute-vs-pass-rate curves so that each design choice can be scored on two separate axes, the asymptotic pass rate $A$ and the compute efficiency of reaching it.

Their findings, for verifiable math on an 8B dense model and a Llama-4 17B MoE (Scout):

- **Loss type does move the asymptote, in one direction.** GSPO and CISPO both reached a substantially higher asymptotic pass rate than DAPO. CISPO kept improving near-linearly for longer and was more robust to its clipping hyperparameter, so ScaleRL adopted it.
- **Most other details mainly change efficiency.** Loss aggregation, advantage normalization, curriculum and the off-policy setup mostly changed how fast runs reached the asymptote, not where it was. In leave-one-out ablations from the final recipe, removing individual components had little effect on the asymptote.
- **A numerical detail beat most algorithmic ones.** Computing the LM-head logits in FP32 for both generator and trainer (a precision mismatch MiniMax had identified) raised the asymptote from **0.52 to 0.61**.
- **The final recipe combined existing pieces:** PipelineRL-style asynchronous training, forced length interruptions, CISPO loss, prompt-level loss averaging, batch-level advantage normalization, FP32 logits, zero-variance filtering, and retiring prompts with pass rate at or above 0.9. It predicted a 100,000 GPU-hour run from shorter runs.

A March 2026 study, [OXRL (Li, 2026)](https://arxiv.org/abs/2603.19335), ran about 240 controlled runs on Qwen2.5 models from 0.5B to 7B, varying only the algorithm. Its conclusions point the same way from a different angle:

- **Rankings flip with scale.** Online RL (their SGRPO) was best at 1.5B (58.0% on GSM8K); by 7B, SimPO, which was worst at small scale, was best (85.8%).
- **Algorithm differences are mostly in-distribution.** A 19.3-point spread on GSM8K shrank to 0.54 points on MATH and 0.47 points on general-domain benchmarks.
- **Hierarchy of leverage:** model scale (about 50 points) far above training paradigm (about 10), above online vs. offline (about 9), above loss-function tweaks (about 1).

OXRL's runs are small and partly LoRA-based, and GSM8K is close to saturated for these models, so take its numbers as a warning about generalizing small-scale ablations rather than as a ranking. The convergent message from both studies: once the basics are right, the policy-gradient variant is a second-order choice compared with the model, the data, the reward, and numerical stability.

## Is PPO with a critic obsolete?

No. [VAPO (Yue et al., 2025)](https://arxiv.org/abs/2504.05118), from the same ByteDance Seed group as DAPO, went back to a learned value model and fixed the three things that usually break critics in long chain-of-thought RL: value-model bias, heterogeneous sequence lengths, and sparse rewards. On Qwen2.5-32B it reached **60.4** on AIME 2024, more than 10 points above DAPO under identical settings, within 5,000 steps and without training crashes across runs. A small 2025 comparison on Countdown ([Lian, 2025](https://arxiv.org/abs/2512.07611)) also found all three of PPO, GRPO and DAPO improved over the base model, with larger group sizes improving stability and accuracy for the group methods. It also found DAPO worked best with dynamic sampling turned off, a reminder that recipe components tuned at 32B on AIME do not automatically transfer.

The trade-off is the usual one. A critic costs memory and adds a second model to tune, and it has to be good enough on long sequences to beat a simple group baseline. Critic-free methods are easier to run at scale, which is why they dominate open recipes, not because a value baseline is wrong.

## A decision guide

| Your situation | Reasonable default | Why |
|---|---|---|
| First RLVR run, dense model, synchronous training | GRPO with token-level loss, no std normalization (Dr. GRPO style), clip-higher | Fixes the known biases with minimal machinery |
| Long CoT, many minibatch steps per rollout batch | CISPO or GSPO | Rare high-ratio tokens keep contributing; better asymptote in ScaleRL |
| Mixture-of-Experts policy | GSPO (or CISPO) | Sequence-level ratio avoids Routing Replay |
| Asynchronous or highly off-policy pipeline | CISPO-style truncated IS, monitor ratio statistics; watch prefix-ratio work | Token ratios get unreliable as policy lag grows |
| You can afford and tune a critic | VAPO-style PPO | Strong reported results on AIME with stable training |
| Small model, small budget, quick ablations | Whatever your framework implements correctly, multiple seeds | Rankings at small scale may not transfer |

Whatever you pick, check the implementation of loss averaging and advantage normalization in your framework rather than trusting the name; Dr. GRPO's point is that two codebases can both call themselves GRPO or PPO and optimize different objectives.

## What the algorithm cannot fix

Every result above was measured on verifiable math or code, with curated prompt sets and carefully engineered answer checkers. DAPO converted its answers to integers so the parser would not introduce errors. ScaleRL's best single improvement was numerical, not algorithmic. The parts that dominate outcomes are upstream of the loss:

- **The prompt set.** Zero-variance groups produce no gradient for any group-relative method, and a saturated pool caps every algorithm. See [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training)
- **The verifier.** False negatives remove signal on exactly the hardest prompts, and false positives get amplified by any optimizer. See [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- **The evaluation.** In-distribution gains between algorithms can vanish on held-out benchmarks, as OXRL found. Comparing variants needs eval sets large enough to resolve the differences you are claiming; see [How many eval items do you need?](/blog/how-many-eval-items-do-you-need)

## How Anthroly can help

The algorithm is the easiest part of reasoning RL to change and, according to the best evidence, rarely the part that decides the result. The hard parts are the problems, the checkers and the evals.

Anthroly builds expert data and RL environments for AI labs. We have about 100-150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains. We write correct, verifiable, hard problems in the difficulty band your policy needs, audit reference answers and answer checkers, and build expert-labeled held-out evaluation sets so that when you compare GRPO against CISPO or a critic-based variant, the difference you measure is real. It is the same work that goes into a [training-grade RL environment](/blog/what-makes-a-training-grade-rl-environment).

If you are choosing an RL recipe and want the data side to stop being the bottleneck, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training)
- [Does RL with verifiable rewards teach models new reasoning?](/blog/does-rlvr-teach-new-reasoning)
- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [Where should step-level rewards for AI agents come from?](/blog/step-level-rewards-for-ai-agents)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [RLVR vs. RLHF](/research/compare/rlvr-vs-rlhf)
- [Why does entropy collapse in RL for reasoning models?](/blog/why-does-entropy-collapse-in-rl-for-reasoning-models)
- [DPO vs PPO and GRPO: when is offline preference optimization enough?](/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough)
- [Why does RLHF make models verbose? Length bias in reward models, DPO and GRPO](/blog/why-does-rlhf-make-models-verbose-length-bias)
- [Why is multi-turn RL for LLM agents unstable, and how do you assign credit across turns?](/blog/why-is-multi-turn-rl-for-llm-agents-unstable)

---

## References

1. Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347). arXiv:1707.06347.

2. Shao, Z., Wang, P., Zhu, Q., Xu, R., Song, J., et al. (2024). [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300). arXiv:2402.03300.

3. DeepSeek-AI (2025). [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](https://arxiv.org/abs/2501.12948). arXiv:2501.12948.

4. Ahmadian, A., Cremer, C., Galle, M., Fadaee, M., Kreutzer, J., Pietquin, O., Ustun, A., & Hooker, S. (2024). [Back to Basics: Revisiting REINFORCE Style Optimization for Learning from Human Feedback in LLMs](https://arxiv.org/abs/2402.14740). arXiv:2402.14740.

5. Hu, J., Liu, J. K., Xu, H., & Shen, W. (2025). [REINFORCE++: Stabilizing Critic-Free Policy Optimization with Global Advantage Normalization](https://arxiv.org/abs/2501.03262). arXiv:2501.03262.

6. Liu, Z., Chen, C., Li, W., Qi, P., Pang, T., Du, C., Lee, W. S., & Lin, M. (2025). [Understanding R1-Zero-Like Training: A Critical Perspective](https://arxiv.org/abs/2503.20783). arXiv:2503.20783.

7. Yu, Q., Zhang, Z., Zhu, R., Yuan, Y., Zuo, X., et al. (2025). [DAPO: An Open-Source LLM Reinforcement Learning System at Scale](https://arxiv.org/abs/2503.14476). arXiv:2503.14476.

8. Yue, Y., Yuan, Y., Yu, Q., Zuo, X., Zhu, R., et al. (2025). [VAPO: Efficient and Reliable Reinforcement Learning for Advanced Reasoning Tasks](https://arxiv.org/abs/2504.05118). arXiv:2504.05118.

9. Zheng, C., Liu, S., Li, M., Chen, X.-H., Yu, B., et al. (2025). [Group Sequence Policy Optimization](https://arxiv.org/abs/2507.18071). arXiv:2507.18071.

10. MiniMax (2025). [MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention](https://arxiv.org/abs/2506.13585). arXiv:2506.13585.

11. Lei, S., Cheng, Z., & Tao, D. (2026). [A Step Back: Prefix Importance Ratio Stabilizes Policy Optimization](https://arxiv.org/abs/2601.22718). arXiv:2601.22718.

12. Khatri, D., Madaan, L., Tiwari, R., Bansal, R., Duvvuri, S. S., et al. (2025). [The Art of Scaling Reinforcement Learning Compute for LLMs](https://arxiv.org/abs/2510.13786). arXiv:2510.13786.

13. Li, X. (2026). [Do Post-Training Algorithms Actually Differ? A Controlled Study Across Model Scales Uncovers Scale-Dependent Ranking Inversions](https://arxiv.org/abs/2603.19335). arXiv:2603.19335.

14. Lian, Y. (2025). [Comparative Analysis and Parametric Tuning of PPO, GRPO, and DAPO for LLM Reasoning Enhancement](https://arxiv.org/abs/2512.07611). arXiv:2512.07611.
