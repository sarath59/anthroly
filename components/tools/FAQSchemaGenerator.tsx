'use client';

import { useState } from 'react';

export function FAQSchemaGenerator() {
  const [questions, setQuestions] = useState('What is SEO?\nHow do I improve my rankings?\nWhat is meta description?');
  const qList = questions.trim().split('\n').filter(Boolean);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qList.map((q, i) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answers[i] ?? 'Your answer here',
      },
    })),
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Questions (one per line)</label>
        <textarea
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          placeholder="Question 1\nQuestion 2"
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 resize-y"
        />
      </div>
      {qList.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Answers (optional — edit in JSON if needed)</label>
          <div className="space-y-2">
            {qList.slice(0, 10).map((q, i) => (
              <div key={i}>
                <span className="text-xs text-gray-500">{q.slice(0, 50)}…</span>
                <input
                  type="text"
                  value={answers[i] ?? ''}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
                  placeholder="Short answer"
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">FAQPage JSON-LD</h3>
        <pre className="text-xs text-teal-400 font-mono whitespace-pre-wrap break-all overflow-x-auto">
          {JSON.stringify(schema, null, 2)}
        </pre>
      </div>
    </div>
  );
}
