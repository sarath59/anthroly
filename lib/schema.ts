/**
 * Schema.org structured data helpers.
 */

import { SITE_URL, SITE_DESCRIPTION, CONTACT_EMAIL, absoluteUrl } from './site';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateFAQSchema(faqs: FAQItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function generateOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Anthroly',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
    },
    image: absoluteUrl('/logo.png'),
    description: SITE_DESCRIPTION,
    slogan: 'The data lab for American operating data.',
    email: CONTACT_EMAIL,
    knowsAbout: [
      'AI training data',
      'Data licensing',
      'Data brokerage',
      'Operational data',
      'Reinforcement learning environments',
      'RLHF preference data',
      'Agent trajectory data',
      'Model evaluation datasets',
      'Data anonymization',
    ],
    areaServed: { '@type': 'Country', name: 'United States' },
    sameAs: [
      'https://twitter.com/anthroly',
      'https://linkedin.com/company/anthroly',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT_EMAIL,
      url: absoluteUrl('/contact'),
    },
  };
}

export function generateWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Anthroly',
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-US',
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified?: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(url),
    datePublished,
    dateModified: dateModified || datePublished,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(url),
    },
  };
}

export function combineSchemas(...schemas: object[]): string {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      const { '@context': _, ...rest } = schema as Record<string, unknown>;
      return rest;
    }),
  });
}
