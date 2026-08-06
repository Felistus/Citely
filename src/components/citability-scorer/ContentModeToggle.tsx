import { Button } from "@/components/ui/button";

export function ContentModeToggle({
  mode,
  onModeChange,
  disabled,
}: ContentModeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Content input mode"
      className="inline-flex gap-1 rounded-sm border border-border bg-surface p-1 max-w-xs"
    >
      <Button
        type="button"
        aria-pressed={mode === "paste"}
        variant={mode === "paste" ? "default" : "ghost"}
        size="sm"
        disabled={disabled}
        onClick={() => onModeChange("paste")}
        className="w-full cursor-pointer rounded-sm"
      >
        Paste content
      </Button>
      <Button
        type="button"
        aria-pressed={mode === "url"}
        variant={mode === "url" ? "default" : "ghost"}
        size="sm"
        disabled={disabled}
        onClick={() => onModeChange("url")}
        className="w-full cursor-pointer rounded-sm"
      >
        Enter URL
      </Button>
    </div>
  );
}
