import React from 'react';
import { XCircle, CheckCircle2, TrendingUp, Zap, DollarSign, Clock } from 'lucide-react';
import { CONNECT_FEE_LABEL, PACKAGE_RETAINER, PACKAGE_SETUP } from '@/lib/site';
import { LogoStrip, AI_COMPANIES, SEO_TOOLS } from '../ui/CompanyLogos';
import { GlowPulse, SpotlightCard } from '../ui/static-fx';

export const ProblemSolution = () => {

  return (
    <section id="problem" className="py-24 md:py-32 bg-transparent overflow-hidden">
      <GlowPulse className="top-1/3 left-0" color="emerald" size={500} />
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-sm font-medium text-red-400 mb-6">
            <span>Most founders still hunt leads by hand — while rivals never stop</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Why Pipeline Dies While You Sleep
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              (Someone else already emailed them)
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            <span className="text-white font-semibold">Every hour your inbox is quiet, a competitor is sending.</span> DIY SDR work burns the founder. Cheap link farms poison the domain. We run two agents instead: 1,000 personalized emails a day, and a 24/7 hunter that earns real backlinks.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto transition-all duration-1000 delay-200 opacity-100 translate-y-0`}>
          {/* The Old Way */}
          <SpotlightCard className="rounded-3xl" spotlightColor="rgba(239,68,68,0.1)">
          <div className="bg-gray-900/80 p-6 md:p-10 rounded-3xl border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <XCircle className="text-red-500" />
                The Old Way
              </h3>
              <p className="text-gray-500 mt-2">What you&apos;ve been dealing with</p>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-200">Founder-as-SDR</p>
                  <p className="text-gray-400">You write 40 emails, then the product calls. Volume dies. Follow-ups die. The calendar stays empty — and you tell yourself you&apos;ll &quot;batch it on Sunday.&quot;</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-200">Black-box agencies</p>
                  <p className="text-gray-400">&quot;Trust us, it&apos;s working.&quot; Months pass. No send log. No reply rate. No link neighborhood. You paid for hope, not a machine you can inspect.</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-200">Junk link farms</p>
                  <p className="text-gray-400">Cheap agencies buy PBNs and directories. Your domain gets stained. Every cold email you send after that looks like a scam — because the web already said you are one.</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-200">DIY time sink</p>
                  <p className="text-gray-400">Tried doing it yourself? That&apos;s 20+ hours a week you don&apos;t have — hunting lists, writing pitches, chasing editors — while the product waits.</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-200">Spray-and-pray tools</p>
                  <p className="text-gray-400">A dashboard, a CSV, and a prayer. No ICP tightness. No personalization. No quality filter on links. Inboxes burn. Domains die. You still have no pipeline.</p>
                </div>
              </li>
            </ul>
          </div>
          </SpotlightCard>

          {/* The Anthroly Way */}
          <SpotlightCard className="rounded-3xl" spotlightColor="rgba(16,185,129,0.15)">
          <div className="bg-gray-900 text-white p-6 md:p-10 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"></div>
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" />
                The Anthroly Way
              </h3>
              <p className="text-gray-400 mt-2">Two agents. We operate them.</p>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg">We set them up. We run them.</p>
                  <p className="text-gray-400">You approve ICP and voice. A human operator onboards you, watches deliverability, and QA&apos;s every link. Never left alone with a dashboard.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg">Outreach + backlinks, compounding</p>
                  <p className="text-gray-400">1,000 personalized emails a day so the calendar fills. A 24/7 backlink agent so those emails don&apos;t look like strangers. One loop — not two disconnected retainers.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg">Quality filters, not spam</p>
                  <p className="text-gray-400">Personalization that names a real reason to write. Editorial links — no PBNs, no junk. Humans own the kill-switch. Agents do the hunting.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg">{CONNECT_FEE_LABEL} start fee. {PACKAGE_SETUP} go-live when you are happy. {PACKAGE_RETAINER}/mo after.</p>
                  <p className="text-gray-400">{CONNECT_FEE_LABEL} claims a slot and we begin building both agents. Once you sign off, a {PACKAGE_SETUP} go-live fee. Then {PACKAGE_RETAINER}/month to run them with daily updates. Not happy at any point? We refund the {PACKAGE_SETUP} go-live fee.</p>
                </div>
              </li>
            </ul>
          </div>
          </SpotlightCard>
        </div>

        {/* Bottom Stats */}
        <div className={`mt-20 max-w-5xl mx-auto transition-all duration-1000 delay-400 opacity-100 translate-y-0`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-900/80 rounded-2xl border border-gray-800">
              <TrendingUp className="text-emerald-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-white mb-1">1,000/day</div>
              <div className="text-sm text-gray-500">Outreach agent</div>
            </div>
            <div className="text-center p-6 bg-gray-900/80 rounded-2xl border border-gray-800">
              <Clock className="text-blue-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-500">Backlink agent</div>
            </div>
            <div className="text-center p-6 bg-gray-900/80 rounded-2xl border border-gray-800">
              <Zap className="text-purple-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-white mb-1">Compound</div>
              <div className="text-sm text-gray-500">Links make emails convert</div>
            </div>
            <div className="text-center p-6 bg-gray-900/80 rounded-2xl border border-gray-800">
              <DollarSign className="text-orange-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-white mb-1">{PACKAGE_SETUP}</div>
              <div className="text-sm text-gray-500">when you are happy</div>
            </div>
          </div>
        </div>

        {/* Powered By */}
        <div className={`mt-12 flex flex-col md:flex-row justify-center gap-8 md:gap-16 transition-all duration-1000 delay-500 opacity-100 translate-y-0`}>
          <LogoStrip 
            companies={AI_COMPANIES.slice(0, 3)} 
            label="Stack we work with"
            size="sm"
          />
          <LogoStrip 
            companies={SEO_TOOLS.slice(0, 3)} 
            label="Data from industry leaders"
            size="sm"
          />
        </div>
      </div>
    </section>
  );
};
