import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { projects, profile } from "@/data/projects";

const ABOUT_TITLE = "About — Linsey Fox";
// The first sentence of the bio makes a better search snippet than the heading.
const ABOUT_DESCRIPTION = profile.about.paragraphs[0].split(". ")[0].replace(/\.$/, "") + ".";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/p/about" },
  openGraph: {
    type: "profile",
    siteName: "Linsey Fox",
    url: "/p/about",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
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
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: ["/og/home.jpg"],
  },
};

export default function AboutPage() {
  const a = profile.about;
  return (
    <main className="cs about-page">
      <div className="page-top">
        <SiteNav />
      </div>

      <div className="about-grid">
        <figure className="about-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/linsey-fox-about.webp"
            alt="Linsey Fox smiling in sunglasses, standing in front of a wall of large green and cream pothos leaves"
          />
          <figcaption>{a.photoCaption}</figcaption>
        </figure>

        <div>
          <p className="cs-kicker">About</p>
          <h1>{a.heading}</h1>
          {a.paragraphs.map((p) => (
            <p className="cs-p" key={p.slice(0, 24)}>
              {p}
            </p>
          ))}
          <p className="about-actions">
            <Link href="/#work">See my work</Link>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              Connect on LinkedIn ↗
            </a>
          </p>
        </div>
      </div>

      <section className="cs-more">
        <h2 className="eyebrow">Selected specimens</h2>
        <ul className="plate-list">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={p.href}>
                <span className="pl">{p.plate}</span>
                <span className="ti">{p.title}</span>
                <span className="ar" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  );
}
