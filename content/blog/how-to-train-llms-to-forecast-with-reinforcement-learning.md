---
title: "How Do You Train LLMs to Forecast? RL on Real-World Outcomes, Proper Scoring Rules and Leakage-Free Evaluation"
description: "A research guide to training language models to forecast real-world events with reinforcement learning: why resolved questions are a verifiable reward, how Brier and log scores work as RL rewards, why GRPO's standard-deviation normalization hurts calibration, how temporal leakage breaks backtests, and how ForecastBench, FutureX and pastcasting environments evaluate forecasters."
tags:
  - rlvr
  - reinforcement-learning
  - forecasting
  - reward-design
  - evals
  - calibration
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-31T12:45:00.000Z'
updatedAt: '2026-10-31T12:45:00.000Z'
faq:
  - question: "Can you train an LLM to forecast with reinforcement learning?"
    answer: "Yes. Forecasting questions resolve to a known outcome, so a probability forecast can be scored with a proper scoring rule such as the Brier or log score and used as an RL reward. Turtel et al. (2025) trained a 14B reasoning model on Polymarket questions and reached a Brier score of 0.190 with an ECE of 0.062 on 1,265 held-out questions, matching or beating OpenAI o1 on accuracy and clearly beating it on calibration, though still behind the market price itself."
  - question: "What reward should you use to train an LLM forecaster?"
    answer: "A strictly proper scoring rule applied to the resolved outcome, most commonly the negative Brier score, -(p - y)^2, or the log score. Both reward truthful probabilities in expectation, but they are not interchangeable in finite training: Turtel, Wilczewski, Skotheim, Satopää and Tetlock (2026) found the Brier-trained model had the best Brier score and AUC-ROC, while the log-trained model had the best log score and the lowest calibration error."
  - question: "Why does standard GRPO hurt forecasting calibration?"
    answer: "GRPO divides each group's centered rewards by the group's standard deviation, which changes the scale of the learning signal from question to question and breaks the incentive a proper scoring rule is designed to create. Turtel et al. (2025) report that per-question normalization dampens large errors and encourages overconfidence, and the AlphaBet paper (2026) shows the normalization degrades proper-scoring-rule performance while leaving top-outcome accuracy largely unchanged. Dr. GRPO-style centering without division, or ReMax-style baselines, avoid the problem."
  - question: "What is temporal leakage in forecasting evaluation?"
    answer: "Temporal leakage is any path by which information from after the forecast date reaches the forecaster. Paleka et al. (2025) catalog the main ones: date-restricted search engines that still return updated pages, retrieval models trained on future data, model knowledge beyond the stated cutoff, and logical leakage, where the fact that a question has already resolved by the evaluation date reveals the answer. Training on questions in non-chronological order or for multiple epochs leaks too."
  - question: "How are LLM forecasters evaluated without leakage?"
    answer: "Either live, on questions that have not resolved yet (ForecastBench, FutureX, Prophet Arena), or by pastcasting in a frozen environment, where questions have resolved but the agent can only search an offline snapshot of the web from before the forecast date (Bench to the Future). Consistency checks offer an instant proxy: Paleka et al. (2024) show arbitrage-based consistency metrics correlate with Brier scores that are only known later."
  - question: "Are LLMs as good as human superforecasters?"
    answer: "Not on the published evidence. In the ForecastBench paper (Karger et al.), superforecasters reached an overall mean Brier score of 0.096 on a 200-question human comparison set, significantly better than the general public (0.121) and the top LLMs. Halawi et al. (2024) built a retrieval system that reached a Brier score of 0.179 against a human crowd at 0.149, and Turtel et al. (2025) report that no model beat the Polymarket price."
  - question: "How does Anthroly help with forecasting RL environments?"
    answer: "Anthroly's PhD experts write well-specified forecasting questions with unambiguous resolution criteria, audit retrieval snapshots and questions for temporal and logical leakage, write domain rationales and base rates for economics, policy, science and markets, and adjudicate disputed resolutions. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Forecasting looks like the perfect reinforcement learning task. Every question eventually resolves, so the world grades the model for free, and a probability can be scored exactly with a proper scoring rule. Between 2024 and 2026 a run of papers turned that idea into working training recipes, and a parallel run of papers showed how easily forecasting results are inflated by information from the future. This post covers both: how RL forecasters are trained, which reward and optimizer choices matter, and how to build training and evaluation data that does not leak.**

## The short answer

