import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getFreeToolBySlug, getAllFreeToolSlugs } from '@/lib/data/free-tools';
import { ToolRenderer } from '@/components/tools/ToolRenderer';
import { Button } from '@/components/ui/button';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFreeToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getFreeToolBySlug(slug);
  if (!tool) {
    return { title: 'Tool Not Found | Anthroly' };
  }
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: absoluteUrl(`/tools/${tool.slug}`),
      type: 'website',
    },
    alternates: {
      canonical: absoluteUrl(`/tools/${tool.slug}`),
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getFreeToolBySlug(slug);
  if (!tool) notFound();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/tools" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">All tools</span>
            </Link>
            <Link href="/#pricing">
              <Button size="sm" variant="outline" className="rounded-full">
                Get custom tools
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">{tool.name}</h1>
          <p className="text-gray-400 mt-1">{tool.description}</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <ToolRenderer slug={tool.slug} />
      </main>
    </div>
  );
}
