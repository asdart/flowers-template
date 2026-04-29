import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-55lg8z247s";

export type TemplateId = "wilde" | "orla" | "verdant" | "minimal" | "poison";

const dropdownLinks = [
  { label: "Gallery", href: "#gallery", description: "Selected blooms" },
  { label: "Services", href: "#services", description: "What we offer" },
  { label: "Testimonials", href: "#testimonials", description: "Kind words" },
  { label: "Team", href: "#team", description: "Meet the creatives" },
  { label: "Press", href: "#awards", description: "Press & features" },
  { label: "Journal", href: "#journal", description: "Floral articles" },
];

const primaryLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const templateOptions: { id: TemplateId; label: string; description: string }[] = [
  { id: "wilde", label: "Wilde Flower", description: "Dark editorial · original" },
  { id: "orla", label: "Elegant Blooms", description: "Light, serif-forward studio" },
  { id: "verdant", label: "Verdant", description: "Bold forest · Fraunces typography" },
  { id: "minimal", label: "La Nube", description: "Warm minimal · floating pill nav" },
  { id: "poison", label: "Poison Bloom", description: "Editorial cream · Fraunces Thin wordmarks" },
];

type NavbarProps = {
  activeTemplate: TemplateId;
  onTemplateChange: (id: TemplateId) => void;
};

/* ─────────────────────────────────────────────────────────────
   Per-template visual theme
   ───────────────────────────────────────────────────────────── */
type Theme = {
  text: string;
  brand: {
    fontClass: string;
    sizeClass: string;
    trackingClass: string;
    caseClass: string;
    label: string;
  };
  pill: string;
  pillArrowFill: string;
  divider: string;
  ctaButton: string;
  dropdownPanel: string;
  dropdownLabel: string;
  dropdownDescription: string;
  dropdownItemHover: string;
  dropdownActiveBg: string;
  activePill: string;
  mobileButton: string;
  mobileBar: string;
  mobileOverlay: string;
  mobileLinkBorder: string;
  mobileLabel: string;
  mobileSectionLabel: string;
  mobileInactive: string;
  mobileActive: string;
  navLinkFontClass: string;
  /** Layout variant for the desktop nav. "split" centers the links group between brand and CTA. "inline" keeps links and CTA grouped on the right (legacy). "float-center" renders two centered pills (logo + links). */
  desktopLayout: "inline" | "split" | "float-center";
  /** Tailwind classes applied to the desktop links wrapper. Lets each template pick its own gap/padding. */
  linksWrapperClass: string;
  /** Padding utility applied to dropdown trigger pills (Blooms / Templates). */
  pillTriggerPadding: string;
  /** Padding utility applied to flat link pills (About / Services / Contact). */
  pillLinkPadding: string;
  /** Top offset for the fixed nav in pixels. */
  navTopPx: number;
};

