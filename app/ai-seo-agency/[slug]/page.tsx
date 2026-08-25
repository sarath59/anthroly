import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  generateLocationPage,
  generatePageStructuredData,
  uniqueSeoLocations,
} from '@/lib/pseo';

const seoLocations = uniqueSeoLocations();
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';
import { readParams } from '@/lib/next-params';

interface PageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return uniqueSeoLocations().map((location) => ({ slug: location.slug }));
}

// Enable ISR - pages regenerate every 24 hours  
export const revalidate = 86400;

// Generate metadata for SEO
export async function generateMetadata({ params: rawParams }: PageProps): Promise<Metadata> {
  const params = await readParams(rawParams);
  const location = seoLocations.find((l) => l.slug === params.slug);
  
  if (!location) {
    return {
      title: 'Location Not Found | Anthroly',
    };
  }

  const page = generateLocationPage(location);

  return {
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
    openGraph: {
      title: page.seo.title,
      description: page.seo.metaDescription,
      url: absoluteUrl(page.url),
      type: 'website',
      siteName: 'Anthroly',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.title,
      description: page.seo.metaDescription,
    },
    alternates: {
      canonical: absoluteUrl(page.url),
    },
  };
}

export default async function LocationPage({ params: rawParams }: PageProps) {
  const params = await readParams(rawParams);
  const location = seoLocations.find((l) => l.slug === params.slug);
  
  if (!location) {
    notFound();
  }

  const page = generateLocationPage(location);
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
