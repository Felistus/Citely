import { createUIMessageStream, generateId } from "ai";
import { MOCK_FOLLOW_UP_REPLY, MOCK_VERDICT_REPLY } from "./mockReplies";

/**
 * IMPORTANT: this module intentionally does NOT import from "ai/test".
 * The Mock*LanguageModel test helpers in ai/test hard-depend on a live
 * Vitest worker and throw at runtime outside one (a known upstream
 * issue as of ai@5.0.27+). Importing them from a real route handler
 * would crash the app the moment someone hits this endpoint without
 * running under Vitest.
 *
 * Instead, this hand-authors a stream using createUIMessageStream's
 * public writer API (the same one the docs use for custom data
 * streaming), which is stable, documented, and safe to run outside
 * tests. It emits the exact wire format useChat expects, so the
 * client cannot tell the difference between this and a real
 * streamText call.
 */

// Extracts the writer's type directly from createUIMessageStream's own
// signature, so this stays correct even if the AI SDK renames or
// versions its internal writer type.
type UIMessageStreamExecuteArgs = Parameters<
  NonNullable<Parameters<typeof createUIMessageStream>[0]["execute"]>
>[0];
type UIMessageStreamWriter = UIMessageStreamExecuteArgs["writer"];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Picks the scripted reply for this turn. Turn one (no prior assistant
 * message yet) always gets the verdict; every turn after that gets the
 * follow-up reply. Good enough for exercising the full chat UI
 * (thinking indicator, streaming, stop button, multi-turn state)
 * without a real model.
 */
function pickMockReply(messages: SimulatorMessage[]): string {
  const hasAssistantTurn = messages.some((m) => m.role === "assistant");
  return hasAssistantTurn ? MOCK_FOLLOW_UP_REPLY : MOCK_VERDICT_REPLY;
}

async function writeMockReply(
  writer: UIMessageStreamWriter,
  messages: SimulatorMessage[],
): Promise<void> {
  const reply = pickMockReply(messages);
  const words = reply.split(" ");
  const id = generateId();

  // Simulate "thinking" latency before the first token, same as a
  // real model call would have.
  await wait(500);

  writer.write({ type: "text-start", id });

  for (let i = 0; i < words.length; i += 1) {
    const delta = i === 0 ? words[i] : ` ${words[i]}`;
    writer.write({ type: "text-delta", id, delta });

    // eslint-disable-next-line no-await-in-loop
    // intentional, this is what makes the stream visibly token-by-token
    await wait(30);
  }

  writer.write({ type: "text-end", id });
}

/**
 * Builds a full UI message stream response body for mock mode.
 * Call this from the route handler when hasRealModelConfigured() is
 * false.
 */
export function createMockSimulatorStream(messages: SimulatorMessage[]) {
  return createUIMessageStream({
    execute: async ({ writer }) => {
      await writeMockReply(writer, messages);
    },
  });
}
