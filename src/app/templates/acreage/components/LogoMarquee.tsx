/* ─────────────────────────────────────────────────────────────
   LogoMarquee — horizontal logo strip with seamless loop.
   Four duplicate sets keep the animation seamless on ultrawide
   displays.
   ───────────────────────────────────────────────────────────── */

const LOGOS = [
  { src: "https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/voiceflow-logo-svg-150px.svg", alt: "Voiceflow" },
  { src: "https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/zendesk-logo-svg-150px.svg", alt: "Zendesk" },
  { src: "https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/pendo-logo-svg-150px.svg", alt: "Pendo" },
  { src: "https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/glide-logo-svg-150px.svg", alt: "Glide" },
  { src: "https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/canva-logo-svg-150px.svg", alt: "Canva" },
];

export default function LogoMarquee() {
  return (
    <div className="w-full bg-black py-6 overflow-hidden relative border-t border-b border-white/10">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* 4× duplicate sets — keeps the loop seamless on ultrawide
          displays where 2× would produce a visible reset jump. */}
      <div className="flex w-max acreage-marquee">
        {[0, 1, 2, 3].map((set) => (
          <div key={set} className="flex gap-12 pr-12">
            {LOGOS.map((logo, i) => (
              <div
                key={`${set}-${i}`}
                className="logo-item h-[32px] flex items-center justify-center px-4"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300 filter invert brightness-0"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes acreage-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .acreage-marquee {
          animation: acreage-marquee 20s linear infinite;
        }
      `,
        }}
      />
    </div>
  );
}
