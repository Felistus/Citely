export function InputErrorMessage({ message }: InputErrorMessageProps) {
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}
