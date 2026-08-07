import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { caseStyleVars, type CaseVariantProps } from "./types";
import { DraggableSlot } from "./DraggableSlot";
import { Browser, CaseLogo, Chips, Kicker, ProductLabel, Stats } from "./CaseParts";

/** C1 — Editorial master. Copy left, browser mock right, stat strip under. */
export function C1Master(props: CaseVariantProps) {
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
    <div className="cse c1" style={caseStyleVars(props)}>
      <div className="top">
        <CaseLogo on={props.background} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="main">
        <div className="left">
          <div>
            <ProductLabel product={product} domain={domain} />
            <h2 className="headline">{headline}</h2>
          </div>
          <Chips tags={techTags} limit={CASE_TAG_LIMITS.c1} />
        </div>
        <div className="vis">
          <Browser url={urlHint}>
            <DraggableSlot src={screenshot} hint={screenHint} pos={screenPos} onPosChange={props.onImagePosChange} />
          </Browser>
        </div>
      </div>
      <Stats stats={stats} />
    </div>
  );
}
