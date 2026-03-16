import { Metadata } from 'next';
import Link from 'next/link';
import {
  Wrench,
  Tag,
  Search,
  FileText,
  Type,
  BarChart3,
  Clock,
  Hash,
  Heading,
  Link as LinkIcon,
  Link2,
  Bot,
  Code,
  Share2,
  HelpCircle,
  Braces,
  PenLine,
  MousePointerClick,
  Lightbulb,
  ClipboardList,
  TrendingUp,
  ArrowRight,
  ExternalLink, 
} from 'lucide-react';
import { FREE_TOOLS, FREE_TOOL_CATEGORIES } from '@/lib/data/free-tools';
import { Button } from '@/components/ui/button';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Tag,
  Search,
  FileText,
  Type,
  BarChart3,
  Clock,
  Hash,
  Heading,
  Link: LinkIcon,
  Link2,
  Bot,
  Code,
  Share2,
  HelpCircle,
  Braces,
  PenLine,
  MousePointerClick,
  Lightbulb,
  ClipboardList,
  TrendingUp,
  Redirect: ExternalLink,
}; 

export const metadata: Metadata = {
  title: 'Free SEO Tools | 20+ Free Marketing & SEO Utilities | Anthroly',
  description: 'Use 20+ free SEO tools: meta tag generator, word counter, SERP preview, keyword density, schema generator, and more. No signup required.',
  keywords: ['free seo tools', 'meta tag generator', 'word counter', 'serp preview', 'schema generator', 'seo calculator'],
  openGraph: {
    title: 'Free SEO Tools | Anthroly',
    description: '20+ free SEO and marketing tools. Meta tags, word count, SERP preview, schema, and more.',
    url: 'https://www.anthroly.com/tools',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.anthroly.com/tools',
  },
};

export default function ToolsIndexPage() {
  const toolsByCategory = FREE_TOOL_CATEGORIES.map((cat) => ({
    ...cat,
    tools: FREE_TOOLS.filter((t) => t.category === cat.id),
  })).filter((c) => c.tools.length > 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#111_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40" />
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-sm font-medium text-teal-300 mb-6">
              <Wrench size={16} />
              <span>{FREE_TOOLS.length} Free Tools — No Signup</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Free{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                SEO & Marketing
              </span>{' '}
              Tools
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Meta tags, word count, SERP preview, schema generators, and more. Use them on any device—no account required.
            </p>
            <Link href="/#pricing">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold"
              >
                Get 20 Custom Tools Built for Your Site
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools grid by category */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {toolsByCategory.map((category) => (
              <div key={category.id} className="mb-14">
                <h2 className="text-xl font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                  {category.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.tools.map((tool) => {
                    const Icon = ICON_MAP[tool.icon] || Wrench;
                    return (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="group flex items-start gap-4 p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-teal-500/40 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/30 transition-colors">
                          <Icon size={22} className="text-teal-400 group-hover:text-teal-300" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-white group-hover:text-teal-300 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{tool.description}</p>
                          <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Use tool
                            <ArrowRight size={12} />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            Want custom tools built for your brand? We build 20 tools per month for subscribers.
          </p>
          <Link href="/#pricing">
            <Button variant="outline" size="lg" className="rounded-full">
              View pricing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
