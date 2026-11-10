import { ExternalLink, FolderOpen, MessageCircle } from "lucide-react";
import { business } from "@/data/business";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/SectionHeading";

const photoRequestUrl = buildWhatsAppUrl(`Hello ${business.name}, could you please share photographs of your previous event work?`);

export function DriveCollection() {
  const configured = business.driveGalleryUrl.trim().length > 0;

  return (
    <section id="collection" className="bg-damask relative overflow-hidden bg-maroon-900 py-20 text-ivory sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-gold/50 text-gold-light">
          <FolderOpen size={28} strokeWidth={1.3} aria-hidden="true" />
        </span>
        <h2 className="font-serif text-4xl font-semibold sm:text-5xl">Explore Our Complete Collection</h2>
        <Ornament className="mt-5" />
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/80">
          Discover more of our event decorations, wedding arrangements and celebrations in our complete photo collection.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          {configured ? (
            <Button href={business.driveGalleryUrl} external size="lg" ariaLabel="View full gallery on Google Drive (opens in a new tab)">
              View Full Gallery <ExternalLink size={18} aria-hidden="true" />
            </Button>
          ) : (
            <div className="max-w-md rounded-sm border border-gold/40 bg-maroon-950/50 p-6" role="status">
              <p className="text-ivory/90">
                Our full photo collection is being prepared and will be available here soon.
              </p>
              <p className="mt-2 text-sm text-ivory/65">In the meantime, we are happy to share photographs on WhatsApp.</p>
              <Button href={photoRequestUrl} external variant="whatsapp" className="mt-5">
                <MessageCircle size={18} /> Request Photos on WhatsApp
              </Button>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
