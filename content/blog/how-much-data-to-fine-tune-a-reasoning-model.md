---
title: "How Much Data Do You Need to Fine-Tune a Reasoning Model? What LIMA, s1, LIMO, and OpenThoughts Actually Show"
description: "Some papers get frontier-level math reasoning from 800 to 1,000 curated examples; others need 1.2 million. Both are right. A practitioner's reading of LIMA, s1, LIMO, Sky-T1 and OpenThoughts on when a small expert-curated SFT set is enough, when scale wins, and what to curate for."
tags:
  - sft
  - reasoning
  - data-curation
  - distillation
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-23T04:35:00.000Z'
updatedAt: '2026-10-23T04:35:00.000Z'
faq:
  - question: "How many examples do you need to fine-tune a reasoning model?"
    answer: "It depends on the base model. On a strong 32B instruct model, s1 (Muennighoff et al., 2025) used 1,000 curated examples and LIMO (Ye et al., 2025) about 800, both reaching strong competition-math results. LIMO reports that even 400 samples lifted AIME24 from 16.5 to 57.5. For a 7B model, OpenThoughts (Guha et al., 2025) kept improving up to 1.2M examples. Small sets elicit what the model already knows; larger sets are needed when the model has more to learn."
  - question: "Is data quality more important than quantity for reasoning SFT?"
    answer: "At small scale, yes. In s1, randomly chosen, longest-trace, or diversity-only selections of 1,000 examples were about 30% worse on AIME24 on average than the curated s1K, and training on the full 59K pool gave no substantial gain over the curated 1K. At larger scale, OpenThoughts found that quantity (including sampling 16 answers per question) drove significant gains, but the choice of teacher and question sources still mattered."
  - question: "Do reasoning traces need correct answers to be useful for SFT?"
    answer: "Less than you would expect. Li et al. (2025) found that training Qwen2.5-32B-Instruct on long chain-of-thought samples with incorrect final answers was only 3.2% worse than training on correct ones, while shuffling or deleting reasoning steps hurt much more. OpenThoughts likewise found answer filtering and verification gave no significant improvement. Structure matters most for SFT; correctness matters far more for RL rewards and evaluation."
  - question: "What makes a good question for a small reasoning SFT set?"
    answer: "Difficulty first. s1 selected for difficulty, diversity and quality together; LIMO filtered tens of millions of problems by measured difficulty (success rate over 32 attempts by a math model) and kept those that elicit long reasoning; OpenThoughts found filtering by LLM-judged difficulty or response length beat embedding-based filters, and that one or two high-quality question sources beat mixing many."
  - question: "Is the strongest model always the best teacher for distillation?"
    answer: "No. OpenThoughts reports that QwQ-32B was a better teacher than DeepSeek-R1 for its 7B student even though QwQ-32B scores lower on reasoning benchmarks. Teacher choice should be tested with small ablations rather than picked by leaderboard rank."
  - question: "How does Anthroly help with reasoning SFT data?"
    answer: "Anthroly's bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, writes and vets hard, verifiable questions in specialized domains, reviews reasoning traces for structural quality, and builds held-out evaluation sets, so small curated SFT sets cover what public data does not."
draft: false
---

**Two results from 2025 seem to contradict each other. s1 and LIMO fine-tuned a 32B model on roughly 1,000 and 800 carefully chosen examples and got strong competition-math reasoning. OpenThoughts ran more than 1,000 data experiments and found that its 7B model kept improving all the way to 1.2 million examples. Labs and startups deciding how to spend a data budget read these papers and draw opposite conclusions. They are not actually in conflict: they answer different questions, on different base models. This post reads them side by side and turns them into decisions about what to collect.**

## What did the "less is more" papers actually show?

