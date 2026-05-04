import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import poisonIllustration from "../../../../imports/poison-bloom-illustration.png";
import {
  CREAM,
  EASE_PRIMARY,
  INK,
  SOFT_WONK,
  bodyFont,
  displayFont,
} from "../tokens";

/* ═══════════════════════════════════════════════════════════════
   SELECTED WORK — Editorial display title with botanical line-art
   illustration behind it. The title performs a word-by-word
   vertical reveal (each word clipped in its own mask, slides up
   from y: 110% → 0%, staggered). The illustration fades in once
   the section enters view AND drifts vertically with page scroll.
   ═══════════════════════════════════════════════════════════════ */

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const illustrationY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const TITLE_WORDS = ["Our", "selected", "blooms"] as const;

  const titleParent = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.18,
      },
    },
  };
  const titleWord = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 1.1, ease: EASE_PRIMARY },
    },
  };

  return (
    <section
      id="poison-selected-work"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <div
        className="relative mx-auto flex flex-col items-center justify-center"
        style={{
          maxWidth: 1440,
          padding: "96px 80px",
          minHeight: "100vh",
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "min(1284px, 92vw)",
            aspectRatio: "1284 / 856",
            mixBlendMode: "multiply",
            y: illustrationY,
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.32 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: EASE_PRIMARY }}
        >
          <img
            src={poisonIllustration}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        </motion.div>

        <motion.h2
          aria-label={TITLE_WORDS.join(" ")}
          className="relative flex flex-wrap items-baseline justify-center text-center"
          style={{
            ...displayFont,
            fontWeight: 300,
            fontSize: "clamp(56px, 10.5vw, 152px)",
            lineHeight: 1,
            letterSpacing: "-0.026em",
            color: INK,
            fontVariationSettings: SOFT_WONK,
            margin: 0,
            columnGap: "0.25em",
          }}
          variants={titleParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
        >
          {TITLE_WORDS.map((word) => (
            <span
              key={word}
              aria-hidden
              className="relative inline-block overflow-hidden"
              /* paddingBottom prevents descender clipping when the WONK
                 variant kicks the tails of g/y below the baseline. */
              style={{ paddingBottom: "0.14em" }}
            >
              <motion.span variants={titleWord} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          className="relative mt-4 text-center"
          style={{
            ...bodyFont,
            fontSize: 14,
            lineHeight: "24px",
            fontWeight: 300,
            color: INK,
            maxWidth: 389,
            margin: 0,
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE_PRIMARY }}
        >
          See our best collections of poison blooms.
        </motion.p>
      </div>
    </section>
  );
}
