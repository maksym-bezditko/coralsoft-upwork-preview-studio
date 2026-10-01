import { ArchiveRestore } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface ArchivedLayoutsProps<T extends string> {
  defs: readonly { id: T; num: string; label: string }[];
  archived: readonly T[];
  onRestore: (id: T) => void;
}

/**
 * The bottom of the sidebar, under "Reset all": every archived layout, each
 * one click from going back on the board. Renders nothing while none are.
 */
export function ArchivedLayouts<T extends string>({
  defs,
  archived,
  onRestore,
}: ArchivedLayoutsProps<T>) {
  const items = defs.filter((d) => archived.includes(d.id));
  if (!items.length) return null;
  return (
    <section className="border-t border-line px-6 py-5">
      <SectionHeader>Archived layouts · {items.length}</SectionHeader>
      <ul className="flex flex-col gap-[6px]">
        {items.map((d) => (
          <li
            key={d.id}
            className="flex items-center gap-3 rounded-[10px] border border-line bg-bg-3 py-[8px] pl-[14px] pr-[8px]"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] text-fg-50">
              {d.num}
            </span>
            <span className="flex-1 truncate text-[13px] text-fg-70">{d.label}</span>
            <button
              type="button"
              onClick={() => onRestore(d.id)}
              className="flex shrink-0 cursor-pointer items-center gap-[6px] rounded-md border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-fg-50 transition-colors duration-150 hover:border-pri hover:text-fg"
            >
              <ArchiveRestore size={12} strokeWidth={1.8} />
              Restore
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
