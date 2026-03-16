'use client';

import { useState, useMemo } from 'react';

export function ReadingTime() {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(200);
  const result = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const minutes = Math.ceil(words / wpm) || 0;
    return { words, minutes };
  }, [text, wpm]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Reading speed (words per minute)</label>
        <input
          type="number"
          value={wpm}
          onChange={(e) => setWpm(Math.max(100, Math.min(400, Number(e.target.value) || 200)))}
          min={100}
          max={400}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
        <p className="text-xs text-gray-500 mt-1">Average adult: ~200–250 wpm</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article or blog post..."
          rows={10}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 resize-y"
        />
      </div>
      <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-6">
        <div className="text-3xl font-bold text-teal-400">{result.minutes} min read</div>
        <div className="text-sm text-gray-400 mt-1">{result.words} words at {wpm} wpm</div>
      </div>
    </div>
  );
}
