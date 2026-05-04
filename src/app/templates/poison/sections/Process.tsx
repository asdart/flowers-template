import type { CSSProperties } from "react";
import { motion } from "motion/react";
import poisonProcessListen from "../../../../imports/poison-process-listen.png";
import flowerJpg from "../../../../imports/Flower.jpg";
import redFlowers from "../../../../imports/Red-Flowers.png";
import poisonBloomServices from "../../../../imports/poison-bloom-services.png";
import {
  CREAM,
  EASE_CURTAIN,
  EASE_PRIMARY,
  HAIRLINE,
  INK,
  SOFT_WONK,
  bodyFont,
  displayFont,
} from "../tokens";

/* ═══════════════════════════════════════════════════════════════
   PROCESS — "Our process" / Four movements behind every arrangement.

   Matches Figma "Global sections / Process" (node 12514:7599).

   Layout:
     • Cream stage, ink default text.
     • Section header at top: "Our process" Fraunces Thin 72/80
       paired with a 14/24 Open Sans subtitle.
     • Four rows below, each one title-on-left / body-on-right
       split with flex 1:1 and a 1 px hairline divider between rows.

   Interaction (one row at a time):
     • At rest the row is plain ink-on-cream typography.
     • On hover the row swaps to "active" mode:
         – the image container reveals bottom-to-top via a clip-path
           inset() animation (top inset 100 % → 0 %), so the image
           appears to grow upward out of the row's bottom edge like
           a curtain rising
         – the image breaks the section's 1440-px container and
           extends to full viewport width via the `left: 50 % ;
           width: 100vw ; translateX(-50 %)` full-bleed trick, so
           the photograph runs edge-to-edge instead of being capped
           at the typography column. The section itself gets
           `overflow-hidden` to keep the 100 vw layer from causing
           horizontal scroll
         – the image inside stays at its natural scale — no
           Ken-Burns transform — so the only motion the eye reads
           is the curtain rising and the text crossfading
         – text fades + flips dark→light synchronously with the
           reveal: same 0.7 s duration and EASE_CURTAIN curve as the
           clip-path so the colour change tracks the rising image
           edge. A symmetric opacity dip (1 → 0.55 → 1) overlays the
           colour interpolation, giving the swap the soft "cross-
           fade" feel the spec asks for instead of a hard lerp.
         – a 60 % black scrim sits above the image to keep the
           cream copy readable on any photograph.
       Hover-out plays the same clip-path in reverse on a tighter
       timing so the curtain falls back from the top down, and the
       colour eases back to ink with no opacity dip (cleaner on the
       way out).

   Each row carries its own background image so the four "movements"
   read as four distinct atmospheres while the typography stays
   identical. The hover state is implemented by Framer Motion variant
   propagation: `whileHover="hovered"` on the <li> cascades into the
   image layer's opacity, the <img>'s scale, and the content row's
   color. This means a single hover edge drives the whole flip and
   keeps the timings perfectly in sync.

   Entrance animations (staggered per row) follow the existing
   template language — ink-coloured title with a per-character
   bottom-mask reveal (same primitive as Selected Work) and a fade-up
   body paragraph.
   ═══════════════════════════════════════════════════════════════ */

type Step = {
  title: string;
  body: string;
  image: string;
};

const STEPS: Step[] = [
  {
    title: "Listen",
    body:
      "Every commission begins with a long conversation — about the room, the season, the people, the meal, the feeling we are reaching for. We take notes, build a moodboard, and only then talk flowers.",
    image: poisonProcessListen,
  },
  {
    title: "Compose",
    body:
      "We sketch the architecture of the arrangement before we touch a stem — heights, sightlines, the silhouettes that hold up under low light. Colour and material follow the form, never lead it.",
    image: redFlowers,
  },
  {
    title: "Craft",
    body:
      "Stems are sourced from a small group of growers we trust, conditioned for two days, then arranged by hand the morning of the event. Nothing leaves the studio until it has been seen at least three times.",
    image: flowerJpg,
  },
  {
    title: "Install",
    body:
      "On site we work quietly and finish early, leaving the room with time to breathe. After the event we return for a clean strike — the flowers go on to a hospital, a friend, a long second life.",
    image: poisonBloomServices,
  },
];

/* ─── Type styles ─────────────────────────────────────────────── */

const titleStyle: CSSProperties = {
  ...displayFont,
  fontWeight: 100,
  fontSize: "clamp(40px, 5vw, 72px)",
  lineHeight: "clamp(48px, 5.55vw, 80px)",
  letterSpacing: "-3px",
  fontVariationSettings: SOFT_WONK,
  margin: 0,
  color: "currentColor",
};

const bodyStyle: CSSProperties = {
  ...bodyFont,
  fontSize: 14,
  lineHeight: "24px",
  fontWeight: 300,
  fontVariationSettings: "'wdth' 100",
  margin: 0,
  color: "currentColor",
};

const subtitleStyle: CSSProperties = {
  ...bodyStyle,
  color: INK,
  maxWidth: 389,
};

/* ─── Animation primitives ────────────────────────────────────── */

/* Per-character bottom-mask reveal for the row title.
   Each glyph lives inside an overflow:hidden span and translates
   from y:110 % to y:0 % staggered by the parent. */
const titleCharMask = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1.0, ease: EASE_PRIMARY },
  },
} as const;

