'use client';

import { useState } from 'react';

export function CanonicalChecker() {
  const [pageUrl, setPageUrl] = useState('');
  const [canonicalTag, setCanonicalTag] = useState('');

  const canonicalHref = canonicalTag.match(/href=["']([^"']+)["']/)?.[1] ?? '';
  const match = pageUrl && canonicalHref && (pageUrl === canonicalHref || pageUrl.replace(/\/$/, '') === canonicalHref.replace(/\/$/, ''));
  const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(canonicalTag);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Page URL</label>
        <input
          type="url"
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
          placeholder="https://yoursite.com/page"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500 font-mono text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Canonical tag (from page source)</label>
        <input
          type="text"
          value={canonicalTag}
          onChange={(e) => setCanonicalTag(e.target.value)}
          placeholder='<link rel="canonical" href="https://yoursite.com/page" />'
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500 font-mono text-sm"
        />
      </div>
      {pageUrl && canonicalTag && (
        <div className={`rounded-2xl border p-6 ${hasCanonical && match ? 'border-teal-500/50 bg-teal-500/10' : 'border-gray-800 bg-gray-900/50'}`}>
          {hasCanonical ? (
            match ? (
              <p className="text-teal-400 font-medium">Canonical URL matches page URL. Good.</p>
            ) : (
              <p className="text-amber-400">Canonical and page URL origins or paths differ. Check for consistency.</p>
            )
          ) : (
            <p className="text-gray-400">No valid canonical tag detected. Add: &lt;link rel=&quot;canonical&quot; href=&quot;…&quot; /&gt;</p>
          )}
        </div>
      )}
    </div>
  );
}
