import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "motion/react";

import bloomMaskImage from "../../../../imports/poison-bloom-hero.png";

/* ─────────────────────────────────────────────────────────────
   Mask Distortion — interactive WebGL artifact.

   A fullscreen organic blob follows the cursor with momentum,
   revealing a hidden image with chromatic aberration and
   velocity-driven motion blur. Outside the mask the screen
   shows a flat cream surface.

   Inspired by https://artifacts.deeo.studio/mask-distortion
   ───────────────────────────────────────────────────────────── */

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2  uTexSize;        // texture intrinsic size in pixels
  uniform vec2  uResolution;     // canvas size in pixels
  uniform vec2  uMouse;          // smoothed mouse, 0..1
  uniform vec2  uVelocity;       // smoothed mouse velocity, in uv units / sec
  uniform float uTime;
  uniform float uRadius;         // mask radius in uv units (height-relative)
  uniform float uActive;         // 0 → idle (small/static), 1 → engaged (full mask)
  uniform vec3  uBg;

  // Hash + value noise --------------------------------------------------------
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p *= 2.07;
      a *= 0.5;
    }
    return v;
  }

  // Object-fit: cover sampling. Maps canvas uv (0..1) to texture uv (0..1)
  // such that the texture fully covers the canvas, cropping in one axis.
  vec2 coverUv(vec2 uv, vec2 res, vec2 tex) {
    float resAspect = res.x / res.y;
    float texAspect = tex.x / tex.y;
    vec2 scale  = vec2(1.0);
    vec2 offset = vec2(0.0);
    if (resAspect > texAspect) {
      // Canvas is wider than texture → texture fills width, crop vertically.
      // Visible texture v range narrows from [0,1] to [offset, offset+scale].
      scale.y  = texAspect / resAspect;
      offset.y = (1.0 - scale.y) * 0.5;
    } else {
      scale.x  = resAspect / texAspect;
      offset.x = (1.0 - scale.x) * 0.5;
    }
    return offset + uv * scale;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;

    // Vector from mouse to current pixel, aspect-corrected
    vec2  d    = vec2((uv.x - uMouse.x) * aspect, uv.y - uMouse.y);
    float dist = length(d);
    vec2  dir  = dist > 1e-4 ? d / dist : vec2(0.0);

    // Velocity in same aspect-corrected space
    vec2  vel    = vec2(uVelocity.x * aspect, uVelocity.y);
    float velMag = clamp(length(vel), 0.0, 2.0);
    vec2  velDir = velMag > 1e-4 ? vel / velMag : vec2(1.0, 0.0);

    // "behind" = 1 when pixel sits fully in the trail of motion, 0 ahead
    float behind = max(0.0, dot(dir, -velDir));

    // ─── Mask shape ───────────────────────────────────────────────────────
    // Polar-coord fbm → wobbly rim (each angle shares its noise value).
    float ang   = atan(d.y, d.x);
    vec2  polar = vec2(cos(ang), sin(ang)) * 1.5 + uTime * 0.20;
    float n     = (fbm(polar) - 0.5) * 0.7
                + (fbm(polar * 2.3 + 7.7) - 0.5) * 0.3;

    // Trail elongation — radius extends sharply behind the cursor when moving
    float trail = pow(behind, 1.25) * velMag * 0.75;

    // Idle blob is small; active blob is much larger (~2.5× scale-up)
    float baseR   = mix(uRadius * 0.35, uRadius, uActive);
    float r       = baseR + n * 0.06 + trail;
    float feather = 0.022 + velMag * 0.06;
    float mask    = 1.0 - smoothstep(r - feather, r + feather, dist);

    // ─── Sample image (clean centre) ──────────────────────────────────────
    vec2 sUv = coverUv(uv, uResolution, uTexSize);
    vec3 col = texture2D(uTexture, sUv).rgb;

    // ─── Trail energy: motion blur + chromatic dispersion ────────────────
    // Stronger as you move deeper into the wake behind the cursor.
    float trailEnergy = behind * velMag;
    if (trailEnergy > 0.004) {
      vec3 acc = vec3(0.0);
      const int TAPS = 5;
      vec2 stepBase = vec2(velDir.x / aspect, velDir.y)
                    * (0.06 + velMag * 0.18) * trailEnergy;
      vec2 caBase   = vec2(velDir.x / aspect, velDir.y) * 0.018 * trailEnergy;

      for (int i = 0; i < TAPS; i++) {
        float t = (float(i) - 2.0) / 4.0;          // -0.5 .. 0.5
        vec2  stp = stepBase * t;
        float rCh = texture2D(uTexture, sUv + stp + caBase).r;
        float gCh = texture2D(uTexture, sUv + stp).g;
        float bCh = texture2D(uTexture, sUv + stp - caBase).b;
        acc += vec3(rCh, gCh, bCh);
      }
      acc /= float(TAPS);
      col = mix(col, acc, clamp(trailEnergy * 4.0, 0.0, 1.0));
    }

    // ─── Persistent rim chromatic aberration ──────────────────────────────
    // Outer ~30% of the blob picks up R/B channel split. Direction blends
    // radial + velocity so the trailing edge fringes harder than the front.
    float edge = smoothstep(r * 0.70, r * 1.02, dist) * mask;
    if (edge > 0.001) {
      vec2  caDir = normalize(velDir * 0.5 + dir + vec2(1e-4));
      float caAmt = (0.008 + velMag * 0.06 + behind * velMag * 0.05) * edge;
      vec2  ca    = vec2(caDir.x / aspect, caDir.y) * caAmt;
      float rCh = texture2D(uTexture, sUv + ca * 1.0).r;
      float gCh = texture2D(uTexture, sUv + ca * 0.15).g;
      float bCh = texture2D(uTexture, sUv - ca * 1.0).b;
      col = vec3(rCh, gCh, bCh);
    }

    // ─── Composite ────────────────────────────────────────────────────────
    vec3 finalColor = mix(uBg, col, mask);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const BG_HEX = "#EEF7CC"; // page background
const BG_RGB: [number, number, number] = [0.933, 0.969, 0.8]; // matches BG_HEX
const HEADLINE = "#1A1245";

export function MaskDistortion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(new THREE.Color(BG_HEX), 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 1×1 cream pixel as placeholder — avoids WebGL framebuffer-feedback
    // warning until the real image finishes loading.
    const placeholder = new THREE.DataTexture(
      new Uint8Array([238, 247, 204, 255]),
      1,
      1,
      THREE.RGBAFormat,
    );
    placeholder.needsUpdate = true;

    const uniforms: Record<string, THREE.IUniform> = {
      uTexture: { value: placeholder },
      uTexSize: { value: new THREE.Vector2(1, 1) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.18, 0.32) },
      uVelocity: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uRadius: { value: 0.36 },
      uActive: { value: 0 },
      uBg: { value: new THREE.Vector3(...BG_RGB) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Texture loading -------------------------------------------------------
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    loader.load(bloomMaskImage, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      uniforms.uTexture.value = tex;
      uniforms.uTexSize.value = new THREE.Vector2(
        tex.image?.width ?? 1,
        tex.image?.height ?? 1,
      );
    });

    // Pointer state ---------------------------------------------------------
    // target = where the mouse actually is (instant)
    // smooth = lagged value the shader uses (creates trailing/momentum)
    const target = { x: 0.18, y: 0.68 };
    const smooth = { x: 0.18, y: 0.68 };
    let prevSmooth = { x: 0.18, y: 0.68 };
    let active = 0;
    let activeTarget = 0;

    // The reference page reads y from the bottom; in shader we flip so mouse
    // coordinates feel natural (top-left origin).
    function onPointerMove(ev: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width;
      const y = 1 - (ev.clientY - rect.top) / rect.height;
      target.x = x;
      target.y = y;
      activeTarget = 1;
    }
    function onPointerLeave() {
      activeTarget = 0;
    }
    function onPointerEnter() {
      activeTarget = 1;
    }
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointerenter", onPointerEnter);

    // Touch fallback for mobile
    function onTouchMove(ev: TouchEvent) {
      const t = ev.touches[0];
      if (!t) return;
      const rect = container!.getBoundingClientRect();
      target.x = (t.clientX - rect.left) / rect.width;
      target.y = 1 - (t.clientY - rect.top) / rect.height;
      activeTarget = 1;
    }
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onPointerLeave);
    container.addEventListener("touchstart", onPointerEnter, { passive: true });

    // Resize ---------------------------------------------------------------
    function resize() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
      // When engaged, the blob occupies ~50–60% of the viewport height —
      // matches the reference's dramatic scale-up on hover. Idle radius
      // is computed from this in the shader (mix(uRadius * 0.35, uRadius)).
      uniforms.uRadius.value = w < 720 ? 0.6 : 0.55;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Idle animation ──── keep blob alive when no input, like the reference.
    let lastTime = performance.now();

    function frame(now: number) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // Idle drift in the upper-left quadrant when not engaged.
      // Small amplitude / slow frequency → near-zero velocity so the
      // image inside the mask stays sharp.
      const t = now / 1000;
      const idleX = 0.18 + Math.sin(t * 0.22) * 0.018;
      const idleY = 0.7 + Math.cos(t * 0.18) * 0.018;

      const tx = activeTarget > 0 ? target.x : idleX;
      const ty = activeTarget > 0 ? target.y : idleY;

      // Slower follow → noticeable lag/trail behind the cursor (jelly feel)
      const lerp = 1 - Math.pow(0.004, dt);
      smooth.x += (tx - smooth.x) * lerp;
      smooth.y += (ty - smooth.y) * lerp;

      const vx = (smooth.x - prevSmooth.x) / Math.max(dt, 0.0001);
      const vy = (smooth.y - prevSmooth.y) / Math.max(dt, 0.0001);
      prevSmooth = { ...smooth };

      // Blend velocity for stability (avoid jitter when static)
      const cur = uniforms.uVelocity.value as THREE.Vector2;
      cur.x += (vx - cur.x) * 0.12;
      cur.y += (vy - cur.y) * 0.12;

      // Slower active lerp → smooth grow/shrink rather than a snap
      active += (activeTarget - active) * 0.04;
      uniforms.uActive.value = active;

      (uniforms.uMouse.value as THREE.Vector2).set(smooth.x, smooth.y);
      uniforms.uTime.value = t;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    let raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onPointerLeave);
      container.removeEventListener("touchstart", onPointerEnter);
      geometry.dispose();
      material.dispose();
      placeholder.dispose();
      const tex = uniforms.uTexture.value as THREE.Texture | null;
      if (tex && tex !== placeholder) tex.dispose?.();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="exploration-hero"
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: BG_HEX,
        height: "100vh",
        minHeight: 600,
        cursor: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />

      {/* Headline overlay ------------------------------------------------- */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="pointer-events-none absolute z-10 select-none"
        style={{
          left: "clamp(20px, 3.5vw, 56px)",
          bottom: "clamp(80px, 14vh, 160px)",
          color: HEADLINE,
          fontFamily:
            "'Inter Tight', 'Helvetica Neue', system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(56px, 8.4vw, 132px)",
          lineHeight: 0.86,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          mixBlendMode: "difference",
        }}
      >
        <span style={{ color: "#FFFFFF" }}>
          Explore
          <br />
          What&rsquo;s
          <br />
          Possible
        </span>
      </motion.h1>

      {/* Bottom corner caption */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="pointer-events-none absolute bottom-5 right-6 z-10 hidden md:block"
        style={{
          color: HEADLINE,
          fontFamily: "'JetBrains Mono', 'Menlo', monospace",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          mixBlendMode: "difference",
        }}
      >
        <span style={{ color: "#ffffff" }}>
          [ Move cursor &nbsp;·&nbsp; Mask Distortion 01 ]
        </span>
      </motion.div>
    </section>
  );
}

export default MaskDistortion;
