import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-55lg8z247s";

export type TemplateId = "wilde" | "orla";

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
  },
};

export function Navbar({ activeTemplate, onTemplateChange }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const activeTemplateLabel =
    templateOptions.find((t) => t.id === activeTemplate)?.label ?? "Templates";

  const pillPadding = "pl-3 pr-2.5 py-1.5";
  const pillBasicPadding = "px-3 py-1.5";

  const orlaScriptStyle =
    activeTemplate === "orla"
      ? { fontFamily: "var(--font-script)" }
      : undefined;

  return (
    <motion.nav
      key={activeTemplate}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 ${theme.text}`}
      style={{ color: activeTemplate === "orla" ? "#141217" : undefined }}
    >
      <div
        className={`${theme.brand.fontClass} ${theme.brand.sizeClass} ${theme.brand.trackingClass} ${theme.brand.caseClass}`}
        style={
          activeTemplate === "orla"
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

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-2">
        <div className="flex items-center gap-2">
          {/* Blooms dropdown trigger */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => {
                setOpen((v) => !v);
                setTemplatesOpen(false);
              }}
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
                <path d={svgPaths.p3668ce70} fill={theme.pillArrowFill} />
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
                <path d={svgPaths.p3668ce70} fill={theme.pillArrowFill} />
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

        <a
          href={activeTemplate === "orla" ? "#orla-contact" : "#contact"}
          className={`ml-1 ${theme.ctaButton}`}
        >
          {activeTemplate === "orla" ? "Inquire" : "Contact us"}
        </a>
      </div>

      {/* Mobile hamburger button */}
      <button
        type="button"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className={`md:hidden ${theme.mobileButton}`}
      >
        <span className="sr-only">Toggle menu</span>
        <span className="relative block h-3 w-5">
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute left-0 top-0 block h-[1.5px] w-5 origin-center ${theme.mobileBar}`}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
            className={`md:hidden fixed inset-0 z-40 ${theme.mobileOverlay}`}
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
                      className={`text-xs uppercase tracking-widest transition-opacity ${
                        activeTemplate === "orla"
                          ? "text-[#8a8289]"
                          : "text-white/40"
                      }`}
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
                          className={`text-[11px] uppercase tracking-widest ${
                            activeTemplate === "orla"
                              ? "text-[#8a8289]"
                              : "text-white/40"
                          }`}
                        >
                          {isActive ? "Active" : "Switch →"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <a
                href={activeTemplate === "orla" ? "#orla-contact" : "#contact"}
                onClick={() => setMobileOpen(false)}
                className={`mt-auto text-center ${theme.ctaButton}`}
                style={{ paddingTop: 12, paddingBottom: 12 }}
              >
                {activeTemplate === "orla" ? "Inquire" : "Contact us"}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
