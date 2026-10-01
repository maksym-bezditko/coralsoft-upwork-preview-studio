import { Archive } from "lucide-react";
import { cn } from "@/lib/cn";

interface VariantPickerProps<T extends string> {
  /** Layout tiles to render — `VARIANT_DEFS`, `CASE_VARIANT_DEFS`, … */
  defs: readonly { id: T; num: string; label: string }[];
  value: T;
  onChange: (id: T) => void;
  /** Layouts hidden from the board; they're listed under "Reset all" instead. */
  archived?: readonly T[];
  /** Omit to hide the per-tile archive control. */
  onArchive?: (id: T) => void;
}

/** 2-column grid of layout tiles, shared by every studio. */
export function VariantPicker<T extends string>({
  defs,
  value,
  onChange,
  archived = [],
  onArchive,
}: VariantPickerProps<T>) {
  const visible = defs.filter((v) => !archived.includes(v.id));
  // The board always keeps one tile: with nothing left there'd be nothing to
  // render on the stage.
  const canArchive = Boolean(onArchive) && visible.length > 1;
  return (
    <div className="grid grid-cols-2 gap-2">
      {visible.map((v) => {
        const active = value === v.id;
        return (
          <div key={v.id} className="group relative">
            <button
              type="button"
              onClick={() => onChange(v.id)}
              className={cn(
                "flex w-full cursor-pointer flex-col gap-[6px] rounded-[10px] border p-[12px_14px] text-left transition-all duration-150",
                active
                  ? "border-pri bg-[color-mix(in_srgb,var(--color-pri)_12%,#1E1E20)]"
                  : "border-line bg-bg-3 hover:border-line-2 hover:bg-[#25252A]",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.18em]",
                  active ? "text-pri" : "text-fg-50",
                )}
              >
                {v.num}
              </span>
              <span className="pr-4 text-[13px] font-medium leading-[1.2]">
                {v.label}
              </span>
            </button>
            {canArchive && (
              <button
                type="button"
                title="Archive layout"
                aria-label={`Archive ${v.label}`}
                onClick={() => onArchive?.(v.id)}
                className="absolute right-[6px] top-[6px] flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-fg-50 opacity-0 transition-opacity duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:text-fg focus-visible:opacity-100 group-hover:opacity-100"
              >
                <Archive size={13} strokeWidth={1.8} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
