import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { sec } from "../data/timing";

// Plays a short family clip embedded inside a scene. Renders the source
// video centered with letter-/pillarboxing and a blurred copy as backdrop
// so portrait clips don't show hard black bars on the 1920x1080 canvas.
//
// Native audio plays at full volume. Fade-in/fade-out 0.4s each so the
// clip slides in cleanly between photo dissolves.
export const FamilyVideoClip: React.FC<{
  src: string;
  durationInFrames: number;
}> = ({ src, durationInFrames }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, sec(0.4)], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - sec(0.4), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);
  const url = staticFile(src);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity }}>
      <AbsoluteFill
        style={{
          filter: "blur(60px) saturate(1.05) brightness(0.55)",
          transform: "scale(1.2)",
          overflow: "hidden",
        }}
      >
        <OffthreadVideo
          src={url}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <OffthreadVideo
          src={url}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
