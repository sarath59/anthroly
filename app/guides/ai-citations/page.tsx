import { Metadata } from 'next';
import { GuideLayout } from '@/components/guides/GuideLayout';
import { citationPillar } from '@/lib/guides/citations-cluster';
import { absoluteUrl } from '@/lib/site';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: citationPillar.metaTitle,
  description: citationPillar.metaDescription,
  alternates: { canonical: absoluteUrl(citationPillar.path) },
  openGraph: {
    title: citationPillar.metaTitle,
    description: citationPillar.metaDescription,
    url: absoluteUrl(citationPillar.path),
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: citationPillar.metaTitle,
    description: citationPillar.metaDescription,
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

export default function CitationPillarPage() {
  return <GuideLayout page={citationPillar} />;
}
