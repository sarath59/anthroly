import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seoGlossaryTerms, generateGlossaryPage, generatePageStructuredData } from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';

interface PageProps {
  params: { slug: string };
}

// Generate static paths at build time
export async function generateStaticParams() {
  return seoGlossaryTerms.map((term) => ({
    slug: term.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const term = seoGlossaryTerms.find((t) => t.slug === params.slug);
  
  if (!term) {
    return {
      title: 'Term Not Found | Anthroly',
    };
  }

  const page = generateGlossaryPage(term);

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

export default function GlossaryTermPage({ params }: PageProps) {
  const term = seoGlossaryTerms.find((t) => t.slug === params.slug);
  
  if (!term) {
    notFound();
  }

  const page = generateGlossaryPage(term);
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
