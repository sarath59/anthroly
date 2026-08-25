import Link from 'next/link';
import { SITE_AUTHOR } from '@/lib/author';

export function AuthorByline({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-400 ${className}`}>
      <div>
        <p className="text-white font-medium">
          <Link href="/author/sarath-kavuru" className="hover:text-emerald-400 transition-colors">
            {SITE_AUTHOR.name}
          </Link>
        </p>
        <p>{SITE_AUTHOR.jobTitle}</p>
      </div>
      <p className="sm:border-l sm:border-gray-700 sm:pl-4 max-w-xl leading-relaxed">
        {SITE_AUTHOR.bio}{' '}
        <Link href="/author/sarath-kavuru" className="text-emerald-400 hover:text-emerald-300">
          Full bio
        </Link>
      </p>
    </div>
  );
}
