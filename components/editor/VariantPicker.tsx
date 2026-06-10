import { VARIANT_DEFS, type VariantId } from "@/lib/state";
import { cn } from "@/lib/cn";

interface VariantPickerProps {
  value: VariantId;
  onChange: (id: VariantId) => void;
}

/** 2×3 grid of layout tiles. */
export function VariantPicker({ value, onChange }: VariantPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {VARIANT_DEFS.map((v) => {
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
