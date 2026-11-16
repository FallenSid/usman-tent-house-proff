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
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.870718846886!2d80.18937437542948!3d26.620590376822435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c31196d9d8c91%3A0x90763d4833b1fe61!2sUSMAN%20TENT%20HOUSE!5e0!3m2!1sen!2sin!4v1794848150168!5m2!1sen!2sin",
  mapsDirectionsUrl: "https://www.google.com/maps/dir//USMAN+TENT+HOUSE,+Chaubepur,+Chaubepur+-+Bithoor+Rd,+Uttar+Pradesh+209203/@26.6206288,80.1919654,18z/data=!4m17!1m7!3m6!1s0x399c31196d9d8c91:0x90763d4833b1fe61!2sUSMAN+TENT+HOUSE!8m2!3d26.6205904!4d80.1919493!16s%2Fg%2F11ll6ndvn2!4m8!1m0!1m5!1m1!1s0x399c31196d9d8c91:0x90763d4833b1fe61!2m2!1d80.1919518!2d26.6205881!3e9?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  mapsPlaceUrl: "https://www.google.com/maps/place/USMAN+TENT+HOUSE/@26.6205904,80.1919493,17z/data=!3m1!4b1!4m6!3m5!1s0x399c31196d9d8c91:0x90763d4833b1fe61!8m2!3d26.6205904!4d80.1919493!16s%2Fg%2F11ll6ndvn2?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",

  
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
