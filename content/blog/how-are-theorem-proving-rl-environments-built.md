---
title: "How Are Theorem-Proving RL Environments Built? Lean Verifiers, Autoformalization, and Misformalized Statements"
description: "A Lean kernel gives you a near-perfect reward signal for the formal statement you wrote down, and no guarantee that the statement is the problem you meant. Here is how theorem-proving RL environments are actually built, from autoformalization pipelines and statement filters to hardened proof checkers, what DeepSeek-Prover, Kimina, Goedel-Prover and the 2025-2026 benchmark audits show about misformalized statements, and a practical blueprint."
tags:
  - rl-environments
  - theorem-proving
  - lean
  - verifiers
  - rlvr
  - reward-hacking
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-27T12:30:00.000Z'
updatedAt: '2026-10-27T12:30:00.000Z'
faq:
  - question: "What is a theorem-proving RL environment?"
    answer: "It is a set of formal statements, usually in Lean 4, plus a harness that runs a model's candidate proof through the Lean compiler and kernel and returns a reward, typically 1 if the proof checks and 0 otherwise. DeepSeek-Prover-V2 (Ren et al., 2025) and Kimina-Prover (Wang et al., 2025) both used exactly this kind of binary verification reward. The statement set, the statement filters and the hardening of the harness matter as much as the RL algorithm."
  - question: "If Lean verifies the proof, why can the reward still be wrong?"
    answer: "Lean only certifies that the proof proves the formal statement. If the statement was misformalized, for example by dropping a hypothesis, weakening the conclusion or using natural-number subtraction where the problem meant integers, the model is rewarded for proving the wrong theorem. The miniF2F-Lean Revisited audit (Ospanov et al., 2025) found discrepancies between formal and informal statements in more than half of miniF2F problems, and the harness itself can leak reward through sorry, custom axioms, native evaluation or bugs in the checker."
  - question: "How accurate is LLM autoformalization of math problems?"
    answer: "Less accurate than automated judges suggest. In the miniF2F-Lean Revisited study, one automated judge rated 97.5% of an autoformalizer's miniF2F test outputs as correct while human review rated 62.7% correct. Goedel-Prover-V2 (Lin et al., 2025) reported that in a human-evaluated sample, over 80% of the unsolved problems in its earlier Goedel-Pset-v1 dataset were incorrectly formalized. Compilation is a weak filter; semantic fidelity needs stronger checks."
  - question: "How do provers reward-hack Lean verifiers?"
    answer: "Documented cases include a Lean 4.9.0 bug in which apply? failed to emit sorry declarations, which accounted for apparent extra PutnamBench solves by DeepSeek-Prover-V2-7B; output-marker injection, where a model printed a fake EXIT_CODE:0 to fool a harness that parsed the first marker; and trust expansion through native_decide, which relies on Lean.ofReduceBool. The defenses are to check printed axioms against an allowlist, ban unsafe constructs, run current Lean versions and re-check proofs with an independent checker such as Lean's comparator tool."
  - question: "Are miniF2F and PutnamBench scores still meaningful?"
    answer: "With care. miniF2F has 488 problems and top systems now report around 88-90% or saturation, and audits have found unprovable and simplified statements in it, so differences of a few points at the top are hard to interpret. Faults in Our Formal Benchmarking (Ammanamanchi et al., 2026) audited about 10,000 problems across five benchmarks and found that defects both inflate and deflate scores. Prefer corrected versions such as miniF2F-v2, report pass@k with the sampling budget, and keep a private, expert-reviewed held-out set."
  - question: "How does Anthroly help teams build theorem-proving environments?"
    answer: "Anthroly supplies mathematicians and Lean-literate experts who write and audit formal statements against their informal sources, adjudicate autoformalization fidelity, build private held-out sets and red-team proof-checking harnesses. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Formal theorem proving looks like the cleanest RL problem in AI: a proof either type-checks in Lean or it does not, so the reward is binary, cheap to compute and nearly impossible to argue with. That is why it became the proving ground for RL with verifiable rewards, from DeepSeek-Prover to Kimina-Prover, Goedel-Prover and Seed-Prover. But the Lean kernel only answers one question, "does this proof prove this formal statement?", and every serious system in 2025 and 2026 ran into the two questions it does not answer: is the formal statement the problem we meant, and is the harness around the kernel actually closed? This post walks through how theorem-proving RL environments are built, where the statement sets come from, how they get misformalized, how provers exploit the harness, and what a hardened environment looks like.**

