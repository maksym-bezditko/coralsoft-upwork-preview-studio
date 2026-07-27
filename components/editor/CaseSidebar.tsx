import {
  CASE_TAG_LIMITS,
  CASE_VARIANT_DEFS,
  type CaseEditorState,
  type CaseVariantId,
} from "@/lib/case-state";
import type { CaseCopy } from "@/lib/case-presets";
import { asset } from "@/lib/basePath";
import { SectionHeader } from "./SectionHeader";
import { ModeSwitch } from "./ModeSwitch";
import { VariantPicker } from "./VariantPicker";
import { CasePresetPicker } from "./CasePresetPicker";
import { CaseCopyFields } from "./CaseCopyFields";
import { TagsField } from "./TagsField";
import { StatsFields } from "./StatsFields";
import { Colors } from "./Colors";
import { DropZone } from "./DropZone";
import { ScreenPosition } from "./ScreenPosition";
import { ResetAll } from "./ResetAll";

interface CaseSidebarProps {
  state: CaseEditorState;
  set: <K extends keyof CaseEditorState>(
    key: K,
    value: CaseEditorState[K],
  ) => void;
  onApplyPreset: (copy: CaseCopy) => void;
  onResetAll: () => void;
}

/** Left rail for the web case-study studio. */
export function CaseSidebar({
  state,
  set,
  onApplyPreset,
  onResetAll,
}: CaseSidebarProps) {
  return (
    <aside className="side overflow-x-hidden overflow-y-auto border-r border-line bg-bg-2">
      <header className="flex items-center gap-[14px] border-b border-line px-6 pb-5 pt-6">
        <img
          src={asset("/assets/logo-white.svg")}
          alt="Coralsoft"
          className="block h-8 w-auto shrink-0"
        />
        <div>
          <h1 className="m-0 text-base font-medium tracking-[-0.005em]">
            Web Case Study Studio
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-50">
            1000 × 750 · web case covers
          </p>
        </div>
      </header>

      <section className="border-b border-line px-6 py-5">
        <ModeSwitch active="cases" />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Layout</SectionHeader>
        <VariantPicker
          defs={CASE_VARIANT_DEFS}
          value={state.variant}
          onChange={(id: CaseVariantId) => set("variant", id)}
        />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Case study</SectionHeader>
        <CasePresetPicker onApply={onApplyPreset} />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Copy</SectionHeader>
        <CaseCopyFields state={state} onChange={set} />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Technologies</SectionHeader>
        <TagsField
          tags={state.techTags}
          limit={CASE_TAG_LIMITS[state.variant]}
          onChange={(v) => set("techTags", v)}
        />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Numbers</SectionHeader>
        <StatsFields stats={state.stats} onChange={(v) => set("stats", v)} />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Colors</SectionHeader>
        <Colors
          primary={state.primary}
          secondary={state.secondary}
          onPrimary={(v) => set("primary", v)}
          onSecondary={(v) => set("secondary", v)}
        />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Screenshot</SectionHeader>
        <DropZone
          label="Web platform screenshot"
          value={state.screenshot}
          onChange={(v) => set("screenshot", v)}
        />
        {state.screenshot && (
          <ScreenPosition
            value={state.screenPos}
            onChange={(v) => set("screenPos", v)}
          />
        )}
      </section>

      <section className="px-6 py-5">
        <ResetAll onReset={onResetAll} />
      </section>
    </aside>
  );
}
