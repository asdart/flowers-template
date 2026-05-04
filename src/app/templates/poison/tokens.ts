/* ─────────────────────────────────────────────────────────────
   Poison Bloom — design tokens.
   Editorial cream studio. Fraunces (display) + Open Sans (body).
   The page renders black wordmarks on cream and white wordmarks
   clipped to centred floral images — two colours of the same glyph.
   ───────────────────────────────────────────────────────────── */

export const CREAM = "#f2efea";
export const INK = "#140a05";
export const TEAL = "#0e525f";
export const TEAL_DARK = "#073b45";
export const HAIRLINE = "rgba(20, 10, 5, 0.2)";
export const HAIRLINE_SOFT = "rgba(20, 10, 5, 0.08)";

export const displayFont = { fontFamily: "var(--font-display)" } as const;
export const bodyFont = {
  fontFamily: "'Open Sans', system-ui, sans-serif",
} as const;

/* Master cinematic ease — long, slow exits. The whole template
   uses this curve unless explicitly overridden. */
export const EASE_PRIMARY = [0.16, 1, 0.3, 1] as const;

/* Image curtain reveal — symmetric in/out for clip-path expands. */
export const EASE_CURTAIN = [0.65, 0, 0.35, 1] as const;

/* CTA spring — soft overshoot for clickable surfaces. */
export const EASE_OVERSHOOT = [0.34, 1.56, 0.64, 1] as const;

/* Figma reference frame width — every absolute pixel position in
   the source comp converts to vw via pv(px). */
export const HERO_W = 1374;
export const HERO_H = 936;

/* Default whileInView trigger — fires once when the section is
   well into view; animations don't replay on scroll-back. */
export const VIEWPORT_DEFAULTS = { once: true, margin: "-15%" } as const;

/* Standard SOFT/WONK display variation — used by every Fraunces
   display-weight title in the template. */
export const SOFT_WONK = "'SOFT' 0, 'WONK' 1" as const;
