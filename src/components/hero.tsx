"use client";

import Image from "next/image";
import { Cta } from "@/components/cta";
import { HeroBorder } from "@/components/hero-border";
import { WordReveal } from "@/components/word-reveal";
import { useSectionPhase } from "@/components/story";

const headingStart = 0.55;
const headingStagger = 0.08;

export function Hero() {
  const phase = useSectionPhase("hero");

  return (
    <div className="relative h-full overflow-hidden bg-[#F6F3ED]">
      <div className="hero-mask absolute inset-0">
        <Image
          src="/images/hero-mobile.jpg"
          alt="A person with eyes closed, hair moving in the wind against a clear blue sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[48%_center] md:hidden"
        />
        <Image
          src="/images/hero.jpg"
          alt="A person with eyes closed, hair moving in the wind against a clear blue sky"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-start px-5 pt-28 pb-24 md:justify-center md:px-10 md:pt-28 md:pb-32 lg:px-14">
        <h1 className="text-[clamp(2.85rem,13vw,3.5rem)] leading-[1.06] tracking-[-0.03em] text-white md:text-[clamp(2.25rem,4.4vw,3.75rem)] md:leading-[1.12] md:tracking-[-0.02em]">
          <span className="block font-heading font-extralight md:whitespace-nowrap">
            <WordReveal
              text="Every mind"
              delay={headingStart}
              stagger={headingStagger}
            />
            <span className="hidden md:inline">&nbsp;</span>
            <span className="block md:inline">
              <WordReveal
                text="is different."
                delay={headingStart + 2 * headingStagger}
                stagger={headingStagger}
              />
            </span>
          </span>
          <span className="mt-1.5 block font-serif italic font-normal md:mt-1">
            <WordReveal
              text="Discover"
              delay={headingStart + 4 * headingStagger}
              stagger={headingStagger}
            />
            <span className="hidden md:inline">&nbsp;</span>
            <span className="block md:inline">
              <WordReveal
                text="yours."
                delay={headingStart + 5 * headingStagger}
                stagger={headingStagger}
              />
            </span>
          </span>
        </h1>

        <p className="animate-fade-up mt-8 max-w-[14rem] text-[14px] leading-6 text-white/90 [animation-delay:1.15s] md:mt-7 md:max-w-[24.5rem] md:text-[15px] md:leading-7 md:text-base">
          Minds Seen is a living neuroinclusive space that helps you understand
          how you think, communicate and connect—with tools to turn
          self-discovery into everyday insight.
        </p>

        <Cta
          href="#join-us"
          size="md"
          className="animate-fade-up mt-8 w-fit [animation-delay:1.3s] md:mt-8 md:gap-3 md:px-8 md:py-4 md:text-[16px]"
        >
          Join the Waitlist
        </Cta>
      </div>

      <HeroBorder phase={phase} />
    </div>
  );
}
