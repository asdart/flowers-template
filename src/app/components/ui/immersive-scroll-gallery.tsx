"use client";

import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/* ─────────────────────────────────────────────────────────────
   ImmersiveScrollGallery — Selected Work

   ONE continuous sticky scroll section that does the whole story
   in a single viewport. The center image starts at full-bleed
   (Figma 12416:10928) with the headline + scrim already overlaid,
   shrinks continuously past the 88vw × 80vh "rest" frame
   (Figma 12405:10885) and LANDS as the center tile of the final
   grid (Figma 12409:10910). The six peripheral images fade in
   absolutely-positioned around the center after the image has
   landed, so the shrinking image visually replaces the center of
   the grid rather than being followed by a separate grid section.

   Timing on a 400vh outer (300vh of scroll travel), all reversible:

     0.00 → 0.50  Center image shrinks: 100vw × 100vh → 27.64vw × 69.38vh
                  (passes through 88 × 80 around p ≈ 0.08)
     0.00 → 0.20  Headline + scrim at peak opacity
     0.20 → 0.40  Headline + scrim fade out and scale down with image
     0.50 → 0.70  Peripherals fade in around the landed center, staggered
     0.70 → 1.00  Dwell — full grid visible for ~90vh of scroll
                  before the section releases naturally

   Built on `motion/react` (the framer-motion rebrand).
   ───────────────────────────────────────────────────────────── */

export interface ImmersiveScrollGalleryProps {
  /** 7 image URLs. Index 0 is the feature/center image; 1..6 are
   *  the peripheral grid images. */
  images?: string[];
  /** Extra classes for the outer scroll-animation container. */
  className?: string;
  /** Stage background. */
  backgroundColor?: string;
  /** Headline color (defaults to white over the scrim). */
  textColor?: string;
  /** Tailwind classes for the centered headline. */
  headlineClass?: string;
  /** Inline style merged onto the headline. */
  headlineStyle?: CSSProperties;
  /** Headline content rendered during the held beat. */
  headline?: ReactNode;
  /** Optional subhead rendered below the headline. */
  subheadline?: ReactNode;
  /** Tailwind classes for the subhead. */
  subheadlineClass?: string;
  /** Inline style merged onto the subhead. */
  subheadlineStyle?: CSSProperties;
  /** Peak scrim opacity (default 0.35). */
  scrimOpacity?: number;
}

const DEFAULT_IMAGES: string[] = Array(7).fill(
  "https://images.unsplash.com/photo-1612801356940-8fdcde8aef61?q=80&w=2940&auto=format&fit=crop",
);

/* The animated center image is flex-centered in the viewport, so
   its final 27.64vw × 69.38vh size lands at exactly the same
   screen position as the Figma 12409:10910 center tile (center
   of viewport: 50vw, 50vh). No absolute coords needed for the
   center because flex centering achieves the same result. */

/* Six peripheral slots — absolute viewport-relative positions
   translated from Figma 12409:10910 (1440 × 960 frame, 112 / 147
   content insets). Values are exact 4-decimal fractions of the
   Figma source (e.g. 239 / 1440 = 16.5972vw) so adjacent edges
   that should align (top row tops at 15.3125vh, bottom row
   bottoms at 84.6875vh) align to the sub-pixel on any viewport. */
const PERIPHERAL_SLOTS: Array<{
  left: string;
  top: string;
  width: string;
  height: string;
}> = [
  // top-left tall (Rect 154) — abs (239, 147), 250 × 321
  {
    left: "16.5972vw",
    top: "15.3125vh",
    width: "17.3611vw",
    height: "33.4375vh",
  },
  // top-right square (Rect 151) — abs (951, 147), 258 × 258
  {
    left: "66.0417vw",
    top: "15.3125vh",
    width: "17.9167vw",
    height: "26.875vh",
  },
  // right-mid wide (Rect 152) — abs (951, 429), 377 × 212
  {
    left: "66.0417vw",
    top: "44.6875vh",
    width: "26.1806vw",
    height: "22.0833vh",
  },
  // bottom-left far (Rect 155) — abs (112, 492), 212 × 177
  {
    left: "7.7778vw",
    top: "51.25vh",
    width: "14.7222vw",
    height: "18.4375vh",
  },
  // bottom-left tall (Rect 156) — abs (348, 492), 141 × 321
  {
    left: "24.1667vw",
    top: "51.25vh",
    width: "9.7917vw",
    height: "33.4375vh",
  },
  // bottom-right small (Rect 153) — abs (951, 665), 141 × 148
  {
    left: "66.0417vw",
    top: "69.2708vh",
    width: "9.7917vw",
    height: "15.4167vh",
  },
];

/* Center image final size — exact Figma fraction (398 / 1440,
   666 / 960). Flex-centering puts it at left = (100 - 27.6389)/2
   = 36.1806vw and top = (100 - 69.375)/2 = 15.3125vh, which is
   the precise position of the center slot in the Figma frame —
   making the top edge align with the top row and the bottom
   edge align with the bottom row on any viewport. */
