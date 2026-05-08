import React from "react";
import { motion } from "motion/react";
import Typewriter from "./Typewriter";

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
      className="relative flex w-full flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://github.com/dsMagnatov/Acreage-landing-assets/blob/main/1.jpg?raw=true"
          alt="Floral and botanical texture over a soft field"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full flex-col justify-between gap-4 px-6 py-8 md:gap-24 md:px-12 md:py-24 lg:px-[120px]">
        <div className="grid w-full grid-cols-1 items-end gap-12 md:grid-cols-3 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-2"
          >
            <h2 className="mb-6 max-w-[800px] text-[clamp(1.5rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-white">
              <span className="not-italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <Typewriter
                  text="Thoughtfully designed floral experiences for every moment. "
                  delay={0}
                  speed={0.012}
                />
              </span>
              <span className="font-dm-serif font-normal italic">
                <Typewriter text="Seasonal beauty." delay={0.35} speed={0.012} />
              </span>
            </h2>
            <p className="text-lg font-light tracking-wide text-white/80 md:text-[24px]">
              <Typewriter
                text="Flowers arranged with movement, texture, and intention."
                delay={0.1}
                speed={0.012}
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="hidden max-w-[480px] flex-col items-start gap-8 pb-1 md:flex"
          >
            <div
              className="max-w-[480px] space-y-4 text-base font-light leading-[28px] text-white/80"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontVariationSettings: "'opsz' 14",
              }}
            >
              <p className="m-0">
                <Typewriter
                  text="We create floral compositions that transform spaces into experiences. From intimate gestures to meaningful celebrations, every arrangement is thoughtfully designed using seasonal blooms and natural textures."
                  delay={0.1}
                  speed={0.012}
                />
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-white px-6 py-2.5 text-sm font-medium tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Explore Collections
            </button>
          </motion.div>
        </div>

        <div className="grid w-full grid-cols-1 gap-12 md:mt-[200px] md:grid-cols-3 md:gap-16">
          {FEATURES.map(({ number, title, body }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: "easeOut" }}
              className="flex w-full max-w-[420px] flex-col"
            >
              <p className="mb-6 font-medium tabular-nums tracking-wide text-white/50">{number}</p>
              <div className="mb-6 h-px w-full bg-white/20" />
              <h3 className="mb-3 text-2xl font-medium text-white">
                <Typewriter text={title} delay={0.1} speed={0.012} />
              </h3>
              <p className="max-w-[340px] text-sm leading-relaxed text-white/70">
                <Typewriter text={body} delay={0.1} speed={0.012} />
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex w-full flex-col gap-6 md:hidden"
        >
          <div
            className="text-base font-light leading-[28px] text-white/80"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontVariationSettings: "'opsz' 14",
            }}
          >
            <p className="m-0 max-w-[480px]">
              <Typewriter
                text="We create floral compositions that transform spaces into experiences. From intimate gestures to meaningful celebrations, every arrangement is thoughtfully designed using seasonal blooms and natural textures."
                delay={0.05}
                speed={0.012}
              />
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-fit rounded-full bg-white px-6 py-2.5 text-sm font-medium tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Explore Collections
          </button>
        </motion.div>
      </div>
    </section>
  );
}
