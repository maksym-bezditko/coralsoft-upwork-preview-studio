import { colorVars, type VariantProps } from "./types";
import { ImageSlot } from "./ImageSlot";
import { Phone } from "./PhoneTrio";
import { Logo } from "./Logo";

interface V5Props extends VariantProps {
  filename?: string;
}

/** V5 — Code terminal. macOS terminal portrait + live code-editor title card. */
export function V5Terminal({
  primary,
  secondary,
  title,
  role,
  codeTag,
  portrait,
  screens,
  hints,
  filename = "service.ts",
}: V5Props) {
  const tStr = JSON.stringify(title);
  const rStr = JSON.stringify(role);
  return (
    <div className="uwe v5" style={colorVars(primary, secondary)}>
      <div className="top">
        <Logo />
        <span className="terminal-bar">
          <span className="led" />
          {codeTag} · {filename}
        </span>
      </div>
      <div className="main">
        <div className="portrait">
          <div className="header">
            <span className="led" />
            <span className="led dim" />
            <span className="led dim" />
            <span className="file">~/coralsoft/team/lead.png</span>
          </div>
          <ImageSlot src={portrait} hint="Drop your portrait" />
          <div className="footer">
            <span>ENGINEER · ON-LINE</span>
            <span className="ok">● READY</span>
          </div>
        </div>
        <div className="phones">
          <Phone className="p1" src={screens[0]} hint={hints[0]} />
          <Phone className="p2" src={screens[1]} hint={hints[1]} />
          <Phone className="p3" src={screens[2]} hint={hints[2]} />
        </div>
      </div>
      <div className="bottom">
        <div className="head">
          <span className="dot red" />
          <span className="dot yel" />
          <span className="dot grn" />
          <span className="file">{filename} — coralsoft / services</span>
        </div>
        <div className="body">
          <div>
            <div className="code">
              <div>
                <span className="k">export const</span> <span className="s">service</span> = {"{"}
              </div>
              <div>
                &nbsp;&nbsp;name: <span className="s">{tStr}</span>,
              </div>
              <div>
                &nbsp;&nbsp;role: <span className="s">{rStr}</span>,
              </div>
              <div>{"}"};</div>
            </div>
            <h2>{title}</h2>
          </div>
          <span className="role">
            {"> "}
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}
