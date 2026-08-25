import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  answerEngines,
  generateAnswerEnginePage,
  generatePageStructuredData,
} from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';
import { readParams } from '@/lib/next-params';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 86400;
export const dynamicParams = false;

export async function generateStaticParams() {
  return answerEngines.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params: rawParams }: PageProps): Promise<Metadata> {
  const params = await readParams(rawParams);
  const page = generateAnswerEnginePage(params.slug);
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

export default async function AnswerEnginePage({ params: rawParams }: PageProps) {
  const params = await readParams(rawParams);
  const page = generateAnswerEnginePage(params.slug);
  if (!page) notFound();
  const structuredData = generatePageStructuredData(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <PSEOPageLayout page={page} />
    </>
  );
}
