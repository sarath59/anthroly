import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { targetPersonas, generatePersonaPage, generatePageStructuredData } from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';

interface PageProps {
  params: { slug: string };
}

// Generate static paths at build time
export async function generateStaticParams() {
  return targetPersonas.map((persona) => ({
    slug: persona.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const persona = targetPersonas.find((p) => p.slug === params.slug);
  
  if (!persona) {
    return {
      title: 'Page Not Found | Anthroly',
    };
  }

  const page = generatePersonaPage(persona);

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

export default function PersonaPage({ params }: PageProps) {
  const persona = targetPersonas.find((p) => p.slug === params.slug);
  
  if (!persona) {
    notFound();
  }

  const page = generatePersonaPage(persona);
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
