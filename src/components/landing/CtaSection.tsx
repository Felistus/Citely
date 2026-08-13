import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function CtaSection() {
  return (
    <section className="border-t border-border bg-surface">
      <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to see your score?
        </h2>
        <p className="max-w-md text-muted-foreground">
          No account, no credit card. Paste your first piece of content and see
          where it stands.
        </p>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          Open Citely
        </Link>
      </RevealOnScroll>
    </section>
  );
}
