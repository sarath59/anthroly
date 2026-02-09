import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seoIntegrations, generateIntegrationPage, generatePageStructuredData } from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';

interface PageProps {
  params: { slug: string };
}

// Generate static paths at build time
export async function generateStaticParams() {
  return seoIntegrations.map((integration) => ({
    slug: integration.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const integration = seoIntegrations.find((i) => i.slug === params.slug);
  
  if (!integration) {
    return {
      title: 'Integration Not Found | Anthroly',
    };
  }

  const page = generateIntegrationPage(integration);

  return {
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
    openGraph: {
      title: page.seo.title,
      description: page.seo.metaDescription,
      url: `https://anthroly.com${page.url}`,
      type: 'article',
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

export default function IntegrationPage({ params }: PageProps) {
  const integration = seoIntegrations.find((i) => i.slug === params.slug);
  
  if (!integration) {
    notFound();
  }

  const page = generateIntegrationPage(integration);
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
