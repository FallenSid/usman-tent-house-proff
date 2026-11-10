import { Check, MapPin } from "lucide-react";
import { business, getYearsOfExperience } from "@/data/business";
import { aboutHighlights } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generalEnquiryUrl } from "@/lib/whatsapp";

export function About() {
  const years = getYearsOfExperience();

  return (
    <section id="about" className="bg-ivory py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Photographs */}
        <div className="relative mx-auto w-full max-w-xl pb-10 pr-8 sm:pr-12 lg:mx-0">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_30px_60px_-30px_rgba(74,13,22,0.6)]">
            <Photo name="stageOutdoor" sizes="(min-width:1024px) 40vw, 90vw" className="object-[40%_center]" />
          </ImageReveal>
          <ImageReveal delay={0.25} className="absolute -bottom-0 right-0 aspect-[4/3] w-[52%] overflow-hidden rounded-sm border-[6px] border-ivory shadow-xl">
            <Photo name="tentEvening" sizes="(min-width:1024px) 22vw, 50vw" />
          </ImageReveal>
          <div className="absolute -left-3 top-8 hidden rounded-sm border border-gold/60 bg-maroon-900 px-5 py-4 text-center text-ivory shadow-xl sm:block">
            {years ? (
              <>
                <p className="font-serif text-4xl font-semibold text-gold-light">{years}+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em]">Years of service</p>
              </>
            ) : (
              <>
                <MapPin className="mx-auto text-gold" size={22} />
                <p className="mt-2 text-xs uppercase tracking-[0.2em]">Chaubepur</p>
                <p className="text-xs uppercase tracking-[0.2em] text-gold-light">Kanpur</p>
              </>
            )}
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading eyebrow="About Us" title={`Welcome to ${business.name}`} align="left" />
          <Reveal delay={0.1} className="mt-7 space-y-5 text-[17px] leading-relaxed text-ink-soft">
            <p>
              {business.name} is a tent house and event decoration business based in Chaubepur, Kanpur, Uttar Pradesh.
              We help families set up weddings, receptions, birthdays and private celebrations — from tents and pandals
              to mandaps, stages, florals, lighting, seating and sound.
            </p>
            {years ? (
              <p>
                With more than {years} years of experience behind us
                {business.establishedYear ? `, serving customers since ${business.establishedYear}` : ""}, we understand
                what it takes to make a celebration run smoothly.
              </p>
            ) : (
              <p>
                We are an established name in our neighbourhood, and we bring practical, hands-on experience to every
                event we arrange.
              </p>
            )}
            <p className="border-l-2 border-gold pl-5 font-serif text-2xl italic leading-snug text-maroon-800">
              “Every celebration is personal. We listen first, plan carefully, and set up with care — so you can simply
              enjoy the occasion.”
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {aboutHighlights.map((text) => (
                <li key={text} className="flex items-start gap-3 text-[15px] text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-dark">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={generalEnquiryUrl} external variant="maroon">
                Talk to Us on WhatsApp
              </Button>
              <Button href="#services" variant="outlineDark">
                View Services
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
