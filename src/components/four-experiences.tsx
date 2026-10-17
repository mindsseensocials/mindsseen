"use client";

import Image from "next/image";
import { PaintRule } from "@/components/paint-rule";
import { WordReveal } from "@/components/word-reveal";
import { useSectionPhase } from "@/components/story";
import "./four-experiences.css";

const cards = [
  {
    title: "Mind",
    body: "Discover how you think, focus, communicate and process the world.",
    image: "/images/MIND.webp",
    alt: "A close-up of a person with their eyes closed",
    caption: "below",
  },
  {
    title: "Body",
    body: "Understand your energy, senses and ways to work with your natural rhythms.",
    image: "/images/BODY.webp",
    alt: "A silhouette pointing toward the horizon at dusk",
    caption: "above",
  },
  {
    title: "Together",
    body: "Connect and communicate across different minds.",
    image: "/images/TOGETHER.webp",
    alt: "Two people holding hands in green light",
    caption: "below",
  },
  {
    title: "Intelligence",
    body: "Explore AI tools to support the way you think and experience the world.",
    image: "/images/INTELLIGENCE.webp",
    alt: "A person standing in cool blue light",
    caption: "above",
  },
] as const;

function CardCopy({ title, body }: { title: string; body: string }) {
  return (
    <div className="shrink-0">
      <p className="experience-title relative w-fit text-[11px] tracking-[0.16em] uppercase md:text-[13px] md:tracking-[0.18em]">
        {title}
        <span className="experience-underline" aria-hidden="true" />
      </p>
      <p className="mt-1 max-w-full text-[11px] leading-4 text-neutral-700 md:mt-1.5 md:text-[13px] md:leading-5 min-[1440px]:max-w-[14rem]">
        {body}
      </p>
    </div>
  );
}

export function FourExperiences() {
  const phase = useSectionPhase("four-experiences");

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#F6F3ED] px-5 pt-20 pb-5 text-neutral-950 md:px-12 md:pt-20 md:pb-10 lg:px-20">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
        <div className="grid shrink-0 min-[1440px]:mt-10 min-[1440px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] min-[1440px]:items-end min-[1440px]:gap-20">
          <div>
            <PaintRule phase={phase} delay={180}>
              <span className="text-[13px] tracking-[0.18em]">03</span>
              <span className="mx-5 h-px w-36 bg-neutral-950" />
            </PaintRule>

            <p className="eyebrow-reveal mt-3 text-[12px] tracking-[0.22em] md:mt-6">
              LEARN
            </p>

            <h2 className="mt-2 max-w-[22ch] text-[clamp(1.5rem,6.8vw,1.75rem)] leading-[1.1] tracking-[-0.03em] md:mt-4 md:text-[clamp(1.85rem,3.6vw,3.15rem)] md:leading-[1.08]">
              <span className="block font-heading font-extralight">
                <WordReveal text="Activate the Minds Seen" delay={0.35} />
              </span>
              <span className="mt-1 block font-serif italic font-normal">
                <WordReveal text="experience." delay={0.67} />
              </span>
            </h2>
          </div>

          <div className="animate-fade-up mt-3 max-w-[22rem] text-[13px] leading-5 text-neutral-800 [animation-delay:1.05s] md:mt-6 md:text-[15px] md:leading-7 min-[1440px]:mt-0 min-[1440px]:mb-1">
            <p>
              Our first collection brings together four self-paced experiences,
              rooted in neuroinclusion and cognitive science.
            </p>
            <p className="mt-2.5 md:mt-4">
              As you move through the four modules, you&apos;ll build your own
              Minds Seen Profile—with practical tools to support how you work,
              communicate and relate.
            </p>
          </div>
        </div>

        <ul className="mt-3 grid min-h-0 flex-1 grid-cols-2 content-start gap-x-3.5 gap-y-3 sm:mt-12 md:mt-14 md:grid-cols-2 md:gap-x-8 md:gap-y-8 lg:grid-cols-4 lg:gap-x-12 min-[1440px]:mt-8 min-[1440px]:content-center">
          {cards.map((card, index) => {
            const fromUp = index % 2 === 0;
            const captionAbove = card.caption === "above";

            return (
              <li
                key={card.title}
                className={`experience-card group flex flex-col ${fromUp ? "card-up" : "card-down"} ${captionAbove ? "min-[1440px]:flex-col-reverse" : ""}`}
                style={{ animationDelay: `${0.62 + index * 0.12}s` }}
              >
                <div className="experience-photo relative h-[4.25rem] w-full overflow-hidden md:h-[min(12.5rem,22vh)]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1440px) 22vw, (min-width: 1024px) 22vw, (min-width: 768px) 45vw, 45vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
                <div
                  className={
                    captionAbove
                      ? "min-w-0 mt-2 md:mt-3 min-[1440px]:mt-0 min-[1440px]:mb-3"
                      : "min-w-0 mt-2 md:mt-3"
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
