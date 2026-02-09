"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Bot, Link2, Target, Shield, TrendingUp, CheckCircle2, Zap, Globe } from 'lucide-react';

export const AIBacklinkAgents = () => {
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

  const backlinkStats = [
    { number: "20-30", label: "Backlinks/month", sublabel: "Guaranteed minimum" },
    { number: "DR 70-90", label: "Average Domain Rating", sublabel: "High-authority only" },
    { number: "24/7", label: "AI Agents Active", sublabel: "Never stops working" },
    { number: "0%", label: "Spam Links", sublabel: "Quality guaranteed" },
  ];

  return (
    <section id="backlinks" ref={sectionRef} className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[200px] animate-pulse"></div>
        {/* Connection Lines Animation */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#10b981" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Bot size={16} />
            <span>Feature #4</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            AI Agents for Backlinks
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            Backlinks are the currency of SEO. But getting quality ones takes months of manual outreach. <span className="text-white font-semibold">Our AI agents do it automatically</span> — finding opportunities, crafting personalized pitches, and securing high-authority links while you sleep.
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {backlinkStats.map((stat, index) => (
            <div key={index} className="p-6 bg-gray-900/80 border border-gray-800 rounded-2xl text-center hover:border-emerald-500/50 transition-colors">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">{stat.number}</div>
              <div className="text-white font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Agent Visualization */}
            <div className="relative">
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs text-emerald-400 font-mono">AGENTS ACTIVE</span>
                </div>

                {/* Agent Activity Feed */}
                <div className="space-y-4 mt-8">
                  <div className="text-sm text-gray-500 mb-6">Live Agent Activity</div>
                  
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-fade-in">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <Bot size={18} className="text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">Agent secured backlink from TechCrunch</p>
                      <p className="text-xs text-gray-500">DR 94 • Just now</p>
                    </div>
                    <CheckCircle2 size={18} className="text-emerald-400" />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Target size={18} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">Identified 12 new link opportunities</p>
                      <p className="text-xs text-gray-500">ProductHunt, HackerNoon, Dev.to</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Globe size={18} className="text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">Submitted to 8 high-DR directories</p>
                      <p className="text-xs text-gray-500">Avg DR 78 • Auto-filling forms</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <Zap size={18} className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">Outreach email sent to 47 prospects</p>
                      <p className="text-xs text-gray-500">Personalized • High open rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Benefits */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  What Would Take You 100+ Hours Takes Us Minutes
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Traditional link building means cold emailing thousands of websites, hoping for a 1% response rate. Our AI agents have been trained on millions of successful outreach campaigns. They know what works — and they never get tired.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 transition-colors">
                  <Shield className="text-emerald-400 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-white mb-1">Only Quality Links</h4>
                    <p className="text-gray-400 text-sm">No PBNs, no spam, no link farms. Every backlink is from a real, authoritative website that Google trusts.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 transition-colors">
                  <Target className="text-emerald-400 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-white mb-1">Niche-Relevant</h4>
                    <p className="text-gray-400 text-sm">Links from sites in your industry carry more weight. We target opportunities that actually matter for your specific business.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 transition-colors">
                  <TrendingUp className="text-emerald-400 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-white mb-1">Compound Growth</h4>
                    <p className="text-gray-400 text-sm">Each new backlink makes the next one easier to get. Within 6 months, your domain authority can double.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className={`mt-16 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-6 md:p-8 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-blue-500/20 border border-emerald-500/30 rounded-2xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500 text-black text-sm font-bold rounded-full mb-4">
              <Shield size={14} />
              GUARANTEE
            </div>
            <p className="text-lg text-gray-300">
              <span className="text-white font-bold">20-30 high-quality backlinks per month</span> with an average DR of 70-90, or we&apos;ll refund your payment and give you a free month. That&apos;s how confident we are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
