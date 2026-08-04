/**
 * interface.d.ts
 *
 * All object-shape interfaces for the AI Answer Simulator module.
 * Type aliases (unions, primitives) live in type.ts.
 * No component or hook in this project should declare its own
 * type or interface, everything is centralized here.
 */

import type {
  ChatStatus,
  CitabilityLabel,
  SignalId,
  SimulatorMessageRole,
} from "./index";

/** One signal's score, as produced by the Citability Scorer. */
export interface SignalResult {
  id: SignalId;
  label: string;
  score: number; // 0-100
  weight: number; // e.g. 25
  explanation: string;
}

/** Full citability breakdown for a piece of scored content. */
export interface CitabilityBreakdown {
  total: number; // 0-100 composite score
  signals: SignalResult[];
}

/** The scored content the Simulator holds in context across turns. */
export interface ScoredContent {
  url?: string;
  rawText: string;
  breakdown: CitabilityBreakdown;
}

/** A single rendered chat message part (this build only renders text parts). */
export interface SimulatorMessagePart {
  type: "text";
  text: string;
}

/** A single message as rendered in the chat thread. */
export interface SimulatorMessage {
  id: string;
  role: SimulatorMessageRole;
  parts: SimulatorMessagePart[];
}

/** Request body the client sends to /app/api/simulator/route.ts. */
export interface SimulatorRequestBody {
  messages: SimulatorMessage[];
  scoredContent: ScoredContent;
}

/** Return shape of the useSimulatorChat view-model hook. */
export interface UseSimulatorChatResult {
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
export interface ChatContainerProps {
  scoredContent: ScoredContent;
  className?: string;
}

/** Props for MessageList (View). */
export interface MessageListProps {
  messages: SimulatorMessage[];
  isThinking: boolean;
  /** Forwards the native scroll event; measurement lives in useAutoScroll. */
  onScrollStateChange: React.UIEventHandler<HTMLDivElement>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  bottomAnchorRef: React.RefObject<HTMLDivElement | null>;
}

/** Props for a single MessageBubble (View). */
export interface MessageBubbleProps {
  message: SimulatorMessage;
}

/** Props for the ThinkingIndicator (View). */
export interface ThinkingIndicatorProps {
  label?: string;
}

/** Props for ChatInput (View). */
export interface ChatInputProps {
  onSubmit: (text: string) => void;
  onStop: () => void;
  isBusy: boolean;
  disabled?: boolean;
}

/** Props for the JumpToLatestButton (View). */
export interface JumpToLatestButtonProps {
  visible: boolean;
  onClick: () => void;
}
