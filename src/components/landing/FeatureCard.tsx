import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function FeatureCard({ feature, delayMs }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <RevealOnScroll delayMs={delayMs} className="h-full">
      <Card className="h-full">
        <CardHeader className="flex-row items-center gap-3">
          <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <CardTitle>{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{feature.description}</CardDescription>
        </CardContent>
      </Card>
    </RevealOnScroll>
  );
}
