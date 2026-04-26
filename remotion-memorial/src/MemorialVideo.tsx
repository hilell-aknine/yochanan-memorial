import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2WhoHeWas } from "./scenes/Scene2WhoHeWas";
import { Scene3FamilyMan } from "./scenes/Scene3FamilyMan";
import { Scene4Struggle } from "./scenes/Scene4Struggle";
import { Scene5Legacy } from "./scenes/Scene5Legacy";
import { Scene6Ending } from "./scenes/Scene6Ending";
import { AudioTrack } from "./components/AudioTrack";
import { AllTextCues } from "./components/TextCueOverlay";
import { IntroVideo, OutroVideo } from "./components/IntroOutroVideo";
import { audioCues } from "./data/audioManifest";
import { textCues } from "./data/textManifest";
import {
  sec,
  SCENE_DURATIONS,
  INTRO_DURATION_FRAMES,
  SCENES_FROM_FRAME,
  SCENES_DURATION_FRAMES,
  OUTRO_FROM_FRAME,
  OUTRO_DURATION_FRAMES,
} from "./data/timing";

// Master composition.
//   0 …………… 64s   Intro video
//   64 ………… 784s  Scenes 1–6 (with audio + text overlays)
//   784 ………… 810s Outro video
export const MemorialVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={0} durationInFrames={INTRO_DURATION_FRAMES} name="intro">
        <IntroVideo durationInFrames={INTRO_DURATION_FRAMES} />
      </Sequence>

      <Sequence
        from={SCENES_FROM_FRAME}
        durationInFrames={SCENES_DURATION_FRAMES}
        name="main"
      >
        <Main />
      </Sequence>

      <Sequence
        from={OUTRO_FROM_FRAME}
        durationInFrames={OUTRO_DURATION_FRAMES}
        name="outro"
      >
        <OutroVideo durationInFrames={OUTRO_DURATION_FRAMES} />
      </Sequence>
    </AbsoluteFill>
  );
};

// All offsets here are SCENE-relative (scene 1 starts at frame 0).
const Main: React.FC = () => {
  const s1 = sec(SCENE_DURATIONS.scene1Opening);
  const s2 = sec(SCENE_DURATIONS.scene2WhoHeWas);
  const s3 = sec(SCENE_DURATIONS.scene3FamilyMan);
  const s4 = sec(SCENE_DURATIONS.scene4Struggle);
  const s5 = sec(SCENE_DURATIONS.scene5Legacy);
  const s6 = sec(SCENE_DURATIONS.scene6Ending);

  let cursor = 0;
  const offsets = {
    s1: cursor,
    s2: (cursor += s1),
    s3: (cursor += s2),
    s4: (cursor += s3),
    s5: (cursor += s4),
    s6: (cursor += s5),
  };

  return (
    <AbsoluteFill>
      <Sequence from={offsets.s1} durationInFrames={s1}><Scene1Opening /></Sequence>
      <Sequence from={offsets.s2} durationInFrames={s2}><Scene2WhoHeWas /></Sequence>
      <Sequence from={offsets.s3} durationInFrames={s3}><Scene3FamilyMan /></Sequence>
      <Sequence from={offsets.s4} durationInFrames={s4}><Scene4Struggle /></Sequence>
      <Sequence from={offsets.s5} durationInFrames={s5}><Scene5Legacy /></Sequence>
      <Sequence from={offsets.s6} durationInFrames={s6}><Scene6Ending /></Sequence>

      {/* Narration text overlays — substitute for unrecorded voiceover. */}
      <AllTextCues cues={textCues} />

      {/* Soundtrack: 5 songs across the scene timeline. */}
      {audioCues.map((cue) => (
        <AudioTrack key={cue.label ?? cue.src} cue={cue} />
      ))}
    </AbsoluteFill>
  );
};
