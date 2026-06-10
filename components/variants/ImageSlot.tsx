import type { CSSProperties } from "react";

interface ImageSlotProps {
  src: string | null;
  hint: string;
  /** Extra class names appended to the `.slot` base (e.g. for scoped overrides). */
  extraClass?: string;
}

/**
 * Shared placeholder / preview slot. When `src` is null it renders the dashed
 * mono hint; when a data URL is present it fills the box via a `cover`
 * background image driven by the `--slot-img` custom property.
 */
export function ImageSlot({ src, hint, extraClass = "" }: ImageSlotProps) {
  const style = src ? ({ "--slot-img": `url(${src})` } as CSSProperties) : undefined;
  return (
    <div className={`slot ${extraClass}`.trim()} style={style}>
      {!src && <span className="hint">{hint}</span>}
    </div>
  );
}
