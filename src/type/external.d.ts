/**
 * Global types that need an import from a library.
 * type.ts and interface.d.ts must stay import-free to remain fully ambient —
 * anything that needs a library import (e.g. LucideIcon) lives here instead.
 *
 * Pattern: import normally, then declare the type inside `declare global`.
 * The trailing `export {}` is required — it's what makes TypeScript treat
 * this file as a module (so the import is legal) while `declare global`
 * still injects the type into global scope, so components still use it
 * with zero imports of their own.
 */

import type { LucideIcon } from "lucide-react";

declare global {
  type NavItem = {
    href: string;
    label: string;
    icon: LucideIcon;
  };
}

export {};
