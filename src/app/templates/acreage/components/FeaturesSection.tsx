/* ═══════════════════════════════════════════════════════════════
   FeaturesSection — full-viewport bento grid on #000.
   Flowers template: editorial headline + 4 glass-tint cards with
   shared photography from the repo (`/hero-acreage-aiden-lee.jpg`).
   Motion: LiquidButton hover scale only.
   ═══════════════════════════════════════════════════════════════ */

const SERIF_STYLE = { fontFamily: "'Instrument Serif', serif" } as const;
const DM_SANS_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontVariationSettings: "'opsz' 14",
} as const;

function LiquidButton({
  children,
  href = "#contact",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="liquid-glass liquid-glass--subtle-blur rounded-xl px-5 py-2.5 text-sm font-normal text-white/90 transition-transform hover:scale-[1.02] inline-flex items-center justify-center text-center no-underline"
    >
      {children}
    </a>
  );
}

/** Hero still from `public/hero-acreage-aiden-lee.jpg` (served at site root). */
const FEATURE_CARD_BG = "/hero-acreage-aiden-lee.jpg";

const CARDS = [
  {
    num: "01/",
    title: "Seasonal stems, thoughtfully gathered.",
    body: "Fresh blooms selected weekly for texture, tone, and longevity.",
    rowSpan: true,
    bgPosition: "center 22%" as const,
  },
  {
    num: "02/",
    title: "Designed to feel personal.",
    body: "Every arrangement is shaped with balance, movement, and emotion.",
    colSpan: true,
    bgPosition: "center 45%" as const,
  },
  {
    num: "03/",
    title: "From studio to doorstep.",
    body: "Each item is wrapped and delivered fresh to ensure top quality and satisfaction.",
    bgPosition: "center 60%" as const,
  },
  {
    num: "04/",
    title: "Flowers for every moment.",
    body: "Quiet gestures, heartfelt celebrations, cozy dinners, and meaningful everyday rituals that bring us closer together.",
    bgPosition: "center 35%" as const,
  },
] as const;

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="flex min-h-dvh w-full flex-col bg-black px-6 py-24 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col gap-10">
        {/* Header */}
        <header className="flex shrink-0 flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 font-normal leading-[1.17] tracking-tight text-white md:text-4xl lg:text-[3rem]">
            <p className="m-0" style={DM_SANS_STYLE}>
              Designed with feeling,
            </p>
            <p className="m-0 italic" style={SERIF_STYLE}>
              arranged with intention.
            </p>
            <p className="mt-3 not-italic text-white/40" style={DM_SANS_STYLE}>
              Seasonal blooms curated to bring softness, warmth, and presence
              into every space.
            </p>
          </div>
          <div className="shrink-0 md:pt-3">
            <LiquidButton>Schedule Now</LiquidButton>
          </div>
        </header>

        {/* Bento grid */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
          {CARDS.map(({ num, title, body, rowSpan, colSpan, bgPosition }) => (
            <div
              key={num}
              className={[
                "relative group flex flex-col justify-between overflow-hidden rounded-[1.25rem] p-6",
                "min-h-[20rem] md:min-h-0 md:h-full",
                rowSpan ? "md:row-span-2" : "",
                colSpan ? "md:col-span-2" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url(${FEATURE_CARD_BG})`,
                  backgroundPosition: bgPosition,
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/55 to-black/25"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-white/[0.06] mix-blend-overlay"
              />
              <span
                className="relative z-10 text-xs text-white/80 drop-shadow-sm"
                style={DM_SANS_STYLE}
              >
                {num}
              </span>
              <div className="relative z-10">
                <h2 className="text-lg font-medium leading-snug text-white drop-shadow-sm md:text-xl">
                  {title}
                </h2>
                <p
                  className="mt-3 text-xs leading-relaxed text-white/85 drop-shadow-sm"
                  style={DM_SANS_STYLE}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
