import { colorVars, type VariantProps } from "./types";
import { ImageSlot } from "./ImageSlot";
import { Phone } from "./PhoneTrio";
import { Logo } from "./Logo";

interface V4Props extends VariantProps {
  panelText?: string;
}

/** V4 — Coral forward. Primary-color canvas, dark cards, coral badge. */
export function V4Coral({
  primary,
  secondary,
  title,
  role,
  codeTag,
  kicker,
  portrait,
  screens,
  hints,
  panelText = "Built end-to-end by Coralsoft.",
}: V4Props) {
  return (
    <div className="uwe v4" style={colorVars(primary, secondary)}>
      <div className="top">
        <Logo />
        <span className="meta">
          <span className="pill">
            <span className="dot" />
            Coralsoft · Catalog · 2026
          </span>
        </span>
      </div>
      <div className="portrait">
        <span className="ptag">{codeTag}</span>
        <ImageSlot src={portrait} hint="Drop your portrait" />
      </div>
      <div className="phones">
        <Phone className="p1" src={screens[0]} hint={hints[0]} />
        <Phone className="p2" src={screens[1]} hint={hints[1]} />
        <Phone className="p3" src={screens[2]} hint={hints[2]} />
      </div>
      <div className="panel-l">
        <div className="lbl">{"// "}{kicker}</div>
        <div className="val">{panelText}</div>
      </div>
      <div className="title-block">
        <div className="row">
          <span>Service</span>
          <span className="badge">Coralsoft</span>
        </div>
        <h2>{title}</h2>
        <span className="role">{role}</span>
      </div>
    </div>
  );
}
