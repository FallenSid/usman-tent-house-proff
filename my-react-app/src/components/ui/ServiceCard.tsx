import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { serviceEnquiryUrl } from "@/lib/whatsapp";
import { Photo } from "./Photo";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-md border border-gold/25 bg-white shadow-[0_12px_30px_-22px_rgba(74,13,22,0.5)] transition-shadow duration-500 hover:shadow-[0_28px_50px_-24px_rgba(74,13,22,0.55)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-champagne">
        <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]">
          <Photo name={service.imageKey} sizes="(min-width:1280px) 22vw, (min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/50 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full border border-gold/60 bg-maroon-950/80 text-gold-light backdrop-blur">
          <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-serif text-2xl font-semibold leading-tight text-maroon-800">{service.title}</h3>
        <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-soft">{service.description}</p>
        <a
          href={serviceEnquiryUrl(service.title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${service.title} on WhatsApp`}
          className="mt-5 inline-flex items-center gap-1.5 self-start border-b border-gold pb-0.5 text-sm font-medium tracking-wide text-maroon-700 transition-colors hover:text-gold-dark"
        >
          Enquire now
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.article>
  );
}
