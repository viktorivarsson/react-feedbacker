import { store, FeedbackItem } from './store';

export const createCloseAction = (closeDelayMs?: number) => (
  item: FeedbackItem,
) => {
  if (!closeDelayMs) {
    return deleteAction(item);
  }

  store.dispatch({
    payload: item,
    type: 'CLOSE',
  });

  setTimeout(() => deleteAction(item), closeDelayMs);
};

export const deleteAction = (item: FeedbackItem) => {
  store.dispatch({
    payload: item,
    type: 'DELETE',
  });
};
