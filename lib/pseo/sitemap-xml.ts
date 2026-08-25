import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { SITEMAP_TIERS, sitemapPublicPath, type SitemapTier } from './sitemap-entries';

type Entry = MetadataRoute.Sitemap[number];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function lastmodIso(value: Entry['lastModified']): string {
  if (!value) return new Date('2026-08-25T00:00:00.000Z').toISOString();
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function renderUrlset(entries: MetadataRoute.Sitemap): string {
  const body = entries
    .map((entry) => {
      const changefreq = entry.changeFrequency ?? 'weekly';
      const priority = entry.priority ?? 0.5;
      return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${lastmodIso(entry.lastModified)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function renderSitemapIndex(tiers: readonly SitemapTier[] = SITEMAP_TIERS): string {
  const lastmod = new Date('2026-08-25T00:00:00.000Z').toISOString();
  const body = tiers
    .map((tier) => {
      const loc = `${SITE_URL}${sitemapPublicPath(tier)}`;
      return `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

export const SITEMAP_XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=3600',
} as const;
