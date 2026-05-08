import { motion } from "motion/react";
import Typewriter from "./Typewriter";

/* ═══════════════════════════════════════════════════════════════
   ImageSection — Floral experience: full-bleed background, headline,
   supporting line, right column copy + CTA, and three feature cards.
   ═══════════════════════════════════════════════════════════════ */

const DM_SANS_STYLE = { fontFamily: "'DM Sans', sans-serif" } as const;
const SERIF_STYLE = { fontFamily: "'Instrument Serif', serif" } as const;

const FEATURES = [
  {
    number: "01",
    title: "Seasonal Floral Curation",
    body: "We source blooms based on seasonality, texture, and natural movement to create arrangements that feel organic and expressive.",
  },
  {
    number: "02",
    title: "Artful Arrangement Design",
    body: "Every composition is shaped with balance, softness, and sculptural detail to create a memorable visual experience.",
  },
  {
    number: "03",
    title: "Thoughtful Delivery Experience",
    body: "From wrapping to presentation, every detail is carefully considered to ensure each arrangement arrives beautifully composed.",
  },
] as const;

export default function ImageSection() {
  return (
    <section
      id="services"
      className="w-full relative overflow-hidden flex flex-col justify-center"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://github.com/dsMagnatov/Acreage-landing-assets/blob/main/1.jpg?raw=true"
          alt="Floral and botanical texture over a soft field"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col px-6 py-8 md:px-8 md:py-24 lg:px-[120px]">
        <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col justify-between gap-12 md:gap-24">
          {/* Headline + CTA */}
          <div className="grid w-full grid-cols-1 items-end gap-12 md:grid-cols-3 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="md:col-span-2"
            >
              <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight text-white mb-6 leading-[1.1] max-w-[800px]">
                <span className="not-italic" style={DM_SANS_STYLE}>
                  <Typewriter
                    text="Thoughtfully designed floral experiences for every moment. "
                    delay={0}
                    speed={0.015}
                  />
                </span>
                <span className="italic font-normal" style={SERIF_STYLE}>
                  <Typewriter text="Seasonal beauty." delay={0.35} speed={0.015} />
                </span>
              </h2>
              <p className="text-lg md:text-[24px] text-white/80 font-light tracking-wide">
                <Typewriter
                  text="Flowers arranged with movement, texture, and intention."
                  delay={0.1}
                  speed={0.015}
                />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="flex w-full max-w-[480px] flex-col items-start gap-6 pb-1 md:gap-8"
            >
              <div
                className="space-y-4 text-base font-light leading-[28px] text-white/80"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontVariationSettings: "'opsz' 14",
                }}
              >
                <p className="m-0 max-w-[480px]">
                  <Typewriter
                    text="We create floral compositions that transform spaces into experiences. From intimate gestures to meaningful celebrations, every arrangement is thoughtfully designed using seasonal blooms and natural textures."
                    delay={0.1}
                    speed={0.015}
                  />
                </p>
              </div>
              <a
                href="#gallery"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
              >
                Explore Collections
              </a>
            </motion.div>
          </div>

          {/* Feature cards */}
          <div className="grid w-full grid-cols-1 gap-12 md:mt-[200px] md:grid-cols-3 md:gap-16">
            {FEATURES.map(({ number, title, body }, i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.05,
                  ease: "easeOut",
                }}
                className="flex w-full flex-col"
              >
                <p className="mb-6 font-medium tabular-nums tracking-wide text-white/50">
                  {number}
                </p>
                <div className="mb-6 h-px w-full bg-white/20" />
                <h3 className="mb-3 text-2xl font-medium text-white">
                  <Typewriter text={title} delay={0.1} speed={0.015} />
                </h3>
                <p className="max-w-[340px] text-sm leading-relaxed text-white/70">
                  <Typewriter text={body} delay={0.1} speed={0.015} />
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
