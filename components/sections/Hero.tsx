import React from 'react';
import Link from 'next/link';
import {
  ANCHOR_LINE,
  BOOK_CALL_URL,
  CONNECT_FEE_LABEL,
  CORE_PROMISE,
  DAILY_UPDATE_LINE,
  GROWTH_PILLARS,
  IDENTITY_LINE,
  PACKAGE_RETAINER,
  PACKAGE_SETUP,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_LABEL,
  SETUP_REFUND_NOTE,
  SLOTS_LINE,
  SYSTEM_NAME,
} from '@/lib/site';
import { Button } from '../ui/button';
import { ArrowRight, Link2, Mail, Zap } from 'lucide-react';
import { LogoStrip, AI_COMPANIES } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/static-fx';

const PILLAR_ICONS = [Mail, Link2, Zap];

const OBJECTIONS = [
  { q: 'Is this spam?', a: 'Personalized. Kill-switch. No junk links.' },
  { q: 'Stuck with $1,000?', a: 'Pay go-live only when you are happy. Unhappy? It comes back.' },
  { q: 'Why only 10?', a: 'We run the agents. This is not a dashboard.' },
];

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
            {SYSTEM_NAME} · {SLOTS_LINE}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="block text-white mb-2">1,000 emails a day. Backlinks 24/7.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              Your competitor already sent 1,000 today
            </span>
            <span className="block text-white mt-2">Yours didn&apos;t have to.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            {CORE_PROMISE}{' '}
            <span className="text-white font-semibold">{IDENTITY_LINE}</span>
          </p>

          <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-8">
            {ANCHOR_LINE}
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-10">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-white">{CONNECT_FEE_LABEL}</div>
              <div className="text-[11px] text-gray-500 mt-1">Start fee · claim a slot</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-white">{PACKAGE_SETUP}</div>
              <div className="text-[11px] text-gray-500 mt-1">Go-live · when you&apos;re happy</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-emerald-500/30">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">{PACKAGE_RETAINER}/mo</div>
              <div className="text-[11px] text-gray-500 mt-1">We run them · daily update</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 max-w-5xl mx-auto mb-8 text-left">
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

          <div className="grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto mb-10 text-left">
            {OBJECTIONS.map((item) => (
              <div key={item.q} className="p-3 rounded-xl border border-white/10 bg-black/30">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">{item.q}</p>
                <p className="text-sm text-gray-200">{item.a}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
            {DAILY_UPDATE_LINE}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
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
                {SECONDARY_CTA_LABEL}
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-12">
            {SETUP_REFUND_NOTE}
          </p>

          <div className="mb-8">
            <LogoStrip 
              companies={AI_COMPANIES} 
              label="Models and tools both agents run on"
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
