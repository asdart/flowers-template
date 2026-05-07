"use client";
import * as React from "react";

/* ═══════════════════════════════════════════════════════════════
   ImageAutoSlider — infinite, masked, auto-scrolling 16:9 strip.

   • CSS-keyframe driven horizontal translate(-50%) loop.
   • Edge mask (linear-gradient) for cinematic fade.
   • prefers-reduced-motion: animation paused.
   • aspect-video tiles sized from svh + breakpoints (w-auto).
   • Lazy-loaded images, descriptive alt text.

   Composition is intentionally bare: callers wrap it in a
   <section> and provide their own headline / atmosphere so the
   primitive remains reusable across templates.
   ═══════════════════════════════════════════════════════════════ */

interface ImageAutoSliderProps {
  images: { src: string; alt?: string }[];
  /** Loop duration (CSS animation-duration). Slower = more luxe. */
  durationSeconds?: number;
  /**
   * Extra classes merged onto each tile (after defaults).
   * Defaults size tiles from viewport height via svh + responsive steps
   * so they grow on tall/large screens and shrink on small ones.
   */
  tileClassName?: string;
  /** Gap between tiles (Tailwind gap-* utilities). */
  trackGapClassName?: string;
  /** Pause on hover. */
  pauseOnHover?: boolean;
  className?: string;
}

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.setAttribute("data-image-auto-slider", "true");
  style.innerHTML = `
    @keyframes ias-scroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .ias-track {
      animation: ias-scroll var(--ias-duration, 28s) linear infinite;
      will-change: transform;
    }
    .ias-mask {
      mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
      -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
    }
    .ias-tile {
      transition: transform 0.6s ease, filter 0.6s ease;
    }
    .ias-tile:hover {
      transform: scale(1.03);
      filter: brightness(1.08);
    }
    .ias-pause:hover .ias-track {
      animation-play-state: paused;
    }
    @media (prefers-reduced-motion: reduce) {
      .ias-track { animation: none; }
    }
  `;
  document.head.appendChild(style);
  stylesInjected = true;
}

export function ImageAutoSlider({
  images,
  durationSeconds = 60,
  tileClassName = "",
  trackGapClassName = "gap-3 sm:gap-4 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10",
  pauseOnHover = true,
  className = "",
}: ImageAutoSliderProps) {
  React.useEffect(() => {
    injectStyles();
  }, []);

  const duplicated = React.useMemo(() => [...images, ...images], [images]);

  const tileBaseClass =
    "ias-tile aspect-video w-auto flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl " +
    "h-[clamp(120px,30svh,360px)] " +
    "sm:h-[clamp(132px,32svh,400px)] " +
    "md:h-[clamp(148px,34svh,440px)] " +
    "lg:h-[clamp(164px,36svh,480px)] " +
    "xl:h-[clamp(180px,37svh,520px)] " +
    "2xl:h-[clamp(196px,38svh,580px)] " +
    "min-[1800px]:h-[clamp(212px,39svh,640px)] " +
    tileClassName;

  return (
    <div
      className={`ias-mask w-full ${pauseOnHover ? "ias-pause" : ""} ${className}`}
      style={{ ["--ias-duration" as string]: `${durationSeconds}s` }}
    >
      <div className={`ias-track flex w-max px-4 sm:px-6 ${trackGapClassName}`}>
        {duplicated.map((image, index) => (
          <div key={index} className={tileBaseClass.trim()}>
            <img
              src={image.src}
              alt={image.alt ?? `Floral gallery image ${(index % images.length) + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageAutoSlider;
