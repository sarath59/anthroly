/**
 * SITEMAP INDEX
 * 
 * Google Requirements:
 * - Max 50,000 URLs per sitemap
 * - Max 50MB uncompressed per sitemap
 * - Sitemap index points to individual sitemaps
 * 
 * Our sitemaps breakdown:
 * 
 * sitemap/0 - Core + Base Pages (~322)
 *   - Index pages (11)
 *   - Glossary terms (60)
 *   - Personas (10)
 *   - Locations (149)
 *   - Industries (20)
 *   - Use Cases (18)
 *   - Integrations (14)
 *   - Tool comparisons (~25)
 * 
 * sitemap/1 - Two-way Part 1 (~4,470)
 *   - Persona × Location (1,490)
 *   - Industry × Location (2,980)
 * 
 * sitemap/2 - Two-way Part 2 (~1,840)
 *   - Glossary × Industry (1,200)
 *   - UseCase × Industry (360)
 *   - Integration × Industry (280)
 * 
 * sitemap/3-5 - Three-way: Persona×Industry×Location (~29,800)
 *   - 10 personas × 20 industries × 149 locations
 *   - Split into 3 chunks of ~10,000
 * 
 * sitemap/6-7 - Three-way: Glossary×Industry×Location (~60,000)
 *   - 60 terms × 20 industries × 149 locations = 178,800 total
 *   - We include first 60K (2 chunks of 30K) for high-value terms
 * 
 * sitemap/8-9 - Three-way: UseCase×Industry×Location (~53,640)
 *   - 18 use cases × 20 industries × 149 locations
 *   - Split into 2 chunks of ~30,000
 * 
 * TOTAL: ~150,000+ pages across 10 sitemaps
 */

const BASE_URL = 'https://www.anthroly.com';

export async function GET() {
  const now = new Date().toISOString();
  
  // 10 sitemaps total
  const sitemapIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  const sitemaps = sitemapIds.map(id => `
  <sitemap>
    <loc>${BASE_URL}/sitemap/${id}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