const themes: Record<TemplateId, Theme> = {
  wilde: {
    text: "text-white",
    brand: {
      fontClass: "font-sans font-bold",
      sizeClass: "text-xl",
      trackingClass: "tracking-tight",
      caseClass: "uppercase",
      label: "Wilde Flower.",
    },
    pill:
      "rounded-full bg-white/20 text-xs font-normal leading-none text-white transition-colors hover:bg-white/30",
    pillArrowFill: "white",
    divider: "",
    ctaButton:
      "rounded-full border border-white px-3.5 py-1.5 text-xs font-normal leading-none text-white transition-colors hover:bg-white hover:text-black",
    dropdownPanel:
      "rounded-2xl border border-white/10 bg-neutral-950/80 shadow-2xl backdrop-blur-xl",
    dropdownLabel: "font-serif text-sm italic text-white",
    dropdownDescription:
      "text-[11px] leading-tight text-neutral-400 transition-colors group-hover:text-neutral-300",
    dropdownItemHover: "hover:bg-white/10",
    dropdownActiveBg: "bg-white/10",
    activePill:
      "rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-normal not-italic uppercase tracking-widest text-neutral-900",
    mobileButton:
      "relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20",
    mobileBar: "bg-white",
    mobileOverlay: "bg-neutral-950/95 text-white backdrop-blur-xl",
    mobileLinkBorder: "border-white/10",
    mobileLabel: "font-serif text-3xl italic",
    mobileSectionLabel: "text-[11px] uppercase tracking-[0.3em] text-white/40",
    mobileInactive: "text-white/80 hover:text-white",
    mobileActive: "text-white",
    navLinkFontClass: "font-sans",
    desktopLayout: "inline",
    linksWrapperClass: "flex items-center gap-2",
    pillTriggerPadding: "pl-3 pr-2.5 py-1.5",
    pillLinkPadding: "px-3 py-1.5",
    navTopPx: 0,
  },
  orla: {
    text: "",
    brand: {
      fontClass: "font-serif italic",
      sizeClass: "text-2xl",
      trackingClass: "tracking-tight",
      caseClass: "",
      label: "Wilde",
    },
    pill:
      "rounded-full border border-[rgba(20,18,23,0.35)] bg-[rgba(241,235,225,0.92)] text-[11px] font-normal uppercase leading-none tracking-[0.18em] text-[#141217] backdrop-blur-sm transition-colors hover:bg-[#f1ebe1]",
    pillArrowFill: "#141217",
    divider: "",
    ctaButton:
      "rounded-full border border-[#141217] bg-[#f1ebe1] px-3.5 py-1.5 text-[11px] font-normal uppercase leading-none tracking-[0.2em] text-[#141217] transition-colors hover:bg-[#141217] hover:text-[#f1ebe1]",
    dropdownPanel:
      "rounded-2xl border border-[rgba(20,18,23,0.15)] bg-[#f1ebe1]/95 shadow-xl backdrop-blur-xl",
    dropdownLabel: "font-serif text-sm italic text-[#141217]",
    dropdownDescription:
      "text-[11px] leading-tight text-[#8a8289] transition-colors group-hover:text-[#141217]",
    dropdownItemHover: "hover:bg-[rgba(20,18,23,0.08)]",
    dropdownActiveBg: "bg-[rgba(20,18,23,0.08)]",
    activePill:
      "rounded-full bg-[#141217] px-1.5 py-0.5 text-[9px] font-normal not-italic uppercase tracking-widest text-[#f1ebe1]",
    mobileButton:
      "relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(20,18,23,0.35)] bg-[rgba(241,235,225,0.85)] text-[#141217] backdrop-blur-sm transition-colors hover:bg-[#f1ebe1]",
    mobileBar: "bg-[#141217]",
    mobileOverlay: "bg-[#f1ebe1]/95 text-[#141217] backdrop-blur-xl",
    mobileLinkBorder: "border-[rgba(20,18,23,0.2)]",
    mobileLabel: "font-serif text-3xl italic text-[#141217]",
    mobileSectionLabel:
      "text-[11px] uppercase tracking-[0.3em] text-[#8a8289]",
    mobileInactive: "text-[#141217]/75 hover:text-[#141217]",
    mobileActive: "text-[#141217]",
    navLinkFontClass: "font-[var(--font-mono)]",
    desktopLayout: "inline",
    linksWrapperClass: "flex items-center gap-2",
    pillTriggerPadding: "pl-3 pr-2.5 py-1.5",
    pillLinkPadding: "px-3 py-1.5",
    navTopPx: 0,
  },
  verdant: {
    text: "text-[#140a05]",
    brand: {
      fontClass: "font-[family-name:var(--font-display)]",
      sizeClass: "text-xl",
      trackingClass: "tracking-tight",
      caseClass: "",
      label: "Verdant",
    },
    pill:
      "font-[family-name:var(--font-body)] text-[12px] font-medium uppercase leading-[16px] tracking-[2px] text-[#140a05] transition-opacity hover:opacity-60",
    pillArrowFill: "#140a05",
    divider: "",
    ctaButton:
      "rounded-md bg-[#140a05] px-2.5 py-1 text-[12px] font-normal leading-[16px] text-white transition-opacity hover:opacity-80",
    dropdownPanel:
      "rounded-md border border-[rgba(20,10,5,0.15)] bg-[#fdf7f2]/95 shadow-xl backdrop-blur-xl",
    dropdownLabel:
      "font-[family-name:var(--font-display)] text-sm text-[#140a05]",
    dropdownDescription:
      "text-[11px] leading-tight text-[rgba(20,10,5,0.55)] transition-colors group-hover:text-[#140a05]",
    dropdownItemHover: "hover:bg-[rgba(20,10,5,0.06)]",
    dropdownActiveBg: "bg-[rgba(20,10,5,0.08)]",
    activePill:
      "rounded-sm bg-[#140a05] px-1.5 py-0.5 text-[9px] font-normal not-italic uppercase tracking-widest text-[#fdf7f2]",
    mobileButton:
      "relative z-50 flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(20,10,5,0.25)] bg-[rgba(253,247,242,0.5)] text-[#140a05] backdrop-blur-sm transition-colors hover:bg-[#fdf7f2]",
    mobileBar: "bg-[#140a05]",
    mobileOverlay: "bg-[#d45c1a]/95 text-[#140a05] backdrop-blur-xl",
    mobileLinkBorder: "border-[rgba(20,10,5,0.18)]",
    mobileLabel:
      "font-[family-name:var(--font-display)] text-3xl text-[#140a05]",
    mobileSectionLabel:
      "text-[11px] uppercase tracking-[0.3em] text-[rgba(20,10,5,0.6)]",
    mobileInactive: "text-[#140a05]/75 hover:text-[#140a05]",
    mobileActive: "text-[#140a05]",
    navLinkFontClass: "font-[family-name:var(--font-body)]",
    desktopLayout: "split",
    linksWrapperClass: "flex items-center gap-6",
    pillTriggerPadding: "px-0 py-0",
    pillLinkPadding: "px-0 py-0",
    navTopPx: 0,
  },
  poison: {
    text: "text-[#140a05]",
    brand: {
      fontClass: "font-[family-name:var(--font-display)] font-light italic",
      sizeClass: "text-xl",
      trackingClass: "tracking-tight",
      caseClass: "",
      label: "Poison Bloom",
    },
    pill:
      "font-[family-name:var(--font-body)] text-[12px] font-medium uppercase leading-[16px] tracking-[2px] text-[#140a05] transition-opacity hover:opacity-60",
    pillArrowFill: "#140a05",
    divider: "",
    ctaButton:
      "border border-[rgba(0,0,0,0.2)] bg-transparent px-2.5 py-1 text-[12px] font-normal leading-[16px] text-[#140a05] transition-colors hover:bg-[#140a05] hover:text-white",
    dropdownPanel:
      "rounded-md border border-[rgba(20,10,5,0.15)] bg-[#f2efea]/95 shadow-xl backdrop-blur-xl",
    dropdownLabel:
      "font-[family-name:var(--font-display)] text-sm text-[#140a05]",
    dropdownDescription:
      "text-[11px] leading-tight text-[rgba(20,10,5,0.55)] transition-colors group-hover:text-[#140a05]",
    dropdownItemHover: "hover:bg-[rgba(20,10,5,0.06)]",
    dropdownActiveBg: "bg-[rgba(20,10,5,0.08)]",
    activePill:
      "rounded-sm bg-[#0e525f] px-1.5 py-0.5 text-[9px] font-normal not-italic uppercase tracking-widest text-[#f2efea]",
    mobileButton:
      "relative z-50 flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(20,10,5,0.25)] bg-[rgba(242,239,234,0.6)] text-[#140a05] backdrop-blur-sm transition-colors hover:bg-[#f2efea]",
    mobileBar: "bg-[#140a05]",
    mobileOverlay: "bg-[#f2efea]/95 text-[#140a05] backdrop-blur-xl",
    mobileLinkBorder: "border-[rgba(20,10,5,0.18)]",
    mobileLabel:
      "font-[family-name:var(--font-display)] font-light italic text-3xl text-[#140a05]",
    mobileSectionLabel:
      "text-[11px] uppercase tracking-[0.3em] text-[rgba(20,10,5,0.55)]",
    mobileInactive: "text-[#140a05]/75 hover:text-[#140a05]",
    mobileActive: "text-[#140a05]",
    navLinkFontClass: "font-[family-name:var(--font-body)]",
    desktopLayout: "split",
    linksWrapperClass: "flex items-center gap-6",
    pillTriggerPadding: "px-0 py-0",
    pillLinkPadding: "px-0 py-0",
    navTopPx: 0,
  },
  minimal: {
    text: "text-[#3A3733]",
    brand: {
      fontClass: "font-medium",
      sizeClass: "text-[15px]",
      trackingClass: "",
      caseClass: "",
      label: "La Nube",
    },
    pill: "px-[18px] h-full inline-flex items-center text-[15px] font-medium text-[#3A3733] rounded-full transition-colors hover:bg-[rgba(255,255,255,0.16)]",
    pillArrowFill: "#3A3733",
    divider: "",
    ctaButton: "",
    dropdownPanel:
      "rounded-2xl border border-[rgba(58,55,51,0.08)] bg-[#EEEAE4]/95 shadow-xl backdrop-blur-xl",
    dropdownLabel: "text-[15px] font-medium text-[#3A3733]",
    dropdownDescription:
      "text-[12px] leading-tight text-[#7A766F] transition-colors group-hover:text-[#3A3733]",
    dropdownItemHover: "hover:bg-[rgba(58,55,51,0.06)]",
    dropdownActiveBg: "bg-[rgba(58,55,51,0.08)]",
    activePill:
      "rounded-full bg-[#3A3733] px-1.5 py-0.5 text-[9px] font-normal not-italic uppercase tracking-widest text-[#EEEAE4]",
    mobileButton:
      "relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(58,55,51,0.2)] bg-[rgba(180,175,168,0.45)] text-[#3A3733] backdrop-blur-sm transition-colors hover:bg-[rgba(160,155,148,0.65)]",
    mobileBar: "bg-[#3A3733]",
    mobileOverlay: "bg-[#EEEAE4]/95 text-[#3A3733] backdrop-blur-xl",
    mobileLinkBorder: "border-[rgba(58,55,51,0.1)]",
    mobileLabel: "font-medium text-2xl text-[#3A3733]",
    mobileSectionLabel: "text-[11px] uppercase tracking-[0.3em] text-[#A5A09A]",
    mobileInactive: "text-[#3A3733]/75 hover:text-[#3A3733]",
    mobileActive: "text-[#3A3733]",
    navLinkFontClass: "font-sans",
    desktopLayout: "float-center",
    linksWrapperClass: "flex items-center gap-0",
    pillTriggerPadding: "px-0 py-0",
    pillLinkPadding: "px-0 py-0",
    navTopPx: 32,
  },
};

