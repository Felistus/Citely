"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export function RevealOnScroll({
  children,
  className,
  delayMs = 0,
}: RevealOnScrollProps) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out",
        isVisible
          ? "motion-safe:opacity-100 motion-safe:translate-y-0"
          : "motion-safe:opacity-0 motion-safe:translate-y-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
