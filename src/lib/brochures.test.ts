import { describe, expect, test } from "bun:test";
import { brochurePath, isPdf } from "./brochures";

describe("property brochure attachments", () => {
  test("accepts a PDF with application/pdf content type", () => {
    expect(isPdf("application/pdf", new TextEncoder().encode("%PDF-1.7"))).toBe(true);
  });
  test("rejects non-PDF content even if its content type claims PDF", () => {
    expect(isPdf("application/pdf", new TextEncoder().encode("<html>"))).toBe(false);
  });
  test("rejects image content types", () => {
    expect(isPdf("image/png", new TextEncoder().encode("%PDF-1.7"))).toBe(false);
  });
  test("keeps uploaded filenames within one PDF storage path", () => {
    expect(brochurePath("../../Amares Brochure.PDF", "abc")).toBe("abc--amares-brochure.pdf");
  });
});