You train an LLM to forecast by giving it a question, a cutoff date and only the information available before that cutoff, asking for a probability, and rewarding it with a **strictly proper scoring rule** once the event resolves. The recipe works: a 14B reasoning model trained this way on Polymarket and generated questions matched or beat OpenAI o1 on accuracy with much better calibration (Turtel et al., 2025), and Qwen3-32B trained on 5,120 news-derived questions improved its Brier score by 27% and halved calibration error (Turtel et al., 2026). Three details decide whether it works: the scoring rule you reward, whether your RL algorithm preserves that rule's incentives (standard GRPO does not), and whether any information from after the cutoff reaches the model during training or evaluation. Published results still put the best systems behind human superforecasters and behind liquid prediction markets.

## Why is forecasting a verifiable-reward problem?

In RLVR for math or code, a checker decides whether an answer is right. Forecasting replaces the checker with time. The "Future-as-Label" paper frames it directly: "the passage of time provides labels that require no annotation." The structure has three parts:

1. **A masked information state.** At prediction time $t$ the model sees only sources published before $t$.
2. **A resolver.** After the event resolves at time $s > t$, a fixed external process assigns the outcome $y \in \{0, 1\}$ using post-$t$ evidence. It does not read the forecast or the reasoning.
3. **A terminal reward.** The forecast $p$ is scored against $y$ with a proper scoring rule.

Two properties make this different from math RLVR. First, outcomes are **aleatoric**: a perfect forecaster who says 0.3 is still "wrong" 30% of the time, so reward is noisy even for the best possible policy. Levy (2026) makes this point with a fair die: there is no better answer than about 0.167 for "will it roll a six", yet the ground truth is 0 or 1. Second, rewards are **delayed**, which is why most training uses already-resolved questions replayed with a frozen information state, not live questions.

## Which reward should a forecaster get?

A scoring rule $S(p, y)$ is strictly proper if a forecaster who believes the event has probability $q$ maximizes expected score only by reporting $p = q$. The two common choices are the negative Brier score and the log score:

$$
S_{\text{Brier}}(p, y) = -(p - y)^2, \qquad S_{\text{log}}(p, y) = y \log p + (1 - y)\log(1 - p).
$$

Properness of the Brier reward takes one line. If the forecaster's belief is $q$, its expected loss is

$$
\mathbb{E}_{y \sim q}\big[(p - y)^2\big] = q(1 - p)^2 + (1 - q)p^2,
$$

whose derivative in $p$ is $2(p - q)$, which is zero only at $p = q$. Always answering 0.5 gives a Brier score of 0.25, which is why 0.25 is the standard "unskilled" baseline and why Turtel et al. (2025) assign 0.25 to unparseable answers in their soft-Brier metric.

Properness is a statement about expectations. In finite RL training, the shape of the rule matters. Turtel, Wilczewski, Skotheim, Satopää and Tetlock (2026) trained GPT-OSS-120B with Dr. GRPO and rank-32 LoRA adapters under five strictly proper rewards (log, Brier, spherical, and two beta-family scores), holding model, data, optimizer, steps and rollout budget fixed. On 965 held-out questions:

| Reward | Log score (higher better) | Brier (lower better) | ECE (lower better) | AUC-ROC |
|---|---|---|---|---|
| Log | -0.5132 | 0.1653 | 0.0434 | 0.7407 |
| Brier | -0.5185 | 0.1648 | 0.0568 | 0.7511 |
| Spherical | -0.5273 | 0.1680 | 0.0538 | 0.7353 |
| Beta(2,8) | -0.5223 | 0.1677 | 0.0449 | 0.7372 |
| Beta(8,8) | -0.5536 | 0.1731 | 0.0954 | 0.7366 |
| Base model | -0.5585 | 0.1861 | 0.1099 | 0.7248 |

Every reward improved on the base model, but differently: Brier training gave the best Brier score and discrimination, log training the best log score and calibration, and the authors' bias-information-noise decomposition shows models with similar aggregate scores reaching them through different error structures. The practical rule is to **train on the rule you will be judged by**, and to report more than one metric.

## Why does standard GRPO hurt calibration?

GRPO samples a group of $G$ responses per question and normalizes rewards within the group:

$$
A_i = \frac{r_i - \bar{r}}{\sigma_r + \epsilon}.
$$

