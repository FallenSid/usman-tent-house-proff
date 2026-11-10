import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  const reduce = useReducedMotion();
  return (
    <section id="process" className="bg-champagne/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="How It Works" title="Four Simple Steps" description="From first conversation to the final setup, we keep the process clear and easy." />

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gold/25 lg:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-gold"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </div>

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.7, delay: i * 0.18 }}
                className="relative text-center"
              >
                <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold bg-ivory text-maroon-700 shadow-[0_8px_24px_-12px_rgba(74,13,22,0.5)]">
                  <Icon size={26} strokeWidth={1.3} aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-maroon-800 text-xs font-medium text-ivory">{i + 1}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-maroon-800">{title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] leading-relaxed text-ink-soft">{text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
