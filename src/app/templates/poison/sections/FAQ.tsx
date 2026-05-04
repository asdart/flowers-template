import type { CSSProperties } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import poisonServices from "../../../../imports/poison-bloom-services.png";
import { DualClipWordmark } from "../components/DualClipWordmark";
import { HairlineDivider } from "../components/HairlineDivider";
import { SectionMarker } from "../components/SectionMarker";
import {
  CREAM,
  EASE_PRIMARY,
  HAIRLINE,
  INK,
  SOFT_WONK,
  bodyFont,
  displayFont,
} from "../tokens";
import { pv } from "../utils";

/* ═══════════════════════════════════════════════════════════════
   FAQ — "Frequently asked." with dual-clip title + accordion.

   The section title abuses the hero's clip-path mask: a slim
   horizontal floral strip sits behind the title, and the glyphs
   render in ink everywhere except where they cross the strip,
   where they flip to white. Same primitive as the hero, but the
   image is a wide thin band instead of a tall portrait.

   Below the title sits a six-row accordion. Each row has:
     · a 1px hairline above (drawn left → right with stagger)
     · a numbered marker `01.`
     · the question in Fraunces 300
     · a + glyph that rotates 45° to × on open
     · the answer revealed via height auto + opacity fade
   ═══════════════════════════════════════════════════════════════ */

const QUESTIONS: Array<{ q: string; a: string }> = [
  {
    q: "How far in advance should we book?",
    a: "For weddings and large installations we recommend reaching out six to nine months ahead. Smaller events and editorial shoots usually need three to four weeks of lead time. We can sometimes accommodate shorter notice — get in touch and we'll be honest about what's possible.",
  },
  {
    q: "Where do you work?",
    a: "Our home studio is in Lisbon and we work across Portugal at no extra travel cost. International work is welcome — recent commissions in London, Paris, Mexico City and New York. International rates are quoted with travel and lodging.",
  },
  {
    q: "Do you offer sample arrangements?",
    a: "Yes — for full wedding and event commissions, a single in-studio mock-up is included after the design phase. Additional samples are available at cost. For smaller commissions, we share detailed mood imagery and stem lists in lieu of a physical sample.",
  },
  {
    q: "What's your sustainability approach?",
    a: "We work seasonally with growers within a 200km radius wherever possible. Floral foam is never used. After every event arrangements travel on to a hospital, hospice or community partner — nothing goes to a skip while there's still life in a stem.",
  },
  {
    q: "How do deposits and timelines work?",
    a: "A 30% non-refundable deposit secures the date and triggers the design phase. The balance is due ten days before the event. We share a written timeline and shot list a week ahead so the day-of team has no questions.",
  },
  {
    q: "What happens to the flowers after the event?",
    a: "Anything we can save we save. Bouquets go home with guests; large installations are decomposed into smaller arrangements and delivered to a partner the following morning. We take photos and write a short note for our growers — the flowers' second life is part of the design.",
  },
];

const titleStyle: CSSProperties = {
  ...displayFont,
  fontWeight: 200,
  fontSize: pv(140),
  lineHeight: 1,
  letterSpacing: "-0.4vw",
  fontVariationSettings: SOFT_WONK,
  margin: 0,
  whiteSpace: "nowrap",
};

const TITLE_TOP = 96;
const STRIP_TOP = 132;
const STRIP_HEIGHT = 64;
const TITLE_AREA_H = TITLE_TOP + 144 + 96;

const TITLE_TOP_VW = pv(TITLE_TOP);
const STRIP_TOP_VW = pv(STRIP_TOP);
const STRIP_HEIGHT_VW = pv(STRIP_HEIGHT);
const TITLE_AREA_H_VW = pv(TITLE_AREA_H);

