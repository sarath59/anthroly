"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Building2, Users, Code2, Store, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { LogoStrip, SAAS_LEADERS, ECOMMERCE } from '../ui/CompanyLogos';

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
      description: "You&apos;re building something amazing, but SEO keeps falling to the bottom of your todo list. Get enterprise-level growth without hiring a team.",
      benefits: ["Focus on product, not marketing", "Punch above your weight", "Compete with funded startups"],
      color: "emerald"
    },
    {
      icon: Building2,
      title: "Startups & Scale-ups",
      description: "You&apos;ve found product-market fit. Now you need predictable, scalable growth. We&apos;re the growth engine you don&apos;t have to manage.",
      benefits: ["Reduce CAC dramatically", "Build sustainable traffic", "Scale without scaling team"],
      color: "blue"
    },
    {
      icon: Store,
      title: "E-commerce & DTC Brands",
      description: "Paid ads are getting more expensive. Organic search is the highest-margin channel. Let us build your traffic moat.",
      benefits: ["Reduce ad dependency", "Rank for buyer keywords", "Build brand authority"],
      color: "purple"
    },
    {
      icon: Code2,
      title: "SaaS Companies",
      description: "The most successful SaaS companies own their organic traffic. From Zapier to HubSpot, SEO compounds. Start building your moat.",
      benefits: ["pSEO at scale", "Content that converts", "Competitive intelligence"],
      color: "pink"
    },
    {
      icon: Briefcase,
      title: "Agencies & Consultants",
      description: "Offer SEO as a service without the headache. White-label our entire platform and deliver results you can be proud of.",
      benefits: ["White-label solution", "Scale client delivery", "Increase margins"],
      color: "orange"
    },
    {
      icon: Users,
      title: "Enterprise Marketing Teams",
      description: "Move faster than your bureaucracy allows. Get AI-powered execution while your team focuses on strategy.",
      benefits: ["Augment your team", "Rapid execution", "Measurable ROI"],
      color: "cyan"
    }
  ];

  return (
    <section id="who" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400 mb-6">
            <span>👥 82% of founders say SEO is important — only 12% actually do it</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            You Know SEO Matters.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              You Just Don&apos;t Have 20 Hours/Week.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">The average SEO campaign needs 15-20 hours weekly.</span> You have a business to run. We built Anthroly for ambitious teams who want enterprise results without enterprise resources.
          </p>
        </div>

        {/* Audience Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div 
                key={index}
                className="group p-6 md:p-8 bg-gray-900/80 border border-gray-800 rounded-3xl hover:border-emerald-500/30 transition-all duration-300"
              >
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
              The Perfect Place to Grow Your Business
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              You&apos;ve found it. A growth partner that works 24/7, costs less than a junior hire, and delivers measurable results every single week. The only question is: how much longer will you wait?
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
