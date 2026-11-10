import type { BusinessConfig } from "@/types";

/**
 * CENTRAL BUSINESS CONFIGURATION
 * ----------------------------------------------------------------------------
 * Edit this one file to update contact details across the whole website.
 * Nothing in the UI hardcodes phone numbers, addresses or links.
 */
export const business: BusinessConfig = {
  name: "Usman Tent House",
  tagline: "Creating Moments That Last Forever.",
  description:
    "Tent, mandap, stage and floral decoration with lighting, seating and sound for weddings and celebrations in Chaubepur, Kanpur.",

  // ── Contact ────────────────────────────────────────────────────────────────
  phone: "+919648351536", // used for tel: links
  phoneDisplay: "+91 96483 51536", // shown to visitors
  whatsapp: "919648351536", // used for https://wa.me/<number>
  email: "", // optional — hidden when empty

  // ── Location ───────────────────────────────────────────────────────────────
  address: "Chaubepur, Kanpur, Uttar Pradesh 209203",
  addressParts: {
    street: "Chaubepur",
    locality: "Kanpur",
    region: "Uttar Pradesh",
    postalCode: "209203",
    country: "IN",
  },
  // Please confirm with the owner before launch.
  openingHours: "9:00 AM – 9:00 PM",

  // ── Maps ───────────────────────────────────────────────────────────────────
  // Paste the "src" URL from Google Maps → Share → Embed a map to pin the exact
  // shop. Leave empty to search by the address above (no coordinates invented).
  mapEmbedUrl: "",
  mapsDirectionsUrl: "",
  mapsPlaceUrl: "",

  // ── Photo collection ───────────────────────────────────────────────────────
  // Public Google Drive folder, e.g. "https://drive.google.com/drive/folders/XXXX".
  // Set sharing to "Anyone with the link → Viewer" (only if the owner approves).
  driveGalleryUrl: "",

  // ── Verified facts ─────────────────────────────────────────────────────────
  // 1984 / "36 years" appear in a directory listing and are UNVERIFIED, so they
  // are intentionally left empty. Fill in once the owner confirms; the About
  // and Statistics sections will update automatically.
  establishedYear: null,
  verifiedStats: {
    yearsOfExperience: null,
    eventsCompleted: null,
    customerSatisfactionPercent: null,
  },

  socialLinks: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
};

/** Years of experience derived from verified data (or null when unknown). */
export function getYearsOfExperience(): number | null {
  if (business.establishedYear) return new Date().getFullYear() - business.establishedYear;
  return business.verifiedStats.yearsOfExperience;
}
