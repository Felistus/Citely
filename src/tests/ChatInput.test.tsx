import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatInput } from "@/components/simulator/ChatInput";

describe("ChatInput", () => {
  it("calls onSubmit with the trimmed text and clears the field", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onStop = vi.fn();

    render(<ChatInput onSubmit={onSubmit} onStop={onStop} isBusy={false} />);

    const textbox = screen.getByLabelText(
      "Ask a follow-up question about this citability verdict",
    );
    await user.type(textbox, "  Why not the second paragraph?  ");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(onSubmit).toHaveBeenCalledWith("Why not the second paragraph?");
    expect(textbox).toHaveValue("");
  });

  it("submits on Enter and does not submit on Shift+Enter", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ChatInput onSubmit={onSubmit} onStop={vi.fn()} isBusy={false} />);
    const textbox = screen.getByLabelText(
      "Ask a follow-up question about this citability verdict",
    );

    await user.type(textbox, "Shift line{Shift>}{Enter}{/Shift}still typing");
    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(textbox, "{Enter}");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("shows a Stop button instead of Send while busy, and calls onStop", async () => {
    const user = userEvent.setup();
    const onStop = vi.fn();

    render(<ChatInput onSubmit={vi.fn()} onStop={onStop} isBusy />);

    expect(
      screen.queryByRole("button", { name: "Send message" }),
    ).not.toBeInTheDocument();

    const stopButton = screen.getByRole("button", {
      name: "Stop generating response",
    });
    await user.click(stopButton);
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it("disables Send when the input is empty", () => {
    render(<ChatInput onSubmit={vi.fn()} onStop={vi.fn()} isBusy={false} />);
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });

  it("disables the textarea when disabled prop is true", () => {
    render(<ChatInput onSubmit={vi.fn()} onStop={vi.fn()} isBusy={false} disabled />);
    expect(
      screen.getByLabelText("Ask a follow-up question about this citability verdict"),
    ).toBeDisabled();
  });
});
