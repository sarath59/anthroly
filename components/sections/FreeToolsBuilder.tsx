import React from 'react';
import Link from 'next/link';
import { type LucideIcon, Wrench, Calculator, FileText, Search, Zap, TrendingUp, CheckCircle2, ArrowRight, Gift } from 'lucide-react';
import { LogoStrip, SEO_TOOLS } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/static-fx';
import { FREE_TOOLS } from '@/lib/data/free-tools';

const ICON_MAP: Record<string, LucideIcon> = {
  Tag: FileText,
  Search,
  FileText,
  Type: FileText,
  BarChart3: TrendingUp,
  Clock: Zap,
  Hash: Calculator,
  Heading: FileText,
  Link: Zap,
  Link2: Zap,
  Bot: Zap,
  Code: Zap,
  Share2: Zap,
  HelpCircle: Zap,
  Braces: Zap,
  PenLine: FileText,
  MousePointerClick: Zap,
  Lightbulb: Zap,
  ClipboardList: FileText,
  TrendingUp,
  Redirect: Zap,
};

export const FreeToolsBuilder = () => {

  return (
    <section id="tools" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background */}
      <GlowPulse className="top-1/3 right-0" color="cyan" size={500} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(20,184,166,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 text-teal-300 rounded-full text-sm font-semibold mb-6 border border-teal-500/30">
            <Wrench size={16} />
            <span>Free tools the agents use — and you can steal</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            20+ Free Tools. Use Them Now.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8">
            <span className="text-white font-semibold">The same utilities our agents lean on.</span> No signup. Use them now — or we run the machines for you.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500 text-black font-semibold hover:bg-teal-400 transition-colors"
          >
            Browse {FREE_TOOLS.length} free tools
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Free tools grid - beautiful list */}
        <div className={`max-w-6xl mx-auto mb-20 transition-all duration-1000 delay-150 opacity-100 translate-y-0`}>
          <h3 className="text-xl font-semibold text-gray-300 mb-6 text-center">
            Free tools you can use right now
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {FREE_TOOLS.map((tool) => {
              const Icon = ICON_MAP[tool.icon] || Wrench;
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group flex flex-col p-4 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-teal-500/40 hover:bg-gray-900 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mb-2 group-hover:bg-teal-500/30 transition-colors">
                    <Icon size={20} className="text-teal-400 group-hover:text-teal-300" />
                  </div>
                  <span className="font-medium text-white text-sm group-hover:text-teal-300 truncate" title={tool.name}>
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <Link href="/tools" className="text-teal-400 hover:text-teal-300 text-sm font-medium">
              View all tools →
            </Link>
          </div>
        </div>

        {/* Main Content - What we build for subscribers */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Types of tools we build */}
          <div className={`transition-all duration-1000 delay-200 opacity-100 translate-x-0`}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Types of Tools We Build for You
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Calculator, name: "ROI Calculator", category: "SaaS", traffic: "12K/mo" },
                { icon: FileText, name: "Invoice Generator", category: "Finance", traffic: "8K/mo" },
                { icon: Search, name: "Keyword Analyzer", category: "Marketing", traffic: "15K/mo" },
                { icon: Zap, name: "Speed Tester", category: "Tech", traffic: "22K/mo" },
              ].map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div key={index} className="p-5 bg-gray-900/80 border border-gray-800 rounded-2xl hover:border-teal-500/30 transition-all group">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-teal-500 transition-colors">
                      <Icon className="text-teal-400 group-hover:text-white transition-colors" size={24} />
                    </div>
                    <h4 className="font-bold text-white mb-1">{tool.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{tool.category}</p>
                    <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                      <TrendingUp size={12} />
                      <span>{tool.traffic}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800">
              <h4 className="font-bold text-white mb-4">More Tools We Can Build:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                {['Pricing Calculators', 'Comparison Tools', 'Quiz Generators', 'Template Libraries', 'Checklist Builders', 'Data Converters'].map((label) => (
                  <div key={label} className="flex items-center gap-2">
                    <ArrowRight size={14} className="text-teal-400" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Why Tools Work */}
          <div className={`transition-all duration-1000 delay-400 opacity-100 translate-x-0`}>
            {/* Big Stats */}
            <div className="bg-black text-white rounded-3xl p-6 md:p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="text-teal-400" size={24} />
                <h3 className="text-xl font-bold">Why Free Tools Are Gold</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-3xl font-bold text-white mb-1">3x</div>
                  <div className="text-sm text-gray-400">More backlinks than blogs</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-3xl font-bold text-white mb-1">5x</div>
                  <div className="text-sm text-gray-400">More shares on social</div>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-4">
                Tools solve real problems. People bookmark them, share them with colleagues, and link to them in their own content. It&apos;s passive backlink generation.
              </p>

              <div className="p-4 bg-teal-500/20 border border-teal-500/30 rounded-xl">
                <p className="text-teal-300 text-sm">
                  <span className="font-bold">Real example:</span> A simple &quot;SaaS pricing calculator&quot; we built generated 47 organic backlinks and 15K monthly visitors within 3 months.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                <CheckCircle2 className="text-teal-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Lead magnets built-in:</span>
                  <span className="text-gray-400"> Every tool captures emails before showing results</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                <CheckCircle2 className="text-teal-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">SEO-optimized:</span>
                  <span className="text-gray-400"> Each tool targets specific high-volume keywords</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                <CheckCircle2 className="text-teal-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Branded for you:</span>
                  <span className="text-gray-400"> Tools match your design and drive traffic to your site</span>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="mt-8 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-400">Monthly output:</span>
                  <span className="block text-2xl font-bold text-white">20 Custom Tools</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400">Estimated traffic:</span>
                  <span className="block text-2xl font-bold text-emerald-400">50K+ visits/year</span>
                </div>
              </div>
            </div>

            {/* Inspired by industry leaders */}
            <div className="mt-8">
              <LogoStrip 
                companies={SEO_TOOLS} 
                label="Inspired by tools from"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
