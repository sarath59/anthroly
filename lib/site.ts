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

/** $216 initial fee to start setting up both AI agents */
export const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/dRm4gB1ps0fC5wY0RE4Ni02';
/** Creates a Stripe Checkout Session with DataFast visitor/session metadata */
export const CHECKOUT_PATH = '/api/create-checkout';
export const BOOK_CALL_URL = CHECKOUT_PATH;
export const CONNECT_FEE_LABEL = '$216';
export const DIAGNOSTIC_NAME = 'Initial Agent Setup';
export const PRIMARY_CTA_LABEL = 'Claim a slot — $216';

export const SYSTEM_NAME = 'Anthroly Dual Agents';
export const PACKAGE_SETUP = '$1,000';
export const PACKAGE_RETAINER = '$500';
export const SPRINT_NAME = 'One-time setup';

/** We only take this many clients. Used in Hero, Pricing, FinalCTA. */
export const COHORT_SLOTS = 10;
export const SLOTS_LINE = `Only ${COHORT_SLOTS} slots. We set up and run both agents ourselves — this is not a dashboard we sell to everyone.`;

export const CORE_PROMISE =
  'We set up and run two AI agents for you: a lead-gen outreach agent that sends 1,000 personalized cold emails a day, and a 24/7 backlink agent that earns high-quality links while you sleep.';

export const CORE_OUTCOME = 'Fill the pipeline and build authority without becoming the SDR or the link-builder.';

export const SETUP_REFUND_NOTE = `If you are not happy at any point, we refund the ${PACKAGE_SETUP} one-time setup fee. In full.`;

export const DIAGNOSTIC_CREDIT_NOTE = `${CONNECT_FEE_LABEL} is the initial fee to start setting up both agents. Once you are happy, it is a ${PACKAGE_SETUP} one-time setup fee. Then ${PACKAGE_RETAINER}/month to run them — with daily updates. ${SETUP_REFUND_NOTE}`;

/** Canonical offer sentence used on pSEO, schema, and hub CTAs. */
export const OFFER_ONE_LINER = `${SLOTS_LINE} Start with ${CONNECT_FEE_LABEL} to set up both agents. When you are happy: ${PACKAGE_SETUP} one-time setup + ${PACKAGE_RETAINER}/month to run them, with daily updates. ${SETUP_REFUND_NOTE}`;

export const EXECUTION_SUMMARY = `${SYSTEM_NAME}: an outreach agent at 1,000 emails/day plus a 24/7 high-quality backlink agent. We set them up. We run them. You stay in the founder seat.`;

export const STORY_LINE =
  'ICP → 1,000 emails/day → replies → authority links 24/7 → more replies';

/** Two agents. One compounding loop. */
export const GROWTH_PILLARS = [
  {
    id: 'discover',
    name: 'Outreach',
    mechanism: 'Lead-gen + mass cold outreach',
    sell: 'A dedicated outreach agent researches your ICP, writes personalized cold emails, and sends up to 1,000 a day — with follow-ups that do not forget, freeze, or get tired.',
  },
  {
    id: 'trust',
    name: 'Backlinks',
    mechanism: 'Autonomous 24/7 backlink agent',
    sell: 'A second agent hunts, pitches, and earns high-quality backlinks around the clock. Not PBNs. Not junk. Editorial placements that make every email land heavier.',
  },
  {
    id: 'contact',
    name: 'Compound',
    mechanism: 'Links make emails convert',
    sell: 'Cold email without authority is noise. Links without a pipeline are vanity. Together they create a loop: more domain trust, more replies, more conversations — while you stay in the product.',
  },
] as const;
