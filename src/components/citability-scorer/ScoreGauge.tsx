import { cn } from "@/lib/utils";
import { ScoreBandBadge } from "@/components/citability-scorer/ScoreBandBadge";

const BAND_RING_COLOR: Record<ScoreBand, string> = {
  "highly-citable": "border-success",
  "moderately-citable": "border-success",
  weak: "border-warning",
  "not-citable": "border-destructive",
};

export function ScoreGauge({ score, band }: ScoreGaugeProps) {
  return (
    <section className="flex flex-col items-center gap-3">
      <div
        role="meter"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Citability score"
        className={cn(
          "flex h-28 w-28 items-center justify-center rounded-full border-4",
          BAND_RING_COLOR[band],
        )}
      >
        <span className="text-3xl font-semibold tabular-nums">{score}</span>
      </div>
      <ScoreBandBadge band={band} />
    </section>
  );
}
