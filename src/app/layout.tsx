import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

// Fraunces has soft, organic "wonk" forms that suit a botanical feel.
const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-display",
});
const sans = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://www.linseyfox.com";
const SITE_TITLE = "Linsey Fox – Senior Product Designer";
const SITE_DESCRIPTION =
  "Senior Product Designer specializing in content and AI-assisted design. Case studies for Intuit Mailchimp, Snowflake and Docusign.";

// Defaults for every page. Each page can override title, description and
// image (see the case study and About pages).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Linsey Fox",
    locale: "en_US",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Linsey Fox, Senior Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og/home.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#0e2423" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
