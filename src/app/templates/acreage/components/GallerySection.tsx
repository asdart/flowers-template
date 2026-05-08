import { motion } from "motion/react";
import Typewriter from "./Typewriter";
import { ImageAutoSlider } from "../../../components/ui/image-auto-slider";

/* ═══════════════════════════════════════════════════════════════
   GallerySection — auto-scrolling 16:9 floral strip.

   Editorial headline + italic-accent rhythm. The infinite-scroll
   mechanic itself is encapsulated in <ImageAutoSlider /> so it can be
   reused by other templates without dragging this section's copy
   along with it.
   ═══════════════════════════════════════════════════════════════ */

const SERIF_STYLE = { fontFamily: "'Instrument Serif', serif" } as const;
const TITLE_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontVariationSettings: "'opsz' 14",
} as const;

const FLORAL_IMAGES = [
  { src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2200&auto=format&fit=crop", alt: "Soft tulip arrangement in warm light" },
  { src: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?q=80&w=2200&auto=format&fit=crop", alt: "Wild garden roses on linen" },
  { src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2200&auto=format&fit=crop", alt: "Editorial floral still life" },
  { src: "https://images.unsplash.com/photo-1487070183336-b863922373d4?q=80&w=2200&auto=format&fit=crop", alt: "Pastel peonies in soft daylight" },
  { src: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=2200&auto=format&fit=crop", alt: "Field of seasonal blooms" },
  { src: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?q=80&w=2200&auto=format&fit=crop", alt: "Sculptural floral composition" },
  { src: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=2200&auto=format&fit=crop", alt: "Gathered seasonal stems" },
  { src: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2200&auto=format&fit=crop", alt: "Petals in cinematic light" },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative box-border flex min-h-svh w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-black px-6 py-16 text-white md:px-8 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] shrink-0 px-0 text-center pb-10 md:pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="m-0 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.1] tracking-tight text-white"
            style={TITLE_STYLE}
          >
            <Typewriter text="A glimpse into our " delay={0} speed={0.015} />
            <span className="font-normal italic" style={SERIF_STYLE}>
              <Typewriter text="floral" delay={0.35} speed={0.015} />
            </span>
            <Typewriter text=" world." delay={0.6} speed={0.015} />
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="mx-auto mt-6 max-w-2xl text-base font-light leading-7 text-white/60 md:text-lg"
            style={TITLE_STYLE}
          >
            <Typewriter
              text="Seasonal arrangements, soft textures, and sculptural compositions created for meaningful moments."
              delay={0.1}
              speed={0.015}
            />
          </motion.p>
        </motion.div>
      </div>

      <div className="relative z-10 flex h-fit w-full shrink-0 items-start">
        <ImageAutoSlider images={FLORAL_IMAGES} durationSeconds={60} />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
      />
    </section>
  );
}
