import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Feeding SK — Recipes, SF Eats & Lifestyle",
    template: "%s | Feeding SK",
  },
  description:
    "Home-cooked recipes, SF restaurant reviews, and lifestyle content by SK.",
  metadataBase: new URL("https://feedingsk.com"),
  openGraph: {
    siteName: "Feeding SK",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
