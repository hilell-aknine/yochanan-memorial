import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { PhotoSequence } from "../components/PhotoSequence";
import { scene6Closing } from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";
import { loadFont as loadFrankRuhl } from "@remotion/google-fonts/FrankRuhlLibre";

const { fontFamily: frankRuhl } = loadFrankRuhl("normal", { weights: ["400", "700"] });

// Scene 6 · Closing montage
// 7 photos × 4s = 28s, then 4s of black with name + dates.
export const Scene6Ending: React.FC = () => {
  const totalFrames = sec(SCENE_DURATIONS.scene6Ending);
  const titleFrames = sec(4);
  const montageFrames = totalFrames - titleFrames;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={0} durationInFrames={montageFrames}>
        <PhotoSequence
          photos={scene6Closing}
          totalDurationFrames={montageFrames}
          alternate
        />
      </Sequence>
      <Sequence from={montageFrames} durationInFrames={titleFrames}>
        <FinalTitle durationInFrames={titleFrames} />
      </Sequence>
    </AbsoluteFill>
  );
};

const FinalTitle: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, sec(1)], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - sec(1), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        direction: "rtl",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: frankRuhl,
          color: "#F5F1E8",
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        <div style={{ fontSize: 84, fontWeight: 700, marginBottom: 24 }}>
          יוחנן אליהו פרדג&apos; ז&quot;ל
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 400,
            opacity: 0.85,
            letterSpacing: 8,
          }}
        >
          1988 — 2026
        </div>
      </div>
    </AbsoluteFill>
  );
};
