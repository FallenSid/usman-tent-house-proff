import { cn } from "@/utils/cn";
import { business } from "@/data/business";

/** Text wordmark with a small pavilion crest. Replace with an <img> if a logo file is supplied. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [first, ...rest] = business.name.replace(/\s+tent house$/i, "").split(" ");
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg width="34" height="30" viewBox="0 0 34 30" fill="none" stroke="currentColor" strokeWidth="1.4" className="shrink-0 text-gold" aria-hidden="true">
        <path d="M17 2 V6" />
        <path d="M17 6 C14 12 8 15 2 17 H32 C26 15 20 12 17 6 Z" fill="currentColor" fillOpacity="0.18" />
        <path d="M5 17 V27 H29 V17" />
        <path d="M17 17 L11 27 M17 17 L23 27" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-semibold tracking-[0.12em] text-gold-gradient">
          {[first, ...rest].join(" ").toUpperCase()}
        </span>
        {!compact && <span className="mt-1.5 font-serif text-[0.8rem] font-semibold tracking-[0.34em] text-gold-light">TENT HOUSE</span>}
      </span>
    </span>
  );
}
