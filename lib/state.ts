import { IMAGE_KEYS, getImage, putImage } from "./image-store";

export type VariantId = "v1" | "v2" | "v3" | "v4" | "v5" | "v6";

export interface EditorState {
  variant: VariantId;
  primary: string; // hex, default '#FE744D'
  secondary: string; // hex, default '#0F0F10'
  title: string;
  role: string;
  codeTag: string;
  kicker: string;
  portrait: string | null; // data URL
  screens: [string | null, string | null, string | null];
  hints: [string, string, string]; // placeholder strings for each screen
}

/** localStorage key — bump the suffix to invalidate persisted state. */
export const LS_KEY = "coralsoft-upwork-editor-v1";

export const DEFAULT_STATE: EditorState = {
  variant: "v1",
  primary: "#FE744D",
  secondary: "#0F0F10",
  title: "Full-Cycle Mobile App Development",
  role: "React Native Developer",
  codeTag: "CRSF-001",
  kicker: "Service",
  portrait: null,
  screens: [null, null, null],
  hints: ["Drop screen 01", "Drop screen 02", "Drop screen 03"],
};

export interface VariantDef {
  id: VariantId;
  num: string;
  label: string;
}

export const VARIANT_DEFS: VariantDef[] = [
  { id: "v1", num: "01", label: "Dark editorial" },
  { id: "v2", num: "02", label: "Light premium" },
  { id: "v3", num: "03", label: "Poster" },
  { id: "v4", num: "04", label: "Coral forward" },
  { id: "v5", num: "05", label: "Code terminal" },
  { id: "v6", num: "06", label: "Diagonal split" },
];

export const PRIMARY_SWATCHES = [
  "#FE744D",
  "#2A6FDB",
  "#1F8A5B",
  "#E13C7B",
  "#7C5CFF",
  "#F3B43B",
];

export const SECONDARY_SWATCHES = [
  "#0F0F10",
  "#0A0E1A",
  "#1A1413",
  "#0E1F1A",
  "#1A0E2A",
  "#222222",
];

/**
 * Read persisted copy/layout state from localStorage, merged over the defaults.
 * Image slots come back null — they live in IndexedDB, so hydrate them with
 * {@link loadImages}. Returns DEFAULT_STATE on the server or when nothing
 * valid is stored.
 */
export function loadState(): EditorState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<EditorState>;
    return { ...DEFAULT_STATE, ...parsed, portrait: null, screens: [null, null, null] };
  } catch {
    return DEFAULT_STATE;
  }
}

/**
 * Persist copy/layout to localStorage. Images are deliberately excluded: they
 * are kept at full resolution now, so a single one can exceed the whole
 * localStorage quota. {@link saveImages} routes them to IndexedDB instead.
 */
export function saveState(state: EditorState): void {
  if (typeof window === "undefined") return;
  try {
    const persisted: Partial<EditorState> = { ...state };
    delete persisted.portrait;
    delete persisted.screens;
    window.localStorage.setItem(LS_KEY, JSON.stringify(persisted));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

/** Hydrate the image slots from IndexedDB. */
export async function loadImages(): Promise<Pick<EditorState, "portrait" | "screens">> {
  const [portrait, ...screens] = await Promise.all([
    getImage(IMAGE_KEYS.portrait),
    ...IMAGE_KEYS.screens.map(getImage),
  ]);
  return {
    portrait,
    screens: [screens[0], screens[1], screens[2]],
  };
}

/** Mirror the image slots to IndexedDB. Unchanged slots are skipped. */
export async function saveImages(
  portrait: EditorState["portrait"],
  screens: EditorState["screens"],
): Promise<void> {
  await Promise.all([
    putImage(IMAGE_KEYS.portrait, portrait),
    ...IMAGE_KEYS.screens.map((key, i) => putImage(key, screens[i])),
  ]);
}

/** Read a File into a data URL (used by the drop zones). */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
