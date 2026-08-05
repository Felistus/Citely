import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildSimulatorSystemPrompt,
  hasRealModelConfigured,
} from "@/lib/simulator/config";
import type { CitabilityBreakdown } from "@/types/interface";

const BREAKDOWN: CitabilityBreakdown = {
  total: 55,
  label: "Weak",
  signals: [
    {
      id: "entity-clarity",
      label: "Entity clarity",
      score: 30,
      weight: 20,
      explanation: "Relies heavily on pronouns.",
    },
  ],
};

describe("buildSimulatorSystemPrompt", () => {
  it("includes the raw content text", () => {
    const prompt = buildSimulatorSystemPrompt("The sky is blue.", BREAKDOWN);
    expect(prompt).toContain("The sky is blue.");
  });

  it("includes each signal's label, score, and explanation", () => {
    const prompt = buildSimulatorSystemPrompt("content", BREAKDOWN);
    expect(prompt).toContain("Entity clarity");
    expect(prompt).toContain("30/100");
    expect(prompt).toContain("Relies heavily on pronouns.");
  });

  it("includes the composite score and label", () => {
    const prompt = buildSimulatorSystemPrompt("content", BREAKDOWN);
    expect(prompt).toContain("55/100");
    expect(prompt).toContain("Weak");
  });
});

describe("hasRealModelConfigured", () => {
  const originalKey = process.env.ANTHROPIC_API_KEY;

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.ANTHROPIC_API_KEY;
    } else {
      process.env.ANTHROPIC_API_KEY = originalKey;
    }
    vi.unstubAllEnvs();
  });

  it("returns false when ANTHROPIC_API_KEY is not set", () => {
    delete process.env.ANTHROPIC_API_KEY;
    expect(hasRealModelConfigured()).toBe(false);
  });

  it("returns true when ANTHROPIC_API_KEY is set", () => {
    process.env.ANTHROPIC_API_KEY = "test-key-value";
    expect(hasRealModelConfigured()).toBe(true);
  });
});
