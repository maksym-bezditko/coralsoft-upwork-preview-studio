import Link from "next/link";
import { cn } from "@/lib/cn";

// Both studios render the same 1000 × 750 Upwork stage, so the sub-label
// distinguishes them by what goes in the frame, not by size.
const MODES = [
  { href: "/", label: "Mobile app", spec: "Phone screens" },
  { href: "/cases", label: "Web case", spec: "Desktop screen" },
] as const;

interface ModeSwitchProps {
  /** Which studio is currently open. */
  active: "upwork" | "cases";
}

/**
 * Segmented control between the two studios. Each keeps its own localStorage
 * slot, so switching never disturbs the other's work in progress.
 */
export function ModeSwitch({ active }: ModeSwitchProps) {
  return (
    <div className="grid grid-cols-2 gap-[6px] rounded-[10px] border border-line bg-bg-3 p-[4px]">
      {MODES.map((m, i) => {
        const on = (i === 0 ? "upwork" : "cases") === active;
        return (
          <Link
            key={m.href}
            href={m.href}
            aria-current={on ? "page" : undefined}
            className={cn(
              "flex flex-col gap-[3px] rounded-[7px] px-3 py-[7px] text-left transition-colors duration-150",
              on
                ? "bg-[color-mix(in_srgb,var(--color-pri)_16%,#1E1E20)] text-fg"
                : "text-fg-50 hover:bg-[#25252A] hover:text-fg-70",
            )}
          >
            <span className="text-[13px] font-medium leading-none">{m.label}</span>
            <span className="font-mono text-[9px] tracking-[0.14em]">{m.spec}</span>
          </Link>
        );
      })}
    </div>
  );
}
