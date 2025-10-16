import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Features />
      <Pricing />
    </>
  );
}

