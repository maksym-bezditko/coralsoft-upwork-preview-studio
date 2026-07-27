import { cn } from "@/lib/cn";

interface VariantPickerProps<T extends string> {
  /** Layout tiles to render — `VARIANT_DEFS` or `CASE_VARIANT_DEFS`. */
  defs: readonly { id: T; num: string; label: string }[];
  value: T;
  onChange: (id: T) => void;
}

/** 2×3 grid of layout tiles, shared by both studios. */
export function VariantPicker<T extends string>({
  defs,
  value,
  onChange,
}: VariantPickerProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {defs.map((v) => {
        const active = value === v.id;
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onChange(v.id)}
            className={cn(
              "flex cursor-pointer flex-col gap-[6px] rounded-[10px] border p-[12px_14px] text-left transition-all duration-150",
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
            <span className="text-[13px] font-medium leading-[1.2]">
              {v.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
