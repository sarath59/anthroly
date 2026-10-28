---
title: "Which Agent Trajectories Should You Fine-Tune On? Outcome Filtering, Step Masking, and What Failed Runs Are Worth"
description: "Keeping only the trajectories that pass the tests is the default for agent SFT, but 2026 results show it is a weak filter. Here is what SRFT, SWE-Prime, TQS, MetaCurate, SWE-smith and SWE-Gym show about step-level loss masking, process-quality scoring, salvaging failed runs, judge costs and the failure modes of trajectory curation, plus a practical selection pipeline."
tags:
  - agents
  - trajectory-data
  - supervised-fine-tuning
  - data-curation
  - swe-agents
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-28T04:30:00.000Z'
updatedAt: '2026-10-28T04:30:00.000Z'
faq:
  - question: "Should you only fine-tune agents on successful trajectories?"
    answer: "Success-only filtering (rejection-sampling fine-tuning) is a reasonable default, but it is a weak filter on its own. Successful trajectories can contain redundant, broken or risky steps, and failed trajectories often contain mostly useful steps. In MetaCurate (Kim et al., 2026), all attempts for the same issue had the same outcome on 90.1% of issues, so the outcome label could not separate them, and an SFT-suitability judge preferred the failed trajectory in 28.3% of audited mixed-outcome pairs. Combining outcome filtering with process-quality scoring and step-level loss masking works better in the reported experiments."
  - question: "What is step-level loss masking for agent SFT?"
    answer: "You keep the full trajectory in the context window but set the training loss to zero on the steps you do not want the model to imitate. Step Rejection Fine-Tuning (Slinko et al., 2026) used an LLM critic to mark harmful steps in unresolved SWE-agent trajectories and masked only those. On SWE-bench Verified with Qwen2.5-Coder-32B-Instruct, it reached 32.2% resolved versus 30.9% for success-only rejection fine-tuning and 28.5% for naive distillation on all trajectories, averaged over seven runs."
  - question: "Can you learn anything from failed agent trajectories?"
    answer: "Yes, if you stop the model from imitating the mistakes. Four approaches have evidence behind them: mask the loss on erroneous steps while keeping them as context (SRFT), condition training on whether the trajectory succeeded (negative-aware training, Wang et al., 2024), pair failed and successful trajectories for preference optimization (ETO, Song et al., 2024), and relabel a failed trajectory with the task it actually accomplished (hindsight-style methods such as Learn-by-interact). Naively mixing failed trajectories into SFT hurts: SRFT measured a drop from 30.9% to 28.5%."
  - question: "Is less trajectory data better for agent fine-tuning?"
    answer: "Sometimes. SWE-Prime (Zheng et al., 2026) trained on a 10% subset of 32,161 resolved trajectories and beat training on all of them across three base models, by up to 24.2% relative on SWE-Bench Verified. But the effect depends on scale: Han (2026) found that at 500 to 1,000 trajectories, adding more data mattered far more than quality ranking, and the quality gap only became significant at 2,000. Curation matters most once you have more successful data than you can usefully train on."
  - question: "How much does it cost to score agent trajectories with an LLM judge?"
    answer: "It varies by pool size and model. The TQS paper (Li et al., 2026) estimated about $2,750 to score 38,382 trajectories with a GPT-4o rubric judge and about $18.6K for 258,134, while its structural scorer processed the full corpus in about 49 minutes on four CPU workers. SRFT spent $660 having Claude 4 Sonnet critique 5,000 trajectories step by step. The GPT-4o judge still selected the best subset in the TQS comparison (28.4 vs 27.6 pass@1), so cheap structural filters and LLM judges are complements, not substitutes."
  - question: "How does Anthroly help with agent trajectory data?"
    answer: "Anthroly provides expert-built agent trajectories, step-level annotations and audit sets for frontier AI labs: domain experts label which steps are productive, harmful or redundant, calibrate the critics and judges that score trajectories at scale, and write the tasks and verifiers that produce the trajectories in the first place. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**The standard recipe for distilling an agent is simple: run a strong teacher on many tasks, keep the trajectories whose final answer passes the check, and fine-tune a student on them. That recipe, rejection-sampling fine-tuning, produced most of the open agent results of 2024 and 2025. It also throws away most of the data and keeps a lot of noise. A cluster of 2026 papers on software-engineering agents measured both problems directly. Passing trajectories turn out to contain broken tool calls, repeated commands, leaked answers and sprawling patches that the student learns to copy. Failing trajectories turn out to be mostly sound work with a few bad steps. This post covers what those papers show about which trajectories, and which parts of trajectories, deserve gradient, how much the curation actually buys you, what it costs, and where it goes wrong.**