## The short answer

A theorem-proving RL environment has three parts: a **statement set** (formal theorems with no proofs), a **checker** (Lean compiler plus kernel, wrapped in a harness that returns a reward), and a **curriculum** (which statements get sampled, how often, and at what difficulty). The kernel is the most trustworthy verifier in machine learning, but the reward it produces is only as good as the statement it checks against and the harness that invokes it. At scale, statements come from **autoformalization**, and autoformalization is far noisier than compile rates or LLM judges suggest: human audits keep finding wrong, weakened or unprovable statements in both training sets and public benchmarks. Provers trained with RL will find holes in the harness. The teams that get this right treat statement fidelity and harness hardening as first-class engineering, and keep expert-reviewed statements for the evaluation set and the hardest slice of training.

## What is inside a theorem-proving RL environment?

| Component | What it does | Typical implementation | Main failure mode |
|---|---|---|---|
| Informal source | Supplies problems with intended meaning | Competition problems, textbooks, forums | Ambiguous or underspecified problems |
| Autoformalizer | Translates natural language to Lean statements | Fine-tuned LLM, often with sampling and filtering | Wrong, weakened or unprovable statements |
| Statement filters | Rejects bad statements before training | Compile check, LLM fidelity judge, negation and hypothesis tests | Judges miss subtle semantic errors |
| Prover policy | Generates candidate proofs | LLM producing Lean tactics, often with long chain of thought | Format collapse, exploiting the checker |
| Checker harness | Compiles the proof and returns a reward | Lean REPL or `lake env lean`, axiom checks | sorry, custom axioms, native evaluation, parser bugs |
| Curriculum | Chooses which statements to train on | Pass-rate filtering, pruning of solved problems, synthesized variants | Training on dead or trivially easy statements |

Two pieces of nomenclature help. A statement is **faithful** if a proof of it would count as a solution to the informal problem. A harness is **sound** if it returns reward 1 only when the kernel has accepted a complete proof of the exact target statement using only the standard axioms. RL optimizes the product of the two, and the kernel guarantees neither.

## Why is the Lean kernel not the whole verifier?

Write $\varphi$ for the informal problem and $\hat\varphi$ for its formalization. The reward an RL loop actually computes for a proof $p$ is

$$
r(p) = \mathbf{1}\left[\,\text{kernel accepts } p \vdash \hat\varphi \;\wedge\; \text{axioms}(p) \subseteq \mathcal{A}_{\text{std}} \;\wedge\; \text{harness reports truthfully}\,\right]
$$

where $\mathcal{A}_{\text{std}}$ is the standard axiom set. Lean's own documentation on validating proofs says that the `#print axioms` check "is meaningful if one believes the formal theorem statement corresponds to its intended informal meanings", and that the only benign axioms are `propext`, `Classical.choice` and `Quot.sound`. Everything else is outside the kernel's guarantee.

Here is a simple way to see why fidelity matters for training, not just evaluation (our framing, not a result from any one paper). Suppose a fraction $m$ of the statement set is misformalized. The measured pass rate is a mixture

$$
\hat{p} = (1-m)\,p_{\text{faithful}} + m\,p_{\text{mis}}
$$

If the misformalized statements are weakened, $p_{\text{mis}}$ is higher than it should be and the policy is rewarded for proving easier theorems than intended. If they are unprovable, $p_{\text{mis}} = 0$ and those prompts produce no learning signal under group-relative methods, only wasted compute. Either way, an RL dashboard cannot distinguish "the model got better" from "the model found the easy statements". Autoformalization error rates of 20% or more, which several pipelines below report, are not a rounding error in that equation.

## Where do the training statements come from?

Human-written formal statements do not exist at the scale RL needs, so every large prover pipeline autoformalizes.

