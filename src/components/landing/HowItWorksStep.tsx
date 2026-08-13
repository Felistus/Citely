import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function HowItWorksStep({ step, delayMs }: HowItWorksStepProps) {
  return (
    <RevealOnScroll delayMs={delayMs} className="flex gap-4">
      <span className="font-mono text-sm text-primary" aria-hidden="true">
        [{step.order}]
      </span>
      <div>
        <h3 className="font-semibold">{step.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {step.description}
        </p>
      </div>
    </RevealOnScroll>
  );
}
