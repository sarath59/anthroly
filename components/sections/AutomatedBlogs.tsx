import React from 'react';
import { PenTool, Sparkles, CheckCircle2 } from 'lucide-react';
import { LogoStrip, CMS_PLATFORMS } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/static-fx';

export const AutomatedBlogs = () => {

  const blogFeatures = [
    {
      number: "01",
      title: "Brief & keyword plan",
      description: "We research SERPs and intent, then agree on topics and outlines that match your positioning."
    },
    {
      number: "02",
      title: "Human-written drafts",
      description: "Writers produce conversation-style, SEO-solid articles—structured for Google and AI-overviews."
    },
    {
      number: "03",
      title: "Editorial QA",
      description: "Editors check facts, tone, and on-page SEO before anything ships."
    },
    {
      number: "04",
      title: "Publish & reporting",
      description: "We publish on your schedule and report what went live, indexed, and how it performs."
    }
  ];

  return (
    <section id="blogs" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background */}
      <GlowPulse className="bottom-1/4 right-0" color="purple" size={500} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(139,92,246,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">
            <PenTool size={16} />
            <span>📝 Companies publishing 16+ blogs/month get 3.5x more traffic</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Blogs Humans Write. Quality You Can Stand Behind.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">30+ pages of content every month</span> — drafted and edited by our team so it reads like a person, ranks like SEO, and holds up in AI answers.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left: Process Flow */}
          <div className={`transition-all duration-1000 delay-200 opacity-100 translate-x-0`}>
            <div className="space-y-6">
              {blogFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-5 p-5 bg-gray-900/80 rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                    {feature.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">{feature.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats & Benefits */}
          <div className={`transition-all duration-1000 delay-400 opacity-100 translate-x-0`}>
            {/* Big Number */}
            <div className="bg-black text-white p-8 md:p-10 rounded-3xl mb-8">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl md:text-6xl font-bold">1</span>
                <span className="text-2xl text-gray-400">interview / month</span>
              </div>
              <p className="text-gray-400 text-lg mb-6">One 30–45 minute founder interview. Humans turn it into LinkedIn, X, articles, newsletter, and FAQ content for Google and AI search — you do not sit around writing posts.</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">$216</div>
                  <div className="text-sm text-gray-500">Diagnostic</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-purple-400">$1,500</div>
                  <div className="text-sm text-gray-500">30-day sprint</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">$1,000</div>
                  <div className="text-sm text-gray-500">Then / month</div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Keyword-targeted:</span>
                  <span className="text-gray-400"> Each article targets specific keywords with proven search volume</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Brand voice aligned:</span>
                  <span className="text-gray-400"> We learn your tone and style to maintain consistency</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Internally linked:</span>
                  <span className="text-gray-400"> Strategic internal links boost your entire site&apos;s SEO</span>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-8 p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="text-yellow-400 flex-shrink-0" size={20} />
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-yellow-400">Why this matters:</span> Businesses that publish consistently get dramatically more leads. But who has time to create 45 high-quality pages a month (blogs + AI Q&A)? Now you do.
                </p>
              </div>
            </div>

            {/* CMS Integrations */}
            <div className="mt-8">
              <LogoStrip 
                companies={CMS_PLATFORMS} 
                label="Publishes to"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
