import { targetPersonas, seoLocations, industries } from '@/lib/pseo';
import { NextResponse } from 'next/server';

/**
 * Dynamic sitemap for Persona × Industry × Location combinations
 * Total: 10 × 20 × 164 = 32,800 pages
 * Split into chunks of 10,000 URLs each (4 sitemap files)
 */

const URLS_PER_SITEMAP = 10000;
const baseUrl = 'https://anthroly.com';

// Generate all URLs
function getAllUrls(): string[] {
  const urls: string[] = [];
  targetPersonas.forEach((persona) => {
    industries.forEach((industry) => {
      seoLocations.forEach((location) => {
        urls.push(`${baseUrl}/for/${persona.slug}/${industry.slug}/${location.slug}`);
      });
    });
  });
  return urls;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const sitemapIndex = parseInt(params.id, 10);
  const allUrls = getAllUrls();
  
  const startIndex = sitemapIndex * URLS_PER_SITEMAP;
  const endIndex = Math.min(startIndex + URLS_PER_SITEMAP, allUrls.length);
  
  if (startIndex >= allUrls.length) {
    return new NextResponse('Sitemap not found', { status: 404 });
  }
  
  const urls = allUrls.slice(startIndex, endIndex);
  const lastmod = new Date().toISOString().split('T')[0];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

// Generate static params for build time
export async function generateStaticParams() {
  const allUrls = getAllUrls();
  const numSitemaps = Math.ceil(allUrls.length / URLS_PER_SITEMAP);
  
  return Array.from({ length: numSitemaps }, (_, i) => ({
    id: i.toString(),
  }));
}