export function Navbar({ activeTemplate, onTemplateChange }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLDivElement>(null);

  const theme = themes[activeTemplate];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (templatesRef.current && !templatesRef.current.contains(e.target as Node)) {
        setTemplatesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menus when template switches so the new theme is clean
  useEffect(() => {
    setOpen(false);
    setTemplatesOpen(false);
    setMobileOpen(false);
  }, [activeTemplate]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeTemplateLabel =
    templateOptions.find((t) => t.id === activeTemplate)?.label ?? "Templates";

  const pillPadding = theme.pillTriggerPadding;
  const pillBasicPadding = theme.pillLinkPadding;

  const orlaScriptStyle =
    activeTemplate === "orla"
      ? { fontFamily: "var(--font-script)" }
      : undefined;

  const scrolledColor = "#F2EFEA";
  const overrideColor = scrolled ? scrolledColor : undefined;
  const arrowFill = scrolled ? scrolledColor : theme.pillArrowFill;

  const isLightTemplate = activeTemplate === "orla" || activeTemplate === "verdant";
  const contactHref =
    activeTemplate === "orla"
      ? "#orla-contact"
      : activeTemplate === "verdant"
      ? "#verdant-contact"
      : activeTemplate === "minimal"
      ? "#minimal-footer"
      : activeTemplate === "poison"
      ? "#poison-contact"
      : "#contact";
  const contactLabel =
    activeTemplate === "orla" ? "Inquire" : "Contact us";
  const mutedTextClass =
    activeTemplate === "orla"
      ? "text-[#8a8289]"
      : activeTemplate === "minimal"
      ? "text-[#A5A09A]"
      : isLightTemplate
      ? "text-[rgba(20,10,5,0.6)]"
      : "text-white/40";

  // Padding around the nav itself.
  const navPadding =
    activeTemplate === "minimal"
      ? "px-6 py-0 h-14"
      : activeTemplate === "verdant" || activeTemplate === "poison"
      ? "px-6 py-3"
      : "px-6 py-6";

  return (
    <motion.nav
      key={activeTemplate}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 z-50 flex w-full items-center justify-between ${navPadding} ${theme.text} ${theme.desktopLayout === "float-center" ? "pointer-events-none" : ""}`}
      style={{
        top: theme.navTopPx,
        backgroundColor: scrolled ? "#140A05" : undefined,
        transition: "background-color 0.3s ease, color 0.3s ease",
        color: scrolled
          ? scrolledColor
          : activeTemplate === "orla"
          ? "#141217"
          : activeTemplate === "verdant" || activeTemplate === "poison"
          ? "#140a05"
          : undefined,
      }}
    >
      {theme.desktopLayout === "float-center" ? (
        /* Invisible spacer keeps justify-between working for the mobile hamburger */
        <div className="h-10 w-10 pointer-events-none" aria-hidden />
      ) : (
        <div
          className={`pointer-events-auto ${theme.brand.fontClass} ${theme.brand.sizeClass} ${theme.brand.trackingClass} ${theme.brand.caseClass}`}
          style={
            scrolled
              ? { ...orlaScriptStyle, color: scrolledColor }
              : activeTemplate === "orla"
              ? { ...orlaScriptStyle, color: "#f1ebe1", mixBlendMode: "difference" }
              : orlaScriptStyle
          }
        >
          {theme.brand.label}
          {activeTemplate === "orla" && (
            <span className="ml-1 align-top text-[10px] font-sans not-italic uppercase tracking-[0.25em] opacity-70">
              Floral
            </span>
          )}
        </div>
      )}

      {/* Float-center desktop nav (Minimal template) */}
      {theme.desktopLayout === "float-center" && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:flex md:items-center md:justify-center md:gap-3">
          {/* Logo pill — three-dot triangle mark */}
          <div
            className="pointer-events-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors"
            style={{
              background: "rgba(180,175,168,0.45)",
              backdropFilter: "blur(20px) saturate(1.1)",
              WebkitBackdropFilter: "blur(20px) saturate(1.1)",
            }}
          >
            <span className="relative block h-[22px] w-[22px]">
              <span className="absolute left-1/2 top-0 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[#3A3733]" />
              <span className="absolute bottom-0 left-0 h-[9px] w-[9px] rounded-full bg-[#3A3733]" />
              <span className="absolute bottom-0 right-0 h-[9px] w-[9px] rounded-full bg-[#3A3733]" />
            </span>
          </div>

          {/* Nav pill */}
          <div
            className="pointer-events-auto flex items-center gap-0 rounded-full px-2"
            style={{
              background: "rgba(180,175,168,0.45)",
              backdropFilter: "blur(20px) saturate(1.1)",
              WebkitBackdropFilter: "blur(20px) saturate(1.1)",
              height: 56,
            }}
          >
            <a href="#minimal-projects" style={{ color: overrideColor }} className={`${theme.pill} px-[18px] h-full`}>Work</a>
            <a href="#minimal-about" style={{ color: overrideColor }} className={`${theme.pill} px-[18px] h-full`}>Info</a>

            {/* Templates dropdown */}
            <div ref={templatesRef} className="relative flex h-full items-center">
              <button
                onClick={() => { setTemplatesOpen((v) => !v); setOpen(false); }}
                style={{ color: overrideColor }}
                className={`${theme.pill} flex items-center gap-1.5 px-[18px] h-full`}
              >
                <span>Templates</span>
                <motion.svg
                  animate={{ rotate: templatesOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="block h-[5px] w-2"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 8.33458 4.79229"
                >
                  <path d={svgPaths.p3668ce70} fill={arrowFill} />
                </motion.svg>
              </button>
              <AnimatePresence>
                {templatesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 overflow-hidden p-2 ${theme.dropdownPanel}`}
                  >
                    {templateOptions.map((tpl) => {
                      const isActive = tpl.id === activeTemplate;
                      return (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => {
                            onTemplateChange(tpl.id);
                            setTemplatesOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`group flex w-full flex-col gap-0.5 rounded-xl px-4 py-3 text-left transition-colors ${
                            isActive ? theme.dropdownActiveBg : theme.dropdownItemHover
                          }`}
                        >
                          <span className={`flex items-center gap-2 ${theme.dropdownLabel}`}>
                            {tpl.label}
                            {isActive && <span className={theme.activePill}>Active</span>}
                          </span>
                          <span className={theme.dropdownDescription}>{tpl.description}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#minimal-footer" style={{ color: overrideColor }} className={`${theme.pill} px-[18px] h-full`}>Contact</a>
          </div>
        </div>
      )}

      {/* Desktop nav (inline / split layouts) */}
      <div
        className={
          theme.desktopLayout === "split"
            ? "pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 md:flex md:items-center md:justify-center"
            : theme.desktopLayout === "float-center"
            ? "hidden"
            : "hidden md:flex items-center gap-2"
        }
      >
        <div
          className={`pointer-events-auto ${theme.linksWrapperClass}`}
        >
          {/* Blooms dropdown trigger */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => {
                setOpen((v) => !v);
                setTemplatesOpen(false);
              }}
              style={{ color: overrideColor }}
              className={`flex items-center gap-1.5 ${theme.pill} ${pillPadding}`}
            >
              <span>{activeTemplate === "orla" ? "Blooms" : "Blooms"}</span>
              <motion.svg
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block h-[5px] w-2"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 8.33458 4.79229"
              >
                <path d={svgPaths.p3668ce70} fill={arrowFill} />
              </motion.svg>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute right-0 top-full mt-3 w-64 overflow-hidden p-2 ${theme.dropdownPanel}`}
                >
                  {dropdownLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors ${theme.dropdownItemHover}`}
                    >
                      <span className={theme.dropdownLabel}>{link.label}</span>
                      <span className={theme.dropdownDescription}>
                        {link.description}
                      </span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {primaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ color: overrideColor }}
              className={`${theme.pill} ${pillBasicPadding}`}
            >
              {link.label}
            </a>
          ))}

          {/* Templates dropdown trigger */}
          <div ref={templatesRef} className="relative">
            <button
              onClick={() => {
                setTemplatesOpen((v) => !v);
                setOpen(false);
              }}
              style={{ color: overrideColor }}
              className={`flex items-center gap-1.5 ${theme.pill} ${pillPadding}`}
            >
              <span>Templates</span>
              <motion.svg
                animate={{ rotate: templatesOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block h-[5px] w-2"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 8.33458 4.79229"
              >
                <path d={svgPaths.p3668ce70} fill={arrowFill} />
              </motion.svg>
            </button>

            <AnimatePresence>
              {templatesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute right-0 top-full mt-3 w-64 overflow-hidden p-2 ${theme.dropdownPanel}`}
                >
                  {templateOptions.map((tpl) => {
                    const isActive = tpl.id === activeTemplate;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => {
                          onTemplateChange(tpl.id);
                          setTemplatesOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`group flex w-full flex-col gap-0.5 rounded-xl px-4 py-3 text-left transition-colors ${
                          isActive ? theme.dropdownActiveBg : theme.dropdownItemHover
                        }`}
                      >
                        <span className={`flex items-center gap-2 ${theme.dropdownLabel}`}>
                          {tpl.label}
                          {isActive && (
                            <span className={theme.activePill}>Active</span>
                          )}
                        </span>
                        <span className={theme.dropdownDescription}>
                          {tpl.description}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {theme.desktopLayout === "inline" && (
          <a
            href={contactHref}
            style={{ color: overrideColor, borderColor: overrideColor }}
            className={`pointer-events-auto ml-1 ${theme.ctaButton}`}
          >
            {contactLabel}
          </a>
        )}
      </div>

      {theme.desktopLayout === "split" && (
        <a
          href={contactHref}
          style={{ color: overrideColor, borderColor: overrideColor }}
          className={`hidden md:inline-flex ${theme.ctaButton}`}
        >
          {contactLabel}
        </a>
      )}

      {/* Mobile hamburger button */}
      <button
        type="button"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className={`md:hidden pointer-events-auto ${theme.mobileButton}`}
      >
        <span className="sr-only">Toggle menu</span>
        <span className="relative block h-3 w-5">
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: overrideColor }}
            className={`absolute left-0 top-0 block h-[1.5px] w-5 origin-center ${theme.mobileBar}`}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: overrideColor }}
            className={`absolute bottom-0 left-0 block h-[1.5px] w-5 origin-center ${theme.mobileBar}`}
          />
        </span>
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden fixed inset-0 z-40 pointer-events-auto ${theme.mobileOverlay}`}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28"
            >
              <div className="flex flex-col gap-1">
                {[...primaryLinks, ...dropdownLinks].map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-baseline justify-between border-b py-4 transition-opacity hover:opacity-70 ${theme.mobileLinkBorder}`}
                  >
                    <span className={theme.mobileLabel}>{link.label}</span>
                    <span
                      className={`text-xs uppercase tracking-widest transition-opacity ${mutedTextClass}`}
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>

              {/* Mobile templates section */}
              <div className="mt-10 flex flex-col gap-3">
                <p className={theme.mobileSectionLabel}>
                  Templates · {activeTemplateLabel}
                </p>
                <div className="flex flex-col gap-1">
                  {templateOptions.map((tpl) => {
                    const isActive = tpl.id === activeTemplate;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => {
                          onTemplateChange(tpl.id);
                          setMobileOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`flex w-full items-baseline justify-between border-b py-4 text-left transition-colors ${theme.mobileLinkBorder} ${
                          isActive ? theme.mobileActive : theme.mobileInactive
                        }`}
                      >
                        <span className="font-serif text-2xl italic">
                          {tpl.label}
                        </span>
                        <span
                          className={`text-[11px] uppercase tracking-widest ${mutedTextClass}`}
                        >
                          {isActive ? "Active" : "Switch →"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <a
                href={contactHref}
                onClick={() => setMobileOpen(false)}
                className={`mt-auto text-center ${theme.ctaButton}`}
                style={{ paddingTop: 12, paddingBottom: 12 }}
              >
                {contactLabel}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