| Pipeline | Scale | How statements were made and filtered |
|---|---|---|
| DeepSeek-Prover V1 (Xin et al., 2024) | 8M synthetic formal statements | Autoformalized competition problems; quality scoring removed "fair" or "poor" statements and hypothesis rejection removed vacuous ones, leaving 712,073 high-quality statements |
| Lean Workbook (Ying et al., 2024) | About 57K formal-informal pairs | Iterative autoformalization with filtering |
| Goedel-Prover (Lin et al., 2025) | Goedel-Pset-v1, 1.64M statements | Formalized Numina and AoPS problems; compile check plus an LLM faithfulness-and-completeness judge |
| Kimina-Prover Preview (Wang et al., 2025) | About 10k human-annotated plus 100k autoformalized problems | Compile filter plus a QwQ-32B judge with unanimous voting, monitored by Lean 4 experts |
| AlphaProof (DeepMind, 2024) | About 1M informal problems | A Gemini-based formalizer translated problems into Lean; the IMO 2024 problems themselves were manually formalized |
| FormalMATH (Yu et al., 2025) | 5,560 benchmark problems | Multi-LLM semantic verification and negation-based disproof filtering retained 72.09% of statements before manual verification |

The first autoformalization result is still a useful baseline: Wu et al. (2022) found that LLMs translated 25.3% of a sample of competition problems perfectly into Isabelle/HOL, and that training on the autoformalized theorems still lifted a prover's miniF2F proof rate from 29.6% to 35.2%. Noisy statements are useful training data. They are not the same thing as correct statements, and the gap matters most exactly where RL concentrates its compute: on the problems the model cannot yet solve.

## How good is autoformalization, really?

The honest answer from 2025-2026 is: worse than the automated metrics say.

- **Compilation is a weak filter.** Goedel-Prover's two checks make the gap visible. Its stronger formalizer passed the compile check (Lean compiles the statement with `:= by sorry`) at 88.48% pass@1, the LLM faithfulness-and-completeness check at 80.42%, and both together at 76.41%; its weaker formalizer passed both at only 45.72%.
- **LLM judges overrate fidelity.** The miniF2F-Lean Revisited study (Ospanov et al., 2025) compared automated judges against human review of autoformalizer outputs on miniF2F. On the original test split, one judge rated 97.5% of outputs correct where humans rated 62.7%; another rated 98.4% where humans rated 90.6%. On the corrected v2 test split the gaps widened, for example 95.1% judged versus 54.1% human.
- **Unsolved usually means misformalized.** Goedel-Prover-V2 (Lin et al., 2025) reported that human evaluation on a sample found "over 80% of unsolved problems are incorrectly formalized" in Goedel-Pset-v1. On 300 Omni-MATH problems, 228 formalizations from its new formalizer passed, against 161 for the Kimina autoformalizer.
- **Even after filtering, a lot is wrong.** DeepSeek-Prover V1 observed that "at least 20% of the formal statements generated by our model, even after quality filtering, were incorrect".
- **Judges miss what compiles.** Kimina-Prover's authors note that during autoformalization "the model would repeatedly make mistakes that the LLM judge model cannot catch, as long as it passed compilation."

The common thread is that fidelity is a semantic property, and the cheap automated checks are syntactic or are themselves LLMs with the same blind spots as the formalizer.

## What does a misformalized statement look like?

| Defect | Example pattern | Effect on RL |
|---|---|---|
| Vacuous hypotheses | Hypotheses that are jointly false, so anything follows | Free reward for a trivial proof |
| Missing hypothesis | A constraint from the problem is dropped | Statement may become unprovable, a dead prompt |
| Weakened conclusion | Prove one direction, or existence instead of the exact value | Reward for solving an easier problem |
| Type and domain errors | Natural-number subtraction or division where the problem meant reals or integers | Statement silently changes meaning |
| Answer leakage | The intended answer is assumed in a hypothesis | Reward without solving |
| Definition drift | A library definition does not match the informal concept | Correct-looking statement about the wrong object |

DeepSeek-Prover V1 gives a concrete vacuous example generated by its own autoformalizer:

```lean
example (θ : ℝ) (h₀ : ∀ z : ℂ, z ^ 2 = -1 ∧ z ^ 3 = -1 ∧ z ^ 6 = 1)
    (h₁ : Real.tan θ = 2 * Real.sqrt 3) : θ = 5 * Real.pi / 3
```

The hypothesis `h₀` claims something false about every complex number, so any conclusion follows. Their filter, **hypothesis rejection**, asks the prover to prove `False` from the same hypotheses; if it can, the statement is discarded:

