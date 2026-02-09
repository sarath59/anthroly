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
 * GOOGLE SITEMAP REQUIREMENTS:
 * - Max 50,000 URLs per sitemap file
 * - Max 50MB (uncompressed) per file
 * - UTF-8 encoding
 * - URLs must be from single host only
 * - Use sitemap index for large sites
 * 
 * This generates a sitemap INDEX that references multiple sitemap files.
 * Each category gets its own sitemap to stay under limits.
 */

// Generate sitemap index - this tells Google where all our sitemaps are
export default function sitemap(): MetadataRoute.Sitemap {
  // For Next.js, we return a flat sitemap and let it handle the splitting
  // But we need to be strategic about what we include
  
  // IMPORTANT: Google prioritizes quality over quantity
  // We'll include the highest-value pages in the main sitemap
  // and create separate route handlers for combination pages
  
  const baseUrl = 'https://anthroly.com';
  const now = new Date();
  
  // ============================================================================
  // TIER 1: HIGH PRIORITY PAGES (Always in main sitemap)
  // ============================================================================
  
  const highPriorityPages: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Main category index pages
    {
      url: `${baseUrl}/glossary`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/for`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-seo-agency`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/integrations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ============================================================================
  // TIER 2: BASE PAGES (Single-dimension pages)
  // ============================================================================

  // Glossary pages (60)
  const glossaryPages: MetadataRoute.Sitemap = seoGlossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Persona pages (10)
  const personaPages: MetadataRoute.Sitemap = targetPersonas.map((persona) => ({
    url: `${baseUrl}/for/${persona.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Location pages (164)
  const locationPages: MetadataRoute.Sitemap = seoLocations.map((location) => ({
    url: `${baseUrl}/ai-seo-agency/${location.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Integration pages (14)
  const integrationPages: MetadataRoute.Sitemap = seoIntegrations.map((integration) => ({
    url: `${baseUrl}/integrations/${integration.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Industry pages (20)
  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Use case pages (18)
  const useCasePages: MetadataRoute.Sitemap = useCases.map((useCase) => ({
    url: `${baseUrl}/use-cases/${useCase.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Comparison pages (~25)
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
  // TIER 3: TWO-WAY COMBINATION PAGES
  // These are included in this main sitemap as they're under 50K total
  // ============================================================================

  // Persona + Location (10 × 164 = 1,640)
  const personaLocationPages: MetadataRoute.Sitemap = [];
  targetPersonas.forEach((persona) => {
    seoLocations.forEach((location) => {
      personaLocationPages.push({
        url: `${baseUrl}/for/${persona.slug}/${location.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });
  });

  // Industry + Location (20 × 164 = 3,280)
  const industryLocationPages: MetadataRoute.Sitemap = [];
  industries.forEach((industry) => {
    seoLocations.forEach((location) => {
      industryLocationPages.push({
        url: `${baseUrl}/industries/${industry.slug}/${location.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });
  });

  // Glossary + Industry (60 × 20 = 1,200)
  const glossaryIndustryPages: MetadataRoute.Sitemap = [];
  seoGlossaryTerms.forEach((term) => {
    industries.forEach((industry) => {
      glossaryIndustryPages.push({
        url: `${baseUrl}/glossary/${term.slug}/for-${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      });
    });
  });

  // Use case + Industry (18 × 20 = 360)
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

  // Integration + Industry (14 × 20 = 280)
  const integrationIndustryPages: MetadataRoute.Sitemap = [];
  seoIntegrations.forEach((integration) => {
    industries.forEach((industry) => {
      integrationIndustryPages.push({
        url: `${baseUrl}/integrations/${integration.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      });
    });
  });

  // Current total: ~7,000 URLs (well under 50K limit)
  // Three-way combinations will be in separate sitemap files
  
  return [
    ...highPriorityPages,
    ...glossaryPages,
    ...personaPages,
    ...locationPages,
    ...integrationPages,
    ...industryPages,
    ...useCasePages,
    ...comparisonPages,
    ...personaLocationPages,
    ...industryLocationPages,
    ...glossaryIndustryPages,
    ...useCaseIndustryPages,
    ...integrationIndustryPages,
  ];
}
