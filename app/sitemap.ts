import { MetadataRoute } from 'next';
import { 
  seoGlossaryTerms, 
  targetPersonas, 
  seoLocations, 
  seoIntegrations,
  seoTools,
  industries,
  useCases,
  blogPosts,
  answerEngines,
  aeoTopics,
  apacCountries,
  apacTopics,
  APAC_CITY_SLUGS,
  APAC_PRIORITY_INDUSTRY_SLUGS,
  APAC_PRIORITY_PERSONA_SLUGS,
} from '@/lib/pseo';
import { FREE_TOOLS } from '@/lib/data/free-tools';
import { SITE_URL } from '@/lib/site';
import { allCustomerStories } from '@/lib/customers';
import { getAllCustomerClusterPaths } from '@/lib/customer-clusters';


/**
 * INDEXABLE SITEMAP ONLY
 *
 * Next.js 14 generates /sitemap.xml from this file.
 *
 * INDEXING STRATEGY (APAC focus):
 * 1. Prioritize /markets country hubs + country×topic pages (unique long-form)
 * 2. Include all base pages + AEO
 * 3. For location two-ways, submit ONLY APAC cities (SG/CN/AU/NZ/HK)
 *    to protect crawl budget — thin global two-ways were getting
 *    "Crawled – currently not indexed"
 * 4. Three-ways remain omitted (noindex + canonical to parent)
 */

const APAC_CITY_SET = new Set<string>(APAC_CITY_SLUGS);
const APAC_INDUSTRY_SET = new Set<string>(APAC_PRIORITY_INDUSTRY_SLUGS);
const APAC_PERSONA_SET = new Set<string>(APAC_PRIORITY_PERSONA_SLUGS);

