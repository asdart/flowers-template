import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import weddings1 from "../../../../imports/poison-services-weddings-1.png";
import weddings2 from "../../../../imports/poison-services-weddings-2.png";
import weddings3 from "../../../../imports/poison-services-weddings-3.png";
import brand1 from "../../../../imports/poison-services-brand-1.png";
import brand2 from "../../../../imports/poison-services-brand-2.png";
import brand3 from "../../../../imports/poison-services-brand-3.png";
import set1 from "../../../../imports/poison-services-set-1.png";
import set2 from "../../../../imports/poison-services-set-2.png";
import set3 from "../../../../imports/poison-services-set-3.png";
import {
  CREAM,
  EASE_CURTAIN,
  EASE_PRIMARY,
  INK,
  SOFT_WONK,
  bodyFont,
  displayFont,
} from "../tokens";

/* ═══════════════════════════════════════════════════════════════
   SERVICES — Horizontal sticky scroll showcase.

   Matches Figma "Global sections / Services" (node 12522:7681).

   Layout per service panel:
     • Title 72/80 Fraunces Light, ink, max-w 480
     • Row of 3 photographs, equal width, h ≈ 50 vh, gap 16 px
     • Body 14/24 Open Sans Light, max-w 480

   Three panels live inside a horizontally-scrolling track.

   Interaction — sticky horizontal scroll:
     • The outer <section> is taller than the viewport: its height
       equals 100 vh + the amount the horizontal track overflows
       the viewport. This means the user has exactly that many
       extra vertical pixels to scroll while the section sits
       sticky on screen.
     • Inside the section, a `position: sticky; top: 0; height:
       100vh` wrapper anchors the visible content to the viewport.
       The wrapper holds the horizontal track only.
     • The track is a flex row whose total `scrollWidth` exceeds
       the viewport width. As the user scrolls vertically, a
       `useTransform` driven by the section's scrollYProgress
       maps progress 0 → 1 onto x: 0 → -trackOverflow, so the
       track translates leftward in lockstep with the wheel.
     • When scrollYProgress reaches 1 the section's bottom hits
       the viewport, sticky releases and the page resumes its
       normal vertical flow into the next section.

   Measurement: `trackOverflow` is recomputed via ResizeObserver
   so the section adapts to viewport resizes, font loads and
   image-decoded reflows without stranding the user mid-scroll.

   Reduced motion: when the user opts out of motion we collapse
   the horizontal scroll entirely — the section becomes a normal
   vertically-stacked column of panels.

   Animations:
     • Each panel: title slides up, three image cards horizontal-
       curtain-reveal with a 0.08 s stagger, body fades up. The
       Framer Motion `whileInView` watches each panel's bounding
       client rect, so panels 2 and 3 animate the moment they
       translate into the viewport rather than firing on initial
       mount when they're still off-screen right.
   ═══════════════════════════════════════════════════════════════ */

type Service = {
  title: string;
  body: string;
  images: [string, string, string];
};

const SERVICES: Service[] = [
  {
    title: "Weddings",
    body:
      "From intimate ceremonies to sweeping receptions, we design complete floral experiences tailored to your story — from arbors and bouquets to tablescapes and lasting installations.",
    images: [weddings1, weddings2, weddings3],
  },
  {
    title: "Brand activations",
    body:
      "Bold botanical environments built for editorial shoots, press events, and campaign launches. We translate brand language into sculptural floral worlds your audience remembers.",
    images: [brand1, brand2, brand3],
  },
  {
    title: "Set Design",
    body:
      "Film, photography, and experiential sets treated as living compositions. Every stem is chosen to move the narrative forward and hold up under the lens.",
    images: [set1, set2, set3],
  },
];

/* ─── Type styles ─────────────────────────────────────────────── */

const titleStyle: CSSProperties = {
  ...displayFont,
  fontWeight: 300,
  fontSize: "clamp(48px, 5vw, 72px)",
  lineHeight: 1.11,
  letterSpacing: "-3px",
  fontVariationSettings: SOFT_WONK,
  margin: 0,
  maxWidth: 480,
  color: INK,
};

const bodyStyle: CSSProperties = {
  ...bodyFont,
  fontSize: 14,
  lineHeight: "24px",
  fontWeight: 300,
  margin: 0,
  maxWidth: 480,
  color: INK,
};

/* ─── Single service panel ────────────────────────────────────── */

