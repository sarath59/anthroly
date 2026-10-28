---
title: "Can Reinforcement Learning Reduce LLM Hallucinations? Abstention Rewards, Calibration, and the Hallucination Tax"
description: "Binary correctness rewards teach models to guess. Here is what Why Language Models Hallucinate, TruthRL, RLCR, the hallucination tax of reinforcement finetuning, and Learning to Reason for Factuality show about rewarding abstention and calibrated confidence, the math behind confidence targets, how these rewards get hacked, and how to build a training set that teaches a model when not to answer."
tags:
  - hallucination
  - reinforcement-learning
  - reward-design
  - calibration
  - rlvr
  - evals
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-28T12:40:00.000Z'
updatedAt: '2026-10-28T12:40:00.000Z'
faq:
  - question: "Why do language models hallucinate?"
    answer: "Kalai, Nachum, Vempala and Zhang (2025) argue that two pressures combine. Pretraining produces errors on facts that cannot be learned from the data, such as facts that appear only once, as a natural consequence of statistical prediction. Post-training and evaluation then keep those errors alive because most benchmarks use binary grading, where a guess can score and an honest \"I don't know\" never does. A model optimized to score well on such tests learns to guess when uncertain."
  - question: "Does RL training make hallucination worse?"
    answer: "It can. Song, Shi and Zhao (2025) call it the hallucination tax: standard reinforcement finetuning on math reduced refusal rates on unanswerable problems by more than 80% in their experiments; for Qwen2.5-7B-Instruct on the UMWP benchmark refusal fell from 0.30 to 0.08. Damani et al. (2025) also report that ordinary RL with binary correctness rewards hurts calibration. The cause is the reward: if abstaining and being wrong both score zero, the policy gains nothing by abstaining."
  - question: "What reward reduces hallucination in RL?"
    answer: "A reward that separates three outcomes: correct, abstained, and wrong. TruthRL (Wei et al., 2025) uses +1 for correct, 0 for abstention and -1 for incorrect with GRPO, and reports hallucination falling from 43.5% to 19.4% in one setting. A confidence-target version (Kalai et al., 2025) gives +1 for correct, 0 for \"I don't know\" and a penalty of t/(1-t) for errors, which makes answering worthwhile only when the model is more than t confident. RLCR (Damani et al., 2025) instead adds a Brier-score term on a stated confidence."
  - question: "Can you train a model to say \"I don't know\"?"
    answer: "Yes, if the training data contains questions the model genuinely cannot answer and the reward does not punish abstaining. R-Tuning (Zhang et al., 2023) built refusal-aware SFT data from the gap between what the model knows and the labels; the hallucination-tax paper restored refusal by mixing about 10% unanswerable math problems into RL; TruthRL labeled a question out-of-knowledge when none of the model's sampled answers were correct. The hard part is making sure the unanswerable items really are unanswerable."
  - question: "How do you stop a model from abstaining on everything?"
    answer: "Make the abstention reward strictly lower than a correct answer, keep plenty of answerable questions the model can solve, and track accuracy, abstention and error rates separately during training. In TruthRL, swapping the LLM-based verifier for a rule-based string matcher made the model collapse into abstaining on the vast majority of queries, because correct answers were often misgraded as wrong. Verifier quality decides where the policy settles."
  - question: "How do you measure hallucination for long-form answers?"
    answer: "Break the answer into claims and check each one, as FActScore, SAFE and VeriScore do. Wei et al. (2024) report SAFE agreed with crowdsourced annotators on 72% of about 16,000 facts and won 76% of 100 sampled disagreements at more than 20 times lower cost. But precision alone is hackable: Chen et al. (2025) found that using a factuality score directly as an RL reward made answers shorter, less detailed or off-topic, and added detail and relevance terms to fix it."
  - question: "How does Anthroly help with hallucination and abstention training?"
    answer: "Anthroly builds expert-verified answerable and unanswerable question sets, gold labels for abstention and claim-level factuality judges, confidence-target eval suites, and audits of RL runs for over-abstention and verifier errors. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Ask a model trained with reinforcement learning a question it cannot answer and it will usually answer anyway. That is not a mystery or a quirk of a particular architecture. It is what the reward told it to do. Almost every RL-with-verifiable-rewards recipe scores an output 1 if it is correct and 0 otherwise, and under that rule a confident guess never scores worse than an honest "I don't know." A 2025 line of work, from OpenAI's analysis of why language models hallucinate to Meta's TruthRL and MIT's calibration rewards, shows that changing the reward, and the data the reward is applied to, measurably reduces hallucination without giving up accuracy. This post walks through what those papers found, the math that makes abstention rational, the ways these rewards get gamed, and what it takes to build a training set that teaches a model when not to answer.**

## The short answer

