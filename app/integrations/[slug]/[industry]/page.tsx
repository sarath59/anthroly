import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  generateIntegrationIndustryPage, 
  generatePageStructuredData,
  getIndexableIntegrationIndustryParams,
} from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: { 
    slug: string;
    industry: string;
  };
}

export const dynamic = 'force-static';
export const revalidate = 86400;
export const dynamicParams = false;

export async function generateStaticParams() {
  return getIndexableIntegrationIndustryParams();
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = generateIntegrationIndustryPage(params.slug, params.industry);
  
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
      url: absoluteUrl(page.url),
      type: 'article',
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

export default function IntegrationIndustryPage({ params }: PageProps) {
  const page = generateIntegrationIndustryPage(params.slug, params.industry);
  
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
