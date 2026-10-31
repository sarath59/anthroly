---
title: "Can LLMs Improve Without Human Data? What Self-Play and Label-Free RL Actually Show"
description: "A research guide to self-play and label-free reinforcement learning for LLMs: how Absolute Zero, R-Zero, SPIRAL, Self-Questioning Language Models, TTRL and Intuitor generate their own tasks and rewards, what the results show, why majority-vote and self-certainty rewards collapse under prolonged training, and where human and expert data still sit in the loop."
tags:
  - rlvr
  - self-play
  - reinforcement-learning
  - reasoning
  - synthetic-data
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-31T04:45:00.000Z'
updatedAt: '2026-10-31T04:45:00.000Z'
faq:
  - question: "Can an LLM improve its reasoning without any human-labeled data?"
    answer: "Yes, for a while and under specific conditions. Absolute Zero (Zhao et al., 2025) trains one model to propose and solve its own code reasoning tasks, with a Python executor as the verifier, and reports state-of-the-art coding and math results among zero-setting models without external data. R-Zero (Huang et al., 2025) improves Qwen3-4B-Base by +6.49 on math benchmarks and +7.54 on general reasoning with no seed tasks. But the gains depend on a grounded verifier or on pseudo-labels whose accuracy degrades, and several label-free methods collapse with prolonged training."
  - question: "What is Absolute Zero (AZR)?"
    answer: "Absolute Zero is an RLVR paradigm in which a single model both proposes tasks and solves them. The Absolute Zero Reasoner uses a code executor to validate proposed program, input and output triplets (deduction, abduction and induction tasks) and to verify answers. The proposer is rewarded by learnability: zero if the solver never succeeds, otherwise one minus the solver's average success rate, so tasks of moderate difficulty earn the most."
  - question: "What is test-time reinforcement learning (TTRL)?"
    answer: "TTRL (Zuo et al., 2025) runs RL on unlabeled test questions by sampling many answers, taking the majority answer as a pseudo-label, and rewarding samples that match it. Applied to Qwen2.5-Math-7B it raised AIME 2024 pass@1 from 12.9 to 40.2 without labels. It works because majority vote is often right on problems the model can partly solve; it cannot create signal where the model's majority is wrong."
  - question: "Why does self-rewarding RL collapse?"
    answer: "Because the model learns to maximize its own proxy rather than correctness. Shafayat et al. (2025) found that majority-vote self-training first improves reasoning, then prolonged training produces reward hacking and a sudden, complete performance collapse as the model converges on consistent but wrong answers. Zhang et al. (2025) found internal-feedback rewards such as entropy and self-certainty help early but degrade performance after roughly 20 steps as the model becomes overconfident."
  - question: "Do random rewards really improve reasoning models?"
    answer: "On some models. Shao et al. (2025) found that GRPO with randomly assigned rewards improved Qwen2.5-Math-7B on MATH-500 by 21.4 points, versus 29.1 points with ground-truth rewards, because GRPO's clipping amplifies behaviors already learned in pretraining. The same spurious rewards often failed on Llama3 and OLMo2. The lesson is that label-free gains on one model family can reflect elicitation of existing behavior, not new capability."
  - question: "Does self-play remove the need for expert data?"
    answer: "No. Self-play replaces curated training prompts in domains with a cheap, trusted verifier (code execution, games, arithmetic). It does not supply that verifier in open-ended domains, it does not tell you whether gains are real on held-out expert-written evaluations, and its pseudo-labels get less accurate as tasks get harder (R-Zero's dropped from 79% to 63% over three iterations). Expert data moves to the verifier, the seed distribution, the audit set and the evaluation."
  - question: "How does Anthroly help teams running self-play or label-free RL?"
    answer: "Anthroly's PhD experts build the parts self-play cannot produce for itself: verifiers and rubrics for domains without an executor, expert-solved audit sets to measure pseudo-label accuracy as the curriculum gets harder, and held-out expert-written evaluations to check that self-generated gains transfer. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Every frontier lab is running out of high-quality, human-written training problems faster than it is running out of compute. That is why "can a model teach itself?" has moved from a philosophical question to an engineering one. In 2025 and 2026 a cluster of papers showed that LLMs can generate their own tasks, grade their own answers, and get measurably better at reasoning with no curated dataset at all. A second cluster showed exactly how and when that loop breaks. This post walks through both, with the reward definitions, the reported numbers, and what it means for where human and expert data belong.**

