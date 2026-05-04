import { motion } from "motion/react";
import { EASE_PRIMARY, HAIRLINE, VIEWPORT_DEFAULTS } from "../tokens";

/* ─────────────────────────────────────────────────────────────
   HairlineDivider — 1px line that draws on enter.

   The exact same scaleX-based animation used by the testimonial
   card border. Lifted out so Process steps, FAQ rows, Footer
   bookend and Press marquee can all reuse it.

   The line draws from the chosen origin: by default left → right
   on the x axis. Set `direction="rtl"` to draw right → left
   (transform-origin moves to 100% and the same animation plays).
   For vertical hairlines pass `axis="y"`.

   ───────────────────────────────────────────────────────────── */

type Direction = "ltr" | "rtl" | "ttb" | "btt";

export type HairlineDividerProps = {
  /** Animation direction. Default "ltr". */
  direction?: Direction;
  /** Entry delay in seconds. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Stroke colour. Default token HAIRLINE. */
  color?: string;
  /** Trigger on mount instead of on scroll-into-view. */
  trigger?: "mount" | "view";
  /** Viewport margin override when trigger is "view". */
  viewportMargin?: string;
  className?: string;
  /** Inline style overrides (e.g. positioning). */
  style?: React.CSSProperties;
};

const directionToOrigin: Record<Direction, string> = {
  ltr: "0% 50%",
  rtl: "100% 50%",
  ttb: "50% 0%",
  btt: "50% 100%",
};

export function HairlineDivider({
  direction = "ltr",
  delay = 0,
  duration = 0.9,
  color = HAIRLINE,
  trigger = "view",
  viewportMargin = VIEWPORT_DEFAULTS.margin,
  className,
  style,
}: HairlineDividerProps) {
  const isHorizontal = direction === "ltr" || direction === "rtl";
  const variantsKey = isHorizontal ? "scaleX" : "scaleY";

  const variants = {
    hidden: { [variantsKey]: 0 },
    visible: {
      [variantsKey]: 1,
      transition: { duration, delay, ease: EASE_PRIMARY },
    },
  };

  const triggerProps =
    trigger === "view"
      ? {
          variants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: viewportMargin },
        }
      : { variants, initial: "hidden", animate: "visible" };

  return (
    <motion.span
      aria-hidden
      className={className}
      style={{
        display: "block",
        backgroundColor: color,
        transformOrigin: directionToOrigin[direction],
        height: isHorizontal ? 1 : "100%",
        width: isHorizontal ? "100%" : 1,
        willChange: "transform",
        ...style,
      }}
      {...triggerProps}
    />
  );
}
