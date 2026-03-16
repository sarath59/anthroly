'use client';

import { useState } from 'react';

// Simple related-word expansion (could be replaced with API later)
const RELATED: Record<string, string[]> = {
  seo: ['search engine', 'keywords', 'ranking', 'backlinks', 'meta tags', 'content', 'technical seo', 'on-page', 'off-page'],
  marketing: ['campaign', 'audience', 'conversion', 'lead', 'brand', 'content', 'analytics', 'social'],
  content: ['blog', 'keyword', 'audience', 'engagement', 'format', 'strategy', 'calendar', 'optimization'],
  default: ['strategy', 'tips', 'guide', 'best practices', 'examples', 'tools', 'checklist', 'tutorial'],
};

function getRelated(keyword: string): string[] {
  const k = keyword.toLowerCase().trim();
  for (const [key, words] of Object.entries(RELATED)) {
    if (k.includes(key)) return words;
  }
  return RELATED.default;
}

export function LSIKeywords() {
  const [keyword, setKeyword] = useState('');
  const related = keyword ? getRelated(keyword) : [];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Primary keyword / topic</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g. SEO, content marketing"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      {related.length > 0 && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Related / LSI ideas</h3>
          <p className="text-xs text-gray-500 mb-3">Use these in headings and body to support topical authority.</p>
          <div className="flex flex-wrap gap-2">
            {related.map((w, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-400 text-sm">
                {w}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
