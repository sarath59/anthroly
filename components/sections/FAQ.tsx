"use client"

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { PRIMARY_CTA_LABEL } from '@/lib/site';
import { GlowPulse, ScaleOnScroll } from '../ui/animated-elements';

const faqs = [
  {
    question: "What makes an agent different from an automation?",
    answer: "An automation is a rule: when X happens, do Y. It has no judgment, so the first unexpected input breaks it. An agent is handed an outcome instead of a script — it gathers context, decides the next move, executes across your tools, checks its own result, and adjusts. When something falls outside its authority, it stops and asks a person rather than guessing."
  },
  {
    question: "Which functions do you build agents for?",
    answer: "Four. SEO agents run research, content briefs, technical fixes, and AI-search visibility. Sales agents research and enrich leads, run outbound, handle replies, and keep your CRM clean. Marketing agents build and distribute content across platforms. Support agents resolve tickets end to end and escalate the rest with full context. They share one memory, so what support learns changes what marketing publishes."
  },
  {
    question: "Is this just a wrapper around ChatGPT?",
    answer: "No. A chat model answers questions; an agent finishes work. Ours get real tools and permissions inside your stack — CRM, inbox, CMS, helpdesk, analytics — plus a mapped workflow, memory of what happened last time, and a verification step at every handoff. The language model is one component, roughly the way an engine is one component of a car."
  },
  {
    question: "You claim 100% precision. What does that actually mean?",
    answer: "It means nothing counts as done until it has been checked. Every step is validated against the rules we agreed during mapping, every action is logged with the reasoning behind it, and anything customer-facing or irreversible waits for human approval. When an agent is not confident, it escalates instead of improvising. The precision comes from verification and sign-off — not from trusting a model blindly."
  },
  {
    question: "So what do the humans actually do?",
    answer: "The judgment work, deliberately. A dedicated account manager owns your relationship. Writers write every blog and social article. Real people run backlink outreach, because editors respond to humans, not templates. Editors fact-check before anything publishes. The agents carry the volume; the people carry the taste and the accountability."
  },
  {
    question: "Do you still offer human-led SEO?",
    answer: "Yes — unchanged, and included. 15 human-written blogs, 15–25 high-DR backlinks, 15 AI Q&A pages, technical fixes, and AI-search visibility work every month. What changed is that an agent now handles the research, monitoring, and internal linking around our writers, so the same team ships considerably more without cutting corners."
  },
  {
    question: "What can I expect in the first 30 days?",
    answer: "Your agents are executing within 72 hours. By day 30 you will typically have four agents in production, 15 published blogs, 15–25 new backlinks, 15 AI Q&A pages, 20 custom tools, 50+ AI brand mentions, and a weekly log of every action taken. Compounding effects — rankings, citations, pipeline — accelerate through months two and three."
  },
  {
    question: "What happens when an agent gets something wrong?",
    answer: "Every action is logged with its inputs, reasoning, and result, so a mistake is traceable in seconds instead of argued about for a week. Anything irreversible requires human approval before it runs at all. When something does go wrong we fix it, then change the workflow rules so it cannot recur — and you see that change in your weekly report."
  },
  {
    question: "How long until my agents are live?",
    answer: "Workflow mapping call within 24 hours. First agent executing within 48. All four in production within 72. There is no six-week discovery phase — we map one workflow properly, get it running, and expand from there."
  },
  {
    question: "Which tools do you integrate with?",
    answer: "Anything with an API, and the usual suspects out of the box: HubSpot and most CRMs, Gmail and Outlook, Slack, Notion, Zendesk, Intercom, WordPress, Webflow, Shopify, Google Analytics and Search Console. If something in your stack is genuinely closed off, we tell you before you pay rather than after."
  },
  {
    question: "How much of my time does this require?",
    answer: "One 30-minute onboarding call, then a mapping session per agent so we learn how the work really flows. After that, roughly twenty minutes a week: read what your agents did, approve whatever is waiting on you. No hands-on execution required."
  },
  {
    question: "Do you offer white-label agents for agencies?",
    answer: "Yes. Your clients see your brand, you keep the relationship, and the agents run quietly behind it. Ideal if you want to serve more accounts without hiring more juniors to run the same checklists."
  },
  {
    question: "What if it does not work for me?",
    answer: `That is what the promise is for. If we miss any core 30-day commitment — four agents live, 15 blogs, 15–25 high-DR backlinks, 20 tools, or 50+ AI brand mentions — you get a free month of service. Click ${PRIMARY_CTA_LABEL} to book a 30-minute call and we send onboarding details the same day.`
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
            Still have questions? <a href="mailto:sharatth@anthroly.com" className="text-emerald-400 font-semibold underline hover:no-underline">Email us directly</a> and we will get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};
