import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScoreGauge } from "@/components/citability-scorer/ScoreGauge";

describe("ScoreGauge", () => {
  it("renders the numeric score", () => {
    render(<ScoreGauge score={82} band="highly-citable" />);

    expect(screen.getByText("82")).toBeInTheDocument();
  });

  it("exposes the score via an accessible meter", () => {
    render(<ScoreGauge score={40} band="weak" />);

    const meter = screen.getByRole("meter", { name: "Citability score" });
    expect(meter).toHaveAttribute("aria-valuenow", "40");
    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders the matching band badge", () => {
    render(<ScoreGauge score={15} band="not-citable" />);

    expect(screen.getByText("Not citable")).toBeInTheDocument();
  });
});
