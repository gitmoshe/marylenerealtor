/**
 * Client-side image compression used by the admin uploader.
 *
 * The server runs in an edge worker, where native image binaries (sharp) are
 * unavailable, so the browser does the resizing: every uploaded photo becomes
 * a WebP at ~82% quality — a 1920px "full" version plus a 700px "card"
 * version, mirroring the two widths vite-imagetools emits for bundled art.
 */

export const FULL_WIDTH = 1920;
export const CARD_WIDTH = 700;
export const WEBP_QUALITY = 0.82;

async function loadBitmap(file: File): Promise<ImageBitmap> {
  return await createImageBitmap(file);
}

function drawToBase64(bitmap: ImageBitmap, maxWidth: number): Promise<string> {
  const scale = Math.min(1, maxWidth / bitmap.width); // never upscale
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.reject(new Error("Canvas is unavailable in this browser"));
  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Could not encode the image"));
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Could not read the encoded image"));
        reader.onload = () => {
          const result = String(reader.result);
          resolve(result.slice(result.indexOf(",") + 1));
        };
        reader.readAsDataURL(blob);
      },
      "image/webp",
      WEBP_QUALITY,
    );
  });
}

export type CompressedImage = { base64: string; cardBase64: string };

/** Resize + convert an uploaded file into full and card WebP payloads. */
export async function compressImage(file: File): Promise<CompressedImage> {
  const bitmap = await loadBitmap(file);
  try {
    const [base64, cardBase64] = await Promise.all([
      drawToBase64(bitmap, FULL_WIDTH),
      drawToBase64(bitmap, CARD_WIDTH),
    ]);
    return { base64, cardBase64 };
  } finally {
    bitmap.close?.();
  }
}
