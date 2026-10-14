import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SignalBreakdownList } from "@/components/citability-scorer/SignalBreakdownList";

const signals: SignalResult[] = [
  {
    id: "direct-answer",
    label: "Direct-answer structure",
    score: 75,
    weight: 25,
    explanation: "A heading is phrased as a question.",
  },
  {
    id: "heading-hierarchy",
    label: "Heading hierarchy",
    score: 60,
    weight: 20,
    explanation: "Headings are mostly well nested.",
  },
];

describe("SignalBreakdownList", () => {
  it("renders one card per signal", () => {
    render(<SignalBreakdownList signals={signals} />);

    expect(screen.getByText("Direct-answer structure")).toBeInTheDocument();
    expect(screen.getByText("Heading hierarchy")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("shows a fallback message when there are no signals", () => {
    render(<SignalBreakdownList signals={[]} />);

    expect(
      screen.getByText("No signal breakdown available yet."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
