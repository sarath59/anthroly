"use client"

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Bot,
  Clock,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
import { GlowPulse, SpotlightCard } from "../ui/animated-elements";

export const ProofOfWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proof"
      ref={sectionRef}
      className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <GlowPulse className="top-1/3 left-0" color="emerald" size={650} />
        <GlowPulse className="bottom-1/3 right-0" color="cyan" size={520} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero — Profound-style headline + one-line summary */}
        <div
          className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>Case Study — AI Traffic</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How llmoutrank Grew AI Referral Traffic in 2 Months
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Anthroly focused exclusively on AI discovery for llmoutrank. In two months, the site earned hundreds of signals from AI results and real users are now being driven to the site by AI answers.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SpotlightCard className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/50">
            <div className="p-8 md:p-10">
              {/* About llmoutrank — Profound-style */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-8 border-b border-gray-800">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">About llmoutrank</h3>
                  <p className="text-gray-400 text-sm max-w-xl">
                    A brand we work with to dominate AI-driven search in its space. We didn&apos;t work on overall traffic here — only AI referral traffic.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://datafa.st/share/682b1fc309a39da9358cd37a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Check live dashboard
                    </Button>
                  </a>
                  <Link href="/#pricing">
                    <Button size="sm" className="bg-emerald-500 text-black hover:bg-emerald-400">
                      Get a demo
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Key Results — 3 stat cards like Profound */}
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Key Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-black/40 border border-gray-800 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">100&apos;s</div>
                  <div className="text-sm text-gray-400">of visits from AI referrers (last 30 days)</div>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-gray-800 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">2 months</div>
                  <div className="text-sm text-gray-400">AI referral focus only</div>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-gray-800 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">100&apos;s</div>
                  <div className="text-sm text-gray-400">of signals from AI results</div>
                </div>
              </div>

              {/* Quote — Profound-style blockquote */}
              <blockquote className="pl-4 border-l-4 border-emerald-500/50 py-4 mb-10">
                <p className="text-gray-300 italic leading-relaxed mb-4">
                  &quot;We didn&apos;t chase generic SEO for llmoutrank — we built for AI discovery. The goal was simple: when someone asks an AI engine a relevant question, the engine can recommend and link to the site. Hundreds of signals and real users from ChatGPT and Perplexity show it&apos;s working.&quot;
                </p>
                <footer className="text-sm text-gray-500">
                  Anthroly team — AI visibility &amp; referral traffic
                </footer>
              </blockquote>

              {/* The Opportunity */}
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Target size={20} className="text-emerald-400" />
                The Opportunity
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                More people than ever ask AI before they search. We focused on one thing for llmoutrank: making the site the kind of place AI engines actually recommend and cite. The opportunity was clear — own AI referral traffic in their space instead of chasing traditional SEO alone.
              </p>

              {/* The Solution — sub-sections like Profound */}
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Zap size={20} className="text-cyan-400" />
                The Solution
              </h3>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-base font-semibold text-white mb-2">Citation-ready content strategy</h4>
                  <p className="text-gray-300 leading-relaxed">
                    We ran an AI crawler pass to see how engines view the site and where the gaps were. Then we built content that directly answers the questions people — and AI — are already asking. We added Q&amp;A-style pages that are easy for models to quote and cite. Every piece had human oversight; the goal was quotable, trustworthy answers.
                  </p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-2">Solve for the full query</h4>
                  <p className="text-gray-300 leading-relaxed">
                    We made the site structurally clear: clear headings, clear definitions, clear intent. So AI could confidently treat it as the source and send traffic. Baseline AI visibility first, then a content plan aligned to real search and AI behavior, then technical signals so crawlers could find and index everything fast. Once that foundation was in place, we kept publishing and refining.
                  </p>
                </div>
              </div>

              {/* The Results — bullet list like Profound */}
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-400" />
                The Results
              </h3>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong className="text-white">100&apos;s of visits</strong> from AI referrers in the last 30 days — real users landing on llmoutrank because an AI answer sent them.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong className="text-white">100&apos;s of signals</strong> from AI results — ChatGPT, Perplexity, and others are now pointing users to the site.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong className="text-white">Verifiable proof</strong> — we link to the live dashboard so you can see last 30 days AI traffic yourself. No fluff; numbers in real time.</span>
                </li>
              </ul>

              {/* Snapshot + Dashboard CTA */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800">
                  <div className="flex items-center gap-2 text-white font-semibold mb-3">
                    <Bot size={18} className="text-purple-400" />
                    Snapshot (last 30 days)
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">100&apos;s of visits</p>
                  <p className="text-sm text-gray-400">
                    from AI referrers. Real users driven to the site by AI answers.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800">
                  <div className="flex items-center gap-2 text-white font-semibold mb-3">
                    <TrendingUp size={18} className="text-emerald-400" />
                    Check the live dashboard
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    See last 30 days AI traffic for llmoutrank. No login required.
                  </p>
                  <a
                    href="https://datafa.st/share/682b1fc309a39da9358cd37a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full h-12 bg-white text-black hover:bg-gray-100 rounded-xl font-bold">
                      Open AI traffic dashboard (last 30 days)
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </a>
                </div>
              </div>

              {/* The Outcome — Profound-style closing */}
              <h3 className="text-lg font-bold text-white mb-3">The Outcome</h3>
              <p className="text-gray-300 leading-relaxed">
                llmoutrank is now in the loop: the more AI sees the site as a reliable answer, the more it recommends it. The snapshot below shows the last 30 days. We&apos;ve linked to the live dashboard so you can verify the numbers yourself — no vanity metrics, just real AI referral traffic.
              </p>
            </div>

            {/* Screenshot */}
            <div className="border-t border-gray-800 p-6 bg-gradient-to-b from-gray-800/40 to-gray-700/20">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                <div className="p-[2px] rounded-2xl bg-gradient-to-b from-white/20 via-white/10 to-white/5">
                  <div className="rounded-[14px] overflow-hidden bg-[#1a1f2e]">
                    <Image
                      src="/testimonial.png"
                      alt="llmoutrank AI traffic — 100's of visits from AI referrers (last 30 days)"
                      width={1600}
                      height={900}
                      className="w-full h-auto object-contain"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
