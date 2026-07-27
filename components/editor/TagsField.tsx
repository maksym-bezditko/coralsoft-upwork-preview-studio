"use client";

import { Plus, X } from "lucide-react";
import { MAX_TAGS, type CaseTag } from "@/lib/case-state";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";

interface TagsFieldProps {
  tags: CaseTag[];
  /** How many chips the *current* layout renders — rows past it are dimmed. */
  limit: number;
  onChange: (tags: CaseTag[]) => void;
}

/**
 * Editable tech-stack chips. Each row is text + an accent toggle (the dot marks
 * the chip that renders in the primary color) + remove. Rows the current layout
 * has no room for stay editable but are dimmed, so switching to a roomier one
 * (C1 shows 6) brings them back without retyping.
 */
export function TagsField({ tags, limit, onChange }: TagsFieldProps) {
  const replace = (i: number, patch: Partial<CaseTag>) =>
    onChange(tags.map((t, n) => (n === i ? { ...t, ...patch } : t)));

  return (
    <div className="flex flex-col gap-[6px]">
      {tags.map((tag, i) => (
        <div key={i} className="flex items-center gap-[6px]">
          <button
            type="button"
            title={tag.accent ? "Accent chip — click for neutral" : "Neutral chip — click for accent"}
            aria-label={`Toggle accent on ${tag.text || `tag ${i + 1}`}`}
            aria-pressed={tag.accent}
            onClick={() => replace(i, { accent: !tag.accent })}
            className={cn(
              "h-[34px] w-[26px] shrink-0 cursor-pointer rounded-lg border transition-colors duration-150",
              tag.accent
                ? "border-pri bg-[color-mix(in_srgb,var(--color-pri)_20%,transparent)]"
                : "border-line bg-bg-3 hover:border-line-2",
            )}
          >
            <span
              className={cn(
                "mx-auto block h-[7px] w-[7px] rounded-full",
                tag.accent ? "bg-pri" : "bg-[rgba(255,255,255,0.28)]",
              )}
            />
          </button>
          <Input
            value={tag.text}
            placeholder={`Technology ${i + 1}`}
            onChange={(e) => replace(i, { text: e.target.value })}
            className={cn("py-[8px]", i >= limit && "opacity-40")}
          />
          <button
            type="button"
            aria-label={`Remove ${tag.text || `tag ${i + 1}`}`}
            onClick={() => onChange(tags.filter((_, n) => n !== i))}
            className="flex h-[34px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-line bg-bg-3 text-fg-50 transition-colors duration-150 hover:border-line-2 hover:text-fg"
          >
            <X size={13} />
          </button>
        </div>
      ))}

      {tags.length < MAX_TAGS && (
        <button
          type="button"
          onClick={() => onChange([...tags, { text: "", accent: false }])}
          className="flex cursor-pointer items-center justify-center gap-[6px] rounded-lg border border-dashed border-line-2 bg-transparent py-[8px] text-xs text-fg-50 transition-colors duration-150 hover:border-pri hover:text-fg"
        >
          <Plus size={13} />
          Add technology
        </button>
      )}
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-50">
        Dot = accent color · this layout shows {limit}
      </p>
    </div>
  );
}
