"use client";

import { useEffect } from "react";

// Fade-and-rise on scroll. Elements with the class `reveal` (or `reveal-line`
// for the section dividers) are hidden until they scroll into view, then ease
// into place. It switches itself off for visitors who prefer reduced motion,
// and anything already on screen when the page loads simply appears.
export default function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    const seen = new WeakSet<Element>();
    let ready = false;
    const scan = () => {
      const els = document.querySelectorAll<HTMLElement>(
        ".reveal, .reveal-line",
      );
      els.forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const r = el.getBoundingClientRect();
        // already on screen: show it straight away, no animation
        if (!ready && r.top < window.innerHeight * 0.92) el.classList.add("in");
        else io.observe(el);
      });
      if (!ready) {
        ready = true;
        document.documentElement.classList.add("reveal-ready");
      }
    };

    scan();
    // pages stream in and change on navigation, so keep scanning for new elements
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