For forecasting this is a problem. Dividing by $\sigma_r$ rescales the learning signal per question according to how much the sampled forecasts happened to disagree, so the effective objective is no longer the scoring rule on its original scale. Turtel et al. (2025) argue that per-question normalization "can excessively dampen large errors and encourage overconfidence," erasing the asymmetry whereby confident correct answers earn small gains while rare confident misses incur large penalties, which is exactly the signal that teaches calibration. In their runs, standard GRPO without guardrails put 39.3% of predictions in the 0 to 10% or 90 to 100% buckets, many exactly at 0 or 1. Their modified GRPO, which removes the division, put 7.9% there.

Two later papers confirm the diagnosis from different angles. The scoring-rule comparison above uses Dr. GRPO, keeping only group centering and no KL penalty, specifically so that "the proper scoring rule solely determines the reward." AlphaBet (Ye et al., 2026) shows formally and empirically that GRPO's standard-deviation normalization distorts the reporting target under multi-class proper scores, degrading Brier performance while leaving top-outcome accuracy largely unchanged. That last point is the trap: if you only track accuracy, the damage is invisible.

Minimal fix: center, do not scale.

```python
import numpy as np

def brier_reward(p: float | None, y: int) -> float:
    """Negative Brier score; unparseable answers get the 0.5-forecast penalty."""
    if p is None or not (0.0 <= p <= 1.0):
        return -0.25
    return -(p - y) ** 2

def advantages(rewards: np.ndarray) -> np.ndarray:
    """Dr. GRPO-style: group-centered rewards, no std division, so the
    proper scoring rule keeps its scale across questions."""
    return rewards - rewards.mean()
```

## What training data do forecasting RL runs use?

| Work | Questions and evidence | Method | Reported result |
|---|---|---|---|
| Halawi et al. (2024) | Questions from competitive forecasting platforms; test set after model cutoffs | Retrieval system plus fine-tuning on self-generated reasoning that beat the crowd | Brier 0.179 vs human crowd 0.149; crowd-weighted blend 0.146 |
| Turtel et al. (2025) | 10,000 Polymarket questions plus 100,000 generated questions; news headlines before a sampled prediction date | ReMax and modified GRPO with guardrails, online, one pass in time order | Brier 0.190, ECE 0.062 on 1,265 test questions (7-run ensemble) |
| Turtel et al. (2026), Future-as-Label | 5,620 binary questions generated from a frozen news corpus; 5,120 train, 500 test, plus 293 Metaculus questions | RL with proper scoring rules on causally masked inputs | Qwen3-32B: Brier improved 27%, calibration error halved; beats Qwen3-235B |
| Levy (2026) | 512 highest-volume binary Polymarket questions; Wikipedia-revision tool or news summaries | GRPO on 1.5B to 14B models | Qwen 2.5 1.5B beats Claude 3.5 Sonnet by cross-entropy to market prices |
| Ye et al. (2026), AlphaBet | Forecast-Dojo replayable environment | Agentic RL: search, reason and report at multiple pre-resolution dates | GLM-4.5-Air Brier 0.731 to 0.626 (Forecast-Dojo), 0.612 to 0.528 (FutureX), multi-class |

Three design choices recur.

**Strict time order, one pass.** Turtel et al. (2025) train "strictly online: each question is encountered only once in chronological order," because re-exposing the model to past questions after outcomes are known leads to severe overfitting, the model "essentially learns the future." Paleka et al. (2025) describe the same hazard for any training set: early samples can leak information relevant to later ones, such as an election question followed by a primaries question.

**Generated questions scale, market questions anchor.** Prediction markets give well-specified, liquid questions but only thousands of them. Generated questions from news streams scale to 100,000 and beyond, at the cost of distribution shift and the shortcut risk discussed below. Future-as-Label tests on both a generated set and 293 human-written Metaculus questions never used in data construction, which is the right check.

**Multiple prediction dates per event.** AlphaBet's insight is that one resolved event can supervise several forecasts made with different information. Its ablations attribute the gains to multi-date training, and they decompose forecasting regret into an evidence-acquisition gap and a probability-reporting gap. Training only at one date leaves evidence gathering outside the learning loop.

A useful split invariant for any of these setups:

$$
\max_{q \in \text{train}} t_{\text{res}}(q) < \min_{q \in \text{test}} t_{\text{pred}}(q),
$$

every training question resolves before any test forecast is made. Turtel et al. (2025) use exactly this rule for their test set.

## How does temporal leakage inflate forecasting results?

