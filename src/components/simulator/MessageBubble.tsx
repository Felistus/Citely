import type { MessageBubbleProps } from "@/type/interface";

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const text = message.parts.map((part) => part.text).join("");

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        role="article"
        aria-label={isUser ? "Your message" : "Simulator response"}
        className={[
          "max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap wrap-break-word",
          isUser
            ? "bg-primary text-white rounded-br-none"
            : "bg-secondary/10 text-secondary-foreground border border-border rounded-bl-none",
        ].join(" ")}
      >
        {text}
      </div>
    </div>
  );
}
