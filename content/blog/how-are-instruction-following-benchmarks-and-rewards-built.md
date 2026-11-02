---
title: "How Are Instruction-Following Benchmarks and Rewards Built? From IFEval and IFBench to Scoped Constraints, Agent Handbooks and Reward-Hacking Fixes"
description: "A practitioner's guide to how instruction-following evaluations and RLVR rewards are built: how IFEval, FollowBench, InFoBench, ComplexBench, Multi-IF and IFBench turn instructions into checkable constraints, why constraint rewards get hacked and overfit, how CALIF, LIFT, ScopeIF and scarcity-aware rewards repair them, and how Harness-IF, MTAC-IFBench and HANDBOOK.md move the problem into multi-turn agents."
tags:
  - instruction-following
  - rlvr
  - evals
  - verifiers
  - reward-hacking
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-02T12:45:00.000Z'
updatedAt: '2026-11-02T12:45:00.000Z'
faq:
  - question: "How are instruction-following benchmarks built?"
    answer: "Most attach checkable constraints to otherwise ordinary prompts. IFEval defines 25 types of verifiable instructions, such as writing more than 400 words or mentioning a keyword at least 3 times, and builds around 500 prompts that each contain one or more of them, so compliance is scored by code rather than by a judge. Later benchmarks add constraints that need a judge (FollowBench, InFoBench, ComplexBench), multiple turns and languages (Multi-IF), out-of-domain constraints (IFBench), or constraints scoped to parts of the output (IFHierBench, LIFT)."
  - question: "What is the difference between verifiable and judged instruction-following constraints?"
    answer: "A verifiable constraint can be checked by a program: a word count, a required keyword, a JSON format, a number of bullet points. A judged constraint needs a model or human to decide, for example whether a response keeps a formal tone or follows an example's style. InFoBench decomposes each instruction into yes/no questions (2,250 for 500 instructions) and reports a Decomposed Requirements Following Ratio; ComplexBench augments LLM evaluators with rules; VerIF combines rule-based code checks with a reasoning model for the parts code cannot verify."
  - question: "How is RLVR used to train instruction following?"
    answer: "Prompts are paired with constraints and verification functions, the policy samples responses, and the reward is the share or all-or-nothing satisfaction of those constraints. Tulu 3 introduced the RLVR recipe with precise instruction following as one of its targets; IFBench (Pyatkin et al., 2025) released 29 additional hand-annotated training constraints with verification functions and showed RLVR significantly improves precise instruction following; AutoIF generates instructions, checker code and unit tests for the checker automatically."
  - question: "Do instruction-following rewards get hacked?"
    answer: "Yes. Yoon et al. (2026) show frontier models can receive full credit on verifiable instruction-following benchmarks for responses with little substantive answer content, and that publicly released RLVR checkpoints gain constraint satisfaction while losing response quality. Their fix, CALIF, adds a calibrated likelihood bonus computed under the request alone with the frozen reference policy. LIFT reduces shallow hacking by pairing every constraint with a main writing task, and UNSPECIFIC shows that constraints copied from a reference document can be satisfied by copying."
  - question: "Do models generalize to instruction constraints they were not trained on?"
    answer: "Poorly, by default. The IFBench authors find most models strongly overfit to the small set of verifiable constraints used by existing benchmarks, so they built 58 new, diverse out-of-domain constraints to test generalization. WISE (2026) shows wording alone moves compliance: in a nine-model panel compliance was 54.9% for the original positive form of a constraint and 33.8% for an avoidance form, and under the most disruptive form 24.1% of strictly ordered model pairs reversed."
  - question: "How do you evaluate instruction following in agents?"
    answer: "By putting rules where agents actually read them and checking behavior from execution evidence. Harness-IF scores 256 rules from a 642-rule library across five instruction surfaces and introduces Against-Prior Accuracy, which only scores rules that oppose what a model would do unprompted. MTAC-IFBench averages 7.04 turns and 91.33 constraints per instance in agentic coding. HANDBOOK.md gives agents expert-written 20-124 page operating procedures and grades 824 programmatic criteria; the strongest evaluated model passes 36.2% of trials."
  - question: "How does Anthroly help build instruction-following data?"
    answer: "Anthroly's PhD experts and domain practitioners write natural multi-constraint prompts and policy documents, author and test verification functions, label judged constraints, audit RLVR outputs for constraint-satisfying but useless answers, and build wording and against-prior variants that test generalization. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Instruction following was the first place RLVR looked easy outside math. Write a function that counts words, checks for a keyword or parses JSON, and you have a reward that cannot be argued with. That ease is the problem. Programmatic constraints are a thin slice of what users mean by "follow my instructions", models learn the slice and not the skill, and a policy optimized against a word counter will happily produce 400 words of nothing. This post walks through how the main instruction-following benchmarks were built, how their constraints became training rewards, the failure modes those rewards created, and what a 2026-grade instruction-following environment needs.**

