import { CitabilityBreakdown } from "@/type/interface";
import { google } from "@ai-sdk/google";
// import { anthropic } from "@ai-sdk/anthropic";
import type { LanguageModel } from "ai";

/**
 * Simulator model + system prompt configuration.
 */

export const SIMULATOR_MODEL_ID =
  process.env.NEXT_PUBLIC_SIMULATOR_MODEL_ID || "gemini-3.1-flash-lite";

export function hasRealModelConfigured(): boolean {
  return Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
}

export function getSimulatorModel(): LanguageModel {
  return google(SIMULATOR_MODEL_ID);
}

/**
 * Builds the system prompt for a given turn, with the scored content
 * and its citability breakdown pinned in on every call (not just the
 * first), so follow-up answers can reference specific signals by name
 * instead of speaking generically. See system design doc, Section 7.
 */
export function buildSimulatorSystemPrompt(
  rawText: string,
  breakdown: CitabilityBreakdown,
): string {
  const signalLines = breakdown.signals
    .map(
      (s) =>
        `- ${s.label}: ${s.score}/100 (weight ${s.weight}). ${s.explanation}`,
    )
    .join("\n");

  return `
You are the AI Answer Simulator inside Citely, a tool that helps content
teams understand whether AI answer engines (like ChatGPT, Perplexity, or
Gemini) would cite their content.

SCORED CONTENT:
"""
${rawText}
"""

CITABILITY BREAKDOWN (composite score: ${breakdown.total}/100):
${signalLines}

Your job across the conversation:

Turn one (always the same shape): render a citation verdict. State
plainly whether you would cite this content if answering a relevant
question, quote or reference the specific passage you would pull from
(or explain why no passage is clean enough to lift), and name which
signal above most helped or hurt that decision.

Every turn after that: answer the user's follow-up question directly,
referencing the specific signal(s) by name where relevant (for example,
"the issue is really your heading hierarchy, not entity clarity"). Do
not re-explain the whole breakdown on every turn, only what is relevant
to the question asked.

Keep responses concise. This is a working tool for a content
strategist, not a general chatbot: get to the point, be specific to
the content provided above, and never invent facts about the content
that were not given to you.
`.trim();
}
