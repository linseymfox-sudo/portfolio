"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// A curtain that sweeps up over the page, then lifts away once the next page
// is ready. It only runs for mouse and trackpad visitors who haven't asked for
// reduced motion; everyone else gets a normal, instant page change.
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "cover" | "out">("idle");
  const target = useRef<string | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover)");
    const timers: number[] = [];

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduced.matches || !hover.matches) return;
      const a = (e.target as Element | null)?.closest("a");
      if (
        !a ||
        (a.target && a.target !== "_self") ||
        a.hasAttribute("download")
      )
        return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page: let jump links and hashes work normally
      e.preventDefault();
      target.current = url.pathname;
      setPhase("cover");
      timers.push(
        window.setTimeout(
          () => router.push(url.pathname + url.search + url.hash),
          520,
        ),
      );
      // safety net: never leave the curtain down if the page doesn't change
      timers.push(
        window.setTimeout(
          () => setPhase((p) => (p === "cover" ? "out" : p)),
          4000,
        ),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      timers.forEach(clearTimeout);
    };
  }, [router]);

  // the new page has arrived: lift the curtain
  useEffect(() => {
    if (target.current && pathname === target.current) {
      target.current = null;
      setPhase("out");
    }
  }, [pathname]);

  useEffect(() => {
    if (phase !== "out") return;
    const t = window.setTimeout(() => setPhase("idle"), 800);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className={`curtain ${phase}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/fox-logo.png" alt="" />
    </div>
  );
}