function Row({
  index,
  question,
  answer,
  open,
  onToggle,
  baseDelay,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  baseDelay: number;
}) {
  return (
    <li
      style={{
        position: "relative",
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      <HairlineDivider
        direction="ltr"
        delay={baseDelay}
        duration={0.9}
        trigger="view"
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{
          duration: 0.9,
          delay: baseDelay + 0.2,
          ease: EASE_PRIMARY,
        }}
      >
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "60px 1fr 32px",
            alignItems: "baseline",
            gap: 24,
            padding: "clamp(20px, 2.4vw, 32px) 0",
            color: INK,
            textAlign: "left",
          }}
        >
          <span
            style={{
              ...bodyFont,
              fontSize: 14,
              lineHeight: "24px",
              fontWeight: 300,
              color: INK,
            }}
          >
            {String(index + 1).padStart(2, "0")}.
          </span>
          <span
            style={{
              ...displayFont,
              fontWeight: 300,
              fontSize: "clamp(20px, 2.2vw, 32px)",
              lineHeight: 1.25,
              letterSpacing: "-0.5px",
              fontVariationSettings: SOFT_WONK,
              color: INK,
            }}
          >
            {question}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.45, ease: EASE_PRIMARY }}
            style={{
              ...displayFont,
              fontWeight: 200,
              fontSize: 28,
              lineHeight: 1,
              color: INK,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "flex-end",
              transformOrigin: "center",
            }}
          >
            +
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.5, ease: EASE_PRIMARY },
                opacity: { duration: 0.35, ease: EASE_PRIMARY },
              }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 32px",
                  gap: 24,
                  paddingBottom: "clamp(20px, 2.4vw, 32px)",
                }}
              >
                <span />
                <p
                  style={{
                    ...bodyFont,
                    fontSize: 14,
                    lineHeight: "24px",
                    fontWeight: 300,
                    color: INK,
                    margin: 0,
                    maxWidth: 560,
                  }}
                >
                  {answer}
                </p>
                <span />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </li>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="poison-faq"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1200,
          padding: "clamp(96px, 9.6vw, 144px) clamp(24px, 5.6vw, 80px)",
        }}
      >
        <SectionMarker number={5} label="Notes" trigger="view" />

        {/* ───────────────────── DESKTOP TITLE ─────────────────────
            Dual-clip — slim floral strip sits behind the title; the
            glyphs flip from ink to white where they cross the
            strip. Same primitive as the hero and About. */}
        <h2
          className="sr-only"
          aria-label="Frequently asked."
        >
          Frequently asked.
        </h2>
        <div
          className="relative mt-10 hidden md:block"
          style={{ height: TITLE_AREA_H_VW }}
        >
          <DualClipWordmark
            imageSrc={poisonServices}
            imageAlt=""
            imageRect={{
              left: "0px",
              top: STRIP_TOP_VW,
              width: "100%",
              height: STRIP_HEIGHT_VW,
            }}
            parentSize={{ width: "100%", height: TITLE_AREA_H_VW }}
            imageReveal
            imageKenBurns={false}
            imageDelay={0.2}
            inkColor={INK}
            renderText={(color) => (
              <motion.div
                aria-hidden
                className="absolute"
                style={{
                  ...titleStyle,
                  left: 0,
                  top: TITLE_TOP_VW,
                  color,
                }}
                initial={{ x: pv(-110), opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.5, delay: 0.6, ease: EASE_PRIMARY }}
              >
                Frequently asked.
              </motion.div>
            )}
          />
        </div>

        {/* Mobile title */}
        <h2
          className="mt-8 md:hidden"
          aria-label="Frequently asked."
          style={{
            ...displayFont,
            fontWeight: 200,
            fontSize: "clamp(40px, 12vw, 72px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            fontVariationSettings: SOFT_WONK,
            color: INK,
            margin: 0,
          }}
        >
          Frequently asked.
        </h2>

        {/* Accordion */}
        <ol
          className="relative mt-12 flex flex-col"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {QUESTIONS.map((row, i) => (
            <Row
              key={row.q}
              index={i}
              question={row.q}
              answer={row.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              baseDelay={0.2 + i * 0.08}
            />
          ))}

          {/* Closing hairline below the last row. */}
          <li
            aria-hidden
            className="relative"
            style={{ height: 1, listStyle: "none", padding: 0, margin: 0 }}
          >
            <HairlineDivider
              direction="ltr"
              delay={0.2 + QUESTIONS.length * 0.08}
              duration={0.9}
              trigger="view"
              style={{ position: "absolute", top: 0, left: 0, right: 0 }}
            />
          </li>
        </ol>

        {/* Trailing micro-row — small text + link to contact. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE_PRIMARY }}
          className="mt-10 flex w-full items-baseline justify-between"
        >
          <p
            style={{
              ...bodyFont,
              fontSize: 12,
              lineHeight: "20px",
              fontWeight: 300,
              color: INK,
              opacity: 0.6,
              margin: 0,
            }}
          >
            Don't see your question?
          </p>
          <a
            href="#poison-contact"
            style={{
              ...bodyFont,
              fontSize: 12,
              lineHeight: "20px",
              fontWeight: 300,
              color: INK,
              textDecoration: "none",
              borderBottom: `1px solid ${HAIRLINE}`,
            }}
          >
            Write to us →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
