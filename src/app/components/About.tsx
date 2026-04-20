import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef, Fragment } from "react";

const text =
  "Inspired by nature's unrefined beauty, we established a studio that breaks away from traditional floristry. We source the most exquisite, unconventional blooms. Our mission is clear: to bring the wild, poetic essence of nature into modern spaces.";

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const color = useTransform(progress, range, ["#525252", "#ffffff"]);
  return <motion.span style={{ color }}>{children}</motion.span>;
};

export function About() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "start 20%"],
  });

  const words = text.split(" ");

  return (
    <section
      id="about"
      ref={container}
      className="flex w-full items-center bg-neutral-950 px-6 py-24 md:px-24 md:py-32"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <p className="font-serif text-sm font-light italic tracking-tight text-amber-100">
          Our Roots
        </p>

        <p className="m-0 w-full font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl md:leading-snug">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 2 / words.length;
            return (
              <Fragment key={i}>
                <Word progress={scrollYProgress} range={[start, end > 1 ? 1 : end]}>
                  {word}
                </Word>
                {i < words.length - 1 && " "}
              </Fragment>
            );
          })}
        </p>
      </div>
    </section>
  );
}
