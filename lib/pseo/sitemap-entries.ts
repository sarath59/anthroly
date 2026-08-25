/**
 * Inventory-locked sitemap URL sets.
 * Paths match generateStaticParams / lib/pseo/indexable.ts — no cold 404s.
 */

import { MetadataRoute } from 'next';
import {
  seoGlossaryTerms,
  targetPersonas,
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
  uniqueSeoLocations,
  getIndexablePersonaLocationParams,
  getIndexablePersonaIndustryParams,
  getIndexableIndustryLocationParams,
  getIndexableGlossaryIndustryParams,
  getIndexableUseCaseIndustryParams,
  getIndexableIntegrationIndustryParams,
  getIndexablePersonaThreeWayParams,
} from '@/lib/pseo';
import { FREE_TOOLS } from '@/lib/data/free-tools';
import { SITE_URL } from '@/lib/site';
import { allCustomerStories } from '@/lib/customers';
import { getAllCustomerClusterPaths } from '@/lib/customer-clusters';

export const SITEMAP_TIERS = ['core', 'twoway-apac', 'twoway', 'threeway', 'aeo'] as const;
export type SitemapTier = (typeof SITEMAP_TIERS)[number];

/** Public filenames for Search Console. Internal handlers stay at /sitemaps/[tier]. */
export const SITEMAP_PUBLIC_PATHS: Record<SitemapTier, string> = {
  core: '/sitemap-core.xml',
  'twoway-apac': '/sitemap-apac-twoway.xml',
  twoway: '/sitemap-twoway.xml',
  threeway: '/sitemap-threeway.xml',
  aeo: '/sitemap-aeo.xml',
};

export function sitemapChildPath(tier: SitemapTier): string {
  return `/sitemaps/${tier}`;
}

export function sitemapPublicPath(tier: SitemapTier): string {
  return SITEMAP_PUBLIC_PATHS[tier];
}

const APAC_CITY_SET = new Set<string>(APAC_CITY_SLUGS);
const seoLocations = uniqueSeoLocations();
const APAC_LASTMOD = new Date('2026-08-10T00:00:00.000Z');
const CONTENT_LASTMOD = new Date('2026-08-25T00:00:00.000Z');

type Entry = MetadataRoute.Sitemap[number];

function loc(
  path: string,
  opts: {
    lastModified?: Date;
    changeFrequency: NonNullable<Entry['changeFrequency']>;
    priority: number;
  }
): Entry {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: opts.lastModified ?? CONTENT_LASTMOD,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
  };
}

