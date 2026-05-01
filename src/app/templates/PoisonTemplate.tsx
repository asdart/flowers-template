import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import poisonHero from "../../imports/poison-bloom-hero.png";
import poisonServices from "../../imports/poison-bloom-services.png";
import poisonIllustration from "../../imports/poison-bloom-illustration.png";
import poisonOrchidIllustration from "../../imports/poison-orchid-illustration.png";
import poisonOrchidCarousel from "../../imports/poison-orchid-carousel.png";

/* ─────────────────────────────────────────────────────────────
   Poison Bloom — editorial cream studio.
   Typography: Fraunces Thin (display) / Open Sans (body).
   The wordmarks read black on the cream background and white
   where they overlap the centered floral image — a single
   glyph in two colors. Achieved by layering: black text → image →
   white text clipped to the image rectangle.
   ───────────────────────────────────────────────────────────── */

const CREAM = "#f2efea";
const INK = "#140a05";
const TEAL = "#0e525f";

const displayFont = { fontFamily: "var(--font-display)" };
const bodyFont = { fontFamily: "'Open Sans', system-ui, sans-serif" };

const HERO_H = 936;
const IMG_W = 432;
const IMG_H = 600;
const IMG_TOP = Math.round((HERO_H - IMG_H) / 2); // 168 — vertically centered
const IMG_HALF_W = IMG_W / 2; // 216
const HERO_BOTTOM_INSET = HERO_H - (IMG_TOP + IMG_H); // 168

/* ═══════════════════════════════════════════════════════════════
   HERO — desktop layered design + mobile stacked fallback
   ═══════════════════════════════════════════════════════════════ */
