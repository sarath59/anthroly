import { APAC_CITY_SLUGS } from './data/apac-markets';
import { seoLocations } from './data/locations';

export function getApacCitySpokes(): { slug: string; city: string; country: string }[] {
  const seen = new Set<string>();
  const unique = seoLocations.filter((location) => {
    if (seen.has(location.slug)) return false;
    seen.add(location.slug);
    return true;
  });
  const bySlug = new Map(unique.map((location) => [location.slug, location]));

  return APAC_CITY_SLUGS.map((slug) => {
    const location = bySlug.get(slug);
    return {
      slug,
      city: location?.city ?? slug.replace(/-/g, ' '),
      country: location?.country ?? '',
    };
  });
}
