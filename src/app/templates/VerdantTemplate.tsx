import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "motion/react";
import img1 from "../../imports/69d50e85-28ba-4f32-ab47-dd90a5993b5e-WjrTzgrxiZfZnUZ4PuqC3ZlrMPhEiM.webp";
import img2 from "../../imports/a3b82b97-969a-46c6-9f9f-1b7e60527ba1-oQIVn2NTBfjBTc5z6BDTPD4O0dugLa.webp";
import img3 from "../../imports/3b3331d4-da53-4e0b-96c4-64dc7acffc92-WT4nsouZNxiXigrjikCHzDafAt0qIQ.webp";
import img4 from "../../imports/2ab68990-ddc0-4542-9fa3-4f534349b24b-MeNeEmlNG1vmTFbuvRKZw3HSgck6Zs.webp";
import img5 from "../../imports/cc47167a-8596-433b-9a1f-eb84fbff0369-meorDRy6dYTfGTJEzJM7dMRFEr0s2j.webp";
import img6 from "../../imports/e7c940f8-a673-4a4d-803b-1dc7d23ad25b-n0x9MEweLAo2nfKplAD5v9tXiauCvm.webp";
import {
  LuminaInteractiveList,
  type LuminaSlide,
} from "../components/ui/lumina-interactive-list";

/* ─────────────────────────────────────────────────────────────
   Verdant — editorial botanical studio in a bold forest palette.
   Typography: Fraunces (display) / DM Sans (body).
   ───────────────────────────────────────────────────────────── */
const GREEN = "#2f8a3e";
const FOREST = "#0f1a15";
const CREAM = "#e8e6dc";
const INK = "#0a0f0c";
const BONE = "#faf8f2";

const displayFont = { fontFamily: "var(--font-display)" };
const bodyFont = { fontFamily: "var(--font-body)" };