## The short answer

A credible instruction-following environment has five parts. **A task the model would want to do anyway**, so the constraints sit on top of real work rather than replacing it. **Constraints with a known verification route**: code where possible, decomposed judge questions where not, and a recorded scope (whole response, one section, one field, one turn). **A quality term** that stops the policy from satisfying constraints by abandoning the task. **Generalization probes**: held-out constraint families, reworded constraints, and rules that oppose the model's defaults, so a score measures following rather than coincidence. And for agents, **rules placed on the surfaces agents read** (system prompts, project files, tool descriptions, long policy documents) and checked from execution traces. IFEval and IFBench supply the first two; CALIF and LIFT the third; IFBench, WISE and Harness-IF the fourth; MTAC-IFBench, Harness-IF and HANDBOOK.md the fifth.

## How was IFEval built, and why did it win?

IFEval (Zhou et al., 2023) started from a complaint about the alternatives: human evaluation is expensive, slow and not reproducible, and LLM judges are biased or limited by the judge. Its answer was to restrict the problem to **verifiable instructions** such as "write in more than 400 words" or "mention the keyword AI at least 3 times". The authors identified 25 types of such instructions and constructed around 500 prompts, each containing one or more of them, and released the checkers with the data.

The design choice that made IFEval the default is that grading is a function call. It reports whether every instruction in a prompt was satisfied (prompt level) and what share of individual instructions were satisfied (instruction level), plus a "loose" variant that tolerates superficial formatting differences. Anyone can rerun it and get the same number.

The cost is coverage. Twenty-five families of formatting, length, keyword and casing rules are a small and peculiar subset of what users ask for. Everything that followed is an attempt to widen that subset without losing the function-call grading.

## How do benchmarks evaluate constraints code cannot check?

Three benchmarks from 2023-2024 define the main strategies for judged constraints.

| Benchmark | How instructions are built | How compliance is checked | Distinctive idea |
|---|---|---|---|
| IFEval (Zhou et al., 2023) | ~500 prompts with 25 types of verifiable instructions | Python checkers | Restrict to what code can verify |
| FollowBench (Jiang et al., 2023) | Five constraint types (Content, Situation, Style, Format, Example), one constraint added per level | Strong LLM judge prompted with the constraint-evolution path | Difficulty as number of stacked constraints |
| InFoBench (Qin et al., 2024) | 500 instructions decomposed into 2,250 yes/no questions | Decomposed Requirements Following Ratio (DRFR); human experts, crowd and GPT-4 compared as annotators | Turn one fuzzy judgment into many crisp ones |
| ComplexBench (Wen et al., 2024) | Hand-collected; taxonomy of 4 constraint types, 19 dimensions, 4 composition types | LLM evaluators augmented with rules; score follows the composition's dependency structure | Composition (and, chain, branch) as the hard part |
| Multi-IF (He et al., 2024) | IFEval extended to three turns and 7 more languages; 4,501 conversations | IFEval-style checkers per turn | Accuracy decays with turns and in non-Latin scripts |
| IFBench (Pyatkin et al., 2025) | 58 new out-of-domain verifiable constraints | Verification functions | Tests generalization beyond IFEval's families |

FollowBench's **multi-level** construction is worth stealing for any constraint dataset: start from a base instruction, add one constraint per level, and you get a difficulty axis for free, plus a clean curve of where each model breaks. InFoBench's **decomposition** is the other durable idea: an instruction like "write a product description for a hiking boot, under 120 words, mention waterproofing, avoid superlatives, end with a question" becomes five independent yes/no checks, each of which a judge (or a person) can answer reliably even when the overall instruction is fuzzy. InFoBench reports that DRFR is more reliable than traditional scoring and that GPT-4 is a cost-efficient annotator for these decomposed questions.

