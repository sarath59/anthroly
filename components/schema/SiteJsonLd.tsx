import { combineSchemas, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';

/** Sitewide Organization + WebSite JSON-LD */
export function SiteJsonLd() {
  const json = combineSchemas(generateOrganizationSchema(), generateWebSiteSchema());

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
