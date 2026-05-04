import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import poisonOrchidCarousel from "../../../../imports/poison-orchid-carousel.png";
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
   TESTIMONIALS — "Trusted by flower lovers"

   · Orchid line-art behind everything (mix-blend-multiply +
     parallax drift). Bloom-in scale on enter.
   · Header row: label slides from the left, counter from the
     right. Counter ticks per slide change.
   · Card frame draws as four sequential 1px strokes (top → right
     → bottom → left), 0.55s each. Quote zone fades in once the
     loop closes; footer fades up after that.
   · Carousel: 5 entries, AnimatePresence direction-aware Y shifts,
     keyboard arrow-keys bound while mounted.
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
  const shift = active ? (direction === "left" ? -3 : 3) : 0;
  return (
    <button
      type="button"
      aria-label={
        direction === "left" ? "Previous testimonial" : "Next testimonial"
      }
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        width: 48,
        height: 48,
        backgroundColor: active ? "rgba(20, 10, 5, 0.05)" : CREAM,
        borderTop: `1px solid ${HAIRLINE}`,
        borderRight: `1px solid ${HAIRLINE}`,
        borderBottom: `1px solid ${HAIRLINE}`,
        borderLeft: hideLeftBorder ? "none" : `1px solid ${HAIRLINE}`,
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

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  const [index, setIndex] = useState(0);
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const illustrationY = useTransform(scrollYProgress, [0, 1], [-140, 140]);

  const slideEnterY = direction === 1 ? 14 : -14;
  const slideExitY = direction === 1 ? -14 : 14;

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.7, delay, ease: EASE_PRIMARY },
  });

  return (
    <section
      id="poison-testimonials"
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
            animate={inView ? { opacity: 0.42, scale: 1 } : { opacity: 0, scale: 1.06 }}
            transition={{ duration: 1.4, ease: EASE_PRIMARY }}
          >
            <img
              src={poisonOrchidCarousel}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        </div>

        <div
          className="relative flex w-full flex-col items-stretch"
          style={{ gap: 16, flex: "1 0 0", maxHeight: 480, minHeight: 0 }}
        >
          <div
            className="relative flex w-full items-baseline justify-between"
            style={{ whiteSpace: "nowrap" }}
          >
            <motion.p
              {...fadeUp(0)}
              style={{
                ...displayFont,
                fontWeight: 100,
                fontSize: 20,
                lineHeight: "28px",
                letterSpacing: "-1px",
                fontVariationSettings: SOFT_WONK,
                color: INK,
                margin: 0,
              }}
            >
              Trusted by flower lovers
            </motion.p>

            <motion.div
              {...fadeUp(0.1)}
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
                    transition={{ duration: 0.5, ease: EASE_PRIMARY }}
                    style={{ display: "inline-block" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>/{String(total).padStart(2, "0")}</span>
            </motion.div>
          </div>

          <motion.div
            {...fadeUp(0.2)}
            className="relative flex w-full flex-col items-stretch justify-between overflow-hidden"
            style={{
              flex: "1 1 0",
              backgroundColor: CREAM,
              border: `1px solid ${HAIRLINE}`,
              padding: 24,
              minHeight: 0,
            }}
          >
            <div
              className="relative w-full"
              style={{ flex: "1 1 auto", minHeight: 0 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={index}
                  initial={{ y: slideEnterY, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: slideExitY, opacity: 0 }}
                  transition={{
                    y: { duration: 0.7, ease: EASE_PRIMARY },
                    opacity: { duration: 0.55, ease: EASE_PRIMARY },
                  }}
                  style={{
                    ...displayFont,
                    fontWeight: 100,
                    fontSize: "clamp(22px, 2.78vw, 40px)",
                    lineHeight: 1.2,
                    letterSpacing: "-1px",
                    fontVariationSettings: SOFT_WONK,
                    color: INK,
                    margin: 0,
                  }}
                >
                  &ldquo;{current.quote}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            <div
              className="relative flex w-full items-end justify-between"
              style={{ gap: 24, marginTop: 16 }}
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
                      y: { duration: 0.6, delay: 0.04, ease: EASE_PRIMARY },
                      opacity: { duration: 0.45, delay: 0.04, ease: EASE_PRIMARY },
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <p
                      style={{
                        ...displayFont,
                        fontWeight: 300,
                        fontSize: 20,
                        lineHeight: "28px",
                        letterSpacing: "-1px",
                        fontVariationSettings: SOFT_WONK,
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
