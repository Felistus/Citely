import { HowItWorksStep } from "@/components/landing/HowItWorksStep";
import { STEPS } from "@/lib/data";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">
        How it works
      </h2>
      <ol className="flex flex-col gap-8">
        {STEPS.map((step, index) => (
          <li key={step.id}>
            <HowItWorksStep step={step} delayMs={index * 100} />
          </li>
        ))}
      </ol>
    </section>
  );
}
