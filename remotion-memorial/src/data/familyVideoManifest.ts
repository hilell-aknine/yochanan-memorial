// Family videos embedded inside scenes. Each clip plays with its own native
// audio; the soundtrack ducks under it (handled in MemorialVideo).
//
// Placement (scene-relative):
//   Scene 2 (after service photos, before friends): personal.mp4 (3.6s)
//   Scene 3 (after kids photos): family-1.mp4 (14s)
//   Scene 3 (after Naama photos): family-2.mp4 (17.4s)
//   Scene 5 (after legacy photos): family-3.mp4 (40s)

export type FamilyVideoClip = {
  /** path under publicDir (../) */
  src: string;
  /** Which scene this clip belongs to. */
  scene: "s2" | "s3" | "s5";
  /** Where in the scene this clip is inserted (logical slot). */
  slot: "after-service" | "after-kids" | "after-naama" | "after-legacy";
  /** Actual duration of the source clip (seconds). */
  durationSec: number;
  label: string;
};

export const familyClips: FamilyVideoClip[] = [
  {
    label: "personal",
    src: "assets/videos/personal.mp4",
    scene: "s2",
    slot: "after-service",
    durationSec: 3.6,
  },
  {
    label: "family-1",
    src: "assets/videos/family-1.mp4",
    scene: "s3",
    slot: "after-kids",
    durationSec: 14.0,
  },
  {
    label: "family-2",
    src: "assets/videos/family-2.mp4",
    scene: "s3",
    slot: "after-naama",
    durationSec: 17.4,
  },
  {
    label: "family-3",
    src: "assets/videos/family-3.mp4",
    scene: "s5",
    slot: "after-legacy",
    durationSec: 40.0,
  },
];
