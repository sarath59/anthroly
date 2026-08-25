/**
 * Schema.org Structured Data Generator
 * Generates SEO-optimized structured data for all pSEO page types
 */

import { PSEOPage, FAQ } from './types';
import { SITE_URL, absoluteUrl, CONNECT_FEE_LABEL, DIAGNOSTIC_NAME, PACKAGE_SETUP, PACKAGE_RETAINER, SPRINT_NAME, SYSTEM_NAME } from '../site';
import { SITE_AUTHOR, generatePersonSchema } from '../author';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate FAQPage schema from FAQ content
 */
export function generateFAQSchema(faqs: FAQ[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
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

/**
 * Generate Organization schema for Anthroly
 */
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
    description:
      'Anthroly runs the Founder AI Authority & Pipeline System: AI search visibility, founder authority, and qualified conversations — so brands become easier to discover, trust, and contact in the AI era. Humans do the work; machines help scale.',
    slogan: 'Become easier to discover, trust, and contact in the AI era.',
    foundingDate: '2024',
    email: 'sharatth@anthroly.com',
    knowsAbout: [
      'Answer Engine Optimization',
      'Generative Engine Optimization',
      'AI lead generation',
      'founder ghostwriting',
      'LinkedIn ghostwriting',
      'AI SEO',
      'AI Overviews',
      'ChatGPT SEO',
      'Claude AEO',
      'Perplexity citations',
      'Link building',
      'Content SEO',
      'Programmatic SEO',
      'LLM SEO',
      'AI brand visibility',
      'Digital PR for AI citations',
      'Entity SEO',
    ],
    areaServed: [
      { '@type': 'Country', name: 'Singapore' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'China' },
      { '@type': 'Country', name: 'New Zealand' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    sameAs: [
      'https://twitter.com/anthroly',
      'https://linkedin.com/company/anthroly',
      'https://www.producthunt.com/products/anthroly',
    ],
    founder: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      jobTitle: 'Founder',
      email: SITE_AUTHOR.email,
      url: SITE_AUTHOR.url,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sharatth@anthroly.com',
      url: absoluteUrl('/#pricing'),
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '216',
      highPrice: '1500',
      offerCount: '3',
      name: SYSTEM_NAME,
      description: `${SYSTEM_NAME}: ${CONNECT_FEE_LABEL} ${DIAGNOSTIC_NAME}, ${PACKAGE_SETUP} ${SPRINT_NAME}, then ${PACKAGE_RETAINER}/month.`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: SYSTEM_NAME,
      itemListElement: [
        {
          '@type': 'Offer',
          name: DIAGNOSTIC_NAME,
          price: '216',
          priceCurrency: 'USD',
          priceValidUntil: '2027-08-25',
        },
        {
          '@type': 'Offer',
          name: SPRINT_NAME,
          price: '1500',
          priceCurrency: 'USD',
          priceValidUntil: '2027-08-25',
        },
        {
          '@type': 'Offer',
          name: 'Monthly retainer',
          price: '1000',
          priceCurrency: 'USD',
          priceValidUntil: '2027-08-25',
        },
      ],
    },
  };
}

/**
 * Sitewide WebSite schema (homepage / root layout)
 */
export function generateWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Anthroly',
    url: SITE_URL,
    description:
      'Human-led SEO and AEO—backlinks, content, and AI-search visibility for Google and answer engines.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-US',
  };
}

/**
 * Generate Article schema
 */
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
    description: description,
    url: absoluteUrl(url),
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      jobTitle: SITE_AUTHOR.jobTitle,
      url: SITE_AUTHOR.url,
      worksFor: {
        '@type': 'Organization',
        name: 'Anthroly',
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Anthroly',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(url),
    },
  };
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  serviceType: string,
  areaServed?: string
): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    url: absoluteUrl(url),
    serviceType: serviceType,
    provider: {
      '@type': 'Organization',
      name: 'Anthroly',
      url: SITE_URL,
    },
  };

  if (areaServed) {
    schema.areaServed = {
      '@type': 'Place',
      name: areaServed,
    };
  }

  return schema;
}