/* ═══════════════════════════════════════════════════════════════
   Single row.

   The <motion.li> is the hover surface. Its variants don't carry
   transform / opacity changes themselves (the children do); it
   exists purely to broadcast the named state ("hidden" → "visible"
   → "hovered") to its descendants.
   ═══════════════════════════════════════════════════════════════ */

function ProcessRow({
  step,
  index,
  isFirst,
}: {
  step: Step;
  index: number;
  isFirst: boolean;
}) {
  const baseDelay = 0.15 + index * 0.12;

  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      whileHover="hovered"
      viewport={{ once: true, margin: "-15%" }}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: baseDelay, staggerChildren: 0.06 },
        },
        hovered: {},
      }}
      className="group relative isolate w-full"
      style={{
        listStyle: "none",
        margin: 0,
        cursor: "pointer",
        borderTop: !isFirst ? `1px solid ${HAIRLINE}` : "none",
      }}
    >
      {/* ── Background image + dark scrim ──
          The wrapper's `clip-path: inset(top right bottom left)` is
          animated by Framer Motion. At rest the top inset is 100 %
          which fully clips the layer (no image visible). On hover
          the top inset transitions to 0 %, so the visible region
          grows upward from the row's bottom edge — the "curtain
          rising" reveal the user asked for. The wrapper also keeps
          `overflow: hidden` so the inner Ken-Burns scale never
          spills past the wrapper.

          Full-bleed positioning: the wrapper escapes the row's
          container by anchoring at `left: 50 %` and using a
          `translateX(-50 %)` with `width: 100vw`, so on hover the
          image runs edge-to-edge across the viewport rather than
          being capped at the typography column. The parent section
          carries `overflow-hidden` to absorb the spill and keep the
          page from scrolling horizontally. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 overflow-hidden"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          visible: {
            clipPath: "inset(100% 0% 0% 0%)",
            transition: { duration: 0.5, ease: EASE_CURTAIN },
          },
          hovered: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 0.7, ease: EASE_CURTAIN },
          },
        }}
        style={{
          /* Set the initial CSS so there's no flash before the first
             motion frame runs (Safari occasionally needs the value
             on the inline style as well as in the variant). */
          clipPath: "inset(100% 0% 0% 0%)",
          top: 0,
          bottom: 0,
          left: "50%",
          width: "100vw",
          transform: "translateX(-50%)",
        }}
      >
        <img
          src={step.image}
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* 60 % black scrim — keeps cream text legible over any
            photograph, and matches the Figma overlay exactly. */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        />
      </motion.div>

      {/* ── Content row ──
          Variants are sized to the image-reveal duration so the
          colour change tracks the rising curtain frame-for-frame.
          The opacity keyframes [1, 0.55, 1] introduce a midway dip
          that reads as a soft cross-fade between ink-on-cream and
          cream-on-image. Hover-out skips the dip and just lerps
          back so the row settles cleanly. */}
      <motion.div
        className="relative z-10 flex w-full flex-col items-stretch md:flex-row md:items-center md:justify-between"
        style={{
          padding: "clamp(24px, 4vw, 40px) 0",
          gap: "clamp(16px, 2.4vw, 32px)",
        }}
        variants={{
          hidden: { color: INK, opacity: 1 },
          visible: {
            color: INK,
            opacity: 1,
            transition: { duration: 0.5, ease: EASE_CURTAIN },
          },
          hovered: {
            color: CREAM,
            opacity: [1, 0.55, 1],
            transition: {
              duration: 0.7,
              ease: EASE_CURTAIN,
              times: [0, 0.5, 1],
            },
          },
        }}
      >
        {/* Title — per-character bottom-mask reveal. */}
        <motion.h3
          aria-label={step.title}
          style={{ ...titleStyle, flex: "1 1 0", minWidth: 0 }}
        >
          {step.title.split("").map((char, i) => (
            <span
              key={`${step.title}-${i}`}
              aria-hidden
              className="relative inline-block overflow-hidden align-baseline"
              style={{ paddingBottom: "0.16em" }}
            >
              <motion.span
                variants={titleCharMask}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </motion.h3>

        {/* Body — fade-up with the row stagger. */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, ease: EASE_PRIMARY },
            },
          }}
          style={{
            ...bodyStyle,
            flex: "1 1 0",
            maxWidth: 460,
            minWidth: 0,
          }}
        >
          {step.body}
        </motion.p>
      </motion.div>
    </motion.li>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Section
   ═══════════════════════════════════════════════════════════════ */

export function Process() {
  return (
    <section
      id="poison-process"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1440,
          padding: "clamp(64px, 9.6vw, 144px) clamp(24px, 5.6vw, 80px)",
        }}
      >
        {/* ── Header ── */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          variants={{
            hidden: {},
            visible: {
              transition: { delayChildren: 0.1, staggerChildren: 0.12 },
            },
          }}
          className="flex flex-col items-start"
          style={{
            gap: 32,
            maxWidth: 801,
            marginBottom: "clamp(40px, 4vw, 56px)",
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.2, ease: EASE_PRIMARY },
              },
            }}
            style={titleStyle}
          >
            Our process
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: EASE_PRIMARY },
              },
            }}
            style={subtitleStyle}
          >
            Four movements behind every arrangement.
          </motion.p>
        </motion.header>

        {/* ── Rows ── */}
        <ol
          className="relative w-full"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {STEPS.map((step, i) => (
            <ProcessRow
              key={step.title}
              step={step}
              index={i}
              isFirst={i === 0}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