## The short answer

Yes, an LLM can improve without human-labeled training data, but only while one of two things holds: either the environment supplies a trustworthy verifier (a code executor, a game engine, an arithmetic checker), or the model's own consensus is still mostly right on the problems it is training on. Absolute Zero, SPIRAL and the code variant of Self-Questioning Language Models live in the first regime and report solid, transferable gains. TTRL, R-Zero, Intuitor and majority-vote self-training live in the second regime, and the same papers (or their follow-ups) document pseudo-label accuracy falling as tasks get harder, reward hacking, and collapse under prolonged training. Self-play does not remove human data from the pipeline. It moves it: from writing training prompts to building verifiers, auditing pseudo-labels, and writing the held-out evaluations that tell you whether any of it worked.

## What does "learning without human data" mean?

Standard RL with verifiable rewards (RLVR) needs two things from people: a set of prompts, and a way to check answers (gold answers or test cases). Label-free methods remove one or both. It helps to separate them:

| Method | Who writes the tasks? | Who checks the answers? | Grounding |
|---|---|---|---|
| Standard RLVR | Humans (curated prompts) | Gold answers or tests | External |
| TTRL (Zuo et al., 2025) | Humans (unlabeled questions) | Majority vote over samples | Model consensus |
| Intuitor (Zhao et al., 2025) | Humans (unlabeled questions) | Model's own confidence (self-certainty) | Model internals |
| Absolute Zero (Zhao et al., 2025) | The model | Python executor | External (code execution) |
| R-Zero (Huang et al., 2025) | The model (Challenger) | Solver majority vote | Model consensus |
| SQLM (Chen et al., 2025) | The model (proposer, topic prompt only) | Majority vote, or model-written unit tests for code | Mixed |
| SPIRAL (Liu et al., 2025) | The game (self-play opponent) | Game outcome | External (game rules) |

The right-hand column is the one that predicts how far each method goes. When the check is external, the model cannot talk its way into reward. When the check is the model's own consensus or confidence, it can.

## How does Absolute Zero work?

Absolute Zero (Zhao et al., 2025) trains a single model in two roles. As a **proposer**, it writes code reasoning tasks: a program, an input and an output, from which three task types are built. Deduction asks for the output given program and input; abduction asks for an input that produces a given output; induction asks for the program given input-output examples. Python executes every proposed task, so only valid, deterministic tasks enter the buffer, and the same executor checks the solver's answers.

The key design choice is the proposer reward. The solver attempts each proposed task $G$ times, giving an average success rate $\bar{r}_{\text{solve}}$, and the proposer is paid for **learnability**:

$$
r_{\text{propose}} = \begin{cases} 0 & \text{if } \bar{r}_{\text{solve}} = 0 \\ 1 - \bar{r}_{\text{solve}} & \text{otherwise} \end{cases}
$$

A task the solver always solves earns nothing; a task it never solves also earns nothing, since it gives no gradient. Tasks the solver solves occasionally earn the most. This is the same insight as pass-rate filtering in curated RLVR (see [how to choose prompts for RLVR training](/blog/how-to-choose-prompts-for-rlvr-training)), turned into a reward for a task generator.

The reported results are strong for a method with no external data: state-of-the-art coding performance among zero-setting models and an average of 1.8 points above previous zero-setting models trained on in-domain data. Several findings matter for practitioners:

- **Cross-domain transfer.** Trained only on self-proposed code reasoning, AZR-Base-7B and AZR-Coder-7B improved their math averages by 10.9 and 15.2 points, while expert code models trained with standard RLVR gained only 0.65 points in math on average.
- **Bigger bases gain more.** The 3B, 7B and 14B coder models gained +5.7, +10.2 and +13.2 points respectively.
- **Priors matter.** Qwen-Coder-7B started 3.6 points behind Qwen-7B in math and ended 0.7 points ahead after AZR training.
- **Safety is not free.** With Llama3.1-8B, the authors observed occasional concerning chains of thought they call an "uh-oh moment", and flag the need for safety-aware training.

## How does R-Zero generate its own curriculum?

