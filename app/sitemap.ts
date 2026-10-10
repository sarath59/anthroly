import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { ARTICLES } from '@/lib/learn/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date('2026-10-10'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/contact`, lastModified: new Date('2026-10-10'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/learn`, lastModified: new Date('2026-10-10'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date('2026-10-10'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date('2026-10-10'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const articles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_URL}/learn/${a.slug}`,
    lastModified: new Date(a.updated),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...core, ...articles];
}
