---
title: "Synthetic Data vs Expert Human Data for Post-Training: How Much Human Data Do You Still Need?"
description: "Model collapse shows that training on purely synthetic data degrades performance, but how much real human data is enough? This post covers accumulate vs replace workflows, why collapse hits weak skills first, where synthetic data reliably works, and a practical mixing framework with numbers from recent papers."
tags:
  - synthetic-data
  - model-collapse
  - expert-data
  - post-training
  - rl-environments
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-23T05:00:00.000Z'
updatedAt: '2026-10-23T05:00:00.000Z'
faq:
  - question: "Can synthetic data replace human data for LLM training?"
    answer: "Not entirely. Shumailov et al. (2024) showed in Nature that recursively training on synthetic data causes model collapse where distribution tails disappear. However, Gerstgrasser et al. (2024) proved that accumulating synthetic data alongside real data avoids collapse: the test error remains bounded even as the synthetic fraction approaches 100%. The key is never fully replacing the original human data."
  - question: "What is model collapse?"
    answer: "Model collapse is a degenerative process where generative models trained on their own outputs progressively lose information about the true data distribution. Tails of the distribution disappear first, learned variance shrinks, and outputs converge to repetitive, low-quality content. The term was introduced by Shumailov et al. (2024) in Nature."
  - question: "How much real data prevents model collapse?"
    answer: "Marchi et al. (2026) derived Fisher-Rao bounds showing the minimum human-to-synthetic data ratio depends on model dimension and temperature. Their analysis suggests the ratio must scale with the inverse of the minimum probability mass in the equilibrium distribution. Du et al. (2025) found empirically that models maintain performance within 3% of baseline with up to 20% synthetic data, with degradation accelerating beyond 30%."
  - question: "Where does synthetic data work well for post-training?"
    answer: "Synthetic data works reliably in verifiable domains where correctness can be checked automatically: math with answer verification, code with test suites, instruction-following with constraint checkers. AReaL-SEA (Gao et al., 2026) shows that synthetic data combined with executable per-instance verifiers can train tool-use agents to match frontier models on τ²-bench."
  - question: "Why does model collapse hit weak skills first?"
    answer: "Luo et al. (2026) term this 'polarization of competence': synthetic training reinforces already-strong capabilities while further degrading weak ones. This happens because synthetic generation oversamples patterns the model already performs well on, amplifying coverage gaps in long-tail skills."
  - question: "How does Anthroly help with synthetic data strategies?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, provides expert seed data for domains where synthetic generation fails, writes verification functions and graders to validate synthetic outputs, builds evaluation sets to measure collapse and capability retention, and designs the human data anchors that keep synthetic pipelines stable."
draft: false
---

**The intuition is simple: if you can generate unlimited training data from a language model, why pay for expensive human labels? The answer from the 2024–2026 literature is subtle. Train only on synthetic data for long enough and model performance degrades catastrophically—distribution tails vanish, outputs become repetitive, weak skills disappear. But mix synthetic data with human data correctly and you can scale far beyond what human annotation alone could provide. This post works through the math and the evidence: when synthetic data helps, when it hurts, and how much human data you actually need to keep things stable.**

## The model collapse result

