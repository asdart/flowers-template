import { motion } from "motion/react";
import { Check } from "lucide-react";
import Typewriter from "./Typewriter";

/* ═══════════════════════════════════════════════════════════════
   PricingSection — three engagement tiers over a looping video
   background. Section is dark-mode: glassy white-on-dark cards with
   the middle tier inverted to white to draw the eye. CTA hover keeps
   the #27BD09 green used in ContactSection on submit.
   ═══════════════════════════════════════════════════════════════ */

const PRICING_BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4";

const TITLE_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontVariationSettings: "'opsz' 14",
} as const;
const SERIF_STYLE = { fontFamily: "'Instrument Serif', serif" } as const;
const NUMERAL_STYLE = { fontFamily: "'DM Sans', sans-serif" } as const;

type Tier = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Per-Acre",
    tagline: "Day-rate runs and short windows.",
    price: "$36",
    unit: "/ acre",
    features: [
      "Up to 320 acres per engagement",
      "Single combine, one-day mobilization",
      "On-site moisture and yield reporting",
      "Standard liability cover",
    ],
    cta: "Request quote",
  },
  {
    name: "Seasonal",
    tagline: "Full-window contracts with priority scheduling.",
    price: "$28",
    unit: "/ acre · season",
    features: [
      "Locked harvest window with guaranteed crew",
      "Up to 2 combines, grain cart, and transport",
      "Daily telemetry + post-season yield map",
      "Full coverage with cooperative integration",
      "Dedicated account contact",
    ],
    cta: "Talk to sales",
    highlighted: true,
  },
  {
    name: "Enterprise",
    tagline: "Multi-region, multi-crop operations.",
    price: "Custom",
    unit: "",
    features: [
      "Fleet of 3+ combines per region",
      "24/7 mechanic and parts logistics",
      "Joint planning across crop calendars",
      "Custom telemetry and exec reporting",
      "Multi-year preferred-rate agreements",
    ],
    cta: "Plan an engagement",
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative w-full bg-black text-white py-8 md:py-24 px-6 md:px-12 lg:px-[48px] flex flex-col justify-center overflow-hidden"
    >
      {/* Background video + dark overlay */}
      <div aria-hidden className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src={PRICING_BG_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
          className="w-full"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="text-sm md:text-base mb-6 font-medium tracking-wide text-white/60 uppercase"
            style={TITLE_STYLE}
          >
            <Typewriter text="Pricing" delay={0} speed={0.015} />
          </motion.h2>

          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="w-full h-[1px] bg-white/15 mb-12 md:mb-20 origin-left"
          />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight leading-[1.1] max-w-[820px]"
              style={TITLE_STYLE}
            >
              <Typewriter text="Engagements priced for the " delay={0} speed={0.015} />
              <span className="italic font-normal" style={SERIF_STYLE}>
                <Typewriter text="acreage you run" delay={0.4} speed={0.015} />
              </span>
              <Typewriter text="." delay={0.7} speed={0.015} />
            </motion.h3>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-[320px]"
            >
              <Typewriter
                text="Indicative ranges. Final scope is built per field after a 30-minute discovery call."
                delay={0.1}
                speed={0.015}
              />
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TIERS.map((tier) => (
              <motion.div
                key={tier.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                }}
                className={`liquid-glass liquid-glass--nav rounded-2xl shadow-2xl flex flex-col p-8 md:p-10 text-white ${
                  tier.highlighted ? "liquid-glass--popover" : ""
                }`}
              >
                <div className="flex items-baseline justify-between mb-2 gap-3">
                  <h4 className="text-2xl md:text-3xl font-medium tracking-tight">
                    {tier.name}
                  </h4>
                  {tier.highlighted && (
                    <span className="text-[10px] uppercase tracking-widest bg-white text-black rounded-full px-2 py-1 shrink-0">
                      Most chosen
                    </span>
                  )}
                </div>

                <p className="text-sm font-light leading-relaxed mb-8 text-white/60">
                  {tier.tagline}
                </p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span
                    className="text-5xl md:text-6xl tracking-[-0.8px]"
                    style={NUMERAL_STYLE}
                  >
                    {tier.price}
                  </span>
                  {tier.unit && (
                    <span className="text-sm text-white/60">{tier.unit}</span>
                  )}
                </div>

                <ul className="flex flex-col gap-3 mb-10">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                    >
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0 text-[#27BD09]"
                        strokeWidth={2.25}
                      />
                      <span className="text-white/85">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-auto self-start rounded-full px-6 py-2.5 text-sm tracking-wide transition-colors duration-300 backdrop-blur-sm ${
                    tier.highlighted
                      ? "bg-white text-black hover:bg-[#27BD09] hover:text-white"
                      : "border border-white/30 bg-white/[0.04] text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {tier.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
