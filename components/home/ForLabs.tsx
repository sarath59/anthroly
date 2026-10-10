import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

const OFFERINGS = [
  {
    code: 'RL',
    name: 'RL environments',
    body: 'Sandboxed replicas of real workflows, built from licensed records, with tools, state and verifiable reward signals. Agents learn on work that actually happened.',
  },
  {
    code: 'TR',
    name: 'Agent trajectories',
    body: 'Long-horizon, multi-tool sequences reconstructed from how people really completed tasks: days of context, interruptions, handoffs and recovery from mistakes.',
  },
  {
    code: 'EV',
    name: 'Held-out evaluations',
    body: 'Private test sets drawn from records that have never been public, so a model cannot have memorized them. Scored against what the professional actually did.',
  },
  {
    code: 'PF',
    name: 'Preference and SFT data',
    body: 'Expert demonstrations and pairwise judgments grounded in a domain, written by people who have done the job rather than by generalist raters.',
  },
  {
    code: 'CO',
    name: 'Licensed corpora',
    body: 'De-identified enterprise text, audio and structured exports for mid-training and domain adaptation, with a clean chain of title for every record.',
  },
  {
    code: 'CS',
    name: 'Custom sourcing',
    body: "Tell us the capability gap. We find the US companies whose records close it, negotiate the license and deliver to your spec.",
  },
];

const SPEC = [
  ['environment', 'ar_escalation.v3'],
  ['origin', 'licensed operating record · US'],
  ['tools', 'email · crm · ledger · calendar'],
  ['horizon', 'multi-day, 40–120 steps'],
  ['reward', 'verifiable: invoice resolved, policy kept'],
  ['exposure', 'never published · zero contamination'],
];

export function ForLabs() {
  return (
    <section id="labs" className="relative overflow-hidden bg-ink text-paper">
      <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="page-x relative py-24 lg:py-36">
        <SectionHead
          dark
          index="02"
          label="For AI labs"
          title={
            <>
              Real work, structured for <em className="text-signal">reinforcement learning.</em>
            </>
          }
          intro="Agents are now judged on whether they can do the job, not whether they can talk about it. That takes training signal from real workflows. We source it from US businesses and build it into the formats your post-training team already uses."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="sticky top-28 rounded-[6px] border border-paper/15 bg-paper/[0.03] font-mono text-[12.5px]">
              <div className="flex items-center justify-between border-b border-paper/15 px-5 py-3 text-[10.5px] uppercase tracking-[0.14em] text-paper/45">
                <span>env.spec</span>
                <span>Illustrative</span>
              </div>
              <dl className="divide-y divide-paper/10">
                {SPEC.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 px-5 py-3.5">
                    <dt className="text-paper/40">{k}</dt>
                    <dd className="text-paper/85">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-2 border-t border-paper/15 px-5 py-3 text-paper/50">
                <span className="text-signal">$</span> anthroly deliver --format=gym
                <span className="inline-block h-3.5 w-1.5 animate-blink bg-signal" />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-[6px] border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:col-span-8">
            {OFFERINGS.map((o, i) => (
              <Reveal key={o.code} delay={(i % 2) * 0.06} className="h-full">
                <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-[#1d1c16]">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 font-mono text-[11px] text-signal transition-colors group-hover:border-signal">
                    {o.code}
                  </span>
                  <h3 className="mt-8 font-serif text-[1.9rem] leading-tight">{o.name}</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-paper/60">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-paper/15 pt-10 md:flex-row md:items-center">
            <p className="max-w-xl font-serif text-[1.9rem] leading-tight">
              Tell us where your model breaks. We&apos;ll find the companies whose records fix it.
            </p>
            <Link href="/contact?side=lab" className="btn-paper shrink-0">
              Request a sample pack
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
