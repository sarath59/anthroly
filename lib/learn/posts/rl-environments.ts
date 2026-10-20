import type { Article } from '../types';

export const rlEnvironments: Article = {
  slug: 'rl-environments-explained',
  title: "RL environments, explained for people who don't train models",
  shortTitle: 'RL environments explained',
  description:
    'Reinforcement learning environments are how AI agents learn to do real work. A plain-English guide to what they are, what makes one good, and why real business data matters.',
  dek: 'Labs used to teach models by showing them answers. Now they teach agents by letting them practice. An RL environment is the practice field.',
  category: 'Training data',
  readMinutes: 9,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
If you have spent any time around AI labs recently, you have heard the phrase "RL environments" a lot. It has become one of the most important ideas in how frontier models are trained, and one of the most valuable things a data supplier can provide. It is also usually explained in a way that assumes you already know what it means.

This is an attempt to explain it from scratch.

## First, a quick picture of how models learn

Broadly, there are two ways to teach a model something.

**Show it examples.** You give the model lots of inputs paired with good outputs, and it learns to imitate them. This is how most of the early training of language models works, and it is how supervised fine-tuning works later on.

**Let it practice and score it.** You give the model a task, let it try, and tell it how well it did. Over many attempts, it learns to do more of what scored well. This is reinforcement learning, or RL.

Imitation is great for teaching a model to sound right. Practice is what teaches it to *get things done*, especially when a task takes many steps and there is more than one way to succeed.

## So what is an environment?

An environment is the world the model practices in. It has three essential parts.

### State

What the world looks like right now. For a customer support agent, that might be an inbox with an open ticket, a customer's account history, an order database and a refund policy document.

### Actions

What the agent is allowed to do. Search the order database. Read the policy. Draft a reply. Issue a refund. Escalate to a human. Each action changes the state.

### Reward

How the attempt gets scored. Did the customer's problem actually get solved? Was the refund within policy? Was the tone appropriate? Did the agent do anything it should not have?

Put those together and you have something a model can practice in over and over, getting a little better each time.

## Why everyone suddenly cares

The frontier has shifted from models that answer questions to agents that complete tasks. Answering a question is one step. Resolving a billing dispute might take thirty steps across four tools over two days, with a customer who changes their story halfway through.

You cannot teach that well by imitation alone, because there are too many paths through the task and too many ways for things to go sideways. The model needs to try, fail, recover and try again. That requires environments.

It is also why labs now spend heavily on them. A good environment can generate an enormous amount of training signal, because the agent can attempt the task thousands of times in different ways.

## What makes an environment good

Not every environment is worth training on. The ones labs pay for tend to share a few qualities.

### Realism

The tasks, tools and data look like real work. A toy environment teaches toy skills. If the inbox is full of tidy, unambiguous tickets, the agent will fall apart on the first real customer who writes three paragraphs with the actual problem buried in the second.

### Verifiable rewards

The best environments have rewards that can be checked objectively: the invoice balance is now correct, the shipment was rebooked within the contract window, the tests pass. These are often called verifiable rewards, and they are much harder for a model to game than vague quality scores.

### Long horizons

Real work takes many steps. Environments that only test single actions miss the hard part, which is keeping track of context, planning ahead and recovering when an earlier step went wrong.

### Resistance to shortcuts

Models are very good at finding loopholes. If the reward only checks that a refund was issued, the agent will learn to issue refunds to everyone. Good environments are designed so the only reliable way to score well is to actually do the job.

### No contamination

If the tasks have appeared publicly, the model may have memorized them. Environments built from private material avoid this. See [why private evaluation data matters](/learn/evaluation-datasets-contamination).

## Where real business data comes in

This is the part that connects RL environments to companies like yours.

Building a realistic environment is hard because you need realistic state: realistic tickets, realistic account histories, realistic policies, realistic edge cases. And you need realistic tasks, which means knowing what people in that job actually have to do, in what order, with what complications.

Licensed operational data provides exactly that. A de-identified record of how an accounts receivable team actually handled escalations over three years tells you:

- What the starting situations look like.
- Which tools people reach for, in what order.
- Where things typically go wrong.
- What a good outcome looks like, and how it was verified.

That record can be turned into environment state, task definitions and reward checks. The result is an environment grounded in work that really happened, rather than in someone's guess about what the work might be like.

## A simple example

Imagine a logistics company that licenses three years of dispatch and customer service records. From those, a data lab might build an environment where:

- **State:** a set of shipments, carrier capacity, customer contracts with late penalties, and an inbox of incoming problems.
- **Actions:** query shipment status, contact carriers, split or reroute orders, message customers, log exceptions.
- **Reward:** were contractual deadlines met, were costs kept within limits, were customers kept informed, and were exceptions logged correctly?

An agent trained in that environment learns something close to what a good dispatcher learns in their first year. That is the kind of capability labs are trying to build.

> An RL environment is only as good as its picture of the real job. Real records are how you get that picture right.

## How Anthroly helps

We license operating records from US companies and build them into environments, trajectories and evaluations for AI labs. For labs, that means environments grounded in real workflows with verifiable rewards and no contamination. For companies, it means your record becomes the practice field for the next generation of agents, de-identified and under a bounded license.

If you are on a lab's post-training team, [request a sample pack](/contact). If you run a US business and think your workflows would make a good environment, [tell us about them](/contact). For the step that often comes alongside environments, read about [agent trajectory data](/learn/agent-trajectory-data). For a deeper dive on what separates evaluation sets from training-grade environments, see [what makes an RL environment training-grade](/blog/what-makes-a-training-grade-rl-environment).
`,
  faq: [
    {
      question: 'What is an RL environment in AI?',
      answer:
        'A simulated world where an AI agent practices a task. It has a state, a set of allowed actions and a reward that scores how well the agent did, so the agent can improve through repeated attempts.',
    },
    {
      question: 'What is a verifiable reward?',
      answer:
        'A reward that can be checked objectively, such as a balance being correct or tests passing, rather than a subjective quality score. Verifiable rewards are harder for models to game.',
    },
    {
      question: 'Why do RL environments need real business data?',
      answer:
        'Realistic environments need realistic starting states, tasks and edge cases. De-identified operating records show what the work actually looks like, which makes the environment and the skills it teaches more realistic.',
    },
  ],
};
