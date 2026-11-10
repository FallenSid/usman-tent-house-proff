import { business, getYearsOfExperience } from "@/data/business";
import { galleryFilters } from "@/data/gallery";
import { services } from "@/data/services";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

/**
 * Only verified figures are shown. Values that are `null` in
 * src/data/business.ts are skipped automatically.
 */
function buildStats(): Stat[] {
  const years = getYearsOfExperience();
  const { eventsCompleted, customerSatisfactionPercent } = business.verifiedStats;
  const stats: (Stat | null)[] = [
    years ? { value: years, suffix: "+", label: "Years of experience" } : null,
    eventsCompleted ? { value: eventsCompleted, suffix: "+", label: "Events completed" } : null,
    customerSatisfactionPercent ? { value: customerSatisfactionPercent, suffix: "%", label: "Customer satisfaction" } : null,
    { value: services.length, label: "Services offered" },
    { value: galleryFilters.length - 1, label: "Event styles in our gallery" },
    { value: 3, label: "Easy ways to reach us" },
  ];
  return stats.filter((s): s is Stat => s !== null);
}

export function Statistics() {
  const stats = buildStats();
  // Keep the row balanced: 3 columns for 3/6 items, 4 columns otherwise.
  const cols = stats.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section aria-label="Our numbers" className="bg-damask relative overflow-hidden bg-maroon-950 py-16 text-ivory sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <dl className={`grid grid-cols-2 gap-y-10 ${cols}`}>
            {stats.map((s, i) => (
              <div key={s.label} className={`px-4 text-center ${i > 0 ? "lg:border-l lg:border-gold/25" : ""}`}>
                <dd className="font-serif text-5xl font-semibold text-gold-gradient sm:text-6xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-2 text-sm uppercase tracking-[0.18em] text-ivory/70">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
