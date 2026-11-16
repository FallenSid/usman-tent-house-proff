import { MapPin, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon as Facebook, InstagramIcon as Instagram, YoutubeIcon as Youtube } from "@/components/ui/SocialIcons";
import { business } from "@/data/business";
import { navLinks } from "@/data/content";
import { services } from "@/data/services";
import { generalEnquiryUrl, phoneHref } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";

const social = [
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "youtube", label: "YouTube", icon: Youtube },
] as const;

const linkClass = "text-ivory/70 transition-colors hover:text-gold-light";

export function Footer() {
  const socials = social.filter((s) => business.socialLinks[s.key]);
  return (
    <footer className="bg-damask relative bg-maroon-950 text-ivory">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ivory/70">{business.description}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={business.socialLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-light transition-colors hover:bg-gold hover:text-maroon-950"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer quick links">
          <h3 className="font-serif text-2xl text-gold-light">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-[15px]">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className={linkClass}>
                FAQ
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h3 className="font-serif text-2xl text-gold-light">Our Services</h3>
          <ul className="mt-5 space-y-3 text-[15px]">
            {services.slice(0, 7).map((s) => (
              <li key={s.id}>
                <a href="#services" className={linkClass}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-serif text-2xl text-gold-light">Get in Touch</h3>
          <ul className="mt-5 space-y-4 text-[15px] text-ivory/80">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" /> {business.address}
            </li>
            <li>
              <a href={phoneHref} className="flex gap-3 transition-colors hover:text-gold-light">
                <Phone size={18} className="mt-0.5 shrink-0 text-gold" /> {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={generalEnquiryUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition-colors hover:text-gold-light">
                <MessageCircle size={18} className="mt-0.5 shrink-0 text-gold" /> Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 pb-24 text-sm text-ivory/55 sm:px-8 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          {/* <p>
            Photographs are representative stock images courtesy of{" "}
            <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-4 hover:text-gold-light">
              Pexels
            </a>{" "}
            contributors.
          </p> */}
        </div>
      </div>
    </footer>
  );
}
