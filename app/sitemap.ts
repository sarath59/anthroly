import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { FREE_TOOLS } from '@/lib/data/free-tools';
import { allCustomerStories } from '@/lib/customers';
import { getAllCustomerClusterPaths } from '@/lib/customer-clusters';
import { getCitationGuidePaths } from '@/lib/guides/citations-cluster';

const LASTMOD = new Date('2026-09-08T00:00:00.000Z');

function loc(
  path: string,
  opts: {
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
    priority: number;
  }
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: LASTMOD,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    loc('', { changeFrequency: 'daily', priority: 1.0 }),
    loc('/faq', { changeFrequency: 'weekly', priority: 0.95 }),
    loc('/aeo', { changeFrequency: 'weekly', priority: 0.95 }),
    loc('/aeo/how-to-get-cited-in-ai-overviews', { changeFrequency: 'weekly', priority: 0.9 }),
    loc('/aeo/aeo-vs-seo-vs-geo', { changeFrequency: 'weekly', priority: 0.9 }),
    loc('/anthroly-vs-anthropic', { changeFrequency: 'weekly', priority: 0.95 }),
    loc('/reports/ai-visibility-benchmark', { changeFrequency: 'weekly', priority: 0.9 }),
    loc('/customers', { changeFrequency: 'weekly', priority: 0.9 }),
    loc('/tools', { changeFrequency: 'weekly', priority: 0.9 }),
    loc('/author/sarath-kavuru', { changeFrequency: 'weekly', priority: 0.7 }),
    loc('/guides/ai-citations', { changeFrequency: 'weekly', priority: 0.92 }),
    loc('/privacy', { changeFrequency: 'yearly', priority: 0.3 }),
    loc('/terms', { changeFrequency: 'yearly', priority: 0.3 }),
  ];

  getCitationGuidePaths()
    .filter((path) => path !== '/guides/ai-citations')
    .forEach((path) => {
      entries.push(loc(path, { changeFrequency: 'weekly', priority: 0.86 }));
    });

  allCustomerStories.forEach(({ slug }) => {
    entries.push(loc(`/customers/${slug}`, { changeFrequency: 'weekly', priority: 0.85 }));
  });

  getAllCustomerClusterPaths().forEach(({ slug, topic }) => {
    entries.push(loc(`/customers/${slug}/${topic}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  FREE_TOOLS.forEach((tool) => {
    entries.push(loc(`/tools/${tool.slug}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  return entries;
}
