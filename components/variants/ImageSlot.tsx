import type { CSSProperties } from "react";

interface ImageSlotProps {
  src: string | null;
  hint: string;
  /** Extra class names appended to the `.slot` base (e.g. for scoped overrides). */
  extraClass?: string;
  /**
   * `background-position` for the covered image, e.g. "50% 0%". Defaults to
   * centered. Under `cover` an image with a different aspect ratio than the
   * slot overflows on one axis; this picks which part of that overflow shows,
   * which is what makes long full-page screenshots usable.
   */
  position?: string;
}

/**
 * Shared placeholder / preview slot. When `src` is null it renders the dashed
 * mono hint; when a data URL is present it fills the box via a `cover`
 * background image.
 *
 * The image is set as a direct `background-image` rather than piped through a
 * CSS custom property. Chrome silently discards custom property values over
 * ~2 MB — `setProperty` succeeds but the computed value comes back empty — so
 * routing a data URL through `--slot-img` made any screenshot above roughly
 * 1.5 MB vanish, showing neither the image nor the hint (`src` is truthy, so
 * the empty state never rendered). `background-image` itself has no such
 * ceiling, so setting it inline supports screenshots of any size.
 */
export function ImageSlot({
  src,
  hint,
  extraClass = "",
  position,
}: ImageSlotProps) {
  const style = src
    ? ({
        backgroundImage: `url(${src})`,
        backgroundPosition: position,
      } as CSSProperties)
    : undefined;
  return (
    <div className={`slot ${extraClass}`.trim()} style={style}>
      {!src && hint.trim() && <span className="hint">{hint}</span>}
    </div>
  );
}
