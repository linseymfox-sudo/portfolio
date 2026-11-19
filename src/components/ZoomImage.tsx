"use client";

import { useRef } from "react";

// An image that opens full-size in a modal when clicked (native <dialog>, so
// Esc closes it and focus is handled by the browser).
export default function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className="zoom-trigger"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Enlarge image: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" loading="lazy" />
        <span className="zoom-badge" aria-hidden="true">
          Click to enlarge
        </span>
      </button>
      <dialog
        ref={dialog}
        className="zoom-dialog"
        aria-label={alt}
        onClick={(e) => {
          // a click on the backdrop (the dialog element itself) closes it
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <button type="button" className="zoom-close" onClick={() => dialog.current?.close()}>
          Close ✕
        </button>
        <div className="zoom-scroll">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
        </div>
      </dialog>
    </>
  );
}
