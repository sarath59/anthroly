/**
 * Schema.org Structured Data Generator
 * Generates SEO-optimized structured data for all pSEO page types
 */

import { PSEOPage, FAQ } from './types';

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
      item: `https://anthroly.com${item.url}`,
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
    name: 'Anthroly',
    url: 'https://anthroly.com',
    logo: 'https://anthroly.com/logo.png',
    description: 'AI-powered SEO agency delivering automated backlinks, content, and search visibility optimization.',
    sameAs: [
      'https://twitter.com/anthroly',
      'https://linkedin.com/company/anthroly',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: 'https://anthroly.com/#pricing',
    },
    offers: {
      '@type': 'Offer',
      name: 'AI SEO Services',
      description: '24/7 AI-powered SEO including 30 blogs/month, 20-30 high-DR backlinks, and automated optimization',
      price: '99',
      priceCurrency: 'USD',
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
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
    url: `https://anthroly.com${url}`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: 'Anthroly',
      url: 'https://anthroly.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Anthroly',
      logo: {
        '@type': 'ImageObject',
        url: 'https://anthroly.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://anthroly.com${url}`,
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
    url: `https://anthroly.com${url}`,
    serviceType: serviceType,
    provider: {
      '@type': 'Organization',
      name: 'Anthroly',
      url: 'https://anthroly.com',
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
  steps: string[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
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
      url: 'https://anthroly.com/glossary',
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
        url: `https://anthroly.com${item.url}`,
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
  
  return combineSchemas(...schemas);
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
    for: 'Industries',
    'ai-seo-agency': 'Locations',
    integrations: 'Integrations',
    compare: 'Comparisons',
    tools: 'Tools',
    examples: 'Examples',
    templates: 'Templates',
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