R-Zero (Huang et al., 2025) splits one base model into two separately trained models, a **Challenger** and a **Solver**, and has no executor. The Challenger is trained with GRPO to write questions the current Solver is maximally uncertain about. For a question $x$, the Solver samples $m$ answers, the most frequent becomes the pseudo-label $\tilde{y}$, and $\hat{p}$ is the fraction of samples that agree with it. The Challenger's uncertainty reward is

$$
r_{\text{uncertainty}}(x) = 1 - 2\,\left|\hat{p}(x) - \tfrac{1}{2}\right|
$$

which peaks when the Solver agrees with itself half the time. A BLEU-based repetition penalty discourages near-duplicate questions in a batch. The Solver is then trained with GRPO on questions whose agreement falls between 3 and 7 out of 10 samples, using its own majority vote as the label.

It works: Qwen3-4B-Base improved by +6.49 on math benchmarks and +7.54 on general-domain reasoning. But the paper's own analysis is the most useful part. Measured against an external labeler, **the accuracy of the self-generated pseudo-labels fell from 79.0% to 63.0% by the third iteration**, because as the Challenger succeeds in making questions harder, the Solver's majority vote becomes less reliable. Performance peaked and then declined; an ablation that shared parameters between Challenger and Solver produced lower-accuracy pseudo-labels at every stage and peaked after the first iteration. In plain terms: the curriculum gets harder exactly as the grader gets worse.

## What do Self-Questioning Language Models and SPIRAL add?

**Self-Questioning Language Models** (Chen et al., 2025) start from a single topic prompt, such as "algebra word problems", and train a proposer and solver with asymmetric self-play. The proposer is rewarded when its problem is neither too easy nor too hard; the solver is rewarded by majority vote for arithmetic and algebra, while for coding the proposer writes unit tests that serve as the verifier. They report improvements on three-digit multiplication, OMEGA algebra problems and Codeforces programming problems without curated training data.

**SPIRAL** (Liu et al., 2025) replaces generated problems with zero-sum games. One shared policy plays both sides of multi-turn games (TicTacToe, Kuhn Poker, Simple Negotiation) against continuously improving copies of itself, and the game outcome is the reward. To stabilize multi-agent training, they introduce role-conditioned advantage estimation, which keeps a separate baseline per game and per role. SPIRAL reports improvements of up to 10% across a suite of 8 reasoning benchmarks on 4 models from the Qwen and Llama families, outperforming supervised fine-tuning on 25,000 expert game trajectories, with multi-game training giving the strongest results. Even DeepSeek-R1-Distill-Qwen-7B, already trained with RLVR, still benefited.

Games are the cleanest form of self-play because the rules are an external verifier that cannot be argued with, and an improving opponent is an automatic curriculum. The open question is how much reasoning that transfers to domains with no game-like structure.

## What happens when the model grades itself?

The methods that check answers with the model's own signal have the most impressive early curves and the most documented failure modes.

**TTRL** (Zuo et al., 2025) samples many answers to each unlabeled question, takes the majority answer as the label, and rewards samples that match it:

```python
from collections import Counter

def majority_vote_rewards(answers):
    """answers: list of extracted final answers (None if unparseable)."""
    valid = [a for a in answers if a is not None]
    if not valid:
        return [0.0] * len(answers)
    label, _ = Counter(valid).most_common(1)[0]
    return [1.0 if a == label else 0.0 for a in answers]
```

On Qwen2.5-Math-7B, TTRL raised AIME 2024 pass@1 from 12.9 to 40.2, and the authors report it can exceed the initial model's maj@n and approach training on the test data with ground-truth labels.

**Intuitor** (Zhao, Kang, Feng, Levine and Song, 2025) goes further and drops answer extraction entirely. Its reward is **self-certainty**, the average KL divergence from a uniform distribution over the vocabulary $\mathcal{V}$ to the model's next-token distribution:

$$
\text{SC}(o \mid q) = \frac{1}{|o|} \sum_{i=1}^{|o|} \mathrm{KL}\left(U_{\mathcal{V}} \,\Big\|\, p_\theta(\cdot \mid q, o_{<i})\right)
$$

Plugged into GRPO in place of a verifiable reward, it matched GRPO on math benchmarks and generalized better to code generation, with no gold answers or test cases.

Then the follow-ups:

