"use client";

import { ChangeEvent, useState, type KeyboardEvent } from "react";
import type { ChatInputProps } from "@/type/interface";

const INPUT_ID = "simulator-chat-input";

export function ChatInput({
  onSubmit,
  onStop,
  isBusy,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isBusy || disabled) return;
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as unknown as ChangeEvent<HTMLFormElement>);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-[#DAD5C9] bg-[#EDECE6] p-3"
    >
      <label htmlFor={INPUT_ID} className="sr-only">
        Ask a follow-up question about this citability verdict
      </label>
      <textarea
        id={INPUT_ID}
        name="simulator-message"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask why, or what would improve this…"
        rows={1}
        className="min-h-11 flex-1 resize-none rounded-xl border border-[#DAD5C9] bg-white px-3 py-1 sm:py-2 text-xs sm:text-sm text-[#1C2320] placeholder:text-[#6B6558] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3A5C] disabled:opacity-50"
      />

      {isBusy ? (
        <button
          type="button"
          onClick={onStop}
          className="min-h-11 shrink-0 rounded-xl bg-[#8C4A3D] px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8C4A3D]"
          aria-label="Stop generating response"
        >
          Stop
        </button>
      ) : (
        <button
          type="submit"
          disabled={disabled || value.trim().length === 0}
          className="min-h-11 shrink-0 rounded-xl bg-[#1F3A5C] px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1F3A5C] disabled:opacity-40"
          aria-label="Send message"
        >
          Send
        </button>
      )}
    </form>
  );
}
