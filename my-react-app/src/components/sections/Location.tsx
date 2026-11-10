import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { business } from "@/data/business";
import { mapEmbedSrc, mapsDirectionsHref, mapsPlaceHref } from "@/lib/maps";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Location() {
  return (
    <section id="location" className="bg-champagne/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Find Us" title="Visit Us in Chaubepur" />
        <Reveal delay={0.1} className="mt-12 grid overflow-hidden rounded-sm border border-gold/30 bg-white shadow-[0_30px_60px_-35px_rgba(74,13,22,0.5)] lg:grid-cols-[3fr_2fr]">
          <div className="h-72 bg-sand sm:h-96 lg:h-auto lg:min-h-[420px]">
            <iframe
              title={`Map showing ${business.name}, ${business.address}`}
              src={mapEmbedSrc}
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-gold text-maroon-700">
              <MapPin size={22} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-serif text-3xl font-semibold text-maroon-800">{business.name}</h3>
            <address className="mt-2 text-lg not-italic leading-relaxed text-ink-soft">{business.address}</address>
            <p className="mt-1 text-sm text-ink-soft">Open daily · {business.openingHours}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={mapsDirectionsHref} external variant="maroon" className="w-full">
                <Navigation size={17} /> Get Directions
              </Button>
              <Button href={mapsPlaceHref} external variant="outlineDark" className="w-full">
                <ExternalLink size={17} /> Open in Maps
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
