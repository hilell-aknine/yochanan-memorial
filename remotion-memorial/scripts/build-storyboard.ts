// Reads the photo/audio/text manifests and renders a single self-contained
// HTML storyboard at ../storyboard.html. Open it in any browser to see the
// entire 12-minute structure at a glance — every photo as a thumbnail with
// its duration, every song as a bar, every text overlay as a quote block.
//
// Run:  npm run storyboard
//
// The HTML uses file:// URIs to point at the original images, so no extra
// thumbnail generation step is needed.

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

import {
  scene1Photos,
  scene2Childhood,
  scene2Service,
  scene2Friends,
  scene2Events,
  scene3Kids,
  scene3Naama,
  scene3Extended,
  scene4Struggle,
  scene5Legacy,
  scene6Hero,
  type PhotoEntry,
} from "../src/data/photoManifest.js";
import { audioCues, type AudioCue } from "../src/data/audioManifest.js";
import { textCues, type TextCue } from "../src/data/textManifest.js";
import {
  SCENE_DURATIONS,
  FPS,
  INTRO_DURATION_SEC,
  OUTRO_DURATION_SEC,
  TOTAL_SECONDS,
} from "../src/data/timing.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../../"); // .../יוחנן-אליהו-מאמוריאל/

const OUT = path.join(PROJECT_ROOT, "storyboard.html");

type Phase =
  | { kind: "photos"; name: string; photos: PhotoEntry[]; durationSec: number }
  | { kind: "video"; name: string; src: string; durationSec: number };

type SceneSection = {
  id: string;
  title: string;
  start: number;
  duration: number;
  color: string;
  description: string;
  phases: Phase[];
  hero?: PhotoEntry;
  videoSrc?: string;
};

// Compute scene start times by accumulation.
const sceneStarts = (() => {
  const starts: Record<string, number> = {};
  let c = INTRO_DURATION_SEC;
  starts.s1 = c;
  c += SCENE_DURATIONS.scene1Opening;
  starts.s2 = c;
  c += SCENE_DURATIONS.scene2WhoHeWas;
  starts.s3 = c;
  c += SCENE_DURATIONS.scene3FamilyMan;
  starts.s4 = c;
  c += SCENE_DURATIONS.scene4Struggle;
  starts.s5 = c;
  c += SCENE_DURATIONS.scene5Legacy;
  starts.s6 = c;
  c += SCENE_DURATIONS.scene6Ending;
  starts.outro = c;
  return starts;
})();

