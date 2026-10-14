import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import { useInView } from "@/hooks/useInView";

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void;

let observeSpy: ReturnType<typeof vi.fn>;
let disconnectSpy: ReturnType<typeof vi.fn>;
let capturedCallback: ObserverCallback | null = null;

function TestTarget() {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} data-testid="target">
      {isVisible ? "visible" : "hidden"}
    </div>
  );
}

beforeEach(() => {
  observeSpy = vi.fn();
  disconnectSpy = vi.fn();
  capturedCallback = null;

  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn().mockImplementation((callback: ObserverCallback) => {
      capturedCallback = callback;
      return { observe: observeSpy, disconnect: disconnectSpy };
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useInView", () => {
  it("starts hidden and observes the rendered node", () => {
    render(<TestTarget />);

    expect(screen.getByTestId("target")).toHaveTextContent("hidden");
    expect(observeSpy).toHaveBeenCalledTimes(1);
  });

  it("becomes visible once the observer reports an intersection", () => {
    render(<TestTarget />);

    act(() => {
      capturedCallback?.([{ isIntersecting: true }]);
    });

    expect(screen.getByTestId("target")).toHaveTextContent("visible");
  });

  it("disconnects the observer after becoming visible", () => {
    render(<TestTarget />);

    act(() => {
      capturedCallback?.([{ isIntersecting: true }]);
    });

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });

  it("stays hidden if the element hasn't intersected yet", () => {
    render(<TestTarget />);

    act(() => {
      capturedCallback?.([{ isIntersecting: false }]);
    });

    expect(screen.getByTestId("target")).toHaveTextContent("hidden");
    expect(disconnectSpy).not.toHaveBeenCalled();
  });
});
