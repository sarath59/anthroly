import { 
  seoGlossaryTerms, 
  targetPersonas, 
  seoLocations, 
  seoIntegrations,
  seoTools,
  industries,
  useCases,
} from '@/lib/pseo';

const BASE_URL = 'https://www.anthroly.com';

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
      url: `${BASE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: page.priority,
    });
  });

  // Glossary terms (60)
  seoGlossaryTerms.forEach(term => {
    entries.push({
      url: `${BASE_URL}/glossary/${term.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Personas (10)
  targetPersonas.forEach(persona => {
    entries.push({
      url: `${BASE_URL}/for/${persona.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Locations (149)
  seoLocations.forEach(location => {
    entries.push({
      url: `${BASE_URL}/ai-seo-agency/${location.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Industries (20)
  industries.forEach(industry => {
    entries.push({
      url: `${BASE_URL}/industries/${industry.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Use Cases (18)
  useCases.forEach(useCase => {
    entries.push({
      url: `${BASE_URL}/use-cases/${useCase.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Integrations (14)
  seoIntegrations.forEach(integration => {
    entries.push({
      url: `${BASE_URL}/integrations/${integration.slug}`,
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
          url: `${BASE_URL}/compare/${seoTools[i].slug}-vs-${seoTools[j].slug}`,
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
        url: `${BASE_URL}/for/${persona.slug}/${location.slug}`,
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
        url: `${BASE_URL}/industries/${industry.slug}/${location.slug}`,
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
  seoGlossaryTerms.forEach(term => {
    industries.forEach(industry => {
      entries.push({
        url: `${BASE_URL}/glossary/${term.slug}/for-${industry.slug}`,
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
        url: `${BASE_URL}/use-cases/${useCase.slug}/${industry.slug}`,
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
        url: `${BASE_URL}/integrations/${integration.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return entries;
}

// ============================================================================
// SITEMAP 3-5: THREE-WAY - Persona×Industry×Location (29,800 pages in 3 chunks)
// ============================================================================
function generateThreeWayChunk(chunkIndex: number): SitemapEntry[] {
  const now = new Date().toISOString();
  const entries: SitemapEntry[] = [];
  
  const CHUNK_SIZE = 10000;
  let count = 0;
  const skip = chunkIndex * CHUNK_SIZE;
  let added = 0;

  outerLoop:
  for (const persona of targetPersonas) {
    for (const industry of industries) {
      for (const location of seoLocations) {
        if (count >= skip && added < CHUNK_SIZE) {
          entries.push({
            url: `${BASE_URL}/for/${persona.slug}/${industry.slug}/${location.slug}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
          });
          added++;
        }
        count++;
        if (added >= CHUNK_SIZE) break outerLoop;
      }
    }
  }

  return entries;
}

// ============================================================================
// SITEMAP 6-11: GLOSSARY THREE-WAY - Glossary×Industry×Location (178,800 pages, chunked)
// This is a HIGH VALUE combination for local SEO terms
// ============================================================================
function generateGlossaryThreeWayChunk(chunkIndex: number): SitemapEntry[] {
  const now = new Date().toISOString();
  const entries: SitemapEntry[] = [];
  
  const CHUNK_SIZE = 30000; // Larger chunks, stay under 50K limit
  let count = 0;
  const skip = chunkIndex * CHUNK_SIZE;
  let added = 0;

  outerLoop:
  for (const term of seoGlossaryTerms) {
    for (const industry of industries) {
      for (const location of seoLocations) {
        if (count >= skip && added < CHUNK_SIZE) {
          entries.push({
            url: `${BASE_URL}/glossary/${term.slug}/${industry.slug}/${location.slug}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.4,
          });
          added++;
        }
        count++;
        if (added >= CHUNK_SIZE) break outerLoop;
      }
    }
  }

  return entries;
}

// ============================================================================
// SITEMAP 12-13: USE CASE THREE-WAY - UseCase×Industry×Location (53,640 pages)
// ============================================================================
function generateUseCaseThreeWayChunk(chunkIndex: number): SitemapEntry[] {
  const now = new Date().toISOString();
  const entries: SitemapEntry[] = [];
  
  const CHUNK_SIZE = 30000;
  let count = 0;
  const skip = chunkIndex * CHUNK_SIZE;
  let added = 0;

  outerLoop:
  for (const useCase of useCases) {
    for (const industry of industries) {
      for (const location of seoLocations) {
        if (count >= skip && added < CHUNK_SIZE) {
          entries.push({
            url: `${BASE_URL}/use-cases/${useCase.slug}/${industry.slug}/${location.slug}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.4,
          });
          added++;
        }
        count++;
        if (added >= CHUNK_SIZE) break outerLoop;
      }
    }
  }

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
    
    // Three-way: Persona×Industry×Location (29,800 in 3 chunks)
    case 3:
      entries = generateThreeWayChunk(0);
      break;
    case 4:
      entries = generateThreeWayChunk(1);
      break;
    case 5:
      entries = generateThreeWayChunk(2);
      break;
    
    // Three-way: Glossary×Industry×Location (178,800 in 6 chunks of 30K)
    // We'll limit to first 60K (2 chunks) to stay reasonable
    case 6:
      entries = generateGlossaryThreeWayChunk(0);
      break;
    case 7:
      entries = generateGlossaryThreeWayChunk(1);
      break;
    
    // Three-way: UseCase×Industry×Location (53,640 in 2 chunks)
    case 8:
      entries = generateUseCaseThreeWayChunk(0);
      break;
    case 9:
      entries = generateUseCaseThreeWayChunk(1);
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
