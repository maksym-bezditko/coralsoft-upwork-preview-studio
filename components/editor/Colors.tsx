import {
  DEFAULT_STATE,
  PRIMARY_SWATCHES,
  SECONDARY_SWATCHES,
} from "@/lib/state";
import { Button } from "@/components/ui/button";
import { ColorRow } from "./ColorRow";

interface ColorsProps {
  primary: string;
  secondary: string;
  onPrimary: (value: string) => void;
  onSecondary: (value: string) => void;
}

/** Both color rows plus a "reset to brand" button. */
export function Colors({
  primary,
  secondary,
  onPrimary,
  onSecondary,
}: ColorsProps) {
  return (
    <>
      <ColorRow
        label="Primary (accent)"
        value={primary}
        onChange={onPrimary}
        swatches={PRIMARY_SWATCHES}
      />
      <ColorRow
        label="Secondary (dark)"
        value={secondary}
        onChange={onSecondary}
        swatches={SECONDARY_SWATCHES}
      />
      <Button
        variant="outline"
        size="full"
        className="mt-3"
        onClick={() => {
          onPrimary(DEFAULT_STATE.primary);
          onSecondary(DEFAULT_STATE.secondary);
        }}
      >
        Reset to Coralsoft colors
      </Button>
    </>
  );
}
