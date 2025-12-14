import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, ArrowRight, Sparkles } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Anthroly</span> Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Deep dives into the future of search, the art of human writing, and the science of automated growth.
          </p>
        </div>

        {/* Featured Article (The "One Blog") */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
              {/* Abstract Article Image/Gradient */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-900 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center">
                <Sparkles className="text-cyan-400/20 w-32 h-32 animate-pulse" />
              </div>
              <div className="absolute bottom-6 left-6 z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-medium mb-3">
                  <span>SEO Strategy</span>
                </div>
              </div>
            </div>
            
            <CardHeader className="p-8 md:p-10 pb-0">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-cyan-400" />
                  <span>December 14, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-cyan-400" />
                  <span>8 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-cyan-400" />
                  <span>Sarah Mitchell, Senior Editor</span>
                </div>
              </div>
              
              <CardTitle className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                Why &quot;Good Enough&quot; SEO Content Is Killing Your Rankings (And Why Human Nuance is the Antidote)
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8 md:p-10 pt-4">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-8 font-light border-l-4 border-cyan-500 pl-6 italic">
                  &quot;In an ocean of AI-generated noise, the most valuable signal is a distinctly human voice.&quot;
                </p>

                <p className="text-gray-400 mb-6">
                  Let&apos;s be honest. The internet is currently drowning in sludge. You know exactly what I&apos;m talking about. You search for an answer, click a link, and are immediately greeted by five paragraphs of robotic fluff that starts with <em>&quot;In the fast-paced world of digital landscape today...&quot;</em> and ends without actually saying anything of substance.
                </p>

                <p className="text-gray-400 mb-6">
                  That is the sound of the internet eating itself. And it represents the single biggest opportunity for your business in 2025.
                </p>

                <h3 className="text-2xl font-bold text-white mt-10 mb-4">The &quot;Uncanny Valley&quot; of Text</h3>
                <p className="text-gray-400 mb-6">
                  We&apos;ve all developed a new sense. Call it &quot;AI Radar.&quot; We can smell ChatGPT-generated content from a mile away. It&apos;s not that the grammar is wrong—in fact, the grammar is usually <em>too</em> perfect. It&apos;s that the rhythm is flat. The metaphors are clichéd. There is a distinct lack of lived experience.
                </p>
                <p className="text-gray-400 mb-6">
                  When a reader encounters this, they bounce. Immediately. And Google&apos;s latest algorithm updates (specifically the evolution of E-E-A-T) are tracking those bounce rates with ruthless precision. If users don&apos;t find your content helpful, engaging, and &quot;human,&quot; your rankings will tank. Period.
                </p>

                <h3 className="text-2xl font-bold text-white mt-10 mb-4">Why Human Writing Wins (Mathematically)</h3>
                <p className="text-gray-400 mb-6">
                  It might seem counterintuitive. If AI can generate 100 articles in the time it takes a human to write one, shouldn&apos;t AI win on volume?
                </p>
                <p className="text-gray-400 mb-6">
                  In 2023, maybe. In 2025? No. Here&apos;s why:
                </p>
                <ul className="list-disc list-inside space-y-3 text-gray-400 mb-8 ml-4">
                  <li><strong>Nuance & Context:</strong> A human writer understands <em>why</em> a user is searching, not just <em>what</em> they are searching for. We anticipate the frustration, the confusion, and the specific pain points that an LLM simply hallucinates past.</li>
                  <li><strong>Original Research:</strong> AI summarizes what already exists. Humans create new knowledge. Google rewards information gain—new stats, new opinions, new angles—not regurgitation.</li>
                  <li><strong>Emotional Resonance:</strong> People buy from people. A story about how you failed, learned, and pivoted builds trust. A bulleted list generated by a bot builds nothing.</li>
                </ul>

                <h3 className="text-2xl font-bold text-white mt-10 mb-4">The Anthroly Approach</h3>
                <p className="text-gray-400 mb-6">
                  This is why we built Anthroly the way we did. We realized that while <strong>backlinks</strong> (the authority signal) could be automated through smart AI agents that work 24/7, the <strong>content</strong> (the trust signal) had to remain sacrosanct.
                </p>
                <p className="text-gray-400 mb-6">
                  Our articles are written by vetted human experts. Real people with pulses, opinions, and caffeine addictions. They write content that passes every AI detector with a 0% AI score—not because we &quot;bypass&quot; detectors, but because the content is genuinely 100% human.
                </p>
                <p className="text-gray-400 mb-8">
                  The result? Content that holds attention. Backlinks that build authority. And a growth engine that doesn&apos;t just trick the algorithm, but actually serves the user.
                </p>

                <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-8 mt-12">
                  <h4 className="text-xl font-bold text-white mb-2">Ready to publish content that actually ranks?</h4>
                  <p className="text-gray-400 mb-6">
                    Stop settling for &quot;good enough&quot; AI slop. Get 30 human-written articles and automated backlinks for one flat monthly price.
                  </p>
                  <div className="flex items-center gap-4">
                    <a href="/#pricing" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                      Start Growing Today
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
