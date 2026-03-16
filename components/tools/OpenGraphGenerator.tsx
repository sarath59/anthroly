'use client';

import { useState } from 'react';

export function OpenGraphGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://yoursite.com/og-image.jpg');
  const [url, setUrl] = useState('https://yoursite.com/page');

  const tags = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title || 'Your title'}" />
<meta property="og:description" content="${(description || 'Your description').replace(/"/g, '&quot;')}" />
<meta property="og:image" content="${image}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${url}" />
<meta name="twitter:title" content="${title || 'Your title'}" />
<meta name="twitter:description" content="${(description || 'Your description').replace(/"/g, '&quot;')}" />
<meta name="twitter:image" content="${image}" />`;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Page title"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description for social"
          rows={2}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500 font-mono text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Page URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500 font-mono text-sm"
        />
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Meta tags (copy to &lt;head&gt;)</h3>
        <pre className="text-xs text-teal-400 font-mono whitespace-pre-wrap break-all overflow-x-auto">{tags}</pre>
      </div>
    </div>
  );
}
