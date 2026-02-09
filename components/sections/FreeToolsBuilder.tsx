"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Wrench, Calculator, FileText, Palette, Code2, Zap, TrendingUp, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export const FreeToolsBuilder = () => {
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

  const toolExamples = [
    { icon: Calculator, name: "ROI Calculator", visits: "3,200/mo", keywords: "47 ranking" },
    { icon: FileText, name: "Template Generator", visits: "2,800/mo", keywords: "32 ranking" },
    { icon: Palette, name: "Color Palette Tool", visits: "1,900/mo", keywords: "28 ranking" },
    { icon: Code2, name: "Code Formatter", visits: "2,400/mo", keywords: "19 ranking" },
  ];

  return (
    <section id="tools" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#fef3c7_0%,_transparent_40%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6">
            <Wrench size={16} />
            <span>Feature #8</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            10 Free Tools Per Month
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Free tools are SEO gold. They attract backlinks naturally, rank for high-intent keywords, and convert visitors into customers. <span className="text-black font-semibold">We build 10 custom tools for your website every month</span> — automatically.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Tools Demo */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-black text-white p-6 md:p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-lg">Your Free Tools Dashboard</h4>
                <span className="text-amber-400 text-sm font-mono">10/10 deployed</span>
              </div>

              <div className="space-y-4 mb-6">
                {toolExamples.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-900/80 rounded-xl border border-gray-800 hover:border-amber-500/30 transition-colors group">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                        <Icon className="text-amber-400" size={22} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{tool.name}</div>
                        <div className="text-xs text-gray-500">{tool.keywords}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-bold">{tool.visits}</div>
                        <div className="text-xs text-gray-500">visits</div>
                      </div>
                    </div>
                  );
                })}
                
                {/* More tools indicator */}
                <div className="text-center text-gray-500 text-sm py-2">
                  + 6 more tools driving traffic
                </div>
              </div>

              {/* Total Stats */}
              <div className="p-5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-white">10,300</div>
                    <div className="text-sm text-gray-400">Monthly visits from tools</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-400">+847</div>
                    <div className="text-sm text-gray-400">Natural backlinks earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Benefits */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Why Free Tools Are a Growth Hack
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                HubSpot's Website Grader, Ahrefs' Backlink Checker, Neil Patel's SEO Analyzer — these tools drive millions of visits and thousands of backlinks. The same strategy works for any business. We just automate it.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-amber-50 rounded-xl border border-amber-200">
                <TrendingUp className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-black mb-1">Rank for "Tool" Keywords</h4>
                  <p className="text-gray-600 text-sm">Keywords like "free [X] calculator" have massive search volume and high conversion intent.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 bg-amber-50 rounded-xl border border-amber-200">
                <Users className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-black mb-1">Natural Link Magnets</h4>
                  <p className="text-gray-600 text-sm">People link to useful tools without being asked. It's the most organic backlink strategy that exists.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-amber-50 rounded-xl border border-amber-200">
                <Zap className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-black mb-1">Lead Generation Machine</h4>
                  <p className="text-gray-600 text-sm">Every tool user is a potential customer. Capture emails, show your product value, convert at scale.</p>
                </div>
              </div>
            </div>

            {/* Tool Types */}
            <div className="p-5 bg-gray-100 rounded-xl">
              <div className="text-sm font-bold text-black mb-3">Types of tools we build:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Calculators",
                  "Generators",
                  "Checkers",
                  "Analyzers",
                  "Converters",
                  "Templates",
                  "Comparisons",
                  "Validators"
                ].map((type, index) => (
                  <span key={index} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 max-w-3xl mx-auto text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-6 md:p-8 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-2xl">
            <h4 className="text-xl font-bold text-black mb-3">
              120 Free Tools Per Year. Zero Developer Time.
            </h4>
            <p className="text-gray-600 mb-4">
              That's an entire content engine driving traffic, earning backlinks, and converting visitors — built automatically, month after month.
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-700 font-semibold">
              <CheckCircle2 size={18} />
              <span>Fully customized to your brand and industry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
