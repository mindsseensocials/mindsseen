"use client";

import Image from "next/image";
import { PaintRule } from "@/components/paint-rule";
import { WordReveal } from "@/components/word-reveal";
import { useSectionPhase } from "@/components/story";
import "./four-experiences.css";

const cards = [
  {
    title: "Signals",
    body: "Fresh perspectives, research and stories at the intersection of the mind, science and technology.",
    image: "/images/UI/SIGNALS.png",
    alt: "Close-up of fine green fibers",
    motion: "card-up",
  },
  {
    title: "Future AI tools",
    body: "Exploring intelligent tools that adapt to different ways of thinking, communicating and working.",
    image: "/images/UI/FUTUREAI.png",
    alt: "Two golden droplets on a red surface",
    motion: "card-down",
  },
] as const;

export function WhatsNext() {
  const phase = useSectionPhase("whats-next");

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#F6F3ED] px-5 pt-24 pb-8 text-neutral-950 md:px-12 md:pt-20 md:pb-10 lg:px-20">
      <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 content-start grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] lg:items-stretch lg:gap-20">
        <div className="flex min-h-0 flex-col">
          <PaintRule phase={phase} delay={180}>
            <span className="text-[13px] tracking-[0.18em]">04</span>
            <span className="mx-5 h-px w-36 bg-neutral-950" />
          </PaintRule>

          <p className="eyebrow-reveal mt-5 text-[12px] tracking-[0.22em] md:mt-6">
            WHAT&apos;S NEXT
          </p>

          <h2 className="mt-3 max-w-[16ch] text-[clamp(2.1rem,4.4vw,3.7rem)] leading-[1.05] tracking-[-0.03em] md:mt-4">
            <span className="block font-heading font-extralight">
              <WordReveal text="A growing space" delay={0.35} />
            </span>
            <span className="mt-1 block font-heading font-extralight">
              <WordReveal text="for curious" delay={0.59} />
            </span>
            <span className="mt-1 block font-heading font-extralight">
              <WordReveal text="minds." delay={0.75} />
            </span>
          </h2>

          <p className="animate-fade-up mt-5 max-w-[24rem] text-[14px] leading-6 text-neutral-800 [animation-delay:1.05s] md:mt-6 md:text-[15px] md:leading-7">
            Minds Seen is just getting started. Beyond our learning experiences,
            we&apos;re exploring new research, perspectives and AI-powered tools
            designed to help different minds understand, communicate and work
            better together.
          </p>
        </div>

        <ul className="grid min-h-0 grid-cols-2 gap-4 sm:gap-6 lg:flex lg:h-full lg:flex-col lg:justify-between lg:gap-10">
          {cards.map((card, index) => (
            <li
              key={card.title}
              className={`experience-card group ${card.motion}`}
              style={{ animationDelay: `${0.62 + index * 0.14}s` }}
            >
              <div className="experience-photo relative h-[min(7.75rem,18vh)] w-full overflow-hidden md:h-[min(11.5rem,21vh)] lg:h-[min(13.5rem,25vh)]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 45vw"
                  className="object-cover"
                />
              </div>
              <h3 className="experience-title relative mt-3 w-fit text-[clamp(1.15rem,4.6vw,1.45rem)] leading-none tracking-[-0.02em] font-heading font-extralight lg:mt-4 lg:text-[clamp(1.45rem,2vw,1.85rem)]">
                {card.title}
                <span className="experience-underline" aria-hidden="true" />
              </h3>
              <p className="mt-1.5 max-w-[22rem] text-[14px] leading-6 text-neutral-700 md:text-[15px] md:leading-7 lg:mt-2">
                {card.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
