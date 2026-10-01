import {
  CATALOG_VARIANT_DEFS,
  type CatalogEditorState,
  type CatalogVariantId,
} from "@/lib/catalog-state";
import type { ArchiveApi } from "@/lib/archive";
import { asset } from "@/lib/basePath";
import { SectionHeader } from "./SectionHeader";
import { ModeSwitch } from "./ModeSwitch";
import { VariantPicker } from "./VariantPicker";
import { CoverCopyFields, CoverPhotoField } from "./CoverFields";
import { ResetAll } from "./ResetAll";
import { ArchivedLayouts } from "./ArchivedLayouts";

interface CatalogSidebarProps {
  state: CatalogEditorState;
  set: <K extends keyof CatalogEditorState>(
    key: K,
    value: CatalogEditorState[K],
  ) => void;
  archive: ArchiveApi<CatalogVariantId>;
  onResetAll: () => void;
}

/** Left rail for the project-catalog studio. */
export function CatalogSidebar({ state, set, archive, onResetAll }: CatalogSidebarProps) {
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
            Project Catalog Studio
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-50">
            1000 × 750 · service covers
          </p>
        </div>
      </header>

      <section className="border-b border-line px-6 py-5">
        <ModeSwitch active="catalog" />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Layout</SectionHeader>
        <VariantPicker
          defs={CATALOG_VARIANT_DEFS}
          value={state.variant}
          onChange={(id: CatalogVariantId) => set("variant", id)}
          archived={archive.archived}
          onArchive={archive.archive}
        />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Copy</SectionHeader>
        <CoverCopyFields value={state} onChange={set} />
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

      <section className="px-6 py-5">
        <ResetAll onReset={onResetAll} />
      </section>

      <ArchivedLayouts
        defs={CATALOG_VARIANT_DEFS}
        archived={archive.archived}
        onRestore={archive.restore}
      />
    </aside>
  );
}
