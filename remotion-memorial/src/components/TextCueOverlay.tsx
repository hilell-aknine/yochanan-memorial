import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import type { TextCue, TextSize, TextAnimation } from "../data/textManifest";
import { sec, FPS } from "../data/timing";
import { loadFont as loadFrankRuhl } from "@remotion/google-fonts/FrankRuhlLibre";
import { loadFont as loadHeebo } from "@remotion/google-fonts/Heebo";

const { fontFamily: frankRuhl } = loadFrankRuhl("normal", { weights: ["400", "700"] });
const { fontFamily: heebo } = loadHeebo("normal", { weights: ["400", "700", "800"] });

const sizePx: Record<TextSize, number> = {
  small: 48,
  medium: 64,
  large: 84,
  xlarge: 110,
};

// Stagger between consecutive words during reveal (frames).
// At 30fps, 8 frames ≈ 270ms — fast enough to read along, slow enough to feel.
const WORD_STAGGER_FRAMES = 8;
// How long each individual word's fade-in lasts.
const WORD_FADE_FRAMES = 12;

export const TextCueOverlay: React.FC<{ cue: TextCue }> = ({ cue }) => {
  const fromFrame = sec(cue.fromSec);
  const durationFrames = sec(cue.durationSec);

  return (
    <Sequence
      from={fromFrame}
      durationInFrames={durationFrames}
      name={cue.label ?? `text@${cue.fromSec}`}
      layout="none"
    >
      <CueBody cue={cue} durationFrames={durationFrames} />
    </Sequence>
  );
};

const CueBody: React.FC<{ cue: TextCue; durationFrames: number }> = ({
  cue,
  durationFrames,
}) => {
  const frame = useCurrentFrame();

  // Container-level fade-out on the last 0.7s.
  const containerFadeOut = interpolate(
    frame,
    [durationFrames - sec(0.7), durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const family = (cue.font ?? "display") === "display" ? frankRuhl : heebo;
  const size = sizePx[cue.size ?? "medium"];
  const lines = Array.isArray(cue.text) ? cue.text : [cue.text];
  const animation: TextAnimation = cue.animation ?? "word-by-word";

  const justify =
    cue.position === "top"
      ? "flex-start"
      : cue.position === "center"
        ? "center"
        : "flex-end";
  const padTop = cue.position === "top" ? 120 : 0;
  const padBottom = cue.position === "bottom" ? 140 : 0;

  return (
    <AbsoluteFill
      style={{
        direction: "rtl",
        justifyContent: justify,
        alignItems: "center",
        paddingTop: padTop,
        paddingBottom: padBottom,
        opacity: containerFadeOut,
        background:
          cue.position === "bottom"
            ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 25%, transparent 50%)"
            : "transparent",
      }}
    >
      <div
        style={{
          fontFamily: `${family}, "Frank Ruhl Libre", "Heebo", serif`,
          fontWeight: cue.font === "body" ? 400 : 700,
          fontSize: size,
          color: "#F5F1E8",
          textAlign: "center",
          letterSpacing: 1,
          lineHeight: 1.32,
          padding: "0 80px",
          textShadow:
            "0 4px 28px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,1)",
        }}
      >
        {animation === "word-by-word"
          ? renderWordByWord(lines, frame, durationFrames)
          : animation === "line-by-line"
            ? renderLineByLine(lines, frame, durationFrames)
            : renderFade(lines, frame)}
      </div>
    </AbsoluteFill>
  );
};

function renderFade(lines: string[], frame: number): React.ReactNode {
  const fadeIn = interpolate(frame, [0, sec(0.7)], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ opacity: fadeIn }}>
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}

function renderLineByLine(
  lines: string[],
  frame: number,
  _duration: number,
): React.ReactNode {
  return (
    <>
      {lines.map((line, i) => {
        const start = i * sec(0.6);
        const opacity = interpolate(
          frame,
          [start, start + sec(0.5)],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const yOffset = interpolate(
          frame,
          [start, start + sec(0.5)],
          [12, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${yOffset}px)`,
            }}
          >
            {line}
          </div>
        );
      })}
    </>
  );
}

function renderWordByWord(
  lines: string[],
  frame: number,
  _duration: number,
): React.ReactNode {
  // Build a flat word list with per-word stagger index.
  let flatIdx = 0;
  return (
    <>
      {lines.map((line, lineIdx) => {
        const words = line.split(/\s+/).filter(Boolean);
        return (
          <div key={lineIdx} style={{ marginBottom: lineIdx < lines.length - 1 ? 6 : 0 }}>
            {words.map((word, wordIdx) => {
              const myIdx = flatIdx++;
              const revealStart = myIdx * WORD_STAGGER_FRAMES;
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
              return (
                <span
                  key={wordIdx}
                  style={{
                    opacity,
                    transform: `translateY(${yOffset}px)`,
                    display: "inline-block",
                    marginInlineStart: wordIdx === 0 ? 0 : "0.32em",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export const AllTextCues: React.FC<{ cues: TextCue[] }> = ({ cues }) => {
  return (
    <>
      {cues.map((cue, i) => (
        <TextCueOverlay key={cue.label ?? `cue-${i}`} cue={cue} />
      ))}
    </>
  );
};
