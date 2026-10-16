"use client";

import { useEffect, useRef } from "react";
import { PaintRule } from "@/components/paint-rule";
import { WordReveal } from "@/components/word-reveal";
import { useSectionPhase } from "@/components/story";
import "./the-platform.css";

const circles = [
  {
    title: "Explore",
    body: "Four learning experiences.",
  },
  {
    title: "Discover",
    body: "Insights about yourself.",
  },
  {
    title: "Build.",
    body: "Your personal Minds Seen Profile.",
  },
] as const;

export function ThePlatform() {
  const phase = useSectionPhase("the-platform");
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const noblurRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const parallaxTarget = useRef({ x: 0, y: 0 });
  const parallax = useRef({ x: 0, y: 0 });
  const revealTarget = useRef({ x: 0, y: 0, size: 0 });
  const reveal = useRef({ x: 0, y: 0, size: 0 });

  useEffect(() => {
    if (phase === "hidden") return;

    const stage = stageRef.current;
    const bg = bgRef.current;
    const noblur = noblurRef.current;
    const clip = clipRef.current;
    if (!stage || !bg || !noblur || !clip) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const tick = () => {
      if (!reduce) {
        parallax.current.x += (parallaxTarget.current.x - parallax.current.x) * 0.08;
        parallax.current.y += (parallaxTarget.current.y - parallax.current.y) * 0.08;
        const shift = `translate(${parallax.current.x}px, ${parallax.current.y}px)`;
        bg.style.transform = shift;
        noblur.style.transform = shift;
      }

      reveal.current.x += (revealTarget.current.x - reveal.current.x) * 0.22;
      reveal.current.y += (revealTarget.current.y - reveal.current.y) * 0.22;
      reveal.current.size += (revealTarget.current.size - reveal.current.size) * 0.18;
      clip.style.setProperty("--reveal-x", `${reveal.current.x}px`);
      clip.style.setProperty("--reveal-y", `${reveal.current.y}px`);
      clip.style.setProperty("--reveal-size", `${reveal.current.size}px`);
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      parallaxTarget.current = { x: -x * 36, y: -y * 28 };

      const rect = clip.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const inside =
        localX >= 0 &&
        localY >= 0 &&
        localX <= rect.width &&
        localY <= rect.height;

      revealTarget.current = {
        x: localX,
        y: localY,
        size: inside ? Math.min(rect.width, rect.height) * 0.22 : 0,
      };
    };

    const onLeave = () => {
      revealTarget.current.size = 0;
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [phase]);

  return (
    <div className="h-full bg-[#F6F3ED] p-3 md:p-5">
      <div
        ref={stageRef}
        className="relative h-full overflow-hidden rounded-[1.6rem] md:rounded-[2rem]"
      >
        <div className="platform-stage absolute inset-0">
          <div
            ref={bgRef}
            className="platform-bg absolute inset-[-18%] bg-cover bg-center"
            style={{ backgroundImage: "url(/images/guide.png)" }}
          />
          <div ref={clipRef} className="platform-noblur-clip absolute inset-0">
            <div
              ref={noblurRef}
              className="platform-noblur absolute inset-[-18%] bg-cover bg-center"
              style={{ backgroundImage: "url(/images/guide-noblur.png)" }}
            />
          </div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pt-20 pb-6 text-center text-white sm:justify-start sm:pt-24 sm:pb-8 md:px-12 md:pt-16">
          <PaintRule phase={phase} delay={180}>
            <div className="flex w-[min(68rem,82vw)] items-center">
              <span className="h-px flex-1 bg-white/90" />
              <span className="px-5 text-[13px] tracking-[0.18em]">02</span>
              <span className="h-px flex-1 bg-white/90" />
            </div>
          </PaintRule>

          <p className="eyebrow-reveal mt-8 text-[12px] tracking-[0.22em] md:mt-6">
            THE PLATFORM
          </p>

          <h2 className="mt-5 max-w-[18ch] text-[clamp(2.1rem,4.6vw,3.85rem)] leading-[1.08] tracking-[-0.03em] md:mt-4 md:max-w-none">
            <span className="block font-heading font-extralight">
              <WordReveal
                text="A guided learning experience to"
                delay={0.4}
                stagger={0.06}
              />
            </span>
            <span className="mt-1 block font-serif italic font-normal">
              <WordReveal text="understand your mind." delay={0.76} stagger={0.06} />
            </span>
          </h2>

          <p className="animate-fade-up mt-6 max-w-[28rem] text-[15px] leading-7 text-white/90 [animation-delay:1.05s] md:mt-5 md:text-base">
            Explore four self-paced learning experiences, build your personal
            Minds Seen Profile, and gain practical tools to navigate your
            thinking, energy, relationships and use of AI.
          </p>

          <ul className="mt-6 mb-0 flex flex-col items-center sm:mt-auto sm:mb-5 sm:flex-row sm:justify-center sm:pt-12 md:pt-16">
            {circles.map((circle, index) => (
              <li
                key={circle.title}
                className="circle-reveal z-0 -my-3 flex size-[8rem] flex-col items-center justify-center rounded-full border border-white/90 px-4 transition-colors duration-300 hover:z-10 hover:bg-white hover:text-neutral-950 sm:-mx-5 sm:my-0 sm:size-[13.5rem] sm:px-7 md:-mx-7 md:size-[15rem] md:px-8"
                style={{ animationDelay: `${0.82 + index * 0.2}s` }}
              >
                <p className="text-[11px] tracking-[0.18em] uppercase sm:text-[12px] sm:tracking-[0.2em]">
                  {circle.title}
                </p>
                <p className="mt-1.5 max-w-[7rem] text-[12px] leading-4 text-current/85 sm:mt-2 sm:max-w-[8.5rem] sm:text-[13px] sm:leading-5">
                  {circle.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
