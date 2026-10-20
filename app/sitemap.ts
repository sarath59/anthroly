import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { ARTICLES } from '@/lib/learn/articles';
import { getAllPosts } from '@/lib/blog';
import { COMPARISONS } from '@/lib/resources/compare';

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date('2026-10-10'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/expert-data`, lastModified: new Date('2026-10-14'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE_URL}/contact`, lastModified: new Date('2026-10-10'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/learn`, lastModified: new Date('2026-10-10'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date('2026-10-10'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date('2026-10-10'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const articles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_URL}/learn/${a.slug}`,
    lastModified: new Date(a.updated),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const blogPosts: MetadataRoute.Sitemap = getAllPosts()
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.85,
    }));

  const resources: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/research/glossary`, lastModified: new Date('2026-10-20'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/research/compare`, lastModified: new Date('2026-10-20'), changeFrequency: 'monthly', priority: 0.8 },
    ...COMPARISONS.map((c) => ({
      url: `${SITE_URL}/research/compare/${c.slug}`,
      lastModified: new Date('2026-10-20'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/research/eval-sample-size-calculator`, lastModified: new Date('2026-10-20'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/authors/sarath-kavuru`, lastModified: new Date('2026-10-20'), changeFrequency: 'monthly', priority: 0.6 },
  ];

  return [...core, ...articles, ...blogPosts, ...resources];
}
