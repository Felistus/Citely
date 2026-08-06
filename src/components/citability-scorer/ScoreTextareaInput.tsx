import { Textarea } from "@/components/ui/textarea";

export function ScoreTextareaInput({
  value,
  onChange,
  disabled,
  error,
}: ScoreTextareaInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="score-textarea-input"
        className="text-sm font-medium text-foreground"
      >
        Paste your content (HTML or plain text)
      </label>
      <Textarea
        id="score-textarea-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "score-textarea-error" : undefined}
        placeholder="<article>...</article>"
      />
      {error && (
        <p id="score-textarea-error" role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
