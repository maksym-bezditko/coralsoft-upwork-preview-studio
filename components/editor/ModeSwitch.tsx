import Link from "next/link";
import { cn } from "@/lib/cn";

export type StudioId = "web" | "mobile" | "catalog";

// Every studio renders the same 1000 × 750 Upwork stage, so the sub-label
// distinguishes them by what goes in the frame, not by size.
const MODES: { id: StudioId; href: string; label: string; spec: string }[] = [
  { id: "web", href: "/cases", label: "Portfolio · Web app", spec: "Desktop screen" },
  { id: "mobile", href: "/", label: "Portfolio · Mobile app", spec: "Phone screens" },
  { id: "catalog", href: "/catalog", label: "Project catalog", spec: "Service cover" },
];

interface ModeSwitchProps {
  /** Which studio is currently open. */
  active: StudioId;
}

/**
 * Segmented control between the studios. Each keeps its own localStorage slot,
 * so switching never disturbs another's work in progress.
 */
export function ModeSwitch({ active }: ModeSwitchProps) {
  return (
    <div className="grid grid-cols-3 gap-[4px] rounded-[10px] border border-line bg-bg-3 p-[4px]">
      {MODES.map((m) => {
        const on = m.id === active;
        return (
          <Link
            key={m.href}
            href={m.href}
            aria-current={on ? "page" : undefined}
            className={cn(
              "flex flex-col gap-[4px] rounded-[7px] px-[9px] py-[7px] text-left transition-colors duration-150",
              on
                ? "bg-[color-mix(in_srgb,var(--color-pri)_16%,#1E1E20)] text-fg"
                : "text-fg-50 hover:bg-[#25252A] hover:text-fg-70",
            )}
          >
            <span className="text-[12px] font-medium leading-[1.15]">{m.label}</span>
            <span className="font-mono text-[8.5px] tracking-[0.1em]">{m.spec}</span>
          </Link>
        );
      })}
    </div>
  );
}
