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

  // A trail of tiny leaves and petals that drift down from the cursor
  const trail = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0, t: 0 });
  const shed = (e: React.PointerEvent) => {
    const box = trail.current;
    const hero = ref.current;
    if (!box || !hero || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const now = performance.now();
    const moved = Math.hypot(
      e.clientX - last.current.x,
      e.clientY - last.current.y,
    );
    if (moved < 34 || now - last.current.t < 40 || box.childElementCount > 34)
      return;
    last.current = { x: e.clientX, y: e.clientY, t: now };
    const r = hero.getBoundingClientRect();
    const bit = document.createElement("span");
    bit.className = Math.random() < 0.35 ? "trail-bit petal" : "trail-bit leaf";
    bit.style.left = `${e.clientX - r.left}px`;
    bit.style.top = `${e.clientY - r.top}px`;
    bit.style.setProperty("--dx", `${(Math.random() - 0.5) * 80}px`);
    bit.style.setProperty("--dy", `${50 + Math.random() * 70}px`);
    bit.style.setProperty("--r0", `${Math.random() * 360}deg`);
    bit.style.setProperty("--r1", `${(Math.random() - 0.5) * 600}deg`);
    bit.style.setProperty("--s", `${0.75 + Math.random() * 0.8}`);
    bit.addEventListener("animationend", () => bit.remove(), { once: true });
    box.appendChild(bit);
  };

  const onMove = (e: React.PointerEvent) => {
    shed(e);
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
      <div ref={trail} className="trail" aria-hidden="true" />
    </header>
  );
}
