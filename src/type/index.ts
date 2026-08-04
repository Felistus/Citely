/**
 * type.ts
 *
 * Type aliases for the AI Answer Simulator module.
 * Interfaces (object shapes) live in interface.d.ts.
 * No component or hook in this project should declare its own
 * type or interface, everything is centralized here.
 */
import { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type SimulatorMessageRole = "user" | "assistant" | "system";

export type ChatStatus = "submitted" | "streaming" | "ready" | "error";

export type CitabilityLabel =
  | "Highly citable"
  | "Moderately citable"
  | "Weak"
  | "Not citable";

export type SignalId =
  | "direct-answer"
  | "heading-hierarchy"
  | "entity-clarity"
  | "schema-presence"
  | "list-table-usage"
  | "freshness";
