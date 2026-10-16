export const SECTIONS = [
  { id: "hero", theme: "dark" },
  { id: "why-it-matters", theme: "light" },
  { id: "the-platform", theme: "dark" },
  { id: "four-experiences", theme: "light" },
  { id: "whats-next", theme: "light" },
  { id: "join-us", theme: "dark" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
export type SectionTheme = (typeof SECTIONS)[number]["theme"];
export type SectionPhase = "hidden" | "enter" | "exit";

export const ENTER_LOCK_MS = 1600;
