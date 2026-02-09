"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, BookOpen, Share2, Users, TrendingUp, MessageCircle, Heart, Repeat2 } from 'lucide-react';

export const SocialArticles = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const platforms = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "blue",
      description: "Long-form articles that establish you as a thought leader and drive B2B traffic",
      stats: { reach: "2.3M", engagement: "12%" }
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      color: "gray",
      description: "Threads and posts optimized for virality and engagement in your niche",
      stats: { reach: "1.8M", engagement: "8%" }
    },
    {
      name: "Medium",
      icon: BookOpen,
      color: "green",
      description: "SEO-optimized articles that rank on Google and Medium's internal search",
      stats: { reach: "950K", engagement: "15%" }
    }
  ];

  return (
    <section id="social" ref={sectionRef} className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
            <Share2 size={16} />
            <span>Feature #7</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            SEO/GEO Optimized Social Articles
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            Google isn't the only place people discover brands. <span className="text-white font-semibold">LinkedIn, X, and Medium</span> are search engines too. We create content that ranks on all of them — expanding your reach exponentially.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className={`grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <div 
                key={index}
                className="p-6 md:p-8 bg-gray-900/80 border border-gray-800 rounded-3xl hover:border-blue-500/30 transition-all"
              >
                <div className={`w-14 h-14 bg-${platform.color}-500/20 rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className={`text-${platform.color}-400`} size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{platform.name}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{platform.description}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                  <div>
                    <div className="text-xl font-bold text-white">{platform.stats.reach}</div>
                    <div className="text-xs text-gray-500">Potential Reach</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-emerald-400">{platform.stats.engagement}</div>
                    <div className="text-xs text-gray-500">Avg. Engagement</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Example Post Mock */}
        <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white text-black rounded-2xl p-6 shadow-xl">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
              <div>
                <div className="font-bold">Your Brand</div>
                <div className="text-sm text-gray-500">CEO & Founder • 2nd</div>
              </div>
              <div className="ml-auto">
                <Linkedin className="text-blue-600" size={20} />
              </div>
            </div>
            
            {/* Post Content */}
            <div className="mb-4">
              <p className="text-gray-800 leading-relaxed">
                <span className="font-bold">I spent 3 years building the wrong product.</span>
                <br /><br />
                Here's what I wish someone told me earlier about product-market fit...
                <br /><br />
                <span className="text-blue-600">1. Talk to 100 customers before writing a single line of code</span>
                <br />
                Not 10. Not 50. One hundred.
                <br /><br />
                The insights compound. By customer #80, you'll see patterns you never noticed at #20.
                <br /><br />
                <span className="text-gray-500">... see more</span>
              </p>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-2 text-sm text-gray-500 pb-3 border-b">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
                <div className="w-5 h-5 bg-orange-500 rounded-full border-2 border-white"></div>
              </div>
              <span>2,847 reactions • 234 comments • 89 reposts</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-around pt-3">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Heart size={18} />
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <MessageCircle size={18} />
                <span className="text-sm">Comment</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Repeat2 size={18} />
                <span className="text-sm">Repost</span>
              </button>
            </div>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-4">
            Example of content we create for your LinkedIn profile
          </p>
        </div>

        {/* Benefits */}
        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
              <Users className="text-blue-400 mb-4" size={28} />
              <h3 className="text-xl font-bold mb-2">Build Authority</h3>
              <p className="text-gray-400">
                Consistent, valuable content positions you as the go-to expert in your space. When people think of your category, they think of you.
              </p>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
              <TrendingUp className="text-emerald-400 mb-4" size={28} />
              <h3 className="text-xl font-bold mb-2">Multi-Channel Growth</h3>
              <p className="text-gray-400">
                One piece of content gets repurposed across platforms. Maximum impact, minimum effort. That's leverage.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Insight */}
        <div className={`mt-12 text-center max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-400">
            <span className="text-white font-semibold">GEO (Generative Engine Optimization)</span> is the new frontier. AI assistants pull from these platforms when answering questions. If you're not there, you're invisible to the next generation of search.
          </p>
        </div>
      </div>
    </section>
  );
};
