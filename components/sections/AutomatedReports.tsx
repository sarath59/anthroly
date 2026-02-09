"use client"

import React, { useEffect, useRef, useState } from 'react';
import { FileText, TrendingUp, BarChart3, Calendar, CheckCircle2, Mail, Clock, Target } from 'lucide-react';

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
    { icon: TrendingUp, title: "Traffic Growth", description: "Week-over-week and month-over-month comparisons" },
    { icon: BarChart3, title: "Keyword Rankings", description: "Position changes for all tracked keywords" },
    { icon: Target, title: "Backlink Progress", description: "New links acquired and their impact" },
    { icon: FileText, title: "Content Performance", description: "Which blogs are driving the most traffic" }
  ];

  return (
    <section id="reports" ref={sectionRef} className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[150px] -translate-x-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <FileText size={16} />
            <span>Service 06</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Weekly Automated Reports
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            No more guessing if things are working. Every week, you get a comprehensive report showing exactly what we did, what&apos;s improving, and what&apos;s coming next.
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
                  <div className="text-2xl font-bold text-purple-600">7</div>
                  <div className="text-sm text-gray-600">New Backlinks</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-gray-600">Blogs Published</div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-gray-50 rounded-xl mb-4">
                <h4 className="font-semibold mb-2">Executive Summary</h4>
                <p className="text-sm text-gray-600">
                  Strong week with organic traffic up 23% from last week. 3 articles reached page 1 for target keywords. 2 high-DR backlinks secured from industry publications.
                </p>
              </div>

              {/* Next Steps */}
              <div className="p-4 bg-emerald-500 text-white rounded-xl">
                <h4 className="font-semibold mb-2">Next Week&apos;s Focus</h4>
                <ul className="text-sm space-y-1">
                  <li>• Publishing 8 new blog posts targeting competitor keywords</li>
                  <li>• Outreach to 50 new backlink prospects</li>
                  <li>• Launching 100 new pSEO pages</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Everything You Need to Know, Every Week
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

            {/* Delivery Info */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-emerald-400" size={20} />
                <h4 className="font-bold">Delivered Every Monday Morning</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Start your week knowing exactly where you stand. Reports arrive in your inbox at 8 AM with a full breakdown of the previous week&apos;s performance.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={16} className="text-emerald-400" />
                  <span>Every Monday, 8 AM</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar size={16} className="text-emerald-400" />
                  <span>Monthly summaries too</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span>No jargon — plain English anyone can understand</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span>Actionable insights, not just data dumps</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span>Compare progress to goals and benchmarks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
