import { Logo } from "@/components/variants/Logo";
import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { colorVars, type CaseVariantProps } from "./types";
import { Chips, Kicker, ProductLabel, ScreenSlot, Stats } from "./CaseParts";

/** C5 — Coral split. Primary-color canvas, angled dark panel, tall screen right. */
export function C5Coral({
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
    <div className="cse c5" style={colorVars(primary, secondary)}>
      <div className="dark-panel" />
      <div className="top">
        <Logo />
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
