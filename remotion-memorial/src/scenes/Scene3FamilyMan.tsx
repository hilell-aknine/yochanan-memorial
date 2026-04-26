import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PhotoSequence } from "../components/PhotoSequence";
import {
  scene3Kids,
  scene3Naama,
  scene3Extended,
} from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";

// Scene 3 · 4:00–7:00 · The family man
// Heart of the film. Slow pacing. Order: kids → Naama → extended family.
export const Scene3FamilyMan: React.FC = () => {
  const totalFrames = sec(SCENE_DURATIONS.scene3FamilyMan);

  // Weights tuned to the current photo distribution (5 kids / 2 Naama / 9
  // extended). When more Naama photos arrive, raise her weight back toward 0.4.
  const sections = [
    { name: "kids", photos: scene3Kids, weight: 0.4 },
    { name: "naama", photos: scene3Naama, weight: 0.2 },
    { name: "extended", photos: scene3Extended, weight: 0.4 },
  ];

  const populated = sections.filter((s) => s.photos.length > 0);
  const totalWeight = populated.reduce((a, s) => a + s.weight, 0) || 1;

  const slots = sections.map((s) => {
    if (s.photos.length === 0) return { ...s, frames: 0 };
    return { ...s, frames: Math.floor((s.weight / totalWeight) * totalFrames) };
  });

  let cursor = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {slots.map((s) => {
        if (s.frames <= 0) return null;
        const from = cursor;
        cursor += s.frames;
        return (
          <Sequence
            key={s.name}
            from={from}
            durationInFrames={s.frames}
            name={`scene3-${s.name}`}
          >
            <PhotoSequence
              photos={s.photos}
              totalDurationFrames={s.frames}
              alternate
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
