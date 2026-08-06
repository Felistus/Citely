import { SignalBreakdownCard } from "@/components/citability-scorer/SignalBreakdownCard";

export function SignalBreakdownList({ signals }: SignalBreakdownListProps) {
  if (signals.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No signal breakdown available yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {signals.map((signal) => (
        <li key={signal.id}>
          <SignalBreakdownCard signal={signal} />
        </li>
      ))}
    </ul>
  );
}
