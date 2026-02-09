"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Link2, Bot, Target, Award, Shield, TrendingUp, CheckCircle2, ExternalLink } from 'lucide-react';

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

  const backlinkProcess = [
    {
      icon: Target,
      title: "Target Identification",
      description: "AI scans millions of sites to find high-authority domains relevant to your industry"
    },
    {
      icon: Bot,
      title: "Automated Outreach",
      description: "Personalized outreach at scale — AI crafts unique pitches for each target"
    },
    {
      icon: Link2,
      title: "Link Acquisition",
      description: "Secure placements on DR 70-90 sites through genuine value exchange"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every link is vetted for spam, relevance, and long-term ranking impact"
    }
  ];

  const recentBacklinks = [
    { domain: "techcrunch.com", dr: 94, type: "Guest Post" },
    { domain: "forbes.com", dr: 95, type: "Feature" },
    { domain: "entrepreneur.com", dr: 91, type: "Interview" },
    { domain: "inc.com", dr: 92, type: "Resource Link" }
  ];

  return (
    <section id="backlinks" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[150px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-semibold mb-6 border border-orange-500/30">
            <Link2 size={16} />
            <span>🔗 #1 Google ranking factor — backlinks drive 58% of ranking power</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Backlinks That Cost Others $500 Each. Free for You.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">One DR 80+ backlink costs $400-$1,000.</span> We deliver 20-30 monthly. That&apos;s $8,000-$30,000 in value — included in your $350. Our AI agents do the outreach humans can&apos;t scale.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          {/* Left: Process */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">How Our AI Gets You Links</h3>
            
            <div className="space-y-6">
              {backlinkProcess.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-orange-500/30 transition-all">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Guarantee Box */}
            <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Award className="text-orange-400" size={24} />
                <span className="text-lg font-bold">Our Backlink Guarantee</span>
              </div>
              <p className="text-gray-300">
                We guarantee <span className="text-orange-400 font-semibold">20-30 backlinks per month</span> with an average DR of 70-90. If we don&apos;t hit the target, you don&apos;t pay. It&apos;s that simple.
              </p>
            </div>
          </div>

          {/* Right: Live Feed + Stats */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl text-center">
                <div className="text-4xl font-bold text-white mb-1">70-90</div>
                <div className="text-sm text-gray-500">Average DR Score</div>
              </div>
              <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl text-center">
                <div className="text-4xl font-bold text-white mb-1">20-30</div>
                <div className="text-sm text-gray-500">Links Per Month</div>
              </div>
            </div>

            {/* Recent Backlinks Feed */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-white">Recent Acquisitions</span>
                </div>
                <span className="text-xs text-gray-500">Sample Results</span>
              </div>
              
              <div className="divide-y divide-gray-800">
                {recentBacklinks.map((link, index) => (
                  <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <ExternalLink size={16} className="text-gray-500" />
                      <span className="text-white font-medium">{link.domain}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">{link.type}</span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">
                        DR {link.dr}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Matters */}
            <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-xl">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="text-emerald-400" size={18} />
                Why Backlinks Matter
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                A single backlink from a DR 90 site can boost your rankings more than 100 low-quality links. That&apos;s why we focus exclusively on premium placements that actually move the needle.
              </p>
            </div>

            {/* Checkmarks */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span>No spammy link farms or PBNs</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span>Only relevant, high-authority domains</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span>White-hat methods Google loves</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
