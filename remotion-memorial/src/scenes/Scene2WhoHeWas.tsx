import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PhotoSequence } from "../components/PhotoSequence";
import {
  scene2Childhood,
  scene2Service,
  scene2Friends,
  scene2Events,
} from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";

// Scene 2 · 1:20–4:00 · Who he was
// Order: childhood → service → friends → events.
// Time is allocated by sub-section weight; if a sub-section is empty,
// its time is redistributed to the others.
export const Scene2WhoHeWas: React.FC = () => {
  const totalFrames = sec(SCENE_DURATIONS.scene2WhoHeWas);

  const sections = [
    { name: "childhood", photos: scene2Childhood, weight: 0.15 },
    { name: "service", photos: scene2Service, weight: 0.2 },
    { name: "friends", photos: scene2Friends, weight: 0.45 },
    { name: "events", photos: scene2Events, weight: 0.2 },
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
            name={`scene2-${s.name}`}
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
