import React from 'react';
import { ChevronDown } from 'lucide-react';

type FaqItem = { question: string; answer: string };

/** Native details/summary — no JS, content visible to crawlers, better INP. */
export function FAQAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          className="group bg-gray-900/80 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
          open={index === 0}
        >
          <summary className="flex items-center justify-between p-6 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="font-bold text-white text-lg pr-4">{faq.question}</span>
            <ChevronDown
              className="flex-shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180"
              size={24}
              aria-hidden
            />
          </summary>
          <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export default FAQAccordion;
