"use client";

import { useEffect, useRef } from "react";
import type { SectionPhase } from "@/lib/sections";

export function PaintRule({
  phase,
  delay = 200,
  className = "",
  children,
}: {
  phase: SectionPhase;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;
    if (phase === "exit") return;

    frame.getAnimations().forEach((animation) => animation.cancel());
    const width = `${inner.scrollWidth}px`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame.style.width = phase === "hidden" ? "0px" : width;
      return;
    }

    if (phase === "enter") {
      frame.style.width = "0px";
      frame.animate([{ width: "0px" }, { width }], {
        duration: 1200,
        delay,
        fill: "forwards",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      });
      return;
    }

    frame.style.width = "0px";
  }, [delay, phase]);

  return (
    <div className={`w-max ${className}`}>
      <div
        ref={frameRef}
        data-paint-frame
        className="mx-auto overflow-hidden"
        style={{ width: 0 }}
      >
        <div
          ref={innerRef}
          className="relative left-1/2 flex w-max -translate-x-1/2 items-center"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
