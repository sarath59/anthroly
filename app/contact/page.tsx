import type { Metadata } from 'next';
import { IntakeForm, type Side } from '@/components/contact/IntakeForm';
import { CONTACT_EMAIL, TRANSACTED_LINE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Talk to Anthroly — sell data or source it',
  description:
    'US companies: find out what your operating record is worth. AI labs: request RL environments, trajectories, evals and licensed corpora. A few questions, then book a call.',
  alternates: { canonical: absoluteUrl('/contact') },
};

const NEXT = [
  ['Two minutes', 'Answer a few questions. Counts and systems only, no files.'],
  ['Pick a time', 'Your answers travel with the booking, so nothing gets asked twice.'],
  ['One call', 'With the people who make the offer, not a sales development rep.'],
];

export default function ContactPage({ searchParams }: { searchParams: { side?: string } }) {
  const initialSide: Side = searchParams.side === 'lab' ? 'lab' : 'seller';

  return (
    <section className="grain pt-[68px]">
      <div className="page-x">
        <div className="flex items-center justify-between border-b border-rule py-4">
          <p className="eyebrow">Start a conversation</p>
          <p className="eyebrow hidden sm:block">{TRANSACTED_LINE}</p>
        </div>

        <div className="grid gap-16 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <h1 className="font-serif text-display-lg text-balance">
              Tell us what you have, <em className="text-signal">or what you need.</em>
            </h1>
            <p className="mt-8 max-w-md text-[18px] leading-[1.6] text-ink-muted">
              A few short questions, then you pick a time. Someone on our team reads your answers
              before the call.
            </p>

            <ol className="mt-14 border-t border-ink">
              {NEXT.map(([title, body], i) => (
                <li key={title} className="grid grid-cols-[2.5rem_1fr] border-b border-rule py-5">
                  <span className="pt-1 font-mono text-[11px] text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-serif text-[1.5rem] leading-tight">{title}</p>
                    <p className="mt-1 text-[14px] text-ink-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-[14px] text-ink-muted">
              We buy only from companies headquartered in the United States. Email us any time at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline decoration-signal underline-offset-4">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[6px] border border-rule bg-paper-card p-6 shadow-[0_30px_60px_-40px_rgba(21,20,15,0.35)] sm:p-10">
              <IntakeForm initialSide={initialSide} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