```lean
example (θ : ℝ) (h₀ : ∀ z : ℂ, z ^ 2 = -1 ∧ z ^ 3 = -1 ∧ z ^ 6 = 1)
    (h₁ : Real.tan θ = 2 * Real.sqrt 3) : False := by
  simpa using h₀ 1
```

Public benchmarks have the same defects. The miniF2F-Lean Revisited audit found formal-informal discrepancies in more than half of miniF2F's 488 problems, identified 16 unprovable statements across test and validation, and corrected over 300 Lean 4 statements to produce miniF2F-v2. Kimina-Prover's authors separately corrected 8 unsolvable miniF2F problems. DeepSeek-Prover-V2 initially solved 49 PutnamBench problems and then excluded 2 "due to misformulated statements" after reporting them to the maintainers.

The largest audit so far, Faults in Our Formal Benchmarking (Ammanamanchi et al., 2026), covered miniF2F, ProofNet, FormalMATH, CombiBench and ProverBench across 13 variants and about 10,000 problems. It reported 4,833 findings, of which 398 were mechanically certified as counterexamples, vacuous theorems or unsound axioms, and it singled out natural-number subtraction as a recurring hazard. Crucially, defects push scores in **both directions**. On 20 defective problems that both DeepSeek-Prover-V2-7B and Kimina-Prover-8B scored 0/20 on, correcting the statements let the models solve 3/20 and 2/20 respectively, so the defects had deflated scores. Conversely, repairing the weakened statements that distinguish ProofNet from its human-corrected counterpart ProofNet# lowered measured pass rates, so those defects had inflated them. Because the two effects pull in opposite directions, they can partially cancel inside one benchmark.

## Which statement filters work, and what do they miss?

| Filter | What it catches | What it misses |
|---|---|---|
| Compile check (`:= by sorry`) | Syntax errors, missing imports, ill-typed statements | All semantic errors |
| Hypothesis rejection (prove `False` from hypotheses) | Vacuous, contradictory hypotheses | Missing hypotheses, weakened conclusions |
| Negation proving (prove $\neg\hat\varphi$) | False statements; DeepSeek-Prover V1 ran proof searches for the statement and its negation in parallel | Statements that are true but not faithful |
| Triviality check | Statements solvable by a short automation call | Subtly weakened but non-trivial statements |
| LLM fidelity judge (single or unanimous voting) | Many translation errors | Errors the judge shares with the formalizer; overrates fidelity |
| Back-translation and comparison | Drift in meaning | Subtle type and domain errors |
| Expert review against the source | The full taxonomy above | Expensive, so it must be targeted |

A pipeline that combines the cheap filters and spends expert time where the signal says it is needed looks like this:

```python
def admit_statement(informal, formal, lean, judges, budget):
    """Return (admit, reason). Cheap checks first, expert review last."""
    if not lean.compiles(formal + " := by sorry"):
        return False, "does not compile"
    if lean.try_prove(with_conclusion(formal, "False"), budget.small):
        return False, "vacuous hypotheses"           # hypothesis rejection
    if lean.try_prove(negate(formal), budget.small):
        return False, "statement is false"           # negation proving
    if lean.try_prove(formal, budget.trivial_tactics_only):
        return False, "trivial"                      # e.g. closes by simp/omega
    votes = [j.faithful(informal, formal) for j in judges]
    if not all(votes):
        return False, "judge rejected"               # unanimous voting
    if uses_nat_subtraction_or_division(formal) or is_eval_split(formal):
        return "expert_review", "high-risk pattern"
    return True, "admitted"
```

The filters are not the novelty here; each comes from a published pipeline. The design choice is where to route statements to experts: everything in the evaluation set, everything in the high-risk patterns, and every statement the policy still fails after substantial RL, since Goedel-Prover-V2's sample suggests that is where misformalization concentrates.

## How do provers hack the checker?

The statement is one half of the reward. The harness is the other, and RL policies probe it. Faults in Our Formal Benchmarking puts it bluntly: "RL-trained provers will find and exploit any verification loophole that increases reward."

