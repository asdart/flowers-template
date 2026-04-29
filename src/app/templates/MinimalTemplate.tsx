import { useState, useEffect, useRef, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   La Nube — minimal warm-neutral floral studio.
   Typography: Inter (system-level sans-serif).
   Palette: warm stone (#EEEAE4) · charcoal (#3A3733).
   ───────────────────────────────────────────────────────────── */
const BG = "#EEEAE4";
const SURFACE = "rgba(180,175,168,0.45)";
const SURFACE_STRONG = "rgba(160,155,148,0.65)";
const TEXT_PRIMARY = "#3A3733";
const TEXT_SECONDARY = "#7A766F";
const TEXT_MUTED = "#A5A09A";
const TEXT_ON_IMAGE = "#FFFFFF";
const BORDER_SUBTLE = "rgba(0,0,0,0.06)";
const EASE = "cubic-bezier(0.4,0,0.2,1)";
const INTER: React.CSSProperties = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
};

/* ─── Hero carousel ───────────────────────────────────────────── */
const SLIDES = [
  {
    title: { main: "Bloom is in ", light: "the air." },
    bg: "radial-gradient(ellipse at 70% 30%,#d8c9b6,transparent 55%),radial-gradient(ellipse at 20% 80%,#b8b3a8,transparent 60%),radial-gradient(ellipse at 50% 50%,#efe6d8,#c9c2b3 80%)",
  },
  {
    title: { main: "Fragrance is in ", light: "the air." },
    bg: "radial-gradient(ellipse at 30% 20%,#c9d4e1,transparent 55%),radial-gradient(ellipse at 80% 70%,#8ea5c2,transparent 60%),radial-gradient(ellipse at 50% 50%,#d4dde8,#3b4a64 80%)",
  },
  {
    title: { main: "Petal is in ", light: "the air." },
    bg: "radial-gradient(ellipse at 60% 40%,#ede5d2,transparent 55%),radial-gradient(ellipse at 30% 70%,#c5b89a,transparent 60%),radial-gradient(ellipse at 50% 50%,#f5f0e6,#bba892 80%)",
  },
  {
    title: { main: "Silence is in ", light: "the air." },
    bg: "radial-gradient(ellipse at 40% 30%,#5a5450,transparent 55%),radial-gradient(ellipse at 70% 80%,#3a3a3a,transparent 60%),radial-gradient(ellipse at 50% 50%,#4a4845,#1a1816 80%)",
  },
];
const SLIDE_MS = 4000;

const THUMB_BG = [
  "linear-gradient(140deg,#e8dfcc,#9b958a)",
  "linear-gradient(160deg,#c9d4e1,#3b4a64)",
  "linear-gradient(140deg,#efeadd,#bba892)",
  "linear-gradient(160deg,#3a3a3a,#86797f)",
];

/* ─── Project cards ────────────────────────────────────────────── */
const PROJECTS = [
  {
    meta: "Arrangement 02 · Beverly Hills",
    title: "Bloom is in the air",
    mediaBg: "linear-gradient(140deg,#dfcfb6 0%,#a89a82 60%,#5b5446 100%)",
    blob1: "radial-gradient(circle,#f5ecd9,rgba(245,236,217,0) 70%)",
    blob2: "radial-gradient(circle,#9c8e72,rgba(156,142,114,0) 70%)",
  },
  {
    meta: "Installation 06 · Bel Air Estate",
    title: "Fragrance is in the air",
    mediaBg: "linear-gradient(160deg,#9eb1c8 0%,#465877 60%,#1d2536 100%)",
    blob1: "radial-gradient(circle,#cfdcec,rgba(207,220,236,0) 70%)",
    blob2: "radial-gradient(circle,#3a4a64,rgba(58,74,100,0) 70%)",
  },
  {
    meta: "Event 08 · West Hollywood",
    title: "Petal is in the air",
    mediaBg: "linear-gradient(135deg,#efe6d4 0%,#c2b89e 70%)",
    blob1: "radial-gradient(circle,#fff,rgba(255,255,255,0) 70%)",
    blob2: "radial-gradient(circle,#a89880,rgba(168,152,128,0) 70%)",
  },
];

/* ─── Card transform per position ────────────────────────────── */
function cardStyle(pos: number | "hidden"): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: 0,
    width: "100%",
    maxWidth: 1000,
    borderRadius: 36,
    overflow: "hidden",
    background: SURFACE,
    transition: `transform 700ms ${EASE}, opacity 700ms ${EASE}, filter 700ms ${EASE}`,
    willChange: "transform",
  };
  if (pos === 0) return { ...base, zIndex: 3, transform: "translateX(-50%) translateY(0) scale(1)" };
  if (pos === 1) return { ...base, zIndex: 2, transform: "translateX(-50%) translateY(-22px) scale(.94)", filter: "brightness(.95)" };
  if (pos === 2) return { ...base, zIndex: 1, transform: "translateX(-50%) translateY(-44px) scale(.88)", filter: "brightness(.9)" };
  return { ...base, zIndex: 0, opacity: 0, transform: "translateX(-50%) translateY(-60px) scale(.84)", pointerEvents: "none" };
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function MinimalHero() {
  const [current, setCurrent] = useState(0);
  const [displaySlide, setDisplaySlide] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);

  const [bgA, setBgA] = useState({ bg: SLIDES[0].bg, opacity: 1 });
  const [bgB, setBgB] = useState({ bg: SLIDES[0].bg, opacity: 0 });
  const activeBgRef = useRef<"a" | "b">("a");

  const currentRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ringRafRef = useRef<number>(0);
  const ringStartRef = useRef<number>(0);
  const thumbRingRefs = useRef<(SVGRectElement | null)[]>([null, null, null, null]);

  const heroRef = useRef<HTMLElement>(null);
  const nube1Ref = useRef<HTMLDivElement>(null);
  const nube2Ref = useRef<HTMLDivElement>(null);
  const nube3Ref = useRef<HTMLDivElement>(null);

  const animateRing = useCallback((idx: number) => {
    cancelAnimationFrame(ringRafRef.current);
    thumbRingRefs.current.forEach(r => r?.setAttribute("stroke-dashoffset", "1"));
    const rect = thumbRingRefs.current[idx];
    if (!rect) return;
    ringStartRef.current = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - ringStartRef.current) / SLIDE_MS, 1);
      rect.setAttribute("stroke-dashoffset", (1 - p).toFixed(4));
      if (p < 1) ringRafRef.current = requestAnimationFrame(tick);
    };
    ringRafRef.current = requestAnimationFrame(tick);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx === currentRef.current) return;
    currentRef.current = idx;

    const incoming = activeBgRef.current === "a" ? "b" : "a";
    activeBgRef.current = incoming;
    if (incoming === "b") {
      setBgB({ bg: SLIDES[idx].bg, opacity: 1 });
      setBgA(p => ({ ...p, opacity: 0 }));
    } else {
      setBgA({ bg: SLIDES[idx].bg, opacity: 1 });
      setBgB(p => ({ ...p, opacity: 0 }));
    }

    setCurrent(idx);
    setTitleVisible(false);
    setTimeout(() => {
      setDisplaySlide(idx);
      setTitleVisible(true);
    }, 290);

    animateRing(idx);
  }, [animateRing]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % SLIDES.length);
    }, SLIDE_MS);
  }, [goTo]);

  useEffect(() => {
    animateRing(0);
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      cancelAnimationFrame(ringRafRef.current);
    };
  }, [animateRing, startTimer]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.width / 2) / r.width;
      const dy = (e.clientY - r.height / 2) / r.height;
      ([nube1Ref, nube2Ref, nube3Ref] as React.RefObject<HTMLDivElement>[]).forEach((ref, i) => {
        if (ref.current) {
          const k = (i + 1) * 8;
          ref.current.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
        }
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        ...INTER,
      }}
    >
      {/* Rounded media container */}
      <div
        style={{
          position: "absolute",
          inset: 24,
          borderRadius: 40,
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 70% 30%,#d8c9b6 0%,transparent 55%),radial-gradient(ellipse at 20% 80%,#b8b3a8 0%,transparent 60%),radial-gradient(ellipse at 50% 50%,#efe6d8 0%,#c9c2b3 80%)",
        }}
      >
        {/* Crossfade layer A */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: bgA.bg,
            opacity: bgA.opacity,
            transition: "opacity 1100ms cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: "none",
          }}
        />
        {/* Crossfade layer B */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: bgB.bg,
            opacity: bgB.opacity,
            transition: "opacity 1100ms cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: "none",
          }}
        />

        {/* Film grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            mixBlendMode: "overlay",
            opacity: 0.18,
            zIndex: 2,
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>")`,
          }}
        />
      </div>

      {/* Corner credits — hidden on mobile */}
      <div
        className="hidden sm:block"
        style={{
          position: "absolute",
          left: 48,
          bottom: 48,
          zIndex: 3,
          color: TEXT_ON_IMAGE,
          fontSize: 13,
          opacity: 0.78,
          fontWeight: 400,
          lineHeight: 1.5,
        }}
      >
        Los Angeles
        <br />
        Spring 2026
      </div>
      <div
        className="hidden sm:block"
        style={{
          position: "absolute",
          right: 48,
          bottom: 48,
          zIndex: 3,
          color: TEXT_ON_IMAGE,
          fontSize: 13,
          opacity: 0.78,
          fontWeight: 400,
          textAlign: "right",
        }}
      >
        Botanical
        <br />
        Floral Studio
      </div>

      {/* Nube (cloud) silhouettes */}
      {(
        [
          {
            ref: nube1Ref,
            style: {
              width: "46vmin",
              height: "42vmin",
              left: "6%",
              bottom: "10%",
              borderRadius: "55% 45% 60% 40% / 55% 60% 40% 45%",
            },
          },
          {
            ref: nube2Ref,
            style: {
              width: "30vmin",
              height: "24vmin",
              right: "10%",
              top: "14%",
              borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
            },
          },
          {
            ref: nube3Ref,
            style: {
              width: "18vmin",
              height: "14vmin",
              left: "42%",
              top: "18%",
              borderRadius: "50% 50% 60% 40% / 50% 50% 50% 50%",
              opacity: 0.7,
            },
          },
        ] as { ref: React.RefObject<HTMLDivElement>; style: React.CSSProperties }[]
      ).map(({ ref, style }, i) => (
        <div
          key={i}
          ref={ref}
          style={{
            position: "absolute",
            zIndex: 1,
            background:
              "radial-gradient(circle at 35% 30%,rgba(255,255,255,.92),rgba(255,255,255,.5) 55%,rgba(255,255,255,.05) 85%)",
            filter: "blur(0.4px)",
            boxShadow: "0 40px 120px rgba(58,55,51,.06)",
            transition: "transform 80ms linear",
            ...style,
          }}
        />
      ))}

      {/* Hero inner content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: 40,
        }}
      >
        {/* Eyebrow with pulsing dot */}
        <p
          style={{
            color: TEXT_ON_IMAGE,
            fontSize: 14,
            fontWeight: 500,
            opacity: 0.85,
            marginBottom: 24,
            textShadow: "0 1px 16px rgba(0,0,0,.12)",
          }}
        >
          <motion.span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: 9999,
              background: "#fff",
              marginRight: 10,
              verticalAlign: "middle",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          Now booking · Autumn '26
        </p>

        {/* Crossfading title */}
        <h1
          style={{
            fontSize: "clamp(48px,7.4vw,84px)",
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: "-0.022em",
            color: TEXT_ON_IMAGE,
            textShadow: "0 2px 30px rgba(58,55,51,.18)",
            maxWidth: "14ch",
            margin: "0 auto",
            opacity: titleVisible ? 1 : 0,
            transition: "opacity 280ms ease",
          }}
        >
          {SLIDES[displaySlide].title.main}
          <span style={{ fontWeight: 500, opacity: 0.86 }}>
            {SLIDES[displaySlide].title.light}
          </span>
        </h1>

        {/* CTA pill */}
        <a
          href="#minimal-projects"
          style={{
            marginTop: 36,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px 32px",
            height: 56,
            borderRadius: 999,
            background: "rgba(255,255,255,.55)",
            color: TEXT_PRIMARY,
            backdropFilter: "blur(28px) saturate(1.2)",
            WebkitBackdropFilter: "blur(28px) saturate(1.2)",
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1,
            transition: `background 240ms ${EASE}`,
            cursor: "pointer",
            whiteSpace: "nowrap",
            textDecoration: "none",
            border: "none",
          }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.72)")
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.55)")
          }
        >
          Explore our work
        </a>
      </div>

      {/* Thumbnail carousel strip */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: 10,
          borderRadius: 24,
          background: "rgba(255,255,255,.32)",
          backdropFilter: "blur(24px) saturate(1.1)",
          WebkitBackdropFilter: "blur(24px) saturate(1.1)",
        }}
        className="!bottom-6 sm:!bottom-12"
      >
        {THUMB_BG.map((bg, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={current === i}
            onClick={() => {
              if (i === currentRef.current) return;
              startTimer();
              goTo(i);
            }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              overflow: "visible",
              cursor: "pointer",
              position: "relative",
              background: bg,
              border: "none",
              padding: 0,
              flexShrink: 0,
              outline: current === i ? "1.5px solid rgba(255,255,255,.15)" : "none",
              outlineOffset: 2,
              transition: `transform 240ms ${EASE}`,
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
          >
            <svg
              viewBox="0 0 64 64"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                overflow: "visible",
              }}
            >
              <rect
                ref={el => {
                  thumbRingRefs.current[i] = el;
                }}
                x="1.5"
                y="1.5"
                width="61"
                height="61"
                rx="12.5"
                fill="none"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="2.5"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
                strokeLinecap="round"
              />
            </svg>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════ */
function MinimalAbout() {
  return (
    <section
      id="minimal-about"
      style={{
        padding: "200px 48px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: BG,
        ...INTER,
      }}
      className="!py-[120px] md:!py-[200px] !px-6 md:!px-12"
    >
      <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: "center",
            fontSize: 14,
            color: TEXT_MUTED,
            marginBottom: 32,
            fontWeight: 400,
          }}
        >
          About
          <span
            style={{
              display: "inline-block",
              width: 5,
              height: 5,
              borderRadius: 9999,
              background: TEXT_MUTED,
              margin: "0 10px",
              verticalAlign: "middle",
            }}
          />
          The studio
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            maxWidth: 920,
            fontSize: "clamp(28px,3.6vw,48px)",
            fontWeight: 500,
            lineHeight: 1.25,
            letterSpacing: "-0.012em",
            color: TEXT_PRIMARY,
            textAlign: "center",
            WebkitMaskImage:
              "linear-gradient(180deg,#000 0%,#000 78%,rgba(0,0,0,.18) 100%)",
            maskImage:
              "linear-gradient(180deg,#000 0%,#000 78%,rgba(0,0,0,.18) 100%)",
          }}
        >
          La Nube is an ephemeral floral studio that transcends the ordinary
          arrangement. We create dreamlike environments that spark emotion — a
          space for sensory beauty at weddings, dinners, and cultural events{" "}
          <em style={{ fontStyle: "normal", color: TEXT_SECONDARY, fontWeight: 500 }}>
            that lasts only as long as the petals hold.
          </em>
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECTS — stacked card carousel
   ═══════════════════════════════════════════════════════════════ */
