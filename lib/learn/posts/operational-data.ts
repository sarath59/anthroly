import type { Article } from '../types';

export const operationalData: Article = {
  slug: 'what-is-operational-data',
  title: 'What is operational data, and why do AI labs want yours?',
  shortTitle: 'What is operational data',
  description:
    'Operational data is the working record a business produces just by running. Here is what counts, why AI labs value it, and which of your systems carry the most signal.',
  dek: 'The working record your business produces by accident turns out to be the scarcest input in AI right now.',
  category: 'Training data',
  readMinutes: 8,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
Every business produces two kinds of output. There is the work product (the shipped order, the filed return, the finished design) and there is the trail of everything that happened on the way there. That trail is operational data.

Most companies treat it as exhaust. It piles up in Slack, inboxes and ticketing systems, gets searched occasionally when something goes wrong, and otherwise sits there. For the companies building AI models, it has become one of the most sought-after inputs there is.

## A working definition

Operational data is the record a business creates as a side effect of operating. Nobody sits down to produce it. It accumulates because people need to coordinate, decide, ask, correct and hand things off.

In practice, it usually lives in:

- **Team chat:** Slack, Microsoft Teams, Google Chat.
- **Email:** individual and shared inboxes, especially with customers and suppliers.
- **Tickets:** support desks, IT service management, internal request queues.
- **CRM history:** not just the fields, but the notes and activity logs.
- **Calls and meetings:** recordings and transcripts from sales, support and internal meetings.
- **Engineering history:** pull requests, code review comments, incident channels, issue trackers.
- **Documents:** drafts, comments and version history in Drive, SharePoint, Notion or Confluence.
- **Operations systems:** ERP, accounting, dispatch, work orders and inspection notes.

The common thread is that these systems capture people doing work, not just the result.

## Why labs care so much about it

### The public internet has been read

The first generations of large language models were trained mostly on public text: websites, books, code repositories, forums. That source has been mined hard, and the remaining public text is increasingly repetitive or machine-generated. Labs need new material, and the largest pool of high-quality text that has never been public sits inside companies.

### Models are being asked to do jobs, not just answer questions

The frontier has moved from chatbots that answer questions to agents that complete tasks: resolve a billing dispute, reconcile an account, triage a queue of tickets, coordinate a shipment. To learn that, a model needs examples of people doing exactly those things, with all the messy context that comes with them.

Public data almost never shows this. Nobody posts their company's escalation thread to a forum. Operational data shows it constantly.

### It contains reasoning in the open

When an analyst writes a finished report, the reasoning is compressed into conclusions. When the same analyst argues with a colleague in a thread about which assumption to use, the reasoning is right there on the page. Models learn a great deal from seeing reasoning laid out step by step, including the dead ends.

### It contains mistakes and corrections

This part is underrated. Real work is full of errors that get caught: the wrong part ordered, the misread contract clause, the deploy that got rolled back. Each of those is a worked example of something going wrong and someone fixing it. That is exactly the kind of signal that helps an agent recover when it makes its own mistakes.

## Not all operational data is equal

If you are trying to figure out which of your systems matter most, here is a rough ranking based on what we see buyers respond to.

### High signal

- **Support and service tickets.** Problem, diagnosis, resolution, often with several rounds in between. Naturally structured and rich in reasoning.
- **Incident and escalation threads.** High stakes, time pressure, multiple people and tools.
- **Code review.** Specific, technical, argued line by line.
- **Long email negotiations.** Multi-party, multi-week, with real constraints.

### Medium signal

- **General team chat.** Valuable in aggregate, though noisier.
- **Call recordings.** Very valuable for spoken reasoning and conversation, but they need more processing.
- **Document version history.** Excellent when comments and revisions are preserved.

### Lower signal on its own

- **Structured records** such as ERP exports and CRM fields. These are much more valuable when paired with the conversations around them, because they ground the talk in what actually happened.

## Industry matters too

Some industries are heavily represented in existing training data. Software is the obvious one; there is a lot of public code and developer discussion. Others barely appear at all.

Field services, construction, specialty manufacturing, freight and logistics, insurance claims, healthcare administration and legal operations are all examples of work that is enormous in the real economy and nearly invisible online. Records from those businesses tend to be scarcer, which generally makes them more valuable.

## What operational data is not

It is worth being clear about the boundaries.

- **It is not your customers' data held on their behalf.** If you are a processor holding a client's records under contract, those records are generally theirs, not yours to license.
- **It is not personal data in identifiable form.** Before operational data is used for training, names, contact details and account numbers should be stripped. The value is in the work, not the identities. See [how anonymization works](/learn/anonymizing-data-for-ai-training).
- **It is not a one-time sale of your business records.** Most deals are licenses, and you keep operating on your data as before. More on that in [licensing versus selling](/learn/data-licensing-vs-selling).

## How to tell if yours is worth something

A quick test: pick a random support ticket or project thread from two years ago and read it. If you can follow what the problem was, what people considered, what they decided and why, you are looking at the kind of record labs want.

Then ask how many of those you have, how far back they go and whether they cover work that is hard to find on the open web. Those three answers will tell you most of what you need to know.

> If it would take a new hire six months to learn how your business really works, the record of those six months is what a model is missing.

If you run a US company and want a straight answer on whether your record is worth licensing, [tell us what you have](/contact). If you want to understand the rest of the process first, start with [how to sell your company's data to AI labs](/learn/sell-company-data-to-ai-labs).
`,
  faq: [
    {
      question: 'Is operational data the same as business intelligence data?',
      answer:
        'No. BI data is usually structured metrics and reports. Operational data is the full working record, including the conversations, tickets and revisions that show how decisions were made.',
    },
    {
      question: 'Which operational data is most valuable for AI training?',
      answer:
        'Records that show multi-step work with visible reasoning and corrections: support tickets, incident threads, code review and long email negotiations tend to carry the most signal.',
    },
  ],
};
