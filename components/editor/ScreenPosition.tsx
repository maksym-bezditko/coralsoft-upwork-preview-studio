"use client";

import type { ScreenPos } from "@/lib/case-state";
import { cn } from "@/lib/cn";
import { SliderRow } from "./SliderRow";

/** The nine `background-position` anchors, in reading order. */
const ANCHORS: { x: number; y: number; label: string }[] = [
  { x: 0, y: 0, label: "Top left" },
  { x: 50, y: 0, label: "Top" },
  { x: 100, y: 0, label: "Top right" },
  { x: 0, y: 50, label: "Left" },
  { x: 50, y: 50, label: "Center" },
  { x: 100, y: 50, label: "Right" },
  { x: 0, y: 100, label: "Bottom left" },
  { x: 50, y: 100, label: "Bottom" },
  { x: 100, y: 100, label: "Bottom right" },
];

interface ScreenPositionProps {
  value: ScreenPos;
  onChange: (value: ScreenPos) => void;
}

/**
 * Picks which part of the screenshot the slot shows. Under `cover` a screenshot
 * whose aspect ratio differs from the slot overflows on one axis — a long
 * full-page capture overflows vertically by a lot — so this is what makes it
 * possible to move it and land on the section worth showing. The nine anchors
 * cover the common cases; the sliders reach everything between them.
 */
export function ScreenPosition({ value, onChange }: ScreenPositionProps) {
  return (
    <div className="mt-[10px] flex gap-3">
      <div className="grid shrink-0 grid-cols-3 gap-[3px]">
        {ANCHORS.map((a) => {
          const on = value.x === a.x && value.y === a.y;
          return (
            <button
              key={a.label}
              type="button"
              title={a.label}
              aria-label={a.label}
              aria-pressed={on}
              onClick={() => onChange({ x: a.x, y: a.y })}
              className={cn(
                "flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[7px] border transition-colors duration-150",
                on
                  ? "border-pri bg-[color-mix(in_srgb,var(--color-pri)_18%,transparent)]"
                  : "border-line bg-bg-3 hover:border-line-2",
              )}
            >
              <span
                className={cn(
                  "block h-[6px] w-[6px] rounded-full",
                  on ? "bg-pri" : "bg-[rgba(255,255,255,0.25)]",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="flex flex-1 flex-col justify-center gap-[10px]">
        <SliderRow
          label="X"
          ariaLabel="Horizontal screenshot position"
          value={value.x}
          min={0}
          max={100}
          step={1}
          format={(v) => `${v}%`}
          onChange={(x) => onChange({ ...value, x })}
        />
        <SliderRow
          label="Y"
          ariaLabel="Vertical screenshot position"
          value={value.y}
          min={0}
          max={100}
          step={1}
          format={(v) => `${v}%`}
          onChange={(y) => onChange({ ...value, y })}
        />
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-50">
          Moves long screenshots in the slot
        </p>
      </div>
    </div>
  );
}
