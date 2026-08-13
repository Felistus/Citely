import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <RevealOnScroll className="flex flex-col gap-4">
        <span className="font-mono text-sm text-muted-foreground" aria-hidden="true">
          [the problem]
        </span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Search split in two, and most tools never noticed.
        </h2>
        <p className="text-muted-foreground">
          Google rankings are only half the story now. ChatGPT, Perplexity,
          and Gemini answer questions directly, citing a handful of sources
          as they go. Almost no SEO tooling checks whether your content is
          structured well enough to be one of them, until it&apos;s already
          published and too late to fix.
        </p>
      </RevealOnScroll>
    </section>
  );
}
