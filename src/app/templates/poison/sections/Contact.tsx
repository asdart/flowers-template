import type { CSSProperties } from "react";
import { useState } from "react";
import { motion } from "motion/react";
import poisonContactHero from "../../../../imports/poison-bloom-contact-hero.png";
import { DualClipWordmark } from "../components/DualClipWordmark";
import {
  CREAM,
  EASE_OVERSHOOT,
  EASE_PRIMARY,
  HAIRLINE,
  INK,
  SOFT_WONK,
  TEAL,
  TEAL_DARK,
  bodyFont,
  displayFont,
} from "../tokens";
import { pv } from "../utils";

/* ═══════════════════════════════════════════════════════════════
   CONTACT — Closing bookend.

   Matches Figma "Global sections / Contact form" (12511:7560).

   The dual-clip motif is anchored to the LEFT side of the stage:
   a 411×600 floral rectangle sits with its left edge at x=80 of
   the 1374×800 reference frame. "Get in" and "Touch" stack
   vertically with their right halves extending past the image's
   right edge — INK on the cream margin, CREAM where the glyphs
   cross the floral. This frees the right side of the section as
   open canvas, and the contact form drops into that canvas
   right-aligned to the section's 80-px gutter.

   Form: hairline-underline inputs (border-bottom only, focus
   ring TEAL), four project-type toggle chips, textarea, TEAL
   submit button with overshoot spring entrance. Stagger order
   matches reading order so each field lands top-to-bottom in
   sync with the user's eye scan.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Figma reference frame (1374 × 800) ──────────────────────── */
const SECTION_H = 800;
const IMG_LEFT = 80;
const IMG_TOP = 100;
const IMG_W = 411;
const IMG_H = 600;

/* "Get in" anchored at center-x 442 / top 431. "Touch" anchored
   at center-x 550 / top 560. Both apply translateX(-50%) at the
   anchor so the wordmark is horizontally centred on its
   coordinate. Right halves of both extend past the image's right
   edge (491 = IMG_LEFT + IMG_W) so the colour flips back to ink
   on the cream margin. */
const GET_IN_CX = 442;
const GET_IN_TOP = 431;
const TOUCH_CX = 550;
const TOUCH_TOP = 560;

const WORDMARK_FONT = 152;

const SECTION_H_VW = pv(SECTION_H);
const IMG_LEFT_VW = pv(IMG_LEFT);
const IMG_TOP_VW = pv(IMG_TOP);
const IMG_W_VW = pv(IMG_W);
const IMG_H_VW = pv(IMG_H);
const GET_IN_CX_VW = pv(GET_IN_CX);
const GET_IN_TOP_VW = pv(GET_IN_TOP);
const TOUCH_CX_VW = pv(TOUCH_CX);
const TOUCH_TOP_VW = pv(TOUCH_TOP);

/* Form column geometry — top edge anchored to the image's top so
   the form and the photograph share a horizontal sightline. The
   right edge keeps an 80-px gutter (matching the image's left
   gutter), and width is sized to leave generous breathing room
   between the wordmark's right extent and the form's left edge. */
const FORM_TOP = 120;
const FORM_RIGHT = 80;
const FORM_WIDTH = 520;

const FORM_TOP_VW = pv(FORM_TOP);
const FORM_RIGHT_VW = pv(FORM_RIGHT);
const FORM_WIDTH_VW = pv(FORM_WIDTH);

const wordStyle: CSSProperties = {
  ...displayFont,
  fontWeight: 300,
  fontStyle: "normal",
  fontSize: pv(WORDMARK_FONT),
  lineHeight: pv(WORDMARK_FONT),
  letterSpacing: "-0.026em",
  fontVariationSettings: SOFT_WONK,
  margin: 0,
  whiteSpace: "nowrap",
};

const PROJECT_TYPES = [
  "Wedding",
  "Brand activation",
  "Set design",
  "Other",
] as const;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        ...displayFont,
        fontSize: 13,
        lineHeight: "20px",
        fontWeight: 200,
        letterSpacing: "0.08em",
        fontVariationSettings: SOFT_WONK,
        color: INK,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function HairlineInput({
  type = "text",
  name,
  placeholder,
  required,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { name: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...bodyFont,
        width: "100%",
        background: "transparent",
        border: "none",
        outline: "none",
        borderBottom: `1px solid ${focused ? TEAL : HAIRLINE}`,
        padding: "10px 0",
        fontSize: 15,
        lineHeight: "22px",
        color: INK,
        fontWeight: 300,
        transition: "border-color 240ms ease",
      }}
      {...rest}
    />
  );
}