## The short answer

Outcome filtering is necessary but not sufficient. In practice, four changes beat success-only SFT in controlled experiments: **(1)** score successful trajectories on process quality, not just outcome, using cheap structural signals (tool-call success, repeated actions, observe-edit-verify order, patch scope, leakage checks) and, where budget allows, a calibrated LLM judge; **(2)** mask the loss on bad steps instead of discarding or keeping whole trajectories, keeping those steps as context; **(3)** salvage failed trajectories with step masking rather than discarding them or mixing them in naively; and **(4)** enforce coverage by capping trajectories per task and selecting within clusters of similar tasks. The gains are real but usually a few points, and they depend on scale. With fewer than about a thousand successful trajectories, more data tends to matter more than better ranking.

This post is about selecting and weighting trajectories you already have. For how trajectories are collected in the first place, see [how do you collect training data for computer-use agents?](/blog/how-to-collect-computer-use-agent-trajectory-data). For where step-level rewards come from in RL, see [where should step-level rewards for AI agents come from?](/blog/step-level-rewards-for-ai-agents).

## Why is outcome filtering the default?

Because it is cheap and it is hard to argue with. If the environment has a checker, you get a binary label for free, and you avoid teaching the student to finish with a wrong answer. The early open agent work used it everywhere:

- **AgentTuning** (Zeng et al., 2023) built AgentInstruct from 1,866 trajectories, keeping, for every task except Mind2Web, only those with a final reward of $r = 1$.
- **FireAct** (Chen et al., 2023) fine-tuned Llama-2-7B on 500 GPT-4 trajectories for search-augmented QA and reported a 77% increase in HotpotQA performance.
- **SWE-Gym** (Pan et al., 2024) fine-tuned Qwen2.5-Coder on 491 successful trajectories obtained by rejection sampling from GPT-4o and Claude 3.5 Sonnet. Each averaged roughly 19 turns and 19,000 tokens.
- **SWE-smith** (Yang et al., 2025) attempted 8,686 task instances 17,906 times, kept the 36% of attempts that resolved, and trained on the resulting 5,016 trajectories.

Two things stand out in that list. First, the yield is low on hard tasks: SWE-smith discarded about two thirds of its expensive teacher runs. Second, even these "success-only" pipelines already did more than outcome filtering. SWE-smith capped each task instance at three trajectories because tasks solved repeatedly across runs, the easy ones, degraded the student. SWE-Gym introduced per-instance capping for the same reason. Curation beyond pass/fail has been in the recipe from the start. It just was not studied carefully until recently.

## Why is the outcome label a weak signal of training value?

Because a trajectory is a long sequence of decisions and the label describes only the last one. Three measurements make this concrete.

**Outcome labels often cannot tell attempts apart.** MetaCurate (Kim et al., 2026) collected trajectories for 1,415 SWE issues and found that every attempt on an issue received the same outcome on 1,275 of them, or 90.1%. For those issues, pass/fail gives you no basis for choosing which trajectory to train on. Among audited pairs that did differ in outcome, an LLM judge asked about SFT suitability preferred the *failed* trajectory 28.3% of the time.

**Failed trajectories are mostly good steps.** Step Rejection Fine-Tuning (SRFT; Slinko et al., 2026) had a critic label each step of 5,000 resolved and 5,000 unresolved SWE-smith trajectories as good, unnecessary or harmful. A manual analysis of 20 unresolved trajectories had found at most 24% of steps were mistakes, and the critic's labels were consistent with that:

| Step label | Resolved trajectories | Unresolved trajectories |
|---|---|---|
| Productive (good or unnecessary) | 95.9% | 93.0% |
| Harmful | 4.1% | 7.1% |

The critic was never shown the resolution status. Unresolved trajectories had more harmful steps, as you would expect, but the difference is a few percentage points, not the difference between good and bad data. And resolved trajectories are not clean either: about one step in 25 was judged harmful.

**Passing trajectories teach bad habits.** SWE-Prime (Zheng et al., 2026) and the Trajectory Quality Score paper (TQS; Li et al., 2026) both catalogue what successful coding trajectories contain: repeated identical tool calls, failed commands, inspecting the same files over and over, edits made before reading the code, unverified final patches, and patches far broader than the fix requires. SWE-Prime also checks for "Git hacking", where the agent uses repository history to find the reference fix before editing. A trajectory like that passes the tests while teaching the student to cheat.

