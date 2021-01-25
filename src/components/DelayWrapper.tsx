import React, { FC, useEffect, useRef, useCallback } from 'react';
import { getTimeDifferenceInMs, Optional } from '../utils';
import { FeedbackItem } from '../store';

export type DelayWrapperProps = {
  closeAfterMs?: number;
  close?: (item: FeedbackItem) => void;
  item: FeedbackItem;
  pauseOnHover?: boolean;
};

const noop = () => {};

type TimeoutId = ReturnType<typeof setTimeout>;

export const DelayWrapper: FC<DelayWrapperProps> = ({
  close: onClose,
  closeAfterMs,
  item,
  pauseOnHover,
  children,
}) => {
  const timerStartedAt = useRef<Optional<Date>>();
  const timeRemainingRef = useRef<Optional<number>>(closeAfterMs);
  const timerRef = useRef<Optional<TimeoutId>>();

  const close = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose(item);
    }
  }, [onClose, item]);

  const pauseTimer = useCallback(() => {
    if (timeRemainingRef.current != null && timerStartedAt.current != null) {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }

      const timePassed = getTimeDifferenceInMs(
        new Date(),
        timerStartedAt.current,
      );

      timeRemainingRef.current = timeRemainingRef.current - timePassed;
    }
  }, []);

  const playTimer = useCallback(() => {
    if (timeRemainingRef.current != null) {
      timerRef.current = setTimeout(close, timeRemainingRef.current);
    }
  }, [close]);

  useEffect(() => {
    if (closeAfterMs) {
      timerStartedAt.current = new Date();
      playTimer();
    }
  }, [closeAfterMs, playTimer]);

  if (closeAfterMs) {
    return (
      <div
        onMouseEnter={pauseOnHover ? pauseTimer : noop}
        onMouseLeave={pauseOnHover ? playTimer : noop}
      >
        {children}
      </div>
    );
  }

  return <div>{children}</div>;
};
