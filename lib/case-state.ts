import { CASE_PRESETS } from "./case-presets";
import { IMAGE_KEYS, getImage, putImage } from "./image-store";

/**
 * Two families of cover.
 *
 * `c*` lead with a screenshot of the product that was built. `p*` are the same
 * compositions with the product screenshot swapped for a photo of a person,
 * carrying headline, description and skills instead of result figures — for
 * covers that sell the team rather than the app.
 */
export type CaseVariantId =
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "p1"
  | "p2"
  | "p3"
  | "p4"
  | "p5"
  | "p6"
  | "p7";

/** Whether a layout carries a person photo instead of a product screenshot. */
export function usesPortrait(variant: CaseVariantId): boolean {
  return variant.startsWith("p");
}

/**
 * Whether a layout renders result figures. The photo family leads with a
 * description instead — except P6 and P7, which are roomy enough for both.
 */
export function usesStats(variant: CaseVariantId): boolean {
  return !usesPortrait(variant) || variant === "p6" || variant === "p7";
}

/**
 * Which part of an image stays visible inside its slot, as `background-position`
 * percentages. Under `cover` an image whose aspect ratio differs from the slot
 * overflows on one axis — a long full-page screenshot by a lot, a portrait
 * usually vertically — and this picks which slice shows.
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

/**
 * Every colour on the cover is user-controlled. The compositions hold no fixed
 * palette of their own — `case.css` derives borders, card surfaces and the
 * screenshot backing from these five via `color-mix`, so a layout reads
 * correctly on a white, coral or dark canvas alike.
 */
export interface CaseColors {
  background: string; // canvas
  primary: string; // accent — product label, accent chips, kicker dot
  headlineColor: string; // the h2 + stat numbers
  chipColor: string; // tech / skills chips
  textColor: string; // domain, meta line, stat captions
}

/**
 * Per-role type scale, as a percentage of each layout's tuned size.
 *
 * Deliberately a multiplier rather than an absolute px value: the compositions
 * size the same role differently on purpose (the stat figures are 62px on C3
 * and 25px on C5, because one layout leads with numbers and the other doesn't).
 * A percentage keeps that balance intact while still letting every role be
 * dialled up or down.
 */
export interface CaseFontScales {
  headlineScale: number; // the h2
  labelScale: number; // product name + domain
  chipScale: number; // tech / skills chips
  numberScale: number; // stat figures
  textScale: number; // meta line, stat captions, summary, numeral
}

/** Slider bounds, in percent. */
export const FONT_SCALE_MIN = 60;
export const FONT_SCALE_MAX = 180;
export const FONT_SCALE_STEP = 5;

export interface CaseEditorState extends CaseColors, CaseFontScales {
  variant: CaseVariantId;
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
  screenshot: string | null; // data URL — the web platform screenshot (c*)
  screenPos: ScreenPos; // which part of it the slot shows
  screenHint: string; // placeholder caption while the slot is empty
  portrait: string | null; // data URL — the person photo (p*)
  portraitPos: ScreenPos;
  portraitHint: string;
  /** Photo height as a percent of its frame. 100 = exactly fills the height. */
  portraitScale: number;
}

/** How many chips each layout has room for — the source of truth for both the
 *  composition (`<Chips limit>`) and the sidebar's beyond-the-fold dimming. */
export const CASE_TAG_LIMITS: Record<CaseVariantId, number> = {
  c1: 6,
  c2: 5,
  c3: 4,
  c4: 4,
  c5: 4,
  p1: 6,
  p2: 5,
  p3: 5,
  p4: 4,
  p5: 4,
  p6: 4,
  p7: 4,
};

/** The most any layout can show, so the editor never collects dead rows. */
export const MAX_TAGS = 6;

/** Every layout slices to at most 3 stats. */
export const MAX_STATS = 3;

/** localStorage key — bump the suffix to invalidate persisted state. */
export const CASE_LS_KEY = "coralsoft-case-editor-v1";

