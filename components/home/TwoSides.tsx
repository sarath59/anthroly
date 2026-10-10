import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';
import { Reveal } from './Reveal';

const SIDES = [
  {
    href: '#sell',
    kicker: 'For US companies',
    title: "You've been producing training data for years. You just haven't been paid for it.",
    body: 'Every escalation, quote revision and post-mortem is a worked example of judgment under real constraints. That is exactly what the labs are short on. We price it, license it and pay you for it.',
    points: ['One buyer, start to finish', 'Licensed, never sold outright', 'Identifiers stripped before anything moves'],
    cta: 'How selling works',
  },
  {
    href: '#labs',
    kicker: 'For AI labs',
    title: 'The data you cannot scrape, shaped for how you actually train.',
    body: 'Private, licensed, US-sourced operating records, delivered as raw corpora or built into RL environments, agent trajectories and held-out evals that have never touched the open web.',
    points: ['Clean chain of title', 'Never published, never contaminated', 'Custom sourcing against your capability gaps'],
    cta: 'What we supply',
  },
];

export function TwoSides() {
  return (
    <section id="market" className="page-x py-24 lg:py-36">
      <Reveal>
        <p className="eyebrow">One market, two sides</p>
      </Reveal>
      <div className="mt-10 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule lg:grid-cols-2">
        {SIDES.map((side, i) => (
          <Reveal key={side.href} delay={i * 0.08} className="h-full">
            <Link
              href={side.href}
              className="group flex h-full flex-col bg-paper p-8 transition-colors duration-500 hover:bg-paper-card sm:p-12"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">{side.kicker}</span>
                <ArrowDownRight
                  size={22}
                  className="text-ink-faint transition-all duration-500 group-hover:rotate-[-45deg] group-hover:text-signal"
                />
              </div>
              <h3 className="mt-10 font-serif text-[2.1rem] leading-[1.08] tracking-[-0.01em] text-balance sm:text-[2.5rem]">
                {side.title}
              </h3>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-muted text-pretty">{side.body}</p>
              <ul className="mt-10 space-y-3 border-t border-rule pt-6">
                {side.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] text-ink-soft">
                    <span className="h-px w-4 bg-signal" />
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-auto pt-10 text-[14px] font-medium underline decoration-ink/25 underline-offset-[6px] transition-colors group-hover:decoration-signal">
                {side.cta}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
