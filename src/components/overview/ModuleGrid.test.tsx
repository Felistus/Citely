import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FileSearch, Bot } from "lucide-react";
import { ModuleGrid } from "@/components/overview/ModuleGrid";

const modules: ModuleSummary[] = [
  {
    id: "citability-scorer",
    title: "Citability Scorer",
    description: "Score content for AI citability.",
    href: "/app/citability-scorer",
    icon: FileSearch,
  },
  {
    id: "ai-simulator",
    title: "AI Answer Simulator",
    description: "Preview how AI would cite your content.",
    href: "/app/ai-simulator",
    icon: Bot,
  },
];

describe("ModuleGrid", () => {
  it("renders one card per module", () => {
    render(<ModuleGrid modules={modules} />);

    expect(screen.getByText("Citability Scorer")).toBeInTheDocument();
    expect(screen.getByText("AI Answer Simulator")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("shows a fallback message when there are no modules", () => {
    render(<ModuleGrid modules={[]} />);

    expect(screen.getByText("No modules available.")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
