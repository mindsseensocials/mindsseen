"use client";

import Image from "next/image";
import Link from "next/link";
import { PaintRule } from "@/components/paint-rule";
import { WordReveal } from "@/components/word-reveal";
import { useSectionPhase, useStory } from "@/components/story";

export function JoinUs() {
  const phase = useSectionPhase("join-us");
  const { goTo } = useStory();

  return (
    <div className="flex h-full flex-col overflow-hidden bg-black px-5 pt-28 pb-8 text-white md:px-12 md:pt-24 md:pb-10 lg:px-20">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] lg:items-start lg:gap-20 lg:pt-6">
          <div>
            <h2 className="text-[clamp(2.25rem,4.6vw,3.85rem)] leading-[1.08] tracking-[-0.03em]">
              <span className="block font-heading font-extralight">
                <WordReveal text="Different minds." delay={0.35} />
              </span>
              <span className="mt-1 block font-serif italic font-normal">
                <WordReveal text="More room to be." delay={0.59} />
              </span>
            </h2>

            <p className="animate-fade-up mt-8 max-w-[22rem] text-[14px] leading-6 text-white/80 [animation-delay:1.05s] md:text-[15px] md:leading-7">
              However you arrive, there is room for your way of experiencing the
              world.
            </p>
          </div>

          <div className="lg:pt-3">
            <p className="font-heading text-[clamp(1.5rem,2.2vw,1.9rem)] font-extralight leading-none">
              <WordReveal text="Join us." delay={0.5} />
            </p>

            <form
              className="animate-fade-up mt-6 flex w-full max-w-lg items-center rounded-full border border-white [animation-delay:1.15s]"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <label className="sr-only" htmlFor="join-email">
                Email address
              </label>
              <input
                id="join-email"
                type="email"
                name="email"
                required
                placeholder="Your email address"
                autoComplete="email"
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-[14px] text-white outline-none placeholder:text-white/50 md:px-6 md:py-3.5"
              />
              <button
                type="submit"
                className="group m-1 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] leading-none text-neutral-950 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] md:px-6 md:py-3"
              >
                Join the Waitlist
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M2.5 8h11M9.5 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-auto shrink-0 pt-12">
          <div className="mb-8">
            <PaintRule phase={phase} delay={700}>
              <span className="block h-px w-[min(72rem,88vw)] bg-white" />
            </PaintRule>
          </div>

          <div className="animate-fade-up flex flex-col gap-6 [animation-delay:1.3s] sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              aria-label="Minds Seen home"
              onClick={() => goTo(0)}
              className="w-fit transition-opacity hover:opacity-70"
            >
              <Image
                src="/images/logo-white.svg"
                alt="Minds Seen"
                width={199}
                height={48}
                className="h-6 w-auto md:h-7"
              />
            </button>

            <div className="flex flex-wrap gap-x-10 gap-y-3 text-[13px] text-white/90">
              <Link href="/terms" className="transition-opacity hover:opacity-70">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="transition-opacity hover:opacity-70">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
