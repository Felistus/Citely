import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function SignalBreakdownCard({ signal }: SignalBreakdownCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>{signal.label}</CardTitle>
        <span className="text-sm font-semibold tabular-nums text-muted-foreground">
          {signal.score}/100
        </span>
      </CardHeader>
      <CardContent>
        <CardDescription>{signal.explanation}</CardDescription>
        <p className="mt-2 text-xs text-muted-foreground">
          Weight: {signal.weight}%
        </p>
      </CardContent>
    </Card>
  );
}
