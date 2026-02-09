import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEOPageLayout } from '@/components/pseo/PSEOPageLayout';
import { generatePersonaLocationPage, getAllPersonaLocationSlugs } from '@/lib/pseo/combinations';
import { generatePageStructuredData } from '@/lib/pseo/schema';

interface PageProps {
  params: { persona: string; location: string };
}

export async function generateStaticParams() {
  const slugs = getAllPersonaLocationSlugs();
  return slugs.map(slug => {
    const [persona, location] = slug.split('/');
    return { persona, location };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = generatePersonaLocationPage(params.persona, params.location);
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

export default function PersonaLocationPage({ params }: PageProps) {
  const page = generatePersonaLocationPage(params.persona, params.location);
  
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
