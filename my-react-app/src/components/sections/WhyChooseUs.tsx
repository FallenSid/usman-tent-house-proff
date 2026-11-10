import { motion } from "framer-motion";
import { whyChooseUs } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Care in Every Detail"
          description="What you can expect when you plan your celebration with us."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-sm border border-gold/30 bg-gold/30 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group bg-ivory p-8 transition-colors duration-500 hover:bg-white sm:p-10"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-gold text-maroon-700 transition-colors duration-500 group-hover:bg-maroon-800 group-hover:text-gold-light">
                <Icon size={24} strokeWidth={1.3} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-maroon-800">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
