"use client";

import { cn } from "@/lib/cn";

interface SliderRowProps {
  /** Short visible label sitting left of the track. */
  label: string;
  /** Spoken label — the visible one is often a single letter. */
  ariaLabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  /** Right-hand readout, e.g. `(v) => `${v}%``. */
  format: (value: number) => string;
  onChange: (value: number) => void;
  /** Width utility for the label column, so rows in a group line up. */
  labelClass?: string;
}

/** Labelled range input with a fixed-width readout. */
export function SliderRow({
  label,
  ariaLabel,
  value,
  min,
  max,
  step,
  format,
  onChange,
  labelClass = "w-[10px]",
}: SliderRowProps) {
  return (
    <label className="flex items-center gap-[10px]">
      <span
        className={cn("shrink-0 font-mono text-[10px] text-fg-50", labelClass)}
      >
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-[4px] flex-1 cursor-pointer accent-pri"
      />
      <span className="w-[38px] shrink-0 text-right font-mono text-[10px] text-fg-70">
        {format(value)}
      </span>
    </label>
  );
}
