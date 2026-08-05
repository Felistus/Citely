/**
 * Global interface declarations for Citely.
 * No import/ statements here on purpose — every interface below is a
 * global ambient type, usable in any .ts/.tsx file with zero imports.
 * Types referenced here (InputMode, ScorerStatus, etc.) come from type.ts,
 * which is also ambient/global for the same reason.
 */

/** One signal's score, as produced by the Citability Scorer. */
interface SignalResult {
  id: SignalId;
  label: string;
  score: number; // 0-100
  weight: number; // e.g. 25
  explanation: string;
}

/** Full citability breakdown for a piece of scored content. */
interface CitabilityBreakdown {
  // CitabilityScoreResult
  total: number; // 0-100 composite score
  band?: ScoreBand;
  signals: SignalResult[];
}

/** The scored content the Simulator holds in context across turns. */
interface ScoredContent {
  url?: string;
  rawText: string;
  breakdown: CitabilityBreakdown;
}

/** A single rendered chat message part (this build only renders text parts). */
interface SimulatorMessagePart {
  type: "text";
  text: string;
}

/** A single message as rendered in the chat thread. */
interface SimulatorMessage {
  id: string;
  role: SimulatorMessageRole;
  parts: SimulatorMessagePart[];
}

/** Request body the client sends to /app/api/simulator/route.ts. */
interface SimulatorRequestBody {
  messages: SimulatorMessage[];
  scoredContent?: ScoredContent;
}

/** Return shape of the useSimulatorChat view-model hook. */
interface UseSimulatorChatResult {
  messages: SimulatorMessage[];
  status: ChatStatus;
  error: Error | undefined;
  /** Send a follow-up question as the user. */
  sendFollowUp: (text: string) => void;
  /** Stop generation mid-stream; partial message persists. */
  stop: () => void;
  /** True while a request is in flight or streaming. */
  isBusy: boolean;
}

/** Props for the top-level ChatContainer (View). */
interface ChatContainerProps {
  scoredContent: ScoredContent;
  className?: string;
}

/** Props for MessageList (View). */
interface MessageListProps {
  messages: SimulatorMessage[];
  isThinking: boolean;
  /** Forwards the native scroll event; measurement lives in useAutoScroll. */
  onScrollStateChange: React.UIEventHandler<HTMLDivElement>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  bottomAnchorRef: React.RefObject<HTMLDivElement | null>;
}

/** Props for a single MessageBubble (View). */
interface MessageBubbleProps {
  message: SimulatorMessage;
}

/** Props for the ThinkingIndicator (View). */
interface ThinkingIndicatorProps {
  label?: string;
}

/** Props for ChatInput (View). */
interface ChatInputProps {
  onSubmit: (text: string) => void;
  onStop: () => void;
  isBusy: boolean;
  disabled?: boolean;
}

/** Props for the JumpToLatestButton (View). */
interface JumpToLatestButtonProps {
  visible: boolean;
  onClick: () => void;
}

// ---- Citability Scorer: input components ----

interface ContentModeToggleProps {
  mode: InputMode;
  onModeChange: (mode: InputMode) => void;
  disabled?: boolean;
}

interface ScoreTextareaInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

interface ScoreUrlInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

interface ScanButtonProps {
  status: ScorerStatus;
  onClick: () => void;
  disabled?: boolean;
}

interface InputErrorMessageProps {
  message: string;
}

// ---- Citability Scorer: results components ----

interface ScoreGaugeProps {
  score: number;
  band: ScoreBand;
}

interface ScoreBandBadgeProps {
  band: ScoreBand;
}

interface SignalBreakdownCardProps {
  signal: SignalScore;
}

interface SignalBreakdownListProps {
  signals: SignalScore[];
}
