"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_CASE_STATE,
  loadCaseImage,
  loadCaseState,
  saveCaseImage,
  saveCaseState,
  type CaseEditorState,
} from "@/lib/case-state";
import type { CaseCopy } from "@/lib/case-presets";
import { exportStage, type ExportFormat } from "@/lib/export";
import { CASE_COMPONENTS } from "@/components/cases";
import { CaseSidebar } from "@/components/editor/CaseSidebar";
import { StageChrome } from "@/components/editor/StageChrome";
import { StagePreview } from "@/components/editor/StagePreview";

// Same Upwork Project Catalog stage as the mobile studio — both export at 2×.
const STAGE_W = 1000;
const STAGE_H = 750;

export default function CaseStudies() {
  // Start from defaults so server + first client paint match, then hydrate
  // from localStorage after mount.
  const [state, setState] = useState<CaseEditorState>(DEFAULT_CASE_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [exporting, setExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  // Copy comes from localStorage synchronously; the screenshot is read from
  // IndexedDB, so hydration has to await it before the stage is live.
  useEffect(() => {
    let alive = true;
    void (async () => {
      const base = loadCaseState();
      const screenshot = await loadCaseImage();
      if (!alive) return;
      setState({ ...base, screenshot });
      setHydrated(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Auto-save on every change (only once hydrated, so we never clobber stored
  // state with the initial defaults).
  useEffect(() => {
    if (hydrated) saveCaseState(state);
  }, [state, hydrated]);

  useEffect(() => {
    if (hydrated) void saveCaseImage(state.screenshot);
  }, [state.screenshot, hydrated]);

  const set = useCallback(
    <K extends keyof CaseEditorState>(key: K, value: CaseEditorState[K]) => {
      setState((s) => ({ ...s, [key]: value }));
    },
    [],
  );

  const applyPreset = useCallback((copy: CaseCopy) => {
    setState((s) => ({ ...s, ...copy }));
  }, []);

  const onExport = useCallback(
    async (format: ExportFormat) => {
      const node = exportRef.current;
      if (!node || exporting) return;
      setExporting(true);
      try {
        await exportStage({
          node,
          format,
          title: `${state.product} ${state.headline}`,
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
    [exporting, state.product, state.headline, state.variant],
  );

  const CaseComponent = CASE_COMPONENTS[state.variant];

  return (
    <div className="editor">
      <CaseSidebar
        state={state}
        set={set}
        onApplyPreset={applyPreset}
        onResetAll={() => setState(DEFAULT_CASE_STATE)}
      />

      <main className="stage-wrap">
        <StageChrome
          spec={`${STAGE_W} × ${STAGE_H} · ${state.variant.toUpperCase()}`}
          exporting={exporting}
          onExport={onExport}
        />

        <StagePreview exportRef={exportRef} width={STAGE_W} height={STAGE_H}>
          <CaseComponent {...state} />
        </StagePreview>

        <footer className="relative z-[2] border-t border-line bg-[rgba(15,15,16,0.6)] px-7 py-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-fg-50 backdrop-blur-md">
          Drop a web screenshot in the sidebar slot ·{" "}
          {hydrated ? "Auto-saved to your browser" : "Loading…"}
        </footer>
      </main>
    </div>
  );
}
