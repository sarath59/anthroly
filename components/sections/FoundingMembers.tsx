import React from 'react';
import { Users, Sparkles, TrendingUp, Shield, Clock } from 'lucide-react';
import { GlowPulse, GradientBeam, SpotlightCard } from '../ui/static-fx';
import { CONNECT_FEE_LABEL, PACKAGE_RETAINER, PACKAGE_SETUP } from '@/lib/site';

export const FoundingMembers = () => {

  const benefits = [
    {
      icon: Users,
      title: "Dedicated Human Support",
      description: "A real person onboards you, watches both agents, and sends you a daily update."
    },
    {
      icon: TrendingUp,
      title: "Daily updates. We run them.",
      description: "You approve ICP and voice. We set up, maintain, and operate both agents — and you get a daily update."
    },
    {
      icon: Shield,
      title: "$216 to start. $1,000 when you are happy.",
      description: "Then $500/month to maintain and run both agents — with daily updates. Not happy at any point? We refund the $1,000 setup fee."
    },
    {
      icon: Sparkles,
      title: "Two agents, not two jobs",
      description: "1,000 emails a day. High-quality backlinks 24/7. You stay the founder. They hunt."
    }
  ];

  return (
    <section id="founding-members" className="py-16 md:py-20 bg-transparent relative overflow-hidden">
      <GlowPulse className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="amber" size={600} />
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 opacity-100 translate-y-0`}>
          
          {/* Main Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30 rounded-3xl blur-xl opacity-50"></div>
            
            <div className="relative bg-gray-900/90 border border-amber-500/30 rounded-3xl p-8 md:p-12">
              <GradientBeam color="amber" />
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full text-sm font-bold shadow-lg">
                  <Clock size={16} />
                  <span>Only {COHORT_SLOTS} slots this round</span>
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-10 pt-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Only 10 people. We run the agents.
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  {CONNECT_FEE_LABEL} starts the setup. Once you are happy, a {PACKAGE_SETUP} one-time setup fee.
                  Then {PACKAGE_RETAINER}/month to run both agents — with a daily update. Not a dashboard you log into alone.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div 
                      key={index}
                      className="flex gap-4 p-4 bg-black/30 rounded-xl border border-gray-800"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <Icon className="text-amber-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust Note */}
              <div className="text-center p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-gray-300 text-sm">
                  <span className="text-amber-400 font-semibold">Why we&apos;re different:</span> Most tools leave you to figure it out alone. 
                  We&apos;re a human team that does the work with you in the loop. <span className="text-white font-medium">You&apos;re never on your own.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
