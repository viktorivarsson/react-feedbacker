import { FeedbackItem } from '../store';
import { DEFAULT_NAMESPACE } from '../utils';

export const itemFixture: FeedbackItem = {
  id: '123',
  namespace: DEFAULT_NAMESPACE,
  kind: 'error',
  message: 'My message',
  status: 'open',
};
