import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GuideLayout } from '@/components/guides/GuideLayout';
import { citationSpokes, getCitationSpoke } from '@/lib/guides/citations-cluster';
import { absoluteUrl } from '@/lib/site';
import { readParams } from '@/lib/next-params';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 86400;

export function generateStaticParams() {
  return citationSpokes.map((spoke) => ({ slug: spoke.slug as string }));
}

export async function generateMetadata({ params: rawParams }: PageProps): Promise<Metadata> {
  const params = await readParams(rawParams);
  const page = getCitationSpoke(params.slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: absoluteUrl(page.path) },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteUrl(page.path),
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function CitationSpokePage({ params: rawParams }: PageProps) {
  const params = await readParams(rawParams);
  const page = getCitationSpoke(params.slug);
  if (!page) notFound();
  return <GuideLayout page={page} />;
}
