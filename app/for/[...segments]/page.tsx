import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  targetPersonas, 
  generatePersonaPage, 
  generatePageStructuredData,
  generatePersonaLocationPage,
  generatePersonaIndustryPage,
  generatePersonaIndustryLocationPage,
  getIndexablePersonaLocationParams,
  getIndexablePersonaIndustryParams,
  getIndexablePersonaThreeWayParams,
  isIndexablePersonaThreeWay,
} from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';
import { readParams } from '@/lib/next-params';

interface PageProps {
  params: { segments: string[] };
}

/**
 * Resolve /for/[persona]/[second] — second segment may be a location or industry.
 * Location wins if both ever collided (they currently do not).
 */
function generatePersonaTwoWayPage(personaSlug: string, secondSlug: string) {
  return (
    generatePersonaLocationPage(personaSlug, secondSlug) ??
    generatePersonaIndustryPage(personaSlug, secondSlug)
  );
}

/**
 * Catch-all route for /for/* pages
 * Handles:
 * - /for/[persona] - single persona page
 * - /for/[persona]/[location] - persona + location combo
 * - /for/[persona]/[industry] - persona + industry combo
 * - /for/[persona]/[industry]/[location] - persona + industry + location combo
 */

export async function generateStaticParams() {
  const params: { segments: string[] }[] = [];

  targetPersonas.forEach((persona) => {
    params.push({ segments: [persona.slug] });
  });

  for (const { persona, location } of getIndexablePersonaLocationParams()) {
    params.push({ segments: [persona, location] });
  }

  for (const { persona, industry } of getIndexablePersonaIndustryParams()) {
    params.push({ segments: [persona, industry] });
  }

  for (const { persona, industry, location } of getIndexablePersonaThreeWayParams()) {
    params.push({ segments: [persona, industry, location] });
  }

  return params;
}

// Enable ISR - pages regenerate every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { segments } = await readParams(params);
  
  if (segments.length === 1) {
    // Single persona
    const persona = targetPersonas.find((p) => p.slug === segments[0]);
    if (!persona) return { title: 'Not Found' };
    
    const page = generatePersonaPage(persona);
    return {
      title: page.seo.title,
      description: page.seo.metaDescription,
      keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
      alternates: { canonical: absoluteUrl(page.url) },
    };
  }
  
  if (segments.length === 2) {
    // Persona + Location OR Persona + Industry
    const page = generatePersonaTwoWayPage(segments[0], segments[1]);
    if (!page) return { title: 'Not Found' };
    
    return {
      title: page.seo.title,
      description: page.seo.metaDescription,
      keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
      alternates: { canonical: absoluteUrl(page.url) },
    };
  }
  
  if (segments.length === 3) {
    const page = generatePersonaIndustryLocationPage(segments[0], segments[1], segments[2]);
    if (!page) return { title: 'Not Found' };
    const indexable = isIndexablePersonaThreeWay(segments[0], segments[1], segments[2]);
    const canonical = indexable
      ? absoluteUrl(page.url)
      : absoluteUrl(`/for/${segments[0]}/${segments[1]}`);

    return {
      title: page.seo.title,
      description: page.seo.metaDescription,
      keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
      robots: { index: indexable, follow: true },
      alternates: { canonical },
    };
  }
  
  return { title: 'Not Found' };
}

export default async function ForPage({ params }: PageProps) {
  const { segments } = await readParams(params);
  
  let page;
  
  if (segments.length === 1) {
    // Single persona
    const persona = targetPersonas.find((p) => p.slug === segments[0]);
    if (!persona) notFound();
    page = generatePersonaPage(persona);
  } else if (segments.length === 2) {
    // Persona + Location OR Persona + Industry
    page = generatePersonaTwoWayPage(segments[0], segments[1]);
    if (!page) notFound();
  } else if (segments.length === 3) {
    // Persona + Industry + Location
    page = generatePersonaIndustryLocationPage(segments[0], segments[1], segments[2]);
    if (!page) notFound();
  } else {
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
