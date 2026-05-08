import { useState, type ChangeEvent, type FocusEvent } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import Typewriter from "./Typewriter";

/* ═══════════════════════════════════════════════════════════════
   ContactSection — inquiry form with live per-field validation.

   Each input animates a green checkmark or red cross at the right
   edge based on its blur-validated state. Required fields validate
   strictly; optional fields only show the success state when filled.
   ═══════════════════════════════════════════════════════════════ */

const SERIF_STYLE = { fontFamily: "'Instrument Serif', serif" } as const;

type FieldName = "name" | "email" | "phone" | "farm" | "message";

export default function ContactSection() {
  const [formData, setFormData] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    phone: "",
    farm: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    phone: false,
    farm: false,
    message: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const validations = {
    name: formData.name.trim().length > 0,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    phone: /^\+[\d\s\-()]{7,20}$/.test(formData.phone),
    farm: formData.farm.trim().length > 0,
    message: formData.message.trim().length > 0,
  };

  const renderIcon = (field: FieldName, isRequired: boolean) => {
    if (!touched[field]) return null;
    const isValid = validations[field];
    const value = formData[field];

    if (isValid && (isRequired || value.trim().length > 0)) {
      return (
        <Check
          className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#27BD09]"
          strokeWidth={2.5}
        />
      );
    }
    if (!isValid && isRequired) {
      return (
        <X
          className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF1F1F]"
          strokeWidth={2.5}
        />
      );
    }
    return null;
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="contact"
      data-acreage-nav-surface="light"
      className="w-full bg-white text-black py-16 md:py-24 px-6 md:px-12 lg:px-[120px] flex flex-col items-center justify-center"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="w-full max-w-3xl mx-auto flex flex-col items-center"
      >
        <div className="text-center mb-12 md:mb-16 w-full">
          <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight mb-6 leading-[1.1]">
            <span className="text-black italic font-normal" style={SERIF_STYLE}>
              <Typewriter text="Let's grow!" delay={0} speed={0.015} />
            </span>{" "}
            <Typewriter text="Fill in the form" delay={0.2} speed={0.015} />
            <br />
            <Typewriter text="and we'll be in touch" delay={0.4} speed={0.015} />
          </h2>
          <p className="text-lg md:text-xl text-gray-800">
            <Typewriter
              text="Ask us about our precision harvesting services"
              delay={0.6}
              speed={0.015}
            />
          </p>
        </div>

        <form
          className="max-w-2xl w-full mx-auto flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {(
            [
              { name: "name", label: "Your Name*", placeholder: "Who's reaching out?", required: true, type: "text" },
              { name: "email", label: "Email*", placeholder: "Where can we reach you?", required: true, type: "email" },
              { name: "phone", label: "Phone Number*", placeholder: "Best number to call you on?", required: true, type: "tel" },
              { name: "farm", label: "Farm / Company", placeholder: "Your farm or organization?", required: false, type: "text" },
              { name: "message", label: "Tell Us More", placeholder: "What crops or acreage would you like to discuss?", required: false, type: "text" },
            ] as const
          ).map((field) => (
            <motion.div
              key={field.name}
              variants={formVariants}
              className="flex flex-col gap-2 border-b border-[#D9D9D9] pb-2 transition-colors duration-300 hover:border-black focus-within:border-black"
            >
              <label className="text-sm font-medium">{field.label}</label>
              <div className="relative w-full">
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent outline-none placeholder:text-[#D9D9D9] focus:placeholder:text-gray-500 transition-colors duration-300 text-base pr-8"
                  required={field.required}
                />
                {renderIcon(field.name, field.required)}
              </div>
            </motion.div>
          ))}

          <motion.div variants={formVariants} className="mt-8 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-black text-white px-6 py-3 sm:py-2.5 rounded-full hover:bg-[#27BD09] transition-colors duration-300 text-sm tracking-wide"
            >
              Send Message
            </button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
}
