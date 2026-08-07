import type { CaseStat, CaseTag } from "@/lib/case-state";
import { Logo } from "@/components/variants/Logo";

/** WCAG relative luminance of a `#rrggbb` colour. */
function luminance(hex: string): number {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return 1;
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

interface CaseLogoProps {
  /** The colour the wordmark sits on — the canvas, or the accent for C5. */
  on: string;
}

/**
 * The wordmark, picking its own variant. The orange mark reads well on light
 * canvases but goes muddy on dark ones, and the canvas is user-controlled, so
 * the choice has to follow the colour rather than the layout.
 */
export function CaseLogo({ on }: CaseLogoProps) {
  return <Logo variant={luminance(on) < 0.35 ? "white" : "light"} />;
}

/* --------------------------------------------------------------------------
   Every block below returns null when it has nothing to show.

   Clearing a field in the sidebar is how an element is removed from the cover —
   there is no separate set of visibility toggles. That means each block has to
   drop its own wrapper too, not just its text: an empty `.chips` would still
   occupy a flex row, an empty `.stats` would still draw C2's 2px rule, and a
   `.kicker` with no text would leave its accent dot floating in the header.

   The headline and the screenshot slot are the two exceptions, and always
   render — they are what the cover is for.
   -------------------------------------------------------------------------- */

/** Whether any stat row carries content — layouts use it to drop attached rules. */
export function hasStats(stats: CaseStat[]): boolean {
  return stats.slice(0, 3).some((s) => s.num.trim() || s.lbl.trim());
}

interface KickerProps {
  category: string;
  meta: string;
}

/** The mono "Category · Coralsoft · 2026" line in the header. */
export function Kicker({ category, meta }: KickerProps) {
  const text = [category.trim(), meta.trim()].filter(Boolean).join(" · ");
  if (!text) return null;
  return (
    <span className="kicker">
      <span className="dot" />
      {text}
    </span>
  );
}

interface ProductLabelProps {
  product: string;
  domain: string;
}

/** Product name in the accent color with the domain under it. */
export function ProductLabel({ product, domain }: ProductLabelProps) {
  const name = product.trim();
  const dom = domain.trim();
  if (!name && !dom) return null;
  return (
    <div className="plabel">
      {name}
      {/* Without a product line above it the domain is the label, so it drops
          the top margin that separates the two. */}
      {dom && <span className={name ? "dom" : "dom solo"}>{dom}</span>}
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
  const shown = tags.slice(0, limit).filter((t) => t.text.trim());
  if (!shown.length) return null;
  return (
    <div className="chips">
      {shown.map((t, i) => (
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
  const shown = stats.slice(0, 3).filter((s) => s.num.trim() || s.lbl.trim());
  if (!shown.length) return null;
  return (
    <div className="stats">
      {shown.map((s, i) => (
        <div className="stat" key={`${s.num}-${i}`}>
          {s.num && <span className="num">{s.num}</span>}
          {s.lbl && <span className="lbl">{s.lbl}</span>}
        </div>
      ))}
    </div>
  );
}

interface BrowserProps {
  url: string;
  children: React.ReactNode;
}

/**
 * Browser chrome mock — traffic lights + address bar over the screenshot slot.
 * The address pill goes with the URL, leaving bare traffic lights, so clearing
 * the field removes the text rather than leaving an empty capsule behind.
 */
export function Browser({ url, children }: BrowserProps) {
  return (
    <div className="browser">
      <div className="bar">
        <i />
        <i />
        <i />
        {url.trim() && <span className="url">{url}</span>}
      </div>
      <div className="view">{children}</div>
    </div>
  );
}
