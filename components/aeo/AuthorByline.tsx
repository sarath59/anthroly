import { SITE_AUTHOR } from '@/lib/author';

export function AuthorByline({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-400 ${className}`}>
      <div>
        <p className="text-white font-medium">{SITE_AUTHOR.name}</p>
        <p>{SITE_AUTHOR.jobTitle}</p>
      </div>
      <p className="sm:border-l sm:border-gray-700 sm:pl-4 max-w-xl leading-relaxed">
        {SITE_AUTHOR.bio}
      </p>
    </div>
  );
}