/**
 * Generate HowTo schema for integration/setup pages
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<string | { name: string; text: string }>,
  extra?: { url?: string }
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(extra?.url ? { url: absoluteUrl(extra.url) } : {}),
    step: steps.map((step, index) => {
      if (typeof step === 'string') {
        return {
          '@type': 'HowToStep',
          position: index + 1,
          text: step,
        };
      }
      return {
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      };
    }),
  };
}

/**
 * Generate DefinedTerm schema for glossary pages
 */
export function generateDefinedTermSchema(
  term: string,
  definition: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'SEO and AI Marketing Glossary',
      url: absoluteUrl('/glossary'),
    },
  };
}

/**
 * Generate ItemList schema for directory/curation pages
 */
export function generateItemListSchema(
  name: string,
  items: { name: string; url: string; description: string }[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: item.name,
        url: absoluteUrl(item.url),
        description: item.description,
      },
    })),
  };
}

/**
 * Generate SoftwareApplication schema for tool pages
 */
export function generateSoftwareSchema(
  name: string,
  description: string,
  category: string,
  url?: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    applicationCategory: category,
    operatingSystem: 'Web',
    url: url,
  };
}

/**
 * Combine multiple schemas for a page
 */
export function combineSchemas(...schemas: object[]): string {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }
  
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas.map(schema => {
      // Remove @context from individual schemas when combining
      const { '@context': _, ...rest } = schema as Record<string, unknown>;
      return rest;
    }),
  });
}

/**
 * Generate complete structured data for a pSEO page
 */
export function generatePageStructuredData(page: PSEOPage): string {
  const schemas: object[] = [];

  schemas.push(generateWebPageSchema(page));
  
  // Always add FAQ schema if FAQs exist
  if (page.content.faq.length > 0) {
    schemas.push(generateFAQSchema(page.content.faq));
  }
  
  // Add the page's specific schema
  schemas.push(page.schema.structuredData);
  
  // Add breadcrumb schema
  const breadcrumbs = generateBreadcrumbsFromUrl(page.url);
  if (breadcrumbs.length > 1) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }
  
  // Add organization schema
  schemas.push(generateOrganizationSchema());
  schemas.push(generatePersonSchema());
  
  return combineSchemas(...schemas);
}

/** Stable dates so crawlers do not see a new lastmod on every request. */
const PSEO_DATE_PUBLISHED = '2025-06-01';
const PSEO_DATE_MODIFIED = '2026-08-25';

function generateWebPageSchema(page: PSEOPage): object {
  const url = absoluteUrl(page.url);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.seo.title,
    headline: page.content.h1,
    description: page.seo.metaDescription,
    datePublished: PSEO_DATE_PUBLISHED,
    dateModified: PSEO_DATE_MODIFIED,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      jobTitle: SITE_AUTHOR.jobTitle,
      url: SITE_AUTHOR.url,
    },
    reviewedBy: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      jobTitle: SITE_AUTHOR.jobTitle,
    },
    about: {
      '@type': 'Thing',
      name: page.content.h1,
    },
    ...(page.content.directAnswer
      ? {
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['[data-seo-summary]', 'h1'],
          },
        }
      : {}),
  };
}

/**
 * Generate breadcrumbs from URL path
 */
function generateBreadcrumbsFromUrl(url: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
  ];
  
  const parts = url.split('/').filter(Boolean);
  let currentPath = '';
  
  const categoryNames: Record<string, string> = {
    glossary: 'SEO Glossary',
    for: 'For',
    industries: 'Industries',
    'ai-seo-agency': 'Locations',
    integrations: 'Integrations',
    compare: 'Comparisons',
    tools: 'Tools',
    examples: 'Examples',
    templates: 'Templates',
    'use-cases': 'Use Cases',
    aeo: 'AEO',
    markets: 'Markets',
  };
  
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    
    if (index < parts.length - 1) {
      // Category level
      breadcrumbs.push({
        name: categoryNames[part] || part.charAt(0).toUpperCase() + part.slice(1),
        url: currentPath,
      });
    } else {
      // Current page - use a formatted version of the slug
      breadcrumbs.push({
        name: part.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        url: currentPath,
      });
    }
  });
  
  return breadcrumbs;
}
