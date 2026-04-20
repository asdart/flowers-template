import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import imgRedFlowers from "../../imports/Red-Flowers.png";
import LetterSwapForward from "../../components/fancy/text/letter-swap-forward-anim";

const awards = [
  { year: "26", name: "Vogue Singapore", description: "Top floral studio" },
  { year: "25", name: "Tatler Weddings", description: "Best event stylist" },
  { year: "25", name: "Harper's Bazaar", description: "Editorial feature" },
  { year: "24", name: "Her World", description: "Creative spotlight" },
];

export function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-950 px-6 py-32 text-white md:px-24"
    >
      {/* Parallax background image */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <img
          src={imgRedFlowers}
          alt=""
          className="h-[130%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-950/80" />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-24">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-8 lg:flex-row lg:gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lg:w-1/2">
            <div className="flex flex-col text-2xl leading-8 tracking-[-1px]">
              <LetterSwapForward label="Press" className="font-serif font-light italic text-white justify-start" staggerFrom="first" staggerDuration={0.04} />
              <LetterSwapForward label="& features" className="font-sans font-normal text-amber-100 justify-start" staggerFrom="first" staggerDuration={0.03} />
            </div>
          </div>
          <div className="flex flex-col justify-end lg:w-1/2">
            <p className="font-sans text-base leading-6 tracking-wide text-neutral-400 opacity-60">
              Share your vision with us. Due to our overwhelming response, we'll
              respond within five business days to discuss your bespoke floral
              needs.
            </p>
          </div>
        </motion.div>

        {/* Award rows */}
        <div className="flex flex-col">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-12 border-t border-neutral-700/60 px-6 py-12"
            >
              <div className="w-8 shrink-0">
                <p className="font-serif text-xl leading-7 text-neutral-400">
                  {award.year}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl italic leading-8 tracking-[-1px] text-white">
                  <LetterSwapForward label={award.name} className="font-serif italic text-white justify-start" staggerFrom="first" staggerDuration={0.03} />
                </h3>
                <p className="font-sans text-base leading-6 tracking-[-0.44px] text-neutral-500">
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
