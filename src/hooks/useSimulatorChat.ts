"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
// import { useEffect, useRef } from "react";
import type {
  ScoredContent,
  SimulatorMessage,
  SimulatorMessagePart,
  UseSimulatorChatResult,
} from "@/type/interface";
import type { ChatStatus } from "@/type/index";

const SIMULATOR_API_ROUTE = "/api/simulator";
// const AUTO_TRIGGER_TEXT = "Would you cite this content, and why?";

/**
 * ViewModel for the AI Answer Simulator chat.
 *
 * Wraps the AI SDK's useChat with:
 * - Turn one, auto-sent on mount (the citation verdict), so the user
 *   never has to type a first message.
 * - The scored content + breakdown attached to every request, so the
 *   server can pin it in the system prompt on every turn.
 * - A narrowed, stable return shape so View components never touch
 *   the AI SDK's message/part types directly.
 */
export function useSimulatorChat(
  scoredContent?: ScoredContent,
): UseSimulatorChatResult {
  // const hasAutoTriggered = useRef(false);

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: SIMULATOR_API_ROUTE,
      body: scoredContent ? { scoredContent } : {},
    }),
  });

  // useEffect(() => {
  //   if (hasAutoTriggered.current) return;
  //   if (messages.length > 0) {
  //     // A previous turn already exists (e.g. hot reload), don't
  //     // re-trigger and duplicate the verdict.
  //     hasAutoTriggered.current = true;
  //     return;
  //   }
  //   hasAutoTriggered.current = true;
  //   sendMessage({ text: AUTO_TRIGGER_TEXT });

  //   // -- runs exactly once on mount, intentionally
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  function sendFollowUp(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage({ text: trimmed });
  }

  const normalizedMessages: SimulatorMessage[] = messages.map((message) => ({
    id: message.id,
    role: message.role === "system" ? "assistant" : message.role,
    parts: message.parts
      .filter(
        (part): part is { type: "text"; text: string } => part.type === "text",
      )
      .map(
        (part): SimulatorMessagePart => ({
          type: "text",
          text: part.text,
        }),
      ),
  }));

  const normalizedStatus = status as ChatStatus;

  return {
    messages: normalizedMessages,
    status: normalizedStatus,
    error,
    sendFollowUp,
    stop,
    isBusy:
      normalizedStatus === "submitted" || normalizedStatus === "streaming",
  };
}
