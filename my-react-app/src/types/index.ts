import type { LucideIcon } from "lucide-react";
import type { ImageKey } from "@/data/images";

export interface BusinessConfig {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  /** International format, digits only, no "+" — used for wa.me links. */
  whatsapp: string;
  email: string;
  address: string;
  addressParts: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  openingHours: string;
  /** Leave "" to auto-generate an embed from the address. */
  mapEmbedUrl: string;
  /** Leave "" to auto-generate a directions link from the address. */
  mapsDirectionsUrl: string;
  /** Leave "" to auto-generate a "view place" link from the address. */
  mapsPlaceUrl: string;
  /** Public Google Drive folder (Anyone with the link → Viewer). */
  driveGalleryUrl: string;
  /** Unverified. Leave null until the owner confirms. */
  establishedYear: number | null;
  /** Only fill in once verified with the owner. */
  verifiedStats: {
    yearsOfExperience: number | null;
    eventsCompleted: number | null;
    customerSatisfactionPercent: number | null;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  imageKey: ImageKey;
  icon: LucideIcon;
}

export type GalleryCategory = "wedding" | "stage" | "mandap" | "tent" | "floral" | "lighting";
export type GalleryFilter = GalleryCategory | "all";

export interface GalleryItem {
  id: string;
  imageKey: ImageKey;
  title: string;
  categories: GalleryCategory[];
}

export interface Testimonial {
  id: string;
  name: string;
  event?: string;
  review: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface EnquiryValues {
  name: string;
  mobile: string;
  eventType: string;
  eventDate: string;
  guests: string;
  budget: string;
  message: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;
