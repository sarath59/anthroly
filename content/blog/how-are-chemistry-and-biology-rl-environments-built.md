---
title: "How Are Chemistry and Biology RL Environments Built? Molecular Verifiers, Expert References, and Answer-Key Errors"
description: "Science is the next frontier for RL with verifiable rewards, but chemistry and biology checks are harder to build than math or code. Here is how ether0, LAB-Bench, ChemBench, GPQA and cross-domain generative verifiers construct rewards, why a plausibility filter was essential to stop reward hacking, what the 29% Humanity's Last Exam chemistry and biology audit means for training data, and a checklist for a training-grade science environment."
tags:
  - rl-environments
  - scientific-reasoning
  - verifiers
  - reward-design
  - data-quality
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-29T12:40:00.000Z'
updatedAt: '2026-10-29T12:40:00.000Z'
faq:
  - question: "What is a chemistry or biology RL environment?"
    answer: "It is a set of scientific problems, a reference or oracle that defines success, and a reward function that scores the model's answer. In chemistry the answer is often a molecule written as a SMILES string, checked with cheminformatics code (RDKit), a trained property predictor, or a reaction-prediction model. In biology the answer is more often a choice, a sequence or a short free-form statement checked against an expert-written reference, sometimes by a model-based verifier."
  - question: "How was ether0 trained?"
    answer: "ether0 (Narayanan et al., FutureHouse, 2025) is a 24B model based on Mistral-Small-24B, trained with reinforcement learning on 640,730 experimentally grounded chemistry problems spanning 18 task types and 375 subtasks. The pipeline combined SFT on reasoning traces, task-specialist GRPO runs, distillation of 186,010 specialist sequences into a generalist, all-task GRPO on 384 H100s for four days, and a safety-alignment stage. It beat frontier models and the four contracted chemists in the study on open-answer molecular design tasks."
  - question: "What reward hacks show up in chemistry RL?"
    answer: "Molecules that satisfy the letter of a constraint but are not chemically sensible. The ether0 authors report that hand-built rules, ML models and scores such as QED were susceptible to hacks like inserting peroxides to meet an oxygen count or hydrazines to raise solubility. They added a conservative 'reasonable molecule' check that only accepts molecules whose rings and local atom environments appear in real, synthesized molecules, and found it essential."
  - question: "Can a model-based verifier replace a rule-based one in science domains?"
    answer: "Often, if an expert-written reference answer exists. Su et al. (2025) found near-perfect agreement (Cohen's kappa 0.81 to 1.00) between Qwen2.5-72B and GPT-4o on binary correctness judgments across medicine, chemistry, psychology, economics and education when references were available, and a distilled 7B generative verifier beat rule-based matching (63.0% versus 58.5% average with RLOO on math). Without a reference, verification becomes as hard as finding the first error in the response."
  - question: "How accurate are expert-level science benchmarks?"
    answer: "Less accurate than their difficulty suggests. FutureHouse audited 321 text-only chemistry and biology questions from Humanity's Last Exam and estimated that 29% plus or minus 3.7% had answers directly contradicted by peer-reviewed literature. HLE's own follow-up review found an expert disagreement rate of about 18% on a biology, chemistry and health subset, rising to 25% if a single dissenting reviewer is enough to flag a question."
  - question: "Do frontier models already beat human scientists?"
    answer: "On some narrow measures. ChemBench (Mirza et al., 2024) found the best models outperformed the best of 19 surveyed chemists on average, while still scoring 22% on NMR signal counting (o1) and performing near random on judging medicinal chemists' compound preferences. On LAB-Bench, PhD-level biology researchers greatly outperformed models overall in accuracy and precision. The picture depends heavily on which tasks are measured."
  - question: "How does Anthroly help build science RL environments?"
    answer: "Anthroly's PhD chemists, biologists and clinicians write problems with defensible reference answers, audit existing answer keys against the literature, design plausibility checks and near-miss distractors, and red-team verifiers for chemically or biologically nonsensical outputs. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**After math and code, science is where reinforcement learning with verifiable rewards is heading next. The appeal is obvious: many scientific problems are hard to solve and comparatively easy to check, like designing a molecule with a target solubility, which is difficult, versus predicting the solubility of a given molecule, which is routine. But "easy to check" hides most of the engineering. A chemistry checker can be fooled by molecules no chemist would draw, and a biology reference answer can simply be wrong. This post walks through how the main chemistry and biology environments and benchmarks are built, what their authors learned about rewards and answer keys, and what a training-grade science environment needs.**

