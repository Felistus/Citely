import type { MessageListProps } from "@/type/interface";
import { MessageBubble } from "./MessageBubble";
import { ThinkingIndicator } from "./ThinkingIndicator";

export function MessageList({
  messages,
  isThinking,
  onScrollStateChange,
  scrollContainerRef,
  bottomAnchorRef,
}: MessageListProps) {
  return (
    <div
      ref={scrollContainerRef}
      onScroll={onScrollStateChange}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Simulator conversation"
      className="flex h-full flex-col gap-3 overflow-y-auto px-4 py-4"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isThinking && <ThinkingIndicator />}
      <div ref={bottomAnchorRef} aria-hidden="true" />
    </div>
  );
}
