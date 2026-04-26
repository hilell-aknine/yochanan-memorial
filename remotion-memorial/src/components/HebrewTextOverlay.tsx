import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "./AnimatedText";

type Position = "bottom" | "center";

// Photo-attached caption (used by PhotoSequence for scene-2 friend
// captions like "תמיד ראשון לעזור"). Same word-by-word reveal as
// narration cues — every text element in the film is animated.
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
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const justify = position === "center" ? "center" : "flex-end";
  const paddingBottom = position === "center" ? 0 : 140;

  return (
    <AbsoluteFill
      style={{
        direction: "rtl",
        justifyContent: justify,
        alignItems: "center",
        paddingBottom,
        opacity: fadeOut,
      }}
    >
      <AnimatedText
        text={text}
        durationInFrames={durationInFrames}
        fontFamily={font}
        fontSize={fontSize}
        color={color}
      />
    </AbsoluteFill>
  );
};
