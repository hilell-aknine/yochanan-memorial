import React from "react";
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { KenBurnsImage } from "../components/KenBurnsImage";
import { scene6Hero } from "../data/photoManifest";
import { sec, SCENE_DURATIONS } from "../data/timing";
import { loadFont as loadFrankRuhl } from "@remotion/google-fonts/FrankRuhlLibre";

const { fontFamily: frankRuhl } = loadFrankRuhl("normal", { weights: ["400", "700"] });

// Scene 6 · Ending
// Hero photo for ~93% of the scene, then black title card for the rest
// (always at least 4s, never longer than ~6s).
export const Scene6Ending: React.FC = () => {
  const totalFrames = sec(SCENE_DURATIONS.scene6Ending);
  const titleFrames = sec(4);
  const heroFrames = totalFrames - titleFrames;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={0} durationInFrames={heroFrames}>
        <HeroPhoto durationInFrames={heroFrames} />
      </Sequence>
      <Sequence from={heroFrames} durationInFrames={titleFrames}>
        <FinalTitle durationInFrames={titleFrames} />
      </Sequence>
    </AbsoluteFill>
  );
};

const HeroPhoto: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  // Fade out the photo over the last 1.5s into the black title card.
  const fadeOut = interpolate(
    frame,
    [durationInFrames - sec(1.5), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  // Soft fade-in over the first 1s as well.
  const fadeIn = interpolate(frame, [0, sec(1)], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      <KenBurnsImage
        src={staticFile(scene6Hero.src)}
        durationInFrames={durationInFrames}
        direction="in"
      />
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