/** Stable lastmod for APAC market pack — avoid fake "everything changed today" signal */
const APAC_LASTMOD = new Date('2026-08-10T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // ============================================================================
  // INDEX PAGES
  // ============================================================================
  const indexPages = [
    { path: '', priority: 1.0 as const },
    { path: '/markets', priority: 0.98 as const },
    { path: '/resources', priority: 0.9 as const },
    { path: '/aeo', priority: 0.95 as const },
    { path: '/aeo/how-to-get-cited-in-ai-overviews', priority: 0.9 as const },
    { path: '/aeo/aeo-vs-seo-vs-geo', priority: 0.9 as const },
    { path: '/anthroly-vs-anthropic', priority: 0.95 as const },
    { path: '/reports/ai-visibility-benchmark', priority: 0.9 as const },
    { path: '/glossary', priority: 0.9 as const },
    { path: '/blog', priority: 0.9 as const },
    { path: '/customers', priority: 0.9 as const },
    { path: '/for', priority: 0.9 as const },
    { path: '/ai-seo-agency', priority: 0.9 as const },
    { path: '/integrations', priority: 0.9 as const },
    { path: '/compare', priority: 0.9 as const },
    { path: '/industries', priority: 0.9 as const },
    { path: '/use-cases', priority: 0.9 as const },
    { path: '/tools', priority: 0.9 as const },
    { path: '/privacy', priority: 0.3 as const },
    { path: '/terms', priority: 0.3 as const },
  ];

  indexPages.forEach(page => {
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: page.path === '/markets' ? APAC_LASTMOD : now,
      changeFrequency: 'weekly',
      priority: page.priority,
    });
  });

  // ============================================================================
  // APAC MARKETS — highest crawl priority (unique long-form)
  // 4 country hubs + ~112 country×topic spokes
  // ============================================================================
  apacCountries.forEach((country) => {
    entries.push({
      url: `${SITE_URL}/markets/${country.slug}`,
      lastModified: APAC_LASTMOD,
      changeFrequency: 'weekly',
      priority: country.slug === 'singapore' || country.slug === 'china' || country.slug === 'australia'
        ? 0.95
        : 0.9,
    });

    apacTopics.forEach((topic) => {
      entries.push({
        url: `${SITE_URL}/markets/${country.slug}/${topic.slug}`,
        lastModified: APAC_LASTMOD,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  // ============================================================================
  // BASE PAGES - Single Dimension (~322 pages)
  // ============================================================================

  // Glossary terms (60)
  seoGlossaryTerms.forEach(term => {
    entries.push({
      url: `${SITE_URL}/glossary/${term.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Blog posts (high citation value)
  blogPosts.forEach(post => {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Customer case studies (dedicated indexable page per brand)
  allCustomerStories.forEach(({ slug }) => {
    entries.push({
      url: `${SITE_URL}/customers/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    });
  });

  // Customer brand SEO clusters (results, AEO strategy, ChatGPT, quotes, playbook)
  // 20 brands × 5 topics = 100 unique indexable pages
  getAllCustomerClusterPaths().forEach(({ slug, topic }) => {
    entries.push({
      url: `${SITE_URL}/customers/${slug}/${topic}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // AEO engine hubs (22) — heavy Anthropic / Claude / ChatGPT coverage
  answerEngines.forEach(engine => {
    entries.push({
      url: `${SITE_URL}/aeo/engine/${engine.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: engine.category === 'anthropic-claude' || engine.category === 'openai-chatgpt' ? 0.85 : 0.75,
    });
  });

  // AEO topic hubs (28)
  aeoTopics.forEach(topic => {
    entries.push({
      url: `${SITE_URL}/aeo/topic/${topic.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // AEO topic × engine two-ways (22 × 28 = 616 controlled pages)
  aeoTopics.forEach(topic => {
    answerEngines.forEach(engine => {
      entries.push({
        url: `${SITE_URL}/aeo/topic/${topic.slug}/${engine.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
      });
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

  // Locations — APAC cities get higher priority
  seoLocations.forEach(location => {
    const isApac = APAC_CITY_SET.has(location.slug);
    entries.push({
      url: `${SITE_URL}/ai-seo-agency/${location.slug}`,
      lastModified: isApac ? APAC_LASTMOD : now,
      changeFrequency: 'monthly',
      priority: isApac ? 0.88 : 0.75,
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

  // Free tools (22)
  FREE_TOOLS.forEach(tool => {
    entries.push({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
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

  // ============================================================================
  // TWO-WAY COMBINATIONS — APAC-FIRST CRAWL BUDGET
  // Only submit location combos for Singapore / China / Australia / NZ / HK
  // ============================================================================

  const apacLocations = seoLocations.filter((l) => APAC_CITY_SET.has(l.slug));
  const priorityPersonas = targetPersonas.filter((p) => APAC_PERSONA_SET.has(p.slug));
  const priorityIndustries = industries.filter((i) => APAC_INDUSTRY_SET.has(i.slug));

  // Persona × APAC Location
  priorityPersonas.forEach((persona) => {
    apacLocations.forEach((location) => {
      entries.push({
        url: `${SITE_URL}/for/${persona.slug}/${location.slug}`,
        lastModified: APAC_LASTMOD,
        changeFrequency: 'monthly',
        priority: 0.72,
      });
    });
  });

  // Persona × Industry (keep — smaller set, useful)
  targetPersonas.forEach((persona) => {
    industries.forEach((industry) => {
      entries.push({
        url: `${SITE_URL}/for/${persona.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
      });
    });
  });

  // Industry × APAC Location (priority industries only)
  priorityIndustries.forEach((industry) => {
    apacLocations.forEach((location) => {
      entries.push({
        url: `${SITE_URL}/industries/${industry.slug}/${location.slug}`,
        lastModified: APAC_LASTMOD,
        changeFrequency: 'monthly',
        priority: 0.72,
      });
    });
  });

  // Glossary × Industry (top industries only — reduce thin crawl waste)
  seoGlossaryTerms.forEach((term) => {
    priorityIndustries.forEach((industry) => {
      entries.push({
        url: `${SITE_URL}/glossary/${term.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.55,
      });
    });
  });

  // UseCase × Industry
  useCases.forEach((useCase) => {
    priorityIndustries.forEach((industry) => {
      entries.push({
        url: `${SITE_URL}/use-cases/${useCase.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.55,
      });
    });
  });

  // Integration × Industry
  seoIntegrations.forEach((integration) => {
    priorityIndustries.forEach((industry) => {
      entries.push({
        url: `${SITE_URL}/integrations/${integration.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.55,
      });
    });
  });

  // Three-way pages intentionally omitted (noindex + not submitted).
  return entries;
}
