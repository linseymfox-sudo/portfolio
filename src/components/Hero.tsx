"use client";

import { useRef } from "react";
import Botanical from "@/components/Botanical";
import SiteNav from "@/components/SiteNav";
import { profile } from "@/data/projects";

// Compact hero: outlined name with a cursor spotlight on the left,
// About copy on the right so case studies sit above the fold.
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const hero = ref.current;
    const name = nameRef.current;
    if (!hero || !name) return;
    // measure from the name's own box so the glow sits under the cursor
    const r = name.getBoundingClientRect();
    hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
    hero.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <header ref={ref} className="hero" onPointerMove={onMove}>
      <SiteNav />

      <div className="hero-row">
        <div className="hero-id">
          <h1
            ref={nameRef}
            className="name"
            data-text={profile.name}
            aria-label={profile.name}
          >
            {profile.name}
          </h1>
          <p className="role">{profile.role}</p>
        </div>

        <div className="about">
          <p className="tagline">{profile.tagline}</p>
          <p>{profile.intro}</p>
          <p className="tags">
            {profile.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
        </div>
      </div>

      {/* decorative botanical line drawing, drawn in on load */}
      <Botanical plant="poppy" className="sprig" />
    </header>
  );
}
