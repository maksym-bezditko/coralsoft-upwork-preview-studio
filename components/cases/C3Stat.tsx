import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { caseStyleVars, type CaseVariantProps } from "./types";
import {
  CaseLogo,
  Chips,
  Kicker,
  ProductLabel,
  ScreenSlot,
  Stats,
  hasStats,
} from "./CaseParts";

/** C3 — Stat hero. Numbers forward: oversized figures along the bottom rule. */
export function C3Stat(props: CaseVariantProps) {
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
    <div className="cse c3" style={caseStyleVars(props)}>
      <div className="top">
        <CaseLogo on={props.background} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="hero">
        <ProductLabel product={product} domain={domain} />
        <h2 className="headline">{headline}</h2>
      </div>
      <Chips tags={techTags} limit={CASE_TAG_LIMITS.c3} />
      <div className="vis">
        <ScreenSlot src={screenshot} hint={screenHint} pos={screenPos} />
      </div>
      {/* The rule underlines the figures, so it goes when they do. */}
      {hasStats(stats) && <div className="rule" />}
      <Stats stats={stats} />
    </div>
  );
}