const SCENES: SceneSection[] = [
  {
    id: "intro",
    title: "פרולוג · סרטון פתיחה",
    start: 0,
    duration: INTRO_DURATION_SEC,
    color: "#1a1a25",
    description: "סרטון פתיחה (assets/videos/intro.mp4) — 64s עם האודיו המקורי שלו.",
    phases: [],
    videoSrc: "assets/videos/intro.mp4",
  },
  {
    id: "s1",
    title: "סצנה 1 · פתיחה",
    start: sceneStarts.s1,
    duration: SCENE_DURATIONS.scene1Opening,
    color: "#0f2742",
    description: "מסך שחור 4 שניות → רצף פורטרטים. 8 תמונות × ~3.5s.",
    phases: [
      { kind: "photos", name: "פורטרטים", photos: scene1Photos, durationSec: SCENE_DURATIONS.scene1Opening - 4 },
    ],
  },
  {
    id: "s2",
    title: "סצנה 2 · מי הוא היה",
    start: sceneStarts.s2,
    duration: SCENE_DURATIONS.scene2WhoHeWas,
    color: "#1a4731",
    description: "שירות → קליפ אישי → חברים → אירועים. קצב חי, ~3s/תמונה.",
    phases: [
      { kind: "photos", name: "ילדות (07)", photos: scene2Childhood, durationSec: 0 },
      { kind: "photos", name: "שירות (05)", photos: scene2Service, durationSec: 33 },
      { kind: "video", name: "אישי", src: "assets/videos/personal.mp4", durationSec: 3.6 },
      { kind: "photos", name: "חברים (06)", photos: scene2Friends, durationSec: 74 },
      { kind: "photos", name: "אירועים (08)", photos: scene2Events, durationSec: 33 },
    ],
  },
  {
    id: "s3",
    title: "סצנה 3 · האיש של המשפחה",
    start: sceneStarts.s3,
    duration: SCENE_DURATIONS.scene3FamilyMan,
    color: "#5b2a39",
    description: "ילדים → קליפ משפחה → נעמה → קליפ משפחה → משפחה רחבה.",
    phases: [
      { kind: "photos", name: "ילדים (03)", photos: scene3Kids, durationSec: 28 },
      { kind: "video", name: "משפחה 1", src: "assets/videos/family-1.mp4", durationSec: 14 },
      { kind: "photos", name: "נעמה (02)", photos: scene3Naama, durationSec: 32 },
      { kind: "video", name: "משפחה 2", src: "assets/videos/family-2.mp4", durationSec: 17.4 },
      { kind: "photos", name: "משפחה רחבה (04)", photos: scene3Extended, durationSec: 36 },
    ],
  },
  {
    id: "s4",
    title: "סצנה 4 · הכוח והמאבק",
    start: sceneStarts.s4,
    duration: SCENE_DURATIONS.scene4Struggle,
    color: "#3a2c4a",
    description: "פורטרטים שקטים. 5 × 6.4s — קצת מעל ה-cap לטובת קריינות.",
    phases: [
      { kind: "photos", name: "פורטרטים שקטים", photos: scene4Struggle, durationSec: SCENE_DURATIONS.scene4Struggle },
    ],
  },
  {
    id: "s5",
    title: "סצנה 5 · מה הוא השאיר",
    start: sceneStarts.s5,
    duration: SCENE_DURATIONS.scene5Legacy,
    color: "#4a3a1f",
    description: "9 תמונות (ילדים + חיוכים אחרונים) → קליפ משפחה 3 לסיום.",
    phases: [
      { kind: "photos", name: "ילדים + חיוכים אחרונים", photos: scene5Legacy, durationSec: 36 },
      { kind: "video", name: "משפחה 3", src: "assets/videos/family-3.mp4", durationSec: 40 },
    ],
  },
  {
    id: "s6",
    title: "סצנה 6 · סיום",
    start: sceneStarts.s6,
    duration: SCENE_DURATIONS.scene6Ending,
    color: "#2a2a2a",
    description: "תמונת hero למשך 56s + 4s כותרת סיום.",
    phases: [],
    hero: scene6Hero,
  },
  {
    id: "outro",
    title: "אפילוג · סרטון סיום",
    start: sceneStarts.outro,
    duration: OUTRO_DURATION_SEC,
    color: "#1a1a25",
    description: "סרטון סיום (assets/videos/outro.mp4) — 26s עם האודיו המקורי שלו.",
    phases: [],
    videoSrc: "assets/videos/outro.mp4",
  },
];

const TOTAL = TOTAL_SECONDS;
// Audio/text cues are SCENE-relative in the manifest. To plot them on the
// master timeline we add the intro offset.
const cueMasterFrom = (sec: number) => sec + INTRO_DURATION_SEC;

