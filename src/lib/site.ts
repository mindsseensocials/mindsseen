export const SITE_NAME = "Minds Seen";
export const SITE_TAGLINE = "A living neuroinclusive space";
export const SITE_DESCRIPTION =
  "Minds Seen is a living neuroinclusive space that helps you understand how you think, communicate and connect—with tools to turn self-discovery into everyday insight.";
export const SITE_KEYWORDS = [
  "Minds Seen",
  "neuroinclusion",
  "neuroinclusive",
  "cognitive diversity",
  "self-discovery",
  "learning experiences",
  "Minds Seen Profile",
];

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production.replace(/\/$/, "")}`;

  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}
