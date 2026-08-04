import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  aeoTopics,
  answerEngines,
  generateAeoTopicEnginePage,
  generatePageStructuredData,
} from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: { slug: string; engine: string };
}

export const revalidate = 86400;
export const dynamicParams = true;

/**
 * Prebuild a sample of high-value Anthropic/Claude/ChatGPT two-ways.
 * Full 600+ matrix is in the sitemap and generated on-demand (ISR).
 */
export async function generateStaticParams() {
  const priority = answerEngines.filter(
    (e) => e.category === 'anthropic-claude' || e.category === 'openai-chatgpt'
  );
  const featuredTopics = aeoTopics.slice(0, 4);
  const params: { slug: string; engine: string }[] = [];
  for (const topic of featuredTopics) {
    for (const engine of priority) {
      params.push({ slug: topic.slug, engine: engine.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = generateAeoTopicEnginePage(params.slug, params.engine);
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

export default function AeoTopicEnginePage({ params }: PageProps) {
  const page = generateAeoTopicEnginePage(params.slug, params.engine);
  if (!page) notFound();
  const structuredData = generatePageStructuredData(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <PSEOPageLayout page={page} />
    </>
  );
}
