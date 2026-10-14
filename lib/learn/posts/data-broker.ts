import type { Article } from '../types';

export const dataBroker: Article = {
  slug: 'ai-data-broker-explained',
  title: 'What an AI data broker actually does (and how to choose one)',
  shortTitle: 'AI data brokers explained',
  description:
    'AI data brokers, marketplaces and data labs all sit between companies and AI labs, but they work very differently. Here is how each model works and the questions to ask before you pick one.',
  dek: 'Brokers, marketplaces and data labs all sit between your company and the AI labs. They are not the same thing, and the difference shows up in your check.',
  category: 'Market',
  readMinutes: 8,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
"Data broker" is a loaded phrase. For years it mostly meant companies that collected consumer information, things like addresses, purchase histories and browsing behavior, and sold it to marketers. That business has earned its bad reputation, and a growing body of state law exists because of it.

The kind of brokering that has emerged around AI training data is a different animal. It is mostly business-to-business, it centers on licensed operating records rather than consumer profiles, and the end buyers are AI labs rather than ad networks. But the label is the same, so it is worth being precise about what these intermediaries actually do.

## Why intermediaries exist at all

In principle, a company could license its data straight to an AI lab. In practice, that rarely happens for businesses of ordinary size, for three reasons.

**Procurement friction.** Frontier labs run long legal and security reviews. A single supplier relationship can take quarters to set up, and labs would much rather buy from a handful of trusted suppliers than from thousands of individual companies.

**Packaging.** Labs want data in specific formats: de-identified, deduplicated, documented and often built into environments or evaluation sets. Most companies have no way to produce that.

**Price discovery.** Owners have no idea what their record is worth, and labs have no easy way to evaluate a single company's data in isolation.

Intermediaries solve those problems. The question is how.

## The three main models

### 1. Marketplaces

A marketplace lists datasets and connects sellers with buyers. It usually takes a commission when a transaction happens.

**Upside:** you control the listing and can, in principle, reach many buyers.

**Downside:** no guaranteed buyer, no guaranteed price and a public listing of what you hold. You also usually carry the burden of preparing and anonymizing the data yourself.

### 2. Brokers

A broker represents a deal between a seller and a buyer without taking ownership of the data. They find the match, help negotiate terms and often coordinate diligence and delivery. They are typically paid by commission, by one side or both.

**Upside:** a good broker brings real relationships and market knowledge.

**Downside:** incentives can be murky. You need to know who is paying the broker, and how much, to judge whose interests they represent.

### 3. Data labs (principal buyers)

A data lab buys or licenses the data itself, as the counterparty, then anonymizes it, packages it and supplies AI labs downstream. It carries the risk of finding buyers and turning raw records into something a lab can use.

**Upside:** one counterparty, a firm offer and a defined payment timeline. Nothing is listed publicly.

**Downside:** you are trusting one buyer's valuation, so it is worth understanding how they price.

## Where Anthroly sits

We operate mostly as a principal: we license the record directly from the company that produced it, pay for it ourselves and supply the labs. For certain lab requests we broker a direct license between a US company and a specific lab, and stay in the middle to run diligence, anonymization and delivery.

Either way, the company deals with one team, and nothing is listed or auctioned. In total we have bought, sold and brokered more than $900K in data.

## How to choose

Whichever model you consider, these are the questions that separate good intermediaries from bad ones.

### Who is the counterparty on the contract?

You should know exactly who you are signing with and who the licensee is. If the answer is fuzzy, that is a problem.

### Who pays whom, and how much?

If you are paying a fee or commission, it should be disclosed up front. If you are not paying anything, ask how the intermediary makes money. There should be a clear, honest answer.

### Where does the data go?

You may not be told which specific lab receives your data (confidentiality cuts both ways), but you should know the category of buyer and the permitted uses.

### When are identifiers removed?

The only acceptable answer is "before anything leaves your systems." Ask who does it, to what standard and who checks it. See [how anonymization works](/learn/anonymizing-data-for-ai-training).

### Do they read the data before pricing?

A firm offer requires someone to have looked at a sample. An intermediary that quotes sight unseen is either guessing or planning to renegotiate later.

### What do they source, and from where?

Provenance matters enormously to AI labs. Ask where the intermediary sources data and whether it can document chain of title. Anthroly, for example, sources only from US companies, which keeps every record under one legal framework.

### What does the license look like?

Ask to see a draft early. Scope, permitted use, exclusivity, term and confidentiality should all be explicit. More on this in [licensing versus selling](/learn/data-licensing-vs-selling).

## Red flags

- Pressure to send raw exports before any offer.
- Vague answers about who the end buyers are or what they may do.
- A price that only appears after you have signed something.
- No clear explanation of how the intermediary gets paid.
- Willingness to take data you are not sure you have the right to license.

> A good intermediary makes the deal simpler for you without making it murkier.

## For AI labs

The same logic runs in reverse. Labs work with data suppliers because building a direct sourcing operation across thousands of businesses is expensive and slow. What matters on the buy side is provenance, de-identification quality, contamination risk and how well the supplier can shape raw records into training signal. If that is the side you are on, see what we supply in the [labs section](/#labs) or read about [RL environments](/learn/rl-environments-explained).

If you are a US company weighing your options, [tell us what you have](/contact) and we will tell you plainly whether we are the right fit.
`,
  faq: [
    {
      question: 'Is an AI data broker the same as a consumer data broker?',
      answer:
        'No. Consumer data brokers trade personal profiles, usually for marketing. AI data intermediaries mostly license de-identified business operating records to AI labs for training and evaluation.',
    },
    {
      question: 'What is the difference between a data broker and a data lab?',
      answer:
        'A broker arranges a deal between seller and buyer without owning the data. A data lab licenses the data itself as the counterparty, then anonymizes, packages and supplies it to AI labs.',
    },
  ],
};
