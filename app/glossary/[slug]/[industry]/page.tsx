import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  generateGlossaryIndustryPage, 
  generatePageStructuredData,
  getIndexableGlossaryIndustryParams,
} from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';
import { readParams } from '@/lib/next-params';

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
  return getIndexableGlossaryIndustryParams();
}

// Generate metadata for SEO
export async function generateMetadata({ params: rawParams }: PageProps): Promise<Metadata> {
  const params = await readParams(rawParams);
  const page = generateGlossaryIndustryPage(params.slug, params.industry);
  
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

export default async function GlossaryIndustryPage({ params: rawParams }: PageProps) {
  const params = await readParams(rawParams);
  const page = generateGlossaryIndustryPage(params.slug, params.industry);
  
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
