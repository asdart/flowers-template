import { useEffect, useRef } from "react";
import { useInView, animate, motion } from "motion/react";
import Typewriter from "./Typewriter";
import statsVideoMask from "../../../../../project/public/Symbol.svg";

/* AnimatedCounter — counts from 0 → value once the element scrolls
   into view. Honours an optional decimal place + prefix/suffix. */
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = `${prefix}${val.toFixed(decimals)}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, prefix, suffix, decimals]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

const DM_SANS_STYLE = { fontFamily: "'DM Sans', sans-serif" } as const;
const SERIF_STYLE = { fontFamily: "'Instrument Serif', serif" } as const;
const STAT_COUNTER_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 200,
  letterSpacing: "-0.8px",
} as const;

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="bg-black text-white py-16 md:py-24 px-6 md:px-8 lg:px-[120px] w-full border-t border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          {/* Left column — title, subtitle, stats grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            className="flex-1 flex flex-col justify-start"
          >
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight mb-6 leading-[1.1] w-[590px] max-w-full">
              <span className="not-italic" style={DM_SANS_STYLE}>
                <Typewriter text="Powering Harvests" delay={0} speed={0.015} />
                <br />
                <Typewriter text="that " delay={0.25} speed={0.015} />
              </span>
              <span className="italic font-normal" style={SERIF_STYLE}>
                <Typewriter text="Maximize Your Yield" delay={0.35} speed={0.015} />
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/40 leading-relaxed font-light max-w-lg whitespace-normal mb-16">
              <Typewriter
                text="For over a decade, the region's most demanding agricultural operations have relied on our modern machinery and skilled crews to secure their crops efficiently and reduce loss."
                delay={0.1}
                speed={0.015}
              />
            </p>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-[max-content_max-content] gap-8 md:gap-x-16 lg:gap-x-24"
            >
              {/* Stat 1 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                }}
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl lg:text-[56px] mb-3" style={STAT_COUNTER_STYLE}>
                  <AnimatedCounter value={500} suffix="K+" />
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                  <Typewriter text="Acres Harvested Annually" delay={0.1} speed={0.015} />
                </div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                }}
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl lg:text-[56px] mb-3" style={STAT_COUNTER_STYLE}>
                  <AnimatedCounter value={99.8} decimals={1} suffix="%" />
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                  <Typewriter text="Crop Recovery Rate" delay={0.1} speed={0.015} />
                </div>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                }}
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl lg:text-[56px] mb-3" style={STAT_COUNTER_STYLE}>
                  <AnimatedCounter value={50} suffix="+" />
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                  <Typewriter text="Modern Combines Deployed" delay={0.1} speed={0.015} />
                </div>
              </motion.div>

              {/* Stat 4 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                }}
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl lg:text-[56px] mb-3" style={STAT_COUNTER_STYLE}>
                  <AnimatedCounter value={15} suffix="+" />
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                  <Typewriter text="Crop Varieties Supported" delay={0.1} speed={0.015} />
                </div>
              </motion.div>

              {/* Stat 5 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                }}
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl lg:text-[56px] mb-3" style={STAT_COUNTER_STYLE}>
                  <AnimatedCounter value={24} suffix="/7" />
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                  <Typewriter text="Uptime During Season" delay={0.1} speed={0.015} />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right column — logo-masked video */}
          <div className="flex justify-center items-center shrink-0 lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1.2 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
              className="w-fit h-fit max-w-[500px] lg:max-w-none origin-center"
              style={{
                WebkitMaskImage: `url("${statsVideoMask}")`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: `url("${statsVideoMask}")`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            >
              <video autoPlay loop muted playsInline className="w-full h-[400px] object-cover">
                <source
                  src="https://app-uploads.krea.ai/wan-videos/7f348c17-c3aa-40c9-9d5b-a2bed9a72c2e.mp4"
                  type="video/mp4"
                />
              </video>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