- **Collapse under prolonged training.** Shafayat et al. (2025) studied self-rewarding training with majority vote. It improved reasoning and even the quality of the self-feedback at first, but prolonged RL led to reward hacking and "sudden and complete performance collapse": the model learned to maximize agreement rather than correctness.
- **Internal feedback is front-loaded.** Zhang et al. (2025) studied RL from internal feedback (token entropy, trajectory entropy, self-certainty). It improved base models early, sometimes matching RLVR, but performance degraded after roughly 20 training steps as entropy minimization made models overconfident and suppressed transitional words in reasoning. Instruction-tuned models, whose entropy is already low, gained little. This is the same mechanism we described in [why entropy collapses in RL for reasoning models](/blog/why-does-entropy-collapse-in-rl-for-reasoning-models).
- **Some gains are elicitation, not learning.** Shao et al. (2025) showed that on Qwen2.5-Math-7B, GRPO with random rewards improved MATH-500 by 21.4 points, against 29.1 with ground-truth rewards, because GRPO's clipping amplifies behaviors the model already has (here, reasoning in code without executing it, which rose from 65% to over 90% of responses). The effect was model-dependent and generally did not transfer to Llama3 or OLMo2.

Put these together and the interpretation of label-free gains changes. On a strong base model, almost any consistent pressure toward confident, shorter-entropy answers can surface latent skill. That is real and useful. It is not the same as learning something the model did not know, and it runs out.

## A simple model of when self-play helps

Let $a$ be the probability that the model's pseudo-label (majority vote or confident answer) is correct on a given problem. Rewarding agreement with the pseudo-label pushes the policy toward the correct answer with weight roughly proportional to $a$ and toward a wrong one with weight $1 - a$. Learning from self-generated labels is net useful while $a$ is comfortably above one half on the training distribution, and becomes harmful when the curriculum pushes into problems where $a$ falls toward or below it.

That is exactly the tension R-Zero measured: the Challenger is rewarded for maximum Solver uncertainty, which pushes the training distribution toward the region where pseudo-labels are least reliable. Executor-grounded methods escape this because their correctness signal does not depend on $a$ at all. This gives a practical rule: **the more of your reward that comes from an external verifier, the longer self-play keeps working.**

## Where does expert data go in a self-play pipeline?

Self-play does not eliminate human input; it relocates it to four places that are harder to automate than writing prompts:

1. **The verifier.** Absolute Zero works because Python is a perfect judge of program execution. For chemistry, law, medicine or finance there is no Python. Someone has to build the checker, rubric or simulator, and its quality bounds everything downstream. See [how reliable RLVR verifiers are](/blog/how-reliable-are-rlvr-verifiers).
2. **The pseudo-label audit set.** R-Zero could report that pseudo-label accuracy fell from 79% to 63% only because it had an external labeler. Without an expert-solved audit sample drawn from the self-generated distribution at each iteration, you cannot see the collapse coming. A few hundred items per checkpoint is usually enough to estimate the trend with a useful confidence interval (our [eval sample size calculator](/research/eval-sample-size-calculator) gives exact numbers).
3. **The seed and topic distribution.** SQLM starts from a topic prompt and AZR from seed triplets. What topics you seed and what the generator is allowed to propose determines coverage. Domain experts know which subskills matter and which generated tasks are trivial, ill-posed or out of scope.
4. **The held-out evaluation.** The spurious-rewards result is a warning that benchmark gains on one model family can reflect elicitation. The only defense is held-out, expert-written evaluations that were never in any generated curriculum, ideally in the domain you actually care about. See [how expert-written benchmarks are built](/blog/how-expert-written-benchmarks-are-built).

## What should a team actually do?

1. **Use self-play where a cheap external verifier exists.** Code, formal math (see [theorem-proving RL environments](/blog/how-are-theorem-proving-rl-environments-built)), games and simulators are good fits. Expect weaker, shorter-lived gains where the check is consensus.
2. **Track pseudo-label accuracy, not just training reward.** Rising self-reward with flat or falling audited accuracy is the signature of the collapse Shafayat et al. describe.
3. **Watch entropy.** Internal-feedback rewards reduce entropy by design; stop or mix in verifiable rewards before the model becomes uniformly overconfident.
4. **Validate across model families.** If a label-free method only works on one base model, suspect elicitation.
5. **Mix, do not replace.** Label-free and self-play signals are a cheap way to extend a curated RLVR set, not a substitute for the verified core. See [how much data you need to fine-tune a reasoning model](/blog/how-much-data-to-fine-tune-a-reasoning-model) and [synthetic data vs expert human data](/blog/synthetic-data-vs-expert-human-data).
6. **Add safety evaluation to self-play runs.** AZR's "uh-oh moment" is a reminder that a model shaping its own curriculum can drift in ways nobody asked for; see [how AI red-teaming datasets are built](/blog/how-are-ai-red-teaming-datasets-built).

