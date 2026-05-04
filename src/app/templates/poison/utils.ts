import { HERO_W } from "./tokens";

/* Convert a Figma canvas pixel value (reference width 1374 px) to
   a viewport-width-relative string. All absolute positions, sizes
   and font metrics use this so the template scales continuously
   across every desktop breakpoint without a transform-scale hack. */
export const pv = (px: number) =>
  `${((px / HERO_W) * 100).toFixed(4)}vw`;

/* Build an `inset(...)` clip-path string that frames a child rect
   sitting inside its parent. Inputs are full CSS strings (including
   units) so callers can use vw/vh/% as needed.

   Example — to clip white text to a centred image rectangle:
     insetClip({
       top: "12.23vw",
       bottom: "12.23vw",
       left: `calc(50% - ${pv(216)})`,
       right: `calc(50% - ${pv(216)})`,
     })
*/
export const insetClip = (rect: {
  top: string;
  right: string;
  bottom: string;
  left: string;
}) => `inset(${rect.top} ${rect.right} ${rect.bottom} ${rect.left})`;
