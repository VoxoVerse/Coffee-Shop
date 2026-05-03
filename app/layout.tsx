import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter, Syne } from "next/font/google";
import type { ReactNode } from "react";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-ibm-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mylifecoffee.sa"),
  title: {
    default: "My Life Coffee | ماي لايف كوفي — Riyadh",
    template: "%s | My Life Coffee",
  },
  description:
    "Specialty coffee in An Nakhil, Riyadh. قهوة مختصة في الرياض.",
  openGraph: {
    type: "website",
    locale: "en_SA",
    alternateLocale: ["ar_SA"],
    siteName: "My Life Coffee",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} ${ibmArabic.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
