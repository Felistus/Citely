import { describe, expect, it } from "vitest";
import {
  isScoredContent,
  validateRequestBody,
} from "@/app/api/simulator/route";

const VALID_SCORED_CONTENT: ScoredContent = {
  rawText: "Some article text.",
  breakdown: {
    total: 70,
    band: "moderately-citable",
    signals: [
      {
        id: "direct-answer",
        label: "Direct-answer structure",
        score: 100,
        weight: 25,
        explanation: "Clear answer up top.",
      },
    ],
  },
};

describe("isScoredContent", () => {
  it("accepts a well-formed ScoredContent object", () => {
    expect(isScoredContent(VALID_SCORED_CONTENT)).toBe(true);
  });

  it("rejects null", () => {
    expect(isScoredContent(null)).toBe(false);
  });

  it("rejects an object missing rawText", () => {
    const { rawText: _rawText, ...withoutRawText } = VALID_SCORED_CONTENT;
    expect(isScoredContent(withoutRawText)).toBe(false);
  });

  it("rejects an object with a non-array signals list", () => {
    expect(
      isScoredContent({
        rawText: "text",
        breakdown: { total: 10, label: "Weak", signals: "not-an-array" },
      }),
    ).toBe(false);
  });
});

describe("validateRequestBody", () => {
  it("returns null (no error) for a valid body", () => {
    const body: SimulatorRequestBody = {
      messages: [],
      scoredContent: VALID_SCORED_CONTENT,
    };
    expect(validateRequestBody(body)).toBeNull();
  });

  it("returns an error string when the body is undefined", () => {
    expect(validateRequestBody(undefined)).toMatch(/missing/i);
  });

  it("returns an error string when messages is not an array", () => {
    const body = {
      messages: "not-an-array",
      scoredContent: VALID_SCORED_CONTENT,
    } as unknown as SimulatorRequestBody;
    expect(validateRequestBody(body)).toMatch(/messages array/i);
  });

  it("returns an error string when scoredContent is missing", () => {
    const body = {
      messages: [],
    } as unknown as SimulatorRequestBody;
    expect(validateRequestBody(body)).toMatch(/scoredContent/i);
  });
});
