import { motion } from "motion/react";
import poisonHero from "../../imports/poison-bloom-hero.png";
import poisonServices from "../../imports/poison-bloom-services.png";
import ImmersiveScrollGallery from "../components/ui/immersive-scroll-gallery";

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

/* Hero canvas matches the Figma "hero" frame: 1374 × 936. All
   absolute positions inside this canvas come straight from the
   Figma node coordinates. */
const HERO_H = 936;
const IMG_W = 432;
const IMG_H = 600;
const IMG_TOP = 211;
const IMG_HALF_W = IMG_W / 2; // 216
const HERO_BOTTOM_INSET = HERO_H - (IMG_TOP + IMG_H); // 125

/* ═══════════════════════════════════════════════════════════════
   HERO — desktop layered design + mobile stacked fallback
   ═══════════════════════════════════════════════════════════════ */
function PoisonHero() {
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
      style={{ backgroundColor: CREAM, color: INK, minHeight: "100vh", overflow: "hidden" }}
      className="relative w-full"
    >
      {/* ───────────────────── DESKTOP LAYOUT ─────────────────────
          Animation timeline:
          0.10s  Image curtain expands horizontally from the centerline
                 (clip-path inset(0 50% 0 50%) → inset(0)) + scale 1.08→1
          1.10s  Image fully revealed
          1.20s  "Poison"  fades + slides in from near the image  (x: -110 → 0)
          1.40s  "Bloom."  fades + slides in from near the image  (x:  110 → 0)
                 Title duration (1.5s) is slower than the image reveal (1.0s)
                 so it lingers visually after the photo settles. The slide is
                 short enough that the text originates close to the image
                 edge — the color flip still occurs because the rightmost
                 letters of "Poison" (and leftmost of "Bloom.") cross the
                 image's vertical edge during their travel.
                 The black layer sits BEHIND the image (z-1 < z-2) and the
                 white layer is clip-path constrained to the image rectangle
                 (z-3). The two wordmarks share identical x animations, so
                 the seam between cream-portion and image-portion is invisible.
          2.60s  Body copy fades up
          2.90s  "Get in touch" springs in
          ───────────────────────────────────────────────────────── */}
      <div
        className="relative mx-auto hidden md:block"
        style={{ height: HERO_H, width: "100%", maxWidth: 1374 }}
      >
        {/* Layer 1 — Black wordmarks on the cream background.
            These fade and slide into place AFTER the image is revealed,
            and the parts that overlap the image will be hidden by it
            (the white clipped layer takes over for those pixels). */}
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
          /* `left` is anchored to the image center (50%) rather than the
             canvas, so the boundary between black-on-cream and white-on-photo
             always lands inside the first "o" — independent of viewport width. */
          style={{ ...wordStyle, left: "calc(50% - 30px)", top: 444, color: INK, zIndex: 1 }}
          initial={{ x: 110, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Bloom.
        </motion.h1>

        {/* Layer 2 — Centered floral image. Reveal expands horizontally
            from the centerline (curtain opening sideways) plus a slow
            Ken-Burns continuous scale once settled. */}
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

        {/* Layer 3 — White wordmarks clipped to the image rectangle.
            Always visible (no opacity fade); they slide in synchronously
            with the black versions. The clip-path means a glyph only
            paints white where it sits inside the image — so the
            "color flip" happens naturally as the texts sweep across. */}
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
          style={{ left: 80, bottom: 125, width: 314, zIndex: 4 }}
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
              ease: [0.34, 1.56, 0.64, 1] /* slight overshoot spring */,
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
   IMMERSIVE — "Selected work" scroll story. The feature image
   (slot 0) starts full-bleed, shrinks to a centered card with the
   headline overlay, then continues shrinking to its grid-tile size
   while the six peripheral images fade in around it.

   Slot 0 uses the lily studio photograph (matches the Figma
   reference). Slots 1..6 are a curated mix of the second local
   photograph and three editorial Unsplash florals.
   ═══════════════════════════════════════════════════════════════ */
const IMMERSIVE_IMAGES: string[] = [
  poisonHero,
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2400&auto=format&fit=crop",
  poisonServices,
  "https://images.unsplash.com/photo-1487530811176-3780de880c2d?q=80&w=2400&auto=format&fit=crop",
  poisonHero,
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2400&auto=format&fit=crop",
  poisonServices,
];

function PoisonImmersive() {
  return (
    <ImmersiveScrollGallery
      images={IMMERSIVE_IMAGES}
      backgroundColor={CREAM}
      textColor="#ffffff"
      headlineClass="font-thin"
      headlineStyle={{
        ...displayFont,
        fontWeight: 200,
        fontSize: "clamp(40px, 5.6vw, 72px)",
        lineHeight: 1.1,
        letterSpacing: "-2px",
        fontVariationSettings: "'SOFT' 0, 'WONK' 1",
        margin: 0,
      }}
      headline="Our selected blooms"
      subheadlineClass="mt-4"
      subheadlineStyle={{
        ...bodyFont,
        fontSize: 14,
        lineHeight: "24px",
        fontWeight: 300,
      }}
      subheadline="See our best collections of poison blooms."
    />
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
      <PoisonImmersive />
    </div>
  );
}
