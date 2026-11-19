"use client";

import { useRef } from "react";

// A page screenshot that scrolls inside a laptop screen. The frame image has
// an opaque black screen, so the scroller sits on top of it, aligned with
// the screen area (measured from the frame file: 1530 x 894 at 237, 147 in a
// 2000 x 1221 image). "Click to enlarge" opens the same screenshot in a
// full-window scrollable view.
export default function LaptopScroll({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <figure className="laptop-scroll reveal" suppressHydrationWarning>
      <div className="laptop">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="frame"
          src="/work/snowflake-pricing-calculator/macbook-frame.webp"
          alt=""
          loading="lazy"
        />
        <div
          className="screen"
          tabIndex={0}
          role="region"
          aria-label={`${caption}: scrollable screenshot`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </div>
      <div className="bar">
        <figcaption>
          {caption}
          <span className="hint">
            {" "}
            · scroll inside the screen to see the whole page
          </span>
        </figcaption>
        <button
          type="button"
          className="enlarge"
          onClick={() => dialog.current?.showModal()}
        >
          Click to enlarge
        </button>
      </div>
      <dialog
        ref={dialog}
        className="zoom-dialog"
        aria-label={caption}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <button
          type="button"
          className="zoom-close"
          onClick={() => dialog.current?.close()}
        >
          Close ✕
        </button>
        <div className="zoom-scroll fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
        </div>
      </dialog>
    </figure>
  );
}
