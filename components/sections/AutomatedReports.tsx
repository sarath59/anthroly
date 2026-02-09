"use client"

import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, FileText, TrendingUp, Calendar, Mail, Eye, CheckCircle2, ArrowUp, ArrowDown } from 'lucide-react';

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

  return (
    <section id="reports" ref={sectionRef} className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#f0fdf4_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-6">
            <BarChart3 size={16} />
            <span>Feature #6</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            Weekly Automated Reports
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            No more guessing if SEO is working. Every week, you get a <span className="text-black font-semibold">clear, actionable report</span> showing exactly what changed, what we did, and what comes next.
          </p>
        </div>

        {/* Report Preview */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Report Header */}
            <div className="bg-black text-white p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Weekly Performance Report</div>
                  <div className="text-2xl font-bold">Feb 3 - Feb 9, 2025</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold">
                    +18% Growth
                  </div>
                  <div className="px-4 py-2 bg-white/10 rounded-full text-sm">
                    Delivered every Monday
                  </div>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="p-6 md:p-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm mb-1">
                    <ArrowUp size={14} />
                    <span>+24%</span>
                  </div>
                  <div className="text-2xl font-bold text-black">12,847</div>
                  <div className="text-sm text-gray-500">Organic Visitors</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm mb-1">
                    <ArrowUp size={14} />
                    <span>+8</span>
                  </div>
                  <div className="text-2xl font-bold text-black">23</div>
                  <div className="text-sm text-gray-500">New Backlinks</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm mb-1">
                    <ArrowUp size={14} />
                    <span>+12</span>
                  </div>
                  <div className="text-2xl font-bold text-black">47</div>
                  <div className="text-sm text-gray-500">Keywords Page 1</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm mb-1">
                    <ArrowUp size={14} />
                    <span>+3</span>
                  </div>
                  <div className="text-2xl font-bold text-black">58</div>
                  <div className="text-sm text-gray-500">Domain Authority</div>
                </div>
              </div>

              {/* What We Did */}
              <div className="mb-8">
                <h4 className="font-bold text-black mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  Completed This Week
                </h4>
                <div className="space-y-2">
                  {[
                    "Published 7 new blog posts targeting long-tail keywords",
                    "Acquired 23 backlinks (avg DR 78)",
                    "Optimized 12 existing pages for AI visibility",
                    "Submitted to 15 high-authority directories",
                    "Created 3 new pSEO template pages"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg text-sm text-gray-700">
                      <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={16} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming */}
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="font-bold text-black mb-3 flex items-center gap-2">
                  <Calendar className="text-blue-500" size={20} />
                  Next Week's Focus
                </h4>
                <p className="text-gray-600 text-sm">
                  Targeting 5 new high-volume keywords, launching competitor comparison pages, and initiating outreach to 50+ potential backlink sources in the tech industry.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className={`mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center p-6">
            <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="text-cyan-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Delivered to Your Inbox</h3>
            <p className="text-gray-600 text-sm">
              Every Monday morning, wake up to a comprehensive report. No logging into dashboards.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="text-cyan-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Crystal Clear Insights</h3>
            <p className="text-gray-600 text-sm">
              No jargon, no confusion. Plain English explaining what matters and why.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-cyan-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Track Progress Over Time</h3>
            <p className="text-gray-600 text-sm">
              See your growth trajectory. Watch rankings climb and traffic compound month after month.
            </p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className={`mt-12 max-w-2xl mx-auto text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-black">Transparency is everything.</span> You'll always know exactly what we're doing, why we're doing it, and the results we're getting. No black boxes.
          </p>
        </div>
      </div>
    </section>
  );
};