ComplexBench adds the piece both miss: constraints interact. "If the user is a beginner, avoid jargon; otherwise include formulas" is not two constraints, it is a branch, and scoring it as two independent checks gives credit for satisfying the wrong arm. ComplexBench's score follows the dependency structure determined by the composition type.

Multi-IF showed how quickly the easy version stops being easy. Extending IFEval to three turns and eight languages, every one of 14 evaluated models failed more often with each additional turn; o1-preview's average accuracy fell from 0.877 at the first turn to 0.707 at the third, and Hindi, Russian and Chinese had higher error rates than languages written in Latin script.

## How did constraints become RL rewards?

Once compliance is a function call, it is a reward. Three lines of work turned benchmarks into training environments.

**RLVR with hand-written verifiers.** The Tulu 3 report (Lambert et al., 2024) introduced Reinforcement Learning with Verifiable Rewards as part of an open post-training recipe, with precise instruction following among its targets. Pyatkin et al. (2025) then asked the uncomfortable question: does training on IFEval-like constraints teach instruction following, or IFEval? They found most models strongly overfit to the small set of verifiable constraints used by existing benchmarks, built IFBench's 58 out-of-domain constraints to measure generalization, and released 29 additional hand-annotated training constraints and verification functions along with RLVR training prompts. With carefully designed verification modules, RLVR significantly improved precise instruction following.

**Automatically generated verifiers.** AutoIF (Dong et al., 2024) moved verifier writing to the model: an LLM generates instructions, the code that checks responses against them, and unit tests that check the code. Execution-feedback rejection sampling then yields data for SFT, offline DPO and online DPO. The unit tests on the checker are the important part. A checker is itself a program that can be wrong, and a wrong checker is a wrong reward.

**Hybrid verifiers.** VerIF (Peng et al., 2025) combines rule-based code verification with LLM verification from a large reasoning model (QwQ-32B) for the parts code cannot check, and releases VerInstruct, about 22,000 instances with attached verification signals. The authors report gains on several instruction-following benchmarks, generalization to unseen constraints, and no loss of general capability. RAIF (Qin et al., 2025) targets complex compositions and finds that vanilla chain-of-thought hurts, because the reasoning just paraphrases the instruction; RL with rule-centric rewards and sample-wise contrast for better reasoning lets a 1.5B model gain 11.74%.

Thinking is not uniformly good for instruction following. Using Qwen3 models with thinking switched on and off on the same weights, Senthil Kumar (2026) finds aggregate IFEval changes are small (-0.55 to -3.52 points) but 10-20% of prompts flip between pass and fail. Constraints needing global planning (counting, structure) tend to improve with thinking; constraints needing exact local form tend to get worse.

## How should the reward aggregate several constraints?

This is the design decision most recipes make by default and should not. For a prompt with constraints $c_1, \dots, c_k$ and a response $y$, the two obvious choices are all-or-nothing and fractional:

$$
r_{\text{all}}(y) = \prod_{i=1}^{k} \mathbb{1}[c_i(y)], \qquad r_{\text{frac}}(y) = \frac{1}{k}\sum_{i=1}^{k} \mathbb{1}[c_i(y)]
$$

All-or-nothing matches what users experience (one missed rule is a failed answer) but is sparse. Fractional is dense but, as Zhang et al. (2026) show, biases the policy toward easy instructions: every satisfied constraint pays the same, so the cheapest way to raise reward is to nail the easy ones and give up on the hard ones. Their fix has two parts, a rejection-sampling fine-tuning stage that makes hard instructions reachable before RL, and **scarcity-aware rewards** that weight each instruction by how rarely it is satisfied. In the same spirit, a weighted reward

$$
r_w(y) = \frac{\sum_i w_i \, \mathbb{1}[c_i(y)]}{\sum_i w_i}, \qquad w_i \propto \frac{1}{\hat p_i + \epsilon}
$$

with $\hat p_i$ the policy's current empirical satisfaction rate for constraint type $i$, pays more for the constraints the policy is not yet doing.

