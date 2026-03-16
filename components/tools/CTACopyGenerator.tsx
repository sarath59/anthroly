'use client';

import { useState } from 'react';

const CTAS = [
  'Get Started Free',
  'Start Free Trial',
  'Try for Free',
  'Sign Up',
  'Get Access',
  'Download Now',
  'Learn More',
  'See How It Works',
  'Book a Demo',
  'Request a Quote',
  'Join Now',
  'Subscribe',
  'Add to Cart',
  'Buy Now',
  'Claim Offer',
  'Yes, I want this',
  'Send me the guide',
  'Get the checklist',
];

export function CTACopyGenerator() {
  const [filter, setFilter] = useState('');

  const filtered = filter
    ? CTAS.filter((c) => c.toLowerCase().includes(filter.toLowerCase()))
    : CTAS;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Filter (optional)</label>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="e.g. free, get, start"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">CTA copy ideas</h3>
        <div className="flex flex-wrap gap-2">
          {filtered.map((c, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-400 text-sm border border-teal-500/30"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
