import React from "react";
import { AbsoluteFill } from "remotion";
import { PhotoSequence } from "../components/PhotoSequence";
import { scene4Struggle } from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";

// Scene 4 · 7:00–9:30 · The struggle
// Quiet portraits. Slow pacing. No on-screen text.
// TODO(B-roll): sunset/landscape footage missing — add to its own sub-list once filmed.
export const Scene4Struggle: React.FC = () => {
  const totalFrames = sec(SCENE_DURATIONS.scene4Struggle);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <PhotoSequence
        photos={scene4Struggle}
        totalDurationFrames={totalFrames}
        alternate
      />
    </AbsoluteFill>
  );
};
