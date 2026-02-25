"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Users, Sparkles, TrendingUp, Shield, Clock } from 'lucide-react';
import { GlowPulse, GradientBeam, SpotlightCard } from '../ui/animated-elements';

export const FoundingMembers = () => {
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

  const benefits = [
    {
      icon: Sparkles,
      title: "Simple Pricing",
      description: "One price, forever. $99/month — no hidden fees, no surprises"
    },
    {
      icon: TrendingUp,
      title: "Priority Results",
      description: "First access to new features, faster turnaround, dedicated support"
    },
    {
      icon: Shield,
      title: "Shape the Product",
      description: "Direct input on features and services — we build what you need"
    },
    {
      icon: Users,
      title: "Exclusive Community",
      description: "Private Slack with other founders for networking and growth tips"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-transparent relative overflow-hidden">
      <GlowPulse className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="amber" size={600} />
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Main Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30 rounded-3xl blur-xl opacity-50"></div>
            
            <div className="relative bg-gray-900/90 border border-amber-500/30 rounded-3xl p-8 md:p-12">
              <GradientBeam color="amber" />
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full text-sm font-bold shadow-lg">
                  <Clock size={16} />
                  <span>LIMITED: 12 of 20 Spots Remaining</span>
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-10 pt-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Become a Founding Member
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  We&apos;re onboarding our first 20 clients at a special rate. In exchange for your early trust, 
                  you get exclusive benefits that will never be offered again.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div 
                      key={index}
                      className="flex gap-4 p-4 bg-black/30 rounded-xl border border-gray-800"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <Icon className="text-amber-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust Note */}
              <div className="text-center p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-gray-300 text-sm">
                  <span className="text-amber-400 font-semibold">Why founding pricing?</span> We&apos;re building case studies and testimonials. 
                  You get incredible value. We get proof that this works. <span className="text-white font-medium">Everyone wins.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
