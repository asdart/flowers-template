import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import poisonHero from "../../../../imports/poison-bloom-hero.png";
import poisonServices from "../../../../imports/poison-bloom-services.png";
import { CREAM } from "../tokens";

/* ═══════════════════════════════════════════════════════════════
   FEATURE — full-bleed → grid scroll story.

   A sticky-pinned canvas where one continuous scroll-scrubbed
   reveal shrinks the feature image from 100vw × 100vh to the
   final 27.64vw × 69.38vh tile, gradually exposing the six
   peripheral collage tiles that were already painted underneath.

     0.00 → 0.65  Single fluid shrink, no waypoint stops.
     0.65 → 1.00  Dwell — full collage visible, scrolling back up
                  rewinds every transform automatically.

   Slot positions and the final tile size come from the Figma
   reference frame (1440 × 960) as 4-decimal vw/vh fractions, so
   adjacent edges align to the sub-pixel on any viewport.
   ═══════════════════════════════════════════════════════════════ */

const FEATURE_FINAL_W_VW = 27.6389;
const FEATURE_FINAL_H_VH = 69.375;

const PERIPHERAL_SLOTS: Array<{
  left: string;
  top: string;
  width: string;
  height: string;
}> = [
  { left: "16.5972vw", top: "15.3125vh", width: "17.3611vw", height: "33.4375vh" },
  { left: "66.0417vw", top: "15.3125vh", width: "17.9167vw", height: "26.875vh" },
  { left: "66.0417vw", top: "44.6875vh", width: "26.1806vw", height: "22.0833vh" },
  { left: "7.7778vw", top: "51.25vh", width: "14.7222vw", height: "18.4375vh" },
  { left: "24.1667vw", top: "51.25vh", width: "9.7917vw", height: "33.4375vh" },
  { left: "66.0417vw", top: "69.2708vh", width: "9.7917vw", height: "15.4167vh" },
];

const PERIPHERAL_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487530811176-3780de880c2d?q=80&w=2400&auto=format&fit=crop",
  poisonServices,
  poisonHero,
  poisonServices,
];

export function Feature() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

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

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            className="relative overflow-hidden"
            style={{
              width: featureWidth,
              height: featureHeight,
              willChange: "width, height",
            }}
          >
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
