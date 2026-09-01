import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Rekonstrukce bytu Cheb | HANSBAU - Karlovarský Kraj",
    template: "%s | HANSBAU - Karlovarský Kraj",
  },
  description: "Kompletní i částečné rekonstrukce bytů, koupelen a bytových jader na klíč v Karlovarském kraji (Cheb, Karlovy Vary, Sokolov, Aš). Pevná cena, zaměření ZDARMA.",
  keywords: [
    "rekonstrukce bytu Cheb",
    "rekonstrukce bytu Karlovy Vary",
    "rekonstrukce bytu Sokolov",
    "rekonstrukce bytu Aš",
    "rekonstrukce bytového jádra Cheb",
    "rekonstrukce koupelny Karlovarský kraj",
    "stavební firma Cheb",
    "vyzdění jádra Ytong",
    "obklady koupelny Cheb",
    "zednické práce Karlovarský kraj"
  ],
  authors: [{ name: siteConfig.contactPerson, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Rekonstrukce bytu Cheb | HANSBAU - Karlovarský Kraj",
    description: "Kompletní i částečné rekonstrukce bytů, koupelen a bytových jader na klíč v Karlovarském kraji. Pevná cena a zaměření ZDARMA.",
    images: [
      {
        url: "/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp",
        width: 1200,
        height: 800,
        alt: "HANSBAU Rekonstrukce bytů a koupelen v Karlovarském kraji",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rekonstrukce bytu Cheb | HANSBAU - Karlovarský Kraj",
    description: "Kompletní i částečné rekonstrukce bytů, koupelen a bytových jader na klíč v Karlovarském kraji.",
    images: ["/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/images/cropped-arrow-500-x-500-px-1.png",
    apple: "/images/cropped-arrow-500-x-500-px-1.png",
  },
  other: {
    "geo.region": "CZ-KA",
    "geo.placename": "Cheb, Karlovy Vary, Sokolov, Aš, Karlovarský kraj",
    "geo.position": "50.0964;12.4939",
    "ICBM": "50.0964, 12.4939",
    "theme-color": "#ffffff",
    "rating": "General",
    "distribution": "Global",
    "revisit-after": "7 days"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/images/cropped-arrow-500-x-500-px-1.png" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="author" href="/llms.txt" />
      </head>
      <body className="bg-white text-slate-900 font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
