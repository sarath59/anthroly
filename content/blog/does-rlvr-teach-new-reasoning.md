---
title: "Does RL with Verifiable Rewards Teach Models New Reasoning, or Just Sharpen What They Already Know?"
description: "2025–2026 evidence suggests RLVR improves pass@1 by biasing models toward existing high-reward paths, not by teaching new reasoning capabilities. This has direct implications for environment design, verifier quality, and when expert-authored tasks matter most."
tags:
  - rlvr
  - reinforcement-learning
  - reasoning
  - verifiers
  - post-training
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-21T14:00:00.000Z'
updatedAt: '2026-10-21T14:00:00.000Z'
faq:
  - question: "What is RLVR and how does it differ from RLHF?"
    answer: "Reinforcement Learning with Verifiable Rewards (RLVR) uses rule-based rewards—checking whether the final answer matches ground truth or passes unit tests—instead of learned reward models. The term was introduced by Tulu 3 (Lambert et al., 2024). Unlike RLHF, RLVR doesn't require human preference labels, making it cheaper to scale but limiting it to domains with objectively verifiable answers."
  - question: "Does RLVR teach models new reasoning capabilities?"
    answer: "Recent evidence suggests not. Yue et al. (2025) showed that while RLVR improves pass@1 accuracy, it does not expand the set of problems a model can solve. At high sample counts (pass@256), base models actually outperform their RLVR-trained counterparts. The reasoning paths RLVR models produce already exist in the base model's distribution."
  - question: "What is the pass@k crossover effect?"
    answer: "The crossover effect occurs when RLVR-trained models outperform base models at low k (e.g., pass@1) but underperform at high k (e.g., pass@256). This suggests RLVR concentrates probability mass on high-reward paths rather than expanding reasoning capability. The crossover point varies by benchmark but typically occurs around k=32-128."
  - question: "Why do spurious rewards sometimes work for RLVR?"
    answer: "Shao et al. (2025) showed that GRPO's clipping mechanism amplifies high-prior behaviors from pretraining, even without informative rewards. For models like Qwen2.5-Math that have strong 'code reasoning' priors, random or incorrect rewards still produce gains because RLVR is surfacing existing capabilities, not teaching new ones."
  - question: "What does this mean for environment and verifier design?"
    answer: "If RLVR primarily sharpens existing capabilities rather than teaching new ones, the quality and difficulty of training tasks matters more than scale alone. Verifiers that can distinguish subtle reasoning quality—not just final-answer correctness—become critical. And expert-authored tasks that push beyond pretraining distributions may be needed to actually expand model capabilities."
  - question: "How should practitioners evaluate RLVR effectiveness?"
    answer: "Don't rely solely on pass@1 improvements. Track pass@k curves at multiple k values to detect distribution narrowing. Compare against the base model's pass@high-k as an upper bound. Test on problems released after the model's training cutoff to avoid contamination. And validate across multiple model families—results on one model may not generalize."
draft: false
---

**The 2024–2025 wave of reasoning models—DeepSeek-R1, OpenAI o1, Kimi-1.5—credited large-scale RLVR training for their breakthroughs. But 2025–2026 follow-up work is complicating that story. Pass@k analysis shows RLVR improves sampling efficiency without expanding what models can solve. Spurious-reward experiments show significant gains even from random or incorrect rewards on certain model families. The emerging consensus: RLVR sharpens existing capabilities rather than teaching new ones. This has direct implications for how you design training environments and verifiers.**

## What is RLVR?

