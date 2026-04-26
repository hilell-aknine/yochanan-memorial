// Audio cues placed on the SCENES timeline (scene 1 starts at 0s).
// MemorialVideo wraps the whole scenes block in a Sequence at INTRO_DURATION.
//
// Scene timeline (with 4s photo cap + family clips embedded):
//   0:00–0:32    Scene 1 (32s)   →  04-im-yesh-gan-eden
//   0:32–2:43    Scene 2 (131s)  →  07-shir-hareut       (incl. 3.6s personal clip)
//   2:43–5:19    Scene 3 (156s)  →  01-achi-hatzair      (incl. 14s + 17.4s family clips)
//   5:19–5:51    Scene 4 (32s)   →  08-prachim-baruach
//   5:51–7:07    Scene 5 (76s)   →  03-hachaim           (incl. 40s family-3 clip)
//   7:07–8:07    Scene 6 (60s)   →  03-hachaim continues

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
    durationSec: 32,
    fadeInSec: 2,
    fadeOutSec: 2,
    volume: 0.85,
  },
  {
    label: "scene2-shir-hareut",
    src: "assets/audio/07-shir-hareut.mp3",
    fromSec: 32,
    durationSec: 131,
    fadeInSec: 2,
    fadeOutSec: 2.5,
    volume: 0.8,
  },
  {
    label: "scene3-achi-hatzair",
    src: "assets/audio/01-achi-hatzair-yehuda.mp3",
    fromSec: 163,
    durationSec: 156,
    fadeInSec: 2,
    fadeOutSec: 3,
    volume: 0.85,
  },
  {
    label: "scene4-prachim-baruach",
    src: "assets/audio/08-prachim-baruach.mp3",
    fromSec: 319,
    durationSec: 32,
    fadeInSec: 2,
    fadeOutSec: 2,
    volume: 0.75,
  },
  {
    label: "scene5-6-hachaim",
    src: "assets/audio/03-hachaim.mp3",
    fromSec: 351,
    durationSec: 136, // covers Scene 5 (76s) + Scene 6 (60s)
    fadeInSec: 2.5,
    fadeOutSec: 5,
    volume: 0.85,
  },
];
