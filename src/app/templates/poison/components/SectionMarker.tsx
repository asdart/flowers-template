import { motion } from "motion/react";
import {
  EASE_PRIMARY,
  INK,
  SOFT_WONK,
  VIEWPORT_DEFAULTS,
  bodyFont,
  displayFont,
} from "../tokens";

/* ─────────────────────────────────────────────────────────────
   SectionMarker — small numbered label e.g. "01 — Studio".

   The number is set in Open Sans 14px (matching the testimonial
   counter), the label in Fraunces Thin 20px (matching the
   testimonial header). A 1ch em-dash separator. The whole row
   slides in from the left with a short fade.

   ───────────────────────────────────────────────────────────── */

export type SectionMarkerProps = {
  /** Numeric prefix, displayed zero-padded to 2 digits. */
  number: number;
  /** Label that follows the dash. */
  label: string;
  /** Entry delay in seconds. */
  delay?: number;
  /** Trigger on mount or on scroll-into-view. Default "view". */
  trigger?: "mount" | "view";
  className?: string;
  style?: React.CSSProperties;
};

export function SectionMarker({
  number,
  label,
  delay = 0,
  trigger = "view",
  className,
  style,
}: SectionMarkerProps) {
  const padded = String(number).padStart(2, "0");

  const variants = {
    hidden: { x: -16, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.9, delay, ease: EASE_PRIMARY },
    },
  };

  const triggerProps =
    trigger === "view"
      ? {
          variants,
          initial: "hidden",
          whileInView: "visible",
          viewport: VIEWPORT_DEFAULTS,
        }
      : { variants, initial: "hidden", animate: "visible" };

  return (
    <motion.span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 12,
        color: INK,
        ...style,
      }}
      {...triggerProps}
    >
      <span
        style={{
          ...bodyFont,
          fontSize: 14,
          lineHeight: "24px",
          fontWeight: 300,
          letterSpacing: "0.02em",
        }}
      >
        {padded}
      </span>
      <span
        aria-hidden
        style={{
          ...bodyFont,
          fontSize: 14,
          lineHeight: "24px",
          fontWeight: 300,
        }}
      >
        —
      </span>
      <span
        style={{
          ...displayFont,
          fontSize: 20,
          lineHeight: "28px",
          fontWeight: 200,
          letterSpacing: "-0.02em",
          fontVariationSettings: SOFT_WONK,
        }}
      >
        {label}
      </span>
    </motion.span>
  );
}
