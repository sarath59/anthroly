'use client';

import { useState } from 'react';

function encodeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function decodeHtml(s: string): string {
  const d = document.createElement('textarea');
  d.innerHTML = s;
  return d.value;
}

export function HtmlEncoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const output = mode === 'encode' ? encodeHtml(input) : decodeHtml(input);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('encode')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${mode === 'encode' ? 'bg-teal-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
        >
          Encode
        </button>
        <button
          type="button"
          onClick={() => setMode('decode')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${mode === 'decode' ? 'bg-teal-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
        >
          Decode
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">{mode === 'encode' ? 'Plain text' : 'Encoded HTML'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter &amp;lt;encoded&amp;gt; text...'}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 font-mono text-sm resize-y"
        />
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Output</h3>
        <textarea
          readOnly
          value={output}
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-black/50 text-teal-400 font-mono text-sm resize-none"
        />
      </div>
    </div>
  );
}