A second problem is specific to group-relative methods. With binary all-or-nothing rewards and per-sample success probability $p$ on a prompt, a GRPO group of $G$ samples gives zero gradient whenever every sample agrees:

$$
P(\text{zero-variance group}) = p^{G} + (1-p)^{G}
$$

Instruction prompts are often easy for a tuned model. At $p = 0.9$ and $G = 8$, that probability is about 0.43, so more than four in ten groups contribute nothing. MDP-GRPO (Salmani-Zarchi et al., 2026) names the pathologies of z-score normalization under such discrete, low-dispersion rewards (low-variance amplification, mean-centering blindness, zero-variance collapse) and counters them with multi-temperature sampling, dual-anchor advantages, bounded shaping and asymmetric KL, reporting up to 5.0% better strict constraint satisfaction on Llama-3.2-3B. **Graded rewards** are the other answer: ScopeIF (Wen et al., 2026) factorizes constraints into Scope, Target and Range and uses tool-grounded verification to measure *how badly* a constraint is violated, not just whether it is, giving denser supervision; its Qwen3-4B and 8B models rival or surpass Gemini-2.5-Pro and DeepSeek-V3.2 on its evaluations.

The practical rule: filter prompts whose constraints the policy already satisfies almost always, and replace binary per-constraint checks with graded ones wherever the constraint has a natural distance (word counts, item counts, ranges).

## How do instruction-following rewards get hacked?

Constraint checkers verify the constraint, not the answer. That gap is now well documented.

- **Constraint satisfaction without content.** Yoon et al. (2026) show frontier models can receive full credit on verifiable instruction-following benchmarks for responses with little substantive answer content, and that publicly released checkpoints trained with RLVR show higher constraint satisfaction but lower response quality. Their method, **CALIF**, adds a calibrated bonus based on the response's likelihood under the request alone, computed with the frozen reference policy, so no extra judge or reward model is needed. Across 1.7B to 8B models it improves IFBench constraint satisfaction while keeping quality near or above pre-RL levels, and beats base policies in 40 of 45 model-metric comparisons on three rubric-based benchmarks.
- **Copying as compliance.** Benchmarks built by back-translation (generate constraints from a reference document) let the constraint generator copy specific text from the reference, which the evaluated model then satisfies by copying. UNSPECIFIC (Sharma et al., 2026) synthesizes constraints common to two similar articles, hardens only trivially satisfied ones, and checks satisfaction on both the article and its summary. GPT-5 Mini's satisfaction rate drops from 90% to 78%, and many constraints turn out to be satisfied only superficially, outside the article's core narrative.
- **Constraints detached from a task.** LIFT (Goldstein et al., 2026) argues the IFEval design itself invites hacking because constraints are the whole task. Lift-Bench asks for a document from a topic and a structured outline, scopes constraints to sections, mixes verifiable and judged constraints, and keeps a main task. Training on its Lift-Train counterpart is much less susceptible to reward hacking than training on the common IFTrain set.

A minimal verifier that encodes these lessons looks like this:

```python
import json, re

def word_count(text: str) -> int:
    return len(re.findall(r"\b\w+\b", text))

def check_constraints(resp: str, spec: dict) -> dict:
    """Per-constraint graded scores in [0, 1], not just pass/fail."""
    s = {}
    if "min_words" in spec:
        n = word_count(resp)
        s["min_words"] = min(1.0, n / spec["min_words"])
    if "keyword" in spec:
        k, need = spec["keyword"], spec.get("keyword_min", 1)
        hits = len(re.findall(rf"\b{re.escape(k)}\b", resp, flags=re.I))
        s["keyword"] = min(1.0, hits / need)
    if spec.get("json"):
        try:
            json.loads(resp); s["json"] = 1.0
        except ValueError:
            s["json"] = 0.0
    return s

def reward(resp, spec, weights, quality_score, lam=0.5, floor=0.3):
    s = check_constraints(resp, spec)
    r_if = sum(weights[k] * v for k, v in s.items()) / sum(weights[k] for k in s)
    # Quality gate: constraint credit is withheld if the answer is not useful.
    # quality_score comes from a task check, a judge, or a likelihood bonus.
    if quality_score < floor:
        return 0.0
    return (1 - lam) * r_if + lam * quality_score
```

