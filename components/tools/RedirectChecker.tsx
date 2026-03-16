'use client';

import { useState } from 'react';

export function RedirectChecker() {
  const [urls, setUrls] = useState('/old-page\n/old-page-2\n/legacy');
  const chain = urls.trim().split('\n').filter(Boolean).map((u) => u.trim());

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">URLs in chain (one per line, in order)</label>
        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="/old-page\n/redirect1\n/final"
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 font-mono text-sm resize-y"
        />
      </div>
      {chain.length > 0 && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Chain analysis</h3>
          <p className="text-sm text-gray-400 mb-4">
            {chain.length} hop{chain.length !== 1 ? 's' : ''}. For SEO, redirect directly to the final URL when possible (one 301).
          </p>
          <ul className="space-y-2 font-mono text-sm">
            {chain.map((u, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-teal-400 w-6">{i + 1}.</span>
                <span className="text-gray-300">{u || '(empty)'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
