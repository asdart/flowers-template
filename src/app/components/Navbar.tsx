import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-55lg8z247s";

const dropdownLinks = [
  { label: "Gallery", href: "#gallery", description: "Selected blooms" },
  { label: "Services", href: "#services", description: "What we offer" },
  { label: "Team", href: "#team", description: "Meet the creatives" },
  { label: "Press", href: "#awards", description: "Press & features" },
  { label: "Journal", href: "#journal", description: "Floral articles" },
];

const primaryLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
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

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 text-white"
    >
      <div className="font-sans text-xl font-bold uppercase tracking-tight">
        Wilde Flower.
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-2">
        <div className="flex items-center gap-2">
          {/* Blooms dropdown trigger */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full bg-white/20 pl-3 pr-2.5 py-1.5 text-xs font-normal leading-none transition-colors hover:bg-white/30"
            >
              <span>Blooms</span>
              <motion.svg
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block h-[5px] w-2"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 8.33458 4.79229"
              >
                <path d={svgPaths.p3668ce70} fill="white" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/80 p-2 shadow-2xl backdrop-blur-xl"
                >
                  {dropdownLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                    >
                      <span className="font-serif text-sm italic text-white">
                        {link.label}
                      </span>
                      <span className="text-[11px] leading-tight text-neutral-400 transition-colors group-hover:text-neutral-300">
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
              className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-normal leading-none transition-colors hover:bg-white/30"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="ml-1 rounded-full border border-white px-3.5 py-1.5 text-xs font-normal leading-none transition-colors hover:bg-white hover:text-black"
        >
          Contact us
        </a>
      </div>

      {/* Mobile hamburger button */}
      <button
        type="button"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        <span className="sr-only">Toggle menu</span>
        <span className="relative block h-3 w-5">
          <motion.span
            animate={
              mobileOpen
                ? { rotate: 45, y: 5 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 block h-[1.5px] w-5 origin-center bg-white"
          />
          <motion.span
            animate={
              mobileOpen
                ? { rotate: -45, y: -5 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 block h-[1.5px] w-5 origin-center bg-white"
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
            className="md:hidden fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="flex h-full flex-col px-6 pb-10 pt-28"
            >
              <div className="flex flex-col gap-1">
                {[...primaryLinks, ...dropdownLinks].map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline justify-between border-b border-white/10 py-4 transition-colors hover:text-white/70"
                  >
                    <span className="font-serif text-3xl italic">
                      {link.label}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-white/40 transition-colors group-hover:text-white/60">
                      →
                    </span>
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-auto rounded-full border border-white px-5 py-3 text-center text-sm font-normal leading-none transition-colors hover:bg-white hover:text-black"
              >
                Contact us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