/* ─── Form (shared between desktop right-column and mobile stack) ─── */

function ContactFormBody({
  type,
  setType,
  submitted,
  onSubmit,
  compact = false,
}: {
  type: typeof PROJECT_TYPES[number];
  setType: (t: typeof PROJECT_TYPES[number]) => void;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
  /* Compact mode tightens the gap between fields when the form
     lives inside the desktop right column (where vertical room
     is bounded by the image height); the mobile stack uses the
     looser default gap. */
  compact?: boolean;
}) {
  const fieldGap = compact ? 18 : 24;
  return (
    <motion.form
      onSubmit={onSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.6 },
        },
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: fieldGap,
        width: "100%",
      }}
    >
      <motion.label
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE_PRIMARY },
          },
        }}
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <FieldLabel>Name</FieldLabel>
        <HairlineInput name="name" placeholder="Your full name" required />
      </motion.label>

      <motion.label
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE_PRIMARY },
          },
        }}
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <FieldLabel>Email</FieldLabel>
        <HairlineInput
          name="email"
          type="email"
          placeholder="hello@yourdomain.com"
          required
        />
      </motion.label>

      <motion.fieldset
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE_PRIMARY },
          },
        }}
        style={{
          border: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <legend style={{ padding: 0, margin: 0 }}>
          <FieldLabel>Project type</FieldLabel>
        </legend>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {PROJECT_TYPES.map((option) => {
            const active = type === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setType(option)}
                style={{
                  ...bodyFont,
                  cursor: "pointer",
                  padding: "6px 14px",
                  fontSize: 13,
                  lineHeight: "20px",
                  fontWeight: 300,
                  color: active ? "#fff" : INK,
                  backgroundColor: active ? INK : "transparent",
                  border: `1px solid ${active ? INK : HAIRLINE}`,
                  transition:
                    "background-color 240ms ease, color 240ms ease, border-color 240ms ease",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </motion.fieldset>

      <motion.label
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE_PRIMARY },
          },
        }}
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <FieldLabel>Tell us about your event</FieldLabel>
        <textarea
          name="message"
          rows={compact ? 3 : 4}
          placeholder="Date, location, mood, anything that comes to mind."
          style={{
            ...bodyFont,
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            borderBottom: `1px solid ${HAIRLINE}`,
            padding: "10px 0",
            fontSize: 15,
            lineHeight: "22px",
            color: INK,
            fontWeight: 300,
            resize: "vertical",
            fontFamily: bodyFont.fontFamily,
          }}
        />
      </motion.label>

      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: EASE_OVERSHOOT },
          },
        }}
        style={{ marginTop: 4 }}
      >
        <button
          type="submit"
          disabled={submitted}
          style={{
            ...bodyFont,
            cursor: submitted ? "default" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: submitted ? "#0f3942" : TEAL,
            color: "#fff",
            padding: "10px 22px",
            fontSize: 13,
            lineHeight: "18px",
            fontWeight: 400,
            border: "none",
            textDecoration: "none",
            transition:
              "background-color 240ms ease, transform 240ms ease",
          }}
          onMouseEnter={(e) => {
            if (submitted) return;
            (e.currentTarget as HTMLElement).style.backgroundColor = TEAL_DARK;
          }}
          onMouseLeave={(e) => {
            if (submitted) return;
            (e.currentTarget as HTMLElement).style.backgroundColor = TEAL;
          }}
        >
          {submitted ? "Message sent — we'll be in touch." : "Send message"}
        </button>
      </motion.div>
    </motion.form>
  );
}

