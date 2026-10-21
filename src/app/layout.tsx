import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  getSiteUrl,
} from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "200",
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  weight: "400",
  variable: "--font-playfair",
});

const supplySans = localFont({
  src: "../fonts/PPSupplySans-Ultralight.otf",
  variable: "--font-supply-sans",
  display: "swap",
  weight: "200",
});

const siteUrl = getSiteUrl();
const title = {
  default: `${SITE_NAME} | ${SITE_TAGLINE}`,
  template: `%s | ${SITE_NAME}`,
};

export const viewport: Viewport = {
  themeColor: "#F6F3ED",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: title.default,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: title.default,
    description: SITE_DESCRIPTION,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/apple-icon-light.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/apple-icon-dark.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: SITE_NAME,
      url: siteUrl,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_NAME,
      url: siteUrl,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: title.default,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: {
        "@type": "Thing",
        name: "Neuroinclusion",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/opengraph-image.jpg`,
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${supplySans.variable} h-full bg-[#F6F3ED] antialiased`}
    >
      <body className="h-full overflow-hidden bg-[#F6F3ED] font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
