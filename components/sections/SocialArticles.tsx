import React from 'react';
import { Mail, RefreshCw, ShieldCheck, TrendingUp, Users, CheckCircle2, MessageSquare } from 'lucide-react';
import { GlowPulse } from '../ui/static-fx';
import { DAILY_UPDATE_LINE } from '@/lib/site';

export const SocialArticles = () => {

  const sequences = [
    {
      icon: Mail,
      name: "First touch",
      color: "bg-blue-600",
      description: "A personalized reason to write — not a template with a first name pasted in.",
    },
    {
      icon: RefreshCw,
      name: "Bump-back",
      color: "bg-black",
      description: "The agent follows up until they reply or we kill it. You do not babysit the thread.",
    },
    {
      icon: ShieldCheck,
      name: "Proof in the thread",
      color: "bg-green-600",
      description: "When a high-quality link lands, the next email can cite it. Cold stops feeling cold.",
    }
  ];

  return (
    <section id="social" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <GlowPulse className="bottom-1/3 left-0" color="blue" size={500} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
            <Mail size={16} />
            <span>Follow-ups your prospects actually read</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            The outreach agent doesn&apos;t send once and hope.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Not a social calendar.</span> Sequences, bump-backs, and proof in the thread. The agent follows up until they reply or we kill it. You take the conversation.
          </p>
        </div>

        <div className={`grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 transition-all duration-1000 delay-200 opacity-100 translate-y-0`}>
          {sequences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 delay-300 opacity-100 translate-x-0`}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Why follow-up volume beats founder willpower
            </h3>
            
            <div className="space-y-6 mb-8">
              <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Most deals die in silence</h4>
                    <p className="text-gray-400 text-sm">The first email is rarely the one they answer. The agent keeps the thread alive so you do not have to remember who went quiet on Tuesday.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Users className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Kill-switch is human</h4>
                    <p className="text-gray-400 text-sm">Personalized. No junk. If a sequence should stop, we stop it. Volume without a kill-switch is how domains die.</p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">You take the conversation</h4>
                    <p className="text-gray-400 text-sm">{DAILY_UPDATE_LINE} When they write back, it lands with you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-400 opacity-100 translate-x-0`}>
            <div className="bg-black text-white rounded-3xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-6">What a sequence actually looks like</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-blue-400" size={18} />
                    <span className="text-sm text-gray-400">Email 1 · First touch</span>
                  </div>
                  <p className="text-white font-medium mb-2">&quot;Saw [specific reason]. Worth a 15-minute look?&quot;</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Personalized</span>
                    <span>•</span>
                    <span>One ask</span>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="text-white" size={18} />
                    <span className="text-sm text-gray-400">Email 2–4 · Bump-backs</span>
                  </div>
                  <p className="text-white font-medium mb-2">&quot;Still the wrong time — or the wrong thread?&quot;</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Until they reply</span>
                    <span>•</span>
                    <span>Or we kill it</span>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="text-green-400" size={18} />
                    <span className="text-sm text-gray-400">Proof · When a link lands</span>
                  </div>
                  <p className="text-white font-medium mb-2">&quot;New editorial mention landed — here is why this is not a cold pitch.&quot;</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Authority in the thread</span>
                    <span>•</span>
                    <span>No junk links</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">You do:</span>
                  <span className="text-emerald-400 font-bold">Take the conversation</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-blue-400 flex-shrink-0" size={18} />
                <span>Written in your voice. Approved by you.</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-blue-400 flex-shrink-0" size={18} />
                <span>Follow-ups that do not forget, freeze, or get tired</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-blue-400 flex-shrink-0" size={18} />
                <span>Replies routed to you — the agent hunts, you close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
