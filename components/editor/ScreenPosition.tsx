"use client";

import {
  PHOTO_OFFSET_MAX,
  PHOTO_OFFSET_MIN,
  PHOTO_SCALE_MAX,
  PHOTO_SCALE_MIN,
  PHOTO_SCALE_STEP,
  type ScreenPos,
} from "@/lib/case-state";
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
  /** Optional size control, shown for photos. */
  scale?: number;
  onScaleChange?: (scale: number) => void;
}

/**
 * Picks which part of the screenshot the slot shows. Under `cover` a screenshot
 * whose aspect ratio differs from the slot overflows on one axis — a long
 * full-page capture overflows vertically by a lot — so this is what makes it
 * possible to move it and land on the section worth showing. The nine anchors
 * cover the common cases; the sliders reach everything between them.
 */
export function ScreenPosition({
  value,
  onChange,
  scale,
  onScaleChange,
}: ScreenPositionProps) {
  // A photo is translated freely rather than cropped, so the nine anchors —
  // which name corners of a crop window — have nothing to point at. It gets
  // offset sliders that run past the frame on both sides instead.
  const free = scale !== undefined && onScaleChange !== undefined;
  if (free) {
    return (
      <div className="mt-[10px] flex flex-col gap-[10px]">
        <SliderRow
          label="X"
          ariaLabel="Horizontal photo offset"
          value={value.x}
          min={PHOTO_OFFSET_MIN}
          max={PHOTO_OFFSET_MAX}
          step={1}
          format={(v) => `${v > 0 ? "+" : ""}${v}%`}
          onChange={(x) => onChange({ ...value, x })}
        />
        <SliderRow
          label="Y"
          ariaLabel="Vertical photo offset"
          value={value.y}
          min={PHOTO_OFFSET_MIN}
          max={PHOTO_OFFSET_MAX}
          step={1}
          format={(v) => `${v > 0 ? "+" : ""}${v}%`}
          onChange={(y) => onChange({ ...value, y })}
        />
        <SliderRow
          label="Size"
          ariaLabel="Photo size"
          value={scale}
          min={PHOTO_SCALE_MIN}
          max={PHOTO_SCALE_MAX}
          step={PHOTO_SCALE_STEP}
          format={(v) => `${v}%`}
          onChange={onScaleChange}
          labelClass="w-[26px]"
        />
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-50">
            Or drag the photo on the cover
          </p>
          <button
            type="button"
            onClick={() => {
              onChange({ x: 0, y: 0 });
              onScaleChange(100);
            }}
            className="shrink-0 cursor-pointer rounded-md border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-fg-50 transition-colors duration-150 hover:border-line-2 hover:text-fg"
          >
            Recenter
          </button>
        </div>
      </div>
    );
  }

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
          Or drag the image on the cover
        </p>
      </div>
    </div>
  );
}
