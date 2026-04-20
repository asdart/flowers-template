import { useRef, useLayoutEffect, useEffect, useCallback } from "react";
import gsap from "gsap";
import LetterSwapForward from "../../components/fancy/text/letter-swap-forward-anim";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import img1 from "../../imports/69d50e85-28ba-4f32-ab47-dd90a5993b5e-WjrTzgrxiZfZnUZ4PuqC3ZlrMPhEiM.webp";
import img2 from "../../imports/a3b82b97-969a-46c6-9f9f-1b7e60527ba1-oQIVn2NTBfjBTc5z6BDTPD4O0dugLa.webp";
import img3 from "../../imports/3b3331d4-da53-4e0b-96c4-64dc7acffc92-WT4nsouZNxiXigrjikCHzDafAt0qIQ.webp";
import img4 from "../../imports/2ab68990-ddc0-4542-9fa3-4f534349b24b-MeNeEmlNG1vmTFbuvRKZw3HSgck6Zs.webp";
import img5 from "../../imports/cc47167a-8596-433b-9a1f-eb84fbff0369-meorDRy6dYTfGTJEzJM7dMRFEr0s2j.webp";
import img6 from "../../imports/e7c940f8-a673-4a4d-803b-1dc7d23ad25b-n0x9MEweLAo2nfKplAD5v9tXiauCvm.webp";
import img7 from "../../imports/Flower.jpg";
import img8 from "../../imports/46d12136-1914-4c62-a243-e5a85afaf045-wkoqmIa06Np7ixuMi4EpG1uSzgKzZL.png";

gsap.registerPlugin(ScrollTrigger, Flip);

const galleryImages = [
  { src: img1, alt: "Floral arrangement" },
  { src: img2, alt: "Botanical styling" },
  { src: img3, alt: "Wedding floristry" },
  { src: img4, alt: "Floral installation" },
  { src: img5, alt: "Garden blooms" },
  { src: img6, alt: "Red flower composition" },
  { src: img7, alt: "Studio flower arrangement" },
  { src: img8, alt: "Bespoke floral design" },
];

export function Gallery() {
  // — Title section refs —
  const titleSectionRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const selectedRevealRef = useRef<HTMLSpanElement>(null);
  const bloomsRevealRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // — Gallery refs —
  const wrapRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const createTween = useCallback(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return;
    const galleryItems = galleryElement.querySelectorAll(".gallery__item");

    ctxRef.current?.revert();
    galleryElement.classList.remove("gallery--final");

    ctxRef.current = gsap.context(() => {
      galleryElement.classList.add("gallery--final");
      const flipState = Flip.getState(galleryItems);
      galleryElement.classList.remove("gallery--final");

      const flip = Flip.to(flipState, {
        simple: true,
        ease: "expoScale(1, 5)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryElement,
          start: "center center",
          end: "+=100%",
          scrub: true,
          pin: galleryElement.parentNode as HTMLElement,
        },
      });
      tl.add(flip);

      return () => gsap.set(galleryItems, { clearProps: "all" });
    });
  }, []);

  // — Title section scroll-triggered reveal —
  useEffect(() => {
    const section = titleSectionRef.current;
    const lineTop = lineTopRef.current;
    const lineBottom = lineBottomRef.current;
    const selected = selectedRevealRef.current;
    const blooms = bloomsRevealRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !lineTop || !lineBottom || !selected || !blooms || !subtitle) return;

    gsap.set([lineTop, lineBottom], { scaleY: 0, transformOrigin: "top center" });
    gsap.set([selected, blooms], { yPercent: 110 });
    gsap.set(subtitle, { yPercent: 30, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 65%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });

    tl.to(lineTop, { scaleY: 1, duration: 0.8 }, 0)
      .to(selected, { yPercent: 0, duration: 0.9 }, 0.15)
      .to(blooms, { yPercent: 0, duration: 0.9 }, 0.28)
      .to(subtitle, { yPercent: 0, opacity: 1, duration: 0.9 }, 0.45)
      .to(lineBottom, { scaleY: 1, duration: 0.8 }, 0.55);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  useLayoutEffect(() => {
    createTween();

    const onResize = () => createTween();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctxRef.current?.revert();
    };
  }, [createTween]);

  return (
    <section id="gallery" className="relative bg-neutral-950 text-white">

      {/* ── Title screen ── */}
      <div
        ref={titleSectionRef}
        className="relative z-20 flex h-screen flex-col items-center justify-center bg-neutral-950 px-6"
      >
        <div className="flex flex-col items-center gap-4">
          <div ref={lineTopRef} className="h-12 w-px bg-neutral-600" />
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center text-2xl leading-8 tracking-[-1px]">
              <div className="overflow-hidden">
                <span ref={selectedRevealRef} className="block">
                  <LetterSwapForward label="Selected" className="font-serif font-light italic text-white" staggerFrom="first" staggerDuration={0.04} />
                </span>
              </div>
              <div className="overflow-hidden">
                <span ref={bloomsRevealRef} className="block">
                  <LetterSwapForward label="blooms" className="font-sans font-normal text-amber-100" staggerFrom="first" staggerDuration={0.04} />
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <p
                ref={subtitleRef}
                className="max-w-sm text-base leading-6 tracking-wide text-neutral-300 opacity-60"
              >
                We are a floral studio crafting wild, botanical experiences for
                weddings, events, and spaces.
              </p>
            </div>
          </div>
          <div ref={lineBottomRef} className="h-12 w-px bg-neutral-600" />
        </div>
      </div>

      <div className="gallery-wrap" ref={wrapRef}>
        <div
          className="gallery gallery--bento"
          id="gallery-8"
          ref={galleryRef}
        >
          {galleryImages.map((img, i) => (
            <div className="gallery__item" key={i}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
