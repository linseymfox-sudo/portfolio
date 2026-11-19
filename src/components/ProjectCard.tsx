"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

// On hover devices the logo crossfades in on hover (pure CSS).
// On touch devices the first tap reveals the logo and the second tap
// follows the link. Tapping elsewhere resets the card.
export default function ProjectCard({ p }: { p: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!revealed) return;
    const reset = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setRevealed(false);
    };
    document.addEventListener("pointerdown", reset);
    return () => document.removeEventListener("pointerdown", reset);
  }, [revealed]);

  const onClick = (e: React.MouseEvent) => {
    const touchOnly = window.matchMedia("(hover: none)").matches;
    if (p.hoverImage && touchOnly && !revealed) {
      e.preventDefault();
      setRevealed(true);
    }
  };

  return (
    <Link
      ref={ref}
      href={p.href}
      className={revealed ? "revealed" : undefined}
      onClick={onClick}
    >
      <div className="thumb">
        {/* eslint-disable @next/next/no-img-element */}
        <img className="base" src={p.image} alt="" loading="eager" />
        {p.hoverImage && <img className="alt" src={p.hoverImage} alt="" />}
        {/* eslint-enable @next/next/no-img-element */}
      </div>
      <span className="co">
        {p.plate} · {p.company}
      </span>
      <span className="ti">
        {p.title} <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
