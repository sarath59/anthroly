import { Hero } from "@/components/sections/Hero";
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
import { ScrollElephant } from "@/components/ui/ScrollElephant";

export default function Home() {
  return (
    <>
      <ScrollElephant />
      <Hero />
      <GuaranteedResults />
      <PoweredBy />
      <ProblemSolution />
      <AICrawlerAnalysis />
      <AIVisibilityMonitor />
      <AutomatedBlogs />
      <AIQAPages />
      <AIBacklinkAgents />
      <PSEOImplementation />
      <AutomatedReports />
      <SocialArticles />
      <FreeToolsBuilder />
      <GrowthHacks />
      <WhoIsThisFor />
      <FounderStory />
      <FoundingMembers />
      <ProofOfWork />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
