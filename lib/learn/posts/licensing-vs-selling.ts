import type { Article } from '../types';

export const licensingVsSelling: Article = {
  slug: 'data-licensing-vs-selling',
  title: 'Licensing data vs. selling it: what you actually give up',
  shortTitle: 'Licensing vs. selling data',
  description:
    'Most AI data deals are licenses, not sales. Here is the difference, the clauses that matter, and what a fair data license should and should not include.',
  dek: "The word \"sell\" scares people for good reason. Here's why almost every good deal is actually a license, and what to look for in one.",
  category: 'Selling data',
  readMinutes: 7,
  published: '2026-10-10',
  updated: '2026-10-10',
  body: `
When owners first hear that they can "sell their data," a reasonable worry follows: if I sell it, is it gone? Do I still own my own Slack? Can I keep using my CRM?

In almost every case, the answer is that you are not selling anything outright. You are licensing it. The difference is not legal hair-splitting; it changes what you keep, what you can do later and how much risk you carry.

## The basic difference

### A sale transfers ownership

If you sell an asset, it stops being yours. The buyer can do what they like with it, and you generally cannot sell it again. For physical goods this makes sense. For data, it is rarely what either side actually wants.

### A license grants defined rights

A license lets someone use something you still own, within limits you agree on. Think of it like leasing a building rather than selling it. The tenant gets to use the space for a period, under a set of rules, and the building is still yours.

For data, a license typically defines four things:

1. **What** is covered: which systems, which date ranges, which teams.
2. **Who** may use it, and whether they can pass it on.
3. **How** it may be used: training, evaluation, research and so on.
4. **How long** the rights last.

You keep ownership. You keep using the data in your business exactly as you did before. And depending on the terms, you can license the same material again later.

## Why licenses dominate this market

There are good reasons on both sides.

**For the company**, a license is non-dilutive. You are not giving up equity, taking on debt or handing over the business. You are granting bounded rights to something you already produced, and you keep the asset.

**For the buyer**, a license with clear terms is easier to defend. AI labs care a great deal about chain of title: being able to show where every piece of training data came from and that they had the right to use it. A well-drafted license gives them exactly that.

## The clauses that matter

If you are reviewing a data license, these are the parts worth reading slowly.

### Scope

Exactly which material is covered. Good scope language names systems and date ranges explicitly, and just as explicitly lists what is excluded. Client data you hold on someone else's behalf should almost always be out of scope.

### Permitted use

What the licensee may do. For AI deals this usually means model training, evaluation and related research. It should also say what is *not* allowed: re-identifying individuals, using the data to compete with you or target your customers, or reselling it outside the terms of the license.

### Exclusivity

Whether you can license the same material to others. Non-exclusive is the default. Exclusive, or exclusive for a window of time, should come with a higher price.

### Term and survival

How long the license runs, and what happens at the end. One important point: once data has been used to train a model, the model does not "forget" it when the license ends. Good licenses deal with this honestly, usually by allowing models already trained to keep operating while barring new training after expiry.

### De-identification

Who removes personal identifiers, to what standard and when. The answer should be "before anything leaves your systems." See [how anonymization works](/learn/anonymizing-data-for-ai-training).

### Confidentiality

Both directions. The buyer should not disclose that you are a source. You should not disclose the buyer's terms.

### Payment

How much, when and what triggers payment. Typically payment follows delivery and approval of the data, on defined terms.

### Representations

You will usually be asked to confirm you have the right to license what is in scope. Read this carefully and make sure the scope is accurate, because this is where your risk sits.

## Red flags

Walk away, or at least slow down, if you see any of these:

- **Unlimited use.** "Any purpose, in perpetuity, worldwide" is not a license; it is a sale wearing a license's clothes.
- **Vague scope.** "All company data" instead of named systems and dates.
- **No de-identification obligation**, or one that happens after transfer.
- **Unrestricted sublicensing.** You should know whether, and to whom, the data can be passed on.
- **Moving prices.** Once scope is agreed, the number should not keep shifting.

## What about brokered deals?

Sometimes a data lab buys the license itself and supplies AI labs downstream. Sometimes it brokers a license directly between you and a lab. Both can be good structures. What matters is that the license you sign is clear about who the licensee is, what they may do and what happens if the data moves further. We explain the different models in [what an AI data broker does](/learn/ai-data-broker-explained).

> A good license leaves you with everything you had before, plus a check.

## The bottom line

If you are talking to anyone about monetizing your company's data, you almost certainly want a license, not a sale. Read the scope, permitted use, exclusivity and term clauses closely, insist that identifiers are removed before anything moves, and make sure you understand what happens when the term ends.

At [Anthroly](/), every deal is a bounded license. You keep the business, the data and the right to keep using it. If you are a US company and want to see what that looks like for your record, [start here](/contact).
`,
  faq: [
    {
      question: 'If I license my data, can I still use it?',
      answer:
        'Yes. A license grants rights to the licensee without transferring ownership. You keep using your data in your business exactly as before.',
    },
    {
      question: 'Can I license the same data to more than one buyer?',
      answer:
        'If the license is non-exclusive, yes. Exclusive licenses, or exclusivity windows, restrict this and should command a higher price.',
    },
  ],
};
