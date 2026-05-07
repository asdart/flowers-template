import { motion } from "motion/react";
import Typewriter from "./Typewriter";

import heroVideo from "../../../../../project/public/Mystical Meadow Door.mp4";

/* ═══════════════════════════════════════════════════════════════
   HERO — full-bleed looping video, gradient readability, two-column copy.

   Visual parity with Figma [Prototype] Acreage — HeroSection
   (node 12666:7473): DM Sans for display/body/footer, Inter for
   subtitle + CTA; main carries the top-to-bottom scrim
   (transparent → black).

   Anchor IDs on downstream sections unchanged for deep links.
   ═══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 size-full max-w-none object-cover pointer-events-none"
        aria-hidden
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <main className="relative z-10 mx-auto flex w-full flex-1 flex-col justify-end gap-8 bg-gradient-to-b from-transparent to-black px-6 pb-8 pt-24 md:px-12 lg:px-[120px]">
        <div className="flex w-full flex-col items-start justify-between gap-6 border-b border-white/[0.08] pb-10 lg:flex-row lg:gap-12">
          {/* Left column — title + subtitle */}
          <div className="flex w-full flex-1 flex-col items-start gap-8 pr-4 lg:pr-8">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.025, delayChildren: 0 },
                },
              }}
              className="flex w-full flex-col gap-2 text-[clamp(2rem,5vw,72px)] font-medium leading-[1.1] tracking-[-0.8px] text-white"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <p className="m-0 max-w-[920px] w-full">
                {"Experience the beauty of intentional florals.".split("").map((char, i) => (
                  <motion.span
                    key={`hero-${i}`}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            </motion.h1>
            <p
              className="m-0 w-full text-lg font-light leading-8 tracking-[0.48px] text-white/80 md:text-2xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Typewriter
                text="Seasonal arrangements created with softness, movement, and emotion."
                delay={0.1}
                speed={0.015}
              />
            </p>
          </div>

          {/* Right column — body copy then CTA (Figma order) */}
          <div className="flex w-full shrink-0 flex-col items-start gap-8 lg:w-[400px] xl:w-[480px]">
            <div
              className="space-y-4 text-base font-light leading-[28px] text-white/80"
              style={{ fontFamily: "'DM Sans', sans-serif", fontVariationSettings: "'opsz' 14" }}
            >
              <p className="m-0 max-w-[480px]">
                <Typewriter
                  text="We create floral compositions that transform spaces into experiences. From intimate gestures to large celebrations, every arrangement is thoughtfully designed using seasonal blooms and natural textures."
                  delay={0.1}
                  speed={0.015}
                />
              </p>
            </div>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="rounded-full border border-white/30 bg-white/[0.02] px-6 py-2.5 text-sm font-normal tracking-[0.35px] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-black"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Schedule Now
            </motion.a>
          </div>
        </div>

        <div
          className="flex w-full flex-col items-start justify-between gap-2 text-xs font-light tracking-[0.6px] text-white/[0.64] sm:flex-row sm:items-center"
          style={{ fontFamily: "'DM Sans', sans-serif", fontVariationSettings: "'opsz' 14" }}
        >
          <p className="m-0 mb-2 sm:mb-0">
            <Typewriter text="Abundance begins with a timely harvest." delay={0.1} speed={0.015} />
          </p>
          <p className="m-0">
            <Typewriter text="Acreage Ag ©2026" delay={0.1} speed={0.015} />
          </p>
        </div>
      </main>
    </div>
  );
}
