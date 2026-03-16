'use client';

import { useState } from 'react';

export function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleLen = title.length;
  const descLen = description.length;

  const titleStatus = titleLen <= 60 ? 'ok' : titleLen <= 70 ? 'warn' : 'over';
  const descStatus = descLen <= 155 ? 'ok' : descLen <= 165 ? 'warn' : 'over';

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your page title"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          maxLength={120}
        />
        <p className={`mt-1 text-sm ${titleStatus === 'ok' ? 'text-teal-400' : titleStatus === 'warn' ? 'text-amber-400' : 'text-red-400'}`}>
          {titleLen} / 60 (Google may truncate after ~60)
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Meta description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description for search results"
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
          maxLength={200}
        />
        <p className={`mt-1 text-sm ${descStatus === 'ok' ? 'text-teal-400' : descStatus === 'warn' ? 'text-amber-400' : 'text-red-400'}`}>
          {descLen} / 155 (Google may truncate after ~155)
        </p>
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Generated meta tags</h3>
        <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap break-all font-mono">
{`<title>${title || 'Your page title'}</title>
<meta name="description" content="${(description || 'Your meta description').replace(/"/g, '&quot;')}" />`}
        </pre>
      </div>
    </div>
  );
}
