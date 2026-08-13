import { FeatureCard } from "@/components/landing/FeatureCard";
import { MODULES } from "@/lib/data";

export function ModulesSection() {
  return (
    <section id="modules" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">
        Five tools, one shell
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            delayMs={(index % 3) * 100}
          />
        ))}
      </div>
    </section>
  );
}
