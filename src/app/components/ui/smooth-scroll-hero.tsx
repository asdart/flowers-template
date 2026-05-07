"use client";
import * as React from "react";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/* ═══════════════════════════════════════════════════════════════
   SmoothScrollHero — sticky cinematic image panel that gently
   un-clips and zooms out as the user scrolls *through* the section.

   Notes vs. the original spec:
   • Uses motion/react (the canonical import in this project) which
     re-exports the same API surface as framer-motion.
   • Scroll progress is SECTION-LOCAL via useScroll({ target, offset })
     so the animation plays only while the section passes through the
     viewport — required for mid-page placement (between Hero and
     How We Work) instead of triggering on global page scroll.
   • Honors prefers-reduced-motion: in that case the panel renders
     statically with no clip-path / scale interpolation.
   • Children are rendered absolutely on top so callers can layer
     editorial typography, vignettes, grain, and particles without
     affecting the clip surface.
   ═══════════════════════════════════════════════════════════════ */

interface SmoothScrollHeroProps {
  /** Total scroll distance (in px) over which the un-clip animates. */
  scrollHeight?: number;
  desktopImage: string;
  mobileImage: string;
  /** Inset (%) of the polygon at section start — higher = more letterboxed. */
  initialClipPercentage?: number;
  /** Inset (%) of the polygon at section end — typically (100 - initial). */
  finalClipPercentage?: number;
  /** Editorial overlay content (headline, paragraph, CTA, etc). */
  children?: React.ReactNode;
  /** Extra classes for the outer relative wrapper. */
  className?: string;
}

export function SmoothScrollHero({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  children,
  className = "",
}: SmoothScrollHeroProps) {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // inset() uses one value for all four sides (the letterbox amount) plus a
  // `round` radius that shrinks to 0 as the image fully expands.
  const inset = useTransform(
    scrollYProgress,
    [0, 1],
    [initialClipPercentage, 0]
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    [32, 8, 0]
  );

  const clipPath = useMotionTemplate`inset(${inset}% round ${radius}px)`;

  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["170%", "100%"]);

  const staticClip = `inset(${initialClipPercentage}% round 32px)`;

  return (
    <div
      ref={sectionRef}
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className={`relative w-full ${className}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black"
          style={
            prefersReducedMotion
              ? { clipPath: staticClip }
              : { clipPath, willChange: "clip-path, transform" }
          }
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 md:hidden"
            style={{
              backgroundImage: `url(${mobileImage})`,
              backgroundSize: prefersReducedMotion ? "100%" : backgroundSize,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              willChange: "background-size",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 hidden md:block"
            style={{
              backgroundImage: `url(${desktopImage})`,
              backgroundSize: prefersReducedMotion ? "100%" : backgroundSize,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              willChange: "background-size",
            }}
          />
        </motion.div>

        {children ? (
          <div className="pointer-events-none absolute inset-0 z-10">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SmoothScrollHero;
