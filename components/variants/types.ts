import type { CSSProperties } from "react";

/** Props shared by every variant composition. */
export interface VariantProps {
  primary: string;
  secondary: string;
  title: string;
  role: string;
  codeTag: string;
  kicker: string;
  portrait: string | null;
  screens: [string | null, string | null, string | null];
  hints: [string, string, string];
}

/**
 * Inline style that pipes the editor colors into the CSS custom properties the
 * variant stylesheet reads (`--pri` / `--sec`). Cast keeps TS happy about the
 * custom property names.
 */
export function colorVars(primary: string, secondary: string): CSSProperties {
  return { "--pri": primary, "--sec": secondary } as CSSProperties;
}
