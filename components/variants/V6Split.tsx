import { colorVars, type VariantProps } from "./types";
import { ImageSlot } from "./ImageSlot";
import { Phone } from "./PhoneTrio";
import { Logo } from "./Logo";

interface V6Props extends VariantProps {
  panelText?: string;
}

/** V6 — Diagonal split. Dark/coral diagonal halves, portrait over the seam. */
export function V6Split({
  primary,
  secondary,
  title,
  role,
  codeTag,
  portrait,
  screens,
  hints,
  panelText = "Production-grade output. Built by senior engineers, shipped end-to-end.",
}: V6Props) {
  return (
    <div className="uwe v6" style={colorVars(primary, secondary)}>
      <div className="split-l" />
      <div className="split-r" />
      <div className="top">
        <Logo />
        <span className="meta">{codeTag} · Coralsoft Studio</span>
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
      <div className="stats">
        <div className="lbl">{"// What you get"}</div>
        <div className="marker" />
        <div className="val">{panelText}</div>
      </div>
      <div className="title-block">
        <div className="row">
          <span>Coralsoft Service</span>
          <span className="badge mono">— Senior team</span>
        </div>
        <h2>{title}</h2>
        <span className="role">
          <span className="ico">CR</span>
          {role}
        </span>
      </div>
    </div>
  );
}
