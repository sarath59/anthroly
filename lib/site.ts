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

/** $216 Founder Growth Diagnostic (credited toward implementation) */
export const BOOK_CALL_URL = 'https://buy.stripe.com/dRm4gB1ps0fC5wY0RE4Ni02';
export const CONNECT_FEE_LABEL = '$216';
export const DIAGNOSTIC_NAME = 'Founder Growth Diagnostic';
export const PRIMARY_CTA_LABEL = 'Get the $216 diagnostic';

export const SYSTEM_NAME = 'Founder AI Authority & Pipeline System';
export const PACKAGE_SETUP = '$1,500';
export const PACKAGE_RETAINER = '$1,000';
export const SPRINT_NAME = '30-Day AI Authority Sprint';

export const CORE_PROMISE =
  'We turn your expertise into AI-search visibility, founder authority, and qualified conversations — without requiring you to become a full-time content creator.';

export const CORE_OUTCOME = 'Become easier to discover, trust, and contact in the AI era.';

export const DIAGNOSTIC_CREDIT_NOTE = `The ${CONNECT_FEE_LABEL} diagnostic fee is credited 100% toward the ${PACKAGE_SETUP} implementation if you decide to work with us within 7 days.`;

export const STORY_LINE =
  'Expertise → Content → AI visibility → Attention → Outreach → Conversations';

/** One system. Three mechanisms. */
export const GROWTH_PILLARS = [
  {
    id: 'discover',
    name: 'Discover',
    mechanism: 'AI Search Visibility',
    sell: 'We find the questions your prospects ask ChatGPT, Gemini, Perplexity, and Google AI — then close the gaps with answer-focused pages, comparisons, and citation work.',
  },
  {
    id: 'trust',
    name: 'Trust',
    mechanism: 'Founder Authority Engine',
    sell: 'One 30–45 minute founder interview a month. Humans turn it into LinkedIn, X, articles, newsletter, and FAQ content. You do not sit around writing posts.',
  },
  {
    id: 'contact',
    name: 'Contact',
    mechanism: 'AI Lead Generation',
    sell: 'We connect visibility and authority to outbound: ICP, research, enrichment, personalized outreach, follow-up, and CRM — so attention becomes conversations.',
  },
] as const;
