export function JumpToLatestButton({
  visible,
  onClick,
}: JumpToLatestButtonProps) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full border border-[#DAD5C9] bg-[#1F3A5C] px-4 py-2 text-sm font-medium text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1F3A5C]"
      aria-label="Jump to latest message"
    >
      ↓ New messages
    </button>
  );
}
