"use client";

import { useEffect, useRef } from "react";

// A vine in the left margin that grows as you scroll, putting out a leaf
// (and now and then a blossom) as it goes. It doubles as a progress
// indicator. The same scroll handler drives the gentle parallax on elements
// marked data-parallax. Reduced motion: the vine is shown fully grown and
// nothing moves.
const H = 1000; // height of the vine's drawing space
const wave = (y: number) => 22 + Math.sin(y / 74) * 8;

const STEM = Array.from({ length: H / 10 + 1 }, (_, i) => {
  const y = i * 10;
  return `${i === 0 ? "M" : "L"}${wave(y).toFixed(1)} ${y}`;
}).join(" ");

const LEAVES = Array.from({ length: 13 }, (_, i) => {
  const y = 70 + i * 72;
  const side = i % 2 === 0 ? 1 : -1;
  return { y, x: wave(y), side, blossom: i % 3 === 2 };
});

export default function ScrollEffects() {
  const stem = useRef<SVGPathElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = stem.current;
    const root = svg.current;
    if (!path || !root) return;
    const leaves = Array.from(root.querySelectorAll<SVGGElement>(".vine-leaf"));
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      path.style.strokeDashoffset = "0";
      leaves.forEach((l) => l.classList.add("on"));
      return;
    }

    let raf = 0;
    const frame = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      path.style.strokeDashoffset = String(1 - p);
      leaves.forEach((l) =>
        l.classList.toggle("on", p * H >= Number(l.dataset.y) - 6),
      );

      document
        .querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
          const amount = parseFloat(el.dataset.parallax ?? "20");
          const centre =
            (r.top + r.height / 2 - window.innerHeight / 2) /
            window.innerHeight;
          el.style.setProperty("--py", `${(-centre * amount).toFixed(1)}px`);
        });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    frame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // pages stream in and change length, so recalculate when the layout changes
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={svg}
      className="vine"
      viewBox={`0 0 44 ${H}`}
      fill="none"
      aria-hidden="true"
    >
      <path ref={stem} className="vine-stem" d={STEM} pathLength={1} />
      {LEAVES.map((l, i) => (
        <g
          key={i}
          className="vine-leaf"
          data-y={l.y}
          transform={`translate(${l.x.toFixed(1)} ${l.y}) scale(${l.side} 1)`}
        >
          <g className="vine-leaf-in">
            <path
              d="M0 0C6 -9 18 -11 27 -3C18 6 6 7 0 0Z"
              className="leaf-shape"
            />
            <path d="M3 -1.5C10 -3 17 -3.5 23 -3" className="leaf-vein" />
            {l.blossom && (
              <circle cx="31" cy="-4" r="3.2" className="vine-blossom" />
            )}
          </g>
        </g>
      ))}
    </svg>
  );
}
