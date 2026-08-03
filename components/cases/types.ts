import type { CSSProperties } from "react";
import type {
  CaseColors,
  CaseFontScales,
  CaseStat,
  CaseTag,
  ScreenPos,
} from "@/lib/case-state";

/** Props shared by every case-study cover composition. */
export interface CaseVariantProps extends CaseColors, CaseFontScales {
  product: string;
  domain: string;
  category: string;
  metaLine: string;
  headline: string;
  summary: string;
  numeral: string;
  urlHint: string;
  techTags: CaseTag[];
  stats: CaseStat[];
  screenshot: string | null;
  screenPos: ScreenPos;
  screenHint: string;
}

/**
 * Pipes the editor's colours and type scale into the custom properties
 * `case.css` reads. Everything else in the stylesheet — borders, card surfaces,
 * the screenshot backing, chip fills — is `color-mix`ed off the colours, and
 * every size is multiplied by the matching scale, so no composition carries a
 * hardcoded palette or type scale of its own.
 */
export function caseStyleVars({
  background,
  primary,
  headlineColor,
  chipColor,
  textColor,
  headlineScale,
  labelScale,
  chipScale,
  numberScale,
  textScale,
}: CaseColors & CaseFontScales): CSSProperties {
  return {
    "--bg": background,
    "--pri": primary,
    "--head": headlineColor,
    "--chip": chipColor,
    "--text": textColor,
    "--fs-head": headlineScale,
    "--fs-label": labelScale,
    "--fs-chip": chipScale,
    "--fs-num": numberScale,
    "--fs-text": textScale,
  } as CSSProperties;
}
