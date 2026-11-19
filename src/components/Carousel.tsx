"use client";

import { useRef, useState } from "react";
import ZoomImage from "./ZoomImage";

// A slide without a src is shown as a labelled "coming soon" placeholder.
type Slide = { src: string | null; alt: string; label?: string };

// Image carousel built on native scroll-snap, so swiping on touch devices and
// scrolling with a trackpad both work. Previous/next buttons and dots are
// extra; the strip itself is keyboard-focusable (arrow keys scroll it).
export default function Carousel({
  images,
  caption,
  captions,
  scroll = false,
  zoom = false,
}: {
  images: Slide[];
  caption: string;
  // Optional caption per slide; shown instead of `caption` while that slide is in view.
  captions?: string[];
  // Tall images (full-page screenshots): each slide becomes a fixed-height
  // window that scrolls vertically, so the whole page can be read.
  scroll?: boolean;
  // Each slide opens full-size in a modal when clicked.
  zoom?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = (n: number) => {
    const el = track.current;
    if (!el) return;
    const next = (n + images.length) % images.length;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollTo({
      left: next * el.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <figure
      className={scroll ? "cs-carousel scroll reveal" : "cs-carousel reveal"}
      suppressHydrationWarning
      role="group"
      aria-roledescription="carousel"
      aria-label={caption}
    >
      <div
        className="track"
        ref={track}
        onScroll={onScroll}
        tabIndex={scroll ? undefined : 0}
      >
        {images.map((im, k) => (
          <div
            className="slide"
            key={im.src ?? `placeholder-${k}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${k + 1} of ${images.length}`}
            tabIndex={scroll ? 0 : undefined}
          >
            {im.src === null ? (
              <div className="ph">
                <span>Image coming soon</span>
                {im.label}
              </div>
            ) : zoom ? (
              <ZoomImage src={im.src} alt={im.alt} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={im.src}
                alt={im.alt}
                loading={k === 0 ? "eager" : "lazy"}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bar">
        <figcaption>
          {captions?.[current] ?? caption}
          {scroll && (
            <span className="hint">
              {" "}
              · scroll inside the page to see it all
            </span>
          )}
        </figcaption>
        {images.length > 1 && (
          <div className="ctl">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous slide"
            >
              ←
            </button>
            <div className="dots">
              {images.map((im, k) => (
                <button
                  key={im.src ?? `dot-${k}`}
                  type="button"
                  onClick={() => goTo(k)}
                  aria-label={`Go to slide ${k + 1}`}
                  aria-current={k === current}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <span className="sr-only" aria-live="polite">
          Slide {current + 1} of {images.length}
        </span>
      )}
    </figure>
  );
}
