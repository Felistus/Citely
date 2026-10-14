import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon;

  return (
    <Card className="transition-colors hover:bg-accent">
      <Link
        href={module.href}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <CardHeader className="flex-row items-center gap-3">
          <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <CardTitle>{module.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-end justify-between gap-2">
          <CardDescription>{module.description}</CardDescription>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </CardContent>
      </Link>
    </Card>
  );
}
