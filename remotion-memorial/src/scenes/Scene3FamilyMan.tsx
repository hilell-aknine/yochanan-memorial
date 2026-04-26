import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PhotoSequence } from "../components/PhotoSequence";
import { FamilyVideoClip } from "../components/FamilyVideoClip";
import {
  scene3Kids,
  scene3Naama,
  scene3Extended,
} from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";

// Scene 3 · The family man
// Order: kids → family-1 video → Naama → family-2 video → extended family.
// 24 photos × 4s = 96s + 14s + 17.4s videos = 127s total.
const PHASES = [
  { kind: "photos" as const, name: "kids", photos: scene3Kids, durationSec: 28 }, // 7 × 4
  { kind: "video" as const, name: "family-1", src: "assets/videos/family-1.mp4", durationSec: 14 },
  { kind: "photos" as const, name: "naama", photos: scene3Naama, durationSec: 36 }, // 9 × 4
  { kind: "video" as const, name: "family-2", src: "assets/videos/family-2.mp4", durationSec: 17.4 },
  { kind: "photos" as const, name: "extended", photos: scene3Extended, durationSec: 60 }, // 15 × 4
];

export const Scene3FamilyMan: React.FC = () => {
  void SCENE_DURATIONS;
  let cursor = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {PHASES.map((p) => {
        const frames = sec(p.durationSec);
        if (frames <= 0) return null;
        const from = cursor;
        cursor += frames;
        if (p.kind === "photos") {
          return (
            <Sequence key={p.name} from={from} durationInFrames={frames} name={`scene3-${p.name}`}>
              <PhotoSequence photos={p.photos} totalDurationFrames={frames} alternate />
            </Sequence>
          );
        }
        return (
          <Sequence key={p.name} from={from} durationInFrames={frames} name={`scene3-${p.name}`}>
            <FamilyVideoClip src={p.src} durationInFrames={frames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
