import { useState, useEffect, useCallback } from 'react';
import { DelayWrapperProps } from '../components/DelayWrapper';
import { createCloseAction } from '../actions';
import { store, FeedbackItem } from '../store';
import { DEFAULT_NAMESPACE } from '../utils';

export type UseFeedbackContainerOptions = {
  closeAfterMs?: number;
  delayCloseMs?: number;
  pauseOnHover?: boolean;
  namespace?: string;
};

export type UseFeedbackContainerResponse = {
  items: FeedbackItem[];
  closeItem: (item: FeedbackItem) => void;
  getDelayWrapperProps: (options: DelayWrapperProps) => DelayWrapperProps;
};

export const useFeedbackContainer = ({
  closeAfterMs = 5000,
  delayCloseMs = 0,
  pauseOnHover = true,
  namespace = DEFAULT_NAMESPACE,
}: UseFeedbackContainerOptions): UseFeedbackContainerResponse => {
  const [items, setItems] = useState<FeedbackItem[]>([]);

  const onStoreUpdate = useCallback(() => setItems(store.getState(namespace)), [
    namespace,
  ]);

  const close = useCallback(createCloseAction(delayCloseMs), [delayCloseMs]);

  const getDelayWrapperProps = useCallback(
    (inputProps: DelayWrapperProps): DelayWrapperProps => ({
      close,
      closeAfterMs,
      pauseOnHover,
      ...inputProps,
    }),
    [close, closeAfterMs, pauseOnHover],
  );

  useEffect(() => store.subscribe(onStoreUpdate), [onStoreUpdate]);

  return {
    getDelayWrapperProps,
    closeItem: close,
    items,
  };
};