[Shumailov et al. (2024)](https://www.nature.com/articles/s41586-024-07566-y) established in Nature that training generative models on their own outputs causes what they call *model collapse*: a degenerative feedback loop where models progressively lose information about the true underlying distribution. The effect is consistent across model classes—LLMs, VAEs, and Gaussian mixture models all exhibit it.

The mechanism has three components:

1. **Statistical approximation error.** Sampling from a learned distribution doesn't perfectly reproduce it; finite samples under-represent rare events.
2. **Functional expressivity error.** The model class may not perfectly capture the true distribution even with infinite data.
3. **Error compounding.** Each generation's errors become the next generation's training signal, amplifying distortions.

The observable pattern is that **distribution tails disappear first**. Rare but important behaviors—unusual phrasings, edge-case reasoning, minority viewpoints—get progressively filtered out. After enough generations, outputs converge toward the mode: repetitive, homogenized, and increasingly useless.

## Replace vs accumulate: the critical distinction

Not all synthetic data workflows collapse. [Gerstgrasser et al. (2024)](https://arxiv.org/abs/2404.01413) and [Kazdan et al. (2025)](https://arxiv.org/abs/2410.16713) proved that the distinction between *replace* and *accumulate* workflows is decisive:

| Workflow | What happens | Outcome |
|----------|-------------|---------|
| **Replace** | Each generation trains only on the previous generation's synthetic output; original data is discarded | Test error diverges; collapse is inevitable |
| **Accumulate** | Synthetic data accumulates alongside original human data; models train on everything | Test error remains bounded; collapse is avoided |

The mathematical intuition is straightforward. In the replace workflow, the fraction of real data is zero after iteration 1. In the accumulate workflow, the real data fraction declines as $1/(n+1)$ but never reaches zero. Gerstgrasser et al. prove that in linear regression, the replace workflow's test MSE grows linearly with iterations, while the accumulate workflow's test MSE converges to a finite limit regardless of the number of iterations.

They validated this empirically across three settings from Shumailov et al.'s original experiments: multivariate Gaussian estimation, kernel density estimation, and supervised fine-tuning of language models. In all three, replace collapsed while accumulate stayed stable.

Kazdan et al. extended this to a third workflow, **fixed-compute**, which reflects the reality that compute budgets don't scale with data accumulation:

$$
\text{accumulate-subsample: } \text{sample } k \text{ examples from accumulated pool each iteration}
$$

Their finding: fixed-compute degradation is **slower than replace but faster than pure accumulate**. Test loss typically plateaus rather than diverging, but at a higher level than the accumulate optimum. This middle-ground workflow is probably closest to what actually happens in practice.

## How much human data is enough?

[Marchi et al. (2026)](https://arxiv.org/abs/2609.18878) attack this question with information geometry. Prior work bounded the required human-to-synthetic ratio using Euclidean distance, but Euclidean bounds become vacuous in high dimensions—the distance between any two distributions approaches zero as dimension increases.

Marchi et al. work on the Fisher-Rao manifold instead, deriving contraction bounds that remain meaningful regardless of dimension. Their main result (Theorem 1) gives conditions under which the learned distribution converges to a neighborhood of the equilibrium:

$$
\mu \geq \max\left\{\frac{1 + T\eta_{\text{FR}}\kappa}{T\delta\kappa}, \frac{\eta + 2\eta_{\text{FR}}/\kappa}{\delta}\right\}
$$

where $\mu$ is the human-to-synthetic data ratio, $T$ is temperature, $\delta$ is the minimum probability mass in the human distribution, and $\eta_{\text{FR}}$ is the normalized inverse temperature at equilibrium.

The practical implication: **the required ratio scales with the inverse of the minimum token/outcome probability**. For distributions with rare but important events (long tails), you need more human data. For distributions concentrated on common patterns, less suffices.

[Du et al. (2025)](https://arxiv.org/abs/2510.05133) provide empirical calibration across model scales (410M–12B parameters) and tasks:

| Synthetic fraction | Effect on performance |
|--------------------|----------------------|
| 0–20% | Stable: within 3% of baseline across all scales |
| 20–30% | Scale-dependent: larger models (6.9B–12B) tolerate it; smaller models degrade |
| 30–50% | Significant degradation (8–15%) even for large models |
| >50% | Not tested systematically; extrapolation suggests accelerating collapse |

Two findings stand out:

1. **Calibration degrades before accuracy.** Expected Calibration Error increases 2–3 generations before task accuracy drops, providing an early warning signal.
2. **Task type matters.** Mathematical reasoning degrades fastest; commonsense reasoning is most robust. Code generation and factual retrieval fall in between.

## Why collapse hits weak skills first: the polarization of competence

[Luo et al. (2026)](https://arxiv.org/abs/2607.17043) diagnose *why* collapse manifests the way it does in instruction tuning. They use cognitive diagnostic models (the DINA model from educational testing) to decompose model capability into latent skills and track how those skills change across synthetic training iterations.

Their finding is striking: **collapse is not uniform degradation but polarization**. Synthetic training reinforces skills the model already performs well on while further degrading weak skills. Figure 1 in their paper shows Llama-3-8B-Instruct on GSM8K: after synthetic fine-tuning, strong skills (Data, Money & Finance) improve, while weak skills (Algebra, Time & Scheduling) get worse.

The mechanism is intuitive: unconstrained synthetic generation oversamples high-probability patterns—the skills the model is already good at. This creates a feedback loop where strong skills get more training signal while weak skills get less. The distribution becomes more concentrated around what the model already knows.

Their solution, KITE, addresses this with failure-guided data generation: extract which skills are weak, generate synthetic data targeting those specific weaknesses, and use boundary-aware uncertainty curation to select examples at the edge of the model's current competence. This reverses the polarization dynamic.

## Where synthetic data clearly works

Synthetic data has proven highly effective in specific settings. The common thread is **verifiability**: can you automatically check whether a synthetic example is correct?

### Math with answer verification

The distillation literature shows consistent success. [s1 (Muennighoff et al., 2025)](https://arxiv.org/abs/2501.19393), [LIMO (Ye et al., 2025)](https://arxiv.org/abs/2502.03387), and [OpenThoughts (Guha et al., 2025)](https://arxiv.org/abs/2506.04178) all use synthetic reasoning traces from teacher models, filtered by answer correctness. The key is that math answers can be checked—wrong traces can be discarded or weighted lower.

### Code with executable tests

Synthetic code generation works when you have test suites to validate outputs. The generator produces candidate solutions; tests filter out incorrect ones; training proceeds on verified examples. This is the model behind APIGen, TOUCAN, and other trajectory synthesis pipelines.

### Tool agents with per-instance verifiers

[AReaL-SEA (Gao et al., 2026)](https://arxiv.org/abs/2601.22607) demonstrates that synthetic multi-turn tool-use trajectories can train agents to match or exceed frontier models, provided each generated instance comes with an executable verification function. Their system achieves pass^1 of 73.0% on Airline and 98.3% on Telecom in τ²-bench using Qwen3-235B-A22B trained on fully synthetic data plus GRPO-style RL.

The critical insight: **synthetic data generation and verification must be coupled**. The verification functions aren't just for filtering—they become reward signals for RL training, allowing the policy to improve beyond what the synthetic data alone could teach.

### Where synthetic data reliably fails

The pattern is equally clear on the failure side:

**Frontier-level capability.** You can distill from a stronger model to a weaker one, but you cannot synthesize capabilities the teacher doesn't have. For frontier advancement, human data at the edge of current capability remains irreplaceable.

**Long-tail skills.** The polarization-of-competence problem means synthetic training actively hurts capabilities the model is weak on. Domain experts must seed these areas with human examples.

**Preference ground truth.** Synthetic preference labels (RLAIF) can approximate human preferences at scale, but calibration and audit require human validation. [Lee et al. (2023)](https://arxiv.org/abs/2309.00267) showed RLAIF matched RLHF on summarization and dialogue, but only after validating the AI judge against human labels.

**Grader calibration and evaluation sets.** Using synthetic data to evaluate synthetic training creates circular validation. Held-out human-labeled sets remain essential.

## A practical mixing framework

Combining the theory and empirics yields a decision framework:

### Step 1: Classify your target capability

| Capability type | Primary data source | Synthetic role |
|----------------|--------------------| --------------|
| Verifiable (math, code, constraints) | Synthetic with automated verification | Majority of data; scale aggressively |
| Long-tail / specialized | Expert human data | Seed data; anchor against collapse |
| Preference / style | Human preferences + AI labels | AI for scale, human for calibration |
| Frontier / novel | Expert human data | Cannot be synthesized |

### Step 2: Estimate the safe synthetic fraction

Based on Du et al.'s empirical results:

```python
def safe_synthetic_fraction(model_params_b, task_type):
    """Rough heuristic for maximum synthetic fraction before degradation."""
    base = 0.20  # universal safe zone
    scale_bonus = min(0.10, model_params_b / 120)  # larger models tolerate more
    task_penalty = {
        "math_reasoning": 0.05,
        "code_generation": 0.03,
        "factual_retrieval": 0.02,
        "reading_comprehension": 0.01,
        "commonsense": 0.00,
    }.get(task_type, 0.02)
    return base + scale_bonus - task_penalty
```

For a 7B model on math reasoning, this gives ~17%. For a 70B model on commonsense tasks, ~30%.

### Step 3: Design the human data anchor

The human data serves three functions:

1. **Preventing tail collapse.** Include examples of rare but important behaviors—edge cases, minority patterns, unusual phrasings.
2. **Seeding weak skills.** Following KITE's insight, identify capabilities the model struggles with and over-represent them in the human fraction.
3. **Calibrating verifiers.** Synthetic verifiers inherit model biases. Human labels on a held-out slice measure verifier reliability (see [how reliable are RLVR verifiers](/blog/how-reliable-are-rlvr-verifiers)).

### Step 4: Monitor for early collapse indicators

Du et al.'s finding that calibration degrades before accuracy gives a monitoring protocol:

1. Track Expected Calibration Error across training iterations.
2. Track per-skill pass rates if using cognitive diagnostics.
3. Flag when ECE increases by >10% or any skill drops by >20%.
4. Increase human data fraction or re-seed weak skills when flags trigger.

## What the field gets wrong

### Treating synthetic volume as a substitute for coverage

The LIMA and s1 results show that small amounts of well-curated data can match large amounts of uncurated data—but the coverage must be right. A million synthetic examples all sampling from the same high-probability regions provides less training signal than 1,000 examples carefully distributed across the capability space. See [how much data to fine-tune a reasoning model](/blog/how-much-data-to-fine-tune-a-reasoning-model) for the curation evidence.

### Ignoring the verification/generation coupling

Synthetic data pipelines that generate without verifying create training corpora with unknown error rates. The AReaL-SEA approach of co-generating verification functions with training instances is more work up front but yields cleaner training signal and enables RL on top of SFT.

### Skipping human validation slices

Even with automated verification, a slice of human labels on model outputs remains essential for measuring verifier reliability and overall pipeline health. This is the same principle as [annotator disagreement in preference data](/blog/annotator-disagreement-in-preference-data)—disagreement between humans and automated systems reveals where automation fails.

### Not calibrating to model scale

Du et al. show that scale provides protection: 12B models tolerate roughly twice the synthetic fraction as 410M models for equivalent degradation. A one-size-fits-all synthetic budget leaves small models vulnerable and large models under-utilized.

## How Anthroly can help

The hard problem in synthetic data isn't generation—it's verification, coverage, and anchoring. Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, provides:

- **Expert seed data** for domains where synthetic generation fails: specialized reasoning, edge cases, long-tail skills, novel capabilities.
- **Verification functions and graders** validated by domain experts, ensuring synthetic pipelines have reliable reward signals.
- **Held-out evaluation sets** to measure collapse and capability retention across training iterations.
- **Human data anchors** carefully distributed to prevent tail collapse and seed weak skills.

This is the same work that goes into [building training-grade RL environments](/blog/what-makes-a-training-grade-rl-environment) and [calibrating reward models](/blog/how-to-evaluate-a-reward-model).

If your synthetic pipeline is scaling but capabilities are plateauing or degrading, [book 15 minutes to discuss data anchoring and verification strategies](https://cal.com/sarath-kavuru-0uizws/15min).

---

## References

1. Shumailov, I., Shumaylov, Z., Zhao, Y., Papernot, N., Anderson, R., & Gal, Y. (2024). [AI models collapse when trained on recursively generated data](https://www.nature.com/articles/s41586-024-07566-y). *Nature*, 631, 755–759.

2. Gerstgrasser, M., Schaeffer, R., Dey, A., Rafailov, R., et al. (2024). [Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data](https://arxiv.org/abs/2404.01413). arXiv:2404.01413.

3. Kazdan, J., Schaeffer, R., Dey, A., et al. (2025). [Collapse or Thrive? Perils and Promises of Synthetic Data in a Self-Generating World](https://arxiv.org/abs/2410.16713). arXiv:2410.16713.

4. Luo, X., Huang, Y., Guo, K., He, P., Zou, C., Hua, T., & Zhang, X. (2026). [Learning from Synthetic Data without Model Collapse in Iterative Instruction Tuning](https://arxiv.org/abs/2607.17043). arXiv:2607.17043.

5. Marchi, M., Silvestre, J. P., Gharesifard, B., & Tabuada, P. (2026). [Preventing Model Collapse: A Fisher-Rao Perspective on the Dynamics of Training with Synthetic Data](https://arxiv.org/abs/2609.18878). arXiv:2609.18878.

6. Du, Y., Wu, G., Tang, G., Wang, W., & Fan, Q. (2025). [Characterizing Model Behavior Under Synthetic Data Training: An Empirical Study Across Scales and Mixing Ratios](https://arxiv.org/abs/2510.05133). arXiv:2510.05133.

7. Gao, J., Chen, J., He, C., Xu, S., Jin, D., & Wu, Y. (2026). [From Self-Evolving Synthetic Data to Verifiable-Reward RL: Post-Training Multi-turn Interactive Tool-Using Agents](https://arxiv.org/abs/2601.22607). arXiv:2601.22607.

8. Lee, H., Phatale, S., Mansoor, H., et al. (2023). [RLAIF vs. RLHF: Scaling Reinforcement Learning from Human Feedback with AI Feedback](https://arxiv.org/abs/2309.00267). arXiv:2309.00267.
