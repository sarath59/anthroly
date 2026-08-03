"use client"

import React, { useEffect, useRef, useState } from 'react';
import { FileText, TrendingUp, BarChart3, Calendar, CheckCircle2, Mail, Target } from 'lucide-react';
import { LogoStrip, ANALYTICS_TOOLS, SEO_TOOLS } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/animated-elements';

export const AutomatedReports = () => {
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

  const reportSections = [
    { icon: TrendingUp, title: "Every Action Taken", description: "What each agent did this week, and what it chose not to do" },
    { icon: BarChart3, title: "Pipeline Movement", description: "Leads researched, sequences sent, replies handled, meetings booked" },
    { icon: Target, title: "Search & Authority", description: "Rankings, AI citations, and new links—with the delta from last week" },
    { icon: FileText, title: "Support Load", description: "Tickets closed end to end, plus what customers kept asking about" }
  ];

  return (
    <section id="reports" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <GlowPulse className="top-0 left-1/2 -translate-x-1/2" color="emerald" size={600} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <FileText size={16} />
            <span>📊 An agent you can&apos;t audit is an agent you can&apos;t trust</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            It Reports Back. A Human Reads It First.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Analyze, execute, report — every single cycle.</span> Your agents write down what they did and why, and a real account manager reviews it before it reaches you.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Report Preview */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white text-black rounded-3xl p-6 md:p-8 shadow-2xl">
              {/* Report Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                <div>
                  <h3 className="font-bold text-lg">Weekly Performance Report</h3>
                  <p className="text-sm text-gray-500">Week of Feb 3 - Feb 9, 2026</p>
                </div>
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-white" size={24} />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600">+23%</div>
                  <div className="text-sm text-gray-600">Organic Traffic</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">+12</div>
                  <div className="text-sm text-gray-600">Keyword Rankings Up</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">41</div>
                  <div className="text-sm text-gray-600">Tickets Closed by Agent</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">19</div>
                  <div className="text-sm text-gray-600">Meetings Booked</div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-gray-50 rounded-xl mb-4">
                <h4 className="font-semibold mb-2">Executive Summary</h4>
                <p className="text-sm text-gray-600">
                  Organic traffic up 23%. Support agent resolved 41 of 58 tickets without escalation. Sales agent found 3 repeat objections on pricing — a comparison page is drafted and waiting for your approval.
                </p>
              </div>

              {/* Next Steps */}
              <div className="p-4 bg-emerald-500 text-white rounded-xl">
                <h4 className="font-semibold mb-2">What the Agents Do Next</h4>
                <ul className="text-sm space-y-1">
                  <li>• Publishing 8 articles against competitor keywords</li>
                  <li>• Opening 50 new outreach threads for review</li>
                  <li>• Rewriting 12 help answers that kept getting escalated</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Everything They Did, Every Week
            </h3>

            <div className="space-y-6 mb-8">
              {reportSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Icon size={22} className="text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{section.title}</h4>
                      <p className="text-gray-400">{section.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Human Touch Info */}
            <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-emerald-400" size={20} />
                <h4 className="font-bold">A Human Owns Your Account</h4>
              </div>
              <p className="text-gray-400 mb-4">
                <span className="text-white font-semibold">Agents execute; a person is accountable.</span> Your account manager reviews what the agents did, approves what needs judgment, and answers the phone when you call.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar size={16} className="text-emerald-400" />
                  <span>Reports every Monday</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span>Plain English—no jargon, no vanity charts</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span>Decisions and reasoning, not raw data dumps</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span>Compare progress to goals and benchmarks</span>
              </div>
            </div>

            {/* Data Sources */}
            <div className="mt-8">
              <LogoStrip 
                companies={[...ANALYTICS_TOOLS, ...SEO_TOOLS.slice(0, 2)]} 
                label="Data pulled from"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
