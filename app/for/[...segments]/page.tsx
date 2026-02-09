import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  targetPersonas, 
  seoLocations,
  industries,
  generatePersonaPage, 
  generatePageStructuredData,
  generatePersonaLocationPage,
  generatePersonaIndustryLocationPage,
} from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';

interface PageProps {
  params: { segments: string[] };
}

/**
 * Catch-all route for /for/* pages
 * Handles:
 * - /for/[persona] - single persona page
 * - /for/[persona]/[location] - persona + location combo
 * - /for/[persona]/[industry]/[location] - persona + industry + location combo
 */

export async function generateStaticParams() {
  const params: { segments: string[] }[] = [];
  
  // Single persona pages: /for/[persona]
  targetPersonas.forEach((persona) => {
    params.push({ segments: [persona.slug] });
  });
  
  // Persona + Location pages: /for/[persona]/[location]
  targetPersonas.forEach((persona) => {
    seoLocations.forEach((location) => {
      params.push({ segments: [persona.slug, location.slug] });
    });
  });
  
  // Persona + Industry + Location pages: /for/[persona]/[industry]/[location]
  targetPersonas.forEach((persona) => {
    industries.forEach((industry) => {
      seoLocations.forEach((location) => {
        params.push({ segments: [persona.slug, industry.slug, location.slug] });
      });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { segments } = params;
  
  if (segments.length === 1) {
    // Single persona
    const persona = targetPersonas.find((p) => p.slug === segments[0]);
    if (!persona) return { title: 'Not Found' };
    
    const page = generatePersonaPage(persona);
    return {
      title: page.seo.title,
      description: page.seo.metaDescription,
      keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
      alternates: { canonical: `https://anthroly.com${page.url}` },
    };
  }
  
  if (segments.length === 2) {
    // Persona + Location
    const page = generatePersonaLocationPage(segments[0], segments[1]);
    if (!page) return { title: 'Not Found' };
    
    return {
      title: page.seo.title,
      description: page.seo.metaDescription,
      keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
      alternates: { canonical: `https://anthroly.com${page.url}` },
    };
  }
  
  if (segments.length === 3) {
    // Persona + Industry + Location
    const page = generatePersonaIndustryLocationPage(segments[0], segments[1], segments[2]);
    if (!page) return { title: 'Not Found' };
    
    return {
      title: page.seo.title,
      description: page.seo.metaDescription,
      keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
      alternates: { canonical: `https://anthroly.com${page.url}` },
    };
  }
  
  return { title: 'Not Found' };
}

export default function ForPage({ params }: PageProps) {
  const { segments } = params;
  
  let page;
  
  if (segments.length === 1) {
    // Single persona
    const persona = targetPersonas.find((p) => p.slug === segments[0]);
    if (!persona) notFound();
    page = generatePersonaPage(persona);
  } else if (segments.length === 2) {
    // Persona + Location
    page = generatePersonaLocationPage(segments[0], segments[1]);
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
