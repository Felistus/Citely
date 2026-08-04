"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Auto-scroll ViewModel for the message list.
 *
 * Rule: pin to bottom only while the user is already at the bottom.
 * The moment they scroll up, the pin releases and stays released
 * until they explicitly jump back down, at which point a
 * "jump to latest" affordance should be shown by the View.
 *
 * This is deliberately tested while content is actively streaming
 * (dependencyValue changes on every token), not only once at the end,
 * since that is exactly where naive implementations break.
 */

const BOTTOM_THRESHOLD_PX = 48;

export function useAutoScroll(dependencyValue: unknown) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomAnchorRef = useRef<HTMLDivElement | null>(null);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);

  const isNearBottom = useCallback((): boolean => {
    const el = containerRef.current;
    if (!el) return true;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distanceFromBottom <= BOTTOM_THRESHOLD_PX;
  }, []);

  const handleScroll = useCallback(() => {
    setIsPinnedToBottom(isNearBottom());
  }, [isNearBottom]);

  const jumpToLatest = useCallback(() => {
    bottomAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    setIsPinnedToBottom(true);
  }, []);

  // Re-runs on every new token (dependencyValue changes per streamed
  // chunk). Only auto-scrolls if the user was already pinned to the
  // bottom, never fights a user who scrolled up to reread something.
  useEffect(() => {
    if (!isPinnedToBottom) return;
    bottomAnchorRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });

    // keyed on the caller-supplied dependency, not isPinnedToBottom
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally
  }, [dependencyValue]);

  return {
    containerRef,
    bottomAnchorRef,
    isPinnedToBottom,
    handleScroll,
    jumpToLatest,
  };
}
