import { Logo } from "@/components/variants/Logo";
import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { colorVars, type CaseVariantProps } from "./types";
import { Chips, Kicker, ScreenSlot, Stats } from "./CaseParts";

/**
 * C4 — Editorial poster. Numeral + headline + summary on the left, tinted panel
 * on the right holding the screenshot over a stat list. The header only carries
 * the category: the panel leaves no room for the full meta line.
 */
export function C4Poster({
  primary,
  secondary,
  product,
  domain,
  category,
  headline,
  summary,
  numeral,
  techTags,
  stats,
  screenshot,
  screenPos,
  screenHint,
}: CaseVariantProps) {
  return (
    <div className="cse c4" style={colorVars(primary, secondary)}>
      <div className="top">
        <Logo />
        <Kicker category={category} meta="" />
      </div>
      <div className="left">
        <div className="numeral">
          {numeral} — {product}
          {domain && ` · ${domain}`}
        </div>
        <h2 className="headline">{headline}</h2>
        {summary && <p className="summary">{summary}</p>}
      </div>
      <Chips tags={techTags} limit={CASE_TAG_LIMITS.c4} />
      <div className="panel">
        <div className="vis">
          <ScreenSlot src={screenshot} hint={screenHint} pos={screenPos} />
        </div>
        <Stats stats={stats} />
      </div>
    </div>
  );
}
