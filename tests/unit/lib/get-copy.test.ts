import { describe, expect, it } from "vitest";
import { getCopy } from "@/lib/i18n/get-copy";

describe("getCopy", () => {
  it("returns english copy by default", () => {
    expect(getCopy("en").nav.home).toBe("Home");
  });

  it("returns korean copy for ko locale", () => {
    expect(getCopy("ko").nav.home).toBe("홈");
  });
});
