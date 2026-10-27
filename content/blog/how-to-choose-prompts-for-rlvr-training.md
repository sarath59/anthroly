---
title: "How Do You Choose Training Prompts for RLVR? Pass-Rate Filtering, Difficulty Curricula, and Why One Example Can Work"
description: "In GRPO-style RL with verifiable rewards, a prompt the policy always solves or never solves produces zero gradient. Here is what recent studies (DAPO, Skywork-OR1, ScaleRL, balanced online filtering, 1-shot RLVR, and 2026 work on prompt priors and curricula) show about which prompts to train on, how to filter them, how few you need, and what broken reference answers do to the run."
tags:
  - rlvr
  - grpo
  - data-curation
  - rl-environments
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-24T12:30:00.000Z'
updatedAt: '2026-10-24T12:30:00.000Z'
faq:
  - question: "Which prompts give the most learning signal in GRPO?"
    answer: "Prompts the current policy solves some of the time but not always. With binary rewards, a group where every rollout is right or every rollout is wrong has zero group-relative advantage and contributes no policy gradient. Bae et al. (2025) show the expected improvement is lower-bounded by a term proportional to p(1-p), where p is the prompt's pass rate, which peaks at p = 0.5."
  - question: "Should RLVR prompts be filtered before training or during training?"
    answer: "Both. Offline filtering against the starting policy removes prompts that are already solved or hopeless (Skywork-OR1 dropped every math problem with 0/16 or 16/16 correct rollouts). Online filtering removes zero-variance groups as the policy changes, as in DAPO's dynamic sampling and ScaleRL's zero-variance filtering, and ScaleRL also permanently drops prompts once their pass rate reaches 0.9 or more."
  - question: "Is it better to train on hard or medium-difficulty prompts?"
    answer: "Hard relative to the current policy, but not impossible. Pikus et al. (2025) found training on the hardest 10% of examples (where the base model fails most often, but still succeeds sometimes) gave gains up to 47%, versus 3-15% for easy examples. A 2026 GSM8K study found moving the curriculum from a medium to a moderately harder band helped, but moving to the hardest band hurt."
  - question: "Can RLVR really work with a single training example?"
    answer: "On some models, yes. Wang et al. (2025) trained Qwen2.5-Math-1.5B with one example and raised MATH500 from 36.0% to 73.6%, matching a 1.2k-example subset. The authors note it does not save RL compute, the chosen example was picked using that model's training history, and Qwen2.5-Math models are known to respond to weak or even spurious rewards, so treat it as evidence that prompt choice matters, not as a data recipe."
  - question: "What happens if a reference answer in an RLVR dataset is wrong?"
    answer: "It depends on whether the policy can produce the wrong answer. If the wrong label is unreachable, the prompt behaves like an impossible prompt and mostly gives no signal. If the wrong label is reachable, the policy is trained toward it: in Wang et al.'s 1-shot experiments, a wrong but guessable label performed worse than a wrong label the model could never produce. Prompts with 0% pass rate are where broken labels hide, so that bucket deserves expert review rather than silent deletion."
  - question: "How does Anthroly help with RLVR prompt sets?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, writes new verifiable problems in the difficulty band your policy needs, audits reference answers, and reviews the 0%-pass-rate bucket to separate genuinely hard problems from broken ones."
draft: false
---

**Most RLVR papers spend their pages on the loss function. The runs themselves are often decided earlier, by which prompts go into the batch. With group-relative methods like GRPO, a prompt the policy always solves or never solves contributes exactly zero gradient, and in real training pools that can be a large share of the compute. Over the past year a cluster of papers measured this directly: how to filter, which difficulty band to target, how few prompts you can get away with, and what happens when the reference answer is wrong. This post pulls the evidence together, works through the arithmetic of wasted rollouts, and ends with a curation pipeline you can run before and during training.**

## Why does prompt choice matter so much in GRPO-style RLVR?

