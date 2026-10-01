import {
  CASE_TAG_LIMITS,
  CASE_VARIANT_DEFS,
  isCoverCaseVariant,
  usesPortrait,
  usesStats,
  type CaseEditorState,
  type CaseVariantId,
} from "@/lib/case-state";
import type { CaseCopy } from "@/lib/case-presets";
import type { ArchiveApi } from "@/lib/archive";
import { asset } from "@/lib/basePath";
import { SectionHeader } from "./SectionHeader";
import { ModeSwitch } from "./ModeSwitch";
import { VariantPicker } from "./VariantPicker";
import { CasePresetPicker } from "./CasePresetPicker";
import { CaseCopyFields } from "./CaseCopyFields";
import { TagsField } from "./TagsField";
import { StatsFields } from "./StatsFields";
import { CaseColors } from "./CaseColors";
import { CaseFontSizes } from "./CaseFontSizes";
import { DropZone } from "./DropZone";
import { ScreenPosition } from "./ScreenPosition";
import { ResetAll } from "./ResetAll";
import { ArchivedLayouts } from "./ArchivedLayouts";
import { CoverCopyFields, CoverPhotoField } from "./CoverFields";

interface CaseSidebarProps {
  state: CaseEditorState;
  set: <K extends keyof CaseEditorState>(
    key: K,
    value: CaseEditorState[K],
  ) => void;
  onApplyPreset: (copy: CaseCopy) => void;
  archive: ArchiveApi<CaseVariantId>;
  onResetAll: () => void;
}

/** Left rail for the web case-study studio. */
export function CaseSidebar({
  state,
  set,
  onApplyPreset,
  archive,
  onResetAll,
}: CaseSidebarProps) {
  const cover = isCoverCaseVariant(state.variant);
  const photo = usesPortrait(state.variant);
  const stats = usesStats(state.variant);
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
            Web Portfolio Studio
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-50">
            1000 × 750 · web case covers
          </p>
        </div>
      </header>

      <section className="border-b border-line px-6 py-5">
        <ModeSwitch active="web" />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Layout</SectionHeader>
        <VariantPicker
          defs={CASE_VARIANT_DEFS}
          value={state.variant}
          onChange={(id: CaseVariantId) => set("variant", id)}
          archived={archive.archived}
          onArchive={archive.archive}
        />
      </section>

      {cover ? (
        <>
          <section className="border-b border-line px-6 py-5">
            <SectionHeader>Copy</SectionHeader>
            <CoverCopyFields value={state} onChange={set} titleOnly />
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

          <section className="border-b border-line px-6 py-5">
            <SectionHeader>Photo</SectionHeader>
            <CoverPhotoField
              portrait={state.portrait}
              onPortrait={(v) => set("portrait", v)}
              pos={state.coverPhotoPos}
              onPos={(v) => set("coverPhotoPos", v)}
              scale={state.coverPhotoScale}
              onScale={(v) => set("coverPhotoScale", v)}
            />
          </section>
        </>
      ) : (
        <>
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

        {/* The photo family leads with a description instead of result figures,
            except P6, which has room for both. */}
        {stats && (
          <section className="border-b border-line px-6 py-5">
            <SectionHeader>Numbers</SectionHeader>
            <StatsFields stats={state.stats} onChange={(v) => set("stats", v)} />
          </section>
        )}

        <section className="border-b border-line px-6 py-5">
          <SectionHeader>Colors</SectionHeader>
          <CaseColors value={state} onChange={set} />
        </section>

        <section className="border-b border-line px-6 py-5">
          <SectionHeader>Text size</SectionHeader>
          <CaseFontSizes value={state} onChange={set} />
        </section>

        <section className="border-b border-line px-6 py-5">
          <SectionHeader>{photo ? "Photo" : "Screenshot"}</SectionHeader>
          {photo ? (
            <>
              <DropZone
                label="Photo of a person"
                value={state.portrait}
                onChange={(v) => set("portrait", v)}
              />
              {state.portrait && (
                <ScreenPosition
                  value={state.portraitPos}
                  onChange={(v) => set("portraitPos", v)}
                  scale={state.portraitScale}
                  onScaleChange={(v) => set("portraitScale", v)}
                />
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </section>
        </>
      )}

      <section className="px-6 py-5">
        <ResetAll onReset={onResetAll} />
      </section>

      <ArchivedLayouts
        defs={CASE_VARIANT_DEFS}
        archived={archive.archived}
        onRestore={archive.restore}
      />
    </aside>
  );
}
