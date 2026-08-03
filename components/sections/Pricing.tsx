"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Check, Zap, Shield, ArrowRight, Sparkles, TrendingUp, Bot, Search, Users } from 'lucide-react';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from '../ui/button';
import { LogoStrip, TECH_COMPANIES } from '../ui/CompanyLogos';
import { GlowPulse, GradientBeam, SpotlightCard, ScaleOnScroll, HoverTilt } from '../ui/animated-elements';

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

  const highlightedServices = [
    {
      title: 'Four intelligent agents, live in your stack',
      body: 'SEO, sales automation, marketing, and customer support—each one analyzing, deciding, executing, and reporting on its own workflow.',
    },
    {
      title: 'Human-led SEO, still fully included',
      body: '15 human-written blogs and 15–25 high-DR backlinks a month. Real writers, real outreach, a person signing off on everything published.',
    },
  ];

  const includedFeatures = [
    "Dedicated human account manager",
    "Lead research, enrichment & ICP scoring",
    "Outbound sequences with context-aware replies",
    "Ticket triage, resolution & escalation with context",
    "Knowledge base written from real conversations",
    "CRM hygiene & pipeline reporting",
    "15 human-reviewed AI Q&A pages/month",
    "50+ AI brand mentions/month",
    "24/7 AI crawler analysis & monitoring",
    "20 custom tools built for your site",
    "LinkedIn, X, and Medium articles",
    "Weekly report on every agent action",
    "Competitor analysis & intel",
    "Technical SEO audits & fixes",
    "LLM SEO (optimize for AI answers & citations)",
    "Entity building & knowledge graph signals",
    "Reddit distribution & community visibility",
    "Organic attribution & search-to-revenue tracking",
    "Programmatic SEO & scalable page systems",
    "AI prompt discovery (what buyers ask AI)",
    "Buyer decision mapping & intent content",
    "AI-first keyword research",
    "Comparison & decision page frameworks",
    "Topical authority architecture",
    "Structured content for LLM citation",
    "AI search discovery (ChatGPT, Perplexity, Claude, Gemini)",
  ];

  const expectedResults = [
    { icon: Users, title: "A human on the hook", detail: "Real account manager, not a status page" },
    { icon: Bot, title: "Agents that execute", detail: "Work completed, not recommendations filed" },
    { icon: Search, title: "Found on Google + AI", detail: "Classic search and AI answers, together" },
    { icon: TrendingUp, title: "Returns that compound", detail: "Every cycle teaches the next one" },
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <GlowPulse className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="emerald" size={800} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>💰 Four hires to cover this would cost $28,500/mo</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            $2,000 to Change How Work Gets Done
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">SEO + sales + marketing + support agents, plus human-written content and real outreach = $28,500+ to assemble in-house.</span> You get the whole system for $2,000/month. Start with $1,000 upfront—pay the rest after first-month results. No contracts. Cancel anytime.
          </p>
          <p className="text-sm md:text-base text-gray-500 mt-4">
            <span className="text-white font-semibold">4 agents, one shared brain:</span> SEO (visibility), Sales (pipeline), Marketing (demand), Support (retention)—each one executing end to end.
          </p>
        </div>

        {/* Pricing Card */}
        <div className={`max-w-4xl mx-auto transform transition-all duration-1000 delay-200 relative ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          <HoverTilt className="relative group" intensity={4}>
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <SpotlightCard className="rounded-3xl">
              <div className="relative bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-800">

              {/* Header */}
              <div className="text-center mb-10 pt-2">
                <h3 className="text-xl text-gray-400 mb-4">Four agents + human oversight</h3>
                
                {/* Price Display */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-baseline">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">$2,000</span>
                    <span className="text-gray-400 text-xl ml-2">/month</span>
                  </div>
                </div>
                
                <div className="max-w-md mx-auto space-y-2 mb-4 text-left">
                  <p className="text-sm text-gray-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                    <span className="text-emerald-400 font-semibold">Month 1:</span> $1,000 upfront · remaining $1,000 after first-month results
                  </p>
                  <p className="text-sm text-gray-300 bg-white/5 border border-gray-700 rounded-xl px-4 py-3">
                    <span className="text-white font-semibold">Month 2+:</span> $2,000 upfront each month
                  </p>
                </div>

                <p className="text-gray-500">
                  Cancel anytime. No questions asked.
                </p>
              </div>

              {/* Services + Results - Side by Side on larger screens */}
              <div className="mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Services Column */}
                  <div>
                    <div className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Zap size={14} className="text-emerald-400" />
                      </div>
                      What your agents do
                      <span className="text-gray-500 font-normal">(the work)</span>
                    </div>
                    <div className="space-y-3">
                      {highlightedServices.map((item, i) => (
                        <div
                          key={`hi-${i}`}
                          className="rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/[0.12] to-cyan-500/[0.06] p-4 shadow-[0_0_24px_-12px_rgba(16,185,129,0.35)]"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex-shrink-0 w-5 h-5 bg-emerald-500/30 rounded-full flex items-center justify-center ring-1 ring-emerald-400/40">
                              <Check size={12} className="text-emerald-300" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-white leading-tight block">{item.title}</span>
                              <span className="text-xs text-emerald-100/80 leading-snug mt-1 block">{item.body}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 pt-1 pb-0.5">
                        Also included
                      </p>
                      {includedFeatures.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 text-gray-500">
                          <div className="mt-0.5 flex-shrink-0 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-gray-600" />
                          </div>
                          <span className="text-sm leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results Column */}
                  <div>
                    <div className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <TrendingUp size={14} className="text-cyan-400" />
                      </div>
                      What you get out of it
                      <span className="text-gray-500 font-normal">(results)</span>
                    </div>
                    <div className="space-y-3">
                      {expectedResults.map((r, idx) => {
                        const Icon = r.icon;
                        return (
                          <div
                            key={idx}
                            className="p-4 bg-black/40 border border-gray-800 rounded-xl hover:border-emerald-500/30 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <Icon size={18} className="text-emerald-400" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-white font-semibold text-sm">{r.title}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{r.detail}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                      Results depend on your market and starting baseline, but the agents, the deliverables, and the human sign-off are all committed in your first 30 days.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full h-14 md:h-16 text-lg md:text-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40">
                  {PRIMARY_CTA_LABEL}
                  <ArrowRight className="ml-2" size={22} />
                </Button>
              </a>
              

              {/* Guarantee */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Shield className="text-emerald-400" size={24} />
                  <span className="text-lg font-bold">Risk-Free Promise</span>
                </div>
                <p className="text-sm text-center text-gray-400 leading-relaxed max-w-lg mx-auto">
                  If we miss <span className="text-emerald-400 font-semibold">ANY core commitment</span> in your first 30 days (four agents live, 15–25 high-DR backlinks, 15 blogs, 15 AI Q&A pages, 20 tools, or 50+ AI brand mentions), we&apos;ll <span className="text-white font-semibold">give you one free month of service.</span>
                </p>
              </div>
            </div>
            </SpotlightCard>
          </HoverTilt>
        </div>

        {/* ROI Calculator Callout */}
        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Think About the Math</h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                One junior hire covers one function, badly, for $4,000 a month. Four agents cover SEO, sales, marketing, and support—executing every day, reporting every week, and never taking a Friday off. For $2,000, starting with just $1,000 upfront.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">$28,500+</div>
                  <div className="text-sm text-gray-500">To staff this in-house</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">100+ hrs</div>
                  <div className="text-sm text-gray-500">Given back every month</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">93%</div>
                  <div className="text-sm text-gray-500">Less than doing it yourself</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Powered by trusted infrastructure */}
        <div className={`mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <LogoStrip 
            companies={TECH_COMPANIES} 
            label="Enterprise infrastructure & secure payments"
            size="sm"
          />
        </div>
      </div>
    </section>
  );
};
