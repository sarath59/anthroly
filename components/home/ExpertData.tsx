import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  EXPERT_DOMAINS,
  EXPERT_SERVICES,
  EXPERT_STATS,
  EXPERT_SUBHEAD,
} from '@/lib/expert-data';
import { ExpertCTAs } from '../expert/ExpertCTAs';
import { ExpertRecord } from '../expert/ExpertRecord';
import { Reveal } from './Reveal';

const PILLARS = [
  { name: 'Vetted', body: 'ID and credential checks, then a paid skills test in their own field.' },
  { name: 'Reviewed', body: 'Gold answers, two review layers, agreement scores and a strict no-AI-tools rule.' },
  { name: 'Secured', body: 'NDA and IP assignment, managed accounts, two-factor login, least access.' },
];

export function ExpertData() {
  return (
    <section id="experts" className="grain relative overflow-hidden border-b border-rule">
      <div className="page-x py-24 lg:py-36">
        <Reveal>
          <div className="flex items-center justify-between border-b border-rule pb-4">
            <p className="eyebrow flex items-center gap-3">
              <span className="rounded-full bg-signal px-2 py-0.5 text-[10px] tracking-[0.14em] text-paper">New</span>
              Expert human data
            </p>
            <p className="eyebrow hidden sm:block">Pilot team in 10 days</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-serif text-display-lg text-balance">
                Expert human data for <em className="text-signal">frontier AI.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl text-[21px] leading-[1.5] text-ink-soft text-pretty">
                {EXPERT_SUBHEAD}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <ExpertCTAs className="mt-10" />
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-14 flex flex-wrap gap-2">
                {EXPERT_DOMAINS.map((d) => (
                  <li
                    key={d.name}
                    className="rounded-full border border-ink/15 bg-paper-card px-4 py-2 text-[13.5px] text-ink-soft"
                  >
                    {d.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <ExpertRecord />
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <dl className="mt-20 grid grid-cols-2 border-t border-ink lg:grid-cols-4">
            {EXPERT_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`py-8 pr-6 ${i % 2 ? 'border-l border-rule pl-6' : ''} ${
                  i === 2 ? 'lg:border-l lg:border-rule lg:pl-6' : ''
                } ${i >= 2 ? 'border-t border-rule lg:border-t-0' : ''}`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-none tracking-[-0.02em]">
                    {s.value}
                  </span>
                  <span className="mt-3 block text-[14px] text-ink-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-6 border-t border-rule">
          {EXPERT_SERVICES.map((s, i) => (
            <Reveal key={s.code} delay={i * 0.04}>
              <Link
                href={`/expert-data#${s.slug}`}
                className="group grid items-baseline gap-3 border-b border-rule py-7 transition-colors duration-500 hover:bg-paper-card md:grid-cols-[5rem_1fr_1.3fr_auto] md:gap-8 md:px-4"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-signal">{s.code}</span>
                <span className="font-serif text-[1.9rem] leading-tight transition-colors group-hover:text-signal">
                  {s.name}
                </span>
                <span className="text-[15.5px] leading-[1.6] text-ink-muted">{s.short}</span>
                <ArrowUpRight
                  size={18}
                  className="hidden text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal md:block"
                />
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[6px] border border-ink bg-ink md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className="h-full">
              <div className="h-full bg-ink p-8 text-paper">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">0{i + 1}</p>
                <p className="mt-6 font-serif text-[2rem] leading-none">{p.name}</p>
                <p className="mt-4 text-[15px] leading-[1.6] text-paper/60">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="max-w-xl text-[16px] leading-[1.6] text-ink-muted">
              Start with a free or low-cost 1–2 week pilot. Scale to a dedicated team once the
              data proves itself.
            </p>
            <Link
              href="/expert-data"
              className="group inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[15px] font-medium transition-colors hover:border-signal hover:text-signal"
            >
              How we vet, review and secure the work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
