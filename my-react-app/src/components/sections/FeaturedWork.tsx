import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { business } from "@/data/business";
import type { ImageKey } from "@/data/images";
import { photos } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/utils/cn";

interface Feature {
  imageKey: ImageKey;
  title: string;
  caption: string;
  /** Tailwind grid classes controlling the asymmetric layout from md upward. */
  span: string;
  position?: string;
}

/** Edit this list to change the editorial layout. Images come from src/data/images.ts. */
const features: Feature[] = [
  { imageKey: "mandapChandelier", title: "Mandap & Chandeliers", caption: "Layered drapes and florals under a warm glow", span: "md:col-span-7 md:row-span-2" },
  { imageKey: "tentRedOrange", title: "Canopy Receptions", caption: "Open-air seating in rich red and orange", span: "md:col-span-5" },
  { imageKey: "floralWhite", title: "Soft Floral Styling", caption: "White florals for a calm, elegant look", span: "md:col-span-5" },
  { imageKey: "entranceMarigold", title: "Welcome Archways", caption: "Marigold entrances that greet every guest", span: "md:col-span-4 md:row-span-2", position: "object-[center_30%]" },
  { imageKey: "lightsGarden", title: "Evening Lighting", caption: "Hanging lights that shape the mood after dark", span: "md:col-span-8 md:row-span-2" },
];

export function FeaturedWork() {

  return (
    <section id="work" className="bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="Styles We Create"
          description="A selection of setups that show the kind of tent, mandap, floral and lighting work we arrange."
        />

        <div className="mt-14 grid gap-4 md:auto-rows-[250px] md:grid-cols-12 md:gap-6">
          {features.map((f, i) => (
            <ImageReveal key={f.imageKey} delay={(i % 3) * 0.1} className={cn("h-72 md:h-auto", f.span)}>
              <figure className="group relative h-full overflow-hidden rounded-sm bg-champagne">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Photo name={f.imageKey} sizes="(min-width:768px) 55vw, 94vw" className={f.position} />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-maroon-950/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-ivory transition-transform duration-500 group-hover:-translate-y-1 sm:p-7">
                  <span className="mb-2 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                  <p className="font-serif text-2xl font-semibold sm:text-3xl">{f.title}</p>
                  <p className="mt-1 text-sm text-ivory/80">{f.caption}</p>
                </figcaption>
              </figure>
            </ImageReveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button href="#gallery" variant="outlineDark" size="lg">
            Browse the Gallery <ArrowRight size={18} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
