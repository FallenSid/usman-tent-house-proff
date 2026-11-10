import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

/** Gold flourish used under headings, echoing the reference design. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold sm:w-20" />
      <svg width="22" height="12" viewBox="0 0 22 12" className="text-gold" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M11 1 L15 6 L11 11 L7 6 Z" fill="currentColor" />
        <circle cx="2.5" cy="6" r="1.6" />
        <circle cx="19.5" cy="6" r="1.6" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold sm:w-20" />
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "center", tone = "light", className }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-xs font-medium uppercase tracking-[0.28em]", dark ? "text-gold-light" : "text-gold-dark")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("font-serif text-4xl font-semibold leading-[1.08] sm:text-5xl", dark ? "text-ivory" : "text-maroon-800")}>
        {title}
      </h2>
      {align === "center" ? (
        <Ornament className="mt-5" />
      ) : (
        <div className="mt-5 h-px w-20 bg-gradient-to-r from-gold to-transparent" aria-hidden="true" />
      )}
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-ivory/75" : "text-ink-soft")}>{description}</p>
      )}
    </Reveal>
  );
}
