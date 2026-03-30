import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Mk Fraud Website | Fraud Strategy, Risk & Awareness Consulting",
    template: "%s | Mk Fraud Website",
  },
  description:
    "Mk Fraud Website is a South African fraud risk and strategy consultancy helping organisations reduce fraud losses through intelligence-led strategy, practical controls, and targeted awareness training.",
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
  authors: [{ name: "Mk Fraud Website" }],
  creator: "Mk Fraud Website",
  publisher: "Mk Fraud Website",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://mkfraud.com",
    siteName: "Mk Fraud Website",
    title: "Mk Fraud Website",
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
        {children}
      </body>
    </html>
  );
}
