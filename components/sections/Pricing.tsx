"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Check, Shield, ArrowRight, Sparkles, ClipboardCheck, Calendar } from 'lucide-react';
import {
  BOOK_CALL_URL,
  CONNECT_FEE_LABEL,
  CORE_OUTCOME,
  DIAGNOSTIC_CREDIT_NOTE,
  DIAGNOSTIC_NAME,
  PACKAGE_RETAINER,
  PACKAGE_SETUP,
  PRIMARY_CTA_LABEL,
  SPRINT_NAME,
  SYSTEM_NAME,
} from '@/lib/site';
import { Button } from '../ui/button';
import { LogoStrip, TECH_COMPANIES } from '../ui/CompanyLogos';
import { GlowPulse, SpotlightCard, HoverTilt } from '../ui/animated-elements';

const diagnosticPrep = [
  'Current AI visibility (ChatGPT, Gemini, Perplexity, Google AI)',
  '3–5 competitor comparison',
  'LinkedIn presence review',
  'Existing content audit',
  'Website + positioning gaps',
  'Obvious lead-generation gaps',
];

const diagnosticAgenda = [
  { time: '20 min', label: 'Current situation' },
  { time: '25 min', label: 'AI visibility' },
  { time: '20 min', label: 'Founder authority' },
  { time: '15 min', label: 'Lead generation' },
  { time: '10 min', label: 'Growth plan' },
];

const sprintWeeks = [
  {
    week: 'Week 1',
    title: 'Positioning',
    items: ['ICP definition', 'Buyer-question research', 'Competitor analysis', 'AI visibility baseline', 'Founder positioning'],
  },
  {
    week: 'Week 2',
    title: 'Authority',
    items: ['Founder interview (30–45 min)', '8–12 LinkedIn posts', '2 authority articles', '5–10 AI-search / FAQ opportunities'],
  },
  {
    week: 'Week 3',
    title: 'AI Search',
    items: ['Content restructuring', 'Comparison / alternative pages', 'Entity optimization', 'Citation opportunities', 'AI-search tracking setup'],
  },
  {
    week: 'Week 4',
    title: 'Pipeline',
    items: ['ICP prospect list', 'Lead enrichment', 'Personalized outreach system', 'Follow-up sequence', 'CRM / pipeline setup'],
  },
];

const retainerIncludes = [
  'Ongoing AI visibility monitoring',
  'Content production',
  'Founder ghostwriting',
  'AI-search content',
  'Outreach optimization',
  'Reporting',
  'Monthly strategy',
];

export const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <GlowPulse className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="emerald" size={800} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>Start with a diagnostic. Implementation is optional.</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {CORE_OUTCOME.replace(/\.$/, '')}.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            The {SYSTEM_NAME} is one acquisition system — not three disconnected agency services.
            You don&apos;t buy a call. You buy a 90-minute AI visibility + founder authority audit.
          </p>
        </div>

        {/* Diagnostic — the first purchase */}
        <div className={`max-w-4xl mx-auto mb-10 transform transition-all duration-1000 delay-200 relative ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <HoverTilt className="relative group" intensity={4}>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            <SpotlightCard className="rounded-3xl">
              <div className="relative bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-800">
                <div className="text-center mb-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                    Step 1 · What you buy first
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{CONNECT_FEE_LABEL} {DIAGNOSTIC_NAME}</h3>
                  <p className="text-gray-400 max-w-xl mx-auto">
                    90-minute AI Visibility + Founder Authority Audit. Researched before the call. A growth plan at the end.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex items-baseline">
                    <span className="text-6xl md:text-7xl font-bold text-white">{CONNECT_FEE_LABEL}</span>
                  </div>
                </div>

                <p className="text-center text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-8 max-w-2xl mx-auto">
                  {DIAGNOSTIC_CREDIT_NOTE}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <ClipboardCheck size={16} className="text-emerald-400" />
                      Before the call, we analyze
                    </div>
                    <ul className="space-y-3">
                      {diagnosticPrep.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-300">
                          <div className="mt-0.5 flex-shrink-0 w-5 h-5 bg-emerald-500/30 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-emerald-300" />
                          </div>
                          <span className="text-sm leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Calendar size={16} className="text-cyan-400" />
                      On the 90-minute call
                    </div>
                    <ul className="space-y-3">
                      {diagnosticAgenda.map((item) => (
                        <li key={item.label} className="flex items-center justify-between gap-3 p-3 bg-black/40 border border-gray-800 rounded-xl">
                          <span className="text-sm text-white">{item.label}</span>
                          <span className="text-xs font-semibold text-cyan-400">{item.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-gray-400 text-center mb-6">
                  At the end: if you want us to implement, the {SPRINT_NAME} is {PACKAGE_SETUP} and ongoing management is {PACKAGE_RETAINER}/month.
                </p>

                <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button className="w-full h-14 md:h-16 text-lg md:text-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40">
                    {PRIMARY_CTA_LABEL}
                    <ArrowRight className="ml-2" size={22} />
                  </Button>
                </a>
              </div>
            </SpotlightCard>
          </HoverTilt>
        </div>

        {/* Sprint — implementation */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-900/80 rounded-3xl p-8 md:p-12 border border-gray-800">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Step 2 · If you want us to implement
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {PACKAGE_SETUP} — {SPRINT_NAME}
              </h3>
              <p className="text-gray-400">
                Then {PACKAGE_RETAINER}/month. Cancel anytime.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {sprintWeeks.map((week) => (
                <div key={week.week} className="p-5 rounded-2xl bg-black/40 border border-gray-800">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">{week.week}</div>
                  <h4 className="text-lg font-bold text-white mb-3">{week.title}</h4>
                  <ul className="space-y-2">
                    {week.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                        <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mb-8 p-5 rounded-2xl border border-white/10 bg-white/5">
              <h4 className="text-sm font-bold text-white mb-3">{PACKAGE_RETAINER}/month ongoing</h4>
              <div className="flex flex-wrap gap-2">
                {retainerIncludes.map((item) => (
                  <span key={item} className="text-xs text-gray-300 px-3 py-1.5 rounded-full bg-black/40 border border-gray-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="text-emerald-400" size={24} />
                <span className="text-lg font-bold">If we miss a first-month commitment</span>
              </div>
              <p className="text-sm text-center text-gray-400 leading-relaxed max-w-lg mx-auto">
                If we miss a core first-month commitment (GEO visibility work started, founder content in distribution, outreach system live), we give you <span className="text-white font-semibold">one free month of retainer.</span>
              </p>
            </div>
          </div>
        </div>

        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Why start with {CONNECT_FEE_LABEL}</h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                You get a professional diagnosis either way. If you start the sprint within 7 days, {CONNECT_FEE_LABEL} applies to {PACKAGE_SETUP}. If you don&apos;t, you still leave with a plan — not a sales conversation you paid for.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">{CONNECT_FEE_LABEL}</div>
                  <div className="text-sm text-gray-500">Diagnostic · 90 minutes · researched first</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">{PACKAGE_SETUP}</div>
                  <div className="text-sm text-gray-500">{SPRINT_NAME}</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">{PACKAGE_RETAINER}/mo</div>
                  <div className="text-sm text-gray-500">Ongoing system + reporting</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <LogoStrip
            companies={TECH_COMPANIES}
            label="Secure payments & enterprise infrastructure"
            size="sm"
          />
        </div>
      </div>
    </section>
  );
};
