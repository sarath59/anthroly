import React from 'react';
import Link from 'next/link';
import {
  BOOK_CALL_URL,
  COHORT_SLOTS,
  CORE_PROMISE,
  DIAGNOSTIC_CREDIT_NOTE,
  GROWTH_PILLARS,
  PRIMARY_CTA_LABEL,
  SLOTS_LINE,
  STORY_LINE,
  SYSTEM_NAME,
} from '@/lib/site';
import { Button } from '../ui/button';
import { ArrowRight, Link2, Mail, Zap } from 'lucide-react';
import { LogoStrip, AI_COMPANIES } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/static-fx';

const PILLAR_ICONS = [Mail, Link2, Zap];

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-transparent text-white overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
      </div>
      
      <GlowPulse className="top-1/4 left-1/4" color="emerald" size={500} />
      <GlowPulse className="bottom-1/4 right-1/4" color="cyan" size={400} />

      <div className="container mx-auto px-4 lg:px-8 xl:px-12 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
            {SYSTEM_NAME} · only {COHORT_SLOTS} slots
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="block text-white mb-2">Two agents that never</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              clock out
            </span>
            <span className="block text-white mt-2">so you don&apos;t have to.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            {CORE_PROMISE}{' '}
            <span className="text-white font-semibold">You stay the founder.</span> They do the hunting.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 max-w-5xl mx-auto mb-10 text-left">
            {GROWTH_PILLARS.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <div
                  key={pillar.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                    {pillar.name}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-white" />
                    <span className="text-sm font-semibold text-white">{pillar.mechanism}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{pillar.sell}</p>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
            {STORY_LINE}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="xl"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl rounded-full font-bold shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)] hover:shadow-[0_0_70px_-15px_rgba(16,185,129,0.7)] transition-all"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={22} />
              </Button>
            </a>

            <Link href="/#pricing" className="w-full sm:w-auto">
              <Button
                size="xl"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl rounded-full font-bold"
              >
                See the {COHORT_SLOTS} slots
              </Button>
            </Link>
          </div>

          <p className="text-sm text-amber-300/90 max-w-xl mx-auto mb-3 font-semibold">
            {SLOTS_LINE}
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-12">
            {DIAGNOSTIC_CREDIT_NOTE}
          </p>

          <div className="mb-8">
            <LogoStrip 
              companies={AI_COMPANIES} 
              label="Inboxes and domains your buyers already trust"
              size="md"
              showNames={true}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">How the two agents work</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
