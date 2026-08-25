import React from 'react';
import { Search, Megaphone, Target, ArrowRight, Check } from 'lucide-react';
import { GlowPulse } from '../ui/static-fx';
import { CORE_OUTCOME, GROWTH_PILLARS, STORY_LINE, SYSTEM_NAME } from '@/lib/site';

const ICONS = [Search, Megaphone, Target];
const COLORS = ['emerald', 'cyan', 'orange'] as const;

export const HowItWorks = () => {

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      <GlowPulse className="top-1/2 left-1/4" color="emerald" size={500} />
      <GlowPulse className="bottom-1/4 right-1/4" color="cyan" size={400} />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
            {SYSTEM_NAME}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            One outcome.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Three mechanisms.
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
            {CORE_OUTCOME} GEO, founder authority, and lead generation are not three separate retainers — they are how that outcome happens.
          </p>
          <p className="text-sm text-gray-500">{STORY_LINE}</p>
        </div>

        <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-200 opacity-100 translate-y-0`}>
          <div className="grid md:grid-cols-3 gap-6">
            {GROWTH_PILLARS.map((pillar, index) => {
              const Icon = ICONS[index];
              const color = COLORS[index];
              const colorClasses = {
                emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
                cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
                orange: "from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400"
              };
              const colors = colorClasses[color];

              return (
                <div
                  key={pillar.id}
                  className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${colors} border transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full">
                    {pillar.name}
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center">
                      <Icon size={24} className={colors.split(' ').pop()} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-500 text-sm font-mono">0{index + 1}</span>
                        <ArrowRight size={14} className="text-gray-600" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{pillar.mechanism}</h3>
                      <p className="text-gray-400">{pillar.sell}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`mt-16 max-w-3xl mx-auto text-center transition-all duration-1000 delay-400 opacity-100 translate-y-0`}>
          <div className="p-6 md:p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">What you do vs. what we do</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <Check size={16} className="text-emerald-400" />
                <span className="text-gray-300">You: one interview a month</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check size={16} className="text-emerald-400" />
                <span className="text-gray-300">We: research, write, outreach</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check size={16} className="text-emerald-400" />
                <span className="text-gray-300">Humans lead. Machines assist.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
