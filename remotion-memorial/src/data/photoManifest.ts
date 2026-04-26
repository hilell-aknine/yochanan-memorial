// Photo manifest — single source of truth for which photos appear in each
// scene and in what order. Hillel is classifying photos in parallel; once a
// new file lands in one of these folders, just add its filename to the
// matching array below and the scene will redistribute time automatically.
//
// Rule (from the brief): a photo from "03-יוחנן-עם-הילדים" never leaks into
// the struggle scene. Categories drive scenes; we don't mix.
//
// Distribution strategy for 01-portraits (16 photos, used by scenes 1, 4, 5, 6):
//   - Scene 1 (opening, 80s):     8 portraits — wide chronological mix
//   - Scene 4 (struggle, 150s):   5 portraits — quieter / WA0416 high-range
//   - Scene 5 (legacy, last 30s): 2 portraits — most recent (WA0405)
//   - Scene 6 (hero, 56s):        1 portrait  — strongest standalone shot

export type PhotoEntry = {
  /** Path under the project root (publicDir is set to "../" in remotion.config). */
  src: string;
  /** Optional on-screen Hebrew text for scene 2. */
  text?: string;
  /** Optional override of automatic per-photo duration (seconds). */
  durationSec?: number;
};

const dir = {
  alone: "תמונות/01-יוחנן-לבד-ופורטרטים",
  naama: "תמונות/02-יוחנן-ונעמה",
  kids: "תמונות/03-יוחנן-עם-הילדים",
  family: "תמונות/04-משפחה-רחבה",
  service: "תמונות/05-שירות-ומילואים",
  friends: "תמונות/06-חברים-ואחים-לנשק",
  childhood: "תמונות/07-ילדות-ונערות",
  events: "תמונות/08-אירועים-וטקסים",
} as const;

// ─────────────────────────────────────────────────────────────────────────
// SCENE 1 · 0:00–1:20 · Opening (80s, 4s black + 76s photos ≈ 9.5s/photo)
// 8 portraits introducing him.
// ─────────────────────────────────────────────────────────────────────────
export const scene1Photos: PhotoEntry[] = [
  { src: `${dir.alone}/FB_IMG_1775402804849.jpg` },
  { src: `${dir.alone}/IMG-20220224-WA0025.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0053.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0073.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0077.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0084.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0094.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0095.jpg` },
];

// ─────────────────────────────────────────────────────────────────────────
// SCENE 2 · 1:20–4:00 (160s) · Who he was
// Order: childhood → service → friends → events.
// 48 photos at ~3.3s each — matches the "3–4s per photo" pacing in the brief.
// ─────────────────────────────────────────────────────────────────────────
export const scene2Childhood: PhotoEntry[] = [
  // TODO: 07-ילדות-ונערות/ is still empty.
];

export const scene2Service: PhotoEntry[] = [
  { src: `${dir.service}/IMG-20231012-WA0046.jpg` },
  { src: `${dir.service}/20240530_191229.jpg` },
  { src: `${dir.service}/IMG-20241029-WA0040.jpg` },
  { src: `${dir.service}/IMG-20241029-WA0094.jpg` },
  { src: `${dir.service}/IMG-20260405-WA0004.jpg` },
  { src: `${dir.service}/IMG-20260405-WA0090.jpg` },
  { src: `${dir.service}/IMG-20260416-WA0082.jpg` },
  { src: `${dir.service}/IMG-20260416-WA0125.jpg` },
  { src: `${dir.service}/IMG-20260416-WA0157.jpg` },
  { src: `${dir.service}/20260421_122743.jpg` },
];

export const scene2Friends: PhotoEntry[] = [
  { src: `${dir.friends}/IMG-20190125-WA0002.jpg`, text: "תמיד ראשון לעזור" },
  { src: `${dir.friends}/IMG-20190219-WA0013.jpg` },
  { src: `${dir.friends}/IMG-20190617-WA0047.jpg`, text: "תמיד מצחיק" },
  { src: `${dir.friends}/IMG-20190620-WA0009.jpg` },
  { src: `${dir.friends}/20190825_231907.jpg` },
  { src: `${dir.friends}/IMG-20191122-WA0019.jpg`, text: "תמיד נותן" },
  { src: `${dir.friends}/IMG-20200306-WA0004.jpg` },
  { src: `${dir.friends}/IMG-20200310-WA0005.jpg` },
  { src: `${dir.friends}/IMG-20200505-WA0013.jpg`, text: "לב ענק" },
  { src: `${dir.friends}/IMG-20201121-WA0009.jpg` },
  { src: `${dir.friends}/IMG-20210516-WA0009.jpg` },
  { src: `${dir.friends}/IMG-20220225-WA0002.jpg` },
  { src: `${dir.friends}/IMG-20220701-WA0007.jpg`, text: "אי אפשר היה לא לאהוב אותו" },
  { src: `${dir.friends}/IMG-20230128-WA0002.jpg` },
  { src: `${dir.friends}/IMG-20230707-WA0020.jpg` },
  { src: `${dir.friends}/IMG-20240423-WA0001.jpg` },
  { src: `${dir.friends}/IMG-20260415-WA0062.jpg` },
  { src: `${dir.friends}/IMG-20260416-WA0052.jpg` },
  { src: `${dir.friends}/IMG-20260416-WA0054.jpg` },
  { src: `${dir.friends}/IMG-20260416-WA0072.jpg` },
  { src: `${dir.friends}/IMG-20260416-WA0108.jpg` },
  { src: `${dir.friends}/IMG-20260416-WA0109.jpg` },
  { src: `${dir.friends}/IMG-20260416-WA0110.jpg` },
  { src: `${dir.friends}/IMG-20260416-WA0113.jpg` },
  { src: `${dir.friends}/IMG-20260416-WA0134.jpg` },
  { src: `${dir.friends}/6C11A5FB-44F5-424C-AEA4-3C6D037FA8AE.jpg` },
  { src: `${dir.friends}/20260421_124133.jpg` },
];

