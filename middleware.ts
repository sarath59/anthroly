import { NextRequest, NextResponse } from 'next/server';

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
 */
export function middleware(request: NextRequest) {
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
  matcher: ['/((?!_next/static|_next/image|api|favicon.ico|.*\\.[\\w]+$).*)'],
};
