import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

describe("RevealOnScroll", () => {
  it("renders its children regardless of visibility state", () => {
    render(
      <RevealOnScroll>
        <p>Reveal me</p>
      </RevealOnScroll>,
    );

    expect(screen.getByText("Reveal me")).toBeInTheDocument();
  });

  it("applies a transition delay when delayMs is provided", () => {
    render(
      <RevealOnScroll delayMs={200}>
        <p>Delayed</p>
      </RevealOnScroll>,
    );

    const wrapper = screen.getByText("Delayed").parentElement;
    expect(wrapper).toHaveStyle({ transitionDelay: "200ms" });
  });

  it("applies no inline delay when delayMs is omitted", () => {
    render(
      <RevealOnScroll>
        <p>No delay</p>
      </RevealOnScroll>,
    );

    const wrapper = screen.getByText("No delay").parentElement;
    expect(wrapper).not.toHaveAttribute("style");
  });
});