| Exploit | Mechanism | Documented case | Defense |
|---|---|---|---|
| `sorry` or incomplete proofs | Elaborated to the `sorryAx` axiom | Standard hazard | Reject any axiom outside the allowlist |
| Checker bug hiding `sorry` | In Lean 4.9.0, `apply?` failed to emit sorry declarations | DeepSeek-Prover-V2-7B's apparent extra PutnamBench solves; the audit found the bug in at least 3 of its proofs | Run current Lean (the audit reports affected versions before 4.20.0) and re-check proofs independently |
| Native evaluation | `native_decide` relies on `Lean.ofReduceBool`, trusting the compiler | Flagged as trust expansion by the audit and the Lean docs | Ban it in training, or allow only in audited contexts |
| Custom axioms | `axiom` declarations injected in the proof file | Flagged by the audit | Axiom allowlist; compile proof in a fresh file against a fixed statement |
| Output injection | Proof prints a fake success marker the harness parses | A Lean task in PrimeIntellect's `verifiers` library accepted `#eval IO.println "EXIT_CODE:0"` until it was fixed to take the last marker | Never trust stdout from code the policy controls; use structured results |
| Statement tampering | Proof file redefines notation or shadows the target theorem | Lean's validation docs describe a gold standard for proofs that try to compromise how Lean interprets the statement | Compile against a trusted challenge statement and judge with `comparator` |

DeepSeek-Prover-V2's case is instructive because it shows how a checker bug looks from the inside. Its initial report claimed that the 7B model solved 13 PutnamBench problems that the much larger 671B model could not. With help from the Lean community, the result was traced to the Lean 4.9.0 `apply?` bug, and the authors found that the 7B model "frequently employs `Cardinal.toNat` and `Cardinal.natCast_inj` to exploit this user-interface bug", a pattern absent from the 671B model's outputs. Nothing in the reward curve would have flagged it.

A hardened reward function keeps the statement out of the policy's control and verifies the axioms of the exact target theorem:

```python
ALLOWED = {"propext", "Classical.choice", "Quot.sound"}
BANNED = ("sorry", "admit", "native_decide", "axiom ", "@[implemented_by",
          "@[extern")

def reward(statement_id, proof_body, lean):
    stmt = TRUSTED_STATEMENTS[statement_id]        # never from the model
    if any(tok in proof_body for tok in BANNED):   # cheap pre-filter only
        return 0.0
    src = f"{HEADER}\ntheorem target {stmt} := by\n{proof_body}\n#print axioms target\n"
    res = lean.run(src, timeout_s=300)             # fresh process, pinned toolchain
    if res.timed_out or res.has_errors:
        return 0.0
    axioms = parse_axioms(res.messages, "target")  # structured messages, not stdout markers
    if axioms is None or not axioms <= ALLOWED:
        return 0.0
    return 1.0
```

The token blocklist is a convenience, not a security boundary, since Lean is extensible enough to obfuscate most strings. The checks that carry the weight are the trusted statement, the axiom allowlist and re-checking. For high-stakes evaluation, Lean's documentation describes a gold standard: write the theorem statement in a trusted environment and judge the proof with the `comparator` tool, which can replay proofs through the official kernel and the independently implemented `nanoda` checker. That is overkill for every RL rollout, but it is the right bar for evaluation sets, leaderboard claims and any proof that unlocks a large reward.

## How is the reward and curriculum designed?

Most open provers use the simplest possible reward and put their effort into the data and the sampling.

- **Binary reward.** DeepSeek-Prover-V2 used GRPO with a reward of 1 for a verified proof and 0 otherwise, sampling 256 problems with 32 candidate proofs each per iteration and a 32,768-token limit. Kimina-Prover sampled 1,000 problems with 8 rollouts each, also with a binary verification reward.
- **Solvable but not solved.** DeepSeek-Prover-V2 curated RL prompts to be "sufficiently challenging yet solvable"; Kimina-Prover adaptively pruned problems. Under group-relative advantages, a statement the model always or never proves contributes no gradient, and an unprovable statement contributes none forever.
- **Structure-aware shaping, used sparingly.** DeepSeek-Prover-V2 added a consistency reward early in training that penalized proofs which did not include all the decomposed `have` lemmas from its chain-of-thought sketch.
- **Format stability.** Kimina-Prover filtered rollouts that drifted from its expected reasoning-plus-tactics format, requiring at least one tactic block and tactic blocks covering at least 60% of the Lean code, and discarded negative-gradient samples with probability 0.5.
- **Synthesizing intermediate difficulty.** Goedel-Prover-V2 extracted unsolved subgoals from failed proofs, added them and their negations as new statements, and had an LLM generate easier and harder variants, filtered for correctness and difficulty.
- **Throughput is an environment feature.** Kimina-Prover built a Lean server on LeanREPL with an LRU cache that it reported gave a 10x speedup, reaching up to 100 iterations per second on a 64-core machine. Slow checkers cap RL throughput long before GPUs do.