In GRPO ([Shao et al., 2024](https://arxiv.org/abs/2402.03300)), the policy samples a group of $G$ responses to each prompt $x$, a verifier scores each one, and each response's advantage is its reward relative to the group:

$$
\hat{A}_i = \frac{r_i - \operatorname{mean}(r_1, \dots, r_G)}{\operatorname{std}(r_1, \dots, r_G)}
$$

With binary verifiable rewards, if all $G$ responses are correct or all are wrong, every $\hat{A}_i$ is zero and the prompt contributes nothing to the policy-gradient term. You paid for $G$ long rollouts and got no update.

How often does that happen? If the policy's true pass rate on a prompt is $p$, the chance that a group of $G$ independent samples is uniform is:

$$
P(\text{zero signal}) = p^{G} + (1-p)^{G}
$$

| Pass rate $p$ | $G = 4$ | $G = 8$ | $G = 16$ |
|---|---|---|---|
| 0.02 or 0.98 | 0.92 | 0.85 | 0.72 |
| 0.05 or 0.95 | 0.82 | 0.66 | 0.44 |
| 0.10 or 0.90 | 0.66 | 0.43 | 0.19 |
| 0.20 or 0.80 | 0.41 | 0.17 | 0.03 |
| 0.50 | 0.13 | 0.01 | 0.00 |

Two things follow. First, prompts near the edges are expensive even when they are not exactly 0% or 100%: at $p = 0.05$ with 8 rollouts, two thirds of groups are silent. Second, larger groups rescue edge prompts, but at a linear cost in rollouts.

[Bae et al. (2025)](https://arxiv.org/abs/2504.03380) (EACL 2026) make the same point formally. They show the expected policy improvement is lower-bounded by a term proportional to the Bernoulli variance $p(x)(1 - p(x))$, which peaks at $p = 0.5$ and vanishes at both ends. That is the theoretical case for keeping prompts in a middle band.

The waste is not hypothetical. A September 2026 paper, [ThinkPrior (Sha et al., 2026)](https://arxiv.org/abs/2609.09075), measured that uniform prompt sampling spent **39% of a run's rollouts** on zero-advantage groups in its GRPO setup on Qwen2.5-Math-7B.

## What does the evidence say about the best difficulty band?

The studies agree on the principle and disagree on where exactly to aim, which turns out to be informative.

**Balanced middle band.** Bae et al. filter each batch online by pass rate, keeping prompts inside symmetric thresholds such as $0.2 \le p(x) \le 0.8$ and refilling the batch with new prompts. With Qwen2.5-3B, starting from an SFT checkpoint, plain GRPO averaged 26.3% across five math benchmarks; balanced filtering beat it at all five thresholds they tried, and tightening the band from (0, 1) toward (0.3, 0.7) raised the average to over 30%. With Qwen2.5-7B they report up to 12 points on AMC, and they outperform plain GRPO using less than half the gradient updates.

**Hard examples.** [Pikus et al. (2025)](https://arxiv.org/abs/2508.14094) asked a budget question: if you can only afford to annotate 10% of a pool, which 10%? Across Qwen3-4B, Qwen3-14B, Phi-4, and Llama-3.1-8B on GSM8K and BIG-Bench Hard's Tracking Shuffled Objects, training on the **hardest 10%** (the examples the base model fails most often) gave gains of **up to 47%**, versus **3-15%** for the easiest. Only the hard-trained models made meaningful gains on the much harder AIME 2025-I. Their explanation is the same variance argument: hard examples keep mixed outcomes through training, easy ones saturate quickly.

**Moving the band.** An October 2026 study, ["A Step Harder, Not a Step Too Far" (Li et al., 2026)](https://arxiv.org/abs/2610.13669), re-estimated difficulty under the current policy on GSM8K and tried a staged curriculum. Over three seeds, staying in a fixed medium band reached 0.6449 test accuracy; progressing to a moderately harder band reached 0.6591; progressing further to the hardest band fell to 0.6405. They also found individual problems move between difficulty bands non-monotonically as training proceeds, so a difficulty label computed once at the start goes stale.

**How these fit together.** "Hard" in Pikus et al. means hard for the base model, not unsolvable: their own explanation is that hard examples keep producing mixed outcomes during training, which an unsolvable prompt cannot do. Read together, the results say: aim for prompts the current policy solves sometimes, lean toward the harder side of that band as training progresses, and stop before you reach prompts the policy essentially never solves. The edges of the band matter more than the exact center.

## Should you filter offline, online, or both?

Both, because difficulty is relative to a policy that keeps changing.

**Offline, against the starting policy.** The [Skywork-OR1 report (He et al., 2025)](https://arxiv.org/abs/2505.22312) is unusually explicit. They ran 16 rollouts per math problem (8 per coding problem) with the model to be trained, then removed everything with 0/N or N/N correct. The shares they removed show how much a typical pool is out of band:

| Starting model | All wrong (math / code) | All right (math / code) | Kept (math / code) |
|---|---|---|---|
| DeepSeek-R1-Distill-Qwen-7B | 21.4% / 28% | 32.4% / 24% | 46.2% / 48% |
| DeepSeek-R1-Distill-Qwen-32B | 20.7% / 17.1% | 42.0% / 45.4% | 37.3% / 37.6% |

The stronger model saturates more of the pool: 42% of math problems were already solved 16 out of 16 times by the 32B model. The same pool is a different training set for a different policy. Skywork also found the DeepScaleR mixture, which worked well for smaller models, gave a slight early AIME24 gain on their 32B model and then degraded sharply after about 300 steps, returning to the starting accuracy.

**Online, as the policy improves.** Three mechanisms recur:

- **Dynamic sampling** ([DAPO, Yu et al., 2025](https://arxiv.org/abs/2503.14476)): oversample and drop groups whose accuracy is exactly 0 or 1 until the batch is full. In DAPO's ablation on Qwen2.5-32B, adding dynamic sampling as the last component moved AIME 2024 from 42 to 50 points.
- **Zero-variance filtering plus retirement** ([ScaleRL, Khatri et al., 2025](https://arxiv.org/abs/2510.13786)): drop zero-variance groups from the loss, and permanently remove any prompt whose pass rate reaches 0.9 or more from later epochs ("No-Positive-Resampling"). Both raised the fitted asymptotic pass rate in their 8B experiments.
- **Stage-wise pruning** (Skywork-OR1): at the start of each training stage, drop prompts the actor solved every time in the previous stage.

**Caveats from 2025-2026 replications.** Online filtering is not free and not always a win. [Lian (2025)](https://arxiv.org/abs/2512.07611) compared PPO, GRPO, and DAPO on Qwen2.5-1.5B-Instruct trained on the Countdown game and found DAPO performed best with dynamic sampling turned off. [Prompt Replay (Baroian and Berger, 2026)](https://arxiv.org/abs/2603.21177), which reuses prompts near 50% pass rate, cut zero-variance prompts and sped up early gains but plateaued and converged with the baseline. ThinkPrior halved early silent groups using a cheap offline difficulty prior, with no detectable difference in final accuracy. The pattern across these papers: filtering reliably buys efficiency; whether it raises the final ceiling depends on the setup. That matches ScaleRL's broader finding that most recipe details change how fast you reach the asymptote more than where the asymptote is.

## How few prompts do you actually need?

Fewer than most pools contain, which is a statement about selection rather than about data not mattering.

- [LIMR (Li et al., 2025)](https://arxiv.org/abs/2502.11886) scored each MATH training problem by how its reward trajectory tracked the model's overall learning curve ("Learning Impact Measurement") and found a selected subset of **1,389** prompts matched or beat the full **8,523**.
- [Wang et al. (2025), "1-shot RLVR"](https://arxiv.org/abs/2504.20571) went to the extreme. With one example, Qwen2.5-Math-1.5B rose from **36.0% to 73.6%** on MATH500 and from 17.6% to 35.7% on a six-benchmark average, matching training on the 1.2k-example DeepScaleR subset. Two examples did slightly better. Similar improvements held on other models (Qwen2.5-Math-7B, Llama-3.2-3B-Instruct, DeepSeek-R1-Distill-Qwen-1.5B) and with PPO as well as GRPO.

Read the fine print before building a strategy on this. The single example was chosen by ranking examples on the variance of their training accuracy during an earlier full run on the same model, so selection itself consumed a full-scale training run. The authors state that 1-shot RLVR does not save RL compute. And Qwen2.5-Math models are known to improve under weak and even spurious rewards ([Shao et al., 2025](https://arxiv.org/abs/2506.10947)); the 2026 Prompt Replay paper explicitly warns against using Qwen2.5-Math as the only testbed for GRPO data-selection research for this reason. The durable lesson is that a small number of well-chosen, in-band prompts carries most of the signal. The practical question is how to find them without a full run first.

## What happens when the reference answer is wrong?

This is where the prompt-selection literature meets data quality, and it is the part most pipelines skip.

The 1-shot RLVR paper contains a small, revealing experiment. Their famous training example had a reference answer of 12.8, while the precise answer is 12.7. Training on the correct 12.7 gave about the same result as the slightly-off 12.8. But replacing it with a clearly wrong answer the model could still produce ("4") performed **worse** than replacing it with a wrong answer the model could never produce ("9292725"), which behaved like training on entropy loss alone. A reachable wrong label actively teaches the wrong thing; an unreachable one just wastes compute.

Now combine that with pass-rate filtering. A problem with a broken reference answer usually shows up as a 0/N prompt, so offline filtering throws it out together with the genuinely hard problems. That is mostly protective, but it has two costs:

1. **You lose hard, valid problems along with broken ones.** Skywork's 0/16 bucket was about 21% of their math pool. Some of that is out of reach; some is mislabeled or unverifiable. The two look identical to a pass-rate filter.
2. **Verifier false negatives push valid problems into the same bucket.** [TinyV (Xu et al., 2025)](https://arxiv.org/abs/2505.14625) found that 38.5% of responses a rule-based verifier marked wrong on Big-Math-RL-Verified were actually correct. A problem whose answer has an unusual canonical form can sit at "0% pass rate" because the checker, not the model, fails. We covered this in detail in [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)

Skywork's team did something most open recipes do not: they had human evaluators inspect a few hundred sampled problems for clear wording, complete information, formatting, and distractions, and they compared four verifiers against human judgment before choosing one. [Big-Math (Albalak et al., 2025)](https://arxiv.org/abs/2502.17387) similarly verified each filtering step by hand while building a pool of over 250,000 RL-ready problems. The zero-pass bucket is the highest-value place to spend that human attention: it is where the hard problems you most want and the broken problems you most need to remove are mixed together.

## A practical prompt-curation pipeline

1. **Define what "verifiable" means for each prompt.** Exclude proofs and anything without a checkable answer or test suite, and decontaminate against your evaluation sets (Skywork deduplicated across sources and against AIME24/25).
2. **Estimate difficulty against the policy you will train,** not a proxy, with enough samples to tell 0.05 from 0. Sixteen rollouts at your training temperature and length is a reasonable floor for math.
3. **Split the pool into three buckets:** in-band, always-solved, and never-solved. Keep in-band. Archive always-solved (reuse it for regression checks).
4. **Send a sample of the never-solved bucket to domain experts.** Classify each as genuinely hard, wrong reference answer, ambiguous or incomplete statement, or verifier failure. Fix what is fixable and estimate the error rate of the rest.
5. **Filter online during training:** drop zero-variance groups from the loss, and retire prompts once they cross a high pass rate.
6. **Re-estimate difficulty at stage boundaries** and shift the sampling band toward the harder side as the policy improves, stopping short of the never-solved tail.
7. **Replenish the top of the band.** Strong policies saturate pools fast (42% of Skywork's math pool was already 16/16 for their 32B model). The long-run constraint is a supply of new, correct, hard problems, which is a data-authoring problem, not a filtering problem.

A minimal online band filter with pass-rate history looks like this:

```python
from collections import defaultdict

class PromptBand:
    """Track per-prompt pass rates and sample prompts inside a learnable band."""

    def __init__(self, low=0.1, high=0.9, retire_at=0.9, min_obs=16):
        self.low, self.high, self.retire_at, self.min_obs = low, high, retire_at, min_obs
        self.hits = defaultdict(int)
        self.trials = defaultdict(int)
        self.retired = set()

    def update(self, prompt_id, rewards):
        """rewards: list of 0/1 verifier outcomes for one group."""
        self.hits[prompt_id] += sum(rewards)
        self.trials[prompt_id] += len(rewards)
        if self.trials[prompt_id] >= self.min_obs and self.pass_rate(prompt_id) >= self.retire_at:
            self.retired.add(prompt_id)  # like ScaleRL's No-Positive-Resampling

    def pass_rate(self, prompt_id):
        t = self.trials[prompt_id]
        return self.hits[prompt_id] / t if t else None

    def keep_group(self, rewards):
        """Drop zero-variance groups from the loss (DAPO / ScaleRL style)."""
        return 0 < sum(rewards) < len(rewards)

    def eligible(self, prompt_id):
        if prompt_id in self.retired:
            return False
        p = self.pass_rate(prompt_id)
        return p is None or self.low <= p <= self.high

    def never_solved(self):
        """Candidates for expert review: hard, mislabeled, or verifier failures."""
        return [k for k, t in self.trials.items() if t >= self.min_obs and self.hits[k] == 0]
```

The `never_solved` list is the output most teams ignore and the one worth sending to people who can solve the problems.

## What teams get wrong

- **Reusing a difficulty-filtered dataset across models.** A pool filtered for a 7B model is not in-band for a 32B model. Re-estimate against your own policy.
- **Treating 0% pass rate as "too hard" and moving on.** That bucket contains your most valuable hard problems and your broken labels. Without review you cannot tell how much of each.
- **Reading efficiency gains as ceiling gains.** Several filtering methods speed up early training and then converge with the baseline. Compare at equal compute and at the end of training, over multiple seeds.
- **Running data-selection ablations only on Qwen2.5-Math.** Its sensitivity to weak and spurious rewards can make almost any selection look good.
- **Running out of hard prompts.** Filtering can only remove; it cannot create the next band of difficulty once the policy has absorbed the current one.

## How Anthroly can help

Prompt selection eventually becomes a supply problem: you need a steady stream of correct, verifiable problems that sit just above what your policy can do, in the domains you care about, and you need someone qualified to tell a hard problem from a broken one.

Anthroly builds expert data and RL environments for AI labs. We have about 100-150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains. We write new verifiable problems targeted at a difficulty band you specify, audit reference answers and answer-equivalence rules, and review your zero-pass bucket to separate genuinely hard problems from mislabeled, ambiguous, or verifier-blocked ones. It is the same work that goes into a [training-grade RL environment](/blog/what-makes-a-training-grade-rl-environment).

If your RLVR runs are plateauing because the pool is saturated or the hard tail is noisy, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [Which RL algorithm should you use to train a reasoning model? GRPO, PPO, DAPO and beyond](/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl)
- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [Does RL with verifiable rewards teach models new reasoning?](/blog/does-rlvr-teach-new-reasoning)
- [How much data do you need to fine-tune a reasoning model?](/blog/how-much-data-to-fine-tune-a-reasoning-model)
- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [RLVR vs. RLHF](/research/compare/rlvr-vs-rlhf)
- [Why does entropy collapse in RL for reasoning models?](/blog/why-does-entropy-collapse-in-rl-for-reasoning-models)
- [How are theorem-proving RL environments built? Lean verifiers, autoformalization, and misformalized statements](/blog/how-are-theorem-proving-rl-environments-built)

---

## References

1. Shao, Z., Wang, P., Zhu, Q., Xu, R., Song, J., et al. (2024). [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300). arXiv:2402.03300.

2. Bae, S., Hong, J., Lee, M. Y., Kim, H., Nam, J., & Kwak, D. (2025). [Online Difficulty Filtering for Reasoning Oriented Reinforcement Learning](https://arxiv.org/abs/2504.03380). arXiv:2504.03380 (EACL 2026).

3. Sha, T., Zhai, S., & Zhao, S. (2026). [ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR](https://arxiv.org/abs/2609.09075). arXiv:2609.09075.

4. Pikus, B., Tiwari, P. R., & Ye, B. (2025). [Hard Examples Are All You Need: Maximizing GRPO Post-Training Under Annotation Budgets](https://arxiv.org/abs/2508.14094). arXiv:2508.14094.

5. Li, R., Chen, F., & Lu, M. (2026). [A Step Harder, Not a Step Too Far: The Benefits and Limits of Curriculum Difficulty Progression in GRPO](https://arxiv.org/abs/2610.13669). arXiv:2610.13669.

6. He, J., Liu, J., Liu, C. Y., Yan, R., Wang, C., et al. (2025). [Skywork Open Reasoner 1 Technical Report](https://arxiv.org/abs/2505.22312). arXiv:2505.22312.

7. Yu, Q., Zhang, Z., Zhu, R., Yuan, Y., Zuo, X., et al. (2025). [DAPO: An Open-Source LLM Reinforcement Learning System at Scale](https://arxiv.org/abs/2503.14476). arXiv:2503.14476.

8. Khatri, D., Madaan, L., Tiwari, R., Bansal, R., Duvvuri, S. S., et al. (2025). [The Art of Scaling Reinforcement Learning Compute for LLMs](https://arxiv.org/abs/2510.13786). arXiv:2510.13786.

9. Lian, Y. (2025). [Comparative Analysis and Parametric Tuning of PPO, GRPO, and DAPO for LLM Reasoning Enhancement](https://arxiv.org/abs/2512.07611). arXiv:2512.07611.

10. Baroian, A., & Berger, R. (2026). [Prompt Replay: Speeding up GRPO with On-Policy Reuse of High-Signal Prompts](https://arxiv.org/abs/2603.21177). arXiv:2603.21177.

11. Li, X., Zou, H., & Liu, P. (2025). [LIMR: Less is More for RL Scaling](https://arxiv.org/abs/2502.11886). arXiv:2502.11886.

12. Wang, Y., Yang, Q., Zeng, Z., Ren, L., Liu, L., et al. (2025). [Reinforcement Learning for Reasoning in Large Language Models with One Training Example](https://arxiv.org/abs/2504.20571). arXiv:2504.20571.

13. Shao, R., Li, S. S., Xin, R., Geng, S., Wang, Y., et al. (2025). [Spurious Rewards: Rethinking Training Signals in RLVR](https://arxiv.org/abs/2506.10947). arXiv:2506.10947.

14. Xu, Z., Li, Y., Jiang, F., Ramasubramanian, B., Niu, L., Lin, B. Y., & Poovendran, R. (2025). [TinyV: Reducing False Negatives in Verification Improves RL for LLM Reasoning](https://arxiv.org/abs/2505.14625). arXiv:2505.14625.

15. Albalak, A., Phung, D., Lile, N., Rafailov, R., Gandhi, K., et al. (2025). [Big-Math: A Large-Scale, High-Quality Math Dataset for Reinforcement Learning in Language Models](https://arxiv.org/abs/2502.17387). arXiv:2502.17387.
