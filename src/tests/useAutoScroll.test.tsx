import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useAutoScroll } from "@/hooks/useAutoScroll";

function TestHarness({ dep }: { dep: unknown }) {
  const { containerRef, bottomAnchorRef, isPinnedToBottom, handleScroll, jumpToLatest } =
    useAutoScroll(dep);

  return (
    <div>
      <div data-testid="pinned-state">{String(isPinnedToBottom)}</div>
      <button onClick={jumpToLatest}>jump</button>
      <div data-testid="scroll-container" ref={containerRef} onScroll={handleScroll}>
        <div data-testid="bottom-anchor" ref={bottomAnchorRef} />
      </div>
    </div>
  );
}

function setScrollMetrics(
  el: HTMLElement,
  metrics: { scrollHeight: number; scrollTop: number; clientHeight: number },
) {
  Object.defineProperty(el, "scrollHeight", {
    value: metrics.scrollHeight,
    configurable: true,
  });
  Object.defineProperty(el, "scrollTop", {
    value: metrics.scrollTop,
    configurable: true,
  });
  Object.defineProperty(el, "clientHeight", {
    value: metrics.clientHeight,
    configurable: true,
  });
}

beforeEach(() => {
  // jsdom does not implement scrollIntoView.
  Element.prototype.scrollIntoView = vi.fn();
});

describe("useAutoScroll", () => {
  it("starts pinned to the bottom", () => {
    render(<TestHarness dep="turn-1" />);
    expect(screen.getByTestId("pinned-state")).toHaveTextContent("true");
  });

  it("releases the pin when the user scrolls away from the bottom", () => {
    render(<TestHarness dep="turn-1" />);
    const container = screen.getByTestId("scroll-container");

    setScrollMetrics(container, {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
    });

    act(() => {
      fireEvent.scroll(container);
    });

    expect(screen.getByTestId("pinned-state")).toHaveTextContent("false");
  });

  it("re-pins when jumpToLatest is called, and scrolls the bottom anchor into view", () => {
    render(<TestHarness dep="turn-1" />);
    const container = screen.getByTestId("scroll-container");

    setScrollMetrics(container, {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
    });
    act(() => {
      fireEvent.scroll(container);
    });
    expect(screen.getByTestId("pinned-state")).toHaveTextContent("false");

    act(() => {
      screen.getByText("jump").click();
    });

    expect(screen.getByTestId("pinned-state")).toHaveTextContent("true");
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("stays pinned when the user remains within the bottom threshold", () => {
    render(<TestHarness dep="turn-1" />);
    const container = screen.getByTestId("scroll-container");

    // distanceFromBottom = scrollHeight - scrollTop - clientHeight = 10px,
    // well within the 48px threshold.
    setScrollMetrics(container, {
      scrollHeight: 1000,
      scrollTop: 950,
      clientHeight: 40,
    });

    act(() => {
      fireEvent.scroll(container);
    });

    expect(screen.getByTestId("pinned-state")).toHaveTextContent("true");
  });
});
