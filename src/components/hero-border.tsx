"use client";

import { useEffect, useRef } from "react";
import type { SectionPhase } from "@/lib/sections";

export function HeroBorder({ phase }: { phase: SectionPhase }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (phase === "exit") return;

    frame.getAnimations().forEach((animation) => animation.cancel());

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame.style.width = phase === "hidden" ? "0%" : "100%";
      return;
    }

    if (phase === "enter") {
      frame.style.width = "0%";
      frame.animate([{ width: "0%" }, { width: "100%" }], {
        duration: 1800,
        delay: 1300,
        fill: "forwards",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      });
      return;
    }

    frame.style.width = "0%";
  }, [phase]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
      <div
        ref={frameRef}
        data-paint-frame
        className="relative overflow-hidden"
        style={{ width: "0%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/border-bottom-hero-mobile.svg"
          alt=""
          className="relative left-1/2 block h-auto w-screen max-w-none -translate-x-1/2 md:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/border-bottom-hero.svg"
          alt=""
          className="relative left-1/2 hidden h-auto w-screen max-w-none -translate-x-1/2 md:block"
        />
      </div>
    </div>
  );
}
