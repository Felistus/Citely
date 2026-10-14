import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScoreTextareaInput } from "@/components/citability-scorer/ScoreTextareaInput";

describe("ScoreTextareaInput", () => {
  it("renders the current value", () => {
    render(
      <ScoreTextareaInput value="hello world" onChange={vi.fn()} />,
    );

    expect(screen.getByLabelText(/paste your content/i)).toHaveValue(
      "hello world",
    );
  });

  it("calls onChange as the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ScoreTextareaInput value="" onChange={onChange} />);

    await user.type(screen.getByLabelText(/paste your content/i), "hi");

    expect(onChange).toHaveBeenCalled();
  });

  it("shows an error message and marks the field invalid", () => {
    render(
      <ScoreTextareaInput
        value=""
        onChange={vi.fn()}
        error="Content is required"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Content is required",
    );
    expect(screen.getByLabelText(/paste your content/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("disables the textarea when disabled is true", () => {
    render(<ScoreTextareaInput value="" onChange={vi.fn()} disabled />);

    expect(screen.getByLabelText(/paste your content/i)).toBeDisabled();
  });
});
