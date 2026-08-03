import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { caseStyleVars, type CaseVariantProps } from "./types";
import { CaseLogo, Chips, Kicker, ProductLabel, ScreenSlot, Stats } from "./CaseParts";

/**
 * C5 — Accent split. The canvas is the accent colour and the angled panel is
 * the background colour, so the two swap roles here. The wordmark sits on the
 * accent side, so the wordmark picks its variant from the accent colour.
 */
export function C5Coral(props: CaseVariantProps) {
  const {
    product,
    domain,
    category,
    metaLine,
    headline,
    techTags,
    stats,
    screenshot,
    screenPos,
    screenHint,
  } = props;
  return (
    <div className="cse c5" style={caseStyleVars(props)}>
      <div className="split" />
      <div className="top">
        <CaseLogo on={props.primary} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="left">
        <ProductLabel product={product} domain={domain} />
        <h2 className="headline">{headline}</h2>
      </div>
      <Chips tags={techTags} limit={CASE_TAG_LIMITS.c5} />
      <Stats stats={stats} />
      <div className="vis">
        <ScreenSlot src={screenshot} hint={screenHint} pos={screenPos} />
      </div>
    </div>
  );
}