Yes, RL can reduce hallucination, but only if the reward distinguishes three outcomes instead of two: correct, abstained, and wrong. With binary rewards, RL tends to make hallucination worse; the hallucination-tax paper measured refusal on unanswerable math falling by more than 80% after standard reinforcement finetuning. With a ternary reward (+1, 0, -1), TruthRL cut hallucination from 43.5% to 19.4% in one reported setting while improving accuracy. With a calibration reward that adds a Brier score to correctness, RLCR improved calibration with no loss in accuracy. Three conditions decide whether it works in practice: the training set must include questions the model genuinely cannot answer, the verifier must reliably tell a correct answer from a wrong one and an abstention from both, and the evaluation must give abstention credit, or the gains will look like losses on the leaderboard.

## Why does binary grading reward guessing?

Kalai, Nachum, Vempala and Zhang (2025) make the argument in two parts. First, pretraining produces some errors inevitably. An earlier result by Kalai and Vempala (2023) showed that for "arbitrary" facts, whose truth cannot be inferred from patterns in the data, a calibrated language model must hallucinate at a rate close to the fraction of such facts that appear exactly once in training, a Good-Turing style estimate. Facts that appear many times, and systematic facts like arithmetic, carry no such statistical floor.

Second, and more important for post-training, the errors survive because of how models are graded. Their survey of influential benchmarks (GPQA, MMLU-Pro, IFEval, Omni-MATH, WildBench, BBH, MATH, MuSR, SWE-bench and HLE among them) found that the large majority use binary grading with no credit for "I don't know." A model that always guesses when unsure beats one that honestly abstains on such tests. The paper's proposed fix is socio-technical: change the scoring of the mainstream evaluations, not just add more hallucination benchmarks that nobody optimizes for.

RL inherits exactly this problem. A verifiable reward is a binary grader. If the policy samples "I don't know" and gets 0, and samples a guess that is right 20% of the time, the guess has higher expected reward and GRPO will push probability toward it.

## What do confidence targets look like mathematically?

Kalai et al. propose stating a confidence target in the instructions. Their example wording:

*"Answer only if you are > t confident, since mistakes are penalized t/(1 − t) points, while correct answers receive 1 point, and an answer of 'I don't know' receives 0 points."*

The penalty is chosen so that answering has positive expected value exactly when the model's probability of being correct exceeds the threshold. If the model believes its answer is correct with probability $p$, the expected score of answering is

$$
\mathbb{E}[\text{score} \mid \text{answer}] = p \cdot 1 - (1 - p)\,\frac{t}{1 - t},
$$

and abstaining scores 0. Answering beats abstaining when

$$
p - (1 - p)\frac{t}{1 - t} > 0 \iff p(1 - t) > (1 - p)\,t \iff p > t.
$$

The paper's natural settings are $t = 0.5$ (penalty 1), $t = 0.75$ (penalty 2) and $t = 0.9$ (penalty 9); $t = 0$ recovers binary grading. Two properties make this useful as an RL reward. It turns abstention into the optimal action for low-confidence questions instead of a sacrifice, and the threshold is a policy choice you state up front: a medical assistant and a brainstorming tool should not share one.

SimpleQA (Wei et al., 2024) already grades this way, with three outcomes per answer: correct, incorrect or not attempted. The design note in the paper says a model with ideal behavior gets as many questions right as possible while not attempting the ones it is not confident about.

## What reward designs have been tested?

| Method | Reward or training signal | Setting | Reported result |
|---|---|---|---|
| TruthRL (Wei et al., 2025) | GRPO with ternary reward: +1 correct, 0 abstain, -1 incorrect | Knowledge-intensive QA (CRAG, NQ, HotpotQA, MuSiQue), with and without retrieval | Hallucination 43.5% → 19.4% and truthfulness 5.3% → 37.2% in one setting; on CRAG with retrieval, Llama3.1-8B-Instruct hallucination fell 24.1 points and truthfulness rose 31.9 points over prompting |
| RLCR (Damani et al., 2025) | Correctness plus Brier score on a verbalized confidence: $\mathbf{1}[\text{correct}] - (q - \mathbf{1}[\text{correct}])^2$ | Reasoning QA, in-domain and out-of-domain | Calibration substantially improved with no loss in accuracy; ordinary RL hurt calibration |
| SUM mixing (Song, Shi & Zhao, 2025) | Standard RFT with about 10% synthetic unanswerable math problems, where abstaining is correct | Math reasoning, four models | Refusal on the SUM test rose from 0.01 to 0.73 (Qwen2.5-7B) and 0.00 to 0.75 (Llama-3.1-8B-Instruct) with minimal accuracy cost; gains transferred to factual QA |
| Learning to Reason for Factuality (Chen et al., 2025) | Online RL with factual precision + detail + relevance reward | Long-form factuality, six benchmarks | Average 23.1-point drop in hallucination rate, 23% more answer detail, no loss in helpfulness |
| R-Tuning (Zhang et al., 2023) | SFT on refusal-aware data built from the model's knowledge gaps | QA, in- and out-of-domain | Better answering of known questions and refusal of unknown ones; refusal generalized as a meta-skill |

