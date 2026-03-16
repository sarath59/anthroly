'use client';

import { useState } from 'react';

export function SerpPreview() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('yoursite.com');
  const [description, setDescription] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Title (blue link)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your page title"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">URL (green)</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yoursite.com/page"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 font-mono text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Snippet (meta description)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Your meta description..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 resize-none"
        />
      </div>
      <div className="rounded-2xl border border-gray-700 bg-white p-6 text-left">
        <p className="text-xs text-gray-500 mb-1">Google search preview</p>
        <p className="text-blue-600 text-xl hover:underline cursor-pointer">
          {title || 'Your page title'}
        </p>
        <p className="text-green-700 text-sm mt-0.5">{url || 'yoursite.com'}</p>
        <p className="text-gray-600 text-sm mt-1 leading-snug">
          {description || 'Your meta description will appear here. Keep it under 155 characters for best display.'}
        </p>
      </div>
    </div>
  );
}
