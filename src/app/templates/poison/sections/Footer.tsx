import type { CSSProperties } from "react";
import { motion } from "motion/react";
import poisonBloomFooterStrip from "../../../../imports/poison-bloom-footer-strip.png";
import poisonOrchidIllustration from "../../../../imports/poison-orchid-illustration.png";
import { DualClipWordmark } from "../components/DualClipWordmark";
import { HairlineDivider } from "../components/HairlineDivider";
import {
  CREAM,
  EASE_PRIMARY,
  INK,
  SOFT_WONK,
  TEAL,
  bodyFont,
  displayFont,
} from "../tokens";
import { pv } from "../utils";

/* ═══════════════════════════════════════════════════════════════
   FOOTER — full-bleed dual-clip wordmark on a teal stage.

   Matches Figma "Global sections / Footer" (node 12510:7288, latest).

   Composition (vertical flex with gap:80 between blocks):
     1. Top metadata block — padding 80 all sides:
          • Studio block (411 wide)
          • 132 gap
          • Navigate / Get in touch / Follow us — 194 each, 78 gap
     2. 80 px gap (flex gap)
     3. Bottom container — exactly 296 px tall:
          • "Poison blooms" wordmark at top:0, font 152 / line-height 152
          • Floral strip at bottom:0, height 196 px (= 66.22% of container)
          • Wordmark and strip overlap from y=100 to y=152 (52 px) so the
            glyphs flip from INK above the strip to CREAM where they
            cross the floral image — same dual-clip primitive used by
            the hero.

   Background decoration: two orchid line-art illustrations rotated
   60° / -60° (mirrored) at 20% opacity sit half-off the edges. They
   fade in once on enter.

   Animation language matches the rest of the template:
     • Orchids — fade to 0.2 opacity over 1.6 s.
     • Columns — staggered fade-up.
     • Inner divider in studio block — scaleX hairline draw, ltr.
     • Strip — clip-path curtain reveal from centre on mount
       (DualClipWordmark autoplays).
     • Wordmark text — fade + slide-up on whileInView, identical
       motion props applied to both layers of the dual-clip so the
       seam between INK and CREAM stays invisible.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Figma reference frame ───────────────────────────────────── */
const STAGE_REF_W = 1440;

/* Bottom container in the Figma frame:
     • 296 px tall total
     • wordmark at top 0, font / line-height 152
     • strip anchored to the bottom, height 196
     • strip top inside the container = 100
     • strip top as a fraction of container = 100 / 296 = 33.78 %
     • strip height as a fraction = 196 / 296 = 66.22 %
   The wordmark+strip clip math uses these percentages so all four
   inset() values resolve in the same unit family. */
const BOTTOM_REF_H = 296;
const STRIP_TOP_PCT = `${((100 / BOTTOM_REF_H) * 100).toFixed(4)}%`;
const STRIP_HEIGHT_PCT = `${((196 / BOTTOM_REF_H) * 100).toFixed(4)}%`;

/* Wordmark typography. Letter-spacing -4 px / 152 px = -0.026 em. */
const WORDMARK_REF_FONT = 152;
const WORDMARK_REF_LH = 152;

/* ─── Type styles ─────────────────────────────────────────────── */

const wordmarkStyle: CSSProperties = {
  ...displayFont,
  fontWeight: 300,
  fontSize: `clamp(56px, ${((WORDMARK_REF_FONT / STAGE_REF_W) * 100).toFixed(4)}vw, ${WORDMARK_REF_FONT}px)`,
  lineHeight: `clamp(56px, ${((WORDMARK_REF_LH / STAGE_REF_W) * 100).toFixed(4)}vw, ${WORDMARK_REF_LH}px)`,
  letterSpacing: "-0.026em",
  fontVariationSettings: SOFT_WONK,
  margin: 0,
  width: "100%",
  textAlign: "center",
  whiteSpace: "nowrap",
  pointerEvents: "none",
};

const headerStyle: CSSProperties = {
  ...displayFont,
  fontWeight: 300,
  fontSize: 24,
  lineHeight: "32px",
  letterSpacing: "-1px",
  fontVariationSettings: SOFT_WONK,
  color: CREAM,
  margin: 0,
};

const bodyStyle: CSSProperties = {
  ...bodyFont,
  fontWeight: 300,
  fontSize: 14,
  lineHeight: "24px",
  fontVariationSettings: "'wdth' 100",
  color: CREAM,
  margin: 0,
};

const linkStyle: CSSProperties = {
  ...bodyStyle,
  textDecoration: "none",
  display: "inline-block",
  width: "fit-content",
  transition: "opacity 240ms ease",
};

