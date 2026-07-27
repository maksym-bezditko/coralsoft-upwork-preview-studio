import type { CaseStat, CaseTag, ScreenPos } from "@/lib/case-state";

export { colorVars } from "@/components/variants/types";

/** Props shared by every case-study cover composition. */
export interface CaseVariantProps {
  primary: string;
  secondary: string;
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
