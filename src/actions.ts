import store, { NotifyItem } from './store';

export const createCloseAction = (closeDelayMs?: number) => (
  item: NotifyItem,
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

export const deleteAction = (item: NotifyItem) => {
  store.dispatch({
    payload: item,
    type: 'DELETE',
  });
};
