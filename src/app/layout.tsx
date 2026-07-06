import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import SiteRuntimeFixes from "@/components/SiteRuntimeFixes";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const siteUrl = "https://www.mkfraud.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MK Fraud Insights | Fraud Strategy, Risk & Awareness Consulting",
    template: "%s | MK Fraud Insights",
  },
  description:
    "MK Fraud Insights is a South African fraud risk and strategy consultancy helping organisations reduce fraud losses through intelligence-led strategy, practical controls, and targeted awareness training.",
  keywords: [
    "fraud consulting",
    "fraud risk management",
    "fraud strategy",
    "fraud awareness training",
    "internal fraud controls",
    "fraud health check",
    "South Africa fraud consulting",
    "non-financial fraud risk",
  ],
  authors: [{ name: "MK Fraud Insights" }],
  creator: "MK Fraud Insights",
  publisher: "MK Fraud Insights",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: "MK Fraud Insights",
    title: "MK Fraud Insights",
    description:
      "Helping organisations move beyond reactive fraud controls toward resilient, intelligence-led fraud programmes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${poppins.variable} antialiased`}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
          <SiteRuntimeFixes />
        </Suspense>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
