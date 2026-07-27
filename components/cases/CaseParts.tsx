import type { CaseStat, CaseTag, ScreenPos } from "@/lib/case-state";
import { ImageSlot } from "@/components/variants/ImageSlot";

interface KickerProps {
  category: string;
  meta: string;
}

/** The mono "Category · Coralsoft · 2026" line in the header. */
export function Kicker({ category, meta }: KickerProps) {
  return (
    <span className="kicker">
      <span className="dot" />
      {[category, meta].filter(Boolean).join(" · ")}
    </span>
  );
}

interface ProductLabelProps {
  product: string;
  domain: string;
}

/** Product name in the accent color with the domain trailing it. */
export function ProductLabel({ product, domain }: ProductLabelProps) {
  return (
    <div className="plabel">
      {product}
      {domain && <span className="dom">{domain}</span>}
    </div>
  );
}

interface ChipsProps {
  tags: CaseTag[];
  /** How many chips this layout has room for. */
  limit: number;
}

/** Tech-stack chips. `accent` tags render in the primary color. */
export function Chips({ tags, limit }: ChipsProps) {
  return (
    <div className="chips">
      {tags.slice(0, limit).map((t, i) => (
        <span key={`${t.text}-${i}`} className={t.accent ? "chip hot" : "chip"}>
          {t.text}
        </span>
      ))}
    </div>
  );
}

interface StatsProps {
  stats: CaseStat[];
}

/** Up to 3 number + caption cells. Each layout restyles `.stat` in case.css. */
export function Stats({ stats }: StatsProps) {
  return (
    <div className="stats">
      {stats.slice(0, 3).map((s, i) => (
        <div className="stat" key={`${s.num}-${i}`}>
          <span className="num">{s.num}</span>
          <span className="lbl">{s.lbl}</span>
        </div>
      ))}
    </div>
  );
}

interface ScreenSlotProps {
  src: string | null;
  hint: string;
  pos: ScreenPos;
}

/** The web-platform screenshot slot, framed at whatever the layout dictates. */
export function ScreenSlot({ src, hint, pos }: ScreenSlotProps) {
  return <ImageSlot src={src} hint={hint} position={`${pos.x}% ${pos.y}%`} />;
}

interface BrowserProps {
  url: string;
  children: React.ReactNode;
}

/** Browser chrome mock — traffic lights + address bar over the screenshot slot. */
export function Browser({ url, children }: BrowserProps) {
  return (
    <div className="browser">
      <div className="bar">
        <i />
        <i />
        <i />
        <span className="url">{url}</span>
      </div>
      <div className="view">{children}</div>
    </div>
  );
}
