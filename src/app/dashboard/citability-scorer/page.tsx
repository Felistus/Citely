"use client";

import { useState } from "react";
import { ContentModeToggle } from "@/components/citability-scorer/ContentModeToggle";
import { ScoreTextareaInput } from "@/components/citability-scorer/ScoreTextareaInput";
import { ScoreUrlInput } from "@/components/citability-scorer/ScoreUrlInput";
import { ScanButton } from "@/components/citability-scorer/ScanButton";
import { InputErrorMessage } from "@/components/citability-scorer/InputErrorMessage";
import { ScoreGauge } from "@/components/citability-scorer/ScoreGauge";
import { SignalBreakdownList } from "@/components/citability-scorer/SignalBreakdownList";

// Static sample data so the results UI has something to render.
// Replace with the real scoreCitability() output in Week 1-3 of the build plan.
const SAMPLE_RESULT: CitabilityBreakdown = {
  total: 72,
  signals: [
    {
      id: "direct-answer",
      label: "Direct-answer structure",
      score: 100,
      weight: 25,
      explanation:
        "A heading is phrased as a question, which is a strong citability signal.",
    },
    {
      id: "heading-hierarchy",
      label: "Heading hierarchy",
      score: 80,
      weight: 20,
      explanation: "Headings are mostly well nested, with one skipped level.",
    },
    {
      id: "entity-clarity",
      label: "Entity clarity",
      score: 60,
      weight: 20,
      explanation:
        'Some key nouns are referenced only via pronouns like "it" or "this."',
    },
    {
      id: "schema-presence",
      label: "Schema markup presence",
      score: 0,
      weight: 15,
      explanation: "No JSON-LD structured data was found on this page.",
    },
    {
      id: "list-table-usage",
      label: "List/table usage",
      score: 100,
      weight: 10,
      explanation: "Comparable information is presented in a table.",
    },
    {
      id: "freshness",
      label: "Freshness signal",
      score: 50,
      weight: 10,
      explanation: "A published date is present, but no updated date.",
    },
  ],
};

const SAMPLE_BAND: ScoreBand = "moderately-citable";

export default function CitabilityScorerPage() {
  const [mode, setMode] = useState<InputMode>("paste");
  const [textValue, setTextValue] = useState<string>("");
  const [urlValue, setUrlValue] = useState<string>("");
  const [status, setStatus] = useState<ScorerStatus>("idle");
  const [inputError, setInputError] = useState<string | undefined>(undefined);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleScan = () => {
    // Placeholder only — no real scoring/fetch logic yet (Week 1-3 of the
    // build plan). This just demonstrates the UI states wired together.
    const hasContent = mode === "paste" ? textValue.trim() : urlValue.trim();

    if (!hasContent) {
      setInputError(
        mode === "paste"
          ? "Paste some content before scanning."
          : "Enter a URL before scanning.",
      );
      setShowResults(false);
      return;
    }

    setInputError(undefined);
    setStatus("loading");

    // Simulated delay so the loading state is visible in the UI.
    setTimeout(() => {
      setStatus("success");
      setShowResults(true);
    }, 600);
  };

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Citability Scorer
        </h1>
        <p className="mt-2 text-muted-foreground">
          Paste content or a URL to see how citable it is to AI answer engines.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <ContentModeToggle
          mode={mode}
          onModeChange={(next) => {
            setMode(next);
            setInputError(undefined);
          }}
          disabled={status === "loading"}
        />

        {mode === "paste" ? (
          <ScoreTextareaInput
            value={textValue}
            onChange={setTextValue}
            disabled={status === "loading"}
          />
        ) : (
          <ScoreUrlInput
            value={urlValue}
            onChange={setUrlValue}
            disabled={status === "loading"}
          />
        )}

        {inputError && <InputErrorMessage message={inputError} />}

        <div>
          <ScanButton status={status} onClick={handleScan} />
        </div>
      </section>

      {showResults && (
        <section className="flex flex-col items-start gap-6 border-t border-border pt-8">
          <ScoreGauge score={SAMPLE_RESULT.total} band={SAMPLE_BAND} />
          <div className="w-full">
            <h2 className="mb-3 text-lg font-semibold tracking-tight">
              Signal breakdown
            </h2>
            <SignalBreakdownList signals={SAMPLE_RESULT.signals} />
          </div>
        </section>
      )}
    </section>
  );
}
