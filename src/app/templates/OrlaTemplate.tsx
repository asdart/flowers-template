import { useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, RefObject } from "react";
import { animate, AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import img1 from "../../imports/69d50e85-28ba-4f32-ab47-dd90a5993b5e-WjrTzgrxiZfZnUZ4PuqC3ZlrMPhEiM.webp";
import img2 from "../../imports/a3b82b97-969a-46c6-9f9f-1b7e60527ba1-oQIVn2NTBfjBTc5z6BDTPD4O0dugLa.webp";
import img3 from "../../imports/3b3331d4-da53-4e0b-96c4-64dc7acffc92-WT4nsouZNxiXigrjikCHzDafAt0qIQ.webp";
import img4 from "../../imports/2ab68990-ddc0-4542-9fa3-4f534349b24b-MeNeEmlNG1vmTFbuvRKZw3HSgck6Zs.webp";
import img5 from "../../imports/cc47167a-8596-433b-9a1f-eb84fbff0369-meorDRy6dYTfGTJEzJM7dMRFEr0s2j.webp";
import img6 from "../../imports/e7c940f8-a673-4a4d-803b-1dc7d23ad25b-n0x9MEweLAo2nfKplAD5v9tXiauCvm.webp";
import flowerJpg from "../../imports/Flower.jpg";
/* ─────────────────────────────────────────────────────────────
   Shared tokens for the Orla template
   ───────────────────────────────────────────────────────────── */
const BG = "#f1ebe1";
const INK = "#141217";
const MUTED = "#8a8289";
const ACCENT = "#d5c4c7";

/* ─────────────────────────────────────────────────────────────
   Hero — editorial split layout
   Large serif title (regular / italic / regular) on the left,
   small image + mono paragraph beneath, and a tall image right.
   ───────────────────────────────────────────────────────────── */
type OrlaHeroProps = {
  heroRef: RefObject<HTMLElement | null>;
  sourceRef: RefObject<HTMLDivElement | null>;
  floating: boolean;
};

function OrlaHero({ heroRef, sourceRef, floating }: OrlaHeroProps) {
  return (
    <section
      ref={heroRef}
      className="relative w-full"
      style={{ backgroundColor: ACCENT, color: INK }}
    >
      {/* Subtle grain / vignette overlay for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, rgba(20,18,23,0.04), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(20,18,23,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 gap-10 px-6 pb-12 pt-28 md:grid-cols-12 md:gap-12 md:px-12 md:pb-16 md:pt-32 lg:pt-36">
        {/* ── Left column: title + caption block ── */}
        <div className="flex flex-col justify-between md:col-span-7 lg:col-span-7">
          {/* Oversized stacked title */}
          <div className="flex flex-col">
            {["Elevated", "Floral", "Artistry"].map((word, i) => (
              <motion.h1
                key={word}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`font-serif leading-[0.92] tracking-[-0.02em] ${
                  i === 1 ? "italic" : ""
                }`}
                style={{
                  fontSize: "clamp(3.5rem, 11vw, 10rem)",
                  fontWeight: 400,
                  color: INK,
                }}
              >
                {word}
              </motion.h1>
            ))}
          </div>

          {/* Bottom caption: small image + mono paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10 md:mt-20"
          >
            <div className="h-40 w-40 shrink-0 overflow-hidden sm:h-48 sm:w-48">
              <img
                src={img2}
                alt="Soft botanical detail from the studio"
                className="h-full w-full object-cover"
              />
            </div>

            <p
              className="max-w-md text-[12px] leading-[1.8] tracking-tight"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(20, 18, 23, 0.65)",
              }}
            >
              <span style={{ color: INK }}>Wilde Floral</span> stands as an
              unparalleled studio within the realm of botanical design. It is
              our belief that flowers are not merely decorative, but canvases
              upon which narratives of sophistication are painted. Our studio
              emerges as a distinguished curator of wild, poetic arrangements —
              transcending the conventional and embarking on an odyssey of
              creative ingenuity.
            </p>
          </motion.div>
        </div>

        {/* ── Right column: placeholder — the floating image lands here at scroll 0 ── */}
        <motion.div
          ref={sourceRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:col-span-5 lg:col-span-5"
        >
          <div className="h-full w-full">
            <img
              src={img6}
              alt={floating ? "" : "Sculptural floral composition featured by the studio"}
              aria-hidden={floating || undefined}
              className={`h-full max-h-[75vh] w-full object-cover md:max-h-none md:min-h-[70vh] ${
                floating ? "invisible" : ""
              }`}
            />
          </div>

        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   About split (two images + paragraph)
   ───────────────────────────────────────────────────────────── */
type OrlaAboutProps = {
  targetRef: RefObject<HTMLDivElement | null>;
  floating: boolean;
};

function OrlaAbout({ targetRef, floating }: OrlaAboutProps) {
  return (
    <section className="relative w-full px-6 py-28 md:px-16 md:py-40" style={{ backgroundColor: BG, color: INK }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        {/* Left image — on desktop this is the landing slot for the floating hero image */}
        <motion.div
          ref={targetRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:col-span-6 md:col-start-1"
        >
          <img
            src={img2}
            alt={floating ? "" : "Soft garden blooms"}
            aria-hidden={floating || undefined}
            className={`aspect-square w-full object-cover ${floating ? "invisible" : ""}`}
          />
        </motion.div>

        {/* Right paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-6 md:col-start-7 md:pt-8"
        >
          <p
            className="mx-auto max-w-md text-center font-mono text-[13px] leading-7 tracking-tight md:text-left"
            style={{ fontFamily: "var(--font-mono)", color: INK }}
          >
            At Wilde Flower Studio we believe in pushing creative boundaries. We
            color outside the lines of traditional floral design, transforming
            everyday blooms into something extraordinary.
          </p>
        </motion.div>

        {/* Left image (row 2) — img2 pushed here to make room for the floating hero image */}
        {floating && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 md:col-start-1"
          >
            <img
              src={img2}
              alt="Soft garden blooms"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </motion.div>
        )}

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-6 md:col-start-7 md:-mt-16"
        >
          <img src={img1} alt="Rich floral composition" className="aspect-[4/5] w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero + About wrapper — orchestrates the scroll-linked
   shared-element transition: the hero's right-column image
   glides diagonally into the About section's top-left slot.
   ───────────────────────────────────────────────────────────── */
type Rect = { x: number; y: number; w: number; h: number };

function OrlaHeroAbout() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [rects, setRects] = useState<{ src: Rect; tgt: Rect } | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [rects?.src.x ?? 0, rects?.tgt.x ?? 0],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [rects?.src.y ?? 0, rects?.tgt.y ?? 0],
  );
  const width = useTransform(
    scrollYProgress,
    [0, 1],
    [rects?.src.w ?? 0, rects?.tgt.w ?? 0],
  );
  const height = useTransform(
    scrollYProgress,
    [0, 1],
    [rects?.src.h ?? 0, rects?.tgt.h ?? 0],
  );

  useLayoutEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const measure = () => {
      const desktop = mql.matches;
      setIsDesktop(desktop);
      if (
        !desktop ||
        !wrapperRef.current ||
        !sourceRef.current ||
        !targetRef.current
      ) {
        setRects(null);
        return;
      }
      const wRect = wrapperRef.current.getBoundingClientRect();
      const sRect = sourceRef.current.getBoundingClientRect();
      const tRect = targetRef.current.getBoundingClientRect();
      setRects({
        src: {
          x: sRect.left - wRect.left,
          y: sRect.top - wRect.top,
          w: sRect.width,
          h: sRect.height,
        },
        tgt: {
          x: tRect.left - wRect.left,
          y: tRect.top - wRect.top,
          w: tRect.width,
          h: tRect.height,
        },
      });
    };
    measure();
    window.addEventListener("resize", measure);
    mql.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mql.removeEventListener("change", measure);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <OrlaHero heroRef={heroRef} sourceRef={sourceRef} floating={isDesktop} />
      <OrlaAbout targetRef={targetRef} floating={isDesktop} />

      {isDesktop && rects && (
        <motion.img
          src={img6}
          alt="Sculptural floral composition featured by the studio"
          style={{ x, y, width, height }}
          className="pointer-events-none absolute left-0 top-0 z-30 object-cover will-change-transform"
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Founder section
   ───────────────────────────────────────────────────────────── */
function OrlaFounder() {
  return (
    <section
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
      style={{ backgroundColor: "#d8d3bd", color: INK }}
    >
      {/* Soft blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${flowerJpg})`, filter: "blur(10px) saturate(0.85)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(20, 18, 23, 0.55)", color: "rgba(20, 18, 23, 1)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 md:col-start-2"
        >
          <img src={img4} alt="Clara, studio founder, walking among florals" className="aspect-[4/5] w-full object-cover" />
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 md:col-span-5 md:col-start-8"
        >
          <p
            className="text-[11px] uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255, 255, 255, 0.6)" }}
          >
            Our Founder
          </p>

          <p className="font-mono text-[13px] leading-7" style={{ fontFamily: "var(--font-mono)", color: "rgba(255, 255, 255, 1)" }}>
            Meet Clara, the floral enthusiast behind Wilde.
          </p>

          <p className="font-mono text-[13px] leading-7" style={{ fontFamily: "var(--font-mono)", color: "rgba(255, 255, 255, 1)" }}>
            For Clara, flowers are more than decor or accessory; they're a
            constant source of creativity, joy, and connection. Flowers create a
            universal experience of optimism and engagement: the right floral
            arrangement can brighten a day, a curated tablescape can make friends
            out of strangers. Through Wilde, Clara harnesses the transformative
            power of flowers to create memorable stories and unforgettable
            floral designs.
          </p>

          <a
            href="#about"
            className="font-mono text-[13px] underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255, 255, 255, 1)" }}
          >
            Learn more about our studio
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services (stacked list)
   ───────────────────────────────────────────────────────────── */
const services = [
  { label: "Weddings", image: img5 },
  { label: "Set Design", image: img6 },
  { label: "Brand Activations", image: img3 },
  { label: "Intimate Events", image: img1 },
  { label: "PR Gifting", image: img2 },
  { label: "Workshops", image: img4 },
];

function OrlaServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full px-6 py-28 md:px-16 md:py-40" style={{ backgroundColor: "#ffffff", color: INK }}>
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center text-[11px] uppercase tracking-[0.3em] md:mb-16"
          style={{ fontFamily: "var(--font-mono)", color: ACCENT }}
        >
          Our Services include
        </motion.p>

        <ul className="flex flex-col">
          {services.map((service, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.li
                key={service.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex cursor-default items-center justify-center py-2 md:py-3"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className="pointer-events-none font-serif text-4xl uppercase leading-[1.05] tracking-tight transition-opacity duration-300 md:text-5xl"
                  style={{
                    color: INK,
                    opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.25,
                  }}
                >
                  {service.label}
                </span>

                {/* Hover image — alternates left / right */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: 12 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={`pointer-events-none absolute top-1/2 z-10 h-44 w-32 -translate-y-1/2 overflow-hidden md:h-56 md:w-40 ${isRight ? "right-0" : "left-0"}`}
                    >
                      <img
                        src={service.image}
                        alt={service.label}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Our Work (grid of project cards)
   ───────────────────────────────────────────────────────────── */
const works = [
  {
    tag: "Events",
    title: "Thanksgiving Retreat 2026",
    image: img1,
    description: "An intimate autumn gathering styled with dried botanicals and heritage tableware.",
    rotation: -4,
  },
  {
    tag: "Events, Wedding Florals",
    title: "Allison & Gino",
    image: img5,
    description: "A late-summer vineyard wedding with cascading garden roses and taper candlelight.",
    rotation: 2,
  },
  {
    tag: "Editorial",
    title: "California Wedding Day Cover Shoot",
    image: img6,
    description: "A migration to soft pastels and organic forms for the beloved bridal publication.",
    rotation: 0,
  },
  {
    tag: "Events",
    title: "Sabrina's Bridal Shower",
    image: img2,
    description: "A playful garden luncheon layered with ribbons, ranunculus and hand-lettered menus.",
    rotation: 3,
  },
  {
    tag: "Events, Brand Activations",
    title: "Dodgers Stadium",
    image: img3,
    description: "A bold floral takeover for opening day, blending heritage blues with summer blooms.",
    rotation: -3,
  },
  {
    tag: "Editorial",
    title: "Archive Rentals Holiday Shoot",
    image: img4,
    description: "A moody winter editorial pairing vintage glassware with burgundy and moss tones.",
    rotation: 4,
  },
];

/* Arch carousel config */
const ANGLE_STEP = 36; // degrees between cards along the arc (wider = more distance)
const ARCH_RADIUS = 1300; // px — virtual radius of the arc
const DRAG_PER_CARD = 280; // px of horizontal drag to advance one card
const CARD_HEIGHT_CSS = "clamp(300px, 32vw, 420px)";
const CARD_WIDTH_CSS = "clamp(220px, 22vw, 300px)";

function ArchCard({
  work,
  index,
  rotation,
}: {
  work: (typeof works)[number];
  index: number;
  rotation: MotionValue<number>;
}) {
  // visual angle of this card in degrees (0 = centered at top of arch)
  const visualAngle = useTransform(rotation, (r) => index * ANGLE_STEP + r);

  const x = useTransform(visualAngle, (a) => ARCH_RADIUS * Math.sin((a * Math.PI) / 180));
  const y = useTransform(visualAngle, (a) => ARCH_RADIUS * (1 - Math.cos((a * Math.PI) / 180)));

  // All cards share the same size; only their position on the arc changes.
  const zIndex = useTransform(visualAngle, (a) => Math.round(100 - Math.abs(a)));

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex justify-center"
      style={{ zIndex }}
    >
      <motion.div
        className="overflow-hidden"
        style={{
          x,
          y,
          rotate: visualAngle,
          width: CARD_WIDTH_CSS,
          height: CARD_HEIGHT_CSS,
          transformOrigin: "center center",
        }}
      >
        <img
          src={work.image}
          alt={work.title}
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

function OrlaWork() {
  const initialCenter = Math.floor(works.length / 2);
  const rotation = useMotionValue(-initialCenter * ANGLE_STEP);
  const [activeIndex, setActiveIndex] = useState(initialCenter);
  const dragging = useRef(false);
  const dragStart = useRef({ pointerX: 0, value: 0 });

  const indexForRotation = (r: number) => {
    const i = Math.round(-r / ANGLE_STEP);
    return Math.max(0, Math.min(works.length - 1, i));
  };
  const rotationForIndex = (i: number) => -i * ANGLE_STEP;

  useMotionValueEvent(rotation, "change", (v) => {
    const i = indexForRotation(v);
    if (i !== activeIndex) setActiveIndex(i);
  });

  const snapTo = (i: number) => {
    const target = Math.max(0, Math.min(works.length - 1, i));
    animate(rotation, rotationForIndex(target), {
      type: "tween",
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    rotation.stop();
    dragging.current = true;
    dragStart.current = { pointerX: e.clientX, value: rotation.get() };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const delta = e.clientX - dragStart.current.pointerX;
    // drag right → rotation increases → activeIndex decreases (previous card centers)
    const newRot = dragStart.current.value + (delta / DRAG_PER_CARD) * ANGLE_STEP;
    const min = rotationForIndex(works.length - 1);
    const max = rotationForIndex(0);
    // hard clamp — no rubber-band bounce at the edges
    const clamped = Math.max(min, Math.min(max, newRot));
    rotation.set(clamped);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const delta = e.clientX - dragStart.current.pointerX;
    const startIndex = indexForRotation(dragStart.current.value);
    const SWIPE_THRESHOLD = 8; // px — any intentional swipe advances at least one card
    let target = startIndex;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      const extra = Math.max(1, Math.round(Math.abs(delta) / DRAG_PER_CARD));
      // drag right (positive delta) → previous card, drag left → next card
      target = startIndex - Math.sign(delta) * extra;
    }
    snapTo(target);
  };

  const active = works[activeIndex];

  return (
    <section
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 md:py-32"
      style={{ backgroundColor: BG, color: INK }}
    >
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-5">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-serif leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 5.2vw, 4.25rem)", color: INK }}
        >
          Selected works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md text-center text-[13px] leading-7"
          style={{ fontFamily: "var(--font-mono)", color: MUTED }}
        >
          We are a floral studio crafting wild, botanical experiences for weddings, events, and spaces.
        </motion.p>
      </div>

      <div className="relative mt-16 w-full select-none md:mt-24">
        {/* Arch track */}
        <div
          className="relative cursor-grab active:cursor-grabbing"
          style={{
            touchAction: "pan-y",
            height: `calc(${CARD_HEIGHT_CSS} + 180px)`,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          {works.map((work, i) => (
            <ArchCard key={work.title} work={work} index={i} rotation={rotation} />
          ))}

          {/* Active card caption — positioned close to the highlighted image */}
          <div
            className="pointer-events-none absolute inset-x-0 flex items-center justify-center px-6 pt-8"
            style={{
              top: `calc(${CARD_HEIGHT_CSS} + 20px)`,
              zIndex: 500,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex w-[343px] max-w-md flex-col items-center gap-2 text-center"
              >
                <p
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-mono)", color: ACCENT }}
                >
                  {active.tag}
                </p>
                <p
                  className="font-serif text-base leading-snug md:text-lg"
                  style={{ color: INK }}
                >
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Select Clients
   ───────────────────────────────────────────────────────────── */
const clients = [
  { tag: "Brand / Design / Development", caption: "Summer pool campaign for a playful beverage brand.", image: img5 },
  { tag: "Brand / Design / Development", caption: "A new brand & retail experience for a convenient composter.", image: img1 },
  { tag: "Brand / Design / Development", caption: "Refreshing herbal ingredients reimagined for a new generation.", image: img3 },
];

function OrlaClients() {
  return (
    <section
      className="w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
      style={{ backgroundColor: "#f8f1f2", color: INK }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl"
        >
          We've achieved unparalleled results for the brands that shape our culture.
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {clients.map((c, i) => (
            <motion.div
              key={c.caption}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col gap-5 ${i === 1 ? "md:mt-16" : ""}`}
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-sm">
                <img src={c.image} alt={c.caption} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-2 px-1">
                <p
                  className="text-[10px] uppercase tracking-[0.22em]"
                  style={{ fontFamily: "var(--font-mono)", color: ACCENT }}
                >
                  {c.tag}
                </p>
                <p className="max-w-xs font-serif text-lg leading-snug md:text-xl" style={{ color: INK }}>
                  {c.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Closing marquee + footer
   ───────────────────────────────────────────────────────────── */
function OrlaMarquee() {
  return (
    <div
      className="w-full overflow-hidden border-y py-6"
      style={{ backgroundColor: "#cfbec2", borderColor: "rgba(20, 18, 23, 0.15)" }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="mx-8 font-serif font-thin text-3xl uppercase tracking-tight md:text-5xl"
            style={{ color: MUTED }}
          >
            Creating florals for Los Angeles & Beyond ·
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function OrlaFooter() {
  return (
    <footer
      id="orla-contact"
      className="relative w-full overflow-hidden px-6 pb-0 pt-24 md:px-16"
      style={{ backgroundColor: INK, color: BG }}
    >

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-16">
        {/* Copyright */}
        <p
          className="text-[10px] uppercase tracking-[0.3em] opacity-60"
          style={{ fontFamily: "var(--font-mono)", color: BG }}
        >
          © 2026 Wilde Floral · All rights reserved · Site Credits
        </p>

        {/* Huge wordmark */}
        <div className="w-full overflow-hidden">
          <h2
            className="select-none text-center font-serif uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(6rem, 28vw, 22rem)", color: "rgba(241,235,225,0.15)", marginBottom: "-18px" }}
          >
            Wilde
          </h2>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   Testimonials carousel
   ───────────────────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "Helen's creative vision, personalized approach, and exceptional craftsmanship resulted in a design that perfectly encapsulated my style and needs.",
    name: "Laurie Payton",
  },
  {
    quote:
      "Wilde transformed our opening night into a living, breathing garden. Every arrangement felt intentional, poetic, and deeply our brand.",
    name: "Marcus Ford",
  },
  {
    quote:
      "Working with the studio was effortless — from the first mood board to the final stem, the attention to detail was unmatched.",
    name: "Isabella Nguyen",
  },
];

function OrlaTestimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    const total = testimonials.length;
    const wrapped = (next + total) % total;
    setDirection(next > index ? 1 : -1);
    setIndex(wrapped);
  };

  const current = testimonials[index];

  return (
    <section
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
      style={{ backgroundColor: "#f8f1f2", color: INK }}
    >
      <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-6 md:gap-10">
        {/* Prev */}
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => goTo(index - 1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80 md:h-12 md:w-12"
          style={{ backgroundColor: "rgba(20, 18, 23, 0.1)", color: INK }}
        >
          <span aria-hidden className="text-lg">←</span>
        </button>

        {/* Quote block */}
        <div className="flex flex-1 flex-col items-center gap-10 text-center md:gap-14">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-thin italic leading-[48px]"
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)",
                color: INK,
              }}
            >
              &ldquo;{current.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`name-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: ACCENT,
              }}
            >
              {current.name}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => goTo(index + 1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80 md:h-12 md:w-12"
          style={{ backgroundColor: "rgba(20, 18, 23, 0.1)", color: INK }}
        >
          <span aria-hidden className="text-lg">→</span>
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Contact — editorial inquiry form
   ───────────────────────────────────────────────────────────── */
function OrlaContact() {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const update =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    // Placeholder submission — wire this up to a real endpoint when available.
    setTimeout(() => setStatus("sent"), 900);
  };

  const fieldBase =
    "w-full rounded-full border bg-transparent px-5 py-3 text-base outline-none transition-colors placeholder:opacity-40 focus:border-[rgba(20,18,23,0.9)]";
  const fieldStyle = {
    borderColor: "rgba(20,18,23,0.35)",
    color: INK,
    fontFamily: "var(--font-mono)",
  } as const;
  const labelGroupCls = "font-serif text-lg leading-none";

  return (
    <section
      id="orla-inquire"
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
      style={{ backgroundColor: "#ffffff", color: INK }}
    >
      <div className="relative mx-auto flex max-w-3xl flex-col gap-14">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: INK }}
          >
            05 — Inquire
          </p>

          <h2
            className="font-serif leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)", color: INK }}
          >
            Let's create
            <br />
            something rare.
          </h2>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-col gap-8"
          style={{ color: INK }}
        >
          {/* Name */}
          <label className="flex flex-col gap-2">
            <span className={labelGroupCls} style={{ color: INK }}>
              Name
            </span>
            <input
              type="text"
              value={form.firstName}
              onChange={update("firstName")}
              className={fieldBase}
              style={fieldStyle}
            />
          </label>

          {/* Email */}
          <label className="flex flex-col gap-2">
            <span className={labelGroupCls} style={{ color: INK }}>
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              className={fieldBase}
              style={fieldStyle}
            />
          </label>

          {/* Message */}
          <label className="flex flex-col gap-2">
            <span className={labelGroupCls} style={{ color: INK }}>
              Message
            </span>
            <textarea
              rows={6}
              value={form.message}
              onChange={update("message")}
              className="w-full resize-y rounded-[28px] border bg-transparent px-5 py-4 text-base outline-none transition-colors placeholder:opacity-40 focus:border-[rgba(20,18,23,0.9)]"
              style={fieldStyle}
            />
          </label>

          <div className="mt-2 flex justify-start">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[11px] uppercase tracking-[0.3em] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: INK,
                color: BG,
                fontFamily: "var(--font-mono)",
              }}
            >
              <span>
                {status === "sent"
                  ? "Message sent"
                  : status === "submitting"
                  ? "Sending…"
                  : "Send inquiry"}
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Template root
   ───────────────────────────────────────────────────────────── */
export function OrlaTemplate() {
  return (
    <div className="w-full" style={{ backgroundColor: BG, color: INK }}>
      <OrlaHeroAbout />
      <OrlaFounder />
      <OrlaServices />
      <OrlaWork />
      <OrlaTestimonials />
      <OrlaClients />
      <OrlaContact />
      <OrlaMarquee />
      <OrlaFooter />
    </div>
  );
}
