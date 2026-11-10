import type { GalleryCategory, GalleryFilter, GalleryItem } from "@/types";

export const galleryFilters: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding" },
  { id: "stage", label: "Stage" },
  { id: "mandap", label: "Mandap" },
  { id: "tent", label: "Tent" },
  { id: "floral", label: "Floral" },
  { id: "lighting", label: "Lighting" },
];

export const categoryLabels: Record<GalleryCategory, string> = {
  wedding: "Wedding",
  stage: "Stage",
  mandap: "Mandap",
  tent: "Tent",
  floral: "Floral",
  lighting: "Lighting",
};

/**
 * Gallery items reference photographs from src/data/images.ts.
 * Add, remove or re-categorise items here — no component changes needed.
 */
export const galleryItems: GalleryItem[] = [
  { id: "g01", imageKey: "mandapChandelier", title: "Floral mandap with chandeliers", categories: ["wedding", "mandap", "floral"] },
  { id: "g02", imageKey: "tentRedOrange", title: "Canopy reception setup", categories: ["tent", "wedding"] },
  { id: "g03", imageKey: "entranceMarigold", title: "Marigold entrance archway", categories: ["wedding", "floral"] },
  { id: "g04", imageKey: "stageRedGold", title: "Gold and red stage seating", categories: ["stage", "wedding", "mandap"] },
  { id: "g05", imageKey: "floralWhite", title: "White floral arrangements", categories: ["floral", "wedding"] },
  { id: "g06", imageKey: "lightsGarden", title: "Hanging lights and florals", categories: ["lighting"] },
  { id: "g07", imageKey: "stageGolden", title: "Golden columns with garlands", categories: ["stage", "mandap", "wedding"] },
  { id: "g08", imageKey: "tentOrange", title: "Tent with floral centrepieces", categories: ["tent"] },
  { id: "g09", imageKey: "stageWhiteSofa", title: "White sofa stage", categories: ["stage", "wedding", "floral"] },
  { id: "g10", imageKey: "lightsNight", title: "Evening under string lights", categories: ["lighting", "tent"] },
  { id: "g11", imageKey: "floralColor", title: "Colourful floral centrepiece", categories: ["floral"] },
  { id: "g12", imageKey: "entranceLanterns", title: "Venue frontage with lanterns", categories: ["wedding", "lighting"] },
  { id: "g13", imageKey: "stageOutdoor", title: "Outdoor wedding stage", categories: ["stage", "wedding"] },
  { id: "g14", imageKey: "tentEvening", title: "Canopy dining at dusk", categories: ["tent", "lighting"] },
  { id: "g15", imageKey: "floralDecor", title: "Floral decoration setup", categories: ["floral"] },
  { id: "g16", imageKey: "stageChairs", title: "Ornate chairs on stage", categories: ["stage", "wedding"] },
  { id: "g17", imageKey: "tentMarquee", title: "Marquee reception tables", categories: ["tent", "wedding"] },
  { id: "g18", imageKey: "lightsBokeh", title: "Warm golden lights", categories: ["lighting"] },
  { id: "g19", imageKey: "floralPeony", title: "Peony centrepieces", categories: ["floral"] },
  { id: "g20", imageKey: "tentRed", title: "Red chairs under a tent", categories: ["tent", "wedding"] },
  { id: "g21", imageKey: "entranceFloral", title: "Floral entrance", categories: ["wedding", "floral"] },
  { id: "g22", imageKey: "stageGreen", title: "Green and white drapes", categories: ["stage", "floral"] },
];