export function Contact() {
  const [type, setType] = useState<typeof PROJECT_TYPES[number]>("Wedding");
  const [submitted, setSubmitted] = useState(false);

  /* No real backend — simulate the success state so the section
     stays self-contained. Wire to a real endpoint as a follow-up. */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="poison-contact"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      {/* ───────────────────── DESKTOP — split composition ─────────
          Single fixed-height stage: dual-clip motif on the left,
          form on the right. Both share the same vertical centre
          line so the two columns feel deliberately balanced
          rather than adjacent. */}
      <div
        className="relative hidden md:block w-full"
        style={{ height: SECTION_H_VW }}
      >
        <h2 className="sr-only" aria-label="Get in Touch">
          Get in Touch
        </h2>

        <DualClipWordmark
          imageSrc={poisonContactHero}
          imageAlt=""
          imageRect={{
            left: IMG_LEFT_VW,
            top: IMG_TOP_VW,
            width: IMG_W_VW,
            height: IMG_H_VW,
          }}
          parentSize={{ width: "100vw", height: SECTION_H_VW }}
          imageReveal
          imageKenBurns
          imageDelay={0.15}
          inkColor={INK}
          renderText={(color) => (
            <>
              {/* Outer wrapper centres the word on its anchor; inner
                  motion.div handles the slide-in offset so framer's
                  transform doesn't fight with translateX(-50%). */}
              <div
                aria-hidden
                className="absolute"
                style={{
                  left: GET_IN_CX_VW,
                  top: GET_IN_TOP_VW,
                  transform: "translateX(-50%)",
                }}
              >
                <motion.div
                  style={{ ...wordStyle, color }}
                  initial={{ x: pv(-90), opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1.5, delay: 0.4, ease: EASE_PRIMARY }}
                >
                  Get in
                </motion.div>
              </div>
              <div
                aria-hidden
                className="absolute"
                style={{
                  left: TOUCH_CX_VW,
                  top: TOUCH_TOP_VW,
                  transform: "translateX(-50%)",
                }}
              >
                <motion.div
                  style={{ ...wordStyle, color }}
                  initial={{ x: pv(90), opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1.5, delay: 0.6, ease: EASE_PRIMARY }}
                >
                  Touch
                </motion.div>
              </div>
            </>
          )}
        />

        {/* Form — absolutely positioned on the right canvas of the
            same dual-clip stage. Top edge aligns with the image's
            top breathing room; right edge mirrors the image's
            left gutter. The form's stagger delay (0.6 s) lands
            after the wordmarks have slid in, so the eye reads
            left-to-right in sync with the entrance. */}
        <div
          className="absolute"
          style={{
            top: FORM_TOP_VW,
            right: FORM_RIGHT_VW,
            width: FORM_WIDTH_VW,
            zIndex: 5,
          }}
        >
          <ContactFormBody
            type={type}
            setType={setType}
            submitted={submitted}
            onSubmit={onSubmit}
            compact
          />
        </div>
      </div>

      {/* ───────────────────── MOBILE — vertical stack ─────────────
          Image, then "Get in / Touch" stacked headings, then the
          form. The dual-clip motif doesn't translate cleanly to
          narrow viewports, so we render a single-colour heading
          underneath the photograph instead. */}
      <div className="relative flex flex-col items-center px-6 pb-16 pt-24 md:hidden">
        <motion.div
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
          className="relative w-full max-w-[320px] overflow-hidden"
          style={{ aspectRatio: "411 / 600", background: "#d9d9d9" }}
        >
          <img
            src={poisonContactHero}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.div>
        <h2
          className="mt-8 text-center"
          aria-label="Get in Touch"
          style={{
            ...displayFont,
            fontWeight: 300,
            fontSize: "clamp(56px, 16vw, 96px)",
            lineHeight: 1,
            letterSpacing: "-0.026em",
            fontVariationSettings: SOFT_WONK,
            color: INK,
            margin: 0,
          }}
        >
          <motion.span
            initial={{ x: "-25%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, delay: 0.4, ease: EASE_PRIMARY }}
            className="block"
          >
            Get in
          </motion.span>
          <motion.span
            initial={{ x: "25%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, delay: 0.6, ease: EASE_PRIMARY }}
            className="block"
          >
            Touch
          </motion.span>
        </h2>

        {/* Mobile form sits below the wordmark stack with its own
            container max-width so it stays comfortable to fill. */}
        <div className="mt-12 w-full max-w-[420px]">
          <ContactFormBody
            type={type}
            setType={setType}
            submitted={submitted}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </section>
  );
}