## What does the evidence say about selection methods?

These papers use different pools, base models, scaffolds and evaluation settings, so their absolute numbers are not comparable with each other. The useful comparisons are within each paper.

| Paper | Trajectory pool | What changed | Result on SWE-bench Verified (within-paper) |
|---|---|---|---|
| SRFT (Slinko et al., 2026) | 5K resolved + 5K unresolved SWE-smith trajectories; Qwen2.5-Coder-32B student | Critic labels harmful steps; mask them | Naive all-data 28.5%, success-only 30.9%, step-masked 32.2% (7 runs each) |
| SWE-Prime (Zheng et al., 2026) | 32,161 resolved Nebius SWE-rebench OpenHands trajectories | Keep top 10% by process quality, then mask low-value segments | GLM-4.7-Flash: all resolved 41.4%, random 10% 39.6%, SWE-Prime 51.4% |
| TQS (Li et al., 2026) | 1,024-trajectory subsets of the CoderForge-Preview corpus; Qwen3-Coder-30B-A3B with LoRA | Rank by structural score, no LLM | Base 24.4, random 24.8, bottom-ranked 21.8, TQS top 27.6, GPT-4o judge 28.4 |
| MetaCurate (Kim et al., 2026) | 4,286 DeepSeek V4 Pro trajectories; Qwen 3.5 9B student, 1,000-trajectory budget | Filter rules evolved against pairwise judge preferences | Random 61.7, success-only 61.9, hand-written rules 63.1, evolved filter 64.0 |

A few patterns hold across all four.

**Selection beats volume once you have enough data.** SWE-Prime's 10% subset beat the full resolved set on every model and benchmark it tried, by up to 24.2% relative on SWE-Bench Verified and 12.2% on SWE-Bench Pro. Its retention sweep peaked at 10% (50.2% resolved for Qwen3-Coder-30B-A3B, before segment masking) and declined slightly at 20% and 30%. On MetaCurate's smaller pool, the 1,000 selected trajectories matched training on all 4,286 (64.0% vs 63.1%).

**Step-level masking adds to trajectory-level selection.** SWE-Prime's ablation without segment masking scored 43.6% versus 51.4% for GLM-4.7-Flash, 34.6% versus 39.6% for Qwen3-30B-A3B, and 50.2% versus 53.2% for Qwen3-Coder-30B-A3B. Choosing good trajectories does not remove the bad steps inside them.

**The bottom of the distribution actively hurts.** TQS's bottom-ranked subset scored 21.8, below the untuned base model's 24.4. Random selection improved on the base by only 0.4 points. Same outcome label, same budget, a 5.8-point spread between the TQS top and bottom subsets.

**Gains concentrate on hard tasks.** TQS's advantage over random grew from 1.6 points on easy SWE-bench Verified tasks to 3.4 on medium and 4.5 on hard. Generic successful supervision seems to be enough for easy problems.

## Is outcome filtering even better than random?

This is the contrarian finding worth sitting with. On MetaCurate's DeepSeek V4 Pro pool, keeping only resolved trajectories scored 61.9% against 61.7% for random selection, a difference well inside the reported standard deviations of 0.7 to 1.6 points. On its Nemotron v3 pool, success-only did better than random (54.4% vs 52.9%) but barely beat the untuned base model (53.9%). In SWE-Prime, a random 10% subset of already-resolved trajectories scored below the base model on two of three models.

None of this means outcome labels are useless. It means that once a pool is mostly competent teacher output, outcome filtering removes relatively little harm, and the variance that matters lives inside trajectories. It also means you need proper measurement to see any of it. SRFT ran every configuration seven times and reported a bootstrap 95% confidence interval of [0.4, 2.3] points for its 1.3-point gain over success-only filtering. MetaCurate reported three evaluations per checkpoint. A single SWE-bench run per arm is not enough to tell curation methods apart; see [how many eval items do you need?](/blog/how-many-eval-items-do-you-need) for the arithmetic.

## How do you train on part of a trajectory?

The mechanism shared by SRFT and SWE-Prime is the same one every agent trainer already uses to mask environment observations. Write a trajectory as $\tau_i = (s, u_i, (a_{i,0}, o_{i,0}), \dots, (a_{i,T_i}, o_{i,T_i}))$: a system prompt, a task, then alternating assistant actions and observations. Assign each action a weight $w_{i,t}$ and train with