The idea starts with [LIMA (Zhou et al., 2023)](https://arxiv.org/abs/2305.11206): a 65B LLaMa fine-tuned on only 1,000 curated prompt-response pairs, with no RL or preference modeling, produced responses that people judged equivalent to or better than GPT-4's in 43% of cases. The authors' reading was that almost all knowledge is learned in pretraining and instruction tuning mostly teaches format.

Reasoning-model versions of the same idea followed:

| Work | Base model | SFT examples | Headline result |
|---|---|---|---|
| [s1](https://arxiv.org/abs/2501.19393) (Muennighoff et al., 2025) | Qwen2.5-32B-Instruct | 1,000 (s1K), traces from Gemini Thinking | Exceeds o1-preview on competition math by up to 27% (MATH, AIME24); 26 minutes on 16 H100s |
| [LIMO](https://arxiv.org/abs/2502.03387) (Ye et al., 2025) | Qwen2.5-32B-Instruct | about 800 | 63.3% AIME24, 95.6% MATH500 |
| [Sky-T1 / Li et al. (2025)](https://arxiv.org/abs/2502.07374) | Qwen2.5-32B-Instruct | 17k long-CoT from DeepSeek-R1 | 56.7% AIME24 (+40.0), with full SFT or LoRA |
| [OpenThoughts3](https://arxiv.org/abs/2506.04178) (Guha et al., 2025) | Qwen2.5-7B-Instruct | 1.2M, traces from QwQ-32B | 53% AIME25, 51% LiveCodeBench, 54% GPQA Diamond |

Notice the first column. Every small-data result above is on the same strong 32B instruct model.

## Why does a curated 1,000 beat a random 1,000?

The s1 ablations are the clearest evidence that selection, not size, is what does the work at this scale. Starting from a 59K-question pool across 16 sources, the authors filtered for **quality, difficulty and diversity** together. Selecting 1,000 examples at random, by longest reasoning trace, or for maximum diversity alone each did **about 30% worse on AIME24 on average**. And training on the **full 59K pool gave no substantial gain** over the curated 1K.

LIMO's curation is similar in spirit and more aggressive. Starting from tens of millions of math problems, they filtered with a short-CoT math model, then sampled 32 attempts per remaining problem and used the success rate as a difficulty score. From 2,125 candidate questions they kept the highest-quality solution for each and took the top 800. Their scaling curve is the useful part:

- **400 samples** already moved AIME24 from 16.5 to 57.5 and MATH500 from 79.4 to 94.8.
- Returns flattened beyond 800: going to 1.2K added +0.9 on AIME24 and −0.2 on MATH500.
- The best result, at 2K samples (69.6 AIME24), was only marginally better than at 1.6K.

The authors frame this as the *LIMO hypothesis*: when the domain knowledge is already in the pretrained model, a small number of demonstrations acting as "cognitive templates" is enough to elicit sophisticated reasoning.

## Do the traces even need to be right?

[Li et al. (2025)](https://arxiv.org/abs/2502.07374) ran the experiment most data teams avoid. Fine-tuning Qwen2.5-32B-Instruct on 17k R1 traces, they perturbed either the *content* (random digits, deleted reasoning keywords, wrong final answers) or the *structure* (shuffled or deleted reasoning steps). Content perturbations barely mattered: training on samples with **incorrect answers was only 3.2% worse** than on correct ones. Structural perturbations that broke the logical flow hurt much more.

[OpenThoughts](https://arxiv.org/abs/2506.04178) found something compatible at scale: across many verification and answer-filtering methods, **none gave significant improvements**.

Read together, this is a strong signal about *what SFT is doing* on these models. It mostly teaches the shape of long reasoning: planning, checking, backtracking, the "Wait" and "Alternatively" moves. It teaches comparatively little new mathematics. That is good news for cheap distillation and a warning for anyone who thinks SFT is where correctness gets learned.

## So when does scale win?

OpenThoughts is the counterweight. Working at 7B, the team tested each stage of the pipeline across more than 1,000 controlled experiments and found:

- **Scale matters.** Sampling multiple answers per question increased a source's size by at least 16x, and the extra scale drove significant gains. OpenThinker3-7B beat DeepSeek-R1-Distill-Qwen-7B by 12.4 points on average across 12 tasks.
- **Fewer, better sources beat diversity.** Questions from the top one or two sources did better than mixing eight or sixteen.
- **Difficulty-aware filters win.** Filtering questions by LLM-judged difficulty or response length beat embedding or fastText-style filters borrowed from pretraining curation.
- **The best model is not the best teacher.** QwQ-32B was a stronger teacher than DeepSeek-R1, despite scoring lower on reasoning benchmarks.

A simple way to reconcile the two camps is to separate what the student must *learn* from what it must only *express*. Write the post-SFT score loosely as

$$
\text{score} \approx \underbrace{K_{\text{base}}}_{\text{knowledge already in the model}} \times \underbrace{f(n_{\text{format}})}_{\text{saturates fast}} \;+\; \underbrace{g(n_{\text{new}})}_{\text{grows slowly with data}}
$$

This is our interpretation, not a fitted law. On a strong 32B model, most of the gap to good reasoning is in the first term, which saturates after hundreds of good demonstrations: hence LIMO's plateau. On a 7B model, more of the target capability is genuinely missing, and only volume (plus a good teacher) moves the second term. The practical question is never "small or large?" but "how much of what I need is already in the base model?"

## How should you test which regime you are in?

Run a data-scaling ablation before buying or generating data at volume. It is cheap at these sizes:

```python
# Sketch: data-scaling ablation for reasoning SFT.
# train_sft and evaluate are your own pipeline functions.
import random

def scaling_curve(pool, sizes=(250, 500, 1000, 2000, 4000), seeds=(0, 1, 2),
                  select=None, evals=("aime", "domain_heldout")):
    """pool: list of (question, trace, answer). select: curation fn or None for random."""
    results = []
    for n in sizes:
        for s in seeds:
            random.seed(s)
            subset = select(pool, n, seed=s) if select else random.sample(pool, n)
            ckpt = train_sft(subset, seed=s)
            results.append({"n": n, "seed": s, **{e: evaluate(ckpt, e) for e in evals}})
    return results
```

Compare a curated selector against random at each size, and use several seeds, since a single AIME year has only 30 problems, so one problem moves the score by about 3.3 points (see [how many eval items do you need?](/blog/how-many-eval-items-do-you-need)). If the curated curve plateaus by about 1K and random catches up slowly, you are in the elicitation regime: spend on question quality and difficulty, not volume. If both curves are still climbing at your largest size, you are in the learning regime: spend on scale and teacher choice.

Always include a held-out, in-domain eval written independently of your training sources. Public math benchmarks overlap heavily with public training pools, and an SFT set curated toward AIME-style problems will look better on AIME than it is.

## What does this mean for expert-built data?

Three practical conclusions:

1. **For elicitation, the scarce input is hard questions, not traces.** Traces can be distilled; s1 and LIMO both did. What they could not generate was the right set of difficult, diverse, well-posed problems. In specialized domains (chemistry, law, finance, medicine) such questions mostly do not exist in public pools and have to be written by people who know the field.
2. **Correctness belongs in rewards and evals.** Since SFT tolerates wrong answers surprisingly well, the place where expert correctness pays off most is in RL verifiers, reference answers, and evaluation sets, where an error is amplified rather than averaged away. We cover how verifier mistakes compound in [how reliable are RLVR verifiers?](/blog/how-reliable-are-rlvr-verifiers).
3. **Do not over-learn "less is more".** The small-data results come from strong base models in math, where pretraining coverage is deep. For a smaller model, a new domain, or agentic tasks with tool use, expect to need far more data, including trajectories (see [how to collect training data for computer-use agents](/blog/how-to-collect-computer-use-agent-trajectory-data)).

## What teams get wrong

- **Copying a 1K recipe onto a 7B model.** The 1K results are on Qwen2.5-32B-Instruct. Measure your own curve.
- **Paying experts to write full traces when questions are the bottleneck.** For SFT elicitation, an expert-written hard question plus a distilled trace usually beats an expert-written trace for an easy question.
- **Filtering by embedding diversity.** Both s1 and OpenThoughts found difficulty-aware selection mattered more than diversity alone.
- **Picking the teacher by leaderboard.** Test two or three teachers on a small ablation.
- **Evaluating only on the benchmark you curated toward.** Hold out an independently written domain set.

## How Anthroly can help

The hardest input to a small, high-leverage SFT set is a pool of genuinely difficult, correct, well-posed questions in the domains you care about, together with held-out evals that were not written from the same sources. That takes domain experts.

Anthroly builds expert data and RL environments for AI labs. We have about 100–150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains. We write and vet hard questions with verified reference answers, review distilled traces for structural quality, build held-out domain evals, and turn the same questions into verifiable RL tasks when you move from SFT to RL.

If you're deciding whether to buy volume or curate a few thousand expert examples, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [Synthetic data vs expert human data: how much real data do you still need?](/blog/synthetic-data-vs-expert-human-data)
- [How reliable are verifiers in RLVR?](/blog/how-reliable-are-rlvr-verifiers)
- [Does RL with verifiable rewards teach models new reasoning?](/blog/does-rlvr-teach-new-reasoning)
- [How many eval items do you need?](/blog/how-many-eval-items-do-you-need)
- [How many expert labels does it take to fix noisy preference data?](/blog/how-many-expert-labels-fix-noisy-preference-data)
- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [Expert vs. crowd annotation](/research/compare/expert-vs-crowd-annotation)
- [How do you choose training prompts for RLVR? Pass-rate filtering and difficulty curricula](/blog/how-to-choose-prompts-for-rlvr-training)
- [Which agent trajectories should you fine-tune on? Outcome filtering, step masking, and failed runs](/blog/which-agent-trajectories-should-you-fine-tune-on)

---

## References

1. Zhou, C., Liu, P., Xu, P., Iyer, S., Sun, J., Mao, Y., Ma, X., Efrat, A., et al. (2023). [LIMA: Less Is More for Alignment](https://arxiv.org/abs/2305.11206). arXiv:2305.11206.

2. Muennighoff, N., Yang, Z., Shi, W., Li, X. L., Fei-Fei, L., Hajishirzi, H., Zettlemoyer, L., Liang, P., et al. (2025). [s1: Simple test-time scaling](https://arxiv.org/abs/2501.19393). arXiv:2501.19393.

3. Ye, Y., Huang, Z., Xiao, Y., Chern, E., Xia, S., & Liu, P. (2025). [LIMO: Less is More for Reasoning](https://arxiv.org/abs/2502.03387). arXiv:2502.03387.

4. Li, D., Cao, S., Griggs, T., Liu, S., Mo, X., Tang, E., Hegde, S., Hakhamaneshi, K., et al. (2025). [LLMs Can Easily Learn to Reason from Demonstrations: Structure, not content, is what matters!](https://arxiv.org/abs/2502.07374). arXiv:2502.07374.

5. Guha, E., Marten, R., Keh, S., Raoof, N., Smyrnis, G., Bansal, H., Nezhurina, M., Mercat, J., et al. (2025). [OpenThoughts: Data Recipes for Reasoning Models](https://arxiv.org/abs/2506.04178). arXiv:2506.04178.
