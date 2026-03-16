'use client';

import { useState, useMemo } from 'react';

export function KeywordDensity() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const result = useMemo(() => {
    if (!text.trim() || !keyword.trim()) return null;
    const words = text.toLowerCase().split(/\s+/).filter(Boolean);
    const total = words.length;
    const kw = keyword.toLowerCase();
    const count = words.filter((w) => w.replace(/\W/g, '') === kw.replace(/\W/g, '')).length;
    const density = total ? ((count / total) * 100).toFixed(2) : '0';
    return { count, total, density: parseFloat(density) };
  }, [text, keyword]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Keyword to analyze</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g. seo"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your content..."
          rows={8}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 resize-y"
        />
      </div>
      {result && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Keyword density</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-teal-400">{result.count}</div>
              <div className="text-xs text-gray-500">Occurrences</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-400">{result.total}</div>
              <div className="text-xs text-gray-500">Total words</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-400">{result.density}%</div>
              <div className="text-xs text-gray-500">Density</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Typical target: 0.5–2.5%. Too high may look like keyword stuffing; too low may under-optimize.
          </p>
        </div>
      )}
    </div>
  );
}