/** Bright canvases — white, warm paper, blush, coral, mint, sky. */
export const CASE_BACKGROUND_SWATCHES = [
  "#FFFFFF",
  "#F6F4EE",
  "#FFF1EB",
  "#FE744D",
  "#E8F3EE",
  "#EBF1FF",
];

/** Ink options, including white for use on a coral or dark canvas. */
export const CASE_INK_SWATCHES = [
  "#12121A",
  "#3B3B44",
  "#61616B",
  "#FFFFFF",
  "#FE744D",
  "#1B4D3E",
];

export const DEFAULT_CASE_STATE: CaseEditorState = {
  variant: "c1",
  background: "#FFFFFF",
  primary: "#FE744D",
  headlineColor: "#12121A",
  chipColor: "#3B3B44",
  textColor: "#61616B",
  headlineScale: 100,
  labelScale: 100,
  chipScale: 100,
  numberScale: 100,
  textScale: 100,
  ...CASE_PRESETS[0].copy,
  screenshot: null,
  screenPos: { x: 50, y: 50 },
  portrait: null,
  // A free offset from centre, in percent of the frame — not a crop window,
  // so the photo can be pushed clean off an edge.
  portraitPos: { x: 0, y: 0 },
  portraitHint: "Drop a photo",
  portraitScale: 100,
};

export interface CaseVariantDef {
  id: CaseVariantId;
  num: string;
  label: string;
}

/** Labels describe the composition, not a palette — the colours are a setting. */
export const CASE_VARIANT_DEFS: CaseVariantDef[] = [
  { id: "c1", num: "01", label: "Editorial" },
  { id: "c2", num: "02", label: "Bleed premium" },
  { id: "c3", num: "03", label: "Stat hero" },
  { id: "c4", num: "04", label: "Poster" },
  { id: "c5", num: "05", label: "Accent split" },
  { id: "p1", num: "06", label: "Editorial · photo" },
  { id: "p2", num: "07", label: "Bleed · photo" },
  { id: "p3", num: "08", label: "Portrait left" },
  { id: "p4", num: "09", label: "Poster · photo" },
  { id: "p5", num: "10", label: "Accent split · photo" },
  { id: "p6", num: "11", label: "Accent full · photo" },
  { id: "p7", num: "12", label: "Photo backdrop" },
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
    const merged = {
      ...DEFAULT_CASE_STATE,
      ...parsed,
      screenshot: null,
      portrait: null,
    };
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
    delete persisted.portrait;
    window.localStorage.setItem(CASE_LS_KEY, JSON.stringify(persisted));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

/** Hydrate the screenshot and photo from IndexedDB. */
export async function loadCaseImages(): Promise<
  Pick<CaseEditorState, "screenshot" | "portrait">
> {
  const [screenshot, portrait] = await Promise.all([
    getImage(IMAGE_KEYS.caseScreenshot),
    getImage(IMAGE_KEYS.casePortrait),
  ]);
  return { screenshot, portrait };
}

/** Mirror both images to IndexedDB. Unchanged ones are skipped. */
export async function saveCaseImages(
  screenshot: string | null,
  portrait: string | null,
): Promise<void> {
  await Promise.all([
    putImage(IMAGE_KEYS.caseScreenshot, screenshot),
    putImage(IMAGE_KEYS.casePortrait, portrait),
  ]);
}

/** Photo size slider bounds, in percent of the frame height. */
export const PHOTO_SCALE_MIN = 50;
export const PHOTO_SCALE_MAX = 260;
export const PHOTO_SCALE_STEP = 5;

/**
 * Photo offset bounds, in percent of the frame. Wide enough on both sides to
 * push the photo entirely off any edge — positioning a person on a cover is a
 * composition decision, not something to fence in.
 */
export const PHOTO_OFFSET_MIN = -150;
export const PHOTO_OFFSET_MAX = 150;
