import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MessageBubble } from "@/components/simulator/MessageBubble";

describe("MessageBubble", () => {
  it("renders the joined text of all text parts", () => {
    const message: SimulatorMessage = {
      id: "1",
      role: "assistant",
      parts: [{ type: "text", text: "Yes, I would cite this." }],
    };
    render(<MessageBubble message={message} />);
    expect(screen.getByText("Yes, I would cite this.")).toBeInTheDocument();
  });

  it("labels a user message distinctly from an assistant message", () => {
    const userMessage: SimulatorMessage = {
      id: "1",
      role: "user",
      parts: [{ type: "text", text: "Why not?" }],
    };
    render(<MessageBubble message={userMessage} />);
    expect(
      screen.getByRole("article", { name: "Your message" }),
    ).toBeInTheDocument();
  });

  it("labels an assistant message as a Simulator response for screen readers", () => {
    const assistantMessage: SimulatorMessage = {
      id: "2",
      role: "assistant",
      parts: [{ type: "text", text: "Because it relies on pronouns." }],
    };
    render(<MessageBubble message={assistantMessage} />);
    expect(
      screen.getByRole("article", { name: "Simulator response" }),
    ).toBeInTheDocument();
  });
});