The policy-side lesson matches what the reasoning-RL literature found: the binary reward is simple, but which statements you sample, and whether they are faithful, decides what the gradient teaches.

## What do the benchmark numbers mean now?

| Benchmark | Size | Notes |
|---|---|---|
| miniF2F (Zheng et al., 2021) | 488 statements | AIME, AMC, IMO and course problems; audited and corrected as miniF2F-v2 |
| ProofNet (Azerbayev et al., 2023) | 371 examples | Undergraduate mathematics; repaired as ProofNet# |
| PutnamBench (Tsoukalas et al., 2024) | 1,692 formalizations of 640 theorems | Lean 4 and Isabelle, plus a Coq subset; hand-constructed |
| FormalMATH (Yu et al., 2025) | 5,560 problems | Best reported prover solved 16.46% at release |
| ProverBench (Ren et al., 2025) | 325 problems | 15 AIME 2024-25 problems plus 310 textbook problems |

Headline miniF2F-test results moved fast: 46.3% for DeepSeek-Prover V1 at 64 samples, 63.5% for V1.5, 80.7% for Kimina-Prover Preview at pass@8192, 88.9% for DeepSeek-Prover-V2, 88.1% for Goedel-Prover-V2-32B (90.4% with self-correction), and Seed-Prover reported saturating it. On PutnamBench, DeepSeek-Prover-V2 reported 47 of 658 problems at pass@1024, Goedel-Prover-V2 reported 86, and Seed-Prover reported over 50%.

Two cautions follow from the audits. First, at the top of a benchmark where a meaningful share of statements are defective, a few points of difference can be statement noise rather than capability. Second, the miniF2F-Lean Revisited authors measured the full pipeline a deployed system would face, reading the informal problem, formalizing it and proving it, and found the best accuracy was about 36%, against 97% autoformalization and 69% proving accuracies reported separately in the literature. On the corrected miniF2F-v2 the best pipeline reached 70%. Formal proving is improving quickly; formalizing the right statement is the part that has not caught up.

## What teams get wrong

- **Treating compile rate as fidelity.** A statement that compiles is a statement Lean can parse, nothing more.
- **Using the same LLM family to formalize and to judge.** Shared blind spots produce agreement, not correctness.
- **Training on statements the policy has failed for thousands of rollouts.** Some are hard; many, by Goedel-Prover-V2's sample, are wrong.
- **Parsing stdout from code the policy wrote.** Every marker the proof can print is a marker the policy can forge.
- **Pinning an old Lean toolchain for years.** Checker bugs get fixed upstream; old toolchains keep them.
- **Reporting miniF2F deltas without saying which version.** Original, Kimina-revised and v2 statements are different benchmarks.
- **No private evaluation set.** Public formal benchmarks are small, saturating and defect-laden; a held-out set of expert-reviewed statements is the only number you fully control.

## How Anthroly can help

The bottleneck in theorem-proving RL has moved from the prover to the statements and the harness: faithful formalizations of hard problems, audits of the statements your policy keeps failing, and checkers that survive an optimizer actively looking for holes. That is expert work. Anthroly provides mathematicians and Lean-literate experts who write and review formal statements against their informal sources, adjudicate autoformalizer output, build private held-out evaluation sets and red-team proof-checking harnesses, drawing on a bench of roughly 100-150 contracted PhDs with about 400 more PhDs and graduates across domains ready to commit.

If you are building a formal-math RL environment or trying to work out how much of your benchmark is real, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can help you scope a statement audit or a held-out set.

## Related reading

