---
title: "How Are Math Proof Benchmarks and Proof Graders Built? From Proof or Bluff and IMO-ProofBench to Generative Verifiers for Proof RL"
description: "A practitioner's guide to how natural-language math proof benchmarks and automatic proof graders are built: what Proof or Bluff, MathArena, IMO-Bench, ProofBench, the Open Proof Corpus, Hard2Verify and AdvancedMathBench measure, how graders are validated against expert marks (MAE, quadratic weighted kappa, false-positive rate), why proof verifiers drift toward style, and how DeepSeekMath-V2, QED-Nano, Nemotron and MaxProof use graders as RL rewards."
tags:
  - verifiers
  - math-reasoning
  - proof-grading
  - reward-models
  - evals
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-03T12:40:00.000Z'
updatedAt: '2026-11-03T12:40:00.000Z'
faq:
  - question: "Why can't math proofs be graded like AIME answers?"
    answer: "Because a proof has no single final answer to string-match. Correct answers also do not imply correct reasoning: on IneqMath (Lu et al., 2025), even top models such as o1 scored under 10% overall once each step was checked, a drop of up to 65.5% from final-answer accuracy. Grading a proof means checking every claim, deciding whether gaps are fatal, and assigning partial credit, which until recently required expert human graders."
  - question: "What are the main natural-language proof benchmarks?"
    answer: "Proof or Bluff (USAMO 2025 graded by expert annotators), MathArena's proof competitions (IMO 2025 and later), IMO-Bench from Google DeepMind (IMO-AnswerBench, IMO-ProofBench and IMO-GradingBench with 1,000 human gradings), ProofBench (145 competition problems, 435 expert-rated solutions on a 0-7 scale), the Open Proof Corpus (over 5,000 human-evaluated LLM proofs), RIMO, ComBench for combinatorics, and AdvancedMathBench for undergraduate and doctoral qualifying-exam proofs."
  - question: "How accurate are LLM proof graders today?"
    answer: "Good at binary pass/fail on competition proofs, weaker on partial credit and research-level work. ProofGrader reached a mean absolute error of 0.926 points on a 0-7 scale against experts. Two of three cheap open-weight judges tested were statistically no worse than frontier judges on IMO-GradingBench pass/fail agreement, at 4-100x lower cost. But on AdvancedMathBench's VerifierBench the best model reached only 65.1 balanced F1, and RefGrader found calibration gaps in how models assign partial credit."
  - question: "What makes a proof grader trustworthy?"
    answer: "Validation against expert marks on held-out proofs from the target distribution, reported with an ordinal metric such as quadratic weighted kappa or MAE, a measured false-positive rate on subtly wrong proofs, self-consistency across repeated runs, reference solutions and problem-specific marking schemes in the grader's context, and adversarial stress tests such as TROJAN-style generated flawed proofs."
  - question: "How are proof graders used as RL rewards?"
    answer: "DeepSeekMath-V2 trains an LLM verifier, uses it as the reward model for a proof generator, and scales verification compute to label new hard proofs for the next verifier round. QED-Nano trains a 4B model with rubric-based rewards. MaxProof uses a defense-in-depth generative verifier engineered for a low false-positive rate. The common lesson is that the generation-verification gap must be maintained or the policy learns to satisfy the grader rather than to prove."
  - question: "Can formal tools like Lean check natural-language proofs?"
    answer: "Partly. FaithSieve breaks proofs into local claims, checks typed obligations in Lean, and only trusts Lean evidence when the formal statement faithfully matches the informal claim, improving first-error accuracy from 72.29% to 81.43% on its 350-problem Olympiad set. LeanPRM uses paired Lean proofs to label 152K natural-language steps with no human annotation. Pseudo-Formalization keeps natural language but forces modular, self-contained proof blocks."
  - question: "How does Anthroly help with proof benchmarks and graders?"
    answer: "Anthroly's mathematicians and PhD experts write novel proof problems with marking schemes, grade model proofs on 0-7 scales with error annotations, build adversarial flawed-proof sets, adjudicate grader disagreements, and audit RL runs for grader exploits. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Final-answer math is close to solved as an RL problem: string-match the answer, reward 1 or 0, and scale. Proofs are where that recipe breaks. A proof has no answer to match, a correct conclusion can sit on a broken argument, and the only historically trusted grader was a human olympiad marker. In 2025 and 2026 the field built the missing pieces: expert-graded proof benchmarks, grading benchmarks that measure the graders, and generative verifiers good enough to serve as RL rewards for systems that reached IMO gold. This post explains how those benchmarks and graders are built, how to tell whether a grader can be trusted, and where they still fail.**

