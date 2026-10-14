import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowItWorksStep } from "@/components/landing/HowItWorksStep";

const step: ProcessStep = {
  id: "paste",
  order: 1,
  title: "Paste or link",
  description: "Drop in your content or a URL you've already published.",
};

describe("HowItWorksStep", () => {
  it("renders the step title and description", () => {
    render(<HowItWorksStep step={step} />);

    expect(screen.getByText("Paste or link")).toBeInTheDocument();
    expect(
      screen.getByText("Drop in your content or a URL you've already published."),
    ).toBeInTheDocument();
  });

  it("renders the title as a heading", () => {
    render(<HowItWorksStep step={step} />);

    expect(
      screen.getByRole("heading", { name: "Paste or link" }),
    ).toBeInTheDocument();
  });
});
