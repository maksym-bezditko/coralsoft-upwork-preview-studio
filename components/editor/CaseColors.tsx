import {
  CASE_BACKGROUND_SWATCHES,
  CASE_INK_SWATCHES,
  DEFAULT_CASE_STATE,
  type CaseColors as CaseColorValues,
} from "@/lib/case-state";
import { PRIMARY_SWATCHES } from "@/lib/state";
import { Button } from "@/components/ui/button";
import { ColorRow } from "./ColorRow";

interface CaseColorsProps {
  value: CaseColorValues;
  onChange: <K extends keyof CaseColorValues>(
    key: K,
    color: CaseColorValues[K],
  ) => void;
}

/**
 * Every colour on the cover. Borders, card surfaces and the screenshot backing
 * are derived from these in `case.css`, so changing the canvas re-tunes the
 * whole composition rather than leaving hardcoded greys behind.
 */
export function CaseColors({ value, onChange }: CaseColorsProps) {
  return (
    <>
      <ColorRow
        label="Background"
        value={value.background}
        onChange={(v) => onChange("background", v)}
        swatches={CASE_BACKGROUND_SWATCHES}
      />
      <ColorRow
        label="Accent"
        value={value.primary}
        onChange={(v) => onChange("primary", v)}
        swatches={PRIMARY_SWATCHES}
      />
      <ColorRow
        label="Headline + numbers"
        value={value.headlineColor}
        onChange={(v) => onChange("headlineColor", v)}
        swatches={CASE_INK_SWATCHES}
      />
      <ColorRow
        label="Skills"
        value={value.chipColor}
        onChange={(v) => onChange("chipColor", v)}
        swatches={CASE_INK_SWATCHES}
      />
      <ColorRow
        label="Other text"
        value={value.textColor}
        onChange={(v) => onChange("textColor", v)}
        swatches={CASE_INK_SWATCHES}
      />
      <Button
        variant="outline"
        size="full"
        className="mt-3"
        onClick={() => {
          onChange("background", DEFAULT_CASE_STATE.background);
          onChange("primary", DEFAULT_CASE_STATE.primary);
          onChange("headlineColor", DEFAULT_CASE_STATE.headlineColor);
          onChange("chipColor", DEFAULT_CASE_STATE.chipColor);
          onChange("textColor", DEFAULT_CASE_STATE.textColor);
        }}
      >
        Reset to Coralsoft colors
      </Button>
    </>
  );
}
