import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ExpertCTAs } from '@/components/expert/ExpertCTAs';
import { CONTACT_EMAIL, PARTNERSHIPS_CONTACT, TRANSACTED_LINE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Anthroly — sell data or source it',
  description:
    'US companies: find out what your operating record is worth. AI labs: request RL environments, trajectories, evals and licensed corpora. Email us directly.',
  alternates: { canonical: absoluteUrl('/contact') },
  openGraph: {
    title: 'Contact Anthroly — sell data or source it',
    description:
      'US companies: find out what your operating record is worth. AI labs: request RL environments, trajectories, evals and licensed corpora.',
    url: absoluteUrl('/contact'),
    siteName: 'Anthroly',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Anthroly — sell data or source it',
    description:
      'US companies: find out what your operating record is worth. AI labs: request RL environments, trajectories, evals and licensed corpora.',
  },
};

function mailto(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const OPTIONS = [
  {
    kicker: 'For US companies',
    title: 'Sell your data',
    body: 'Tell us your company, which systems you use and roughly how far back they go. Counts and dates are enough. Please don’t send files.',
    href: mailto(
      PARTNERSHIPS_CONTACT.email,
      'Selling data — [Company name]',
      'Company:\nWebsite:\nHeadquartered in the US (yes/no):\nSystems we use (Slack, email, tickets, CRM, calls, code...):\nHow far back the record goes:\n\nAnything else:\n'
    ),
  },
  {
    kicker: 'For AI labs',
    title: 'Source data',
    body: 'Tell us the capability gap, the domain and the format you need: RL environments, trajectories, evals, preference data or corpora.',
    href: mailto(
      PARTNERSHIPS_CONTACT.email,
      'Data request — [Lab / team]',
      'Lab / team:\nWhat we need (RL environments, trajectories, evals, preference/SFT, corpora):\nDomain or capability gap:\nTimeline:\n\nAnything else:\n'
    ),
  },
];

const DIRECTORY = [
  {
    who: PARTNERSHIPS_CONTACT.name,
    role: PARTNERSHIPS_CONTACT.title,
    covers: `${PARTNERSHIPS_CONTACT.scope}. Selling your data, sourcing data for a lab, press and partnerships.`,
    email: PARTNERSHIPS_CONTACT.email,
  },
  {
    who: 'General',
    role: 'Everything else',
    covers: 'Questions about Anthroly, legal and privacy requests, anything that does not fit above.',
    email: CONTACT_EMAIL,
  },
];

export default function ContactPage() {
  return (
    <section className="grain pt-[68px]">
      <div className="page-x">
        <div className="flex items-center justify-between border-b border-rule py-4">
          <p className="eyebrow">Contact</p>
          <p className="eyebrow hidden sm:block">{TRANSACTED_LINE}</p>
        </div>

        <div className="py-16 lg:py-24">
          <h1 className="max-w-4xl font-serif text-display-lg text-balance">
            Tell us what you have, <em className="text-signal">or what you need.</em>
          </h1>
          <p className="mt-8 max-w-xl text-[18px] leading-[1.6] text-ink-muted">
            Email goes straight to the people who make the offer. We read every message and reply
            personally.
          </p>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule md:grid-cols-2">
            {OPTIONS.map((o) => (
              <a key={o.title} href={o.href} className="group flex flex-col bg-paper p-8 transition-colors duration-500 hover:bg-paper-card sm:p-12">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{o.kicker}</span>
                  <ArrowUpRight size={20} className="text-ink-faint transition-all duration-300 group-hover:text-signal" />
                </div>
                <h2 className="mt-10 font-serif text-[2.4rem] leading-none">{o.title}</h2>
                <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-ink-muted">{o.body}</p>
                <span className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-rule pt-5 text-[14px]">
                  <span className="font-medium underline decoration-ink/25 underline-offset-[6px] transition-colors group-hover:decoration-signal">
                    Write to {PARTNERSHIPS_CONTACT.name}
                  </span>
                  <span className="font-mono text-[12px] text-ink-faint">{PARTNERSHIPS_CONTACT.email}</span>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-px flex flex-col items-start justify-between gap-8 rounded-[6px] bg-ink p-8 text-paper sm:p-12 lg:flex-row lg:items-center">
            <div>
              <span className="eyebrow !text-paper/50">Expert human data</span>
              <p className="mt-4 max-w-xl font-serif text-[2rem] leading-tight">
                Need vetted engineers, scientists, doctors or Indic-language specialists?{' '}
                <Link href="/expert-data" className="text-signal underline decoration-signal/40 underline-offset-[6px] hover:decoration-signal">
                  See how it works
                </Link>
              </p>
            </div>
            <ExpertCTAs dark className="shrink-0" />
          </div>

          <div className="mt-24 grid gap-8 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3 lg:pt-2">Who to write to</p>
            <ul className="border-t border-ink lg:col-span-9">
              {DIRECTORY.map((d) => (
                <li key={d.email} className="border-b border-rule">
                  <a
                    href={`mailto:${d.email}`}
                    className="group grid gap-3 py-8 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-10"
                  >
                    <div>
                      <p className="font-serif text-[2rem] leading-none">{d.who}</p>
                      <p className="mt-2 text-[14px] font-medium text-ink-soft">{d.role}</p>
                    </div>
                    <p className="text-[15px] leading-[1.6] text-ink-muted">{d.covers}</p>
                    <span className="flex items-center gap-2 font-mono text-[13px] text-ink transition-colors group-hover:text-signal">
                      {d.email}
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-[14px] text-ink-muted">
            We buy only from companies headquartered in the United States.
          </p>
        </div>
      </div>
    </section>
  );
}
