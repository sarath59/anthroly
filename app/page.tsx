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
import { PSEOImplementation } from "@/components/sections/PSEOImplementation";
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

/** Service JSON-LD for the human-led AI visibility program */
const aiVisibilityServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#ai-visibility-service`,
  name: "Founder AI Authority & Pipeline System — AI Search Visibility",
  serviceType: "Generative Engine Optimization and AI search visibility",
  description:
    "Discover layer of Anthroly's Founder AI Authority & Pipeline System: we identify the questions prospects ask ChatGPT, Gemini, Perplexity, and Google AI, then close gaps with answer-focused content, comparison pages, citation work, and monthly AI visibility tracking. Humans do the work; machines help us scale.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "Worldwide",
  url: `${SITE_URL}/#human-led-ai-visibility`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI visibility program",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI search visibility monitoring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand recommendation optimization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Competitive intelligence for AI search" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content, authority, and citation building" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital PR and third-party visibility" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Citation neighborhood mapping and placement" } },
    ],
  },
};

const citationNeighborsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#citation-neighbors-service`,
  name: "Citation Neighborhood Service",
  serviceType: "AI citation neighborhood mapping and digital PR",
  description:
    "Human researchers map the sources ChatGPT, Perplexity, Claude, and Gemini repeatedly cite beside competitors in your category, then Anthroly’s team earns brand mentions on those AI-trusted sources — not random backlinks.",
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
      <PSEOImplementation />
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
