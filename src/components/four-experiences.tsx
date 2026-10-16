"use client";

import Image from "next/image";
import { PaintRule } from "@/components/paint-rule";
import { WordReveal } from "@/components/word-reveal";
import { useSectionPhase } from "@/components/story";
import "./four-experiences.css";

const cards = [
  {
    title: "Mind",
    body: "Discover how you think, focus and process the world.",
    image: "/images/MIND.png",
    alt: "A close-up of a person with their eyes closed",
    caption: "below",
  },
  {
    title: "Body",
    body: "Understand your energy, senses and natural rhythms.",
    image: "/images/BODY.png",
    alt: "A silhouette pointing toward the horizon at dusk",
    caption: "above",
  },
  {
    title: "Together",
    body: "Connect and communicate across different minds.",
    image: "/images/TOGETHER.png",
    alt: "Two people holding hands in green light",
    caption: "below",
  },
  {
    title: "Intelligence",
    body: "Explore AI tools that work with the way you think.",
    image: "/images/INTELLIGENCE.png",
    alt: "A person standing in cool blue light",
    caption: "above",
  },
] as const;

function CardCopy({ title, body }: { title: string; body: string }) {
  return (
    <div className="shrink-0">
      <p className="experience-title relative w-fit text-[12px] tracking-[0.18em] uppercase md:text-[13px]">
        {title}
        <span className="experience-underline" aria-hidden="true" />
      </p>
      <p className="mt-1.5 max-w-full text-[12px] leading-5 text-neutral-700 md:text-[13px] md:leading-5 min-[1440px]:max-w-[14rem]">
        {body}
      </p>
    </div>
  );
}

export function FourExperiences() {
  const phase = useSectionPhase("four-experiences");

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#F6F3ED] px-5 pt-24 pb-8 text-neutral-950 md:px-12 md:pt-20 md:pb-10 lg:px-20">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
        <div className="grid shrink-0 min-[1440px]:mt-10 min-[1440px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] min-[1440px]:items-end min-[1440px]:gap-20">
          <div>
            <PaintRule phase={phase} delay={180}>
              <span className="text-[13px] tracking-[0.18em]">03</span>
              <span className="mx-5 h-px w-36 bg-neutral-950" />
            </PaintRule>

            <p className="eyebrow-reveal mt-5 text-[12px] tracking-[0.22em] md:mt-6">
              THE FOUR EXPERIENCES
            </p>

            <h2 className="mt-3 max-w-[16ch] text-[clamp(1.85rem,3.6vw,3.15rem)] leading-[1.08] tracking-[-0.03em] md:mt-4">
              <span className="block font-heading font-extralight">
                <WordReveal text="Four ways to" delay={0.35} />
              </span>
              <span className="mt-1 block font-serif italic font-normal">
                <WordReveal text="understand yourself." delay={0.59} />
              </span>
            </h2>
          </div>

          <p className="animate-fade-up mt-5 max-w-[22rem] text-[14px] leading-6 text-neutral-800 [animation-delay:1.05s] md:mt-6 md:text-[15px] md:leading-7 min-[1440px]:mt-0 min-[1440px]:mb-1">
            Each experience offers something to discover, something to question,
            and something to carry into your everyday life. Together, they form
            your Minds Seen Profile.
          </p>
        </div>

        <ul className="mt-6 flex min-h-0 flex-1 flex-col content-start gap-3.5 sm:mt-12 md:mt-14 md:grid md:grid-cols-2 md:items-start md:gap-x-8 md:gap-y-8 lg:grid-cols-4 lg:gap-x-12 min-[1440px]:mt-8 min-[1440px]:content-center">
          {cards.map((card, index) => {
            const fromUp = index % 2 === 0;
            const captionAbove = card.caption === "above";

            return (
              <li
                key={card.title}
                className={`experience-card group flex flex-row items-center gap-4 md:flex-col md:gap-0 ${fromUp ? "card-up" : "card-down"} ${captionAbove ? "min-[1440px]:flex-col-reverse" : ""}`}
                style={{ animationDelay: `${0.62 + index * 0.12}s` }}
              >
                <div className="experience-photo relative aspect-square w-[30%] shrink-0 overflow-hidden md:aspect-auto md:h-[min(12.5rem,22vh)] md:w-full">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1440px) 22vw, (min-width: 1024px) 22vw, (min-width: 768px) 45vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className={
                    captionAbove
                      ? "min-w-0 flex-1 md:mt-3 min-[1440px]:mt-0 min-[1440px]:mb-3"
                      : "min-w-0 flex-1 md:mt-3"
                  }
                >
                  <CardCopy title={card.title} body={card.body} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
