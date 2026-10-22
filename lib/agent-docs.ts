/**
 * Agent-friendly docs: one source of truth for /for-agents (HTML) and the
 * Markdown mirrors (/index.md, /for-agents.md, /expert-data.md, /contact.md).
 * Every claim here is reused from existing site copy (lib/site, lib/faq,
 * lib/expert-data, app/contact). Humans and bots get identical content.
 */
import { HOME_FAQ } from './faq';
import {
  EXPERT_FAQ,
  EXPERT_HEADLINE,
  EXPERT_SERVICES,
  EXPERT_STATS,
  EXPERT_SUBHEAD,
  EXPERT_DOMAINS,
  ENGAGEMENT_STEPS,
  VETTING_STEPS,
  QUALITY_CONTROLS,
  SECURITY_CONTROLS,
  PILOT_BOOKING_URL,
  EXPERT_APPLY_MAILTO,
} from './expert-data';
import {
  CONTACT_EMAIL,
  PARTNERSHIPS_CONTACT,
  SITE_DESCRIPTION,
  TRANSACTED_LINE,
  absoluteUrl,
} from './site';
import type { FAQItem } from './schema';

function mailto(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export interface Intake {
  id: string;
  title: string;
  who: string;
  to: string;
  subject: string;
  fields: string[];
  href: string;
  note?: string;
}

const SELL_FIELDS = [
  'Company',
  'Website',
  'Headquartered in the US (yes/no)',
  'Systems we use (Slack, email, tickets, CRM, calls, code...)',
  'How far back the record goes',
  'Anything else',
];
const SOURCE_FIELDS = [
  'Lab / team',
  'What we need (RL environments, trajectories, evals, preference/SFT, corpora)',
  'Domain or capability gap',
  'Timeline',
  'Anything else',
];
const EXPERT_FIELDS = [
  'Name',
  'Field (software, math, science, medicine, law, Indian languages...)',
  'Highest degree and institution',
  'Years of professional experience',
  'Languages you write fluently',
  'LinkedIn or CV link',
  'Hours per week available',
];
const body = (fields: string[]) => fields.map((f) => `${f}:`).join('\n') + '\n';

export const INTAKES: Intake[] = [
  {
    id: 'source-data',
    title: 'Request a dataset or RL environment',
    who: 'AI labs and model teams',
    to: PARTNERSHIPS_CONTACT.email,
    subject: 'Data request — [Lab / team]',
    fields: SOURCE_FIELDS,
    href: mailto(PARTNERSHIPS_CONTACT.email, 'Data request — [Lab / team]', body(SOURCE_FIELDS)),
  },
  {
    id: 'sell-data',
    title: 'Sell or license your company’s data',
    who: 'Companies headquartered in the United States',
    to: PARTNERSHIPS_CONTACT.email,
    subject: 'Selling data — [Company name]',
    fields: SELL_FIELDS,
    href: mailto(PARTNERSHIPS_CONTACT.email, 'Selling data — [Company name]', body(SELL_FIELDS)),
    note: 'Counts and dates are enough. Please don’t send files.',
  },
  {
    id: 'join-expert',
    title: 'Apply as an expert',
    who: 'Engineers, scientists, doctors, lawyers and Indic-language specialists',
    to: CONTACT_EMAIL,
    subject: 'Join as an expert — [Your field]',
    fields: EXPERT_FIELDS,
    href: EXPERT_APPLY_MAILTO,
    note: 'If there is a fit, we send a paid skills test.',
  },
];

export const BOOKING = {
  title: 'Book a 15-minute call / request a pilot',
  url: PILOT_BOOKING_URL,
};

export const AGENT_SUMMARY = SITE_DESCRIPTION;

export const AGENT_FACTS: string[] = [
  'Legal entity: Neural Netwrk LLC, doing business as Anthroly (Texas, United States).',
  'Anthroly builds RL environments and datasets for frontier AI labs.',
  'Role: principal buyer (licenses data directly and supplies labs) and broker (arranges direct licenses between US companies and labs).',
  'Sourcing: US companies only.',
  'Structure: bounded licenses, not outright sales. Sellers keep ownership and keep using their data.',
  'Safeguards: identifiers removed before anything moves; sellers are never named to buyers.',
  'Pricing: every record priced individually after a de-identified sample review. No fee charged to sellers.',
  `Track record: ${TRANSACTED_LINE}.`,
  `Expert bench: ${EXPERT_STATS.map((s) => `${s.value} ${s.label}`).join('; ')}.`,
];

export const AUDIENCES = [
  {
    name: 'AI labs and model teams',
    body: 'Source RL environments with automatic graders, agent trajectories, expert evals, SFT and preference data, and licensed de-identified corpora.',
  },
  {
    name: 'US companies',
    body: 'License your operational record (team chat, email, support tickets, CRM history, call recordings, code review, documents, ERP exports, field records) without giving up ownership.',
  },
  {
    name: 'Experts',
    body: 'Engineers, scientists, doctors and Indic-language specialists who want paid expert data work.',
  },
];

export const AGENT_FAQ: FAQItem[] = [
  ...HOME_FAQ.filter((f) =>
    [
      'Does Anthroly buy data, or broker it?',
      'Who do you sell to?',
      'How much is our data worth?',
      'Do we lose ownership of our data?',
      'Why only US companies?',
      'What does it cost my company?',
      'Is the data anonymized before anyone sees it?',
      'We are an AI lab. What formats can you deliver?',
    ].includes(f.question)
  ),
  ...EXPERT_FAQ.filter((f) =>
    ['What does a pilot cost?', 'How fast can you staff a project?', 'How do I join as an expert?'].includes(f.question)
  ).map((f) => ({ question: f.question, answer: f.answer })),
];

export const MARKDOWN_PAGES = [
  { path: '/index.md', label: 'Home (Markdown)' },
  { path: '/for-agents.md', label: 'For agents (Markdown)' },
  { path: '/expert-data.md', label: 'Expert human data (Markdown)' },
  { path: '/contact.md', label: 'Contact (Markdown)' },
];

/* ---------- Markdown renderers ---------- */

const faqMd = (faqs: readonly FAQItem[]) => faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n');
const intakeMd = () =>
  INTAKES.map(
    (i) =>
      `### ${i.title}\n\n- For: ${i.who}\n- Email: ${i.to}\n- Subject: ${i.subject}\n- Fields:\n${i.fields
        .map((f) => `  - ${f}`)
        .join('\n')}${i.note ? `\n- Note: ${i.note}` : ''}`
  ).join('\n\n');

export function forAgentsMarkdown(): string {
  return [
    '# Anthroly — information for AI agents and assistants',
    '',
    `> ${AGENT_SUMMARY}`,
    '',
    `HTML version: ${absoluteUrl('/for-agents')}`,
    '',
    '## Key facts',
    '',
    ...AGENT_FACTS.map((f) => `- ${f}`),
    '',
    '## Who Anthroly serves',
    '',
    ...AUDIENCES.map((a) => `- **${a.name}:** ${a.body}`),
    '',
    '## Offerings',
    '',
    ...EXPERT_SERVICES.map((s) => `- **${s.name}:** ${s.short}`),
    '- **Licensed operational data:** de-identified raw corpora, long-horizon agent trajectories and private held-out evaluation sets, sourced from US companies.',
    '',
    '## How to engage',
    '',
    `Book a call or request a pilot: ${BOOKING.url}`,
    '',
    'Each action below is a plain email with labeled fields. Fill in the fields and send.',
    '',
    intakeMd(),
    '',
    '## FAQ',
    '',
    faqMd(AGENT_FAQ),
    '',
    '## Contact',
    '',
    `- ${PARTNERSHIPS_CONTACT.name}, ${PARTNERSHIPS_CONTACT.title} (${PARTNERSHIPS_CONTACT.scope}): ${PARTNERSHIPS_CONTACT.email}`,
    `- General: ${CONTACT_EMAIL}`,
    `- Booking: ${BOOKING.url}`,
    `- Contact page: ${absoluteUrl('/contact')}`,
    '',
    '## Machine-readable resources',
    '',
    `- ${absoluteUrl('/llms.txt')}`,
    `- ${absoluteUrl('/llms-full.txt')}`,
    ...MARKDOWN_PAGES.map((p) => `- ${absoluteUrl(p.path)}`),
    `- ${absoluteUrl('/sitemap.xml')}`,
    '',
  ].join('\n');
}

export function homeMarkdown(): string {
  return [
    '# Anthroly',
    '',
    `> ${AGENT_SUMMARY}`,
    '',
    `HTML version: ${absoluteUrl('/')}`,
    '',
    '## Key facts',
    '',
    ...AGENT_FACTS.map((f) => `- ${f}`),
    '',
    '## Who Anthroly serves',
    '',
    ...AUDIENCES.map((a) => `- **${a.name}:** ${a.body}`),
    '',
    '## FAQ',
    '',
    faqMd(HOME_FAQ),
    '',
    '## Next steps',
    '',
    `- For agents: ${absoluteUrl('/for-agents')}`,
    `- Expert human data: ${absoluteUrl('/expert-data')}`,
    `- Contact: ${absoluteUrl('/contact')}`,
    `- Book a call: ${BOOKING.url}`,
    '',
  ].join('\n');
}

export function expertDataMarkdown(): string {
  return [
    `# ${EXPERT_HEADLINE}`,
    '',
    `> ${EXPERT_SUBHEAD}`,
    '',
    `HTML version: ${absoluteUrl('/expert-data')}`,
    '',
    '## At a glance',
    '',
    ...EXPERT_STATS.map((s) => `- ${s.value} ${s.label}`),
    '',
    '## Services',
    '',
    ...EXPERT_SERVICES.map(
      (s) => `### ${s.name}\n\n${s.body}\n\n${s.deliverables.map((d) => `- ${d}`).join('\n')}\n`
    ),
    '## Domains',
    '',
    ...EXPERT_DOMAINS.map((d) => `- **${d.name}:** ${d.people}. ${d.work}.`),
    '',
    '## Vetting',
    '',
    ...VETTING_STEPS.map((v) => `- **${v.name}:** ${v.body}`),
    '',
    '## Quality controls',
    '',
    ...QUALITY_CONTROLS.map((v) => `- **${v.name}:** ${v.body}`),
    '',
    '## Security',
    '',
    ...SECURITY_CONTROLS.map((v) => `- **${v.name}:** ${v.body}`),
    '',
    '## How an engagement runs',
    '',
    ...ENGAGEMENT_STEPS.map((e) => `- **${e.step} ${e.name}** (${e.time}): ${e.body}`),
    '',
    '## FAQ',
    '',
    faqMd(EXPERT_FAQ as unknown as FAQItem[]),
    '',
    '## Get started',
    '',
    `- Request a pilot: ${PILOT_BOOKING_URL}`,
    `- Join as an expert: ${CONTACT_EMAIL}`,
    '',
  ].join('\n');
}

export function contactMarkdown(): string {
  return [
    '# Contact Anthroly — sell data or source it',
    '',
    `HTML version: ${absoluteUrl('/contact')}`,
    '',
    `- ${PARTNERSHIPS_CONTACT.name}, ${PARTNERSHIPS_CONTACT.title} — ${PARTNERSHIPS_CONTACT.scope}. Selling your data, sourcing data for a lab, press and partnerships: ${PARTNERSHIPS_CONTACT.email}`,
    `- General — questions about Anthroly, legal and privacy requests: ${CONTACT_EMAIL}`,
    `- Book a call / request a pilot: ${BOOKING.url}`,
    '',
    '## Structured requests',
    '',
    intakeMd(),
    '',
  ].join('\n');
}

export function markdownResponse(md: string, htmlPath: string): Response {
  return new Response(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex, follow',
      Link: `<${absoluteUrl(htmlPath)}>; rel="canonical"`,
    },
  });
}
