import { CASE_TAG_LIMITS } from "@/lib/case-state";
import { caseStyleVars, type CaseVariantProps } from "./types";
import { DraggableSlot } from "./DraggableSlot";
import { CaseLogo, Chips, Kicker, ProductLabel, Stats } from "./CaseParts";

/* ============================================================
   The photo family — the same five compositions as the screenshot family,
   with the product screenshot swapped for a person, and the result figures
   swapped for a description. These sell the team rather than the app.

   Every one carries the same set: product label, kicker, headline,
   description, skills, photo. Only the headline and the photo frame always
   render; the rest disappears when its field is cleared.
   ============================================================ */

/** Shared photo frame. `.vis` is positioned by `case.css` per layout. */
function Photo({ props }: { props: CaseVariantProps }) {
  return (
    <div className="vis">
      <DraggableSlot
        src={props.portrait}
        hint={props.portraitHint}
        pos={props.portraitPos}
        mode="offset"
        onPosChange={props.onImagePosChange}
      />
    </div>
  );
}

/** P1 — Editorial · photo. Copy left, tall photo right. */
export function P1Photo(props: CaseVariantProps) {
  const { product, domain, category, metaLine, headline, summary, techTags } = props;
  return (
    <div className="cse p1" style={caseStyleVars(props)}>
      <div className="top">
        <CaseLogo on={props.background} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="main">
        <div className="left">
          <div>
            <ProductLabel product={product} domain={domain} />
            <h2 className="headline">{headline}</h2>
            {summary && <p className="summary">{summary}</p>}
          </div>
          <Chips tags={techTags} limit={CASE_TAG_LIMITS.p1} />
        </div>
        <Photo props={props} />
      </div>
    </div>
  );
}

/** P2 — Bleed · photo. Photo running off the right edge, copy left. */
export function P2Photo(props: CaseVariantProps) {
  const { product, domain, category, metaLine, headline, summary, techTags } = props;
  return (
    <div className="cse p2" style={caseStyleVars(props)}>
      <div className="top">
        <CaseLogo on={props.background} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="body">
        <ProductLabel product={product} domain={domain} />
        <h2 className="headline">{headline}</h2>
        {summary && <p className="summary">{summary}</p>}
        <Chips tags={techTags} limit={CASE_TAG_LIMITS.p2} />
      </div>
      <Photo props={props} />
    </div>
  );
}

/** P3 — Portrait left. Mirror of P1, photo leading. */
export function P3Photo(props: CaseVariantProps) {
  const { product, domain, category, metaLine, headline, summary, techTags } = props;
  return (
    <div className="cse p3" style={caseStyleVars(props)}>
      <div className="top">
        <CaseLogo on={props.background} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <Photo props={props} />
      <div className="body">
        <ProductLabel product={product} domain={domain} />
        <h2 className="headline">{headline}</h2>
        {summary && <p className="summary">{summary}</p>}
        <Chips tags={techTags} limit={CASE_TAG_LIMITS.p3} />
      </div>
    </div>
  );
}

/** P4 — Poster · photo. Numeral + copy left, tinted panel holding the photo. */
export function P4Photo(props: CaseVariantProps) {
  const { product, domain, category, headline, summary, numeral, techTags } = props;
  const subject = [product.trim(), domain.trim()].filter(Boolean).join(" · ");
  const numeralLine = [numeral.trim(), subject].filter(Boolean).join(" — ");
  return (
    <div className="cse p4" style={caseStyleVars(props)}>
      <div className="top">
        <CaseLogo on={props.background} />
        <Kicker category={category} meta="" />
      </div>
      <div className="left">
        {numeralLine && <div className="numeral">{numeralLine}</div>}
        <h2 className="headline">{headline}</h2>
        {summary && <p className="summary">{summary}</p>}
      </div>
      <Chips tags={techTags} limit={CASE_TAG_LIMITS.p4} />
      <div className="panel">
        <Photo props={props} />
      </div>
    </div>
  );
}

/**
 * P6 — Accent full · photo. No panel at all: the accent floods the whole
 * canvas and the photo runs full-height off the right edge, so it can be as
 * large as the cover allows. Roomy enough to keep the result figures.
 */
export function P6Photo(props: CaseVariantProps) {
  const { product, domain, category, metaLine, headline, summary, techTags, stats } =
    props;
  return (
    <div className="cse p6" style={caseStyleVars(props)}>
      <div className="top">
        <CaseLogo on={props.primary} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="left">
        <ProductLabel product={product} domain={domain} />
        <h2 className="headline">{headline}</h2>
        {summary && <p className="summary">{summary}</p>}
      </div>
      <Chips tags={techTags} limit={CASE_TAG_LIMITS.p6} />
      <Stats stats={stats} />
      <Photo props={props} />
    </div>
  );
}

/**
 * P7 — Photo backdrop. The photo isn't an object on the cover, it *is* the
 * cover: the frame is the full canvas, so the person scales as large as the
 * stage allows and the copy sits on top. A cut-out photo lets the accent show
 * through everywhere it is transparent, which is what fuses the two.
 */
export function P7Photo(props: CaseVariantProps) {
  const { product, domain, category, metaLine, headline, summary, techTags, stats } =
    props;
  return (
    <div className="cse p7" style={caseStyleVars(props)}>
      <Photo props={props} />
      <div className="top">
        <CaseLogo on={props.primary} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="left">
        <ProductLabel product={product} domain={domain} />
        <h2 className="headline">{headline}</h2>
        {summary && <p className="summary">{summary}</p>}
      </div>
      <Chips tags={techTags} limit={CASE_TAG_LIMITS.p7} />
      <Stats stats={stats} />
    </div>
  );
}

/** P5 — Accent split · photo. Accent canvas, angled panel, tall photo. */
export function P5Photo(props: CaseVariantProps) {
  const { product, domain, category, metaLine, headline, summary, techTags } = props;
  return (
    <div className="cse p5" style={caseStyleVars(props)}>
      <div className="split" />
      <div className="top">
        <CaseLogo on={props.primary} />
        <Kicker category={category} meta={metaLine} />
      </div>
      <div className="left">
        <ProductLabel product={product} domain={domain} />
        <h2 className="headline">{headline}</h2>
        {summary && <p className="summary">{summary}</p>}
      </div>
      <Chips tags={techTags} limit={CASE_TAG_LIMITS.p5} />
      <Photo props={props} />
    </div>
  );
}
