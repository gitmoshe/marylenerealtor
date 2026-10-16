import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { brochurePath, isPdf } from "./brochures";

describe("property brochure attachments", () => {
  test("accepts a PDF with application/pdf content type", () => {
    assert.equal(isPdf("application/pdf", new TextEncoder().encode("%PDF-1.7")), true);
  });
  test("rejects non-PDF content even if its content type claims PDF", () => {
    assert.equal(isPdf("application/pdf", new TextEncoder().encode("<html>")), false);
  });
  test("rejects image content types", () => {
    assert.equal(isPdf("image/png", new TextEncoder().encode("%PDF-1.7")), false);
  });
  test("keeps uploaded filenames within one PDF storage path", () => {
    assert.equal(brochurePath("../../Amares Brochure.PDF", "abc"), "abc--amares-brochure.pdf");
  });
});