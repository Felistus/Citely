import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FileSearch } from "lucide-react";
import { ModuleCard } from "@/components/overview/ModuleCard";

const module: ModuleSummary = {
  id: "citability-scorer",
  title: "Citability Scorer",
  description: "See how citable your content is to AI answer engines.",
  href: "/app/citability-scorer",
  icon: FileSearch,
};

describe("ModuleCard", () => {
  it("renders the title and description", () => {
    render(<ModuleCard module={module} />);

    expect(screen.getByText("Citability Scorer")).toBeInTheDocument();
    expect(
      screen.getByText(
        "See how citable your content is to AI answer engines.",
      ),
    ).toBeInTheDocument();
  });

  it("links to the module's route with a descriptive accessible name", () => {
    render(<ModuleCard module={module} />);

    const link = screen.getByRole("link", {
      name: /Citability Scorer.*See how citable/,
    });
    expect(link).toHaveAttribute("href", "/app/citability-scorer");
  });
});
