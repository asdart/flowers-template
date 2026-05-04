import type { CSSProperties } from "react";
import { motion } from "motion/react";
import poisonHero from "../../../../imports/poison-bloom-hero.png";
import { DualClipWordmark } from "../components/DualClipWordmark";
import {
  EASE_OVERSHOOT,
  EASE_PRIMARY,
  HERO_H,
  HERO_W,
  INK,
  SOFT_WONK,
  TEAL,
  TEAL_DARK,
  bodyFont,
  displayFont,
} from "../tokens";
import { pv } from "../utils";

/* ═══════════════════════════════════════════════════════════════
   HERO — desktop layered design + mobile stacked fallback.

   The defining gesture of the template: "Poison" + "Bloom." set
   in Fraunces Thin at 228px, layered behind and in front of a
   centred floral image. The black underlying layer is visible on
   the cream margins; the white duplicate is clipped to the image
   rectangle so the colour flips invisibly across the seam.

   Every absolute pixel value comes straight from the Figma
   reference frame (1374 × 936) and is converted to a viewport-
   aware unit via ph() so the section scales smoothly across every
   desktop breakpoint AND fits inside the viewport vertically.

   Why ph() instead of pv() in this section
   ────────────────────────────────────────
   pv(N) = N as a fraction of HERO_W expressed in vw. It only
   considers viewport WIDTH, so on viewports that are wider than
   they are tall (e.g. ~1024 × 540 laptop windows), pv(HERO_H) =
   936/1374 × 100 = 68.1 vw can exceed the viewport height —
   shoving the photo, body copy and CTA below the fold.

   ph(N) caps the unit at whichever of width/height is more
   constrained:

     unit = min(100vw / HERO_W, (100vh − NAV_H) / HERO_H)

   On wide/tall viewports the width term wins and ph(N) reduces
   exactly to pv(N). On short viewports the height term wins and
   the entire hero composition shrinks proportionally so it fits
   above the fold; the section's cream background letterboxes the
   shrunk content. */

/* Approximate height of the global Navbar (taken from Navbar.tsx
   — h-10 button + container padding). Used as the budget that
   has to be subtracted from 100vh before sizing the hero. */
const POISON_NAV_H = 80;

/* The CSS unit. All hero internals multiply against it via ph().
   Falls back to pv()'s width-only behaviour when it's the
   constraining axis. */
const HERO_UNIT = `min(calc(100vw / ${HERO_W}), calc((100vh - ${POISON_NAV_H}px) / ${HERO_H}))`;

/* px (Figma reference) → CSS expression in hero units. */
const ph = (n: number) => `calc(${n} * ${HERO_UNIT})`;

const IMG_W = 432;
const IMG_H = 600;
const IMG_TOP = Math.round((HERO_H - IMG_H) / 2);
const HERO_BOTTOM_INSET = HERO_H - (IMG_TOP + IMG_H);
const HERO_H_PH = ph(HERO_H);
const HERO_W_PH = ph(HERO_W);
const IMG_TOP_PH = ph(IMG_TOP);
const IMG_BOTTOM_PH = ph(HERO_BOTTOM_INSET);

/* Letter-spacing scaled with the unit. -0.45 vw at the design
   width of 1374 px ≈ -6.18 design-pixels; applying ph() keeps
   the same optical kerning ratio when the hero shrinks. */
const wordStyle: CSSProperties = {
  ...displayFont,
  fontWeight: 200,
  fontStyle: "normal",
  fontSize: ph(228),
  lineHeight: ph(228),
  letterSpacing: ph(-6.18),
  fontVariationSettings: SOFT_WONK,
  margin: 0,
  whiteSpace: "nowrap",
};

