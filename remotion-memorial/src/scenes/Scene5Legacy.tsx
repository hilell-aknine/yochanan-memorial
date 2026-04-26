import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PhotoSequence } from "../components/PhotoSequence";
import { FamilyVideoClip } from "../components/FamilyVideoClip";
import { scene5Legacy } from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";

// Scene 5 · What he left behind
// 9 photos × 4s = 36s of legacy photos, then 40s family-3 closing clip.
export const Scene5Legacy: React.FC = () => {
  void SCENE_DURATIONS;
  const photoFrames = sec(36);
  const videoFrames = sec(40);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={0} durationInFrames={photoFrames} name="scene5-photos">
        <PhotoSequence
          photos={scene5Legacy}
          totalDurationFrames={photoFrames}
          alternate
        />
      </Sequence>
      <Sequence
        from={photoFrames}
        durationInFrames={videoFrames}
        name="scene5-family-3"
      >
        <FamilyVideoClip
          src="assets/videos/family-3.mp4"
          durationInFrames={videoFrames}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
