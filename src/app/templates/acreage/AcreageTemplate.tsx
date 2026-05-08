import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import LogoMarquee from "./components/LogoMarquee";
import ImageSection from "./components/ImageSection";
import EditorialFloralSection from "./components/EditorialFloralSection";
import ProcessSection from "./components/ProcessSection";
import GallerySection from "./components/GallerySection";
import PricingSection from "./components/PricingSection";
import NextSection from "./components/NextSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

/* ═══════════════════════════════════════════════════════════════
   Acreage Studio — composition root.

   Editorial flow:
      1. Hero          — Looping meadow video + headline + CTA
      2. Stats         — Animated counters + logo-masked floral image
      3. Marquee       — Partner logo strip
      4. Services      — Background photo + 3 service pillars
      5. Process       — "How we work" four-step rhythm (dark)
      6. Gallery       — Bento field photo grid (dark)
      7. Pricing       — Three engagement tiers (white)
      8. Feedback      — Testimonial carousel on white
      9. Contact       — Inquiry form on white with live validation
     10. Footer        — Liquid-glass footer over the carried hero video

   Font scope: Helvetica Regular (a custom @font-face delivered
   via onlinewebfonts) is the default sans, scoped to the template
   root so the rest of the app keeps its 'Instrument Sans' default.
   Instrument Serif italic is used only for decorative accents and
   DM Sans is used for the large stat numerals.
   ═══════════════════════════════════════════════════════════════ */

export function AcreageTemplate() {
  return (
    <div
      className="bg-black min-h-screen text-white selection:bg-white/20 selection:text-white"
      style={{
        fontFamily:
          "'Helvetica Regular', Helvetica, Arial, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <HeroSection />
      <StatsSection />
      <LogoMarquee />
      <ImageSection />
      <EditorialFloralSection />
      <ProcessSection />
      <GallerySection />
      <PricingSection />
      <NextSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
