import type { Article } from '../types';

export const agentTrajectories: Article = {
  slug: 'agent-trajectory-data',
  title: 'Agent trajectory data: why labs want the messy middle',
  shortTitle: 'Agent trajectory data',
  description:
    'Trajectory data records every step an agent or person takes to finish a task. Here is what it is, why long-horizon trajectories are so scarce, and how real work records become trajectories.',
  dek: "The answer is easy to find. The forty steps it took to get there almost never are. That's what trajectory data captures.",
  category: 'Training data',
  readMinutes: 7,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
Ask a model to write a paragraph and it does it in one go. Ask it to reconcile a vendor's statement against your ledger, chase down three missing invoices and email the vendor about the discrepancy, and it has to take dozens of actions, in order, keeping track of what it learned along the way.

The record of those actions is called a trajectory. Trajectory data has become one of the most important ingredients in training AI agents, and one of the hardest to find.

## What a trajectory is

A trajectory is a step-by-step record of how a task got done. At each step it captures:

- **What the agent (or person) could see** at that moment.
- **What they decided to do.** Search, click, type, call a tool, ask a question, wait.
- **What happened as a result.**
- Ideally, **why** they chose that action.

String those steps together from start to finish and you have a trajectory. Short ones might be five steps. Long-horizon trajectories can run to hundreds of steps over days.

## Why the middle matters most

Most data on the internet shows the beginning and the end of work: a question and its answer, a problem and its solution. What it almost never shows is the middle, which is where the actual skill lives.

The middle is where a person:

- Realizes the first approach will not work and backs up.
- Notices a detail that changes the plan.
- Waits on someone else and picks the task back up later.
- Juggles two tasks at once and keeps the context straight.
- Makes a mistake, catches it and fixes it.

Agents fail in the middle. They lose track of context on step 23. They repeat an action that already failed. They do not recognize when to stop and ask for help. Training on trajectories that show competent people working through the middle is one of the best ways to fix that.

## Where trajectories come from

### Synthetic trajectories

Models can generate their own trajectories in environments. This scales well, but early on the model only learns from its own behavior, which may not be very good. Synthetic trajectories are also prone to strange habits that no real person would have.

### Recorded demonstrations

Labs pay people to complete tasks while their actions are logged. This produces clean, high-quality trajectories, but it is expensive, and the tasks are often staged rather than real.

### Reconstructed from real work

This is where operational data comes in. A ticketing system, a code repository or a long email thread already contains a timestamped record of what people did, in what order, with what tools. With careful processing, that record can be reconstructed into trajectories that reflect how the work was actually done, including the interruptions and dead ends that staged demonstrations tend to leave out.

Real-work trajectories are scarce for the same reason operational data is scarce: they live inside companies, not on the open web.

## What makes a trajectory useful

### Length

Long-horizon examples are the hardest to get and among the most valuable. A trajectory that spans multiple days and dozens of steps teaches skills a ten-step one cannot.

### Tool diversity

Real work hops between systems: email, a CRM, a spreadsheet, a calendar, a ticketing tool. Trajectories that cross tools teach agents to do the same.

### Visible reasoning

Trajectories with a written rationale at key steps, like a note explaining why a ticket was escalated, give models something closer to a chain of thought to learn from.

### Recoveries

A trajectory that shows a mistake being caught and corrected is often worth more than a perfect one, because it teaches the agent how to recover.

### Clear outcomes

It helps to know whether the task actually succeeded. Resolved tickets, merged pull requests and paid invoices give a trajectory a verifiable endpoint.

## How trajectories relate to RL environments

The two are closely linked. Trajectories from real work help define what tasks an environment should contain and what a good outcome looks like. Environments then let agents generate many more trajectories through practice. Labs often want both: real-work trajectories to show the agent what good looks like, and environments to let it practice. See [RL environments explained](/learn/rl-environments-explained) for the other half.

## Privacy, handled first

Because trajectories are reconstructed from real records, de-identification is essential. Names, contact details and account numbers come out before anything moves, replaced with consistent placeholders so the trajectory still makes sense. The person becomes [PERSON_2], the customer becomes [ORG_1], and the sequence of work stays intact. More on that in [how anonymization works](/learn/anonymizing-data-for-ai-training).

> Agents don't fail at the answer. They fail at step 23. Trajectories are how you teach step 23.

## Working with Datary Labs

We reconstruct long-horizon trajectories from licensed, de-identified operating records sourced exclusively from US companies, and deliver them in the formats post-training teams use. If you are a lab looking for multi-day, multi-tool trajectories in domains that are thin on the open web, [request a sample pack](/contact). If your company's systems are full of the messy middle, [we would like to hear from you](/contact).
`,
  faq: [
    {
      question: 'What is trajectory data in AI?',
      answer:
        'A step-by-step record of how a task was completed, capturing what was observed, what action was taken and what happened at each step. It is used to train AI agents on multi-step work.',
    },
    {
      question: 'What is a long-horizon trajectory?',
      answer:
        'A trajectory that spans many steps, often across several tools and sometimes several days. Long-horizon trajectories are scarce and especially valuable for training capable agents.',
    },
  ],
};
