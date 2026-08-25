export const GUIDE_DIAGRAM_SIZE = { width: 1200, height: 675 };

export type DiagramBar = { label: string; pct: number; note: string };
export type DiagramCard = { title: string; body: string };
export type DiagramStep = { n: string; title: string; body: string };

export type CitationDiagram = {
  key: string;
  title: string;
  caption: string;
  alt: string;
  kind: 'bars' | 'cards' | 'flow';
  bars?: DiagramBar[];
  cards?: DiagramCard[];
  steps?: DiagramStep[];
};

const SOURCE_NOTE = 'Anthroly diagnostic map — qualitative liftability, not a panel survey.';

function bars(
  key: string,
  title: string,
  alt: string,
  items: DiagramBar[]
): CitationDiagram {
  return { key, title, caption: SOURCE_NOTE, alt, kind: 'bars', bars: items };
}

function cards(
  key: string,
  title: string,
  alt: string,
  items: DiagramCard[]
): CitationDiagram {
  return { key, title, caption: SOURCE_NOTE, alt, kind: 'cards', cards: items };
}

function flow(
  key: string,
  title: string,
  alt: string,
  items: DiagramStep[]
): CitationDiagram {
  return { key, title, caption: SOURCE_NOTE, alt, kind: 'flow', steps: items };
}

