import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { caseStyleVars, type CaseVariantProps } from "./types";
import { DraggableSlot } from "./DraggableSlot";
import { Browser, CaseLogo, Chips, Kicker, ProductLabel, Stats } from "./CaseParts";

/** C2 — Premium. Browser bleeding off the right edge, stats on a heavy rule. */
export function C2Light(props: CaseVariantProps) {
  const {
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
  } = props;
  return (
    <div className="cse c2" style={caseStyleVars(props)}>
      <div className="top">
        <CaseLogo on={props.background} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="body">
        <ProductLabel product={product} domain={domain} />
        <h2 className="headline">{headline}</h2>
        <Chips tags={techTags} limit={CASE_TAG_LIMITS.c2} />
      </div>
      <div className="vis">
        <Browser url={urlHint}>
          <DraggableSlot src={screenshot} hint={screenHint} pos={screenPos} onPosChange={props.onImagePosChange} />
        </Browser>
      </div>
      <Stats stats={stats} />
    </div>
  );
}
