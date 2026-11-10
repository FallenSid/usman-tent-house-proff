import { useEffect } from "react";
import { business } from "@/data/business";

/**
 * Injects LocalBusiness JSON-LD generated from src/data/business.ts so that the
 * structured data always matches the visible contact details.
 * Only verified fields are included (no coordinates, ratings or hours are invented).
 */
export function StructuredData() {
  useEffect(() => {
    const data: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: business.name,
      description: business.description,
      telephone: business.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.addressParts.street,
        addressLocality: business.addressParts.locality,
        addressRegion: business.addressParts.region,
        postalCode: business.addressParts.postalCode,
        addressCountry: business.addressParts.country,
      },
    };
    if (business.email) data.email = business.email;
    const sameAs = Object.values(business.socialLinks).filter(Boolean);
    if (sameAs.length) data.sameAs = sameAs;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
  return null;
}
