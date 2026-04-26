import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { sec } from "../data/timing";
import { BlurredBackground } from "./BlurredBackground";

// Plays a source video filling the 1920x1080 frame, with optional fade-in
// and fade-out. The video keeps its native audio (no song overlay).
// Used for the opening clip and the closing clip.
export const IntroOutroVideo: React.FC<{
  src: string;
  durationInFrames: number;
  fadeInSec?: number;
  fadeOutSec?: number;
}> = ({ src, durationInFrames, fadeInSec = 0.6, fadeOutSec = 1.0 }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, sec(fadeInSec)], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - sec(fadeOutSec), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity }}>
      <BlurredBackgroundVideo src={src} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <OffthreadVideo
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

// Same idea as BlurredBackground but for video. We re-mount the video
// inside a blurred layer so portrait/letterboxed source clips don't get
// hard black bars on a 1920x1080 canvas.
const BlurredBackgroundVideo: React.FC<{ src: string }> = ({ src }) => {
  return (
    <AbsoluteFill
      style={{
        filter: "blur(60px) saturate(1.1) brightness(0.5)",
        transform: "scale(1.2)",
        overflow: "hidden",
      }}
    >
      <OffthreadVideo
        src={src}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

export const IntroVideo: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => (
  <IntroOutroVideo
    src={staticFile("assets/videos/intro.mp4")}
    durationInFrames={durationInFrames}
    fadeInSec={1.0}
    fadeOutSec={0.8}
  />
);

export const OutroVideo: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => (
  <IntroOutroVideo
    src={staticFile("assets/videos/outro.mp4")}
    durationInFrames={durationInFrames}
    fadeInSec={0.8}
    fadeOutSec={2.0}
  />
);
