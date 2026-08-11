"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FaqItem = { question: string; answer: string };

export function FAQAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="bg-gray-900/80 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <span className="font-bold text-white text-lg pr-4">{faq.question}</span>
            <ChevronDown
              className={`flex-shrink-0 text-gray-500 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              size={24}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-[480px] pb-6' : 'max-h-0'
            }`}
          >
            <p className="px-6 text-gray-400 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
