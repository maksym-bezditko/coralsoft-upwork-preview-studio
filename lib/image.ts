import { fileToDataURL } from "./state";

/**
 * Longest-edge cap for imported images. The stage is 1000×750 and exports at
 * 2× (2000×1500); the largest single image area is the portrait, so ~1400px is
 * already oversampled. Capping here keeps each data URL small (~200–400 KB)
 * instead of multi-MB, which avoids the ~5 MB localStorage quota (multiple
 * full-res photos otherwise overflow it and silently fail to persist) and keeps
 * rendering + html-to-image export fast.
 */
const MAX_EDGE = 1400;

/** Skip re-encoding when the source is already small and within the cap. */
const KEEP_AS_IS_BYTES = 500_000;

/** PNG is preferred (lossless, keeps transparency); fall back to JPEG above this. */
const PNG_FALLBACK_LIMIT = 1_000_000;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode image"));
    img.src = src;
  });
}

/**
 * Read an image file into a data URL, downscaling to {@link MAX_EDGE} and
 * compressing so large uploads (>1 MB) render and persist reliably. Small
 * within-bounds images are returned untouched to preserve quality.
 */
export async function processImageFile(file: File): Promise<string> {
  const original = await fileToDataURL(file);
  const img = await loadImage(original);
  const { naturalWidth: w, naturalHeight: h } = img;

  const scale = Math.min(1, MAX_EDGE / Math.max(w, h));
  if (scale === 1 && file.size <= KEEP_AS_IS_BYTES) {
    return original;
  }

  const tw = Math.max(1, Math.round(w * scale));
  const th = Math.max(1, Math.round(h * scale));
  const canvas = document.createElement("canvas");
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext("2d");
  if (!ctx) return original;
  ctx.drawImage(img, 0, 0, tw, th);

  // Try lossless PNG first; if it's still heavy (photographic content), flatten
  // onto white and re-encode as JPEG to keep the data URL small.
  const png = canvas.toDataURL("image/png");
  if (png.length <= PNG_FALLBACK_LIMIT) return png;

  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, tw, th);
  return canvas.toDataURL("image/jpeg", 0.9);
}