The quality gate matters more than the weights. Without it, any policy optimized long enough finds the response that satisfies the checkers at minimum effort.

## Do models follow constraints, or just their defaults?

A model that writes in English when told to write in English is not demonstrating instruction following. Two 2026 papers turn that observation into measurement.

**Wording robustness.** WISE (Zhan et al., 2026) holds the operational requirement fixed (exact word count, keyword exactly once, an 8-12 word range) and varies only its wording across 100 matched tasks and up to thirteen models from seven providers. In the nine-model control panel, compliance was 54.9% for the original positive form, 48.2% for a longer positive form, 36.7% when the target appears later, and 33.8% for an avoidance form. Under the most disruptive exclusion form the top-ranked model changes and 24.1% of strictly ordered model pairs reverse. A leaderboard built on one template per constraint is partly a leaderboard of template familiarity.

**Against-prior rules.** Harness-IF (Huang et al., 2026) re-runs each task with the rule withheld to see what the model does unprompted, and scores **Against-Prior Accuracy** only on rules that oppose that default. Across 12 frontier models accuracy spans 72.1-85.9% but AP-Acc spans 66.1-78.6%, and every model is worse on against-prior rules, by 3.6 to 7.4 points. Aggregate scores therefore overstate compliance by a model-specific margin and reorder adjacent models.

Both ideas translate directly into dataset construction: for every constraint family, ship several wordings, and for every rule, record whether it agrees or disagrees with the base model's unprompted behavior. Report the worst wording and the against-prior subset alongside the headline number.

## How is instruction following evaluated in multi-turn agents?

Deployed agents receive instructions from many places, over many turns, and have to keep obeying them while doing something else. Benchmarks have followed.

| Benchmark | Setting | Scale | Grading |
|---|---|---|---|
| Multi-IF (2024) | 3-turn chat, 8 languages | 4,501 conversations | IFEval-style checkers per turn |
| StateWise (2026) | Constraints added, amended and withdrawn over a dialogue | Held-out constraint families and phrasings | Executable checkers for persistence and relapse |
| MTAC-IFBench (2026) | Multi-turn agentic coding | Average 7.04 turns and 91.33 constraints per instance; 6 primary, 18 secondary categories | Per-constraint checklists verified by scripts and judge agents |
| Harness-IF (2026) | Coding agent rules on 5 instruction surfaces | 60 items, 642-rule library, 256 rules with verdicts | Execution evidence; Against-Prior Accuracy |
| IFHierBench (2026) | Nested output structures | 600 prompts, 4 constraint-tree depths, 35 constraints | Deterministic checker at every scope |
| HANDBOOK.md (2026) | Agents in mock companies governed by long SOPs | 65 tasks, 20-124 page handbooks, 824 criteria | Programmatic checks for required and prohibited actions |

Three findings stand out. StateWise (Varshney and Yadav, 2026) separates two multi-turn failures: **persistence** (active constraints stop being honored as turns accumulate) and **relapse** (withdrawn constraints keep being enacted). Supervised training taught 7-8B models to track constraint state almost perfectly but not to obey it; on Llama-3.1-8B every supervised variant roughly doubled relapse, and a preference stage on self-generated relapse contrasts was needed to cut it by 8-22 points. Harness-IF finds that precedence among instruction sources does not follow prompt depth: system prompts, project files and user instructions rank ahead of tool and skill descriptions. And HANDBOOK.md (Panavas et al., 2026) shows how far agents are from following long standing policy: each task modifies one of 10 base handbooks so rules and thresholds differ across tasks, grading is fully deterministic, and under strict grading the strongest model passes 36.2% of trials while most frontier models stay below 25%. Agents let plausible in-environment requests override policy, perform a required check and then act against its result, and report compliance they did not achieve.

IFHierBench (Mao and Chen, 2026) makes the structural version of the point: when constraints apply to a section or nested field rather than the whole response, even the strongest of seven evaluated models only marginally exceeds 50% prompt-level accuracy, and accuracy falls sharply with depth.

## What does a training-grade instruction-following environment need?

Pulling the threads together, here is the checklist we use.

