"use client"

import React, { useEffect, useRef, useState } from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Search, 
  Users, 
  Clock, 
  Shield,
  Zap,
  TrendingUp,
  Bot,
  Target,
  MessageCircleQuestion,
  Megaphone,
} from 'lucide-react';
import { GlowPulse } from '../ui/animated-elements';
import { CORE_OUTCOME, PACKAGE_RETAINER, PACKAGE_SETUP, SPRINT_NAME, SYSTEM_NAME } from '@/lib/site';

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

  const sprintDeliverables = [
    { icon: Search, metric: "W1", label: "Positioning", detail: "ICP, buyer questions, competitors, AI baseline", highlight: true },
    { icon: Megaphone, metric: "W2", label: "Authority", detail: "1 interview → 8–12 LinkedIn posts + 2 articles", highlight: true },
    { icon: FileText, metric: "W3", label: "AI Search", detail: "Restructure, comparison pages, citations, tracking", highlight: false },
    { icon: Target, metric: "W4", label: "Pipeline", detail: "ICP list, enrichment, outreach, follow-up, CRM", highlight: false },
  ];

  const discoverOutcomes = [
    { icon: Bot, metric: "Baseline", label: "AI visibility map", detail: "Where you appear — and where you don't" },
    { icon: Search, metric: "3–5", label: "Competitors compared", detail: "Share of answer in your category" },
    { icon: MessageCircleQuestion, metric: "5–10", label: "FAQ / AI-search gaps", detail: "Questions prospects already ask" },
    { icon: FileText, metric: "Pages", label: "Comparison & alternative", detail: "Content engines can cite" },
  ];

  const trustOutcomes = [
    { icon: Users, metric: "30–45m", label: "Founder interview", detail: "Once a month. We do the rest." },
    { icon: Megaphone, metric: "8–12", label: "LinkedIn posts", detail: "From your expertise, not a content calendar you write" },
    { icon: FileText, metric: "2", label: "Authority articles", detail: "Long-form that AI and buyers can cite" },
    { icon: TrendingUp, metric: "X + email", label: "Distribution", detail: "Newsletter and short posts included" },
  ];

  const aiVisibility = [
    { name: "ChatGPT", tracked: true },
    { name: "Claude", tracked: true },
    { name: "Perplexity", tracked: true },
    { name: "Gemini", tracked: true },
    { name: "Google AI Overview", tracked: true },
  ];

  const sprintWeeks = [
    { milestone: "Week 1 — Positioning locked", time: "Days 1–7" },
    { milestone: "Week 2 — First authority batch live", time: "Days 8–14" },
    { milestone: "Week 3 — AI-search pages in motion", time: "Days 15–21" },
    { milestone: "Week 4 — Outreach system live", time: "Days 22–30" },
  ];

  return (
    <section 
      id="features" 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <GlowPulse className="top-1/4 left-0" color="emerald" size={600} />
        <GlowPulse className="bottom-1/4 right-0" color="cyan" size={500} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Shield size={16} />
            <span>{SPRINT_NAME} — tangible week by week</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What {PACKAGE_SETUP} actually buys
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {CORE_OUTCOME} The {SYSTEM_NAME} is one acquisition system. <span className="text-white font-semibold">Humans ship the work.</span> Machines help us move faster.
          </p>
        </div>

        <div className={`mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-emerald-400">📦</span> 30-day deliverable stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {sprintDeliverables.filter((d) => d.highlight).map((item, index) => (
              <div
                key={`hi-${index}`}
                className="relative group p-6 bg-gradient-to-br from-emerald-500/[0.12] to-cyan-500/[0.06] border border-emerald-500/40 rounded-2xl ring-1 ring-emerald-500/25 shadow-[0_0_32px_-14px_rgba(16,185,129,0.4)] text-center hover:border-emerald-400/60 transition-all duration-300"
              >
                <div className="relative z-10 pt-2">
                  <item.icon className="mx-auto text-emerald-300 mb-3" size={28} />
                  <div className="text-4xl font-bold text-white mb-1">{item.metric}</div>
                  <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                  <div className="text-xs text-emerald-100/75">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {sprintDeliverables.filter((d) => !d.highlight).map((item, index) => (
              <div
                key={index}
                className="relative p-5 bg-gray-900/50 border border-gray-800 rounded-2xl text-center hover:border-emerald-500/30 transition-colors duration-300"
              >
                <item.icon className="mx-auto text-emerald-400 mb-2" size={24} />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-xs font-medium text-gray-300 mb-1">{item.label}</div>
                <div className="text-[11px] text-gray-500 leading-snug">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-cyan-400">🧭</span> Discover <span className="text-gray-500 text-lg font-normal">(AI Search Visibility)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {discoverOutcomes.map((item, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 text-center"
              >
                <item.icon className="mx-auto text-cyan-400 mb-3" size={28} />
                <div className="text-2xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-sm font-semibold text-gray-300 mb-1">{item.label}</div>
                <div className="text-xs text-gray-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mb-16 transition-all duration-1000 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-purple-400">🎤</span> Trust <span className="text-gray-500 text-lg font-normal">(Founder Authority Engine)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {trustOutcomes.map((item, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 text-center"
              >
                <item.icon className="mx-auto text-purple-400 mb-3" size={28} />
                <div className="text-2xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-sm font-semibold text-gray-300 mb-1">{item.label}</div>
                <div className="text-xs text-gray-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="text-purple-400" size={28} />
              <h3 className="text-xl font-bold">AI Visibility Tracking</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              We track whether ChatGPT, Perplexity, Gemini, Claude, and Google AI name you — or a competitor — for the questions your buyers actually ask.
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
          </div>

          <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-yellow-400" size={28} />
              <h3 className="text-xl font-bold">Contact — week 4</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Authority without outreach is unfinished. Week 4 connects the work to conversations.
            </p>
            <div className="space-y-3">
              {sprintWeeks.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <span className="text-gray-300 text-sm">{item.milestone}</span>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm whitespace-nowrap">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 rounded-3xl blur opacity-30"></div>
            <div className="relative p-8 md:p-10 bg-gray-900 rounded-3xl border border-gray-800">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Then {PACKAGE_RETAINER}/month keeps the system running
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  AI visibility monitoring, content production, founder ghostwriting, AI-search content, outreach optimization, reporting, and monthly strategy.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`max-w-3xl mx-auto mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-3xl">
            <Shield className="mx-auto text-emerald-400 mb-4" size={40} />
            <h3 className="text-2xl font-bold mb-4">If we miss a first-month commitment</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              If we miss a core first-month commitment — GEO visibility work started, founder content in distribution, outreach system live — you get:
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 font-bold text-lg">
              <span>One free month of retainer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