## The short answer

A chemistry or biology RL environment has four parts: **(1)** problems grounded in real experimental data or literature; **(2)** a reference, which may be an exact answer, a set of acceptable answers, an experimentally determined option among distractors, or an expert-written free-form answer; **(3)** a verifier, which can be deterministic code (RDKit), a trained surrogate (a solubility or reaction-prediction model), a lookup (a catalog of purchasable reagents), or an LLM judge; and **(4)** plausibility filters that reject outputs that pass the verifier but are scientifically absurd. FutureHouse's ether0 showed that this works: a 24B model trained on 640,730 such problems beat frontier models and contracted chemists on open-answer molecular design. It also showed that the plausibility filter was essential, because every simpler check was reward-hacked. The weakest link is usually the reference: an audit of Humanity's Last Exam estimated that 29% of its text-only chemistry and biology answers conflict with published evidence.

## What do the main science environments look like?

| Resource | What it contains | How answers are checked | Notable finding |
|---|---|---|---|
| ether0 tasks (Narayanan et al., 2025) | 640,730 chemistry problems, 18 task types, 375 subtasks, built only from synthesized molecules (ChEMBL, COCONUT, ORD and others) | RDKit code, ML property and reaction models, a purchasability Bloom filter, multiple-choice string match | Plausibility check needed to stop reward hacks |
| ChemBench (Mirza et al., 2024) | 2,788 question-answer pairs, 1,039 written by hand and 1,749 generated semi-automatically | Exact match and parsed answers; every question reviewed by at least two scientists plus the curator | Best models beat the best of 19 chemists on average, yet failed basic structure reasoning |
| LAB-Bench (Laurent et al., 2024) | Over 2,400 multiple-choice biology research questions: literature, figures, tables, databases, protocols, DNA and protein sequences | Multiple choice with an "insufficient information" option; scored on accuracy, precision and coverage | Human PhD researchers greatly outperformed models overall |
| GPQA (Rein et al., 2023) | 448 expert-written questions in biology, physics and chemistry | Multiple choice | Experts 65% (74% discounting clear mistakes), skilled non-experts 34% with over 30 minutes of web access |
| Humanity's Last Exam (Phan et al., 2025) | 2,500 questions across over a hundred subjects, accepted only if frontier models failed them | Exact match or multiple choice | Expert disagreement rate estimated at 15.4% overall, about 18% on a bio/chem/health subset |

The table hides a split that matters for RL. The first two rows are about **open-answer** problems where the model produces an object (a molecule, a reaction) and code checks it. The last three are mostly **closed-answer** benchmarks. Closed answers are easy to grade but give the policy a 1-in-k chance of a free reward on every guess and are easy to memorize. The ether0 authors note that their largest gains over other models came on open-answer tasks, and they hypothesize two reasons: there were simply more open-answer problems, and many have non-unique answers, which allows exploration "without memorization of the answer."

## How does ether0 turn chemistry into a reward?

ether0 is the most complete public example of a science RL environment, and its reward functions are open source. Each task pairs a SMILES-based question with a checker:

