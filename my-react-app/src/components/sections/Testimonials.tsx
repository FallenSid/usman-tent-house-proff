import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { feedbackUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/utils/cn";

function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const current = testimonials[index];

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [count, paused]);

  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <div
      className="relative mx-auto mt-14 max-w-3xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="min-h-[18rem] rounded-sm border border-gold/30 bg-white px-6 py-12 text-center shadow-[0_24px_50px_-30px_rgba(74,13,22,0.5)] sm:px-14">
        <Quote className="mx-auto text-gold" size={36} strokeWidth={1.2} aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            aria-live="polite"
          >
            {current.rating && (
              <div className="mt-5 flex justify-center gap-1" role="img" aria-label={`${current.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className={i < (current.rating ?? 0) ? "fill-gold text-gold" : "text-gold/30"} />
                ))}
              </div>
            )}
            <blockquote className="mt-5 font-serif text-2xl italic leading-relaxed text-maroon-800 sm:text-[1.7rem]">
              “{current.review}”
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-medium text-ink">{current.name}</p>
              {current.event && <p className="text-sm text-ink-soft">{current.event}</p>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-maroon-700 text-maroon-700 transition-colors hover:bg-maroon-700 hover:text-ivory">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn("h-2 rounded-full transition-all duration-300", i === index ? "w-8 bg-gold" : "w-2 bg-gold/40")}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-maroon-700 text-maroon-700 transition-colors hover:bg-maroon-700 hover:text-ivory">
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

function Placeholder() {
  return (
    <Reveal className="mx-auto mt-14 max-w-2xl rounded-sm border border-dashed border-gold/60 bg-white/60 px-6 py-12 text-center sm:px-12">
      <Quote className="mx-auto text-gold" size={34} strokeWidth={1.2} aria-hidden="true" />
      <p className="mt-5 font-serif text-3xl text-maroon-800">Customer reviews coming soon</p>
      <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
        We only publish genuine feedback from our customers. If you have celebrated with us, we would love to hear how it went.
      </p>
      <Button href={feedbackUrl} external variant="whatsapp" className="mt-7">
        <MessageCircle size={18} /> Share Your Feedback
      </Button>
    </Reveal>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Testimonials" title="Words From Our Customers" />
        {testimonials.length > 0 ? <Carousel /> : <Placeholder />}
      </div>
    </section>
  );
}
