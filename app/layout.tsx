import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Inter, Inter_Tight, Plus_Jakarta_Sans } from "next/font/google";
import { asset } from "@/lib/basePath";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// The portfolio / catalog covers set their own type, independent of the editor
// chrome: a black grotesque for the title, Inter for the copy, and a tight
// geometric bold for the lowercase wordmark.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coralsoft — Upwork Preview Studio",
  description:
    "Generate 1000×750 Upwork Project Catalog preview images: pick a layout, edit the copy, drop a portrait + screenshots, retint, and export.",
  icons: { icon: asset("/assets/logo-white.svg") },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable} ${inter.variable} ${interTight.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
