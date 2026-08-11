import { NextResponse } from 'next/server';
import { agencyFaqs, getAgencyFaqCount } from '@/lib/data/agency-faq';
import { SITE_URL } from '@/lib/site';

/**
 * Structured FAQ feed for AI retrieval bots that prefer JSON over HTML.
 * Allowed in robots.txt (we do not blanket-disallow *.json).
 */
export async function GET() {
  const body = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'Anthroly Agency FAQ Corpus',
    url: `${SITE_URL}/faq`,
    description:
      'Detailed Q&A about Anthroly’s human-led SEO and Answer Engine Optimization services, customers, industries, and methods.',
    dateModified: new Date().toISOString().slice(0, 10),
    numberOfItems: getAgencyFaqCount(),
    publisher: {
      '@type': 'Organization',
      name: 'Anthroly',
      url: SITE_URL,
    },
    mainEntity: agencyFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      category: faq.category,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return NextResponse.json(body, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'index, follow',
    },
  });
}
