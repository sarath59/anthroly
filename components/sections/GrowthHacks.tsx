"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Rocket, ShoppingCart, Code, Building2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlowPulse } from '../ui/animated-elements';

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
        "SEO agent: product-led pages and integration hubs at scale",
        "Sales agent: every trial signup enriched and routed in minutes",
        "Support agent: onboarding questions answered inside the product",
        "Marketing agent: comparison and alternative pages that convert",
        "Weekly read on activation, expansion, and churn signals"
      ]
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      color: "from-orange-500 to-red-500",
      hacks: [
        "SEO agent: category and product pages tuned continuously",
        "Support agent: orders, shipping, and returns closed end to end",
        "Sales agent: cart recovery that reads context, not just a timer",
        "Marketing agent: seasonal campaigns built and launched on time",
        "Margin by channel, reported every Monday"
      ]
    },
    {
      icon: Building2,
      title: "Agencies & Services",
      color: "from-purple-500 to-pink-500",
      hacks: [
        "SEO agent: a service-area page for every location you cover",
        "Sales agent: inbound leads qualified before you call back",
        "Marketing agent: case studies written from your delivery data",
        "Support agent: client questions answered from your own docs",
        "White-label reporting your clients will actually read"
      ]
    }
  ];

  return (
    <section id="growth-hacks" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <GlowPulse className="top-0 left-0" color="purple" size={500} />
        <GlowPulse className="bottom-0 right-0" color="blue" size={400} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">
            <Rocket size={16} />
            <span>💡 The same four agents, tuned to how your industry actually sells</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Industry&apos;s Secret Growth Playbook
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Generic automation fails. Trained agents win.</span> We&apos;ve studied how the best operators in your category actually run — then built your agents to work the same way.
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
              <h3 className="text-2xl font-bold">Plus These, Whatever You Sell</h3>
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
                <span className="text-gray-300">Lead enrichment and ICP scoring</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Reddit and Quora SEO</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Objection-handling pages from real sales calls</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
