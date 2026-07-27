import { fileToDataURL } from "./state";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode image"));
    img.src = src;
  });
}

/**
 * Read an image file into a data URL — **byte-for-byte, at full resolution**.
 *
 * There is deliberately no downscale and no re-encode here. An earlier version
 * capped the longest edge at 1400px and fell back to JPEG q=0.9 above a size
 * threshold, purely so the result would fit the ~5 MB `localStorage` quota.
 * Both were visible quality losses: the cap left a 16:9 screenshot at 1400×787
 * when the C1 browser view needs 1124×908 device pixels at 2× export (so
 * `cover` upscaled it ~15%), and JPEG ringing is far more obvious on UI
 * screenshots full of small text than on photographs. Images now persist to
 * IndexedDB instead (see `image-store.ts`), which removes the quota pressure
 * that motivated either compromise — so the 2× export is the only place
 * resolution is decided.
 *
 * The decode round-trip is kept: it rejects files that aren't real images
 * before they reach editor state.
 */
export async function processImageFile(file: File): Promise<string> {
  const original = await fileToDataURL(file);
  await loadImage(original);
  return original;
}
