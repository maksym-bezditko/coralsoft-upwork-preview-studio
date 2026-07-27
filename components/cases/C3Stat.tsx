import { Logo } from "@/components/variants/Logo";
import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { colorVars, type CaseVariantProps } from "./types";
import { Chips, Kicker, ProductLabel, ScreenSlot, Stats } from "./CaseParts";

/** C3 — Stat hero. Numbers forward: oversized figures along the bottom rule. */
export function C3Stat({
  primary,
  secondary,
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
}: CaseVariantProps) {
  return (
    <div className="cse c3" style={colorVars(primary, secondary)}>
      <div className="top">
        <Logo />
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
      <div className="rule" />
      <Stats stats={stats} />
    </div>
  );
}
