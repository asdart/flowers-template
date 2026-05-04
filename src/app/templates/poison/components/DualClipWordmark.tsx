import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_CURTAIN } from "../tokens";

/* ─────────────────────────────────────────────────────────────
   DualClipWordmark — the centrepiece motif of the Poison template.

   Renders a wordmark in two colours simultaneously: ink on the
   cream background and white where the glyphs cross a centred
   floral image. Three layers:

     z=1   ink-coloured text on cream
     z=2   the floral image (with optional curtain reveal +
           Ken-Burns breath)
     z=3   white-coloured text, identical position, clipped to
           the image rectangle via clip-path: inset(...).

   The seam between the two colours stays invisible because both
   text layers come from the same renderText closure with only
   the colour swapped — typography, position and animations are
   identical between calls. Layer 3 is positioned identically to
   Layer 1 (absolute inset-0 filling the parent), then clipped
   via clip-path to the image rectangle so the white text only
   "shows" where the image is underneath.

   Caller must supply `parentSize` so the clip-path math doesn't
   need to use mixed-unit calc() with percentages. The size is
   the inner box that hosts the dual-clip stack.
   ───────────────────────────────────────────────────────────── */

export type ImageRect = {
  /** Full CSS values with units (px, vw, %). */
  left: string;
  top: string;
  width: string;
  height: string;
  /** Optional translateX (e.g. "-50%" for centred). */
  translateX?: string;
  /** Optional translateY. */
  translateY?: string;
};

export type DualClipWordmarkProps = {
  /** Image source for the framed photo. */
  imageSrc: string;
  /** Optional alt text for the image (the duplicated layers are aria-hidden). */
  imageAlt?: string;
  /** Position + size of the image inside the parent. */
  imageRect: ImageRect;
  /** Width and height of the dual-clip stack's parent box. Used to
      compute the clip-path inset() in matching units (no calc()
      with percent values, which has cross-browser edge cases when
      mixed with vw / px on the same expression). */
  parentSize: { width: string; height: string };
  /** Image curtain reveal (clip-path expand from centre). Default true. */
  imageReveal?: boolean;
  /** Perpetual Ken-Burns scale breath. Default true. */
  imageKenBurns?: boolean;
  /** Image entrance delay. */
  imageDelay?: number;
  /** Override default INK colour for the underlying layer. */
  inkColor: string;
  /** Override default white colour for the clipped layer. */
  photoColor?: string;
  /** Inverse mode — INK clipped to photo, white outside. Default false. */
  inverse?: boolean;
  /** Optional scrim painted over the image (inside the curtain
      reveal mask) to keep the clipped-colour text legible against
      busy photographs. Pass any CSS colour with alpha, e.g.
      "rgba(20, 10, 5, 0.6)". When omitted the image renders
      unmodified. */
  scrimColor?: string;
  /** Z-index for the visible text layer. Image gets z+1, clipped text z+2. */
  zIndex?: number;
  /** Render the text layers. Called twice — once with each colour.
      Position / animations / typography must be identical between calls. */
  renderText: (color: string) => ReactNode;
};

export function DualClipWordmark({
  imageSrc,
  imageAlt = "",
  imageRect,
  parentSize,
  imageReveal = true,
  imageKenBurns = true,
  imageDelay = 0.1,
  inkColor,
  photoColor = "#fff",
  inverse = false,
  scrimColor,
  zIndex = 1,
  renderText,
}: DualClipWordmarkProps) {
  const visibleColor = inverse ? photoColor : inkColor;
  const clippedColor = inverse ? inkColor : photoColor;

  const tx = imageRect.translateX ?? "0";
  const ty = imageRect.translateY ?? "0";

  /* clip-path inset that frames the second text layer to the image
     rectangle. All four sides are computed in the same unit family
     (no calc that mixes % with px / vw). */
  const isCentered = imageRect.translateX === "-50%";
  const clipTop = imageRect.top;
  const clipBottom = `calc(${parentSize.height} - ${imageRect.top} - ${imageRect.height})`;
  const clipLeft = isCentered
    ? `calc(${parentSize.width} / 2 - ${imageRect.width} / 2)`
    : imageRect.left;
  const clipRight = isCentered
    ? `calc(${parentSize.width} / 2 - ${imageRect.width} / 2)`
    : `calc(${parentSize.width} - ${imageRect.left} - ${imageRect.width})`;

  const clipPath = `inset(${clipTop} ${clipRight} ${clipBottom} ${clipLeft})`;

  /* Image reveal animation — direct initial/animate values so
     clipPath animates cleanly alongside the inline transform. */
  const imageInitial = imageReveal
    ? { clipPath: "inset(0 50% 0 50%)" }
    : undefined;
  const imageAnimateValue = imageReveal
    ? { clipPath: "inset(0 0% 0 0%)" }
    : undefined;
  const imageTransition = imageReveal
    ? { duration: 1.0, delay: imageDelay, ease: EASE_CURTAIN }
    : undefined;

  return (
    <>
      {/* Layer 1 — visible-colour text on the cream background. */}
      <div className="absolute inset-0" style={{ zIndex }}>
        {renderText(visibleColor)}
      </div>

      {/* Layer 2 — image with optional curtain reveal + Ken-Burns. */}
      <motion.div
        aria-hidden
        className="absolute overflow-hidden"
        style={{
          left: imageRect.left,
          top: imageRect.top,
          width: imageRect.width,
          height: imageRect.height,
          transform: `translate(${tx}, ${ty})`,
          background: "#d9d9d9",
          zIndex: zIndex + 1,
        }}
        initial={imageInitial}
        animate={imageAnimateValue}
        transition={imageTransition}
      >
        <motion.div
          style={{ width: "100%", height: "100%" }}
          animate={imageKenBurns ? { scale: [1, 1.04, 1] } : undefined}
          transition={
            imageKenBurns
              ? {
                  duration: 28,
                  delay: 3.0,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
              : undefined
          }
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.div>
        {/* Optional scrim — sits inside the same overflow-hidden
            wrapper so the curtain reveal animates the scrim and
            image together. Sits above the Ken-Burns layer but
            below the clipped-colour text (which is outside this
            wrapper at z = zIndex + 2). */}
        {scrimColor && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: scrimColor }}
          />
        )}
      </motion.div>

      {/* Layer 3 — clipped-colour text, framed to the image
          rectangle by clip-path inset(). The inset values use the
          same unit family as imageRect so no mixed-unit calc()
          edge cases occur. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: zIndex + 2, clipPath }}
      >
        {renderText(clippedColor)}
      </div>
    </>
  );
}
