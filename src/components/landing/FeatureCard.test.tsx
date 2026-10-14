import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FileSearch } from "lucide-react";
import { FeatureCard } from "@/components/landing/FeatureCard";

const feature: ModuleSummary = {
  id: "citability-scorer",
  title: "Citability Scorer",
  description: "Score content for AI citability.",
  href: "/app/citability-scorer",
  icon: FileSearch,
};

describe("FeatureCard", () => {
  it("renders the feature title and description", () => {
    render(<FeatureCard feature={feature} />);

    expect(screen.getByText("Citability Scorer")).toBeInTheDocument();
    expect(
      screen.getByText("Score content for AI citability."),
    ).toBeInTheDocument();
  });
});
