"use client";

import { Plus, X } from "lucide-react";
import { MAX_STATS, type CaseStat } from "@/lib/case-state";
import { Input } from "@/components/ui/input";

interface StatsFieldsProps {
  stats: CaseStat[];
  onChange: (stats: CaseStat[]) => void;
}

/**
 * The 3-up result numbers. `num` is the big figure ("85K", "28×", "<10s") and
 * `lbl` the caption under it — every layout clamps the caption to 2–3 lines.
 */
export function StatsFields({ stats, onChange }: StatsFieldsProps) {
  const replace = (i: number, patch: Partial<CaseStat>) =>
    onChange(stats.map((s, n) => (n === i ? { ...s, ...patch } : s)));

  return (
    <div className="flex flex-col gap-[10px]">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-[10px] border border-line bg-bg-3 p-[10px]">
          <div className="flex items-center gap-[6px]">
            <Input
              value={stat.num}
              placeholder="85K"
              aria-label={`Stat ${i + 1} number`}
              onChange={(e) => replace(i, { num: e.target.value })}
              className="w-[86px] shrink-0 py-[8px] font-mono text-[13px]"
            />
            <Input
              value={stat.lbl}
              placeholder="What the number means"
              aria-label={`Stat ${i + 1} caption`}
              onChange={(e) => replace(i, { lbl: e.target.value })}
              className="py-[8px]"
            />
            <button
              type="button"
              aria-label={`Remove stat ${i + 1}`}
              onClick={() => onChange(stats.filter((_, n) => n !== i))}
              className="flex h-[34px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-line bg-bg-2 text-fg-50 transition-colors duration-150 hover:border-line-2 hover:text-fg"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ))}

      {stats.length < MAX_STATS && (
        <button
          type="button"
          onClick={() => onChange([...stats, { num: "", lbl: "" }])}
          className="flex cursor-pointer items-center justify-center gap-[6px] rounded-lg border border-dashed border-line-2 bg-transparent py-[8px] text-xs text-fg-50 transition-colors duration-150 hover:border-pri hover:text-fg"
        >
          <Plus size={13} />
          Add number
        </button>
      )}
    </div>
  );
}
