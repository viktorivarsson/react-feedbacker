import { ReactNode } from 'react';
import { canUseDOM, generateId, warn, DEFAULT_NAMESPACE } from './utils';
import store, { FeedbackKind } from './store';

export const createFeedback = (namespace: string) => (kind: FeedbackKind) => (
  message: ReactNode,
) => {
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
    type: 'INSERT',
  });
};

export const createDefaultFeedback = createFeedback(DEFAULT_NAMESPACE);

export const feedback = {
  error: createDefaultFeedback('error'),
  info: createDefaultFeedback('info'),
  success: createDefaultFeedback('success'),
  warning: createDefaultFeedback('warning'),
};
