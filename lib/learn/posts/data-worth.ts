import type { Article } from '../types';

export const dataWorth: Article = {
  slug: 'how-much-is-company-data-worth',
  title: "How much is your company's data worth to an AI lab?",
  shortTitle: 'What your data is worth',
  description:
    'There is no public price list for operational data. Here are the five factors that actually set the price, the ones that do not matter, and how to avoid underpricing your record.',
  dek: "There is no price list. There are, however, five things that move the number far more than size does.",
  category: 'Selling data',
  readMinutes: 8,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
This is the first question almost every owner asks, and the honest answer is that it depends, which is unsatisfying. So this piece tries to be specific about what it depends *on*.

The short version: the value of an operating record has very little to do with how many gigabytes it takes up, and a lot to do with how much real reasoning it captures, how long it runs and how hard it would be to find anywhere else.

## Why there is no price list

Most markets have comparables. You can look up what a similar house sold for, or what a similar company was acquired for. The market for licensing operational data to AI labs is young, and the deals that do get reported are mostly large publishers and platforms licensing content catalogs. Those are the wrong reference point for an operating business. A news archive and a decade of freight dispatch threads are not the same asset.

So pricing happens deal by deal, after someone has actually looked at the record. Be wary of anyone who gives you a number before reading a sample. They are either guessing or anchoring you.

## The five things that move the price

### 1. Depth of history

Continuous history is the single biggest driver. A record that covers several years shows how a business handled seasons, staff turnover, a recession, a system migration, a major customer leaving. That longitudinal texture is very hard to get any other way.

Gaps matter too. Five unbroken years is generally worth more than seven years with a two-year hole in the middle.

### 2. Reasoning density

How much of the *why* is written down? Compare two ticket histories:

- One where most tickets read "Fixed. Closed."
- One where agents routinely note what they checked, what they ruled out and why they chose the fix they did.

The second is worth multiples of the first, even at the same volume. The same goes for chat. A channel where people argue through decisions in writing is far more valuable than one used mostly for scheduling lunch.

### 3. Domain scarcity

Some kinds of work are everywhere in existing training data. General software development and consumer customer service are well covered. Others are almost absent: commercial insurance claims handling, heavy equipment field service, specialty freight brokerage, construction project management, healthcare revenue cycle work.

If your industry is underrepresented online, your record is scarcer, and scarcity raises the price.

### 4. Clean title and low risk

Buyers pay for certainty. A record where ownership is obvious, regulated data is cleanly separated and contracts clearly allow licensing carries less legal risk, and is worth more as a result. A record full of client data held under restrictive agreements may be worth very little, because so much of it has to be carved out.

### 5. Exclusivity and term

A non-exclusive license lets you license the same record again later, to someone else. An exclusive license, or an exclusivity window, means the buyer gets it alone for a period. Exclusivity is worth paying for, and you should expect it to change the number.

The term matters too. A longer license term or broader permitted use generally commands more than a narrow one.

## Things that matter less than you think

### Raw volume

More data is not automatically more valuable. Duplicate notifications, automated alerts and bot messages add bulk without adding signal. Buyers filter most of that out before pricing.

### Company revenue

A large company does not automatically have a more valuable record. Revenue tells a buyer very little about reasoning density or history. Some of the most interesting records come from mid-sized firms with long-tenured teams who write things down.

### How polished the data is

Owners sometimes apologize for how messy their systems are. Messiness is often the point. Clean, curated data has usually had the reasoning stripped out of it.

## How the number usually gets set

A credible buyer will follow roughly the same sequence:

1. **Inventory by counts.** Which systems, how far back, roughly how much.
2. **Sample review.** A small, de-identified sample, read by a person.
3. **Scoping.** What is in, what is out, and what needs special handling.
4. **Offer.** A firm number tied to a specific scope and term.

The offer should be firm. If the price keeps moving after you have agreed scope, something is wrong.

## How to avoid underpricing your record

- **Do not accept a number sight unseen.** It will almost always be conservative, because the buyer is pricing their own uncertainty.
- **Ask what drove the price.** A good buyer can tell you which parts of your record they valued most, and why.
- **Separate the systems.** Your ticket history and your chat history may be worth very different amounts. Make sure each is valued on its merits.
- **Understand the term and exclusivity.** A higher number for a broad exclusive license may be worth less than a slightly lower number that lets you license again in two years.
- **Get the license right.** The structure matters as much as the price. See [licensing versus selling](/learn/data-licensing-vs-selling).

## Where Anthroly fits

We price every record individually, after reading a de-identified sample. We do not publish rate cards, because there is no honest way to price an operating record without looking at it. What we can tell you is that the companies that surprise themselves are usually the ones that thought their data was too messy to be worth anything.

> The record is worth what it would cost a lab to recreate it. For most businesses, the honest answer is that they couldn't.

If you run a US company and want a real number, [start with a few questions](/contact?side=seller). For the full process, read [how to sell your company's data to AI labs](/learn/sell-company-data-to-ai-labs).
`,
  faq: [
    {
      question: 'Is there a standard price per GB for company data?',
      answer:
        'No. Price per gigabyte is a poor measure, because volume says little about reasoning density, history or scarcity. Operating records are priced individually after a sample review.',
    },
    {
      question: 'What makes company data more valuable to AI labs?',
      answer:
        'Long continuous history, visible reasoning, an underrepresented domain, clean ownership and exclusivity terms all raise the value of an operating record.',
    },
  ],
};
