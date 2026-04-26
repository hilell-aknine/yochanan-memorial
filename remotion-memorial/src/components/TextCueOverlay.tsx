import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import type { TextCue, TextSize } from "../data/textManifest";
import { sec } from "../data/timing";
import { AnimatedText } from "./AnimatedText";

const sizePx: Record<TextSize, number> = {
  small: 48,
  medium: 64,
  large: 84,
  xlarge: 110,
};

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

  const fadeOut = interpolate(
    frame,
    [durationFrames - sec(0.7), durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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
        opacity: fadeOut,
        background:
          cue.position === "bottom"
            ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 25%, transparent 50%)"
            : "transparent",
      }}
    >
      <AnimatedText
        text={cue.text}
        durationInFrames={durationFrames}
        fontFamily={cue.font ?? "display"}
        fontSize={sizePx[cue.size ?? "medium"]}
      />
    </AbsoluteFill>
  );
};

export const AllTextCues: React.FC<{ cues: TextCue[] }> = ({ cues }) => {
  return (
    <>
      {cues.map((cue, i) => (
        <TextCueOverlay key={cue.label ?? `cue-${i}`} cue={cue} />
      ))}
    </>
  );
};
