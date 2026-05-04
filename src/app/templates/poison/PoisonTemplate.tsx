import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { FAQ } from "./sections/FAQ";
import { Feature } from "./sections/Feature";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Press } from "./sections/Press";
import { Process } from "./sections/Process";
import { SelectedWork } from "./sections/SelectedWork";
import { Services } from "./sections/Services";
import { Testimonials } from "./sections/Testimonials";
import { CREAM, INK } from "./tokens";

/* ═══════════════════════════════════════════════════════════════
   Poison Template — composition root.

   Editorial flow:
     1. Hero            — Poison / Bloom dual-clip wordmark
     2. About           — Manifesto, dual-clip headline crosses portrait
     3. Services        — Three offering cards
     4. Process         — Four numbered steps, line-art parallax
     5. Selected work   — Display title + per-word reveal
     6. Feature         — Sticky scroll collage
     7. Press           — Auto-scroll publication marquee
     8. Testimonials    — Bordered card carousel
     9. FAQ             — Dual-clip title + accordion
    10. Contact         — Dual-clip Get in touch + form
    11. Footer          — Small dual-clip wordmark + columns
   ═══════════════════════════════════════════════════════════════ */

export function PoisonTemplate() {
  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", color: INK }}>
      <Hero />
      <About />
      <Services />
      <Process />
      <SelectedWork />
      <Feature />
      <Press />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
