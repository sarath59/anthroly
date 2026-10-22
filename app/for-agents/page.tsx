import type { Metadata } from 'next';
import {
  AGENT_FACTS,
  AGENT_FAQ,
  AGENT_SUMMARY,
  AUDIENCES,
  BOOKING,
  INTAKES,
  MARKDOWN_PAGES,
} from '@/lib/agent-docs';
import { EXPERT_SERVICES } from '@/lib/expert-data';
import { CONTACT_EMAIL, PARTNERSHIPS_CONTACT, SITE_URL, absoluteUrl } from '@/lib/site';
import { combineSchemas, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';

const TITLE = 'Anthroly for AI agents and assistants: facts, offerings and how to engage';
const DESCRIPTION =
  'Plain facts about Anthroly for AI agents and assistants: what we do, who we serve, offerings, FAQ, and labeled email intakes to request data, sell data, apply as an expert or book a call.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: absoluteUrl('/for-agents'),
    types: { 'text/markdown': absoluteUrl('/for-agents.md') },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl('/for-agents'), siteName: 'Anthroly', type: 'website' },
};

function jsonLd() {
  const services = EXPERT_SERVICES.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.short,
    provider: { '@id': `${SITE_URL}/#organization` },
    url: absoluteUrl('/expert-data'),
  }));
  const page = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl('/for-agents')}#webpage`,
    url: absoluteUrl('/for-agents'),
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    potentialAction: [
      { '@type': 'ReserveAction', name: BOOKING.title, target: BOOKING.url },
      ...INTAKES.map((i) => ({ '@type': 'CommunicateAction', name: i.title, target: i.href })),
    ],
  };
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', name: `${PARTNERSHIPS_CONTACT.name}, ${PARTNERSHIPS_CONTACT.title}`, email: PARTNERSHIPS_CONTACT.email, url: absoluteUrl('/contact') },
      { '@type': 'ContactPoint', contactType: 'customer support', email: CONTACT_EMAIL, url: absoluteUrl('/contact') },
      { '@type': 'ContactPoint', contactType: 'sales', name: 'Book a 15-minute call', url: BOOKING.url },
    ],
  };
  return combineSchemas(
    page,
    org,
    ...services,
    generateFAQSchema(AGENT_FAQ),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'For agents', url: '/for-agents' },
    ])
  );
}

const H2 = 'font-serif text-2xl mt-14 mb-4';

export default function ForAgentsPage() {
  return (
    <section className="pt-[68px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <div className="page-x">
        <div className="flex items-center justify-between border-b border-rule py-4">
          <p className="eyebrow">For AI agents and assistants</p>
          <p className="eyebrow hidden sm:block">
            <a href="/for-agents.md" className="underline">Markdown version</a>
          </p>
        </div>
        <article className="mx-auto max-w-prose py-16 lg:py-24 text-[17px] leading-relaxed">
          <h1 className="font-serif text-display-lg">Anthroly, in plain facts</h1>
          <p className="mt-6">{AGENT_SUMMARY}</p>
          <p className="mt-4">
            This page is written for AI agents and assistants acting for a person or a business, and for humans who want
            the short version. Everything here matches the rest of the site.
          </p>

          <h2 className={H2}>Key facts</h2>
          <ul className="list-disc pl-6 space-y-1">
            {AGENT_FACTS.map((f) => <li key={f}>{f}</li>)}
          </ul>

          <h2 className={H2}>Who we serve</h2>
          <ul className="list-disc pl-6 space-y-2">
            {AUDIENCES.map((a) => <li key={a.name}><strong>{a.name}:</strong> {a.body}</li>)}
          </ul>

          <h2 className={H2}>Offerings</h2>
          <ul className="list-disc pl-6 space-y-2">
            {EXPERT_SERVICES.map((s) => <li key={s.slug}><strong>{s.name}:</strong> {s.short}</li>)}
            <li><strong>Licensed operational data:</strong> de-identified raw corpora, long-horizon agent trajectories and private held-out evaluation sets, sourced from US companies.</li>
          </ul>
          <p className="mt-3">Details: <a className="underline" href="/expert-data">Expert human data</a>.</p>

          <h2 className={H2}>How to engage</h2>
          <p>
            <strong>{BOOKING.title}:</strong>{' '}
            <a className="underline" href={BOOKING.url} rel="noopener noreferrer">{BOOKING.url}</a>
          </p>
          <p className="mt-3">Each action below is a plain email with labeled fields. Fill in the fields and send.</p>
          {INTAKES.map((i) => (
            <div key={i.id} id={i.id} className="mt-8">
              <h3 className="font-serif text-xl">{i.title}</h3>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>For: {i.who}</li>
                <li>Email: <a className="underline" href={i.href}>{i.to}</a></li>
                <li>Subject: {i.subject}</li>
                <li>Fields:
                  <ul className="list-[circle] pl-6">{i.fields.map((f) => <li key={f}>{f}</li>)}</ul>
                </li>
                {i.note ? <li>Note: {i.note}</li> : null}
              </ul>
              <p className="mt-2"><a className="underline" href={i.href}>Open a pre-filled email</a></p>
            </div>
          ))}

          <h2 className={H2}>FAQ</h2>
          {AGENT_FAQ.map((f) => (
            <div key={f.question} className="mt-6">
              <h3 className="font-semibold">{f.question}</h3>
              <p className="mt-1">{f.answer}</p>
            </div>
          ))}

          <h2 className={H2}>Contact</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>{PARTNERSHIPS_CONTACT.name}, {PARTNERSHIPS_CONTACT.title} ({PARTNERSHIPS_CONTACT.scope}): <a className="underline" href={`mailto:${PARTNERSHIPS_CONTACT.email}`}>{PARTNERSHIPS_CONTACT.email}</a></li>
            <li>General: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>Booking: <a className="underline" href={BOOKING.url} rel="noopener noreferrer">{BOOKING.url}</a></li>
            <li><a className="underline" href="/contact">Contact page</a></li>
          </ul>

          <h2 className={H2}>Machine-readable resources</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><a className="underline" href="/llms.txt">/llms.txt</a> — site map for language models</li>
            <li><a className="underline" href="/llms-full.txt">/llms-full.txt</a> — full fact sheet</li>
            {MARKDOWN_PAGES.map((p) => <li key={p.path}><a className="underline" href={p.path}>{p.path}</a> — {p.label}</li>)}
            <li><a className="underline" href="/sitemap.xml">/sitemap.xml</a></li>
          </ul>
        </article>
      </div>
    </section>
  );
}