TruthRL defines truthfulness as $w_1 \cdot \text{Acc} + w_2 \cdot \text{Unc} - w_3 \cdot \text{Hall}$ and reports results with $w_1 = 1, w_2 = 0, w_3 = 1$, so abstention earns nothing directly and only helps by avoiding errors. That is the right metric for training: it rewards knowing your boundary, not refusing.

## Why does a ternary reward work under GRPO?

GRPO computes each response's advantage relative to the mean reward of its group. TruthRL's explanation is worth spelling out because it shows why the zero matters. Take a group of two responses to a question the model cannot answer: $y_1$ says "I don't know," $y_2$ makes something up.

- Under binary reward, both score 0. Their advantages are equal and the gradient expresses no preference between honesty and fabrication.
- Under ternary reward, $y_1$ scores 0 and $y_2$ scores -1. $y_1$ has the higher advantage, so probability mass moves toward abstaining exactly where the model fails.

On questions the model can answer, a correct response (+1) still beats abstention (0), so the pressure to answer remains. The paper reports that abstention rose during training on questions the model could not answer and fell on questions where its sampled answers were consistently correct. It also tested a knowledge-enhanced variant that gives abstention +1 on questions judged out of the model's knowledge; the plain ternary reward generally did as well or better, which is convenient because it needs no per-question knowledge labels.

## Why use a Brier score and not log loss?

RLCR asks the model to output an answer and a numerical confidence $q \in [0, 1]$ after reasoning, and rewards

$$
R_{\text{RLCR}}(y, q, y^*) = \mathbf{1}_{y \equiv y^*} - \left(q - \mathbf{1}_{y \equiv y^*}\right)^2 .
$$

The paper proves two properties: for any answer, expected reward is maximized when the stated confidence equals the true probability of being correct, and among calibrated answers, the one most likely to be correct earns the most. The proof needs a bounded proper scoring rule. Log loss is proper but unbounded, and the authors note it does not incentivize correctness when combined with a correctness term this way. The practical takeaway for reward designers is general. When you combine an accuracy term with a calibration term, check that the calibration term cannot dominate the accuracy term on any output.

RLCR's verbalized confidence also has a test-time use: the paper shows confidence-weighted aggregation across samples improves both accuracy and calibration. A confidence the model can state honestly is something a downstream system can threshold, route on, or show to a user.

## How do these rewards get hacked?

Every one of the papers above reports a failure mode, and they are the same few patterns.

1. **Over-abstention when the verifier is noisy.** TruthRL's ablation replaced its LLM-based verifier with a rule-based string matcher. Correct answers phrased differently from the reference were scored as wrong (-1), so answering looked risky, and the model collapsed into abstaining on the vast majority of queries. Hallucination went to nearly zero and the truthfulness score went negative. A verifier's false-negative rate becomes a tax on answering.
2. **Saying less to be right more.** Chen et al. (2025) found that using a long-form factuality metric directly as an online RL reward produced shorter, less detailed answers, because it is easier to state one correct fact than fifty. Their reward combines factual precision, a detail term and a relevance check against a reference answer:

$$
R(y \mid x) = \frac{F}{T + 1} + \lambda \log(1 + F) + \mu \cdot \mathbf{1}(y \text{ at least as relevant as } y_{\text{ref}}),
$$

where $F$ is the number of supported claims and $T$ the total claims.

3. **Being right about the wrong thing.** The same paper describes a factual, detailed answer that ignored the question. Precision and detail can both be maxed by reciting a related encyclopedia article, which is why relevance needs its own term.
4. **Hedging instead of abstaining.** In long-form answers a model can wrap every claim in qualifiers. If the claim extractor drops hedged claims, they vanish from the precision denominator and hedging becomes free. Graders need an explicit rule for what a hedge counts as.
5. **Mismatched thresholds.** A policy trained against one implicit confidence threshold and evaluated against another will look either reckless or timid. If the reward is ternary with a -1 penalty, the implied threshold is $t = 0.5$; state it in the eval too.
6. **Slow verifiers.** Chen et al. report that VeriScore needs around two minutes to verify one response, too slow for an online RL loop, so they built a scalable version. Factuality rewards are a systems problem before they are a research one.

## How do you build a training set that teaches when not to answer?

The reward only works if the data contains real knowledge boundaries. Four ingredients come up across the literature.

