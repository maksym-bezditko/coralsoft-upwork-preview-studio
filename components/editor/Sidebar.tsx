import {
  VARIANT_DEFS,
  isCoverVariant,
  type EditorState,
  type VariantId,
} from "@/lib/state";
import type { ArchiveApi } from "@/lib/archive";
import { asset } from "@/lib/basePath";
import { SectionHeader } from "./SectionHeader";
import { ModeSwitch } from "./ModeSwitch";
import { VariantPicker } from "./VariantPicker";
import { CopyFields } from "./CopyFields";
import { CoverCopyFields, CoverPhotoField } from "./CoverFields";
import { Colors } from "./Colors";
import { DropZone } from "./DropZone";
import { ImagesSection } from "./ImagesSection";
import { ResetAll } from "./ResetAll";
import { ArchivedLayouts } from "./ArchivedLayouts";

interface SidebarProps {
  state: EditorState;
  set: <K extends keyof EditorState>(key: K, value: EditorState[K]) => void;
  setScreen: (index: number, value: string | null) => void;
  archive: ArchiveApi<VariantId>;
  onResetAll: () => void;
}

/** Full left rail: brand header + all editor sections. */
export function Sidebar({ state, set, setScreen, archive, onResetAll }: SidebarProps) {
  // The portfolio cover has its own copy and a fixed palette; it shares only
  // the images with the classic layouts.
  const cover = isCoverVariant(state.variant);
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
            Mobile Portfolio Studio
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-50">
            1000 × 750 · mobile app cases
          </p>
        </div>
      </header>

      <section className="border-b border-line px-6 py-5">
        <ModeSwitch active="mobile" />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Layout</SectionHeader>
        <VariantPicker
          defs={VARIANT_DEFS}
          value={state.variant}
          onChange={(id: VariantId) => set("variant", id)}
          archived={archive.archived}
          onArchive={archive.archive}
        />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Copy</SectionHeader>
        {cover ? (
          <CoverCopyFields value={state} onChange={set} />
        ) : (
          <CopyFields state={state} onChange={set} />
        )}
      </section>

      {!cover && (
        <section className="border-b border-line px-6 py-5">
          <SectionHeader>Colors</SectionHeader>
          <Colors
            primary={state.primary}
            secondary={state.secondary}
            onPrimary={(v) => set("primary", v)}
            onSecondary={(v) => set("secondary", v)}
          />
        </section>
      )}

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Images</SectionHeader>
        {cover ? (
          <>
            <CoverPhotoField
              portrait={state.portrait}
              onPortrait={(v) => set("portrait", v)}
              pos={state.coverPhotoPos}
              onPos={(v) => set("coverPhotoPos", v)}
              scale={state.coverPhotoScale}
              onScale={(v) => set("coverPhotoScale", v)}
            />
            <div className="mt-[10px] grid grid-cols-3 gap-[6px]">
              {[0, 1, 2].map((i) => (
                <DropZone
                  key={i}
                  compact
                  label={`Screen 0${i + 1}`}
                  value={state.screens[i]}
                  onChange={(v) => setScreen(i, v)}
                />
              ))}
            </div>
          </>
        ) : (
          <ImagesSection
            portrait={state.portrait}
            screens={state.screens}
            onPortrait={(v) => set("portrait", v)}
            onScreen={setScreen}
          />
        )}
      </section>

      <section className="px-6 py-5">
        <ResetAll onReset={onResetAll} />
      </section>

      <ArchivedLayouts
        defs={VARIANT_DEFS}
        archived={archive.archived}
        onRestore={archive.restore}
      />
    </aside>
  );
}
