import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

/* ─────────────────────────────────────────────────────────────
   Typewriter — per-character fade-in once in view.
   Stagger speed defaults to 15ms/char so longer strings still
   resolve in reasonable time.
   ───────────────────────────────────────────────────────────── */
export default function Typewriter({
  text,
  delay = 0,
  speed = 0.015,
  className = "",
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: speed, delayChildren: delay },
        },
      }}
      className={className}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
