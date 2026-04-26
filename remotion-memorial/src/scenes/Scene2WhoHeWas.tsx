import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PhotoSequence } from "../components/PhotoSequence";
import { FamilyVideoClip } from "../components/FamilyVideoClip";
import {
  scene2Childhood,
  scene2Service,
  scene2Friends,
  scene2Events,
} from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";

// Scene 2 · Who he was
// Order: childhood → service → personal video → friends → events
// All times remain ≤ 4s per photo (mostly 2.5–3.7s, well under cap).
const PHASES = [
  { kind: "photos" as const, name: "childhood", photos: scene2Childhood, durationSec: 0 },
  { kind: "photos" as const, name: "service", photos: scene2Service, durationSec: 33 },
  { kind: "video" as const, name: "personal", src: "assets/videos/personal.mp4", durationSec: 3.6 },
  { kind: "photos" as const, name: "friends", photos: scene2Friends, durationSec: 74 }, // 27 photos × 2.74s
  { kind: "photos" as const, name: "events", photos: scene2Events, durationSec: 20 }, // 5 photos × 4s
];

export const Scene2WhoHeWas: React.FC = () => {
  void SCENE_DURATIONS; // keep import; total is summed from PHASES
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
            <Sequence
              key={p.name}
              from={from}
              durationInFrames={frames}
              name={`scene2-${p.name}`}
            >
              <PhotoSequence
                photos={p.photos}
                totalDurationFrames={frames}
                alternate
              />
            </Sequence>
          );
        }
        return (
          <Sequence
            key={p.name}
            from={from}
            durationInFrames={frames}
            name={`scene2-${p.name}`}
          >
            <FamilyVideoClip src={p.src} durationInFrames={frames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
