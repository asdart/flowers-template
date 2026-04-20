import { motion } from "motion/react";
import LetterSwapForward from "../../components/fancy/text/letter-swap-forward-anim";

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-neutral-900 bg-[#0a0a0a] px-6 pb-12 pt-20 text-white md:px-24"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-32">
        {/* Top section */}
        <div className="flex flex-col items-start justify-between gap-16 md:flex-row">
          {/* Left — title + email */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col text-2xl leading-8 tracking-[-1px]">
              <LetterSwapForward
                label="Let's bloom"
                className="font-serif font-light italic text-white justify-start"
                staggerFrom="first"
                staggerDuration={0.04}
              />
              <LetterSwapForward
                label="together"
                className="font-sans font-normal text-amber-100 justify-start"
                staggerFrom="first"
                staggerDuration={0.03}
              />
            </div>
            <a
              href="mailto:hello@wildeflowerstudiosg.com"
              className="w-fit border-b border-white pb-2 font-serif text-2xl italic leading-8 tracking-[-1px] text-amber-100 transition-colors hover:border-neutral-400 hover:text-neutral-400"
            >
              hello@wildeflowerstudiosg.com
            </a>
          </motion.div>

          {/* Right — socials */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-sans text-sm font-medium uppercase leading-5 tracking-[1.4px] text-neutral-500">
              Socials
            </h4>
            <ul className="flex flex-col gap-2 font-sans text-base leading-6">
              <li>
                <a href="#" className="font-light text-neutral-400/60 transition-colors hover:text-neutral-400">Instagram</a>
              </li>
              <li>
                <a href="#" className="font-light text-neutral-400/60 transition-colors hover:text-neutral-400">Pinterest</a>
              </li>
              <li>
                <a href="#" className="font-light text-neutral-400/60 transition-colors hover:text-neutral-400">TikTok</a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-neutral-900 pt-8 font-sans text-sm uppercase leading-5 tracking-[1.4px] text-neutral-500 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} Wilde Flower Studio SG. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
