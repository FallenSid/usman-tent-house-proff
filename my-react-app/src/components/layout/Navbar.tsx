import { useState } from "react";
import { Menu, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { navLinks, sectionIds } from "@/data/content";
import { useActiveSection, useScrolled } from "@/lib/hooks";
import { generalEnquiryUrl, phoneHref } from "@/lib/whatsapp";
import { cn } from "@/utils/cn";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

/** Sections that aren't in the nav still highlight the closest nav item. */
const sectionToNav: Record<string, string> = {
  collection: "gallery",
  location: "contact",
};

export function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const section = useActiveSection(sectionIds);
  const active = sectionToNav[section] ?? section;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top info bar — collapses on scroll */}
        <div
          className={cn(
            "hidden overflow-hidden border-b bg-maroon-950 text-sm text-ivory/90 transition-all duration-500 lg:block",
            scrolled ? "max-h-0 border-transparent opacity-0" : "max-h-12 border-gold/20 opacity-100"
          )}
        >
          <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-8">
            <p className="flex items-center gap-2">
              <MapPin size={15} className="text-gold" /> {business.address}
            </p>
            <a href={phoneHref} className="flex items-center gap-2 transition-colors hover:text-gold-light">
              <Phone size={15} className="text-gold" /> {business.phoneDisplay}
            </a>
            <a
              href={generalEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-whatsapp px-4 py-1.5 font-medium text-white transition-colors hover:bg-whatsapp-dark"
            >
              <MessageCircle size={16} /> WhatsApp Enquiry
            </a>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={cn(
            "transition-all duration-500",
            scrolled || menuOpen
              ? "border-b border-gold/20 bg-maroon-950/95 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md"
              : "bg-gradient-to-b from-maroon-950/90 via-maroon-950/50 to-transparent"
          )}
        >
          <div
            className={cn(
              "mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8",
              scrolled ? "h-[68px]" : "h-[76px] lg:h-24"
            )}
          >
            <a href="#home" aria-label={`${business.name} — home`}>
              <Logo />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7 xl:gap-9">
                {navLinks.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group relative py-2 text-[15px] tracking-wide transition-colors",
                          isActive ? "text-gold-light" : "text-ivory/90 hover:text-gold-light"
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300",
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden lg:block">
              <Button href={generalEnquiryUrl} external variant="outline" size="sm">
                <MessageCircle size={16} /> Get a Quote
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={phoneHref}
                aria-label={`Call ${business.name}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold-light"
              >
                <Phone size={18} />
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold-light"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  );
}
