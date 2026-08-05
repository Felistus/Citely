import { describe, expect, it } from "vitest";
import { createMockSimulatorStream } from "@/lib/simulator/mockStream";
import { MOCK_FOLLOW_UP_REPLY, MOCK_VERDICT_REPLY } from "@/lib/simulator/mockReplies";
import type { SimulatorMessage } from "@/types/interface";

/**
 * Reads every chunk off a UI message stream and joins the deltas from
 * any text-delta parts back into a single string, mirroring what the
 * client would reconstruct from text-start/text-delta/text-end.
 */
async function collectStreamedText(
  stream: ReadableStream<unknown>,
): Promise<string> {
  const reader = stream.getReader();
  let text = "";

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = value as { type?: string; delta?: string };
    if (chunk?.type === "text-delta" && typeof chunk.delta === "string") {
      text += chunk.delta;
    }
  }

  return text;
}

const USER_TURN_ONE: SimulatorMessage[] = [
  { id: "1", role: "user", parts: [{ type: "text", text: "Would you cite this?" }] },
];

const AFTER_ONE_ASSISTANT_TURN: SimulatorMessage[] = [
  { id: "1", role: "user", parts: [{ type: "text", text: "Would you cite this?" }] },
  { id: "2", role: "assistant", parts: [{ type: "text", text: MOCK_VERDICT_REPLY }] },
  { id: "3", role: "user", parts: [{ type: "text", text: "Why not the second paragraph?" }] },
];

describe("createMockSimulatorStream", () => {
  it("streams the verdict reply on turn one (no prior assistant message)", async () => {
    const stream = createMockSimulatorStream(USER_TURN_ONE);
    const text = await collectStreamedText(stream);
    expect(text).toBe(MOCK_VERDICT_REPLY);
  }, 10_000);

  it("streams the follow-up reply once an assistant turn already exists", async () => {
    const stream = createMockSimulatorStream(AFTER_ONE_ASSISTANT_TURN);
    const text = await collectStreamedText(stream);
    expect(text).toBe(MOCK_FOLLOW_UP_REPLY);
  }, 10_000);
});
