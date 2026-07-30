"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Clock, Shield, CheckCircle2 } from 'lucide-react';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from '../ui/button';
import { GlowPulse } from '../ui/animated-elements';

export const FinalCTA = () => {
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

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <GlowPulse className="top-0 left-1/4" color="emerald" size={600} />
        <GlowPulse className="bottom-0 right-1/4" color="cyan" size={500} />
        <GlowPulse className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="blue" size={800} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            6 Months From Now, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              You&apos;ll Wish You Started Today.
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            <span className="text-white font-semibold">SEO compounds at 10-20% monthly.</span> Starting now vs. 6 months later means 2-3x more traffic by year end. While you&apos;re reading this, your competitors are ranking. The math is simple. The decision is yours.
          </p>

          {/* What You Get Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              "Dedicated human account manager",
              "Google + AI SEO combined",
              "30+ pages of content/month",
              "15–25 backlinks/month"
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                <CheckCircle2 className="text-emerald-400" size={18} />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button size="xl" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 h-16 md:h-20 px-12 md:px-16 text-xl md:text-2xl rounded-full font-bold shadow-[0_0_60px_-12px_rgba(16,185,129,0.5)] hover:shadow-[0_0_80px_-15px_rgba(16,185,129,0.7)] transition-all transform hover:-translate-y-1 hover:scale-105">
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-3" size={24} />
              </Button>
            </a>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-400" />
                <span>Results backed (1 free month if we miss)</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-emerald-400" />
                <span>Start in 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Final Trust Message */}
          <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl">
            <p className="text-gray-300 leading-relaxed">
              <span className="text-white font-bold">Real humans. Real strategy. Real results.</span> Our team runs the work—content, links, and technical fixes—with clear reporting every step of the way. <span className="text-emerald-400 font-semibold">$2,000/month · $1,000 to start. Cancel anytime.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