Paleka, Goel, Geiping and Tramèr (2025) argue that many forecasting claims are hard to trust and group the problems into two families: leakage, and poor extrapolation from benchmark to real forecasting. The leakage paths that matter most for data builders:

1. **Date-restricted search is unreliable.** Pages are updated without changing their publication dates, sidebars and comments reflect present knowledge, and search engines often do not know when a page first appeared.
2. **Retrieval ranks with future knowledge.** A 2022-restricted search still runs today's ranking models, so documents that became important later rank higher than they would have at the time.
3. **Model cutoffs are guidelines.** Models know about some events after their stated training cutoff.
4. **Logical leakage.** If a question is selected because it has already resolved, the selection can reveal the answer. Their example: "Will Queen Elizabeth live to be 100?" asked in 2021 and backtested in 2025 can only have resolved as "no" by then, since she would have turned 100 in 2026. They recommend keeping only questions where every possible resolution could have been validated by the evaluation date.
5. **Shortcuts in generated questions.** On questions generated retroactively from news, they found even weak classifiers reaching over 80% accuracy on one prior dataset's binary questions.

Practitioners mitigate these in layers. Turtel et al. (2025) put every test prediction date after the last training resolution, restrict test questions to those originally scheduled to close by dataset construction time (against logical leakage), use o3 to flag and drop questions whose retrieved news contains information that should not have been known, and drop zero-volume markets. Future-as-Label freezes a timestamped news corpus at each cutoff and generates questions only from it.

## How are LLM forecasters evaluated?

| Benchmark | How it avoids leakage | What it measures |
|---|---|---|
| ForecastBench (Karger et al.) | Only questions with no known answer at submission; 1,000 questions sampled from a nightly-updated bank of market and dataset questions | Brier vs superforecasters and the public; public leaderboard |
| FutureX (Zeng et al., 2025) | Live, daily-updated questions and automated answer collection | Agents with search and tools; failure modes such as fake web pages |
| Prophet Arena (Yang et al., 2025) | Continuously collected live tasks, decomposed into pipeline stages | Calibration, consistency, simulated market returns |
| Bench to the Future (FutureSearch, 2025) | Pastcasting: resolved questions plus an offline corpus of tens of thousands of pages per question | Repeatable agent forecasting in a hermetic environment |
| Consistency checks (Paleka et al., 2024) | No resolution needed: arbitrage on logically related questions | Instant proxy that correlates with later Brier scores |

The human comparison is still sobering. In the ForecastBench paper, superforecasters reached an overall mean Brier score of 0.096 on the 200-question human comparison set, significantly better than the general public at 0.121 and the top LLMs; the best model without access to the human crowd forecast on market questions scored 0.136. Halawi et al. (2024) found their system at 0.179 against a crowd at 0.149, although blending the two improved the crowd to 0.146 and the system beat the crowd in a selective setting. Turtel et al. (2025) report that no model beat the Polymarket price. Their simulated trading result is informative about where models add value: the fine-tuned model's edge came almost entirely from questions where the market was most unsure (prices between 40% and 60%), where its bets succeeded 11.8 percentage points more often than market prices implied.

Paleka et al. (2025) add a caution for leaderboard design: forecasting benchmarks can reward strategic gambling. A system that commits to one outcome of a correlated event and conditions every related forecast on it will either top the board or fail, which beats a calibrated strategy on the chance of ranking first. Report calibration, discrimination and per-topic results, not a single rank.

## How do you build a forecasting RL environment that holds up?

1. **Write resolvable questions.** Each needs an exact resolution source, a resolution date and an explicit rule for edge cases. Ambiguous resolution is reward noise you added yourself.
2. **Freeze the information state.** Use a timestamped, frozen corpus or a pastcasting snapshot rather than live date-filtered search, and audit a sample for post-cutoff content.
3. **Filter for logical leakage.** Keep questions whose every possible outcome could have been observed by the evaluation date; drop questions selected because they resolved early.
4. **Order time strictly.** One chronological pass for training, test forecasts after all training resolutions, no multi-epoch replay.
5. **Use a proper rule and an optimizer that respects it.** Center rewards without standard-deviation scaling, track calibration (ECE) and log score alongside Brier, and watch for collapse to 0 and 1.
6. **Supervise multiple dates per event** when the policy also searches, so evidence gathering is trained.
7. **Hold out human-written questions.** Generated questions are scalable but may carry shortcuts; a held-out set of expert or platform questions tells you whether gains transfer.
8. **Benchmark against strong baselines.** Market prices and human crowds, not just other models.

