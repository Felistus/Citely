import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import {
  buildSimulatorSystemPrompt,
  getSimulatorModel,
  hasRealModelConfigured,
} from "@/lib/simulator/config";
import { createMockSimulatorStream } from "@/lib/simulator/mockStream";
import type {
  ScoredContent,
  SimulatorMessage,
  SimulatorRequestBody,
} from "@/type/interface";

export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  let body: SimulatorRequestBody;

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const validationError = validateRequestBody(body);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const { messages, scoredContent } = body;

  if (!hasRealModelConfigured()) {
    const stream = createMockSimulatorStream(messages);
    return createUIMessageStreamResponse({ stream });
  }

  try {
    const result = streamText({
      model: getSimulatorModel(),
      system: buildSimulatorSystemPrompt(
        scoredContent.rawText,
        scoredContent.breakdown,
      ),
      messages: await convertToModelMessages(messages as UIMessage[]),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    // Never leak a raw provider error to the client. Rate limits and
    // transient failures land here; the client shows a friendly
    // in-UI error instead (see useSimulatorChat).
    console.error("Simulator route error:", error);
    return Response.json(
      {
        error:
          "The Simulator could not reach the model right now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}

function validateRequestBody(
  body: SimulatorRequestBody | undefined,
): string | null {
  if (!body || typeof body !== "object") {
    return "Request body is missing.";
  }
  if (!Array.isArray(body.messages)) {
    return "Request body must include a messages array.";
  }
  if (!isScoredContent(body.scoredContent)) {
    return "Request body must include scoredContent with rawText and a breakdown.";
  }
  return null;
}

function isScoredContent(value: unknown): value is ScoredContent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ScoredContent>;
  return (
    typeof candidate.rawText === "string" &&
    !!candidate.breakdown &&
    typeof candidate.breakdown.total === "number" &&
    Array.isArray(candidate.breakdown.signals)
  );
}

// Re-exported only so tests can import and unit-test validation logic
// in isolation, without spinning up a full request.
export { validateRequestBody, isScoredContent };
export type { SimulatorMessage };
