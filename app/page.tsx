import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { HumanLedAIVisibility } from "@/components/sections/HumanLedAIVisibility";
import { CitationNeighbors } from "@/components/sections/CitationNeighbors";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GuaranteedResults } from "@/components/sections/GuaranteedResults";
import { PoweredBy } from "@/components/sections/PoweredBy";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { AICrawlerAnalysis } from "@/components/sections/AICrawlerAnalysis";
import { AIVisibilityMonitor } from "@/components/sections/AIVisibilityMonitor";
import { AutomatedBlogs } from "@/components/sections/AutomatedBlogs";
import { AIQAPages } from "@/components/sections/AIQAPages";
import { AIBacklinkAgents } from "@/components/sections/AIBacklinkAgents";
import { AutomatedReports } from "@/components/sections/AutomatedReports";
import { SocialArticles } from "@/components/sections/SocialArticles";
import { FreeToolsBuilder } from "@/components/sections/FreeToolsBuilder";
import { GrowthHacks } from "@/components/sections/GrowthHacks";
import { WhoIsThisFor } from "@/components/sections/WhoIsThisFor";
import { FounderStory } from "../components/sections/FounderStory";
import { FoundingMembers } from "@/components/sections/FoundingMembers";
import { ProofOfWork } from "@/components/sections/ProofOfWork";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SITE_URL } from "@/lib/site";

const MarketingAgents = dynamic(
  () =>
    import("@/components/sections/MarketingAgents").then((mod) => ({
      default: mod.MarketingAgents,
    })),
  {
    loading: () => <section className="py-24 min-h-[32rem]" aria-hidden />,
  }
);

/** Service JSON-LD for the lead-gen outreach agent */
const aiVisibilityServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#ai-visibility-service`,
  name: "Lead-gen + mass cold outreach agent — 1,000 emails/day",
  serviceType: "AI lead generation and cold outreach",
  description:
    "Anthroly sets up and runs a lead-generation outreach agent that researches your ICP, writes personalized cold emails, and sends up to 1,000 a day with follow-ups that do not stop. You approve ICP and voice; we operate the agent.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "Worldwide",
  url: `${SITE_URL}/#human-led-ai-visibility`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Outreach agent program",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "ICP research and list building" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Personalized cold email at 1,000/day" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automated follow-up sequences" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deliverability and domain warmup" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reply routing and pipeline reporting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Offer and proof-point personalization" } },
    ],
  },
};

const citationNeighborsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#citation-neighbors-service`,
  name: "Autonomous 24/7 high-quality backlink agent",
  serviceType: "AI-powered editorial link building",
  description:
    "Anthroly sets up and runs a 24/7 backlink agent that hunts, pitches, and earns high-quality editorial backlinks around the clock — not PBNs or junk. Authority links that make every cold email land heavier.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "Worldwide",
  url: `${SITE_URL}/#citation-neighbors`,
  isRelatedTo: { "@id": `${SITE_URL}/#ai-visibility-service` },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiVisibilityServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citationNeighborsServiceSchema) }}
      />
      {/* 1. Hook - Clear value prop */}
      <Hero />

      {/* 2. How It Works - Human + AI combo explained */}
      <HowItWorks />

      {/* 3. Marketing agents for AI answers - platform overview */}
      <MarketingAgents />

      {/* 3b. Human-led AI visibility service - make AI recommend your brand */}
      <HumanLedAIVisibility />

      {/* 3c. Citation neighborhood — enter sources AI already trusts */}
      <CitationNeighbors />

      {/* 4. Problem/Solution - Why you need this */}
      <ProblemSolution />
      
      {/* 4. What You Get - Deliverables */}
      <GuaranteedResults />
      
      {/* 5. How We Do It - Features Deep Dive */}
      <AICrawlerAnalysis />
      <AIVisibilityMonitor />
      <AutomatedBlogs />
      <AIQAPages />
      <AIBacklinkAgents />
      <FreeToolsBuilder />
      <SocialArticles />
      
      {/* 6. Human Touch - Reports + Dedicated Support */}
      <AutomatedReports />
      
      {/* 7. Social Proof */}
      <PoweredBy />
      <ProofOfWork />
      <WhoIsThisFor />
      
      {/* 8. Trust Building */}
      <FounderStory />
      <FoundingMembers />
      <GrowthHacks />
      
      {/* 9. Pricing - Make decision easy */}
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
