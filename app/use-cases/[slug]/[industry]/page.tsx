import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEOPageLayout } from '@/components/pseo/PSEOPageLayout';
import { generateUseCaseIndustryPage, getAllUseCaseIndustrySlugs } from '@/lib/pseo/combinations';
import { generatePageStructuredData } from '@/lib/pseo/schema';

interface PageProps {
  params: { slug: string; industry: string };
}

export async function generateStaticParams() {
  const slugs = getAllUseCaseIndustrySlugs();
  return slugs.map(slug => {
    const [useCase, industry] = slug.split('/');
    return { slug: useCase, industry };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = generateUseCaseIndustryPage(params.slug, params.industry);
  if (!page) return { title: 'Not Found' };
  
  return {
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords].join(', '),
    openGraph: {
      title: page.seo.title,
      description: page.seo.metaDescription,
      url: `https://anthroly.com${page.url}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://anthroly.com${page.url}`,
    },
  };
}

export default function UseCaseIndustryPage({ params }: PageProps) {
  const page = generateUseCaseIndustryPage(params.slug, params.industry);
  
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
