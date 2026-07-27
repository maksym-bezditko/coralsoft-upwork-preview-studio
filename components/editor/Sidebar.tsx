import { VARIANT_DEFS, type EditorState, type VariantId } from "@/lib/state";
import { asset } from "@/lib/basePath";
import { SectionHeader } from "./SectionHeader";
import { ModeSwitch } from "./ModeSwitch";
import { VariantPicker } from "./VariantPicker";
import { CopyFields } from "./CopyFields";
import { Colors } from "./Colors";
import { ImagesSection } from "./ImagesSection";
import { ResetAll } from "./ResetAll";

interface SidebarProps {
  state: EditorState;
  set: <K extends keyof EditorState>(key: K, value: EditorState[K]) => void;
  setScreen: (index: number, value: string | null) => void;
  onResetAll: () => void;
}

/** Full left rail: brand header + all editor sections. */
export function Sidebar({ state, set, setScreen, onResetAll }: SidebarProps) {
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
            Upwork Preview Studio
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-50">
            1000 × 750 · monochrome editorial
          </p>
        </div>
      </header>

      <section className="border-b border-line px-6 py-5">
        <ModeSwitch active="upwork" />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Layout</SectionHeader>
        <VariantPicker
          defs={VARIANT_DEFS}
          value={state.variant}
          onChange={(id: VariantId) => set("variant", id)}
        />
      </section>

      <section className="border-b border-line px-6 py-5">
        <SectionHeader>Copy</SectionHeader>
        <CopyFields state={state} onChange={set} />
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
        <SectionHeader>Images</SectionHeader>
        <ImagesSection
          portrait={state.portrait}
          screens={state.screens}
          onPortrait={(v) => set("portrait", v)}
          onScreen={setScreen}
        />
      </section>

      <section className="px-6 py-5">
        <ResetAll onReset={onResetAll} />
      </section>
    </aside>
  );
}
