import { motion } from "motion/react";
import { Music2, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import footerBgVideo from "../../../../../project/public/Glowing Tulip Serenity.mp4";
import footerLogo from "../../../../../project/public/Logo.svg";

/* ═══════════════════════════════════════════════════════════════
   Footer — "liquid glass" panel resting over the looping hero
   video. The video is pinned behind the footer (not on the whole
   page) so the Acreage cream/black sections above it stay solid
   and the glass effect only kicks in inside the footer.

   Spec — preserved verbatim:
     • motion.footer entrance: opacity 0→1, y 40→0,
       duration 1, delay 0.4, ease easeOut
     • .liquid-glass class for the rim-light glass surface
     • 12-column grid on top, 3-column link grid on right
     • Bottom bar: curated-by line + social icon row
       (Music2, Facebook, Twitter, Youtube, Instagram)

   Brand / copy — adapted to Acreage Studio (floral) per
   "follow our design standards of the template".
   ═══════════════════════════════════════════════════════════════ */

const DISCOVER_LINKS = [
  { label: "Floral Workshops",   href: "#services" },
  { label: "Bloom Diaries",      href: "#feedback" },
  { label: "Studio Gallery",     href: "#stats" },
  { label: "Press Features",     href: "#" },
  { label: "Seasonal Guide",     href: "#" },
];

const MISSION_LINKS = [
  { label: "Our Story",          href: "#" },
  { label: "The Florists",       href: "#" },
  { label: "In The Press",       href: "#" },
  { label: "Join Our Studio",    href: "#" },
];

const CONCIERGE_LINKS = [
  { label: "Get in Touch",       href: "#contact" },
  { label: "Privacy Policy",     href: "#" },
  { label: "Terms of Service",   href: "#" },
  { label: "Report a Concern",   href: "#" },
];

const SOCIALS = [
  { Icon: Music2,    href: "#", label: "TikTok"    },
  { Icon: Facebook,  href: "#", label: "Facebook"  },
  { Icon: Twitter,   href: "#", label: "Twitter"   },
  { Icon: Youtube,   href: "#", label: "YouTube"   },
  { Icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Background video — fixed-style ambience locally scoped to
          the footer block. We use absolute (not fixed) so it doesn't
          bleed over earlier sections. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src={footerBgVideo} type="video/mp4" />
      </video>

      {/* Soft fade so the marquee/contact section above blends into
          the video instead of cutting hard. */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full mx-auto px-6 md:px-12 lg:px-[120px] pt-32 md:pt-64 pb-10 flex flex-col items-center">
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
          className="liquid-glass mx-auto w-full max-w-[1440px] rounded-3xl p-6 md:p-10 text-white/70"
        >
          {/* Top grid — 12 columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
            {/* Brand block — 5 columns */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <img
                src={footerLogo}
                alt="Floral Studio"
                width={72}
                height={24}
                className="block h-6 w-fit text-white"
              />
              <p className="text-sm leading-relaxed max-w-sm">
                Floral Studio crafts bespoke floral arrangements and event styling for
                life's most beautiful moments gathered from local growers and arranged
                with intention.
              </p>
            </div>

            {/* Links — 7 columns, 3 sub-columns */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
              <FooterColumn title="Discover"     links={DISCOVER_LINKS} />
              <FooterColumn title="The Studio"   links={MISSION_LINKS} />
              <FooterColumn title="Concierge"    links={CONCIERGE_LINKS} />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <p className="text-[10px] uppercase tracking-widest opacity-50">
              © 2026 floral Studio · Curated with care
            </p>

            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest opacity-50">
                Join the Journey:
              </span>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FooterColumn — header + link list. Header uses uppercase
   tracking to echo the bottom-bar microcopy.
   ───────────────────────────────────────────────────────────── */
type FooterLink = { label: string; href: string };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="font-[family-name:var(--font-body)] text-sm uppercase tracking-wider text-white font-semibold mb-4">
        {title}
      </h4>
      <ul className="text-xs space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
