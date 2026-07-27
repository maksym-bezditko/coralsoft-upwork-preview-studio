"use client";

import { CASE_PRESETS, type CaseCopy } from "@/lib/case-presets";

interface CasePresetPickerProps {
  /** Applies the preset's copy, leaving layout, colors and screenshot alone. */
  onApply: (copy: CaseCopy) => void;
}

/**
 * One-click fill from the six production case studies. Deliberately not a
 * controlled selection — after applying, every field stays freely editable, so
 * highlighting a "current" preset would go stale on the first keystroke.
 */
export function CasePresetPicker({ onApply }: CasePresetPickerProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-[6px]">
        {CASE_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onApply(p.copy)}
            className="cursor-pointer rounded-lg border border-line bg-bg-3 px-2 py-[9px] text-[12px] text-fg-70 transition-colors duration-150 hover:border-pri hover:text-fg"
          >
            {p.label}
          </button>
        ))}
      </div>
      <p className="mt-[10px] font-mono text-[9px] uppercase tracking-[0.14em] text-fg-50">
        Fills the copy below · keeps layout, colors + screenshot
      </p>
    </>
  );
}
