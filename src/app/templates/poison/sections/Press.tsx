import { motion } from "motion/react";
import { HairlineDivider } from "../components/HairlineDivider";
import {
  CREAM,
  EASE_PRIMARY,
  HAIRLINE,
  INK,
  SOFT_WONK,
  bodyFont,
  displayFont,
} from "../tokens";

/* ═══════════════════════════════════════════════════════════════
   PRESS — typographic publication marquee.

   Full-bleed cream strip, ~140px tall. A row of editorial-press
   wordmarks set in Fraunces Thin auto-scrolls horizontally at
   60s linear infinite. Two hairlines bracket the row — the top
   draws inward from the left, the bottom from the right, so the
   strip "opens" like double-doors before the type starts moving.

   The marquee track is duplicated and translated -50% so the
   loop is seamless. A linear-gradient mask softens both edges.

   Typographic-only (no logos) — the studio's editorial language
   is the design system; rendering real publication marks would
   visually compete with the rest of the page.
   ═══════════════════════════════════════════════════════════════ */

const PUBLICATIONS = [
  "Vogue",
  "Wallpaper*",
  "AD",
  "T Magazine",
  "Cereal",
  "Apartamento",
  "Kinfolk",
  "Domino",
] as const;

export function Press() {
  /* Duplicate the list once so the -50% translation produces a
     visually seamless loop. The single track is twice as wide
     and sliding it half its width returns to the same composition. */
  const track = [...PUBLICATIONS, ...PUBLICATIONS];

  return (
    <section
      id="poison-press"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CREAM, color: INK, padding: "8px 0" }}
    >
      {/* Header row — small marker + tiny label, sits above the
          marquee. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_PRIMARY }}
        className="relative mx-auto flex items-baseline justify-between"
        style={{
          maxWidth: 1440,
          padding:
            "clamp(40px, 4.4vw, 64px) clamp(24px, 5.6vw, 80px) clamp(24px, 2.4vw, 32px)",
        }}
      >
        <p
          style={{
            ...displayFont,
            fontSize: 20,
            lineHeight: "28px",
            fontWeight: 100,
            letterSpacing: "-0.02em",
            fontVariationSettings: SOFT_WONK,
            color: INK,
            margin: 0,
          }}
        >
          Featured in
        </p>
        <p
          style={{
            ...bodyFont,
            fontSize: 14,
            lineHeight: "24px",
            fontWeight: 300,
            color: INK,
            margin: 0,
          }}
        >
          08 outlets
        </p>
      </motion.div>

      {/* Top hairline — draws inward from the left edge. */}
      <HairlineDivider
        direction="ltr"
        delay={0.3}
        duration={1.2}
        trigger="view"
      />

      {/* Marquee — auto-scrolling typographic row. */}
      <div
        className="relative"
        style={{
          paddingTop: "clamp(28px, 3.2vw, 40px)",
          paddingBottom: "clamp(28px, 3.2vw, 40px)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          overflow: "hidden",
        }}
      >
        <motion.div
          className="flex"
          style={{
            width: "max-content",
            gap: "clamp(40px, 5.6vw, 80px)",
            alignItems: "baseline",
          }}
          /* Move the entire duplicated track left by exactly 50%
             over 60s. Because the second half is identical, the
             loop is seamless. linear ease keeps the speed steady. */
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-baseline"
              style={{
                gap: "clamp(40px, 5.6vw, 80px)",
                ...displayFont,
                fontWeight: 200,
                fontSize: "clamp(28px, 3.6vw, 48px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: INK,
                fontVariationSettings: SOFT_WONK,
                whiteSpace: "nowrap",
              }}
            >
              {name}
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: HAIRLINE,
                  flex: "0 0 auto",
                }}
              />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom hairline — draws inward from the right edge. */}
      <HairlineDivider
        direction="rtl"
        delay={0.5}
        duration={1.2}
        trigger="view"
      />

      {/* Trailing micro-row matching the header rhythm. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, delay: 0.7, ease: EASE_PRIMARY }}
        className="relative mx-auto flex items-baseline justify-between"
        style={{
          maxWidth: 1440,
          padding:
            "clamp(24px, 2.4vw, 32px) clamp(24px, 5.6vw, 80px) clamp(40px, 4.4vw, 64px)",
        }}
      >
        <p
          style={{
            ...bodyFont,
            fontSize: 12,
            lineHeight: "20px",
            fontWeight: 300,
            color: INK,
            opacity: 0.6,
            margin: 0,
          }}
        >
          Editorial coverage 2018 — present.
        </p>
        <a
          href="#poison-contact"
          style={{
            ...bodyFont,
            fontSize: 12,
            lineHeight: "20px",
            fontWeight: 300,
            color: INK,
            textDecoration: "none",
            borderBottom: `1px solid ${HAIRLINE}`,
          }}
        >
          Press kit →
        </a>
      </motion.div>
    </section>
  );
}
