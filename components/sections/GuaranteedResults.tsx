"use client"

import React, { useEffect, useRef, useState } from 'react';
import { 
  CheckCircle2, 
  Link2, 
  FileText, 
  Wrench, 
  Search, 
  Bug, 
  Users, 
  Clock, 
  Shield,
  Zap,
  TrendingUp,
  Bot,
  Target,
  BarChart3,
  Globe,
  MessageCircleQuestion,
  Eye,
  MousePointerClick
} from 'lucide-react';
import { GlowPulse, AnimatedCounter } from '../ui/animated-elements';

export const GuaranteedResults = () => {
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

  const hardDeliverables = [
    { icon: Link2, metric: "15–25", label: "High-DR Backlinks", detail: "Authoritative placements every month", highlight: true },
    { icon: FileText, metric: "15", label: "Human-Written SEO Blogs", detail: "Conversation-style, built to rank on Google & in AI answers", highlight: true },
    { icon: MessageCircleQuestion, metric: "15", label: "AI Q&A Pages", detail: "Human-reviewed (AI-assisted)", highlight: false },
    { icon: Wrench, metric: "20", label: "Free Tools Deployed", detail: "Built & live on your domain", highlight: false },
    { icon: TrendingUp, metric: "15", label: "Social Articles", detail: "LinkedIn, X, Medium", highlight: false },
    { icon: Globe, metric: "15–25", label: "Referring Domains", detail: "From real outreach—not link farms", highlight: false },
  ];

  const seoOutcomes = [
    { icon: Search, metric: "50+", label: "New Pages Indexed", detail: "In Google Search Console" },
    { icon: Target, metric: "100+", label: "Keywords Ranking", detail: "In Google (any position)" },
    { icon: Eye, metric: "10K+", label: "Impressions", detail: "On new content" },
    { icon: MousePointerClick, metric: "500+", label: "Organic Clicks", detail: "From new content" },
  ];

  const aiOutcomes = [
    { icon: Bot, metric: "50+", label: "AI Brand Mentions", detail: "Across 5 AI engines" },
    { icon: MessageCircleQuestion, metric: "15", label: "Q&A Pages Live", detail: "Optimized for AI results" },
    { icon: Target, metric: "500+", label: "Keywords Mapped", detail: "100K+ monthly search volume" },
    { icon: Users, metric: "10", label: "Competitors Analyzed", detail: "Backlinks, content gaps, keywords" },
  ];

  const aiVisibility = [
    { name: "ChatGPT", tracked: true },
    { name: "Claude", tracked: true },
    { name: "Perplexity", tracked: true },
    { name: "Gemini", tracked: true },
    { name: "Google AI Overview", tracked: true },
  ];

  const speedGuarantees = [
    { milestone: "Kickoff call scheduled", time: "24 hours" },
    { milestone: "First article live", time: "48 hours" },
    { milestone: "Full system operational", time: "72 hours" },
    { milestone: "First backlink acquired", time: "7 days" },
    { milestone: "First tool deployed", time: "14 days" },
  ];

  return (
    <section 
      id="features" 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <GlowPulse className="top-1/4 left-0" color="emerald" size={600} />
        <GlowPulse className="bottom-1/4 right-0" color="cyan" size={500} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Shield size={16} />
            <span>🛡️ Iron-Clad 30-Day Commitments</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Results You Get in Your First 30 Days
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Not promises. Not &quot;best efforts.&quot; These are <span className="text-white font-semibold">contractual commitments</span> backed by one free month of service if we miss ANY of them.
          </p>
        </div>

        {/* Hard Deliverables */}
        <div className={`mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-emerald-400">📦</span> Hard Deliverables <span className="text-gray-500 text-lg font-normal">(Count Them Yourself)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {hardDeliverables.filter((d) => d.highlight).map((item, index) => (
              <div
                key={`hi-${index}`}
                className="relative group p-6 bg-gradient-to-br from-emerald-500/[0.12] to-cyan-500/[0.06] border border-emerald-500/40 rounded-2xl ring-1 ring-emerald-500/25 shadow-[0_0_32px_-14px_rgba(16,185,129,0.4)] text-center hover:border-emerald-400/60 transition-all duration-300"
              >
                <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-emerald-300/90 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Flagship
                </div>
                <div className="relative z-10 pt-2">
                  <item.icon className="mx-auto text-emerald-300 mb-3" size={28} />
                  <div className="text-4xl font-bold text-white mb-1">{item.metric}</div>
                  <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                  <div className="text-xs text-emerald-100/75">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hardDeliverables.filter((d) => !d.highlight).map((item, index) => (
              <div
                key={index}
                className="relative p-5 bg-gray-900/35 border border-gray-800/80 rounded-2xl text-center opacity-[0.72] hover:opacity-90 transition-opacity duration-300"
              >
                <item.icon className="mx-auto text-gray-500 mb-2" size={24} />
                <div className="text-2xl md:text-3xl font-bold text-gray-400 mb-1">{item.metric}</div>
                <div className="text-xs font-medium text-gray-500 mb-1">{item.label}</div>
                <div className="text-[11px] text-gray-600 leading-snug">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Outcomes */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-cyan-400">📊</span> Google Traffic Results <span className="text-gray-500 text-lg font-normal">(Measurable in Search Console)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {seoOutcomes.map((item, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 text-center"
              >
                <item.icon className="mx-auto text-cyan-400 mb-3" size={28} />
                <div className="text-3xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-sm font-semibold text-gray-300 mb-1">{item.label}</div>
                <div className="text-xs text-gray-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Outcomes */}
        <div className={`mb-16 transition-all duration-1000 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-purple-400">🤖</span> AI Search Results <span className="text-gray-500 text-lg font-normal">(The Future of Search)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {aiOutcomes.map((item, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 text-center"
              >
                <item.icon className="mx-auto text-purple-400 mb-3" size={28} />
                <div className="text-3xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-sm font-semibold text-gray-300 mb-1">{item.label}</div>
                <div className="text-xs text-gray-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Visibility + Speed Guarantees Row */}
        <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* AI Visibility */}
          <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="text-purple-400" size={28} />
              <h3 className="text-xl font-bold">AI Visibility Tracking</h3>
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">The Future</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              We track your brand&apos;s visibility across the 5 major AI engines. Know exactly when AI recommends you (or your competitors).
            </p>
            <div className="space-y-3">
              {aiVisibility.map((ai, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <span className="text-gray-300">{ai.name}</span>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 size={16} />
                    <span>Tracked</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-sm text-purple-300">
                <span className="font-semibold">Included:</span> Baseline AI citation report showing where you appear (or don&apos;t) in AI answers
              </p>
            </div>
          </div>

          {/* Speed Guarantees */}
          <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-yellow-400" size={28} />
              <h3 className="text-xl font-bold">Speed Guarantees</h3>
              <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">We Move Fast</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              No &quot;we&apos;ll get back to you.&quot; No endless onboarding. These are our speed commitments:
            </p>
            <div className="space-y-3">
              {speedGuarantees.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <span className="text-gray-300">{item.milestone}</span>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <p className="text-sm text-yellow-300">
                <span className="font-semibold">Miss a deadline?</span> $100 credit per missed milestone. No questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Total Value Box */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 rounded-3xl blur opacity-30"></div>
            <div className="relative p-8 md:p-10 bg-gray-900 rounded-3xl border border-gray-800">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Total Value Delivered in 30 Days
                </h3>
                <p className="text-gray-400">What agencies charge vs. what you pay</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="text-center p-4">
                  <div className="text-sm text-gray-500 mb-1">15 SEO Blog Posts</div>
                  <div className="text-xl font-bold text-gray-400 line-through">$4,500</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-500 mb-1">15 AI Q&A Pages</div>
                  <div className="text-xl font-bold text-gray-400 line-through">$3,000</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-500 mb-1">15–25 High-DR Backlinks</div>
                  <div className="text-xl font-bold text-gray-400 line-through">$4,000</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-500 mb-1">20 Free Tools</div>
                  <div className="text-xl font-bold text-gray-400 line-through">$10,000</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-500 mb-1">15 Social Articles</div>
                  <div className="text-xl font-bold text-gray-400 line-through">$3,000</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-500 mb-1">50+ AI Mentions</div>
                  <div className="text-xl font-bold text-gray-400 line-through">$2,500</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-black/50 rounded-2xl">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Replacement Cost</div>
                  <div className="text-3xl font-bold text-red-400 line-through">$28,500+</div>
                </div>
                <div className="text-4xl text-gray-600">→</div>
                <div className="text-center">
                  <div className="text-sm text-emerald-400 mb-1">Your Cost</div>
                  <div className="text-5xl font-bold text-emerald-400">$535</div>
                </div>
                <div className="text-center px-4 py-2 bg-emerald-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-400">98%</div>
                  <div className="text-xs text-emerald-300">Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Reversal */}
        <div className={`max-w-3xl mx-auto mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-3xl">
            <Shield className="mx-auto text-emerald-400 mb-4" size={40} />
            <h3 className="text-2xl font-bold mb-4">The &quot;You Can&apos;t Lose&quot; Promise</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              If we fail to deliver <span className="text-white font-semibold">15–25 high-DR backlinks</span>, <span className="text-white font-semibold">15 blog posts</span>, <span className="text-white font-semibold">15 AI Q&amp;A pages</span>, <span className="text-white font-semibold">20 functional tools</span>, or <span className="text-white font-semibold">50+ AI brand mentions</span> in your first 30 days:
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 font-bold text-lg">
              <span>🎁 One Free Month of Service</span>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Zero risk. Zero excuses. Zero BS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
