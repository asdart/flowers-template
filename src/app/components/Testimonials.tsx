import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LetterSwapForward from "../../components/fancy/text/letter-swap-forward-anim";

type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Wilde Flower Studio transformed our venue into something out of a dream. Every arrangement was deeply personal and breathtakingly beautiful.",
    author: "Amanda & James",
    context: "Wedding, May 2025",
  },
  {
    quote:
      "Their artistry brought our brand campaign to life. The florals felt editorial, unexpected, and effortlessly elegant in every single frame.",
    author: "Harper's Bazaar",
    context: "Editorial, March 2025",
  },
  {
    quote:
      "Walking into the reception felt like stepping into a living painting. Guests are still talking about the installations weeks later.",
    author: "Priya & Daniel",
    context: "Wedding, February 2025",
  },
  {
    quote:
      "Week after week, their subscriptions reshape our space. The team has an eye for mood, texture, and seasonality that is second to none.",
    author: "Marina Tan",
    context: "Corporate Subscription, 2025",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const current = testimonials[index];
  const pageLabel = `${String(index + 1).padStart(2, "0")} / ${String(
    testimonials.length
  ).padStart(2, "0")}`;

  return (
    <section
      id="testimonials"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-24 text-white md:px-24"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-16 md:gap-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-center text-center text-2xl leading-8 tracking-[-1px]"
        >
          <LetterSwapForward
            label="Kind"
            className="font-serif font-light italic text-white justify-center"
            staggerFrom="first"
            staggerDuration={0.04}
          />
          <LetterSwapForward
            label="Words"
            className="font-sans font-normal text-amber-100 justify-center"
            staggerFrom="first"
            staggerDuration={0.03}
          />
        </motion.div>

        {/* Quote carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="relative flex min-h-[280px] w-full items-center justify-center"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease }}
              className="flex w-full max-w-3xl flex-col items-center gap-8 text-center"
            >
              <p className="font-serif text-2xl font-thin italic leading-[1.35] tracking-[-1px] text-white md:text-[36px] md:leading-[48px]">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="flex flex-col items-center gap-1">
                <p className="font-serif text-lg italic leading-7 tracking-[-0.5px] text-amber-100 md:text-xl">
                  {current.author}
                </p>
                <p className="font-sans text-base leading-6 tracking-[-0.44px] text-neutral-500">
                  {current.context}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="group flex h-6 w-6 items-center justify-center text-neutral-400 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden
              >
                <path
                  d="M14 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex items-center gap-1">
              {testimonials.map((_, i) => {
                const active = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="flex h-5 items-center justify-center px-1"
                  >
                    <motion.span
                      animate={{
                        scale: active ? 1.25 : 1,
                        backgroundColor: active ? "#ffffff" : "#555555",
                      }}
                      transition={{ duration: 0.3, ease }}
                      className="block h-1.5 w-1.5 rounded-full"
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="group flex h-6 w-6 items-center justify-center text-neutral-400 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden
              >
                <path
                  d="M10 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className="font-serif text-base italic leading-6 text-neutral-500">
            {pageLabel}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