Reinforcement Learning with Verifiable Rewards (RLVR) trains language models using rule-based rewards instead of learned reward models. The term was introduced by [Lambert et al. (2024)](https://arxiv.org/abs/2411.15124) in the Tulu 3 paper, though the technique predates the name.

The setup is simple: sample completions from the policy, check whether the final answer is correct (by matching ground truth or running tests), and use binary correctness as the reward signal. No human preference labels, no reward model training, no learned verifier that might be gamed.

$$
r(x, y) = \begin{cases} 1 & \text{if verifier accepts } y \\ 0 & \text{otherwise} \end{cases}
$$

RLVR's appeal is scalability. For math and code—domains with objectively correct answers—you can generate unlimited training signal without human annotation. [DeepSeek-R1](https://arxiv.org/abs/2501.12948) used RLVR starting from a base model with no supervised fine-tuning, achieving state-of-the-art results on mathematical reasoning and coding benchmarks. The model developed extended chain-of-thought, self-verification, and strategy-switching behaviors "naturally" through RL optimization.

This success story suggested RLVR could teach models genuinely new reasoning capabilities. But does it?

## What does pass@k analysis reveal?

The standard evaluation for reasoning models is pass@1: does greedy decoding (or single-sample) produce a correct answer? Pass@1 improved dramatically with RLVR. But pass@1 conflates two things: can the model solve the problem at all, and how efficiently can it sample a correct solution?

[Yue et al. (2025)](https://arxiv.org/abs/2504.13837) disentangled these by analyzing pass@k curves—the probability that at least one of $k$ samples is correct. Their key finding: **base models outperform RLVR-trained models at high $k$**.

The pass@k estimator from [Chen et al. (2021)](https://arxiv.org/abs/2107.03374) is:

$$
\text{pass@}k = \mathbb{E}\left[1 - \frac{\binom{n-c}{k}}{\binom{n}{k}}\right]
$$

where $n$ is total samples and $c$ is correct samples. At $k=1$, this reduces to accuracy. At high $k$, it approaches the proportion of solvable problems.

| Benchmark | Model | pass@1 | pass@256 |
|-----------|-------|--------|----------|
| MATH | Qwen2.5-Math-7B | 52.4% | 89.2% |
| MATH | Qwen2.5-Math-7B + RLVR | 75.8% | 85.6% |
| AIME 2024 | DeepSeek-R1-Zero | 71.0% | ~88% |
| AIME 2024 | DeepSeek-V3-Base | 39.2% | ~91% |

The pattern is consistent across benchmarks and model families: RLVR improves pass@1 but *decreases* pass@high-k. The crossover point—where the base model starts outperforming—typically occurs around $k=32$ to $k=128$.

What does this mean? RLVR concentrates probability mass on paths that lead to correct answers, improving sampling efficiency. But it doesn't expand the set of problems the model can solve. Every problem the RLVR model solves, the base model could already solve—given enough samples.

## Does RLVR narrow the reasoning distribution?

Yue et al. went further by analyzing the perplexity of RLVR model outputs under the base model. If RLVR taught genuinely new reasoning strategies, those strategies should look surprising to the base model—high perplexity under the base distribution.

Instead, they found **low perplexity**: the reasoning paths RLVR models produce already exist in the base model's output distribution. RLVR is surfacing and concentrating existing capabilities, not creating new ones.

Visually, think of the base model's output space as a search tree with many paths, some leading to correct answers. RLVR training prunes unlikely paths and upweights likely correct ones. This makes individual samples more likely to succeed. But it also removes paths—including some that lead to correct answers for problems where the remaining high-probability paths fail.

The authors call this the **sampling efficiency vs. reasoning coverage tradeoff**. RLVR optimizes for the former at the cost of the latter.

## Why do spurious rewards sometimes work?

If RLVR taught new reasoning, the quality of the reward signal should matter a lot. You'd expect random or incorrect rewards to produce random or incorrect policies.

[Shao et al. (2025)](https://arxiv.org/abs/2506.10947) tested this directly on Qwen2.5-Math models. Their results are striking:

| Reward Signal | MATH-500 Gain | Expected if learning? |
|---------------|---------------|----------------------|
| Ground truth | +29.1% | Yes |
| Majority vote | +27.4% | Plausibly |
| Format only | +25.2% | Surprising |
| Incorrect labels | +24.1% | Very surprising |
| Random (50%) | +21.4% | Should be zero |

Random rewards—50% probability of reward regardless of correctness—produced 21.4% absolute improvement on MATH-500. This is "only" 7.7 points below ground-truth rewards.

The mechanism? GRPO (the RL algorithm used) has a clipping term that systematically amplifies high-prior-probability tokens. For Qwen2.5-Math, one such high-prior behavior is "code reasoning"—writing Python-like pseudocode as part of chain-of-thought. This behavior correlates with correctness (60.9% accuracy with code reasoning vs. 28.0% without). Any training signal—even random—that triggers GRPO updates amplifies this existing high-prior behavior.

Crucially, this effect is model-dependent. On Llama3 and OLMo2, spurious rewards produced minimal or negative gains. These models lack the same strong "code reasoning" prior, so there's nothing for GRPO to amplify.

The practical implication: **RLVR results on one model family may not generalize to others**. Much of the recent RLVR literature uses Qwen2.5-Math as the default testbed. Shao et al. argue this creates a false sense of RLVR's effectiveness—gains that look algorithmic may be model-specific artifacts.

## What does this mean for environment design?

If RLVR primarily sharpens existing capabilities rather than teaching new ones, several design principles follow:

### Task difficulty distribution matters more than scale

Yue et al. found that training on extremely difficult problems (where the base model's pass@256 is near zero) produces no improvement—there's nothing to sharpen. Training on easy problems (where pass@1 is already high) also produces little improvement—the model is already efficient.

The sweet spot is **problems where the base model sometimes succeeds but often fails**. These are problems where correct reasoning paths exist but aren't yet concentrated. RLVR can shift probability mass toward them.

This is where expert-authored tasks become valuable. Problems that are specifically designed to require reasoning beyond what appears in pretraining corpora—novel formulations, domain-specific constraints, unusual combinations of concepts—force the model to draw on capabilities it has but rarely expresses.

### Verifier quality is bottleneck

If RLVR can only surface existing capabilities, the verifier determines which capabilities get surfaced. A verifier that only checks final-answer correctness will amplify any path that happens to produce correct final answers—including ones with flawed reasoning that happen to land on the right number.

For reasoning that requires genuine understanding—multi-step proofs, causal inference, scientific explanation—final-answer verification is insufficient. You need verifiers that can assess intermediate reasoning quality, or at minimum, test suites that probe multiple aspects of the solution.

This is the same problem documented in [rubric-based RL work](/blog/reward-hacking-rubric-based-rl): verifiers that check presence-based criteria get gamed. The policy learns to produce outputs that satisfy the verifier without genuinely improving on harder dimensions.

### Evaluate pass@k, not just pass@1

Standard benchmarks report pass@1 or greedy accuracy. For understanding whether RLVR actually improved a model's capabilities (vs. just its sampling efficiency), you need pass@k at multiple $k$ values.

If pass@1 goes up but pass@256 goes down, you've narrowed the distribution. You've optimized for the common case at the cost of the long tail. Depending on your use case, this might be acceptable—most users want correct answers on the first try. But don't confuse it with capability expansion.

### Test on post-cutoff problems

Contamination is a confound for any capability claim. If a model's training data included problems similar to the test set, pass@1 improvements might reflect memorization rather than reasoning improvement.

For RLVR specifically, contamination interacts with the "sharpening" interpretation: a model might appear to have latent capability on contaminated problems because those problems (or close variants) were in pretraining. Training on fresh, post-cutoff problems is necessary to distinguish "surfacing pretraining knowledge" from "learning to reason about novel problems."

## Does RLVR differ from distillation?

Yue et al. contrast RLVR with distillation—training on outputs from a stronger teacher model. They find a key difference: **distillation can expand reasoning coverage, RLVR cannot**.

When distilling from a stronger model that solves problems the student cannot, the student can learn new reasoning patterns. Its pass@high-k increases, not just its pass@1. The knowledge transfer is additive rather than concentrative.

This suggests a hybrid approach: use distillation to expand the base model's reasoning repertoire, then use RLVR to improve sampling efficiency on that expanded repertoire. The gains stack differently than pure RLVR at scale.

## What about DeepSeek-R1's emergent behaviors?

DeepSeek-R1's technical report describes behaviors that emerged during RLVR training: extended chain-of-thought, self-reflection ("Wait, let me reconsider..."), verification of intermediate steps. These look like new reasoning capabilities.

The pass@k analysis offers a reinterpretation: these behaviors likely existed in DeepSeek-V3-Base at low probability. RLVR didn't teach the model *how* to reflect—it learned that from pretraining on human text where reflection improves outcomes. RLVR taught the model *when* to reflect by concentrating probability mass on chains-of-thought that included reflection and led to correct answers.

This is consistent with the "self-play" perspective on o1-style models: extended thinking is a search strategy that can be executed without new architectural capabilities. What changes is the distribution over reasoning lengths and styles, not the underlying reasoning mechanisms.

The DeepSeek team notes a key limitation: their purely rule-based RLVR "abstains from applying neural reward models" because such models are "susceptible to reward hacking during large-scale reinforcement learning." This confirms that the verifier quality constraint is well-understood even by practitioners achieving SOTA results.

## What are the implications for frontier labs?

If RLVR is fundamentally about **sampling efficiency** rather than **capability expansion**, several research directions become more important:

1. **Better pretraining for reasoning**. If RLVR can only surface capabilities that exist in the base model, pretraining quality is the bottleneck for reasoning ceiling. Data mixtures, curriculum, and architectural choices that improve latent reasoning capability will have outsized effects.

2. **Process-level rewards**. Current RLVR uses outcome-based rewards (final-answer correctness). [Process rewards](https://arxiv.org/abs/2211.14275) that grade intermediate reasoning steps might do better at teaching new patterns—by reinforcing correct reasoning even on problems where the final answer is wrong.

3. **Self-improvement loops**. If a model's pass@high-k represents its capability ceiling, and RLVR can only move mass toward existing correct paths, genuine self-improvement requires generating new correct paths that don't yet exist. This might require [more sophisticated exploration](/blog/step-level-rewards-for-ai-agents) than current RL algorithms provide.

4. **Evaluation reform**. Benchmark leaderboards that report only pass@1 are measuring sampling efficiency, not reasoning capability. For safety-relevant capability tracking, pass@k curves and contamination-controlled evaluation become essential.

## A practical checklist for RLVR practitioners

Based on the 2025–2026 evidence, here's what to track when running RLVR:

**Before training:**
- [ ] Measure base model pass@k at multiple $k$ values (1, 8, 32, 128, 256)
- [ ] Characterize task difficulty distribution relative to base capability
- [ ] Identify high-prior behaviors in your model family (run spurious-reward controls)
- [ ] Ensure verifier tests more than final-answer correctness

**During training:**
- [ ] Track pass@k curves at regular checkpoints, not just pass@1
- [ ] Watch for pass@high-k degradation (distribution narrowing)
- [ ] Evaluate on problems released after training cutoff
- [ ] Test across multiple model families if generalizing claims

**After training:**
- [ ] Compare pass@256 to base model (capability ceiling test)
- [ ] Manually inspect reasoning paths for novel vs. templated structure
- [ ] Report full pass@k curves, not just headline pass@1 number

## How Anthroly can help

The RLVR evidence points to a gap: models can improve sampling efficiency but struggle to learn genuinely new reasoning. Closing that gap requires tasks that push beyond pretraining distributions—problems where expert knowledge determines what correct reasoning looks like.

Anthroly builds expert-authored RL environments and verifiers. We have about 100–150 PhDs on contract and approximately 400 more PhDs and graduates ready across domains including mathematics, physics, medicine, and software engineering.

Our experts design tasks where the correct reasoning path requires domain expertise to construct and verify—not just answer-checking but rubric-based evaluation of reasoning quality. We can help characterize your model's true capability ceiling (pass@high-k) and design training curricula that target the productive difficulty range.

If your team is building reasoning models with RLVR and wants to understand whether you're expanding capabilities or just sharpening existing ones, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [Where should step-level rewards for AI agents come from?](/blog/step-level-rewards-for-ai-agents)
- [RLVR vs RLHF](/research/compare/rlvr-vs-rlhf)
- [RLHF preference data, explained](/learn/rlhf-preference-data)
- [How reliable are verifiers in RLVR? False negatives and master keys](/blog/how-reliable-are-rlvr-verifiers)
- [How much data do you need to fine-tune a reasoning model?](/blog/how-much-data-to-fine-tune-a-reasoning-model)
- [How do you choose training prompts for RLVR? Pass-rate filtering and difficulty curricula](/blog/how-to-choose-prompts-for-rlvr-training)
- [GRPO vs PPO vs DAPO: which RL algorithm should you use to train a reasoning model?](/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl)
- [Why does entropy collapse in RL for reasoning models?](/blog/why-does-entropy-collapse-in-rl-for-reasoning-models)
- [How are theorem-proving RL environments built? Lean verifiers, autoformalization, and misformalized statements](/blog/how-are-theorem-proving-rl-environments-built)

---

## References

1. Lambert, N., Morrison, J., Pyatkin, V., Huang, S., Ivison, H., Brahman, F., Miranda, L. J. V., Liu, A., Dziri, N., Lyu, X., Gu, Y., Malik, S., Graf, V., Hwang, J. D., Yang, J., Le Bras, R., Tafjord, O., Wilhelm, C., Soldaini, L., Smith, N. A., Wang, Y., Dasigi, P., & Hajishirzi, H. (2024). [Tülu 3: Pushing Frontiers in Open Language Model Post-Training](https://arxiv.org/abs/2411.15124). arXiv:2411.15124.

2. DeepSeek-AI. (2025). [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](https://arxiv.org/abs/2501.12948). arXiv:2501.12948.

3. Yue, Y., Chen, Z., Lu, R., Zhao, A., Wang, Z., Yue, Y., Song, S., & Huang, G. (2025). [Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?](https://arxiv.org/abs/2504.13837). arXiv:2504.13837.

4. Shao, R., Li, S. S., Xin, R., Geng, S., Wang, Y., Oh, S., Du, S. S., Lambert, N., Min, S., Krishna, R., Tsvetkov, Y., Hajishirzi, H., Koh, P. W., & Zettlemoyer, L. (2025). [Spurious Rewards: Rethinking Training Signals in RLVR](https://arxiv.org/abs/2506.10947). arXiv:2506.10947.

5. Chen, M., Tworek, J., Jun, H., Yuan, Q., Pinto, H. P. de O., Kaplan, J., Edwards, H., Burda, Y., Joseph, N., Brockman, G., Ray, A., Puri, R., Krueger, G., Petrov, M., Khlaaf, H., Sastry, G., Mishkin, P., Chan, B., Gray, S., Ryder, N., Pavlov, M., Power, A., Kaiser, L., Bavarian, M., Winter, C., Tillet, P., Such, F. P., Cummings, D., Plappert, M., Chanber, F., Rothfuss, J., Cole, E., Conber, G., Kwon, Y., Srivastava, S., Wang, D., Sohl-Dickstein, J., Saunders, W., Amodei, D., & Zaremba, W. (2021). [Evaluating Large Language Models Trained on Code](https://arxiv.org/abs/2107.03374). arXiv:2107.03374.
