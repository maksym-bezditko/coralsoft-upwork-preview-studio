import { toJpeg, toPng } from "html-to-image";
import type { VariantId } from "./state";

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
  variant: VariantId;
}

/**
 * Render the 1000×750 stage node to a downloadable image.
 *
 * The on-screen stage is scaled with CSS transforms for display, but the
 * capture targets the node's native 1000×750 box and upscales 2× via
 * `pixelRatio` for a crisp 2000×1500 export.
 */
export async function exportStage({
  node,
  format,
  title,
  variant,
}: ExportArgs): Promise<void> {
  // The node is a native 1000×750 box; pixelRatio 2 yields a crisp 2000×1500
  // export. (Setting canvasWidth/Height here too would double-scale to 4000×3000.)
  const baseOptions = {
    pixelRatio: 2,
    cacheBust: true,
  } as const;

  const dataUrl =
    format === "jpeg"
      ? await toJpeg(node, {
          ...baseOptions,
          backgroundColor: "#000",
          quality: 0.94,
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