$$
\mathcal{L}(\theta) = -\frac{1}{N} \sum_{i} \sum_{t=0}^{T_i} w_{i,t} \sum_{j=1}^{|a_{i,t}|} \log p_\theta\left(a_{i,t,j} \mid \tau_{i,<t},\, a_{i,t,<j}\right)
$$

where $\tau_{i,<t}$ is everything before step $t$, including the masked steps, and $N$ is the number of tokens with nonzero weight. Observations always get weight zero. Success-only RFT sets every $w_{i,t}$ to 1 for passing trajectories and drops failing ones. SRFT keeps both and sets $w_{i,t} = 0$ only on steps a critic marks harmful. SWE-Prime groups consecutive steps into semantic segments, scores each from 0 to 10 for contribution to the fix, learnability and risk, and sets $w = 1$ only above a threshold (7 worked best in its sweep).

The important detail is that masked steps stay in the context. The student still sees the mistake and the observation that followed, so it learns what recovery looks like, but it never receives gradient toward making the mistake. Deleting bad steps instead would produce trajectories that never happened, with observations that no longer follow from the actions.

Implementation is a few lines in any trainer that already builds a per-token loss mask:

```python
def build_loss_mask(steps, step_keep):
    """steps: list of (role, token_ids); step_keep: dict step_idx -> bool for assistant steps."""
    input_ids, loss_mask = [], []
    assistant_idx = 0
    for role, toks in steps:
        input_ids.extend(toks)
        if role == "assistant":
            keep = step_keep.get(assistant_idx, True)
            loss_mask.extend([1 if keep else 0] * len(toks))
            assistant_idx += 1
        else:  # system, user, tool observations: context only
            loss_mask.extend([0] * len(toks))
    return input_ids, loss_mask
```

## What should you do with failed trajectories?

There are four approaches with published evidence, and one that reliably hurts.

| Approach | What it does | Evidence | Main risk |
|---|---|---|---|
| Discard (RFT) | Train only on passing runs | Standard baseline everywhere | Wastes most hard-task data; keeps errors inside passing runs |
| Mix in naively | Train on all runs as if correct | SRFT: 28.5% vs 30.9% for success-only | Student imitates errors |
| Step masking (SRFT) | Keep the run as context, zero loss on harmful steps | SRFT: 32.2% vs 30.9% | Critic mistakes mask good steps or leak bad ones |
| Outcome conditioning (NAT) | Append "correctly" or "incorrectly" to the prompt during training, condition on correct at inference | Wang et al. (2024) report gains on math and QA agent tasks over positive-only training | Model still learns the failure distribution; prompt dependence |
| Contrastive pairs (ETO) | Pair failed and successful runs and train with DPO | Song et al. (2024) report consistent gains over SFT on web shopping, science and household tasks | Needs comparable pairs; off-policy preference noise |
| Hindsight relabeling | Rewrite the task to match what the failed run actually achieved | Learn-by-interact (Su et al., 2025) and related work | Relabeled tasks can drift from the real task distribution |

For coding and tool-use agents where the main cost is teacher compute, step masking is the most practical: it slots into an existing SFT pipeline, needs no new objective, and recovers data you have already paid for. SRFT's critic pass cost $660 for 5,000 trajectories with Claude 4 Sonnet, which is small next to the teacher rollouts it salvages.

One caution: salvaging failed runs is not the same as self-improvement. SWE-Gym fine-tuned its 32B model on its own 868 successful on-policy trajectories mixed with the 491 teacher trajectories, and SWE-Bench Lite resolution fell from 15.3% to 8.7%. The quality of the source policy still matters.

## Which process-quality signals actually predict training value?

The 2026 papers converge on a small set of signals you can compute from logs. They fall into three cost tiers.

**Free structural checks.** These need no model at all.

- *Tool-call success rate.* SWE-Prime scores each trajectory by the percentile of its tool-call success within the pool.
- *Adjacent repetition.* SWE-Prime sets a trajectory's redundancy score to zero if any two adjacent tool calls have identical names and arguments.
- *Error-retry rate.* Han (2026) found it was the dominant component of a quality score for LoRA fine-tuning of a 7B coding agent: on its held-out loss proxy, error-retry alone performed within 0.2% of the full composite score.
- *Observe-edit-verify order.* Did the agent inspect the repository before its first edit and run a test or check after its last?
- *Patch scope.* SWE-Prime compares edited files and changed lines against the reference patch, $S_{\text{file}} = \min(F_{\text{gold}}/F_{\text{model}}, 1)$ and $S_{\text{line}} = \min(L_{\text{gold}}/L_{\text{model}}, 1)$, and multiplies them, penalizing over-editing.
- *Leakage.* Does the agent read Git history that reveals the reference fix before editing?

