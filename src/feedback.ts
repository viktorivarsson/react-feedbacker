import { canUseDOM, generateId, warn } from './utils';
import store, { FeedbackKind } from './store';

export const createFeedback = (kind: FeedbackKind) => (message: string) => {
  if (!canUseDOM) {
    return warn(
      `feedback.${kind}() has been called on server, it will not insert feedback.`,
    );
  }

  return store.dispatch({
    payload: {
      id: generateId(),
      kind,
      message,
      status: 'open',
    },
    type: 'INSERT',
  });
};

export const feedback = {
  error: createFeedback('error'),
  info: createFeedback('info'),
  success: createFeedback('success'),
  warning: createFeedback('warning'),
};
