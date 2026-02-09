"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Rocket, ShoppingCart, Code, Building2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const GrowthHacks = () => {
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

  const industries = [
    {
      icon: Code,
      title: "SaaS Companies",
      color: "from-blue-500 to-cyan-500",
      hacks: [
        "Product-led SEO landing pages",
        "Integration pages for every tool you connect with",
        "Alternative pages (vs competitors)",
        "Feature comparison matrices",
        "Use case templates library"
      ]
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      color: "from-orange-500 to-red-500",
      hacks: [
        "Category page optimization at scale",
        "Product schema for rich snippets",
        "Review aggregation for UGC SEO",
        "Seasonal landing pages automated",
        "Local inventory pages"
      ]
    },
    {
      icon: Building2,
      title: "Agencies & Services",
      color: "from-purple-500 to-pink-500",
      hacks: [
        "Case study optimization",
        "Service area pages at scale",
        "Industry-specific landing pages",
        "Client results showcases",
        "Thought leadership syndication"
      ]
    }
  ];

  return (
    <section id="growth-hacks" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">
            <Rocket size={16} />
            <span>Bonus Strategies</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Industry-Specific Growth Hacks
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            Every industry has unique opportunities. We don&apos;t just apply generic tactics — we deploy <span className="text-white font-semibold">proven growth strategies tailored to your specific business type</span>.
          </p>
        </div>

        {/* Industry Cards */}
        <div className={`grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div key={index} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all group">
                <div className={`w-14 h-14 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{industry.title}</h3>
                <ul className="space-y-3">
                  {industry.hacks.map((hack, hackIndex) => (
                    <li key={hackIndex} className="flex items-start gap-2 text-gray-400 text-sm">
                      <ArrowRight size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                      <span>{hack}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Strategies */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-yellow-400" size={24} />
              <h3 className="text-2xl font-bold">Plus These Universal Strategies</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Competitor backlink gap analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Featured snippet optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">HARO and journalist outreach</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Podcast guesting for backlinks</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Reddit and Quora SEO</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">YouTube SEO for video content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
