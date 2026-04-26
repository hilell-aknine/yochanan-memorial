import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { PhotoSequence } from "../components/PhotoSequence";
import { scene1Photos } from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";

// Scene 1 · 0:00–1:20 · Opening
// 4s of black silence → portraits with slow Ken Burns dissolve.
// TODO(audio): authentic laugh/voice clip from videos folder once classified.
export const Scene1Opening: React.FC = () => {
  const totalFrames = sec(SCENE_DURATIONS.scene1Opening);
  const blackFrames = sec(4);
  const photosFrames = totalFrames - blackFrames;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={0} durationInFrames={blackFrames + 30}>
        <BlackHold />
      </Sequence>
      <Sequence from={blackFrames} durationInFrames={photosFrames}>
        <PhotoSequence
          photos={scene1Photos}
          totalDurationFrames={photosFrames}
          alternate
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const BlackHold: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [sec(3), sec(4) + 30], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#000", opacity, zIndex: 10 }}
    />
  );
};
