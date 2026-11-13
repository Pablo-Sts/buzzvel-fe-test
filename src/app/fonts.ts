import localFont from "next/font/local";

/**
 * Same typefaces as the Figma prototype, self-hosted as variable woff2 files
 * (latin subset) so there is no request to a third-party font CDN.
 */
export const inter = localFont({
  src: "../assets/fonts/inter-latin-wght.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "Arial", "sans-serif"],
});

export const plusJakartaSans = localFont({
  src: "../assets/fonts/plus-jakarta-sans-latin-wght.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-jakarta",
  fallback: ["ui-sans-serif", "system-ui", "Arial", "sans-serif"],
});
