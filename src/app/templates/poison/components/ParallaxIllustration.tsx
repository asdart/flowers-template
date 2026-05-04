import { useRef } from "react";
import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE_PRIMARY } from "../tokens";

/* ─────────────────────────────────────────────────────────────
   ParallaxIllustration — mix-blend-multiply line-art backdrop.

   Pinned to the centre of its container, fades in once on enter,
   then drifts vertically with the page scroll. mix-blend-multiply
   keeps the cream paper visible through the negative space of
   the drawing while preserving the dark line work.

   The component must be placed inside a positioned container
   (the section). It captures its own scroll progress relative
   to that container, so two stacked sections each get their own
   independent drift.

   ───────────────────────────────────────────────────────────── */

export type ParallaxIllustrationProps = {
  src: string;
  /** Width of the illustration. Default "min(1284px, 92vw)". */
  width?: string;
  /** Aspect ratio (width / height). */
  aspectRatio?: string;
  /** Peak opacity at full reveal. */
  opacity?: number;
  /** Vertical drift in px from start to end of scroll progress. */
  drift?: number;
  /** Container the parallax tracks scroll inside. */
  scrollTarget: RefObject<HTMLElement | null>;
  /** Object-fit for the underlying <img>. */
  objectFit?: "cover" | "contain";
  /** Optional className for the wrapper. */
  className?: string;
};

export function ParallaxIllustration({
  src,
  width = "min(1284px, 92vw)",
  aspectRatio = "1284 / 856",
  opacity = 0.32,
  drift = 100,
  scrollTarget,
  objectFit = "contain",
  className,
}: ParallaxIllustrationProps) {
  const fallbackRef = useRef<HTMLElement | null>(null);
  const target = scrollTarget ?? fallbackRef;

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-drift, drift]);

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className ?? ""}`}
      style={{
        width,
        aspectRatio,
        mixBlendMode: "multiply",
        y,
        willChange: "transform, opacity",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.4, ease: EASE_PRIMARY }}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full"
        style={{ objectFit }}
        draggable={false}
      />
    </motion.div>
  );
}
