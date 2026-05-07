import { motion } from "motion/react";
import { Leaf, Tractor, Bug } from "lucide-react";
import Typewriter from "./Typewriter";

/* ═══════════════════════════════════════════════════════════════
   ImageSection — full-bleed field background, headline + 3 cards.

   Note: the original Acreage prototype used animated Lottie icons
   (@lottiefiles/react-lottie-player) for each card. To avoid
   adding a new runtime dependency we substitute lucide-react glyphs
   that map 1:1 to the original concepts:
     curry.json   → Leaf      (sustainable crop care)
     tractor.json → Tractor   (advanced machinery)
     beetle.json  → Bug       (smart pest management)
   ═══════════════════════════════════════════════════════════════ */

const SERIF_STYLE = { fontFamily: "'Instrument Serif', serif" } as const;

const PILLARS = [
  {
    Icon: Leaf,
    title: "Sustainable Crop Care",
    body: "Nurturing your fields with eco-friendly practices to ensure healthy growth and robust yields.",
  },
  {
    Icon: Tractor,
    title: "Advanced Machinery",
    body: "Deploying state-of-the-art tractors and harvesters for maximum efficiency and speed.",
  },
  {
    Icon: Bug,
    title: "Smart Pest Management",
    body: "Protecting your harvest by monitoring and managing field ecosystems with precision.",
  },
];

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
          alt="Agriculture Field"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col px-6 py-8 md:px-12 md:py-24 lg:px-[120px]">
        <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col justify-between gap-4 md:gap-24">
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
                <Typewriter
                  text="A Highly Efficient, Precision-Driven Harvesting Process Built For "
                  delay={0}
                  speed={0.015}
                />
                <span className="italic font-normal" style={SERIF_STYLE}>
                  <Typewriter text="Maximum Yield" delay={0.8} speed={0.015} />
                </span>
              </h2>
              <p className="text-lg md:text-[24px] text-white/80 font-light tracking-wide">
                <Typewriter text="Precision in every pass." delay={0.1} speed={0.015} />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="hidden w-full max-w-[480px] flex-col items-start gap-8 pb-1 md:flex"
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
                    text="We create floral compositions that transform spaces into experiences. From intimate gestures to large celebrations, every arrangement is thoughtfully designed using seasonal blooms and natural textures."
                    delay={0.1}
                    speed={0.015}
                  />
                </p>
              </div>
              <a
                href="#contact"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
              >
                Schedule Service
              </a>
            </motion.div>
          </div>

        {/* Three pillars */}
        <div className="grid w-full grid-cols-1 gap-12 md:mt-[200px] md:grid-cols-3 md:gap-16">
          {PILLARS.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: "easeOut" }}
              className="flex w-full flex-col"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center">
                <Icon className="h-10 w-10 text-white" strokeWidth={1.25} />
              </div>
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

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex w-full justify-start md:hidden"
        >
          <a
            href="#contact"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-medium tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Schedule Service
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
