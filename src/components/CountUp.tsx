"use client";

import { useEffect, useRef } from "react";

// Counts a figure like "94%", "$137.5k+" or "12" up from zero when it scrolls
// into view. The full value is in the page from the start (search engines and
// screen readers see it), and it stays as is for reduced motion.
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(\D*)(\d[\d,]*\.?\d*)(.*)$/);
    if (
      !el ||
      !m ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const [, prefix, num, suffix] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const show = (n: number) => {
      el.textContent = `${prefix}${n.toFixed(decimals)}${suffix}`;
    };

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1300);
        show(target * (1 - Math.pow(1 - t, 3))); // ease out
        if (t < 1) raf = requestAnimationFrame(tick);
        else el.textContent = value;
      };
      raf = requestAnimationFrame(tick);
    };

    show(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