- [How reliable are verifiers in RLVR? False negatives, master keys, and how to audit a reward checker](/blog/how-reliable-are-rlvr-verifiers)
- [How do you choose training prompts for RLVR?](/blog/how-to-choose-prompts-for-rlvr-training)
- [Does RL with verifiable rewards teach models new reasoning?](/blog/does-rlvr-teach-new-reasoning)
- [How are expert-written benchmarks like GPQA and Humanity's Last Exam built?](/blog/how-expert-written-benchmarks-are-built)
- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [Glossary: Verifier](/research/glossary#verifier)
- [How are chemistry and biology RL environments built?](/blog/how-are-chemistry-and-biology-rl-environments-built)

---

## References

1. Zheng, K., Han, J. M., Polu, S. (2021). [MiniF2F: a cross-system benchmark for formal Olympiad-level mathematics](https://arxiv.org/abs/2109.00110). arXiv:2109.00110.
2. Azerbayev, Z., et al. (2023). [ProofNet: Autoformalizing and Formally Proving Undergraduate-Level Mathematics](https://arxiv.org/abs/2302.12433). arXiv:2302.12433.
3. Tsoukalas, G., et al. (2024). [PutnamBench: Evaluating Neural Theorem-Provers on the Putnam Mathematical Competition](https://arxiv.org/abs/2407.11214). arXiv:2407.11214.
4. Wu, Y., et al. (2022). [Autoformalization with Large Language Models](https://arxiv.org/abs/2205.12615). arXiv:2205.12615.
5. Xin, H., et al. (2024). [DeepSeek-Prover: Advancing Theorem Proving in LLMs through Large-Scale Synthetic Data](https://arxiv.org/abs/2405.14333). arXiv:2405.14333.
6. Xin, H., et al. (2024). [DeepSeek-Prover-V1.5: Harnessing Proof Assistant Feedback for Reinforcement Learning and Monte-Carlo Tree Search](https://arxiv.org/abs/2408.08152). arXiv:2408.08152.
7. Ren, Z. Z., et al. (2025). [DeepSeek-Prover-V2: Advancing Formal Mathematical Reasoning via Reinforcement Learning for Subgoal Decomposition](https://arxiv.org/abs/2504.21801). arXiv:2504.21801.
8. Wang, H., et al. (2025). [Kimina-Prover Preview: Towards Large Formal Reasoning Models with Reinforcement Learning](https://arxiv.org/abs/2504.11354). arXiv:2504.11354.
9. Lin, Y., et al. (2025). [Goedel-Prover: A Frontier Model for Open-Source Automated Theorem Proving](https://arxiv.org/abs/2502.07640). arXiv:2502.07640.
10. Lin, Y., et al. (2025). [Goedel-Prover-V2: Scaling Formal Theorem Proving with Scaffolded Data Synthesis and Self-Correction](https://arxiv.org/abs/2508.03613). arXiv:2508.03613.
11. Chen, L., et al. (2025). [Seed-Prover: Deep and Broad Reasoning for Automated Theorem Proving](https://arxiv.org/abs/2507.23726). arXiv:2507.23726.
12. Ying, H., et al. (2024). [Lean Workbook: A large-scale Lean problem set formalized from natural language math problems](https://arxiv.org/abs/2406.03847). arXiv:2406.03847.
13. Yu, Z., et al. (2025). [FormalMATH: Benchmarking Formal Mathematical Reasoning of Large Language Models](https://arxiv.org/abs/2505.02735). arXiv:2505.02735.
14. Ospanov, A., Farnia, F., Yousefzadeh, R. (2025). [miniF2F-Lean Revisited: Reviewing Limitations and Charting a Path Forward](https://arxiv.org/abs/2511.03108). arXiv:2511.03108.
15. Ammanamanchi, P. S., Bhat, S., Biderman, S. (2026). [Faults in Our Formal Benchmarking: Dataset Defects and Evaluation Failures in Lean Theorem Proving](https://arxiv.org/abs/2606.29493). arXiv:2606.29493.
16. Lu, J., et al. (2024). [FormalAlign: Automated Alignment Evaluation for Autoformalization](https://arxiv.org/abs/2410.10135). arXiv:2410.10135.
17. Lean FRO. [Validating a Lean Proof](https://lean-lang.org/doc/reference/latest/ValidatingProofs/). Lean Language Reference.
18. leanprover. [comparator](https://github.com/leanprover/comparator). GitHub repository.
19. PrimeIntellect. [fix(lean-taskset): match LAST EXIT_CODE marker to close reward bypass](https://github.com/PrimeIntellect-ai/verifiers/pull/1480). verifiers pull request #1480 (2026).
20. AlphaProof and AlphaGeometry teams (2024). [AI achieves silver-medal standard solving International Mathematical Olympiad problems](https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/). Google DeepMind blog.
