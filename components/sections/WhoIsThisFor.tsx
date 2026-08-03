"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Building2, Users, Code2, Store, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { LogoStrip, SAAS_LEADERS, ECOMMERCE } from '../ui/CompanyLogos';
import { GlowPulse, SpotlightCard } from '../ui/animated-elements';

export const WhoIsThisFor = () => {
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

  const audiences = [
    {
      icon: Rocket,
      title: "Indie Hackers & Solo Founders",
      description: "You are the product team, the sales team, and the support desk. Agents give you the three colleagues you cannot afford to hire yet.",
      benefits: ["Build product, not busywork", "Cover four functions alone", "Compete with funded teams"],
      color: "emerald"
    },
    {
      icon: Building2,
      title: "Startups & Scale-ups",
      description: "You found product-market fit, and suddenly every function wants headcount. Deploy agents where the work repeats; hire only where judgment is required.",
      benefits: ["Grow without growing payroll", "Execution you can predict", "CAC that falls every month"],
      color: "blue"
    },
    {
      icon: Store,
      title: "E-commerce & DTC Brands",
      description: "Ad costs climb every quarter while the support inbox never empties. Your agents own organic demand and the inbox at the same time.",
      benefits: ["Break the ad dependency", "Rank for buyer intent", "Answer customers instantly"],
      color: "purple"
    },
    {
      icon: Code2,
      title: "SaaS Companies",
      description: "Your best growth loops are all repeatable: content, trials, onboarding, renewals. Repeatable is precisely what an agent is for.",
      benefits: ["Programmatic SEO at scale", "Leads qualified automatically", "Support that scales flat"],
      color: "pink"
    },
    {
      icon: Briefcase,
      title: "Agencies & Consultants",
      description: "Take on more clients without adding more juniors. White-label our agents and ship work you would happily put your name on.",
      benefits: ["White-label delivery", "Serve more accounts", "Protect your margins"],
      color: "orange"
    },
    {
      icon: Users,
      title: "Enterprise Marketing Teams",
      description: "Your strategy is sound; execution is stuck behind queues and approvals. Agents clear the backlog while your people decide direction.",
      benefits: ["Clear the execution backlog", "Move without new headcount", "Fully auditable output"],
      color: "cyan"
    }
  ];

  return (
    <section id="who" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <GlowPulse className="top-1/3 left-0" color="emerald" size={600} />
        <GlowPulse className="bottom-0 right-0" color="blue" size={500} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400 mb-6">
            <span>👥 Every team has work that repeats. Almost none of it needs a human.</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            You Know What Needs Doing.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              You Just Don&apos;t Have the Hours.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Research, outreach, content, triage—15 to 20 hours a week, every week.</span> That is the work your agents take. What&apos;s left is the work only you can actually do.
          </p>
        </div>

        {/* Audience Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <SpotlightCard
                key={index}
                className="bg-gray-900/80 border border-gray-800 rounded-3xl hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="group p-6 md:p-8">
                  <div className={`w-14 h-14 bg-${audience.color}-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`text-${audience.color}-400`} size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">{audience.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{audience.description}</p>
                  <div className="space-y-2">
                    {audience.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="text-emerald-400" size={16} />
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Trusted By Leaders */}
        <div className={`mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            <LogoStrip 
              companies={SAAS_LEADERS} 
              label="Used by SaaS leaders like"
              size="sm"
            />
            <LogoStrip 
              companies={ECOMMERCE} 
              label="Trusted by e-commerce brands"
              size="sm"
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 max-w-3xl mx-auto text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Four Teammates Who Never Clock Out
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              They cost less together than one junior hire, they work through the night, and every action they take is written down. The only real question is how much longer you&apos;ll do it by hand.
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold hover:gap-4 transition-all cursor-pointer">
              <span>See pricing below</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
