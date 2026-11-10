import { highlights } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

/** Four-up service strip sitting directly under the hero. */
export function Highlights() {
  return (
    <section aria-label="Service highlights" className="border-b border-gold/20 bg-ivory">
      <Reveal>
        <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, subtitle }, i) => (
            <li
              key={title}
              className={`flex items-center gap-4 px-5 py-6 sm:px-8 lg:justify-center lg:py-8 ${
                i % 2 === 1 ? "border-l border-gold/25" : ""
              } ${i > 1 ? "border-t border-gold/25 lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-gold/25" : ""}`}
            >
              <Icon size={34} strokeWidth={1.2} className="shrink-0 text-gold-dark" aria-hidden="true" />
              <div>
                <p className="font-medium leading-tight text-maroon-800">{title}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{subtitle}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
