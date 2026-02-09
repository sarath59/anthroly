"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Check, Star, Zap, Shield, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { LogoStrip, TECH_COMPANIES } from '../ui/CompanyLogos';

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

  const includedFeatures = [
    "AI Crawler Analysis & Optimization",
    "AI Visibility Monitoring 24/7",
    "30 SEO-Optimized Blogs/Month",
    "20-30 High-DR Backlinks/Month",
    "Programmatic SEO Implementation",
    "10 Free Tools Built for Your Site",
    "LinkedIn, X, Medium Articles",
    "Weekly Performance Reports",
    "Competitor Analysis & Intel",
    "Technical SEO Audits & Fixes",
    "Keyword Research & Strategy",
    "Priority Email Support"
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[200px] animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>💰 This would cost $8,500/mo at a traditional agency</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            $350 to Change Everything
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">30 blogs + 25 backlinks + 10 tools = $12,000+ value.</span> Get it all for 73% less than agencies. 60 days to prove it works. No contracts. Cancel anytime.
          </p>
        </div>

        {/* Pricing Card */}
        <div className={`max-w-xl mx-auto transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-800">
              
              {/* Best Value Badge */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-sm font-bold px-4 py-2 rounded-full transform rotate-12 shadow-lg flex items-center gap-1">
                  <Star size={14} fill="black" />
                  60-DAY TRIAL
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-10">
                <h3 className="text-xl text-gray-400 mb-4">The Complete AI Growth Engine</h3>
                
                {/* Price Display */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-baseline">
                    <span className="text-7xl md:text-8xl font-bold text-white">$350</span>
                    <span className="text-gray-400 text-xl ml-2">/month</span>
                  </div>
                </div>
                
                {/* Trial Info */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm mb-4">
                  <Clock size={16} />
                  <span>For first 60 days — then results-based pricing</span>
                </div>
                
                <p className="text-gray-500">
                  Cancel anytime. No questions asked.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                {includedFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-300">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-emerald-500" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a href="https://buy.stripe.com/4gM6oHaCL1gLd23b2nb3q0a" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full h-16 text-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40">
                  Start 60-Day Trial — $350/mo
                  <ArrowRight className="ml-2" size={22} />
                </Button>
              </a>
              
              <p className="text-center text-xs text-gray-500 mt-6">
                Limited spots available. Pricing increases after trial period.
              </p>

              {/* Guarantee */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Shield className="text-emerald-400" size={24} />
                  <span className="text-lg font-bold">Risk-Free Guarantee</span>
                </div>
                <p className="text-sm text-center text-gray-400 leading-relaxed max-w-md mx-auto">
                  If we can&apos;t deliver <span className="text-emerald-400 font-semibold">20-30 high-quality backlinks</span> (DR 70-90) per month, we&apos;ll <span className="text-white font-semibold">refund your payment AND give you a free month.</span> Zero risk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Trial Pricing Info */}
        <div className={`mt-16 max-w-4xl mx-auto text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold mb-4">After 60 Days: Transparent Pricing Tiers</h3>
          <p className="text-gray-400 leading-relaxed mb-8">
            No surprises. Based on your results and growth needs, we&apos;ll recommend one of these tiers:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl text-left">
              <div className="text-emerald-400 text-sm font-semibold mb-2">GROWTH</div>
              <div className="text-3xl font-bold text-white mb-2">$199<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-sm text-gray-500 mb-4">For early-stage startups</p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• 15 blogs/month</li>
                <li>• 10-15 backlinks</li>
                <li>• Core AI features</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-900/80 border border-emerald-500/30 rounded-xl text-left relative">
              <div className="absolute -top-3 right-4 px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full">POPULAR</div>
              <div className="text-emerald-400 text-sm font-semibold mb-2">SCALE</div>
              <div className="text-3xl font-bold text-white mb-2">$349<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-sm text-gray-500 mb-4">For growing companies</p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• 30 blogs/month</li>
                <li>• 20-30 backlinks</li>
                <li>• Full AI suite + tools</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl text-left">
              <div className="text-emerald-400 text-sm font-semibold mb-2">ENTERPRISE</div>
              <div className="text-3xl font-bold text-white mb-2">$499<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-sm text-gray-500 mb-4">For serious scale</p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Unlimited content</li>
                <li>• 40+ backlinks</li>
                <li>• White-label option</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            <span className="text-emerald-400 font-medium">Founding members:</span> Lock in your $350/mo rate permanently, regardless of tier.
          </p>
        </div>

        {/* ROI Calculator Callout */}
        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Think About the Math</h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                A single SEO-generated lead can be worth $500-$5,000+ depending on your business. We&apos;re delivering 30 blogs, 20-30 backlinks, 10 tools, and multi-platform content distribution every single month. For $350.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">$2,000+</div>
                  <div className="text-sm text-gray-500">What agencies charge for this</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">100+ hrs</div>
                  <div className="text-sm text-gray-500">Time saved per month</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">95%</div>
                  <div className="text-sm text-gray-500">Cost savings with us</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Powered by trusted infrastructure */}
        <div className={`mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <LogoStrip 
            companies={TECH_COMPANIES} 
            label="Secure payments & enterprise infrastructure"
            size="sm"
          />
        </div>
      </div>
    </section>
  );
};
