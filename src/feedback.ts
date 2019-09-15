import { ReactNode } from 'react';
import { canUseDOM, generateId, warn, DEFAULT_NAMESPACE } from './utils';
import store from './store';
import { FeedbackKind } from './store';

type FeedbackOptions = {
  namespace?: string;
  behavior?: 'append' | 'prepend';
};

export const createFeedback = ({
  behavior = 'append',
  namespace = DEFAULT_NAMESPACE,
}: FeedbackOptions = {}) => (kind: string) => (message: ReactNode) => {
  if (!canUseDOM) {
    return warn(
      `feedback.${kind}() has been called on server, it will not insert feedback.`,
    );
  }

  return store.dispatch({
    payload: {
      id: generateId(),
      namespace,
      kind,
      message,
      status: 'open',
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
