import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useSimulatorChat } from "@/hooks/useSimulatorChat";
import type { ScoredContent } from "@/types/interface";

const sendMessageMock = vi.fn();
const stopMock = vi.fn();

// useChat's internal state (messages/status) is controlled per-test via
// this mutable object, so we can simulate different points in a
// streaming lifecycle without needing a real network call.
let mockChatState: {
  messages: unknown[];
  status: string;
  error: Error | undefined;
} = {
  messages: [],
  status: "ready",
  error: undefined,
};

vi.mock("@ai-sdk/react", () => ({
  useChat: () => ({
    messages: mockChatState.messages,
    sendMessage: sendMessageMock,
    status: mockChatState.status,
    error: mockChatState.error,
    stop: stopMock,
  }),
}));

vi.mock("ai", async (importOriginal) => {
  const actual = await importOriginal<typeof import("ai")>();
  return {
    ...actual,
    DefaultChatTransport: class {
      constructor(public config: unknown) {}
    },
  };
});

const SCORED_CONTENT: ScoredContent = {
  rawText: "content",
  breakdown: { total: 50, label: "Weak", signals: [] },
};

function TestHarness({ scoredContent }: { scoredContent: ScoredContent }) {
  const { messages, isBusy, sendFollowUp, stop } = useSimulatorChat(scoredContent);
  return (
    <div>
      <div data-testid="message-count">{messages.length}</div>
      <div data-testid="is-busy">{String(isBusy)}</div>
      <button onClick={() => sendFollowUp("why not?")}>send</button>
      <button onClick={stop}>stop</button>
    </div>
  );
}

beforeEach(() => {
  sendMessageMock.mockClear();
  stopMock.mockClear();
  mockChatState = { messages: [], status: "ready", error: undefined };
});

describe("useSimulatorChat", () => {
  it("auto-sends the turn-one trigger message exactly once on mount", () => {
    render(<TestHarness scoredContent={SCORED_CONTENT} />);
    expect(sendMessageMock).toHaveBeenCalledTimes(1);
    expect(sendMessageMock).toHaveBeenCalledWith({
      text: "Would you cite this content, and why?",
    });
  });

  it("does not auto-trigger again if messages already exist on mount", () => {
    mockChatState = {
      messages: [{ id: "1", role: "assistant", parts: [{ type: "text", text: "hi" }] }],
      status: "ready",
      error: undefined,
    };
    render(<TestHarness scoredContent={SCORED_CONTENT} />);
    expect(sendMessageMock).not.toHaveBeenCalled();
  });

  it("delegates sendFollowUp to the underlying sendMessage with trimmed text", () => {
    render(<TestHarness scoredContent={SCORED_CONTENT} />);
    act(() => {
      screen.getByText("send").click();
    });
    expect(sendMessageMock).toHaveBeenLastCalledWith({ text: "why not?" });
  });

  it("delegates stop() to the underlying stop function", () => {
    render(<TestHarness scoredContent={SCORED_CONTENT} />);
    act(() => {
      screen.getByText("stop").click();
    });
    expect(stopMock).toHaveBeenCalledTimes(1);
  });

  it("reports isBusy as true while status is submitted or streaming", () => {
    mockChatState = { messages: [], status: "streaming", error: undefined };
    render(<TestHarness scoredContent={SCORED_CONTENT} />);
    expect(screen.getByTestId("is-busy")).toHaveTextContent("true");
  });

  it("reports isBusy as false when status is ready", () => {
    mockChatState = { messages: [], status: "ready", error: undefined };
    render(<TestHarness scoredContent={SCORED_CONTENT} />);
    expect(screen.getByTestId("is-busy")).toHaveTextContent("false");
  });

  it("filters out non-text parts when normalizing messages", () => {
    mockChatState = {
      messages: [
        {
          id: "1",
          role: "assistant",
          parts: [
            { type: "text", text: "kept" },
            { type: "tool-call", toolName: "x" },
          ],
        },
      ],
      status: "ready",
      error: undefined,
    };
    render(<TestHarness scoredContent={SCORED_CONTENT} />);
    expect(screen.getByTestId("message-count")).toHaveTextContent("1");
  });
});
