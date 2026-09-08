export type GuideNiche =
  | 'pillar'
  | 'cybersecurity'
  | 'legal'
  | 'accommodations'
  | 'ai-startups'
  | 'method';

export type GuideFaq = { question: string; answer: string };

export type GuideTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type GuideSection = {
  heading: string;
  body: string[];
  table?: GuideTable;
  list?: string[];
};

export type GuideHowTo = {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
};

export type GuideRelated = { href: string; label: string; note: string };

export type GuidePage = {
  slug: string | null;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  datePublished: string;
  dateModified: string;
  niche: GuideNiche;
  related: GuideRelated[];
  howTo?: GuideHowTo;
  sections: GuideSection[];
  faqs: GuideFaq[];
};

export const CITATION_PILLAR_PATH = '/guides/ai-citations';
export const GUIDE_DATE_PUBLISHED = '2026-08-25';
export const GUIDE_DATE_MODIFIED = '2026-08-25';

const D = GUIDE_DATE_PUBLISHED;

function page(
  partial: Omit<GuidePage, 'datePublished' | 'dateModified' | 'path'> & { path?: string }
): GuidePage {
  const path =
    partial.path ??
    (partial.slug ? `${CITATION_PILLAR_PATH}/${partial.slug}` : CITATION_PILLAR_PATH);
  return {
    ...partial,
    path,
    datePublished: D,
    dateModified: D,
  };
}