/* ─── Content data ────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Studio", href: "#poison-about" },
  { label: "Services", href: "#poison-services" },
  { label: "About", href: "#poison-about" },
  { label: "Selected blooms", href: "#poison-selected-work" },
  { label: "Testimonials", href: "#poison-testimonials" },
  { label: "Contact", href: "#poison-contact" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/poisonbloom" },
  { label: "TikTok", href: "https://tiktok.com/@poisonbloom" },
  { label: "LinkedIn", href: "https://linkedin.com/company/poisonbloom" },
  { label: "Facebook", href: "https://facebook.com/poisonbloom" },
];

/* ─── Animation primitives ────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PRIMARY },
  },
} as const;

const columnGroup = (delay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: delay },
  },
});

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */

export function Footer() {
  return (
    <footer
      id="poison-footer"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: TEAL,
        color: CREAM,
        isolation: "isolate",
      }}
    >
      {/* ── Background orchid line-art ── */}
      <BackgroundOrchids />

      {/* ── Inner content stack: columns block + 80 gap + bottom ── */}
      <div
        className="relative flex flex-col"
        style={{
          zIndex: 1,
          gap: `clamp(40px, ${pv(80)}, 80px)`,
        }}
      >
        <TopColumns />
        <BottomWordmark />
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Background — two rotated orchid illustrations.
   ═══════════════════════════════════════════════════════════════ */

