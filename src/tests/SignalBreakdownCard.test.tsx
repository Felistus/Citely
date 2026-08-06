import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SignalBreakdownCard } from "@/components/citability-scorer/SignalBreakdownCard";

const signal: SignalResult = {
  id: "direct-answer",
  label: "Direct-answer structure",
  score: 75,
  weight: 25,
  explanation: "A heading is phrased as a question.",
};

describe("SignalBreakdownCard", () => {
  it("renders the signal label, score, weight, and explanation", () => {
    render(<SignalBreakdownCard signal={signal} />);

    expect(screen.getByText("Direct-answer structure")).toBeInTheDocument();
    expect(screen.getByText("75/100")).toBeInTheDocument();
    expect(screen.getByText("Weight: 25%")).toBeInTheDocument();
    expect(
      screen.getByText("A heading is phrased as a question."),
    ).toBeInTheDocument();
  });
});
