'use client';

import { useState } from 'react';

const LIMITS = [
  { name: 'Meta title', max: 60 },
  { name: 'Meta description', max: 155 },
  { name: 'Twitter title', max: 70 },
  { name: 'Twitter description', max: 200 },
  { name: 'SMS', max: 160 },
];

export function CharacterCounter() {
  const [text, setText] = useState('');
  const len = text.length;

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type text to count characters..."
        rows={5}
        className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 resize-y"
      />
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <div className="text-3xl font-bold text-teal-400 mb-4">{len} characters</div>
        <div className="space-y-2">
          {LIMITS.map(({ name, max }) => (
            <div key={name} className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{name}</span>
              <span className={len <= max ? 'text-teal-400' : 'text-amber-400'}>
                {len} / {max}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
