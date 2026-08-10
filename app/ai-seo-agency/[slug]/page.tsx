import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  seoLocations,
  generateLocationPage,
  generatePageStructuredData,
  APAC_CITY_SLUGS,
} from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: { slug: string };
}

const APAC_SET = new Set<string>(APAC_CITY_SLUGS);

// Pre-build ALL APAC cities + top global hubs so Google gets fast 200s on first crawl
export async function generateStaticParams() {
  const apac = seoLocations.filter((l) => APAC_SET.has(l.slug));
  const rest = seoLocations.filter((l) => !APAC_SET.has(l.slug)).slice(0, 25);
  const seen = new Set<string>();
  return [...apac, ...rest]
    .filter((l) => {
      if (seen.has(l.slug)) return false;
      seen.add(l.slug);
      return true;
    })
    .map((location) => ({ slug: location.slug }));
}

// Enable ISR - pages regenerate every 24 hours  
export const revalidate = 86400;

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

export default function LocationPage({ params }: PageProps) {
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
