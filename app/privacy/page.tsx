import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { CONTACT_EMAIL, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How Anthroly collects, uses and protects information from website visitors, data sellers and AI lab customers.',
  alternates: { canonical: absoluteUrl('/privacy') },
};

const BODY = `
This policy explains what information Anthroly collects through this website and in the course of our business, how we use it, and the choices you have. It covers visitors to anthroly.com, companies that license data to us, and AI labs that source data from us.

## Information you give us

When you fill in our intake form, email us or book a call, we collect what you choose to share: your name, work email, company, website, and details about the systems, data or needs you describe. If you book a call, our scheduling provider (Cal.com) receives those details so they can be attached to your booking.

## Information collected automatically

We use privacy-friendly analytics (DataFast) to understand how the site is used: pages visited, referring sites, approximate location derived from IP address, device and browser type, and interactions such as clicks and scroll depth. We do not use this information to identify you personally.

## Data licensed to us by companies

Operating records licensed to Anthroly are governed by the license agreement signed with the company that produced them, not by this website policy. As a matter of practice, personal identifiers are removed or replaced before records leave the licensing company's systems or reach any downstream buyer, access to records alongside a company's identity is limited to a small number of named people, and every license prohibits re-identification.

## How we use information

- To respond to inquiries and prepare for calls.
- To evaluate, negotiate and perform data licensing agreements.
- To operate, secure and improve this website.
- To meet legal, tax and accounting obligations.

We do not sell the personal information of website visitors or people who contact us.

## Sharing

We share information only with service providers who help us run the business (for example scheduling, email, hosting and analytics), with professional advisers, where required by law, or as part of a corporate transaction. Sellers are never identified to buyers, and buyer terms are never disclosed to sellers, except as an agreement expressly allows.

## Retention

We keep inquiry information for as long as needed to respond and to maintain a record of our business relationship, and contract records for as long as the law requires.

## Your choices and rights

Depending on where you live in the United States, you may have the right to access, correct or delete personal information we hold about you, and to opt out of certain processing. To make a request, email ${CONTACT_EMAIL}. We will not discriminate against you for exercising these rights.

## Security

We use reasonable administrative, technical and physical safeguards appropriate to the sensitivity of the information. No method of transmission or storage is completely secure.

## Children

This website is not directed to children under 16, and we do not knowingly collect their information.

## Changes

We may update this policy from time to time. The date at the top of the page shows when it was last changed.

## Contact

Questions about this policy: ${CONTACT_EMAIL}.
`;

export default function PrivacyPage() {
  return <LegalPage title="Privacy policy" updated="October 10, 2026" body={BODY} />;
}
