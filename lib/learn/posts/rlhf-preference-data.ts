import type { Article } from '../types';

export const rlhfPreferenceData: Article = {
  slug: 'rlhf-preference-data',
  title: 'RLHF and preference data, in plain English',
  shortTitle: 'RLHF and preference data',
  description:
    'A clear explanation of reinforcement learning from human feedback, what preference data is, how it differs from SFT data, and why domain expertise now matters more than volume.',
  dek: "How models learn taste, why \"which answer is better?\" turned out to be such a powerful question, and why the people answering it matter so much.",
  category: 'Training data',
  readMinutes: 8,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
A model that has read most of the internet knows a great deal, but it does not know what you want. It might answer a medical question accurately and also bury the useful part under four paragraphs of caveats. It might write correct code in a style no engineer would merge. Knowing things and being helpful are different skills.

Reinforcement learning from human feedback, usually shortened to RLHF, is one of the main ways labs close that gap. Preference data is the raw material it runs on.

## The two-step idea behind RLHF

### Step one: collect human judgments

You show a person a prompt and two or more responses from the model, and ask a simple question: which is better? Sometimes they rank several responses, sometimes they rate them on a scale, sometimes they explain their reasoning. Each judgment becomes a data point.

That collection of judgments is preference data.

### Step two: train toward the preferences

Preference data is used, directly or through a separate model that learns to predict human judgments, to nudge the main model toward responses people prefer. Over many rounds the model learns, roughly speaking, what "better" looks like.

There are several technical variations, and the field moves quickly, but the core idea has stayed the same: humans compare outputs, and the model learns from the comparisons.

## Why comparison works so well

Asking a person to write a perfect answer from scratch is slow and expensive, and different people will write very different perfect answers. Asking them which of two answers is better is fast, and people are surprisingly consistent at it, even when they could not have written either answer themselves.

That asymmetry is the whole trick. It is much easier to recognize quality than to produce it, and RLHF makes use of that.

## Preference data vs. SFT data

These two get confused a lot, so it is worth separating them.

### Supervised fine-tuning (SFT) data

Examples of good behavior: a prompt and an ideal response, written or approved by a person. The model learns by imitation. SFT is good for teaching format, tone and basic task competence.

### Preference data

Comparisons between responses. The model learns which direction to move in, not just what to copy. Preference data is good for teaching judgment, especially where there is no single right answer.

Most training pipelines use both. SFT gets the model into roughly the right shape; preference training refines it.

## The shift from volume to expertise

Early preference data was mostly collected from generalist raters judging everyday responses. That got models a long way: they became more polite, more on-topic and easier to use.

As models get better, though, the comparisons get harder. Telling which of two responses is better at structuring a commercial lease, diagnosing a hydraulic fault or reconciling an intercompany account takes someone who has done that job. A generalist will often prefer the answer that *sounds* more confident over the one that is actually right.

So the frontier of preference data has moved toward domain experts: practicing lawyers, accountants, engineers, clinicians, dispatchers and adjusters, judging responses in their own field. Fewer comparisons, each worth far more.

## Where real operating records fit

Expert judgment is expensive to collect from scratch. But businesses already contain a great deal of it, recorded in the course of normal work:

- **Edits and revisions.** When a senior person rewrites a junior colleague's draft, the before-and-after is effectively a preference pair.
- **Code review.** A reviewer's requested changes, and the reasons behind them, express a preference about what good code looks like in that codebase.
- **Escalations.** When a manager overrides a frontline decision and explains why, that is expert judgment written down.
- **Approved vs. rejected proposals.** Which quotes, designs or plans went through and which did not, often with comments attached.

With care, these records can be turned into preference data grounded in how professionals actually judge quality in their field, rather than how a generalist rater imagines they might.

## What makes preference data good

- **Qualified raters.** The person judging should be able to tell the difference between plausible and correct.
- **Hard comparisons.** If one response is obviously better, the model learns little. The useful comparisons are the close ones.
- **Rationale.** A short explanation of *why* one response is better makes each comparison far more useful.
- **Consistency checks.** Multiple raters on a subset, to catch noise and disagreement.
- **Realistic prompts.** Prompts drawn from real work, not invented to be easy to judge.

## A note on what RLHF cannot do

Preference training shapes behavior; it does not add knowledge the model lacks. If a model has never seen how insurance subrogation actually works, no amount of preference data will teach it. That is why preference data is most powerful when combined with domain corpora and real-work examples, like the ones described in [what operational data is](/learn/what-is-operational-data).

> It is much easier to recognize quality than to produce it. RLHF is built on that asymmetry, and expertise is what makes the recognition worth anything.

## How Anthroly helps

For labs, we supply expert preference and SFT data grounded in real US business workflows, including judgments derived from licensed, de-identified records of how professionals actually revised, reviewed and approved work. If that is what your post-training team needs, [request a sample pack](/contact). To understand the practice-based side of post-training, read [RL environments explained](/learn/rl-environments-explained).
`,
  faq: [
    {
      question: 'What is preference data in AI?',
      answer:
        'Data recording which of two or more model responses a person judged better, often with a reason. It is used in RLHF and related methods to steer models toward preferred behavior.',
    },
    {
      question: 'What is the difference between RLHF and supervised fine-tuning?',
      answer:
        'Supervised fine-tuning teaches by imitation using examples of ideal responses. RLHF teaches by comparison, using human judgments about which responses are better.',
    },
  ],
};
