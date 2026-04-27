import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────
   Lumina Interactive List
   A WebGL-powered slider that transitions between images using
   a glass/refraction shader, paired with animated typography.
   ───────────────────────────────────────────────────────────── */

export type LuminaSlide = {
  title: string;
  description: string;
  media: string;
  /** Optional small label rendered above the title (e.g. category) */
  tag?: string;
};

type LuminaInteractiveListProps = {
  slides: LuminaSlide[];
  /** Auto-advance interval, in milliseconds. Set to 0 to disable. */
  autoSlideMs?: number;
  /** Transition duration in seconds. */
  transitionDuration?: number;
  /** Optional class names for the outer wrapper. */
  className?: string;
  /** Tone of the chrome (text + nav). Defaults to light over dark imagery. */
  tone?: "light" | "dark";
  /** Accent color for tags, counter and the slide-progress fill. */
  accentColor?: string;
  /** Optional color overlay on top of the canvas for contrast. Accepts any CSS color value, e.g. "rgba(15,26,21,0.55)". */
  overlayColor?: string;
};

/* ─────────────────────────────────────────────────────────────
   Shaders — a glass / refraction transition between two images
   ───────────────────────────────────────────────────────────── */
const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uTexture1Size;
  uniform vec2 uTexture2Size;
  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    return (uv * uResolution - offset) / scaledSize;
  }

  void main() {
    vec2 uv1 = getCoverUV(vUv, uTexture1Size);
    vec2 uv2 = getCoverUV(vUv, uTexture2Size);

    float maxR = length(uResolution) * 0.85;
    float br = uProgress * maxR;
    vec2 p = vUv * uResolution;
    vec2 c = uResolution * 0.5;
    float d = length(p - c);
    float nd = d / max(br, 0.001);
    float param = smoothstep(br + 3.0, br - 3.0, d);

    vec4 img;
    if (param > 0.0) {
      // Glass refraction inside the expanding circle.
      float ro = 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
      vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
      vec2 distUV = uv2 - dir * ro;
      distUV += vec2(
        sin(uProgress * 5.0 + nd * 10.0),
        cos(uProgress * 4.0 + nd * 8.0)
      ) * 0.012 * nd * param;

      float ca = 0.018 * pow(smoothstep(0.3, 1.0, nd), 1.2);
      img = vec4(
        texture2D(uTexture2, distUV + dir * ca * 1.2).r,
        texture2D(uTexture2, distUV + dir * ca * 0.2).g,
        texture2D(uTexture2, distUV - dir * ca * 0.8).b,
        1.0
      );

      // Subtle rim glow at the leading edge of the refraction circle.
      float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
      img.rgb += rim * 0.08;
    } else {
      img = texture2D(uTexture2, uv2);
    }

    vec4 oldImg = texture2D(uTexture1, uv1);
    if (uProgress > 0.95) {
      img = mix(img, texture2D(uTexture2, uv2), (uProgress - 0.95) / 0.05);
    }
    gl_FragColor = mix(oldImg, img, param);
  }
