import { motion } from "motion/react";
import Typewriter from "./Typewriter";

/* ═══════════════════════════════════════════════════════════════
   ProcessSection — "How we work" four-step rhythm for floral service.
   Dark section, DM Sans numerals, row-divider layout.
   ═══════════════════════════════════════════════════════════════ */

const TITLE_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontVariationSettings: "'opsz' 14",
} as const;
const NUMERAL_STYLE = { fontFamily: "'DM Sans', sans-serif" } as const;

const STEPS = [
  {
    n: "01",
    title: "Seasonal Curation",
    body:
      "We carefully select blooms based on seasonality, texture, movement, and color harmony. Every stem is chosen with intention before the arrangement begins.",
  },
  {
    n: "02",
    title: "Design & Composition",
    body:
      "Each arrangement is shaped organically to create balance, softness, and presence. Natural movement and layered textures guide the composition.",
  },
  {
    n: "03",
    title: "Styling & Finishing",
    body:
      "From wrapping details to vessel selection, every final touch is considered to elevate the experience and bring warmth to every delivery.",
  },
  {
    n: "04",
    title: "Delivery & Experience",
    body:
      "Every arrangement is prepared with care and delivered at peak freshness, ready to transform spaces, celebrations, and everyday moments.",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="bg-black text-white py-16 md:py-24 px-6 md:px-8 lg:px-[120px] w-full border-t border-white/10 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
          className="w-full"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="mb-6 text-sm font-medium uppercase tracking-wide text-white/60 md:text-base"
            style={TITLE_STYLE}
          >
            <Typewriter text="How We Work" delay={0} speed={0.015} />
          </motion.h2>

          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="mb-12 flex max-w-[900px] flex-col text-[clamp(1.5rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-tight md:mb-20"
            style={TITLE_STYLE}
          >
            <span className="block">
              <Typewriter text="A thoughtful process designed" delay={0} speed={0.015} />
            </span>
            <span className="block italic font-normal">
              <Typewriter text="For every arrangement." delay={0.4} speed={0.015} />
            </span>
          </motion.h3>

          <div className="flex flex-col">
            {STEPS.map((step) => (
              <motion.div
                key={step.n}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-baseline border-t border-white/10 py-8 md:py-12"
              >
                <div
                  className="md:col-span-2 text-3xl md:text-5xl text-white/40 tracking-tight"
                  style={NUMERAL_STYLE}
                >
                  {step.n}
                </div>
                <h4
                  className="text-2xl font-medium tracking-tight md:col-span-4 md:text-3xl"
                  style={TITLE_STYLE}
                >
                  <Typewriter text={step.title} delay={0.1} speed={0.015} />
                </h4>
                <p className="md:col-span-6 text-base md:text-lg text-white/60 font-light leading-relaxed max-w-[560px]">
                  <Typewriter text={step.body} delay={0.1} speed={0.015} />
                </p>
              </motion.div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
