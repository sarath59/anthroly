import { SITE_URL } from '@/lib/site';
import { 
  seoGlossaryTerms, 
  targetPersonas, 
  seoLocations, 
  seoIntegrations,
  seoTools,
  industries,
  useCases,
} from '@/lib/pseo';


interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

function generateXml(entries: SitemapEntry[]): string {
  const urlset = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
}

// ============================================================================
// SITEMAP 0: CORE + BASE PAGES (~322 pages)
// ============================================================================
function generateCoreSitemap(): SitemapEntry[] {
  const now = new Date().toISOString();
  const entries: SitemapEntry[] = [];

  // Index pages (11)
  const indexPages = [
    { path: '', priority: 1.0 },
    { path: '/resources', priority: 0.9 },
    { path: '/glossary', priority: 0.9 },
    { path: '/for', priority: 0.9 },
    { path: '/ai-seo-agency', priority: 0.9 },
    { path: '/integrations', priority: 0.9 },
    { path: '/compare', priority: 0.9 },
    { path: '/industries', priority: 0.9 },
    { path: '/use-cases', priority: 0.9 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
  ];

  indexPages.forEach(page => {
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: page.priority,
    });
  });

  // Glossary terms (60)
  seoGlossaryTerms.forEach(term => {
    entries.push({
      url: `${SITE_URL}/glossary/${term.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Personas (10)
  targetPersonas.forEach(persona => {
    entries.push({
      url: `${SITE_URL}/for/${persona.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Locations (149)
  seoLocations.forEach(location => {
    entries.push({
      url: `${SITE_URL}/ai-seo-agency/${location.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Industries (20)
  industries.forEach(industry => {
    entries.push({
      url: `${SITE_URL}/industries/${industry.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Use Cases (18)
  useCases.forEach(useCase => {
    entries.push({
      url: `${SITE_URL}/use-cases/${useCase.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Integrations (14)
  seoIntegrations.forEach(integration => {
    entries.push({
      url: `${SITE_URL}/integrations/${integration.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Tool comparisons (~25)
  for (let i = 0; i < seoTools.length; i++) {
    for (let j = i + 1; j < seoTools.length; j++) {
      if (seoTools[i].category === seoTools[j].category) {
        entries.push({
          url: `${SITE_URL}/compare/${seoTools[i].slug}-vs-${seoTools[j].slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}

// ============================================================================
// SITEMAP 1: TWO-WAY PART 1 - Persona×Location + Industry×Location (~4,470)
// ============================================================================
function generateTwoWayPart1Sitemap(): SitemapEntry[] {
  const now = new Date().toISOString();
  const entries: SitemapEntry[] = [];

  // Persona × Location (10 × 149 = 1,490)
  targetPersonas.forEach(persona => {
    seoLocations.forEach(location => {
      entries.push({
        url: `${SITE_URL}/for/${persona.slug}/${location.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // Industry × Location (20 × 149 = 2,980)
  industries.forEach(industry => {
    seoLocations.forEach(location => {
      entries.push({
        url: `${SITE_URL}/industries/${industry.slug}/${location.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return entries;
}

// ============================================================================
// SITEMAP 2: TWO-WAY PART 2 - Glossary×Industry + UseCase×Industry + Integration×Industry (~1,840)
// ============================================================================
function generateTwoWayPart2Sitemap(): SitemapEntry[] {
  const now = new Date().toISOString();
  const entries: SitemapEntry[] = [];

  // Glossary × Industry (60 × 20 = 1,200)
  // Note: Using pattern /glossary/[slug]/[industry] to match route structure
  seoGlossaryTerms.forEach(term => {
    industries.forEach(industry => {
      entries.push({
        url: `${SITE_URL}/glossary/${term.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  // UseCase × Industry (18 × 20 = 360)
  useCases.forEach(useCase => {
    industries.forEach(industry => {
      entries.push({
        url: `${SITE_URL}/use-cases/${useCase.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  // Integration × Industry (14 × 20 = 280)
  seoIntegrations.forEach(integration => {
    industries.forEach(industry => {
      entries.push({
        url: `${SITE_URL}/integrations/${integration.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return entries;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  
  let entries: SitemapEntry[] = [];

  switch (id) {
    // Core pages
    case 0:
      entries = generateCoreSitemap();
      break;
    
    // Two-way combinations
    case 1:
      entries = generateTwoWayPart1Sitemap();
      break;
    case 2:
      entries = generateTwoWayPart2Sitemap();
      break;
    
    // Former three-way sitemap chunks — empty on purpose.
    // Thin 3-way URLs are noindex and must not be re-submitted.
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      entries = [];
      break;
    
    default:
      return new Response('Not found', { status: 404 });
  }

  const xml = generateXml(entries);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

// Generate static params for all sitemap IDs
export function generateStaticParams() {
  return [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
  ];
}
