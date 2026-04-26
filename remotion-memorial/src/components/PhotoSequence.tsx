import React from "react";
import {
  Sequence,
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import type { PhotoEntry } from "../data/photoManifest";
import { CROSSFADE_FRAMES, FPS } from "../data/timing";
import { KenBurnsImage } from "./KenBurnsImage";
import { HebrewTextOverlay } from "./HebrewTextOverlay";

// Plays a list of photos back-to-back inside a fixed time budget, with a
// cross-fade between consecutive photos. Empty lists render nothing.
export const PhotoSequence: React.FC<{
  photos: PhotoEntry[];
  totalDurationFrames: number;
  alternate?: boolean;
}> = ({ photos, totalDurationFrames, alternate = true }) => {
  if (photos.length === 0 || totalDurationFrames <= 0) {
    return null;
  }

  // Distribute time: explicit durationSec wins; remainder splits equally.
  const explicitFrames = photos.map((p) =>
    p.durationSec ? Math.round(p.durationSec * FPS) : 0,
  );
  const explicitTotal = explicitFrames.reduce((a, b) => a + b, 0);
  const flexibleCount = photos.filter((p) => !p.durationSec).length;
  const remainingFrames = Math.max(totalDurationFrames - explicitTotal, 0);
  const perFlexible =
    flexibleCount > 0 ? Math.floor(remainingFrames / flexibleCount) : 0;

  const photoFrames = photos.map((p, i) =>
    p.durationSec ? explicitFrames[i] : perFlexible,
  );

  // Overlapping offsets create the crossfade.
  const offsets: number[] = [];
  let cursor = 0;
  for (let i = 0; i < photos.length; i++) {
    offsets.push(cursor);
    cursor += Math.max(photoFrames[i] - CROSSFADE_FRAMES, 1);
  }

  return (
    <AbsoluteFill>
      {photos.map((photo, i) => {
        const dur = photoFrames[i];
        if (dur <= 0) return null;
        const direction = alternate && i % 2 === 1 ? "out" : "in";
        return (
          <Sequence
            key={`${photo.src}-${i}`}
            from={offsets[i]}
            durationInFrames={dur}
            name={`photo-${i}`}
          >
            <PhotoCard
              src={photo.src}
              text={photo.text}
              direction={direction}
              durationInFrames={dur}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const PhotoCard: React.FC<{
  src: string;
  text?: string;
  direction: "in" | "out";
  durationInFrames: number;
}> = ({ src, text, direction, durationInFrames }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, CROSSFADE_FRAMES], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - CROSSFADE_FRAMES, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ opacity }}>
      <KenBurnsImage
        src={staticFile(src)}
        durationInFrames={durationInFrames}
        direction={direction}
      />
      {text ? (
        <HebrewTextOverlay
          text={text}
          durationInFrames={durationInFrames}
          position="bottom"
        />
      ) : null}
    </AbsoluteFill>
  );
};