function PoisonHero() {
  /* Track the outer wrapper width so we can scale the fixed-pixel
     canvas proportionally on viewports wider than 1374 px. */
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      setScale(Math.max(1, el.offsetWidth / 1374));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaledHeroH = Math.ceil(HERO_H * scale);

  const wordStyle: React.CSSProperties = {
    ...displayFont,
    fontWeight: 200,
    fontStyle: "normal",
    fontSize: 228,
    lineHeight: "228px",
    letterSpacing: "-6.18px",
    fontVariationSettings: "'SOFT' 0, 'WONK' 1",
    margin: 0,
  };

  return (
    <section
      style={{ backgroundColor: CREAM, color: INK, overflow: "hidden" }}
      className="relative w-full"
    >
      {/* ───────────────────── DESKTOP LAYOUT ─────────────────────
          The inner canvas is the original 1374 × 936 px Figma frame.
          It is scaled up proportionally (transform: scale) whenever the
          viewport is wider than 1374 px, so the font grows, the image
          expands, and the body copy shifts down — all in lock-step.
          ───────────────────────────────────────────────────────── */}
      <div
        ref={outerRef}
        className="relative hidden md:block w-full"
        style={{ height: scaledHeroH }}
      >
        {/* Scaled canvas — all child layers keep their original pixel
            coordinates; only this wrapper grows. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            marginLeft: -(1374 / 2),
            width: 1374,
            height: HERO_H,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {/* Layer 1 — Black wordmarks on the cream background. */}
          <motion.h1
            aria-label="Poison Bloom"
            className="absolute"
            style={{ ...wordStyle, left: 80, top: 172, color: INK, zIndex: 1 }}
            initial={{ x: -110, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Poison
          </motion.h1>
          <motion.h1
            aria-hidden
            className="absolute"
            style={{ ...wordStyle, left: "calc(50% - 30px)", top: 444, color: INK, zIndex: 1 }}
            initial={{ x: 110, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Bloom.
          </motion.h1>

          {/* Layer 2 — Centered floral image. */}
          <motion.div
            initial={{ clipPath: "inset(0 50% 0 50%)" }}
            animate={{ clipPath: "inset(0 0% 0 0%)" }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
            className="absolute"
            style={{
              left: "50%",
              top: IMG_TOP,
              transform: "translateX(-50%)",
              width: IMG_W,
              height: IMG_H,
              zIndex: 2,
              overflow: "hidden",
              background: "#d9d9d9",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 28,
                delay: 3.0,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <motion.img
                src={poisonHero}
                alt="Lily floral arrangement on orange backdrop"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Layer 3 — White wordmarks clipped to the image rectangle. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 3,
              clipPath: `inset(${IMG_TOP}px calc(50% - ${IMG_HALF_W}px) ${HERO_BOTTOM_INSET}px calc(50% - ${IMG_HALF_W}px))`,
            }}
          >
            <motion.h1
              aria-hidden
              className="absolute"
              style={{ ...wordStyle, left: 80, top: 172, color: "#fff" }}
              initial={{ x: -110, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Poison
            </motion.h1>
            <motion.h1
              aria-hidden
              className="absolute"
              style={{ ...wordStyle, left: "calc(50% - 30px)", top: 444, color: "#fff" }}
              initial={{ x: 110, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Bloom.
            </motion.h1>
          </div>

          {/* Layer 4 — Body copy + dark teal CTA, bottom-left. */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
            style={{ left: 80, bottom: HERO_BOTTOM_INSET, width: 314, zIndex: 4 }}
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
              transition={{
                duration: 0.6,
                delay: 2.9,
                ease: [0.34, 1.56, 0.64, 1],
              }}
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
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#073b45")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = TEAL)}
            >
              Get in touch
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ───────────────────── MOBILE LAYOUT ───────────────────── */}
      <div className="relative flex flex-col items-center overflow-hidden px-6 pb-16 pt-32 md:hidden">
        {/* Image first — horizontal curtain expand from center */}
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
            transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </motion.div>

        {/* Wordmark stacked below — slide in after image is revealed */}
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
            transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Poison
          </motion.span>
          <motion.span
            initial={{ x: "25%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Bloom.
          </motion.span>
        </h1>

        {/* Copy + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
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

/* ═══════════════════════════════════════════════════════════════
   SERVICES — Header + 3 image-card grid.
   Animations mirror the hero language:
     · Big title slides in from the left + fades in (1.5s, slow ease)
     · Body copy fades up
     · Each card image uses the horizontal-curtain clip-path reveal
       from the centerline, staggered 0.15s between cards
     · Each card's label and body fade up after its image lands
   All driven by `whileInView` so they fire when the section
   scrolls into view.
   ═══════════════════════════════════════════════════════════════ */

type Service = {
  title: string;
  body: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    title: "Weddings",
    body:
      "From intimate ceremonies to sweeping receptions, we design complete floral experiences tailored to your story — from arbors and bouquets to tablescapes and lasting installations.",
    image: poisonHero,
  },
  {
    title: "Brand activations",
    body:
      "Bold botanical environments built for editorial shoots, press events, and campaign launches. We translate brand language into sculptural floral worlds your audience remembers.",
    image: poisonServices,
  },
  {
    title: "Set Design",
    body:
      "Film, photography, and experiential sets treated as living compositions. Every stem is chosen to move the narrative forward and hold up under the lens.",
    image: poisonServices,
  },
];

function PoisonServices() {
  /* viewport-once trigger: animations play the first time the
     section enters view. `margin: "-15%"` waits until the section is
     a comfortable distance into the viewport before firing. */
  const inViewProps = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-15%" },
  } as const;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1374,
          padding: "96px 80px",
        }}
      >
        {/* ───────────────────── HEADER ───────────────────── */}
        <motion.div
          {...inViewProps}
          variants={{ hidden: {}, visible: {} }}
          className="flex flex-col items-start gap-8"
          style={{ maxWidth: 801 }}
        >
          {/* Big title — slow slide-and-fade from the left, same
              language as the hero wordmarks. */}
          <motion.h2
            variants={{
              hidden: { x: -110, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            style={{
              ...displayFont,
              fontWeight: 200,
              fontSize: "clamp(40px, 5.6vw, 72px)",
              lineHeight: 1.11,
              letterSpacing: "-3px",
              color: INK,
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
              margin: 0,
            }}
          >
            Personalized floral strategies for your most meaningful moments.
          </motion.h2>

          {/* Body copy — fade-up, follows the title */}
          <motion.p
            variants={{
              hidden: { y: 24, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.9,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            style={{
              ...bodyFont,
              fontSize: 14,
              lineHeight: "24px",
              color: "#000",
              fontWeight: 300,
              maxWidth: 389,
              margin: 0,
            }}
          >
            Poison Bloom is a unique studio in botanical design. We see flowers
            as canvases for stories of sophistication. Our studio curates wild,
            poetic arrangements, going beyond the conventional with creative
            ingenuity.
          </motion.p>
        </motion.div>

        {/* ───────────────────── CARDS ───────────────────── */}
        <motion.div
          {...inViewProps}
          variants={{ hidden: {}, visible: {} }}
          className="mt-14 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-3 md:gap-6"
        >
          {SERVICES.map((service, i) => {
            const baseDelay = 0.8 + i * 0.15;
            return (
              <div key={service.title} className="flex flex-col gap-6">
                {/* Image — horizontal curtain reveal from the centerline,
                    plus a subtle initial scale settle (1.06 → 1) */}
                <motion.div
                  variants={{
                    hidden: { clipPath: "inset(0 50% 0 50%)" },
                    visible: {
                      clipPath: "inset(0 0% 0 0%)",
                      transition: {
                        duration: 1.0,
                        delay: baseDelay,
                        ease: [0.65, 0, 0.35, 1],
                      },
                    },
                  }}
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "389 / 509",
                    background: "#d9d9d9",
                  }}
                >
                  <motion.img
                    src={service.image}
                    alt=""
                    aria-hidden
                    variants={{
                      hidden: { scale: 1.06 },
                      visible: {
                        scale: 1,
                        transition: {
                          duration: 1.6,
                          delay: baseDelay,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </motion.div>

                {/* Label + Body */}
                <div
                  style={{
                    backgroundColor: "rgba(242, 239, 234, 1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    padding: 0,
                  }}
                >
                  <motion.h3
                    variants={{
                      hidden: { y: 24, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.9,
                          delay: baseDelay + 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                    style={{
                      ...displayFont,
                      fontWeight: 300,
                      fontSize: 20,
                      lineHeight: "28px",
                      letterSpacing: "-1px",
                      color: INK,
                      fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                      margin: 0,
                    }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    variants={{
                      hidden: { y: 18, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.9,
                          delay: baseDelay + 0.7,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                    style={{
                      ...bodyFont,
                      fontSize: 14,
                      lineHeight: "24px",
                      color: "#000",
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {service.body}
                  </motion.p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SELECTED WORK — Editorial display title with botanical line-art
   illustration behind it. The title performs a word-by-word
   vertical reveal (each word clipped in its own mask, slides up
   from y: 110% → 0%, staggered). The illustration fades in once
   the section enters view AND drifts vertically with the page
   scroll for a calm parallax effect.

   Animation language matches the rest of Poison Bloom:
     · Slow, low-energy easing  [0.16, 1, 0.3, 1]
     · Long durations (1.0–1.4s) for the hero feel
     · Subhead arrives a beat after the title finishes resolving
   ═══════════════════════════════════════════════════════════════ */
function PoisonSelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax driven by section scroll. `start end` = section top
     hits viewport bottom; `end start` = section bottom leaves
     viewport top. Mapping the resulting 0 → 1 progress to a
     gentle ±100 px range gives a subtle drift without ever
     dominating the typography. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const illustrationY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const TITLE_WORDS = ["Our", "selected", "blooms"] as const;

  /* Title reveal — parent stagger orchestrates each word. Each
     word lives in its own `overflow-hidden` mask; the inner span
     translates from y: 110% → 0%. */
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
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
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
        {/* Botanical illustration — full-section centered backdrop.
            mix-blend-multiply lets the cream show through the
            warm whites of the pencil sketch while preserving the
            dark line work. y is driven by scroll for parallax;
            opacity fades in via whileInView once. */}
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
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={poisonIllustration}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        </motion.div>

        {/* Display title — orchestrates per-word reveal. */}
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
            fontVariationSettings: "'SOFT' 0, 'WONK' 1",
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
              /* paddingBottom prevents descender clipping from the
                 mask when the WONK variant kicks the tails of g/y
                 below the baseline. */
              style={{ paddingBottom: "0.14em" }}
            >
              <motion.span variants={titleWord} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* Subhead — fades up a beat after the title resolves. */}
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
          transition={{
            duration: 0.9,
            delay: 1.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          See our best collections of poison blooms.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURE — full-bleed → grid scroll story.

   A sticky-pinned canvas that drives one continuous scroll-
   scrubbed reveal. The image is fully visible from progress 0
   (no entry animation), then:

     0.00 → 0.65  ONE fluid shrink from full-bleed (100vw × 100vh)
                  straight to the final grid-tile size
                  (27.64vw × 69.375vh). No mid-stops, no waypoint
                  holds — the proportions naturally pass through a
                  framed-card moment without ever pausing, so the
                  user feels a single uninterrupted gesture.
     0.65 → 1.00  Dwell — peripheral collage already visible at
                  its final positions (revealed naturally as the
                  shrinking center image stops covering them).

   Section height is 250vh (150vh of scroll travel), kept
   intentionally short so the gesture costs the user as little
   scroll effort as possible. A perpetual Ken-Burns breath
   (1 ↔ 1.04, 28s mirror) runs through every phase so the
   photograph never feels frozen. Scrolling back up rewinds
   every transform naturally because every value is
   `useTransform` over the same scroll `MotionValue`.

   Peripheral slot coordinates and the final center-tile size
   are exact 4-decimal vw/vh fractions of the Figma 1440 × 960
   reference frame (12446:7262), so adjacent edges align to the
   sub-pixel on any viewport (top row tops at 15.3125vh, bottom
   row bottoms at 84.6875vh, etc.).
   ═══════════════════════════════════════════════════════════════ */

/* Final center-tile size — exact Figma fractions (398/1440,
   666/960). Flex-centering puts it at the center slot of the
   reference grid frame. */
const FEATURE_FINAL_W_VW = 27.6389;
const FEATURE_FINAL_H_VH = 69.375;

/* Six peripheral collage slots — viewport-relative positions
   translated from the Figma 12446:7262 frame (1440 × 960, content
   inset 112 / 147). 4-decimal vw/vh fractions ensure the top-row
   tops align with the feature tile's top edge (15.3125vh) and
   bottom-row bottoms align with its bottom edge on any viewport. */
const PERIPHERAL_SLOTS: Array<{
  left: string;
  top: string;
  width: string;
  height: string;
}> = [
  /* top-left tall (Rect 154) — abs (239, 147), 250 × 321 */
  { left: "16.5972vw", top: "15.3125vh", width: "17.3611vw", height: "33.4375vh" },
  /* top-right square (Rect 151) — abs (951, 147), 258 × 258 */
  { left: "66.0417vw", top: "15.3125vh", width: "17.9167vw", height: "26.875vh" },
  /* right-mid wide (Rect 152/154) — abs (951, 429), 377 × 212 */
  { left: "66.0417vw", top: "44.6875vh", width: "26.1806vw", height: "22.0833vh" },
  /* bottom-left far (Rect 155) — abs (112, 492), 212 × 177 */
  { left: "7.7778vw", top: "51.25vh", width: "14.7222vw", height: "18.4375vh" },
  /* bottom-left tall (Rect 156) — abs (348, 492), 141 × 321 */
  { left: "24.1667vw", top: "51.25vh", width: "9.7917vw", height: "33.4375vh" },
  /* bottom-right small (Rect 153) — abs (951, 665), 141 × 148 */
  { left: "66.0417vw", top: "69.2708vh", width: "9.7917vw", height: "15.4167vh" },
];

/* Peripheral images — curated editorial florals matching the
   Figma reference (a yellow dahlia, pink peonies, white bokeh,
   azaleas, orange dusk). The Figma asset server returned errors
   for all six exports, so we use the same Unsplash editorial
   mix the previous immersive gallery used. */
const PERIPHERAL_IMAGES: string[] = [
  /* TL tall — pink ethereal */
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2400&auto=format&fit=crop",
  /* TR square — warm yellow bloom */
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2400&auto=format&fit=crop",
  /* MR wide — pink wash */
  "https://images.unsplash.com/photo-1487530811176-3780de880c2d?q=80&w=2400&auto=format&fit=crop",
  /* BL small — white bokeh */
  poisonServices,
  /* ML tall — pink garden */
  poisonHero,
  /* BR small — orange dusk */
  poisonServices,
];

function PoisonFeature() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Sticky scroll: section top hits viewport top → progress 0;
     section bottom hits viewport bottom → progress 1. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Feature image size — single continuous shrink from full-
     bleed straight to the final grid-tile size. No mid holds,
     no waypoint stops — the user feels one fluid gesture from
     the moment scroll starts inside the section. */
  const featureWidth = useTransform(
    scrollYProgress,
    [0, 0.65],
    ["100vw", `${FEATURE_FINAL_W_VW}vw`],
  );
  const featureHeight = useTransform(
    scrollYProgress,
    [0, 0.65],
    ["100vh", `${FEATURE_FINAL_H_VH}vh`],
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ backgroundColor: CREAM, height: "250vh" }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: CREAM }}
      >
        {/* Peripheral collage — rendered immediately at full
            opacity. They sit BEHIND the feature image (no z-index
            needed; the feature wrapper is z-10) so they're hidden
            during the full-bleed phase and gradually revealed at
            their final positions as the center image shrinks. */}
        {PERIPHERAL_SLOTS.map((slot, i) => {
          const src = PERIPHERAL_IMAGES[i];
          if (!src) return null;
          return (
            <div
              key={`peripheral-${i}`}
              className="pointer-events-none absolute overflow-hidden"
              style={slot}
            >
              <img
                src={src}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}

        {/* Feature image — immediately visible, no reveal
            animation. Scroll drives the size transition only. */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            className="relative overflow-hidden"
            style={{
              width: featureWidth,
              height: featureHeight,
              willChange: "width, height",
            }}
          >
            {/* Ken-Burns perpetual breath. */}
            <motion.div
              className="h-full w-full"
              style={{ willChange: "transform" }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 28,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <img
                src={poisonHero}
                alt="Lily floral arrangement on orange backdrop"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS — "Trusted by flower lovers"

   Layout (Figma 12457:45289):
     · Cream section, 80px padding, justify-center vertically.
     · Centered orchid line-art illustration behind everything,
       1440 × 960 ref, mix-blend-multiply, parallax-drifts.
     · Header row at top of inner wrapper — "Trusted by flower
       lovers" label (Fraunces Thin 20px) on the left, "01/05"
       page counter (Open Sans 14px) on the right.
     · Single bordered card below filling remaining space (the
       wrapper is flex 1 0 0, capped at max-h 480px). Card:
       cream background, 1px ink/20% border, 24px padding,
       quote pinned top, author info bottom-left, navigation
       arrows bottom-right.

   Reveal animation (single composed entrance):
     · Orchid "blooms in" — scale 1.06 → 1, opacity 0 → 0.42,
       1.8s eased. After it lands, drifts ±140px on scroll.
     · Header label slides in from the left, counter from the
       right (300-400ms staggered).
     · Card frame draws as four sequential 1px strokes — top
       (0.6-1.15s), right (1.15-1.7s), bottom (1.7-2.25s),
       left (2.25-2.8s). 0.55s per stroke handing off corner-
       to-corner so the perimeter feels inked in by hand.
     · Quote zone fades in at 2.55s, footer (author + arrows)
       fades up at 2.75s — the empty frame fills from inside
       once the border has closed.

   Carousel:
     · 5 entries — matches the 01/05 page counter from Figma.
     · Prev/Next clamp at endpoints; the disabled-side arrow
       icon dims to 20% opacity per the Figma spec.
     · Slide changes use AnimatePresence with mode="wait" and
       direction-aware Y shifts: going next → outgoing slides
       up, incoming rises from below; going prev reverses.
     · Counter "01" → "02" ticks via the same direction-aware
       AnimatePresence beat.
     · Keyboard left/right arrows are bound while the section
       is mounted.

   Micro-interactions:
     · Arrow buttons: on hover, the icon nudges 3px in its
       travel direction (left arrow → −3px, right arrow → +3px)
       and the button surface tints to a soft taupe.
   ═══════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote:
      "Insider's attention to detail is unmatched. From the moment we arrived, everything was perfectly planned, yet it felt like we were discovering the island on our own. The personal touches and insider tips made all the difference.",
    name: "Taryn M.",
    location: "Dallas - USA",
  },
  {
    quote:
      "Every arrangement felt intentional, alive, and unmistakably ours. The team translated a single moodboard into a six-week journey, refining color and form until each centerpiece carried its own quiet personality.",
    name: "Marcus F.",
    location: "Brooklyn - USA",
  },
  {
    quote:
      "Working with Poison Bloom is the closest thing to commissioning a painting. The studio's restraint and curation made our launch event feel less like decoration and more like a curated exhibition that guests slowly explored.",
    name: "Isabella N.",
    location: "São Paulo - BR",
  },
  {
    quote:
      "I've worked with florists before, but never one that read between the lines so well. They captured the emotional register of the brief and turned it into something both architectural and tender, with light, restraint, and grace.",
    name: "Olivia R.",
    location: "London - UK",
  },
  {
    quote:
      "Poison Bloom built our wedding florals around a single line in our brief — \u201clike a forest at dusk\u201d — and somehow returned with arrangements that felt remembered rather than designed. Our guests are still asking about the orchids.",
    name: "Hugo & Lior",
    location: "Lisbon - PT",
  },
] as const;

/* Source SVG points downward (path runs y=0.75 → y=16.75). The
   button rotates the SVG to point left or right, and a wrapping
   span applies the hover translateX nudge. */
function TestimonialArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 11.5 17.5"
      width="11.5"
      height="17.5"
      fill="none"
      style={{
        transform: direction === "left" ? "rotate(90deg)" : "rotate(-90deg)",
        transformOrigin: "center",
      }}
      aria-hidden
    >
      <path
        d="M5.75 16.75 L5.75 0.75"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 11.75 C10.75 11.75 7.0676 16.75 5.75 16.75 C4.4324 16.75 0.75 11.75 0.75 11.75"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TestimonialNavButton({
  direction,
  onClick,
  disabled,
  hideLeftBorder,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  hideLeftBorder?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered && !disabled;
  /* Travel-direction nudge — left arrow shifts left, right arrow
     shifts right. Mirrors the action the click will perform. */
  const shift = active ? (direction === "left" ? -3 : 3) : 0;
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous testimonial" : "Next testimonial"}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        width: 48,
        height: 48,
        backgroundColor: active ? "rgba(20, 10, 5, 0.05)" : CREAM,
        borderTop: "1px solid rgba(20, 10, 5, 0.2)",
        borderRight: "1px solid rgba(20, 10, 5, 0.2)",
        borderBottom: "1px solid rgba(20, 10, 5, 0.2)",
        borderLeft: hideLeftBorder ? "none" : "1px solid rgba(20, 10, 5, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: INK,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.4s ease",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.2 : 1,
          transform: `translateX(${shift}px)`,
          transition:
            "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
        }}
      >
        <TestimonialArrow direction={direction} />
      </span>
    </button>
  );
}

function PoisonTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  /* +1 → user advanced (next), -1 → user went back. Drives the
     direction-aware Y shift inside AnimatePresence. */
  const [direction, setDirection] = useState<1 | -1>(1);

  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const goPrev = () => {
    if (isFirst) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };
  const goNext = () => {
    if (isLast) return;
    setDirection(1);
    setIndex((i) => i + 1);
  };

  /* Keyboard navigation while the section is mounted. Effect
     re-runs when the endpoints change so the closure always
     reads up-to-date `isFirst` / `isLast`. */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !isFirst) {
        setDirection(-1);
        setIndex((i) => i - 1);
      } else if (e.key === "ArrowRight" && !isLast) {
        setDirection(1);
        setIndex((i) => i + 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFirst, isLast]);

  /* Parallax — orchid drifts ±140px across the scroll runway,
     a more pronounced version of PoisonSelectedWork's gesture so
     the line work feels alive behind the carousel. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const illustrationY = useTransform(scrollYProgress, [0, 1], [-140, 140]);

  /* Direction-aware Y shifts — going next: outgoing slides up,
     incoming rises from below. Going prev reverses both. */
  const slideEnterY = direction === 1 ? 14 : -14;
  const slideExitY = direction === 1 ? -14 : 14;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <div
        className="relative mx-auto flex flex-col items-stretch justify-center"
        style={{
          maxWidth: 1440,
          padding: "clamp(40px, 5.6vw, 80px)",
          gap: 16,
          minHeight: "100vh",
        }}
      >
        {/* Background orchid — split into two layers so the
            Tailwind centering transform (translate -50%) doesn't
            collide with motion's parallax / scale transforms.

            · Outer wrapper: pure CSS centering. Static.
            · Inner motion: parallax y (±140px on scroll), bloom-in
              scale 1.06 → 1 + opacity 0 → 0.42 once on enter,
              mix-blend-multiply so the line work prints into
              the cream. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "min(1440px, 100%)",
            aspectRatio: "1440 / 960",
          }}
        >
          <motion.div
            className="relative h-full w-full"
            style={{
              mixBlendMode: "multiply",
              y: illustrationY,
              willChange: "transform, opacity",
            }}
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 0.42, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={poisonOrchidCarousel}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Inner content wrapper — flex 1 0 0 capped at 480px tall
            (Figma 12457:45320). Header + card stack with 16px gap. */}
        <div
          className="relative flex w-full flex-col items-stretch"
          style={{ gap: 16, flex: "1 0 0", maxHeight: 480, minHeight: 0 }}
        >
          {/* Header row — label slides in from left, counter from
              right. Counter ticks per slide change inside its own
              AnimatePresence. */}
          <div
            className="relative flex w-full items-baseline justify-between"
            style={{ whiteSpace: "nowrap" }}
          >
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...displayFont,
                fontWeight: 100,
                fontSize: 20,
                lineHeight: "28px",
                letterSpacing: "-1px",
                fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                color: INK,
                margin: 0,
              }}
            >
              Trusted by flower lovers
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...bodyFont,
                fontSize: 14,
                lineHeight: "24px",
                fontWeight: 300,
                color: INK,
                display: "inline-flex",
                alignItems: "baseline",
              }}
            >
              {/* Fixed 2ch wide masked window — keeps "01/05"
                  perfectly aligned as the leading digit ticks. */}
              <span
                aria-live="polite"
                aria-atomic
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "2ch",
                  textAlign: "right",
                  overflow: "hidden",
                  height: "24px",
                }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={index}
                    initial={{ y: slideEnterY, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: slideExitY, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "inline-block" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>/{String(total).padStart(2, "0")}</span>
            </motion.div>
          </div>

          {/* Card — perimeter draws as four sequential 1px strokes:
              top (left → right), right (top → bottom), bottom (right
              → left), left (bottom → top). The frame builds in a
              continuous loop around the card; content fades in after
              the loop closes. The card itself has no CSS border —
              the four `<motion.span>` strokes below are the border. */}
          <motion.div
            className="relative flex w-full flex-col items-stretch justify-between overflow-hidden"
            style={{
              flex: "1 1 0",
              backgroundColor: CREAM,
              padding: 24,
              minHeight: 0,
            }}
          >
            {/* Top stroke — origin top-left, scaleX 0 → 1 (draws
                left → right). Explicit display:block + percentage
                origin avoids any inline-span + keyword origin
                inconsistencies. */}
            <motion.span
              aria-hidden
              className="pointer-events-none"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                display: "block",
                backgroundColor: "rgba(20, 10, 5, 0.2)",
                transformOrigin: "0% 0%",
                willChange: "transform",
                zIndex: 2,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.55, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Right stroke — origin top-right, scaleY 0 → 1
                (draws top → bottom). */}
            <motion.span
              aria-hidden
              className="pointer-events-none"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: 1,
                display: "block",
                backgroundColor: "rgba(20, 10, 5, 0.2)",
                transformOrigin: "100% 0%",
                willChange: "transform",
                zIndex: 2,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.55, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Bottom stroke — origin bottom-right, scaleX 0 → 1
                (draws right → left). */}
            <motion.span
              aria-hidden
              className="pointer-events-none"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 1,
                display: "block",
                backgroundColor: "rgba(20, 10, 5, 0.2)",
                transformOrigin: "100% 100%",
                willChange: "transform",
                zIndex: 2,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.55, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Left stroke — origin bottom-left, scaleY 0 → 1
                (draws bottom → top). */}
            <motion.span
              aria-hidden
              className="pointer-events-none"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: 1,
                display: "block",
                backgroundColor: "rgba(20, 10, 5, 0.2)",
                transformOrigin: "0% 100%",
                willChange: "transform",
                zIndex: 2,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.55, delay: 2.25, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Quote zone — fills remaining card height. Text
                aligns top within the available space. Fades in
                once after the border has finished drawing. */}
            <motion.div
              className="relative w-full"
              style={{ flex: "1 1 auto", minHeight: 0 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: 2.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={index}
                  initial={{ y: slideEnterY, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: slideExitY, opacity: 0 }}
                  transition={{
                    y: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  }}
                  style={{
                    ...displayFont,
                    fontWeight: 100,
                    fontSize: "clamp(22px, 2.78vw, 40px)",
                    lineHeight: 1.2,
                    letterSpacing: "-1px",
                    fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                    color: INK,
                    margin: 0,
                  }}
                >
                  &ldquo;{current.quote}&rdquo;
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Footer row — author block (left) / arrow pair (right).
                Author block crossfades on slide change. The whole row
                fades up once the border has finished drawing, so the
                empty frame fills bottom-up after the perimeter closes. */}
            <motion.div
              className="relative flex w-full items-end justify-between"
              style={{ gap: 24, marginTop: 16 }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: 2.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  position: "relative",
                  flex: "1 1 auto",
                  minWidth: 0,
                  minHeight: 52,
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    initial={{ y: slideEnterY, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: slideExitY, opacity: 0 }}
                    transition={{
                      y: { duration: 0.6, delay: 0.04, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.45, delay: 0.04, ease: [0.16, 1, 0.3, 1] },
                    }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <p
                      style={{
                        ...displayFont,
                        fontWeight: 300,
                        fontSize: 20,
                        lineHeight: "28px",
                        letterSpacing: "-1px",
                        fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                        margin: 0,
                        color: INK,
                      }}
                    >
                      {current.name}
                    </p>
                    <p
                      style={{
                        ...bodyFont,
                        fontSize: 14,
                        lineHeight: "24px",
                        fontWeight: 300,
                        margin: 0,
                        color: INK,
                      }}
                    >
                      {current.location}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative flex items-center">
                <TestimonialNavButton
                  direction="left"
                  onClick={goPrev}
                  disabled={isFirst}
                />
                <TestimonialNavButton
                  direction="right"
                  onClick={goNext}
                  disabled={isLast}
                  hideLeftBorder
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════════ */
export function PoisonTemplate() {
  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", color: INK }}>
      <PoisonHero />
      <PoisonServices />
      <PoisonSelectedWork />
      <PoisonFeature />
      <PoisonTestimonials />
    </div>
  );
}
