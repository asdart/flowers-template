import type { CSSProperties } from "react";
import { useState } from "react";
import { motion } from "motion/react";
import poisonContactHero from "../../../../imports/poison-bloom-contact-hero.png";
import { DualClipWordmark } from "../components/DualClipWordmark";
import {
  CREAM,
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

   Matches Figma "Global sections / Contact form" (12529:7267).

   Layout:
   · Floral 411×600 anchored to the LEFT side at x=80, top=180 of
     the 1374×800 reference frame.
   · "Get in" / "Touch" stack vertically with their right halves
     extending past the image's right edge — INK on the cream
     margin, CREAM where the glyphs cross the floral.
   · Right canvas hosts the form column: top=292, width=410,
     anchored at 58.33% of the section per Figma.

   Form (per Figma):
   · 3 fields only — Name, Email, Message (textarea). No
     project-type chips. Each field is a stacked label + input
     with a single hairline along the bottom of the entire
     field. Labels use Fraunces light 16px; values use Open Sans.
   · Submit is a flat TEAL rectangle, "Send message" in white at
     12px, 8/16 padding.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Figma reference frame (1374 × 800) ──────────────────────── */
const IMG_LEFT = 80;
const IMG_W = 411;
const IMG_H = 600;

/* Wordmark anchor x-centres (in Figma canvas px). */
const GET_IN_CX = 444;
const TOUCH_CX = 540;

/* Wordmark offsets from the image's top edge (in Figma canvas px).
   Stored as offsets rather than absolute positions so they stay
   correct regardless of how we reposition the image vertically. */
const GET_IN_OFFSET_FROM_IMG_TOP = 251; // 431 − 180
const TOUCH_OFFSET_FROM_IMG_TOP = 380;  // 560 − 180

const WORDMARK_FONT = 152;

const IMG_LEFT_VW = pv(IMG_LEFT);
const IMG_W_VW = pv(IMG_W);
const IMG_H_VW = pv(IMG_H);
const GET_IN_CX_VW = pv(GET_IN_CX);
const TOUCH_CX_VW = pv(TOUCH_CX);

/* Centre the image vertically inside a 100vh stage.
   calc() happily mixes vh and vw — both are valid CSS length units. */
const IMG_TOP_CENTERED = `calc(50vh - ${IMG_H_VW} / 2)`;

/* Wordmark absolute tops — image's centred top + offset within image. */
const GET_IN_OFFSET_VW = pv(GET_IN_OFFSET_FROM_IMG_TOP);
const TOUCH_OFFSET_VW = pv(TOUCH_OFFSET_FROM_IMG_TOP);
const GET_IN_TOP_CENTERED = `calc(${IMG_TOP_CENTERED} + ${GET_IN_OFFSET_VW})`;
const TOUCH_TOP_CENTERED = `calc(${IMG_TOP_CENTERED} + ${TOUCH_OFFSET_VW})`;

/* Form column geometry — right canvas, width matches Figma, centered
   vertically via top:50% + translateY(-50%). */
const FORM_LEFT_PCT = 58.33;
const FORM_WIDTH = 410;
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

/* ─── Field primitives ───────────────────────────────────────── */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        ...displayFont,
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 300,
        letterSpacing: "-1px",
        fontVariationSettings: SOFT_WONK,
        color: INK,
      }}
    >
      {children}
    </span>
  );
}

const inputStyle: CSSProperties = {
  ...bodyFont,
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  padding: 0,
  fontSize: 14,
  lineHeight: "24px",
  color: INK,
  fontWeight: 300,
};

function HairlineField({
  label,
  children,
  multiline = false,
  focused,
}: {
  label: string;
  children: React.ReactNode;
  multiline?: boolean;
  focused: boolean;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        paddingBottom: multiline ? 48 : 8,
        borderBottom: `1px solid ${focused ? TEAL : HAIRLINE}`,
        transition: "border-color 240ms ease",
      }}
    >
      <FieldLabel>{label}</FieldLabel>
      {children}
    </label>
  );
}

function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <HairlineField label={label} focused={focused}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={inputStyle}
      />
    </HairlineField>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  rows = 1,
}: {
  label: string;
  name: string;
  placeholder: string;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <HairlineField label={label} focused={focused} multiline>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          resize: "none",
          fontFamily: bodyFont.fontFamily,
        }}
      />
    </HairlineField>
  );
}

/* ─── Form (shared between desktop right-column and mobile stack) ─── */

function ContactFormBody({
  submitted,
  onSubmit,
}: {
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.5 },
        },
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 34,
          width: "100%",
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE_PRIMARY },
            },
          }}
        >
          <TextField
            label="Name"
            name="name"
            placeholder="Your full name here"
            required
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE_PRIMARY },
            },
          }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="hello@email.com"
            required
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE_PRIMARY },
            },
          }}
        >
          <TextAreaField
            label="Message"
            name="message"
            placeholder="Tell us about your event."
          />
        </motion.div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE_PRIMARY },
          },
        }}
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
            backgroundColor: submitted ? TEAL_DARK : TEAL,
            color: "#fff",
            padding: "8px 16px",
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 400,
            border: "none",
            transition: "background-color 240ms ease",
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
        style={{ minHeight: "100vh" }}
      >
        <h2 className="sr-only" aria-label="Get in Touch">
          Get in Touch
        </h2>

        <DualClipWordmark
          imageSrc={poisonContactHero}
          imageAlt=""
          imageRect={{
            left: IMG_LEFT_VW,
            top: IMG_TOP_CENTERED,
            width: IMG_W_VW,
            height: IMG_H_VW,
          }}
          parentSize={{ width: "100vw", height: "100vh" }}
          imageReveal
          imageKenBurns
          imageDelay={0.15}
          inkColor={INK}
          renderText={(color) => (
            <>
              <div
                aria-hidden
                className="absolute"
                style={{
                  left: GET_IN_CX_VW,
                  top: GET_IN_TOP_CENTERED,
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
                  top: TOUCH_TOP_CENTERED,
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

        {/* Form — absolutely positioned in the right canvas of
            the dual-clip stage. Vertically centred via top:50% +
            translateY(-50%) so it tracks any viewport height. */}
        <div
          className="absolute"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            left: `${FORM_LEFT_PCT}%`,
            width: FORM_WIDTH_VW,
            zIndex: 5,
          }}
        >
          <ContactFormBody submitted={submitted} onSubmit={onSubmit} />
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
          <ContactFormBody submitted={submitted} onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
}
