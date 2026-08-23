import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEOPageLayout } from '@/components/pseo/PSEOPageLayout';
import { generateIndustryLocationPage } from '@/lib/pseo/combinations';
import { generatePageStructuredData } from '@/lib/pseo/schema';
import { getIndexableIndustryLocationParams } from '@/lib/pseo/indexable';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: { slug: string; location: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getIndexableIndustryLocationParams();
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
