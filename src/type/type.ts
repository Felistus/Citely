/**
 * Global type aliases for Citely.
 * No import/export statements here on purpose — this makes every type below
 * a global ambient type, usable in any .ts/.tsx file with zero imports.
 */

type SimulatorMessageRole = "user" | "assistant" | "system";

type ChatStatus = "submitted" | "streaming" | "ready" | "error";

type InputMode = "paste" | "url";

type ScorerStatus = "idle" | "loading" | "success" | "error";

type ScoreBand =
  | "highly-citable"
  | "moderately-citable"
  | "weak"
  | "not-citable";

type SignalId =
  | "direct-answer"
  | "heading-hierarchy"
  | "entity-clarity"
  | "schema-presence"
  | "list-table-usage"
  | "freshness";
