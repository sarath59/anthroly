'use client';

import { useState } from 'react';

const TYPES = ['Organization', 'WebSite', 'Article', 'Product', 'LocalBusiness'];

export function JsonLdGenerator() {
  const [type, setType] = useState('Organization');
  const [name, setName] = useState('Your Company');
  const [url, setUrl] = useState('https://yoursite.com');
  const [description, setDescription] = useState('');

  const base: Record<string, string> = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    url,
    ...(description && { description }),
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500 resize-none"
        />
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">JSON-LD (add to &lt;head&gt;)</h3>
        <pre className="text-xs text-teal-400 font-mono whitespace-pre-wrap break-all overflow-x-auto">
          {JSON.stringify(base, null, 2)}
        </pre>
      </div>
    </div>
  );
}
