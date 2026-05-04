import type { CSSProperties, ReactNode } from "react";
import { CREAM, INK } from "../tokens";

/* ─────────────────────────────────────────────────────────────
   SectionShell — common section wrapper.

   Cream background, ink text, full-width with an optional inner
   wrapper that caps content at 1440px and pads 80px / 96px. Most
   sections in the template use this as their root.

   ───────────────────────────────────────────────────────────── */

export type SectionShellProps = {
  /** Optional anchor id for in-page navigation. */
  id?: string;
  /** Set to false to skip the inner max-width wrapper. */
  contained?: boolean;
  /** Override the inner wrapper max-width. */
  maxWidth?: number;
  /** Override the section vertical padding (px or any CSS length). */
  padY?: string | number;
  /** Override the section horizontal padding. */
  padX?: string | number;
  /** Section min-height (e.g. "100vh"). */
  minHeight?: string;
  /** Override outer background colour. */
  background?: string;
  /** Override text colour. */
  color?: string;
  /** Outer section className. */
  className?: string;
  /** Inner wrapper className. */
  innerClassName?: string;
  /** Outer inline style. */
  style?: CSSProperties;
  /** Inner wrapper inline style. */
  innerStyle?: CSSProperties;
  children: ReactNode;
};

export function SectionShell({
  id,
  contained = true,
  maxWidth = 1440,
  padY = "clamp(64px, 6.4vw, 96px)",
  padX = "clamp(24px, 5.6vw, 80px)",
  minHeight,
  background = CREAM,
  color = INK,
  className,
  innerClassName,
  style,
  innerStyle,
  children,
}: SectionShellProps) {
  const padding =
    typeof padY === "number" || typeof padX === "number"
      ? `${typeof padY === "number" ? `${padY}px` : padY} ${typeof padX === "number" ? `${padX}px` : padX}`
      : `${padY} ${padX}`;

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ backgroundColor: background, color, minHeight, ...style }}
    >
      {contained ? (
        <div
          className={`relative mx-auto ${innerClassName ?? ""}`}
          style={{ maxWidth, padding, ...innerStyle }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
