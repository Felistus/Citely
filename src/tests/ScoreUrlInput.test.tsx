import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScoreUrlInput } from "@/components/citability-scorer/ScoreUrlInput";

describe("ScoreUrlInput", () => {
  it("renders the current value with type=url", () => {
    render(
      <ScoreUrlInput value="https://example.com" onChange={vi.fn()} />,
    );

    const input = screen.getByLabelText(/page url/i);
    expect(input).toHaveValue("https://example.com");
    expect(input).toHaveAttribute("type", "url");
  });

  it("calls onChange as the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ScoreUrlInput value="" onChange={onChange} />);

    await user.type(screen.getByLabelText(/page url/i), "a");

    expect(onChange).toHaveBeenCalled();
  });

  it("shows an error message and marks the field invalid", () => {
    render(
      <ScoreUrlInput value="not-a-url" onChange={vi.fn()} error="Enter a valid URL" />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid URL");
    expect(screen.getByLabelText(/page url/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
