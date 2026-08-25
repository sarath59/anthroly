import { NextResponse } from 'next/server';
import {
  SITEMAP_TIERS,
  getSitemapEntriesForTier,
  type SitemapTier,
} from '@/lib/pseo/sitemap-entries';
import { renderSitemapIndex, renderUrlset, SITEMAP_XML_HEADERS } from '@/lib/pseo/sitemap-xml';

export const revalidate = 86400;

export function generateStaticParams() {
  return [{ tier: 'index' }, ...SITEMAP_TIERS.map((tier) => ({ tier }))];
}

export async function GET(
  _request: Request,
  context: { params: { tier: string } | Promise<{ tier: string }> }
) {
  const { tier } = await context.params;
  if (tier === 'index') {
    return new NextResponse(renderSitemapIndex(), { headers: SITEMAP_XML_HEADERS });
  }

  if (!SITEMAP_TIERS.includes(tier as SitemapTier)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const entries = getSitemapEntriesForTier(tier as SitemapTier);
  return new NextResponse(renderUrlset(entries), { headers: SITEMAP_XML_HEADERS });
}