- **IUPAC name to structure, reaction prediction, molecular caption:** exact molecule match via RDKit canonicalization.
- **Molecular formula, functional group, SMILES completion:** any molecule that satisfies the constraints passes, verified with RDKit (and exmol for functional groups). Many answers are correct.
- **Solubility editing:** change log S in the requested direction, scored by a trained solubility model (KDESol), with subtasks that also require keeping a scaffold or specific groups.
- **Structure elucidation:** propose the molecule from an organism given its formula. Because the problem is underdetermined, any answer with ECFP4 Tanimoto similarity of at least 0.7 to the ground truth counts.
- **Retrosynthesis:** propose a single-step reaction whose reactants are all purchasable (checked against manufacturer catalogs in a Bloom filter) and whose product, as predicted by the Molecular Transformer, matches the target.
- **Property questions without a reliable oracle** (blood-brain barrier permeability, receptor binding, pKa, LD50, scent and others) are posed as multiple choice, where the correct option is the experimentally measured one.

Written as a reward, the open-answer constraint tasks look like this:

$$
R(m) = \mathbb{1}\left[\text{valid}(m)\right] \cdot \mathbb{1}\left[\text{constraints}(m)\right] \cdot \mathbb{1}\left[\text{reasonable}(m)\right]
$$

The third factor is the interesting one. In the authors' words, they "experimented with hand-constructed rules, machine learning models, and scores like QED" and "found them susceptible to reward hacks such as inserting peroxides to satisfy oxygen counts, or hydrazines to increase solubility." Their fix was conservative and data-driven: cut every molecule in the source data into rings and radius-2 atom environments, store them in Bloom filters, and accept a proposed molecule only if all of its rings and environments have been seen in a real, synthesized compound. The same check runs at evaluation time and rejects many otherwise-valid answers.

This is the chemistry version of a lesson that recurs in every verifiable domain: the verifier checks the property you wrote down, and the policy finds the cheapest object with that property. In math the cheap object is a formatting trick. In chemistry it is a molecule that would never survive a bench, a reviewer or a shelf.

A minimal sketch of the checker structure, assuming RDKit is available:

```python
from rdkit import Chem
from rdkit.Chem.rdMolDescriptors import CalcMolFormula

def reward_formula_task(smiles: str, target_formula: str, is_reasonable) -> float:
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:                       # invalid SMILES or valence
        return 0.0
    if CalcMolFormula(mol) != target_formula:
        return 0.0
    if not is_reasonable(mol):            # rings and local environments seen in real compounds
        return 0.0
    return 1.0
```

The `is_reasonable` function is where the domain knowledge lives. A rule written by a generalist ("no more than two heteroatoms in a row") will block some hacks and miss others. A filter built from real synthesized molecules encodes what chemists have actually made.

## Where do surrogate verifiers break?

Two of ether0's verifiers are themselves models: KDESol for solubility and the Molecular Transformer for retrosynthesis. A learned verifier has its own error distribution, and RL will search for regions where it is wrong. The ether0 paper is candid about this: it lists evaluating predicted reactions with the Molecular Transformer as a limitation. For a frontier-lab environment, a surrogate verifier needs the same scrutiny as a reward model:

- **Measure its error on held-out experimental data**, especially near the decision boundary the task cares about (for example, molecules with small predicted log S changes).
- **Restrict the input distribution** with plausibility and applicability-domain checks so the policy cannot steer into regions where the surrogate extrapolates.
- **Audit top-reward samples by hand.** Ask a chemist whether the highest-scoring molecules in each batch are believable. This is cheap relative to a training run and catches drift early.

There is a quantitative reason this matters. If a binary verifier has false-positive rate $\alpha$ and false-negative rate $\beta$, then the expected reward is $1 - \beta$ for a correct answer and $\alpha$ for an incorrect one, so the learning signal separating them is

$$
\Delta = (1 - \beta) - \alpha = 1 - \alpha - \beta .
$$

The trouble is that $\alpha$ is not fixed. As the policy optimizes, it concentrates probability on outputs the verifier accepts, and the conditional false-positive rate among high-reward samples rises even if the verifier's average error on a random test set is small. That is why the peroxide and hydrazine hacks only appeared under optimization.

## What about biology, where answers are rarely SMILES?

Biology has fewer clean string representations and more questions whose answers live in papers, protocols and sequences. LAB-Bench shows how to build such tasks, and its construction choices transfer directly to RL:

