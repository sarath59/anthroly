---
title: "Generative vs Scalar Reward Models: Should Your Reward Model Think Before It Scores?"
description: "Generative reward models write a critique or chain of thought before giving a verdict, and they now top many reward-model benchmarks. But 2026 studies find that higher static accuracy does not reliably produce better RL policies, and generative judging multiplies reward compute. Here is what GenRM, DeepSeek-GRM, RM-R1, J1 and newer work show, the failure modes, the cost math, and when a plain Bradley-Terry model is still the better choice."
tags:
  - reward-modeling
  - generative-reward-models
  - rlhf
  - llm-as-a-judge
  - post-training
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-25T04:45:00.000Z'
updatedAt: '2026-10-25T04:45:00.000Z'
faq:
  - question: "What is a generative reward model?"
    answer: "A generative reward model (GenRM) is a language model that produces its judgment as text, usually a critique or chain of thought followed by a verdict or score, instead of mapping a response to a single number with a regression head. Examples include Generative Verifiers (Zhang et al., 2024), DeepSeek-GRM, RM-R1 and J1. A scalar reward model, typically trained with a Bradley-Terry loss on preference pairs, outputs one number per response in a single forward pass."
  - question: "Are generative reward models better than scalar reward models?"
    answer: "On static benchmarks they often are, especially out of distribution: Mahan et al. (2024) report their GenRM matched Bradley-Terry models in distribution and beat them by 10-45% out of distribution. But for verifiable correctness, DeepSeek-GRM-27B scored 59.8 on PPE Correctness versus 66.7 for a Bradley-Terry model trained on the same base and data, and the paper says GRMs still lag scalar models on verifiable tasks."
  - question: "Does a more accurate reward model produce a better RL policy?"
    answer: "Not reliably. A 2026 study of generative reward models in creative writing found that thinking judges had higher static accuracy, yet answer-only judges produced higher peak policy Elo in seven of eight matched settings. In one ablation, a judge checkpoint at 79.2% accuracy trained a better policy than a later checkpoint at 82.3%. RRC (2026) similarly found generative models' ranking advantage largely disappeared when used as scalar RL rewards."
  - question: "How much more compute does a generative reward model need?"
    answer: "A scalar model needs one forward pass per response. A generative model decodes a critique per judgment, and voting or pairwise comparison multiplies the number of judgments. With 8 rollouts per prompt, pointwise judging with 8 votes means 64 generated judgments, and all-pairs comparison in both orders means 56. DeepSeek-GRM's authors list efficiency as a main limitation for online RL, and PivotRL (2026) exists because reward evaluation competes with rollout and training for GPUs."
  - question: "How do you reduce position bias in pairwise LLM judges?"
    answer: "Judge both orderings of each pair and combine them, or train with both orderings and a consistency reward as J1 does. DeCert (2026) reports up to 14.8 points higher position-consistent accuracy by supervising the quality of the judge's justification, not only its verdict."
  - question: "How does Anthroly help with reward models?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, writes expert preference labels, critiques and rubrics, builds held-out gold sets for selecting reward models by downstream effect rather than static accuracy, and audits judge rationales for unsupported claims."
draft: false
---

**Reward models used to be simple: a language model with a linear head, trained on preference pairs to output one number. Over the past two years the field has moved toward generative reward models that think out loud first, writing a critique, a set of principles, or a full chain of thought before giving a verdict. They now lead many reward-model benchmarks. Two 2026 results complicate the story: generative judges with higher static accuracy can train worse policies, and their comparative strengths do not map cleanly onto the scalar rewards that RL algorithms expect. This post lays out what each design does, what the evidence says about when thinking helps, what it costs, and how to choose.**

## What is the difference between a scalar and a generative reward model?

A **scalar** reward model maps a prompt $x$ and response $y$ to a number $r_\phi(x, y)$, usually trained with the Bradley-Terry loss on preference pairs $(y_w, y_l)$:

$$
\mathcal{L}_{\text{BT}} = -\log \sigma\big(r_\phi(x, y_w) - r_\phi(x, y_l)\big)
$$

