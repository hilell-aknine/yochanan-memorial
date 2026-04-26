// Text overlays on the SCENES timeline (scene 1 starts at 0s).
//
// Scene boundaries (scenes timeline, 4s cap + family clips):
//   Scene 1 — 0:00–0:32    (  0– 32s)
//   Scene 2 — 0:32–2:43    ( 32–163s)   captions also attached to scene2Friends photos
//   Scene 3 — 2:43–5:19    (163–319s)
//   Scene 4 — 5:19–5:51    (319–351s)
//   Scene 5 — 5:51–7:07    (351–427s)
//   Scene 6 — 7:07–7:39    (427–459s)   28s closing montage + 4s title

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
  animation?: TextAnimation;
  label?: string;
};

export const textCues: TextCue[] = [
  // ───── Scene 1 (0–32s) · Opening narration ─────
  {
    label: "s1-line1",
    fromSec: 4,
    durationSec: 7,
    text: ["יש אנשים שנכנסים לחדר", "ומיד הכול נהיה יותר חם."],
    position: "bottom",
    size: "medium",
  },
  {
    label: "s1-line2",
    fromSec: 13,
    durationSec: 5,
    text: "כזה הוא היה.",
    position: "bottom",
    size: "large",
  },
  {
    label: "s1-line3",
    fromSec: 21,
    durationSec: 9,
    text: ["חיוך אחד שלו —", "וכל הלב נמס."],
    position: "bottom",
    size: "medium",
  },

  // ───── Scene 3 (163–319s) · Family man ─────
  {
    label: "s3-intro",
    fromSec: 175,
    durationSec: 8,
    text: "אבל מעל הכול — הוא היה בית.",
    position: "bottom",
    size: "medium",
  },
  {
    label: "s3-father",
    fromSec: 215,
    durationSec: 5,
    text: "אבא מושלם.",
    position: "bottom",
    size: "large",
  },
  {
    label: "s3-husband",
    fromSec: 232,
    durationSec: 5,
    text: "בעל אוהב.",
    position: "bottom",
    size: "large",
  },
  {
    label: "s3-son",
    fromSec: 275,
    durationSec: 5,
    text: "בן מסור.",
    position: "bottom",
    size: "large",
  },
  {
    label: "s3-brother",
    fromSec: 295,
    durationSec: 6,
    text: "אח שתמיד נמצא.",
    position: "bottom",
    size: "large",
  },

  // ───── Scene 4 (319–351s) · Struggle ─────
  {
    label: "s4-line1",
    fromSec: 321,
    durationSec: 9,
    text: ["מאחורי החיוך הגדול,", "היו גם מלחמות שאי אפשר היה לראות."],
    position: "bottom",
    size: "medium",
  },
  {
    label: "s4-line2",
    fromSec: 332,
    durationSec: 6,
    text: "הוא נשא כאב בשקט.",
    position: "bottom",
    size: "medium",
  },
  {
    label: "s4-line3",
    fromSec: 340,
    durationSec: 9,
    text: ["נלחם כמו שתמיד נלחם —", "עד שכבר לא נשאר לו כוח."],
    position: "bottom",
    size: "medium",
  },

  // ───── Scene 5 (351–427s) · What he left ─────
  // Quotes appear during photos (first 36s), before family-3 video starts.
  {
    label: "s5-quote1",
    fromSec: 355,
    durationSec: 7,
    text: "“הוא לימד אותי מה זה לתת.”",
    position: "bottom",
    size: "medium",
    font: "body",
  },
  {
    label: "s5-quote2",
    fromSec: 366,
    durationSec: 7,
    text: "“החיוך שלו יישאר איתנו תמיד.”",
    position: "bottom",
    size: "medium",
    font: "body",
  },
  {
    label: "s5-quote3",
    fromSec: 377,
    durationSec: 7,
    text: "“אין יום שאני לא חושב עליו.”",
    position: "bottom",
    size: "medium",
    font: "body",
  },

  // ───── Scene 6 (427–459s) · Closing montage + farewell ─────
  // Cues live during the 28s photo block; title card occupies last 4s.
  {
    label: "s6-open",
    fromSec: 428,
    durationSec: 5,
    text: "אח שלי…",
    position: "bottom",
    size: "large",
  },
  {
    label: "s6-line1",
    fromSec: 434,
    durationSec: 8,
    text: ["אי אפשר לסכם אדם כמוך", "ב-12 דקות."],
    position: "bottom",
    size: "medium",
  },
  {
    label: "s6-thanks",
    fromSec: 443,
    durationSec: 5,
    text: "תודה על כל מה שהיית.",
    position: "bottom",
    size: "medium",
  },
  {
    label: "s6-carry",
    fromSec: 449,
    durationSec: 6,
    text: ["אנחנו נמשיך לשאת אותך", "איתנו תמיד."],
    position: "bottom",
    size: "medium",
  },
];
