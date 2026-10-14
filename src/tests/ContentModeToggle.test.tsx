import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContentModeToggle } from "@/components/citability-scorer/ContentModeToggle";

describe("ContentModeToggle", () => {
  it("marks the active mode as pressed", () => {
    render(<ContentModeToggle mode="paste" onModeChange={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Paste content" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Enter URL" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("calls onModeChange with the clicked mode", async () => {
    const user = userEvent.setup();
    const onModeChange = vi.fn();
    render(<ContentModeToggle mode="paste" onModeChange={onModeChange} />);

    await user.click(screen.getByRole("button", { name: "Enter URL" }));

    expect(onModeChange).toHaveBeenCalledWith("url");
  });

  it("disables both buttons when disabled is true", () => {
    render(<ContentModeToggle mode="paste" onModeChange={vi.fn()} disabled />);

    expect(
      screen.getByRole("button", { name: "Paste content" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Enter URL" })).toBeDisabled();
  });

  it("exposes the group with an accessible name", () => {
    render(<ContentModeToggle mode="paste" onModeChange={vi.fn()} />);

    expect(
      screen.getByRole("group", { name: "Content input mode" }),
    ).toBeInTheDocument();
  });
});
