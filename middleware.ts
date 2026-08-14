import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from 'next/server';
import { trackAICrawlerRequest } from '@datafast/ai-crawl';
import { DATAFAST_WEBSITE_ID, SITE_URL } from '@/lib/site';

/** Marketing/tracking params that create duplicate URLs for Google */
const TRACKING_PARAMS = new Set([
  'ref',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
  'mc_cid',
  'mc_eid',
  '_ga',
  '_gl',
]);

function isTrackingParam(key: string): boolean {
  const normalized = key.toLowerCase();
  return TRACKING_PARAMS.has(normalized) || normalized.startsWith('utm_');
}

/**
 * 301-strip tracking query params so Google doesn't treat
 * e.g. /?ref=producthunt as a separate duplicate of /.
 * Also reports AI/search crawler hits to DataFast (non-blocking).
 */
export function middleware(request: NextRequest, event: NextFetchEvent) {
  trackAICrawlerRequest(request, event, {
    websiteId: DATAFAST_WEBSITE_ID,
    publicOrigin: SITE_URL,
    authToken: process.env.DATAFAST_BOT_TOKEN,
  });

  const { searchParams } = request.nextUrl;
  if (![...searchParams.keys()].some(isTrackingParam)) {
    return NextResponse.next();
  }

  const cleanUrl = request.nextUrl.clone();
  for (const key of [...cleanUrl.searchParams.keys()]) {
    if (isTrackingParam(key)) {
      cleanUrl.searchParams.delete(key);
    }
  }

  return NextResponse.redirect(cleanUrl, 301);
}

export const config = {
  // Keep robots.txt, llms.txt, llms-full.txt, and sitemaps in this matcher.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|map|webp|avif)$).*)',
  ],
};
