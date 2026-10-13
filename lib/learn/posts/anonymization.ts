import type { Article } from '../types';

export const anonymization: Article = {
  slug: 'anonymizing-data-for-ai-training',
  title: 'How data is anonymized before it is used to train AI',
  shortTitle: 'Anonymizing training data',
  description:
    'What de-identification actually involves, which identifiers get removed, why consistent placeholders matter, and the questions to ask any buyer about how your data will be protected.',
  dek: 'Strip the identities, keep the work. Simple to say, and surprisingly easy to get wrong.',
  category: 'Safeguards',
  readMinutes: 8,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
The first question most owners ask after "what is it worth?" is "what happens to the people in it?" It is the right question. An operating record is full of names, phone numbers, customer details and the occasional thing someone typed into Slack at 11pm that they would rather nobody ever read.

The good news is that the value of operational data for AI training does not depend on any of that. Labs want the *work*: the problem, the reasoning, the sequence of actions, the outcome. They do not need to know who did it. De-identification is the process of removing the identities while keeping the work intact.

## Anonymization vs. de-identification vs. pseudonymization

These terms get used loosely. Roughly:

- **De-identification** is the general practice of removing or obscuring information that identifies people or organizations.
- **Pseudonymization** replaces identifiers with consistent placeholders. "Dana Whitfield" becomes [PERSON_1] everywhere she appears.
- **Anonymization**, strictly, means data that can no longer reasonably be linked back to an individual by anyone, even with other information.

In practice, preparing operational data for AI training usually involves pseudonymization plus further steps, such as generalizing dates or removing rare details, to push the data toward true anonymity. Different legal regimes define these terms differently, so a careful buyer will be precise about which standard they are meeting.

## What gets removed

The obvious identifiers come out first:

- Names of people
- Email addresses
- Phone numbers
- Street addresses
- Account, policy, order and invoice numbers
- Government identifiers such as Social Security numbers
- Payment card and bank details
- Usernames and handles
- IP addresses and device identifiers

Then the less obvious ones, which is where a lot of de-identification efforts fall short:

- **Organization names**, including your customers, suppliers and sometimes your own company.
- **Specific locations** finer than a broad region.
- **Rare job titles** that point to one person ("our only in-house patent attorney").
- **Unique events** ("the day the Memphis warehouse flooded").
- **Free-text personal details** like health issues, family events and other things people mention in passing.

## Why consistent placeholders matter

It is tempting to just black out every name. The problem is that it destroys the structure of the work.

Consider a thread where Dana raises a problem, Marcus suggests a fix, and Dana confirms. If every name becomes [REDACTED], the model cannot tell who said what, and the back-and-forth that makes the thread valuable disappears.

With consistent placeholders, Dana is [PERSON_1] every time and Marcus is [PERSON_2] every time. The conversation still makes sense. You can follow who raised the issue, who proposed what, and who signed off. The identities are gone; the reasoning survives.

The same applies to organizations, products and accounts. [ORG_1] stays [ORG_1] across the whole record.

## What gets kept

Keeping the right things is just as important as removing the wrong ones. A good process preserves:

- **Roles**, such as "support agent," "operations manager" or "customer."
- **Relative timing**, so you can see that a reply came four hours later, or that a task took three days.
- **The content of the work**, meaning the problem, the reasoning, the actions and the outcome.
- **Structure**: who replied to whom, which ticket links to which order.

This is what makes de-identified operational data useful for training, and what separates a careful process from a crude one.

## How it is done

Good de-identification uses layers, because no single technique catches everything.

1. **Automated detection.** Pattern matching for structured identifiers such as emails, phone numbers and card numbers, plus trained models that recognize names, organizations and locations in free text.
2. **Consistent replacement.** Each detected entity is mapped to a stable placeholder across the whole record.
3. **Generalization.** Exact dates may become relative offsets; precise locations may become regions.
4. **Human review.** People read samples to catch what the automated layers missed. Anything that still looks identifying goes back for another pass.
5. **Scoped access.** Only a very small number of named people ever see raw records alongside a company's identity. Everyone else works with de-identified data.

The order matters. All of this should happen *before* data leaves your systems or reaches a downstream buyer, not after.

## The limits, honestly

No de-identification process is perfect. Re-identification risk is real, especially when rare details combine: a specific job title, in a specific city, during a specific month. That is why the human review step matters, why generalization is used, and why licenses should explicitly prohibit any attempt to re-identify individuals.

Anyone who tells you their process carries zero risk is overselling. What you want is a buyer who takes the risk seriously, uses multiple layers and puts contractual prohibitions behind the technical ones.

## Questions to ask any buyer

- When are identifiers removed: before or after the data leaves our systems?
- Which categories of identifier do you remove?
- Do you use consistent placeholders or blanket redaction?
- Who reviews the output, and how?
- How many people can see raw data alongside our company's identity?
- Does the license prohibit re-identification?
- What happens if something identifying is found after delivery?

> The identities were never the valuable part. The work was. Good de-identification is how you hand over one without the other.

## How Datary Labs handles it

Identifiers are removed before anything moves. We use consistent placeholders so the work stays readable, and people review samples before pricing. Only a small number of named people ever see a company identity alongside its data, and every license we sign prohibits re-identification. For more on the deal structure around this, read [licensing versus selling data](/learn/data-licensing-vs-selling), or if you are ready, [start here](/contact).
`,
  faq: [
    {
      question: 'Is anonymized data still useful for AI training?',
      answer:
        'Yes. AI labs value the work itself (problems, reasoning, actions and outcomes), not the identities. Consistent placeholders keep the structure readable after identifiers are removed.',
    },
    {
      question: 'What is the difference between anonymization and pseudonymization?',
      answer:
        'Pseudonymization replaces identifiers with consistent placeholders. Anonymization means the data can no longer reasonably be linked back to individuals. Preparing training data typically combines pseudonymization with further steps toward anonymity.',
    },
  ],
};
