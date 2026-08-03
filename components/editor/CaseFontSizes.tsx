import {
  DEFAULT_CASE_STATE,
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  FONT_SCALE_STEP,
  type CaseFontScales,
} from "@/lib/case-state";
import { Button } from "@/components/ui/button";
import { SliderRow } from "./SliderRow";

const ROLES: { key: keyof CaseFontScales; label: string; hint: string }[] = [
  { key: "headlineScale", label: "Headline", hint: "Headline size" },
  { key: "labelScale", label: "Product", hint: "Product label + domain size" },
  { key: "chipScale", label: "Skills", hint: "Skills chip size" },
  { key: "numberScale", label: "Numbers", hint: "Stat figure size" },
  { key: "textScale", label: "Body", hint: "Meta line, captions and summary size" },
];

interface CaseFontSizesProps {
  value: CaseFontScales;
  onChange: <K extends keyof CaseFontScales>(
    key: K,
    scale: CaseFontScales[K],
  ) => void;
}

/**
 * Per-role type scale. These are percentages of each layout's own size rather
 * than absolute pixels, because the compositions size the same role differently
 * on purpose — the stat figures are 62px on C3 and 25px on C5. A multiplier
 * moves them together without flattening that.
 */
export function CaseFontSizes({ value, onChange }: CaseFontSizesProps) {
  const untouched = ROLES.every((r) => value[r.key] === DEFAULT_CASE_STATE[r.key]);

  return (
    <div className="flex flex-col gap-[11px]">
      {ROLES.map((r) => (
        <SliderRow
          key={r.key}
          label={r.label}
          ariaLabel={r.hint}
          value={value[r.key]}
          min={FONT_SCALE_MIN}
          max={FONT_SCALE_MAX}
          step={FONT_SCALE_STEP}
          format={(v) => `${v}%`}
          onChange={(v) => onChange(r.key, v)}
          labelClass="w-[58px]"
        />
      ))}
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-50">
        Scales each layout&rsquo;s own size · 100% = as designed
      </p>
      <Button
        variant="outline"
        size="full"
        disabled={untouched}
        onClick={() => ROLES.forEach((r) => onChange(r.key, DEFAULT_CASE_STATE[r.key]))}
      >
        Reset text sizes
      </Button>
    </div>
  );
}
