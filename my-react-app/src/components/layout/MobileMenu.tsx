import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, MessageCircle, Phone, X } from "lucide-react";
import { business } from "@/data/business";
import { navLinks } from "@/data/content";
import { generalEnquiryUrl, phoneHref } from "@/lib/whatsapp";
import { useLockBodyScroll } from "@/lib/hooks";
import { cn } from "@/utils/cn";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  active: string;
}

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="bg-damask absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto border-l border-gold/30 bg-maroon-950 px-6 pb-8 pt-5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <Logo compact />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold-light"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="mt-10 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                  className="border-b border-gold/15"
                >
                  <a
                    href={`#${link.id}`}
                    onClick={onClose}
                    aria-current={active === link.id ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 font-serif text-3xl",
                      active === link.id ? "text-gold-light" : "text-ivory"
                    )}
                  >
                    {link.label}
                    {active === link.id && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto space-y-3 pt-10">
              <Button href={generalEnquiryUrl} external variant="whatsapp" className="w-full" onClick={onClose}>
                <MessageCircle size={18} /> WhatsApp Enquiry
              </Button>
              <Button href={phoneHref} variant="outline" className="w-full">
                <Phone size={18} /> Call {business.phoneDisplay}
              </Button>
              <p className="flex items-center justify-center gap-2 pt-3 text-sm text-ivory/60">
                <MapPin size={14} className="text-gold" /> {business.address}
              </p>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
