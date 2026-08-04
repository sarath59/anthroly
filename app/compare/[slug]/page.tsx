import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seoTools, generateToolComparisonPage, generatePageStructuredData } from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: { slug: string };
}

// Generate static paths at build time for tool comparisons
export async function generateStaticParams() {
  const paths: { slug: string }[] = [];
  
  // Generate comparison paths for tools in similar categories
  for (let i = 0; i < seoTools.length; i++) {
    for (let j = i + 1; j < seoTools.length; j++) {
      if (seoTools[i].category === seoTools[j].category) {
        paths.push({
          slug: `${seoTools[i].slug}-vs-${seoTools[j].slug}`,
        });
      }
    }
  }
  
  return paths;
}

// Parse comparison slug to get tool IDs
function parseComparisonSlug(slug: string): { toolA: typeof seoTools[0]; toolB: typeof seoTools[0] } | null {
  const vsIndex = slug.indexOf('-vs-');
  if (vsIndex === -1) return null;
  
  const slugA = slug.substring(0, vsIndex);
  const slugB = slug.substring(vsIndex + 4);
  
  const toolA = seoTools.find(t => t.slug === slugA);
  const toolB = seoTools.find(t => t.slug === slugB);
  
  if (!toolA || !toolB) return null;
  
  return { toolA, toolB };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tools = parseComparisonSlug(params.slug);
  
  if (!tools) {
    return {
      title: 'Comparison Not Found | Anthroly',
    };
  }

  const page = generateToolComparisonPage(tools.toolA, tools.toolB);

  return {
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
    openGraph: {
      title: page.seo.title,
      description: page.seo.metaDescription,
      url: absoluteUrl(page.url),
      type: 'article',
      siteName: 'Anthroly',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.title,
      description: page.seo.metaDescription,
    },
    alternates: {
      canonical: absoluteUrl(page.url),
    },
  };
}

export default function ComparisonPage({ params }: PageProps) {
  const tools = parseComparisonSlug(params.slug);
  
  if (!tools) {
    notFound();
  }

  const page = generateToolComparisonPage(tools.toolA, tools.toolB);
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
