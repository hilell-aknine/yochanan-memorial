// Audio cues placed on the SCENES timeline (scene 1 starts at 0s).
// MemorialVideo wraps the whole scenes block in a Sequence at INTRO_DURATION,
// so these offsets become master-timeline positions automatically.
//
// Mapping (5 songs across 6 scenes; scenes 5+6 share one continuous song):
//   0:00–1:10    Scene 1 Opening    →  04-im-yesh-gan-eden
//   1:10–3:30    Scene 2 Who he was →  07-shir-hareut
//   3:30–6:08    Scene 3 Family     →  01-achi-hatzair
//   6:08–8:19    Scene 4 Struggle   →  08-prachim-baruach
//   8:19–10:30   Scene 5 + Scene 6  →  03-hachaim
//
// Total scenes block: 630s (12:00 minus 64s intro and 26s outro).

export type AudioCue = {
  src: string;
  fromSec: number;
  durationSec: number;
  startFromSec?: number;
  fadeInSec?: number;
  fadeOutSec?: number;
  volume?: number;
  label?: string;
};

export const audioCues: AudioCue[] = [
  {
    label: "scene1-im-yesh-gan-eden",
    src: "assets/audio/04-im-yesh-gan-eden.mp3",
    fromSec: 0,
    durationSec: 70,
    fadeInSec: 3,
    fadeOutSec: 2.5,
    volume: 0.85,
  },
  {
    label: "scene2-shir-hareut",
    src: "assets/audio/07-shir-hareut.mp3",
    fromSec: 70,
    durationSec: 140,
    fadeInSec: 2,
    fadeOutSec: 2.5,
    volume: 0.8,
  },
  {
    label: "scene3-achi-hatzair",
    src: "assets/audio/01-achi-hatzair-yehuda.mp3",
    fromSec: 210,
    durationSec: 158,
    fadeInSec: 2,
    fadeOutSec: 3,
    volume: 0.85,
  },
  {
    label: "scene4-prachim-baruach",
    src: "assets/audio/08-prachim-baruach.mp3",
    fromSec: 368,
    durationSec: 131,
    fadeInSec: 2,
    fadeOutSec: 3,
    volume: 0.75,
  },
  {
    label: "scene5-6-hachaim",
    src: "assets/audio/03-hachaim.mp3",
    fromSec: 499,
    durationSec: 131, // covers Scene 5 (78s) + Scene 6 (53s)
    fadeInSec: 2.5,
    fadeOutSec: 5,
    volume: 0.85,
  },
];