- **Questions the model cannot answer from its parameters.** TruthRL samples several responses per training question and marks it out-of-knowledge if none are correct. This is cheap, but it confuses "hard to reason about" with "not known." Keep both kinds and label them differently if you can.
- **Questions nobody can answer.** SUM builds unanswerable math problems by removing or corrupting information so the problem is underdetermined. SelfAware and UMWP serve the same role for factual and math QA. These teach the model to reason about whether a question is well-posed, a different skill from knowing facts.
- **A realistic mix.** The hallucination-tax result came from about 10% unanswerable problems. Too few and the policy never learns the behavior; too many and abstention becomes the easy route to reward.
- **An abstention-aware verifier.** The grader has to classify three outcomes, including the many ways a model says it does not know, and it must not mark a correct but differently phrased answer as wrong. TruthRL's results held across several LLM judges; its rule-based ablation shows what happens when they don't.

The step that most teams underinvest in is checking that the unanswerable items are actually unanswerable. A synthetic generator that deletes a number from a word problem sometimes deletes a redundant number, leaving the problem solvable. If such an item is labeled "should abstain," the reward now punishes a correct answer, which is the over-abstention failure in miniature. In factual domains the problem is worse: whether a question has a single defensible answer is often a judgment that needs a specialist. A question about an evolving clinical guideline, a contested legal standard or a recently revised physical constant can be answerable, unanswerable, or answerable only with a date qualifier, depending on details a generator will not catch.

## A practical recipe

1. **Pick and state the threshold.** Decide what confidence $t$ the product needs and set the error penalty to $t/(1-t)$. Use the same number in training and in eval prompts.
2. **Build three pools.** Answerable questions the base model gets right on most samples, answerable questions it gets right on some samples, and questions with no supported answer. Have experts verify a sample of the third pool before training, and every item if the domain is high-stakes.
3. **Validate the verifier first.** Measure its false-negative rate on correct answers phrased differently from the reference, and its accuracy at classifying abstentions and hedges, against an expert-labeled gold set. If false negatives are high, fix them before training, or the policy will learn to refuse.
4. **Train with a ternary or calibration reward.** Start with the TruthRL-style +1/0/-1 reward; add a Brier term if you want usable verbalized confidence.
5. **Track four numbers, not one.** Accuracy, abstention rate, hallucination rate, and accuracy on the answerable-but-hard pool. A falling hallucination rate with falling accuracy on that pool means the model is learning to refuse, not to know its limits.
6. **Report abstention-aware scores.** Show SimpleQA-style correct, incorrect and not-attempted alongside the usual accuracy numbers, so the trade is visible to whoever reads the results.

## How Anthroly can help

Anthroly builds the expert layer that abstention and factuality training depends on: answerable and unanswerable question sets whose labels have been checked by specialists in the domain, gold sets for calibrating abstention classifiers and claim-level factuality judges, confidence-target evaluation suites, and audits of RL runs for over-abstention, hedging and verifier false negatives. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are tuning a reasoning model and want it to stop guessing without becoming useless, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can look at your reward and data together.

## Related reading

- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [Does RL with verifiable rewards teach new reasoning?](/blog/does-rlvr-teach-new-reasoning)
- [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [How are expert-written benchmarks built?](/blog/how-expert-written-benchmarks-are-built)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [Glossary: Verifier](/research/glossary#verifier)

---

## References

1. Kalai, A. T., Nachum, O., Vempala, S. S., Zhang, E. (2025). [Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664). arXiv:2509.04664.
2. Kalai, A. T., Vempala, S. S. (2023). [Calibrated Language Models Must Hallucinate](https://arxiv.org/abs/2311.14648). arXiv:2311.14648.
3. Wei, Z., et al. (2025). [TruthRL: Incentivizing Truthful LLMs via Reinforcement Learning](https://arxiv.org/abs/2509.25760). arXiv:2509.25760.
4. Damani, M., Puri, I., Slocum, S., Shenfeld, I., Choshen, L., Kim, Y., et al. (2025). [Beyond Binary Rewards: Training LMs to Reason About Their Uncertainty](https://arxiv.org/abs/2507.16806). arXiv:2507.16806.
5. Song, L., Shi, T., Zhao, J. (2025). [The Hallucination Tax of Reinforcement Finetuning](https://arxiv.org/abs/2505.13988). arXiv:2505.13988.
6. Chen, X., et al. (2025). [Learning to Reason for Factuality](https://arxiv.org/abs/2508.05618). arXiv:2508.05618.
7. Zhang, H., et al. (2023). [R-Tuning: Instructing Large Language Models to Say 'I Don't Know'](https://arxiv.org/abs/2311.09677). arXiv:2311.09677.
8. Wei, J., et al. (2024). [Measuring short-form factuality in large language models](https://arxiv.org/abs/2411.04368). arXiv:2411.04368.
9. Wei, J., et al. (2024). [Long-form factuality in large language models](https://arxiv.org/abs/2403.18802). arXiv:2403.18802.
