import { Hero } from "@/components/sections/Hero";
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

export default function Home() {
  return (
    <>
      {/* 1. Hook - Agents that own outcomes */}
      <Hero />
      
      {/* 2. How It Works - Agent + human-in-the-loop explained */}
      <HowItWorks />
      
      {/* 3. Problem/Solution - Why automations and copilots fail */}
      <ProblemSolution />
      
      {/* 4. What You Get - Agent deliverables */}
      <GuaranteedResults />
      
      {/* 5. Each agent, in depth */}
      <AICrawlerAnalysis />
      <AIVisibilityMonitor />
      <AutomatedBlogs />
      <AIQAPages />
      <AIBacklinkAgents />
      <PSEOImplementation />
      <FreeToolsBuilder />
      <SocialArticles />
      
      {/* 6. Analyze + report, with a human accountable */}
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