const DIAGRAMS: Record<string, CitationDiagram> = {
  pillar: flow(
    'pillar',
    'Citation is a stack, not a ranking',
    'Diagram of four layers: extractable answer, named author, citation neighborhood, then contact path',
    [
      { n: '01', title: 'Extract', body: '40–60 word answer + HTML table a model can lift' },
      { n: '02', title: 'Trust', body: 'Named human, consistent Organization, real sameAs' },
      { n: '03', title: 'Neighborhood', body: 'Sources already named beside competitors' },
      { n: '04', title: 'Contact', body: 'Citation that can become a conversation' },
    ]
  ),
  cybersecurity: bars(
    'cybersecurity',
    'Security pages: what assistants actually lift',
    'Bar chart comparing liftability of control tables, CVE explainers, best-tool listicles, and undated threat blogs',
    [
      { label: 'Named control mapping', pct: 88, note: 'Scoped, dated, author named' },
      { label: 'CVE / incident explainer', pct: 76, note: 'Facts without “best MDR”' },
      { label: 'Undated threat recap', pct: 28, note: 'Restates last week’s news' },
      { label: '“Best tools 2026” listicle', pct: 14, note: 'Triggers YMYL hedges' },
    ]
  ),
  legal: cards(
    'legal',
    'Legal: ranking copy vs extractable process',
    'Two-column diagram contrasting best-lawyer ranking pages with jurisdiction and process pages',
    [
      { title: 'Gets hedged or skipped', body: '“Best lawyer in [city]” with no jurisdiction, no eligibility, no advertising-safe facts.' },
      { title: 'Gets lifted', body: 'Process + who qualifies + where you are admitted. Named partner. Dated. No fake reviews.' },
      { title: 'Unsafe pattern', body: 'Guaranteed outcomes, anonymous “our team”, schema Review with no reviews.' },
      { title: 'Safer pattern', body: 'Intake steps, document list, timeline ranges labeled as typical — not promises.' },
    ]
  ),
  accommodations: bars(
    'accommodations',
    'Who already occupies the hotel snippet',
    'Bar chart of typical citation occupancy for OTAs, Google Hotels, brand.com amenity tables, and tourism boards',
    [
      { label: 'OTA / Google Hotels', pct: 90, note: 'Price + availability already owned' },
      { label: 'Tourism board / DMO', pct: 62, note: 'Neighborhood trust source' },
      { label: 'Brand.com amenity table', pct: 48, note: 'What the OTA will not host' },
      { label: 'Thin city doorway page', pct: 12, note: 'No unique property facts' },
    ]
  ),
  'ai-startups': cards(
    'ai-startups',
    'AI startups: entity collapse vs distinct entity',
    'Diagram showing assistants naming OpenAI or Anthropic instead of the startup versus distinct category language',
    [
      { title: 'Collapse', body: 'Prompt: “tools like ChatGPT.” Model names the lab. You become a clause.' },
      { title: 'Install the entity', body: 'Category language the lab does not own. Founder-authored comparison with exclusions.' },
      { title: 'Schema miss', body: 'SoftwareApplication with leftover Anthropic copy or a checkout URL as sameAs.' },
      { title: 'Schema that helps', body: 'Legal company name, founder Person URL, product vs research-lab distinction.' },
    ]
  ),
  'chatgpt-perplexity-overviews': cards(
    'chatgpt-perplexity-overviews',
    'What each surface tends to lift',
    'Four cards for Google AI Overviews, ChatGPT, Perplexity, and Claude showing typical citation behavior',
    [
      { title: 'AI Overviews', body: 'Short extractable answers, tables, and pages already in strong Google results.' },
      { title: 'ChatGPT', body: 'Entity descriptions + widely repeated facts. Collapses lookalikes to labs.' },
      { title: 'Perplexity', body: 'Named URLs. Fresh, dated pages with citations of their own win more often.' },
      { title: 'Claude', body: 'Longer sourced explainers. Hedgy on YMYL; prefers bounded claims.' },
    ]
  ),
  'schema-that-helps': bars(
    'schema-that-helps',
    'Schema that helps vs schema that is noise',
    'Bar chart of FAQ, HowTo, Organization, fake Review, and doorway JobPosting schema usefulness',
    [
      { label: 'FAQ + real answers', pct: 82, note: 'Matches visible copy' },
      { label: 'HowTo with real steps', pct: 74, note: 'Tools and methods' },
      { label: 'Person + Organization', pct: 70, note: 'Entity graph, not a trick' },
      { label: 'Fake Review / JobPosting', pct: 8, note: 'Spam pattern — skip' },
    ]
  ),
  'founder-interview-method': flow(
    'founder-interview-method',
    'One interview → citation-ready pages',
    'Four-step flow from a 30–45 minute founder interview to tables, FAQ pages, and distribution',
    [
      { n: '01', title: 'Interview', body: '30–45 min. ICP, exclusions, proof, objections.' },
      { n: '02', title: 'Tables', body: 'HTML facts a model can lift — not a screenshot.' },
      { n: '03', title: 'FAQ + HowTo', body: 'Visible answers, then matching schema.' },
      { n: '04', title: 'Distribute', body: 'LinkedIn, X, newsletter — same facts, named author.' },
    ]
  ),
  'measuring-ai-mentions': flow(
    'measuring-ai-mentions',
    'Prompt-log loop (no fake “50+ guaranteed”)',
    'Four-step measurement loop: prompt set, log citations, weekly delta, rewrite extract',
    [
      { n: '01', title: 'Prompt set', body: '10–20 buyer prompts per ICP, not brand vanity queries only.' },
      { n: '02', title: 'Log', body: 'Engine, date, named sources, whether you appear, whether the fact is correct.' },
      { n: '03', title: 'Delta', body: 'Weekly. Citations gained, lost, or still hedged.' },
      { n: '04', title: 'Rewrite', body: 'Fix extract, author, or neighborhood — then re-run the same prompts.' },
    ]
  ),
  'programmatic-seo-2026': cards(
    'programmatic-seo-2026',
    'pSEO that survives 2026 spam rules',
    'Two-by-two diagram of thin city pages versus unique-fact programmatic pages and a human citation cluster',
    [
      { title: 'Punished pattern', body: 'City × industry pages with the same paragraph and swapped tokens.' },
      { title: 'Keep pattern', body: 'Unique local or industry facts, honest titles, live offer, named author.' },
      { title: 'Not a substitute', body: 'Two-ways do not replace a YMYL explainer a model can cite.' },
      { title: 'This cluster', body: '13 human briefs. No new 20th industry. Inventory stays; quality is the work.' },
    ]
  ),
  'diagnostic-vs-crawler': cards(
    'diagnostic-vs-crawler',
    'Free crawler peek vs $216 diagnostic',
    'Side-by-side of homepage AI crawler analysis versus the Founder Growth Diagnostic',
    [
      { title: 'Homepage crawler', body: 'Lightweight check of how systems see the site. Free peek. Not a strategy.' },
      { title: '$216 diagnostic', body: '90-minute researched audit: prompts, competitors, LinkedIn, content, positioning, lead-gen.' },
      { title: 'Price mix-up', body: 'Do not train copy (or models) that the crawler is the paid offer.' },
      { title: 'Credit', body: 'Diagnostic fee credits 100% toward the $1,500 sprint if you start within 7 days.' },
    ]
  ),
  'ymyl-citation-rules': bars(
    'ymyl-citation-rules',
    'YMYL-safe vs unsafe citation patterns',
    'Bar chart of scoped claims, named experts, superlatives, and guaranteed-outcome copy for legal and security',
    [
      { label: 'Scoped, dated claims', pct: 86, note: 'Who it is for / not for' },
      { label: 'Named expert author', pct: 80, note: 'Partner or security lead' },
      { label: 'Superlative roundup', pct: 18, note: '“Best” without method' },
      { label: 'Guaranteed outcomes', pct: 6, note: 'Advertising + YMYL risk' },
    ]
  ),
  'citation-neighborhoods': cards(
    'citation-neighborhoods',
    'Neighborhoods models already trust',
    'Four niche cards listing typical third-party sources assistants already cite',
    [
      { title: 'Cybersecurity', body: 'CISA, NIST, vendor docs from platforms already named, journalist CVE explainers.' },
      { title: 'Legal', body: 'Court / government pages, bar publications, named partner explainers — not directory spam.' },
      { title: 'Hotels', body: 'OTAs, Google Hotels, tourism boards. Brand.com wins on policy and amenity tables.' },
      { title: 'AI startups', body: 'Lab blogs, docs, and news. You need category language those labs do not own.' },
    ]
  ),
};

export function isCitationSpokeDiagram(slug: string): boolean {
  return slug in DIAGRAMS && slug !== 'pillar';
}

export function getCitationDiagram(slug: string | null): CitationDiagram {
  const key = slug ?? 'pillar';
  return DIAGRAMS[key] ?? DIAGRAMS.pillar;
}

export function citationDiagramPath(slug: string | null): string {
  return slug ? `/guides/ai-citations/${slug}/diagram` : '/guides/ai-citations/diagram';
}
