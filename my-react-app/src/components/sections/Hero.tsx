import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Ornament } from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "7%"]);

  const [first, ...rest] = business.name.split(" ");

  return (
    <section ref={ref} id="home" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-maroon-950 lg:items-center">
      {/* Photograph with slow settle-in zoom and parallax */}
      <motion.div className="absolute inset-x-0 top-[-10%] -z-20 h-[120%] lg:left-[30%]" style={{ y }}>
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <Photo
            name="mandapChandelier"
            eager
            sizes="100vw"
            widths={[800, 1200, 1600, 2000]}
            className="object-center"
            alt="Floral wedding mandap with draped fabric and chandeliers — representative event decoration"
          />
        </motion.div>
      </motion.div>

      {/* Readability overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-maroon-950 via-maroon-950/70 to-maroon-950/20 lg:hidden" />
      <div className="absolute inset-y-0 left-[30%] -z-10 hidden w-[26%] bg-gradient-to-r from-maroon-950 via-maroon-950/60 to-transparent lg:block" />
      <div className="absolute inset-0 -z-10 hidden bg-maroon-950/10 lg:block" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-maroon-950/70 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 lg:pb-20 lg:pt-52">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl text-center lg:text-left">
          <motion.p variants={item} className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold-light sm:text-sm">
            Tent House &amp; Event Decoration · Kanpur
          </motion.p>

          <motion.h1 variants={item} className="font-display text-[2.9rem] font-semibold leading-[1.02] tracking-wide text-gold-gradient sm:text-6xl lg:text-7xl">
            {first.toUpperCase()}
            <span className="block">{rest.join(" ").toUpperCase()}</span>
          </motion.h1>

          <motion.div variants={item}>
            <Ornament className="mt-6 lg:justify-start" />
          </motion.div>

          <motion.p variants={item} className="mt-6 font-serif text-3xl font-medium italic leading-tight text-ivory sm:text-4xl">
            {business.tagline}
          </motion.p>

          <motion.p variants={item} className="mt-5 text-base leading-relaxed text-ivory/80 sm:text-lg">
            Tent and pandal arrangements, mandap and stage decoration, florals, lighting and sound — thoughtfully
            arranged for weddings and celebrations in Chaubepur, Kanpur.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="#services" size="lg">
              Explore Our Services
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