- **Programmatic generation where the answer is computable.** Sequence questions (SeqQA) and database questions (DbQA) were generated largely by code, so the reference is correct by construction.
- **Expert writing where it is not.** Literature, supplementary data, figure, table, protocol and cloning questions were written manually by the authors and contracted biology experts. The authors note that experts were more efficient at writing hard figure and table questions when given model-generated prototype questions as inspiration, because models "often suggested nonsensical questions or answers" that, once revised, were hard for models.
- **Deliberately broken protocols.** ProtocolQA takes published protocols, introduces errors by modifying or omitting steps, describes the resulting outcome, and asks what to fix. That is a template for generating verifiable debugging tasks from real procedures.
- **An explicit abstain option.** Every question includes "insufficient information to answer," and models are scored on precision (correct out of attempted) as well as accuracy and coverage. In RL, this makes abstention a legitimate action rather than a guess.

For free-form biology and medicine, the strongest public evidence comes from Su et al. (2025). They found that when an expert-written reference exists, LLM verifiers agree with each other almost perfectly on binary correctness (Cohen's kappa between 0.81 and 1.00 for Qwen2.5-72B versus GPT-4o) across medicine, chemistry, psychology, economics and education. Only 45.4% of their multi-domain exam questions had answers short enough for rule-based matching, versus 60.3% for math. A 7B generative verifier distilled from a larger teacher outperformed rule-based rewards (63.0% versus 58.5% average with RLOO), and rule-based rewards fluctuated and eventually degraded as training data scaled while the model-based reward kept improving. The key qualifier is in the premise: the agreement depends on having a good reference. Without one, verification is as hard as locating the first error in the response.

## How wrong are expert-level answer keys?

This is the part teams underestimate. Humanity's Last Exam accepted questions only if frontier models failed them, and its reviewer instructions allowed reviewers not to fully verify a rationale if it would take more than about five minutes. FutureHouse ran its literature agent over the 321 text-only chemistry and biology/health questions, then had independent experts review 150 of the outputs. They estimated that **29% plus or minus 3.7% (95% CI)** of the answers were directly contradicted by peer-reviewed literature. HLE's team then ran its own three-expert review of a biology, chemistry and health subset and found an expert disagreement rate of about **18%**, rising to **25%** if one dissenting reviewer is enough to flag a question. FutureHouse released a validated "HLE Bio/Chem Gold" subset on Hugging Face.

GPQA reports a related number from the other direction: experts with or pursuing PhDs reached 65% accuracy, and 74% after discounting clear mistakes they acknowledged in retrospect. Even carefully built expert sets carry several percent of label noise.

For RL, label noise in the reference is worse than verifier noise because it is systematic. If a fraction $q$ of training references are wrong, a policy that always gives the scientifically correct answer earns at most $1 - q$, and a policy that learns the reference author's misconceptions can earn more. An adversarial selection rule ("keep only questions models fail") makes this worse, because a question that models fail is disproportionately likely to be one whose reference is wrong. Any pipeline that filters for model failure should route the survivors to independent expert verification, not just a quick plausibility glance.

## What does the evidence say about models versus scientists?

The comparisons are informative mainly for what they say about task design:

- **ChemBench:** the best models outperformed the best of 19 chemists on average, and many models outperformed the average human. Yet o1 answered 22% of NMR signal-count questions correctly, a task requiring reasoning about molecular symmetry from SMILES, and models performed near random when asked which of two compounds a medicinal chemist would prefer. Models were also often overconfident.
- **ether0:** four contracted chemists with only ChemDraw averaged 0% on retrosynthesis and 5% on solubility editing on the test set, tasks where the trained model was far stronger. Those are tasks that depend on tools and databases a human would normally use, so the comparison measures unaided recall as much as skill.
- **LAB-Bench:** PhD-level biology researchers "greatly outperformed" models overall, with models closest on table questions and some sequence subtasks.

The takeaway for environment builders is that headline "superhuman" results usually come from knowledge-recall tasks, while structure reasoning, experimental judgment and tool-heavy workflows remain hard. Those are exactly the tasks where verifiers are hardest to build and expert references most valuable.

## A checklist for a training-grade science environment

1. **Ground every problem in experimental or literature evidence.** ether0 used only synthesized molecules and measured properties. Avoid hypothetical molecules and model-generated answer keys.
2. **Prefer open-answer tasks with constraint checks** over multiple choice for training. Keep multiple choice for properties without a reliable oracle, and randomize and diversify distractors.
3. **Add a plausibility filter built from real data**, not hand rules. Test it adversarially by trying to hack it yourself before the policy does.
4. **Validate surrogate verifiers** on held-out experimental data, restrict them to their applicability domain, and read top-reward outputs every few hundred steps.
5. **Audit the reference set independently.** Use a literature-search pass plus at least two independent domain experts for anything adversarially selected. Budget more than five minutes per question.
6. **Make abstention a scored action.** Include an "insufficient information" option or abstain reward so the policy is not forced to guess on underdetermined problems.
7. **Use model-based verifiers only with expert references**, and measure their agreement with experts on a sample in each subdomain.
8. **Hold out scaffolds, organisms and protocols**, not just questions, so the evaluation measures generalization rather than recall of a family of molecules.
9. **Watch for capability regressions.** ether0's authors note that intensive RL reduced the base model's general instruction-following and multi-turn chat. Track general evals alongside domain rewards.

## How Anthroly can help

The common thread is that science RL works when the checks encode real expertise: what a reasonable molecule looks like, which literature answer is correct, which protocol step would actually fail. Anthroly provides that layer. Our PhD chemists, biologists and clinicians write problems with defensible reference answers, audit existing answer keys against the literature, design plausibility checks and near-miss distractors, label abstention cases, and red-team verifiers by trying to produce outputs that pass the checker but fail the science. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are extending RL into chemistry, biology or medicine and want a second opinion on your verifiers or answer keys, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can review a sample together.

## Related reading

- [How reliable are RLVR verifiers?](/blog/how-reliable-are-rlvr-verifiers)
- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [How are expert-written benchmarks built?](/blog/how-expert-written-benchmarks-are-built)
- [How are theorem-proving RL environments built?](/blog/how-are-theorem-proving-rl-environments-built)
- [Can reinforcement learning reduce LLM hallucinations?](/blog/can-reinforcement-learning-reduce-llm-hallucinations)
- [How do you quality-control expert data labeling?](/blog/how-to-quality-control-expert-data-labeling)

---

## References

1. Narayanan, S. M., et al. (2025). [Training a Scientific Reasoning Model for Chemistry](https://arxiv.org/abs/2506.17238). arXiv:2506.17238. NeurIPS 2025.
2. Mirza, A., et al. (2024). [Are large language models superhuman chemists?](https://arxiv.org/abs/2404.01475) arXiv:2404.01475.
3. Laurent, J. M., et al. (2024). [LAB-Bench: Measuring Capabilities of Language Models for Biology Research](https://arxiv.org/abs/2407.10362). arXiv:2407.10362.
4. Rein, D., et al. (2023). [GPQA: A Graduate-Level Google-Proof Q&A Benchmark](https://arxiv.org/abs/2311.12022). arXiv:2311.12022.
5. Phan, L., et al. (2025). [Humanity's Last Exam](https://arxiv.org/abs/2501.14249). arXiv:2501.14249.
6. Skarlinski, M., Laurent, J., Bou, A., and White, A. (2025). [About 30% of Humanity's Last Exam chemistry/biology answers are likely wrong](https://www.futurehouse.org/research/hle-exam). FutureHouse. Validated subset: [futurehouse/hle-gold-bio-chem](https://huggingface.co/datasets/futurehouse/hle-gold-bio-chem).
7. Su, Y., et al. (2025). [Crossing the Reward Bridge: Expanding RL with Verifiable Rewards Across Diverse Domains](https://arxiv.org/abs/2503.23829). arXiv:2503.23829.
