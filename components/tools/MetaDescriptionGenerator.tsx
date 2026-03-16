'use client';

import { useState } from 'react';

const TEMPLATES = [
  'Learn {topic}. {benefit}. Free guide.',
  '{topic}: tips, examples, and best practices for {audience}.',
  'Discover how to {action}. Step-by-step guide with examples.',
];

export function MetaDescriptionGenerator() {
  const [topic, setTopic] = useState('');
  const [benefit, setBenefit] = useState('');
  const [audience, setAudience] = useState('marketers');
  const [action, setAction] = useState('improve your SEO');

  const suggestions = TEMPLATES.map((t) =>
    t
      .replace('{topic}', topic || '[topic]')
      .replace('{benefit}', benefit || '[key benefit]')
      .replace('{audience}', audience)
      .replace('{action}', action)
  ).map((s) => ({ text: s, len: s.length }));

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Topic / focus keyword</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="meta description"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Key benefit</label>
        <input
          type="text"
          value={benefit}
          onChange={(e) => setBenefit(e.target.value)}
          placeholder="Write better meta tags that get clicks"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Audience</label>
        <input
          type="text"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="marketers"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Action (for “how to” style)</label>
        <input
          type="text"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="improve your SEO"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Meta description ideas (aim for 150–155 chars)</h3>
        <ul className="space-y-3">
          {suggestions.map((s, i) => (
            <li key={i} className="flex justify-between gap-4 items-start">
              <span className="text-teal-400 text-sm flex-1">{s.text}</span>
              <span className={`text-xs shrink-0 ${s.len <= 155 ? 'text-teal-400' : 'text-amber-400'}`}>
                {s.len}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
