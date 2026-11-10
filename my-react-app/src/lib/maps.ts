import { business } from "@/data/business";

const query = encodeURIComponent(business.address);

/** Configured embed URL, or an address-search embed (no invented coordinates). */
export const mapEmbedSrc = business.mapEmbedUrl || `https://www.google.com/maps?q=${query}&output=embed`;

export const mapsPlaceHref = business.mapsPlaceUrl || `https://www.google.com/maps/search/?api=1&query=${query}`;

export const mapsDirectionsHref =
  business.mapsDirectionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${query}`;
