import { useState } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar, type TemplateId } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Team } from "./components/Team";
import { Awards } from "./components/Awards";
import { Journal } from "./components/Journal";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { OrlaTemplate } from "./templates/OrlaTemplate";
import { VerdantTemplate } from "./templates/VerdantTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { PoisonTemplate } from "./templates/PoisonTemplate";
import { ExplorationTemplate } from "./templates/ExplorationTemplate";
import { AcreageTemplate } from "./templates/AcreageTemplate";

function WildeFlowerTemplate() {
  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <main>
        <Hero />
        <About />
        <Gallery />
        <Services />
        <Testimonials />
        <Team />
        <Awards />
        <Journal />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

const templateIds: TemplateId[] = [
  "wilde",
  "orla",
  "verdant",
  "minimal",
  "poison",
  "exploration",
  "acreage",
];

export default function App() {
  const [template, setTemplate] = useState<TemplateId>(() => {
    const stored = localStorage.getItem("activeTemplate");
    if (stored && templateIds.includes(stored as TemplateId)) {
      return stored as TemplateId;
    }
    return "wilde";
  });

  const handleTemplateChange = (id: TemplateId) => {
    localStorage.setItem("activeTemplate", id);
    setTemplate(id);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-white selection:text-black">
      {template === "wilde" ? <CustomCursor /> : null}
      <Navbar activeTemplate={template} onTemplateChange={handleTemplateChange} />

      {template === "wilde" ? (
        <WildeFlowerTemplate />
      ) : template === "verdant" ? (
        <VerdantTemplate />
      ) : template === "minimal" ? (
        <MinimalTemplate />
      ) : template === "poison" ? (
        <PoisonTemplate />
      ) : template === "exploration" ? (
        <ExplorationTemplate />
      ) : template === "acreage" ? (
        <AcreageTemplate />
      ) : (
        <OrlaTemplate />
      )}
    </div>
  );
}
