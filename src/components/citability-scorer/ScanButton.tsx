import { Button } from "@/components/ui/button";

export function ScanButton({ status, onClick, disabled }: ScanButtonProps) {
  const isLoading = status === "loading";

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className="w-full cursor-pointer rounded-sm max-w-xs"
    >
      {isLoading ? "Scanning..." : "Scan"}
    </Button>
  );
}
