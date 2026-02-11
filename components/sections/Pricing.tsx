"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Check, Star, Zap, Shield, ArrowRight, Clock, Sparkles, TrendingUp, Bot, Search } from 'lucide-react';
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

  const includedFeatures = [
    "AI Crawler Analysis & Optimization",
    "AI Visibility Monitoring 24/7",
    "30 Human-reviewed SEO Blogs/Month (AI-assisted)",
    "15 Human-reviewed AI Q&A Pages/Month (AI-assisted)",
    "20-30 High-DR Backlinks/Month",
    "50+ AI Brand Mentions/Month",
    "Programmatic SEO Implementation",
    "20 Free Tools Built for Your Site",
    "LinkedIn, X, Medium Articles",
    "Weekly Performance Reports",
    "Competitor Analysis & Intel",
    "Technical SEO Audits & Fixes",
  ];

  const expectedResults = [
    { icon: Bot, title: "50+ AI brand mentions", detail: "ChatGPT + Perplexity + Claude + Gemini + AI Overview" },
    { icon: Search, title: "50+ pages indexed", detail: "Measured in Google Search Console" },
    { icon: TrendingUp, title: "Early rankings + impressions", detail: "Momentum that compounds in months 2–3" },
    { icon: Zap, title: "System live fast", detail: "First deliverables shipped in days, not weeks" },
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
            $350 to Change Everything
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">30 blogs + 15 AI Q&A pages + 20-30 backlinks + 50+ AI mentions + 20 tools = $28,500+ replacement value.</span> You get the full system for $350. 30 days to prove it works. After 30 days, if you&apos;re happy with results, we&apos;ll discuss new pricing. No contracts. Cancel anytime.
          </p>
          <p className="text-sm md:text-base text-gray-500 mt-4">
            <span className="text-white font-semibold">3 engines working together:</span> Visibility (AI crawler + monitoring), Content (blogs + Q&amp;A + pSEO), Authority (backlinks + social + tools).
          </p>
        </div>

        {/* Pricing Card */}
        <div className={`max-w-4xl mx-auto transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <HoverTilt className="relative group" intensity={4}>
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <SpotlightCard className="rounded-3xl">
              <div className="relative bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-800 overflow-visible">
              
              {/* Best Value Badge - properly positioned */}
              <div className="absolute -top-5 -right-3 md:-right-5 z-20">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-sm font-bold px-5 py-2.5 rounded-full transform rotate-12 shadow-[0_4px_20px_rgba(16,185,129,0.4)] flex items-center gap-1.5">
                  <Star size={14} fill="black" />
                  30-DAY TRIAL
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-10 pt-2">
                <h3 className="text-xl text-gray-400 mb-4">The Complete AI Growth Engine</h3>
                
                {/* Price Display */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-baseline">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">$350</span>
                    <span className="text-gray-400 text-xl ml-2">/month</span>
                  </div>
                </div>
                
                {/* Trial Info */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm mb-4">
                  <Clock size={16} />
                  <span>For first 30 days — then new pricing if you&apos;re happy with results</span>
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
                    <div className="space-y-2.5">
                      {includedFeatures.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 text-gray-300">
                          <div className="mt-0.5 flex-shrink-0 w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-emerald-500" />
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
              <a href="https://buy.polar.sh/polar_cl_NBzHmxi4dZuSh5bLGhG0iUoBqLAa8Y3dBUiFv0fZ1AN" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full h-14 md:h-16 text-lg md:text-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40">
                  Start 30-Day Trial — $350/mo
                  <ArrowRight className="ml-2" size={22} />
                </Button>
              </a>
              
              <p className="text-center text-xs text-gray-500 mt-6">
                Limited spots available. Pricing increases after trial period.
              </p>

              {/* Guarantee */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Shield className="text-emerald-400" size={24} />
                  <span className="text-lg font-bold">Risk-Free Promise</span>
                </div>
                <p className="text-sm text-center text-gray-400 leading-relaxed max-w-lg mx-auto">
                  If we miss <span className="text-emerald-400 font-semibold">ANY core commitment</span> in your first 30 days (20-30 backlinks, 30 blogs, 15 AI Q&A pages, 20 tools, or 50+ AI brand mentions), we&apos;ll <span className="text-white font-semibold">give you one free month of service.</span>
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
                A single SEO-generated lead can be worth $500-$5,000+ depending on your business. We&apos;re delivering 30 blogs, 15 AI Q&A pages, 20-30 backlinks, 50+ AI mentions, 20 tools, and multi-platform content distribution every single month. For $350.
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