const CENTER_W_VW = 27.6389;
const CENTER_H_VH = 69.375;

/* Fade-in windows for each peripheral image. The center image
   lands at p=0.50; peripherals fade in immediately after with a
   0.12 fade duration and a 0.02 stagger between each image.
   Scrolling back up reverses the reveal naturally. */
const PERIPHERAL_FADE_RANGES: Array<[number, number]> = [
  [0.50, 0.62],
  [0.52, 0.64],
  [0.54, 0.66],
  [0.56, 0.68],
  [0.58, 0.70],
  [0.60, 0.72],
];

/* Subcomponent so each peripheral slot can own its own
   `useTransform` calls without breaking Rules of Hooks via a map. */
function PeripheralImage({
  src,
  slot,
  scrollYProgress,
  fadeRange,
}: {
  src: string;
  slot: { left: string; top: string; width: string; height: string };
  scrollYProgress: MotionValue<number>;
  fadeRange: [number, number];
}) {
  // Snap opacity: 0 before the threshold, 1 after — effectively instant.
  // 4-point keyframes pin the final value for the entire dwell/exit phase
  // so the images don't disappear while the center image stays visible.
  const opacity = useTransform(
    scrollYProgress,
    [0, fadeRange[0], fadeRange[1], 1],
    [0, 0, 1, 1],
  );

  return (
    <motion.div
      style={{ ...slot, opacity }}
      className="pointer-events-none absolute overflow-hidden"
    >
      <img
        src={src}
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
const ImmersiveScrollGallery: React.FC<ImmersiveScrollGalleryProps> = ({
  images = DEFAULT_IMAGES,
  className = "",
  backgroundColor,
  textColor = "#ffffff",
  headlineClass = "",
  headlineStyle,
  headline,
  subheadline,
  subheadlineClass = "",
  subheadlineStyle,
  scrimOpacity: scrimPeak = 0.35,
}) => {
  const container = useRef<HTMLDivElement | null>(null);

  /* 400vh outer → 300vh of scroll → progress 0..1, all reversible. */
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  /* Center image — continuous shrink from full-bleed to the final
     portrait tile by p = 0.50, leaving the second half of the
     scroll for peripherals + dwell. Final size uses the exact
     Figma fractions so the centered tile aligns with the peripheral
     grid edges to the sub-pixel. */
  const featureWidth = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["100vw", `${CENTER_W_VW}vw`],
  );
  const featureHeight = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["100vh", `${CENTER_H_VH}vh`],
  );

  /* Headline + scrim — peak from progress 0 (matching the Figma
     start frame), hold during the early shrink so the user can
     read, then fade out together as the image continues to
     shrink toward its final tile. */
  const scrimOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [scrimPeak, scrimPeak, 0],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [1, 1, 0],
  );
  /* Text scale matches the image's width-reduction ratio across
     the fade window so the headline visibly "goes with" the image. */
  const textScale = useTransform(
    scrollYProgress,
    [0.2, 0.4],
    [1, CENTER_W_VW / 100],
  );

  const stageStyle = backgroundColor ? { backgroundColor } : undefined;
  const featureSrc = images[0] ?? DEFAULT_IMAGES[0];
  const peripheralSrcs = images.slice(1, 1 + PERIPHERAL_SLOTS.length);

  return (
    <div
      ref={container}
      className={`relative h-[400vh] ${className}`}
      style={stageStyle}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={stageStyle}
      >
        {/* Peripherals — absolute-positioned around the center at
            their Figma slot coords; fade in once the center image
            has landed. */}
        {peripheralSrcs.map((src, i) => {
          const slot = PERIPHERAL_SLOTS[i];
          const fadeRange = PERIPHERAL_FADE_RANGES[i];
          if (!slot || !fadeRange) return null;
          return (
            <PeripheralImage
              key={i + 1}
              src={src}
              slot={slot}
              scrollYProgress={scrollYProgress}
              fadeRange={fadeRange}
            />
          );
        })}

        {/* Center image — flex-centered. Width and height
            MotionValues drive the size; flex centering puts the
            final 27.64vw × 69.38vh tile at the exact same screen
            spot as the Figma grid's center slot (50vw, 50vh). */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ width: featureWidth, height: featureHeight }}
            className="relative z-10 overflow-hidden"
          >
            <img
              src={featureSrc}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />

            <motion.div
              aria-hidden
              style={{ opacity: scrimOpacity, backgroundColor: "#000" }}
              className="absolute inset-0"
            />

            <motion.div
              style={{ opacity: textOpacity, scale: textScale }}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
            >
              {headline ? (
                <h2
                  className={headlineClass}
                  style={{ color: textColor, ...headlineStyle }}
                >
                  {headline}
                </h2>
              ) : null}
              {subheadline ? (
                <p
                  className={subheadlineClass}
                  style={{ color: textColor, ...subheadlineStyle }}
                >
                  {subheadline}
                </p>
              ) : null}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveScrollGallery;