function BackgroundOrchids() {
  /* Figma puts these in 908×863 bounding boxes positioned half off
     each edge of the footer (left:-444 / right:-444 effective).
     We approximate by placing the rotated <img> centred vertically
     and pulled half off each side. The centred-vertical anchor reads
     as "decorative wash on the sides" the same way the source comp
     does, without porting Figma's specific top:104/112 offsets that
     are tied to its exact 786 px footer height. */
  const sharedStyle: CSSProperties = {
    position: "absolute",
    width: `clamp(280px, ${pv(587)}, 587px)`,
    height: `clamp(338px, ${pv(710)}, 710px)`,
    pointerEvents: "none",
    zIndex: 0,
    willChange: "opacity",
  };

  return (
    <>
      <motion.img
        src={poisonOrchidIllustration}
        alt=""
        aria-hidden
        draggable={false}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, ease: EASE_PRIMARY }}
        style={{
          ...sharedStyle,
          left: `clamp(-300px, ${pv(-260)}, -140px)`,
          top: "55%",
          transform: "translateY(-50%) rotate(60deg)",
          transformOrigin: "center center",
        }}
      />
      <motion.img
        src={poisonOrchidIllustration}
        alt=""
        aria-hidden
        draggable={false}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, ease: EASE_PRIMARY, delay: 0.15 }}
        style={{
          ...sharedStyle,
          right: `clamp(-300px, ${pv(-260)}, -140px)`,
          top: "55%",
          transform: "translateY(-50%) scaleX(-1) rotate(60deg)",
          transformOrigin: "center center",
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Top columns block.
   ═══════════════════════════════════════════════════════════════ */

function TopColumns() {
  return (
    <div
      className="relative mx-auto flex w-full flex-col items-start md:flex-row"
      style={{
        maxWidth: STAGE_REF_W,
        padding: `clamp(40px, ${pv(80)}, 80px)`,
        gap: `clamp(48px, ${pv(132)}, 132px)`,
      }}
    >
      <StudioColumn />

      <div
        className="flex w-full flex-col md:flex-row md:w-auto"
        style={{ gap: `clamp(32px, ${pv(78)}, 78px)` }}
      >
        <NavigateColumn />
        <ContactColumn />
        <FollowColumn />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Column 1 — Studio block.
   Header + tagline + scaleX hairline + copyright triplet.
   411 px wide in the source comp.
   ═══════════════════════════════════════════════════════════════ */

function StudioColumn() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={columnGroup(0.2)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
        maxWidth: 411,
        flexShrink: 0,
      }}
    >
      <motion.p variants={fadeUp} style={headerStyle}>
        Poison blooms
      </motion.p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <motion.p variants={fadeUp} style={bodyStyle}>
          A floral studio located in the heart of Lisbon, where creativity
          blooms freely yet with a subtle touch. Our designs are wild and
          natural, never overly decorative, capturing the essence of
          restrained beauty in every arrangement.
        </motion.p>

        {/* Inner hairline — animated scaleX draw left → right. */}
        <motion.div
          variants={fadeUp}
          style={{ position: "relative", height: 1, width: "100%" }}
        >
          <HairlineDivider
            direction="ltr"
            delay={0.1}
            duration={1.1}
            color="rgba(244, 239, 235, 0.55)"
            trigger="view"
            viewportMargin="-15%"
            style={{ position: "absolute", inset: 0 }}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <p style={bodyStyle}>© 2026</p>
          <p style={bodyStyle}>Poison blooms INC.</p>
          <p style={bodyStyle}>Let we flower it.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Column 2 — Navigate.
   194 px wide.
   ═══════════════════════════════════════════════════════════════ */

function NavigateColumn() {
  return (
    <motion.nav
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={columnGroup(0.3)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
        maxWidth: 194,
        flexShrink: 0,
      }}
    >
      <motion.p variants={fadeUp} style={headerStyle}>
        Navigate
      </motion.p>
      {NAV_LINKS.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          variants={fadeUp}
          style={linkStyle}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Column 3 — Get in touch.
   194 px wide.
   ═══════════════════════════════════════════════════════════════ */

function ContactColumn() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={columnGroup(0.4)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        maxWidth: 194,
        flexShrink: 0,
      }}
    >
      <motion.p variants={fadeUp} style={headerStyle}>
        Get in touch
      </motion.p>
      <motion.div
        variants={fadeUp}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <a href="mailto:studio@poisonbloom.com" style={linkStyle}>
          studio@poisonbloom.com
        </a>
        <a href="tel:+35121000000" style={linkStyle}>
          +351 21 000 0000
        </a>
      </motion.div>
      <motion.p variants={fadeUp} style={bodyStyle}>
        Rua das Flores, 24, 2º
        <br aria-hidden />
        1100-216 Lisbon, PT
      </motion.p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Column 4 — Follow us.
   194 px wide.
   ═══════════════════════════════════════════════════════════════ */

function FollowColumn() {
  return (
    <motion.nav
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={columnGroup(0.5)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
        maxWidth: 194,
        flexShrink: 0,
      }}
    >
      <motion.p variants={fadeUp} style={headerStyle}>
        Follow us
      </motion.p>
      {SOCIAL_LINKS.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
          style={linkStyle}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Bottom — dual-clip "Poison blooms" wordmark on a floral strip.

   296 px tall in the source comp:
     • wordmark at top:0, font 152, line-height 152 (= 152 px tall)
     • floral strip at bottom:0, height 196 (= 66.22 % of container)
     • wordmark crosses the strip from y=100 to y=152 → INK above,
       CREAM where it overlaps the floral image
   ═══════════════════════════════════════════════════════════════ */

function BottomWordmark() {
  /* Container height. clamp keeps the small end readable at narrow
     widths while letting the design hit its full editorial scale
     at 1440+. The clamp ratio matches the wordmark font clamp so
     the strip-overlap proportion stays stable across breakpoints. */
  const containerHeight = `clamp(160px, ${pv(BOTTOM_REF_H)}, ${BOTTOM_REF_H}px)`;

  /* Split-curtain entrance — the two layers travel in opposite
     directions and converge at the strip's top edge, where the
     dual-clip seam lives:
       • INK layer (dark, visible above the strip) slides UP from
         below. It starts one full line-height (= WORDMARK_REF_LH)
         below its anchor so it begins hidden behind the floral
         strip and rises into final position above the strip.
       • CREAM layer (light, clipped to the strip) slides DOWN from
         above. It starts one full line-height above its anchor so
         it begins above the clip region and drops into the strip
         area as it animates.
     The trigger lives on this parent <motion.div> rather than each
     layer's <motion.h2>. Layer 3 (CREAM) is rendered inside a
     pointer-events-none, clip-path-cropped wrapper, and pinning
     `whileInView` directly on that h2 made the IntersectionObserver
     unreliable — the CREAM layer would sometimes stay at its
     initial transform and never fade in. Lifting the trigger up to
     the un-clipped parent and propagating via variants guarantees
     both layers transition in sync no matter how aggressive the
     clip-path is on the inner wrapper. */
  const slide = WORDMARK_REF_LH;
  const inkVariants = {
    hidden: { opacity: 0, y: slide },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 0.6, ease: EASE_PRIMARY },
    },
  } as const;
  const creamVariants = {
    hidden: { opacity: 0, y: -slide },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 0.6, ease: EASE_PRIMARY },
    },
  } as const;

  return (
    <motion.div
      className="relative w-full"
      style={{ height: containerHeight }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      <DualClipWordmark
        imageSrc={poisonBloomFooterStrip}
        imageAlt=""
        imageRect={{
          left: "0%",
          top: STRIP_TOP_PCT,
          width: "100%",
          height: STRIP_HEIGHT_PCT,
        }}
        parentSize={{ width: "100%", height: containerHeight }}
        imageReveal
        imageKenBurns
        imageDelay={0.2}
        inkColor={INK}
        photoColor={CREAM}
        renderText={(color) => {
          const isInk = color === INK;
          return (
            <motion.h2
              variants={isInk ? inkVariants : creamVariants}
              style={{
                ...wordmarkStyle,
                color,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
              }}
            >
              Poison blooms
            </motion.h2>
          );
        }}
      />
    </motion.div>
  );
}
