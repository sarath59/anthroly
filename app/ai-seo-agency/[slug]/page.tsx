import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seoLocations, generateLocationPage, generatePageStructuredData } from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';

interface PageProps {
  params: { slug: string };
}

// Pre-generate top 20 locations, rest use ISR
export async function generateStaticParams() {
  // Only pre-build the top 20 most important locations
  return seoLocations.slice(0, 20).map((location) => ({
    slug: location.slug,
  }));
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
      url: `https://anthroly.com${page.url}`,
      type: 'website',
      siteName: 'Anthroly',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.title,
      description: page.seo.metaDescription,
    },
    alternates: {
      canonical: `https://anthroly.com${page.url}`,
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
