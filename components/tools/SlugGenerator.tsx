'use client';

import { useState } from 'react';

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function SlugGenerator() {
  const [title, setTitle] = useState('');
  const slug = toSlug(title);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Page title or headline</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="How to Improve Your SEO in 2025"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
        />
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">URL slug</h3>
        <code className="block px-4 py-3 rounded-lg bg-black/50 text-teal-400 font-mono text-sm break-all">
          {slug || 'your-slug-here'}
        </code>
        <p className="text-xs text-gray-500 mt-2">Lowercase, hyphens, no special characters. Copy and use in your URL.</p>
      </div>
    </div>
  );
}
