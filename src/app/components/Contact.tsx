import { useState } from "react";
import { motion } from "motion/react";
import LetterSwapForward from "../../components/fancy/text/letter-swap-forward-anim";

const services = [
  "Wedding Floristry",
  "Event Styling",
  "Corporate Subscriptions",
  "Editorial & Workshops",
  "Something Else",
];

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = (name: string) =>
    [
      "w-full bg-transparent border-b py-4 text-base leading-6 text-white placeholder:text-neutral-700",
      "outline-none transition-colors duration-300 font-sans",
      focused === name ? "border-neutral-500" : "border-neutral-800",
    ].join(" ");

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-neutral-950 px-6 py-32 text-white md:px-12 lg:px-24"
    >
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-64px] z-0 select-none overflow-hidden whitespace-nowrap text-center opacity-[0.03]">
        <span className="font-serif text-[18vw] font-thin italic leading-none tracking-tighter">
          Get in touch
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-24 flex flex-col gap-8 lg:flex-row lg:gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lg:w-1/2">
            <div className="flex flex-col text-2xl leading-8 tracking-[-1px]">
              <LetterSwapForward label="Let's create" className="font-serif font-light italic text-white justify-start" staggerFrom="first" staggerDuration={0.04} />
              <LetterSwapForward label="Something beautiful" className="font-sans font-normal text-amber-100 justify-start" staggerFrom="first" staggerDuration={0.03} />
            </div>
          </div>
          <div className="flex flex-col justify-end lg:w-1/2">
            <p className="font-sans text-base leading-6 tracking-wide text-neutral-400 opacity-60">
              Share your vision with us. Due to our overwhelming response, we'll respond within five business days to discuss your bespoke floral needs.
            </p>
          </div>
        </motion.div>

        {/* Form / confirmation */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border border-neutral-800 p-16 text-center md:p-24"
          >
            <p className="mb-6 font-sans text-sm uppercase tracking-widest text-neutral-500">
              — Message received
            </p>
            <h3 className="mb-6 font-serif text-5xl font-bold uppercase tracking-tighter md:text-7xl">
              Thank you,<br />
              <span className="text-neutral-500">{formState.name.split(" ")[0]}.</span>
            </h3>
            <p className="mx-auto max-w-md font-sans text-lg text-neutral-400">
              We'll be in touch within 48 hours. In the meantime, find us on Instagram for daily
              floral inspiration.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12"
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="font-serif text-xs font-light italic tracking-[-0.25px] text-neutral-500">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Your name"
                  className={inputClass("name")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-serif text-xs font-light italic tracking-[-0.25px] text-neutral-500">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="your@email.com"
                  className={inputClass("email")}
                />
              </div>
            </div>

            {/* Service select */}
            <div className="flex flex-col gap-2">
              <label className="font-serif text-xs font-light italic tracking-[-0.25px] text-neutral-500">
                What are you interested in?
              </label>
              <div className="relative">
                <select
                  name="service"
                  value={formState.service}
                  onChange={handleChange}
                  onFocus={() => setFocused("service")}
                  onBlur={() => setFocused(null)}
                  className={[
                    inputClass("service"),
                    "cursor-pointer appearance-none pr-10",
                    formState.service === "" ? "text-neutral-700" : "text-white",
                  ].join(" ")}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-neutral-950 text-white">
                      {s}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-neutral-500">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="font-serif text-xs font-light italic tracking-[-0.25px] text-neutral-500">
                Tell us about your vision *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formState.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Share your ideas, event date, or any details you'd like us to know..."
                className={`${inputClass("message")} resize-none`}
              />
            </div>

            {/* Submit row */}
            <div className="flex items-center justify-between pt-4">
              <p className="font-sans text-sm uppercase tracking-[1.4px] text-neutral-600">
                * Required fields
              </p>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer rounded-full bg-white px-4 py-1.5 font-sans text-xs font-normal text-black transition-colors duration-200 hover:bg-neutral-200"
              >
                Send message
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
