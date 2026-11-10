/**
 * CENTRAL IMAGE REGISTRY
 * ----------------------------------------------------------------------------
 * Every photograph on the site is referenced by a key from this file.
 * To replace a stock photo with a real Usman Tent House photograph:
 *   1. Drop the file in /public/images/ (e.g. /public/images/mandap-01.jpg)
 *   2. Change `source` to "local", set `localSrc`, and update width/height/alt.
 *   3. Set `isStock: false` so the "representative imagery" notes disappear.
 *
 * All current photographs are royalty-free stock images from Pexels
 * (https://www.pexels.com/license/). They are REPRESENTATIVE imagery only and
 * are NOT presented as actual Usman Tent House projects.
 */

export interface PhotoAsset {
  /** Pexels photo ID (used to build image URLs). Ignored for local images. */
  pexelsId: number;
  alt: string;
  width: number;
  height: number;
  author: string;
  authorUrl: string;
  /** True for stock photography — drives the "representative imagery" notices. */
  isStock: boolean;
  /** Optional local path under /public. When set, it overrides the Pexels URL. */
  localSrc?: string;
}

const pexels = (
  pexelsId: number,
  author: string,
  handle: string,
  width: number,
  height: number,
  alt: string
): PhotoAsset => ({
  pexelsId,
  alt,
  width,
  height,
  author,
  authorUrl: `https://www.pexels.com/@${handle}`,
  isStock: true,
});

export const photos = {
  mandapChandelier: pexels(34079355, "The Visionary Vows", "thevisionaryvows", 3648, 2432,
    "Floral wedding mandap with draped fabric and hanging chandeliers"),
  stageRedGold: pexels(12432503, "BANU FILM ADS", "banu-film-ads-2611460", 6720, 4480,
    "Indian wedding stage with gold and red armchairs and floral decoration"),
  stageGolden: pexels(14395559, "BANU FILM ADS", "banu-film-ads-2611460", 6720, 4480,
    "Wedding stage with golden columns and colourful flower garlands"),
  stageWhiteSofa: pexels(34389342, "Prince Nature", "prince-nature-273406283", 6284, 4189,
    "Wedding stage with a white sofa and vibrant floral arrangements"),
  stageOutdoor: pexels(33485972, "The Visionary Vows", "thevisionaryvows", 5760, 3840,
    "Outdoor wedding stage with floral arrangements and elegant seating"),
  stageChairs: pexels(33914531, "The Visionary Vows", "thevisionaryvows", 5472, 3648,
    "Wedding stage with ornate chairs and florals under warm lighting"),
  stageGreen: pexels(39204572, "Cưới Hỏi Hồng Biên", "c-i-h-i-h-ng-bien-2163802467", 5974, 3983,
    "Wedding ceremony stage with green and white drapes and floral decor"),
  tentRedOrange: pexels(37958066, "Jonathan Borba", "jonathanborba", 7986, 5327,
    "Outdoor wedding reception under a white canopy with red and orange decor"),
  tentOrange: pexels(37190289, "NUDE Nahum", "nudethephotographer", 6720, 4480,
    "Event tables with floral centrepieces inside a white and orange tent"),
  tentRed: pexels(11066743, "Daria Andrievskaya", "daria-andrievskaya-137434684", 2880, 1920,
    "Red chairs around served round tables under a tent"),
  tentEvening: pexels(37958130, "Jonathan Borba", "jonathanborba", 8192, 5461,
    "Evening event under a canopy with string lights and red tablecloths"),
  tentMarquee: pexels(29093819, "Ken Mwaura", "mwauraken", 6000, 4000,
    "Outdoor reception under a white marquee with draped chairs and centrepieces"),
  lightsGarden: pexels(10994594, "Tolga Aslantürk", "tolgaaslanturk", 5472, 3648,
    "Outdoor setting lit with hanging lights and floral decor"),
  lightsNight: pexels(30562607, "Angel Ayala", "angel-ayala-321556", 7008, 4672,
    "Night-time event tables under warm string lights"),
  lightsBokeh: pexels(12174406, "Alexey Demidov", "alexeydemidov", 5760, 3840,
    "Warm golden string lights glowing against a dark background"),
  floralWhite: pexels(32476128, "Andy Lee", "andy-lee-222330306", 6000, 4000,
    "Elegant white floral arrangement with wedding seating"),
  floralDecor: pexels(32476124, "Andy Lee", "andy-lee-222330306", 6000, 4000,
    "White floral wedding decoration setup"),
  floralColor: pexels(16935921, "Matheus Bertelli", "bertellifotografia", 6720, 4480,
    "Colourful floral arrangements used as an event centrepiece"),
  floralPeony: pexels(32476126, "Andy Lee", "andy-lee-222330306", 6000, 4000,
    "White peony centrepieces for wedding decoration"),
  entranceMarigold: pexels(33508474, "The Visionary Vows", "thevisionaryvows", 3840, 5760,
    "Ornate archway with marigold garlands at an Indian wedding venue"),
  entranceFloral: pexels(33485970, "The Visionary Vows", "thevisionaryvows", 5760, 3840,
    "Indian architectural entrance decorated with colourful flowers"),
  entranceLanterns: pexels(37705757, "Studio Dreamview", "studio-dreamview-2155988023", 3703, 5554,
    "Wedding venue frontage decorated with flowers and lanterns"),
  birthdayPink: pexels(11282245, "Vidal Balielo Jr.", "vidalbalielojrfotografia", 5472, 3648,
    "Pink themed celebration with floral arrangements and balloon arches"),
  soundStage: pexels(5152573, "Maor Attias", "maorattias", 5472, 3648,
    "Event stage with coloured lights and a DJ performing for a crowd"),
  seatingGold: pexels(32850675, "DΛVΞ GΛRCIΛ", "davegarcia", 6000, 4000,
    "Rows of ornate gold chairs arranged for a formal ceremony"),
  seatingTables: pexels(17001782, "Matheus Bertelli", "bertellifotografia", 6720, 4480,
    "Elegantly decorated tables and chairs for a reception"),
} satisfies Record<string, PhotoAsset>;

export type ImageKey = keyof typeof photos;

const PEXELS_BASE = "https://images.pexels.com/photos";

/** Build an optimised image URL at the requested width. */
export function imageUrl(key: ImageKey, width = 800): string {
  const photo: PhotoAsset = photos[key];
  if (photo.localSrc) return photo.localSrc;
  return `${PEXELS_BASE}/${photo.pexelsId}/pexels-photo-${photo.pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Build a responsive srcset for an image. */
export function imageSrcSet(key: ImageKey, widths: number[] = [480, 800, 1200, 1600]): string | undefined {
  const photo: PhotoAsset = photos[key];
  if (photo.localSrc) return undefined;
  return widths.map((w) => `${imageUrl(key, w)} ${w}w`).join(", ");
}
