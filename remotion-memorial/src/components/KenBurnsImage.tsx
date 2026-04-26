import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { BlurredBackground } from "./BlurredBackground";

type Direction = "in" | "out";

// Single photo with slow Ken Burns zoom over its lifetime.
// `frame` is local to the parent <Sequence> (Remotion makes useCurrentFrame
// 0-based inside a Sequence), so we map [0, durationInFrames] → [1.0, 1.08].
export const KenBurnsImage: React.FC<{
  src: string;
  durationInFrames: number;
  direction?: Direction;
}> = ({ src, durationInFrames, direction = "in" }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [0, durationInFrames],
    direction === "in" ? [1.0, 1.08] : [1.08, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <BlurredBackground src={src} />
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
