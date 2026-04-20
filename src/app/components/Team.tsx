import { useRef } from "react";
import type { MotionValue } from "motion/react";
import { motion, useScroll, useTransform } from "motion/react";
import LetterSwapForward from "../../components/fancy/text/letter-swap-forward-anim";

type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
};

const team: Member[] = [
  {
    id: 1,
    name: "Clara Wong",
    role: "Founder & Lead Florist",
    image:
      "https://images.unsplash.com/photo-1642029033444-9bf8327d85fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yaXN0JTIwd29ya2luZ3xlbnwxfHx8fDE3NzYzNjQ4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Aiden Lee",
    role: "Botanical Stylist",
    image:
      "https://images.unsplash.com/photo-1485754857203-23ffa89c37d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGZsb3Jpc3QlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzYzNjQ4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Sofia Reyes",
    role: "Event Floral Designer",
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

// A single team card: fades in on scroll + has its own parallax speed
function TeamCard({
  member,
  progress,
  speed,
  delay,
  className,
  innerClassName,
}: {
  member: Member;
  progress: MotionValue<number>;
  speed: number;
  delay: number;
  className?: string;
  innerClassName?: string;
}) {
  // `speed` controls the parallax range in pixels. Higher = moves faster/farther.
  const y = useTransform(progress, [0, 1], [speed, -speed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div style={{ y }} className={`group flex cursor-pointer flex-col gap-5 will-change-transform${innerClassName ? ` ${innerClassName}` : ""}`}>
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-2xl italic leading-8 tracking-[-1px] text-white">
            <LetterSwapForward
              label={member.name}
              className="font-serif italic text-white justify-start"
              staggerFrom="first"
              staggerDuration={0.04}
            />
          </h3>
          <p className="font-sans text-base leading-6 tracking-[0.0703px] text-neutral-300 opacity-60">
            {member.role}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-950 px-6 pb-32 pt-32 text-white md:px-12 lg:px-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-24">
        {/* Header: title (left) + description (right) */}
        <motion.div
          className="flex flex-col gap-8 lg:flex-row lg:gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lg:w-1/2">
            <div className="flex flex-col text-2xl leading-8 tracking-[-1px]">
              <LetterSwapForward
                label="Meet"
                className="font-serif font-light italic text-white justify-start"
                staggerFrom="first"
                staggerDuration={0.04}
              />
              <LetterSwapForward
                label="the creatives"
                className="font-sans font-normal text-amber-100 justify-start"
                staggerFrom="first"
                staggerDuration={0.03}
              />
            </div>
          </div>
          <div className="flex flex-col justify-end lg:w-1/2">
            <p className="font-sans text-base leading-6 tracking-[0.0703px] text-neutral-300 opacity-60">
              Meet our dedicated team, ready to bring your floral vision to life. We're here to collaborate and create something truly unique for you.
            </p>
          </div>
        </motion.div>

        {/* Staggered cards grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
          <TeamCard
            member={team[0]}
            progress={scrollYProgress}
            speed={60}
            delay={0}
            className="md:col-start-1 h-fit"
          />
          <TeamCard
            member={team[1]}
            progress={scrollYProgress}
            speed={-40}
            delay={0.15}
            className="md:col-start-2 md:mt-64"
          />
          <TeamCard
            member={team[2]}
            progress={scrollYProgress}
            speed={50}
            delay={0.1}
            className="md:col-start-1 md:mt-8"
            innerClassName="md:-mt-[188px]"
          />
        </div>
      </div>
    </section>
  );
}
