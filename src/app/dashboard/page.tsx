import { ModuleGrid } from "@/components/overview/ModuleGrid";
import { MODULES } from "@/lib/data";

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Overview
        </h1>
        <p className="mt-2 text-muted-foreground">
          Know if AI will cite you before you hit publish. Pick a tool to get
          started.
        </p>
      </div>

      <ModuleGrid modules={MODULES} />
    </div>
  );
}
