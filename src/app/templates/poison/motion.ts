import type { Variants } from "motion/react";
import { EASE_CURTAIN, EASE_PRIMARY } from "./tokens";

/* ─────────────────────────────────────────────────────────────
   motion.ts — shared motion vocabulary.

   Every animation in the Poison template is built from a small
   set of primitives: a horizontal curtain reveal for images, a
   per-word vertical mask for display titles, sequential perimeter
   strokes for borders, a hairline-draw for dividers, and direction-
   aware slide/fade entrances for blocks of copy.

   Each helper returns a Variants object that can be plugged
   directly into `variants={...}` on a `motion.*` element, with an
   optional `delay` argument for staggering inside parents.
   ───────────────────────────────────────────────────────────── */

/* ── Image curtain — parts horizontally from the centre. Used by
      hero photo, services cards, contact wordmark image. */
export const curtainReveal = (delay = 0): Variants => ({
  hidden: { clipPath: "inset(0 50% 0 50%)" },
  visible: {
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 1.0, delay, ease: EASE_CURTAIN },
  },
});

/* ── Image scale settle — companion to curtainReveal. Image starts
      at 1.06 and eases to 1 in lock-step with the curtain. */
export const imageScaleSettle = (delay = 0): Variants => ({
  hidden: { scale: 1.06 },
  visible: {
    scale: 1,
    transition: { duration: 1.4, delay, ease: EASE_PRIMARY },
  },
});

/* ── Per-word mask — used to reveal a display title one word at
      a time. Each word lives inside an `overflow: hidden` mask;
      the inner span translates from y: 110% → 0%. */
export const wordMaskParent = (
  delayChildren = 0.2,
  staggerChildren = 0.18,
): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

export const wordMaskChild: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1.1, ease: EASE_PRIMARY },
  },
};

/* ── Slide-from-left + fade — display wordmark entrance from the
      left of the image (matches hero "Poison"). The x distance
      is the only thing callers tune; defaults match the hero. */
export const slideFromLeft = (delay = 0, distance = "-110px"): Variants => ({
  hidden: { x: distance, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5, delay, ease: EASE_PRIMARY },
  },
});

export const slideFromRight = (delay = 0, distance = "110px"): Variants => ({
  hidden: { x: distance, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5, delay, ease: EASE_PRIMARY },
  },
});

/* ── Generic fade-up — body copy, card labels, footer columns. */
export const fadeUp = (delay = 0, distance = 24, duration = 0.9): Variants => ({
  hidden: { y: distance, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration, delay, ease: EASE_PRIMARY },
  },
});

/* ── Hairline draw — 1px line that scales from 0 to 1 along its
      length. transformOrigin must be set on the element itself so
      the line draws from the chosen end (left → right by default). */
export const hairlineDraw = (
  delay = 0,
  duration = 0.55,
  axis: "x" | "y" = "x",
): Variants => ({
  hidden: axis === "x" ? { scaleX: 0 } : { scaleY: 0 },
  visible:
    axis === "x"
      ? { scaleX: 1, transition: { duration, delay, ease: EASE_PRIMARY } }
      : { scaleY: 1, transition: { duration, delay, ease: EASE_PRIMARY } },
});
