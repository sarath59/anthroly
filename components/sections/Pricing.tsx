"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { Button } from '../ui/button';

export const Pricing = () => {
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
    <section id="pricing" ref={sectionRef} className="py-20 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">One Simple Price.</h2>
          <p className="text-xl text-gray-400">
            No confusing tiers. No hidden fees. Just massive growth.
          </p>
        </div>

        <div className={`max-w-lg mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-900 rounded-3xl p-6 md:p-12 border border-gray-800">
              
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white text-black text-sm font-bold px-4 py-2 rounded-full transform rotate-12 shadow-lg flex items-center gap-1">
                <Star size={14} fill="black" />
                BEST VALUE
              </div>

              <div className="text-center mb-10">
                <h3 className="text-2xl font-medium text-gray-300 mb-2">The Growth Engine</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-7xl font-bold text-white">$99</span>
                  <span className="text-gray-400 text-xl">/month</span>
                </div>
                <p className="text-gray-400 mt-4">Pause or cancel anytime.</p>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  '24/7 AI Agents for Backlinks',
                  'Keyword Research & Strategy',
                  'SEO Optimization',
                  'Automated Outreach',
                  'Competitor Analysis',
                  'Monthly Performance Report',
                  'Priority Email Support'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-green-500" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="https://buy.stripe.com/4gM6oHaCL1gLd23b2nb3q0a" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full h-14 text-lg bg-white text-black hover:bg-gray-200 rounded-xl font-bold shadow-lg shadow-white/10 transition-all hover:scale-[1.02]">
                  Get Started Now
                  <Zap className="ml-2 fill-black" size={20} />
                </Button>
              </a>
              
              <p className="text-center text-xs text-gray-500 mt-6">
                Limited spots available at this pricing tier.
              </p>

              {/* Guarantee Mini-Badge */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-xs text-center text-gray-400 leading-relaxed">
                  <span className="text-cyan-400 font-bold block mb-1">GUARANTEE</span>
                  Free month if we miss our backlink targets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
