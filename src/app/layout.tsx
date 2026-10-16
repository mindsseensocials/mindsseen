import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "Minds Seen",
  description:
    "A digital learning platform that helps you understand how you think, communicate and connect.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${supplySans.variable} h-full bg-[#F6F3ED] antialiased`}
    >
      <body className="h-full overflow-hidden bg-[#F6F3ED] font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
