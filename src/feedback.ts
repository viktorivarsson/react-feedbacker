import { generateId } from './helpers';
import store, { FeedbackKind } from './store';

export const createFeedback = (kind: FeedbackKind) => (message: string) =>
  store.dispatch({
    payload: {
      id: generateId(),
      kind,
      message,
      status: 'open',
    },
    type: 'INSERT',
  });

export const feedback = {
  error: createFeedback('error'),
  info: createFeedback('info'),
  success: createFeedback('success'),
  warning: createFeedback('warning'),
};

export default feedback;
