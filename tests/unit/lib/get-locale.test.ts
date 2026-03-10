import { describe, expect, it } from "vitest";
import { normalizeLocale } from "@/lib/i18n/get-locale";

describe("normalizeLocale", () => {
  it("returns ko for ko cookie", () => {
    expect(normalizeLocale("ko")).toBe("ko");
  });

  it("falls back to en for unsupported value", () => {
    expect(normalizeLocale("jp")).toBe("en");
  });

  it("falls back to en for empty value", () => {
    expect(normalizeLocale()).toBe("en");
  });
});