export function Hero() {
  return (
    <section
      id="poison-hero"
      style={{ backgroundColor: "var(--cream, #f2efea)", color: INK, overflow: "hidden" }}
      className="relative w-full"
    >
      {/* ───────────────────── DESKTOP LAYOUT ─────────────────────
          Three layers driven by the DualClipWordmark primitive:
          ink-coloured wordmarks behind, image in the middle,
          white-coloured wordmarks clipped to the image. The
          primitive's renderText prop produces both layers from
          the same closure so position, typography and slide
          animations stay perfectly synchronised.

          The block is sized to ph(HERO_W) × ph(HERO_H) and
          centred inside the full-width section. On wide/tall
          viewports ph() resolves to vw and the block fills the
          viewport edge-to-edge (identical to the previous w-full
          behaviour). On short viewports ph() switches to a
          height-derived unit and the block letterboxes against
          the section's cream background — keeping the photo,
          body copy and CTA above the fold. */}
      <div
        className="relative hidden md:block mx-auto"
        style={{ width: HERO_W_PH, height: HERO_H_PH }}
      >
        <DualClipWordmark
          imageSrc={poisonHero}
          imageAlt="Lily floral arrangement on orange backdrop"
          imageRect={{
            left: "50%",
            top: IMG_TOP_PH,
            width: ph(IMG_W),
            height: ph(IMG_H),
            translateX: "-50%",
          }}
          parentSize={{ width: HERO_W_PH, height: HERO_H_PH }}
          imageReveal
          imageKenBurns
          imageDelay={0.1}
          inkColor={INK}
          renderText={(color) => (
            <>
              {/* Both layers render motion.h1 with identical animations.
                  Layer 3 is wrapped in aria-hidden by DualClipWordmark,
                  so screen readers only announce the visible heading.

                  Slide-in offsets stay in vw via pv() — they're
                  motion-only values that just need to be "off
                  screen to one side"; not running them through
                  ph() avoids feeding calc() expressions to
                  Framer Motion (which prefers single-unit values
                  for clean keyframe interpolation). */}
              <motion.h1
                aria-label="Poison Bloom"
                className="absolute"
                style={{
                  ...wordStyle,
                  left: ph(80),
                  top: ph(172),
                  color,
                }}
                initial={{ x: pv(-110), opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 1.2,
                  ease: EASE_PRIMARY,
                }}
              >
                Poison
              </motion.h1>
              <motion.div
                aria-hidden
                className="absolute"
                style={{
                  ...wordStyle,
                  left: `calc(50% - ${ph(30)})`,
                  top: ph(444),
                  color,
                }}
                initial={{ x: pv(110), opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 1.4,
                  ease: EASE_PRIMARY,
                }}
              >
                Bloom.
              </motion.div>
            </>
          )}
        />

        {/* Body copy + dark teal CTA, bottom-left. Outside the
            DualClipWordmark stack because it's on neither layer.
            Position scales with the hero unit so the cluster
            stays visually anchored to the photo's bottom-left
            corner regardless of how much the hero shrinks. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.6, ease: EASE_PRIMARY }}
          className="absolute"
          style={{
            left: ph(80),
            bottom: IMG_BOTTOM_PH,
            width: ph(314),
            zIndex: 4,
          }}
        >
          <p
            style={{
              ...bodyFont,
              fontSize: 14,
              lineHeight: "24px",
              color: "#000",
              fontWeight: 300,
              marginBottom: 16,
            }}
          >
            Poison Bloom is a unique studio in botanical design. We see flowers
            as canvases for stories of sophistication. Our studio curates wild,
            poetic arrangements, going beyond the conventional with creative
            ingenuity.
          </p>
          <motion.a
            href="#poison-contact"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.9, ease: EASE_OVERSHOOT }}
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
            Get in touch
          </motion.a>
        </motion.div>
      </div>

      {/* ───────────────────── MOBILE LAYOUT ───────────────────── */}
      <div className="relative flex flex-col items-center overflow-hidden px-6 pb-16 pt-32 md:hidden">
        <motion.div
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          animate={{ clipPath: "inset(0 0% 0 0%)" }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
          className="relative w-full max-w-[360px] overflow-hidden"
          style={{ aspectRatio: "432 / 600", background: "#d9d9d9" }}
        >
          <motion.img
            src={poisonHero}
            alt="Lily floral arrangement on orange backdrop"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: EASE_PRIMARY }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.div>

        <h1
          aria-label="Poison Bloom"
          className="mt-10 text-center"
          style={{
            ...displayFont,
            fontWeight: 200,
            fontSize: "clamp(72px, 18vw, 120px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: INK,
            margin: "40px 0 0",
          }}
        >
          <motion.span
            initial={{ x: "-25%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: EASE_PRIMARY }}
            className="block"
          >
            Poison
          </motion.span>
          <motion.span
            initial={{ x: "25%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.4, ease: EASE_PRIMARY }}
            className="block"
          >
            Bloom.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6, ease: EASE_PRIMARY }}
          className="mt-10 w-full max-w-[360px]"
        >
          <p
            style={{
              ...bodyFont,
              fontSize: 14,
              lineHeight: "24px",
              color: "#000",
              fontWeight: 300,
              marginBottom: 16,
            }}
          >
            Poison Bloom is a unique studio in botanical design. We see flowers
            as canvases for stories of sophistication. Our studio curates wild,
            poetic arrangements, going beyond the conventional with creative
            ingenuity.
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
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