One forward pass per response, no decoding. Our post on [how to evaluate a reward model](/blog/how-to-evaluate-a-reward-model) covers this family in detail.

A **generative** reward model uses the language-modeling head. The simplest version, Generative Verifiers ([Zhang et al., 2024](https://arxiv.org/abs/2408.15240)), asks "Is the answer correct?" and uses the probability of the token "Yes" as the score, optionally after a chain-of-thought verification:

$$
r(x, y) = p_\theta\big(\text{"Yes"} \mid x, y, \text{prompt}\big), \qquad
r_{\text{vote}}(x, y) = \frac{1}{k} \sum_{j=1}^{k} p_\theta\big(\text{"Yes"} \mid x, y, c_j\big)
$$

where $c_j$ are $k$ sampled verification rationales. Averaging over rationales is how generative models turn extra inference compute into better rewards.

DeepSeek-GRM ([Liu et al., 2025](https://arxiv.org/abs/2504.02495)) gives a useful taxonomy along two axes: how the reward is produced (scalar, semi-scalar, or generative) and how responses are scored (pointwise, one score per response, or pairwise, choosing the better of two). The axes matter in RL: pointwise scores plug directly into GRPO or PPO, while pairwise verdicts need converting.

| Model | Output | Training | Notable design choice |
|---|---|---|---|
| Bradley-Terry RM | Scalar | Preference pairs, BT loss | Single forward pass |
| CLoud ([Ankner et al., 2024](https://arxiv.org/abs/2408.11791)) | Critique, then scalar head | Critique SFT + BT | Thinks, but still outputs a number |
| Generative Verifiers ([Zhang et al., 2024](https://arxiv.org/abs/2408.15240)) | P("Yes") after optional CoT | Next-token prediction | Majority voting over rationales |
| GenRM ([Mahan et al., 2024](https://arxiv.org/abs/2410.12832)) | Pairwise verdict with reasoning | Iterative training on self-generated reasoning | Hybrid of RLHF labels and RLAIF reasoning |
| DeepSeek-GRM ([Liu et al., 2025](https://arxiv.org/abs/2504.02495)) | Principles, critique, pointwise scores | Rejective fine-tuning + rule-based online RL | Meta RM guides voting |
| RM-R1 ([Chen et al., 2025](https://arxiv.org/abs/2505.02387)) | Rubrics or reference solution, then verdict | Reasoning distillation + RLVR | "Chain-of-rubrics" |
| J1 ([Whitehouse et al., 2025](https://arxiv.org/abs/2505.10320)) | Thinking judge, pairwise or pointwise | Online RL on 22K synthetic pairs | Both orderings, consistency reward |

## What does the benchmark evidence show?

Generative models consistently win on static evaluation, particularly when the test distribution shifts:

- **Generative Verifiers** report Best-of-N gains from 73% to 93.4% on GSM8K and from 5% to 45.3% on algorithmic tasks over discriminative verifiers, and from 28% to 44.6% on MATH in an easy-to-hard setting.
- **Mahan et al.** found zero-shot LLM judges underperform Bradley-Terry models in distribution by 9-36%, but their trained GenRM matched Bradley-Terry in distribution and beat it by 10-45% out of distribution.
- **CLoud** improved RewardBench pairwise accuracy by 4.65 and 5.84 points over classic reward models at 8B and 70B.
- **DeepSeek-GRM-27B** reached 69.9 overall across RewardBench, PPE and RMB with greedy decoding, versus 68.6 for a Bradley-Terry model trained on the same base and data. With 32 samples and meta-RM-guided voting it reached 72.8, above GPT-4o's 71.3 in the same table.
- **RM-R1** reports outperforming much larger open and proprietary models by up to 4.9% on average across three reward benchmarks.

There is one important exception. In that same DeepSeek-GRM table, on PPE Correctness, the subset built from verifiable answers, the Bradley-Terry baseline scored 66.7 and DeepSeek-GRM-27B scored 59.8 (63.2 even with 32 votes and the meta RM). The authors state it directly: "In specific domains such as verifiable tasks, DeepSeek-GRM still lags behind scalar models." Their suggested mitigations are reference-based reward generation and longer reasoning. If you have a reference answer or a checker, use it; see [how reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)

## Does a more accurate generative judge train a better policy?

This is the question that matters, and the 2026 evidence says: not necessarily.

**The evaluator-rewarder gap.** Raychev, Lile and Rafailov ([2026](https://arxiv.org/abs/2610.30765)) trained Qwen3 judges from 0.6B to 14B for creative writing, a domain with no programmatic check, in two formats: "Thinking" judges trained with GRPO and "Answer-Only" judges trained with SFT. Then they used each judge to train policies with online DPO, scored by a fixed 32B Gold evaluator. Findings:

- Thinking judges had higher static accuracy at every size.
- Answer-Only judges produced higher peak policy Elo in 7 of 8 matched settings (mean gap 126 Elo at peak).
- Intermediate checkpoints of a 4B Thinking judge had static accuracies of 59.7% to 82.3% across training. The checkpoint at 79.2% made a stronger rewarder than the later one at 82.3%.
- Policies trained with Answer-Only judges lost an average of 60 Elo from peak to final; Thinking judges lost 130.
- High Gold Elo did not mean diverse output: in one cell, 94% of Answer-Only peak outputs shared the same opening line.

The authors are careful to scope this: it is one domain, the comparison changes training objective as well as format, and the ranking is relative to a learned Gold evaluator. But it lines up with earlier work showing static reward-model accuracy is a weak predictor of RL outcomes, and with RewardBench 2's ([Malik et al., 2025](https://arxiv.org/abs/2506.01937)) finding that the best reward model for RLHF depends on the policy's lineage.

**The format mismatch.** RRC ([Wang et al., 2026](https://arxiv.org/abs/2608.06310)) found that generative models "significantly outperform discriminative ones on response ranking tasks" but the advantage "largely diminishes in the RL setting." Their diagnosis: generative judges are naturally comparative, but RL wants a scalar per response, and the usual bridge (the probability of the preference token) "often collapse[s]" when the judge reasons first, so scores become poorly calibrated. Building rewards from rankings among sampled responses or against a few anchor responses instead lifted RL results, for example from 35.8% to 41.3% on AlpacaEval2 and from 8.0% to 11.2% on ArenaHardV2.

The practical lesson: select reward models by what they do in the loop, not by their leaderboard score. A small in-loop pilot, scored by an independent judge or human panel, is worth more than another point of static accuracy.

## What does a generative reward cost?

Let $G$ be the rollouts per prompt, $k$ the votes per judgment, $K$ the number of anchor responses, and $L_j$ the tokens a judge generates per judgment. Judgments per prompt:

$$
N_{\text{scalar}} = G \;(\text{forward passes, no decoding}), \quad
N_{\text{point}} = kG, \quad
N_{\text{all-pairs}} = G(G-1), \quad
N_{\text{anchor}} = 2KG
$$

(All-pairs and anchor counts assume each pair is judged in both orders to cancel position bias.) Decoded judge tokens per prompt are $N \cdot L_j$.

| Setup ($G = 8$) | Judgments per prompt | Decoding? |
|---|---|---|
| Scalar Bradley-Terry | 8 | No |
| Pointwise GenRM, $k = 1$ | 8 | Yes |
| Pointwise GenRM, $k = 8$ | 64 | Yes |
| Pairwise, all pairs, both orders | 56 | Yes |
| Pairwise vs. $K = 2$ anchors, both orders | 32 | Yes |

RRC notes that all-pairs comparison has a "quadratic cost" that "limits scalability," which is why it introduces anchors. DeepSeek-GRM lists efficiency as its first limitation, saying generative RMs lag scalar RMs "at the same scale by nature," which "inhibits its large-scale usage in online RL pipelines." The systems community is now treating this as an infrastructure problem: PivotRL ([Zhao et al., 2026](https://arxiv.org/abs/2610.16866)) describes rollout, GenRM evaluation and training as competing for GPUs, and reports 1.81-2.05x end-to-end throughput over colocated deployment by shifting GPUs between roles at runtime.

Here is a minimal way to turn pairwise judgments into per-response scalar rewards for a GRPO group, judging both orders so position bias cancels. It is a simple win-rate version of the ranking idea, not RRC's exact method:

```python
import itertools

def pairwise_rewards(prompt, responses, judge):
    """judge(prompt, a, b) -> 1 if a is better, 0 if b is better, 0.5 for tie.
    Returns each response's win rate against the rest of the group."""
    n = len(responses)
    wins = [0.0] * n
    for i, j in itertools.combinations(range(n), 2):
        ab = judge(prompt, responses[i], responses[j])        # i shown first
        ba = 1 - judge(prompt, responses[j], responses[i])    # j shown first
        p_i = (ab + ba) / 2
        wins[i] += p_i
        wins[j] += 1 - p_i
    return [w / (n - 1) for w in wins]
```

Win rates are bounded, comparable across prompts, and do not depend on token probabilities, which avoids the calibration problem RRC describes. They are still relative: a group of uniformly bad responses gets the same spread as a group of uniformly good ones, which is why anchors drawn from a fixed reference policy help.

## What goes wrong with generative judges?

**Position bias.** Pairwise judges favor one slot. J1 trains with both orderings in the same batch and rewards consistency. DeCert ([Sun et al., 2026](https://arxiv.org/abs/2610.27528)) supervises whether the rationale actually supports the verdict and reports up to 14.8 points higher position-consistent accuracy, without swap augmentation.

**Right verdict, wrong reasons.** Training on verdict correctness alone can reinforce bad critiques. EnGRICH ([Li et al., 2026](https://arxiv.org/abs/2610.05370)) puts it plainly: "unreliable critiques can still yield correct outcomes and thus be reinforced." Its fix uses a small set of human critiques to train a MetaCritic that checks critique evidence and correctness.

**Rubrics that reward a style.** Kimi K2 ([Kimi Team, 2025](https://arxiv.org/abs/2507.20534)) uses its own model as a rubric-guided critic for non-verifiable tasks. Its appendix flags a side effect: rules against hedging and self-qualification "may favor responses that appear confident and assertive," so the model "may occasionally overstate certainty." Any rubric used as a reward becomes a target; see [how do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)

**Judge drift under policy shift.** A judge validated on human-written responses meets a different distribution once the policy starts optimizing against it. Kimi K2's answer is to keep refining its critic on on-policy rollouts from verifiable-reward prompts, so that subjective judgments stay anchored to checkable signals. The evaluator-rewarder gap above is the same problem measured from the outside.

**Template convergence.** A policy can climb the judge's ranking by converging on a formula, as the 94% shared-opening-line audit shows. Track diversity alongside reward.

## When should you use which?

| Situation | Recommended reward | Why |
|---|---|---|
| Verifiable answers (math, code, structured outputs) | Programmatic checker; scalar RM or reference-guided GenRM as backup | GRMs lag scalar RMs on PPE Correctness; checkers are cheaper and exact |
| Open-ended chat, writing, advice | Generative judge with rubric or principles, or a strong scalar RM; pick by in-loop pilot | Static accuracy does not predict policy quality |
| Distribution shift expected (new domains, new users) | Generative judge | Largest reported gains are out of distribution |
| Tight reward compute budget | Scalar RM, or pointwise GenRM with $k = 1$ | Voting and pairwise multiply judge calls |
| Pairwise judge in RL | Ranking-based rewards with both orders, or anchors | Avoids collapsed token-probability scores |
| High-stakes evaluation | Expert human panel on a held-out sample | Calibrates every automated judge above |

## Where human and expert data still matter

Every strong generative reward model in this post leans on human signal somewhere. Mahan et al. frame GenRM explicitly as a hybrid of RLHF labels and RLAIF reasoning. EnGRICH needs only a small set of human critiques but cannot do without them. Kimi K2 combines its core and prescriptive rubrics with human-annotated rubrics written by its data team. RewardBench 2 sourced new human prompts precisely so that benchmark scores would not be contaminated by downstream evaluations. And the evaluator-rewarder gap means the most valuable dataset is often not more preference pairs but a held-out, expert-rated set that measures whether policies trained with a given judge actually got better. Our posts on [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders) and [annotator disagreement](/blog/annotator-disagreement-in-preference-data) cover how to build that set.

## How Anthroly can help

Thinking judges are a real advance, but the decision that matters is which reward model to train against, and that decision needs ground truth the judge did not produce.

Anthroly builds expert data and RL environments for AI labs. We have about 100-150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains. We write expert preference labels and natural-language critiques, design rubrics that resist style hacking, audit judge rationales for unsupported claims, and build held-out gold sets so you can select reward models by their downstream effect rather than their leaderboard score.

If you are choosing between a scalar and a generative reward model and want the comparison to be trustworthy, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [Does reward model accuracy predict RLHF results? How to evaluate a reward model](/blog/how-to-evaluate-a-reward-model)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [How are tool-use RL environments built?](/blog/how-tool-use-rl-environments-are-built)
- [Rubric rewards vs. reward models](/research/compare/rubric-rewards-vs-reward-models)

---

## References

1. Zhang, L., Hosseini, A., Bansal, H., Kazemi, M., Kumar, A., & Agarwal, R. (2024). [Generative Verifiers: Reward Modeling as Next-Token Prediction](https://arxiv.org/abs/2408.15240). arXiv:2408.15240.

2. Mahan, D., Phung, D. V., Rafailov, R., Blagden, C., Lile, N., Castricato, L., Franken, J.-P., Finn, C., & Albalak, A. (2024). [Generative Reward Models](https://arxiv.org/abs/2410.12832). arXiv:2410.12832.

3. Ankner, Z., Paul, M., Cui, B., Chang, J. D., & Ammanabrolu, P. (2024). [Critique-out-Loud Reward Models](https://arxiv.org/abs/2408.11791). arXiv:2408.11791.

4. Liu, Z., Wang, P., Xu, R., Ma, S., Ruan, C., Li, P., Liu, Y., & Wu, Y. (2025). [Inference-Time Scaling for Generalist Reward Modeling](https://arxiv.org/abs/2504.02495). arXiv:2504.02495.

5. Chen, X., Li, G., Wang, Z., Jin, B., Qian, C., et al. (2025). [RM-R1: Reward Modeling as Reasoning](https://arxiv.org/abs/2505.02387). arXiv:2505.02387.

6. Whitehouse, C., Wang, T., Yu, P., Li, X., Weston, J., Kulikov, I., & Saha, S. (2025). [J1: Incentivizing Thinking in LLM-as-a-Judge via Reinforcement Learning](https://arxiv.org/abs/2505.10320). arXiv:2505.10320.

7. Malik, S., Pyatkin, V., Land, S., Morrison, J., Smith, N. A., Hajishirzi, H., & Lambert, N. (2025). [RewardBench 2: Advancing Reward Model Evaluation](https://arxiv.org/abs/2506.01937). arXiv:2506.01937.

8. Kimi Team (2025). [Kimi K2: Open Agentic Intelligence](https://arxiv.org/abs/2507.20534). arXiv:2507.20534.

9. Raychev, A., Lile, N., & Rafailov, R. (2026). [Scaling Laws for Generative Reward Models](https://arxiv.org/abs/2610.30765). arXiv:2610.30765.

10. Wang, C., Zhu, Z., Huo, Y., Li, B., He, Q., et al. (2026). [RRC: Unlocking Generative Reward Models in LLM Reinforcement Learning via Ranking-Based Reward Construction](https://arxiv.org/abs/2608.06310). arXiv:2608.06310.

11. Sun, G., Bai, B., Min, M. R., & Song, D. (2026). [Judging the Justification: Decision Certificate Supervision for Generative Reward Models](https://arxiv.org/abs/2610.27528). arXiv:2610.27528.

12. Li, X., Wang, B., Li, H., Wang, H., Zhou, Y., et al. (2026). [EnGRICH: Enhancing Generative Reward Modeling with Critiques from Humans](https://arxiv.org/abs/2610.05370). arXiv:2610.05370.

13. Zhao, Y., Li, H., Lin, S., Zhou, Y., Jiang, J., Cui, B., & Fu, F. (2026). [Efficient Resource-Shiftable RL Post-training with Generative Rewards](https://arxiv.org/abs/2610.16866). arXiv:2610.16866.
