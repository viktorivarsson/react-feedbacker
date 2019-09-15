import { useState, useEffect, useCallback } from 'react';
import { DelayWrapperProps } from '../components/DelayWrapper';
import { createCloseAction } from '../actions';
import store, { FeedbackItem } from '../store';

export type UseFeedbackContainerOptions = {
  closeAfterMs?: number;
  delayCloseMs?: number;
  pauseOnHover?: boolean;
};

export type UseFeedbackContainerResponse = {
  items: FeedbackItem[];
  closeItem: (item: FeedbackItem) => void;
  getDelayWrapperProps: (options: DelayWrapperProps) => DelayWrapperProps;
};

const useFeedbackContainer = ({
  closeAfterMs = 5000,
  delayCloseMs = 0,
  pauseOnHover = true,
}: UseFeedbackContainerOptions): UseFeedbackContainerResponse => {
  const [items, setItems] = useState<FeedbackItem[]>([]);

  const onStoreUpdate = useCallback(() => setItems(store.getState()), []);

  const closeItem = useCallback(createCloseAction(delayCloseMs), [
    delayCloseMs,
  ]);

  const getDelayWrapperProps = useCallback(
    (inputProps: DelayWrapperProps): DelayWrapperProps => ({
      close: closeItem,
      closeAfterMs,
      pauseOnHover,
      ...inputProps,
    }),
    [closeItem, closeAfterMs, pauseOnHover],
  );

  useEffect(() => store.subscribe(onStoreUpdate), [onStoreUpdate]);

  return {
    getDelayWrapperProps,
    closeItem,
    items,
  };
};

export default useFeedbackContainer;
