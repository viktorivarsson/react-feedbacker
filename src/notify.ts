import { generateId } from './helpers';
import store, { NotifyKind } from './store';

export const createNotify = (kind: NotifyKind) => (message: string) =>
  store.dispatch({
    payload: {
      id: generateId(),
      kind,
      message,
      status: 'open',
    },
    type: 'INSERT',
  });

export const notify = {
  error: createNotify('error'),
  info: createNotify('info'),
  success: createNotify('success'),
  warning: createNotify('warning'),
};

export default notify;
