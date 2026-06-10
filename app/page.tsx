"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_STATE,
  loadState,
  saveState,
  type EditorState,
} from "@/lib/state";
import { exportStage, type ExportFormat } from "@/lib/export";
import { VARIANT_COMPONENTS } from "@/components/variants";
import { Sidebar } from "@/components/editor/Sidebar";
import { StageChrome } from "@/components/editor/StageChrome";
import { StagePreview } from "@/components/editor/StagePreview";

export default function Home() {
  // Start from defaults so server + first client paint match, then hydrate
  // from localStorage after mount.
  const [state, setState] = useState<EditorState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [exporting, setExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  // Auto-save on every change (only once hydrated, so we never clobber stored
  // state with the initial defaults).
  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const set = useCallback(
    <K extends keyof EditorState>(key: K, value: EditorState[K]) => {
      setState((s) => ({ ...s, [key]: value }));
    },
    [],
  );

  const setScreen = useCallback((index: number, value: string | null) => {
    setState((s) => ({
      ...s,
      screens: s.screens.map((x, i) => (i === index ? value : x)) as EditorState["screens"],
    }));
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
          title: state.title,
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
    [exporting, state.title, state.variant],
  );

  const VariantComponent = VARIANT_COMPONENTS[state.variant];

  return (
    <div className="editor">
      <Sidebar
        state={state}
        set={set}
        setScreen={setScreen}
        onResetAll={() => setState(DEFAULT_STATE)}
      />

      <main className="stage-wrap">
        <StageChrome
          variant={state.variant}
          exporting={exporting}
          onExport={onExport}
        />

        <StagePreview exportRef={exportRef}>
          <VariantComponent {...state} />
        </StagePreview>

        <footer className="relative z-[2] border-t border-line bg-[rgba(15,15,16,0.6)] px-7 py-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-fg-50 backdrop-blur-md">
          Drop images in the sidebar slots ·{" "}
          {hydrated ? "Auto-saved to your browser" : "Loading…"}
        </footer>
      </main>
    </div>
  );
}
