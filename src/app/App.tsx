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

export default function App() {
  const [template, setTemplate] = useState<TemplateId>(
    () => (localStorage.getItem("activeTemplate") as TemplateId | null) ?? "wilde"
  );

  const handleTemplateChange = (id: TemplateId) => {
    localStorage.setItem("activeTemplate", id);
    setTemplate(id);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-white selection:text-black">
      {template === "wilde" ? <CustomCursor /> : null}
      <Navbar activeTemplate={template} onTemplateChange={handleTemplateChange} />

      {template === "wilde" ? <WildeFlowerTemplate /> : <OrlaTemplate />}
    </div>
  );
}
