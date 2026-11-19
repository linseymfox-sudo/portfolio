import Link from "next/link";
import { profile } from "@/data/projects";

// Shared top navigation: fox mark on the left, links on the right.
export default function SiteNav() {
  return (
    <nav className="nav" aria-label="Primary">
      <Link href="/" className="mark" aria-label="Linsey Fox, home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/fox-logo.png" alt="" />
      </Link>
      <div>
        <Link href="/#work">Work</Link>
        <Link href="/p/about">About</Link>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
      </div>
    </nav>
  );
}
