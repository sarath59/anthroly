"use client"

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlowPulse, SpotlightCard } from "../ui/animated-elements";

const customers = [
  {
    slug: "llmoutrank",
    brand: "llmoutrank",
    result: "Grew AI referral traffic to thousands of visits in 2 months",
  },
  {
    slug: "isthisaiorno",
    brand: "isthisaiorno.com",
    result: "Hit 3,000+ monthly visitors from AI search in 6 weeks",
  },
  {
    slug: "jobstronauts",
    brand: "Jobstronauts",
    result: "Captured 1,500+ AI-driven clicks in their first month",
  },
];

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
          className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>Case Studies</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Trusted by Growing Brands
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how brands use Anthroly to capture AI referral traffic and visibility.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customers.map((c) => (
              <SpotlightCard
                key={c.slug}
                className="rounded-2xl border border-gray-800 bg-black/40 overflow-hidden"
              >
                <Link
                  href={`/customers/${c.slug}`}
                  className="block p-6 h-full flex flex-col group"
                >
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {c.brand}
                  </h3>
                  <p className="text-gray-400 text-sm flex-1 mb-4">{c.result}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all">
                    Read story
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </SpotlightCard>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/customers"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              View all customer stories
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
