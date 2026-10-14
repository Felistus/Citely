import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScoreBandBadge } from "@/components/citability-scorer/ScoreBandBadge";

describe("ScoreBandBadge", () => {
  it.each([
    ["highly-citable", "Highly citable"],
    ["moderately-citable", "Moderately citable"],
    ["weak", "Weak"],
    ["not-citable", "Not citable"],
  ] as const)("renders the correct label for band=%s", (band, label) => {
    render(<ScoreBandBadge band={band} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
