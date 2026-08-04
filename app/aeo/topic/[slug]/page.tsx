import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  aeoTopics,
  generateAeoTopicPage,
  generatePageStructuredData,
} from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 86400;

export async function generateStaticParams() {
  return aeoTopics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = generateAeoTopicPage(params.slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
    alternates: { canonical: absoluteUrl(page.url) },
    openGraph: {
      title: page.seo.title,
      description: page.seo.metaDescription,
      url: absoluteUrl(page.url),
      images: [{ url: absoluteUrl('/logo.png'), alt: page.content.h1 }],
    },
  };
}

export default function AeoTopicPage({ params }: PageProps) {
  const page = generateAeoTopicPage(params.slug);
  if (!page) notFound();
  const structuredData = generatePageStructuredData(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <PSEOPageLayout page={page} />
    </>
  );
}
