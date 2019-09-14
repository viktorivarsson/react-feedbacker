import { createCloseAction, deleteAction } from '../actions';
import store from '../store';

afterEach(store.reset);
jest.useFakeTimers();

test('closes item and then removes if delay close', () => {
  const id = 'idToClose';

  store.dispatch({
    payload: {
      id,
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  store.dispatch({
    payload: {
      id: 'idToKeep',
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  const item = store.getState()[0];

  createCloseAction(100)(item);

  expect(store.getState()[0].status).toEqual('closing');

  jest.advanceTimersByTime(500);

  expect(store.getState()[0].id).not.toEqual(item.id);
});

test('removes item if not delay close', () => {
  store.dispatch({
    payload: {
      id: 'firstId',
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  store.dispatch({
    payload: {
      id: 'secondId',
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  const firstItem = store.getState()[0];

  createCloseAction()(firstItem);

  expect(store.getState()).toHaveLength(1);
  expect(store.getState()[0].id).not.toEqual(firstItem.id);
});

test('can delete item through delete action', () => {
  const id = 'idToBeRemoved';

  store.dispatch({
    payload: {
      id,
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  const item = store.getState()[0];

  expect(item.id).toEqual(id);
  expect(store.getState()).toHaveLength(1);

  deleteAction(item);

  expect(store.getState()).toEqual([]);
});
