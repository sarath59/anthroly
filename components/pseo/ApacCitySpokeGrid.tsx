import Link from 'next/link';
import { getApacCitySpokes } from '@/lib/pseo/apac-spokes';

interface ApacCitySpokeGridProps {
  heading: string;
  description?: string;
  hrefFor: (citySlug: string) => string;
  accent?: 'emerald' | 'purple';
}

export function ApacCitySpokeGrid({
  heading,
  description,
  hrefFor,
  accent = 'emerald',
}: ApacCitySpokeGridProps) {
  const cities = getApacCitySpokes();
  const hover =
    accent === 'purple'
      ? 'hover:border-purple-500/50 hover:text-purple-300'
      : 'hover:border-emerald-500/40 hover:text-emerald-400';

  return (
    <section className="py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{heading}</h2>
        {description && <p className="text-zinc-400 mb-8 max-w-3xl">{description}</p>}
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {cities.map((city) => (
            <li key={city.slug}>
              <Link
                href={hrefFor(city.slug)}
                className={`block p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-200 transition-colors ${hover}`}
              >
                <span className="font-medium">{city.city}</span>
                {city.country ? (
                  <span className="block text-xs text-zinc-500 mt-0.5">{city.country}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
