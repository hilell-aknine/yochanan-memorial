import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { sec } from "../data/timing";
import { loadFont as loadFrankRuhl } from "@remotion/google-fonts/FrankRuhlLibre";
import { loadFont as loadHeebo } from "@remotion/google-fonts/Heebo";

const { fontFamily: frankRuhl } = loadFrankRuhl("normal", { weights: ["400", "700"] });
const { fontFamily: heebo } = loadHeebo("normal", { weights: ["400", "700", "800"] });

// Renders text with a continuous word-by-word reveal that spans most of
// the cue's duration. Each word fades + rises into place at its assigned
// frame; words breathe with a subtle scale pulse after appearing so the
// text never feels "frozen". Used for both narration cues and on-photo
// captions.

const WORD_FADE_FRAMES = 12;
// Fraction of the cue duration spent revealing words (rest is hold + fade).
const REVEAL_FRACTION = 0.65;

type Props = {
  text: string | string[];
  durationInFrames: number;
  fontFamily: "display" | "body";
  fontSize: number;
  color?: string;
  fontWeight?: number;
};

export const AnimatedText: React.FC<Props> = ({
  text,
  durationInFrames,
  fontFamily,
  fontSize,
  color = "#F5F1E8",
  fontWeight,
}) => {
  const frame = useCurrentFrame();
  const lines = Array.isArray(text) ? text : [text];

  // Flatten all words across lines for a single staggered timeline.
  const flatWords: { line: number; word: string }[] = [];
  lines.forEach((l, lineIdx) => {
    l.split(/\s+/)
      .filter(Boolean)
      .forEach((w) => flatWords.push({ line: lineIdx, word: w }));
  });
  const wordCount = Math.max(flatWords.length, 1);

  const revealEnd = durationInFrames * REVEAL_FRACTION;
  const stagger = revealEnd / wordCount;

  const family = fontFamily === "display" ? frankRuhl : heebo;
  const weight = fontWeight ?? (fontFamily === "display" ? 700 : 400);

  return (
    <div
      style={{
        fontFamily: `${family}, "Frank Ruhl Libre", "Heebo", serif`,
        fontWeight: weight,
        fontSize,
        color,
        textAlign: "center",
        letterSpacing: 1,
        lineHeight: 1.32,
        padding: "0 80px",
        textShadow:
          "0 4px 28px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,1)",
        direction: "rtl",
      }}
    >
      {lines.map((_, lineIdx) => {
        const wordsInLine = flatWords
          .map((w, i) => ({ ...w, flatIdx: i }))
          .filter((w) => w.line === lineIdx);
        return (
          <div
            key={lineIdx}
            style={{ marginBottom: lineIdx < lines.length - 1 ? 6 : 0 }}
          >
            {wordsInLine.map((w, j) => {
              const revealStart = w.flatIdx * stagger;
              const opacity = interpolate(
                frame,
                [revealStart, revealStart + WORD_FADE_FRAMES],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              const yOffset = interpolate(
                frame,
                [revealStart, revealStart + WORD_FADE_FRAMES],
                [10, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              // Subtle continuous breathing: scale 1.00 → 1.015 → 1.00 over
              // 3 seconds, slightly offset per word so the line shimmers
              // rather than pulses uniformly.
              const breathPhase = (frame + w.flatIdx * 5) / sec(3);
              const breath = 1 + Math.sin(breathPhase * Math.PI * 2) * 0.008;
              return (
                <span
                  key={j}
                  style={{
                    opacity,
                    transform: `translateY(${yOffset}px) scale(${breath})`,
                    display: "inline-block",
                    marginInlineStart: j === 0 ? 0 : "0.32em",
                  }}
                >
                  {w.word}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
