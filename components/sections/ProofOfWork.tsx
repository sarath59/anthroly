import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlowPulse, SpotlightCard } from "../ui/static-fx";
import { allCustomerStories, ENTERPRISE_PROOF_LINE } from "@/lib/customers";
import { CustomerLogoWall } from "./CustomerLogoWall";

export const ProofOfWork = () => {
  return (
    <section
      id="proof"
      className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <GlowPulse className="top-1/3 left-0" color="emerald" size={650} />
        <GlowPulse className="bottom-1/3 right-0" color="cyan" size={520} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>Customers</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Meet the teams who are using Anthroly
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-3">
            These stories are from prior AI-visibility work with Anthroly — related, not this dual-agent offer.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">{ENTERPRISE_PROOF_LINE}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCustomerStories.map((c) => (
              <SpotlightCard
                key={c.slug}
                className="rounded-2xl border border-gray-800 bg-black/40 overflow-hidden"
              >
                <Link
                  href={`/customers/${c.slug}`}
                  className="p-5 h-full flex flex-col group"
                >
                  <p className="text-sm font-semibold text-emerald-400 mb-2">{c.brand}</p>
                  <h3 className="text-sm font-medium text-gray-200 leading-snug flex-1 mb-4 group-hover:text-white transition-colors">
                    {c.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 group-hover:gap-3 transition-all">
                    Read story
                    <ArrowRight size={14} />
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

          <CustomerLogoWall className="mt-24" />
        </div>
      </div>
    </section>
  );
};