## The short answer

A credible proof evaluation stack has five layers. **Fresh, hard problems** with expert reference solutions, ideally from competitions held after the model's training cutoff (MathArena's approach) or newly written by specialists (IMO-Bench, Nemotron-IMO-Bench). **A marking scheme** per problem that says which steps earn which points, because partial credit is where graders disagree. **Expert-graded model proofs**, on the competition 0-7 scale, with error annotations: this is the ground truth every automatic grader is validated against (ProofBench, IMO-GradingBench, the Open Proof Corpus). **An automatic grader** that sees the problem, the reference solution and the marking scheme, and is validated with ordinal agreement, false-positive rate and self-consistency, not just accuracy. And **adversarial checks**: subtly wrong proofs, hard-to-verify frontier proofs and stress tests, because a grader used as an RL reward will be attacked by the policy it trains. Skip any layer and you measure the grader's taste instead of the model's mathematics.

## Why do proofs need their own benchmarks?

Two findings forced the shift.

**Final answers hide broken reasoning.** [IneqMath](https://arxiv.org/abs/2506.07927) (Lu et al., 2025) recast olympiad inequalities into checkable subtasks and added four step-wise judges. Even top models such as o1 scored under 10% overall under step-wise scrutiny, a drop of up to 65.5% from their final-answer accuracy. [DeepSeekMath-V2](https://arxiv.org/abs/2511.22570) (Shao et al., 2025) states the problem directly: rewarding correct final answers saturated AIME and HMMT within a year, but "correct answers don't guarantee correct reasoning", and theorem proving has no final answer to reward.

**Human graders found models bluffing.** [Proof or Bluff](https://arxiv.org/abs/2503.21934) (Petrov et al., 2025) had expert annotators grade full solutions to the six USAMO 2025 problems within hours of release. Only Gemini-2.5-Pro reached a non-trivial 25%; every other model scored under 5%. The authors traced failures to reasoning errors and to artifacts of optimization for final-answer benchmarks. [MathArena](https://arxiv.org/abs/2505.23281) (Balunović et al., 2025) turned this into a recurring benchmark: evaluate on each new competition as soon as it is released, which also exposed strong signs of contamination in AIME 2024. On IMO 2025 the top models it evaluated scored slightly under 40%.

By late 2025 the picture had changed quickly. Google DeepMind's Gemini Deep Think and other systems reported gold-level IMO 2025 performance, and open recipes followed in 2026. That progress made grading the bottleneck: you cannot train or rank provers faster than you can check their proofs.

## What do the main proof benchmarks contain?

| Benchmark | Problems | Ground truth | What it is for |
|---|---|---|---|
| [Proof or Bluff](https://arxiv.org/abs/2503.21934) (2025) | 6 USAMO 2025 problems | Expert human grades | First full-proof evaluation of reasoning models |
| [MathArena](https://arxiv.org/abs/2505.23281) (2025) | 162 problems across 7 competitions at launch, growing | Human grading for proof competitions | Uncontaminated, recurring evaluation |
| [IMO-Bench](https://arxiv.org/abs/2511.01846) (2025) | 400 short-answer problems; basic and advanced proof sets | Specialist-vetted problems, grading guidelines, 1,000 human gradings | Proof writing and autograder development |
| [ProofBench](https://arxiv.org/abs/2510.13888) (2025) | 145 problems from 6 competitions | 435 expert-rated LLM solutions, 0-7 scale | Building and validating fine-grained graders |
| [Open Proof Corpus](https://arxiv.org/abs/2506.21621) (2025) | USAMO, IMO and other competitions | Over 5,000 human-evaluated LLM proofs | Training data for graders and provers |
| [RIMO](https://arxiv.org/abs/2509.07711) (2025) | 335 integer-answer rewrites; 456 proof problems | Expert-checked solutions decomposed into sub-problems | Olympiad difficulty with low grading noise |
| [Hard2Verify](https://arxiv.org/abs/2510.13744) (2025) | Recent open-ended frontier problems | Step-level labels, 500+ hours of human labor | Step-level verifiers and first-error detection |
| [ComBench](https://arxiv.org/abs/2606.10479) (2026) | 100 olympiad combinatorics problems | Rubric grading plus deterministic construction checks | Separating proof rigor from constructions |
| [AdvancedMathBench](https://arxiv.org/abs/2607.11849) (2026) | 245 undergraduate and qualifying-exam problems; 888 graded trajectories | Expert annotations | Proofs and verification beyond olympiads |
| [Nemotron-IMO-Bench](https://arxiv.org/abs/2609.10712) (2026) | 200 novel olympiad-level problems | Released with an open IMO pipeline | Fresh held-out olympiad problems |

Three design patterns run through the table.

**Freshness by construction.** MathArena evaluates on competitions that did not exist at training time. IMO-Bench and Nemotron-IMO-Bench commission or curate new problems. A static proof set leaks into training data the same way AIME did.

**Reducing grading noise where possible.** RIMO rewrites 335 IMO problems so each has a unique integer answer, keeping olympiad difficulty while allowing deterministic checking, and decomposes 456 proof problems into sub-problems. ComBench splits combinatorics into analysis problems graded by rubric and construction problems whose constructions are verified deterministically, and finds the two skills diverge: Kimi-K2.6 trails GPT-5.5 on analysis-centric proof grading but beats it on construction-centric Best@4.

**Separate benchmarks for the graders.** IMO-GradingBench, ProofBench, Hard2Verify and VerifierBench do not test provers. They test whether a grader agrees with experts. This is the most important structural change in the area.

## How is an automatic proof grader built?

[ProofBench](https://arxiv.org/abs/2510.13888) (Ma et al., 2025) is the cleanest public study of the design space. The authors varied the backbone model, the input context, the instructions and the workflow, and measured agreement with expert 0-7 scores. The resulting **ProofGrader** combines a strong reasoning model, rich context from **reference solutions and marking schemes**, and simple ensembling, reaching a mean absolute error of 0.926 against expert scores. Used for best-of-16 selection it reached an average 4.14/7, closing 78% of the gap between a naive binary evaluator (2.48) and the human oracle (4.62).

[RefGrader](https://arxiv.org/abs/2510.09021) (Mahdavi et al., 2025) found the same weak point from another angle. On 90 annotated Gemini 2.5 Pro solutions and MathArena's IMO/USAMO 2025 sets, models reliably flagged incorrect and even subtly incorrect solutions, but showed **calibration gaps in partial credit**. Its fix is an agentic workflow that extracts and analyzes the reference solution, derives a problem-specific rubric, and grades in multiple steps.

[IMO-Bench](https://arxiv.org/abs/2511.01846) (Luong et al., 2025) reports that autograders built on Gemini reasoning correlate well with human evaluation, and released IMO-GradingBench so others can check their own.

The practical recipe that emerges:

1. **Give the grader the reference solution and the marking scheme.** Both ProofBench and RefGrader find reference context is a large part of the gain.
2. **Grade in stages.** Check the claimed result, then each lemma, then gaps, then assign points against the scheme.
3. **Ensemble or use consensus.** Multiple samples or multiple judges reduce variance.
4. **Report ordinal agreement, not only accuracy.** A grader that gives 6 for a 7 is less wrong than one that gives 0.
5. **Stress it with wrong proofs that look right.**

## What does a grading harness look like?

The structure below is a minimal sketch of the pattern these papers describe, not any one paper's code. The parts that matter are the reference context, the parsed integer score, the self-consistency check and the explicit abstain path.

```python
from dataclasses import dataclass
from statistics import median

@dataclass
class Item:
    problem: str
    reference_solution: str
    marking_scheme: str   # e.g. "2 pts: reduce to case n odd; 3 pts: bound; 2 pts: construction"
    candidate_proof: str

GRADER_PROMPT = """You are an olympiad grader. Grade the candidate proof on a 0-7 scale
using ONLY the marking scheme. Quote the first incorrect or unjustified step if any.
Problem: {problem}
Reference solution: {reference_solution}
Marking scheme: {marking_scheme}
Candidate proof: {candidate_proof}
Return: FIRST_ERROR: <quote or NONE>  SCORE: <integer 0-7>"""

def parse_score(text: str) -> int | None:
    tail = text.rsplit("SCORE:", 1)
    if len(tail) != 2:
        return None
    tok = tail[1].strip().split()[0] if tail[1].strip() else ""
    return int(tok) if tok.isdigit() and 0 <= int(tok) <= 7 else None

def grade(item: Item, judge, n: int = 5, max_spread: int = 2) -> dict:
    scores = [parse_score(judge(GRADER_PROMPT.format(**item.__dict__))) for _ in range(n)]
    scores = [s for s in scores if s is not None]
    if len(scores) < (n + 1) // 2:
        return {"score": None, "status": "abstain_parse"}       # route to a human
    if max(scores) - min(scores) > max_spread:
        return {"score": None, "status": "abstain_inconsistent"}  # route to a human
    return {"score": median(scores), "status": "ok", "samples": scores}
```

Two details carry most of the weight. The parser takes the **last** `SCORE:` marker and rejects anything outside 0-7, because a proof that contains the string "SCORE: 7" should not grade itself. And inconsistent samples abstain instead of averaging, because [Naik et al. (2026)](https://arxiv.org/abs/2604.02450) found that self-consistency, not raw accuracy, is where smaller verifiers fall furthest behind.

## How do you know a grader agrees with experts?

Accuracy on pass/fail is not enough, because proof scores are ordinal and the cost of errors is asymmetric. The metrics used across the literature:

**Mean absolute error** on the 0-7 scale, as in ProofBench.

**Quadratic weighted kappa**, used by [Ospanov et al. (2026)](https://arxiv.org/abs/2610.36767), which penalizes large disagreements more than small ones. With $K$ score levels, observed agreement matrix $O$ and chance-expected matrix $E$ built from the two raters' marginals,

$$
\kappa_w = 1 - \frac{\sum_{i,j} w_{ij} O_{ij}}{\sum_{i,j} w_{ij} E_{ij}}, \qquad w_{ij} = \frac{(i-j)^2}{(K-1)^2}
$$

so $\kappa_w = 1$ is perfect agreement and $\kappa_w = 0$ is chance.

**False-positive rate** on incorrect proofs. For RL this is the number that matters most, since every false pass is a reward for a wrong proof. Writing $\hat{y}$ for the grader's pass decision and $y$ for the expert's,

$$
\text{FPR} = P(\hat{y} = \text{pass} \mid y = \text{fail}), \qquad \text{precision} = P(y = \text{pass} \mid \hat{y} = \text{pass})
$$

**Self-consistency**, the rate at which repeated judgments of the same proof agree.

What the 2026 grading studies found with these metrics:

- **Cheap judges can match frontier judges on pass/fail.** [Grayzel (2026)](https://arxiv.org/abs/2608.00004) gave judges the candidate proof, a ground-truth proof and the human rubric. On a 200-instance IMO-GradingBench sample, GPT-OSS-120B, DeepSeek-V4-Flash and their consensus were statistically no worse than Claude Opus 4.7 and Gemini 3.1 Pro on agreement with human pass/fail decisions, at 4-100x lower cost. On the full 1,000 items, the consensus rule acted as a precision/recall dial: unanimous pass reached the highest precision (0.855) and majority vote the highest recall (0.912). Unanimity is the right setting when false positives are costly, which is the RL case.
- **Small models have the knowledge but not the consistency.** Naik et al. found open models only up to about 10% behind frontier models in accuracy but up to about 25% more inconsistent, and highly sensitive to prompt choice. An LLM-guided search over specialized prompts improved them by up to 9.1% in accuracy and 15.9% in self-consistency, bringing Qwen3.5-35B level with Gemini 3.1 Pro.
- **Partial credit is still the hard part.** Ospanov et al. built an expert-graded USAMO 2025 set, evaluated 20 models across seven metrics, and introduced **TROJAN**, an iterative self-critique pipeline that generates high-fidelity adversarial proofs. Their MABGrader, which treats grading as arm selection over the discrete score space, beat ProofGrader by 26.4% in quadratic weighted kappa and reduced grading error by 14%.
- **Beyond olympiads, verification is weak.** On [AdvancedMathBench](https://arxiv.org/abs/2607.11849)'s VerifierBench of 888 expert-labeled trajectories the best model reached only 65.1 balanced F1, and proof generation and verification ability did not line up across models. The best generator, GPT-5.5-xhigh, scored 64.5 and 48.9 on the undergraduate and qualifying-exam splits.
- **Research-level proofs raise false positives.** In the [Ramanujan Challenge](https://arxiv.org/abs/2610.40551) evaluation (Sorani et al., 2026), a structured AI-assisted pipeline cut false-positive verdicts on natural-language proofs from 23% with one-shot LLM judgment to 6%.

## Why do proof verifiers drift toward style?

The most important warning in this literature comes from [Mahdavi et al. (2025)](https://arxiv.org/abs/2511.13027) at NVIDIA. They scaled two generative verification methods, GenSelect and LLM-as-a-judge, to millions of tokens and found their combination the most effective for verification and selection. RL on the judge reduced prompt sensitivity. But **RL did not improve final-answer precision even while proof-level metrics improved**, which the authors read as current models often rewarding stylistic or procedural correctness rather than mathematical validity. They also showed that relying on a single benchmark can produce brittle or misleading conclusions.

That is the core risk of using a grader as a reward. A policy optimized against

$$
r(x, y) = \frac{s_{\text{grader}}(x, y)}{7}
$$

will find whatever raises $s_{\text{grader}}$ most cheaply: confident tone, a familiar proof skeleton, a hand-waved "it is easy to see" in the step that carries the difficulty, or text that resembles the reference solution. The defenses used in practice are a high-precision grader (unanimous consensus or an engineered low false-positive rate), reference solutions the policy never sees, fresh adversarial proofs added to the grader's validation set every round, and periodic human grading of the policy's own outputs.

## Can formal methods check informal proofs?

Lean gives a perfect check on a formal statement, but most AI-written proofs are informal and full formalization is still expensive. Four approaches use formal structure without trusting an unchecked informal argument.

**Lean as evidence, gated by faithfulness.** [FaithSieve](https://arxiv.org/abs/2608.26310) (Wang et al., 2026) decomposes proofs into local reasoning units, extracts typed proof obligations, checks them with a formal agent, and only accepts Lean evidence when a semantic alignment score shows the formal statement preserves the original claim. That gate matters, because a prover can "verify" an over-broad or drifted statement. On its 350-problem ProofLoc-Olympiad set it reached 81.43% exact first-error accuracy against 72.29% for direct judging, and 84.5% against 75.0% on the 200-problem university set.

**Lean as a step labeler.** [LeanPRM](https://arxiv.org/abs/2610.17697) (Lafuente-Mercado et al., 2026) has a model write a natural-language proof with a paired formal proof, lets Lean label each step, and filters failures caused only by formal syntax. The result is 10,634 proofs with 152K labeled steps and no human annotation. A Qwen3-4B verifier trained on it raised exact step-label accuracy on LeanPRM-Bench from 48.2 to 74.7, compared with 60.3 when trained on PRM800K.

**Formal-style structure in natural language.** [Pseudo-Formalization](https://arxiv.org/abs/2605.20531) (Barkallah et al., 2026) translates a proof into self-contained modules, each with premises, conclusion and proof, and verifies each block independently. It Pareto-dominated LLM-as-judge baselines on error-finding precision and recall across olympiad and research-level benchmarks, and released ArxivMathGradingBench.

**Lean as the final gate for a natural-language search.** [Le Duc and Liberti (2025)](https://arxiv.org/abs/2510.12829) ran collaborating prover and verifier instances of gpt-5, then formally verified the final proof in Lean, with a human checking that the Lean premises and conclusion matched the problem. The protocol solved five of six IMO 2025 problems.

For a full treatment of formal environments, see our post on [theorem-proving RL environments](/blog/how-are-theorem-proving-rl-environments-built).

## How do proof graders become RL rewards?

The 2025-2026 proof systems share one loop: train a verifier, use it as the reward, then use more verification compute to label harder proofs for the next verifier.

| System | Grader role | Reported result |
|---|---|---|
| [DeepSeekMath-V2](https://arxiv.org/abs/2511.22570) (2025) | Trained LLM verifier is the generator's reward model; generator rewarded for finding and fixing its own issues; scaled verification labels new hard proofs | Gold-level IMO 2025 and CMO 2024; 118/120 on Putnam 2024 with scaled test-time compute |
| [QED-Nano](https://arxiv.org/abs/2604.04898) (2026) | SFT distilled from DeepSeek-Math-V2, then RL with rubric-based rewards and a reasoning cache | 4B model surpasses Nomos-1 and GPT-OSS-120B at proof generation; approaches Gemini 3 Pro |
| [MaxProof](https://arxiv.org/abs/2606.13473) (2026) | Defense-in-depth generative verifier engineered for low false-positive rate; model is generator, verifier, refiner and ranker | 35/42 on IMO 2025 and 36/42 on USAMO 2026 |
| [Nemotron IMO recipe](https://arxiv.org/abs/2609.10712) (2026) | Natural-language generate-verify-refine search across three checkpoints, no formal prover or tools | 30/42 at IMO 2026, the gold threshold |
| [ProofVerifier](https://arxiv.org/abs/2602.02377) (2026) | Generative verifiers trained with binary-reward RL on human-audited question-proof-check triplets | Better proof-judgment accuracy across proof styles |

Two choices recur. **Precision over recall**: MaxProof engineers its verifier explicitly for a low false-positive rate, and Grayzel's unanimous rule gives the highest precision. **Keeping the gap open**: DeepSeekMath-V2 names the problem of maintaining the generation-verification gap as the generator gets stronger, and spends extra verification compute to create new hard-to-verify training data for the verifier. When the policy outgrows the verifier, the reward stops measuring correctness.

Where does the verifier's training data come from? Human-graded proofs (the Open Proof Corpus, where an 8B model fine-tuned on the corpus matched Gemini-2.5-Pro at judging proof correctness), human-audited multi-LLM agreement (ProofVerifier combines multi-LLM agreement with hierarchical human auditing), and formal labels (LeanPRM). Every route keeps humans somewhere in the loop for the labels that matter.

## What teams get wrong

1. **Validating the grader on a different distribution than it will grade.** Olympiad agreement does not transfer to qualifying-exam or research proofs, as AdvancedMathBench and the Ramanujan results show.
2. **Reporting accuracy instead of false-positive rate.** For RL, a false pass is worse than a false fail.
3. **No reference solution or marking scheme in context.** Graders without them are weakest on partial credit.
4. **Averaging inconsistent samples.** Disagreement between samples is a signal to abstain.
5. **Letting the policy see the grading prompt or the reference.** Then the policy can imitate the reference.
6. **Never refreshing adversarial proofs.** A grader that passed last month's adversarial set may fail this month's policy outputs.
7. **Trusting Lean evidence without a faithfulness check.** Proving a drifted statement is not proving the claim.

## Where does expert human data matter?

Every reliable number in this post rests on expert grading. Proof or Bluff used expert annotators within hours of USAMO 2025. IMO-Bench was vetted by a panel of top specialists and includes 1,000 human gradings. ProofBench's 435 solutions were rated by experts on the 0-7 scale. Hard2Verify took over 500 hours of human labor. FaithSieve's ProofLoc datasets are expert-verified. Even fully automated label sources such as LeanPRM are validated against human-graded benchmarks.

Experts do four jobs that models do not yet do reliably: write new problems that are not in training data, write marking schemes that encode what partial progress looks like, grade proofs with error localization, and construct proofs that are wrong in ways a grader will miss. That last job, adversarial proof writing, is the one most teams under-invest in, and it is what keeps a proof reward honest.

## How Anthroly can help

Anthroly works with mathematicians and PhD experts who write novel proof problems with reference solutions and marking schemes, grade model proofs on 0-7 scales with first-error annotations, build adversarial flawed-proof sets for grader validation, adjudicate grader disagreements, and audit proof RL runs for grader exploits. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building a proof benchmark or using a proof grader as a reward and want an expert check on what it actually measures, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How are theorem-proving RL environments built?](/blog/how-are-theorem-proving-rl-environments-built)
- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [Does RLVR teach new reasoning?](/blog/does-rlvr-teach-new-reasoning)
- [Generative reward models vs. scalar reward models](/blog/generative-reward-models-vs-scalar-reward-models)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [Step-level rewards for AI agents](/blog/step-level-rewards-for-ai-agents)
- [How expert-written benchmarks are built](/blog/how-expert-written-benchmarks-are-built)

---

## References

1. Petrov, I., Dekoninck, J., Baltadzhiev, L., et al. (2025). [Proof or Bluff? Evaluating LLMs on 2025 USA Math Olympiad](https://arxiv.org/abs/2503.21934). arXiv:2503.21934.
2. Balunović, M., Dekoninck, J., Petrov, I., Jovanović, N., & Vechev, M. (2025). [MathArena: Evaluating LLMs on Uncontaminated Math Competitions](https://arxiv.org/abs/2505.23281). arXiv:2505.23281.
3. Lu, P., Sheng, J., Lyu, L., et al. (2025). [Solving Inequality Proofs with Large Language Models](https://arxiv.org/abs/2506.07927). arXiv:2506.07927.
4. Dekoninck, J., Petrov, I., Minchev, K., et al. (2025). [The Open Proof Corpus: A Large-Scale Study of LLM-Generated Mathematical Proofs](https://arxiv.org/abs/2506.21621). arXiv:2506.21621.
5. Chen, Z., Qin, C., & Shu, Y. (2025). [RIMO: An Easy-to-Evaluate, Hard-to-Solve Olympiad Benchmark for Advanced Mathematical Reasoning](https://arxiv.org/abs/2509.07711). arXiv:2509.07711.
6. Mahdavi, H., Mahdavinia, P., Malek, S., et al. (2025). [RefGrader: Automated Grading of Mathematical Competition Proofs using Agentic Workflows](https://arxiv.org/abs/2510.09021). arXiv:2510.09021.
7. Ma, W., Cojocaru, A., Kolhe, N., et al. (2025). [Reliable Fine-Grained Evaluation of Natural Language Math Proofs](https://arxiv.org/abs/2510.13888). arXiv:2510.13888.
8. Pandit, S., Xu, A., Nguyen, X.-P., et al. (2025). [Hard2Verify: A Step-Level Verification Benchmark for Open-Ended Frontier Math](https://arxiv.org/abs/2510.13744). arXiv:2510.13744.
9. Luong, T., Hwang, D., Nguyen, H. H., et al. (2025). [Towards Robust Mathematical Reasoning](https://arxiv.org/abs/2511.01846). arXiv:2511.01846.
10. Mahdavi, S., Kisacanin, B., Toshniwal, S., et al. (2025). [Scaling Generative Verifiers For Natural Language Mathematical Proof Verification And Selection](https://arxiv.org/abs/2511.13027). arXiv:2511.13027.
11. Shao, Z., Luo, Y., Lu, C., et al. (2025). [DeepSeekMath-V2: Towards Self-Verifiable Mathematical Reasoning](https://arxiv.org/abs/2511.22570). arXiv:2511.22570.
12. Le Duc, H., & Liberti, L. (2025). [Mathematics with large language models as provers and verifiers](https://arxiv.org/abs/2510.12829). arXiv:2510.12829.
13. Yang, H., Wang, Z., Kang, S., et al. (2026). [ProofVerifier: A Scalable, Diversity-Driven Framework for Natural-Language Proof Verification](https://arxiv.org/abs/2602.02377). arXiv:2602.02377.
14. Naik, A., Shabadi, G., Alur, R., & Naik, M. (2026). [Do We Need Frontier Models to Verify Mathematical Proofs?](https://arxiv.org/abs/2604.02450). arXiv:2604.02450.
15. LM-Provers, Qu, Y., Setlur, A., et al. (2026). [QED-Nano: Teaching a Tiny Model to Prove Hard Theorems](https://arxiv.org/abs/2604.04898). arXiv:2604.04898.
16. Barkallah, S., Bailey, L., Wen, K., Abouzaid, M., & Ma, T. (2026). [Pseudo-Formalization for Automatic Proof Verification](https://arxiv.org/abs/2605.20531). arXiv:2605.20531.
17. Grayzel, B. (2026). [Cost-Effective Automated Judging of Natural-Language Mathematical Proofs](https://arxiv.org/abs/2608.00004). arXiv:2608.00004.
18. Zhang, S., Zhang, H., Luo, Y., et al. (2026). [ComBench: A Benchmark for Rigorous Proof Reasoning and Constructive Realization in Olympiad-Level Combinatorics](https://arxiv.org/abs/2606.10479). arXiv:2606.10479.
19. Chen, J., Zhang, X., Zhang, S., et al. (2026). [MaxProof: Scaling Mathematical Proof with Generative-Verifier RL and Population-Level Test-Time Scaling](https://arxiv.org/abs/2606.13473). arXiv:2606.13473.
20. Kong, L., Wu, Z., Gu, Y., et al. (2026). [AdvancedMathBench: A Benchmark Suite for Advanced Mathematical Proof Generation and Verification](https://arxiv.org/abs/2607.11849). arXiv:2607.11849.
21. Wang, Z., Dai, Q., Wu, Y., & Wen, Z. (2026). [FaithSieve: Fine-Grained Evaluation of Math Proofs with Faithful Formal Evidence](https://arxiv.org/abs/2608.26310). arXiv:2608.26310.
22. Moshkov, I., Ge, S., Armstrong, G., et al. (2026). [An Open Recipe for IMO Gold: Training Nemotron for Olympiad Mathematics](https://arxiv.org/abs/2609.10712). arXiv:2609.10712.
23. Lafuente-Mercado, R., Rahman, S., Shen, J., et al. (2026). [LeanPRM: Lean-Grounded Process Supervision for Natural Language Proof Verification](https://arxiv.org/abs/2610.17697). arXiv:2610.17697.
24. Ospanov, A., Feng, Z., Ding, D., et al. (2026). [Can LLMs Reliably Grade Olympiad Proofs? A Study of Mathematical Verification with LLMs](https://arxiv.org/abs/2610.36767). arXiv:2610.36767.
25. Sorani, A., Narayanan, A., Shalyt, M., et al. (2026). [Ramanujan Challenge Results: AI-Assisted Evaluation Pipeline for Multi-Format Proofs](https://arxiv.org/abs/2610.40551). arXiv:2610.40551.