## How Anthroly can help

The bottleneck in forecasting RL is not compute; it is question quality and leakage control. Anthroly's PhD experts in economics, political science, public health, the physical and life sciences and finance write well-specified forecasting questions with unambiguous resolution criteria and edge-case rules, audit frozen retrieval snapshots and generated questions for temporal and logical leakage and shortcut cues, write base rates and domain rationales for supervised warm starts, and adjudicate disputed resolutions. We can also build held-out, human-written evaluation sets that never touch your training pipeline. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building a forecasting environment or an outcome-based RL pipeline, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can review a sample of your questions and splits together.

## Related reading

- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [GRPO vs PPO vs DAPO: which RL algorithm should you use to train a reasoning model?](/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl)
- [How do you build an agent benchmark that won't be contaminated or saturated?](/blog/building-contamination-resistant-agent-benchmarks)
- [Can LLMs improve without human data? What self-play and label-free RL actually show](/blog/can-llms-improve-without-human-data-self-play-rl)
- [How do you evaluate deep research and browsing agents?](/blog/how-to-evaluate-deep-research-agents)
- [Can reinforcement learning reduce LLM hallucinations?](/blog/can-reinforcement-learning-reduce-llm-hallucinations)

---

## References

1. Turtel, B., Franklin, D., Skotheim, K., Hewitt, L., & Schoenegger, P. (2025). [Outcome-based Reinforcement Learning to Predict the Future](https://arxiv.org/abs/2505.17989). arXiv:2505.17989.
2. Turtel, B., Wilczewski, P., Franklin, D., & Skothiem, K. (2026). [Future-as-Label: Scalable Supervision from Real-World Outcomes](https://arxiv.org/abs/2601.06336). arXiv:2601.06336.
3. Turtel, B., Wilczewski, P., Skotheim, K., Satopää, V. A., & Tetlock, P. E. (2026). [How Proper Scoring Rules Shape LLM Forecasting](https://arxiv.org/abs/2608.28482). arXiv:2608.28482.
4. Ye, L., Zhang, R., Liu, X., et al. (2026). [AlphaBet: Reinforcement Learning for LLM Event Forecasting Agents](https://arxiv.org/abs/2610.22684). arXiv:2610.22684.
5. Levy, A. A. (2026). [Reinforcement Learning for LLM-based Event Forecasting](https://arxiv.org/abs/2606.15917). arXiv:2606.15917.
6. Halawi, D., Zhang, F., Chen, Y.-H., & Steinhardt, J. (2024). [Approaching Human-Level Forecasting with Language Models](https://arxiv.org/abs/2402.18563). arXiv:2402.18563.
7. Karger, E., Bastani, H., Chen, Y.-H., et al. [ForecastBench: A Dynamic Benchmark of AI Forecasting Capabilities](https://arxiv.org/abs/2409.19839). arXiv:2409.19839. Leaderboard: [forecastbench.org](https://www.forecastbench.org/).
8. Paleka, D., Goel, S., Geiping, J., & Tramèr, F. (2025). [Pitfalls in Evaluating Language Model Forecasters](https://arxiv.org/abs/2506.00723). arXiv:2506.00723.
9. Paleka, D., Pallavi Sudhir, A., Alvarez, A., et al. (2024). [Consistency Checks for Language Model Forecasters](https://arxiv.org/abs/2412.18544). arXiv:2412.18544.
10. Zeng, Z., Liu, J., Chen, S., et al. (2025). [FutureX: An Advanced Live Benchmark for LLM Agents in Future Prediction](https://arxiv.org/abs/2508.11987). arXiv:2508.11987.
11. Yang, Q., Mahns, S., Li, S., et al. (2025). [LLM-as-a-Prophet: Understanding Predictive Intelligence with Prophet Arena](https://arxiv.org/abs/2510.17638). arXiv:2510.17638.
12. FutureSearch: Wildman, J., Bosse, N. I., Hnyk, D., et al. (2025). [Bench to the Future: A Pastcasting Benchmark for Forecasting Agents](https://arxiv.org/abs/2506.21558). arXiv:2506.21558.
13. Zou, A., Xiao, T., Jia, R., et al. (2022). [Forecasting Future World Events with Neural Networks](https://arxiv.org/abs/2206.15474). arXiv:2206.15474.
