import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/utils/cn";

export function FAQ() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="bg-champagne/60 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" description="Quick answers to the things customers ask us most." />
        <Reveal delay={0.1} className="mt-12 divide-y divide-gold/30 border-y border-gold/30">
          {faqs.map((faq) => {
            const isOpen = open === faq.id;
            return (
              <div key={faq.id}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className={cn("font-serif text-xl font-semibold transition-colors sm:text-2xl", isOpen ? "text-maroon-700" : "text-maroon-800")}>
                      {faq.question}
                    </span>
                    <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold text-gold-dark transition-all duration-300", isOpen && "rotate-45 bg-gold text-maroon-950")}>
                      <Plus size={18} aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 leading-relaxed text-ink-soft">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
