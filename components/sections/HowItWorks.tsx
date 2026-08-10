"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Users, Zap, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { GlowPulse } from '../ui/animated-elements';

export const HowItWorks = () => {
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

  const steps = [
    {
      icon: Users,
      title: "Real Humans Onboard You",
      description: "A dedicated team member learns your business, goals, and voice. We set strategy together.",
      color: "emerald",
      humanElement: true
    },
    {
      icon: Zap,
      title: "We Execute Every Month",
      description: "Our team produces your blogs, secures backlinks, and keeps your site optimized for Google and AI-driven search.",
      color: "cyan",
      humanElement: false
    },
    {
      icon: TrendingUp,
      title: "Results You Can See",
      description: "Watch your Google rankings climb and AI platforms start recommending you. Clear reports, no mysteries.",
      color: "orange",
      humanElement: false
    }
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      <GlowPulse className="top-1/2 left-1/4" color="emerald" size={500} />
      <GlowPulse className="bottom-1/4 right-1/4" color="cyan" size={400} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Human-Led. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Full-Service.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We&apos;re not a DIY tool. Real strategists and writers run your program—clear reporting and consistent delivery every month.
          </p>
        </div>

        {/* Steps */}
        <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorClasses = {
                emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
                cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
                purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
                orange: "from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400"
              };
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              
              return (
                <div
                  key={index}
                  className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${colors} border transition-all duration-300 hover:scale-[1.02]`}
                >
                  {step.humanElement && (
                    <div className="absolute -top-2 -right-2 px-2 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full">
                      Human
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center`}>
                      <Icon size={24} className={colors.split(' ').pop()} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-500 text-sm font-mono">0{index + 1}</span>
                        <ArrowRight size={14} className="text-gray-600" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className={`mt-16 max-w-3xl mx-auto text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-6 md:p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">What makes us different?</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <Check size={16} className="text-emerald-400" />
                <span className="text-gray-300">Real humans, not just chatbots</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check size={16} className="text-emerald-400" />
                <span className="text-gray-300">Google + AI SEO combined</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check size={16} className="text-emerald-400" />
                <span className="text-gray-300">Clear monthly reporting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