**Structural scores with more sophistication.** TQS combines information focus, intent-action alignment and policy dynamics into one score in linear time. Its ablation is instructive: removing intent-action alignment, whether the agent's stated reasoning is reflected in its next actions, dropped pass@1 from 27.6 to 23.0, below both random selection and the untuned base model. Across 413,278 scoring records, resolved rate rose monotonically from 54.1% in the lowest TQS decile to 86.9% in the highest, even though the outcome label was not part of the score.

**LLM judges and critics.** These are slower and costlier, but they see semantics. In TQS's comparison, a GPT-4o rubric judge selected the best subset (28.4 vs 27.6 for TQS), at an estimated $2,750 for 38,382 trajectories against about 49 minutes of CPU time for TQS on the full 258,134-trajectory corpus. MetaCurate's approach splits the difference: a strong model evolves an executable filter (rules, rubric and aggregation) against pairwise judge preferences, then the filter scores the whole pool cheaply. On its DeepSeek V4 Pro pool, the filter evolved from a blank start scored 64.0%, ahead of the same search started from a hand-written six-criterion filter (63.3%), a hand-authored rule filter (63.1%), and a training-in-the-loop baseline (62.7%) whose search cost 3.5 times as much.

The practical design that follows is a cascade: cheap structural filters over everything, an LLM judge or critic on the survivors, and step-level labels only where you will actually train.

## What goes wrong with trajectory curation?

**Selecting a single behavior.** The TQS authors found one candidate signal that passed all their numerical validity checks but, once included, concentrated 99.9% of the top-1,024 subset on a single binary behavior pattern. Pairwise concordance with judges could not see this. They added behavioral diversity as an explicit admission criterion. Any scorer you optimize will find a narrow mode if you let it.

**Over-representing easy tasks.** Repeatedly solved tasks dominate successful pools. SWE-smith capped each task at three trajectories, and SWE-Gym showed sampling success is "naturally biased toward easy tasks." SWE-Prime selects within HDBSCAN clusters of issue embeddings for the same reason. Rank globally and your subset will be the easiest tenth of the task distribution.

**Confusing short with good.** Shorter trajectories score well on most efficiency signals. TQS tested this directly: selecting the shortest trajectories scored 24.2, below random, while a length-matched version of its top subset kept most of the gain (27.0). Length correlates with quality but is not quality.

**Trusting difficulty as a proxy.** SWE-smith built SFT sets of 500 trajectories at four difficulty levels and got 12.4%, 10.8%, 13.6% and 12.2% on SWE-bench Verified, with no clear trend. Harder tasks are not automatically better training data.

**Judge position bias.** MetaCurate found that when two trajectories are close in rank, swapping presentation order often flips the judge's preference. It judges each pair in both orders and keeps only consistent preferences. Do the same.

**Uncalibrated critics.** SRFT's limitations section is blunt: mislabeling good steps as harmful shrinks the data, and missing subtle errors lets them through to the student. Its critic prompt was selected using expert-labeled trajectories. That calibration step is where most of the method's reliability comes from, and it is the step most often skipped.

**Leakage that passes the tests.** Git-history shortcuts, hard-coded outputs and test edits all produce passing trajectories. If your environment allows them, your success-only data contains them, and your student will learn them. Check for them explicitly; see [how do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl) and [how reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers) for the verifier side of the same problem.

## A practical selection pipeline

For a team distilling a coding or tool-use agent from a strong teacher, the evidence supports something like this:

1. **Collect broadly.** Sample several trajectories per task across a diverse task pool. Keep the failures; they are inputs, not waste.
2. **Run the free checks on everything.** Tool-call success, adjacent repetition, error-retry rate, observe-edit-verify order, patch scope against reference, and leakage. Drop trajectories that leak answers outright.
3. **Cap and cluster.** Limit trajectories per task (two or three is typical in the published work) and select within clusters of similar tasks rather than globally.
4. **Score survivors with a calibrated judge.** Build a small gold set of expert-labeled trajectories, measure the judge's agreement with it, judge pairs in both orders, and only then score at scale. Evolving the filter against judge preferences, as MetaCurate does, is worth it for large pools.
5. **Label steps where you will train.** Run a step or segment critic on selected successful trajectories and on salvageable failures. Mask harmful steps, keep them as context.
6. **Choose the budget empirically.** Sweep retention (5%, 10%, 20%, 30% in SWE-Prime) and evaluate with repeated runs. If your pool is under a few thousand successful trajectories, expect volume to beat ranking.
7. **Audit the selected set.** Check task and behavior diversity, length distribution and difficulty mix before you train, so the subset has not collapsed onto one mode.

