import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SmoothScrollHero } from "../../../components/ui/smooth-scroll-hero";
import Typewriter from "./Typewriter";

/* ═══════════════════════════════════════════════════════════════
   EditorialFloralSection — cinematic transition between Hero and
   ProcessSection. Sticky un-clipping image (SmoothScrollHero) with
   atmospheric layered overlays:

      • soft black readability overlay
      • center vignette
      • top/bottom gradient bleeds (blends into surrounding sections)
      • SVG grain texture
      • floating petal particles (motion-safe)

   Typography: DM Sans display + Inter body to mirror HeroSection /
   ProcessSection. Italic accent on "feeling." Scroll-driven fade
   keeps the editorial copy floating above the still-clipped image
   on entry and slowly fades it as the image fully reveals.
   ═══════════════════════════════════════════════════════════════ */

const TITLE_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontVariationSettings: "'opsz' 14",
} as const;

const BODY_STYLE = {
  fontFamily: "'Inter', sans-serif",
} as const;

const DESKTOP_IMAGE =
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=2400&q=85";
const MOBILE_IMAGE =
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80";

const PETALS = [
  { left: "8%",  top: "18%", size: 6,  delay: 0,   duration: 14 },
  { left: "22%", top: "72%", size: 4,  delay: 2.4, duration: 18 },
  { left: "44%", top: "12%", size: 5,  delay: 1.1, duration: 16 },
  { left: "63%", top: "58%", size: 3,  delay: 3.2, duration: 20 },
  { left: "78%", top: "26%", size: 7,  delay: 0.6, duration: 17 },
  { left: "88%", top: "64%", size: 4,  delay: 2.0, duration: 19 },
];

function EditorialOverlay() {
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: overlayRef,
    offset: ["start start", "end end"],
  });

  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.55, 0.8],
    [0, 1, 1, 0]
  );
  const copyY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const scrimOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.55, 0.45, 0.3, 0.18]
  );

  return (
    <div ref={overlayRef} className="absolute inset-0">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black"
        style={{ opacity: prefersReducedMotion ? 0.45 : scrimOpacity }}
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
      />

      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.18]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />

      {!prefersReducedMotion ? (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {PETALS.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white/35 blur-[1px]"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
              initial={{ y: 0, x: 0, opacity: 0 }}
              animate={{
                y: [0, -24, 0, 18, 0],
                x: [0, 12, -8, 6, 0],
                opacity: [0, 0.55, 0.35, 0.5, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ) : null}

      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-[120px]"
        style={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: copyOpacity, y: copyY }
        }
      >
        <div className="pointer-events-auto mx-auto flex w-full max-w-[1100px] flex-col items-center gap-8 text-center">
          <h2
            className="m-0 max-w-[18ch] text-[clamp(2.25rem,5.6vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white"
            style={TITLE_STYLE}
          >
            <Typewriter
              text="Every arrangement begins with a "
              delay={0.1}
              speed={0.015}
            />
            <em
              className="not-italic"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              <Typewriter text="feeling." delay={0.5} speed={0.015} />
            </em>
          </h2>

          <p
            className="m-0 max-w-[58ch] text-base font-light leading-[1.7] tracking-[0.2px] text-white/75 md:text-lg"
            style={BODY_STYLE}
          >
            <Typewriter
              text="Seasonal flowers, natural movement, and thoughtful composition come together to create moments that feel soft, personal, and unforgettable."
              delay={0.1}
              speed={0.015}
            />
          </p>

          <a
            href="#gallery"
            className="mt-2 rounded-full border border-white/30 bg-white/[0.02] px-6 py-2.5 text-sm font-normal tracking-[0.35px] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-black"
            style={BODY_STYLE}
          >
            <Typewriter text="Explore Collections" delay={0.3} speed={0.015} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function EditorialFloralSection() {
  return (
    <section
      id="editorial-floral"
      aria-label="Editorial floral interlude"
      className="relative w-full bg-black text-white"
    >
      <SmoothScrollHero
        scrollHeight={1500}
        desktopImage={DESKTOP_IMAGE}
        mobileImage={MOBILE_IMAGE}
        initialClipPercentage={28}
        finalClipPercentage={72}
      >
        <EditorialOverlay />
      </SmoothScrollHero>
    </section>
  );
}
