import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pb-20 pt-16 text-center sm:pt-24">
      <span className="font-mono text-sm text-primary" aria-hidden="true">
        [cite·ly]
      </span>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Know if AI will cite you before you hit publish.
      </h1>
      <p className="max-w-xl text-balance text-lg text-muted-foreground">
        Citely scores your content&apos;s AI-citability, previews how it&apos;ll
        appear in a ChatGPT or Perplexity answer, and generates the llms.txt
        your site needs to be found by AI search.
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
          Open Citely
        </Link>
        <a
          href="#how-it-works"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          See how it works
        </a>
      </div>
    </section>
  );
}
