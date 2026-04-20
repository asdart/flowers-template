import { useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import LetterSwapForward from "../../components/fancy/text/letter-swap-forward-anim";

const articles = [
  {
    year: "26",
    title: "The Art of Seasonal Blooms",
    description:
      "A guide to choosing the best flowers for every time of year",
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    year: "25",
    title: "Sustainable Floristry Guide",
    description: "How to reduce waste and choose eco-friendly blooms",
    image:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    year: "25",
    title: "Flower Care 101",
    description:
      "Tips and tricks to keep your arrangements fresh for longer",
    image:
      "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    year: "24",
    title: "The Language of Flowers",
    description:
      "Decoding meanings and symbolism behind your favorite blooms",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
];

export function Journal() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const cleanupRef = useRef<(() => void)[]>([]);

  const setRowRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      rowRefs.current[index] = el;
    },
    [],
  );

  const setImgRef = useCallback(
    (index: number) => (el: HTMLImageElement | null) => {
      imgRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    imgRefs.current.forEach((image) => {
      if (image) {
        gsap.set(image, { xPercent: -50, yPercent: -50 });
      }
    });

    rowRefs.current.forEach((row, i) => {
      const image = imgRefs.current[i];
      if (!row || !image) return;

      const setX = gsap.quickTo(image, "x", {
        duration: 0.4,
        ease: "power3",
      });
      const setY = gsap.quickTo(image, "y", {
        duration: 0.4,
        ease: "power3",
      });

      const fade = gsap.to(image, {
        autoAlpha: 1,
        duration: 0.3,
        ease: "none",
        paused: true,
      });

      let lastX = 0;
      let lastY = 0;

      const onEnter = (e: MouseEvent) => {
        lastX = e.clientX;
        lastY = e.clientY;
        // Always snap to current cursor position before revealing
        gsap.set(image, { x: lastX, y: lastY });
        setX(lastX);
        setY(lastY);
        fade.play();
      };

      const onLeave = () => {
        fade.reverse();
      };

      const onMove = (e: MouseEvent) => {
        lastX = e.clientX;
        lastY = e.clientY;
        setX(lastX);
        setY(lastY);
      };

      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      row.addEventListener("mousemove", onMove);

      cleanups.push(() => {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
        row.removeEventListener("mousemove", onMove);
        fade.kill();
      });
    });

    cleanupRef.current = cleanups;
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="bg-[#fefdf9] px-6 py-32 text-stone-900 md:px-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-24">
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
              <LetterSwapForward label="Floral Journal" className="font-serif font-light italic text-stone-900 justify-start" staggerFrom="first" staggerDuration={0.04} />
              <LetterSwapForward label="& articles" className="font-sans font-normal text-stone-900 justify-start" staggerFrom="first" staggerDuration={0.03} />
            </div>
          </div>
          <div className="flex flex-col justify-end lg:w-1/2">
            <p className="font-sans text-base leading-6 tracking-wide text-stone-500">
              Explore our latest flower design articles, guides, and inspiration
              for your next event or everyday blooms.
            </p>
          </div>
        </motion.div>

        {/* Article rows */}
        <div className="flex flex-col">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              ref={setRowRef(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex cursor-pointer items-center gap-12 border-t border-stone-200 px-6 py-12 transition-colors hover:bg-stone-50"
            >
              <img
                ref={setImgRef(index)}
                src={article.image}
                alt={article.title}
                className="pointer-events-none invisible fixed left-0 top-0 z-50 h-[280px] w-[220px] rounded-md object-cover opacity-0"
              />
              <div className="w-8 shrink-0">
                <p className="font-serif text-xl leading-7 text-stone-400">
                  {article.year}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl italic leading-8 tracking-[-1px] text-stone-900">
                  <LetterSwapForward label={article.title} className="font-serif italic text-stone-900 justify-start" staggerFrom="first" staggerDuration={0.03} />
                </h3>
                <p className="font-sans text-base leading-6 tracking-[-0.44px] text-stone-400">
                  {article.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
