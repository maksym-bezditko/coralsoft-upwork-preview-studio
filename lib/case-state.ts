import { CASE_PRESETS } from "./case-presets";
import { IMAGE_KEYS, getImage, putImage } from "./image-store";

export type CaseVariantId = "c1" | "c2" | "c3" | "c4" | "c5";

/**
 * Which part of the screenshot stays visible inside its slot, as
 * `background-position` percentages. Long full-page screenshots overflow the
 * slot badly under `cover`, so y is the one that usually needs moving.
 */
export interface ScreenPos {
  x: number;
  y: number;
}

/** One tech chip. `accent` renders it in the primary color instead of neutral. */
export interface CaseTag {
  text: string;
  accent: boolean;
}

/** One stat cell — a big number and its caption. */
export interface CaseStat {
  num: string;
  lbl: string;
}

export interface CaseEditorState {
  variant: CaseVariantId;
  primary: string; // hex, default '#FE744D'
  secondary: string; // hex, default '#0F0F10'
  product: string;
  domain: string;
  category: string; // leads the kicker line, e.g. "B2B SaaS"
  metaLine: string; // rest of the kicker line, e.g. "Coralsoft · 2026"
  headline: string;
  summary: string; // poster layout only
  numeral: string; // poster layout only
  urlHint: string; // browser address bar / bleed caption
  techTags: CaseTag[];
  stats: CaseStat[];
  screenshot: string | null; // data URL — the web platform screenshot
  screenPos: ScreenPos; // which part of it the slot shows
  screenHint: string; // placeholder caption while the slot is empty
}

/** How many chips each layout has room for — the source of truth for both the
 *  composition (`<Chips limit>`) and the sidebar's beyond-the-fold dimming. */
export const CASE_TAG_LIMITS: Record<CaseVariantId, number> = {
  c1: 6,
  c2: 5,
  c3: 4,
  c4: 4,
  c5: 4,
};

/** The most any layout can show, so the editor never collects dead rows. */
export const MAX_TAGS = 6;

/** Every layout slices to at most 3 stats. */
export const MAX_STATS = 3;

/** localStorage key — bump the suffix to invalidate persisted state. */
export const CASE_LS_KEY = "coralsoft-case-editor-v1";

export const DEFAULT_CASE_STATE: CaseEditorState = {
  variant: "c1",
  primary: "#FE744D",
  secondary: "#0F0F10",
  ...CASE_PRESETS[0].copy,
  screenshot: null,
  screenPos: { x: 50, y: 50 },
};

export interface CaseVariantDef {
  id: CaseVariantId;
  num: string;
  label: string;
}

export const CASE_VARIANT_DEFS: CaseVariantDef[] = [
  { id: "c1", num: "01", label: "Dark editorial" },
  { id: "c2", num: "02", label: "Light premium" },
  { id: "c3", num: "03", label: "Stat hero" },
  { id: "c4", num: "04", label: "Editorial poster" },
  { id: "c5", num: "05", label: "Coral split" },
];

/**
 * Read persisted case copy/layout from localStorage, merged over the defaults.
 * The screenshot comes back null — it lives in IndexedDB, so hydrate it with
 * {@link loadCaseImage}. Returns DEFAULT_CASE_STATE on the server or when
 * nothing valid is stored.
 */
export function loadCaseState(): CaseEditorState {
  if (typeof window === "undefined") return DEFAULT_CASE_STATE;
  try {
    const raw = window.localStorage.getItem(CASE_LS_KEY);
    if (!raw) return DEFAULT_CASE_STATE;
    const parsed = JSON.parse(raw) as Partial<CaseEditorState>;
    const merged = { ...DEFAULT_CASE_STATE, ...parsed, screenshot: null };
    // A layout that has since been retired (or renumbered) would otherwise
    // resolve to an undefined component and blank the stage.
    if (!CASE_VARIANT_DEFS.some((v) => v.id === merged.variant)) {
      merged.variant = DEFAULT_CASE_STATE.variant;
    }
    return merged;
  } catch {
    return DEFAULT_CASE_STATE;
  }
}

/**
 * Persist case copy/layout to localStorage. The screenshot is deliberately
 * excluded: it is kept at full resolution now, so one capture can exceed the
 * whole localStorage quota. {@link saveCaseImage} routes it to IndexedDB.
 */
export function saveCaseState(state: CaseEditorState): void {
  if (typeof window === "undefined") return;
  try {
    const persisted: Partial<CaseEditorState> = { ...state };
    delete persisted.screenshot;
    window.localStorage.setItem(CASE_LS_KEY, JSON.stringify(persisted));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

/** Hydrate the screenshot from IndexedDB. */
export function loadCaseImage(): Promise<string | null> {
  return getImage(IMAGE_KEYS.caseScreenshot);
}

/** Mirror the screenshot to IndexedDB. A no-op when it hasn't changed. */
export function saveCaseImage(screenshot: string | null): Promise<void> {
  return putImage(IMAGE_KEYS.caseScreenshot, screenshot);
}
