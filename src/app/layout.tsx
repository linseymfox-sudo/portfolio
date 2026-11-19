import type { Metadata } from "next";
import { Fraunces, Urbanist } from "next/font/google";
import "./globals.css";

// Fraunces has soft, organic "wonk" forms that suit a botanical feel.
const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-display",
});
const sans = Urbanist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Linsey Fox – Senior Product Designer",
  description:
    "Senior Product Designer specializing in content and AI-assisted design.",
};

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
