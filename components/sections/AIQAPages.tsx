import React from 'react';
import { 
  MessageCircleQuestion, 
  Bot, 
  Search, 
  CheckCircle2, 
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  ArrowRight
} from 'lucide-react';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from '../ui/button';
import { GlowPulse } from '../ui/static-fx';

export const AIQAPages = () => {

  const objections = [
    { name: "Price", description: "Too expensive / later" },
    { name: "Timing", description: "Not this quarter" },
    { name: "Incumbent", description: "We already have a vendor" },
    { name: "Trust", description: "Never heard of you" },
    { name: "Busy", description: "No time for a call" },
  ];

  const features = [
    {
      icon: MessageCircleQuestion,
      title: "Objection library",
      description: "The real reasons they don't reply — mapped once, used in every sequence."
    },
    {
      icon: Target,
      title: "Intent-matched angles",
      description: "Different proof for a VP who just hired a competitor vs one who has never heard of you."
    },
    {
      icon: Bot,
      title: "Agent-ready copy",
      description: "Short, specific, human. The kind of email you'd send if you had time for ten accounts, not a thousand."
    },
    {
      icon: TrendingUp,
      title: "Reply routing",
      description: "When they write back, it lands with you. The agent hunts. You take the conversation."
    },
  ];

  const exampleObjections = [
    "We already have someone for this",
    "Not in the budget this quarter",
    "Send me something and I'll look later",
    "How is this different from [incumbent]?",
    "Who else in [category] uses you?",
    "Can we start with a smaller test?",
  ];

  return (
    <section 
      id="ai-qa-pages" 
      
      className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden"
    >
      <GlowPulse className="top-1/4 right-0" color="purple" size={500} />
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[200px]"></div>
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">
            <Sparkles size={16} />
            <span>Every reply is an objection the agent already handled</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Copy That Gets Replies, Not{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Silence
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Prospects don&apos;t ghost because they hate you. They ghost because the email had no answer. <span className="text-white font-semibold">The outreach agent is trained on your objections</span> — price, timing, &quot;we already have a vendor&quot; — so the follow-up does the work you never have time for.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 delay-100 opacity-100 translate-y-0`}>
          {/* Left: Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex gap-4 p-5 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <feature.icon className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: AI Engines + Stats */}
          <div className="space-y-8">
            {/* AI Engines We Target */}
            <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Bot className="text-purple-400" size={24} />
                Objections the agent already handled
              </h3>
              <div className="space-y-3">
                {objections.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                    <span className="text-white font-medium">{item.name}</span>
                    <span className="text-purple-300 text-sm">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <div className="text-3xl font-bold text-purple-400 mb-1">$216</div>
                <div className="text-xs text-gray-500">Start fee</div>
              </div>
              <div className="text-center p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <div className="text-3xl font-bold text-purple-400 mb-1">$1,000</div>
                <div className="text-xs text-gray-500">Go-live</div>
              </div>
              <div className="text-center p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <div className="text-3xl font-bold text-purple-400 mb-1">$500</div>
                <div className="text-xs text-gray-500">Then / month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Questions Section */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-200 opacity-100 translate-y-0`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            Objections the follow-up already answers
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {exampleObjections.map((question, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl"
              >
                <MessageCircleQuestion className="text-purple-400 flex-shrink-0" size={20} />
                <span className="text-gray-300 text-sm">&quot;{question}&quot;</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            We lock your real objections during the start fee — then the outreach agent uses them in every sequence.
          </p>
        </div>

        {/* How It Works */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-300 opacity-100 translate-y-0`}>
          <div className="p-8 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 border border-purple-500/20 rounded-3xl">
            <h3 className="text-2xl font-bold text-center mb-8">How objection-ready copy ships</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-purple-400" size={24} />
                </div>
                <div className="text-sm font-semibold text-white mb-2">1. Lock objections</div>
                <p className="text-xs text-gray-500">We map why your buyers actually go silent</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircleQuestion className="text-purple-400" size={24} />
                </div>
                <div className="text-sm font-semibold text-white mb-2">2. Write angles</div>
                <p className="text-xs text-gray-500">Short, specific replies in your voice — not a template dump</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-purple-400" size={24} />
                </div>
                <div className="text-sm font-semibold text-white mb-2">3. Load the agent</div>
                <p className="text-xs text-gray-500">Sequences use those answers in every follow-up</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-purple-400" size={24} />
                </div>
                <div className="text-sm font-semibold text-white mb-2">4. You take the reply</div>
                <p className="text-xs text-gray-500">When they write back, it lands with you</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 delay-400 opacity-100 translate-y-0`}>
          <p className="text-gray-400 mb-6">
            Start with the $216 start fee. We set up the agents; you pay $1,000 go-live once you are happy. Then $500/month to run them with daily updates.
          </p>
          <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-400 hover:to-indigo-400 rounded-full font-bold shadow-lg shadow-purple-500/20"
            >
              {PRIMARY_CTA_LABEL}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
