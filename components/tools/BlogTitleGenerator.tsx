'use client';

import { useState } from 'react';

const PATTERNS = [
  'How to {topic} in {year}',
  '{number} Ways to {topic}',
  'The Ultimate Guide to {topic}',
  '{topic}: A Complete Guide',
  'Why {topic} Matters (And How to Do It Right)',
  'What Is {topic}? Definition, Tips & Examples',
  '{topic} Best Practices',
];

export function BlogTitleGenerator() {
  const [topic, setTopic] = useState('SEO');
  const [number, setNumber] = useState('10');
  const year = new Date().getFullYear();

  const titles = PATTERNS.map((p) =>
    p.replace('{topic}', topic).replace('{year}', String(year)).replace('{number}', number)
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Topic / keyword</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="SEO"
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Number (for list titles)</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="10"
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
          />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Title ideas</h3>
        <ul className="space-y-2">
          {titles.map((t, i) => (
            <li key={i} className="text-teal-400 font-medium">{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
