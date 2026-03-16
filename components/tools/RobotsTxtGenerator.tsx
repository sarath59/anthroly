'use client';

import { useState } from 'react';

export function RobotsTxtGenerator() {
  const [allowAll, setAllowAll] = useState(true);
  const [sitemapUrl, setSitemapUrl] = useState('https://yoursite.com/sitemap.xml');
  const [disallowPaths, setDisallowPaths] = useState('/admin\n/private');

  let origin = 'yoursite.com';
  try {
    if (sitemapUrl) origin = new URL(sitemapUrl).origin;
  } catch {
    // keep default
  }
  const output = `# robots.txt for ${origin}
User-agent: *
${allowAll ? 'Allow: /' : ''}
${disallowPaths.trim().split('\n').filter(Boolean).map((p) => `Disallow: ${p.trim()}`).join('\n')}

Sitemap: ${sitemapUrl}
`;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Sitemap URL</label>
        <input
          type="url"
          value={sitemapUrl}
          onChange={(e) => setSitemapUrl(e.target.value)}
          placeholder="https://yoursite.com/sitemap.xml"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 font-mono text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="allow"
          checked={allowAll}
          onChange={(e) => setAllowAll(e.target.checked)}
          className="rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500"
        />
        <label htmlFor="allow" className="text-sm text-gray-400">Allow all crawlers (Allow: /)</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Paths to disallow (one per line)</label>
        <textarea
          value={disallowPaths}
          onChange={(e) => setDisallowPaths(e.target.value)}
          placeholder="/admin\n/private"
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 font-mono text-sm resize-y"
        />
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Generated robots.txt</h3>
        <pre className="text-sm text-teal-400 font-mono whitespace-pre-wrap break-all">{output}</pre>
      </div>
    </div>
  );
}
