"use client";

import Link from "next/link";
import { useStory } from "@/components/story";
import { SECTIONS } from "@/lib/sections";

function ArrowIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-300 group-hover:translate-x-0.5 ${className}`}
    >
      <path
        d="M2.5 8h11M9.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const sizes = {
  md: {
    button: "gap-2 px-5 py-2.5 text-[13px]",
    arrow: "size-3.5",
  },
  lg: {
    button: "gap-3 px-8 py-4 text-[16px]",
    arrow: "size-4",
  },
} as const;

type CtaProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
  size?: keyof typeof sizes;
  tone?: "on-dark" | "on-light";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function Cta({
  href,
  children,
  className = "",
  arrow = true,
  size = "md",
  tone = "on-dark",
  onClick,
}: CtaProps) {
  const { goTo } = useStory();
  const hash = href.startsWith("#") ? href.slice(1) : "";
  const sectionIndex = hash
    ? SECTIONS.findIndex((section) => section.id === hash)
    : -1;
  const styles = sizes[size];
  const colors =
    tone === "on-light"
      ? "bg-neutral-950 text-white"
      : "bg-white text-neutral-950";

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (sectionIndex >= 0) {
          event.preventDefault();
          goTo(sectionIndex);
        }
      }}
      className={`group inline-flex items-center justify-center rounded-full leading-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${colors} ${styles.button} ${className}`}
    >
      <span>{children}</span>
      {arrow ? <ArrowIcon className={styles.arrow} /> : null}
    </Link>
  );
}
