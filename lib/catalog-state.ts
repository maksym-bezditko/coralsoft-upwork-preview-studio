import type { CoverCopy, CoverPhoto } from "@/components/covers/PortfolioCover";
import { IMAGE_KEYS, getImage, putImage } from "./image-store";

/** Project-catalog cover layouts. One for now; the picker is ready for more. */
export type CatalogVariantId = "k1";

export interface CatalogEditorState extends CoverCopy, CoverPhoto {
  variant: CatalogVariantId;
  portrait: string | null; // data URL — lives in IndexedDB
}

/** localStorage key — bump the suffix to invalidate persisted state. */
export const CATALOG_LS_KEY = "coralsoft-catalog-editor-v1";

export const DEFAULT_CATALOG_STATE: CatalogEditorState = {
  variant: "k1",
  coverEyebrow: "Project catalog",
  coverTitle: "Service",
  coverAccent: "Title",
  coverDescription: "Short service description goes here",
  portrait: null,
  coverPhotoPos: { x: 0, y: 0 },
  coverPhotoScale: 100,
};

export interface CatalogVariantDef {
  id: CatalogVariantId;
  num: string;
  label: string;
}

export const CATALOG_VARIANT_DEFS: CatalogVariantDef[] = [
  { id: "k1", num: "01", label: "Service · photo" },
];

/** Read persisted copy/layout, merged over the defaults. The photo comes back
 *  null — hydrate it with {@link loadCatalogImages}. */
export function loadCatalogState(): CatalogEditorState {
  if (typeof window === "undefined") return DEFAULT_CATALOG_STATE;
  try {
    const raw = window.localStorage.getItem(CATALOG_LS_KEY);
    if (!raw) return DEFAULT_CATALOG_STATE;
    const parsed = JSON.parse(raw) as Partial<CatalogEditorState>;
    const merged = { ...DEFAULT_CATALOG_STATE, ...parsed, portrait: null };
    if (!CATALOG_VARIANT_DEFS.some((v) => v.id === merged.variant)) {
      merged.variant = DEFAULT_CATALOG_STATE.variant;
    }
    return merged;
  } catch {
    return DEFAULT_CATALOG_STATE;
  }
}

/** Persist copy/layout; the photo goes to IndexedDB via {@link saveCatalogImages}. */
export function saveCatalogState(state: CatalogEditorState): void {
  if (typeof window === "undefined") return;
  try {
    const persisted: Partial<CatalogEditorState> = { ...state };
    delete persisted.portrait;
    window.localStorage.setItem(CATALOG_LS_KEY, JSON.stringify(persisted));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

export async function loadCatalogImages(): Promise<Pick<CatalogEditorState, "portrait">> {
  return { portrait: await getImage(IMAGE_KEYS.catalogPortrait) };
}

export async function saveCatalogImages(portrait: string | null): Promise<void> {
  await putImage(IMAGE_KEYS.catalogPortrait, portrait);
}