function MinimalProjects() {
  const [stackIdx, setStackIdx] = useState(0);

  function getPos(i: number): number | "hidden" {
    const rel = (i - stackIdx + PROJECTS.length) % PROJECTS.length;
    return rel <= 2 ? rel : "hidden";
  }

  return (
    <section
      id="minimal-projects"
      style={{
        padding: "120px 48px 160px",
        position: "relative",
        backgroundColor: BG,
        ...INTER,
      }}
      className="!px-6 md:!px-12 !pt-20 md:!pt-[120px] !pb-[100px] md:!pb-[160px]"
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 64px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 48,
        }}
        className="flex-col md:flex-row items-start md:items-end gap-6 md:gap-12"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 14, color: TEXT_MUTED, fontWeight: 400, marginBottom: 16 }}
          >
            Selected work
            <span
              style={{
                display: "inline-block",
                width: 5,
                height: 5,
                borderRadius: 9999,
                background: TEXT_MUTED,
                margin: "0 10px",
                verticalAlign: "middle",
              }}
            />
            2022 — 2026
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            style={{
              fontSize: "clamp(32px,4.5vw,52px)",
              fontWeight: 600,
              letterSpacing: "-0.018em",
              lineHeight: 1.1,
              color: TEXT_PRIMARY,
              maxWidth: "18ch",
            }}
          >
            A small atlas of held breath.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            maxWidth: "36ch",
            fontSize: 17,
            color: TEXT_SECONDARY,
            lineHeight: 1.55,
          }}
        >
          Three arrangements drawn from recent commissions. Each one composed,
          inhabited, and quietly removed without trace.
        </motion.p>
      </div>

      {/* Stacked cards */}
      <div
        style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}
        className="min-h-[420px] md:h-[560px]"
      >
        {PROJECTS.map((proj, i) => {
          const pos = getPos(i);
          return (
            <article
              key={i}
              style={cardStyle(pos)}
              onClick={e => {
                if (pos === 0) return;
                if ((e.target as HTMLElement).closest("a")) return;
                setStackIdx(i);
              }}
            >
              {/* Card image area with blobs */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  width: "100%",
                  overflow: "hidden",
                  background: proj.mediaBg,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "50%",
                    height: "60%",
                    left: "20%",
                    top: "15%",
                    borderRadius: 9999,
                    filter: "blur(40px)",
                    opacity: 0.85,
                    background: proj.blob1,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "30%",
                    height: "35%",
                    right: "8%",
                    bottom: "12%",
                    borderRadius: 9999,
                    filter: "blur(40px)",
                    opacity: 0.85,
                    background: proj.blob2,
                  }}
                />
              </div>

              {/* Card info overlay */}
              <div
                style={{
                  position: "absolute",
                  left: 32,
                  bottom: 32,
                  right: 32,
                  zIndex: 2,
                  color: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: 32,
                  textShadow: "0 1px 24px rgba(0,0,0,.18)",
                }}
                className="flex-col sm:flex-row items-start sm:items-end !left-5 !bottom-5 !right-5 sm:!left-8 sm:!bottom-8 sm:!right-8"
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 400, opacity: 0.86, marginBottom: 10 }}>
                    {proj.meta}
                  </p>
                  <h3
                    style={{
                      fontSize: "clamp(28px,3.4vw,40px)",
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.12,
                      maxWidth: "22ch",
                    }}
                  >
                    {proj.title}
                  </h3>
                </div>
                <a
                  href="#minimal-footer"
                  style={{
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "14px 24px",
                    height: 44,
                    borderRadius: 999,
                    background: "rgba(255,255,255,.55)",
                    color: TEXT_PRIMARY,
                    backdropFilter: "blur(28px) saturate(1.2)",
                    WebkitBackdropFilter: "blur(28px) saturate(1.2)",
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1,
                    transition: `background 240ms ${EASE}`,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    border: "none",
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  Learn more
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Carousel controls */}
      <div
        style={{
          marginTop: 32,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Prev */}
        <button
          aria-label="Previous project"
          onClick={() => setStackIdx(i => (i - 1 + PROJECTS.length) % PROJECTS.length)}
          style={{
            width: 44,
            height: 44,
            borderRadius: 9999,
            background: SURFACE,
            backdropFilter: "blur(20px) saturate(1.1)",
            WebkitBackdropFilter: "blur(20px) saturate(1.1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: TEXT_PRIMARY,
            transition: `background 240ms ${EASE}`,
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = SURFACE_STRONG)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = SURFACE)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16, strokeLinecap: "round", strokeLinejoin: "round" }}>
            <path d="M15 6 L9 12 L15 18" />
          </svg>
        </button>

        {/* Pager dots */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderRadius: 999,
            background: SURFACE,
            backdropFilter: "blur(20px) saturate(1.1)",
            WebkitBackdropFilter: "blur(20px) saturate(1.1)",
          }}
        >
          {PROJECTS.map((_, i) => (
            <span
              key={i}
              style={{
                height: 5,
                borderRadius: 9999,
                background: stackIdx === i ? TEXT_PRIMARY : TEXT_MUTED,
                width: stackIdx === i ? 22 : 6,
                transition: `all 360ms ${EASE}`,
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          aria-label="Next project"
          onClick={() => setStackIdx(i => (i + 1) % PROJECTS.length)}
          style={{
            width: 44,
            height: 44,
            borderRadius: 9999,
            background: SURFACE,
            backdropFilter: "blur(20px) saturate(1.1)",
            WebkitBackdropFilter: "blur(20px) saturate(1.1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: TEXT_PRIMARY,
            transition: `background 240ms ${EASE}`,
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = SURFACE_STRONG)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = SURFACE)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16, strokeLinecap: "round", strokeLinejoin: "round" }}>
            <path d="M9 6 L15 12 L9 18" />
          </svg>
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MADE — CTA section with corner decorations
   ═══════════════════════════════════════════════════════════════ */
function MinimalMade() {
  return (
    <section
      style={{
        position: "relative",
        padding: "200px 48px 220px",
        overflow: "hidden",
        textAlign: "center",
        backgroundColor: BG,
        ...INTER,
      }}
      className="!py-[120px] md:!py-[200px] !px-6 md:!px-12"
    >
      {/* Corner decorations */}
      {[
        {
          style: {
            width: "36vw",
            height: "42vh",
            top: "-4vh",
            right: "-3vw",
            background: "linear-gradient(160deg,#d2c8b3 0%,#7d7665 60%,#3a3733 100%)",
            transform: "rotate(-6deg)",
          },
        },
        {
          style: {
            width: "30vw",
            height: "36vh",
            bottom: "-3vh",
            left: "-3vw",
            background: "linear-gradient(140deg,#cad6e3 0%,#3e4d68 100%)",
            transform: "rotate(4deg)",
          },
        },
        {
          style: {
            width: "14vw",
            height: "14vh",
            top: "30%",
            left: "6%",
            background: "linear-gradient(135deg,#efe6d4 0%,#bba892 100%)",
            transform: "rotate(-12deg)",
          },
          className: "hidden sm:block",
        },
        {
          style: {
            width: "12vw",
            height: "14vh",
            bottom: "30%",
            right: "8%",
            background: "linear-gradient(160deg,#3a3a3a,#7a766f)",
            transform: "rotate(8deg)",
          },
          className: "hidden sm:block",
        },
      ].map(({ style, className = "" }, i) => (
        <div
          key={i}
          className={className}
          style={{
            position: "absolute",
            borderRadius: 36,
            overflow: "hidden",
            WebkitMaskImage:
              "radial-gradient(ellipse at center,#000 55%,rgba(0,0,0,0) 88%)",
            maskImage:
              "radial-gradient(ellipse at center,#000 55%,rgba(0,0,0,0) 88%)",
            ...style,
          }}
        />
      ))}

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 780, margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 14, color: TEXT_MUTED, marginBottom: 24 }}
        >
          Studio
          <span
            style={{
              display: "inline-block",
              width: 5,
              height: 5,
              borderRadius: 9999,
              background: TEXT_MUTED,
              margin: "0 10px",
              verticalAlign: "middle",
            }}
          />
          Open commissions
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.08 }}
          style={{
            fontSize: "clamp(40px,6vw,72px)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.022em",
            color: TEXT_PRIMARY,
            marginBottom: 36,
          }}
        >
          Made with{" "}
          <em style={{ fontStyle: "normal", color: TEXT_SECONDARY, fontWeight: 500 }}>
            care.
          </em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ display: "inline-flex", gap: 10 }}
        >
          <a
            href="#minimal-footer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px 32px",
              height: 56,
              borderRadius: 999,
              background: SURFACE,
              backdropFilter: "blur(20px) saturate(1.1)",
              WebkitBackdropFilter: "blur(20px) saturate(1.1)",
              color: TEXT_PRIMARY,
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 1,
              transition: `background 240ms ${EASE}`,
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = SURFACE_STRONG)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = SURFACE)}
          >
            Contact us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function MinimalFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer
      id="minimal-footer"
      style={{
        padding: "64px 48px 48px",
        borderTop: `1px solid ${BORDER_SUBTLE}`,
        backgroundColor: BG,
        ...INTER,
      }}
      className="!px-6 md:!px-12"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gap: 64,
          alignItems: "start",
        }}
        className="grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] !gap-10 md:!gap-16"
      >
        {/* Newsletter */}
        <div>
          <h4
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: TEXT_MUTED,
              marginBottom: 18,
            }}
          >
            Newsletter
          </h4>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "10px 12px 10px 22px",
              borderRadius: 999,
              background: SURFACE,
              backdropFilter: "blur(20px) saturate(1.1)",
              WebkitBackdropFilter: "blur(20px) saturate(1.1)",
              maxWidth: 440,
              height: 64,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <span style={{ fontSize: 12, color: TEXT_MUTED, fontWeight: 500, lineHeight: 1 }}>
                {subscribed ? "Thank you — see you soon." : "Subscribe to our newsletter"}
              </span>
              {!subscribed && (
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "inherit",
                    fontSize: 14,
                    color: TEXT_PRIMARY,
                    marginTop: 4,
                    width: "100%",
                  }}
                />
              )}
            </div>
            {/* Decorative gradient thumb */}
            <button
              type="submit"
              aria-label="Subscribe"
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                flexShrink: 0,
                background: "linear-gradient(160deg,#d6e1ee 0%,#7e93b3 70%,#3e4d68 100%)",
                position: "relative",
                overflow: "hidden",
                border: "none",
                cursor: "pointer",
              }}
            />
          </form>
          <p
            style={{
              marginTop: 24,
              fontSize: 14,
              color: TEXT_MUTED,
              maxWidth: "36ch",
              lineHeight: 1.6,
            }}
          >
            Quiet dispatches twice a year. Field notes from new arrangements, nothing more.
          </p>
        </div>

        {/* Studio */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 500, color: TEXT_MUTED, marginBottom: 18 }}>
            Studio
          </h4>
          {["8601 Wilshire Blvd", "Beverly Hills, CA", "United States"].map(line => (
            <p key={line} style={{ fontSize: 15, color: TEXT_SECONDARY, lineHeight: 1.7, fontWeight: 400 }}>
              {line}
            </p>
          ))}
          <a
            href="mailto:hola@lanubeflorals.com"
            style={{
              display: "block",
              marginTop: 14,
              fontSize: 15,
              color: TEXT_SECONDARY,
              lineHeight: 1.7,
              fontWeight: 400,
              transition: `color 240ms ${EASE}`,
              textDecoration: "none",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = TEXT_PRIMARY)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = TEXT_SECONDARY)}
          >
            hola@lanubeflorals.com
          </a>
          <a
            href="tel:+13105550000"
            style={{
              display: "block",
              fontSize: 15,
              color: TEXT_SECONDARY,
              lineHeight: 1.7,
              fontWeight: 400,
              transition: `color 240ms ${EASE}`,
              textDecoration: "none",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = TEXT_PRIMARY)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = TEXT_SECONDARY)}
          >
            +1 310 555 0000
          </a>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 500, color: TEXT_MUTED, marginBottom: 18 }}>
            Elsewhere
          </h4>
          {[
            { label: "Work", href: "#minimal-projects" },
            { label: "Info", href: "#minimal-about" },
            { label: "Contact", href: "#minimal-footer" },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "block",
                fontSize: 15,
                color: TEXT_SECONDARY,
                lineHeight: 1.7,
                fontWeight: 400,
                transition: `color 240ms ${EASE}`,
                textDecoration: "none",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = TEXT_PRIMARY)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = TEXT_SECONDARY)}
            >
              {link.label}
            </a>
          ))}
          {["Instagram", "Pinterest", "LinkedIn"].map((s, i) => (
            <a
              key={s}
              href="#"
              style={{
                display: "block",
                marginTop: i === 0 ? 14 : 0,
                fontSize: 15,
                color: TEXT_SECONDARY,
                lineHeight: 1.7,
                fontWeight: 400,
                transition: `color 240ms ${EASE}`,
                textDecoration: "none",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = TEXT_PRIMARY)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = TEXT_SECONDARY)}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Footer foot */}
      <div
        style={{
          maxWidth: 1280,
          margin: "64px auto 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 24,
          borderTop: `1px solid ${BORDER_SUBTLE}`,
          fontSize: 13,
          color: TEXT_MUTED,
        }}
        className="flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0"
      >
        <span>© La Nube Florals · 2018 — 2026</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 16px",
              height: 36,
              borderRadius: 999,
              background: SURFACE_STRONG,
              backdropFilter: "blur(20px) saturate(1.1)",
              WebkitBackdropFilter: "blur(20px) saturate(1.1)",
              color: TEXT_PRIMARY,
              fontSize: 13,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            EN
          </button>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 16px",
              height: 36,
              borderRadius: 999,
              background: SURFACE,
              backdropFilter: "blur(20px) saturate(1.1)",
              WebkitBackdropFilter: "blur(20px) saturate(1.1)",
              color: TEXT_PRIMARY,
              fontSize: 13,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            ES
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════════ */
export function MinimalTemplate() {
  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT_PRIMARY, ...INTER }}>
      <MinimalHero />
      <MinimalAbout />
      <MinimalProjects />
      <MinimalMade />
      <MinimalFooter />
    </div>
  );
}
