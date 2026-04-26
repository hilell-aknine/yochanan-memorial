// Audio cues placed on the SCENES timeline (scene 1 starts at 0s).
//
// Tail-aligned policy: each song plays its FINAL durationSec seconds, so
// its natural ending lands at the scene's end (no mid-song chop). This
// implements Hillel's "השיר מתאים לקליפ" principle. The fade-in covers
// any abruptness when entering mid-song; the fade-out softens whatever
// is left of the final tail.
//
// Source song durations (probed from MP3s):
//   04-im-yesh-gan-eden  267s   →  start at 235s, play 32s
//   07-shir-hareut       234s   →  start at 103s, play 131s
//   01-achi-hatzair      206s   →  start at  50s, play 156s
//   08-prachim-baruach   268s   →  start at 236s, play 32s
//   03-hachaim           244s   →  start at 136s, play 108s

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
    startFromSec: 235,
    fadeInSec: 3,
    fadeOutSec: 3,
    volume: 0.85,
  },
  {
    label: "scene2-shir-hareut",
    src: "assets/audio/07-shir-hareut.mp3",
    fromSec: 32,
    durationSec: 131,
    startFromSec: 103,
    fadeInSec: 2.5,
    fadeOutSec: 3,
    volume: 0.8,
  },
  {
    label: "scene3-achi-hatzair",
    src: "assets/audio/01-achi-hatzair-yehuda.mp3",
    fromSec: 163,
    durationSec: 156,
    startFromSec: 50,
    fadeInSec: 2.5,
    fadeOutSec: 3,
    volume: 0.85,
  },
  {
    label: "scene4-prachim-baruach",
    src: "assets/audio/08-prachim-baruach.mp3",
    fromSec: 319,
    durationSec: 32,
    startFromSec: 236,
    fadeInSec: 3,
    fadeOutSec: 3,
    volume: 0.75,
  },
  {
    label: "scene5-6-hachaim",
    src: "assets/audio/03-hachaim.mp3",
    fromSec: 351,
    durationSec: 108, // Scene 5 (76s) + Scene 6 (32s)
    startFromSec: 136,
    fadeInSec: 2.5,
    fadeOutSec: 5,
    volume: 0.85,
  },
];
