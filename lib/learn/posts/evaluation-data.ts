import type { Article } from '../types';

export const evaluationData: Article = {
  slug: 'evaluation-datasets-contamination',
  title: 'Why private evaluation data is worth more than training data',
  shortTitle: 'Evals and contamination',
  description:
    'Public benchmarks leak into training sets, and once a model has seen the test, the score stops meaning much. Why held-out, real-world evaluation data has become so valuable to AI labs.',
  dek: 'Once a model has seen the test, the score stops telling you much. That is why labs pay so much for tests nobody has seen.',
  category: 'Training data',
  readMinutes: 7,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
Every lab wants to know whether its new model is actually better than the last one. The standard way to find out is to run it against a benchmark: a fixed set of tasks with known answers. The model scores 78 percent, the previous one scored 71, progress.

Except it is often not that simple, because of a problem called contamination.

## What contamination is

Large models are trained on enormous amounts of text from the web. Public benchmarks are published on the web. Their questions get discussed on forums, quoted in papers, copied into tutorials and sometimes posted with the answers attached.

So there is a real chance the model has already seen the test during training. When it scores well, you cannot be sure whether it learned the skill or memorized the answers. That is contamination, and it makes benchmark scores much harder to trust.

Labs work hard to filter benchmarks out of training data, but text on the web is copied and paraphrased in so many ways that complete filtering is close to impossible.

## Why it matters more now

Three trends make contamination a bigger problem than it used to be.

**Training sets keep growing.** The more of the web a model is trained on, the more likely any given public benchmark appears somewhere in it.

**Benchmarks saturate fast.** Popular benchmarks get "solved" within a year or two of release, and new ones are needed constantly.

**The stakes are higher.** Labs, customers and regulators increasingly make real decisions based on how models perform. A misleading score can lead to deploying a model that is not ready.

## What makes evaluation data valuable

### It has never been public

The single most important property. An evaluation set drawn from material that has never been on the open web cannot have leaked into training data. Scores on it mean what they say.

### It reflects real work

Many benchmarks test puzzles, trivia or academic problems. Increasingly, labs want to know whether a model can do actual jobs: process a claim, reconcile an account, respond to a difficult customer, plan a maintenance schedule. Evaluation data drawn from real business workflows answers that question much more directly.

### It has ground truth

A good evaluation needs a reliable answer key. With real operational records, the ground truth is often what actually happened: what the professional did, whether the ticket was resolved, whether the invoice was paid, whether the shipment arrived on time.

### It is held out

Evaluation data is only useful as long as it stays out of training. That means strict controls on who sees it, and a license that keeps it out of training pipelines.

## Why it can be worth more than training data

This sounds backwards at first. Training data is what makes a model smarter; evaluation data just measures it. Why pay more for the ruler than the lumber?

Because without a trustworthy ruler, you cannot tell whether any of the rest of your spending is working. A lab might spend enormous sums on compute and training data. If its evaluations are contaminated, it has no reliable way to know which of those investments paid off. A clean, realistic evaluation set is what makes every other decision legible.

Evaluation sets are also used up in a way training data is not. Once an eval has been run against many models and discussed publicly, it starts to lose its value. Labs need a steady supply of fresh, private tests.

## Where operational data fits

Real business records make unusually good evaluation material:

- They are private by nature, sitting inside companies rather than on the web.
- They describe actual tasks with actual outcomes.
- They cover domains that public benchmarks barely touch.
- They come with the messy context (incomplete information, conflicting instructions, changing requirements) that real deployments involve.

A de-identified set of accounts payable disputes, along with how each was resolved, is a far better test of whether a model can handle accounts payable than any trivia benchmark.

## What good eval sourcing looks like

- **Provenance:** documented, licensed origin for every item.
- **Isolation:** eval material kept strictly separate from anything licensed for training.
- **De-identification:** identifiers removed before anyone downstream sees it. See [how anonymization works](/learn/anonymizing-data-for-ai-training).
- **Clear scoring:** rubrics or verifiable outcomes, ideally checked by people who know the domain.
- **Freshness:** a pipeline for new evaluations as old ones age out.

> A benchmark the model has already seen tells you about its memory, not its ability.

## How Anthroly helps

We build held-out evaluation sets from licensed, de-identified US business records that have never been public, scored against what professionals actually did. Eval material is kept separate from training supply, and every item has documented provenance. If your team needs uncontaminated, real-work evaluations, [request a sample pack](/contact?side=lab). For the training side of the same pipeline, read [RL environments explained](/learn/rl-environments-explained).
`,
  faq: [
    {
      question: 'What is benchmark contamination?',
      answer:
        'When a model has seen benchmark questions or answers during training, usually because the benchmark was published online. Contaminated scores may reflect memorization rather than real ability.',
    },
    {
      question: 'What is a held-out evaluation set?',
      answer:
        'A set of test tasks kept strictly separate from training data so that it can give an unbiased measure of how well a model performs on material it has never seen.',
    },
  ],
};
