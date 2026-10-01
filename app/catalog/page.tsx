"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CATALOG_VARIANT_DEFS,
  DEFAULT_CATALOG_STATE,
  loadCatalogImages,
  loadCatalogState,
  saveCatalogImages,
  saveCatalogState,
  type CatalogEditorState,
  type CatalogVariantId,
} from "@/lib/catalog-state";
import type { ScreenPos } from "@/lib/case-state";
import { useArchive, useKeepSelectionVisible } from "@/lib/archive";
import { exportStage, type ExportFormat } from "@/lib/export";
import { PortfolioCover } from "@/components/covers/PortfolioCover";
import { CatalogSidebar } from "@/components/editor/CatalogSidebar";
import { StageChrome } from "@/components/editor/StageChrome";
import { StagePreview } from "@/components/editor/StagePreview";

const STAGE_W = 1000;
const STAGE_H = 750;

export default function Catalog() {
  // Start from defaults so server + first client paint match, then hydrate
  // from localStorage after mount.
  const [state, setState] = useState<CatalogEditorState>(DEFAULT_CATALOG_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [exporting, setExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const archive = useArchive<CatalogVariantId>("catalog");

  useEffect(() => {
    let alive = true;
    void (async () => {
      const base = loadCatalogState();
      const images = await loadCatalogImages();
      if (!alive) return;
      setState({ ...base, ...images });
      setHydrated(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (hydrated) saveCatalogState(state);
  }, [state, hydrated]);

  useEffect(() => {
    if (hydrated) void saveCatalogImages(state.portrait);
  }, [state.portrait, hydrated]);

  const set = useCallback(
    <K extends keyof CatalogEditorState>(key: K, value: CatalogEditorState[K]) => {
      setState((s) => ({ ...s, [key]: value }));
    },
    [],
  );

  const selectVariant = useCallback(
    (id: CatalogVariantId) => set("variant", id),
    [set],
  );
  useKeepSelectionVisible(CATALOG_VARIANT_DEFS, archive.archived, state.variant, selectVariant);

  const onPhotoPosChange = useCallback(
    (pos: ScreenPos) => set("coverPhotoPos", pos),
    [set],
  );

  const onExport = useCallback(
    async (format: ExportFormat) => {
      const node = exportRef.current;
      if (!node || exporting) return;
      setExporting(true);
      try {
        await exportStage({
          node,
          format,
          title: `${state.coverTitle} ${state.coverAccent}`,
          variant: state.variant,
        });
      } catch (err) {
        console.error("export failed", err);
        window.alert(
          `Export failed: ${err instanceof Error ? err.message : "unknown error"}`,
        );
      } finally {
        setExporting(false);
      }
    },
    [exporting, state.coverTitle, state.coverAccent, state.variant],
  );

  return (
    <div className="editor">
      <CatalogSidebar
        state={state}
        set={set}
        archive={archive}
        onResetAll={() => setState(DEFAULT_CATALOG_STATE)}
      />

      <main className="stage-wrap">
        <StageChrome
          spec={`${STAGE_W} × ${STAGE_H} · ${state.variant.toUpperCase()}`}
          exporting={exporting}
          onExport={onExport}
        />

        <StagePreview exportRef={exportRef} width={STAGE_W} height={STAGE_H}>
          <PortfolioCover kind="catalog" {...state} onPhotoPosChange={onPhotoPosChange} />
        </StagePreview>

        <footer className="relative z-[2] border-t border-line bg-[rgba(15,15,16,0.6)] px-7 py-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-fg-50 backdrop-blur-md">
          Drop a developer photo in the sidebar ·{" "}
          {hydrated ? "Auto-saved to your browser" : "Loading…"}
        </footer>
      </main>
    </div>
  );
}