export function getCoreSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const indexPages = [
    { path: '', priority: 1.0 as const, daily: true },
    { path: '/markets', priority: 0.98 as const, daily: true },
    { path: '/resources', priority: 0.9 as const, daily: false },
    { path: '/aeo', priority: 0.95 as const, daily: true },
    { path: '/aeo/how-to-get-cited-in-ai-overviews', priority: 0.9 as const, daily: false },
    { path: '/aeo/aeo-vs-seo-vs-geo', priority: 0.9 as const, daily: false },
    { path: '/anthroly-vs-anthropic', priority: 0.95 as const, daily: true },
    { path: '/reports/ai-visibility-benchmark', priority: 0.9 as const, daily: false },
    { path: '/glossary', priority: 0.9 as const, daily: false },
    { path: '/blog', priority: 0.9 as const, daily: false },
    { path: '/customers', priority: 0.9 as const, daily: false },
    { path: '/faq', priority: 0.95 as const, daily: true },
    { path: '/for', priority: 0.9 as const, daily: false },
    { path: '/ai-seo-agency', priority: 0.9 as const, daily: false },
    { path: '/integrations', priority: 0.9 as const, daily: false },
    { path: '/compare', priority: 0.9 as const, daily: false },
    { path: '/industries', priority: 0.9 as const, daily: false },
    { path: '/use-cases', priority: 0.9 as const, daily: false },
    { path: '/tools', priority: 0.9 as const, daily: false },
    { path: '/privacy', priority: 0.3 as const, daily: false },
    { path: '/terms', priority: 0.3 as const, daily: false },
  ];

  indexPages.forEach((page) => {
    entries.push(
      loc(page.path, {
        lastModified: page.path === '/markets' ? APAC_LASTMOD : CONTENT_LASTMOD,
        changeFrequency: page.daily ? 'daily' : 'weekly',
        priority: page.priority,
      })
    );
  });

  apacCountries.forEach((country) => {
    entries.push(
      loc(`/markets/${country.slug}`, {
        lastModified: APAC_LASTMOD,
        changeFrequency: 'daily',
        priority:
          country.slug === 'singapore' || country.slug === 'china' || country.slug === 'australia'
            ? 0.95
            : 0.9,
      })
    );

    apacTopics.forEach((topic) => {
      entries.push(
        loc(`/markets/${country.slug}/${topic.slug}`, {
          lastModified: APAC_LASTMOD,
          changeFrequency: 'daily',
          priority: 0.85,
        })
      );
    });
  });

  seoGlossaryTerms.forEach((term) => {
    entries.push(loc(`/glossary/${term.slug}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  blogPosts.forEach((post) => {
    entries.push(loc(`/blog/${post.slug}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  allCustomerStories.forEach(({ slug }) => {
    entries.push(loc(`/customers/${slug}`, { changeFrequency: 'weekly', priority: 0.85 }));
  });

  getAllCustomerClusterPaths().forEach(({ slug, topic }) => {
    entries.push(loc(`/customers/${slug}/${topic}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  targetPersonas.forEach((persona) => {
    entries.push(loc(`/for/${persona.slug}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  seoLocations.forEach((location) => {
    const isApac = APAC_CITY_SET.has(location.slug);
    entries.push(
      loc(`/ai-seo-agency/${location.slug}`, {
        lastModified: isApac ? APAC_LASTMOD : CONTENT_LASTMOD,
        changeFrequency: isApac ? 'daily' : 'weekly',
        priority: isApac ? 0.88 : 0.75,
      })
    );
  });

  industries.forEach((industry) => {
    entries.push(loc(`/industries/${industry.slug}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  useCases.forEach((useCase) => {
    entries.push(loc(`/use-cases/${useCase.slug}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  seoIntegrations.forEach((integration) => {
    entries.push(
      loc(`/integrations/${integration.slug}`, { changeFrequency: 'weekly', priority: 0.7 })
    );
  });

  FREE_TOOLS.forEach((tool) => {
    entries.push(loc(`/tools/${tool.slug}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  for (let i = 0; i < seoTools.length; i++) {
    for (let j = i + 1; j < seoTools.length; j++) {
      if (seoTools[i].category === seoTools[j].category) {
        entries.push(
          loc(`/compare/${seoTools[i].slug}-vs-${seoTools[j].slug}`, {
            changeFrequency: 'weekly',
            priority: 0.7,
          })
        );
      }
    }
  }

  return entries;
}

export function getAeoSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  answerEngines.forEach((engine) => {
    entries.push(
      loc(`/aeo/engine/${engine.slug}`, {
        changeFrequency: 'weekly',
        priority:
          engine.category === 'anthropic-claude' || engine.category === 'openai-chatgpt' ? 0.85 : 0.75,
      })
    );
  });

  aeoTopics.forEach((topic) => {
    entries.push(loc(`/aeo/topic/${topic.slug}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  aeoTopics.forEach((topic) => {
    answerEngines.forEach((engine) => {
      entries.push(
        loc(`/aeo/topic/${topic.slug}/${engine.slug}`, {
          changeFrequency: 'weekly',
          priority: 0.65,
        })
      );
    });
  });

  return entries;
}

export function getTwoWayApacSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  getIndexablePersonaLocationParams().forEach(({ persona, location }) => {
    if (!APAC_CITY_SET.has(location)) return;
    entries.push(
      loc(`/for/${persona}/${location}`, {
        lastModified: APAC_LASTMOD,
        changeFrequency: 'daily',
        priority: 0.72,
      })
    );
  });

  getIndexableIndustryLocationParams().forEach(({ slug, location }) => {
    if (!APAC_CITY_SET.has(location)) return;
    entries.push(
      loc(`/industries/${slug}/${location}`, {
        lastModified: APAC_LASTMOD,
        changeFrequency: 'daily',
        priority: 0.72,
      })
    );
  });

  return entries;
}

export function getTwoWaySitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  getIndexablePersonaLocationParams().forEach(({ persona, location }) => {
    if (APAC_CITY_SET.has(location)) return;
    entries.push(
      loc(`/for/${persona}/${location}`, {
        changeFrequency: 'weekly',
        priority: 0.64,
      })
    );
  });

  getIndexablePersonaIndustryParams().forEach(({ persona, industry }) => {
    entries.push(
      loc(`/for/${persona}/${industry}`, {
        changeFrequency: 'weekly',
        priority: 0.65,
      })
    );
  });

  getIndexableIndustryLocationParams().forEach(({ slug, location }) => {
    if (APAC_CITY_SET.has(location)) return;
    entries.push(
      loc(`/industries/${slug}/${location}`, {
        changeFrequency: 'weekly',
        priority: 0.64,
      })
    );
  });

  getIndexableGlossaryIndustryParams().forEach(({ slug, industry }) => {
    entries.push(
      loc(`/glossary/${slug}/${industry}`, {
        changeFrequency: 'weekly',
        priority: 0.55,
      })
    );
  });

  getIndexableUseCaseIndustryParams().forEach(({ slug, industry }) => {
    entries.push(
      loc(`/use-cases/${slug}/${industry}`, {
        changeFrequency: 'weekly',
        priority: 0.55,
      })
    );
  });

  getIndexableIntegrationIndustryParams().forEach(({ slug, industry }) => {
    entries.push(
      loc(`/integrations/${slug}/${industry}`, {
        changeFrequency: 'weekly',
        priority: 0.55,
      })
    );
  });

  return entries;
}

export function getThreeWaySitemapEntries(): MetadataRoute.Sitemap {
  return getIndexablePersonaThreeWayParams().map(({ persona, industry, location }) =>
    loc(`/for/${persona}/${industry}/${location}`, {
      lastModified: APAC_CITY_SET.has(location) ? APAC_LASTMOD : CONTENT_LASTMOD,
      changeFrequency: APAC_CITY_SET.has(location) ? 'daily' : 'weekly',
      priority: 0.6,
    })
  );
}

export function getSitemapEntriesForTier(tier: SitemapTier): MetadataRoute.Sitemap {
  switch (tier) {
    case 'core':
      return getCoreSitemapEntries();
    case 'twoway-apac':
      return getTwoWayApacSitemapEntries();
    case 'twoway':
      return getTwoWaySitemapEntries();
    case 'threeway':
      return getThreeWaySitemapEntries();
    case 'aeo':
      return getAeoSitemapEntries();
  }
}

export function getAllIndexableAbsoluteUrls(): string[] {
  return SITEMAP_TIERS.flatMap((tier) => getSitemapEntriesForTier(tier).map((entry) => entry.url));
}
