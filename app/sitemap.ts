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

/**
 * CRAWLER-OPTIMIZED SITEMAP
 * 
 * Google Crawler Considerations:
 * - Timeout: ~5-10 seconds per page
 * - All pages here use generateStaticParams() = pre-built at deploy
 * - Googlebot receives instant HTML response (<100ms)
 * - No server-side computation during crawl
 * 
 * Total: ~40K pages (all statically generated)
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anthroly.com';
  const now = new Date();
  
  // ============================================================================
  // TIER 1: INDEX PAGES (11 pages)
  // ============================================================================
  
  const indexPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/for`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/ai-seo-agency`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/integrations`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/use-cases`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // ============================================================================
  // TIER 1: BASE PAGES (322 pages) - Single dimension
  // ============================================================================

  // Glossary (60)
  const glossaryPages: MetadataRoute.Sitemap = seoGlossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Personas (10)
  const personaPages: MetadataRoute.Sitemap = targetPersonas.map((persona) => ({
    url: `${baseUrl}/for/${persona.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Locations (164)
  const locationPages: MetadataRoute.Sitemap = seoLocations.map((location) => ({
    url: `${baseUrl}/ai-seo-agency/${location.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Integrations (14)
  const integrationPages: MetadataRoute.Sitemap = seoIntegrations.map((integration) => ({
    url: `${baseUrl}/integrations/${integration.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Industries (20)
  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Use Cases (18)
  const useCasePages: MetadataRoute.Sitemap = useCases.map((useCase) => ({
    url: `${baseUrl}/use-cases/${useCase.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Tool Comparisons (~25)
  const comparisonPages: MetadataRoute.Sitemap = [];
  for (let i = 0; i < seoTools.length; i++) {
    for (let j = i + 1; j < seoTools.length; j++) {
      if (seoTools[i].category === seoTools[j].category) {
        comparisonPages.push({
          url: `${baseUrl}/compare/${seoTools[i].slug}-vs-${seoTools[j].slug}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }
  }

  // ============================================================================
  // TIER 2: TWO-WAY COMBINATIONS (6,760 pages)
  // ============================================================================

  // Persona × Location (1,640)
  const personaLocationPages: MetadataRoute.Sitemap = [];
  targetPersonas.forEach((persona) => {
    seoLocations.forEach((location) => {
      personaLocationPages.push({
        url: `${baseUrl}/for/${persona.slug}/${location.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    });
  });

  // Industry × Location (3,280)
  const industryLocationPages: MetadataRoute.Sitemap = [];
  industries.forEach((industry) => {
    seoLocations.forEach((location) => {
      industryLocationPages.push({
        url: `${baseUrl}/industries/${industry.slug}/${location.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    });
  });

  // Glossary × Industry (1,200)
  const glossaryIndustryPages: MetadataRoute.Sitemap = [];
  seoGlossaryTerms.forEach((term) => {
    industries.forEach((industry) => {
      glossaryIndustryPages.push({
        url: `${baseUrl}/glossary/${term.slug}/for-${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });
  });

  // UseCase × Industry (360)
  const useCaseIndustryPages: MetadataRoute.Sitemap = [];
  useCases.forEach((useCase) => {
    industries.forEach((industry) => {
      useCaseIndustryPages.push({
        url: `${baseUrl}/use-cases/${useCase.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });
  });

  // Integration × Industry (280)
  const integrationIndustryPages: MetadataRoute.Sitemap = [];
  seoIntegrations.forEach((integration) => {
    industries.forEach((industry) => {
      integrationIndustryPages.push({
        url: `${baseUrl}/integrations/${integration.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });
  });

  // ============================================================================
  // TIER 3: THREE-WAY COMBINATIONS (32,800 pages)
  // Persona × Industry × Location - highest value 3-way combo
  // ============================================================================

  const personaIndustryLocationPages: MetadataRoute.Sitemap = [];
  targetPersonas.forEach((persona) => {
    industries.forEach((industry) => {
      seoLocations.forEach((location) => {
        personaIndustryLocationPages.push({
          url: `${baseUrl}/for/${persona.slug}/${industry.slug}/${location.slug}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.5,
        });
      });
    });
  });

  // ============================================================================
  // TOTAL: ~40K pages (all statically generated)
  // ============================================================================

  return [
    ...indexPages,                    // 11
    ...glossaryPages,                 // 60
    ...personaPages,                  // 10
    ...locationPages,                 // 164
    ...integrationPages,              // 14
    ...industryPages,                 // 20
    ...useCasePages,                  // 18
    ...comparisonPages,               // ~25
    ...personaLocationPages,          // 1,640
    ...industryLocationPages,         // 3,280
    ...glossaryIndustryPages,         // 1,200
    ...useCaseIndustryPages,          // 360
    ...integrationIndustryPages,      // 280
    ...personaIndustryLocationPages,  // 32,800
  ];
}
