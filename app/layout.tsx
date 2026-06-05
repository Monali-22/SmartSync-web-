import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartSync AI - Enterprise Data Integration",
  description:
    "Clean, standardize, and prepare customer data for CRM and marketing systems using AI-powered data integration.",
  keywords:
    "data cleaning, customer data, data integration, CRM, duplicate detection",
  authors: [{ name: "SmartSync AI" }],
  openGraph: {
    title: "SmartSync AI",
    description:
      "Enterprise-grade data integration and cleaning powered by AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
