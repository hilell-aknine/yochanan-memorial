// Master timing constants for the memorial film.
//
// Structure:
//   Intro video (64s) → Scenes 1–6 with audio/narration (630s) → Outro video (26s)
//   Total: 12:00 (720s) at 30fps = 21,600 frames.
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

// Target durations per scene (seconds). Used to size the composition and
// to derive per-photo durations when not specified explicitly.
// Scaled by 0.875 from the original 720s plan so total film = 12:00.
export const SCENE_DURATIONS = {
  scene1Opening: 70,
  scene2WhoHeWas: 140,
  scene3FamilyMan: 158,
  scene4Struggle: 131,
  scene5Legacy: 78,
  scene6Ending: 53,
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
