import Link from 'next/link';
import { ReactNode } from 'react';
import { AuthorByline } from './AuthorByline';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';

interface AeoPageShellProps {
  eyebrow?: string;
  h1: string;
  directAnswer: string;
  children: ReactNode;
  jsonLd?: string;
}

export function AeoPageShell({
  eyebrow = 'Answer Engine Optimization',
  h1,
  directAnswer,
  children,
  jsonLd,
}: AeoPageShellProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#111_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40" />
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/aeo" className="hover:text-emerald-400">AEO</Link>
          </nav>

          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-3">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            {h1}
          </h1>

          <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              Key answer
            </p>
            <p className="text-base md:text-lg text-white leading-relaxed">
              {directAnswer}
            </p>
          </div>

          <AuthorByline className="mb-8" />
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl prose-invert">
          {children}
        </div>
      </section>

      <section className="py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want help getting cited in AI answers?
          </h2>
          <p className="text-gray-400 mb-8">
            Start with the $216 Founder Growth Diagnostic. Humans do the citation work; machines help us scale.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black rounded-full font-semibold">
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
            <Link href="/#pricing">
              <Button variant="outline" className="border-gray-700 text-white rounded-full">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
