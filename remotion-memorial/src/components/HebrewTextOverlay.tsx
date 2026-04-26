import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont as loadFrankRuhl } from "@remotion/google-fonts/FrankRuhlLibre";
import { loadFont as loadHeebo } from "@remotion/google-fonts/Heebo";

const { fontFamily: frankRuhl } = loadFrankRuhl("normal", { weights: ["400", "700"] });
const { fontFamily: heebo } = loadHeebo("normal", { weights: ["400", "700", "800"] });

type Position = "bottom" | "center";

// On-screen Hebrew text with subtle fade-in. Default font is Frank Ruhl
// (display); pass `body` for Heebo. RTL is forced.
export const HebrewTextOverlay: React.FC<{
  text: string;
  durationInFrames: number;
  position?: Position;
  font?: "display" | "body";
  fontSize?: number;
  color?: string;
}> = ({
  text,
  durationInFrames,
  position = "bottom",
  font = "display",
  fontSize = 76,
  color = "#F5F1E8",
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  const justify = position === "center" ? "center" : "flex-end";
  const paddingBottom = position === "center" ? 0 : 140;

  return (
    <AbsoluteFill
      style={{
        direction: "rtl",
        justifyContent: justify,
        alignItems: "center",
        paddingBottom,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: font === "display" ? frankRuhl : heebo,
          fontWeight: font === "display" ? 700 : 400,
          fontSize,
          color,
          textAlign: "center",
          letterSpacing: 1,
          lineHeight: 1.3,
          padding: "0 80px",
          textShadow:
            "0 4px 24px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
