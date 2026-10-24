import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function PageHead({
  back,
  eyebrow,
  title,
  lede,
}: {
  back?: { href: string; label: string };
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="grain pt-[68px]">
      <div className="page-x">
        <div className="flex items-center justify-between border-b border-rule py-4">
          {back ? (
            <Link href={back.href} className="eyebrow flex items-center gap-2 transition-colors hover:text-ink">
              <ArrowLeft size={13} />
              {back.label}
            </Link>
          ) : (
            <span />
          )}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        </div>
        <div className="mx-auto max-w-4xl pb-14 pt-16 text-center lg:pt-20">
          <h1 className="font-serif text-display-lg text-balance">{title}</h1>
          {lede && (
            <p className="mx-auto mt-8 max-w-2xl text-[20px] leading-[1.55] text-ink-muted text-pretty">{lede}</p>
          )}
        </div>
      </div>
    </header>
  );
}

export const RESOURCE_LINKS = [
  { href: '/research/glossary', label: 'Glossary of post-training terms' },
  { href: '/research/compare', label: 'Method comparisons' },
  { href: '/research/eval-sample-size-calculator', label: 'Eval sample size calculator' },
  { href: '/blog', label: 'Research blog' },
];

export function ResourceNav() {
  return (
    <nav aria-label="Research resources" className="mt-16 border-t border-rule pt-8">
      <p className="eyebrow">More research resources</p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
        {RESOURCE_LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink-muted underline decoration-rule underline-offset-4 hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function linkLabel(href: string): string {
  const map: Record<string, string> = {
    '/blog/reward-hacking-rubric-based-rl': 'How do you stop reward hacking in rubric-based RL?',
    '/blog/what-makes-a-training-grade-rl-environment': 'What makes an RL environment training-grade?',
    '/blog/how-to-evaluate-a-reward-model': 'How to evaluate a reward model before you train',
    '/blog/annotator-disagreement-in-preference-data': 'When annotators disagree: preference disagreement as signal',
    '/blog/how-reliable-are-rlvr-verifiers': 'How reliable are verifiers in RLVR?',
    '/blog/how-much-data-to-fine-tune-a-reasoning-model': 'How much data do you need to fine-tune a reasoning model?',
    '/blog/how-expert-written-benchmarks-are-built': 'How are expert-written benchmarks like GPQA and HLE built?',
    '/blog/how-to-evaluate-deep-research-agents': 'How do you evaluate deep research agents?',
    '/blog/how-to-choose-prompts-for-rlvr-training': 'How do you choose training prompts for RLVR?',
    '/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl': 'GRPO vs PPO vs DAPO: which RL algorithm for reasoning?',
    '/expert-data': 'Expert data at Anthroly',
    '/research/eval-sample-size-calculator': 'Eval sample size calculator',
    '/learn/agent-trajectory-data': 'Agent trajectory data',
    '/learn/rlhf-preference-data': 'RLHF preference data',
    '/learn/evaluation-datasets-contamination': 'Evaluation datasets and contamination',
  };
  if (map[href]) return map[href];
  if (href.startsWith('/research/compare/')) return 'Compare: ' + href.slice(18).replace(/-/g, ' ');
  if (href.startsWith('/research/glossary#')) return 'Glossary: ' + href.slice(19).replace(/-/g, ' ');
  return href;
}
