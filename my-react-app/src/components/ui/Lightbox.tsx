import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types";
import { categoryLabels } from "@/data/gallery";
import { imageSrcSet, imageUrl, photos } from "@/data/images";
import { useLockBodyScroll } from "@/lib/hooks";

interface LightboxProps {
  items: GalleryItem[];
  /** Index into `items`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useLockBodyScroll(open);

  const count = items.length;
  const go = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return;
      onNavigate((index + delta + count) % count);
    },
    [index, count, onNavigate]
  );

  // Keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // Keep focus inside the dialog controls
        const focusable = document.querySelectorAll<HTMLElement>("[data-lightbox-control]");
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Focus management
  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    } else {
      returnFocus.current?.focus?.();
    }
  }, [open]);

  // Preload neighbours
  useEffect(() => {
    if (index === null || count < 2) return;
    [1, -1].forEach((d) => {
      const n = items[(index + d + count) % count];
      const img = new Image();
      img.src = imageUrl(n.imageKey, 1600);
    });
  }, [index, items, count]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
  };

  const item = index !== null ? items[index] : null;
  const photo = item ? photos[item.imageKey] : null;

  return (
    <AnimatePresence>
      {open && item && photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${item.title}`}
          className="fixed inset-0 z-[90] flex flex-col bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-4 py-3 text-ivory sm:px-6">
            <p className="text-sm tracking-widest text-ivory/70" aria-live="polite">
              {(index ?? 0) + 1} / {count}
            </p>
            <button
              ref={closeRef}
              data-lightbox-control
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10"
            >
              <X size={22} />
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={onClose}>
            <motion.div
              key={item.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-full touch-pan-y items-center justify-center"
            >
              <img
                src={imageUrl(item.imageKey, 1600)}
                srcSet={imageSrcSet(item.imageKey, [800, 1200, 1600, 2000])}
                sizes="100vw"
                alt={photo.alt}
                draggable={false}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full select-none rounded-sm object-contain shadow-2xl"
              />
            </motion.div>

            {count > 1 && (
              <>
                <button
                  data-lightbox-control
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/40 text-ivory transition-colors hover:bg-white/15 sm:left-4 sm:grid"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  data-lightbox-control
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/40 text-ivory transition-colors hover:bg-white/15 sm:right-4 sm:grid"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Caption + mobile controls */}
          <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-4 text-ivory sm:px-6">
            <button
              data-lightbox-control
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 sm:hidden"
            >
              <ChevronLeft size={22} />
            </button>
            <div className="min-w-0 flex-1 text-center">
              <p className="truncate font-serif text-xl">{item.title}</p>
              <p className="mt-0.5 text-xs text-ivory/60">
                {item.categories.map((c) => categoryLabels[c]).join(" · ")}
                {photo.isStock && (
                  <>
                    {" "}
                    · Representative photo by{" "}
                    <a
                      data-lightbox-control
                      href={photo.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-gold-light"
                    >
                      {photo.author}
                    </a>{" "}
                    / Pexels
                  </>
                )}
              </p>
            </div>
            <button
              data-lightbox-control
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 sm:hidden"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
