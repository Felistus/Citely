/**
 * Scripted mock replies for local development and this assignment's
 * standalone test build, used only when ANTHROPIC_API_KEY is not set.
 *
 * Kept separate from mockStream.ts so the copy can be edited or
 * extended (e.g. more branches) without touching the streaming
 * mechanics.
 */

export const MOCK_VERDICT_REPLY =
  "Yes, I would cite this. The opening paragraph states a direct, " +
  "quotable answer, so I could lift it cleanly into a response. The " +
  "strongest signal here is your direct-answer structure. The " +
  "weakest is schema markup: there is no JSON-LD present, which is " +
  "a soft negative but not disqualifying on its own.";

export const MOCK_FOLLOW_UP_REPLY =
  "That comes down to entity clarity. The paragraph you are asking " +
  "about leans on pronouns like \"it\" and \"this\" instead of naming " +
  "the product directly, so on its own, outside the surrounding " +
  "context, it would not make sense as a standalone citation. Adding " +
  "a direct-answer heading above it would also help, since right now " +
  "there is nothing for me to point to as the clear answer.";
