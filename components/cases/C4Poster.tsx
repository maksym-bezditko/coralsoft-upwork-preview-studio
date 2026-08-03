import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { caseStyleVars, type CaseVariantProps } from "./types";
import { CaseLogo, Chips, Kicker, ScreenSlot, Stats } from "./CaseParts";

/**
 * C4 — Editorial poster. Numeral + headline + summary on the left, tinted panel
 * on the right holding the screenshot over a stat list. The header only carries
 * the category: the panel leaves no room for the full meta line.
 */
export function C4Poster(props: CaseVariantProps) {
  const {
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
  } = props;
  const subject = [product.trim(), domain.trim()].filter(Boolean).join(" · ");
  const numeralLine = [numeral.trim(), subject].filter(Boolean).join(" — ");
  return (
    <div className="cse c4" style={caseStyleVars(props)}>
      <div className="top">
        <CaseLogo on={props.background} />
        <Kicker category={category} meta="" />
      </div>
      <div className="left">
        {/* "01 — TRES · jointres.co", assembled from whichever parts survive so
            clearing any one of them doesn't strip a dangling separator. */}
        {numeralLine && <div className="numeral">{numeralLine}</div>}
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
