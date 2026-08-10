import React from "react";
import { BRAND_LOGOS, ENTERPRISE_PROOF_LINE } from "@/lib/customers";
import { BrandLogo } from "@/components/ui/BrandLogo";

/**
 * "Teams we empower through our marketing agents" — brand logo wall with the
 * enterprise proof line. Used on the homepage customers section and /customers.
 */
export function CustomerLogoWall({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Teams we empower through our marketing agents
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto">{ENTERPRISE_PROOF_LINE}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 max-w-5xl mx-auto">
        {BRAND_LOGOS.map((brand) => (
          <BrandLogo key={brand.domain} name={brand.name} domain={brand.domain} />
        ))}
      </div>
    </div>
  );
}
