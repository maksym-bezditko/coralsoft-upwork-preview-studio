import { colorVars, type VariantProps } from "./types";
import { ImageSlot } from "./ImageSlot";
import { Phone } from "./PhoneTrio";
import { Logo } from "./Logo";

interface V3Props extends VariantProps {
  /** Big background numeral, stroke-only. */
  numeral?: string;
}

/** V3 — Editorial poster. Oversized background numeral, tall portrait, editorial title block. */
export function V3Poster({
  primary,
  secondary,
  title,
  role,
  codeTag,
  portrait,
  screens,
  hints,
  numeral = "03",
}: V3Props) {
  const words = title.split(" ");
  return (
    <div className="uwe v3" style={colorVars(primary, secondary)}>
      <span className="bg-numeral">{numeral}</span>
      <div className="top">
        <Logo />
        <span className="kicker">
          <span className="dot" />
          Coralsoft · Product studio · 2026
        </span>
      </div>
      <div className="portrait">
        <span className="ptag">{codeTag}</span>
        <ImageSlot src={portrait} hint="Drop your portrait" />
      </div>
      <div className="phones-row">
        <Phone className="p1" src={screens[0]} hint={hints[0]} />
        <Phone className="p2" src={screens[1]} hint={hints[1]} />
        <Phone className="p3" src={screens[2]} hint={hints[2]} />
      </div>
      <div className="editorial">
        <div className="crop">
          <div className="row1">
            <span>
              <span className="accent">★ FEATURE</span> &nbsp; · &nbsp; Coralsoft Service
            </span>
            <span className="scope">In production</span>
          </div>
          <h2>
            {words.map((w, i) =>
              i === words.length - 1 ? (
                <span key={i} className="accent">
                  {w}
                </span>
              ) : (
                <span key={i}>{w} </span>
              ),
            )}
          </h2>
          <span className="role">{role}</span>
        </div>
      </div>
    </div>
  );
}
