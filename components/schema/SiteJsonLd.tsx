import { combineSchemas, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/pseo/schema';
import { generatePersonSchema } from '@/lib/author';

/** Sitewide Organization + WebSite + founder Person JSON-LD */
export function SiteJsonLd() {
  const json = combineSchemas(
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generatePersonSchema()
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