## Where do human experts fit?

Not in labeling every step. The point of the 2026 methods is that structural signals and LLM critics scale to hundreds of thousands of trajectories at low cost. Experts belong at the points of leverage: writing the gold sets that calibrate critics and judges, defining what counts as a harmful versus unnecessary step in a given domain, auditing what the filter selected, and designing the tasks and verifiers so that passing means what you think it means. SRFT's critic was chosen using expert labels; MetaCurate's search is only as good as the judge it optimizes against. A few hundred carefully labeled trajectories decide whether the other hundred thousand are curated or merely sorted.

## How Anthroly can help

Anthroly builds the expert layer of agent data pipelines for frontier AI labs: step-level annotations of productive, redundant and harmful actions, gold sets for calibrating trajectory critics and judges, audits of curated SFT subsets, expert-written demonstration trajectories in specialized domains, and the tasks and verifiers that make outcome labels trustworthy in the first place. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are distilling an agent and want to know how much of your trajectory data is actually teaching the right behavior, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can work through your pool together.

## Related reading

- [Agent trajectory data, explained](/learn/agent-trajectory-data)
- [How do you collect training data for computer-use agents?](/blog/how-to-collect-computer-use-agent-trajectory-data)
- [How are software-engineering RL environments built?](/blog/how-software-engineering-rl-environments-are-built)
- [Where should step-level rewards for AI agents come from?](/blog/step-level-rewards-for-ai-agents)
- [How much data do you need to fine-tune a reasoning model?](/blog/how-much-data-to-fine-tune-a-reasoning-model)
- [How do you quality-control expert data labeling?](/blog/how-to-quality-control-expert-data-labeling)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [Glossary: Agent trajectory](/research/glossary#agent-trajectory)

---

## References

1. Slinko, I., Zavidnyi, I., Bogomolov, E., Zharov, Y. (2026). [Step Rejection Fine-Tuning: A Practical Distillation Recipe](https://arxiv.org/abs/2605.10674). arXiv:2605.10674.
2. Zheng, D., et al. (2026). [SWE-Prime: Fewer Trajectories, Better Performance](https://arxiv.org/abs/2608.27449). arXiv:2608.27449.
3. Li, S., et al. (2026). [Quality, Not Just Outcome: A Structural Scoring Framework for Selecting Coding-Agent Trajectories for Supervised Fine-Tuning](https://arxiv.org/abs/2610.13152). arXiv:2610.13152.
4. Kim, D., et al. (2026). [MetaCurate: Evolving Curation Filters for High-Quality Agentic Coding Data](https://arxiv.org/abs/2610.23134). arXiv:2610.23134.
5. Han, Y. (2026). [A Systematic Evaluation of Trajectory Data Curation for LoRA Fine-Tuning of Code Agents](https://arxiv.org/abs/2607.17205). arXiv:2607.17205.
6. Yang, J., et al. (2025). [SWE-smith: Scaling Data for Software Engineering Agents](https://arxiv.org/abs/2504.21798). arXiv:2504.21798.
7. Pan, J., et al. (2024). [Training Software Engineering Agents and Verifiers with SWE-Gym](https://arxiv.org/abs/2412.21139). arXiv:2412.21139.
8. Zeng, A., et al. (2023). [AgentTuning: Enabling Generalized Agent Abilities for LLMs](https://arxiv.org/abs/2310.12823). arXiv:2310.12823.
9. Chen, B., et al. (2023). [FireAct: Toward Language Agent Fine-tuning](https://arxiv.org/abs/2310.05915). arXiv:2310.05915.
10. Wang, R., Li, H., Han, X., Zhang, Y., Baldwin, T. (2024). [Learning From Failure: Integrating Negative Examples when Fine-tuning Large Language Models as Agents](https://arxiv.org/abs/2402.11651). arXiv:2402.11651.
11. Song, Y., et al. (2024). [Trial and Error: Exploration-Based Trajectory Optimization for LLM Agents](https://arxiv.org/abs/2403.02502). arXiv:2403.02502.
12. Su, H., et al. (2025). [Learn-by-interact: A Data-Centric Framework for Self-Adaptive Agents in Realistic Environments](https://arxiv.org/abs/2501.10893). arXiv:2501.10893.
