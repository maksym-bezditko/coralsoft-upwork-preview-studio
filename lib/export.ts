import { toJpeg, toPng } from "html-to-image";

export type ExportFormat = "png" | "jpeg";

/** Turn a service title into a filesystem-friendly slug. */
function slug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40) || "coralsoft-preview"
  );
}

interface ExportArgs {
  node: HTMLElement;
  format: ExportFormat;
  title: string;
  /** Layout id, appended to the filename (e.g. "v1", "c3"). */
  variant: string;
}

/**
 * Render the native-size stage node to a downloadable image.
 *
 * The on-screen stage is scaled with CSS transforms for display, but the
 * capture targets the node's native 1000×750 box and upscales 2× via
 * `pixelRatio`, so both studios download at 2000×1500.
 *
 * PNG is the lossless path and the one to prefer. JPEG is offered for upload
 * size limits; it runs at q=0.98 so the artifacts stay negligible on the small
 * mono type these compositions are full of.
 */
export async function exportStage({
  node,
  format,
  title,
  variant,
}: ExportArgs): Promise<void> {
  // The node is already at native size; pixelRatio 2 yields the crisp 2× export.
  // (Setting canvasWidth/Height here too would double-scale it again.)
  const baseOptions = {
    pixelRatio: 2,
    cacheBust: true,
  } as const;

  const dataUrl =
    format === "jpeg"
      ? await toJpeg(node, {
          ...baseOptions,
          backgroundColor: "#000",
          quality: 0.98,
        })
      : await toPng(node, baseOptions);

  const ext = format === "jpeg" ? "jpg" : "png";
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = `${slug(title)}--${variant}.${ext}`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
