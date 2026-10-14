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

export const CONTACT_EMAIL = 'sharatth@anthroly.com';

/** Owns both sides of a deal: sourcing data from companies and selling to labs, plus marketing */
export const PARTNERSHIPS_CONTACT = {
  name: 'Jaya',
  title: 'Head of Data Partnerships',
  scope: 'Data acquisition, sales & marketing',
  email: 'jaya@anthroly.com',
} as const;
export const SITE_NAME = 'Anthroly';
export const TAGLINE = 'The data lab for American operating data';
export const SITE_DESCRIPTION =
  'Anthroly buys, licenses, and brokers operational data from US companies and supplies it to frontier AI labs as training corpora, RL environments, agent trajectories, and evaluation sets. $900K+ in data transacted.';

export const TRANSACTED_LABEL = '$900K+';
export const TRANSACTED_LINE = '$900K+ in data bought, sold, and brokered';

const LOGO_DEV_KEY = 'pk_FajouHbYTb2g0kE67Vlytw';

export function logoUrl(domain: string, size = 128): string {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_KEY}&size=${size}&format=png&greyscale=true`;
}

export const AI_LABS = [
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'Anthropic', domain: 'anthropic.com' },
  { name: 'Google DeepMind', domain: 'deepmind.google' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'xAI', domain: 'x.ai' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'NVIDIA', domain: 'nvidia.com' },
  { name: 'Mistral AI', domain: 'mistral.ai' },
  { name: 'Cohere', domain: 'cohere.com' },
] as const;

export const NAV_LINKS = [
  { href: '/#sell', label: 'Sell data' },
  { href: '/#labs', label: 'For AI labs' },
  { href: '/#process', label: 'Process' },
  { href: '/learn', label: 'Learn' },
] as const;
