"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Layers, Code, Zap, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

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
    { template: "/best-[software]-for-[industry]", pages: "500+ pages", example: "best-crm-for-real-estate" },
    { template: "/[city]-[service]-guide", pages: "1,000+ pages", example: "austin-marketing-agency-guide" },
    { template: "/[tool]-vs-[competitor]", pages: "200+ pages", example: "notion-vs-asana" },
    { template: "/how-to-[action]-in-[tool]", pages: "300+ pages", example: "how-to-automate-in-zapier" }
  ];

  return (
    <section id="pseo" ref={sectionRef} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_rgba(139,92,246,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full text-sm font-semibold mb-6 border border-violet-500/30">
            <Layers size={16} />
            <span>Service 05</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            pSEO Implementation
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            Programmatic SEO is the secret weapon of the fastest-growing companies. We create <span className="text-white font-semibold">thousands of targeted landing pages</span> automatically — each one optimized for specific keywords and user intent.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Explanation */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                What is Programmatic SEO?
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Instead of creating pages one-by-one, pSEO uses templates and data to generate hundreds or thousands of unique, valuable pages. Think of how Yelp has a page for every restaurant, or Zillow has a page for every property.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                <span className="font-semibold text-white">The result?</span> You capture long-tail traffic at scale — the kind of searches with high intent and low competition.
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-white">Identify Patterns</h4>
                  <p className="text-gray-400 text-sm">We analyze your industry to find scalable keyword patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-white">Build Templates</h4>
                  <p className="text-gray-400 text-sm">Create dynamic templates that generate unique, valuable content</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-white">Deploy & Monitor</h4>
                  <p className="text-gray-400 text-sm">Pages go live automatically and we track their performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Examples */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-black text-white p-6 md:p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-violet-400" size={24} />
                <h3 className="text-xl font-bold">pSEO Templates We Create</h3>
              </div>

              <div className="space-y-4">
                {pseoExamples.map((example, index) => (
                  <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-violet-500/30 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-violet-400 text-sm font-mono">{example.template}</code>
                      <span className="text-xs text-gray-500">{example.pages}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <ArrowRight size={14} />
                      <span className="text-gray-300">{example.example}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-emerald-400">
                  <Zap size={20} />
                  <span className="font-semibold">Result: 2,000+ pages ranking in 90 days</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-5 bg-violet-500/10 rounded-2xl border border-violet-500/20 text-center">
                <div className="text-3xl font-bold text-white mb-1">10x</div>
                <div className="text-sm text-gray-400">More keywords covered</div>
              </div>
              <div className="p-5 bg-violet-500/10 rounded-2xl border border-violet-500/20 text-center">
                <div className="text-3xl font-bold text-white mb-1">$0.02</div>
                <div className="text-sm text-gray-400">Cost per page created</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-violet-400 flex-shrink-0" size={18} />
                <span>Capture long-tail searches competitors miss</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-violet-400 flex-shrink-0" size={18} />
                <span>Each page is unique — no duplicate content issues</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-violet-400 flex-shrink-0" size={18} />
                <span>Scales infinitely as you add more data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
