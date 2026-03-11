import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RotatingRole } from "@/components/rotating-role";

describe("RotatingRole", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("cycles through provided role labels on an interval", () => {
    render(
      <RotatingRole
        roles={[
          "I am a Design Engineer",
          "I am a UX Engineer",
          "I am a Frontend Engineer",
        ]}
        intervalMs={1000}
      />,
    );

    expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("I am a UX Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("I am a Frontend Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();
  });

  it("uses a slower default interval when intervalMs is not provided", () => {
    render(<RotatingRole roles={["I am a Design Engineer", "I am a UX Engineer"]} />);

    expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1400);
    });
    expect(screen.getByText("I am a UX Engineer")).toBeInTheDocument();
  });

  it("re-mounts the role element per change for enter animation", () => {
    render(
      <RotatingRole
        roles={["I am a Design Engineer", "I am a UX Engineer"]}
        intervalMs={1000}
      />,
    );

    const firstRoleNode = screen.getByTestId("rotating-role");

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const secondRoleNode = screen.getByTestId("rotating-role");

    expect(secondRoleNode).not.toBe(firstRoleNode);
    expect(secondRoleNode).toHaveTextContent("I am a UX Engineer");
  });
});