function fileUri(relPath: string): string {
  // Output a path RELATIVE to storyboard.html (which lives at project root).
  // Same HTML works locally (file://) and deployed (https://) — the browser
  // resolves the relative URL against its document's URL in both cases.
  // Each path segment is URL-encoded so Hebrew characters survive.
  return relPath
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function distributeFrames(
  photos: PhotoEntry[],
  totalSec: number,
): number[] {
  if (photos.length === 0) return [];
  const totalFrames = totalSec * FPS;
  const explicit = photos.map((p) =>
    p.durationSec ? Math.round(p.durationSec * FPS) : 0,
  );
  const explicitTotal = explicit.reduce((a, b) => a + b, 0);
  const flex = photos.filter((p) => !p.durationSec).length;
  const remaining = Math.max(totalFrames - explicitTotal, 0);
  const perFlex = flex > 0 ? Math.floor(remaining / flex) : 0;
  return photos.map((p, i) =>
    p.durationSec ? explicit[i] : perFlex,
  );
}

// Phases are pre-allocated with explicit durationSec values now.
// (Helper kept for symmetry with previous API; not used.)

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function noteWidget(noteId: string, label: string): string {
  // Stable, content-based id so notes survive regeneration of the storyboard.
  // Renders a small "📝" toggle + a hidden inline editor that JS reveals.
  const safeId = noteId.replace(/"/g, "&quot;");
  return `<button class="note-btn" data-note-id="${safeId}" title="הוסף הערה ל${escapeHtml(label)}">📝</button>
    <div class="note-editor" data-for="${safeId}" hidden>
      <div class="note-editor-label">${escapeHtml(label)}</div>
      <textarea placeholder="הערה / שינוי שצריך לבצע…"></textarea>
    </div>`;
}

// ────────────────────────────────────────────────────────────────────────
// Render HTML
// ────────────────────────────────────────────────────────────────────────

function renderTimelineStrip(): string {
  const blocks = SCENES.map((s) => {
    const widthPct = (s.duration / TOTAL) * 100;
    return `<div class="strip-block" style="width:${widthPct}%; background:${s.color};">
      <div class="strip-label">${escapeHtml(s.title.split("·")[0].trim())}</div>
      <div class="strip-time">${fmtTime(s.start)} – ${fmtTime(s.start + s.duration)}</div>
    </div>`;
  }).join("");

  // Audio bars (one row beneath) — use master-timeline positions
  const audio = audioCues
    .map((c) => {
      const left = (cueMasterFrom(c.fromSec) / TOTAL) * 100;
      const width = (c.durationSec / TOTAL) * 100;
      return `<div class="audio-bar" style="left:${left}%; width:${width}%;" title="${escapeHtml(c.label ?? c.src)}">
        ${escapeHtml((c.label ?? c.src).replace(/^[^-]*-/, ""))}
      </div>`;
    })
    .join("");

  // Text cue dots
  const textDots = textCues
    .map((c) => {
      const left = (cueMasterFrom(c.fromSec) / TOTAL) * 100;
      const width = (c.durationSec / TOTAL) * 100;
      const txt = Array.isArray(c.text) ? c.text.join(" / ") : c.text;
      return `<div class="text-bar" style="left:${left}%; width:${width}%;" title="${escapeHtml(txt)}"></div>`;
    })
    .join("");

  return `
    <div class="timeline-wrap">
      <div class="strip">${blocks}</div>
      <div class="audio-row">${audio}</div>
      <div class="text-row">${textDots}</div>
    </div>
  `;
}

function renderScene(scene: SceneSection): string {
  // Render the intro/outro video block before all the photo logic.
  if (scene.videoSrc) {
    return `
      <section class="scene video-scene" id="${scene.id}" style="border-color:${scene.color};">
        <header class="scene-header" style="background:${scene.color};">
          <div class="header-row">
            <div>
              <h2>${escapeHtml(scene.title)}</h2>
              <div class="scene-time">${fmtTime(scene.start)} – ${fmtTime(scene.start + scene.duration)} <small>(${scene.duration}s)</small></div>
              <div class="scene-desc">${escapeHtml(scene.description)}</div>
            </div>
            ${noteWidget(`scene:${scene.id}`, scene.title)}
          </div>
        </header>
        <div class="sub">
          <video src="${fileUri(scene.videoSrc)}" controls preload="metadata" style="max-width:100%; border-radius:8px;"></video>
        </div>
      </section>
    `;
  }

  // Scene-local audio/text cues (cues use scene-relative times; add the
  // intro offset so they line up with the scene's master-timeline range).
  const sceneEnd = scene.start + scene.duration;
  const sceneAudio = audioCues.find(
    (c) =>
      cueMasterFrom(c.fromSec) < sceneEnd &&
      cueMasterFrom(c.fromSec) + c.durationSec > scene.start,
  );

  const sceneText = textCues.filter(
    (c) =>
      cueMasterFrom(c.fromSec) >= scene.start &&
      cueMasterFrom(c.fromSec) < sceneEnd,
  );

  const subBlocks = scene.phases
    .map((phase) => {
      if (phase.kind === "video") {
        return `<div class="sub video-clip">
          <h3>🎥 קליפ: ${escapeHtml(phase.name)} <small>${phase.durationSec.toFixed(1)}s · אודיו מקורי</small>
            ${noteWidget(`clip:${scene.id}:${phase.name}`, `קליפ "${phase.name}" (${scene.title})`)}
          </h3>
          <video src="${fileUri(phase.src)}" controls preload="metadata" style="max-width:480px; max-height:270px; border-radius:8px;"></video>
        </div>`;
      }
      // photos phase
      if (phase.photos.length === 0) {
        return `<div class="sub empty">
          <h3>${escapeHtml(phase.name)}</h3>
          <div class="empty-msg">⚠️ ריק — אין תמונות מסווגות</div>
        </div>`;
      }
      const frames = distributeFrames(phase.photos, phase.durationSec);
      const items = phase.photos
        .map((p, i) => {
          const dur = frames[i] / FPS;
          const text = p.text
            ? `<div class="caption">${escapeHtml(p.text)}</div>`
            : "";
          const filename = p.src.split("/").pop() ?? "";
          return `<div class="photo-card">
            <img src="${fileUri(p.src)}" loading="lazy" />
            <div class="photo-meta">
              <span class="photo-dur">${dur.toFixed(1)}s</span>
              <span class="photo-name">${escapeHtml(filename)}</span>
              ${noteWidget(`photo:${p.src}`, `תמונה ${filename} (${phase.name})`)}
            </div>
            ${text}
          </div>`;
        })
        .join("");
      const avgDur =
        frames.reduce((a, b) => a + b, 0) / FPS / Math.max(phase.photos.length, 1);
      return `<div class="sub">
        <h3>${escapeHtml(phase.name)} <small>${phase.photos.length} תמונות · ${phase.durationSec.toFixed(0)}s · ממוצע ${avgDur.toFixed(1)}s/תמונה</small>
          ${noteWidget(`sub:${scene.id}:${phase.name}`, `תת-קטגוריה: ${phase.name} (${scene.title})`)}
        </h3>
        <div class="photos">${items}</div>
      </div>`;
    })
    .join("");

  const heroDur = scene.duration - 4; // hero photo until last 4s for title card
  const heroBlock = scene.hero
    ? `<div class="sub">
        <h3>תמונת hero ${noteWidget(`hero:${scene.id}`, "תמונת hero (סצנה 6)")}</h3>
        <div class="photos">
          <div class="photo-card hero">
            <img src="${fileUri(scene.hero.src)}" loading="lazy" />
            <div class="photo-meta">
              <span class="photo-dur">${heroDur}s</span>
              <span class="photo-name">${escapeHtml(scene.hero.src.split("/").pop() ?? "")}</span>
            </div>
          </div>
        </div>
        <div class="hero-tail">+ 4s כרטיס סיום: <strong>יוחנן אליהו פרדג' ז"ל · 1988–2026</strong>
          ${noteWidget(`title-card`, "כרטיס הסיום (שם + תאריכים)")}
        </div>
      </div>`
    : "";

  const audioBlock = sceneAudio
    ? `<div class="track audio-track">
        🎵 ${escapeHtml(sceneAudio.label ?? sceneAudio.src)}
        <small>(volume ${sceneAudio.volume ?? 0.85}, fade-in ${sceneAudio.fadeInSec ?? 1.5}s, fade-out ${sceneAudio.fadeOutSec ?? 2}s)</small>
        ${noteWidget(`audio:${sceneAudio.label ?? sceneAudio.src}`, `שיר: ${sceneAudio.label ?? sceneAudio.src}`)}
      </div>`
    : `<div class="track audio-track muted">— ללא שיר —</div>`;

  const textBlock =
    sceneText.length > 0
      ? `<div class="track text-track">
          ${sceneText
            .map((c) => {
              const txt = Array.isArray(c.text) ? c.text.join(" / ") : c.text;
              const offset = (cueMasterFrom(c.fromSec) - scene.start).toFixed(0);
              const cueId = c.label ?? `text@${c.fromSec}`;
              return `<div class="text-cue">
                <span class="text-when">+${offset}s · ${c.durationSec}s</span>
                <span class="text-body">${escapeHtml(txt)}</span>
                ${noteWidget(`text:${cueId}`, `טקסט: "${txt.slice(0, 40)}${txt.length > 40 ? "…" : ""}"`)}
              </div>`;
            })
            .join("")}
        </div>`
      : "";

  return `
    <section class="scene" id="${scene.id}" style="border-color:${scene.color};">
      <header class="scene-header" style="background:${scene.color};">
        <div>
          <h2>${escapeHtml(scene.title)}</h2>
          <div class="scene-time">${fmtTime(scene.start)} – ${fmtTime(scene.start + scene.duration)} <small>(${scene.duration}s)</small></div>
          <div class="scene-desc">${escapeHtml(scene.description)}</div>
        </div>
      </header>
      ${audioBlock}
      ${textBlock}
      ${subBlocks}
      ${heroBlock}
    </section>
  `;
}

const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8" />
<title>Storyboard · יוחנן אליהו פרדג' ז"ל</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: "Frank Ruhl Libre", "Heebo", "Arial Hebrew", system-ui, sans-serif;
    background: #0d0d10;
    color: #e8e6df;
    margin: 0;
    padding: 32px 48px 80px;
    line-height: 1.45;
  }
  h1 {
    font-size: 44px;
    margin: 0 0 8px;
    color: #f5f1e8;
    letter-spacing: 1px;
  }
  .stats {
    display: flex;
    gap: 24px;
    margin: 20px 0 32px;
    color: #8a8780;
    font-size: 14px;
  }
  .stats span { background: #1c1c20; padding: 6px 14px; border-radius: 8px; }

  .timeline-wrap {
    position: sticky;
    top: 0;
    z-index: 5;
    background: #0d0d10;
    padding: 12px 0;
    margin: 0 -48px 24px;
    padding: 12px 48px 24px;
    border-bottom: 1px solid #25252a;
  }
  .strip { display: flex; height: 56px; border-radius: 6px; overflow: hidden; }
  .strip-block {
    color: #fff;
    padding: 6px 10px;
    font-size: 13px;
    border-left: 1px solid rgba(255,255,255,0.1);
    overflow: hidden;
  }
  .strip-block:first-child { border-left: none; }
  .strip-label { font-weight: 700; }
  .strip-time { font-size: 11px; opacity: 0.85; }

  .audio-row, .text-row {
    position: relative;
    height: 22px;
    margin-top: 6px;
    background: #1a1a1f;
    border-radius: 4px;
  }
  .audio-bar, .text-bar {
    position: absolute;
    height: 100%;
    border-radius: 3px;
    font-size: 10px;
    color: #fff;
    padding: 3px 6px;
    overflow: hidden;
    white-space: nowrap;
  }
  .audio-bar { background: rgba(212,175,55,0.55); border: 1px solid rgba(212,175,55,0.9); }
  .text-bar { background: rgba(80,140,200,0.45); border: 1px solid rgba(80,140,200,0.85); height: 12px; top: 5px; }

  .scene {
    border-right: 4px solid;
    border-radius: 12px;
    background: #15151a;
    margin-bottom: 32px;
    overflow: hidden;
  }
  .scene-header {
    padding: 18px 24px;
    color: #fff;
  }
  .scene-header h2 { margin: 0 0 4px; font-size: 28px; }
  .scene-time { font-size: 14px; opacity: 0.9; }
  .scene-desc { margin-top: 8px; font-size: 14px; opacity: 0.85; max-width: 800px; }

  .track {
    padding: 12px 24px;
    background: #1a1a1f;
    border-bottom: 1px solid #25252a;
    font-size: 14px;
  }
  .audio-track { color: #d4af37; }
  .audio-track.muted { color: #5a5a5a; }
  .text-track { background: #181820; }
  .text-cue {
    display: flex;
    gap: 14px;
    padding: 6px 0;
    align-items: baseline;
    border-bottom: 1px dashed #2a2a30;
  }
  .text-cue:last-child { border: none; }
  .text-when { font-size: 11px; color: #6a8aaa; min-width: 80px; }
  .text-body { color: #e8e6df; }

  .sub {
    padding: 16px 24px 24px;
    border-bottom: 1px solid #25252a;
  }
  .sub:last-child { border-bottom: none; }
  .sub h3 {
    margin: 0 0 12px;
    font-size: 18px;
    color: #c8c5bc;
  }
  .sub h3 small {
    font-size: 13px;
    font-weight: 400;
    color: #7a7770;
    margin-right: 12px;
  }
  .empty-msg {
    color: #c08a40;
    background: #2a1f10;
    padding: 10px 14px;
    border-radius: 6px;
    border-right: 3px solid #c08a40;
  }
  .sub.video-clip {
    background: linear-gradient(to right, rgba(212,175,55,0.05), transparent);
    border-right: 3px solid #d4af37;
  }
  .sub.video-clip h3 { color: #d4af37; }
  .sub.video-clip video {
    background: #000;
    border: 1px solid #2a2a30;
  }

  /* ───── Notes system ───── */
  .note-btn {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.18);
    color: #c8c5bc;
    padding: 2px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    margin-inline-start: 8px;
    vertical-align: middle;
    transition: all 0.15s;
  }
  .note-btn:hover { background: rgba(255,255,255,0.18); }
  .note-btn.has-note {
    background: #d4af37;
    color: #1a1408;
    border-color: #d4af37;
    font-weight: 700;
  }
  .note-editor {
    margin-top: 10px;
    padding: 10px 12px;
    background: rgba(212,175,55,0.06);
    border: 1px solid rgba(212,175,55,0.35);
    border-radius: 8px;
  }
  .note-editor-label {
    color: #d4af37;
    font-size: 12px;
    margin-bottom: 6px;
    direction: rtl;
  }
  .note-editor textarea {
    width: 100%;
    min-height: 64px;
    background: #0d0d10;
    color: #f5f1e8;
    border: 1px solid #2a2a30;
    border-radius: 6px;
    padding: 10px 12px;
    font-family: inherit;
    font-size: 14px;
    direction: rtl;
    resize: vertical;
    line-height: 1.45;
  }
  .note-editor textarea:focus {
    outline: none;
    border-color: #d4af37;
  }

  .header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  #notes-bar {
    position: fixed;
    top: 12px;
    left: 12px;
    background: #d4af37;
    color: #1a1408;
    padding: 10px 16px;
    border-radius: 10px;
    display: none;
    align-items: center;
    gap: 12px;
    z-index: 30;
    box-shadow: 0 6px 20px rgba(0,0,0,0.6);
    direction: rtl;
    font-weight: 700;
  }
  #notes-bar.active { display: flex; }
  #notes-bar button {
    background: #1a1408;
    color: #d4af37;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
    font-family: inherit;
  }
  #notes-bar button:hover { background: #000; }
  #notes-count { background: #1a1408; color: #d4af37; padding: 2px 8px; border-radius: 999px; }

  #global-note {
    background: #15151a;
    border: 1px solid #2a2a30;
    border-radius: 10px;
    padding: 16px 20px;
    margin: 24px 0;
  }
  #global-note h3 {
    margin: 0 0 8px;
    color: #d4af37;
    font-size: 16px;
  }
  #global-note textarea {
    width: 100%;
    min-height: 80px;
    background: #0d0d10;
    color: #f5f1e8;
    border: 1px solid #2a2a30;
    border-radius: 6px;
    padding: 10px 12px;
    font-family: inherit;
    font-size: 14px;
    direction: rtl;
    resize: vertical;
    line-height: 1.45;
  }

  .photos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }
  .photo-card {
    background: #0d0d10;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
  .photo-card img {
    display: block;
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    background: #000;
  }
  .photo-card.hero img { aspect-ratio: 4/3; }
  .photo-meta {
    display: flex;
    justify-content: space-between;
    padding: 6px 8px;
    font-size: 11px;
    color: #8a8780;
  }
  .photo-dur {
    color: #d4af37;
    font-weight: 700;
  }
  .photo-name {
    direction: ltr;
    font-family: ui-monospace, Consolas, monospace;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
    white-space: nowrap;
  }
  .caption {
    position: absolute;
    bottom: 28px;
    right: 8px;
    left: 8px;
    background: rgba(0,0,0,0.75);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: #f5f1e8;
    text-align: center;
  }
  .hero-tail {
    margin-top: 16px;
    padding: 10px 14px;
    background: #0d0d10;
    border-radius: 6px;
    font-size: 14px;
    color: #c8c5bc;
  }

  nav {
    position: fixed;
    bottom: 16px;
    left: 16px;
    background: rgba(20,20,24,0.95);
    padding: 8px 12px;
    border-radius: 8px;
    display: flex;
    gap: 8px;
    z-index: 10;
  }
  nav a {
    color: #d4af37;
    text-decoration: none;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    background: #25252a;
  }
  nav a:hover { background: #35353a; }
</style>
</head>
<body>

<div id="notes-bar">
  <span id="notes-count">0</span>
  <span>הערות שמורות</span>
  <button id="copy-notes" type="button">📋 העתק</button>
  <button id="download-notes" type="button">💾 הורד</button>
  <button id="clear-notes" type="button">🗑️ נקה</button>
</div>

<h1>סטוריבורד · סרט זיכרון ליוחנן אליהו פרדג' ז"ל</h1>
<div class="stats">
  <span>אורך כולל: ${fmtTime(TOTAL)} (${TOTAL}s)</span>
  <span>תמונות: ${
    scene1Photos.length +
    scene2Childhood.length +
    scene2Service.length +
    scene2Friends.length +
    scene2Events.length +
    scene3Kids.length +
    scene3Naama.length +
    scene3Extended.length +
    scene4Struggle.length +
    scene5Legacy.length +
    1
  }</span>
  <span>סרטונים: 6 (2 מסביב + 4 משפחה)</span>
  <span>שירים: ${audioCues.length}</span>
  <span>טקסטים: ${textCues.length}</span>
</div>

${renderTimelineStrip()}

<div id="global-note">
  <h3>הערה כללית על הסרט</h3>
  <textarea data-global-note placeholder="הערות כלליות, רעיונות, שינויים שחוצים סצנות…"></textarea>
</div>

${SCENES.map(renderScene).join("")}

<nav>
  ${SCENES.map((s) => `<a href="#${s.id}">${s.title.split("·")[0].trim()}</a>`).join("")}
</nav>

<script>
(function () {
  const KEY = "memorial-storyboard-note:";
  const GLOBAL_KEY = KEY + "__global__";

  function loadAll() {
    const out = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(KEY)) out[k.slice(KEY.length)] = localStorage.getItem(k) || "";
    }
    return out;
  }

  function save(id, val) {
    const k = KEY + id;
    if (val.trim()) localStorage.setItem(k, val);
    else localStorage.removeItem(k);
    refreshBadges();
    refreshBar();
  }

  function refreshBadges() {
    document.querySelectorAll(".note-btn").forEach((btn) => {
      const id = btn.dataset.noteId;
      const k = KEY + id;
      btn.classList.toggle("has-note", !!localStorage.getItem(k));
    });
  }

  function refreshBar() {
    const all = loadAll();
    let count = 0;
    for (const k in all) if (all[k] && all[k].trim()) count++;
    document.getElementById("notes-count").textContent = count;
    document.getElementById("notes-bar").classList.toggle("active", count > 0);
  }

  function describe(id) {
    if (id === "__global__") return "הערה כללית";
    if (id.startsWith("photo:")) return "תמונה: " + id.slice(6);
    if (id.startsWith("text:")) return "טקסט: " + id.slice(5);
    if (id.startsWith("audio:")) return "שיר: " + id.slice(6);
    if (id.startsWith("scene:")) return "סצנה: " + id.slice(6);
    if (id.startsWith("hero:")) return "Hero: " + id.slice(5);
    if (id.startsWith("sub:")) return "תת-קטגוריה: " + id.slice(4);
    if (id === "title-card") return "כרטיס סיום";
    return id;
  }

  function exportMarkdown() {
    const all = loadAll();
    const ids = Object.keys(all).filter((k) => all[k] && all[k].trim());
    if (ids.length === 0) return "אין הערות.";
    const lines = ["# הערות לסרט זיכרון יוחנן אליהו פרדג' ז\\"ל", "", "תאריך: " + new Date().toLocaleString("he-IL"), ""];
    // Put global first
    if (all["__global__"]) {
      lines.push("## הערה כללית");
      lines.push("");
      lines.push(all["__global__"].trim());
      lines.push("");
    }
    ids
      .filter((id) => id !== "__global__")
      .sort()
      .forEach((id) => {
        lines.push("## " + describe(id));
        lines.push("");
        lines.push(all[id].trim());
        lines.push("");
      });
    return lines.join("\\n");
  }

  // Toggle editor on note button click
  document.addEventListener("click", function (e) {
    const t = e.target;
    if (t.classList && t.classList.contains("note-btn")) {
      const id = t.dataset.noteId;
      const ed = document.querySelector('.note-editor[data-for="' + CSS.escape(id) + '"]');
      if (ed) {
        const willOpen = ed.hidden;
        ed.hidden = !willOpen;
        if (willOpen) {
          const ta = ed.querySelector("textarea");
          if (ta) ta.focus();
        }
      }
    }
  });

  // Save on textarea blur or input (debounced)
  let saveTimer = null;
  document.addEventListener("input", function (e) {
    const t = e.target;
    if (t.tagName === "TEXTAREA") {
      let id;
      if (t.dataset.globalNote !== undefined) id = "__global__";
      else if (t.parentElement && t.parentElement.classList.contains("note-editor")) {
        id = t.parentElement.dataset.for;
      }
      if (!id) return;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () { save(id, t.value); }, 300);
    }
  });

  // Initial: hydrate textareas from localStorage
  function hydrate() {
    document.querySelectorAll(".note-editor").forEach(function (ed) {
      const id = ed.dataset.for;
      const v = localStorage.getItem(KEY + id);
      if (v) ed.querySelector("textarea").value = v;
    });
    const g = document.querySelector("[data-global-note]");
    if (g) g.value = localStorage.getItem(GLOBAL_KEY) || "";
    refreshBadges();
    refreshBar();
  }

  // Buttons
  document.getElementById("copy-notes").addEventListener("click", function () {
    const md = exportMarkdown();
    navigator.clipboard.writeText(md).then(
      function () { alert("ההערות הועתקו ל-clipboard.\\nהדבק אותן בצ'אט כדי שאני אקרא ואטפל."); },
      function () { window.prompt("העתק ידנית:", md); },
    );
  });

  document.getElementById("download-notes").addEventListener("click", function () {
    const md = exportMarkdown();
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "memorial-notes-" + new Date().toISOString().slice(0, 16).replace(":", "") + ".md";
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("clear-notes").addEventListener("click", function () {
    if (!confirm("למחוק את כל ההערות? פעולה זו לא ניתנת לביטול.")) return;
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(KEY)) keys.push(k);
    }
    keys.forEach(function (k) { localStorage.removeItem(k); });
    document.querySelectorAll(".note-editor textarea").forEach(function (ta) { ta.value = ""; });
    const g = document.querySelector("[data-global-note]");
    if (g) g.value = "";
    refreshBadges();
    refreshBar();
  });

  hydrate();
})();
</script>

</body>
</html>`;

fs.writeFileSync(OUT, html, "utf8");
console.log(`Storyboard written → ${OUT}`);
console.log(`Open with:  start "" "${OUT}"`);
