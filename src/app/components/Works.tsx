import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Observer, ScrollTrigger);

const works = [
  {
    id: 1,
    title: "The Autumn Edit",
    category: "Weddings, Events",
    image:
      "https://images.unsplash.com/photo-1624137308635-96d0a1e9ff4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvcmFsJTIwaW5zdGFsbGF0aW9ufGVufDF8fHx8MTc3NjM2NDgyNHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Midnight Botanical",
    category: "Editorial Styling",
    image:
      "https://images.unsplash.com/photo-1695373794980-e893c611f766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBhcnJhbmdlbWVudCUyMGFydGlzdGljfGVufDF8fHx8MTc3NjM2NDgyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Concrete & Flora",
    category: "Corporate Installations",
    image:
      "https://images.unsplash.com/photo-1713458166024-d2319a037919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBzdHlsaW5nfGVufDF8fHx8MTc3NjM2NDgyNHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Works() {
  // — Title section refs —
  const titleSectionRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const selectedRevealRef = useRef<HTMLSpanElement>(null);
  const bloomsRevealRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // — Slider refs —
  const stickyRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const outerRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<(HTMLDivElement | null)[]>([]);
  const categoryRevealRef = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRevealRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const linkRevealRef = useRef<(HTMLDivElement | null)[]>([]);

  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const observerRef = useRef<ReturnType<typeof Observer.create> | null>(null);
  const initializedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // — Slide text reveal on transition —
  const revealSlideText = useCallback((index: number, delay = 0.5) => {
    const cat = categoryRevealRef.current[index];
    const ttl = titleRevealRef.current[index];
    const lnk = linkRevealRef.current[index];
    if (!cat || !ttl || !lnk) return;

    gsap.set([cat, ttl, lnk], { yPercent: 110, opacity: 0 });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(cat, { yPercent: 0, opacity: 1, duration: 0.7 }, delay)
      .to(ttl, { yPercent: 0, opacity: 1, duration: 0.9 }, delay + 0.1)
      .to(lnk, { yPercent: 0, opacity: 1, duration: 0.7 }, delay + 0.25);
  }, []);

  const gotoSection = useCallback(
    (index: number, direction: number) => {
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
      const outers = outerRef.current.filter(Boolean) as HTMLDivElement[];
      const inners = innerRef.current.filter(Boolean) as HTMLDivElement[];
      const bgs = bgRef.current.filter(Boolean) as HTMLDivElement[];

      if (index >= slides.length) {
        observerRef.current?.disable();
        const next = document.getElementById("services");
        if (next) next.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (index < 0) {
        observerRef.current?.disable();
        const prev = document.getElementById("about");
        if (prev) prev.scrollIntoView({ behavior: "smooth" });
        return;
      }

      animatingRef.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      if (currentIndexRef.current >= 0) {
        gsap.set(slides[currentIndexRef.current], { zIndex: 0 });
        tl.to(bgs[currentIndexRef.current], { yPercent: -15 * dFactor }, 0);
        tl.set(slides[currentIndexRef.current], { autoAlpha: 0 });
      }

      gsap.set(slides[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(outers[index], { yPercent: dFactor * 100 }, { yPercent: 0 }, 0);
      tl.fromTo(inners[index], { yPercent: dFactor * -100 }, { yPercent: 0 }, 0);
      tl.fromTo(bgs[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

      currentIndexRef.current = index;
      setActiveIndex(index);

      revealSlideText(index, 0.45);
    },
    [revealSlideText]
  );

  // — Title section scroll-triggered reveal —
  useEffect(() => {
    const section = titleSectionRef.current;
    if (!section) return;

    const lineTop = lineTopRef.current;
    const lineBottom = lineBottomRef.current;
    const selected = selectedRevealRef.current;
    const blooms = bloomsRevealRef.current;
    const subtitle = subtitleRef.current;
    if (!lineTop || !lineBottom || !selected || !blooms || !subtitle) return;

    gsap.set([lineTop, lineBottom], { scaleY: 0, transformOrigin: "top center" });
    gsap.set([selected, blooms], { yPercent: 110 });
    gsap.set(subtitle, { yPercent: 30, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
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

  // — Slider: Observer + IntersectionObserver to enable only when fully in view —
  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;

    const outers = outerRef.current.filter(Boolean) as HTMLDivElement[];
    const inners = innerRef.current.filter(Boolean) as HTMLDivElement[];

    gsap.set(outers, { yPercent: 100 });
    gsap.set(inners, { yPercent: -100 });

    categoryRevealRef.current.forEach((el) => el && gsap.set(el, { yPercent: 110, opacity: 0 }));
    titleRevealRef.current.forEach((el) => el && gsap.set(el, { yPercent: 110, opacity: 0 }));
    linkRevealRef.current.forEach((el) => el && gsap.set(el, { yPercent: 110, opacity: 0 }));

    observerRef.current = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });
    observerRef.current.disable();

    // threshold: 0.95 means "almost entirely visible"
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observerRef.current?.enable();
          if (!initializedRef.current) {
            initializedRef.current = true;
            gotoSection(0, 1);
          }
        } else {
          observerRef.current?.disable();
        }
      },
      { threshold: 0.95 }
    );

    io.observe(sticky);

    return () => {
      io.disconnect();
      observerRef.current?.kill();
    };
  }, [gotoSection]);

  return (
    <section id="work" className="relative bg-neutral-950 text-white">

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
                <span
                  ref={selectedRevealRef}
                  className="block font-serif font-light italic text-white"
                >
                  Selected
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  ref={bloomsRevealRef}
                  className="block font-sans font-normal text-amber-100"
                >
                  blooms
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

      {/* ── Swipe slider — sticky so it locks to the viewport ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 z-30 h-screen overflow-hidden"
      >
        {works.map((work, index) => (
          <div
            key={work.id}
            ref={(el) => { slidesRef.current[index] = el; }}
            className="absolute inset-0 invisible"
          >
            <div
              ref={(el) => { outerRef.current[index] = el; }}
              className="h-full w-full overflow-hidden"
            >
              <div
                ref={(el) => { innerRef.current[index] = el; }}
                className="relative h-full w-full"
              >
                <div
                  ref={(el) => { bgRef.current[index] = el; }}
                  className="absolute inset-0"
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-16">
                  <div className="overflow-hidden mb-2">
                    <span
                      ref={(el) => { categoryRevealRef.current[index] = el; }}
                      className="block font-sans text-xs uppercase tracking-[0.3em] text-neutral-400"
                    >
                      {work.category}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <h3
                      ref={(el) => { titleRevealRef.current[index] = el; }}
                      className="block font-serif text-4xl font-semibold tracking-tight md:text-6xl"
                    >
                      {work.title}
                    </h3>
                  </div>
                  <div className="overflow-hidden mt-6">
                    <div ref={(el) => { linkRevealRef.current[index] = el; }}>
                      <a
                        href="#"
                        className="inline-flex items-center gap-3 border-b border-neutral-500 pb-2 text-sm uppercase tracking-widest transition-colors duration-300 hover:border-white"
                      >
                        View Project
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 13L13 1M13 1H4M13 1V10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 md:right-16">
          {works.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!animatingRef.current && index !== currentIndexRef.current) {
                  gotoSection(index, index > currentIndexRef.current ? 1 : -1);
                }
              }}
              className={`h-8 w-px transition-all duration-500 ${
                activeIndex === index
                  ? "bg-white scale-x-150"
                  : "bg-neutral-600 hover:bg-neutral-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute bottom-8 left-8 z-20 font-sans text-sm tabular-nums text-neutral-400 md:bottom-16 md:left-16">
          <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          <span>{String(works.length).padStart(2, "0")}</span>
        </div>

        {/* Swipe hint */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-neutral-500 md:bottom-16 md:right-16">
          <span>Swipe</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3v10M8 13l3-3M8 13L5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
