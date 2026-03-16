'use client';

import { useState } from 'react';

export function TitleTagOptimizer() {
  const [title, setTitle] = useState('');
  const len = title.length;
  const status = len <= 60 ? 'good' : len <= 70 ? 'warn' : 'over';
  const hasKeyword = title.length > 0;
  const wordCount = title.trim() ? title.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Title tag</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your page title here"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
          maxLength={100}
        />
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-400">Optimization checklist</h3>
        <ul className="space-y-2 text-sm">
          <li className={len <= 60 ? 'text-teal-400' : 'text-amber-400'}>
            Length: {len} / 60 chars {len <= 60 ? '✓' : len <= 70 ? '(slightly long)' : '(too long)'}
          </li>
          <li className="wordCount >= 3 && wordCount <= 10 ? 'text-teal-400' : 'text-gray-500'">
            Words: {wordCount} (typically 3–10 works well)
          </li>
          <li className="hasKeyword ? 'text-teal-400' : 'text-gray-500'}>
            Include primary keyword near the start
          </li>
        </ul>
        <p className="text-xs text-gray-500">
          Google often truncates after ~60 characters. Put your brand at the end if needed.
        </p>
      </div>
    </div>
  );
}
