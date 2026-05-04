import type { CSSProperties } from "react";
import { motion } from "motion/react";
import poisonAbout from "../../../../imports/poison-bloom-about.png";
import { DualClipWordmark } from "../components/DualClipWordmark";
import {
  CREAM,
  EASE_OVERSHOOT,
  EASE_PRIMARY,
  INK,
  SOFT_WONK,
  TEAL,
  TEAL_DARK,
  bodyFont,
  displayFont,
} from "../tokens";
import { pv } from "../utils";

/* ═══════════════════════════════════════════════════════════════
   ABOUT — studio manifesto.

   Matches Figma "Global sections / About" (node 12521:7632).

   Layout — single, page-centred column:
     • An 801 × 600 "Img container" hosts the headline as a
       centred, 3-line Fraunces Light 152/152 wordmark with a
       432 × 600 floral photograph centred behind it. The
       headline is rendered twice via DualClipWordmark — ink
       on cream where the glyphs sit on the page, cream where
       they cross the photograph — and a 60 % INK scrim sits
       over the image so the cream copy stays legible against
       any frame of the photo.
     • Below the container, a 389-px body paragraph and a teal
       "Read our story" CTA stack with 40 / 24 px rhythm and
       the whole column is centred on the page.

   Reveal timeline (desktop):
     0.1 s   image curtain-reveals (DualClipWordmark default)
     0.4 s   word-mask cascade begins on line 1
     ~0.7 s  line 2 starts (per-line stagger of 0.32 s)
     ~1.0 s  line 3 starts
     0.9 s   body paragraph fades up — slipped to land *during*
             the headline cascade, not after it. The previous
             timing (2.0 s / 2.3 s) felt unmoored: by the time
             the body appeared the user had often already
             scrolled past, leaving the CTA revealing into an
             empty viewport.
     1.2 s   CTA scale-fades in
   ═══════════════════════════════════════════════════════════════ */

/* Hard-coded line breaks — the headline wraps to 3 lines inside
   the 801-px container in Figma. We pre-split here so each line
   can carry its own per-line stagger; without explicit lines the
   parent variant would have to choreograph all 8 words in one
   stagger and the cascade would feel too brisk. */
const HEADLINE_LINES = [
  "A studio for the",
  "quiet language",
  "of flowers.",
] as const;

/* Reference dimensions (px) — converted to vw via pv() so the
   composition scales linearly off the 1440-px hero reference
   and stays in proportion across desktop breakpoints. */
const CONTAINER_W = 801;
const CONTAINER_H = 600;
const IMG_W = 432;
const IMG_H = 600;
const HEADLINE_FONT_SIZE = 152;
const HEADLINE_LINE_HEIGHT = 152;
const HEADLINE_TRACKING = -4;

/* Vertical offset that centres the 3-line block inside the
   600-px container: (600 − 3 × 152) / 2 = 72 px. */
const HEADLINE_TOP =
  (CONTAINER_H - HEADLINE_LINES.length * HEADLINE_LINE_HEIGHT) / 2;

const CONTAINER_W_VW = pv(CONTAINER_W);
const CONTAINER_H_VW = pv(CONTAINER_H);
const IMG_W_VW = pv(IMG_W);
const IMG_H_VW = pv(IMG_H);
const HEADLINE_TOP_VW = pv(HEADLINE_TOP);
const HEADLINE_LINE_HEIGHT_VW = pv(HEADLINE_LINE_HEIGHT);

const headlineStyle: CSSProperties = {
  ...displayFont,
  fontWeight: 300,
  fontSize: pv(HEADLINE_FONT_SIZE),
  lineHeight: HEADLINE_LINE_HEIGHT_VW,
  letterSpacing: pv(HEADLINE_TRACKING),
  fontVariationSettings: SOFT_WONK,
  margin: 0,
  textAlign: "center",
  whiteSpace: "nowrap",
};

const wordMaskChild = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1.1, ease: EASE_PRIMARY },
  },
};

/* Single line of the headline, rendered identically for both ink
   and cream layers via DualClipWordmark. The motion.div anchors
   absolute inside the 801 × 600 container, full-width with
   text-align: center, so the inline word boxes flow horizontally
   and the per-word mask reveal cascades within the line. */
