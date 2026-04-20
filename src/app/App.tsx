import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Services } from "./components/Services";
import { Team } from "./components/Team";
import { Awards } from "./components/Awards";
import { Journal } from "./components/Journal";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Gallery />
        <Services />
        <Team />
        <Awards />
        <Journal />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}