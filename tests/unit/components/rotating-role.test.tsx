import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_INTERVAL_MS, RotatingRole } from "@/components/rotating-role";

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
      vi.advanceTimersByTime(DEFAULT_INTERVAL_MS - 1);
    });
    expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByText("I am a UX Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(DEFAULT_INTERVAL_MS - 1);
    });
    expect(screen.getByText("I am a UX Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByText("I am a Frontend Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(DEFAULT_INTERVAL_MS - 1);
    });
    expect(screen.getByText("I am a Frontend Engineer")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();
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
    expect(screen.getByTestId("rotating-role-stack")).toBeInTheDocument();
    expect(secondRoleNode).not.toBe(firstRoleNode);
  });

  it("renders both outgoing and incoming roles during a controlled transition", () => {
    render(
      <RotatingRole
        roles={["I am a Design Engineer", "I am a UX Engineer"]}
        activeIndex={1}
        previousIndex={0}
        isTransitioning
      />,
    );

    const roleStack = screen.getByTestId("rotating-role-stack");

    expect(roleStack).toHaveTextContent("I am a Design Engineer");
    expect(roleStack).toHaveTextContent("I am a UX Engineer");
    expect(screen.getByTestId("rotating-role")).toHaveTextContent(
      "I am a UX Engineer",
    );
  });

});