## How Anthroly can help

Self-play shifts the bottleneck from prompts to judgment: verifiers for domains without an executor, audited labels on the hard tail of a self-generated curriculum, and evaluations the model has never seen. Anthroly's PhD experts in mathematics, physics, chemistry, biology, medicine, law, finance and computer science build domain verifiers and rubrics, solve and grade audit samples from your generated tasks at each checkpoint so you can see pseudo-label accuracy drift before training collapses, and write held-out expert evaluations to confirm that self-generated gains transfer. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are running label-free or self-play RL and want an expert audit of what your model is teaching itself, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can look at a sample of your generated tasks together.

## Related reading

- [Does RLVR teach new reasoning?](/blog/does-rlvr-teach-new-reasoning)
- [How reliable are RLVR verifiers?](/blog/how-reliable-are-rlvr-verifiers)
- [How to choose prompts for RLVR training](/blog/how-to-choose-prompts-for-rlvr-training)
- [Why does entropy collapse in RL for reasoning models?](/blog/why-does-entropy-collapse-in-rl-for-reasoning-models)
- [Synthetic data vs expert human data](/blog/synthetic-data-vs-expert-human-data)
- [RLAIF vs RLHF: can AI feedback replace human preference labels?](/blog/rlaif-vs-rlhf-can-ai-feedback-replace-human-preference-labels)
- [How do you train LLMs to forecast? RL on real-world outcomes and leakage-free evaluation](/blog/how-to-train-llms-to-forecast-with-reinforcement-learning)

---

## References

1. Zhao, A., Wu, Y., Yue, Y., et al. (2025). [Absolute Zero: Reinforced Self-play Reasoning with Zero Data](https://arxiv.org/abs/2505.03335). NeurIPS 2025. arXiv:2505.03335.
2. Huang, C., Yu, W., Wang, X., et al. (2025). [R-Zero: Self-Evolving Reasoning LLM from Zero Data](https://arxiv.org/abs/2508.05004). ICLR 2026. arXiv:2508.05004.
3. Chen, L., Prabhudesai, M., Fragkiadaki, K., Liu, H., Pathak, D. (2025). [Self-Questioning Language Models](https://arxiv.org/abs/2508.03682). arXiv:2508.03682.
4. Liu, B., Guertler, L., Yu, S., et al. (2025). [SPIRAL: Self-Play on Zero-Sum Games Incentivizes Reasoning via Multi-Agent Multi-Turn Reinforcement Learning](https://arxiv.org/abs/2506.24119). arXiv:2506.24119.
5. Zuo, Y., Zhang, K., Sheng, L., et al. (2025). [TTRL: Test-Time Reinforcement Learning](https://arxiv.org/abs/2504.16084). NeurIPS 2025. arXiv:2504.16084.
6. Zhao, X., Kang, Z., Feng, A., Levine, S., Song, D. (2025). [Learning to Reason without External Rewards](https://arxiv.org/abs/2505.19590). ICLR 2026. arXiv:2505.19590.
7. Shafayat, S., Tajwar, F., Salakhutdinov, R., Schneider, J., Zanette, A. (2025). [Can Large Reasoning Models Self-Train?](https://arxiv.org/abs/2505.21444) arXiv:2505.21444.
8. Zhang, Y., Zhang, Z., Guan, H., et al. (2025). [No Free Lunch: Rethinking Internal Feedback for LLM Reasoning](https://arxiv.org/abs/2506.17219). arXiv:2506.17219.
9. Shao, R., Li, S. S., Xin, R., et al. (2025). [Spurious Rewards: Rethinking Training Signals in RLVR](https://arxiv.org/abs/2506.10947). arXiv:2506.10947.
