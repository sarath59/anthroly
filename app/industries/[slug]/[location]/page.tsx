import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEOPageLayout } from '@/components/pseo/PSEOPageLayout';
import { generateIndustryLocationPage } from '@/lib/pseo/combinations';
import { generatePageStructuredData } from '@/lib/pseo/schema';
import { absoluteUrl } from '@/lib/site';
import {
  APAC_CITY_SLUGS,
  APAC_PRIORITY_INDUSTRY_SLUGS,
} from '@/lib/pseo/data/apac-markets';

interface PageProps {
  params: { slug: string; location: string };
}

/** Pre-build APAC industry × city pages so Google never hits a cold ISR miss */
export async function generateStaticParams() {
  const params: { slug: string; location: string }[] = [];
  for (const slug of APAC_PRIORITY_INDUSTRY_SLUGS) {
    for (const location of APAC_CITY_SLUGS) {
      params.push({ slug, location });
    }
  }
  return params;
}

// Enable ISR - pages regenerate every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = generateIndustryLocationPage(params.slug, params.location);
  if (!page) return { title: 'Not Found' };
  
  return {
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords].join(', '),
    openGraph: {
      title: page.seo.title,
      description: page.seo.metaDescription,
      url: absoluteUrl(page.url),
      type: 'website',
    },
    alternates: {
      canonical: absoluteUrl(page.url),
    },
  };
}

export default function IndustryLocationPage({ params }: PageProps) {
  const page = generateIndustryLocationPage(params.slug, params.location);
  
  if (!page) {
    notFound();
  }
  
  const structuredData = generatePageStructuredData(page);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <PSEOPageLayout page={page} />
    </>
  );
}
