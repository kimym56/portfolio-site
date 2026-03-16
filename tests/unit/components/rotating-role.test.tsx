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

  it("keeps a consistent default interval across text changes", () => {
    render(
      <RotatingRole
        roles={[
          "I am a Design Engineer",
          "I am a UX Engineer",
          "I am a Frontend Engineer",
        ]}
      />,
    );

    expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3499);
    });
    expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByText("I am a UX Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3499);
    });
    expect(screen.getByText("I am a UX Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByText("I am a Frontend Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3499);
    });
    expect(screen.getByText("I am a Frontend Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();
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

  it("renders the externally controlled active role", () => {
    const { rerender } = render(
      <RotatingRole
        roles={[
          "I am a Design Engineer",
          "I am a UX Engineer",
          "I am a Frontend Engineer",
        ]}
        activeIndex={0}
      />,
    );

    const firstRoleNode = screen.getByTestId("rotating-role");

    expect(firstRoleNode).toHaveTextContent("I am a Design Engineer");

    rerender(
      <RotatingRole
        roles={[
          "I am a Design Engineer",
          "I am a UX Engineer",
          "I am a Frontend Engineer",
        ]}
        activeIndex={1}
      />,
    );

    const secondRoleNode = screen.getByTestId("rotating-role");

    expect(secondRoleNode).toHaveTextContent("I am a UX Engineer");
    expect(secondRoleNode).not.toBe(firstRoleNode);
  });
});
