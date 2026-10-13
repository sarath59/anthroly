import type { Article } from '../types';

export const sellCompanyData: Article = {
  slug: 'sell-company-data-to-ai-labs',
  title: "How to sell your company's data to AI labs",
  shortTitle: 'Selling data to AI labs',
  description:
    'A practical guide for US business owners: what AI labs buy, how to check you own it, how pricing works, and how to license operational data without giving up the business.',
  dek: 'What labs actually buy, how to check you own it, and how a deal gets done without a procurement cycle measured in quarters.',
  category: 'Selling data',
  readMinutes: 9,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
A few years ago, the idea of selling your company's Slack history would have sounded like a prank. Today it is a real transaction, and a growing number of ordinary US businesses (logistics firms, insurance agencies, accounting practices, software shops) are doing it quietly and getting paid well for it.

The reason is simple. The large AI labs have already read most of the public internet. What they have not seen is how work actually gets done inside a company: the argument in a thread before a decision, the support ticket that took four replies to diagnose, the quote that was revised three times because the customer kept changing the scope. That record lives inside businesses, and you cannot scrape it.

This guide walks through how selling it actually works, from figuring out what you have to getting the money in your account.

## Start with what labs are actually looking for

Most owners guess wrong about which of their data is valuable. They point to the polished things: the CRM, the financial statements, the final reports. Those matter, but they are the least interesting part to a lab, because finished output has had the reasoning stripped out of it.

What labs want is the *process*. Specifically:

- **Multi-step work.** Tasks that took days or weeks and involved several people and tools.
- **Visible reasoning.** Threads where someone explains why they chose option B over option A.
- **Real constraints.** Budgets, deadlines, contract terms and angry customers, the stuff that forces tradeoffs.
- **Corrections.** Mistakes that were caught and fixed. These are gold, because they teach a model what going wrong looks like.

A support ticket that reads "Customer says invoice is wrong. Checked, it was a tax code error from the March migration. Fixed and credited" contains more useful training signal than a hundred pages of a finished annual report.

## Make sure it is yours to sell

Before anything else, you need to know you have the right to license the data. This is the step people skip, and it is the step that kills deals late.

Ask three questions.

### Did your company produce it?

Internal communication, your own tickets, your own engineering history: generally yours. Data you received from a customer under a contract, held on their behalf, is usually not, and most reputable buyers will exclude it from scope.

### What do your contracts and policies say?

Read your customer agreements, your privacy policy and your employee handbook. Some contracts restrict how customer communications can be used. Some privacy policies make promises you need to keep. None of this necessarily blocks a deal, but it shapes what goes in.

### Are there regulated categories in the mix?

Health information, financial account data and anything involving minors carry extra rules. A good buyer will help you carve these out or handle them properly. A bad one will not ask.

If you are unsure about any of this, talk to your lawyer before you talk to a buyer. It is a short conversation and it saves a lot of grief.

## Take an honest inventory

You do not need to export anything to get started. You need a rough picture:

- Which systems you use (Slack, Gmail, Zendesk, Salesforce, GitHub, Gong and so on).
- How far back each one goes.
- Rough volumes: number of channels, tickets, recorded calls, repositories.
- Which teams are represented. Sales, support, operations, engineering and finance all produce different kinds of value.

Counts and date ranges are enough for a serious buyer to tell you whether there is a deal worth pursuing. Anyone who asks for raw files before making any kind of commitment is asking for too much, too early.

## Choose who you sell to

You have three broad options, and they are not equal.

### Go direct to a lab

It is possible, but rarely practical for a business of ordinary size. Frontier labs run long procurement and legal processes, they want large volumes, and they usually prefer to buy from suppliers they already trust. Expect quarters, not weeks, and expect to do the anonymization and packaging yourself.

### List on a marketplace

Data marketplaces list your dataset and take a cut when someone eventually buys. You keep control, but you also carry the uncertainty: no guaranteed buyer, no guaranteed price and a public listing of what you hold.

### License to a data lab

A data lab like [Datary Labs](/) buys as a principal or brokers a license directly, then handles the anonymization, packaging and delivery to the labs it already supplies. You deal with one counterparty, get a firm offer and get paid on a defined timeline. For most companies this is the shortest path. We explain the differences in more detail in [what an AI data broker does](/learn/ai-data-broker-explained).

## How pricing works

There is no public price list for operational data, and anyone who quotes you a number before reading a sample is guessing. The things that actually move the price are:

1. **Depth of history.** Five years of continuous operating record is worth far more than five months.
2. **Reasoning density.** How much of the *why* is written down.
3. **Domain scarcity.** Some industries are wildly underrepresented in training data. Field services, construction, specialty insurance and healthcare administration are good examples.
4. **Cleanliness of title.** Records with no ownership questions are worth more because they carry less risk.
5. **Exclusivity.** Whether the license is exclusive for a period, or not.

Raw volume matters less than people expect. A small firm with a decade of thoughtful ticket history can outprice a much bigger company with a shallow, noisy record. We go deeper on this in [how much your company's data is worth](/learn/how-much-is-company-data-worth).

## License, do not sell outright

The right structure for almost every company is a license, not a sale. A license grants defined rights over defined material for a defined period and a defined use. You keep ownership. You keep using the data exactly as before. You can, depending on the terms, license it again later.

A good license will spell out:

- Exactly which systems and date ranges are in scope.
- What the buyer may and may not do with it (training and evaluation, yes; re-identification or targeting your customers, never).
- How identifiers are removed and who verifies it.
- Confidentiality on both sides.
- Payment terms and what triggers payment.

There is a fuller comparison in [licensing data versus selling it](/learn/data-licensing-vs-selling).

## Anonymization happens before anything moves

Nothing should leave your systems with names, email addresses, phone numbers, account numbers or street addresses intact. The industry standard is to strip or replace identifiers first, then review a sample, then transfer. The roles, the timing and the work itself are preserved, because that is where the value lies.

If you want the details on how this is done properly, read [how data is anonymized for AI training](/learn/anonymizing-data-for-ai-training).

## What a typical deal looks like

Here is the shape of a deal with us, which is broadly what you should expect from any serious buyer:

1. **Intake.** You tell us which systems you run and how far back they go.
2. **Sample review.** A small, de-identified sample is read by a person, not just a script.
3. **Offer.** A firm number and a draft license.
4. **Scrub and transfer.** Identifiers removed, then encrypted delivery.
5. **Payment.** Money moves from us to you once the delivery is approved.

No listing, no auction and no fee charged to you.

> The best time to find out what your record is worth is before you need the money.

## A few honest cautions

Selling data is not right for every company. If your customer contracts forbid it, do not try to engineer around them. If your team would be uncomfortable, talk to them first; the reasoning in your threads is theirs too, even after the names come out. And if a buyer is vague about where the data goes, what it may be used for or how identifiers are removed, walk away.

Done properly, though, licensing your operating record is one of the rare ways to turn something you have already produced into non-dilutive capital, with no new product, no new customers and no change to how you run the business.

If you are a US company and want to know what your record is worth, [start here](/contact).
`,
  faq: [
    {
      question: 'Can a small business sell its data to AI labs?',
      answer:
        'Yes. Depth of history and how much reasoning the record contains matter more than company size. A small firm with years of detailed ticket or project history can be very attractive to a buyer.',
    },
    {
      question: 'Do I need to export my data to get a quote?',
      answer:
        'No. A serious buyer can tell you whether there is a deal from counts and date ranges alone. Samples come later, after identifiers are removed.',
    },
    {
      question: 'Will I lose ownership of my data?',
      answer:
        'Not if you license it. A license grants defined rights for a defined term and use. You keep the data and keep operating on it as before.',
    },
  ],
};