`;

/* ─────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────── */
const splitChars = (text: string) =>
  text
    .split("")
    .map(
      (char) =>
        `<span style="display:inline-block;opacity:0;will-change:transform">${
          char === " " ? "&nbsp;" : char
        }</span>`,
    )
    .join("");

const loadTexture = (loader: THREE.TextureLoader, src: string) =>
  new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(
      src,
      (t) => {
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.userData = {
          size: new THREE.Vector2(t.image.width, t.image.height),
        };
        resolve(t);
      },
      undefined,
      reject,
    );
  });

/* ─────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────── */
export function LuminaInteractiveList({
  slides,
  autoSlideMs = 5000,
  transitionDuration = 2.2,
  className = "",
  tone = "light",
  accentColor = "#d4af37",
  overlayColor,
}: LuminaInteractiveListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Latest values for use inside the long-lived effect.
  const slidesRef = useRef(slides);
  const activeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const navigateRef = useRef<(target: number) => void>(() => {});
  const autoSlideRef = useRef(autoSlideMs);
  const transitionDurationRef = useRef(transitionDuration);

  slidesRef.current = slides;
  autoSlideRef.current = autoSlideMs;
  transitionDurationRef.current = transitionDuration;

  const fonts = useMemo(
    () => ({
      mono: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
      sans: "var(--font-sans, ui-sans-serif, system-ui, sans-serif)",
      display: "var(--font-display, var(--font-serif, Georgia, serif))",
    }),
    [],
  );

  const palette = useMemo(() => {
    if (tone === "dark") {
      return {
        text: "#0a0a0a",
        textMuted: "rgba(0, 0, 0, 0.7)",
        textLight: "rgba(0, 0, 0, 0.5)",
      };
    }
    return {
      text: "#ffffff",
      textMuted: "rgba(255, 255, 255, 0.7)",
      textLight: "rgba(255, 255, 255, 0.5)",
    };
  }, [tone]);

  /* ── Three.js scene + interaction loop ─────────────────────── */
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const slidesLocal = slidesRef.current;
    if (slidesLocal.length === 0) return;

    let disposed = false;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const setSize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      shaderMaterial.uniforms.uResolution.value.set(w, h);
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: null as THREE.Texture | null },
        uTexture2: { value: null as THREE.Texture | null },
        uProgress: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(
            container.clientWidth || 1,
            container.clientHeight || 1,
          ),
        },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(mesh);

    setSize();
    let animationFrame = 0;
    const renderLoop = () => {
      if (disposed) return;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);

    /* ── Texture loading ──────────────────────────────────────── */
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    const textures: THREE.Texture[] = [];
    let texturesLoaded = false;

    Promise.all(
      slidesLocal.map((slide) =>
        loadTexture(loader, slide.media).catch((err) => {
          console.warn("[lumina] failed to load texture", slide.media, err);
          return null;
        }),
      ),
    ).then((results) => {
      if (disposed) return;
      results.forEach((t) => {
        if (t) textures.push(t);
      });
      if (textures.length < 2) {
        if (textures.length === 1) {
          shaderMaterial.uniforms.uTexture1.value = textures[0];
          shaderMaterial.uniforms.uTexture2.value = textures[0];
          const size = (textures[0].userData as { size: THREE.Vector2 }).size;
          shaderMaterial.uniforms.uTexture1Size.value = size;
          shaderMaterial.uniforms.uTexture2Size.value = size;
        }
        texturesLoaded = textures.length > 0;
        setIsReady(texturesLoaded);
        return;
      }

      shaderMaterial.uniforms.uTexture1.value = textures[0];
      shaderMaterial.uniforms.uTexture2.value = textures[1];
      shaderMaterial.uniforms.uTexture1Size.value = (
        textures[0].userData as { size: THREE.Vector2 }
      ).size;
      shaderMaterial.uniforms.uTexture2Size.value = (
        textures[1].userData as { size: THREE.Vector2 }
      ).size;
      texturesLoaded = true;
      setIsReady(true);
      startProgressTimer(autoSlideRef.current);
    });

    /* ── Auto-advance progress timer ──────────────────────────── */
    let progressInterval: ReturnType<typeof setInterval> | null = null;
    const PROGRESS_TICK = 50;

    const stopProgressTimer = () => {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    };

    const startProgressTimer = (durationMs: number) => {
      stopProgressTimer();
      if (!texturesLoaded || durationMs <= 0) return;
      let elapsed = 0;
      progressInterval = setInterval(() => {
        if (disposed) {
          stopProgressTimer();
          return;
        }
        elapsed += PROGRESS_TICK;
        const ratio = Math.min(100, (elapsed / durationMs) * 100);
        setProgress(ratio);
        if (ratio >= 100) {
          stopProgressTimer();
          setProgress(0);
          if (!isTransitioningRef.current) {
            const next =
              (activeIndexRef.current + 1) % slidesRef.current.length;
            navigateRef.current(next);
          }
        }
      }, PROGRESS_TICK);
    };

    /* ── Slide navigation ─────────────────────────────────────── */
    const animateText = (idx: number) => {
      const titleEl = titleRef.current;
      const descEl = descRef.current;
      if (!titleEl || !descEl) return;

      gsap.killTweensOf([titleEl.children, descEl]);
      gsap.to(titleEl.children, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.in",
      });
      gsap.to(descEl, {
        y: -10,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          if (disposed) return;
          const slide = slidesRef.current[idx];
          if (!slide) return;
          titleEl.innerHTML = splitChars(slide.title);
          descEl.textContent = slide.description;

          const children = titleEl.children;
          gsap.set(children, { opacity: 0 });
          gsap.set(descEl, { y: 20, opacity: 0 });

          const variant = idx % 6;
          switch (variant) {
            case 0:
              gsap.set(children, { y: 20 });
              gsap.to(children, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.03,
                ease: "power3.out",
              });
              break;
            case 1:
              gsap.set(children, { y: -20 });
              gsap.to(children, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.03,
                ease: "back.out(1.7)",
              });
              break;
            case 2:
              gsap.set(children, { filter: "blur(10px)", scale: 1.5, y: 0 });
              gsap.to(children, {
                filter: "blur(0px)",
                scale: 1,
                opacity: 1,
                duration: 1,
                stagger: { amount: 0.5, from: "random" },
                ease: "power2.out",
              });
              break;
            case 3:
              gsap.set(children, { scale: 0, y: 0 });
              gsap.to(children, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: "back.out(1.5)",
              });
              break;
            case 4:
              gsap.set(children, {
                rotationX: 90,
                y: 0,
                transformOrigin: "50% 50%",
              });
              gsap.to(children, {
                rotationX: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.04,
                ease: "power2.out",
              });
              break;
            default:
              gsap.set(children, { x: 30, y: 0 });
              gsap.to(children, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.03,
                ease: "power3.out",
              });
          }

          gsap.to(descEl, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
          });
        },
      });
    };

    const navigateToSlide = (target: number) => {
      if (disposed || isTransitioningRef.current) return;
      if (target === activeIndexRef.current) return;
      if (textures.length < 2) return;

      stopProgressTimer();
      setProgress(0);

      const fromTexture = textures[activeIndexRef.current];
      const toTexture = textures[target];
      if (!fromTexture || !toTexture) return;

      isTransitioningRef.current = true;
      shaderMaterial.uniforms.uTexture1.value = fromTexture;
      shaderMaterial.uniforms.uTexture2.value = toTexture;
      shaderMaterial.uniforms.uTexture1Size.value = (
        fromTexture.userData as { size: THREE.Vector2 }
      ).size;
      shaderMaterial.uniforms.uTexture2Size.value = (
        toTexture.userData as { size: THREE.Vector2 }
      ).size;

      animateText(target);
      activeIndexRef.current = target;
      setActiveIndex(target);

      gsap.fromTo(
        shaderMaterial.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: transitionDurationRef.current,
          ease: "power2.inOut",
          onComplete: () => {
            if (disposed) return;
            shaderMaterial.uniforms.uProgress.value = 0;
            shaderMaterial.uniforms.uTexture1.value = toTexture;
            shaderMaterial.uniforms.uTexture1Size.value = (
              toTexture.userData as { size: THREE.Vector2 }
            ).size;
            isTransitioningRef.current = false;
            startProgressTimer(autoSlideRef.current);
          },
        },
      );
    };

    navigateRef.current = navigateToSlide;

    /* ── Initial title render ─────────────────────────────────── */
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const initial = slidesLocal[0];
    if (titleEl && descEl && initial) {
      titleEl.innerHTML = splitChars(initial.title);
      descEl.textContent = initial.description;
      gsap.fromTo(
        titleEl.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.03,
          ease: "power3.out",
          delay: 0.5,
        },
      );
      gsap.fromTo(
        descEl,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 },
      );
    }

    /* ── Page-visibility pause ───────────────────────────────── */
    const onVisibilityChange = () => {
      if (document.hidden) stopProgressTimer();
      else if (!isTransitioningRef.current)
        startProgressTimer(autoSlideRef.current);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    /* ── Cleanup ──────────────────────────────────────────────── */
    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      stopProgressTimer();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gsap.killTweensOf(shaderMaterial.uniforms.uProgress);
      if (titleRef.current) gsap.killTweensOf(titleRef.current.children);
      if (descRef.current) gsap.killTweensOf(descRef.current);
      textures.forEach((t) => t.dispose());
      shaderMaterial.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    };
    // We deliberately re-run the whole pipeline only when the slides identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides]);

  /* ── Click handler for the side nav (driven by React state) ── */
  const handleNavClick = (i: number) => {
    if (i === activeIndex) return;
    navigateRef.current(i);
  };

  const total = slides.length;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        backgroundColor: "#0a0a0a",
        color: palette.text,
        fontFamily: fonts.sans,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Optional color overlay for contrast */}
      {overlayColor ? (
        <div
          className="absolute inset-0 z-[1]"
          style={{ backgroundColor: overlayColor }}
        />
      ) : null}

      {/* Top-left counter */}
      <span
        className="absolute z-10"
        style={{
          top: "1.5rem",
          left: "1.5rem",
          fontFamily: fonts.mono,
          fontSize: "clamp(10px, 1.2vw, 12px)",
          color: accentColor,
          letterSpacing: "0.08em",
        }}
      >
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <span
        className="absolute z-10"
        style={{
          top: "1.5rem",
          right: "1.5rem",
          fontFamily: fonts.mono,
          fontSize: "clamp(10px, 1.2vw, 12px)",
          color: palette.textLight,
          letterSpacing: "0.08em",
        }}
      >
        {String(total).padStart(2, "0")}
      </span>

      {/* Center content — sits above the bottom nav bar */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-20 text-center">
        <h2
          ref={titleRef}
          className="m-0"
          style={{
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: palette.text,
            textShadow: tone === "light" ? "0 2px 24px rgba(0,0,0,0.35)" : "none",
          }}
        />
        <p
          ref={descRef}
          className="mt-4 max-w-xl"
          style={{
            fontFamily: fonts.sans,
            fontSize: "clamp(13px, 1.1vw, 15px)",
            lineHeight: 1.6,
            color: palette.textMuted,
            textShadow: tone === "light" ? "0 1px 12px rgba(0,0,0,0.35)" : "none",
          }}
        />
      </div>

      {/* Bottom horizontal slide navigation */}
      <nav
        className="absolute bottom-0 inset-x-0 z-10 flex items-stretch"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 100%)",
        }}
        aria-label="Slide navigation"
      >
        {slides.map((slide, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={`${slide.title}-${i}`}
              type="button"
              onClick={() => handleNavClick(i)}
              className="group relative flex flex-1 cursor-pointer flex-col items-center justify-end bg-transparent px-2 pb-5 pt-8"
              style={{
                color: isActive ? palette.text : palette.textLight,
                opacity: isActive ? 1 : 0.55,
                transition: "opacity 0.4s ease",
              }}
            >
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "clamp(9px, 0.9vw, 11px)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                {slide.title}
              </span>

              {/* Progress line sits directly below the label */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 inset-x-0 mx-3"
                style={{
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    width: isActive ? `${progress}%` : "0%",
                    backgroundColor: accentColor,
                    opacity: isActive ? 1 : 0,
                    transition: "width 0.1s linear, opacity 0.3s ease",
                  }}
                />
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default LuminaInteractiveList;
