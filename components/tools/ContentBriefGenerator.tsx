'use client';

import { useState } from 'react';

export function ContentBriefGenerator() {
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [audience, setAudience] = useState('');

  const brief = `# Content brief: ${title || 'Untitled'}

## Target keyword
${keyword || '[Primary keyword]'}

## Audience
${audience || '[Who is this for?]'}

## Outline
- Introduction (hook + what they'll learn)
- Main point 1
- Main point 2
- Main point 3
- Conclusion + CTA

## SEO checklist
- [ ] Title tag 50-60 chars
- [ ] Meta description 150-155 chars
- [ ] H1 matches intent
- [ ] H2/H3 hierarchy
- [ ] Internal links (2-3)
- [ ] Image alt text
`;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Article title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="How to Improve SEO in 2025"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Target keyword</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="seo tips"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Audience</label>
        <input
          type="text"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="Marketing managers, small business owners"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
        />
      </div>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Content brief (copy and edit)</h3>
        <pre className="text-sm text-teal-400 font-mono whitespace-pre-wrap">{brief}</pre>
      </div>
    </div>
  );
}
