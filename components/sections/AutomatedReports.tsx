import React from 'react';
import { FileText, TrendingUp, BarChart3, Calendar, CheckCircle2, Mail, Target } from 'lucide-react';
import { LogoStrip, ANALYTICS_TOOLS, SEO_TOOLS } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/static-fx';

export const AutomatedReports = () => {

  const reportSections = [
    { icon: Mail, title: "Sends & replies", description: "1,000/day volume, reply rate, bounce risk" },
    { icon: BarChart3, title: "Deliverability", description: "Domain health, warmup, kill-switch events" },
    { icon: Target, title: "Backlinks earned", description: "Editorial placements as they land — quality, not junk" },
    { icon: FileText, title: "Daily update", description: "What both agents did yesterday, in your inbox" }
  ];

  return (
    <section id="reports" className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <GlowPulse className="top-0 left-1/2 -translate-x-1/2" color="emerald" size={600} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <FileText size={16} />
            <span>Daily updates — the $500/month you can actually see</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Daily Updates. Both Agents. No Black Box.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">$500/month is not a retainer you hope is working.</span> We run both agents and send you a daily update: sends, replies, links earned. Operators watch. You stay in the product.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Report Preview */}
          <div className={`transition-all duration-1000 delay-200 opacity-100 translate-x-0`}>
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
          <div className={`transition-all duration-1000 delay-400 opacity-100 translate-x-0`}>
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

            {/* Human Touch Info */}
            <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-emerald-400" size={20} />
                <h4 className="font-bold">Dedicated Human Team + Reports</h4>
              </div>
              <p className="text-gray-400 mb-4">
                <span className="text-white font-semibold">A real human account manager owns your program.</span> Detailed reports delivered so you always know what&apos;s working and what&apos;s next.
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
