import { describe, expect, it } from "vitest";
import { getCopy } from "@/lib/i18n/get-copy";

describe("getCopy", () => {
  it("returns english copy by default", () => {
    expect(getCopy("en").nav.home).toBe("Home");
  });

  it("returns korean copy for ko locale", () => {
    expect(getCopy("ko").nav.home).toBe("홈");
  });

  it("includes about content in english and korean", () => {
    expect(getCopy("en").about.title).toBe("About Me");
    expect(getCopy("ko").about.title).toBe("소개");
    expect(getCopy("en").about.paragraphs.length).toBeGreaterThan(0);
    expect(getCopy("ko").about.paragraphs.length).toBeGreaterThan(0);
  });
});
