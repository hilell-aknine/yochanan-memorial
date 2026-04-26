// Master timing constants for the memorial film.
//
// Structure:
//   Intro video (64s) → Scenes 1–6 with audio/narration + family clips → Outro video (26s)
//
// Photo pacing rule: each photo plays for at most 4 seconds (Hillel's
// directive). Scene durations are computed as numPhotos × 4s + family
// video durations + hero exception. Total film currently runs short of
// 12:00; fill with additional content as Hillel finishes classifying.
//
// audio/text cue offsets are SCENE-RELATIVE (i.e. as if scene 1 starts at 0).
// MemorialVideo wraps scenes in a Sequence at INTRO_DURATION so they
// automatically shift on the master timeline.

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const sec = (s: number) => Math.round(s * FPS);

// Cross-fade duration between consecutive photos within a scene.
export const CROSSFADE_FRAMES = sec(0.5);

// Per-photo cap in seconds (Hillel's pacing directive).
export const MAX_PHOTO_SEC = 4;

// Scene durations (seconds), computed by:
//   numPhotos × 4s + embedded family video durations
// Scene 4 intentionally violates the cap (6.4s/photo) so the contemplative
// narration about his inner struggle has room to breathe.
// Scene 6 hero shot is held for 56s by design.
export const SCENE_DURATIONS = {
  scene1Opening: 32, //   8 portraits × 4s
  scene2WhoHeWas: 131, // 10+27+5 photos (≤4s avg) + 3.6s video "personal"
  scene3FamilyMan: 156, // 7+9+15 × 4s + 14s + 17.4s family videos
  scene4Struggle: 32, //  5 portraits × 6.4s (cap override for narration)
  scene5Legacy: 76, //    9 photos × 4s + 40s family-3 video
  scene6Ending: 32, //    7 photos × 4s + 4s title card (closing montage)
} as const;

export const SCENES_TOTAL_SECONDS = Object.values(SCENE_DURATIONS).reduce(
  (a, b) => a + b,
  0,
); // 720s

export const INTRO_DURATION_SEC = 64;
export const OUTRO_DURATION_SEC = 26;

export const TOTAL_SECONDS =
  INTRO_DURATION_SEC + SCENES_TOTAL_SECONDS + OUTRO_DURATION_SEC; // 810s
export const TOTAL_FRAMES = sec(TOTAL_SECONDS); // 24,300 @ 30fps

export const SCENES_FROM_FRAME = sec(INTRO_DURATION_SEC);
export const SCENES_DURATION_FRAMES = sec(SCENES_TOTAL_SECONDS);
export const OUTRO_FROM_FRAME = SCENES_FROM_FRAME + SCENES_DURATION_FRAMES;
export const OUTRO_DURATION_FRAMES = sec(OUTRO_DURATION_SEC);
export const INTRO_DURATION_FRAMES = sec(INTRO_DURATION_SEC);
