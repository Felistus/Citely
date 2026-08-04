"use client";

import { useSimulatorChat } from "@/hooks/useSimulatorChat";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import type { ChatContainerProps } from "@/type/interface";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { JumpToLatestButton } from "./JumpToLatestButton";

export function ChatContainer({
  scoredContent,
  className,
}: ChatContainerProps) {
  // const { messages, error, sendFollowUp, stop, isBusy } =
  //   useSimulatorChat(scoredContent);
  const { messages, error, sendFollowUp, stop, isBusy } = useSimulatorChat();

  const lastMessage = messages[messages.length - 1];
  const lastMessageText =
    lastMessage?.role === "assistant"
      ? lastMessage.parts.map((p) => p.text).join("")
      : "";

  // Handoff rule: only show the thinking indicator while we are busy
  // AND the assistant has not produced any visible text yet for this
  // turn. The moment the first token lands, the indicator disappears
  // in the same render the text appears in, instead of one frame
  // before it, so there is no flicker.
  const isThinking =
    isBusy &&
    (lastMessage?.role !== "assistant" || lastMessageText.length === 0);

  const {
    containerRef,
    bottomAnchorRef,
    isPinnedToBottom,
    handleScroll,
    jumpToLatest,
  } = useAutoScroll(
    messages.map((m) => m.parts.map((p) => p.text).join("")).join("|"),
  );

  return (
    <section
      className={`relative flex h-full min-h-120 flex-col border border-border bg-white ${className ?? ""}`}
      aria-label="AI Answer Simulator"
    >
      <MessageList
        messages={messages}
        isThinking={isThinking}
        onScrollStateChange={handleScroll}
        scrollContainerRef={containerRef}
        bottomAnchorRef={bottomAnchorRef}
      />

      <JumpToLatestButton visible={!isPinnedToBottom} onClick={jumpToLatest} />

      {error && (
        <p
          role="alert"
          className="border-t border-border  bg-red-500/10 px-4 py-2 text-sm text-red-600/70"
        >
          The Simulator could not reach the model right now. Please try again.
        </p>
      )}

      <ChatInput onSubmit={sendFollowUp} onStop={stop} isBusy={isBusy} />
    </section>
  );
}
