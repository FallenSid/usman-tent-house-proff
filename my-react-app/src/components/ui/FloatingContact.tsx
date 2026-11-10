import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X, Headset } from "lucide-react";
import { generalEnquiryUrl, phoneHref } from "@/lib/whatsapp";

const actions = [
  { id: "whatsapp", label: "WhatsApp us", href: generalEnquiryUrl, icon: MessageCircle, external: true, color: "bg-whatsapp text-white hover:bg-whatsapp-dark" },
  { id: "call", label: "Call now", href: phoneHref, icon: Phone, external: false, color: "bg-maroon-800 text-ivory hover:bg-maroon-700" },
] as const;

/** Compact quick-contact widget fixed to the bottom-right corner. */
export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open &&
          actions.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.a
                key={a.id}
                href={a.href}
                {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={a.label}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: (actions.length - 1 - i) * 0.05 } }}
                exit={{ opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3"
              >
                <span className="rounded-full bg-maroon-950/95 px-3.5 py-1.5 text-sm font-medium text-ivory shadow-lg">{a.label}</span>
                <span className={`grid h-12 w-12 place-items-center rounded-full shadow-lg transition-colors ${a.color}`}>
                  <Icon size={21} aria-hidden="true" />
                </span>
              </motion.a>
            );
          })}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close quick contact" : "Open quick contact"}
        whileTap={{ scale: 0.94 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-b from-gold-light to-gold text-maroon-950 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] ring-2 ring-maroon-950/10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -60, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 60, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {open ? <X size={24} /> : <Headset size={24} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
