"use client"

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { GlowPulse, SpotlightCard, ScaleOnScroll } from "../ui/animated-elements";

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
      {/* Background */}
      <div className="absolute inset-0">
        <GlowPulse className="top-1/3 left-0" color="emerald" size={650} />
        <GlowPulse className="bottom-1/3 right-0" color="cyan" size={520} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>AI Traffic Proof (Last 30 Days)</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            AI Referrals You Can Check.
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            This section is only about <span className="text-white font-semibold">AI traffic</span>.
            For these brands, we focused on AI discovery: making the site easy for AI engines to understand,
            cite, and send referrals from.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Case Study: llmoutrank */}
          <SpotlightCard className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/50">
            <div className="p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-sm font-semibold text-emerald-300">
                    Case Study
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    llmoutrank
                  </h3>
                  <p className="text-gray-400 mt-2">
                    30 days of AI traffic momentum.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs text-gray-300">
                  <Clock size={14} className="text-emerald-400" />
                  <span>Last 30 days</span>
                </div>
              </div>

              {/* Punchy “belief bridge” */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 mb-6">
                <p className="text-gray-300 leading-relaxed">
                  We didn&apos;t work on “overall traffic” here — we worked on{" "}
                  <span className="text-white font-semibold">AI referrals</span>. The goal was simple:
                  when someone asks an AI engine a relevant question, the engine can confidently recommend (and link to) llmoutrank.
                </p>
              </div>

              {/* AI-only callouts */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-gray-950/40 border border-gray-800">
                  <div className="flex items-center gap-2 text-white font-semibold mb-3">
                    <Bot size={18} className="text-purple-400" />
                    AI referrers (snapshot)
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>ChatGPT</span>
                      <span className="font-semibold text-white">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Perplexity</span>
                      <span className="font-semibold text-white">2</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    The point isn&apos;t the number — it&apos;s the signal: AI engines are now sending real users.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-950/40 border border-gray-800">
                  <div className="flex items-center gap-2 text-white font-semibold mb-3">
                    <TrendingUp size={18} className="text-emerald-400" />
                    Check it live
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    Want to verify the AI traffic yourself? Open the live dashboard below.
                  </p>
                  <a
                    href="https://datafa.st/share/682b1fc309a39da9358cd37a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full h-12 bg-white text-black hover:bg-gray-100 rounded-xl font-bold">
                      Open AI traffic dashboard
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </a>
                  <p className="text-xs text-gray-500 mt-3">
                    (Shows AI referrers like ChatGPT + Perplexity)
                  </p>
                </div>
              </div>
            </div>

            {/* Screenshot */}
            <div className="border-t border-gray-800 p-6 bg-gradient-to-b from-gray-800/40 to-gray-700/20">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                {/* Light border frame to separate from dark background */}
                <div className="p-[2px] rounded-2xl bg-gradient-to-b from-white/20 via-white/10 to-white/5">
                  <div className="rounded-[14px] overflow-hidden bg-[#1a1f2e]">
                    <Image
                      src="/testimonial.png"
                      alt="llmoutrank AI traffic results"
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

          {/* Case Study: isthisaiorno.com */}
          <SpotlightCard className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/50">
            <div className="p-8">
              <div className="text-sm font-semibold text-cyan-300">
                Starting Now
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mt-1">
                isthisaiorno.com
              </h3>
              <p className="text-gray-400 mt-3 leading-relaxed">
                We’re starting with a single goal: <span className="text-white font-semibold">AI referral traffic</span>.
                The fastest wins come from publishing the right answer pages and making them “quotable” for AI engines.
              </p>

              <div className="mt-8 space-y-4">
                <div className="p-5 rounded-2xl bg-black/30 border border-gray-800">
                  <div className="flex items-center gap-2 text-white font-semibold mb-2">
                    <TrendingUp size={18} className="text-emerald-400" />
                    Week 1: AI traffic foundation
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-400 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        Baseline AI visibility + competitor gap map (what AI recommends today and why)
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-400 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        Launch the Q&amp;A page pipeline (the pages AI can quote directly)
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-400 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        Technical clean-up (crawlability, schema, indexation signals)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/30 border border-gray-800">
                  <div className="flex items-center gap-2 text-white font-semibold mb-2">
                    <Bot size={18} className="text-purple-400" />
                    What “doing great” looks like early
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    You don&apos;t need viral traffic to know it&apos;s working. Early AI-traffic success looks like:
                    pages getting indexed quickly, “answer coverage” improving, and AI engines starting to echo your
                    definitions and recommend your pages. That’s what we’re building right now.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20">
                  <div className="text-white font-bold text-lg mb-2">
                    The point:
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    We don&apos;t “hope” for SEO. We run a system. When the
                    system is live, results compound — and the gap between you
                    and everyone else gets harder to close.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/#pricing">
                  <Button className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]">
                    See the 30-day plan & pricing
                    <ArrowRight className="ml-2" size={22} />
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  If you want your brand to be the answer, this is where it
                  starts.
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

