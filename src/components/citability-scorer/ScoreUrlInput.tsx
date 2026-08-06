import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function ScoreUrlInput({
  value,
  onChange,
  disabled,
  error,
}: ScoreUrlInputProps) {
  return (
    <div className="flex flex-col gap-1.5 relative">
      <label
        htmlFor="score-url-input"
        className="text-sm font-medium text-foreground"
      >
        Page URL
      </label>
      <Input
        id="score-url-input"
        type="url"
        inputMode="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "score-url-error" : undefined}
        placeholder="https://example.com/blog/post"
      />
      {value && (
        <X
          className="absolute right-3 top-1/2 text-muted-foreground cursor-pointer hover:text-destructive"
          aria-hidden="true"
          onClick={() => onChange("")}
        />
      )}
      {error && (
        <p
          id="score-url-error"
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
