export function ThinkingIndicator({
  label = "Thinking",
}: ThinkingIndicatorProps) {
  return (
    <div className="flex w-full justify-start" role="status" aria-live="polite">
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-[#DAD5C9] bg-[#F6F5F1] px-4 py-3">
        <span className="sr-only">{label}, please wait</span>
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#6B6558] [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#6B6558] [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#6B6558]" />
        </span>
      </div>
    </div>
  );
}
