"use client";

import { PaintRule } from "@/components/paint-rule";
import { WhimTexture } from "@/components/whim-texture";
import { WordReveal } from "@/components/word-reveal";
import { useSectionPhase } from "@/components/story";

export function WhyItMatters() {
  const phase = useSectionPhase("why-it-matters");

  return (
    <div className="flex h-full items-center overflow-hidden bg-[#F6F3ED] px-5 pt-24 pb-10 text-neutral-950 md:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <div className="flex justify-center lg:justify-start">
          <WhimTexture phase={phase} />
        </div>

        <div className="max-w-xl">
          <PaintRule phase={phase} delay={180}>
            <span className="text-[13px] tracking-[0.18em]">01</span>
            <span className="mx-5 h-px w-28 bg-neutral-950" />
            <span className="h-4 w-px bg-neutral-950" />
          </PaintRule>

          <p className="eyebrow-reveal mt-10 text-[12px] tracking-[0.22em] text-neutral-950">
            WHAT IS NEUROINCLUSION?
          </p>

          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.03em]">
            <span className="block font-heading font-extralight">
              <WordReveal text="Our minds experience" delay={0.35} />
            </span>
            <span className="mt-1 block font-serif italic font-normal">
              <WordReveal text="the world in different ways." delay={0.59} />
            </span>
          </h2>

          <p className="animate-fade-up mt-8 max-w-[22rem] text-[15px] leading-7 text-neutral-800 [animation-delay:1.05s] md:text-base">
            Neuroinclusion starts with understanding those differences – and
            making room for every mind to thrive.
          </p>
          <p className="animate-fade-up mt-4 max-w-[22rem] text-[15px] leading-7 text-neutral-800 [animation-delay:1.18s] md:text-base">
            Minds Seen brings that understanding into everyday life, beginning
            with the way we experience ourselves and others.
          </p>
        </div>
      </div>
    </div>
  );
}
