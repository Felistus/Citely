import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScanButton } from "@/components/citability-scorer/ScanButton";

describe("ScanButton", () => {
  it("shows 'Scan' when idle and calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ScanButton status="idle" onClick={onClick} />);

    const button = screen.getByRole("button", { name: "Scan" });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows a loading label and disables itself while loading", () => {
    render(<ScanButton status="loading" onClick={vi.fn()} />);

    const button = screen.getByRole("button", { name: /scanning/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("respects the disabled prop even when idle", () => {
    render(<ScanButton status="idle" onClick={vi.fn()} disabled />);

    expect(screen.getByRole("button", { name: "Scan" })).toBeDisabled();
  });
});
