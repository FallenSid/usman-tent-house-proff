import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { GalleryItem } from "@/types";
import { categoryLabels } from "@/data/gallery";
import { photos } from "@/data/images";
import { Photo } from "./Photo";

interface GalleryGridProps {
  items: GalleryItem[];
  onOpen: (index: number) => void;
}

/** Responsive masonry built with CSS columns — images keep their natural aspect ratio. */
export function GalleryGrid({ items, onOpen }: GalleryGridProps) {
  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
      {items.map((item, i) => {
        const photo = photos[item.imageKey];
        return (
          <motion.li
            key={item.id}
            className="break-inside-avoid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`Open image: ${item.title}`}
              className="group relative block w-full overflow-hidden rounded-sm bg-champagne text-left"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-105">
                <Photo name={item.imageKey} sizes="(min-width:1024px) 31vw, (min-width:640px) 48vw, 94vw" widths={[480, 800, 1200]} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <div>
                  <p className="font-serif text-xl leading-tight">{item.title}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-widest text-gold-light">
                    {item.categories.map((c) => categoryLabels[c]).join(" · ")}
                  </p>
                </div>
                <Maximize2 size={18} className="shrink-0 text-gold-light" aria-hidden="true" />
              </div>
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