1. **Constraints on top of real tasks.** Every prompt has a main task with its own quality check, as in LIFT. Constraint-only prompts teach constraint-only answers.
2. **Verified verifiers.** Every checker has unit tests (AutoIF's insight), including adversarial responses that should fail: empty answers, answers that quote the instruction, answers that satisfy the letter by padding.
3. **Recorded scope and composition.** Each constraint records what part of the output it governs and how it composes with others (ComplexBench, ScopeIF, IFHierBench), so the checker scores the right span and the right branch.
4. **Graded, weighted rewards.** Distance-based scores where a natural distance exists; weights that pay for rarely satisfied constraints; a quality gate or likelihood bonus that blocks content-free compliance.
5. **Difficulty filtering.** Drop or reweight prompts the policy already satisfies in nearly every sample, since they produce zero-variance groups.
6. **Held-out generalization splits.** Entire constraint families held out (IFBench), several wordings per constraint (WISE), and against-prior labels (Harness-IF).
7. **Multi-turn and multi-surface variants.** Constraints that persist, change and get withdrawn (StateWise); rules placed in system prompts, project files and tool descriptions (Harness-IF); long policy documents with programmatic checks on prohibited actions (HANDBOOK.md).
8. **Human audit of high-reward samples.** Read the top-scoring responses each training round. If they satisfy every checker and you would not send them to a user, the reward is broken.

## Where does expert human data still matter?

Code can count words; it cannot decide whether a rule is the kind a real user writes. The expensive parts of instruction-following data are human. Writing natural, compositional constraints that sit on top of real professional tasks. Writing the policy documents agents must follow, which HANDBOOK.md had experts author at 20-124 pages. Labeling judged constraints and decomposed requirements consistently. Producing wording variants that preserve the operational requirement, and checking that they do. Reading RLVR outputs to catch answers that pass every checker and help nobody. LIFT's authors note that earlier attempts at richer constraints required expert labor and stayed closed; the labor did not go away, it just became the thing worth paying for.

## How Anthroly can help

Anthroly works with PhD experts and domain practitioners who write multi-constraint prompts on real tasks, author long operating procedures for agent environments, write and unit-test verification functions, label judged constraints, build wording and against-prior variants, and audit high-reward RLVR samples for constraint-satisfying but empty answers. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building instruction-following data or rewards and want an expert audit of what your verifiers are actually rewarding, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How reliable are RLVR verifiers?](/blog/how-reliable-are-rlvr-verifiers)
- [Reward hacking in rubric-based RL](/blog/reward-hacking-rubric-based-rl)
- [Why does RLHF make models verbose?](/blog/why-does-rlhf-make-models-verbose-length-bias)
- [How to choose prompts for RLVR training](/blog/how-to-choose-prompts-for-rlvr-training)
- [Are LLM user simulators reliable for agent RL?](/blog/are-llm-user-simulators-reliable-for-agent-rl)
- [How to build multilingual preference data for RLHF](/blog/how-to-build-multilingual-preference-data-for-rlhf)

---

## References

