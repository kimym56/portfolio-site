import { SITE_COPY } from "@/lib/site-copy";
import { describe, expect, it } from "vitest";

describe("SITE_COPY", () => {
  it("uses webp portraits for the home hero", () => {
    expect(SITE_COPY.home.profileImages).toEqual([
      "/images/profile1.webp",
      "/images/profile2.webp",
      "/images/profile3.webp",
    ]);
  });
});
