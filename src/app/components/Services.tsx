import { motion } from "motion/react";
import imgServices from "../../imports/Flower.jpg";
import LetterSwapForward from "../../components/fancy/text/letter-swap-forward-anim";

const services = [
  {
    id: "01",
    title: "Wedding Floristry",
    description:
      "Bespoke bridal bouquets, breathtaking arches, and tablescapes tailored to tell your unique love story.",
  },
  {
    id: "02",
    title: "Event Styling",
    description:
      "Transforming venues with immersive, structural floral installations that leave a lasting impression on your guests.",
  },
  {
    id: "03",
    title: "Corporate Subscriptions",
    description:
      "Weekly curated floral arrangements that breathe life, elegance, and creativity into offices and retail spaces.",
  },
  {
    id: "04",
    title: "Editorial & Workshops",
    description:
      "Botanical styling for photoshoots, brand campaigns, and intimate masterclasses for aspiring florists.",
  },
];

export function Services() {
  return (
    <section id="services" className="w-full bg-white px-6 py-24 md:px-24 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-0">

        {/* Left column */}
        <div className="flex h-fit flex-col items-start gap-8 md:sticky md:top-24 md:self-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col text-2xl leading-8 tracking-tight"
          >
            <LetterSwapForward label="Our" className="font-serif font-light italic text-neutral-500 justify-start" staggerFrom="first" staggerDuration={0.04} />
            <LetterSwapForward label="Services" className="font-sans font-normal text-black justify-start" staggerFrom="first" staggerDuration={0.03} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[438px] w-full max-w-xs overflow-hidden"
          >
            <img
              alt="Cascading white floral installation beside stone steps and water"
              src={imgServices}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex flex-col md:pt-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-start gap-12 border-t border-neutral-200 py-10 md:py-12"
            >
              <div className="w-8 shrink-0 pt-0.5">
                <p className="font-serif text-xl leading-7 text-neutral-400">{service.id}</p>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <h3 className="font-serif text-2xl italic leading-8 tracking-tight text-black">
                  <LetterSwapForward label={service.title} className="font-serif italic text-black justify-start" staggerFrom="first" staggerDuration={0.03} />
                </h3>
                <p className="max-w-sm font-sans text-base leading-6 tracking-wide text-neutral-500">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
