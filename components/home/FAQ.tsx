import { Plus } from 'lucide-react';
import { HOME_FAQ } from '@/lib/faq';
import { generateFAQSchema } from '@/lib/schema';
import { CONTACT_EMAIL } from '@/lib/site';
import { Reveal } from './Reveal';

export function FAQ() {
  return (
    <section id="faq" className="page-x py-24 lg:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(HOME_FAQ)) }}
      />
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-signal">05</span>
              <span className="h-px w-8 bg-ink/25" />
              Questions
            </p>
            <h2 className="mt-8 font-serif text-display-md">Asked on almost every first call.</h2>
            <p className="mt-6 text-[16px] leading-[1.6] text-ink-muted">
              Something else on your mind? Write to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline decoration-signal underline-offset-4">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Reveal>
        </div>

        <div className="border-t border-ink lg:col-span-8">
          {HOME_FAQ.map((item) => (
            <details key={item.question} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-[1.6rem] leading-snug transition-colors group-hover:text-signal">
                  {item.question}
                </span>
                <Plus
                  size={20}
                  className="mt-2 shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-8 text-[16px] leading-[1.7] text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
