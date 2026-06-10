import { colorVars, type VariantProps } from "./types";
import { ImageSlot } from "./ImageSlot";
import { PhoneTrio } from "./PhoneTrio";
import { Logo } from "./Logo";

const META = "Coralsoft · Product studio · 2026";

/** V2 — Light premium. V1 composition inverted onto a warm off-white canvas. */
export function V2Light({
  primary,
  secondary,
  title,
  role,
  codeTag,
  kicker,
  portrait,
  screens,
  hints,
}: VariantProps) {
  return (
    <div className="uwe v2" style={colorVars(primary, secondary)}>
      <div className="top">
        <Logo variant="light" />
        <span className="kicker">
          <span className="dot" />
          {META}
        </span>
      </div>
      <div className="main">
        <div className="portrait">
          <span className="ptag">{codeTag}</span>
          <ImageSlot src={portrait} hint="Drop your portrait" />
        </div>
        <div className="phones">
          <PhoneTrio screens={screens} hints={hints} />
        </div>
      </div>
      <div className="bottom">
        <div className="title-card">
          <span className="eyebrow">{"// "}{kicker}</span>
          <h2 className="title">{title}</h2>
        </div>
        <div className="sub-card">
          <span className="sub-eyebrow">
            <span className="dash">—</span>Role
          </span>
          <h3 className="subtitle">{role}</h3>
        </div>
      </div>
    </div>
  );
}