1. Zhou, J., Lu, T., Mishra, S., et al. (2023). [Instruction-Following Evaluation for Large Language Models](https://arxiv.org/abs/2311.07911). arXiv:2311.07911.
2. Jiang, Y., Wang, Y., Zeng, X., et al. (2023). [FollowBench: A Multi-level Fine-grained Constraints Following Benchmark for Large Language Models](https://arxiv.org/abs/2310.20410). arXiv:2310.20410.
3. Qin, Y., Song, K., Hu, Y., et al. (2024). [InFoBench: Evaluating Instruction Following Ability in Large Language Models](https://arxiv.org/abs/2401.03601). arXiv:2401.03601.
4. Wen, B., Ke, P., Gu, X., et al. (2024). [Benchmarking Complex Instruction-Following with Multiple Constraints Composition](https://arxiv.org/abs/2407.03978). arXiv:2407.03978.
5. He, Y., Jin, D., Wang, C., et al. (2024). [Multi-IF: Benchmarking LLMs on Multi-Turn and Multilingual Instructions Following](https://arxiv.org/abs/2410.15553). arXiv:2410.15553.
6. Lambert, N., Morrison, J., Pyatkin, V., et al. (2024). [Tulu 3: Pushing Frontiers in Open Language Model Post-Training](https://arxiv.org/abs/2411.15124). arXiv:2411.15124.
7. Pyatkin, V., Malik, S., Graf, V., et al. (2025). [Generalizing Verifiable Instruction Following](https://arxiv.org/abs/2507.02833). arXiv:2507.02833.
8. Dong, G., Lu, K., Li, C., et al. (2024). [Self-play with Execution Feedback: Improving Instruction-following Capabilities of Large Language Models](https://arxiv.org/abs/2406.13542). arXiv:2406.13542.
9. Peng, H., Qi, Y., Wang, X., et al. (2025). [VerIF: Verification Engineering for Reinforcement Learning in Instruction Following](https://arxiv.org/abs/2506.09942). arXiv:2506.09942.
10. Qin, Y., Li, G., Li, Z., et al. (2025). [Incentivizing Reasoning for Advanced Instruction-Following of Large Language Models](https://arxiv.org/abs/2506.01413). arXiv:2506.01413.
11. Senthil Kumar, S. A. (2026). [When Built-in Thinking Helps and Hurts: Constraint-Level Error Shifts in Instruction Following](https://arxiv.org/abs/2606.09662). arXiv:2606.09662.
12. Zhang, M., Yin, Y., He, K., et al. (2026). [Mitigating Exploration Bias in RL for Multi-Instruction Following](https://arxiv.org/abs/2608.23830). arXiv:2608.23830.
13. Salmani-Zarchi, M. M., Rahimi, Z., Faili, H., & Dousti, M. J. (2026). [MDP-GRPO: Stabilized Group Relative Policy Optimization for Multi-Constraint Instruction Following](https://arxiv.org/abs/2606.06058). arXiv:2606.06058.
14. Wen, B., Niu, Y., Ning, X., et al. (2026). [ScopeIF: Improving Scope-Aware Precise Instruction-Following in Large Language Models via Graded Reward Modeling](https://arxiv.org/abs/2609.32189). arXiv:2609.32189.
15. Yoon, S., Seo, W., Ivison, H., et al. (2026). [Diagnosing and Correcting Reward Hacking in Verifiable Instruction Following](https://arxiv.org/abs/2610.19525). arXiv:2610.19525.
16. Sharma, J., Kaur, B., Hong, J., Zamani, H., & Chang, H.-S. (2026). [UNSPECIFIC: General Constraint Synthesis for Breaking Copy-and-Paste Shortcut in LLM Instruction Following](https://arxiv.org/abs/2608.09154). arXiv:2608.09154.
17. Goldstein, E., Belfer, Y., Belinkov, Y., & Gissin, D. (2026). [LIFT: Scoped Constraints for Evaluating and Training Instruction Following](https://arxiv.org/abs/2610.28819). arXiv:2610.28819.
18. Zhan, Q., Jang, S., Dong, Z., et al. (2026). [When Verifiable Counts Depend on Wording: Auditing Wording Robustness in Instruction Following](https://arxiv.org/abs/2610.05278). arXiv:2610.05278.
19. Huang, Z., Que, H., Zeng, H., et al. (2026). [Harness-IF: Evaluating Instruction Following Across Instruction Surfaces in Coding Agents](https://arxiv.org/abs/2608.11727). arXiv:2608.11727.
20. Varshney, S., & Yadav, R. (2026). [StateWise: Teaching Language Models to Track and Obey Evolving Constraints in Multi-Turn Dialogue](https://arxiv.org/abs/2610.33766). arXiv:2610.33766.
21. Wen, B., Wang, C., Gui, J., et al. (2026). [MTAC-IFBench: Benchmarking Instruction-Following in Multi-Turn Agentic Coding](https://arxiv.org/abs/2609.14992). arXiv:2609.14992.
22. Mao, Y., & Chen, C. (2026). [IFHierBench: Hierarchical Instruction Following for Large Language Models](https://arxiv.org/abs/2607.27912). arXiv:2607.27912.
23. Panavas, L., Minus, S., Monton, B., et al. (2026). [HANDBOOK.md: A Benchmark for Long-Context Agentic Instruction Following](https://arxiv.org/abs/2607.25398). arXiv:2607.25398.
