import React from "react";
import { Composition } from "remotion";
import { MemorialVideo } from "./MemorialVideo";
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from "./data/timing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MemorialVideo"
        component={MemorialVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
