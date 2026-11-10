import { useCallback, useMemo, useState } from "react";
import { galleryFilters, galleryItems } from "@/data/gallery";
import type { GalleryFilter } from "@/types";
import { photos } from "@/data/images";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/utils/cn";

export function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "all" ? galleryItems : galleryItems.filter((i) => i.categories.includes(filter))),
    [filter]
  );
  const close = useCallback(() => setActive(null), []);
  const hasStock = galleryItems.some((i) => photos[i.imageKey].isStock);

  return (
    <section id="gallery" className="bg-champagne/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Event Gallery"
          description="Filter by style and tap any photograph to view it full size."
        />

        <Reveal delay={0.1} className="mt-10">
          <div role="group" aria-label="Filter gallery by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
            {galleryFilters.map((f) => {
              const selected = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "shrink-0 rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                    selected
                      ? "border-maroon-800 bg-maroon-800 text-ivory"
                      : "border-gold/50 bg-ivory text-maroon-800 hover:border-maroon-700"
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10" aria-live="polite">
          <GalleryGrid key={filter} items={items} onOpen={setActive} />
          {items.length === 0 && <p className="py-16 text-center text-ink-soft">No photographs in this category yet.</p>}
        </div>

        {hasStock && (
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-soft">
            Images shown are representative stock photographs (courtesy of Pexels contributors) used to illustrate each
            style. They are not presented as actual Usman Tent House events.
          </p>
        )}
      </div>

      <Lightbox items={items} index={active} onClose={close} onNavigate={setActive} />
    </section>
  );
}
