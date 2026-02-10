import { MetadataRoute } from 'next';
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

/**
 * SINGLE SITEMAP APPROACH
 * 
 * Next.js 14 generates /sitemap.xml automatically from this file.
 * We're keeping the total under 50,000 URLs by including:
 * - Core pages (11)
 * - Base single-dimension pages (~322)
 * - Two-way combinations (~6,632)
 * - Three-way persona×industry×location (29,800)
 * 
 * Total: ~36,765 pages (under 50K limit)
 * 
 * For additional pages, users can access /sitemap/6, /sitemap/7, etc.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // ============================================================================
  // INDEX PAGES (11)
  // ============================================================================
  const indexPages = [
    { path: '', priority: 1.0 as const },
    { path: '/resources', priority: 0.9 as const },
    { path: '/glossary', priority: 0.9 as const },
    { path: '/for', priority: 0.9 as const },
    { path: '/ai-seo-agency', priority: 0.9 as const },
    { path: '/integrations', priority: 0.9 as const },
    { path: '/compare', priority: 0.9 as const },
    { path: '/industries', priority: 0.9 as const },
    { path: '/use-cases', priority: 0.9 as const },
    { path: '/privacy', priority: 0.3 as const },
    { path: '/terms', priority: 0.3 as const },
  ];

  indexPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: page.priority,
    });
  });

  // ============================================================================
  // BASE PAGES - Single Dimension (~322 pages)
  // ============================================================================

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

  // ============================================================================
  // TWO-WAY COMBINATIONS (~6,632 pages)
  // ============================================================================

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

  // Glossary × Industry (60 × 20 = 1,200)
  seoGlossaryTerms.forEach(term => {
    industries.forEach(industry => {
      entries.push({
        url: `${BASE_URL}/glossary/${term.slug}/${industry.slug}`,
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

  // ============================================================================
  // THREE-WAY: Persona × Industry × Location (29,800 pages)
  // 10 personas × 20 industries × 149 locations
  // ============================================================================
  targetPersonas.forEach(persona => {
    industries.forEach(industry => {
      seoLocations.forEach(location => {
        entries.push({
          url: `${BASE_URL}/for/${persona.slug}/${industry.slug}/${location.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.5,
        });
      });
    });
  });

  // Total: ~36,765 pages (under 50K limit)
  return entries;
}
