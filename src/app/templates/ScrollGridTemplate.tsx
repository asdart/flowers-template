import { useEffect, useRef, useState, type CSSProperties } from "react";
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./scroll-grid.css";

import img1 from "../../imports/Flower.jpg";
import img2 from "../../imports/Red-Flowers.png";
import img3 from "../../imports/46d12136-1914-4c62-a243-e5a85afaf045-wkoqmIa06Np7ixuMi4EpG1uSzgKzZL.png";
import img4 from "../../imports/69d50e85-28ba-4f32-ab47-dd90a5993b5e-WjrTzgrxiZfZnUZ4PuqC3ZlrMPhEiM.webp";
import img5 from "../../imports/a3b82b97-969a-46c6-9f9f-1b7e60527ba1-oQIVn2NTBfjBTc5z6BDTPD4O0dugLa.webp";
import img6 from "../../imports/3b3331d4-da53-4e0b-96c4-64dc7acffc92-WT4nsouZNxiXigrjikCHzDafAt0qIQ.webp";
import img7 from "../../imports/2ab68990-ddc0-4542-9fa3-4f534349b24b-MeNeEmlNG1vmTFbuvRKZw3HSgck6Zs.webp";
import img8 from "../../imports/cc47167a-8596-433b-9a1f-eb84fbff0369-meorDRy6dYTfGTJEzJM7dMRFEr0s2j.webp";
import img9 from "../../imports/e7c940f8-a673-4a4d-803b-1dc7d23ad25b-n0x9MEweLAo2nfKplAD5v9tXiauCvm.webp";
import img10 from "../../imports/poison-bloom-hero.png";
import img11 from "../../imports/poison-bloom-about.png";
import img12 from "../../imports/poison-bloom-contact-hero.png";
import img13 from "../../imports/poison-bloom-services.png";
import img14 from "../../imports/poison-bloom-illustration.png";
import img15 from "../../imports/poison-bloom-footer-strip.png";
import img16 from "../../imports/poison-orchid-carousel.png";
import img17 from "../../imports/poison-orchid-illustration.png";
import img18 from "../../imports/poison-process-listen.png";
import img19 from "../../imports/poison-services-brand-1.png";
import img20 from "../../imports/poison-services-brand-2.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
];

const GRID_ITEMS = [
  { r: 1, c: 4, img: img6 },
  { r: 1, c: 1, img: img20 },
  { r: 2, c: 8, img: img2 },
  { r: 2, c: 5, img: img19 },
  { r: 3, c: 3, img: img3 },
  { r: 4, c: 7, img: img4 },
  { r: 5, c: 8, img: img5 },
  { r: 6, c: 2, img: img1 },
  { r: 7, c: 3, img: img7 },
  { r: 8, c: 7, img: img8 },
  { r: 9, c: 1, img: img9 },
  { r: 9, c: 6, img: img18 },
  { r: 10, c: 4, img: img10 },
  { r: 11, c: 2, img: img11 },
  { r: 12, c: 6, img: img12 },
  { r: 13, c: 3, img: img13 },
  { r: 14, c: 5, img: img14 },
  { r: 15, c: 1, img: img15 },
  { r: 16, c: 2, img: img16 },
  { r: 17, c: 8, img: img17 },
  { r: 18, c: 3, img: img18 },
  { r: 19, c: 5, img: img19 },
  { r: 20, c: 4, img: img20 },
  { r: 21, c: 2, img: img1 },
  { r: 22, c: 7, img: img2 },
  { r: 23, c: 1, img: img3 },
  { r: 24, c: 5, img: img4 },
  { r: 25, c: 4, img: img5 },
  { r: 26, c: 2, img: img6 },
  { r: 27, c: 3, img: img7 },
  { r: 28, c: 6, img: img8 },
  { r: 29, c: 5, img: img9 },
  { r: 30, c: 4, img: img10 },
  { r: 31, c: 1, img: img11 },
  { r: 32, c: 6, img: img12 },
  { r: 33, c: 3, img: img13 },
  { r: 34, c: 5, img: img14 },
  { r: 35, c: 1, img: img15 },
  { r: 36, c: 8, img: img16 },
  { r: 37, c: 6, img: img17 },
  { r: 38, c: 3, img: img18 },
  { r: 39, c: 5, img: img19 },
  { r: 40, c: 4, img: img20 },
];

function preloadImages(sources: string[]) {
  return Promise.all(
    sources.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = src;
        }),
    ),
  );
}

export function ScrollGridTemplate() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    preloadImages(IMAGES).then(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      if (loading) return;

      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);

      let rafId = 0;
      const scrollFn = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(scrollFn);
      };
      rafId = requestAnimationFrame(scrollFn);

      const gridItems = gsap.utils.toArray<HTMLElement>(".grid > .grid__item");
      gridItems.forEach((item) => {
        const image = item.querySelector<HTMLElement>(".grid__item-img");
        if (!image) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
          .set(image, {
            transformOrigin: `${gsap.utils.random(0, 1) > 0.5 ? 0 : 100}% 100%`,
          })
          .to(image, {
            ease: "none",
            scale: 0,
          });
      });

      ScrollTrigger.refresh();

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    },
    { dependencies: [loading], scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={`codrops-scroll-grid demo-1${loading ? " loading" : ""}`}
    >
      <main>
        <div className="frame">
          <div className="frame__title">
            <h1 className="frame__title-main">Grid Scroll Animations</h1>
            <a
              aria-label="Back to the article"
              className="frame__title-back"
              href="https://tympanus.net/codrops/?p=63672"
            >
              <span className="oh__inner">Back to the article</span>
              <svg width="18px" height="18px" viewBox="0 0 24 24" aria-hidden>
                <path d="M18.25 15.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h7.19L6.22 16.72a.75.75 0 101.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z" />
              </svg>
            </a>
          </div>
          <nav className="frame__demos" aria-label="More demos">
            <span className="frame__demos-title">More demos: </span>
            <a
              href="#"
              className="frame__demo frame__demo--current"
              onClick={(event) => event.preventDefault()}
            >
              1
            </a>
          </nav>
        </div>

        <div className="content">
          <div className="grid">
            {GRID_ITEMS.map((item, index) => (
              <div
                key={`${item.r}-${item.c}-${index}`}
                className="grid__item"
                style={{ "--r": item.r, "--c": item.c } as CSSProperties}
              >
                <div
                  className="grid__item-img"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
              </div>
            ))}
          </div>

          <div className="cover">
            <h2 className="cover__title">Our blooms</h2>
            <h3 className="cover__subtitle">並外れたファッション</h3>
          </div>

          <div className="footer">
            <p>
              From the dawn of civilisation onwards crowds have always undergone the
              influence of illusions. It is to the creators of illusions that they have
              raised more temples, statues, and altars than to any other class of men.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ScrollGridTemplate;
