import { Badge } from "@/components/ui/badge";

const BAND_LABEL: Record<ScoreBand, string> = {
  "highly-citable": "Highly citable",
  "moderately-citable": "Moderately citable",
  weak: "Weak",
  "not-citable": "Not citable",
};

const BAND_VARIANT: Record<ScoreBand, "success" | "warning" | "destructive"> = {
  "highly-citable": "success",
  "moderately-citable": "success",
  weak: "warning",
  "not-citable": "destructive",
};

export function ScoreBandBadge({ band }: ScoreBandBadgeProps) {
  return <Badge variant={BAND_VARIANT[band]}>{BAND_LABEL[band]}</Badge>;
}
