import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  useCases, 
  industries, 
  seoLocations, 
  generateUseCaseIndustryLocationPage, 
  generatePageStructuredData 
} from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';

interface PageProps {
  params: { 
    slug: string;
    industry: string;
    location: string;
  };
}

// Use ISR instead of static generation for these pages
// This allows on-demand generation and caching
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate every 24 hours

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = generateUseCaseIndustryLocationPage(params.slug, params.industry, params.location);
  
  if (!page) {
    return {
      title: 'Page Not Found | Anthroly',
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
    openGraph: {
      title: page.seo.title,
      description: page.seo.metaDescription,
      url: `https://www.anthroly.com${page.url}`,
      type: 'article',
      siteName: 'Anthroly',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.title,
      description: page.seo.metaDescription,
    },
    alternates: {
      canonical: `https://www.anthroly.com${page.url}`,
    },
  };
}

export default function UseCaseIndustryLocationPage({ params }: PageProps) {
  const page = generateUseCaseIndustryLocationPage(params.slug, params.industry, params.location);
  
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
