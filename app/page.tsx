import { Hero } from "@/components/sections/Hero";
import { MarketingAgents } from "@/components/sections/MarketingAgents";
import { HumanLedAIVisibility } from "@/components/sections/HumanLedAIVisibility";
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

/** Service JSON-LD for the human-led AI visibility program */
const aiVisibilityServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#ai-visibility-service`,
  name: "Human-Led AI Visibility Service",
  serviceType: "Answer Engine Optimization (AEO) and AI search visibility",
  description:
    "A continuous, human-led AI visibility service. A dedicated team of 30–40+ researchers, strategists, writers, and analysts works every day to get your brand recommended by ChatGPT, Gemini, Claude, Perplexity, and other AI platforms.",
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
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiVisibilityServiceSchema) }}
      />
      {/* 1. Hook - Clear value prop */}
      <Hero />

      {/* 2. How It Works - Human + AI combo explained */}
      <HowItWorks />

      {/* 3. Marketing agents for AI answers - platform overview */}
      <MarketingAgents />

      {/* 3b. Human-led AI visibility service - make AI recommend your brand */}
      <HumanLedAIVisibility />

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
