import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import type { AudioCue } from "../data/audioManifest";
import { FPS, sec } from "../data/timing";

// Renders one AudioCue as a Remotion <Audio> wrapped in a <Sequence>.
// Volume envelope: linear fade-in → peak → linear fade-out.
export const AudioTrack: React.FC<{ cue: AudioCue }> = ({ cue }) => {
  const fromFrame = sec(cue.fromSec);
  const durationFrames = sec(cue.durationSec);
  const fadeInFrames = sec(cue.fadeInSec ?? 1.5);
  const fadeOutFrames = sec(cue.fadeOutSec ?? 2);
  const peak = cue.volume ?? 0.85;

  const volumeFn = (frame: number): number => {
    if (frame < fadeInFrames) {
      return peak * (frame / Math.max(fadeInFrames, 1));
    }
    if (frame > durationFrames - fadeOutFrames) {
      return (
        peak *
        Math.max(0, (durationFrames - frame) / Math.max(fadeOutFrames, 1))
      );
    }
    return peak;
  };

  return (
    <Sequence
      from={fromFrame}
      durationInFrames={durationFrames}
      name={cue.label ?? cue.src}
    >
      <Audio
        src={staticFile(cue.src)}
        volume={volumeFn}
        startFrom={cue.startFromSec ? Math.round(cue.startFromSec * FPS) : 0}
      />
    </Sequence>
  );
};