function HeadlineLine({
  line,
  color,
  index,
}: {
  line: string;
  color: string;
  index: number;
}) {
  const top = `calc(${HEADLINE_TOP_VW} + ${HEADLINE_LINE_HEIGHT_VW} * ${index})`;
  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.4 + index * 0.32,
        staggerChildren: 0.06,
      },
    },
  };
  return (
    <motion.div
      className="absolute"
      style={{
        ...headlineStyle,
        left: 0,
        right: 0,
        top,
        color,
      }}
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
    >
      {line.split(" ").map((word, i) => (
        <span
          key={`${index}-${i}-${word}`}
          aria-hidden
          className="relative inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: "0.14em", marginRight: "0.25em" }}
        >
          <motion.span variants={wordMaskChild} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

export function About() {
  return (
    <section
      id="poison-about"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      {/* ───────────────────── DESKTOP LAYOUT ─────────────────────
          A flex column centred on the page. The image-container
          stack is 801 × 600 (vw-scaled) with the dual-clip head-
          line + photograph + scrim, and the body / CTA cluster
          sits 40 px below it. */}
      <div
        className="relative hidden md:flex flex-col items-center"
        style={{
          paddingTop: pv(120),
          paddingBottom: pv(120),
          gap: pv(40),
        }}
      >
        {/* Visually-hidden semantic heading so the document
            outline still gets one h2 — the dual-clip layers
            below are decorative duplicates. */}
        <h2 className="sr-only" aria-label={HEADLINE_LINES.join(" ")}>
          {HEADLINE_LINES.join(" ")}
        </h2>

        <div
          className="relative"
          style={{ width: CONTAINER_W_VW, height: CONTAINER_H_VW }}
        >
          <DualClipWordmark
            imageSrc={poisonAbout}
            imageAlt="Poison Bloom studio still life"
            imageRect={{
              left: "50%",
              top: pv(0),
              width: IMG_W_VW,
              height: IMG_H_VW,
              translateX: "-50%",
            }}
            parentSize={{ width: CONTAINER_W_VW, height: CONTAINER_H_VW }}
            imageReveal
            imageKenBurns
            imageDelay={0.1}
            inkColor={INK}
            scrimColor="rgba(20, 10, 5, 0.6)"
            renderText={(color) => (
              <>
                {HEADLINE_LINES.map((line, i) => (
                  <HeadlineLine
                    key={`${color}-${i}`}
                    line={line}
                    color={color}
                    index={i}
                  />
                ))}
              </>
            )}
          />
        </div>

        {/* Body + CTA cluster — fades up *during* the wordmark
            cascade so the reading flow lands inside the same
            visual wave. Delay 0.9 s ≈ when line 2 of the headline
            is mid-reveal, so the body arrives just below the
            still-landing title rather than long after it. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE_PRIMARY }}
          className="flex flex-col items-center"
          style={{ gap: 24 }}
        >
          <p
            style={{
              ...bodyFont,
              fontSize: 14,
              lineHeight: "24px",
              color: INK,
              fontWeight: 300,
              margin: 0,
              maxWidth: 389,
              textAlign: "center",
            }}
          >
            For over a decade we have built floral environments that
            argue for restraint. Every commission is a conversation —
            with the room, with the light, with the people walking
            through it — and our job is to listen long enough to know
            which stems should speak.
          </p>
          <motion.a
            href="#poison-contact"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, delay: 1.2, ease: EASE_OVERSHOOT }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              ...bodyFont,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: TEAL,
              color: "#fff",
              padding: "8px 16px",
              fontSize: 12,
              lineHeight: "16px",
              fontWeight: 400,
              textDecoration: "none",
              transition: "background-color 240ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                TEAL_DARK)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = TEAL)
            }
          >
            Read our story
          </motion.a>
        </motion.div>
      </div>

      {/* ───────────────────── MOBILE LAYOUT ─────────────────────
          The dual-clip motif relies on a wide canvas, so the mobile
          fallback flattens to a stacked column: photograph at
          natural aspect ratio, headline below at fluid type, body
          paragraph + CTA. Image still gets the scrim to match the
          desktop atmosphere. */}
      <div className="relative flex flex-col items-center gap-10 px-6 py-24 md:hidden">
        <motion.div
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
          className="relative w-full max-w-[360px] overflow-hidden"
          style={{ aspectRatio: "432 / 600", background: "#d9d9d9" }}
        >
          <img
            src={poisonAbout}
            alt="Poison Bloom studio still life"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(20, 10, 5, 0.6)" }}
          />
        </motion.div>

        <h2
          className="text-center"
          style={{
            ...displayFont,
            fontWeight: 300,
            fontSize: "clamp(40px, 12vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: INK,
            fontVariationSettings: SOFT_WONK,
            margin: 0,
          }}
        >
          A studio for the quiet language of flowers.
        </h2>

        <p
          style={{
            ...bodyFont,
            fontSize: 14,
            lineHeight: "24px",
            color: INK,
            fontWeight: 300,
            margin: 0,
            maxWidth: 389,
            textAlign: "center",
          }}
        >
          For over a decade we have built floral environments that
          argue for restraint. Every commission is a conversation —
          with the room, with the light, with the people walking
          through it — and our job is to listen long enough to know
          which stems should speak.
        </p>

        <a
          href="#poison-contact"
          style={{
            ...bodyFont,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: TEAL,
            color: "#fff",
            padding: "8px 16px",
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 400,
            textDecoration: "none",
          }}
        >
          Read our story
        </a>
      </div>
    </section>
  );
}
