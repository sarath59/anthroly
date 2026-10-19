/**
 * URLs from the previous agency site. They answer 410 Gone (not a redirect) so
 * search engines and AI crawlers drop the old pages and their snippets.
 */
const RETIRED_PREFIXES = [
  '/faq',
  '/aeo',
  '/anthroly-vs-anthropic',
  '/author',
  '/customers',
  '/tools',
  '/guides',
  '/reports',
  '/diagnostic',
  '/glossary',
  '/resources',
  '/markets',
  '/ai-seo-agency',
  '/industries',
  '/use-cases',
  '/for',
  '/integrations',
  '/compare',
  '/pricing',
  '/book',
  '/sitemap/',
];

export function isRetiredPath(pathname: string): boolean {
  const path = pathname.toLowerCase();
  if (/^\/sitemap-[^/]+\.xml$/.test(path)) return true;
  return RETIRED_PREFIXES.some(
    (prefix) =>
      path === prefix ||
      path.startsWith(prefix.endsWith('/') ? prefix : `${prefix}/`) ||
      path.startsWith(`${prefix}.`)
  );
}

export const GONE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page removed · Anthroly</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F5F1E8;color:#15140F;font-family:Georgia,serif;text-align:center;padding:24px}p{font-family:system-ui,sans-serif;color:#6E6A5E}a{color:#15140F}</style></head><body><main><h1>This page has been removed.</h1><p>Anthroly is now a data lab. <a href="/">Visit the homepage</a>.</p></main></body></html>`;
