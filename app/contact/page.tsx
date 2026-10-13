import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL, TRANSACTED_LINE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Datary Labs — sell data or source it',
  description:
    'US companies: find out what your operating record is worth. AI labs: request RL environments, trajectories, evals and licensed corpora. Email us directly.',
  alternates: { canonical: absoluteUrl('/contact') },
};

function mailto(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const OPTIONS = [
  {
    kicker: 'For US companies',
    title: 'Sell your data',
    body: 'Tell us your company, which systems you use and roughly how far back they go. Counts and dates are enough. Please don’t send files.',
    href: mailto(
      'Selling data — [Company name]',
      'Company:\nWebsite:\nHeadquartered in the US (yes/no):\nSystems we use (Slack, email, tickets, CRM, calls, code...):\nHow far back the record goes:\n\nAnything else:\n'
    ),
  },
  {
    kicker: 'For AI labs',
    title: 'Source data',
    body: 'Tell us the capability gap, the domain and the format you need: RL environments, trajectories, evals, preference data or corpora.',
    href: mailto(
      'Data request — [Lab / team]',
      'Lab / team:\nWhat we need (RL environments, trajectories, evals, preference/SFT, corpora):\nDomain or capability gap:\nTimeline:\n\nAnything else:\n'
    ),
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

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group mt-14 inline-flex items-center gap-4 border-b border-ink pb-2 font-serif text-[clamp(1.9rem,4.5vw,3.6rem)] leading-none transition-colors hover:border-signal hover:text-signal"
          >
            {CONTACT_EMAIL}
            <ArrowUpRight className="h-[0.7em] w-[0.7em] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>

          <div className="mt-20 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule md:grid-cols-2">
            {OPTIONS.map((o) => (
              <a key={o.title} href={o.href} className="group flex flex-col bg-paper p-8 transition-colors duration-500 hover:bg-paper-card sm:p-12">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{o.kicker}</span>
                  <ArrowUpRight size={20} className="text-ink-faint transition-all duration-300 group-hover:text-signal" />
                </div>
                <h2 className="mt-10 font-serif text-[2.4rem] leading-none">{o.title}</h2>
                <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-ink-muted">{o.body}</p>
                <span className="mt-10 text-[14px] font-medium underline decoration-ink/25 underline-offset-[6px] transition-colors group-hover:decoration-signal">
                  Write to us
                </span>
              </a>
            ))}
          </div>

          <p className="mt-10 text-[14px] text-ink-muted">
            We buy only from companies headquartered in the United States.
          </p>
        </div>
      </div>
    </section>
  );
}
