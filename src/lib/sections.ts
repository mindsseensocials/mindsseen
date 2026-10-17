export const SECTIONS = [
  { id: "hero", theme: "dark", label: "Every mind is different" },
  {
    id: "why-it-matters",
    theme: "light",
    label: "What is neuroinclusion?",
  },
  {
    id: "the-platform",
    theme: "dark",
    label: "A living neuroinclusive space",
  },
  { id: "four-experiences", theme: "light", label: "Learn" },
  { id: "whats-next", theme: "light", label: "What's next" },
  { id: "join-us", theme: "dark", label: "Join us" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
export type SectionTheme = (typeof SECTIONS)[number]["theme"];
export type SectionPhase = "hidden" | "enter" | "exit";

export const ENTER_LOCK_MS = 1600;
