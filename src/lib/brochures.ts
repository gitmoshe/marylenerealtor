export function brochurePath(fileName: string, id: string): string {
  const safe = fileName.toLowerCase().replace(/\.[a-z0-9]+$/, "").replace(/[^a-z0-9-]+/g, "-");
  return `${id}-${safe || "brochure"}.pdf`;
}

export function isPdf(contentType: string, bytes: Uint8Array): boolean {
  return contentType.startsWith("application/pdf") &&
    bytes[0] === 37 && bytes[1] === 80 && bytes[2] === 68 && bytes[3] === 70 && bytes[4] === 45;
}