function ServicePanel({ service }: { service: Service }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
      }}
      className="relative flex h-full shrink-0 flex-col justify-center"
      style={{
        width: "min(1007px, 78vw)",
        gap: 24,
      }}
    >
      <motion.h3
        variants={{
          hidden: { y: 28, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.0, ease: EASE_PRIMARY },
          },
        }}
        style={titleStyle}
      >
        {service.title}
      </motion.h3>

      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="flex w-full items-stretch"
        style={{
          gap: 16,
          height: "clamp(360px, 56vh, 509px)",
        }}
      >
        {service.images.map((img, i) => (
          <motion.div
            key={`${service.title}-${i}`}
            variants={{
              hidden: { clipPath: "inset(0 50% 0 50%)" },
              visible: {
                clipPath: "inset(0 0% 0 0%)",
                transition: { duration: 1.0, ease: EASE_CURTAIN },
              },
            }}
            className="relative min-w-0 flex-1 overflow-hidden"
            style={{ background: "#d9d9d9" }}
          >
            <img
              src={img}
              alt=""
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        variants={{
          hidden: { y: 18, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.9, ease: EASE_PRIMARY },
          },
        }}
        style={bodyStyle}
      >
        {service.body}
      </motion.p>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackOverflow, setTrackOverflow] = useState(0);
  const reduceMotion = useReducedMotion();

  /* Measure how far the horizontal track overflows the viewport.
     This number drives both the section's height (so the user has
     exactly that many extra vertical pixels to scroll while the
     sticky frame is on screen) and the maximum negative x-offset
     of the track. We refresh on viewport resize, font load, and
     image decode via ResizeObserver. */
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setTrackOverflow(Math.max(0, trackWidth - viewportWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Map vertical scroll progress 1:1 onto horizontal translate.
     Active only when reduced motion is off — when the user opts
     out we let the track sit at x: 0 and the panels stack into
     a vertical column via the responsive classes below. */
  const x = useTransform(scrollYProgress, [0, 1], [0, -trackOverflow]);

  return (
    <>
      {/* ───────────────────── DESKTOP — sticky horizontal ───────────────────── */}
      <section
        ref={sectionRef}
        id="poison-services"
        className="relative hidden w-full md:block"
        style={{
          backgroundColor: CREAM,
          color: INK,
          /* When reduced motion is on we collapse to a normal-flow
             section (just the sticky 100vh wrapper, no extra
             scroll runway) and drop the horizontal animation. */
          height: reduceMotion ? "auto" : `calc(100vh + ${trackOverflow}px)`,
        }}
      >
        <div
          className="sticky top-0 flex h-screen w-full flex-col overflow-hidden"
          style={{ backgroundColor: CREAM }}
        >
          {/* Track viewport — masks anything outside the visible
              window so panels disappear cleanly off the right edge
              and re-appear as the user scrolls. */}
          <div
            className="flex flex-1 items-center overflow-hidden"
            style={{
              paddingTop: "clamp(64px, 6.6vw, 96px)",
              paddingBottom: "clamp(40px, 4vw, 80px)",
            }}
          >
            <motion.div
              ref={trackRef}
              style={{
                x: reduceMotion ? 0 : x,
                gap: 24,
                paddingLeft: "clamp(24px, 5.6vw, 80px)",
                paddingRight: "clamp(24px, 5.6vw, 80px)",
              }}
              className="flex h-full items-stretch will-change-transform"
            >
              {SERVICES.map((service) => (
                <ServicePanel key={service.title} service={service} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────── MOBILE — vertical stack ───────────────────── */}
      <section
        id="poison-services-mobile"
        className="relative w-full md:hidden"
        style={{ backgroundColor: CREAM, color: INK }}
      >
        <div
          className="flex flex-col gap-20 px-6 py-24"
          style={{ color: INK }}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="flex flex-col gap-6"
            >
              <motion.h3
                variants={{
                  hidden: { y: 24, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.9, ease: EASE_PRIMARY },
                  },
                }}
                style={{
                  ...titleStyle,
                  fontSize: "clamp(40px, 12vw, 56px)",
                  lineHeight: 1.1,
                  letterSpacing: "-1.5px",
                }}
              >
                {service.title}
              </motion.h3>

              <div
                className="flex w-full items-stretch"
                style={{ gap: 12, aspectRatio: "1007 / 509" }}
              >
                {service.images.map((img, i) => (
                  <motion.div
                    key={`${service.title}-mobile-${i}`}
                    variants={{
                      hidden: { clipPath: "inset(0 50% 0 50%)" },
                      visible: {
                        clipPath: "inset(0 0% 0 0%)",
                        transition: { duration: 0.9, ease: EASE_CURTAIN },
                      },
                    }}
                    className="relative min-w-0 flex-1 overflow-hidden"
                    style={{ background: "#d9d9d9" }}
                  >
                    <img
                      src={img}
                      alt=""
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.p
                variants={{
                  hidden: { y: 18, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.9, ease: EASE_PRIMARY },
                  },
                }}
                style={bodyStyle}
              >
                {service.body}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
