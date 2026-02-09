"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Layers, Calculator, FileSpreadsheet, Search, TrendingUp, CheckCircle2, Sparkles, Globe } from 'lucide-react';

export const PSEOImplementation = () => {
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

  const pseoExamples = [
    { tool: "ROI Calculator", keywords: "127 keywords ranking", traffic: "+2,400/mo" },
    { tool: "Pricing Comparison", keywords: "89 keywords ranking", traffic: "+1,800/mo" },
    { tool: "Industry Benchmark", keywords: "156 keywords ranking", traffic: "+3,200/mo" },
    { tool: "Feature Analyzer", keywords: "67 keywords ranking", traffic: "+1,100/mo" },
  ];

  return (
    <section id="pseo" ref={sectionRef} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#fdf4ff_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-6">
            <Layers size={16} />
            <span>Feature #5</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            Programmatic SEO
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Why rank for 10 keywords when you can rank for <span className="text-black font-semibold">10,000?</span> We automatically generate hundreds of optimized pages targeting long-tail keywords — the low-competition queries that drive consistent traffic.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Concept Explanation */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  The Secret Weapon of Fast-Growing SaaS Companies
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Zapier has 25,000+ landing pages. Canva has 15,000+. HubSpot has millions. They didn&apos;t write them manually — they used programmatic SEO. Now you can too.
                </p>
              </div>

              {/* How It Works */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                  <div className="w-10 h-10 bg-pink-500 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-black mb-1">We Identify Templates</h4>
                    <p className="text-gray-600 text-sm">Analyze your business to find repeatable page structures that can target thousands of variations.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                  <div className="w-10 h-10 bg-pink-500 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-black mb-1">We Generate Pages</h4>
                    <p className="text-gray-600 text-sm">Our system creates unique, valuable pages for each keyword variation — not thin content, real value.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                  <div className="w-10 h-10 bg-pink-500 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-black mb-1">You Rank Everywhere</h4>
                    <p className="text-gray-600 text-sm">Each page targets specific long-tail queries, capturing traffic your competitors don&apos;t even know exists.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results Demo */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-black text-white p-6 md:p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-lg">pSEO Performance</h4>
                <span className="text-emerald-400 text-sm font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live data
                </span>
              </div>

              {/* Example Pages */}
              <div className="space-y-3 mb-6">
                {pseoExamples.map((example, index) => (
                  <div key={index} className="p-4 bg-gray-900/80 rounded-xl border border-gray-800 hover:border-pink-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                          <Calculator size={16} className="text-pink-400" />
                        </div>
                        <span className="font-medium text-white">{example.tool}</span>
                      </div>
                      <span className="text-emerald-400 font-bold text-sm">{example.traffic}</span>
                    </div>
                    <div className="text-xs text-gray-500">{example.keywords}</div>
                  </div>
                ))}
              </div>

              {/* Total Stats */}
              <div className="p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">+8,500</div>
                    <div className="text-sm text-gray-400">monthly visitors from pSEO pages</div>
                  </div>
                  <TrendingUp className="text-pink-400" size={32} />
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-6 p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
              <div className="flex items-start gap-3">
                <Sparkles className="text-pink-600 flex-shrink-0" size={20} />
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-black">Example:</span> A SaaS company targeting &quot;best [tool] for [industry]&quot; created 500 pages in one month. Result? 12,000 new organic visitors within 90 days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className={`mt-20 max-w-5xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center mb-8 text-black">Perfect For:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe, label: "SaaS Products", example: "[Tool] vs [Competitor]" },
              { icon: FileSpreadsheet, label: "E-commerce", example: "[Product] for [Use Case]" },
              { icon: Search, label: "Marketplaces", example: "[Service] in [City]" },
              { icon: Layers, label: "Directories", example: "Best [Category] [Year]" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="p-5 bg-gray-50 rounded-xl text-center hover:bg-pink-50 transition-colors">
                  <Icon className="text-pink-600 mx-auto mb-3" size={28} />
                  <h4 className="font-bold text-black mb-1">{item.label}</h4>
                  <p className="text-xs text-gray-500 font-mono">&quot;{item.example}&quot;</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
