"use client";

import { useEffect, useRef } from "react";
import type { SectionPhase } from "@/lib/sections";

export function WhimTexture({ phase }: { phase: SectionPhase }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (phase === "hidden") return;

    const layer = layerRef.current;
    if (!layer) return;

    let frame = 0;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      layer.style.transform = `translate(${current.current.x}px, ${current.current.y}px) scale(1.35)`;
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      target.current = { x: -x * 36, y: -y * 28 };
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [phase]);

  return (
    <div
      className="whim-mask relative aspect-[495/506] w-[min(100%,18rem)] sm:w-[min(100%,24rem)] lg:w-[min(100%,34rem)]"
      style={{
        WebkitMaskImage: "url(/images/WHIM-vector.svg)",
        maskImage: "url(/images/WHIM-vector.svg)",
      }}
    >
      <div
        ref={layerRef}
        className="absolute inset-[-20%] bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/why-texture.webp)",
          transform: "scale(1.35)",
        }}
      />
    </div>
  );
}
