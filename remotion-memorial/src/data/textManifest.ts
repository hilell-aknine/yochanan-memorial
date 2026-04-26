// Text overlays placed on the SCENES timeline (scene 1 starts at 0s).
// MemorialVideo wraps the scenes block in a Sequence at INTRO_DURATION,
// so these offsets become master-timeline positions automatically.
//
// Scene boundaries (scenes timeline):
//   Scene 1 — 0:00–1:10    (  0– 70s)
//   Scene 2 — 1:10–3:30    ( 70–210s)   captions also attached to scene2Friends photos
//   Scene 3 — 3:30–6:08    (210–368s)
//   Scene 4 — 6:08–8:19    (368–499s)
//   Scene 5 — 8:19–9:37    (499–577s)
//   Scene 6 — 9:37–10:30   (577–630s)

export type TextSize = "small" | "medium" | "large" | "xlarge";
export type TextPosition = "top" | "center" | "bottom";
export type TextAnimation = "fade" | "word-by-word" | "line-by-line";

export type TextCue = {
  fromSec: number;
  durationSec: number;
  text: string | string[];
  position?: TextPosition;
  size?: TextSize;
  font?: "display" | "body";
  /** Default: word-by-word reveal so the viewer can read along. */
  animation?: TextAnimation;
  label?: string;
};

export const textCues: TextCue[] = [
  // ───── Scene 1 (0–70s) ─────
  {
    label: "s1-line1",
    fromSec: 7,
    durationSec: 7,
    text: ["יש אנשים שנכנסים לחדר", "ומיד הכול נהיה יותר חם."],
    position: "bottom",
    size: "medium",
  },
  {
    label: "s1-line2",
    fromSec: 25,
    durationSec: 5,
    text: "כזה הוא היה.",
    position: "bottom",
    size: "large",
  },
  {
    label: "s1-line3",
    fromSec: 49,
    durationSec: 9,
    text: ["חיוך אחד שלו —", "וכל הלב נמס."],
    position: "bottom",
    size: "medium",
  },

  // ───── Scene 3 (210–368s) ─────
  {
    label: "s3-intro",
    fromSec: 221,
    durationSec: 7,
    text: "אבל מעל הכול — הוא היה בית.",
    position: "bottom",
    size: "medium",
  },
  {
    label: "s3-father",
    fromSec: 254,
    durationSec: 4,
    text: "אבא מושלם.",
    position: "bottom",
    size: "large",
  },
  {
    label: "s3-husband",
    fromSec: 280,
    durationSec: 4,
    text: "בעל אוהב.",
    position: "bottom",
    size: "large",
  },
  {
    label: "s3-son",
    fromSec: 306,
    durationSec: 4,
    text: "בן מסור.",
    position: "bottom",
    size: "large",
  },
  {
    label: "s3-brother",
    fromSec: 333,
    durationSec: 6,
    text: "אח שתמיד נמצא.",
    position: "bottom",
    size: "large",
  },

  // ───── Scene 4 (368–499s) ─────
  {
    label: "s4-line1",
    fromSec: 378,
    durationSec: 9,
    text: ["מאחורי החיוך הגדול,", "היו גם מלחמות שאי אפשר היה לראות."],
    position: "bottom",
    size: "medium",
  },
  {
    label: "s4-line2",
    fromSec: 413,
    durationSec: 6,
    text: "הוא נשא כאב בשקט.",
    position: "bottom",
    size: "medium",
  },
  {
    label: "s4-line3",
    fromSec: 446,
    durationSec: 10,
    text: ["נלחם כמו שתמיד נלחם —", "עד שכבר לא נשאר לו כוח."],
    position: "bottom",
    size: "medium",
  },

  // ───── Scene 5 (499–577s) ─────
  {
    label: "s5-quote1",
    fromSec: 509,
    durationSec: 7,
    text: "“הוא לימד אותי מה זה לתת.”",
    position: "bottom",
    size: "medium",
    font: "body",
  },
  {
    label: "s5-quote2",
    fromSec: 532,
    durationSec: 7,
    text: "“החיוך שלו יישאר איתנו תמיד.”",
    position: "bottom",
    size: "medium",
    font: "body",
  },
  {
    label: "s5-quote3",
    fromSec: 557,
    durationSec: 7,
    text: "“אין יום שאני לא חושב עליו.”",
    position: "bottom",
    size: "medium",
    font: "body",
  },

  // ───── Scene 6 (577–630s) ─────
  {
    label: "s6-open",
    fromSec: 580,
    durationSec: 5,
    text: "אח שלי…",
    position: "bottom",
    size: "large",
  },
  {
    label: "s6-line1",
    fromSec: 590,
    durationSec: 8,
    text: ["אי אפשר לסכם אדם כמוך", "ב-12 דקות."],
    position: "bottom",
    size: "medium",
  },
  {
    label: "s6-thanks",
    fromSec: 602,
    durationSec: 6,
    text: "תודה על כל מה שהיית.",
    position: "bottom",
    size: "medium",
  },
  {
    label: "s6-carry",
    fromSec: 613,
    durationSec: 6,
    text: ["אנחנו נמשיך לשאת אותך", "איתנו תמיד."],
    position: "bottom",
    size: "medium",
  },
];
