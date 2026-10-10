import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RedactionSpecimen } from './RedactionSpecimen';
import { Mark } from '../Mark';

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden pt-[68px]">
      <Mark className="pointer-events-none absolute -right-[12vw] top-[6vh] -z-10 h-[min(62vw,820px)] animate-[spin_160s_linear_infinite] text-ink/[0.035]" />
      <div className="page-x">
        <div className="flex items-center justify-between border-b border-rule py-4">
          <p className="eyebrow">Data lab · Buyer · Broker</p>
          <p className="eyebrow hidden sm:block">Sourced exclusively in the United States</p>
        </div>

        <h1 className="mt-14 animate-rise font-serif text-display-xl text-balance sm:mt-20">
          We buy the record of how <em className="text-signal">real work</em> gets done.
        </h1>

        <div className="mt-14 grid gap-16 pb-24 lg:mt-20 lg:grid-cols-12 lg:pb-32">
          <div className="animate-rise [animation-delay:120ms] lg:col-span-5">
            <p className="text-[20px] leading-[1.6] text-ink-soft text-pretty">
              Anthroly is a data lab. We license operational data from US companies (the threads,
              tickets, calls and decisions behind a working business) and supply it to frontier AI
              labs as training corpora, RL environments and evaluations.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact?side=seller" className="btn-ink">
                Sell your company&apos;s data
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact?side=lab" className="btn-ghost">
                Source data for your lab
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 border-t border-rule pt-6">
              <div>
                <p className="font-serif text-5xl leading-none">$900K+</p>
                <p className="mt-2 text-[13px] text-ink-muted">in data bought, sold and brokered</p>
              </div>
              <div className="border-l border-rule pl-6">
                <p className="font-serif text-5xl leading-none">100%</p>
                <p className="mt-2 text-[13px] text-ink-muted">of supply sourced from US companies</p>
              </div>
            </div>
          </div>

          <div className="animate-rise [animation-delay:240ms] lg:col-span-6 lg:col-start-7">
            <RedactionSpecimen />
          </div>
        </div>
      </div>
    </section>
  );
}
