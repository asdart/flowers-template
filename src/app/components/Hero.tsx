import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import heroVideo from "../../imports/Flores Brancas Elegantes.mp4";
import LetterSwapForward from "../../components/fancy/text/letter-swap-forward-anim";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven zoom: track how far user has scrolled through the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);

  // Normalized pointer position relative to section center (-0.5 → 0.5)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Smooth the raw values with a spring for a natural, lagging motion
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 20, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 20, mass: 0.6 });

  // Map normalized values to pixel translations (tweak these to taste)
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-25, 25]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(x);
    pointerY.set(y);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white"
    >
      {/* Background video with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <motion.video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          style={{ x: imageX, y: imageY, scale: scrollScale }}
          className="h-full w-full object-cover opacity-40 pointer-events-none will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex w-full flex-col items-center gap-2 px-4 text-center">
        <div className="flex flex-col gap-0">
          
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
          >
          <h1 className="flex flex-col items-center gap-0 text-2xl tracking-tight leading-8">
            <LetterSwapForward
              label="Bespoke floral"
              className="font-serif font-light italic text-white"
              staggerFrom="first"
              staggerDuration={0.04}
            />
            <LetterSwapForward
              label="designed to stand out."
              className="font-sans font-normal text-amber-100"
              staggerFrom="first"
              staggerDuration={0.03}
            />
          </h1>
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-sm text-base leading-6 tracking-wide text-neutral-300 opacity-60"
          >
          We are a floral studio crafting wild, botanical experiences for weddings, events, and spaces.
        </motion.p>
          </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <a
            href="#contact"
            className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-normal text-black transition-colors hover:bg-neutral-200"
          >
            Contact us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4"
      >
        <span className="font-sans text-xs font-normal uppercase tracking-widest text-neutral-500">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-12 w-px bg-neutral-600"
        />
      </motion.div>
    </section>
  );
}
