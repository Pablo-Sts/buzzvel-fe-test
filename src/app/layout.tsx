import type { Metadata, Viewport } from "next";
import { inter, plusJakartaSans } from "./fonts";
import "./globals.css";

const title = "Luma — Practical online courses that move you forward";
const description =
  "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  applicationName: "Luma",
  keywords: ["online courses", "product design", "technology", "business", "creative skills", "e-learning"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Luma",
    title,
    description,
    url: "/",
    locale: "en_US",
    images: [{ url: "/images/hero-learner.jpg", width: 900, height: 1100, alt: "Learner studying on a laptop" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-learner.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f8f3",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body id="top">{children}</body>
    </html>
  );
}
