import { ReactNode } from 'react';
import { canUseDOM, generateId, warn, DEFAULT_NAMESPACE } from './utils';
import { store } from './store';
import { FeedbackKind, FeedbackItem } from './store';

type FeedbackOptions = {
  namespace?: string;
  behavior?: 'append' | 'prepend';
};

type FeedbackMessageOptions = {
  namespace?: FeedbackItem['namespace'];
  closeAfterMs?: FeedbackItem['closeAfterMs'];
};

export const createFeedback = ({
  behavior = 'append',
  namespace = DEFAULT_NAMESPACE,
}: FeedbackOptions = {}) => (kind: string) => (
  message: ReactNode,
  options: FeedbackMessageOptions = {},
) => {
  if (!canUseDOM) {
    return warn(
      `feedback.${kind}() has been called on server, it will not insert feedback.`,
    );
  }

  return store.dispatch({
    payload: {
      id: generateId(),
      namespace: options.namespace ?? namespace,
      kind,
      message,
      status: 'open',
      closeAfterMs: options.closeAfterMs,
    },
    type: behavior === 'append' ? 'APPEND' : 'PREPEND',
  });
};

const createDefaultFeedback = createFeedback();

export const feedback: Record<
  FeedbackKind,
  ReturnType<typeof createDefaultFeedback>
> = {
  error: createDefaultFeedback('error'),
  info: createDefaultFeedback('info'),
  success: createDefaultFeedback('success'),
  warning: createDefaultFeedback('warning'),
};
