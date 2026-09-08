import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getFreeToolBySlug, getAllFreeToolSlugs } from '@/lib/data/free-tools';
import { ToolRenderer } from '@/components/tools/ToolRenderer';
import { absoluteUrl } from '@/lib/site';
import { readParams } from '@/lib/next-params';
import { combineSchemas, generateHowToSchema } from '@/lib/schema';

interface PageProps {
  params: { slug: string };
}

const TOOL_HOWTO: Record<
  string,
  { name: string; description: string; steps: { name: string; text: string }[] }
> = {
  'meta-tag-generator': {
    name: 'Generate SEO meta tags',
    description: 'Create a title tag and meta description within search display limits.',
    steps: [
      { name: 'Enter the page topic', text: 'Describe the page in one sentence so the generator can draft a title.' },
      { name: 'Edit the title', text: 'Keep the title under about 60 characters and lead with the primary phrase.' },
      { name: 'Edit the description', text: 'Write a 150–160 character summary that matches the visible page.' },
      { name: 'Copy the HTML', text: 'Paste the tags into your document head. Do not invent claims the page does not make.' },
    ],
  },
  'serp-preview': {
    name: 'Preview a Google snippet',
    description: 'Check how a title and description may wrap in search results.',
    steps: [
      { name: 'Paste your title', text: 'Use the live title, not a keyword dump.' },
      { name: 'Paste your description', text: 'Match the page. Truncation in the preview is a warning, not a ranking score.' },
      { name: 'Adjust length', text: 'Shorten until the preview shows the promise you want clicked.' },
    ],
  },
  'faq-schema-generator': {
    name: 'Generate FAQ JSON-LD',
    description: 'Mark up questions that already appear on the page.',
    steps: [
      { name: 'Write visible FAQs first', text: 'Schema must match HTML. Hidden questions are spam.' },
      { name: 'Add each Q&A', text: 'One question, one answer. No keyword stuffing in the question.' },
      { name: 'Copy JSON-LD', text: 'Place it in the page. Validate that every question is on the page.' },
      { name: 'Link related guides', text: 'For citation strategy see the schema-that-helps guide.' },
    ],
  },
};

export async function generateStaticParams() {
  return getAllFreeToolSlugs().map((slug) => ({ slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params: rawParams }: PageProps): Promise<Metadata> {
  const params = await readParams(rawParams);
  const tool = getFreeToolBySlug(params.slug);
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

export default async function ToolPage({ params: rawParams }: PageProps) {
  const params = await readParams(rawParams);
  const tool = getFreeToolBySlug(params.slug);
  if (!tool) notFound();

  const howTo = TOOL_HOWTO[tool.slug];
  const jsonLd = howTo
    ? combineSchemas(
        generateHowToSchema(howTo.name, howTo.description, howTo.steps, {
          url: `/tools/${tool.slug}`,
        })
      )
    : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      )}
      <div className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/tools" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">All tools</span>
            </Link>
            <Link
              href="/guides/ai-citations/schema-that-helps"
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Schema that helps citations
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
