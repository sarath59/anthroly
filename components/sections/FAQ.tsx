"use client"

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { GlowPulse, ScaleOnScroll } from '../ui/animated-elements';

const faqs = [
  {
    question: "How is this different from other SEO agencies?",
    answer: "Traditional agencies charge $2,000-$10,000/month and rely on manual labor. We use AI to automate the repetitive work (research, drafting, internal linking, monitoring) so we can ship faster — but the final output is still human-quality. Our content is overseen by humans and reviewed before publishing. Plus, we focus on both traditional SEO and the emerging GEO (Generative Engine Optimization) for AI search engines."
  },
  {
    question: "Is your content AI-generated spam? Who actually writes it?",
    answer: "No. We use a human-led, AI-assisted workflow. AI helps with research, outlines, and first drafts — then humans edit for accuracy, clarity, brand voice, and usefulness. We fact-check, add structure/schema where needed, and only publish content that meets a human quality bar (not “AI fluff”)."
  },
  {
    question: "What kind of results can I expect in 30 days?",
    answer: "Most clients see measurable improvements within the first 30 days: new backlinks appearing, blog posts ranking, AI Q&A pages getting cited by AI engines, and increased organic traffic. By day 30, you will typically have 20-30 new backlinks, 30 published blog posts, 15 AI Q&A pages, 50+ AI brand mentions, and early signs of ranking improvements. SEO compounds over time, so month 2-3 is when you will see more dramatic growth."
  },
  {
    question: "Do you work with any industry?",
    answer: "Yes! We have worked with SaaS companies, e-commerce brands, service businesses, agencies, and more. Our AI systems adapt to your specific industry, competitors, and target keywords. Whether you are B2B or B2C, selling software or services, we tailor our approach to your market."
  },
  {
    question: "What are AI Q&A Pages and how do they rank on AI search?",
    answer: "AI Q&A pages are specially structured content pages that answer specific questions people ask about your industry. Unlike regular blog posts, these are optimized for AI engines like ChatGPT, Claude, Perplexity, and Google AI Overview. We research the exact questions being asked, then create pages with proper schema markup and structure that AI engines love to cite. You get 15 of these pages per month, and they contribute to your 50+ AI brand mentions guarantee."
  },
  {
    question: "What counts as an \"AI brand mention\" and how do you measure it?",
    answer: "We count a mention when an AI engine recommends your brand (name, domain, product, or clearly attributable reference) in response to relevant queries we track. We monitor across ChatGPT, Claude, Perplexity, Gemini, and Google AI Overview using a consistent prompt set and log the outputs over time so you can verify the mentions week-by-week."
  },
  {
    question: "Will these backlinks hurt my site? Are they safe?",
    answer: "Absolutely safe. We only build white-hat, editorial backlinks from real websites with genuine domain authority (DR 50-90, avg DR 70+). No PBNs, no link farms, no spammy directories. Every link is the kind that Google rewards, not penalizes. Our promise backs this up — if anything we do hurts your rankings, we will fix it immediately."
  },
  {
    question: "How much of my time does this require?",
    answer: "Almost none. Our system is designed to run autonomously. We will need a brief onboarding call (30 minutes) to understand your business, brand voice, and goals. After that, you will receive weekly reports and can check in anytime, but zero hands-on work is required from you."
  },
  {
    question: "Can I see examples of your work?",
    answer: "Yes! When you book a call with us, we will walk you through case studies from businesses similar to yours, showing exactly what we did and the results we achieved. We are happy to show real backlinks, real traffic numbers, and real ranking improvements."
  },
  {
    question: "What if it does not work for me?",
    answer: "That is what the promise is for. If we cannot deliver 20-30 high-quality backlinks per month (DR 50-90, avg DR 70+), we will give you one free month of service. We have never had to honor this — but it is there so you have zero risk."
  },
  {
    question: "Do you offer white-label services for agencies?",
    answer: "Yes! If you are an agency looking to offer SEO services to your clients, we can white-label everything we do. Your clients see your brand, you maintain the relationship, and we do all the work behind the scenes. This is perfect for agencies looking to scale their service offerings."
  },
  {
    question: "How do I get started?",
    answer: "Just click the Get Started button and complete your payment. You will immediately get access to our onboarding flow, and we will schedule your kickoff call within 24 hours. Most clients are fully operational within 48 hours of signing up."
  }
];

export const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <GlowPulse className="top-1/2 right-0" color="emerald" size={400} />
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(16,185,129,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-semibold mb-6 border border-gray-700">
            <HelpCircle size={16} />
            <span>🤔 87% of buyers have questions before purchasing</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Your Questions. Straight Answers.
          </h2>
          <p className="text-xl text-gray-400">
            No fluff, no jargon. Just the truth about what we do and how it works.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-900/80 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <button
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
                    openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Have Questions */}
        <div className={`mt-16 max-w-2xl mx-auto text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-400">
            Still have questions? <a href="mailto:hello@anthroly.com" className="text-emerald-400 font-semibold underline hover:no-underline">Email us directly</a> and we will get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};
