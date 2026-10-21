import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: `${SITE_TAGLINE}. ${SITE_DESCRIPTION}`,
    start_url: "/",
    display: "standalone",
    background_color: "#F6F3ED",
    theme_color: "#F6F3ED",
    lang: "en",
    categories: ["education", "lifestyle"],
    icons: [
      {
        src: "/apple-icon-light.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
