"use client";

import React, { useState } from "react";

/**
 * Brand logo rendered from the company domain, with a text wordmark fallback
 * if the logo can't be loaded.
 */
export function BrandLogo({ name, domain }: { name: string; domain: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-sm font-semibold text-gray-300 tracking-wide whitespace-nowrap">
        {name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={`${name} logo`}
      title={name}
      loading="lazy"
      width={120}
      height={32}
      className="h-7 w-auto max-w-[130px] object-contain opacity-60 grayscale brightness-0 invert transition-opacity duration-300 hover:opacity-100"
      onError={() => setFailed(true)}
    />
  );
}
