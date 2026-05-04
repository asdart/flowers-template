import { MaskDistortion } from "./exploration/sections/MaskDistortion";

/* ─────────────────────────────────────────────────────────────
   Exploration Template — a series of WebGL artifacts in the
   spirit of artifacts.deeo.studio. The first artifact is a
   cursor-driven mask-distortion experience.
   ───────────────────────────────────────────────────────────── */

const PAGE_BG = "#EEF7CC";
const INK = "#1A1245";

export function ExplorationTemplate() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: PAGE_BG,
        color: INK,
      }}
    >
      <main>
        <MaskDistortion />
      </main>
    </div>
  );
}

export default ExplorationTemplate;
