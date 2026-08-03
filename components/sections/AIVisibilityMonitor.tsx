"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Activity, Bell, TrendingUp, Shield, Eye, Clock, BarChart3, AlertCircle } from 'lucide-react';
import { LogoStrip, AI_COMPANIES } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/animated-elements';

export const AIVisibilityMonitor = () => {
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
    <section id="ai-monitor" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <GlowPulse className="top-0 right-0" color="blue" size={600} />
        <GlowPulse className="bottom-0 left-0" color="purple" size={400} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
            <Activity size={16} />
            <span>⚡ Rankings fluctuate 23% weekly — most businesses never notice</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            When AI Stops Recommending You, It Responds
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">AI algorithms update 500+ times a year.</span> A monitoring tool would email you about it. Your agent detects the change, diagnoses the cause, and has the fix moving before you finish your coffee.
          </p>
        </div>

        {/* Monitor Dashboard Mock */}
        <div className={`max-w-5xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Eye className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Visibility Dashboard</h3>
                  <p className="text-sm text-gray-500">Real-time monitoring</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400">Live • Updated 2 mins ago</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-6">
              <div className="p-4 bg-black/50 rounded-2xl border border-gray-800">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">89</div>
                <div className="text-sm text-gray-500">AI Visibility Score</div>
                <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
                  <TrendingUp size={12} />
                  <span>+12 this week</span>
                </div>
              </div>
              <div className="p-4 bg-black/50 rounded-2xl border border-gray-800">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-500">AI Brand Mentions</div>
                <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
                  <TrendingUp size={12} />
                  <span>Guaranteed/month</span>
                </div>
              </div>
              <div className="p-4 bg-black/50 rounded-2xl border border-gray-800">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">156</div>
                <div className="text-sm text-gray-500">Keywords Tracked</div>
                <div className="flex items-center gap-1 mt-2 text-blue-400 text-xs">
                  <BarChart3 size={12} />
                  <span>Monitoring 24/7</span>
                </div>
              </div>
              <div className="p-4 bg-black/50 rounded-2xl border border-gray-800">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">3</div>
                <div className="text-sm text-gray-500">Alerts Today</div>
                <div className="flex items-center gap-1 mt-2 text-orange-400 text-xs">
                  <Bell size={12} />
                  <span>Action needed</span>
                </div>
              </div>
            </div>

            {/* Alert Feed */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div className="text-sm text-gray-500 mb-4">Recent Activity</div>
              <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <CheckIcon className="text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white">New AI citation detected on Perplexity for &quot;best project management tools&quot;</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <TrendingUp size={18} className="text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white">Ranking improved: Page 3 → Page 1 for &quot;SaaS analytics&quot;</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <AlertCircle size={18} className="text-orange-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white">Competitor published on a keyword you own — counter-piece drafted, awaiting your approval</p>
                  <p className="text-xs text-gray-500 mt-1">8 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="text-blue-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Never Off Duty</h3>
            <p className="text-gray-400 leading-relaxed">
              While you sleep it re-runs every prompt, every ranking, and every citation across all major platforms. No weekends, no backlog.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Diagnosis, Not Noise</h3>
            <p className="text-gray-400 leading-relaxed">
              You don&apos;t get forty alerts to sort through. You get the one that matters, with the cause already traced and named.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-emerald-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">It Acts, Then Reports</h3>
            <p className="text-gray-400 leading-relaxed">
              Routine repairs ship on their own. Anything consequential waits for your yes, with the full reasoning attached.
            </p>
          </div>
        </div>

        {/* Monitoring These Platforms */}
        <div className={`mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <LogoStrip 
            companies={AI_COMPANIES} 
            label="24/7 monitoring across"
            size="sm"
          />
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            <span className="text-white font-semibold">The businesses that win</span> aren&apos;t the ones with the best product — they&apos;re the ones who notice first and move fastest. An agent shrinks that gap from weeks to minutes.
          </p>
        </div>
      </div>
    </section>
  );
};

const CheckIcon = ({ className }: { className?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);
