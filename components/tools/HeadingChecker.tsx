'use client';

import { useState, useMemo } from 'react';

export function HeadingChecker() {
  const [html, setHtml] = useState('');
  const headings = useMemo(() => {
    const hRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
    const matches: { level: number; text: string }[] = [];
    let m;
    while ((m = hRegex.exec(html)) !== null) {
      matches.push({ level: parseInt(m[1], 10), text: m[2].replace(/<[^>]+>/g, '').trim().slice(0, 60) });
    }
    return matches;
  }, [html]);

  const hasH1 = headings.some((h) => h.level === 1);
  const h1Count = headings.filter((h) => h.level === 1).length;
  const valid = hasH1 && h1Count === 1 && headings.every((h, i) => (i === 0 ? h.level === 1 : h.level <= headings[i - 1].level + 1));

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">HTML with headings (paste snippet)</label>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="<h1>Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>"
          rows={8}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 font-mono text-sm resize-y"
        />
      </div>
      {headings.length > 0 && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 space-y-4">
          <div className={`text-sm font-semibold ${valid ? 'text-teal-400' : 'text-amber-400'}`}>
            {valid ? 'Structure looks good' : 'Issues found'}
          </div>
          {!hasH1 && <p className="text-xs text-gray-500">No H1 found. Use exactly one H1 per page.</p>}
          {h1Count > 1 && <p className="text-xs text-gray-500">Multiple H1s detected. Use a single H1.</p>}
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Heading hierarchy</h3>
            <ul className="space-y-1 font-mono text-sm">
              {headings.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-teal-400 w-6">H{h.level}</span>
                  <span className="text-gray-300 truncate">{h.text || '(empty)'}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
