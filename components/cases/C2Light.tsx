import { Logo } from "@/components/variants/Logo";
import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { colorVars, type CaseVariantProps } from "./types";
import { Browser, Chips, Kicker, ProductLabel, ScreenSlot, Stats } from "./CaseParts";

/** C2 — Light premium. Warm off-white canvas, browser bleeding off the right edge. */
export function C2Light({
  primary,
  secondary,
  product,
  domain,
  category,
  metaLine,
  headline,
  urlHint,
  techTags,
  stats,
  screenshot,
  screenPos,
  screenHint,
}: CaseVariantProps) {
  return (
    <div className="cse c2" style={colorVars(primary, secondary)}>
      <div className="top">
        <Logo variant="light" />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="body">
        <ProductLabel product={product} domain={domain} />
        <h2 className="headline">{headline}</h2>
        <Chips tags={techTags} limit={CASE_TAG_LIMITS.c2} />
      </div>
      <div className="vis">
        <Browser url={urlHint || domain || "coralsoft.io"}>
          <ScreenSlot src={screenshot} hint={screenHint} pos={screenPos} />
        </Browser>
      </div>
      <Stats stats={stats} />
    </div>
  );
}
