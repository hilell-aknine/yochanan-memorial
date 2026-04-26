import React from "react";
import { AbsoluteFill } from "remotion";
import { PhotoSequence } from "../components/PhotoSequence";
import { scene5Legacy } from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";

// Scene 5 · 9:30–11:00 · What he left behind
export const Scene5Legacy: React.FC = () => {
  const totalFrames = sec(SCENE_DURATIONS.scene5Legacy);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <PhotoSequence
        photos={scene5Legacy}
        totalDurationFrames={totalFrames}
        alternate
      />
    </AbsoluteFill>
  );
};
