import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageToggle } from "@/components/language-toggle";

const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

describe("LanguageToggle", () => {
  beforeEach(() => {
    document.cookie = "site_lang=en";
    refreshMock.mockReset();
  });

  it("switches from en to ko and updates cookie intent", async () => {
    render(<LanguageToggle locale="en" />);

    await userEvent.click(screen.getByRole("button", { name: "KO" }));

    expect(document.cookie).toContain("site_lang=ko");
    expect(refreshMock).toHaveBeenCalledTimes(1);
  });
});
