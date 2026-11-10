import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { business } from "@/data/business";
import { mapsDirectionsHref } from "@/lib/maps";
import { generalEnquiryUrl, phoneHref } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/50 text-gold-light">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-gold-light">{label}</p>
        <div className="mt-1 text-[17px] text-ivory">{children}</div>
      </div>
    </li>
  );
}

export function Contact() {
  return (
    <section id="contact" className="bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Contact" title="Let’s Plan Your Celebration" description="Call, message us on WhatsApp, or send your event details — we will get back to you." />

        <div className="mt-14 grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10">
          <Reveal className="bg-damask rounded-sm bg-maroon-900 p-7 text-ivory shadow-[0_30px_60px_-35px_rgba(74,13,22,0.7)] sm:p-10">
            <h3 className="font-display text-2xl font-semibold tracking-wide text-gold-gradient">{business.name.toUpperCase()}</h3>
            <div className="mt-4 h-px w-16 bg-gold/70" />

            <ul className="mt-8 space-y-6">
              <InfoRow icon={<MapPin size={19} />} label="Address">
                {business.address}
              </InfoRow>
              <InfoRow icon={<Phone size={19} />} label="Phone">
                <a href={phoneHref} className="transition-colors hover:text-gold-light">
                  {business.phoneDisplay}
                </a>
              </InfoRow>
              <InfoRow icon={<MessageCircle size={19} />} label="WhatsApp">
                <a href={generalEnquiryUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-light">
                  {business.phoneDisplay}
                </a>
              </InfoRow>
              <InfoRow icon={<Clock size={19} />} label="Opening hours">
                {business.openingHours}
              </InfoRow>
            </ul>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Button href={phoneHref} variant="gold" className="w-full">
                <Phone size={18} /> Call Now
              </Button>
              <Button href={generalEnquiryUrl} external variant="whatsapp" className="w-full">
                <MessageCircle size={18} /> WhatsApp Us
              </Button>
              <Button href={mapsDirectionsHref} external variant="outline" className="w-full sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <Navigation size={18} /> Get Directions
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