export const scene2Events: PhotoEntry[] = [
  { src: `${dir.events}/IMG-20180301-WA0019.jpg` },
  { src: `${dir.events}/IMG-20200306-WA0017.jpg` },
  { src: `${dir.events}/IMG-20260416-WA0128.jpg` },
  { src: `${dir.events}/20260421_124001.jpg` },
  { src: `${dir.events}/20260421_125000.jpg` },
];

// ─────────────────────────────────────────────────────────────────────────
// SCENE 3 · 4:00–7:00 (180s) · The family man
// Photo balance: 5 kids · 2 Naama · 9 extended family.
// Weights tuned to give roughly 14s/kid · 18s/Naama · 8s/extended.
// ─────────────────────────────────────────────────────────────────────────
export const scene3Kids: PhotoEntry[] = [
  { src: `${dir.kids}/IMG-20170822-WA0029.jpg` },
  { src: `${dir.kids}/IMG-20190510-WA0023.jpg` },
  { src: `${dir.kids}/20190827_120148.jpg` },
  { src: `${dir.kids}/IMG-20260416-WA0041.jpg` },
  { src: `${dir.kids}/IMG-20260416-WA0042.jpg` },
  { src: `${dir.kids}/beach-cheers.jpg` },
  { src: `${dir.kids}/picnic-friends.jpg` },
];

export const scene3Naama: PhotoEntry[] = [
  { src: `${dir.naama}/IMG-20170806-WA0013.jpg` },
  { src: `${dir.naama}/IMG-20260416-WA0105.jpg` },
  { src: `${dir.naama}/family-flowers.jpg` },
  { src: `${dir.naama}/family-cafe.jpg` },
  { src: `${dir.naama}/family-cinema.jpg` },
  { src: `${dir.naama}/family-forest-1.jpg` },
  { src: `${dir.naama}/family-forest-2.jpg` },
  { src: `${dir.naama}/family-birthday.jpg` },
  { src: `${dir.naama}/family-white-shabbat.jpg` },
];

export const scene3Extended: PhotoEntry[] = [
  { src: `${dir.family}/IMG-20190318-WA0027.jpg` },
  { src: `${dir.family}/IMG-20250717-WA0095.jpg` },
  { src: `${dir.family}/IMG-20250717-WA0101.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0057.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0058.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0059.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0064.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0065.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0067.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0078.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0083.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0086.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0089.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0099.jpg` },
  { src: `${dir.family}/IMG-20260416-WA0121.jpg` },
];

// ─────────────────────────────────────────────────────────────────────────
// SCENE 4 · 7:00–9:30 (150s) · The struggle
// 5 distinct portraits, ~30s each — slow contemplative pacing.
// TODO(B-roll): sunset/landscape footage missing.
// ─────────────────────────────────────────────────────────────────────────
export const scene4Struggle: PhotoEntry[] = [
  { src: `${dir.alone}/IMG-20260416-WA0101.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0102.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0122.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0124.jpg` },
  { src: `${dir.alone}/IMG-20260416-WA0135.jpg` },
];

// ─────────────────────────────────────────────────────────────────────────
// SCENE 5 · What he left behind
// 7 kids photos + 2 final smiles (most recent, April 5 2026 — ~1 week
// before he passed). 9 photos × 4s + 40s family-3 video = 76s.
// ─────────────────────────────────────────────────────────────────────────
export const scene5Legacy: PhotoEntry[] = [
  { src: `${dir.kids}/IMG-20170822-WA0029.jpg` },
  { src: `${dir.kids}/IMG-20190510-WA0023.jpg` },
  { src: `${dir.kids}/20190827_120148.jpg` },
  { src: `${dir.kids}/IMG-20260416-WA0041.jpg` },
  { src: `${dir.kids}/IMG-20260416-WA0042.jpg` },
  { src: `${dir.kids}/beach-cheers.jpg` },
  { src: `${dir.kids}/picnic-friends.jpg` },
  { src: `${dir.alone}/IMG-20260405-WA0011.jpg` },
  { src: `${dir.alone}/IMG-20260405-WA0021.jpg` },
];

// ─────────────────────────────────────────────────────────────────────────
// SCENE 6 · Ending — closing montage
// 7 curated photos × 4s = 28s + 4s title card = 32s.
// Photos chosen to span the arc of his life: early portrait → family →
// kids → friends → service → recent smile → final hero. Every photo at
// the same 4s pace as the rest of the film so the viewer doesn't get
// stuck on a single still at the close.
// ─────────────────────────────────────────────────────────────────────────
export const scene6Closing: PhotoEntry[] = [
  { src: `${dir.alone}/IMG-20220224-WA0025.jpg` }, // early portrait
  { src: `${dir.family}/IMG-20170806-WA0013.jpg` }, // extended family
  { src: `${dir.kids}/IMG-20170822-WA0029.jpg` }, // with kids
  { src: `${dir.friends}/IMG-20200505-WA0013.jpg` }, // friends — "לב ענק"
  { src: `${dir.service}/IMG-20231012-WA0046.jpg` }, // service
  { src: `${dir.alone}/IMG-20260405-WA0011.jpg` }, // recent smile
  { src: `${dir.alone}/20260421_124429.jpg` }, // final hero
];

// Kept for backward-compat with anywhere that still references it.
export const scene6Hero: PhotoEntry = scene6Closing[scene6Closing.length - 1];

// Audio is configured separately in src/data/audioManifest.ts.
