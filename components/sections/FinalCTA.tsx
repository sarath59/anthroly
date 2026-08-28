import React from 'react';
import { ArrowRight, Zap, Clock, Shield, CheckCircle2 } from 'lucide-react';
import {
  BOOK_CALL_URL,
  COHORT_SLOTS,
  CONNECT_FEE_LABEL,
  CORE_OUTCOME,
  DIAGNOSTIC_CREDIT_NOTE,
  PACKAGE_RETAINER,
  PACKAGE_SETUP,
  PRIMARY_CTA_LABEL,
  SLOTS_LINE,
  STORY_LINE,
  SYSTEM_NAME,
} from '@/lib/site';
import { Button } from '../ui/button';
import { GlowPulse } from '../ui/static-fx';

export const FinalCTA = () => {

  return (
    <section id="final-cta" className="py-24 md:py-32 bg-transparent text-white overflow-hidden relative">
      <div className="absolute inset-0">
        <GlowPulse className="top-0 left-1/4" color="emerald" size={600} />
        <GlowPulse className="bottom-0 right-1/4" color="cyan" size={500} />
        <GlowPulse className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="blue" size={800} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 opacity-100 translate-y-0`}>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            {CORE_OUTCOME.replace(/\.$/, '')}.
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            <span className="text-white font-semibold">{SYSTEM_NAME}.</span> Only {COHORT_SLOTS} slots. 1,000 emails a day. High-quality backlinks 24/7. You stay in the founder seat.
          </p>
          <p className="text-sm text-gray-500 mb-12">{STORY_LINE}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              "Only 10 slots",
              "1,000 personalized emails / day",
              "Backlink agent hunting 24/7",
              "Daily updates. We run them."
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                <CheckCircle2 className="text-emerald-400" size={18} />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 mb-12">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button size="xl" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 h-16 md:h-20 px-12 md:px-16 text-xl md:text-2xl rounded-full font-bold shadow-[0_0_60px_-12px_rgba(16,185,129,0.5)] hover:shadow-[0_0_80px_-15px_rgba(16,185,129,0.7)] transition-all transform hover:-translate-y-1 hover:scale-105">
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-3" size={24} />
              </Button>
            </a>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-400" />
                <span>{CONNECT_FEE_LABEL} to start · {PACKAGE_SETUP} when you are happy</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-emerald-400" />
                <span>Only {COHORT_SLOTS} slots · {CONNECT_FEE_LABEL} starts setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-400" />
                <span>Then {PACKAGE_RETAINER}/mo to run the agents + daily updates</span>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl">
            <p className="text-gray-300 leading-relaxed">
              <span className="text-white font-bold">{SLOTS_LINE}</span> {DIAGNOSTIC_CREDIT_NOTE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