export const citationPillar: GuidePage = page({
  slug: null,
  niche: 'pillar',
  title: 'How founders get cited in AI Overviews, ChatGPT, Perplexity, and Claude',
  metaTitle: 'How Founders Get Cited in AI Overviews & ChatGPT | Anthroly',
  metaDescription:
    'A founder-first playbook for earning citations in Google AI Overviews, ChatGPT, Perplexity, and Claude. Niche notes for cybersecurity, legal, hotels, and AI startups.',
  h1: 'How founders get cited in AI Overviews and assistants',
  directAnswer:
    'The most effective way to get cited in AI Overviews and assistants is to publish extractable answers, original tables, and named-author pages in the sources those models already trust. Rankings alone are not enough. Cybersecurity and legal pages must survive YMYL hedges; hotels must beat OTA snippets; AI startups must stay a distinct entity, not a footnote to bigger labs.',
  related: [
    { href: '/guides/ai-citations/cybersecurity', label: 'Cybersecurity citations', note: 'YMYL hedges, CVE vs product pages' },
    { href: '/guides/ai-citations/legal', label: 'Legal firm citations', note: 'Jurisdiction, advertising rules, process pages' },
    { href: '/guides/ai-citations/accommodations', label: 'Hotels & accommodations', note: 'OTA competition, amenity tables' },
    { href: '/guides/ai-citations/ai-startups', label: 'AI startup citations', note: 'Entity collapse vs OpenAI / Anthropic' },
    { href: '/aeo', label: 'AEO hub', note: 'Engine and topic playbooks' },
    { href: '/aeo/how-to-get-cited-in-ai-overviews', label: 'AI Overviews HowTo', note: 'Step-by-step citation structure' },
    { href: '/author/sarath-kavuru', label: 'Sarath Kavuru', note: 'Named author for this cluster' },
  ],
  sections: [
    {
      heading: 'What “getting cited” actually means',
      body: [
        'A citation is not a blue-link ranking. It is a named source inside a synthesized answer: Google AI Overviews, ChatGPT Search, Perplexity, Claude, Gemini. The model has to lift a fact, trust the entity, and show your brand (or URL) as the origin.',
        'Founders lose here in two ways. First, they publish marketing copy with no extractable sentence. Second, they publish extractable copy on a domain the model does not treat as a source — no author, no third-party mentions, no overlap with the citation neighborhood of their category.',
      ],
    },
    {
      heading: 'The Anthroly citation brief (what we diagnose)',
      body: [
        'In the $216 Founder Growth Diagnostic we do not score “AI SEO” as a vibe. We map buyer prompts, the sources currently named beside competitors, and whether your pages can be lifted without hallucination. The table below is the working brief, not a survey of the internet.',
      ],
      table: {
        caption: 'Anthroly Founder Growth Diagnostic — citation brief (process IP, not a panel survey)',
        headers: ['Layer', 'What we inspect', 'What “good” looks like', 'Common founder miss'],
        rows: [
          ['Discover', '10–20 buyer prompts per ICP', 'Your entity appears, with a correct one-line description', 'Tracking brand mentions of the company name only'],
          ['Extract', 'First 40–60 words + HTML tables', 'A direct answer a model can quote without rewriting', 'Hero slogans, no facts, screenshots of tables'],
          ['Trust', 'Author, Organization schema, sameAs, third-party mentions', 'Named human + consistent entity graph', 'Anonymous blog, checkout URL in Person sameAs'],
          ['Neighborhood', 'Which domains are already cited next to competitors', 'A short list of reachable sources, not a generic PR blast', 'Random guest posts with no overlap to those sources'],
          ['Contact', 'Whether citation can become a conversation', 'Clear next step (diagnostic, demo, intake)', 'AEO pages that never connect to a human'],
        ],
      },
    },
    {
      heading: 'Why niches change the playbook',
      body: [
        'Generic “write FAQ schema” advice fails as soon as the category is regulated, local, or crowded with giant labs. This cluster is built around four niches we see in diagnostics — not a 20-industry doorway matrix.',
      ],
      list: [
        'Cybersecurity: models hedge on “best” tools and prefer vendor-neutral explainers, CVE write-ups, and named control mappings over superlative listicles.',
        'Legal: jurisdiction and advertising rules make ranking-style pages dangerous; process + eligibility facts get cited more cleanly.',
        'Accommodations: OTAs and Google Hotels already occupy the snippet. Brand.com wins on policy, amenity, and “who this property is for” tables the OTA will not host.',
        'AI startups: the failure mode is entity collapse — the model describes you as “like ChatGPT / Claude” and names the lab instead. Distinct category language and founder-authored comparisons are the fix.',
      ],
    },
    {
      heading: 'What we do not do in this cluster',
      body: [
        'We do not add another programmatic city×industry matrix. The site already has an indexable inventory for that. These pages are human-authored briefs with original tables. We do not invent “62% of CISOs” statistics. Where we use numbers, they come from published Anthroly case studies or from the diagnostic process itself.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Is AEO different from ranking in Google?',
      answer:
        'Yes. Rankings can still matter for crawl and trust, but a citation is inclusion inside a synthesized answer. You can rank and never be named, or be named from a page that is not #1.',
    },
    {
      question: 'Do I need a new website to get cited?',
      answer:
        'Usually no. The diagnostic looks at whether existing pages can be rewritten answer-first, whether the entity graph is consistent, and which third-party sources already sit in your category’s citation neighborhood.',
    },
    {
      question: 'What does Anthroly charge for this work?',
      answer:
        'A $216 Founder Growth Diagnostic (credited 100% toward implementation within 7 days), then $1,500 for the 30-Day AI Authority Sprint, then $1,000/month.',
    },
  ],
});

export const citationSpokes: GuidePage[] = [
  page({
    slug: 'cybersecurity',
    niche: 'cybersecurity',
    title: 'How cybersecurity companies get cited in AI Overviews and ChatGPT',
    metaTitle: 'Cybersecurity AI Citations | AEO for Security Companies | Anthroly',
    metaDescription:
      'How MDR, GRC, and security vendors earn AI Overview and ChatGPT citations without fake “best tool” listicles. YMYL hedges, CVE pages, and control-mapping tables.',
    h1: 'AI citations for cybersecurity companies',
    directAnswer:
      'Cybersecurity vendors get cited when they publish named control mappings, scoped product facts, and incident or CVE explainers a model can lift without endorsing a “best security tool.” Superlative roundups trigger hedges. The winning page looks like a practitioner brief: who it is for, what it does not do, and which frameworks it maps to — with a named author.',
    related: [
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'Founder playbook' },
      { href: '/guides/ai-citations/ymyl-citation-rules', label: 'YMYL citation rules', note: 'Shared with legal' },
      { href: '/guides/ai-citations/citation-neighborhoods', label: 'Citation neighborhoods', note: 'Which sources models already trust' },
      { href: '/faq', label: 'Agency FAQ', note: 'How Anthroly scopes security AEO' },
      { href: '/aeo', label: 'AEO hub', note: 'Engine-level tactics' },
    ],
    sections: [
      {
        heading: 'Why AI answers hedge on security vendors',
        body: [
          'Security is YMYL-adjacent: a wrong recommendation can leak data or waste a SOC budget. Assistants therefore prefer sources that bound claims (“for Series B SaaS with SOC 2 Type II”) over “best MDR 2026.” If your homepage is a slogan and your blog is a rewritten Gartner summary, you are easy to skip.',
          'In diagnostics we see the same pattern: the model names CISA, vendor docs from a giant platform, or a journalist explainer — and describes the startup in a clause. The job is to become the explainer the model can quote, not the brand it vaguely remembers.',
        ],
      },
      {
        heading: 'Buyer prompts CISOs actually ask assistants',
        body: [
          'These are prompts we put on the diagnostic prompt log for security companies. They are not search-volume estimates. They are the questions that produce citations or hedges in ChatGPT, Perplexity, and Overviews.',
        ],
        table: {
          caption: 'Diagnostic prompt log — cybersecurity (Anthroly working set)',
          headers: ['Prompt the buyer asks', 'Typical model behavior', 'Page type that can be cited', 'What to put in the first 50 words'],
          rows: [
            ['“MDR vs MXDR for a 40-person SaaS SOC”', 'Defines terms, avoids naming a winner', 'Comparison with scope + exclusions', 'The difference is X because Y; this is for teams without a 24/7 SOC'],
            ['“Does this vendor map to SOC 2 CC6 / ISO 27001 A.8?”', 'Looks for a table, not a PDF screenshot', 'Control-mapping HTML table', 'Named controls, named product capability, dated review'],
            ['“What changed after CVE-YYYY-NNNN for product Z?”', 'Wants a dated incident note', 'CVE / advisory page with author', 'Impact, affected versions, patch, what customers should do today'],
            ['“Email security for Google Workspace vs Microsoft 365”', 'Synthesizes from vendor docs + reviews', 'Environment-specific setup HowTo', 'Prerequisites, what you must not disable, who owns DNS'],
            ['“GRC tool for startups that already have Vanta”', 'Collapses vendors into “compliance software”', 'Adjacent-job page, not a clone', 'What you add on top of Vanta; what you do not replace'],
          ],
        },
      },
      {
        heading: 'Pages that fail security AEO',
        body: [
          '“Top 10 cybersecurity tools” with no methodology. Undated threat blogs that restate last week’s news. Product pages that never say who should not buy. Schema slapped on a page with no facts. Those pages may rank for a while; they rarely become the sentence an Overview quotes.',
        ],
        list: [
          'Publish a control-mapping table in HTML, not as an image.',
          'Date the page and name the author (security lead or founder with relevant experience).',
          'State exclusions: industries, company size, or stacks you do not support.',
          'Keep Organization schema consistent with the legal company name on SOC reports.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a cybersecurity startup get cited without being in Gartner?',
        answer:
          'Yes. Analyst mentions help entity trust, but assistants also lift dated vendor docs, CVE notes, and clear comparison tables. Analyst inclusion is not a prerequisite for every prompt.',
      },
      {
        question: 'Should we write “best MDR” pages?',
        answer:
          'Not as a fake ranking. Write scoped comparisons and “how to choose” pages with criteria. Superlatives invite hedges and look like doorway content.',
      },
      {
        question: 'Where does Anthroly start with a security founder?',
        answer:
          'The $216 diagnostic maps buyer prompts, current citations beside competitors, and whether your product and docs can be extracted. Implementation is the $1,500 sprint, then $1,000/month.',
      },
    ],
  }),
  page({
    slug: 'legal',
    niche: 'legal',
    title: 'How law firms and legal companies get cited in AI search',
    metaTitle: 'Legal AI Citations | AEO for Law Firms | Anthroly',
    metaDescription:
      'How law firms and legal companies earn ChatGPT and AI Overview citations without illegal ranking claims. Jurisdiction facts, process pages, and YMYL-safe structure.',
    h1: 'AI citations for legal companies and law firms',
    directAnswer:
      'Legal companies get cited when they publish jurisdiction-scoped process facts a model can lift without inventing a “best lawyer” ranking. Advertising rules and YMYL make superlative pages risky. The pages that survive are eligibility checklists, filing timelines, and “who we do not represent” statements with a named attorney or founder author.',
    related: [
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'Founder playbook' },
      { href: '/guides/ai-citations/ymyl-citation-rules', label: 'YMYL citation rules', note: 'Shared with cybersecurity' },
      { href: '/guides/ai-citations/founder-interview-method', label: 'Founder interview method', note: 'Turn partner expertise into pages' },
      { href: '/faq', label: 'Agency FAQ', note: 'How Anthroly scopes legal AEO' },
      { href: '/aeo', label: 'AEO hub', note: 'Engine-level tactics' },
    ],
    sections: [
      {
        heading: 'The ranking page is the wrong artifact',
        body: [
          'Buyers ask ChatGPT for “best immigration lawyer in Singapore” or “best startup lawyer for a Delaware C-corp.” Models know those queries are reputation-sensitive. They hedge, invent names, or cite directories. A firm that publishes “#1 lawyer” copy trains the model to distrust the domain.',
          'The extractable alternative is a process page: who qualifies, which forms, typical timeline, what the engagement does not include, and the jurisdiction. That is information gain directories do not host.',
        ],
      },
      {
        heading: 'Query types and citation-safe page design',
        body: [
          'Use this table in editorial planning. It is how we classify legal prompts in the diagnostic — not legal advice, and not a guarantee of citation.',
        ],
        table: {
          caption: 'Legal prompt classes vs safer page types (editorial, not legal advice)',
          headers: ['Query class', 'Citation risk', 'Safer page', 'First-sentence pattern'],
          rows: [
            ['“Best [practice] lawyer in [city]”', 'Hallucinated rankings; advertising rules', 'Practice + city process page with eligibility', 'In [jurisdiction], [matter] typically requires [steps]; this firm handles [scope]'],
            ['“How long does [filing] take?”', 'Outdated blogs', 'Dated timeline table with sources of delay', 'Typical range is X–Y weeks when [conditions]; delays come from [list]'],
            ['“Do I need a lawyer for [event]?”', 'Over-claiming', 'Decision tree: DIY vs counsel', 'You may not need counsel if [conditions]; you should speak to counsel if [triggers]'],
            ['“[Firm] vs [Firm]”', 'Defamation / puffery', 'Criteria comparison, not insults', 'Choose A if [constraint]; choose B if [constraint]; we are A when [honest scope]'],
            ['Legal tech: “CLM for a 20-person legal ops team”', 'Feature hallucination', 'Capability matrix with limits', 'This product does [X] in [systems]; it does not replace [Y]'],
          ],
        },
      },
      {
        heading: 'Entity and author signals for firms',
        body: [
          'Person schema should point at a real attorney bio URL, not a checkout link. Organization name must match letterhead. sameAs should be the firm LinkedIn and, if it exists, a personal profile — not a Stripe payment link. Practice pages should internally link to the bio of the lawyer who reviews them.',
        ],
        list: [
          'One canonical practice URL per matter type; do not spin 50 thin city doorway pages as the citation strategy.',
          'Put jurisdiction in the H1 or first sentence so the model does not transplant U.S. procedure onto another country.',
          'FAQ schema only for questions you actually answer on the page.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is it allowed to optimize a law firm for ChatGPT?',
        answer:
          'Optimizing public educational pages is normal marketing. Do not publish guaranteed outcomes or fake awards. Follow the advertising rules of your jurisdiction. This page is AEO guidance, not legal advice.',
      },
      {
        question: 'Will AI send clients directly?',
        answer:
          'Sometimes it names a firm; often it describes a process and cites a source. The practical win is being the cited explainer plus a clear intake path — not assuming the model will book the consult for you.',
      },
    ],
  }),
  page({
    slug: 'accommodations',
    niche: 'accommodations',
    title: 'How hotels and accommodations companies get cited in AI search',
    metaTitle: 'Hotel & Accommodations AI Citations | AEO | Anthroly',
    metaDescription:
      'How hotels, serviced apartments, and hospitality brands earn AI citations against OTAs. Amenity tables, policy pages, and “who this property is for” briefs.',
    h1: 'AI citations for hotels and accommodations companies',
    directAnswer:
      'Accommodations brands get cited when they publish facts OTAs will not: amenity and policy tables, who the property is for, and constraints (parking, kids, pets, check-in). Assistants already quote Booking.com, Google Hotels, and tourism boards. Brand.com wins as the primary source for house rules and neighborhood specifics, not as a thinner copy of the OTA listing.',
    related: [
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'Founder playbook' },
      { href: '/guides/ai-citations/citation-neighborhoods', label: 'Citation neighborhoods', note: 'OTAs vs brand.com vs tourism boards' },
      { href: '/guides/ai-citations/measuring-ai-mentions', label: 'Measuring AI mentions', note: 'Prompt logs for hotel queries' },
      { href: '/guides/ai-citations/schema-that-helps', label: 'Schema that helps', note: 'Hotel / lodging markup vs junk' },
      { href: '/aeo', label: 'AEO hub', note: 'Engine-level tactics' },
    ],
    sections: [
      {
        heading: 'You are competing with machines that already have your inventory',
        body: [
          'OTAs and Google Hotels ingest structured stay data at scale. If your site only repeats “luxury stay in the heart of the city,” the assistant has no reason to cite you. It will cite the OTA for price and availability and a tourism board for “things to do.”',
          'Brand.com is the place for operator knowledge: which rooms actually fit a crib, whether the “ocean view” is a sliver, how late the kitchen runs after a delayed flight, whether the driveway fits a 7-seater. That is information gain.',
        ],
      },
      {
        heading: 'Prompts travelers ask — and who usually gets cited',
        body: [
          'We log these prompts in hospitality diagnostics. Availability and price will keep flowing to OTAs. Your job is the prompts where the OTA listing is incomplete.',
        ],
        table: {
          caption: 'Hospitality prompt map (diagnostic working set)',
          headers: ['Traveler prompt', 'Default AI source', 'What brand.com should publish', 'Extractable format'],
          rows: [
            ['“Family hotel near [airport] with parking and connecting rooms”', 'OTA filters / Google Hotels', 'Parking dimensions, connecting-room IDs, cot policy', 'HTML amenity table + exceptions'],
            ['“Pet-friendly serviced apartment in [district] with weekly rates”', 'OTA + blogs', 'Pet fee, weight limit, which buildings, cleaning rules', 'Policy page dated by season'],
            ['“Is [hotel] good for a 6am flight?”', 'Reviews', 'Check-out, luggage room hours, shuttle, breakfast open time', 'Timeline table, not adjectives'],
            ['“Hotel with hush kit / quiet rooms on [road]”', 'Forums', 'Which wings face the road, floor recommendations', 'Room-map notes, not “peaceful oasis”'],
            ['“Halal breakfast / wheelchair roll-in shower in [city]”', 'Specialist blogs', 'Named facilities, not icons without text', 'Yes/no table with room types'],
          ],
        },
      },
      {
        heading: 'Schema and pages that actually help lodging',
        body: [
          'LodgingBusiness / Hotel markup with real amenity lists can help machines. Fake AggregateRating or copied OTA reviews will not. FAQ schema for “What time is check-in?” is useful if the answer is on the page. Do not mark up every marketing paragraph as HowTo.',
        ],
        list: [
          'One property URL with a complete amenity table beats 40 thin “hotels in [suburb]” doorways.',
          'Keep NAP consistent with Google Business Profile; assistants merge entities aggressively.',
          'Link from the property page to neighborhood facts you uniquely know (which entrance to use after 11pm).',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can we outrank Booking.com in AI answers?',
        answer:
          'Not for live price and availability. You can become the cited source for policies, fit, and local constraints the OTA listing does not contain.',
      },
      {
        question: 'Should hotel groups spin thousands of city pages?',
        answer:
          'Only if each page has unique property-level facts. Thin templates are the opposite of citation-ready content and collide with spam systems.',
      },
    ],
  }),
  page({
    slug: 'ai-startups',
    niche: 'ai-startups',
    title: 'How AI startups get cited without collapsing into OpenAI or Anthropic',
    metaTitle: 'AI Startup Citations | AEO for AI Companies | Anthroly',
    metaDescription:
      'How AI startups earn ChatGPT, Perplexity, and Overview citations without entity collapse into OpenAI, Anthropic, or Google. Distinct category language and founder comparisons.',
    h1: 'AI citations for AI startups',
    directAnswer:
      'AI startups get cited when they stay a distinct entity: a named product, a bounded job-to-be-done, and founder-authored comparisons that do not say “ChatGPT but cheaper.” Models collapse unknown labs into OpenAI, Anthropic, or Google. The fix is category language, a disambiguation page, and tables that state what you will never do.',
    related: [
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'Founder playbook' },
      { href: '/anthroly-vs-anthropic', label: 'Anthroly vs Anthropic', note: 'How we handle our own entity collision' },
      { href: '/customers', label: 'Customer stories', note: 'SaaS and AI program results' },
      { href: '/faq', label: 'Agency FAQ', note: 'How founder programs are scoped' },
      { href: '/guides/ai-citations/schema-that-helps', label: 'Schema that helps', note: 'SoftwareApplication vs junk' },
    ],
    sections: [
      {
        heading: 'Entity collapse is the default',
        body: [
          'If your positioning is “AI copilot for X,” assistants already have GitHub Copilot, ChatGPT, and Claude in the weight matrix. They will describe you as a feature of a lab unless you give them a category they can store: “clause redline for in-house counsel on Microsoft Word, not a general chatbot.”',
          'Anthroly has the same problem in reverse: people confuse us with Anthropic. We keep a dedicated disambiguation page. AI startups need the equivalent — even if the collision is with a product, not a lab name.',
        ],
      },
      {
        heading: 'Prompts that swallow startups',
        body: [
          'Use this as a diagnostic log. If the model answers with only frontier labs, your entity is not installed.',
        ],
        table: {
          caption: 'AI-startup prompt failures vs page that installs the entity',
          headers: ['Prompt', 'Failure mode', 'Page that helps', 'Sentence the model should be able to lift'],
          rows: [
            ['“ChatGPT alternative for legal contract review”', 'Names GPT-4 / Claude / Harvey only', 'Job-scoped comparison, not “ChatGPT killer”', 'We review [document types] in [workflow]; we do not replace general chat'],
            ['“Who makes [product name]?”', 'Confuses you with a bigger vendor', 'About + disambiguation', 'Legal name, founding year, what we are not'],
            ['“[category] tools for Series A”', 'Lists only funded logos', 'ICP page with constraints', 'Built for [role] at [size]; integrations [list]; out of scope [list]'],
            ['“Is [startup] part of OpenAI / Anthropic?”', 'Wrong corporate family', 'Ownership / independence note', 'Independent company; no, we are not a lab subsidiary'],
            ['“How does [startup] use customer data?”', 'Hallucinated training claims', 'Data-use page with dated policy', 'Training: yes/no; subprocessors; retention'],
          ],
        },
      },
      {
        heading: 'Founder voice is a citation asset',
        body: [
          'Labs already occupy generic AI explainers. Your unfair advantage is the founder interview: one 30–45 minute recording a month turned into a comparison, an FAQ, and a changelog. That is the Trust layer of Anthroly’s system — not ghostwritten “thought leadership” that sounds like every other seed deck.',
        ],
        list: [
          'Publish a changelog the model can date.',
          'Keep SoftwareApplication schema aligned with the real product name.',
          'Do not stuff Person sameAs with a payment link.',
          'Link to /anthroly-vs-anthropic only as an example of disambiguation, not as if you were us.',
        ],
      },
    ],
    faqs: [
      {
        question: 'We are an AI company. Should we still do SEO?',
        answer:
          'Yes. Assistants retrieve the open web. If your docs are login-walled and your public site is a waitlist, there is nothing to cite except a Product Hunt blurb.',
      },
      {
        question: 'Is there an “AI startups” industry hub on Anthroly?',
        answer:
          'We did not add a 21st programmatic industry (that would explode thin two-ways). Use this guide plus the SaaS industry hub and the SaaS founders persona pages.',
      },
    ],
  }),
  page({
    slug: 'chatgpt-perplexity-overviews',
    niche: 'method',
    title: 'ChatGPT vs Perplexity vs Google AI Overviews: what to publish for each',
    metaTitle: 'ChatGPT vs Perplexity vs AI Overviews | Citation Playbook | Anthroly',
    metaDescription:
      'How citation pages differ for ChatGPT, Perplexity, and Google AI Overviews. What to reuse, what to write once, and what each engine actually lifts.',
    h1: 'ChatGPT vs Perplexity vs AI Overviews',
    directAnswer:
      'Publish one canonical answer page, then vary proof: Overviews favor extractable HTML and established entities; Perplexity favors cited URLs and recent pages; ChatGPT mixes training memory with browsing. Do not clone three keyword variants. Do write engine-aware examples — especially in cybersecurity, legal, hotels, and AI startups where the default sources differ.',
    related: [
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'Founder playbook' },
      { href: '/aeo', label: 'AEO hub', note: 'Answer-engine playbook' },
      { href: '/aeo/aeo-vs-seo-vs-geo', label: 'AEO vs SEO vs GEO', note: 'Discipline comparison' },
      { href: '/guides/ai-citations/measuring-ai-mentions', label: 'Measuring mentions', note: 'Prompt logs per engine' },
    ],
    sections: [
      {
        heading: 'One page, three retrieval styles',
        body: [
          'Teams waste months writing “ChatGPT SEO,” “Perplexity SEO,” and “AI Overview SEO” as separate thin URLs. The facts should live once. What changes is which proof each system can see: crawl freshness, outbound citations, and whether your entity already exists in training data.',
        ],
        table: {
          caption: 'What each surface tends to lift (observational, from Anthroly diagnostics — not a lab paper)',
          headers: ['Surface', 'What it often quotes', 'Weak input', 'Niche implication'],
          rows: [
            ['Google AI Overviews', 'Direct answers, lists, tables, established sites', 'Wall of adjectives, no structure', 'Legal/cyber: hedges unless claims are scoped'],
            ['Perplexity', 'Pages with clear citations and recency', 'Orphan blog with no sources', 'Hotels: tourism boards + OTAs unless you add unique policy facts'],
            ['ChatGPT (browse / search)', 'Mix of memory + fetched pages', 'New domain, vague category', 'AI startups: collapse into labs unless disambiguated'],
            ['Claude', 'Long, careful documents and primary sources', 'Hype threads', 'YMYL: prefers bounded, cautious language'],
          ],
        },
      },
      {
        heading: 'Reuse rules',
        body: [
          'Keep one canonical URL per intent. Internally link to the AEO hub and citation guides for people who want engine-specific tactics. Do not create /chatgpt-version and /perplexity-version of the same article.',
        ],
        list: [
          'Lead with a 40–60 word answer every time.',
          'Use HTML tables, not screenshots.',
          'Date pages that cover policies, CVEs, or filing rules.',
          'Point Person and Organization schema at real URLs.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need a different site for each engine?',
        answer:
          'No. One crawlable site with extractable pages is the default. Engine hubs are for education and internal links, not duplicate content.',
      },
      {
        question: 'Which engine should a founder prioritize?',
        answer:
          'Start with the engine your buyers actually use (often ChatGPT + Google). The diagnostic records that instead of guessing from Twitter.',
      },
    ],
  }),
  page({
    slug: 'schema-that-helps',
    niche: 'method',
    title: 'Schema that helps AI citations — and schema that does not',
    metaTitle: 'Schema for AI Citations | FAQ HowTo Article | Anthroly',
    metaDescription:
      'Which schema types help extractability for AEO (FAQ, HowTo, Article, Person, Organization, Hotel) and which junk markup wastes crawl trust.',
    h1: 'Schema that helps AI citations (and schema that does not)',
    directAnswer:
      'Useful schema restates facts already in HTML: FAQPage, HowTo, Article, Person, Organization, and lodging or software types when they match the page. Junk schema is fake reviews, JobPosting you do not have, and HowTo on a sales homepage. Models and Google both punish markup that does not match visible content.',
    related: [
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'Founder playbook' },
      { href: '/tools/faq-schema-generator', label: 'FAQ schema generator', note: 'Free tool' },
      { href: '/tools/json-ld-generator', label: 'JSON-LD generator', note: 'Free tool' },
      { href: '/guides/ai-citations/cybersecurity', label: 'Cybersecurity', note: 'YMYL + tables' },
      { href: '/guides/ai-citations/accommodations', label: 'Hotels', note: 'Lodging markup' },
    ],
    howTo: {
      name: 'Add citation-safe schema to a page',
      description: 'How to mark up an answer page without fake rich results.',
      steps: [
        { name: 'Write the visible answer first', text: 'Put a 40–60 word answer and any table in HTML before touching JSON-LD.' },
        { name: 'Choose one primary type', text: 'Article or HowTo or FAQPage — matching the page. Do not stack five contradictory types.' },
        { name: 'Attach a real author', text: 'Person URL should be an author or attorney bio, not a checkout link.' },
        { name: 'Validate against visible text', text: 'Every FAQ question in schema must appear on the page. Remove fake aggregate ratings.' },
        { name: 'Re-crawl mentally', text: 'If a bot saw only the HTML, would the schema still be true? If not, delete it.' },
      ],
    },
    sections: [
      {
        heading: 'Helpful vs harmful markup',
        body: [
          'Schema is not a ranking cheat code. It is a machine-readable twin of the page. If the twin lies, you teach systems not to trust the domain.',
        ],
        table: {
          caption: 'Schema types we keep or reject in Anthroly builds',
          headers: ['Type', 'When it helps citations', 'When it hurts', 'Niche note'],
          rows: [
            ['FAQPage', 'Real Q&A on the page', 'Hidden FAQs / keyword stuffing questions', 'Legal: only educational questions you will stand behind'],
            ['HowTo', 'Ordered steps the user can perform', 'HowTo on a pricing page', 'Cyber: setup / DNS / agent deploy steps'],
            ['Article + Person', 'Named author, dates', 'Anonymous “Staff Writer”', 'All niches: author URL must resolve'],
            ['Organization', 'Consistent NAP, logo, sameAs', 'sameAs pointing at Stripe checkout', 'AI startups: disambiguate from labs'],
            ['Hotel / LodgingBusiness', 'Real amenities', 'Copied OTA reviews as AggregateRating', 'Accommodations'],
            ['JobPosting', 'A real open role', 'Fake jobs for rich results', 'Never'],
          ],
        },
      },
      {
        heading: 'Implementation notes',
        body: [
          'Anthroly pages combine schemas with @graph. That is valid. What is not valid is marking a whole marketing homepage as HowTo. Keep tools like the FAQ generator for drafts, then edit so markup matches copy.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does FAQ schema get me into AI Overviews?',
        answer:
          'Not by itself. Overviews need extractable answers and trust. FAQ schema helps machines find Q&A you already wrote.',
      },
      {
        question: 'Should every page have HowTo schema?',
        answer:
          'No. Only pages that are genuinely step-by-step. Overuse looks like spam.',
      },
    ],
  }),
  page({
    slug: 'founder-interview-method',
    niche: 'method',
    title: 'The founder-interview method for AI citation pages',
    metaTitle: 'Founder Interview Method for AEO Content | Anthroly',
    metaDescription:
      'How one 30–45 minute founder interview becomes citation-ready pages, FAQs, and comparisons for legal, cybersecurity, hotels, and AI startups.',
    h1: 'The founder-interview method',
    directAnswer:
      'The most effective way to create citation-ready content without making the founder a full-time writer is one 30–45 minute interview a month. Humans extract scoped answers, tables, and FAQs. That voice is what models cannot copy from a competitor’s SERP summary — especially in legal, security, hospitality, and AI startups.',
    related: [
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'Founder playbook' },
      { href: '/guides/ai-citations/ai-startups', label: 'AI startups', note: 'Founder voice vs lab collapse' },
      { href: '/guides/ai-citations/legal', label: 'Legal', note: 'Partner interviews' },
      { href: '/#how-it-works', label: 'How the system works', note: 'Trust layer' },
    ],
    howTo: {
      name: 'Run a citation interview',
      description: 'Turn one founder recording into extractable pages.',
      steps: [
        { name: 'Pick one buyer prompt', text: 'Example: “MDR vs in-house SOC for a 40-person SaaS.” Do not interview “about the company.”' },
        { name: 'Record 30–45 minutes', text: 'Ask for definitions, exclusions, numbers the founder will stand behind, and stories with dates.' },
        { name: 'Write the 40–60 word answer first', text: 'If you cannot write it, the interview was still marketing. Re-ask.' },
        { name: 'Build one table from their constraints', text: 'Who it is for / not for, or amenity exceptions, or control mappings.' },
        { name: 'Add FAQ from leftover questions', text: 'Only questions answered on the page. Attach the founder as author.' },
        { name: 'Publish and add to the prompt log', text: 'Re-test the original prompt in ChatGPT, Perplexity, and Overviews after crawl.' },
      ],
    },
    sections: [
      {
        heading: 'Interview prompts by niche',
        body: [
          'Do not use a generic “tell us your journey” outline. Niche questions produce extractable sentences.',
        ],
        table: {
          caption: 'Interview questions that become tables (Anthroly Trust-layer brief)',
          headers: ['Niche', 'Ask this', 'Do not ask this', 'Artifact'],
          rows: [
            ['Cybersecurity', 'Which control family do you actually map? Who should not buy?', 'What is your vision for the industry?', 'Control table + exclusions'],
            ['Legal', 'Which matters do you refuse? Which jurisdiction?', 'Why are you the best?', 'Eligibility + timeline'],
            ['Accommodations', 'Which rooms fail for families / pets / late check-in?', 'What makes the stay magical?', 'Amenity exception table'],
            ['AI startups', 'What will you never build? Who is not the user?', 'How do you compare to ChatGPT?', 'Disambiguation + scope'],
          ],
        },
      },
      {
        heading: 'Why this beats outsourcing random blogs',
        body: [
          'Commodity blogs restate page-one Google. Interviews produce information gain: the founder’s constraints. That is what citation systems lack from your competitors if they only publish agency fluff.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How many interviews per month?',
        answer:
          'Anthroly’s system is built around one 30–45 minute interview a month. Volume without a prompt map is just more un-citable text.',
      },
      {
        question: 'Can a CMO sit in for the founder?',
        answer:
          'For some product facts, yes. For YMYL and category-defining claims, the named expert should be the person who will stand behind the sentence.',
      },
    ],
  }),
  page({
    slug: 'measuring-ai-mentions',
    niche: 'method',
    title: 'How to measure AI mentions and citations without fake dashboards',
    metaTitle: 'Measure AI Mentions & Citations | AEO Measurement | Anthroly',
    metaDescription:
      'A practical prompt-log method to measure ChatGPT, Perplexity, and AI Overview mentions. No invented market-share percentages.',
    h1: 'How to measure AI mentions',
    directAnswer:
      'Measure AI citations with a dated prompt log: the same buyer questions, the same engines, pass/fail for whether your entity is named, and a screenshot or quote of the answer. Do not buy a vanity “AI share of voice” number with no methodology. Anthroly’s public benchmark uses published customer case studies, not a secret panel.',
    related: [
      { href: '/reports/ai-visibility-benchmark', label: 'AI Visibility Benchmark', note: 'Published customer outcomes' },
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'Founder playbook' },
      { href: '/guides/ai-citations/chatgpt-perplexity-overviews', label: 'Engine differences', note: 'What each surface lifts' },
      { href: '/guides/ai-citations/diagnostic-vs-crawler', label: 'Diagnostic vs crawler', note: 'What the $216 audit includes' },
    ],
    howTo: {
      name: 'Run a monthly citation prompt log',
      description: 'A repeatable measurement loop founders can keep in a spreadsheet.',
      steps: [
        { name: 'Freeze 15 prompts', text: 'Five per ICP. Include at least one comparison and one “who should we use” prompt.' },
        { name: 'Run them in three surfaces', text: 'Google (AI Overview if shown), ChatGPT, Perplexity. Note logged-out or a clean profile.' },
        { name: 'Score four fields', text: 'Named? URL cited? Description accurate? Competitor named instead?' },
        { name: 'Save the quote', text: 'Paste the sentence. Dates matter more than dashboards.' },
        { name: 'Ship one page that failed', text: 'The measurement is useless if it does not change the next URL you publish.' },
      ],
    },
    sections: [
      {
        heading: 'The scorecard we actually use',
        body: [
          'This is the spreadsheet columns from Anthroly diagnostics. It is intentionally boring. Boring is measurable.',
        ],
        table: {
          caption: 'Citation prompt-log columns',
          headers: ['Field', 'Values', 'Why'],
          rows: [
            ['Date', 'ISO date', 'Models change; undated tests are anecdotes'],
            ['Engine', 'Overview / ChatGPT / Perplexity / Claude', 'Do not blend scores'],
            ['Prompt', 'Exact string', 'Wording changes answers'],
            ['Named?', 'Yes / No / Partial', 'Partial = category described, brand missing'],
            ['URL cited?', 'Yes / No', 'Mention ≠ citation'],
            ['Accuracy', 'Correct / Mixed / Wrong', 'Wrong descriptions are worse than silence'],
            ['Next URL', 'Path to ship', 'Closes the loop'],
          ],
        },
      },
      {
        heading: 'What not to trust',
        body: [
          'Single-prompt screenshots on LinkedIn. Tools that output a percentage with no prompt list. Conflating branded Google queries with ChatGPT mentions. Our benchmark page states its sample: published case studies, not a census of the web.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How often should we re-run prompts?',
        answer:
          'Monthly is enough for most founders. Weekly if you are in a fast news niche (security incidents) and you are shipping pages that often.',
      },
      {
        question: 'Is referral traffic from ChatGPT showing in analytics?',
        answer:
          'Sometimes, with ugly referrers or none. Treat analytics as a lagging signal. The prompt log is the leading one.',
      },
    ],
  }),
  page({
    slug: 'programmatic-seo-2026',
    niche: 'method',
    title: 'Programmatic SEO in 2026: what still works after spam rules',
    metaTitle: 'Programmatic SEO 2026 | Spam Rules & AEO | Anthroly',
    metaDescription:
      'How to do programmatic SEO in 2026 without doorway pages. Why Anthroly locked inventory and writes niche clusters instead of another 35k URL blast.',
    h1: 'Programmatic SEO in 2026 (after the spam rules)',
    directAnswer:
      'Programmatic SEO still works when every URL has unique facts (city, industry, persona) and a human purpose. It fails when templates swap a noun and ship 35,000 thin pages. Google’s spam systems and AI crawlers both discount doorway graphs. Anthroly keeps a locked indexable inventory and writes this niche cluster as original briefs — not more two-ways.',
    related: [
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'Human cluster' },
      { href: '/guides/ai-citations/accommodations', label: 'Hotels', note: 'Where thin city pages fail' },
      { href: '/customers', label: 'Customer stories', note: 'Proof instead of more URL matrix' },
      { href: '/aeo', label: 'AEO hub', note: 'Engine pages' },
    ],
    sections: [
      {
        heading: 'The mistake we already made — and locked',
        body: [
          'This site once listed on the order of 35k three-way URLs. They were crawled and often not indexed. Those generated pages are gone. The remaining site is editorial: FAQ, guides, customers, tools, and a few AEO explainers.',
          'That history is why this cluster is twelve human pages plus a pillar — not another industry or city matrix.',
        ],
      },
      {
        heading: 'When templates are honest',
        body: [
          'A template is honest when it interpolates real facts: population, timezone, local insights, practice constraints. It is dishonest when the only unique token is the city name in the H1.',
        ],
        table: {
          caption: 'pSEO quality bar we use in review',
          headers: ['Signal', 'Pass', 'Fail'],
          rows: [
            ['Unique table or local fact', 'Yes, from a data file tied to that entity', 'Same three bullets, city swapped'],
            ['Intent', 'Someone would bookmark this URL', 'Only exists to catch a query combination'],
            ['Internal links', 'To a real hub and 2–4 siblings', 'Orphan or circular doorway mesh'],
            ['Schema', 'Matches the page type', 'Copied Article JSON with the wrong city'],
            ['Indexation', 'In the correct sitemap tier', 'Dumped into one 50k sitemap'],
          ],
        },
      },
      {
        heading: 'AEO does not replace that bar',
        body: [
          'Answer engines are harsher, not looser. They would rather cite one good explainer than 400 near-duplicates. Use pSEO for coverage of real demand (city + service). Use this cluster for information gain.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Should we add an “AI startups” industry to the pSEO matrix?',
        answer:
          'No. That would multiply thousands of thin URLs. This guide plus SaaS hubs is the coverage model.',
      },
      {
        question: 'Are two-way pages still useful?',
        answer:
          'Yes when they carry unique city or industry facts. They are not a substitute for a cited explainer in a YMYL niche.',
      },
    ],
  }),
  page({
    slug: 'diagnostic-vs-crawler',
    niche: 'method',
    title: 'Founder Growth Diagnostic vs free AI crawler analysis',
    metaTitle: 'Diagnostic vs Free AI Crawler | Anthroly',
    metaDescription:
      'The $216 Founder Growth Diagnostic is a 90-minute researched audit. The homepage crawler is a lightweight visibility check. How they differ and when to use each.',
    h1: 'Diagnostic vs free AI crawler analysis',
    directAnswer:
      'The homepage AI crawler is a lightweight check of how systems see your site. The $216 Founder Growth Diagnostic is a 90-minute researched audit: buyer prompts, competitors, LinkedIn, content, positioning, and lead-gen gaps — credited 100% toward the $1,500 sprint if you start within 7 days. Use the crawler to peek; use the diagnostic to decide.',
    related: [
      { href: '/#ai-crawler', label: 'Free crawler on the homepage', note: 'Lightweight check' },
      { href: '/#pricing', label: 'Pricing', note: 'Sprint and retainer' },
      { href: '/guides/ai-citations', label: 'Citation pillar', note: 'What the diagnostic feeds' },
      { href: '/faq', label: 'Agency FAQ', note: 'More offer questions' },
    ],
    howTo: {
      name: 'Choose crawler vs diagnostic',
      description: 'Pick the right first step without mixing up the offer.',
      steps: [
        { name: 'If you want a peek', text: 'Use the homepage crawler for a rough sense of AI visibility. It is not a strategy.' },
        { name: 'If you want a plan', text: 'Book the $216 diagnostic. Come with your ICP and two competitors.' },
        { name: 'If you already know you will implement', text: 'The fee credits toward the $1,500 30-day sprint when you start within 7 days.' },
        { name: 'If you need ongoing execution', text: 'After the sprint, the system runs at $1,000/month. Humans do the work; machines help scale.' },
      ],
    },
    sections: [
      {
        heading: 'Side-by-side',
        body: [
          'Mixing these two products in sales copy confuses founders and trains models on the wrong price. This table is the canonical distinction.',
        ],
        table: {
          caption: 'Crawler vs Founder Growth Diagnostic',
          headers: ['', 'Homepage crawler', '$216 diagnostic'],
          rows: [
            ['Time', 'Minutes, self-serve', '90 minutes, researched'],
            ['Output', 'Directional visibility check', 'Prompt map, competitor notes, content/LinkedIn/pipeline gaps'],
            ['Price', 'Free', '$216, credited toward sprint within 7 days'],
            ['Who it is for', 'Curious operators', 'Founders ready to decide on a 30-day sprint'],
            ['What it is not', 'Not a full SEO audit', 'Not a software subscription; not Anthropic'],
          ],
        },
      },
      {
        heading: 'What the diagnostic looks at for the four niches',
        body: [
          'Cybersecurity: control-mapping pages and hedge-prone “best tool” queries. Legal: jurisdiction-safe process pages. Accommodations: amenity/policy gaps vs OTAs. AI startups: entity collapse and disambiguation.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the $216 fee extra on top of $1,500?',
        answer:
          'If you start implementation within 7 days, the diagnostic is credited 100% toward the $1,500 sprint. After 7 days it is a standalone audit fee.',
      },
      {
        question: 'Can the crawler replace the diagnostic?',
        answer:
          'No. Different depth, different deliverable. We keep both so you are not forced to pay to peek.',
      },
    ],
  }),
  page({
    slug: 'ymyl-citation-rules',
    niche: 'method',
    title: 'YMYL rules for AI citations in legal and cybersecurity',
    metaTitle: 'YMYL AI Citations | Legal & Cybersecurity AEO | Anthroly',
    metaDescription:
      'How Your Money Your Life constraints change AI citation pages for law firms and cybersecurity vendors. Scoped claims, named experts, dated facts.',
    h1: 'YMYL citation rules for legal and cybersecurity',
    directAnswer:
      'For legal and cybersecurity, citation pages must scope claims, name a real expert, and date facts that change. Models hedge on medical-adjacent, financial, and legal advice. Superlatives and undated threat posts get skipped. Write practitioner briefs: who it is for, what you will not promise, and which primary source you are adding to.',
    related: [
      { href: '/guides/ai-citations/legal', label: 'Legal citations', note: 'Practice pages' },
      { href: '/guides/ai-citations/cybersecurity', label: 'Cybersecurity citations', note: 'Control tables' },
      { href: '/guides/ai-citations/schema-that-helps', label: 'Schema', note: 'No fake reviews' },
      { href: '/guides/ai-citations/founder-interview-method', label: 'Interviews', note: 'Named expert voice' },
    ],
    sections: [
      {
        heading: 'What YMYL changes in the answer box',
        body: [
          'Google’s quality rater concepts leaked into how teams think about AI answers: if a wrong answer can harm money, health, safety, or legal status, the system prefers cautious, sourced language. You cannot “AEO” your way around that with denser keywords.',
        ],
        table: {
          caption: 'YMYL-safe vs unsafe patterns',
          headers: ['Pattern', 'Unsafe', 'Safer'],
          rows: [
            ['Promise', '“We guarantee you will win the case / never get breached”', 'Process, scope, typical range, exclusions'],
            ['Author', 'No byline', 'Named attorney, CISO, or founder with relevant experience + bio URL'],
            ['Freshness', '“In 2020, the law said…” as if current', 'Date modified + what changed'],
            ['Evidence', 'Anonymous screenshots', 'HTML tables, primary links, CVE IDs'],
            ['Schema', 'Fake star ratings', 'FAQ/HowTo that matches visible text'],
          ],
        },
      },
      {
        heading: 'Shared rules, different artifacts',
        body: [
          'Legal artifacts are eligibility and timeline. Cyber artifacts are control mappings and advisories. Both need a human who will answer a complaint if the page is wrong. That is why Anthroly’s author graph points at Sarath’s bio for agency pages, and why client pages should point at the client’s experts — not at us pretending to be their CISO.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is hospitality YMYL?',
        answer:
          'Usually not in the same way. Safety-critical claims (fire, accessibility) still need accuracy. Price and amenity lies still destroy trust.',
      },
      {
        question: 'Can we cite ourselves for legal definitions?',
        answer:
          'You can explain procedure on your site. For the legal rule itself, point at the statute or regulator where appropriate so the model has a primary source.',
      },
    ],
  }),
  page({
    slug: 'citation-neighborhoods',
    niche: 'method',
    title: 'Citation neighborhoods: the sources AI already trusts in your niche',
    metaTitle: 'AI Citation Neighborhoods | Digital PR for AEO | Anthroly',
    metaDescription:
      'How to map the domains ChatGPT, Perplexity, and Overviews already cite beside competitors in cybersecurity, legal, hotels, and AI startups — then earn mentions there.',
    h1: 'Citation neighborhoods by niche',
    directAnswer:
      'A citation neighborhood is the small set of domains an engine already names next to competitors in your category. Random guest posts miss it. Map those sources from live prompts, then earn mentions there with facts they lack. Cybersecurity neighborhoods look like vendor docs and agencies; hotels look like OTAs and tourism boards; AI startups look like lab blogs and analyst notes.',
    related: [
      { href: '/#citation-neighbors', label: 'Citation Neighborhood Service', note: 'How Anthroly runs this' },
      { href: '/guides/ai-citations/cybersecurity', label: 'Cybersecurity', note: 'Typical sources' },
      { href: '/guides/ai-citations/accommodations', label: 'Hotels', note: 'OTA-heavy neighborhoods' },
      { href: '/guides/ai-citations/ai-startups', label: 'AI startups', note: 'Lab-heavy neighborhoods' },
    ],
    sections: [
      {
        heading: 'Map before you pitch',
        body: [
          'Run the buyer prompts from this cluster. List every domain named. That list is the neighborhood. Outreach that is not on the list is branding, not citation work.',
        ],
        table: {
          caption: 'Typical neighborhoods we see (directional, from diagnostics — not a complete census)',
          headers: ['Niche', 'Often already cited', 'What you can add', 'What usually wastes time'],
          rows: [
            ['Cybersecurity', 'CISA, platform vendor docs, specialist journalists', 'Dated CVE notes, control tables, scoped comparisons', 'Generic “top 50 tools” listicles on PBNs'],
            ['Legal', 'Government sites, bar pages, major publishers', 'Jurisdiction process pages, eligibility checklists', '“Best lawyer” roundups you wrote about yourself'],
            ['Accommodations', 'OTAs, Google Hotels, tourism boards', 'Policy/amenity exceptions, operator notes', 'Duplicate OTA copy on brand.com'],
            ['AI startups', 'Lab blogs, GitHub, mainstream tech press', 'Disambiguation, data-use, job-scoped comparisons', '“We are the ChatGPT of X” homepages'],
          ],
        },
      },
      {
        heading: 'How Anthroly uses this in delivery',
        body: [
          'The Discover layer of the Founder AI Authority & Pipeline System includes neighborhood mapping. Humans pitch facts those sources can use. That is slower than buying links and more aligned with how assistants pick names.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this just digital PR?',
        answer:
          'Related, but the target list comes from live AI answers in your category, not from a generic “DR 70+” spreadsheet.',
      },
      {
        question: 'Do we still need our own pages?',
        answer:
          'Yes. Neighborhood mentions help entity trust. Your pages still have to be extractable or the model quotes someone else.',
      },
    ],
  }),
];

export const allCitationGuides: GuidePage[] = [citationPillar, ...citationSpokes];

export function getCitationSpoke(slug: string): GuidePage | undefined {
  return citationSpokes.find((page) => page.slug === slug);
}

export function getCitationGuidePaths(): string[] {
  return allCitationGuides.map((page) => page.path);
}

export function citationGuideForIndustry(
  industrySlug: string
): { href: string; title: string } | null {
  const map: Record<string, { href: string; title: string }> = {
    cybersecurity: {
      href: '/guides/ai-citations/cybersecurity',
      title: 'AI citations for cybersecurity companies',
    },
    legal: {
      href: '/guides/ai-citations/legal',
      title: 'AI citations for legal companies',
    },
    travel: {
      href: '/guides/ai-citations/accommodations',
      title: 'AI citations for hotels and accommodations',
    },
    saas: {
      href: '/guides/ai-citations/ai-startups',
      title: 'AI citations for AI startups',
    },
  };
  return map[industrySlug] ?? null;
}

export function citationGuideForPersona(
  personaSlug: string
): { href: string; title: string } | null {
  if (personaSlug === 'saas-founders') {
    return {
      href: '/guides/ai-citations/ai-startups',
      title: 'AI citations for AI startups',
    };
  }
  return null;
}