/* Reusable arch decoration (thin curved line, Cedar-style) */
function ArchLine({
  className = "",
  stroke = "rgba(255,255,255,0.25)",
  strokeWidth = 1,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${className}`}
      fill="none"
    >
      <path
        d="M0,400 C0,180 180,0 400,0"
        stroke={stroke}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero — bold green, large serif statement, giant wordmark
   ───────────────────────────────────────────────────────────── */
function VerdantHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: GREEN, color: INK }}
    >
      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-6 pb-0 pt-32 md:px-12 md:pt-40">
        {/* Lead statement */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[1100px] text-center leading-[1.05] tracking-tight"
          style={{
            ...displayFont,
            fontSize: "clamp(2rem, 4.8vw, 4.25rem)",
            fontWeight: 400,
            color: INK,
          }}
        >
          Wild, botanical artistry for weddings, events &amp; brand stories. We
          are a floral studio focused on sculptural arrangements, considered
          palettes, and unforgettable moments.
        </motion.h1>

        {/* Giant wordmark at the bottom, slightly cropped (Cedar-style) */}
        <div className="relative -mb-8 mt-16 w-full md:-mb-16 md:mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.3,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="select-none whitespace-nowrap text-center leading-[0.78] tracking-[-0.02em]"
            style={{
              ...displayFont,
              fontSize: "clamp(6rem, 22vw, 20rem)",
              fontWeight: 600,
              color: INK,
            }}
          >
            Verdant
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Intro — eyebrow + two stacked serif statements (about the studio)
   ───────────────────────────────────────────────────────────── */
function VerdantIntro() {
  return (
    <section
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
      style={{ backgroundColor: BONE, color: INK }}
    >
      {/* Decorative arch at top-left */}
      <ArchLine
        className="left-[-120px] top-[60px] h-[380px] w-[380px] md:left-[60px] md:top-[80px] md:h-[420px] md:w-[420px]"
        stroke="rgba(10,15,12,0.45)"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-2 md:pt-3">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ ...bodyFont, color: INK }}
          >
            Hi there, we're Verdant
          </motion.p>
        </div>

        <div className="flex flex-col gap-10 md:col-span-9 md:col-start-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="leading-[1.05] tracking-tight"
            style={{
              ...displayFont,
              fontSize: "clamp(2rem, 4.8vw, 3.75rem)",
              fontWeight: 400,
              color: INK,
            }}
          >
            Don't worry about sounding floral. Sound like you. We can help tell
            that story in bloom.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="leading-[1.15] tracking-tight"
            style={{
              ...displayFont,
              fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
              fontWeight: 400,
              color: INK,
            }}
          >
            At Verdant, we're hyper-focused on helping our clients create
            celebrations rooted in nature, craft, and intention.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA — dark green block with arch decoration, bold statement + button
   ───────────────────────────────────────────────────────────── */
function VerdantCTA() {
  return (
    <section
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
      style={{ backgroundColor: FOREST, color: BONE }}
    >
      {/* Large arch line - right side */}
      <ArchLine
        className="right-[-80px] top-[-40px] h-[680px] w-[680px] md:right-0 md:top-[-60px] md:h-[900px] md:w-[900px]"
        stroke="rgba(207,226,200,0.35)"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl leading-[1.02] tracking-tight"
          style={{
            ...displayFont,
            fontSize: "clamp(2.5rem, 6.2vw, 5.25rem)",
            fontWeight: 400,
            color: BONE,
          }}
        >
          Personalized floral strategies for your most meaningful moments.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#verdant-services"
            className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition-opacity hover:opacity-90"
            style={{ ...bodyFont, backgroundColor: GREEN, color: INK }}
          >
            Our Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services — dark grid with four floral offerings
   ───────────────────────────────────────────────────────────── */
const services = [
  {
    title: "Weddings",
    copy:
      "From intimate ceremonies to sweeping receptions, we design complete floral experiences tailored to your story — from arbors and bouquets to tablescapes and lasting installations.",
  },
  {
    title: "Brand Activations",
    copy:
      "Bold botanical environments built for editorial shoots, press events, and campaign launches. We translate brand language into sculptural floral worlds your audience remembers.",
  },
  {
    title: "Set Design",
    copy:
      "Film, photography, and experiential sets treated as living compositions. Every stem is chosen to move the narrative forward and hold up under the lens.",
  },
  {
    title: "Workshops",
    copy:
      "Small-group sessions inside the studio where we share our process — composition, color, mechanics — alongside seasonal blooms sourced from local growers.",
  },
];

function VerdantServices() {
  return (
    <section
      id="verdant-services"
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
      style={{ backgroundColor: FOREST, color: BONE }}
    >
      {/* Subtle arch overlays */}
      <ArchLine
        className="left-[-200px] bottom-[-200px] h-[700px] w-[700px] md:h-[900px] md:w-[900px]"
        stroke="rgba(207,226,200,0.18)"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-20 md:gap-y-24">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: (i % 2) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-5"
            >
              <h3
                className="leading-tight"
                style={{
                  ...displayFont,
                  fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)",
                  fontWeight: 400,
                  color: BONE,
                }}
              >
                {service.title}
              </h3>
              <p
                className="max-w-sm text-[13px] leading-[1.7]"
                style={{ ...bodyFont, color: "rgba(232,230,220,0.72)" }}
              >
                {service.copy}
              </p>
              <div
                className="mt-3 h-px w-32"
                style={{ backgroundColor: "rgba(232,230,220,0.4)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mission — cream background, large serif statement + arch-framed image
   ───────────────────────────────────────────────────────────── */
function VerdantMission() {
  return (
    <section
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-12">
        {/* Copy column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:col-span-6 md:pr-10"
        >
          <p
            className="mb-8 text-[11px] uppercase tracking-[0.28em]"
            style={{ ...bodyFont, color: INK }}
          >
            Our Mission
          </p>

          <h2
            className="leading-[1.05] tracking-tight"
            style={{
              ...displayFont,
              fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)",
              fontWeight: 400,
              color: INK,
            }}
          >
            At Verdant, we take the mystery out of building a floral identity
            that lasts.
          </h2>

          <div className="mt-10 flex items-center gap-6">
            {/* Thin curved connector (decorative) */}
            <svg
              aria-hidden
              viewBox="0 0 180 80"
              className="hidden h-16 w-40 md:block"
              fill="none"
            >
              <path
                d="M2,2 C2,60 80,78 178,78"
                stroke={INK}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <a
              href="#verdant-contact"
              className="inline-flex items-center rounded-sm border px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition-colors hover:bg-[#0a0f0c] hover:text-[#e8e6dc]"
              style={{ ...bodyFont, borderColor: INK, color: INK }}
            >
              Learn more about us
            </a>
          </div>
        </motion.div>

        {/* Arch-framed image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:col-span-6"
        >
          <div
            className="aspect-[4/5] w-full overflow-hidden"
            style={{
              borderTopLeftRadius: "9999px",
              borderTopRightRadius: "9999px",
            }}
          >
            <img
              src={img3}
              alt="Verdant studio team composing arrangements"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Marquee — serif italic, Cedar-style rolling adjectives
   ───────────────────────────────────────────────────────────── */
function VerdantMarquee() {
  const words = ["Wild", "Elevated", "Botanical", "Sculptural", "Seasonal"];
  return (
    <div
      className="w-full overflow-hidden py-10 md:py-14"
      style={{ backgroundColor: CREAM }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 4 }).map((_, groupIndex) => (
          <div key={groupIndex} className="flex shrink-0 items-center">
            {words.map((word) => (
              <span
                key={`${groupIndex}-${word}`}
                className="mx-6 inline-flex items-center gap-6 md:mx-10 md:gap-10"
                style={{
                  ...displayFont,
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: INK,
                  letterSpacing: "-0.01em",
                }}
              >
                {word}
                <span aria-hidden style={{ color: INK }}>
                  ·
                </span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Work — immersive Lumina slider with glass-refraction transitions
   ───────────────────────────────────────────────────────────── */
const works: LuminaSlide[] = [
  {
    tag: "Events",
    title: "Thanksgiving Retreat",
    description:
      "An intimate autumn gathering styled with dried botanicals and heritage tableware.",
    media: img1,
  },
  {
    tag: "Wedding",
    title: "Allison & Gino",
    description:
      "A late-summer vineyard wedding with cascading garden roses and taper candlelight.",
    media: img2,
  },
  {
    tag: "Editorial",
    title: "California Wedding Day",
    description:
      "Soft pastels and organic forms reimagined for the beloved bridal publication.",
    media: img6,
  },
  {
    tag: "Events",
    title: "Sabrina's Bridal Shower",
    description:
      "A playful garden luncheon layered with ribbons, ranunculus and hand-lettered menus.",
    media: img3,
  },
  {
    tag: "Activation",
    title: "Dodgers Stadium",
    description:
      "A bold floral takeover for opening day, blending heritage blues with summer blooms.",
    media: img4,
  },
  {
    tag: "Editorial",
    title: "Archive Rentals",
    description:
      "A moody winter editorial pairing vintage glassware with burgundy and moss tones.",
    media: img5,
  },
];

function VerdantWork() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: BONE, color: INK }}
    >
      {/* Constrained header */}
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-16 md:pb-20 md:pt-40">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ ...bodyFont, color: INK }}
          >
            Selected work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl leading-[1.05] tracking-tight"
            style={{
              ...displayFont,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: INK,
            }}
          >
            Florals that shape the moments people remember.
          </motion.h2>
        </div>
      </div>

      {/* Full-width, full-height slider */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
          <LuminaInteractiveList
            slides={works}
            autoSlideMs={6000}
            transitionDuration={2.2}
            accentColor={GREEN}
            overlayColor="rgba(15, 26, 21, 0.52)"
            className="h-full"
          />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Contact — simple editorial inquiry block
   ───────────────────────────────────────────────────────────── */
function VerdantContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const update =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setTimeout(() => setStatus("sent"), 900);
  };

  const fieldCls =
    "w-full border-b bg-transparent py-3 text-base outline-none transition-colors placeholder:opacity-40";
  const fieldStyle = {
    ...bodyFont,
    borderColor: "rgba(232,230,220,0.35)",
    color: BONE,
  } as const;

  return (
    <section
      id="verdant-contact"
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
      style={{ backgroundColor: FOREST, color: BONE }}
    >
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-[11px] uppercase tracking-[0.28em]"
            style={{ ...bodyFont, color: BONE }}
          >
            Get in touch
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="leading-[1.05] tracking-tight"
            style={{
              ...displayFont,
              fontSize: "clamp(2.25rem, 4.4vw, 3.5rem)",
              fontWeight: 400,
              color: BONE,
            }}
          >
            Let's grow something together.
          </motion.h2>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 md:col-span-6 md:col-start-7"
        >
          <label className="flex flex-col gap-2">
            <span
              className="text-[10px] uppercase tracking-[0.28em]"
              style={{ ...bodyFont, color: "rgba(232,230,220,0.6)" }}
            >
              Name
            </span>
            <input
              type="text"
              value={form.name}
              onChange={update("name")}
              className={fieldCls}
              style={fieldStyle}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span
              className="text-[10px] uppercase tracking-[0.28em]"
              style={{ ...bodyFont, color: "rgba(232,230,220,0.6)" }}
            >
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              className={fieldCls}
              style={fieldStyle}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span
              className="text-[10px] uppercase tracking-[0.28em]"
              style={{ ...bodyFont, color: "rgba(232,230,220,0.6)" }}
            >
              Project notes
            </span>
            <textarea
              rows={4}
              value={form.message}
              onChange={update("message")}
              className={`${fieldCls} resize-y`}
              style={fieldStyle}
            />
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-sm px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ ...bodyFont, backgroundColor: GREEN, color: INK }}
          >
            {status === "sent"
              ? "Message sent"
              : status === "submitting"
              ? "Sending…"
              : "Send inquiry"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Footer — editorial, white background, giant wordmark
   ───────────────────────────────────────────────────────────── */
const footerColumns = [
  {
    heading: "Learn",
    links: [
      { label: "Services", href: "#verdant-services" },
      { label: "About", href: "#" },
      { label: "Journal", href: "#" },
    ],
  },
  {
    heading: "Contact",
    links: [{ label: "Get started", href: "#verdant-contact" }],
  },
];

function SocialIcon({ path }: { path: string }) {
  return (
    <a
      href="#"
      className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:bg-[#0a0f0c] hover:text-[#faf8f2]"
      style={{ borderColor: INK, color: INK }}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="currentColor"
      >
        <path d={path} />
      </svg>
    </a>
  );
}

function VerdantFooter() {
  return (
    <footer
      className="relative w-full overflow-hidden px-6 pt-20 md:px-16 md:pt-28"
      style={{ backgroundColor: BONE, color: INK }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        {/* Top block: statement + link columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Statement */}
          <div className="md:col-span-6">
            <h2
              className="leading-[1.05] tracking-tight"
              style={{
                ...displayFont,
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 400,
                color: INK,
              }}
            >
              Crafting florals for Los Angeles &amp; beyond.
            </h2>
            <p
              className="mt-5 max-w-sm text-[13px] leading-[1.7]"
              style={{ ...bodyFont, color: "rgba(10,15,12,0.6)" }}
            >
              A botanical studio designing weddings, events, and campaigns
              across Southern California.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <p
                  className="text-[11px] uppercase tracking-[0.28em]"
                  style={{ ...bodyFont, color: INK, fontWeight: 600 }}
                >
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[11px] uppercase tracking-[0.22em] underline underline-offset-4 transition-opacity hover:opacity-70"
                        style={{ ...bodyFont, color: INK }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Connect */}
            <div className="flex flex-col gap-4">
              <p
                className="text-[11px] uppercase tracking-[0.28em]"
                style={{ ...bodyFont, color: INK, fontWeight: 600 }}
              >
                Connect
              </p>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <SocialIcon path="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.5.4 1.2.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.1-.3 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.5.2-1.2.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.1-.1-1.9-.3-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.5-.4-1.2-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.1.3-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .5-.2 1.2-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.4-.3 1-.4 2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.1 1 .3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.4.3-1 .4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.1-1-.3-2-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm5.2-2.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
                {/* Pinterest */}
                <SocialIcon path="M12 2.4a9.6 9.6 0 0 0-3.5 18.5c-.1-.8-.1-2 0-2.8l1.1-4.6s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.4 0 .8-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.7 0-2.4-1.8-4.1-4.2-4.1-2.9 0-4.6 2.2-4.6 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.1.2-.3.1-1.1-.5-1.8-2.1-1.8-3.4 0-2.7 2-5.3 5.7-5.3 3 0 5.3 2.1 5.3 5 0 3-1.9 5.4-4.5 5.4-.9 0-1.7-.5-2-1l-.5 2c-.2.8-.8 1.7-1.1 2.3A9.6 9.6 0 1 0 12 2.4z" />
                {/* Linkedin */}
                <SocialIcon path="M20.5 2.4h-17A1.1 1.1 0 0 0 2.4 3.5v17a1.1 1.1 0 0 0 1.1 1.1h17a1.1 1.1 0 0 0 1.1-1.1v-17A1.1 1.1 0 0 0 20.5 2.4zM8.4 18.6h-3V10h3v8.6zM6.9 8.7A1.7 1.7 0 1 1 6.9 5.3 1.7 1.7 0 0 1 6.9 8.7zm11.7 9.9h-3v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3h-3V10h2.9v1.2a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7v4.3z" />
              </div>
            </div>
          </div>
        </div>

        {/* Divider + legal */}
        <div
          className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(10,15,12,0.2)" }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.28em]"
            style={{ ...bodyFont, color: "rgba(10,15,12,0.55)" }}
          >
            © 2026 Verdant Floral · All rights reserved
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.28em]"
            style={{ ...bodyFont, color: "rgba(10,15,12,0.55)" }}
          >
            Los Angeles, California
          </p>
        </div>

        {/* Giant wordmark */}
        <div className="w-full overflow-hidden">
          <h2
            className="select-none whitespace-nowrap text-center leading-[0.78] tracking-[-0.02em]"
            style={{
              ...displayFont,
              fontSize: "clamp(6rem, 22vw, 20rem)",
              fontWeight: 600,
              color: INK,
              marginBottom: "-18px",
            }}
          >
            Verdant
          </h2>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   Template root
   ───────────────────────────────────────────────────────────── */
export function VerdantTemplate() {
  return (
    <div
      className="w-full"
      style={{ backgroundColor: BONE, color: INK, ...bodyFont }}
    >
      <VerdantHero />
      <VerdantIntro />
      <VerdantCTA />
      <VerdantServices />
      <VerdantMission />
      <VerdantMarquee />
      <VerdantWork />
      <VerdantContact />
      <VerdantFooter />
    </div>
  );
}
