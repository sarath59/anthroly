import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { CONTACT_EMAIL, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'Terms governing use of the Anthroly website.',
  alternates: { canonical: absoluteUrl('/terms') },
};

const BODY = `
These terms govern your use of anthroly.com. By using the site, you agree to them. If you do not agree, please do not use the site.

## What these terms cover

These terms cover the website only. Any data license, purchase or brokerage engagement with Anthroly is governed by a separate written agreement, and that agreement controls if it conflicts with anything here.

## Information on the site

Content on this site, including our guides, is provided for general information. It is not legal, tax or financial advice. Descriptions of our process are general and may differ from the terms of any specific agreement. Before licensing data, consult your own advisers.

## No offer

Nothing on this site is an offer to buy or license any particular data. Any offer is made only in writing, after review, and is subject to a signed agreement.

## Eligibility

We license data only from companies headquartered in the United States. Contacting us does not create any obligation on either side.

## Your submissions

When you send us information, you confirm it is accurate and that you are authorized to share it on behalf of your organization. Please do not send raw data, files or personal information about others in an initial email.

## Intellectual property

The site and its content, including text, design and logos, belong to Anthroly or its licensors. Third-party names and logos are the property of their respective owners. You may share links to our guides, and quote brief passages with attribution.

## Acceptable use

Do not misuse the site, attempt to gain unauthorized access, interfere with its operation, or use it to send unlawful or harmful content.

## Third-party services

The site links to and uses third-party services, such as analytics and logo providers. Their own terms and privacy policies apply to your use of them.

## Disclaimers

The site is provided "as is" without warranties of any kind, to the fullest extent permitted by law.

## Limitation of liability

To the fullest extent permitted by law, Anthroly is not liable for indirect, incidental or consequential damages arising from your use of the site.

## Changes

We may update these terms. Continued use of the site after changes means you accept the updated terms.

## Contact

Questions about these terms: ${CONTACT_EMAIL}.
`;

export default function TermsPage() {
  return <LegalPage title="Terms of use" updated="October 10, 2026" body={BODY} />;
}
