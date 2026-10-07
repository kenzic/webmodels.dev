import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QrCodeDialog } from "@/components/qr-code-dialog";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = localFont({
  src: "../node_modules/@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-wght-normal.woff2",
  variable: "--font-familjen-grotesk",
  weight: "400 700",
  display: "swap",
});
const mono = localFont({
  src: "../node_modules/@fontsource-variable/martian-mono/files/martian-mono-latin-wght-normal.woff2",
  variable: "--font-martian-mono",
  weight: "100 800",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  applicationName: "Web Models API",
  openGraph: {
    type: "website", locale: "en_US", url: "/", siteName: "Web Models API",
    title: SITE_TITLE, description: SITE_DESCRIPTION,
    images: [{ url: "/images/social-card.png", width: 1734, height: 907, alt: "Web Models API. Models belong in every browser." }],
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION, images: ["/images/social-card.png"] },
  robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#dce3ee", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <QrCodeDialog />
        <Analytics />
        <SpeedInsights />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
