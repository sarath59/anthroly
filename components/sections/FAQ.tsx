"use client"

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How is this different from other SEO agencies?",
    answer: "Traditional agencies charge $2,000-$10,000/month and rely on manual labor. We have built proprietary AI systems that automate 90% of SEO work while maintaining quality. This lets us deliver more at a fraction of the cost. Plus, we focus on both traditional SEO and the emerging GEO (Generative Engine Optimization) for AI search engines."
  },
  {
    question: "What kind of results can I expect in 60 days?",
    answer: "Most clients see measurable improvements within the first 30 days: new backlinks appearing, blog posts ranking, and increased organic traffic. By day 60, you will typically have 40-60 new backlinks, 60 published blog posts, 20 free tools, and a significant boost in domain authority. SEO compounds over time, so month 3-6 is when you will see dramatic growth."
  },
  {
    question: "Do you work with any industry?",
    answer: "Yes! We have worked with SaaS companies, e-commerce brands, service businesses, agencies, and more. Our AI systems adapt to your specific industry, competitors, and target keywords. Whether you are B2B or B2C, selling software or services, we tailor our approach to your market."
  },
  {
    question: "What happens after the 60-day trial?",
    answer: "After 60 days, we move to results-based pricing. This means your monthly cost scales with the results we deliver — more traffic, more backlinks, better rankings = fair pricing that reflects value. We discuss specific metrics and pricing with you at the end of your trial based on what we have achieved."
  },
  {
    question: "Will these backlinks hurt my site? Are they safe?",
    answer: "Absolutely safe. We only build white-hat, editorial backlinks from real websites with genuine domain authority (DR 70-90 average). No PBNs, no link farms, no spammy directories. Every link is the kind that Google rewards, not penalizes. Our guarantee backs this up — if anything we do hurts your rankings, we will fix it immediately."
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
    answer: "That is what the guarantee is for. If we cannot deliver 20-30 high-quality backlinks per month with an average DR of 70-90, we will refund your payment and give you a free month of service. We have never had to honor this guarantee — but it is there so you have zero risk."
  },
  {
    question: "Do you offer white-label services for agencies?",
    answer: "Yes! If you are an agency looking to offer SEO services to your clients, we can white-label everything we do. Your clients see your brand, you maintain the relationship, and we do all the work behind the scenes. This is perfect for agencies looking to scale their service offerings."
  },
  {
    question: "How do I get started?",
    answer: "Just click the Start 60-Day Trial button and complete your payment. You will immediately get access to our onboarding flow, and we will schedule your kickoff call within 24 hours. Most clients are fully operational within 48 hours of signing up."
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
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(16,185,129,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-semibold mb-6 border border-gray-700">
            <HelpCircle size={16} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know before getting started.
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
