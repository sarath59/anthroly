"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Check, Zap, Shield, ArrowRight, Sparkles, TrendingUp, Bot, Search, Users } from 'lucide-react';
import { BOOK_CALL_URL } from '@/lib/site';
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
      title: '10 high-DR backlinks every month',
      body: 'Editorial links from authoritative sites—built for trust, rankings, and long-term authority.',
    },
    {
      title: '15 human-written, conversation-style SEO blogs / month',
      body: 'Natural, high-quality pieces optimized for Google and AI discovery—not generic AI fluff.',
    },
  ];

  const includedFeatures = [
    "Dedicated human account manager",
    "Weekly strategy calls with your team",
    "15 Human-reviewed AI Q&A Pages/Month",
    "50+ AI Brand Mentions/Month",
    "AI Crawler Analysis & Monitoring 24/7",
    "20 Free Tools Built for Your Site",
    "LinkedIn, X, Medium Articles",
    "Weekly Performance Reports",
    "Competitor Analysis & Intel",
    "Technical SEO Audits & Fixes",
    "LLM SEO (optimize for AI answers & citations)",
    "Entity building & knowledge graph signals",
    "Reddit distribution & community visibility",
    "Organic attribution & search-to-revenue tracking",
    "Programmatic SEO & scalable page systems",
    "AI prompt discovery (what users ask AI)",
    "Buyer decision mapping & intent content",
    "AI-first keyword research",
    "Growth loops from search (traffic → signups → content)",
    "Comparison page systems",
    "Decision page frameworks",
    "Topical authority architecture",
    "Structured content for LLM citation",
    "AI search discovery (ChatGPT, Perplexity, Claude, Gemini)",
  ];

  const expectedResults = [
    { icon: Users, title: "Weekly human check-ins", detail: "Real strategy calls, not just reports" },
    { icon: Bot, title: "50+ AI brand mentions", detail: "ChatGPT + Perplexity + Claude + Gemini" },
    { icon: Search, title: "Rank on Google + AI", detail: "Traditional SEO + AI visibility combined" },
    { icon: TrendingUp, title: "Results that compound", detail: "Growth accelerates month over month" },
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
            <span>💰 This would cost $8,500/mo at a traditional agency</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            $535 to Change Everything
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">15 human-written blogs + 10 high-DR backlinks + 15 AI Q&A pages + 50+ AI mentions + 20 tools = $28,500+ replacement value.</span> You get the full system for $535/month. Same pricing, always. No contracts. Cancel anytime.
          </p>
          <p className="text-sm md:text-base text-gray-500 mt-4">
            <span className="text-white font-semibold">3 engines working together:</span> Visibility (AI crawler + monitoring), Content (blogs + Q&amp;A + pSEO), Authority (backlinks + social + tools).
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
                <h3 className="text-xl text-gray-400 mb-4">AI Power + Human Support</h3>
                
                {/* Price Display */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-baseline">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">$535</span>
                    <span className="text-gray-400 text-xl ml-2">/month</span>
                  </div>
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
                      What we do for you
                      <span className="text-gray-500 font-normal">(services)</span>
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
                      Results depend on niche + existing site baseline, but the system and deliverables are committed in your first 30 days.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full h-14 md:h-16 text-lg md:text-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40">
                  Book a call
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
                  If we miss <span className="text-emerald-400 font-semibold">ANY core commitment</span> in your first 30 days (10 high-DR backlinks, 15 blogs, 15 AI Q&A pages, 20 tools, or 50+ AI brand mentions), we&apos;ll <span className="text-white font-semibold">give you one free month of service.</span>
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
                A single SEO-generated lead can be worth $500-$5,000+ depending on your business. We&apos;re delivering 15 human-written blogs, 10 high-DR backlinks, 15 AI Q&A pages, 50+ AI mentions, 20 tools, and multi-platform content distribution every single month. For $535.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">$2,000+</div>
                  <div className="text-sm text-gray-500">What agencies charge for this</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">100+ hrs</div>
                  <div className="text-sm text-gray-500">Time saved per month</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">95%</div>
                  <div className="text-sm text-gray-500">Cost savings with us</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Powered by trusted infrastructure */}
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
