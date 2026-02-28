import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.tripadvert.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TripAdvert — In-Vehicle Digital Advertising Platform in Accra, Ghana",
    template: "%s | TripAdvert",
  },
  description:
    "TripAdvert is Accra's leading digital out-of-home (DOOH) advertising platform. Reach thousands of passengers daily through headrest-mounted tablet displays in taxis and ride-share vehicles across Ghana.",
  keywords: [
    "digital advertising Accra",
    "DOOH advertising Ghana",
    "in-vehicle advertising",
    "headrest advertising",
    "taxi advertising Accra",
    "ride-share advertising Ghana",
    "digital out-of-home advertising",
    "in-cab advertising platform",
    "TripAdvert",
    "passenger advertising Ghana",
    "fleet advertising network",
    "tablet advertising taxis",
    "transit advertising Accra Ghana",
    "outdoor advertising Ghana",
  ],
  authors: [{ name: "TripAdvert", url: siteUrl }],
  creator: "TripAdvert",
  publisher: "TripAdvert",
  formatDetection: {
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: siteUrl,
    siteName: "TripAdvert",
    title: "TripAdvert — In-Vehicle Digital Advertising Platform in Accra, Ghana",
    description:
      "Reach thousands of passengers daily through headrest-mounted tablet displays in taxis and ride-share vehicles across Accra, Ghana. Launch targeted DOOH campaigns in minutes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TripAdvert — Digital advertising on headrest-mounted tablets in taxis across Accra, Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TripAdvert — In-Vehicle Digital Advertising in Accra, Ghana",
    description:
      "Reach thousands of passengers daily through headrest-mounted tablet displays in taxis across Ghana. Launch DOOH campaigns in minutes.",
    images: ["/og-image.png"],
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
  category: "Advertising",
  manifest: "/manifest.json",
  other: {
    "geo.region": "GH-AA",
    "geo.placename": "Accra",
    "geo.position": "5.6037;-0.1870",
    ICBM: "5.6037, -0.1870",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
