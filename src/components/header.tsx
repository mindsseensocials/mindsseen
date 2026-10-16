"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cta } from "@/components/cta";
import { useStory } from "@/components/story";

const navItems = [
  { id: "why-it-matters", label: "Why it matters", index: 1 },
  { id: "the-platform", label: "The Platform", index: 2 },
  { id: "four-experiences", label: "Four Experiences", index: 3 },
  { id: "whats-next", label: "What's Next", index: 4 },
  { id: "join-us", label: "Join us", index: 5 },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span
      className="flex h-[13px] w-5 flex-col justify-between"
      aria-hidden="true"
    >
      <span
        className={`h-px w-full origin-center bg-current transition duration-300 ${
          open ? "translate-y-[6px] rotate-45" : ""
        }`}
      />
      <span
        className={`h-px w-full bg-current transition duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`h-px w-full origin-center bg-current transition duration-300 ${
          open ? "-translate-y-[6px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export function Header() {
  const { theme, index, goTo } = useStory();
  const [open, setOpen] = useState(false);
  const onLight = theme === "light" || open;

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const stop = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener("keydown", onKey, true);
    window.addEventListener("wheel", stop, { capture: true, passive: false });
    window.addEventListener("touchmove", stop, { capture: true, passive: false });

    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("wheel", stop, true);
      window.removeEventListener("touchmove", stop, true);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (next: number) => {
    setOpen(false);
    goTo(next);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto grid grid-cols-[1fr_auto] items-center px-5 py-6 md:grid-cols-[1fr_auto_1fr] md:px-10 lg:px-14">
        <Link
          href="#hero"
          aria-label="Minds Seen home"
          className="justify-self-start"
          onClick={(event) => {
            event.preventDefault();
            go(0);
          }}
        >
          <Image
            src="/images/logo-white.svg"
            alt="Minds Seen"
            width={199}
            height={48}
            className={`h-8 w-auto md:h-10 ${onLight ? "brightness-0" : ""}`}
            priority
          />
        </Link>

        <nav
          className={`hidden items-center gap-7 text-[13px] md:flex lg:gap-8 ${
            onLight ? "text-neutral-900" : "text-white/90"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={`transition-opacity hover:opacity-70 ${
                index === item.index ? "opacity-100" : "opacity-70"
              }`}
              onClick={(event) => {
                event.preventDefault();
                go(item.index);
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <Cta href="/waitlist" tone={onLight ? "on-light" : "on-dark"}>
            <span className="md:hidden">Join Now</span>
            <span className="hidden md:inline">Join the Waitlist</span>
          </Cta>
          <button
            type="button"
            className={`relative z-50 flex size-11 items-center justify-center md:hidden ${
              onLight ? "text-neutral-950" : "text-white"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`pointer-events-auto fixed inset-0 z-40 flex flex-col bg-[#F6F3ED] px-5 pt-28 pb-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <Link
          href="#hero"
          aria-label="Minds Seen home"
          tabIndex={open ? 0 : -1}
          className="absolute top-6 left-5"
          onClick={(event) => {
            event.preventDefault();
            go(0);
          }}
        >
          <Image
            src="/images/logo-white.svg"
            alt="Minds Seen"
            width={199}
            height={48}
            className="h-8 w-auto brightness-0"
          />
        </Link>

        <nav className="flex flex-1 flex-col justify-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              tabIndex={open ? 0 : -1}
              className={`font-heading text-[clamp(1.85rem,8vw,2.6rem)] leading-none tracking-[-0.03em] font-extralight text-neutral-950 ${
                index === item.index ? "opacity-100" : "opacity-45"
              }`}
              onClick={(event) => {
                event.preventDefault();
                go(item.index);
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Cta
          href="/waitlist"
          size="lg"
          tone="on-light"
          className="w-full"
        >
          Join the Waitlist
        </Cta>
      </div>
    </header>
  );
}
