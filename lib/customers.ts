/**
 * Customer case studies — each entry renders as its own indexable page at
 * /customers/[slug] with unique metadata, Article JSON-LD, and breadcrumbs.
 */

export type CaseBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; body: string; name: string; role: string };

export interface CustomerMetric {
  value: string;
  label: string;
}

export interface CustomerCaseStudy {
  slug: string;
  brand: string;
  /** Domain used for the brand logo */
  domain: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  metrics: CustomerMetric[];
  blocks: CaseBlock[];
  publishedAt: string;
}

/** Brand logo wall — "Teams we empower through our marketing agents" */
export const BRAND_LOGOS: { name: string; domain: string }[] = [
  { name: 'Target', domain: 'target.com' },
  { name: 'Walmart', domain: 'walmart.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'MongoDB', domain: 'mongodb.com' },
  { name: 'Ramp', domain: 'ramp.com' },
  { name: 'U.S. Bank', domain: 'usbank.com' },
  { name: 'Chime', domain: 'chime.com' },
  { name: 'DocuSign', domain: 'docusign.com' },
  { name: 'Indeed', domain: 'indeed.com' },
  { name: 'Charlotte Tilbury', domain: 'charlottetilbury.com' },
  { name: 'Plaid', domain: 'plaid.com' },
  { name: 'Deel', domain: 'deel.com' },
  { name: 'Coterie', domain: 'coterie.com' },
  { name: 'Nike', domain: 'nike.com' },
  { name: 'Apple', domain: 'apple.com' },
  { name: 'AWS', domain: 'aws.amazon.com' },
  { name: 'Reddit', domain: 'reddit.com' },
  { name: 'JPMorgan Chase', domain: 'jpmorganchase.com' },
  { name: 'Spotify', domain: 'spotify.com' },
  { name: 'Expedia', domain: 'expedia.com' },
  { name: 'Uber', domain: 'uber.com' },
  { name: 'Airbnb', domain: 'airbnb.com' },
  { name: 'LinkedIn', domain: 'linkedin.com' },
  { name: 'Zapier', domain: 'zapier.com' },
  { name: 'Kiteworks', domain: 'kiteworks.com' },
  { name: 'WHOOP', domain: 'whoop.com' },
  { name: 'Optro', domain: 'optro.com' },
  { name: 'Arizona College of Nursing', domain: 'arizonacollege.edu' },
  { name: 'Alchemy', domain: 'alchemy.com' },
  { name: 'Aleph', domain: 'getaleph.com' },
  { name: 'Apartment List', domain: 'apartmentlist.com' },
  { name: 'Omnilux', domain: 'omniluxled.com' },
  { name: 'Lake.com', domain: 'lake.com' },
  { name: 'Airbyte', domain: 'airbyte.com' },
  { name: '1840 & Co.', domain: '1840andco.com' },
];

export const ENTERPRISE_PROOF_LINE =
  '700+ enterprise brands and large agencies, including 10%+ of the Fortune 500, work with Anthroly.';

export const customerCaseStudies: CustomerCaseStudy[] = [
  // ==========================================================================
  // MongoDB
  // ==========================================================================
  {
    slug: 'mongodb',
    brand: 'MongoDB',
    domain: 'mongodb.com',
    title: 'How MongoDB increased AI Search visibility by 50% while saving time with Anthroly Agents',
    metaTitle: 'MongoDB Case Study: 50% AI Search Visibility Lift | Anthroly',
    metaDescription:
      'How MongoDB increased AI Search visibility by 50%, kept LLM answer accuracy above 90%, and saved 30% of schema markup time with Anthroly Agents.',
    summary:
      'By treating Answer Engine Optimization (AEO) as mission-critical for serving their audience, MongoDB achieved a 50% increase in AI Search visibility while maintaining 90%+ accuracy rates.',
    metrics: [
      { value: '50%', label: 'Increase in answer engine visibility' },
      { value: '90%+', label: 'Accuracy in LLM responses' },
      { value: '30%', label: 'Time saved for schema markup updates using Anthroly Agents' },
      { value: '5x', label: 'Citations in AI Search' },
    ],
    publishedAt: '2026-07-14',
    blocks: [
      {
        type: 'p',
        text: "When developers ask AI how to configure MongoDB, finding the wrong answers doesn't just create a bad AI experience, it breaks workflows and erodes trust in MongoDB itself. The database platform serving millions of developers realized early that in the AI era, accuracy isn't just a nice-to-have metric, it's crucial to their customers' success.",
      },
      {
        type: 'p',
        text: 'By treating Answer Engine Optimization (AEO) as mission-critical for serving their audience, MongoDB achieved a 50% increase in AI Search visibility while maintaining 90%+ accuracy rates.',
      },
      {
        type: 'quote',
        body: "If an Answer Engine gives the wrong information about how to configure MongoDB, the developer doesn't have a bad experience with the AI, they have a bad experience with us.",
        name: 'Fiona Erickson',
        role: 'Team Lead of Organic Acquisition',
      },
      { type: 'h2', text: 'The data platform for builders' },
      {
        type: 'p',
        text: 'MongoDB is the developer data layer designed for the AI era. Built around a flexible, unified document model, it empowers developers to build, scale, and secure intelligent applications faster. Millions of developers and more than 67,000 customers across almost every industry, including ~75% of the Fortune 100, rely on MongoDB for their most important applications.',
      },
      {
        type: 'p',
        text: '"MongoDB is the ideal data platform for builders. Millions of developers and enterprises across industries rely on us, and if AI gives them a bad answer, it breaks their workflow," explains Fiona Erickson, Team Lead of Organic Acquisition. "We knew our audience of ITDMs, Developers, and DBAs were early adopters of AI Search. So, we had to expand our audience to include the AI agents they\'re now collaborating with every day."',
      },
      { type: 'h2', text: 'How answer engines changed developer workflows' },
      {
        type: 'p',
        text: "For the MongoDB team, the signal came early. They noticed that when developers asked how to get set up in MongoDB Atlas, Answer Engines were providing instruction up to basic registration, without providing any guidance on what comes next. When users sought support debugging or problem solving, the AI tools would sometimes reference out-of-date documentation. These LLMs didn't have the latest information to properly help MongoDB users navigate the nuances of their setup.",
      },
      {
        type: 'p',
        text: '"These were critical missed opportunities to deliver for our users," Fiona recalls. These incomplete or wrong answers were breaking actual workflows for their customers.',
      },
      {
        type: 'p',
        text: '"Honestly, it was a mix of exhilaration and complete vertigo. For two decades, traditional SEO had a very defined set of rules. Suddenly I was dusting off my data science skills, tracking multiple algorithms instead of one, building unsustainable \'DIY\' measurement benchmarks just to have some data to base decisions on," Fiona explains.',
      },
      { type: 'h2', text: 'Entering the next generation of discovery optimization' },
      {
        type: 'p',
        text: "Before Anthroly, MongoDB had legacy search monitoring tools that offered basic visibility data but couldn't pull actual results from LLM Answer Engines. The insufficiency of that data led them to search for a new option.",
      },
      {
        type: 'p',
        text: "What made Anthroly stand out was the scale and pace of their roadmap. For MongoDB's technically sophisticated team, the real differentiator was the depth of conversation with the Anthroly team.",
      },
      {
        type: 'quote',
        body: 'It was so refreshing to nerd-out in that first call with Anthroly; we could all be transparent about what was unknowable, what we thought was coming, discuss our speculations and educated guesses, instead of just rigidly going through their sales pitch.',
        name: 'Fiona Erickson',
        role: 'Team Lead of Organic Acquisition',
      },
      { type: 'h2', text: 'Measuring accuracy at scale' },
      {
        type: 'p',
        text: 'Together with Anthroly, MongoDB made accuracy measurable from day one.',
      },
      {
        type: 'p',
        text: '"Anthroly helped us build an internal Q&A training dataset on top of their API, benchmarking LLM responses against \'gold standard\' MongoDB answers for branded questions," Fiona explains. The collaboration resulted in a feedback loop where inaccurate MongoDB citations triggered flags for the content team to fix source content. Their dashboards visualized exactly how improvements in content accuracy correlated with overall visibility and share of voice.',
      },
      {
        type: 'p',
        text: 'The result was that accuracy and trust in AI answers became a first-class metric, with dedicated support and extremely high standards. They achieved accuracy rates above 90% for MongoDB-related queries.',
      },
      { type: 'h2', text: 'Preserving expert time with Anthroly Agents automation' },
      {
        type: 'p',
        text: 'With premium engineering talent serving as subject matter experts, MongoDB wanted to think about their time as efficiently as possible. "Our engineers\' time is expensive and their attention is finite. We can\'t have them hunting for opportunities manually," Fiona explains.',
      },
      {
        type: 'p',
        text: 'The team deployed two specific Anthroly Agents to solve this. First, a citation aggregation agent that helps report on the AEO influence of cross-functional teams (Builder Relations, SEO, PR and Community), and next, a schema markup recommendation Agent that cuts the time to update releases by almost 30%.',
      },
      {
        type: 'p',
        text: '"We look to Agents to develop high quality V1 outputs that get routed to SMEs for review, reporting or implementation," she notes. "As builders in our own right, access to Anthroly Agents enabled us to centralize our tracking and automation in one platform, and get in on the ground floor of the tech that helps us show up for our customers."',
      },
      { type: 'h2', text: 'Rapid gains in AI visibility and accuracy' },
      {
        type: 'p',
        text: 'Since working with Anthroly, MongoDB has seen a 50% increase in AI Search visibility.',
      },
      {
        type: 'p',
        text: 'Their accuracy work delivered on its core promise: accuracy rates above 90% for MongoDB queries, meaning builders can stay in-flow getting accurate, complete answers about how to problem-solve or better leverage MongoDB without hunting through documentation.',
      },
      {
        type: 'p',
        text: '"The same URLs and campaigns now work double-duty, feeding both the traditional Google crawler and the LLM context window simultaneously, with automation making it sustainable for our team," Fiona notes.',
      },
      { type: 'h2', text: 'Preparing for agent-first development' },
      {
        type: 'p',
        text: "MongoDB's AEO program continues scaling in two directions: deeper automation and broader impact.",
      },
      {
        type: 'p',
        text: '"Deeper automation means agents that not only surface opportunities, like a key Reddit thread, but draft responses and tasks for the right owner. Broader impact means that as automation scales, we\'ll also free up time to broach new surfaces and scale the things that are working," Fiona explains.',
      },
      {
        type: 'p',
        text: 'The bigger vision reflects their understanding of where development is heading: "We\'re preparing for a future where search looks fundamentally different. Developers don\'t want to hunt through documentation; they want to instruct an AI agent to write the code for them. By structuring our data to feed those agents directly, MongoDB becomes visible to the next generation of builders."',
      },
      {
        type: 'quote',
        body: "If you are running a marketing team in 2026 and still treating AI optimization like a side project, you're already behind.",
        name: 'Fiona Erickson',
        role: 'Team Lead of Organic Acquisition',
      },
    ],
  },

  // ==========================================================================
  // WHOOP
  // ==========================================================================
  {
    slug: 'whoop',
    brand: 'WHOOP',
    domain: 'whoop.com',
    title: 'How WHOOP turned AI accuracy monitoring into a correction engine',
    metaTitle: 'WHOOP Case Study: AI Accuracy Correction Engine | Anthroly',
    metaDescription:
      "How WHOOP used Anthroly's FactCheck to monitor AI answers across 9 answer engines, correct inaccurate product claims fast, and gain 6.6% more visibility.",
    summary:
      "WHOOP used Anthroly's FactCheck to monitor AI answers across Answer Engines, catching inaccurate claims about their products, correcting them fast, and gaining 6.6% more visibility while protecting brand accuracy at scale.",
    metrics: [
      { value: '7.9%', label: 'AI responses flagged by FactCheck' },
      { value: '100', label: 'Hours saved by running Anthroly Agents across reporting and PDP optimization' },
      { value: '6.6%', label: 'Increase in visibility in 6 months' },
      { value: '9', label: 'Answer engines with gained visibility, including ChatGPT, Gemini, Claude, and Perplexity' },
    ],
    publishedAt: '2026-07-02',
    blocks: [
      {
        type: 'p',
        text: 'From its founding, WHOOP has been obsessive about understanding health and performance. Years of research have gone into the insights they offer their customers. So when WHOOP leadership saw that LLMs were changing how people discover wearables, they understood it was critical for the rigor and care they pour into their products to be visible and accurate.',
      },
      {
        type: 'p',
        text: 'Using Anthroly, they not only centralized their AEO reporting and automated workflows with Anthroly Agents, but also were able to identify key inaccuracies in LLM answers and remediate them so factual information would surface to their customers.',
      },
      {
        type: 'ul',
        items: [
          'Gained visibility across Answer Engines including ChatGPT, Gemini, Claude, Perplexity, Grok, Meta AI, Copilot, Google AI Mode, AI Overviews.',
          '100+ hours saved in less than a month by running 40+ Anthroly Agents.',
          '6.6% increase in visibility in 6 months, appearing in 56% of AI Search answers for top prompts.',
          '7.9% of AI responses flagged by FactCheck for accuracy issues, then routed for correction.',
        ],
      },
      {
        type: 'quote',
        body: "If we're showing up in search, but the answers portray our brand or product incorrectly, that's a risk to our business.",
        name: 'Sophia Scaglioni Melegari',
        role: 'Senior Business Analyst',
      },
      { type: 'h2', text: 'The health tech leader optimizing for AI Search' },
      {
        type: 'p',
        text: 'WHOOP is known for its precision. The Boston-based fitness technology company creates wearable devices that track training, recovery, and sleep with meticulous attention to engineering details to give continuous health insights.',
      },
      {
        type: 'p',
        text: 'When AI Search started providing information about their products, that precision needed to be clearly communicated to customers. WHOOP realized they needed comprehensive monitoring across all major AI platforms, along with the ability to track the accuracy of claims.',
      },
      {
        type: 'quote',
        body: "We take a lot of pride in our product. There's so much work that's gone into creating it. Every decision has been so thoughtful, and when that becomes misrepresented, we want to correct it immediately.",
        name: 'Sophia Scaglioni Melegari',
        role: 'Senior Business Analyst',
      },
      { type: 'h2', text: 'Finding a product and API purpose-built for their marketing ecosystem' },
      {
        type: 'p',
        text: 'When evaluating AEO solutions, WHOOP had specific technical requirements that ruled out many vendors. They needed API accessibility for data integration, comprehensive platform coverage, and tools built specifically for AEO challenges rather than retrofitted from traditional SEO.',
      },
      {
        type: 'p',
        text: 'Anthroly enables customers to operate in the ways that work best for them. For WHOOP, this meant the ability to centralize all AEO data in their existing business intelligence infrastructure.',
      },
      {
        type: 'p',
        text: '"As a company, we\'re super invested in bringing data into one centralized ecosystem. It seemed right away that Anthroly was purpose built around tackling AEO, and it was really easy to work with from an API standpoint," says Sophia. "Anthroly data is so easy to use and has led us to build reporting off of that. There are other data and even AEO tools we have access to, but we aren\'t using that data because Anthroly gives us everything we need."',
      },
      {
        type: 'p',
        text: 'For Josh Friedman, Associate Vice President of Product Marketing at WHOOP, ease of use was crucial. "I found from the moment that I logged into Anthroly that it just made sense," he says. The platform provided both introductory dashboards for quick insights and deeper analytical capabilities for technical users, and all of it is easy to use.',
      },
      {
        type: 'quote',
        body: "I don't have time to deal with friction. The team did a really nice job of providing different levels of access for a user so it's not overwhelming. It feels like Anthroly is building alongside us. There's an investment in our success, and they're an extension of the team.",
        name: 'Josh Friedman',
        role: 'Associate Vice President, Product Marketing',
      },
      {
        type: 'p',
        text: 'That ease of use shows up in the day-to-day rhythm of the team, too. For Kieran Riley, AEO Product Marketing Specialist, this manifested as Anthroly being the control center for his day.',
      },
      {
        type: 'quote',
        body: 'Honestly, Anthroly is the first tab I open in the morning. Before it, I was guessing where we turned up in ChatGPT or Gemini. Now I can see it, and I plan my week around the prompts that are actually moving.',
        name: 'Kieran Riley',
        role: 'AEO Product Marketing Specialist',
      },
      { type: 'h2', text: 'Beyond visibility: the push for accurate representation' },
      {
        type: 'p',
        text: "When WHOOP's team began monitoring how their products appeared in AI conversations, they discovered that AI wasn't just retrieving information about their brand, it was editorializing and sometimes providing incorrect details.",
      },
      {
        type: 'p',
        text: '"If you\'re comparing the latest versions of other wearables to older generations of WHOOP, it\'s going to be apples to oranges," says Sophia. "These comparisons aren\'t representative of a customer\'s journey, and we were seeing a sizable share of prompts that returned inaccurate results."',
      },
      {
        type: 'p',
        text: 'The implications extended beyond individual wrong answers. AI platforms were creating unfair competitive scenarios by comparing products across different generations or providing outdated specifications.',
      },
      {
        type: 'p',
        text: 'Anthroly provided the solution through its FactCheck feature, which identifies inaccurate claims in AI responses and flags them for review. This gave WHOOP the systematic accuracy monitoring they needed to address misinformation at scale.',
      },
      {
        type: 'p',
        text: 'FactCheck changed the nature of Kieran\'s job itself. "If an AI is telling someone something wrong about a WHOOP product, I can catch it, work out where it\'s coming from, and get a correction moving before a member ever runs into it. That used to be completely invisible to me."',
      },
      {
        type: 'p',
        text: 'These insights can then be actioned directly using Anthroly Agents, translating the insights into a connected workflow.',
      },
      { type: 'h2', text: 'How WHOOP uses Anthroly' },
      { type: 'h3', text: 'Monitoring accuracy at scale with FactCheck' },
      {
        type: 'p',
        text: 'WHOOP tracks whether AI responses mention correct product attributes while avoiding incorrect information. "We monitor the top line visibility of the prompts where we show up and where we don\'t, and how accurately," Sophia explains. They collaborated closely with Anthroly\'s engineering team during the FactCheck beta development, helping shape a product that addresses the core challenge of AI editorialization.',
      },
      { type: 'h3', text: 'Reporting on AEO in one unified system' },
      {
        type: 'p',
        text: "The company integrated Anthroly's data into their Snowflake data warehouse, creating centralized reporting that weights regional performance by total addressable market. This unified system gives leadership visibility into AEO performance alongside other marketing metrics, solving their need to produce enterprise-level reporting quickly within their existing infrastructure.",
      },
      {
        type: 'p',
        text: '"I was wowed by the collaboration that we\'ve had with Anthroly," says Sophia. "Zero click search is the new frontier, and it\'s shaping how customers find products and learn new things. We knew it was important to have that data integrated on the technical side early on, and Anthroly helped us stand up our current reporting based on their capabilities."',
      },
      { type: 'h3', text: 'Automating competitive analysis with the Anthroly MCP' },
      {
        type: 'p',
        text: 'WHOOP uses Anthroly Agents integrated with Claude to automate gap analysis workflows for go-to-market planning. "The ability to operate in the tools we are already using has been such a game changer for us," Friedman says. These workflows quickly generate competitive landscapes and content opportunity assessments that inform their content strategy.',
      },
      {
        type: 'quote',
        body: "When we have a go to market, we're able to do a gap analysis and understand the landscape of what needs to be refreshed, what's new, and what accuracy work needs to be done. We can run those as Anthroly Agents, and that's been such a game changer.",
        name: 'Josh Friedman',
        role: 'Associate Vice President, Product Marketing',
      },
      {
        type: 'p',
        text: 'Kieran can then put that content strategy to the test. "When we refreshed the content library, Anthroly was how I proved it worked. I didn\'t have to hope the updates mattered. I could watch specific pages start getting pulled into AI answers." Content decisions are no longer a guessing game, but something they can act on and step back to see the results.',
      },
      { type: 'h2', text: 'From visibility to accuracy: a comprehensive AEO program' },
      {
        type: 'p',
        text: "WHOOP's approach shifted their entire framework for thinking about AI Search. Rather than focusing purely on appearing in more AI responses, they now monitor how accurately they're being represented while maintaining visibility across all major platforms.",
      },
      {
        type: 'p',
        text: 'Their unified reporting system provides centralized visibility across ChatGPT, Claude, Gemini, and other AI platforms, with nuances like regional weighting that aligns with business priorities. The Agents integration allowed them to quickly assess competitive landscapes, identify content gaps, and close them.',
      },
      {
        type: 'quote',
        body: "I wouldn't hesitate recommending Anthroly to a three person company, but I wouldn't hesitate recommending Anthroly to a company at WHOOP's size and scale. I think that's pretty unique.",
        name: 'Josh Friedman',
        role: 'Associate Vice President, Product Marketing',
      },
      {
        type: 'p',
        text: "Through their collaboration on FactCheck development, they've built early warning systems for misinformation that could damage their competitive position. When AI platforms provide incorrect specifications or create unfair product comparisons, they now have systematic detection and response capabilities.",
      },
      { type: 'h2', text: "What's next: building actionable accuracy workflows" },
      {
        type: 'p',
        text: 'WHOOP is already using FactCheck to turn accuracy insights into Agents they can ship, and they\'re only expanding on it. "Being able to pinpoint the sources of the accuracy and misaligned responses is massively valuable because it gives us a really high data signal action list to correct," Josh explains.',
      },
      {
        type: 'p',
        text: 'The company sees accuracy monitoring as mission-critical for competing in AI Search where nuanced product specifications can make or break purchase decisions. The combination of unified reporting, automated competitive analysis, and accuracy detection created efficiency gains across their entire AEO operation.',
      },
      {
        type: 'quote',
        body: 'Using Anthroly is a massive efficiency gain for us. Speed is so important for WHOOP and AEO in general. Being able to do something efficiently is the difference between it happening or not happening.',
        name: 'Josh Friedman',
        role: 'Associate Vice President, Product Marketing',
      },
    ],
  },

  // ==========================================================================
  // Optro
  // ==========================================================================
  {
    slug: 'optro',
    brand: 'Optro',
    domain: 'optro.com',
    title: 'How Optro measured and accelerated their rebrand with Anthroly Agents',
    metaTitle: 'Optro Case Study: Rebrand AI Visibility +70% | Anthroly',
    metaDescription:
      'How Optro tracked its rebrand from AuditBoard across AI engines and achieved a 70% increase in citation share with Anthroly Agents — updating 31 articles in one week.',
    summary:
      'Optro needed to ensure its presence in traditional search for AI-powered GRC intelligence would carry over into LLM answers following its rebrand from AuditBoard. Anthroly helped them capture AI visibility and achieve a 70% increase in citation share across relevant queries to accelerate their growth.',
    metrics: [
      { value: '70%', label: 'Improvement in citation ranking in AI engines for a completely new brand name' },
      { value: '10X', label: 'Efficiency gain in content production (7 days vs. months)' },
      { value: '31', label: 'Articles updated in one week using Anthroly Agents' },
      { value: '2', label: 'Hours saved per workflow vs. manual processes' },
    ],
    publishedAt: '2026-06-18',
    blocks: [
      {
        type: 'p',
        text: "When Optro rebranded from AuditBoard, the AI-powered governance, risk, and compliance platform faced an unprecedented challenge: tracking how its brand transformation was playing out across AI engines like ChatGPT and Google's AI overviews.",
      },
      {
        type: 'p',
        text: "With no benchmark for measuring rebrand success in AI Search, Ron Samson, Sr. Growth Marketing Manager, needed both strategic visibility and the ability to act on new insights. Using Anthroly's Answer Engine Insights and Agents, Optro achieved a leading citation share while streamlining content optimization from months to days.",
      },
      {
        type: 'quote',
        body: "There aren't any case studies around how a name change affects visibility in LLMs. We had no way of knowing the impact or how to influence quick growth, so I knew we needed to dig in and experiment to get results.",
        name: 'Ron Samson',
        role: 'Sr. Growth Marketing Manager at Optro',
      },
      { type: 'h2', text: 'The rebrand challenge in AI Search' },
      {
        type: 'p',
        text: "Optro is the leading AI-powered GRC intelligence platform empowering enterprises to transform risk into opportunity, serving more than 50% of the Fortune 500 and 7 of the Fortune 10. This new identity reflects the value Optro provides to teams: a single, coherent view across audit, risk, infosec, and compliance, while staying true to the company's foundational vision of providing innovative solutions built by practitioners, for practitioners.",
      },
      {
        type: 'p',
        text: "The rebrand created an urgent need for AI engine monitoring that existing tools couldn't address. Leadership was asking performance questions that couldn't be answered with traditional analytics.",
      },
      {
        type: 'p',
        text: '"We were getting a lot of questions around how we were performing in ChatGPT or Google AI overviews. Previously, before Anthroly, we could only search it manually ourselves. But every time you search, you get different responses because answers are generated differently each time. We couldn\'t trust that method," explains Ron.',
      },
      {
        type: 'p',
        text: 'The team had no way to benchmark their old brand performance or track how the new brand was gaining recognition across AI engines.',
      },
      {
        type: 'quote',
        body: "When we became Optro, every AI engine still knew us as AuditBoard. Nearly a decade of authority was tied to a name we were retiring, and the new one didn't exist in any model's answer yet. A 301 redirect fixes that for Google in days. AI doesn't re-learn on our schedule. We needed to see, in real time, whether the engines were connecting Optro to the topics that matter to our business.",
        name: 'Ron Samson',
        role: 'Sr. Growth Marketing Manager at Optro',
      },
      { type: 'h2', text: 'Measuring brand progress with Answer Engine Insights' },
      {
        type: 'p',
        text: "Optro started using Anthroly's Answer Engine Insights to create the missing benchmark for tracking brand transition across AI engines. Ron set up two monitoring entities: one maintaining consistent topics for historical comparison between AuditBoard and Optro, and another testing broader opportunities with persona-specific and industry-specific prompts.",
      },
      {
        type: 'p',
        text: '"Looking at our citations, I have control over what\'s being pulled into AI answers. I can optimize for the type of content that\'s being pulled in, and the insight into where we are strong or not," he says.',
      },
      {
        type: 'p',
        text: 'The data revealed how brand transitions happen in AI search. The old brand maintained strong performance while the new brand gradually gained recognition.',
      },
      {
        type: 'p',
        text: '"Our new name is catching up and doing really well within citations," Ron notes. Optro saw a 70% increase in citation share for GRC-related prompts. This reflected how significantly and quickly the new Optro identity gained recognition in AI search.',
      },
      { type: 'h2', text: 'Operationalizing optimization with Anthroly Agents' },
      {
        type: 'p',
        text: "Visibility was only one part of the equation. Ron needed to act on the insights efficiently and make up ground quickly. And traffic alone wasn't enough: pages that earned citations still needed to convert. Anthroly Agents automated workflows across the full funnel, from optimizing paid search landing pages for conversion to research-based article creation and page optimization at scale. The agent builder eliminated hours of manual prompt engineering.",
      },
      {
        type: 'quote',
        body: 'Each time I build an Agent using the agent builder, I save at least two hours of time.',
        name: 'Ron Samson',
        role: 'Sr. Growth Marketing Manager at Optro',
      },
      {
        type: 'p',
        text: 'The breakthrough came with running optimization Agents across multiple articles simultaneously using Anthroly Sheets. "Last week, for example, I was able to update 31 articles in one week. I was only able to do this because Anthroly Sheets let me deploy an Agent across multiple pieces of content at once and then go publish them directly in our CMS," he explains.',
      },
      {
        type: 'p',
        text: 'Before automation, content updates required extensive coordination across specialized writers. "Without Anthroly, updates like that would have taken months because we\'d have to work across writers who are experts in different categories," he says.',
      },
      { type: 'h2', text: 'Results from strategic monitoring and operational efficiency' },
      {
        type: 'ul',
        items: [
          'Citation leadership achieved: a 70% increase in citation share in the GRC category, with the new brand gaining ground while the old brand maintained strong performance during transition.',
          '10X acceleration in content production: what previously took months of writer coordination now completes in one week. Ron updated 31 articles in seven days, significantly faster than before.',
          'Workflow creation efficiency doubled: the visual agent builder saves two hours per automation compared to manual prompt engineering, enabling faster iteration on optimization strategies.',
        ],
      },
      {
        type: 'quote',
        body: "Once the Agent is built, you can run it across dozens or hundreds of articles in minutes. That's the kind of scale and speed we needed.",
        name: 'Ron Samson',
        role: 'Sr. Growth Marketing Manager at Optro',
      },
      { type: 'h2', text: "What's next" },
      {
        type: 'p',
        text: 'Optro is implementing end-to-end automation from opportunity identification to content publication through a CMS integration.',
      },
      {
        type: 'p',
        text: 'The team is expanding its knowledge base with integrations and exploring industry-specific optimization opportunities. "We are able to learn continuously. For example, we published a set of articles around enterprise risk. They were cited within two days and started ranking really well. Whereas other ones we published, haven\'t been even a month later." Optro is looking forward to continuing to test and learn with Anthroly.',
      },
    ],
  },

  // ==========================================================================
  // Kiteworks
  // ==========================================================================
  {
    slug: 'kiteworks',
    brand: 'Kiteworks',
    domain: 'kiteworks.com',
    title: 'How Kiteworks outranked Microsoft in AI Search with Anthroly',
    metaTitle: 'Kiteworks Case Study: Outranking Microsoft in AI Search | Anthroly',
    metaDescription:
      'How Kiteworks reached ~50% aggregate AI visibility — ahead of Microsoft, Box, and Dropbox — and became the #1 cited domain across key prompts with Anthroly.',
    summary:
      'Kiteworks needed to ensure its hard-earned presence in traditional search for secure and compliant data exchange would carry over into LLM-generated answers. Anthroly helped them capture AI visibility and citations across relevant queries to outrank industry giants like Microsoft and Box.',
    metrics: [
      { value: '~50%', label: 'Aggregate AI visibility across key topics (ahead of Microsoft, Box, and Dropbox)' },
      { value: '#1', label: 'Cited domain within one month across key prompts' },
      { value: '~8x', label: 'Daily content output powered by Anthroly Agents' },
    ],
    publishedAt: '2026-06-05',
    blocks: [
      {
        type: 'quote',
        body: "I use Anthroly pretty much all day, every day. The platform shows us exactly how Kiteworks is performing across AI models and how to increase our visibility. We've been working together for five months, and we have been thrilled with the results.",
        name: 'Rob Dougherty',
        role: 'Senior Director of Search Content at Kiteworks',
      },
      { type: 'h2', text: 'Overview' },
      {
        type: 'p',
        text: 'Kiteworks is a cybersecurity company that enables organizations to securely share sensitive data like personally identifiable information (PII) and intellectual property (IP) in compliance with global data privacy regulations, including CMMC, GDPR, HIPAA, and ITAR. Their platform is among the first to unify employee and AI agent data exchange under a single governance, policy, and audit framework. At a $1B+ valuation, the company serves over 100M end users and more than 3,650 global enterprises and government agencies across industries.',
      },
      { type: 'h2', text: 'Standing out in compliance-focused AI searches' },
      {
        type: 'p',
        text: "As Kiteworks' Senior Director of Search Content, Rob Dougherty's mission is to ensure buyers find Kiteworks wherever they look for secure, governed data exchange and AI privacy solutions. So when LLMs emerged as a new discovery channel, maximizing AI visibility and citations became his top priority.",
      },
      {
        type: 'p',
        text: '"I could see buyers turning more and more to AI for answers, and I knew we needed to get ahead of that shift," says Rob. This led him to the critical first step of understanding how Kiteworks was already showing up in AI-generated answers.',
      },
      {
        type: 'quote',
        body: 'Many buyers are now using tools like Claude, ChatGPT, and Gemini to get tailored answers to their security and compliance questions. We wanted Kiteworks to be a consistent and definitive source of record for their queries, especially as they relate to sensitive data transfer.',
        name: 'Rob Dougherty',
        role: 'Senior Director of Search Content at Kiteworks',
      },
      { type: 'h2', text: 'Bridging the gap between SEO rankings and AI answers' },
      {
        type: 'p',
        text: 'Kiteworks had already built a strong SEO foundation that was earning page-one and page-two Google rankings for multiple keywords. But ranking in traditional search and appearing in AI-generated answers are two different games.',
      },
      {
        type: 'p',
        text: '"Google still maintains the lion\'s share of search traffic," says Rob. "But search itself is rapidly evolving to encompass LLM queries, and the search market is expanding. We couldn\'t afford to wait for traditional SEO tools to build AEO functions that bridge the gap."',
      },
      {
        type: 'p',
        text: 'To build an authoritative, durable presence across LLMs, he had three strategic requirements:',
      },
      {
        type: 'ul',
        items: [
          "AI visibility intelligence: Rob needed to know what prospective buyers were asking LLMs and whether Kiteworks' existing content addressed these queries to grow the company's visibility in answer engines.",
          "Content execution at scale: To ensure Kiteworks had an answer for every buyer's question, Rob needed to turn LLM performance intelligence into published content quickly and at scale, without pulling a small team's focus away from other core initiatives.",
          "AEO expertise: Rob wanted a partner operating at the forefront of AEO who could hone in on the AI visibility data that mattered most and provide expert advice to ensure Kiteworks' content strategy evolved together with changing search habits.",
        ],
      },
      {
        type: 'p',
        text: 'Recognizing that optimizing for AI visibility required a fresh approach, he began evaluating dedicated AEO platforms.',
      },
      { type: 'h2', text: 'Choosing a platform purpose-built for AEO' },
      {
        type: 'p',
        text: 'Rob evaluated several vendors that reported citation share across ChatGPT, Claude, and Gemini, but most stopped at a dashboard.',
      },
      {
        type: 'p',
        text: '"A lot of companies in this space can tell you what your LLM performance is, but almost nobody gives you the next step," says Rob. "We needed a partner who used their data to recommend content topics, strategies, and layouts that would help us capture new visibility opportunities."',
      },
      {
        type: 'p',
        text: 'Anthroly checked every box. The platform combined prompt-level measurement across models, a content execution layer, and an experienced team with real AEO and cybersecurity experience.',
      },
      {
        type: 'p',
        text: 'These capabilities were exactly what Kiteworks needed to turn answer engines into a key acquisition channel.',
      },
      {
        type: 'quote',
        body: 'It became clear that partnering with Anthroly was the only path to sustainable growth in AI Search.',
        name: 'Rob Dougherty',
        role: 'Senior Director of Search Content at Kiteworks',
      },
      { type: 'h2', text: 'Amplifying reach across LLMs' },
      {
        type: 'p',
        text: 'The Anthroly team handled every part of the onboarding process. The moment Rob logged in to the platform, he already had a 360-degree view of Kiteworks\' AI visibility across a library of relevant topics and prompts, so he "went straight into writing on day one."',
      },
      {
        type: 'p',
        text: 'With this foundation, Rob operationalized AEO across five key areas:',
      },
      { type: 'h3', text: 'Tracking AI visibility and competitive positioning' },
      {
        type: 'p',
        text: "Rob uses Anthroly daily to track Kiteworks' brand mentions and citations across LLMs relative to direct and peripheral competitors, and surface opportunities to take ground. Equally important, he tracks how answer engines present Kiteworks in their answers to see the brand narrative as buyers do. With this perspective, he prioritizes content that communicates the platform's depth and accelerates qualified leads toward the next stage.",
      },
      { type: 'h3', text: 'Using LLM intelligence to drive content decisions' },
      {
        type: 'p',
        text: 'Rob and the Kiteworks team already had the technical depth to write authoritatively on compliance and data security. With Anthroly, they now have the signal telling them where to point that expertise. "Every signal that Anthroly gives us shapes the next asset," shares Rob. "The tactical guides, trend reports, and vendor comparisons we build all answer questions that buyers are asking across LLMs."',
      },
      { type: 'h3', text: 'Producing content at scale' },
      {
        type: 'p',
        text: "Once Rob knows where to focus, he uses Anthroly Agents to generate content based on target prompts and Kiteworks' tone, voice, and positioning. With this execution engine, his team delivers enterprise-level output, publishing eight times more posts per day and building a library that keeps them at the top of AI-generated answers. As a result, Kiteworks has enhanced aggregate AI visibility across key compliance and cybersecurity topics to 48%, surpassing much larger competitors like Microsoft, Box, and Dropbox.",
      },
      { type: 'h3', text: 'Maximizing AEO potential at every stage' },
      {
        type: 'p',
        text: "While the platform exceeded Rob's expectations, Anthroly's customer support sealed the partnership. Their dedicated Customer Success Manager stays close, providing hands-on support as Kiteworks' needs evolve and new capabilities roll out.",
      },
      {
        type: 'p',
        text: 'When Agents launched, he mapped the capability to existing workflows so Rob could extract value immediately. "Our Customer Success Manager immediately got in touch to walk me through the Agents feature so we could start extracting value right away," shares Rob.',
      },
      { type: 'h3', text: 'Staying ahead of a rapidly evolving category' },
      {
        type: 'p',
        text: 'As LLM algorithms and citation patterns shift, Anthroly helps Rob keep Kiteworks\' AEO strategy one step ahead. "Anthroly isn\'t just keeping pace with where AI Search is going," he says. "They\'re on the forefront, backed by extensive research and testing." Leaning on their deep AEO expertise and innovative product features, he can identify emerging content opportunities across answer engines, explore new content formats to match each model\'s answer patterns, and optimize for query fanouts.',
      },
      {
        type: 'quote',
        body: "Anthroly gives us a complete loop from AI visibility insights to content production to performance measurement. We've become a top-cited domain across the compliance and cybersecurity topics we care most about.",
        name: 'Rob Dougherty',
        role: 'Senior Director of Search Content at Kiteworks',
      },
      { type: 'h2', text: 'Nearly 50% AI visibility across competitive prompts in five months' },
      {
        type: 'p',
        text: 'With Anthroly, Kiteworks has built a leading presence in the queries that matter most to security professionals and governance, risk, and compliance (GRC) officers. That AI visibility translates into a concrete, measurable advantage over key competitors.',
      },
      {
        type: 'p',
        text: 'As Rob puts it, "We are a lean team at a fast-growing company, but Anthroly empowers us to operate and win at an enterprise scale."',
      },
      {
        type: 'ul',
        items: [
          '~50% aggregate AI visibility across key topics, outranking Microsoft, Box, Dropbox, and other competitors with larger budgets and search teams',
          '#1 cited domain within one month across key prompts, driven by targeted content built around relevant compliance and cybersecurity queries',
          '~8x daily content output powered by Anthroly Agents, turning AI visibility insights into on-brand drafts',
        ],
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: 'Rob is expanding his use of Anthroly Agents to more workflows and building a regular content optimization rhythm. "There are even more citation opportunities we can capture by updating our existing assets alongside net-new content production," he says.',
      },
      {
        type: 'p',
        text: "The program is also growing beyond Rob. As his EMEA colleague deepens his practice on the platform, he consistently expands Kiteworks' reach among qualified leads in key emerging markets. What started as a North American playbook has become a global, coordinated AEO function that compounds Kiteworks' citation authority and sets the stage for exponential growth.",
      },
      {
        type: 'quote',
        body: 'Anthroly has enabled us to be extremely productive and extremely successful with our AEO strategy.',
        name: 'Rob Dougherty',
        role: 'Senior Director of Search Content at Kiteworks',
      },
    ],
  },

  // ==========================================================================
  // Arizona College of Nursing
  // ==========================================================================
  {
    slug: 'arizona-college-of-nursing',
    brand: 'Arizona College of Nursing',
    domain: 'arizonacollege.edu',
    title: 'How Arizona College of Nursing increased AI-referred traffic conversions by 51% with Anthroly Agents',
    metaTitle: 'Arizona College of Nursing: +51% AI Conversions | Anthroly',
    metaDescription:
      'How Arizona College of Nursing used Anthroly Agents across 24 local markets to lift AI-referred enrollment inquiries 51% and become the #1 cited domain.',
    summary:
      'Arizona College of Nursing needed to increase its AI visibility across 24 hyper-local markets to ensure its top-tier program surfaced for aspiring nurses researching school options. Anthroly gave them the visibility intelligence and AI-powered workflows to increase AI-referred conversions by 51% in 90 days.',
    metrics: [
      { value: '51%', label: 'Increase in AI-referred enrollment inquiries' },
      { value: '26%', label: 'Increase in AI-driven website visits' },
      { value: '#1', label: 'Most cited domain across key prompts' },
      { value: '12%', label: 'Increase in AI visibility' },
      { value: '20', label: 'Hours saved monthly with Anthroly Agents' },
    ],
    publishedAt: '2026-05-27',
    blocks: [
      {
        type: 'quote',
        body: "Very rarely do you find a tool that gets more valuable the longer you use it. The value of our partnership with Anthroly keeps growing, and so does what's possible.",
        name: 'Francis Dayton',
        role: 'Web Product Manager at Arizona College of Nursing',
      },
      { type: 'h2', text: 'About' },
      {
        type: 'p',
        text: "Arizona College of Nursing (AZCN) is an accredited nursing school dedicated to preparing the next generation of registered nurses. Their 3-year BSN program offers a fast-track pathway to earning a nursing degree and launching a fulfilling nursing career. Combining hands-on clinical practice, advanced simulation labs, and flexible schedules with personalized support, AZCN's nursing program is designed to prepare students for success from day one.",
      },
      { type: 'h2', text: 'Dominating AI Search to drive student enrollment' },
      {
        type: 'p',
        text: "As a top-ranked nursing school, Arizona College of Nursing (AZCN) knows that advancing the future of nursing starts with reaching the next generation of prospective students. Maximizing AZCN's presence across its 24 distinct markets is Francis Dayton's core focus as Web Product Manager. For years, his work revolved around SEO keyword targeting and earning page rankings on Google.",
      },
      {
        type: 'p',
        text: 'As AI-generated responses became a primary influence on how future nurses researched the program that would launch their career, Francis recognized that AZCN needed to compete inside those answers, beyond just traditional search results.',
      },
      {
        type: 'p',
        text: '"As soon as Google rolled out AI Overviews, I knew we needed to dedicate serious focus to showing up in those answers," says Francis.',
      },
      {
        type: 'quote',
        body: 'Aspiring nurses were getting program guidance inside LLM-generated responses, so they were becoming a key traffic source to our site.',
        name: 'Francis Dayton',
        role: 'Web Product Manager at Arizona College of Nursing',
      },
      { type: 'h2', text: 'AZCN requirements for an AEO platform' },
      {
        type: 'p',
        text: 'If AZCN could act fast on AEO, it could position itself as the go-to source in AI-generated answers for students. That would allow them to secure this visibility ahead of other local competitors.',
      },
      {
        type: 'p',
        text: 'So Francis set out to find a dedicated AEO platform. Working with Matthew Jensen, Senior Manager of Web & Digital Marketing, he defined four operating demands any solution would need to meet:',
      },
      {
        type: 'ul',
        items: [
          "Prompt volume intelligence: knowing which questions prospective students were actually asking AI answer engines, and how often, would ensure Francis' content prioritization was based on real demand rather than keyword assumptions.",
          'Granular AI visibility insights: Francis needed to see what content formats were winning citations in AI-generated answers, which were losing ground, and which local competitors surfaced in each market.',
          'Scalable content operations: to capture every emerging content opportunity across 24 markets, Francis needed a system that could quickly and effectively convert LLM visibility signals into publish-ready updates.',
          "Strategic hands-on support: building AZCN's AEO practice from scratch required more than a dashboard. Francis needed a team invested in translating LLM signals into a real content strategy, market by market.",
        ],
      },
      { type: 'h2', text: 'A different kind of AEO partner' },
      {
        type: 'p',
        text: "Nearly all of the platforms Francis and Matthew tested stopped at raw AI visibility data, missing the geographical granularity and workflow capabilities that were critical for scaling AZCN's hyper-local content strategy.",
      },
      {
        type: 'p',
        text: '"Each market is a living organism with its own search landscape, competitors, and topics that interest candidates," shares Francis. "For our business, being able to track our LLM performance across these dimensions is an absolute must," adds Eric Sisak, Senior Vice President of Marketing and Expansion.',
      },
      {
        type: 'p',
        text: "The solution that checked all of their boxes was Anthroly. The platform paired market-level AI citation tracking with deep insights into the questions and topics that defined students' AI conversations. And the team felt less like a vendor and more like an innovative partner committed to AZCN's success across every market. The exact combination that AZCN required.",
      },
      {
        type: 'quote',
        body: 'Anthroly was the only one that offered the analysis depth and specificity we required.',
        name: 'Matthew Jensen',
        role: 'Senior Manager of Web & Digital Marketing at Arizona College of Nursing',
      },
      { type: 'h2', text: "Anthroly powers AZCN's AEO practice across every market" },
      {
        type: 'p',
        text: 'From the first call, onboarding felt more like a co-build than a handoff.',
      },
      {
        type: 'p',
        text: "Working with a dedicated account manager, Francis curated a library of 300+ market-specific prompts prospective students ask to find top-ranked nursing programs. Using one-click custom tags, he created a unified system for tracking AZCN's LLM performance.",
      },
      {
        type: 'p',
        text: "With that foundation in place, Francis runs AZCN's AEO strategy in Anthroly via three core motions.",
      },
      { type: 'h3', text: 'LLM performance monitoring that guides content efforts' },
      {
        type: 'p',
        text: "For each market-specific prompt set, Francis tracks how often AZCN is cited in AI-generated answers, which competitors outrank it, and how performance varies across content types. This detailed view serves as Francis' weekly read on AZCN's competitive position, a non-negotiable input when shaping AZCN's content roadmap.",
      },
      {
        type: 'quote',
        body: "Anthroly's LLM citation and visibility insights are our health check in terms of our competitive positioning across markets.",
        name: 'Francis Dayton',
        role: 'Web Product Manager at Arizona College of Nursing',
      },
      { type: 'h3', text: 'Agents that turn intelligence into action' },
      {
        type: 'p',
        text: "Using Anthroly Agents, Francis now runs a suite of AI agents that convert AI visibility signals into publish-ready drafts and page updates. Each agentic workflow is mapped to campus tags, local page formats, and AZCN's brand voice, so one system drives localized execution at scale.",
      },
      {
        type: 'ul',
        items: [
          "For paid landing pages, Francis runs agents that benchmark AZCN's site against competitors to identify gaps in messaging.",
          'Another set of agents scans for and acts on niche content opportunities, such as building tuition comparisons and localized FAQs for admissions-related questions.',
          "These agents also analyze the college's overall competitiveness in AI Search in minutes by pulling in data from AZCN's tech stack.",
        ],
      },
      {
        type: 'p',
        text: '"After an agent is built, we run it per market and generate the insights we need on demand," Francis highlights.',
      },
      {
        type: 'p',
        text: 'What once required hours of manual research across multiple tools now runs automatically, freeing the AZCN team to focus on scaling AEO impact.',
      },
      {
        type: 'quote',
        body: 'Signing Anthroly was an excellent decision by Francis and Matthew, and has already exceeded our ROI projections.',
        name: 'Eric Sisak',
        role: 'Senior Vice President of Marketing and Expansion at Arizona College of Nursing',
      },
      { type: 'h3', text: 'Built-in education that compounds LLM performance' },
      {
        type: 'p',
        text: "With Anthroly, Francis has a complete AEO system, plus a built-in path to leveling up his own expertise. Anthroly University, their educational hub, offers short, structured courses on AEO fundamentals and data-driven marketing, helping Francis sharpen AZCN's AEO strategy without slowing down execution.",
      },
      {
        type: 'p',
        text: 'The way that Francis approaches his work, using marketing instincts and expertise combined with an engineering mindset, is representative of a new role that is emerging: the Marketing Engineer. His agentic workflows are a model for others to emulate and have informed Anthroly University coursework. "We partnered with Anthroly because what they\'ve been building in AI visibility has been next-level. Then they rolled out their AI agents, and we\'ve since compressed hours\' worth of work into minutes. They\'ve enabled us to build an entirely new operating muscle for AEO at AZCN and continue upleveling as the landscape evolves."',
      },
      { type: 'h2', text: '#1 most-cited domain for priority prompts' },
      {
        type: 'p',
        text: 'With Anthroly, AZCN built a rigorous AEO practice that helps them reach aspiring nurses searching for the program that will prepare them to serve their communities. Across 24 distinct markets, that visibility has turned into a compounding growth advantage.',
      },
      {
        type: 'p',
        text: '"We\'re now the top-cited domain for our priority BSN prompts," shares Francis. "That citation share directly fuels enrollment interest."',
      },
      { type: 'p', text: 'In 90 days:' },
      {
        type: 'ul',
        items: [
          '51% increase in AI-referred enrollment inquiries, driven by surfacing targeted content in program comparison and cost queries',
          '26% increase in AI-driven website visits, with consistent gains across markets',
          '#1 most cited domain across key prompts, ahead of local college competitors and other citation sources',
          '12% increase in AI visibility across the most-asked nursing program questions in ChatGPT, Claude, and Gemini',
          '20 hours saved monthly with Anthroly Agents, by automating workflows like weekly AEO reporting and niche, campus-specific content creation',
        ],
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: 'For Francis, the next chapter with Anthroly is all about going deeper on Agents.',
      },
      {
        type: 'p',
        text: 'Completing Anthroly\'s Agent Engineering Certification puts him in the first cohort of marketers trained to design, deploy, and measure the impact of AEO agents at scale. "Having a team member certified by Anthroly is a great value-add for the college, especially considering where the industry is headed," says Francis.',
      },
      {
        type: 'p',
        text: "He is also exploring use cases for agent-driven workflows across departments like admissions operations and student services, further enhancing AZCN's ability to inspire and attract the next generation of nurses.",
      },
      {
        type: 'quote',
        body: 'Anthroly really extends itself as a partner, rather than just a platform. I liked that early on, and I continue to feel it today after two years of our partnership.',
        name: 'Francis Dayton',
        role: 'Web Product Manager at Arizona College of Nursing',
      },
    ],
  },

  // ==========================================================================
  // Alchemy
  // ==========================================================================
  {
    slug: 'alchemy',
    brand: 'Alchemy',
    domain: 'alchemy.com',
    title: 'Alchemy drives a 7x higher signup rate from AI-referred traffic with content Agents',
    metaTitle: 'Alchemy Case Study: 7x Signup Rate From AI Traffic | Anthroly',
    metaDescription:
      'How Alchemy built an AEO strategy with Anthroly that made AI its largest acquisition channel, with a 7x higher signup rate from AI-referred visitors.',
    summary:
      'Alchemy needed a way to track and shape how their blockchain development platform appeared in AI-generated answers. They partnered with Anthroly to build an AEO strategy that drives a 7x higher signup rate than other inbound channels.',
    metrics: [
      { value: '7x', label: 'Higher signup rate from AI-referred visitors compared to other traffic sources' },
      { value: '3x', label: "Increase in AI's share of self-attested signups in one year" },
      { value: 'AI', label: 'Is the single largest acquisition channel' },
      { value: '23%', label: 'Increase in AI visibility' },
    ],
    publishedAt: '2026-05-15',
    blocks: [
      {
        type: 'quote',
        body: 'Developers increasingly begin their research in Claude, ChatGPT, and Gemini. Anthroly enables us to track where we win in those conversations, and where to push next.',
        name: 'Max Crawford',
        role: 'Growth Marketing Manager at Alchemy',
      },
      { type: 'h2', text: 'Overview' },
      {
        type: 'p',
        text: 'Alchemy is the leading developer platform for crypto, powering blockchain applications for builders at every scale, from solo developers to companies like Robinhood, Stripe, Visa, Coinbase, and Polymarket. Their product suite spans blockchain infrastructure, data APIs, and transaction tooling across 100+ chains. As agentic applications increasingly run on top of crypto rails, Alchemy is building the infrastructure and tooling these applications depend on.',
      },
      { type: 'h2', text: 'Winning inbound as developers turn to LLMs' },
      {
        type: 'p',
        text: 'Max Crawford, Growth Marketing Manager at Alchemy, was increasingly seeing blockchain developers turn to AI tools like Claude and ChatGPT to build crypto applications. It was a clear signal that LLMs could become a key inbound driver for the company. To capture the full potential of this high-conversion channel, however, required AI visibility insights.',
      },
      {
        type: 'quote',
        body: 'AI-referred traffic to Alchemy was climbing every quarter. We needed to get ahead of that channel rather than chase it.',
        name: 'Max Crawford',
        role: 'Growth Marketing Manager at Alchemy',
      },
      {
        type: 'p',
        text: "With Alchemy's dozens of tools and new ones shipping constantly, mapping LLM performance was no small task. Unlike web traffic, where a homepage serves as a reliable proxy for brand awareness, AI tools link developers to the pages that answer their questions, such as docs, blog posts, and product pages. Max needed to understand how each product showed up in AI-generated responses across Alchemy's entire content surface, and where to sharpen its positioning to win qualified leads.",
      },
      {
        type: 'p',
        text: "He knew that building an AEO practice from scratch would depend on sustained focus and deep expertise. But that level of commitment would have quickly consumed his team's bandwidth. Instead, Max looked for a partner who could deliver both the technology and the playbook.",
      },
      { type: 'h2', text: 'Finding the right AEO partner' },
      { type: 'p', text: 'Max outlined three criteria to guide his evaluation:' },
      {
        type: 'ul',
        items: [
          "Granular, actionable insights: visibility into what content earns citations, what prompts Alchemy could own before competitors, and what external sources are worth winning for Alchemy's LLM footprint.",
          'Fast time to value: intuitive AEO tools that would drive results quickly without pulling focus from core initiatives.',
          'AEO expertise: a partner with deep industry knowledge, real-world experience, and proven best practices, not trial and error.',
        ],
      },
      {
        type: 'p',
        text: "Anthroly checked every box. After demoing the platform, Max knew he'd found his answer.",
      },
      {
        type: 'quote',
        body: 'Most AEO tools are still figuring out what they need to measure. Anthroly is already three steps ahead.',
        name: 'Max Crawford',
        role: 'Growth Marketing Manager at Alchemy',
      },
      { type: 'h2', text: 'Turning AI-powered search into a high-conversion channel' },
      {
        type: 'p',
        text: "Once Anthroly was live, Max had a clear picture of Alchemy's performance across LLMs. With that clarity, he started mapping where to take the content strategy next.",
      },
      { type: 'h3', text: 'Capturing qualified developers with actionable AEO insights' },
      {
        type: 'p',
        text: "Max uses Anthroly to track the questions developers are asking LLMs and how often Alchemy comes up. To surface an AI visibility profile for each Alchemy tool, he tags each prompt by product and filters the data by tag. Using that view alongside Alchemy's SEO data, he and his team prioritize what content to write and update each month.",
      },
      {
        type: 'p',
        text: 'For example, when developers search "how to build a stablecoin," Alchemy\'s blog surfaces a detailed walkthrough. Similarly, when a developer prompts an AI Agent to "build a trading bot on Solana," Max uses Anthroly\'s analytics to double down on the posts and tutorials that those models repeatedly cite for similar queries.',
      },
      {
        type: 'quote',
        body: "Anthroly's AI visibility insights help shape our entire content roadmap.",
        name: 'Max Crawford',
        role: 'Growth Marketing Manager at Alchemy',
      },
      { type: 'h3', text: 'Optimizing content for how LLMs think' },
      {
        type: 'p',
        text: "Drawing on Anthroly's AEO expertise, Max structures Alchemy's content for effective LLM crawling. For every asset, he layers question-format subheaders, FAQ schemas, and digestible snippets. This formatting makes technical concepts easier for LLMs and human readers to parse, boosting engagement and AI visibility.",
      },
      {
        type: 'p',
        text: "With this foundation in place, Max looked to scale the value across Alchemy's library using Anthroly's Agents. When he wanted to roll out FAQ sections across older Alchemy posts, his Agents handled the entire process in just a few hours, generating an instant lift in AI visibility and creating a repeatable pattern for future content. With execution taken care of, he stays focused on what to build next.",
      },
      {
        type: 'quote',
        body: 'Anthroly tells us which tactics move AI visibility, and we roll them out at scale. Some of our biggest AEO wins have been surprisingly simple, like FAQ sections and a cleaner content structure.',
        name: 'Max Crawford',
        role: 'Growth Marketing Manager at Alchemy',
      },
      { type: 'h3', text: 'Building authority beyond owned content' },
      {
        type: 'p',
        text: "Max also uses Anthroly to see which third-party sources are shaping AI responses for the prompts Alchemy wants to own: trade press, Wikipedia, and other reference sites. These insights inform which publications are worth pursuing to compound Alchemy's AI authority over time.",
      },
      {
        type: 'quote',
        body: 'The sources that influence AI answers and the ones that drive traffic are rarely the same. Anthroly tells us which is which.',
        name: 'Max Crawford',
        role: 'Growth Marketing Manager at Alchemy',
      },
      { type: 'h2', text: "Alchemy 3x's share of signups driven by AI in one year" },
      {
        type: 'p',
        text: 'With Anthroly, Alchemy has built an AEO engine that turns AI visibility into a measurable growth driver across its product suite. Alchemy now shows up at every step of a developer\'s journey, earning trust and converting developers looking to start building.',
      },
      { type: 'p', text: 'The numbers reflect this momentum:' },
      {
        type: 'ul',
        items: [
          '23% increase in AI visibility, driven by targeted content and LLM-optimized site pages',
          '7x higher signup rate from AI-referred visitors compared to other traffic sources, as developers arrive informed and ready to convert',
          "3x increase in AI's share of self-attested signups in one year as Alchemy's citation footprint expanded across answer engines",
          "AI is now Alchemy's single largest developer acquisition channel, surpassing organic search, social media, YouTube, and word-of-mouth",
        ],
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: "Alchemy is building its content strategy for a future where AI Agents research, evaluate, and build solutions for developers. In that world, AI Agents don't just drive discovery; they own the entire customer journey from first touch to purchase. To win that market and stay ahead of the shift, Max and his team will keep leaning on Anthroly's platform and strategic support to ensure Alchemy is the default choice for agents building onchain.",
      },
      {
        type: 'quote',
        body: 'The Anthroly team always replies quickly to my questions. In a year where AEO is changing week to week, that responsiveness is the difference between staying ahead and falling behind.',
        name: 'Max Crawford',
        role: 'Growth Marketing Manager at Alchemy',
      },
    ],
  },

  // ==========================================================================
  // Aleph
  // ==========================================================================
  {
    slug: 'aleph',
    brand: 'Aleph',
    domain: 'getaleph.com',
    title: 'How Aleph grew LLM-attributed website traffic by 82% using Anthroly Agents',
    metaTitle: 'Aleph Case Study: +82% LLM-Attributed Traffic | Anthroly',
    metaDescription:
      'How FP&A platform Aleph grew citation share 253% and AI visibility 5x in two months — driving an 82% increase in LLM-attributed traffic with Anthroly Agents.',
    summary:
      'This AI-powered financial analysis platform partnered with Anthroly to build a data-driven AEO strategy and win finance buyers in AI Search.',
    metrics: [
      { value: '253%', label: 'Increase in citation share in 2 months' },
      { value: '5x', label: 'Increase in AI visibility in 2 months' },
      { value: '82%', label: 'Increase in LLM-attributed website traffic' },
    ],
    publishedAt: '2026-05-06',
    blocks: [
      {
        type: 'quote',
        body: 'Anthroly serves as our AEO command center. Their platform provides us with real-time AI visibility intelligence, so we stay on the tip of that spear as the AEO space evolves.',
        name: 'Charlie Rhomberg',
        role: 'Senior Content Marketing Manager at Aleph',
      },
      { type: 'h2', text: 'Overview' },
      {
        type: 'p',
        text: 'Aleph is an AI-native FP&A (Financial Planning & Analysis) platform that automates reporting, budgeting, and forecasting without replacing the spreadsheets finance teams know and love. Industry leaders like Notion and Zapier trust Aleph to run leaner, faster finance operations.',
      },
      { type: 'h2', text: 'Building an AEO engine to reach FP&A buyers' },
      {
        type: 'p',
        text: 'As a fast-growing player in the FP&A software space, Aleph has built strong credentials, from five-star reviews to a growing library of expert insights. But Charlie Rhomberg, Senior Content Marketing Manager, knew that in a competitive market, credentials only convert if buyers can find you.',
      },
      {
        type: 'p',
        text: 'Increasingly, the search for solutions was happening in answer engines. CFOs and finance leaders were routinely running AI queries like "best FP&A software in 2026" and "finance tools for PE-backed companies" to discover vendors.',
      },
      {
        type: 'quote',
        body: 'Even our own team does competitive research in ChatGPT, another data point proving we needed an AEO strategy.',
        name: 'Charlie Rhomberg',
        role: 'Senior Content Marketing Manager at Aleph',
      },
      {
        type: 'p',
        text: 'In FP&A, purchase decisions tend to involve multiple stakeholders who each conduct in-depth feature analysis and research. To establish Aleph as the vendor of choice, Charlie needed to know what prospects were asking across the funnel and build content that answered each question precisely.',
      },
      {
        type: 'p',
        text: "But topic intelligence wasn't enough. Charlie needed to benchmark Aleph's LLM performance against competitors and identify the content structures that earned citations. That way, he would prioritize the right formats and capture content optimization opportunities.",
      },
      {
        type: 'p',
        text: "With a lean team and AI algorithms changing weekly, Charlie recognized that tracking AI citations in-house wouldn't lead to an actionable AI visibility strategy. He needed a partner. One who could help him interpret insights, prioritize the right prompts, and build a content approach that consistently earned citations.",
      },
      {
        type: 'p',
        text: 'He piloted several AEO solutions. With its real-time AEO tracking, clean UI, and expert team, Anthroly emerged as the clear winner.',
      },
      {
        type: 'quote',
        body: 'As more prospects kicked off FP&A software research inside AI platforms, we realized that AEO was becoming critical for growth. But as a lean marketing team, we needed an AEO partner who could help us understand its intricacies and gain visibility fast.',
        name: 'Charlie Rhomberg',
        role: 'Senior Content Marketing Manager at Aleph',
      },
      { type: 'h2', text: 'AI visibility intelligence that powers scalable AEO execution' },
      {
        type: 'p',
        text: "As a starting point, Charlie used Anthroly to map the AI-native buyer journey around the real questions prospects were asking LLMs. By filtering prompts by volume, intent, and theme, Charlie built a data-driven library of high-priority prompts to guide Aleph's content initiatives.",
      },
      { type: 'h3', text: 'Building an advanced AEO playbook with Anthroly Pods' },
      {
        type: 'p',
        text: 'When Anthroly launched Pods, a week-long intensive program led by frontier AI Search experts, Charlie was among the first to enroll. The program went deep on cutting-edge AEO practices, including prompt categorization and automated campaigns. By the end, Charlie had a concrete AEO playbook for every content decision that followed.',
      },
      { type: 'h3', text: 'Earning category authority with targeted content plays' },
      {
        type: 'p',
        text: "Armed with Anthroly's expert guidance, Charlie targets opportunities that accelerate awareness and strengthen Aleph's position as a category leader. When Anthroly surfaced a high-volume prompt cluster around AI-powered variance detection, a core Aleph capability, he published a buyer's guide to the top relevant solutions. This play positioned Aleph as the go-to vendor in AI Search responses.",
      },
      {
        type: 'quote',
        body: 'Each month, we focus on the trending queries in a single theme, like competitor-adjacent prompts or questions about specific software capabilities.',
        name: 'Charlie Rhomberg',
        role: 'Senior Content Marketing Manager at Aleph',
      },
      { type: 'h3', text: 'Compounding growth with powerful automations' },
      {
        type: 'p',
        text: 'After getting a head start on Anthroly Agents during his Pod, Charlie now uses them regularly to build AEO-driven content at scale. By deploying powerful automations, he orchestrates key stages of the content creation pipeline, from generating content briefs to identifying top-ranking external sources and selecting the right internal links.',
      },
      {
        type: 'p',
        text: "This strategy saves hours of research while tuning every asset for maximum discoverability. And it's paying off. In just two months, Aleph's AI visibility reached 21%, a 5x increase that makes the company a top-cited FP&A platform in AI-driven searches.",
      },
      {
        type: 'quote',
        body: "Anthroly shows us how to format every page so AI systems can extract and cite it. We've reframed content headers and added FAQ schemas all across our site.",
        name: 'Charlie Rhomberg',
        role: 'Senior Content Marketing Manager at Aleph',
      },
      {
        type: 'p',
        text: 'With Anthroly, Charlie now has a scalable AEO strategy that keeps Aleph showing up wherever prospects go looking.',
      },
      {
        type: 'quote',
        body: 'Once we had a dialed-in prompt list, we started running and executing on content with confidence. This approach has put us on par with competitors who have been in the market for decades.',
        name: 'Charlie Rhomberg',
        role: 'Senior Content Marketing Manager at Aleph',
      },
      { type: 'h2', text: 'Aleph increased citation share by 253% in 2 months with Anthroly' },
      {
        type: 'p',
        text: "With Anthroly, Aleph is building category authority in FP&A's new search reality. Charlie now has a data-driven AEO strategy that puts Aleph in front of finance leaders at key moments of their purchasing journey.",
      },
      { type: 'p', text: "Here's a look at the results:" },
      {
        type: 'ul',
        items: [
          '253% increase in citation share in 2 months, building content around the questions buyers are actually asking AI.',
          '5x growth in AI visibility in 2 months, optimizing content and overhauling site-wide formatting.',
          '82% increase in LLM-attributed website traffic, utilizing Anthroly Agents to confirm every page is readable by AI.',
        ],
      },
      {
        type: 'p',
        text: "These efforts are also driving more qualified buyers to the Aleph site. Aleph's citation share climbed from 1.5% to 5.3% in two months, generating an 82% increase in LLM-attributed traffic. Because these buyers arrive informed about Aleph's solutions, they're also more likely to convert.",
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: "Charlie and the Aleph team will deepen their use of Anthroly's product suite, especially as Anthroly continues to grow its Agents capabilities. They're eager to explore how Agents' connections to Google SERP data and prompt volume signals can help them create content with even greater precision.",
      },
      {
        type: 'quote',
        body: "Anthroly's team is an encyclopedia of AEO knowledge. Their guidance helps us capture the AI conversations that matter most to our buyers.",
        name: 'Charlie Rhomberg',
        role: 'Senior Content Marketing Manager at Aleph',
      },
      {
        type: 'p',
        text: "To learn more about Aleph's AI-native FP&A platform, visit getaleph.com.",
      },
    ],
  },

  // ==========================================================================
  // Jordan Digital Marketing
  // ==========================================================================
  {
    slug: 'jordan-digital-marketing',
    brand: 'Jordan Digital Marketing',
    domain: 'jordandigitalmarketing.com',
    title: 'How Jordan Digital Marketing grew revenue by 34% with Anthroly',
    metaTitle: 'Jordan Digital Marketing: +34% Revenue With AEO | Anthroly',
    metaDescription:
      'How agency Jordan Digital Marketing grew revenue 34% and nearly doubled profit by building an AEO practice for clients on top of Anthroly.',
    summary:
      'This leading digital marketing agency partners with Anthroly to transform AI Search performance into a lasting competitive advantage.',
    metrics: [
      { value: '~2x', label: 'Increase in profit supported by AEO' },
      { value: '34%', label: 'Increase in revenue supported by AEO' },
      { value: '80%', label: 'Visibility in a relevant prompt for a client (up from 0%)' },
    ],
    publishedAt: '2026-04-22',
    blocks: [
      {
        type: 'quote',
        body: 'Anthroly shows us exactly how our clients perform across AI platforms and how to improve. We are far ahead of everybody else in the AEO space because of their platform.',
        name: 'Adam Tanguay',
        role: 'Head of Growth at Jordan Digital Marketing',
      },
      { type: 'h2', text: 'Overview' },
      {
        type: 'p',
        text: 'Jordan Digital Marketing (JDM) specializes in full-funnel organic and performance marketing strategies that produce measurable business results for high-growth clients. Their approach includes intent-based content, SEO, AEO/GEO, and data-driven paid search, paid social, and programmatic campaigns. The agency is trusted by industry leaders like Baseten, Cursor, Sentry, Pilot, and LinkSquares.',
      },
      { type: 'h2', text: "Capturing granular AEO insights to boost clients' AI visibility" },
      {
        type: 'p',
        text: "To help high-growth companies scale sustainably, JDM has historically focused on full-funnel SEO strategies to consistently drive organic traffic. As search behavior began shifting toward answer engines, Tyler Jordan, JDM's Founder & CEO, recognized the agency's approach needed to evolve.",
      },
      {
        type: 'quote',
        body: "AI platforms are becoming the go-to resource for product recommendations and research. We needed a solution to measure our clients' AI visibility and optimize their content strategy for LLMs.",
        name: 'Tyler Jordan',
        role: 'Founder & CEO at Jordan Digital Marketing',
      },
      {
        type: 'p',
        text: 'Traditional SEO tools only surface keyword rankings and click-through data. "Even if these solutions offer citation data, they lack ongoing AI visibility monitoring to keep pace with evolving AI algorithms," explains Adam Tanguay, Head of Growth at JDM. Content recommendations would be outdated before JDM could deploy them, undermining impact and client confidence.',
      },
      {
        type: 'p',
        text: 'Adam and Tyler began exploring AEO solutions, but most focused on superficial, self-service dashboards. They needed a partner that could deliver both reliable insights and the hands-on support to translate them into targeted optimizations.',
      },
      {
        type: 'p',
        text: "That's when one of their enterprise clients recommended Anthroly.",
      },
      { type: 'h2', text: 'Enhancing LLM performance with data-driven AEO strategies' },
      {
        type: 'p',
        text: "Onboarding Anthroly began with a single-client pilot to validate that the platform fit into JDM's existing workflows. Anthroly delivered its first comprehensive AI visibility report in just a few clicks, giving Adam and Tyler the confidence to deploy it across their portfolio.",
      },
      { type: 'h3', text: 'Growing AI citation share through targeted content' },
      {
        type: 'p',
        text: 'With Anthroly, the JDM team pinpoints which blog posts, product pages, and buying guides earn AI citations for every client, so they can double down on proven topics and formats. To expand clients\' AI footprint, Tyler then taps into Prompt Volumes to surface real user queries. This intelligence reveals impactful content opportunities they can capture quickly to outrank competitors.',
      },
      {
        type: 'p',
        text: 'As an example, for a nursery furniture client, Prompt Volumes uncovered exactly which questions expecting parents are asking AI chatbots. The JDM team built targeted short-form content around those prompts, turning the brand into a top ChatGPT recommendation.',
      },
      {
        type: 'quote',
        body: 'Everyone wants to know what topics people are searching in AI and how often specific questions come up. With Anthroly, we have the answers.',
        name: 'Adam Tanguay',
        role: 'Head of Growth at Jordan Digital Marketing',
      },
      { type: 'h3', text: 'Amplifying AEO efforts' },
      {
        type: 'p',
        text: 'The JDM team also configures client websites for LLM discoverability based on comprehensive AI crawler analytics. To boost traffic for a cybersecurity client, they restructured pages with machine-readable formats. As a result, the brand became a leading authority across Perplexity, ChatGPT, and Gemini.',
      },
      {
        type: 'p',
        text: "Through ongoing collaboration with Anthroly, the JDM team stays at the forefront of an evolving AEO landscape, continuously optimizing clients' marketing strategies. The partnership runs both ways. Anthroly frequently involves Tyler and Adam in product roadmap discussions, turning their feedback into features that benefit JDM and their clients.",
      },
      {
        type: 'quote',
        body: 'My thought leadership work is all about AEO now. The articles I write, the webinars I lead, the social posts I share to bring in clients are all driven by insights from Anthroly.',
        name: 'Tyler Jordan',
        role: 'Founder & CEO at Jordan Digital Marketing',
      },
      { type: 'h2', text: 'Jordan Digital grows revenue by 34% with Anthroly' },
      {
        type: 'p',
        text: 'Powered by Anthroly, JDM has created a differentiated AEO offering that captures users in an emerging discovery channel, drives measurable client results, and wins new agency business.',
      },
      {
        type: 'p',
        text: 'The practice has become a standard part of their service. "Every client who engages with us for SEO now bundles it with AEO," Tyler shares.',
      },
      { type: 'p', text: 'That momentum translates to tangible growth:' },
      {
        type: 'ul',
        items: [
          '34% increase in revenue as AEO attracts new clients',
          "~2x increase in profit driven by adding AEO to JDM's services",
          '80% visibility increase for a client in a high priority category (up from 0%)',
        ],
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: "As the AEO category matures, JDM's growing expertise positions them to support even more clients. They'll use Anthroly's expanding feature set to deliver on that promise at scale. Adam and Tyler are already working to integrate Anthroly Agents. This feature will enable them to identify more AEO opportunities and execute AI-optimized campaigns on behalf of their clients, multiplying output without increasing headcount.",
      },
      {
        type: 'quote',
        body: 'With Anthroly, I can see at a glance how a company is ranking across hundreds of prompts. Using this visibility helps us drive significant results for our clients.',
        name: 'Adam Tanguay',
        role: 'Head of Growth at Jordan Digital Marketing',
      },
    ],
  },

  // ==========================================================================
  // GR0
  // ==========================================================================
  {
    slug: 'gr0',
    brand: 'GR0',
    domain: 'gr0.com',
    title: 'How GR0 took a client from $1K to $100K/month in AI-driven sales using Anthroly',
    metaTitle: 'GR0 Case Study: $1K to $100K/Month in AI Sales | Anthroly',
    metaDescription:
      "How agency GR0 used Anthroly's AI visibility data to take a DTC client from $1K to $100K+ in monthly LLM-attributed revenue.",
    summary:
      "When AI search started reshaping how consumers discover products, GR0 had the SEO credibility and the client relationships to move fast, but they needed data they didn't have. That's where Anthroly came in, and now GR0 is helping clients achieve measurable growth via the new channel.",
    metrics: [
      { value: '100x', label: 'Increase in monthly revenue from AI systems for one client' },
      { value: '2-4%', label: 'Citation share of voice increases at the URL level for clients' },
      { value: '10%', label: 'Reddit citation share increases when GR0 activates community engagement strategies' },
    ],
    publishedAt: '2026-04-10',
    blocks: [
      {
        type: 'quote',
        body: "We're establishing a net-new third-party sales channel for brands. Just like Amazon, just like TikTok Shop. Now we have AI Search, and now we have Anthroly.",
        name: 'Kevin Miller',
        role: 'Co-Founder & CEO',
      },
      { type: 'h2', text: "GR0's SEO beginnings" },
      {
        type: 'p',
        text: "GR0 is a Los Angeles-based digital marketing agency that built its reputation on SEO for nationally sold e-commerce brands. Founded in 2020 by Kevin Miller and Jonathan Zacharias, the agency caught a wave: Apple's iOS 14 update gutted paid social returns, and brands that had been pouring money into Facebook ads suddenly needed organic growth. GR0 became the answer.",
      },
      {
        type: 'p',
        text: "When AI search started reshaping how consumers discover products, GR0 had the SEO credibility and the client relationships to move fast, but they needed data they didn't have.",
      },
      { type: 'h2', text: 'The problem: everyone wanted AI visibility, nobody had the playbook' },
      {
        type: 'p',
        text: 'It only took a couple clients asking how to show up in ChatGPT for Kevin, CEO and Cofounder of GR0, to see that AI search was becoming a real commerce channel.',
      },
      {
        type: 'p',
        text: 'But as he and Angela Bergmann, Director of SEO & AI Search at GR0, started to look at platforms, they noticed a couple key trends.',
      },
      {
        type: 'quote',
        body: "The established players are trying to approach AI search from an SEO lens. They're not approaching it as a net-new conversational model.",
        name: 'Angie Bergmann',
        role: 'Director of SEO and AI Search',
      },
      {
        type: 'p',
        text: 'Newer entrants had a different problem: cost. Running queries 24/7, which GR0 needed for accurate look-back reporting, made pricing spiral out of control.',
      },
      {
        type: 'p',
        text: '"We tested other platforms, and the data always felt thin," Kevin said. "If that\'s all we had, we wouldn\'t have enough to talk about on client calls. I wouldn\'t have enough work to do."',
      },
      {
        type: 'p',
        text: 'Kevin also ruled out building something in-house. He\'d spent four years in San Francisco, worked at Google, and had watched other agency founders try to build their own tools. "It can only be done successfully the venture way, with a hundred engineers working on it day in and day out. I\'m very practical about what we can and cannot do."',
      },
      { type: 'h2', text: 'Why Anthroly' },
      {
        type: 'p',
        text: 'After evaluating the landscape, GR0 chose Anthroly as its AI visibility platform and built its entire AEO practice on top of it.',
      },
      {
        type: 'p',
        text: 'What sealed it: Anthroly runs data continuously, not in snapshots. It provides the depth GR0 needs, prompt tracking, citation analysis, sentiment, and now shopping data, across every major LLM. And the feature set keeps expanding.',
      },
      {
        type: 'p',
        text: 'With Agents that automate reporting, analysis, and content creation, the team feels confident they are with a partner that will keep them on the bleeding edge of the space.',
      },
      {
        type: 'quote',
        body: "They're going to keep developing new features that are valuable to our customers. They have the largest engineering team, they're the most well capitalized in the space.",
        name: 'Kevin Miller',
        role: 'Co-Founder & CEO',
      },
      { type: 'h2', text: 'How GR0 uses Anthroly' },
      {
        type: 'p',
        text: 'GR0 has five to six campaign managers who serve as in-house Anthroly experts, using the platform daily to identify opportunities across their client portfolios. Their workflow spans several core use cases:',
      },
      {
        type: 'ul',
        items: [
          "They track prompts like keywords. The team identifies every prompt relevant to a client's products, monitors where the brand ranks across LLMs, and finds the gaps. This is the foundation. It tells them what to write, where to pitch, and where to focus.",
          "They turn citation data into a hit list. This is where Angie's team found unexpected value. Anthroly shows which URLs LLMs cite most heavily for any given topic. GR0 works this list from two angles: earned media outreach and paid affiliate placements. Then they track those placements back inside the platform to measure impact.",
          "They create smarter content, faster. Rather than guessing at topics based on keyword volume alone, the team cross-references traditional keyword research with Anthroly's prompt data to prioritize what gets written first. They then use Anthroly Agents to generate content brief outlines.",
          'They monitor brand sentiment. For luxury and premium brands, Angie\'s team watches how LLMs talk about their clients. "If there\'s a consistent product problem, it boils up into sentiment," said Angie. "Anthroly shows us before it becomes a crisis."',
          "Shopping analysis: Anthroly's Shopping feature has also proven to be a huge value add.",
        ],
      },
      {
        type: 'quote',
        body: 'We were on a call with a major computer hardware company yesterday and were able to show them where their printers rank in ChatGPT Shopping. They had never seen anything like that before.',
        name: 'Kevin Miller',
        role: 'Co-Founder & CEO',
      },
      { type: 'h2', text: 'Results for their clients' },
      { type: 'h3', text: '$1K to $100K+ monthly revenue from LLMs' },
      {
        type: 'p',
        text: "The most dramatic success story in GR0's AEO portfolio is with a direct-to-consumer health and beauty company. When they started working with GR0, they were generating roughly 1,000 visits per month from LLMs and about $1,000 in monthly revenue from that channel.",
      },
      {
        type: 'p',
        text: 'Within months, that number skyrocketed to over $100,000 per month in LLM-attributed revenue.',
      },
      {
        type: 'quote',
        body: "We've written 50 to 100 articles on each of their prompts that are now ranking really well. If we didn't have that data from Anthroly, we wouldn't know what to write on.",
        name: 'Kevin Miller',
        role: 'Co-Founder & CEO',
      },
      {
        type: 'p',
        text: 'The result? A client that, in Kevin\'s words, "wants to stay with us forever."',
      },
      { type: 'h3', text: 'Owning a new category' },
      {
        type: 'p',
        text: 'For a brand building the emerging "protein coffee" category, GR0 is using Anthroly to systematically capture AI visibility for category-defining terms. The strategy combines targeted blog content with affiliate placements on the citation sources that LLMs reference most heavily, creating a flywheel of visibility for a product category the brand is pioneering.',
      },
      { type: 'h3', text: 'Measurable momentum across the portfolio' },
      {
        type: 'p',
        text: 'Across their client base, GR0 is tracking concrete improvements at a granular level:',
      },
      {
        type: 'ul',
        items: [
          'Citation share of voice increases of 2-4% at the URL level as targeted placements and content take effect',
          'Reddit citation share increases of up to 10% when GR0 activates community engagement strategies',
          'Both AI agent traffic and organic search traffic increasing simultaneously as consumers research in AI tools and then convert through traditional search',
          'Direct revenue attribution from AI channels for clients with full tracking infrastructure in place',
        ],
      },
      {
        type: 'quote',
        body: "We're seeing both the agent traffic increase, and we're also seeing organic traffic increase as people do their research in AI and then go to search to purchase.",
        name: 'Angie Bergmann',
        role: 'Director of SEO and AI Search',
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: '"A lot of us as SEOs have been looking beyond keyword focus for years, but the tooling never followed. Now we\'re getting real-time information about the questions people are actually asking, as opposed to guessing based on keyword search volumes," says Angie.',
      },
      {
        type: 'p',
        text: "With Anthroly's data as the foundation and GR0's implementation expertise on top, the agency is positioned at the leading edge of a market shift that's only accelerating.",
      },
    ],
  },

  // ==========================================================================
  // Apartment List
  // ==========================================================================
  {
    slug: 'apartment-list',
    brand: 'Apartment List',
    domain: 'apartmentlist.com',
    title: 'How Apartment List built early-mover advantage in AI Search with Anthroly',
    metaTitle: 'Apartment List Case Study: 2x AI Citations | Anthroly',
    metaDescription:
      'How Apartment List doubled AI citations in weeks and built a comprehensive AEO strategy in 3 months with Anthroly to reach renters in AI answers.',
    summary:
      'This tech-first rental platform partners with Anthroly to unlock AI visibility insights, scale high-value content, and attract renters in the AI-driven search ecosystem.',
    metrics: [
      { value: '2x', label: 'Increase in AI citations after optimizations' },
      { value: '2', label: 'Weeks to see initial results' },
      { value: '3 mo', label: 'Comprehensive AEO strategy developed' },
    ],
    publishedAt: '2026-03-25',
    blocks: [
      {
        type: 'quote',
        body: 'We want Apartment List to be the source providing helpful information when people ask ChatGPT about renting. In Anthroly, we found a partner whose expertise enables us to validate and scale the content that achieves this.',
        name: 'Megann Sept',
        role: 'Director of Marketing, Brand, and Innovation at Apartment List',
      },
      { type: 'h2', text: 'Overview' },
      {
        type: 'p',
        text: "Apartment List is an AI-powered rental search platform that matches renters with homes they'll love. By personalizing the apartment search experience, the company helps people find the right fit faster while enabling multifamily partners to attract and retain residents. Founded in 2011, Apartment List features over 7 million rental units and has helped millions find their next home.",
      },
      { type: 'h2', text: 'Scaling renter guidance in LLM-focused search' },
      {
        type: 'p',
        text: "Apartment List's competitive edge comes from their deep understanding of renter intent and tailored rental matches. For years, strong SEO connected their platform to renters researching affordability, neighborhoods, and moving logistics on Google. But as discovery began shifting to AI platforms, their team recognized the need to extend that expertise into the answer engines.",
      },
      {
        type: 'p',
        text: '"People were asking questions like \'What are the safest neighborhoods in Boston?\' or \'What\'s the average move-in cost in Irving?\' directly in LLMs," explains Megann Sept, Director of Marketing, Brand, and Innovation. Apartment List provided expert answers across their site and content. But sharing that guidance where renters increasingly made decisions required a data-backed AEO strategy.',
      },
      {
        type: 'p',
        text: "Based on years of SEO performance data, Megann and her team hypothesized that local, high-intent renter queries would dominate AI-driven discovery. To validate that theory, the team needed visibility into trending renter queries, AI citation patterns, and Apartment List's competitive positioning.",
      },
      {
        type: 'p',
        text: 'The team began searching for a dedicated solution that would provide accessible AI visibility data through a user-friendly interface. Because AI Search platforms evolve quickly, the ideal partner would need to provide both analytics and ongoing strategic guidance.',
      },
      {
        type: 'p',
        text: 'To find the right solution, Apartment List piloted two AEO platforms concurrently. After strong due diligence, Anthroly stood out as the clear winner for its powerful analytics, ease of use, and supportive team of experts.',
      },
      {
        type: 'quote',
        body: 'LLMs are becoming a core discovery and decision-making surface for people making housing decisions. Showing up there with expert, human-centered guidance is critical to fulfilling our promise to renters.',
        name: 'Megann Sept',
        role: 'Director of Marketing, Brand, and Innovation at Apartment List',
      },
      { type: 'h2', text: 'AEO intelligence that validates hypotheses and increases AI visibility' },
      {
        type: 'p',
        text: "Using Anthroly's AEO analytics platform, Apartment List built a structured framework to measure AI visibility and guide weekly content optimizations. This AI performance intelligence empowers the team to execute its AEO strategy at scale.",
      },
      { type: 'h3', text: 'Identify areas of opportunity' },
      {
        type: 'p',
        text: 'Anthroly ran a custom analysis of how renters use LLMs in apartment searches and related conversations, providing Apartment List with directional insight into emerging renter questions. Megann and her team then used those findings to inform content strategy and focus areas.',
      },
      {
        type: 'p',
        text: 'For example, if the data shows that content about affordability and neighborhoods surfaces often, the team creates targeted guides to address these questions.',
      },
      { type: 'h3', text: 'Understand what answer engines cite' },
      {
        type: 'p',
        text: "To fine-tune their content mix, Megann and her team use Anthroly's Answer Engine Insights tool to pinpoint the sources AI engines cite most frequently. And once the content is live, Anthroly's dashboard powers an ongoing feedback loop, accelerating iteration cycles and channeling Apartment List's understanding of renter behavior into precise optimizations.",
      },
      { type: 'h3', text: 'Maximize discovery with technical optimization' },
      {
        type: 'p',
        text: "Leveraging server-side tracking through Anthroly's Agent Analytics feature, the team gets a real-time view of which website pages AI Search indexes and how often they surface in AI-generated answers. With that visibility, they refine content schemas and technical site elements to boost discovery and maximize inclusion.",
      },
      { type: 'h3', text: 'Stay ahead of the competition' },
      {
        type: 'p',
        text: "Anthroly also maps Apartment List's visibility relative to competitors, giving Megann a clear view of market-wide movement. As a result, her team prioritizes actions with high potential to grow Apartment List's AI presence.",
      },
      {
        type: 'p',
        text: "Through it all, Anthroly's team offers a trusted perspective through strategy sessions and day-to-day Slack support. Megann gets the guidance to adapt her AEO strategy and build impactful experiments, ensuring renters continue to receive trusted advice wherever they search.",
      },
      {
        type: 'quote',
        body: 'We immediately saw our citation share climb after our first content push. That early validation showed us exactly how to optimize our content for LLMs.',
        name: 'Megann Sept',
        role: 'Director of Marketing, Brand, and Innovation at Apartment List',
      },
      { type: 'h2', text: 'Apartment List doubles AI citations with Anthroly' },
      {
        type: 'p',
        text: 'Apartment List is now at the forefront of the new search reality. By partnering with Anthroly, Megann and her team have a data-driven AEO strategy that brings years of renter guidance directly where renters make housing decisions.',
      },
      {
        type: 'ul',
        items: [
          '2x increase in AI citations',
          '2 weeks to see initial results',
          'Comprehensive AEO strategy developed in 3 months',
        ],
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: "Looking ahead, Apartment List will continue to expand its AEO toolkit to include Anthroly's Workflows feature. The team is eager to leverage it to streamline content optimization by zeroing in on the most impactful topics and scaling wins over time.",
      },
      {
        type: 'quote',
        body: "Anthroly helps us analyze AEO data to understand what our impact could be. With their expertise, we're ramping up quickly in this new channel so we can capture growth opportunities.",
        name: 'Megann Sept',
        role: 'Director of Marketing, Brand, and Innovation at Apartment List',
      },
    ],
  },

  // ==========================================================================
  // Omnilux
  // ==========================================================================
  {
    slug: 'omnilux',
    brand: 'Omnilux',
    domain: 'omniluxled.com',
    title: 'How Omnilux tripled AI-attributed revenue',
    metaTitle: 'Omnilux Case Study: 3x AI-Attributed Revenue | Anthroly',
    metaDescription:
      'How LED skincare leader Omnilux tripled AI-attributed revenue share and grew LLM traffic 25% month over month with Anthroly Agent Analytics on Shopify.',
    summary:
      'Omnilux is a world leader in medical-grade LED skincare technology. When AI-driven discovery started sending real, converting traffic to its Shopify store, the team moved quickly to understand it, measure it, and optimize for it.',
    metrics: [
      { value: '3x', label: 'AI-attributed revenue share' },
      { value: '98 sec', label: 'Time to activate Agent Analytics on their Shopify site via Nostra' },
      { value: '25%', label: 'Increase in traffic from LLMs month over month' },
    ],
    publishedAt: '2026-03-12',
    blocks: [
      {
        type: 'quote',
        body: "We've noticed a huge uptick in LLM-related traffic. It grows month over month and has taken up about 3% of our total revenue now. Being able to understand why — and any gaps in our coverage — is incredibly valuable.",
        name: 'Caleb Orion',
        role: 'Director of Digital Acquisition & Ecommerce, Omnilux',
      },
      { type: 'h2', text: 'Overview' },
      {
        type: 'p',
        text: 'Omnilux is a world leader in medical-grade LED skincare technology. Born out of dermatology offices in the early 2000s, the brand is backed by over 40 peer-reviewed clinical studies and nearly two decades of continuous R&D. Its hero products, including flexible LED masks for anti-aging, acne, and skin rejuvenation, have become a direct-to-consumer phenomenon, earning features in Vogue, endorsements from board-certified dermatologists, and a fiercely loyal customer base of women (and increasingly men) aged 30+.',
      },
      {
        type: 'p',
        text: 'When AI-driven discovery started sending real, converting traffic to its Shopify store, the team moved quickly to understand it, measure it, and optimize for it.',
      },
      { type: 'h2', text: 'Why Anthroly' },
      {
        type: 'p',
        text: "Caleb evaluated the emerging landscape of AI search tools and found a lot of vendors scrambling to set up dashboards. What set Anthroly apart wasn't just the platform. It was the people.",
      },
      {
        type: 'quote',
        body: 'The people at Anthroly were what ultimately led us to go with them. Having experts there to guide the process and help us understand the incredibly rapidly changing world of LLM discovery has been crucial.',
        name: 'Caleb Orion',
        role: 'Director of Digital Acquisition & Ecommerce, Omnilux',
      },
      { type: 'h2', text: 'The challenge: a Shopify blind spot' },
      {
        type: 'p',
        text: "As AI chatbots like ChatGPT, Perplexity, and Gemini reshape how consumers discover and evaluate products, brands like Omnilux need server-level visibility into how AI crawlers interact with their sites. Anthroly's Agent Analytics product delivers exactly that, parsing bot traffic and citations page by page to show brands where they're being mentioned, what's being cited, and where gaps exist.",
      },
      {
        type: 'p',
        text: "There was just one problem: Shopify wouldn't let anyone in.",
      },
      {
        type: 'p',
        text: "Shopify doesn't expose server logs or Cloudflare configurations to its merchants. That means tools like Anthroly, which rely on CDN-level log data to identify AI crawler activity, simply couldn't serve the thousands of brands built natively on Shopify. It was a massive blind spot for the fastest-growing segment of ecommerce.",
      },
      { type: 'h2', text: 'The unlock: Nostra as the bridge' },
      {
        type: 'p',
        text: 'Nostra is an enterprise-grade infrastructure-as-a-service platform purpose-built for ecommerce. Nostra deploys a reverse proxy powered by Cloudflare in front of Shopify stores, giving brands access to edge-level capabilities that Shopify alone can\'t provide: proprietary HTML caching for dramatically faster page loads, bot protection, first-party cookie rewriting for iOS attribution, and — critically — server log access.',
      },
      {
        type: 'p',
        text: 'Because Nostra already integrates with Cloudflare and Anthroly already integrates with Cloudflare, the technical path was straightforward. Nostra\'s reverse proxy gives Shopify merchants the server-level infrastructure that Anthroly needs to capture and analyze AI bot traffic. No custom engineering. No headaches. Just a seamless connection at the edge.',
      },
      {
        type: 'quote',
        body: 'We spent a couple weeks going back and forth with our dev team and Cloudflare trying to figure out how to set it up. Then with Anthroly and Nostra we realized we could just turn it on. We timed it — 98 seconds.',
        name: 'Caleb Orion',
        role: 'Director of Digital Acquisition & Ecommerce, Omnilux',
      },
      {
        type: 'p',
        text: "No code changes. No developer tickets. No downtime. Omnilux's team didn't have to lift a finger. The entire integration happened behind the scenes, unlocking a new layer of AI visibility data without any operational disruption.",
      },
      { type: 'h2', text: 'The impact: AI as a growth channel' },
      {
        type: 'p',
        text: 'Since partnering with Anthroly and connecting through Nostra, Omnilux has moved from flying blind on AI traffic to actively using visibility and citation data to drive strategy across multiple functions:',
      },
      {
        type: 'ul',
        items: [
          'PR & media strategy: Omnilux now identifies which publications and articles surface them in AI responses and where competitors are showing up instead. This directly informs outreach and pitching priorities.',
          "Content strategy: the team is using Anthroly's prompt-level insights to understand what prospective customers are actually asking AI chatbots about red light therapy, clinical efficacy, and product comparisons. They're building owned content to fill the gaps.",
          "Competitive intelligence: Anthroly's visibility rankings let Omnilux benchmark itself against competitors across every major LLM, including ChatGPT, Gemini, Claude, Perplexity, and more in a fiercely competitive category.",
          'Agentic commerce readiness: with Shopify rolling out agentic shopping capabilities, Omnilux is positioning itself to capture the next wave of AI-driven product discovery and purchasing.',
        ],
      },
      {
        type: 'quote',
        body: "We're using the visibility and citation insights to guide our PR strategy and content strategy. We're trying to meet the customer where they're at, and increasingly, that's inside an AI chatbot.",
        name: 'Caleb Orion',
        role: 'Director of Digital Acquisition & Ecommerce, Omnilux',
      },
      { type: 'h2', text: 'Proving returns' },
      {
        type: 'p',
        text: "The revenue numbers tell the story: Omnilux's AI-attributed revenue has grown from roughly 1% to 3% of total revenue during the period they've been working with Anthroly, and the trend line continues upward month over month.",
      },
      {
        type: 'p',
        text: "More importantly to Caleb, Omnilux now has the infrastructure and the intelligence to act on AI search strategically rather than passively benefiting from a channel they can't see into.",
      },
      { type: 'h2', text: 'What this means for every Shopify brand' },
      {
        type: 'p',
        text: "Until this partnership, the millions of brands built on Shopify were locked out of the fastest-growing discovery channel in ecommerce. Now, thanks to Omnilux paving the way, any Shopify merchant running Nostra can activate Anthroly's Agent Analytics in under two minutes and start understanding how AI chatbots see, cite, and recommend their products.",
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: 'Omnilux plans to deepen its use of Anthroly as the site redesign wraps and the content engine spins up. With Agent Analytics now live, competitive visibility tracked, and PR strategy informed by citation data, the foundation is set.',
      },
      {
        type: 'p',
        text: 'As Shopify rolls out agentic shopping capabilities, the brands that understand how AI discovers and recommends products will have a significant edge. Omnilux is building that understanding now.',
      },
      {
        type: 'quote',
        body: "As much information as we can track is incredibly valuable as Shopify brings on agentic shopping — that's about to be huge for us.",
        name: 'Caleb Orion',
        role: 'Director of Digital Acquisition & Ecommerce, Omnilux',
      },
    ],
  },

  // ==========================================================================
  // CRS
  // ==========================================================================
  {
    slug: 'crs-credit-api',
    brand: 'CRS Credit API',
    domain: 'crscreditapi.com',
    title: 'How CRS Credit API increases AI visibility 20x with Anthroly',
    metaTitle: 'CRS Credit API Case Study: 20x AI Visibility | Anthroly',
    metaDescription:
      'How credit data platform CRS increased AI Search visibility 20x and grew AI-attributed pipeline 15% by turning answer engines into a growth channel with Anthroly.',
    summary:
      'This fast-growing credit data platform expands answer engine visibility and turns AI search into a scalable pipeline growth channel with Anthroly.',
    metrics: [
      { value: '20x', label: 'Increase in AI Search visibility' },
      { value: '15%', label: 'Growth in pipeline attributed to AI search traffic' },
      { value: '8%', label: 'Increase in weekly traffic from LLM citations' },
    ],
    publishedAt: '2026-02-26',
    blocks: [
      {
        type: 'quote',
        body: "We wanted to work with Anthroly because they're the leader in the AEO space. Their Answer Engine Insights helped us scale our AI visibility and establish first-mover advantage in AI search.",
        name: 'Ronak Patel',
        role: 'Head of Marketing at CRS',
      },
      { type: 'h2', text: 'Overview' },
      {
        type: 'p',
        text: 'CRS is the all-in-one platform for credit data, fraud, and compliance, powering data-driven, frictionless financial decisions. Through a single API integration, CRS provides streamlined access to credit bureau information, fraud detection, and compliance services. They empower over 1,000 fintechs, lenders, and screening providers to scale with confidence through seamless credit data delivery.',
      },
      { type: 'h2', text: 'Capitalizing on untapped AI Search traffic to drive pipeline growth' },
      {
        type: 'p',
        text: 'For years, CRS had fueled consistent inbound growth through paid advertising. But as potential buyers increasingly turned to AI tools like ChatGPT and Grok for tool discovery, Ronak Patel, Head of Marketing at CRS, saw an opportunity to capitalize on this emerging channel.',
      },
      {
        type: 'p',
        text: 'With AI search intelligence, Ronak and his team could allocate resources more effectively to content topics and distribution channels that attracted high-intent buyers. Capturing this level of insight, however, would have required specialized AEO knowledge and hours spent building technical infrastructure.',
      },
      {
        type: 'p',
        text: 'To keep his team focused on strategic, revenue-critical initiatives, Ronak started a thorough search for an expert in the space.',
      },
      {
        type: 'quote',
        body: 'For us, success meant finding a partner who tied AI visibility metrics to business outcomes: MQLs, conversion rates, and revenue.',
        name: 'Ronak Patel',
        role: 'Head of Marketing at CRS',
      },
      {
        type: 'p',
        text: 'The right partner also had to provide expert guidance and hands-on support, as answer engines are constantly shifting their algorithms and best practices are always evolving.',
      },
      {
        type: 'p',
        text: 'With its proprietary AEO technology, keen focus on pipeline outcomes, and responsive customer success team, Anthroly was the partner Ronak chose to turn AI search into a powerful growth lever.',
      },
      {
        type: 'quote',
        body: 'AI search was a completely new channel for us. We needed an expert who could give us as much data as possible about our AI visibility and help more prospects find us.',
        name: 'Ronak Patel',
        role: 'Head of Marketing at CRS',
      },
      { type: 'h2', text: 'Real-time AI Search analytics amplified visibility and revenue' },
      {
        type: 'p',
        text: "Together, Ronak and the Anthroly team built a repeatable system that consistently surfaces impactful AEO opportunities using Anthroly's Answer Engine Insights at its core.",
      },
      {
        type: 'p',
        text: "To understand the business impact of content decisions fueled by Anthroly, CRS connected Anthroly's analytics to its existing tech stack, including Google Analytics and Looker. The resulting full-funnel view, from AI responses to MQLs and closed deals, links visibility gains directly to pipeline and revenue impact.",
      },
      {
        type: 'quote',
        body: "The feedback loop between Anthroly's platform and our content distribution helps us outperform competitors by a large margin.",
        name: 'Ronak Patel',
        role: 'Head of Marketing at CRS',
      },
      {
        type: 'p',
        text: 'To keep CRS ahead as answer engines evolve, Anthroly provides proactive guidance and online support. "We often consult with Anthroly\'s engineering teams and in-house Reddit strategist," highlights Ronak. As a result, the team navigates the dynamic channel without overwhelming their bandwidth.',
      },
      {
        type: 'p',
        text: "To continue scaling CRS's AEO strategy, Ronak has been exploring Agents, Anthroly's automation feature, to streamline key content creation tasks. This enables Ronak's team to focus resources on work that requires human expertise, like optimizing CRS's website for AI crawlers and building relationships with reputable publications.",
      },
      {
        type: 'quote',
        body: "Anthroly isn't just giving us a dashboard to monitor — we're getting strategic counsel on how to adapt as answer engines evolve and how to optimize our content for LLMs. This is exactly what a lean, fast-moving team like ours needs.",
        name: 'Ronak Patel',
        role: 'Head of Marketing at CRS',
      },
      { type: 'h2', text: 'CRS drives 15% growth in AI-attributed pipeline with Anthroly' },
      {
        type: 'p',
        text: 'By partnering with Anthroly, CRS scales visibility exactly where buyers research credit solutions. Ronak and his team now have a playbook that helps them improve answer engine performance through AI-optimized content and distribution strategies.',
      },
      { type: 'p', text: 'The results:' },
      {
        type: 'ul',
        items: [
          '20x increase in search visibility',
          '15% growth in pipeline attributed to AI search traffic',
          '8% increase in weekly traffic from LLM citations',
        ],
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: "CRS will continue to explore new ways to strengthen its positioning in the zero-click Internet. Most recently, they used Anthroly's FAQ Agent to create an FAQ section optimized for LLM comprehension across key product and blog pages.",
      },
      {
        type: 'quote',
        body: "Our team moves fast, so having a responsive AEO partner who follows our pace is invaluable. It's clear that Anthroly has a genuine interest in our success.",
        name: 'Ronak Patel',
        role: 'Head of Marketing at CRS',
      },
    ],
  },

  // ==========================================================================
  // OpusClip
  // ==========================================================================
  {
    slug: 'opusclip',
    brand: 'OpusClip',
    domain: 'opus.pro',
    title: 'How OpusClip achieved 45% brand visibility and #1 citation share in 30 days',
    metaTitle: 'OpusClip Case Study: #1 Citation Share in 30 Days | Anthroly',
    metaDescription:
      'How OpusClip lifted brand visibility past 45%, took #1 citation share in its industry, and grew answer engine signups 37% in 30 days with Anthroly.',
    summary:
      'As a newer market challenger competing against legacy video editing tools with decade-old SEO advantages, OpusClip needed a new strategy to reach the 12 million+ video creators searching for solutions through AI-powered answer engines.',
    metrics: [
      { value: '37%', label: 'Increase in new user signups from answer engines' },
      { value: '#1', label: 'In citation share among competitors' },
      { value: '50%', label: 'Increase in brand visibility' },
    ],
    publishedAt: '2026-02-11',
    blocks: [
      { type: 'h2', text: 'Company overview' },
      {
        type: 'p',
        text: 'OpusClip is the #1 AI video clipping tool, empowering creators to transform longform videos into multiple social-ready clips. With a comprehensive suite of AI video editing features and an AI-powered social scheduling tool, OpusClip has served over 12 million video creators in just two years since launch.',
      },
      { type: 'h2', text: 'The challenge' },
      {
        type: 'p',
        text: 'As a newer market challenger in the video editing space, OpusClip faced significant competitive headwinds. Legacy competitors with over a decade of market presence had established strong traditional SEO dominance that would take years to overcome through conventional methods.',
      },
      {
        type: 'p',
        text: 'However, the OpusClip team recognized a pivotal shift in consumer behavior. "Seeing the shift in consumer behavior from traditional SEO to AEO, and also steadily increasing referral traffic to our site from Answer Engine sources like chatgpt.com, made us realize that AEO is an opportunity we shouldn\'t neglect," explains Derek Coleman, Senior Growth Marketer at OpusClip. Video creators increasingly relied on AI-powered answer engines to research solutions for their nuanced needs, often through long-tail queries and follow-up questions only feasible in AI conversations. Steadily increasing referral traffic from sources like chatgpt.com confirmed this trend. Derek saw an opportunity.',
      },
      {
        type: 'quote',
        body: 'Capitalizing early on the AEO platform shift felt like a way to level the playing field with our legacy competitors.',
        name: 'Derek Coleman',
        role: 'Senior Growth Marketer',
      },
      {
        type: 'p',
        text: 'Before partnering with Anthroly, OpusClip had limited visibility into Answer Engine responses. They could only monitor referral traffic trends and manually run sample queries — an inefficient approach that provided no actionable insights or historical data.',
      },
      { type: 'h2', text: 'The solution' },
      {
        type: 'p',
        text: 'OpusClip chose Anthroly as their AEO partner after identifying them as the thought leaders in this emerging space. The platform offered comprehensive visibility into Answer Engine performance including the ability to track exact Answer Engine responses, historical data spanning months, and access to real user conversations across multiple answer engines with robust filtering and export capabilities.',
      },
      {
        type: 'p',
        text: 'The "aha moment" came when the team saw the platform\'s analytical depth: "When I saw that you could see the exact response that the Answer Engines give for each prompt and query sent, and that you could look at the history over the past three months or so and export over 50,000 citations and thousands of different answers across the different Answer Engines. That\'s when I really realized that this would be a platform that we would be using consistently for the foreseeable future, because there is a lot that you can learn from analyzing the data," Coleman recalls.',
      },
      {
        type: 'p',
        text: 'The marketing team, including their Senior Growth Marketer and Head of Growth, established ambitious goals: increase brand visibility from approximately 30% to 40% across core topics including video repurposing, AI video editing, and video clipping.',
      },
      { type: 'h2', text: 'The strategy' },
      {
        type: 'p',
        text: "OpusClip took a data-driven, aggressive approach to achieving their goals. The team engaged deeply with Anthroly's team through Slack, followed employees on LinkedIn to learn about the latest correlations and studies, and narrowed down specific tactics to improve Answer Engine visibility.",
      },
      { type: 'p', text: 'Their tactical approach included:' },
      {
        type: 'ul',
        items: [
          "Deep platform immersion: leveraging Anthroly's comprehensive analytics to understand exactly where they appeared in Answer Engine responses and where competitors were winning",
          "Content optimization at scale: using Anthroly's content generation and optimization tools to create new content and enhance existing pages, always with human oversight and editing",
          'Continuous measurement: tracking performance on a 7-day rolling average to monitor progress and adjust strategies in real-time',
          'Cross-functional collaboration: sharing Anthroly insights with product, engineering, and co-marketing teams to align the entire organization around AEO wins',
        ],
      },
      { type: 'h2', text: 'The results' },
      {
        type: 'p',
        text: "OpusClip didn't just meet their goals, they exceeded them dramatically within the first 30 days.",
      },
      {
        type: 'quote',
        body: 'We were able to increase our brand visibility to more than 45% for our core topics, move into second place, and we increased our citations to first place in our industry amongst our competitors.',
        name: 'Derek Coleman',
        role: 'Senior Growth Marketer',
      },
      { type: 'h3', text: 'Lifts in brand visibility' },
      {
        type: 'ul',
        items: [
          'Increased from ~30% to over 45% for core topics',
          'Moved into 2nd place overall in their industry',
          'Goal exceeded: surpassed their 40% target',
        ],
      },
      { type: 'h3', text: 'Citation domination' },
      {
        type: 'ul',
        items: [
          'Achieved #1 ranking for citations in their industry among competitors',
          'Dominated specific high-value topics like video repurposing',
          'Identified clear opportunities for improvement in AI video editing, video clipping, and video captions',
        ],
      },
      { type: 'h3', text: 'Business impact' },
      {
        type: 'ul',
        items: [
          '10.1% increase in total Answer Engine visibility across 8 core topics',
          '20% increase in Answer Engine traffic',
          '37% increase in new user signups from Answer Engines',
          '40% increase in subscription plans from Answer Engines',
        ],
      },
      { type: 'h2', text: 'Building a culture around AEO' },
      {
        type: 'p',
        text: 'Beyond the impressive quantitative results, Anthroly transformed how OpusClip operates.',
      },
      {
        type: 'p',
        text: 'The platform enabled weekly progress reports with granular visibility and citation tracking, impossible before Anthroly. The team can now understand which outlets or competitors are outranking them and how to improve their strategy.',
      },
      {
        type: 'p',
        text: '"It also improves cross-functional collaboration," Coleman explains. "We\'re able to collaborate more with our product team and our engineering team and our marketing team by showing them exactly what is working and what is not. If we work with engineering on a specific project to launch some tool pages on the website, we\'re able to look in Anthroly and see what kind of impact that has had, and then that makes engineering more willing to work with the marketing team when they\'re able to see the impact of their work."',
      },
      {
        type: 'p',
        text: "The team now leverages the full breadth of Anthroly's capabilities, from visibility tracking to prompt volume analysis, query fan-out analysis, and sentiment tracking across platforms.",
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: "OpusClip's success with AEO represents a blueprint for companies looking to compete in the AI-powered search era. By moving early and strategically, they overcame legacy marketing positioning and achieved market leadership in Answer Engine visibility.",
      },
      {
        type: 'p',
        text: "The team is already applying these learnings to new initiatives. As they launch their AI video generator, they're tracking visibility from day one and using Anthroly insights to dictate their AEO launch strategy.",
      },
      {
        type: 'p',
        text: 'When asked what they\'d tell peers considering Anthroly, the response is simple and enthusiastic: "I would recommend it and I\'ve already recommended it to several peers."',
      },
    ],
  },

  // ==========================================================================
  // Hone
  // ==========================================================================
  {
    slug: 'hone',
    brand: 'Hone',
    domain: 'honehq.com',
    title: 'Hone boosts visibility by 800% using AI-optimized content workflows',
    metaTitle: 'Hone Case Study: 800% AI Visibility Boost | Anthroly',
    metaDescription:
      'How coaching platform Hone became the #1 cited source in its category and grew AI visibility 800% using Anthroly content workflows.',
    summary:
      "By leveraging Anthroly's content generation workflows, Hone became the #1 cited source by AI for the answers they cared about while visibility for their most critical growth offering skyrocketed 800%.",
    metrics: [
      { value: '800%', label: 'Increase in visibility for key topic' },
      { value: '#1', label: 'Content generated in Anthroly became the #1 cited webpage for relevant prompts' },
    ],
    publishedAt: '2026-01-28',
    blocks: [
      {
        type: 'p',
        text: 'While the rest of the market was just beginning to contemplate AEO, Hone partnered with Anthroly to implement a strategy fast. What started with monitoring their visibility in AI search and analyzing the citations powering the answers soon evolved to taking action on the insights and influencing the answers.',
      },
      {
        type: 'p',
        text: "By leveraging Anthroly's content generation workflows, Hone became the #1 cited source by AI for the answers they cared about while visibility for their most critical growth product line skyrocketed 800%.",
      },
      { type: 'h2', text: 'Overview' },
      {
        type: 'p',
        text: 'Hone is an AI-powered coaching and upskilling platform that helps organizations develop better leaders, stronger teams, and higher-performing employees. Its customers range from 50-person startups to Fortune 500 companies, all focused on empowering people to perform at their best through a mix of AI-driven and human-led experiences.',
      },
      {
        type: 'p',
        text: "When it comes to learning and development, Hone acknowledged that there are many platforms to choose from and buyers in the market often have many questions around what will best suit their needs. As AI reshaped how people discover and evaluate solutions, Hone's marketing team knew they needed to adapt fast to make sure they were a part of that narrative.",
      },
      {
        type: 'quote',
        body: 'Our growth relies on people finding us. How that was happening was changing dramatically.',
        name: 'Linda Schwaber-Cohen',
        role: 'VP of Marketing at Hone',
      },
      { type: 'h2', text: 'The challenge' },
      {
        type: 'p',
        text: "For the first time in her career, Linda noticed a troubling signal: Hone's organic search growth was declining.",
      },
      {
        type: 'p',
        text: "Linda recognized that prospects weren't browsing search results as much anymore, but instead asking questions directly to answer engines like Google AI Overview. But Linda noted that visibility in these answer engines was opaque and difficult to measure. Hone needed a way to understand how its brand was represented in this new discovery landscape and, more importantly, how to influence it.",
      },
      {
        type: 'p',
        text: '"It was clear that behaviors were changing. People still go to Google, but they\'re not clicking — they\'re getting answers instantly. I needed to make sure we weren\'t losing awareness just because clicks were disappearing."',
      },
      { type: 'h2', text: 'The solution' },
      {
        type: 'p',
        text: 'Despite noticing the shift and establishing the need to do something, Linda was strapped for resources which meant finding a true partner was the first step. When a member of their board told her that another one of their portfolio companies was evaluating Anthroly, she quickly reached out.',
      },
      {
        type: 'quote',
        body: "Anthroly had a really strong point of view of what was happening in the world. I had more questions than answers and was looking for guidance. That's where Anthroly came in.",
        name: 'Linda Schwaber-Cohen',
        role: 'VP of Marketing at Hone',
      },
      {
        type: 'p',
        text: 'Linda and other members of her team — across product marketing, demand generation, and content — worked closely with their Anthroly account team to develop an AEO strategy that bolstered category positioning with new, optimized content.',
      },
      {
        type: 'p',
        text: '"Anthroly gave us both the data and the partnership we needed," said Linda. "They helped us identify where to focus, how to structure our content, and what success should look like in a world where SEO metrics no longer tell the full story."',
      },
      {
        type: 'p',
        text: 'A key collaboration was a targeted blog initiative. Using insights from Anthroly, Hone optimized articles for AI crawling and citation potential.',
      },
      { type: 'h2', text: 'The results' },
      {
        type: 'p',
        text: 'Within just a few months, Hone saw measurable, meaningful impact with Anthroly.',
      },
      { type: 'h3', text: 'Shaping the narrative' },
      {
        type: 'p',
        text: "Hone's citation share for the category grew by 10x (from nearly 0% to 7%) making their domain the #1 most cited source for related prompts. AI bots went from skipping over their website almost entirely to using the content on it as source material for answers.",
      },
      { type: 'h3', text: 'Showing up in key moments' },
      {
        type: 'p',
        text: "The newly created and optimized content began picking up citations in a matter of weeks, and caused Hone's visibility in this category to increase 800%, helping them surpass over a dozen competitors in the space.",
      },
      {
        type: 'p',
        text: 'The ability to benchmark against competitors and track category trends has also become a key advantage in an emerging market. And beyond the data, Linda values the peace of mind she says working with Anthroly offers.',
      },
      {
        type: 'p',
        text: '"Marketing is a game of tradeoffs. It\'s easy to get lost in short-term demand capture," said Linda. "Anthroly helps me keep sight of the long game — making sure we\'re showing up where it matters most."',
      },
      { type: 'h2', text: 'Looking ahead' },
      {
        type: 'p',
        text: 'Hone plans to build on its momentum by expanding visibility across ChatGPT and other answer engines, deepening its understanding of how prospects engage with AI search tools, and continuing to refine its AEO strategy with Anthroly.',
      },
      {
        type: 'quote',
        body: 'In a world where the rules for marketing are changing really quickly, Anthroly is helping me rewrite the modern marketing playbook.',
        name: 'Linda Schwaber-Cohen',
        role: 'VP of Marketing at Hone',
      },
    ],
  },

  // ==========================================================================
  // One Identity
  // ==========================================================================
  {
    slug: 'one-identity',
    brand: 'One Identity',
    domain: 'oneidentity.com',
    title: "From invisible to unmissable: One Identity's rise to #1 in competitive cybersecurity market",
    metaTitle: 'One Identity Case Study: #1 in AI Answers | Anthroly',
    metaDescription:
      "How One Identity grew AI visibility 30% in a quarter and won #1 placements on the most-cited publisher pages using Anthroly's citation insights.",
    summary:
      "By pairing proactive AEO with Anthroly's visibility and citation insights, One Identity moved from marginally visible to consistently winning #1 placements on key publisher pages and massive increases in overall visibility.",
    metrics: [
      { value: '30%', label: 'Visibility growth in a single quarter' },
      { value: '#1', label: 'Position across the most heavily cited earned media outlets' },
      { value: '2x', label: 'Increase in non-branded citation share' },
    ],
    publishedAt: '2026-01-15',
    blocks: [
      { type: 'h2', text: 'Overview' },
      {
        type: 'p',
        text: 'One Identity is a cybersecurity leader focused on AI-powered identity security, covering solutions like privileged access management and Active Directory management.',
      },
      {
        type: 'p',
        text: 'This is a highly competitive space and One Identity\'s SEO lead, Ali Sayyed, immediately saw an opportunity to jump past competitors in a key channel. "When we saw organic traffic change behavior, while more traffic was coming from ChatGPT, we immediately wanted to take advantage of the changing landscape," states Sayyed.',
      },
      {
        type: 'p',
        text: 'Given the competitive nature of the security space, Ali made average position his north-star metric, supported by visibility, citations, and sentiment, so they could steer strategy with precision rather than gut feelings.',
      },
      { type: 'h2', text: 'The challenge' },
      {
        type: 'p',
        text: "As AI answers and overviews began reshaping buyer research, traditional SEO tools couldn't provide insight into the new buying funnel. The goal became clear: see what answer engines actually cite, then elevate One Identity into those shortlists.",
      },
      {
        type: 'quote',
        body: "All we ever measured was 'visibility', but being visible isn't the same as being number one, we wanted to track positions as well, and overall product perception.",
        name: 'Ali Sayyed',
        role: 'SEO Lead',
      },
      { type: 'h2', text: 'The turning point' },
      {
        type: 'p',
        text: 'The "aha" arrived with Anthroly\'s citations dashboards. "Seeing the citation pages was a big revelation, suddenly I could quickly focus on target pages for campaigns," says Ali. That single view turned data into a prioritized to-do list. "Answer Engines change all the time. I took a 90-day window and targeted the major cited pages, and then built our own pages to reinforce the narrative."',
      },
      { type: 'h2', text: 'The solution' },
      { type: 'h3', text: '1. Win the earned game with targeted publisher outreach' },
      {
        type: 'p',
        text: '"This is a form of link building and PR that is core to search optimization," Ali says. "We contacted the top publishers Anthroly surfaced, offered deeper product context, and, where appropriate, secured sponsored placements." The team systematically acquired #1 or #2 positions across the most influential listicles (e.g., PeerSpot, CyberPress, Expert Insights, etc.), giving Answer Engines (and buyers) authoritative third-party references to cite.',
      },
      {
        type: 'quote',
        body: 'Anthroly showed us exactly which pages to influence, and outreach translated into #1 positions across multiple publishers.',
        name: 'Ali Sayyed',
        role: 'SEO Lead',
      },
      { type: 'h3', text: '2. Create on-site pillar content designed to be cited' },
      {
        type: 'p',
        text: '"We wrote our own \'Top Active Directory Management Tools\' page," he adds. "We listed ourselves No. 1, but stayed objective about competitors, because LLMs pick up on overly biased negativity." The intent wasn\'t to game models but to help them: concise product details, feature depth, and credible references.',
      },
      { type: 'h3', text: 'Tight feedback loops & daily use' },
      {
        type: 'p',
        text: '"Every day," Ali says of platform usage. The first phase focused on tuning the data model so he could present it with confidence to executives. However, the power of AEO and Anthroly\'s insights started to trickle through the organization. "Measure, measure, measure!" became an internal mantra as dashboards hardened and outreach turned into rankings.',
      },
      { type: 'h2', text: 'Results' },
      { type: 'p', text: 'Within weeks, One Identity saw decisive movement:' },
      {
        type: 'ul',
        items: [
          'Climbed from about No. 5 to No. 2 against true market competitors',
          'Non-brand citation share reached ~4% in a broad, objective marketplace',
          'Visibility growth of 30% in a single quarter, increasing share of voice to match the top 3 performing brands (e.g. Microsoft)',
        ],
      },
      {
        type: 'p',
        text: 'On executive trust: "I can walk into a QBR with Anthroly data and slides that the board understands, industry-high growth in visibility and clear movement in Average Position," he says. Turning Average Position into a core KPI let the team focus on outcome quality, not just surface-level impressions. This helped tie the entire AEO process to actual product positioning within markets.',
      },
      { type: 'h2', text: 'Cross-functional impact' },
      {
        type: 'p',
        text: "Anthroly's insights now flow to marketing, product, and sales engineering:",
      },
      {
        type: 'ul',
        items: [
          'Marketing: AEO and content plan aligned to measurable targets (average position, citations).',
          'Product: sentiment inputs tied to recurring buyer prompts in GenAI tools inform UX and messaging priorities.',
          '"Sales team thinks many objections come from \'pros/cons\' prompts, from prospects prepping before the sales call using tools like ChatGPT," Ali notes — so the team actively addresses both owned content and publisher placements. They also prep for these objections in enablement.',
        ],
      },
      {
        type: 'p',
        text: 'Closing, Ali states the plain value their organization gets from Anthroly.',
      },
      {
        type: 'quote',
        body: 'Anthroly helps us see the new customer journey as it is today and gives us levers to influence it.',
        name: 'Ali Sayyed',
        role: 'SEO Lead',
      },
    ],
  },

  // ==========================================================================
  // Statsig
  // ==========================================================================
  {
    slug: 'statsig',
    brand: 'Statsig',
    domain: 'statsig.com',
    title: 'How Statsig took control of their AI presence in less than a week',
    metaTitle: 'Statsig Case Study: 2x AI Visibility in a Week | Anthroly',
    metaDescription:
      'How experimentation platform Statsig nearly doubled visibility across all answer engines in key categories in under a week with Anthroly.',
    summary:
      'Statsig is a product experimentation and analytics platform used by engineering teams at companies like Notion, OpenAI, Figma, and Brex. With Anthroly, they nearly doubled visibility across all answer engines in key categories in less than a week.',
    metrics: [
      { value: '2x', label: 'Increase in visibility across all answer engines in key categories in less than a week' },
      { value: '2 hrs', label: 'Time to set up full visibility across all core prompts' },
    ],
    publishedAt: '2025-12-18',
    blocks: [
      {
        type: 'p',
        text: 'Statsig was founded in 2020 by a team of engineers with a clear vision: build the fastest, most powerful product experimentation and analytics platform on the market and make it something engineers actually love to use. The Statsig platform is now used daily by engineering and product teams at companies like Notion, OpenAI, Figma, Rippling, and Brex, helping them make data-driven decisions and ship better products faster.',
      },
      {
        type: 'p',
        text: "Statsig didn't get here through polished pitch decks or traditional paid campaigns alone. Their growth has been fueled by engineering velocity, customer obsession, and relentless iteration, with each team member focused on building products that solve real problems for real users.",
      },
      {
        type: 'p',
        text: 'Skye leads marketing at Statsig. Like the product team, he moves fast, testing ideas, watching data, and doubling down on what works. So when he noticed a spike in users saying they discovered Statsig through ChatGPT, it caught his attention and sparked a new strategic direction.',
      },
      {
        type: 'p',
        text: "Statsig had built its reputation the hard way, through a rock-solid product and obsessive focus on customer needs. Their experimentation and analytics platform is used by millions of end users daily, providing the infrastructure that powers product decisions across some of the world's most innovative companies. But until recently, AI answer engines weren't part of their growth playbook.",
      },
      {
        type: 'quote',
        body: "We weren't doing anything before Anthroly. We just hoped that good SEO would lead to good AEO over time, but it became clear that wouldn't be the case. We needed to evolve our strategy.",
        name: 'Skye Scofield',
        role: 'Marketing Lead at Statsig',
      },
      {
        type: 'p',
        text: "That's why Skye brought in Anthroly to help Statsig navigate this new frontier of AI-driven discovery.",
      },
      { type: 'h2', text: 'Validating hunches and acting on grounded insights' },
      {
        type: 'p',
        text: 'Like any great marketing leader, Skye understands his customers deeply and has built relationships with users across different industries and company sizes. He also knows (from talking to customers) that they learn about Statsig in a few key ways:',
      },
      {
        type: 'ul',
        items: [
          'Comparisons with legacy tools',
          'Getting hands on with the platform via generous free tier pricing, which is very appealing to a technical audience',
          'Guides for specific tasks (i.e., switchback tests, stratified sampling, etc.)',
        ],
      },
      {
        type: 'p',
        text: 'He knows customers are increasingly turning to answer engines for product research and technical guidance, so he wanted to see if he could double down on these strategies in the context of answer engines and find opportunities to increase visibility across the board.',
      },
      {
        type: 'quote',
        body: 'I was able to set up full visibility across all the core prompts we cared about in less than 2 hours. Then, the next day, I was able to see both the outputs from different answer engines and the sources they cited. It was like suddenly being able to see — so incredible!',
        name: 'Skye Scofield',
        role: 'Marketing Lead at Statsig',
      },
      {
        type: 'p',
        text: 'Anthroly showed which prompts mattered, which answer engines were returning helpful answers, and which content sources were driving rankings. That insight helped Statsig shape its AI visibility strategy with precision, allowing them to focus their efforts on the most impactful opportunities.',
      },
      { type: 'p', text: 'Some of the initial moves:' },
      {
        type: 'ul',
        items: [
          'Using insights from Anthroly to publish AI-friendly content for product analytics subcategories and legacy competitor comparisons',
          'Amplifying known citations, including Reddit threads that answer engines were already referencing for key topics',
        ],
      },
      {
        type: 'p',
        text: 'Skye ran the entire playbook himself, taking a hands-on approach to every aspect of the strategy. No big team, no long meetings, no agencies, just a tight feedback loop and fast iteration. The results were clear and measurable.',
      },
      {
        type: 'quote',
        body: "We've nearly doubled our visibility across all answer engines in key categories in less than a week.",
        name: 'Skye Scofield',
        role: 'Marketing Lead at Statsig',
      },
      { type: 'h2', text: 'More than a partner, a shared DNA' },
      {
        type: 'p',
        text: 'Skye did a full evaluation of the market, testing multiple tools and platforms, but quickly realized that Anthroly is going to be the future-proof option for their needs. Past features and capabilities, there was cultural alignment that made the partnership feel natural. Statsig moves fast, and so does Anthroly, creating a shared rhythm that accelerated their collaboration.',
      },
      {
        type: 'quote',
        body: 'We chose Anthroly because it seemed like the deepest and most complete tool in the market. We also tried a few tools, and Anthroly was immediately the obvious choice based on a sophisticated UI, deeply customizable prompts and flows, and super supportive team.',
        name: 'Skye Scofield',
        role: 'Marketing Lead at Statsig',
      },
      {
        type: 'p',
        text: 'That mindset resonated deeply with both teams. Both companies value shipping quickly, listening to users, and treating customer feedback as a product accelerant, creating a foundation for long-term partnership.',
      },
      { type: 'h2', text: 'Building for the future of marketing' },
      {
        type: 'p',
        text: 'Skye is one of the pioneering marketing leaders who is building for the future of search and changing consumer behavior, positioning Statsig at the forefront of this transformation.',
      },
      {
        type: 'p',
        text: "At Anthroly we're proud to partner with leading companies like Statsig who want to be early movers in AI search.",
      },
    ],
  },

  // ==========================================================================
  // Ramp
  // ==========================================================================
  {
    slug: 'ramp',
    brand: 'Ramp',
    domain: 'ramp.com',
    title: 'How Ramp increased AI brand visibility 7x in accounts payable',
    metaTitle: 'Ramp Case Study: 7x AI Visibility in AP | Anthroly',
    metaDescription:
      "How Ramp used Anthroly's Answer Engine Insights to grow AI Search visibility of its Accounts Payable solution from 3.2% to 22.2% in one month.",
    summary:
      "Ramp, a leader in financial automation, incorporated Anthroly's Answer Engine Insights to increase the AI search visibility of its Accounts Payable solution from 3.2% to 22.2% in just 1 month.",
    metrics: [
      { value: '7x', label: 'AI visibility grew from 3.2% to 22.2%' },
      { value: '#8', label: '19th to 8th most visible in Accounts Payable' },
      { value: '2x', label: 'Doubled citations vs. all previous content' },
    ],
    publishedAt: '2025-12-04',
    blocks: [
      {
        type: 'quote',
        body: "Identifying and analyzing LLM insights for AEO has been a key priority for the Ramp team. Anthroly allowed us to uncover behavioral patterns that traditional SEO tools couldn't fully capture. By analyzing long-tail queries in LLMs, our SEO team has gained deeper, data-driven insights to complement traditional strategies — allowing us to run more targeted tests and stay ahead in AI-driven search.",
        name: 'Ashley Nguyen',
        role: 'SEO Strategist at Ramp',
      },
      { type: 'h2', text: 'The opportunity' },
      {
        type: 'p',
        text: 'Ramp saw what others missed: a blue ocean opportunity in AI-powered search. 5% of all queries are now answered by AI, and this number is growing rapidly. At the same time, 90% of B2B buyers use AI to research purchases.',
      },
      {
        type: 'p',
        text: 'Ramp noted one immediate strategic focus: their visibility in Accounts Payable was incredibly low, and they knew they could dominate this space with the right approach.',
      },
      { type: 'h2', text: 'The solution' },
      { type: 'h3', text: 'Citation-driven content strategy' },
      {
        type: 'p',
        text: "Ramp leveraged Anthroly's Answer Engine Insights, noticing AI engines frequently cited content related to automation, AI, and software comparisons — content traditionally overlooked in organic search. Analysis revealed that 6% of Ramp's pre-existing citations came from such automation-related content.",
      },
      { type: 'h3', text: 'Solve for the full query' },
      {
        type: 'p',
        text: "To capitalize on this insight, Ramp created two tailored pages designed specifically for pickup by AI Answer Engines — Accounts Payable Software for Small Businesses and Accounts Payable Software for Large Businesses. Along with similar comparison pages like Top 6 Accounts Payable Automation Software and AI in Accounts Payable, they've contributed significantly to Ramp's visibility growth.",
      },
      { type: 'h2', text: 'The results' },
      { type: 'p', text: "Ramp's strategic approach quickly proved successful:" },
      {
        type: 'ul',
        items: [
          "300+ citations: the two targeted pages generated over 300 citations within one month, placing them among Ramp's top-cited content.",
          "7x AI visibility improvement: Ramp's AI visibility surged from 3.2% to 22.2% within a month.",
          'Competitive advantage: Ramp moved from 19th to 8th place among fintech brands in the Accounts Payable sector, surpassing 11 competitors and setting new benchmarks for AI-optimized content.',
        ],
      },
      {
        type: 'p',
        text: "Anthroly's insights allowed Ramp to precisely understand what AI answer engines prioritize, enabling a rapid shift in content strategy. This immediate, measurable success demonstrated clear advantages over traditional SEO methods.",
      },
      { type: 'h2', text: 'The outcome' },
      {
        type: 'p',
        text: 'Ramp has now solidified its position as a thought leader within the Accounts Payable AI search landscape. The targeted content strategy not only increased citation rates and visibility but created lasting value that transcends traditional SEO metrics, positioning Ramp at the forefront of the emerging AI-driven search ecosystem.',
      },
    ],
  },

  // ==========================================================================
  // Lake.com
  // ==========================================================================
  {
    slug: 'lake',
    brand: 'Lake.com',
    domain: 'lake.com',
    title: "How Lake.com 5x'ed branded traffic by tapping into AI Search behavior",
    metaTitle: 'Lake.com Case Study: 5x Branded Traffic From AI | Anthroly',
    metaDescription:
      'How vacation rental platform Lake.com used Anthroly to reach 30-50% AI visibility for key terms and 5x branded organic traffic during peak season.',
    summary:
      'Lake.com, a vacation rental platform specializing in lakefront and waterfront stays, is proving that deep focus beats broad scale, especially when AI search is involved. In just a few weeks of working with Anthroly, Lake.com transformed its content strategy, improved its AI visibility, and saw a 5x spike in branded organic traffic during peak season.',
    metrics: [
      { value: '5x', label: 'Increase in branded organic traffic during peak season' },
      { value: '30-50%', label: 'Visibility for unbranded and lake house-specific terms' },
    ],
    publishedAt: '2025-11-20',
    blocks: [
      {
        type: 'quote',
        body: "We've always known the vacation planning journey breaks into three micro-moments: 'I want to know, I want to go, I want to do.' Anthroly gave us the visibility to see that pattern happening in AI search too.",
        name: 'David Ciccarelli',
        role: 'Founder and CEO of Lake.com',
      },
      { type: 'h2', text: 'A focused alternative to Airbnb' },
      {
        type: 'p',
        text: 'Lake.com was built around a simple observation: most vacation rental platforms ignore the real experience of staying by the water.',
      },
      {
        type: 'p',
        text: 'The team behind Lake.com noticed a pattern. Many lakefront homes sat empty most of the year, despite clear demand from travelers looking to escape cities for rural, drive-to destinations. Rather than competing with Airbnb and Vrbo on quantity, they built a platform that focused deeply on one type of traveler: the outdoor traveller with an affinity for being by the water.',
      },
      { type: 'p', text: 'Key differentiators:' },
      {
        type: 'ul',
        items: [
          'Properties within 15 minutes of water (walk, drive, or hike)',
          'Rich amenity data: kayaks, boat rentals, life jackets',
          'Designed around "drive-to" rural travel, which accounts for 50% of all vacation rentals',
          'Long-term vision to expand into events and experiences, not just lodging',
        ],
      },
      { type: 'h2', text: 'Why Lake turned to Anthroly' },
      {
        type: 'p',
        text: "As AI becomes the first touchpoint for vacation planning, Lake.com wanted visibility into how real people search across tools like ChatGPT, Perplexity, and Google's AI Overviews.",
      },
      { type: 'p', text: 'Their goals:' },
      {
        type: 'ul',
        items: [
          'Validate how users search for lake travel across "want to know, want to go, want to do" moments',
          'Benchmark their visibility vs. larger platforms',
          'Identify emerging content opportunities from real conversation trends',
        ],
      },
      {
        type: 'p',
        text: 'Anthroly helped Lake.com map this AI-driven journey using Conversation Explorer and Answer Engine Insights.',
      },
      {
        type: 'p',
        text: "Within days, Lake's team had a clear picture of how their brand was surfacing in AI results and, more importantly, where it wasn't.",
      },
      { type: 'h2', text: 'The results' },
      {
        type: 'p',
        text: 'By aligning content strategy with real prompt data, Lake.com drove significant gains:',
      },
      {
        type: 'ul',
        items: [
          'Unbranded terms: now visible 30+% of the time',
          'Lake house-specific terms: ~50% visibility across key prompts',
          'Branded organic traffic: increased 5x leading into July 4 compared to the same period last year',
        ],
      },
      {
        type: 'p',
        text: 'These improvements started by understanding what people were asking for in ChatGPT and creating content for it.',
      },
      {
        type: 'quote',
        body: "We weren't sure if we could beat Airbnb, but we knew we needed to be in the consideration set. Anthroly helped us see where we stood — and where we could win.",
        name: 'David Ciccarelli',
        role: 'Founder and CEO of Lake.com',
      },
      { type: 'h2', text: 'How they did it: from micro-moments to macro wins' },
      {
        type: 'p',
        text: 'Lake.com focused on three high-intent stages of vacation planning:',
      },
      {
        type: 'ul',
        items: [
          '"I want to know" — researching destinations, events, lakes, and inspiration',
          '"I want to go" — comparing vacation rentals and amenities',
          '"I want to do" — finding activities post-booking, like boat shows or local festivals',
        ],
      },
      {
        type: 'p',
        text: 'Using Conversation Explorer, the Lake team uncovered prompt patterns aligned with each of these phases — then created content to match.',
      },
      { type: 'p', text: 'They introduced:' },
      {
        type: 'ul',
        items: [
          'Event-driven articles tied to fishing tournaments, music festivals, and regattas',
          'Destination content for "drive-to" lakes within 2 hours of major cities',
          "Evergreen guides that didn't require rebuilding URLs or re-earning SEO authority each year",
        ],
      },
      {
        type: 'p',
        text: 'They also spotted gaps in their coverage. Terms like "summer travel," "family vacation ideas," and "outdoor activities near water" were trending — but underrepresented on their site. That changed fast.',
      },
      {
        type: 'p',
        text: '"Anthroly helped us stop thinking only about the booking and start thinking about the entire journey: discovery, decision, and the stay itself."',
      },
      { type: 'h2', text: "What's next: scaling insight into action" },
      {
        type: 'p',
        text: 'Lake.com is now adopting Actions, the latest feature in Anthroly, to generate deeply researched content briefs based on their AI footprint. This allows their team to prioritize topics where demand is clear — and where Lake is already emerging in AI search results.',
      },
      { type: 'p', text: 'Next milestones:' },
      {
        type: 'ul',
        items: [
          'Build seasonal content for key booking periods (Memorial Day, July 4, Labor Day)',
          'Expand coverage of semantically related topics like hiking, camping, and rural events',
          'Further scale content production',
        ],
      },
      { type: 'h2', text: 'Why it matters' },
      {
        type: 'p',
        text: "As AI tools become default travel advisors, platforms like Lake.com can't just optimize for Google clicks. They need to earn presence inside the answer itself.",
      },
      {
        type: 'p',
        text: "That's where Anthroly delivers value; by exposing the real questions users ask and making it actionable.",
      },
      {
        type: 'quote',
        body: "For unbranded lake house terms, we're now showing up 50% of the time even against major players like Vrbo and Expedia.",
        name: 'David Ciccarelli',
        role: 'Founder and CEO of Lake.com',
      },
    ],
  },

  // ==========================================================================
  // Airbyte
  // ==========================================================================
  {
    slug: 'airbyte',
    brand: 'Airbyte',
    domain: 'airbyte.com',
    title: 'How Airbyte tripled AI brand visibility in one week',
    metaTitle: 'Airbyte Case Study: 3x AI Visibility in One Week | Anthroly',
    metaDescription:
      'How Airbyte tripled ChatGPT visibility in one week, lifted overall AI visibility 16%, and closed a $100K deal from ChatGPT with Anthroly.',
    summary:
      "Airbyte partnered with Anthroly to analyze and optimize their brand's AI visibility, tripling ChatGPT visibility and establishing a repeatable playbook for Generative Engine Optimization.",
    metrics: [
      { value: '3x', label: 'Visibility increase in ChatGPT in one week' },
      { value: '+16%', label: 'Lift in overall visibility across AI platforms' },
      { value: '$100k', label: 'Closed a $100,000 deal from ChatGPT' },
    ],
    publishedAt: '2025-11-06',
    blocks: [
      { type: 'h2', text: 'Key results' },
      {
        type: 'ul',
        items: [
          '3x visibility increase in ChatGPT: from 9% to 26% in one week',
          '+16% lift in overall visibility across AI platforms',
          'Airbyte closed a $100,000 deal from ChatGPT in July 2025',
        ],
      },
      { type: 'h2', text: 'The challenge' },
      {
        type: 'p',
        text: 'Airbyte had strong performance across traditional SEO and community channels, but visibility across AI-native interfaces was lagging. As buyer journeys increasingly begin inside tools like ChatGPT and Perplexity, this gap becomes a risk.',
      },
      { type: 'p', text: 'The team needed answers to three questions:' },
      {
        type: 'ul',
        items: [
          'Where and how was Airbyte appearing across AI platforms?',
          'What narratives were forming around the brand in AI-generated responses?',
          'How much qualified traffic and attention was being driven from these environments?',
        ],
      },
      {
        type: 'p',
        text: 'AI visibility was not just a branding issue — it was becoming a critical part of user acquisition.',
      },
      { type: 'h2', text: "Analyzing Airbyte's AI visibility" },
      {
        type: 'p',
        text: 'Airbyte partnered with Anthroly to analyze and optimize how their brand appeared in AI-generated results.',
      },
      { type: 'h3', text: '1. Measured visibility across platforms' },
      {
        type: 'p',
        text: 'Using Answer Engine Insights, Airbyte analyzed over 500 prompts across priority topics in ChatGPT, Perplexity, Google AI Overviews, and Copilot. This revealed:',
      },
      {
        type: 'ul',
        items: [
          'Where Airbyte was mentioned or missing',
          'Which content assets were being cited',
          'How visibility compared against key competitors',
        ],
      },
      { type: 'h3', text: '2. Mapped performance by topic and geography' },
      {
        type: 'p',
        text: 'Anthroly allowed Airbyte to segment AI visibility by topic cluster and country, helping prioritize updates where impact would be highest.',
      },
      {
        type: 'p',
        text: 'It became clear that the Airbyte team needed to refactor their content towards what LLMs are favoring.',
      },
      { type: 'h3', text: '3. Tracked citations and real user referrals' },
      { type: 'p', text: 'Anthroly started surfacing key insights like:' },
      {
        type: 'ul',
        items: [
          'Which specific pages were generating the most citations in their industry. These became the blueprints for how content should be structured for LLMs.',
          "Crawl behavior and bot activity across the site from Anthroly's Agent Analytics, plus referral traffic driven by AI-generated answers, using Anthroly's GA4 integration.",
        ],
      },
      {
        type: 'p',
        text: 'The additional data of bot activity and referral traffic from GA4 closed the loop between AI visibility and business outcomes.',
      },
      { type: 'h2', text: 'How Airbyte took action' },
      {
        type: 'p',
        text: 'Armed with data, Airbyte took focused action across three key areas:',
      },
      { type: 'h3', text: '1. Optimized content for AI parsing' },
      {
        type: 'ul',
        items: [
          'Rewrote content into direct answers, lists, and step-by-step formats',
          'Removed filler content and emphasized structure',
          'Aligned page design with LLM reading patterns',
        ],
      },
      { type: 'h3', text: '2. Improved technical infrastructure' },
      {
        type: 'ul',
        items: [
          'Added schema.org markup for better content comprehension',
          'Deployed llms.txt to signal preferred source structure',
          'Shifted to server-side rendering to ensure full crawlability',
        ],
      },
      { type: 'h3', text: '3. Built authority and trust signals' },
      {
        type: 'ul',
        items: [
          'Highlighted contributor bios to show expertise',
          'Surfaced customer proof points and transparent documentation',
          'Maintained structured, regularly updated reference content',
        ],
      },
      { type: 'h2', text: "Airbyte's results with Anthroly" },
      {
        type: 'p',
        text: "Airbyte's focused strategy delivered rapid, measurable gains:",
      },
      {
        type: 'ul',
        items: [
          'Visibility in ChatGPT tripled in one week, from 9% to 26%',
          '+16% improvement in visibility across all platforms tested',
          'AI referrals increased as more people discovered Airbyte through conversational interfaces',
        ],
      },
      {
        type: 'p',
        text: "AI platforms are quickly becoming the new front page of the internet. Airbyte's experience shows that with the right data and execution, companies can reshape how large language models represent their brand — at speed.",
      },
      {
        type: 'p',
        text: "This is not a one-off win. It's a repeatable playbook the team is now scaling across new product areas.",
      },
      {
        type: 'p',
        text: 'In July 2025, Airbyte announced that they closed a $100,000 deal that originated from ChatGPT thanks to their continued optimizations in AI search with Anthroly.',
      },
      {
        type: 'quote',
        body: 'Airbyte was among the early adopters of the Anthroly platform. We wanted to better understand our brand visibility across AI platforms and track some of the key metrics. Anthroly delivered exactly what we needed.',
        name: 'Tanmay Sarkar',
        role: 'Digital Marketing Manager at Airbyte',
      },
    ],
  },

  // ==========================================================================
  // 1840 & Co.
  // ==========================================================================
  {
    slug: '1840-and-co',
    brand: '1840 & Co.',
    domain: '1840andco.com',
    title: 'From invisible to top 5: How 1840 & Co. achieved 11% AI visibility in remote staffing',
    metaTitle: '1840 & Co. Case Study: 0% to 11% AI Visibility | Anthroly',
    metaDescription:
      'How 1840 & Co. went from 0% to 11% AI visibility in one month and became a top 5 cited brand in remote staffing with Anthroly.',
    summary:
      "Brands today face a rapidly changing search landscape. AI answer engines like ChatGPT, Perplexity, and Microsoft Copilot are siphoning off users who once scrolled through blue links. If your brand isn't cited by these models, you're invisible. Answer Engine Optimization (AEO) is quickly becoming the new frontier, and 1840 & Co. — a remote staffing company — proved how powerful it can be when combined with Anthroly's platform.",
    metrics: [
      { value: '11%', label: 'Increase in AI visibility in remote staffing' },
      { value: '1 month', label: 'To see initial results' },
    ],
    publishedAt: '2025-10-22',
    blocks: [
      { type: 'h2', text: 'The challenge: standing out against heavyweights' },
      {
        type: 'ul',
        items: [
          'Industry giants: Toptal boasts around 74% AI visibility in the remote staffing space; Upwork claims about 29%.',
          "1840 & Co.'s starting point: 0% AI visibility, meaning they simply never appeared in AI answers — no matter how relevant they were.",
        ],
      },
      {
        type: 'p',
        text: "Despite well-established names dominating traditional search results, 1840 & Co. recognized that AI search was a fresh playing field. They could leapfrog competitors by mastering this emerging channel first. That's where Anthroly came in.",
      },
      { type: 'h2', text: "The shift to AEO: why traditional SEO isn't enough" },
      {
        type: 'p',
        text: "Traditional SEO once hinged on keywords and backlinks. But answer engines don't serve up 10 blue links; they generate a single consolidated response. A brand's mention depends less on backlink quantity and more on content clarity and direct brand statements.",
      },
      { type: 'h2', text: "1840 & Co.'s path to 11% visibility" },
      { type: 'h3', text: '1. Discovering the gaps with Anthroly' },
      {
        type: 'p',
        text: 'Using Anthroly\'s platform, 1840 & Co. scanned hundreds of queries — like "best remote staffing agencies" or "top US-based staffing for developers" — across popular AI engines. Anthroly\'s Citation Analysis revealed:',
      },
      {
        type: 'ul',
        items: [
          'Key competitors: Toptal, Upwork, and a few unexpected smaller firms.',
          'Winning content formats: short compare-and-contrast lists, straightforward "Why Choose Us" statements, and FAQ sections.',
          "Potential 'hidden influencers': niche industry blogs that held surprising sway in AI citations.",
        ],
      },
      {
        type: 'p',
        text: "Insight: by mapping the AI citation landscape, 1840 & Co. realized they didn't need million-dollar ad budgets or a massive SEO overhaul. They just needed precise, AI-friendly content.",
      },
      { type: 'h3', text: '2. Crafting AI-optimized content' },
      {
        type: 'p',
        text: "Armed with Anthroly's insights, 1840 & Co. published one targeted blog post:",
      },
      {
        type: 'ul',
        items: [
          'Headings & bullet points: clear segment titles like "10 Best Agencies For Remote Staffing Solutions."',
          'Direct brand placement: instead of burying themselves in a bottom paragraph, 1840 & Co. placed themselves at the top of curated lists.',
          'Short, relevant FAQs: AI often cites bite-sized Q&A sections.',
        ],
      },
      {
        type: 'p',
        text: 'Insight: in just two weeks, visibility jumped from 0% to 6%. By the end of the month, it climbed to 11% — making 1840 & Co. one of the top five players cited by AI-driven searches in their space.',
      },
      { type: 'h3', text: '3. Iteration & monitoring' },
      {
        type: 'p',
        text: "Rather than a set-it-and-forget-it approach, 1840 & Co. tapped into Anthroly's real-time tracking:",
      },
      {
        type: 'ul',
        items: [
          'Citation share: they observed exactly how often AI answers included their brand.',
          'Content insights: learning exactly what type of content was being cited across answer engines gave 1840 & Co. a clear direction for their content strategy.',
          'Competitive benchmarking: comparing their improvements against Toptal, Upwork, and others kept them nimble.',
        ],
      },
      {
        type: 'p',
        text: 'Insight: continuous monitoring allowed 1840 & Co. to see immediate impact from each content tweak and quickly outpace bigger rivals.',
      },
      { type: 'h2', text: 'Why this matters for your brand' },
      {
        type: 'ul',
        items: [
          'First-mover advantage: while competitors focus on traditional SEO, you can establish early dominance in AI search results.',
          'Rapid results: a single well-structured post can yield measurable gains within weeks — no huge link-building campaigns required.',
          'High-intent visibility: AI-driven answers often cater to specific, conversion-ready queries. When your brand is cited, it shapes the narrative. You own the discussion around your brand, products, and even wider industry.',
          "Long-term flexibility: as AI models evolve, you can adapt content strategy in real-time using Anthroly's data to stay ahead.",
        ],
      },
      { type: 'h2', text: 'How Anthroly delivers AEO ROI' },
      {
        type: 'quote',
        body: "Anthroly has given us actionable insights on how our brand is performing for GEO. It's exciting to see our visibility going up and which citations are affecting the score. Using Anthroly, I can start to get a good idea of how and what to do to improve our GEO.",
        name: 'Jay Douglas',
        role: 'Marketing Director at 1840 & Company',
      },
      {
        type: 'p',
        text: 'Anthroly is built to track, analyze, and boost AI visibility:',
      },
      {
        type: 'ul',
        items: [
          "Citation & content analysis: learn which content pieces AI engines value most — yours and your competitors'.",
          'Content pattern discovery: uncover exactly what content formats, structures, and messaging styles drive AI citations — from heading patterns to content depth.',
          'Search intent analysis: track keyword volume and discover what users are actually asking AI about your industry — helping you create content that matches real search behavior.',
          "Continuous insight: we run thousands of queries daily to ensure you're always up-to-date with the latest AI visibility trends.",
        ],
      },
      {
        type: 'p',
        text: 'For 1840 & Co., Anthroly meant not just playing catch-up — it meant leaping into the top tier of remote staffing results overnight.',
      },
      { type: 'h2', text: 'Final thoughts' },
      {
        type: 'p',
        text: "Answer Engine Optimization (AEO) is no longer a futuristic concept — it's already reshaping how consumers discover and choose brands. 1840 & Co.'s journey from total obscurity to a top 5 player is a clear, data-driven testament that any brand can capture AI-driven leads with the right approach.",
      },
      {
        type: 'p',
        text: 'At Anthroly, we empower you to unlock these same results — helping marketers reach qualified prospects swiftly and cost-effectively in the age of AI.',
      },
    ],
  },
];

/** Original Anthroly case studies with their own dedicated static pages */
export const originalCustomerStories = [
  {
    slug: 'llmoutrank',
    brand: 'llmoutrank',
    title: 'How llmoutrank grew AI referral traffic to thousands of visits in 2 months',
    keyResult: '2,400+ AI referral visits · 5x citations',
  },
  {
    slug: 'isthisaiorno',
    brand: 'isthisaiorno.com',
    title: 'How isthisaiorno.com hit 3,000+ monthly visitors from AI search in 6 weeks',
    keyResult: '3,200+ monthly visitors · 8x AI visibility',
  },
  {
    slug: 'jobstronauts',
    brand: 'Jobstronauts',
    title: 'How Jobstronauts captured 1,500+ AI-driven clicks in their first month',
    keyResult: '1,500+ AI clicks · 4x citation share',
  },
] as const;

export function getCaseStudy(slug: string): CustomerCaseStudy | undefined {
  return customerCaseStudies.find((c) => c.slug === slug);
}

/** All customer story links (dynamic case studies + original static pages) for listings */
export const allCustomerStories: { slug: string; brand: string; title: string; keyResult: string }[] = [
  ...customerCaseStudies.map((c) => ({
    slug: c.slug,
    brand: c.brand,
    title: c.title,
    keyResult: c.metrics
      .slice(0, 2)
      .map((m) => `${m.value} ${m.label}`)
      .join(' · '),
  })),
  ...originalCustomerStories.map((c) => ({ ...c })),
];
