"use client"

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Bot,
  Clock,
  Sparkles,
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
        <div
          className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>Case Study — AI Traffic (Last 30 Days)</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How We Got llmoutrank in Front of AI Answers
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            One brand. Two months. Hundreds of signals from AI results — and real users landing on the site because AI recommended them.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SpotlightCard className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/50">
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <div className="text-sm font-semibold text-emerald-300">
                    Case Study
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    llmoutrank
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Last 2 months — AI referral traffic only.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs text-gray-300">
                  <Clock size={14} className="text-emerald-400" />
                  <span>Last 30 days snapshot</span>
                </div>
              </div>

              <div className="space-y-6 text-gray-300 leading-relaxed mb-8">
                <p>
                  Over the last two months we focused on one thing for llmoutrank: making the site the kind of place AI engines actually recommend. We didn&apos;t chase generic SEO — we built for AI discovery. The result is hundreds of signals from AI results, and real users reaching the site because ChatGPT, Perplexity, and others are pointing them there. That&apos;s the shift we care about: your brand showing up in the answer, and people clicking through.
                </p>
                <p>
                  Here&apos;s how we crafted it. We started with an AI crawler pass: how do these engines see the site today, and where are the gaps? Then we built content that directly answers the questions people (and AI) are already asking. We added Q&amp;A-style pages that are easy for models to quote and cite. We made the site structurally clear — clear headings, clear definitions, clear intent — so AI could confidently say &quot;this is the source&quot; and send traffic. Human oversight on every piece; the goal was quotable, trustworthy answers, not volume for its own sake.
                </p>
                <p>
                  What led up to this wasn&apos;t a single tactic. It was a sequence: baseline AI visibility so we knew where we stood, then a content plan aligned to real search and AI behavior, then technical signals so crawlers could find and index everything fast. Once the foundation was in place, we kept publishing and refining. The compounding part is real — the more AI sees you as a reliable answer, the more it recommends you. llmoutrank is now in that loop.
                </p>
                <p>
                  The snapshot below shows the last 30 days: hundreds of visits from AI referrers. Not vanity metrics — these are people who landed on llmoutrank because an AI answer sent them. You can verify it yourself: we&apos;ve linked to the live dashboard so you can see exactly how AI traffic is flowing in. No fluff, no screenshots we could fake. Just the numbers, updated in real time.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800">
                  <div className="flex items-center gap-2 text-white font-semibold mb-3">
                    <Bot size={18} className="text-purple-400" />
                    Snapshot (last 30 days)
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">
                    100&apos;s of visits
                  </p>
                  <p className="text-sm text-gray-400">
                    from AI referrers (ChatGPT, Perplexity, and others). Real users driven to the site by AI answers.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800">
                  <div className="flex items-center gap-2 text-white font-semibold mb-3">
                    <TrendingUp size={18} className="text-emerald-400" />
                    Check the live dashboard
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    See last 30 days AI traffic for llmoutrank. No login required — open and verify.
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
            </div>

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
