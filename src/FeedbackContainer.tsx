import React, { FC, useState, useEffect, useCallback } from 'react';
import { createCloseAction } from './actions';
import { DelayWrapperProps } from './DelayWrapper';
import store, { FeedbackItem } from './store';

type RenderProps = {
  items: FeedbackItem[];
  closeItem: (item: FeedbackItem) => void;
  getDelayWrapperProps: (options: DelayWrapperProps) => DelayWrapperProps;
};

type FeedbackContainerProps = {
  closeAfterMs?: number;
  delayCloseMs?: number;
  children?: (props: RenderProps) => JSX.Element;
  render?: (props: RenderProps) => JSX.Element;
  pauseOnHover?: boolean;
};

const FeedbackContainer: FC<FeedbackContainerProps> = ({
  closeAfterMs = 5000,
  delayCloseMs = 0,
  pauseOnHover = true,
  children,
  render = children,
}) => {
  const [items, setItems] = useState<FeedbackItem[]>([]);

  const onStoreUpdate = useCallback(() => setItems(store.getState()), []);

  const closeAction = useCallback(createCloseAction(delayCloseMs), [
    delayCloseMs,
  ]);

  const getDelayWrapperProps = useCallback(
    (inputProps: DelayWrapperProps): DelayWrapperProps => ({
      close: closeAction,
      closeAfterMs,
      pauseOnHover,
      ...inputProps,
    }),
    [closeAction, closeAfterMs, pauseOnHover],
  );

  useEffect(() => store.subscribe(onStoreUpdate), [onStoreUpdate]);

  if (typeof render !== 'function') {
    throw new Error('Invalid');
  }

  return render({
    closeItem: closeAction,
    getDelayWrapperProps,
    items,
  });
};

export default FeedbackContainer;
