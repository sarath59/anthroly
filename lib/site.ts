/** Canonical site origin — must match sitemap, robots, and redirects */
export const SITE_URL = 'https://www.anthroly.com';

/** Public DataFast website ID (browser script + server-side bot tracking) */
export const DATAFAST_WEBSITE_ID = 'dfid_64UKkRm4SuynXLuxGKg4u';

/** Absolute URL helper for canonicals, Open Graph, and JSON-LD */
export function absoluteUrl(path: string = ''): string {
  if (!path) return SITE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Primary conversion: book a call */
export const BOOK_CALL_URL = 'https://cal.com/sarath-kavuru-0uizws/15min';

/** Label for primary CTA buttons site-wide */
export const PRIMARY_CTA_LABEL = 'Connect with us';
