import { Hero } from "@/components/home/Hero";
import { LabsWall } from "@/components/home/LabsWall";
import { TwoSides } from "@/components/home/TwoSides";
import { WhatWeBuy } from "@/components/home/WhatWeBuy";
import { PullQuote } from "@/components/home/PullQuote";
import { ForLabs } from "@/components/home/ForLabs";
import { Process } from "@/components/home/Process";
import { Industries } from "@/components/home/Industries";
import { Safeguards } from "@/components/home/Safeguards";
import { FAQ } from "@/components/home/FAQ";
import { LearnTeaser } from "@/components/home/LearnTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LabsWall />
      <TwoSides />
      <WhatWeBuy />
      <PullQuote />
      <ForLabs />
      <Process />
      <Industries />
      <Safeguards />
      <FAQ />
      <LearnTeaser />
      <FinalCTA />
    </>
  );
}
