import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";




const nunitoSans = localFont({
  src: [
    {
      path: "./assets/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
      style: "normal",
    },
    {
      path: "./assets/fonts/Nunito_Sans/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-nunito-sans",
  display: "swap",
  preload:false
});

const nunito = localFont({
  src: [
    { path: "./assets/fonts/Nunito/Nunito-VariableFont_wght.ttf", style: "normal" },
    {
      path: "./assets/fonts/Nunito/Nunito-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-nunito",
  display: "swap",
  preload:false
});

const recoleta = localFont({
  src: "./assets/fonts/Recoleta/Recoleta-SemiBold.woff2",
  display: "swap",
  weight: "600",
  variable: "--font-recoleta-semibold",
  preload:true
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Healthy Recipes Finder",
    template: "%s | Healthy Recipes Finder",
  },
  description:
    "Find healthy recipes with nutrition facts, ingredients, and cooking steps for a balanced lifestyle.",
  openGraph: {
    siteName: "Healthy Recipes Finder",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Healthy Recipes Finder — Nutritious Meals for Everyone",
      },
    ],
    type: "website",
    title: "Healthy Recipes Finder",
    description:
      "Explore thousands of nutritious and delicious meals for every diet.",
    locale: "en_US",
  },
  robots: "index, follow",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${nunito.variable} ${nunitoSans.variable} ${recoleta.variable}`}
      >
        <div className="wrapper">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
